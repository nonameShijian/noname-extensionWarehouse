<!--评论模块-->
<template>
	<div class="container">
		<div class="comment" v-for="item in comments" :key="item.id">
			<div class="info">
				<img class="avatar" :src="showAvatar(item)" width="36" height="36" />
				<div class="right">
					<div class="name dui-tips" :data-tooltip="'点击查看' + item.fromId + '的用户信息'" @click="getUserData(item.fromId)">{{item.fromId}}</div>
					<div class="date">{{item.date}}</div>
				</div>
			</div>
			<div class="ql-editor content canSelect" v-html="item.content"></div>
			<div class="control">
				<span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
					<i :class="{iconfont: true, 'el-icon-star-off': !item.isLike, 'el-icon-star-on': item.isLike}"></i>
					<span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
				</span>
				<span class="comment-reply" @click="showCommentInput(item)">
					<i class="iconfont el-icon-s-comment"></i>
					<span>回复</span>
				</span>
				<span v-show="!item.showComment && item.reply.length > 0" class="comment-reply" @click="showCommentList(item)">
					<i class="iconfont el-icon-circle-plus"></i>
					<span>展示评论</span>
				</span>
				<span v-show="item.showComment && item.reply.length > 0" class="comment-reply" @click="hideCommentList(item)">
					<i class="iconfont el-icon-remove"></i>
					<span>关闭评论</span>
				</span>
				<span v-if="userId == item.fromId || userId == 'root'" class="comment-reply" @click="deleteCommentInput(item)">
					<i class="iconfont el-icon-delete-solid"></i>
					<span>删除</span>
				</span>
			</div>
			<div v-show="item.showComment" class="reply">
				<div class="item" v-for="(reply, i) in item.reply" :key="reply.id">
					<div class="reply-content">
						<img class="avatar" :src="showAvatar(reply)" width="24" height="24" />
						<span class="from-name dui-tips" :data-tooltip="'点击查看' + reply.fromId + '的用户信息'" @click="getUserData(reply.fromId)">{{reply.fromId}}</span>
						<span class="to-token" v-show="reply.content != '此条评论已被删除'">:</span>
						<!-- 如果被回复的是发布主评论的话，就不应该有蓝色的@了 -->
						<span v-show="reply.toId != item.id" class="to-name dui-tips" :data-tooltip="'点击查看' + reply.toName + '的用户信息'" @click="getUserData(reply.toName)">@{{reply.toName}}</span>
						<span class="ql-editor canSelect" v-html="reply.content"></span>
					</div>
					<div class="reply-bottom">
						<span style="margin-right: 20px;">第{{i + 1}}楼</span>
						<span>{{reply.date}}</span>
						<!-- 如果是自己的评论则不能回复。未登录的游客也不能回复，被删除的评论也不能回复 -->
						<span v-if="userId != reply.fromId && reply.content != '此条评论已被删除'" class="reply-text" @click="showCommentInput(item, reply)">
							<i class="iconfont el-icon-s-comment"></i>
							<span>回复</span>
						</span>
						<span v-if="userId == reply.fromId || userId == 'root'" class="reply-text" @click="deleteCommentInput(reply)">
							<i class="iconfont el-icon-delete-solid"></i>
							<span>删除</span>
						</span>
					</div>
				</div>
				<div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item)">
					<i class="el-icon-edit"></i>
					<span class="add-comment">添加新评论</span>
				</div>
			</div>
		</div>
		<el-dialog
			title="回复评论"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:modal-append-to-body="true"
			:visible.sync="replyDialogVisible"
			@closed="cancel">
			<div class="input-wrapper">
				<!-- 显示回复的内容 -->
				<div class="reply-content-view" v-if="showReply">
					<img class="avatar" :src="showAvatar(showReply)" width="25" height="25" />
					<span>{{showReply.fromId}}</span>
					<span style="margin-left: 20px;">{{showReply.date}}</span>
					<br>
					<div class="ql-editor canSelect" style="margin-top: 5px; margin-left: 10px;" v-html="showReply.content"></div>
				</div>
				<editor
					ref="editor"
				 	:editorChange="editorChange">
				</editor>
				<div class="btn-control">
					<span class="cancel" @click="cancel">取消</span>
					<el-button class="btn" type="success" round @click="commitComment">确定</el-button>
				</div>
			</div>
		</el-dialog>
		<userData :userData="userData" :userDataVisible="userDataVisible" :closeUserData="closeUserData"></userData>
		<el-empty v-if="comments.length == 0" description="还没有人发帖哦"></el-empty>
	</div>
</template>

