<template>
	<div id="register" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
		<el-dialog
			title="注册noname-server用户"
			:visible="true"
			center
			:show-close="false"
			:close-on-click-modal="false">
		 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" name="ruleForm">
			 <el-form-item label="用户ID:" label-width="120px" prop="userName">
			 	<el-input v-model="ruleForm.userName" autocomplete="off" placeholder="请输入用户ID,可以是中文"></el-input>
			 </el-form-item>
			 <el-form-item label="用户密码:" label-width="120px" prop="passWord">
			 	<el-input type="password" v-model="ruleForm.passWord" autocomplete="off" placeholder="请输入用户密码"></el-input>
			 </el-form-item>
			 <el-form-item label="用户邮箱:" label-width="120px" prop="email">
			 	<el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入用户邮箱" style="width: 75%;"></el-input>
				<el-button type="primary" :disabled="VerificationButtonDisable" @click="gainVerificationCode">获取验证码</el-button>
			 </el-form-item>
			 <el-form-item label="验证码:" label-width="120px" prop="verificationCode">
			 	<el-input v-model="ruleForm.verificationCode" autocomplete="off" placeholder="请输入验证码"></el-input>
			 </el-form-item>
			 <el-form-item label="用户头像:" label-width="120px" prop="avatar">
				<el-upload
					:action="action"
					ref="avatarUpload"
					class="upload-demo"
					:on-change="handleChange"
					:on-remove="handleRemove"
					:on-exceed="handleExceed"
					:auto-upload="false"
					:file-list="fileList"
					:limit="1"
					accept=".jpg"
					list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1MB</div>
				</el-upload>
			 </el-form-item>
		 </el-form>
		 <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="resetFrom">重 置</el-button>
			<el-button type="primary" @click="registerToServer">确 定</el-button>
		 </div>
		 </el-dialog>
	</div>
</template>

<script>
	import getServer from '@/config.js';
	export default {
		name: 'extension',
		data() {
			return {
				action: '',
				VerificationButtonDisable: false, //获取验证码按钮的禁用
				fileList: [], //上传的文件数组
				ruleForm: {
					//登录表单
					userName: '',
					passWord: '',
					email: '',
					verificationCode: '',
					avatar: null,
				},
				rules: {
					//表单验证
					userName: [{
							required: true,
							message: '请输入用户名称',
							trigger: 'blur',
						}, {
							max: 10,
							message: '长度在10个字符以内',
							trigger: 'blur',
						}, {
							validator: (rule, name, callback) => {
								let reg = new RegExp('[\\\\/:*?\"<>|]');
								if (reg.test(name.trim())) {
									return callback(new Error());
								} else callback();
							},
							message: '用户名不能包含【\\/:*?\"<>|】这些非法字符',
							trigger: 'blur'
					}],
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
					email: [{
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
					}],
				}
			};
		},
		methods: {
			handleExceed() {
				this.$message({
					duration: 3000,
					type: 'error',
					message: '只能上传一个jpg文件',
				});
			},
			handleRemove() {
				this.ruleForm.avatar = null;
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
						this.fileList = [];
						this.ruleForm.avatar = null;
					} else {
						this.ruleForm.avatar = file.raw;
					}
				}
			},
			gainVerificationCode() {
				this.$refs.ruleForm.validateField('email', valid => {
					if (valid == true || valid == '') {
						//禁用按钮一分钟
						this.VerificationButtonDisable = true;
						let time = setTimeout(() => {
							this.VerificationButtonDisable = false;
						}, 60000);
						fetch(getServer + '/getMailCode', {
							body: JSON.stringify({
								email: this.ruleForm.email,
							}),
							method: 'POST',
							headers: new Headers({
								'Content-Type': 'application/json'
							})
						})
						.then(response => response.json())
						.then(({code, message}) => {
							if (code == 200) {
								this.$message({
									duration: 3000,
									type: 'success',
									message,
								});
							} else {
								this.VerificationButtonDisable = false;
								clearTimeout(time);
								this.$message({
									duration: 3000,
									type: 'error',
									message,
								});
							}
						});
					}
				});
			},
			registerToServer() {
				this.$refs.ruleForm.validate(valid => {
					if (!valid) return;
					//表单验证成功后,发送给后端判断用户名是否存在和验证码是否正确
					const formData = new FormData();
					formData.append('userName', this.ruleForm.userName);
					formData.append('passWord', this.ruleForm.passWord);
					formData.append('email', this.ruleForm.email);
					formData.append('verificationCode', this.ruleForm.verificationCode);
					formData.append('avatar', this.ruleForm.avatar);
					fetch(getServer + '/registerUser', {
						body: formData,
						method: 'POST',
					})
					.then(response => response.json())
					.then(({code, message}) => {
						if (code == 200) {
							//注册成功
							this.$message({
								duration: 3000,
								type: 'success',
								message,
							});
							sessionStorage.setItem('login', JSON.stringify({
								userName: this.ruleForm.userName,
								passWord: this.ruleForm.passWord,
							}));
							this.fileList = [];
							this.ruleForm.avatar = null;
							setTimeout(() => {
								this.$router.push('/');
							}, 2000);
						} else {
							this.$message({
								duration: 3000,
								type: 'error',
								message,
							});
						}
					})
					.catch(({message}) => {
						this.$message({
							duration: 3000,
							type: 'error',
							message,
						});
					});
				});
			},
			resetFrom() {
				this.fileList = [];
				this.$refs.ruleForm.resetFields();
			}
		},
	};
</script>

<style>
</style>
