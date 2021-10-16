<template>
	<el-avatar
		style="position: fixed; top: 15px; right: 5%;"
		size="medium">
		<el-dropdown
			v-if="avatarUrl"
			style="width: 40px; height: 40px;">
			<img :src="avatarUrl" width="40" height="40"/>
			<el-dropdown-menu slot="dropdown">
			    <el-dropdown-item @click.native="getUserData">个人信息</el-dropdown-item>
				<el-dropdown-item @click.native="loginOut" divided>退出登录</el-dropdown-item>
			  </el-dropdown-menu>
		</el-dropdown>
		<span v-else style="color: blue;" @click="showLogin">登 录</span>
		<userData :userId="userId" :userData="userData" :userDataVisible="userDataVisible" :closeUserData="closeUserData"></userData>
	</el-avatar>
</template>

<script>
	//import Vue from 'vue';
	import getServer from '@/config.js';
	import userData from 'components/userData';
	export default {
		components: {
			userData
		},
		props: {
			userId: {
				type: String,
				required: true
			},
			avatarUrl: {
				type: String,
				required: true
			},
			showLogin: {
				type: Function,
				required: true
			},
			loginOut: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				userData: {},
				userDataVisible: false,
			};
		},
		methods: {
			getUserData() {
				const formData = new FormData();
				formData.append('userName', this.userId);
				formData.append('targetName', this.userId);
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
</style>
