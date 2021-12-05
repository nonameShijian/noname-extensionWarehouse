<template>
	<el-dialog
		title="用户信息"
		:show-close="false"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:append-to-body="true"
		:visible.sync="userDataVisible">
		<el-form :model="userData" ref="userData" :rules="rules">
			<el-form-item label="用户名称:" label-width="120px">
				<el-input v-model="userData.userName" autocomplete="off" disabled></el-input>
			</el-form-item>
			<el-form-item label="用户密码:" label-width="120px" prop="passWord" v-if="userData.passWord || showConfirm">
				<el-input id="userData-passWord" v-model="userData.passWord" autocomplete="off" readonly @input="onInput" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="用户邮箱:" label-width="120px" prop="email">
				<el-input id="userData-email" v-model="userData.email" autocomplete="off" readonly @input="onInput" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<!-- <el-form-item label="验证码:" label-width="120px" prop="verificationCode" v-if="showConfirm && changeInput">
				<el-input v-model="userData.verificationCode" autocomplete="off" placeholder="请输入验证码" style="width: 75%;"></el-input>
				<el-button type="primary" @click="gainVerificationCode">获取验证码</el-button>
			</el-form-item> -->
			<el-form-item label="用户头像:" label-width="120px" v-if="userData.userName">
				<img :src="require('users/' + userData.userName + '/avatar.jpg')" width="40" height="40" style="border-radius: 50%;" v-if="!userData.avatar" />
				<el-upload
					v-if="showConfirm"
					:action="uploadAction"
					ref="avatarUpload"
					class="upload-demo"
					:on-change="handleChange"
					:on-remove="handleRemove"
					:on-exceed="handleExceed"
					:auto-upload="false"
					:limit="1"
					accept=".jpg"
					list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传一个jpg文件，且不超过1MB</div>
				</el-upload>
			</el-form-item>
		</el-form>
		<div style="display: flex; justify-content: flex-end; align-items: center; padding-top: 10px;">
			<el-button type="primary" @click="setUserData" v-if="this.userId == userData.userName && !showConfirm">修改</el-button>
			<el-button type="primary" @click="modification" v-if="showConfirm && (changeInput || userData.avatar)">确认修改</el-button>
			<el-button type="primary" @click="onClose">关闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import getServer from '@/config.js';
	export default {
		props: {
			userId: {
				type: String,
				required: false
			},
			userData: {
				type: Object,
				required: true
			},
			userDataVisible: {
				type: Boolean,
				required: true
			},
			closeUserData: {
				type: Function,
				required: true
			},
		},
		data() {
			return {
				uploadAction: '', //上传地址
				showConfirm: false,
				changeInput: false,
				rules: {
					//表单验证
					passWord: [{
						required: true,
						message: '请输入用户密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 16,
						message: '长度在6-16个字符之间',
						trigger: 'blur'
					}],
					/*email: [{
						required: true,
						message: '请输入用户邮箱',
						trigger: 'blur',
					}, {
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: 'blur',
					}],
					verificationCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
					}, {
						min: 6,
						max: 6,
						message: '请输入6位验证码',
						trigger: 'blur',
					}],*/
				},
			};
		},
		methods: {
			setUserData() {
				this.showConfirm = true;
				let passWord = document.getElementById('userData-passWord');
				passWord && passWord.removeAttribute('readonly');
				let email = document.getElementById('userData-email');
				email && email.removeAttribute('readonly');
			},
			onInput() {
				this.changeInput = true;
			},
			/*gainVerificationCode() {
				//获取验证码
			},*/
			handleExceed() {
				this.$message({
					duration: 3000,
					type: 'error',
					message: '只能上传一个jpg文件',
				});
			},
			handleRemove() {
				this.userData.avatar = null;
			},
			handleChange(file) {
				if (file.status == 'ready') {
					//文件大小应该小于等于1MB
					const size = file.size / 1024 / 1024 <= 1;
					const last = file.name.substring(file.name.lastIndexOf('.') + 1);
					if (!size) {
						this.$message({
							duration: 3000,
							type: 'error',
							message: '只能上传小于等于1MB的jpg文件',
						});
					}
					if (last != 'jpg') {
						this.$message({
							duration: 3000,
							type: 'error',
							message: '必须上传jpg文件',
						});
					}
					if (!size || last != 'jpg') {
						this.userData.avatar = null;
					} else {
						this.userData.avatar = file.raw;
					}
				}
			},
			modification() {
				this.$refs.userData.validate(valid => {
					if (!valid) return;
					const formData = new FormData();
					formData.append('userName', this.userData.userName);
					if (this.changeInput) {
						formData.append('passWord', this.userData.passWord);
						formData.append('email', this.userData.email);
					}
					formData.append('avatar', this.userData.avatar);
					fetch(getServer + '/setUserData', {
						body: formData,
						method: 'POST',
					})
					.then(response => response.json())
					.then(({code, fields, avatar}) => {
						if (code == 200) {
							this.$message({
								duration: 3000,
								type: 'success',
								message: '用户信息修改成功',
							});
							this.onClose();
						} else {
							this.$message({
								duration: 3000,
								type: 'error',
								message: '用户信息修改失败',
							});
						}
					});
				});
			},
			onClose() {
				this.showConfirm = false;
				this.changeInput = false;
				let passWord = document.getElementById('userData-passWord');
				passWord && passWord.setAttribute('readonly', true);
				let email = document.getElementById('userData-email');
				email && email.setAttribute('readonly', true);
				this.closeUserData();
				this.$refs.userData.resetFields();
			},
		},
	};
</script>

<style>
</style>