<script>
	import Vue from 'vue';
	import getServer from '@/config.js';
	import userData from 'components/userData';
	import editor from 'components/editor';
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';

	export default {
		props: {
			comments: {
				type: Array,
				required: true
			},
			checkLogined: {
				type: Function,
				required: true
			},
			userId: {
				type: String,
				required: true
			},
			update: {
				type: Function,
				required: true
			}
		},
		components: {
			editor,
			userData
		},
		data() {
			return {
				inputComment: '', //回复帖子的输入值
				showItemId: '', //当前主评论id
				showReply: null, //回复的评论数据
				userThumbsUpData: [], //点赞数据
				replyDialogVisible: false,
				userData: {}, //用户信息
				userDataVisible: false, //显示用户信息
			};
		},
		computed: {},
		methods: {
			showAvatar({fromId}) {
				return require('users/' + `${fromId}/avatar.jpg`);
			},
			//点赞
			likeClick(item) {
				if (!this.checkLogined()) return;
				if (item.isLike === null) {
					Vue.$set(item, 'isLike', true);
					item.likeNum++;
				} else {
					if (item.isLike) {
						item.likeNum--;
					} else {
						item.likeNum++;
					}
					item.isLike = !item.isLike;
				}
				fetch(getServer + '/setComment?userName=' + this.userId + '&isLike=' + item.isLike + '&ownerId=' + item.ownerId)
				.then(res => res.json())
				.then(({code}) => {
					if (code != 200) this.$alert('点赞数据提交失败');
				});
			},

			//展示评论
			showCommentList(item) {
				item.showComment = true;
			},

			//隐藏评论
			hideCommentList(item) {
				item.showComment = false;
			},

			//点击取消按钮
			cancel() {
				this.$refs['editor'] && this.$refs['editor'].inputChange();
				this.replyDialogVisible = false;
				this.inputComment = '';
				this.showReply = null;
				this.showItemId = '';
			},

			//提交评论
			commitComment() {
				if (!this.inputComment) return this.$message.error('不能提交空评论');
				this.$confirm(`确定要提交评论吗？`, '提交评论确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning',
					center: true
				})
				.then(() => {
					const formData = new FormData();
					formData.append('userId', this.userId);
					formData.append('comment', this.inputComment);
					formData.append('ownerId', this.showReply.ownerId);
					formData.append('toId', this.showReply.id);
					formData.append('date', new Date());
					//找到主评论的id
					let source = null, id = this.showReply.id;
					while (this.getCommentById(id) != null) {
						source = this.getCommentById(id);
						if (!source.toId) break;
						id = source.toId;
					}
					formData.append('sourceId', id);
					fetch(getServer + '/submitComment', {
						method: 'POST',
						body: formData
					})
					.then(res => res.json())
					.then(result => {
						if (result.code == 200) {
							this.cancel();
							this.update();
						} else this.$alert('评论数据提交失败\n' + result.message);
					});
				})
				.catch((e) => {
					console.log('取消提交评论', e);
				});
			},

			//点击评论按钮显示输入框
			//item: 当前大评论
			//reply: 当前回复的评论
			showCommentInput(item, reply) {
				if (!this.checkLogined()) return;
				this.showReply = (reply || item);
				this.inputComment = '';
				this.showItemId = item.id;
				this.replyDialogVisible = true;
			},
			deleteCommentInput(item) {
				this.$confirm(`确定要删除此评论吗？${item.content}`, '删除评论确认', {
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning',
					center: true
				})
				.then(() => {
					fetch(getServer + '/deleteComment?userName=' + this.userId + '&id=' + item.id + '&ownerId=' + item.ownerId)
					.then(res => res.json())
					.then(({code}) => {
						if (code == 200) {
							this.cancel();
							this.update();
						} else {
							this.$alert('删除失败');
						}
					});
				})
				.catch(() => {
					console.log('取消删除评论');
				});
			},
			setThumbsUpData(val) {
				this.userThumbsUpData = val;
				//循环找出给哪些评论点过赞
				setTimeout(() => {
					//延时加载，保证评论数据先加载完成
					this.comments.forEach(item => {
						item.isLike = this.userThumbsUpData.includes(String(item.ownerId));
					});
				}, 0);
			},
			editorChange(html) {
				this.inputComment = html;
			},
			getCommentById(id) {
				if (!id) return null;
				for (let commentData of this.comments) {
					if (commentData.id == id) return commentData;
					if (commentData.reply) {
						for (let commentData2 of commentData.reply) {
							if (commentData2.id == id) return commentData2;
						}
					}
				}
				return null;
			},
			getUserData(targetName) {
				const formData = new FormData();
				formData.append('userName', this.userId);
				formData.append('targetName', targetName);
				fetch(getServer + '/getUserData', {
					method: 'POST',
					body: formData
				})
				.then(res => res.json())
				.then(({code, data, message}) => {
					if (code != 200) {
						this.$notify({
							title: `个人信息加载失败：${message}`,
							type: 'error'
						});
					} else {
						this.userData = data;
						this.userDataVisible = true;
					}
				}).catch(({message}) => {
					this.$notify({
						title: `个人信息加载失败：${message}`,
						type: 'error'
					});
				});
			},
			closeUserData() {
				this.userDataVisible = false;
			},
		},
	};
