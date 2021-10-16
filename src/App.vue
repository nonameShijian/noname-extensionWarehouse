<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	};
</script>

<style>
	html,
	body {
		height: 100%;
		padding: 0;
		margin: 0;
	}

	::-webkit-scrollbar {
		display: none;
	}

	#app {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.el-header {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
