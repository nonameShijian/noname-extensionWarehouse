<template>
	<div class="myEditor">
		<div class="container" ref="container"></div>
	</div>
</template>
<script>
	/*import { setLocaleData } from 'monaco-editor-nls';
	import { zh_CN } from 'monaco-editor-nls/locale/zh-hans';
	setLocaleData(zh_CN);*/

	import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
	//js高亮
	import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
	//查找文本
	import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';

	//import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
	//import path from 'path';
	//console.log(monaco);

	/*import { fs, path, getFileList } from 'assets/api/api.js';

	let loop = (folders, files, name, ignore) => {
		for (let i = 0; i < files.length; i++) {
			if (!files[i].endsWith('.d.ts')) continue;
			//只读取.d.ts
			let filePath = ignore ? (name + '/' + files[i]) : (__dirname + '/' + name + '/' + files[i]);
			fs.readFile(filePath, {
				encoding: 'utf-8'
			}, (err, str) => {
				if (err) return console.log(err);
				monaco.languages.typescript.javascriptDefaults.addExtraLib(str, filePath);
			});
		}
		for (let i = 0; i < folders.length; i++) {
			getFileList(name + '/' + folders[i], (foldersx, filesx) => {
				loop(foldersx, filesx, name + '/' + folders[i], true);
			}, true);
		}
	};

	//读取assets/interface文件夹下的代码提示
	//自带了electron和cordova的提示

	getFileList(path.join('../assets/', 'interface'), (folders, files) => {
		loop(folders, files, path.join('../assets/', 'interface'), true);
	}, true);

	//读取node_modules/@type/node文件夹下的代码提示
	//打包后执行一下cnpm install @types/node

	getFileList(path.join('../../','node_modules/@types/node'), (folders, files) => {
		loop(folders, files, path.join('../../','node_modules/@types/node'), true);
	}, true);*/

	export default {
		props: {
			id: {
				type: String
			},
			codes: {
				type: String,
				default: function () {
					return '<div>请编辑javascript内容</div>';
				}
			},
			language: {
				type: String,
				default: function () {
					return 'javascript';
				}
			},
			editorOptions: {
				type: Object,
				default: function () {
					return {
						foldingStrategy: 'indentation', //代码可分小段折叠
						selectOnLineNumbers: true,
						roundedSelection: false,
						readOnly: false, //只读
						cursorStyle: 'line', //光标样式
						automaticLayout: true, //自动布局
						glyphMargin: true, //字形边缘
						useTabStops: false,
						fontSize: '27px', //字体大小
						tabSize: 4, //tab 缩进长度
						autoIndent: true //自动布局
					};
				}
			}
		},
		data() {
			return {
				theme: 'vs-dark',
				codesCopy: null //内容备份
			};
		},
		mounted() {
			setTimeout(this.initEditor, 50);
		},
		methods: {
			initEditor() {
				this.$refs.container.innerHTML = '';
				this.monacoEditor = monaco.editor.create(this.$refs.container, {
					value: this.codesCopy || this.codes,
					language: this.language,
					theme: this.theme,
					editorOptions: this.editorOptions
				});
				this.monacoEditor.editorId = this.id;
				this.$emit('onMounted', this.monacoEditor);
				this.monacoEditor.onDidChangeModelContent((event) => {
					this.codesCopy = this.monacoEditor.getValue();
					this.$emit('onCodeChange', {
						value: this.monacoEditor.getValue(),
						id: this.monacoEditor.editorId,
					}, event);
				});
				//编辑器随窗口自适应
				window.addEventListener('resize', () => {
					this.monacoEditor.layout();
				});
			}
		}
	};
</script>
<style scoped>
	.myEditor, .container {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
