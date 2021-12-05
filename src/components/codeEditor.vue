<!-- 使用 vue2-ace-editor 插件实现 -->
<template>
	<div class="codeEditBox">
		<editor
			v-model="code"
			@init="editorInit"
			@input='codeChange'
			lang="lang"
			:options="editorOptions"
			theme="theme"
		></editor>
	</div>
</template>

<script>
	import Editor from 'vue2-ace-editor'
	export default {
		name: 'CodeEditor',
		components: {
			Editor
		},
        props: {
            theme: {
                type: String,
                default: () => 'chrome',
            },
            lang: {
                type: String,
                default: () => 'javascript',
            },
            code: {
                type: String,
                default: () => '',
            }
        },
		data() {
			return {
				code: this.code,
				editorOptions: {
					// 设置代码编辑器的样式
					enableBasicAutocompletion: true, //启用基本自动完成
					enableSnippets: true, // 启用代码段
					enableLiveAutocompletion: true, //启用实时自动完成
					tabSize: 2, //标签大小
					fontSize: 14, //设置字号
					showPrintMargin: false //去除编辑器里的竖线
				}
			}
		},
		methods: {
			codeChange(val) {
                this.$emit('codeChange', val);
			},
			editorInit() {
                console.log(this);
				require('brace/theme/chrome')
				require('brace/ext/language_tools') //language extension prerequsite...
				//require('brace/mode/yaml')
				require('brace/mode/json')
				//require('brace/mode/less')
				require('brace/snippets/json')
				//require('brace/mode/lua')
				require('brace/snippets/lua')
				require('brace/mode/javascript')
				require('brace/snippets/javascript')
			}
		}
	}
</script>

<style scoped>
	.codeEditBox {
		width: 100%;
		height: 100%;
        position: absolute;
	}
</style>