</script>

<style>
	.canSelect {
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text;
	}

	.container {
		padding: 0 10px;
		box-sizing: border-box;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.comment {
		display: flex;
		flex-direction: column;
		padding: 10px;
		margin-bottom: 15px;
		/* border-bottom: 1px solid #F2F6FC; */
		background-color: rgba(220, 220, 220, 0.2);
		border-radius: 15px;
	}

	.comment .info {
		display: flex;
		align-items: center;
	}

	.avatar {
		border-radius: 50%;
	}

	.comment .info .right {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.comment .info .right .name {
		font-size: 16px;
		color: #303133;
		margin-bottom: 5px;
		font-weight: 500;
	}

	.dui-tips:hover {
		cursor: pointer;
		color: rgb(102,217,239) !important;
	}

	.dui-tips:after {
		background-color:rgba(0,0,0,0.8);
		border-radius:3px;
		top:30px;
		color:#fff;
		content:attr(data-tooltip);
		display:none;
		font-size:12px;
		left:50%;
		line-height:1.3;
		padding:5px;
		position:absolute;
		text-align:center;
		width:160px;
		margin-left:-85px;
	}
	.dui-tips:before {
		content:"";
		border:4px transparent solid;
		border-top-color:rgba(0,0,0,0.8);
		position:absolute;
		bottom:22px;
		left:50%;
		display:none;
		margin-left:-4px
	}
	.dui-tips:hover:after,.css-tooltip:hover:before {
		display:block;
	}

	.comment .info .right .date {
		font-size: 12px;
		color: #909399;
	}

	.comment .content {
		font-size: 16px;
		color: #303133;
		line-height: 20px;
		padding: 10px 0;
	}

	.comment .control {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #909399;
	}

	.comment .control .like {
		display: flex;
		align-items: center;
		margin-right: 10px;
		cursor: pointer;
	}

	.comment .control .like.active,
	.comment .control .like:hover {
		color: #409EFF;
	}

	.comment .control .like .iconfont {
		font-size: 14px;
		margin-right: 5px;
	}

	.comment .control .comment-reply {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-right: 5px;
	}

	.comment .control .comment-reply:hover {
		color: #333;
	}

	.comment .control .comment-reply .iconfont {
		font-size: 16px;
		margin-right: 5px;
	}

	.comment .reply {
		margin: 10px 0;
		border-left: 2px solid #DCDFE6;
	}

	.comment .reply .item {
		margin: 0 10px;
		padding: 10px 0;
		border-bottom: 2px dashed #00000021;
	}

	.comment .reply .item .reply-content {
		/* display: flex; */
        padding: 5px;
		align-items: center;
		font-size: 14px;
		color: #303133;
	}

	.from-name {
		font-size: 16px;
		/* color: #409EFF; */
	}

	.to-token {
		font-size: 16px;
		margin-right: 5px;
	}

	.to-name {
		font-size: 16px;
		color: #409EFF;
		margin-right: 5px;
	}

	.comment .reply .item .reply-bottom {
		display: flex;
		align-items: center;
		margin-top: 6px;
		font-size: 12px;
		color: #909399;
	}

	.comment .reply .item .reply-bottom .reply-text {
		display: flex;
		align-items: center;
		margin-left: 10px;
		cursor: pointer;
	}

	.comment .reply .item .reply-bottom .reply-text:hover {
		color: #333;
	}

	.comment .reply .item .reply-bottom .reply-text .icon-comment {
		margin-right: 5px;
	}

	.comment .reply .write-reply {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #909399;
		padding: 10px;
		cursor: pointer;
	}

	.comment .reply .write-reply:hover {
		color: #303133;
	}

	.comment .reply .write-reply .el-icon-edit {
		margin-right: 5px;
	}

	.input-wrapper {
		padding: 10px;
	}

	.input-wrapper .btn-control {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 10px;
	}

	.input-wrapper .btn-control .cancel {
		font-size: 16px;
		color: #606266;
		margin-right: 20px;
		cursor: pointer;
	}

	.input-wrapper .btn-control .cancel:hover {
		color: #333;
	}

	.input-wrapper .btn-control .confirm {
		font-size: 16px;
	}

	.reply-content-view {
        padding: 5px;
		background-color: rgba(220, 220, 220, 0.5);
		border-radius: 10px;
		/* display: flex; */
		align-items: center;
		font-size: 14px;
		color: #303133;
		margin-bottom: 10px;
	}

	.reply-content-view img, .reply-content img {
		top: 6px;
		position: relative;
	}
</style>
