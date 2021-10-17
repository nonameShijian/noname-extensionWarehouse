<template>
	<el-container style="height: 100%;">
		<el-header>
			<el-breadcrumb separator-class="el-icon-arrow-right" style="cursor: pointer; font-size: 20px; line-height: 4;">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>论坛</el-breadcrumb-item>
			</el-breadcrumb>
			<div v-if="!routeQquery.ownerId" style="display: inline-block; position: fixed; top: 15px; right: 10%;">
				<el-input
					style="width: 170px;"
					v-model="searchInput"
					clearable
					@input="searchOnInput"
					@keyup.enter.native="searchComment"
					placeholder="关键字搜索"></el-input>
				<el-button icon="el-icon-search" type="primary" @click="searchComment">搜索</el-button>
			</div>
			<avatar
				:userId="userId"
				:avatarUrl="avatarUrl"
				:showLogin="showLogin"
				:loginOut="loginOut">
			</avatar>
		</el-header>
		<el-main>
			<!-- 评论组件 -->
			<comment
				ref="comment"
				:comments="showCommentData"
				:checkLogined="checkLogined"
				:userId="userId"
				:update="update">
			</comment>
			<!-- 登录组件 -->
			<login
				ref="login"
				:loginSuccess="loginSuccess">
			</login>
			<!-- 发帖的dialog嵌套editor -->
			<el-dialog
				title="发帖到论坛"
				:close-on-click-modal="false"
				:close-on-press-escape="false"
				:visible.sync="postDialogVisible"
				:before-close="postDialogBeforeClose">
				<editor
					ref="editor"
					:editorChange="postEditorChange">
				</editor>
				<div style="display: flex; justify-content: flex-end; align-items: center; padding-top: 10px;">
					<el-button type="primary" round @click="submitPost">确定</el-button>
				</div>
			</el-dialog>
		</el-main>
		<el-footer style="height: 55px;">
			<!-- 分页显示 -->
			<el-pagination
				:hide-on-single-page="true"
				style="text-align: center; position: relative; top: 15px;"
				:background="true"
				layout="prev, pager, next"
				:current-page="currentPage"
				@current-change="currentChange"
				:total="paginationTotal">
			</el-pagination>
			<!-- 帖子倒序显示按钮 -->
			<el-button v-if="userId && !routeQquery.ownerId" style="position: absolute; right: 300px; bottom: 5px;" type="primary" icon="el-icon-sort-up" @click="reverse">倒序</el-button>
			<div v-if="userId && !routeQquery.ownerId">
				<!-- 查看回复 -->
				<el-badge :hidden="badgeValue == 0" :value="badgeValue" class="item" style="position: absolute; right: 115px; bottom: 5px;">
				  <el-button type="primary" icon="el-icon-chat-dot-round" @click="drawerVisible = true">回复</el-button>
				</el-badge>
				<!-- 查看回复的抽屉 -->
				<el-drawer
					title="回复"
					:visible.sync="drawerVisible"
					size="100%"
					direction="btt">
					<div slot="title" class="header-title" style="text-align: center;">
						<span>回复</span>
					</div>
					<commentReply :comments="commentReplyData" :badgeValue="badgeValue" :userId="userId"></commentReply>
				</el-drawer>
			</div>
			<el-button v-if="routeQquery.ownerId" type="primary" icon="el-icon-back" style="position: absolute; right: 115px; bottom: 5px;" @click="update">返回</el-button>
			<!-- 发帖按钮 -->
			<el-button style="position: absolute; right: 15px; bottom: 5px;" type="primary" icon="el-icon-edit" @click="showPostDialog">发帖</el-button>
		</el-footer>
	</el-container>
</template>

