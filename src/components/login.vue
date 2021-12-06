<template>
	<el-dialog
		title="登录到noname-server"
		:visible.sync="loginVisible"
		center
		style="width: 100%;"
		:closed="loginCancel"
		:close-on-click-modal="false">
		<el-form :model="ruleForm">
			<el-form-item label="用户ID:" label-width="120px">
				<el-input v-model="ruleForm.userName" autocomplete="off" placeholder="请输入用户ID"></el-input>
			</el-form-item>
			<el-form-item label="用户密码:" label-width="120px">
				<el-input type="password" v-model="ruleForm.passWord" autocomplete="off" placeholder="请输入用户密码"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary">
				<router-link to="/register" style="text-decoration: none; color: white;">注 册</router-link>
			</el-button>
			<el-button type="primary" @click="loginToServer">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import getServer from '@/config.js';

	export default {
		props: {
			loginSuccess: {
				type: Function,
				required: true
			},
			loginCancel: {
				type: Function,
				required: false
			}
		},
		data() {
			return {
				loginVisible: false, //登录dialog是否显示
				isLogined: false, //是否已经登录
				ruleForm: { //登录表单
					userName: '',
					passWord: '',
				},
			};
		},
		methods: {
			show() {
				this.loginVisible = true;
			},
			loginToServer() {
				const { userName, passWord } = this.ruleForm;
				if (!userName || !passWord) {
					let title;
					if (!userName) {
						title = '请输入用户ID';
					} else if (!passWord) {
						title = '请输入用户密码';
					}
					return this.$notify({
						title,
						type: 'error',
					});
				}
				this.login();
			},
			login() {
				const { userName, passWord } = this.ruleForm;
				fetch(getServer + '/login?userName=' + userName + '&passWord=' + passWord)
					.then(res => res.json())
					.then(result => {
						if (!result.errMessage) {
							const { hasUser, correctPassword, userScoreData, userThumbsUpData } = result;
							if (!hasUser || !correctPassword) {
								//登录失败
								this.isLogined = false;
								this.$message.error(!hasUser ? '用户不存在' : '用户密码不正确');
							} else {
								//登录成功
								//修改头像
								let scoreData = JSON.parse(userScoreData) || {};
								this.isLogined = true;
								this.loginVisible = false;
								this.loginSuccess({
									userId: userName,
									//avatarUrl: require('users/' + `${userName}/avatar.jpg`),
									avatarUrl: getServer + '/userAvatar/' + userName,
									scoreData,
									userThumbsUpData
								});
								if (!sessionStorage.getItem('login')) {
									this.$message.success('登录成功');
								}
								sessionStorage.setItem('login', JSON.stringify(this.ruleForm));
								this.ruleForm = {
									userName: '',
									passWord: '',
								};
							}
						} else {
							//登录失败移除缓存数据
							sessionStorage.removeItem('login');
							this.isLogined = false;
							this.$message.error(result.errMessage);
						}
					}).catch(console.error);
			},
			loginOut() {
				sessionStorage.removeItem('login');
				this.isLogined = false;
				this.$message.success('退出登录');
			}
		},
		mounted() {
			//自动登录
			let login = sessionStorage.getItem('login');
			if (login && this.isLogined == false) {
				this.ruleForm = JSON.parse(login);
				this.login();
			}
		},
		components: {},
		computed: {},
	};
</script>

<style>
</style>
