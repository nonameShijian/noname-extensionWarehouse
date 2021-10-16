<template>
	<el-container style="height: 100%;">
		<el-header>
			<el-breadcrumb separator-class="el-icon-arrow-right" style="cursor: pointer; font-size: 20px; line-height: 4; width: 70%;">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>QQ群集合</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<div class="warning">
				<p>注:官方为千人群，小群踢人比较频繁。如无特殊需要原因，加两三个群就好</p>
			</div>
			<el-table
				:data="showGroupData"
				style="width: 100%">
				<el-table-column align="center" prop="name" label="群名称"></el-table-column>
				<el-table-column align="center" prop="number" label="群号"></el-table-column>
				<el-table-column align="center">
					<template slot="header" slot-scope="scope">
						<i class="el-icon-document-copy">复制群号</i>
					</template>
					<template slot-scope="scope">
						<el-button style="padding: 3px 0" type="text" @click="copyGroupNumber(scope.row)">点击复制群号</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination
				style="text-align: center;"
				background
				layout="prev, pager, next"
				:current-page="currentPage"
				@current-change="currentChange"
				:total="groupData.length">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'groupNumber',
		data() {
			return {
				currentPage: 1, //初始页
				groupData: [{
					name: '无名杀官方群1',
					number: '335438250'
				}, {
					name: '无名杀官方群2',
					number: '348943983'
				}, {
					name: '无名杀官方群3',
					number: '459406548'
				}, {
					name: '无名杀官方群4',
					number: '618725633'
				}, {
					name: '无名杀官方群5',
					number: '518258435'
				}, {
					name: '无名杀官方群6',
					number: '536979725'
				}, {
					name: '无名杀官方群7',
					number: '1080968725'
				}, {
					name: '无名杀官方群8',
					number: '1038572358'
				}, {
					name: '无名杀官方群9',
					number: '292753743'
				}, {
					name: '无名杀官方群10',
					number: '784051469'
				}, {
					name: '无名杀贴吧群',
					number: '518803431'
				}, {
					name: '无名杀官方扩展群',
					number: '852740627'
				}, {
					name: '无名杀官方联机群',
					number: '1126389883'
				}, {
					name: '无名杀喜好者交流群',
					number: '852534040'
				}, {
					name: '无名杀喜好者交流群II',
					number: '292882513'
				}, {
					name: '无名杀喜好者交流群Ⅲ',
					number: '751651222'
				}, {
					name: '无名杀讨论群Ⅰ',
					number: '892852274'
				}, {
					name: '扩展制作群',
					number: '752360335'
				}, {
					name: '无名杀交流群',
					number: '1079533768'
				}, {
					name: '无名杀断发群',
					number: '967372650'
				}, {
					name: '无名杀扩展交流群1',
					number: '149662491'
				}, {
					name: '无名杀扩展交流群2',
					number: '1067257969'
				}, {
					name: '皮皮無名殺擴展群1',
					number: '797753307'
				}, {
					name: '皮皮無名殺擴展群2',
					number: '723057415'
				}, {
					name: '无名杀玩家群',
					number: '743219512'
				}, {
					name: '无名杀玩家Ⅱ群',
					number: '1074547346'
				}, {
					name: '无名杀玩家Ⅲ群',
					number: '1076250135'
				}, {
					name: '无名杀教程讨论群',
					number: '921036239'
				}, {
					name: '无名杀绘声素材交流',
					number: '343332101'
				}, {
					name: '无名杀扩展交流吧群',
					number: '530429908'
				}, {
					name: '无名杀养老群㈠',
					number: '777800535'
				}, {
					name: '无名杀养老群㈡',
					number: '1090848512'
				}, {
					name: '无名杀桃园群+高达宇宙扩展群',
					number: '961759212'
				}, {
					name: '无名杀扩展讨论',
					number: '984985268'
				}, {
					name: '水天一色武将设计/扩展交流群',
					number: '815451309'
				}, {
					name: '玄武江湖工作室',
					number: '522136249'
				}, {
					name: '无名杀金庸群侠传交流群',
					number: '697310426'
				}, {
					name: '无名杀高速决斗扩展群',
					number: '931549808'
				}, {
					name: '十周年UI（手杀样式）',
					number: '421537580'
				}, {
					name: '十周年UI（手杀样式）群Ⅱ',
					number: '897014342'
				}], //qq群数据
				showGroupData: [], //显示的qq群数据
			};
		},
		methods: {
			currentChange(page) {
				this.showGroupData = this.groupData.slice(page * 10 - 10, page * 10);
			},
			copyGroupNumber({name, number}) {
				navigator.clipboard.writeText(number).then(e => {
					if (e) {
						this.$notify({
							title: `${name}群号复制失败：${e}`,
							type: 'error',
						});
					} else {
						this.$notify({
							title: `${name}群号复制成功`,
							type: 'success',
						});
					}
				});
			},
		},
		mounted() {
			this.showGroupData = this.groupData.slice(this.currentPage * 10 - 10, this.currentPage * 10);
		}
	};
</script>

<style>
	.warning {
		padding: 8px 16px;
		background-color: #fff6f7;
		border-radius: 4px;
		border-left: 5px solid #fe6c6f;
		margin: 10px 0;
	}

	.warning p {
		font-size: 20px;
		color: #5e6d82;
		line-height: 1.5em;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
		margin: auto;
		margin-bottom: 18px;
	}
</style>
