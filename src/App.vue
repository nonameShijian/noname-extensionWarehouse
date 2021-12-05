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
	html, body {
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

	.el-header , .noselect {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

    .tip {
		padding: 8px 16px;
		background-color: #ecf8ff;
		border-radius: 4px;
		border-left: 5px solid #50bfff;
		margin: 20px 0;
	}

	.tip p {
		font-size: 18px;
		color: #5e6d82;
		line-height: 1.5em;
	}

    .el-tabs__item {
        font-size: 20px !important;
    }

    label {
		color: red;
	}

    .box-card {
		width: 480px;
	}

    .clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

    .text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

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

    pre.ql-syntax {
        margin-top: 10px;
        margin-bottom: 10px;
	    background-color: #23241f;
	    color: #f8f8f2;
	    overflow: visible;
		font-size: 20px;
		font-family: '宋体';
	}
</style>
