<template>
	<div id="extension">
		<el-container style="height: 100%; border: 1px solid #eee">
			<!-- 外层容器 -->
			<el-header>
				<el-breadcrumb separator-class="el-icon-arrow-right" style="cursor: pointer; font-size: 20px; line-height: 4; width: 70%;">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>扩展下载</el-breadcrumb-item>
				</el-breadcrumb>
				<avatar
					:userId="userId"
					:avatarUrl="avatarUrl"
					:showLogin="showLogin"
					:loginOut="loginOut">
				</avatar>
			</el-header>
			<!-- 主要区域容器 -->
			<el-main>
				<el-table
					v-loading="loading"
					element-loading-text="加载中"
					style="width: 100%; zoom: 1.2;"
					:data="extensions.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" class="demo-table-expand">
								<el-form-item label="扩展名称:">
									<span v-html="props.row.name"></span>
								</el-form-item>
								<el-form-item label="扩展作者:">
									<span v-html="props.row.author"></span>
								</el-form-item>
								<el-form-item label="扩展版本:">
									<span v-html="props.row.version"></span>
								</el-form-item>
								<el-form-item label="文件大小:">
									<span v-html="props.row.size"></span>
								</el-form-item>
								<el-form-item label="文件数量:">
									<span v-html="props.row.files.length"></span>
								</el-form-item>
								<el-form-item label="扩展评分:">
									<br>
									<span>评分人数：</span>
									<span v-text="props.row.extScore.peopleNum"></span>
									<br>
									<span>综合评分：</span>
									<el-rate v-if="props.row.extScore.peopleNum > 0" :value="props.row.extScore.score" disabled show-score
									 score-template="{value}分">
									</el-rate>
									<el-rate v-else :value="0" disabled show-score score-template="无评分">
									</el-rate>
								</el-form-item>
								<el-form-item label="扩展介绍:">
									<br>
									<span v-html="props.row.intro"></span>
								</el-form-item>
								<el-form-item label="历史更新:">
									<div v-if="props.row.commit" style="height: auto;">
										<br>
										<el-timeline>
										    <el-timeline-item
												v-for="(obj, index) in props.row.commit"
												:key="index"
												:timestamp="obj.timestamp"
												:type="checkType(index)"
												size="large"
												placement="top">
												<el-card>
													<h4 v-html="obj.content"></h4>
												</el-card>
										    </el-timeline-item>
										  </el-timeline>
									</div>
									<span v-else>暂无历史更新内容</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="扩展名称"></el-table-column>
					<el-table-column prop="author" label="扩展作者"></el-table-column>
					<el-table-column prop="version" label="扩展版本"></el-table-column>
					<el-table-column prop="size" label="文件大小"></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">
							<span>扩展评分</span>
						</template>
						<template slot-scope="scope">
							<el-button round size="mini" type="success" @click="handleScore(scope.$index, scope.row)">评分</el-button>
						</template>
					</el-table-column>
					<el-table-column align="center">
						<template slot="header">
							<el-input v-model="search" size="mini" placeholder="搜索扩展" clearable prefix-icon="el-icon-search"></el-input>
						</template>
						<template slot-scope="scope">
							<el-button round size="mini" type="danger" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-dialog
                    :title="scoreTitle"
                    :visible.sync="scoreVisible"
                    width="40%"
                    :before-close="handleScoreClose"
				    :show-close="false">
					<el-rate style="zoom: 1.5;" v-model="scoreValue" show-text>
					</el-rate>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="handleScoreClose">取 消</el-button>
						<el-button type="primary" @click="handleSetScoreClose">确 定</el-button>
					</span>
				</el-dialog>
				<login
					ref="login"
					:loginSuccess="loginSuccess"
				></login>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import getServer from '@/config.js';
	import login from 'components/login';
	import avatar from 'components/avatar';

	let extensions = [];

	export default {
		name: 'extension',
		components: {
			login,
			avatar
		},
		data() {
			return {
				loading: true,
				search: '', //搜索扩展名
				extensions, //扩展信息
				scoreVisible: false, //评分dialog是否显示
				scoreTitle: '', //评分dialog的标题
				scoreValue: null, //评分的值
				scoreData: null, //用户评分数据
				avatarUrl: '', //用户头像
				userId: '', //用户名
			};
		},
		methods: {
			checkType(index) {
				if (index == 0) return 'primary';
				return 'info';
			},
			errorHandler(e) {
				console.error(e);
			},
			handleScore(index, row) {
				//先判断是否登录
				if (!this.$refs['login'].isLogined) {
					this.showLogin();
				} else {
					this.scoreTitle = `给【${row.name}】扩展评分`;
					this.scoreVisible = true;
					if (this.scoreData[row.name]) {
						this.scoreValue = this.scoreData[row.name];
					} else {
						this.scoreValue = null;
					}
				}
			},
			handleScoreClose() {
				this.scoreTitle = '';
				this.scoreVisible = false;
			},
			handleSetScoreClose() {
				let rowName = this.scoreTitle.match(/【(\S*)】/)[1];
				this.handleScoreClose();
				if (this.scoreData[rowName] && this.scoreValue != this.scoreData[rowName]) {
					//有记录且评分与记录不同
					this.saveScore(rowName);
				} else if (!this.scoreData[rowName] && this.scoreValue) {
					//没有记录且评分了
					this.saveScore(rowName);
				}
			},
			saveScore(rowName) {
				//保存评分
				const data = this.scoreData[rowName];
				this.scoreData[rowName] = this.scoreValue;
				const {
					userName
				} = JSON.parse(sessionStorage.getItem('login'));
				fetch(getServer + '/saveScore?userName=' + userName, {
						method: 'POST',
						body: JSON.stringify(this.scoreData),
						headers: new Headers({
							'Content-Type': 'application/json'
						})
					})
					.then(res => res.json())
					.then(({
						message,
						resultData
					}) => {
						this.$notify({
							title: message,
							type: message.includes('成功') ? 'success' : 'error',
						});
						if (message.includes('失败')) {
							//回滚数据
							this.scoreData[rowName] = data;
						} else {
							for (let i = 0; i < this.extensions.length; i++) {
								let data = this.extensions[i];
								if (!resultData[data.name]) return;
								data.extScore.peopleNum = resultData[data.name][0];
								data.extScore.score = resultData[data.name][1] / data.extScore.peopleNum;
							}
						}
					}).catch(({
						message
					}) => {
						this.$notify({
							title: '请求后端数据时遇到错误',
							message,
							type: 'error'
						});
					});
			},
			showLogin() {
				this.$refs['login'].show();
			},
			loginSuccess({userId, avatarUrl, scoreData}) {
				this.userId = userId;
				this.scoreData = scoreData;
				this.avatarUrl = avatarUrl;
			},
			loginOut() {
				this.avatarUrl = '';
				this.$refs['login'].loginOut();
			},
			handleDownload(index, row) {
				this.$confirm(`确定要下载扩展【${row.name}】吗？`, '下载确认', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning',
					center: true
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)',
						text: '正在加载zip数据，请稍候',
					});
					fetch(encodeURI(getServer + '/download?fileURL=' + row.name))
						.then(res => res.blob())
						.then(blob => {
							loading.close();
							let url = window.URL.createObjectURL(blob);
							let link = document.createElement('a');
							link.style.display = 'none';
							link.href = url;
							link.setAttribute('download', row.name + '.zip');
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}).catch(({
							message
						}) => {
							loading.close();
							this.$notify({
								title: '请求后端数据时遇到错误',
								message,
								type: 'error'
							});
						});
				}).catch(() => console.log('取消下载'));
			},
		},
		mounted() {
			//setInterval(() => console.log(this.search), 1000);
			this.extensions = [];
			window.extension = {};
			fetch(getServer + '/catalog')
			.then(response => response.text())
			.then(text => eval(text))
			.then(() => {
				for (let v in window.extension) {
					window.extension[v]['name'] = v;
					this.extensions.push(window.extension[v]);
				}
			})
			.catch(e => {
				this.$notify({
					title: `扩展数据加载失败：${e}`,
					type: 'error'
				});
			}).finally(() => {
				this.loading = false;
				delete window.extension;
			});
		},
	};
</script>

<style>
	#extension {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.el-table {
		font-size: 20px !important;
	}

    .el-form.demo-table-expand.el-form--label-left {
        margin: 20px;
    }
</style>