<script>
	import getServer from '@/config.js';
	import comment from 'components/comment';
	import commentReply from 'components/commentReply';
	import login from 'components/login';
	import avatar from 'components/avatar';
	import editor from 'components/editor';
	import 'highlight.js/styles/vs2015.css';

	export default {
		components: {
			comment,
			commentReply,
			login,
			avatar,
			editor
		},
		data() {
			return {
				searchInput: '', //按内容搜索
				currentPage: 1, //当前页
				commentData: [], //所有评论数据
				showCommentData: [], //展示的评论数据
				searchCommentData: [], //根据关键字搜索到的评论数据
				avatarUrl: '', //用户头像
				userThumbsUpData: [], //用户点赞数据
				userId: '', //用户名
				postDialogVisible: false, //发帖dialog的显示
				postEditorValue: '', //发帖editor的值
				paginationTotal: 0, //显示的帖子数量
				badgeValue: 2, //被回复的评论数
				drawerVisible: false, //显示抽屉
				commentReplyData: [], //被回复的内容
				routeQquery: this.$route.query,
			};
		},
		methods: {
			checkLogined() {
				if (!this.$refs['login'].isLogined) return this.showLogin();
				return true;
			},
			showLogin() {
				this.$refs['login'].show();
			},
			loginSuccess({userId, avatarUrl, userThumbsUpData}) {
				this.userId = userId;
				this.avatarUrl = avatarUrl;
				if (userThumbsUpData) {
					this.userThumbsUpData = userThumbsUpData;
					this.$refs['comment'].setThumbsUpData(userThumbsUpData);
				}
				this.getCommentReply(userId);
			},
			loginOut() {
				this.avatarUrl = '';
				this.userId = '';
				this.userThumbsUpData = [];
				this.$refs['comment'].setThumbsUpData(this.userThumbsUpData);
				this.$refs['login'].loginOut();
				this.postDialogVisible = false;
				this.postEditorValue = '';
			},
			getComment({ownerId}) {
				this.searchInput = '';
				this.commentData = [];
				this.showCommentData = [];
				this.searchCommentData = [];
				fetch(getServer + '/getComment' + (ownerId ? `?ownerId=${ownerId}` : ''))
					.then(response => response.json())
					.then(result => {
						if (result.code == 200) {
							this.commentData = result.data;
							this.currentChange(1);
							this.$refs['comment'].setThumbsUpData(this.userThumbsUpData);
						} else {
							this.$notify({
								title: `评论数据加载失败：${result.message}`,
								type: 'error'
							});
						}
					})
					.catch(e => {
						this.$notify({
							title: `评论数据加载失败：${e}`,
							type: 'error'
						});
					});
			},
			getCommentReply(userId) {
				fetch(getServer + `/getCommentReply?userId=${userId}`)
					.then(response => response.json())
					.then(result => {
						if (result.code == 200) {
							this.commentReplyData = result.data;
							this.badgeValue = result.data.filter(i => !i.isReviewedReply).length;
						} else {
							this.$notify({
								title: `回复数据加载失败：${result.message}`,
								type: 'error'
							});
						}
					})
					.catch(e => {
						this.$notify({
							title: `回复数据加载失败：${e}`,
							type: 'error'
						});
					});
			},
			postDialogBeforeClose(done) {
				this.$confirm('确认放弃发帖？', {
					type: 'warning',
				})
				.then(() => {
					this.postEditorValue = '';
					done();
				})
				.catch(() => {});
			},
			showPostDialog() {
				//先判断是否登录
				if (!this.checkLogined()) return;
				//再显示dialog
				this.postDialogVisible = true;
			},
			postEditorChange(html) {
				this.postEditorValue = html;
			},
			submitPost() {
				if (!this.postEditorValue) return this.$message.error('不能提交空评论');
				//确认发帖
				const formData = new FormData();
				//发帖人
				formData.append('userId', this.userId);
				//帖子内容（html）
				formData.append('comment', this.postEditorValue);
				//第几个帖子
				formData.append('ownerId', this.commentData.length + 1);
				//发帖日期
				formData.append('date', new Date());
				fetch(getServer + '/submitComment', {
					method: 'POST',
					body: formData
				})
				.then(res => res.json())
				.then(result => {
					if (result.code == 200) {
						//成功了才清空editor
						this.postDialogVisible = false;
						this.postEditorValue = '';
						this.getComment();
						this.$refs['editor'].inputChange();
					} else console.error(this.message);
				});
			},
			currentChange(page) {
				//页面变化
				this.currentPage = page;
				let data = this.searchCommentData.length > 0 ? this.searchCommentData : this.commentData;
				this.showCommentData = data.slice(page * 10 - 10, page * 10);
				this.paginationTotal = data.length;
			},
			searchComment() {
				let keyword = this.searchInput;
				if (!keyword.length) return;
				this.searchCommentData = this.commentData.filter(item => {
					let div = document.createElement('div');
					div.innerHTML = item.content;
					return div.innerText.includes(keyword);
				});
				this.currentChange(1);
				if (!this.searchCommentData.length) {
					//有输入值，但是没有结果
					this.$alert(`没有搜索到关于'${keyword}'的结果`);
					this.searchInput = '';
				}
			},
			searchOnInput() {
				//oninput事件
				if (this.searchCommentData.length && this.searchInput === '') {
					//搜索框被清空, 如果已经有搜索到的数据再执行，为了防止页面bug一样回到第一页
					this.searchCommentData = [];
					this.currentChange(1);
				}
			},
			update() {
				location.href = '/comment';
			},
			reverse() {
				this.commentData.reverse();
				this.currentChange(this.currentPage);
			},
		},
		created() {
			this.getComment(this.routeQquery);
		},
	};
</script>
<style>
	pre.ql-syntax {
	    background-color: #23241f;
	    color: #f8f8f2;
	    overflow: visible;
		font-size: 20px;
		font-family: '宋体';
	}

	.ql-emoji {
		font-size: 18px;
		padding: 0 !important;
	}

	.container-search[data-v-839ecda0] {
		display: none !important;
	}

	.emoji-picker[data-v-f1d527bc] {
		width: 100% !important;
	}

	.item {
	  margin-top: 10px;
	  margin-right: 40px;
	}

	.el-badge__content.is-fixed.is-dot {
		right: 30px !important;
		top: 25px !important;
	}
</style>
