<template>
	<div class="container">
		<div class="comment" v-if="comments.length > 0" v-for="item in comments" :key="item.id">
			<!-- 评论的头像，日期，内容 -->
			<div class="info">
				<img class="avatar" :src="showAvatar(item)" width="36" height="36" />
				<div class="right">
					<div class="name">{{item.fromId}}</div>
					<div class="date">{{item.date}}</div>
				</div>
			</div>
			<div class="ql-editor content canSelect" v-html="item.content"></div>
			<!-- 被回复的内容 -->
			<div class="reply">
				<div class="item">
					<div class="reply-content">
						<div class="info">
							<img class="avatar" :src="showAvatar(item.replyTo)" width="36" height="36" />
							<div class="right">
								<span class="name">{{item.replyTo.fromId}}</span>
								<span class="date">{{item.replyTo.date}}</span>
							</div>
						</div>
						<div class="ql-editor content canSelect" v-html="item.replyTo.content"></div>
					</div>
					<div class="reply-bottom">
						<el-button icon="el-icon-chat-dot-round">回复</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-empty v-if="comments.length == 0" description="还没有人回复你哦"></el-empty>
	</div>
</template>

<script>
	//import getServer from '@/config.js';
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
		},
		components: {
			editor,
			userData
		},
		data() {
			return {};
		},
		methods: {
			showAvatar({fromId}) {
				return require('users/' + `${fromId}/avatar.jpg`);
			},
		},
	};
</script>

<style scoped>
	.canSelect {
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text;
	}

	.container {
		background: rgba(220, 220, 220, 0.2);
		padding: 0 10px;
		box-sizing: border-box;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.container .comment {
		background: #FFFFFF;
		border: 1px solid #000000;
	}

	.container .comment .content {
		font-size: 16px;
		color: #303133;
		line-height: 20px;
		padding: 10px 0;
	}

	.reply, .item {
		border: none !important;
	}

	.reply-content {
		background-color: rgba(220, 220, 220, 0.5);
		border-radius: 15px;
	}

	.reply-bottom {
		display: flex;
		align-items: center;
		margin-top: 6px;
		font-size: 12px;
		color: #909399;
	}
</style>
