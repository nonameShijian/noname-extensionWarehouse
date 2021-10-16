<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<el-header>
			<el-menu :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#409EFF">
			  <el-menu-item index="extension">扩展下载</el-menu-item>
			  <el-menu-item index="2" disabled>热门资讯</el-menu-item>
			  <el-menu-item index="groupNumber">QQ交流群</el-menu-item>
			  <el-menu-item index="downloadGame">游戏下载</el-menu-item>
			  <!-- <el-menu-item index="register">注册用户</el-menu-item> -->
			  <el-menu-item index="comment">论坛</el-menu-item>
			</el-menu>
		</el-header>
		<el-main>
			<el-carousel ref="carousel" :interval="4000" type="card" height="300px">
				<el-carousel-item v-for="item in 6" :key="item">
					<h3 class="medium">{{ item }}</h3>
				</el-carousel-item>
			</el-carousel>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {};
		},
		methods: {
			versionUpdate() {
				location.href = 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUwOTMwMjExNQ==&action=getalbum&album_id=1872742397336453125&uin=&key=&devicetype=Windows+10+x64&version=6303051e&lang=zh_CN&ascene=7&fontgear=2';
			},
			handleSelect(key, keyPath) {
				/*this.$router.push({
					path: key,
					params: { data: 'query' }
				});*/
			}
		}
	};
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	/*.text {
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
	}*/

	.el-menu--horizontal>.el-menu-item {
		font-size: 20px;
	}
</style>
