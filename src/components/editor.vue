<template>
	<div>
		<VEmojiPicker v-show="showEmoji" @select="selectEmoji" />
		<quill-editor
			class="editor"
			v-model="content"
			ref="myQuillEditor"
			:options="editorOption"
			spellcheck="false"
			@change="onEditorChange($event)">
		</quill-editor>
	</div>
</template>
<script>
	import Quill from 'quill';
	import { quillEditor } from 'vue-quill-editor';

	import HighlightJS from 'highlight.js';
	import 'highlight.js/styles/vs2015.css';

	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';

	import ImageResize from 'quill-image-resize-module';
	HighlightJS.configure({
		tabReplace: '	',
		useBR: true,
		languages: ['html', 'css', 'javaScript'],
	});
	Quill.register('modules/imageResize', ImageResize, true); //添加

	const Link = Quill.import('formats/link');
	class MyLink extends Link {
	    static create(value) {
	    let node = super.create(value);
	    value = this.sanitize(value);
	    if (!value.startsWith('http')) {
	     value = 'http://' + value;
	    }
	    node.setAttribute('href', value);
	    return node;
	    }
	}
	Quill.register(MyLink, true);

	let Size = Quill.import('attributors/style/size');
	Size.whitelist = ['14px', '16px', '20px', '24px', '30px', '36px'];
	Quill.register(Size, true);
	//自定义字体类型
	let fonts = [
	  'SimSun',
	  'SimHei',
	  'Microsoft-YaHei',
	  'KaiTi',
	  'FangSong',
	  'Arial'
	];
	let Font = Quill.import('attributors/style/font');
	Font.whitelist = fonts;
	Quill.register(Font, true);

	let aligns = [
	  false,
	  'SimSun',
	  'SimHei',
	  'Microsoft-YaHei',
	  'KaiTi',
	  'FangSong',
	  'Arial'
	];
	let Align = Quill.import('attributors/style/align');
	Font.whitelist = aligns;
	Quill.register(Align, true);

	export default {
		name: 'editor',
		components: {
			quillEditor
		},
		props: {
			editorChange: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				showEmoji: false,
				content: null,
				editorOption: {
					placeholder: '请尽情发挥...',
					modules: {
						syntax: {
							highlight: text => HighlightJS.highlightAuto(text).value,
						},
						imageResize: { //添加
							displayStyles: { //添加
								backgroundColor: 'black',
								border: 'none',
								color: 'white'
							},
							modules: ['Resize', 'DisplaySize', 'Toolbar'] //添加
						},
						toolbar: {
							container: [
								['bold', 'italic', 'underline', 'strike'], //加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
								['blockquote', 'code-block'], //引用  代码块-----['blockquote', 'code-block']
								[{ header: 1 }, { header: 2 }], //1、2 级标题-----[{ header: 1 }, { header: 2 }]
								[{ list: 'ordered' }, { list: 'bullet' }], //有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
								[{ script: 'sub' }, { script: 'super' }], //上标/下标-----[{ script: 'sub' }, { script: 'super' }]
								[{ indent: '-1' }, { indent: '+1' }], //缩进-----[{ indent: '-1' }, { indent: '+1' }]
								//[{'direction': 'rtl'}], //文本方向-----[{'direction': 'rtl'}]
								[{ size: Size.whitelist }], //字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
								[{ header: [1, 2, 3, 4, 5, 6, false] }], //标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
								[{ color: [] }, { background: [] }], //字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
								[{ font: Font.whitelist }], //字体种类-----[{ font: [] }]
								[{ align: Align.whitelist }], //对齐方式-----[{ align: [] }]
								['clean'], //清除文本格式-----['clean']
								['link', 'image', 'video', 'emoji'] //链接、图片、视频-----['link', 'image', 'video']
							],
						},
						history: {
							delay: 1000,
							maxStack: 50,
							userOnly: false
						},
					}
				}
			};
		},
		methods: {
			onEditorChange(o) { //内容改变事件
				this.editorChange(o.html, o.text);
			},
			inputChange(html) {
				if (!html) html = '';
				this.content = html;
			},
			initTitle() {
				const titleConfig = [
				  { Choice: '.ql-insertMetric', title: '跳转配置' },
				  { Choice: '.ql-bold', title: '加粗' },
				  { Choice: '.ql-italic', title: '斜体' },
				  { Choice: '.ql-underline', title: '下划线' },
				  { Choice: '.ql-header', title: '段落格式' },
				  { Choice: '.ql-strike', title: '删除线' },
				  { Choice: '.ql-blockquote', title: '块引用' },
				  { Choice: '.ql-code', title: '插入代码' },
				  { Choice: '.ql-code-block', title: '插入代码段' },
				  { Choice: '.ql-font', title: '字体' },
				  { Choice: '.ql-size', title: '字体大小' },
				  { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
				  { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
				  { Choice: '.ql-direction', title: '文本方向' },
				  { Choice: '.ql-header[value="1"]', title: 'h1' },
				  { Choice: '.ql-header[value="2"]', title: 'h2' },
				  { Choice: '.ql-align', title: '对齐方式' },
				  { Choice: '.ql-color', title: '字体颜色' },
				  { Choice: '.ql-background', title: '背景颜色' },
				  { Choice: '.ql-image', title: '图像' },
				  { Choice: '.ql-video', title: '视频' },
				  { Choice: '.ql-link', title: '添加链接' },
				  { Choice: '.ql-formula', title: '插入公式' },
				  { Choice: '.ql-clean', title: '清除字体格式' },
				  { Choice: '.ql-script[value="sub"]', title: '下标' },
				  { Choice: '.ql-script[value="super"]', title: '上标' },
				  { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
				  { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
				  { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
				  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
				  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
				  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
				  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
				  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
				  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
				  { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
				  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
				  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
				  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
				  { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
				  { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
				  { Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
				  { Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
				  { Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' }
				];
				const editors = [...document.getElementsByClassName('ql-editor')];
				if (editors) {
					for (let editor of editors) {
						if (editor.dataset && editor.dataset.placeholder) editor.dataset.placeholder = '';
					}
				}
				for (let item of titleConfig) {
					let tip = document.querySelector('.quill-editor ' + item.Choice);
					if (!tip) continue;
					tip.setAttribute('title', item.title);
				}
			},
			selectEmoji(emoji) {
				console.log(emoji);
				//获取编辑器对象
				let quill = this.$refs.myQuillEditor.quill;
				//获取编辑器光标位置
				let index = quill.selection.savedRange.index;
				//插入文本至光标位置，
				quill.clipboard.dangerouslyPasteHTML(index, `<span>${emoji.data}</span>`);
				//重新计算index
				index += emoji.data.length;
				//移动光标至文本后面
				quill.setSelection(index);
			}
		},
		mounted() {
			this.initTitle();
			const emojiButtons = [...document.querySelectorAll('.ql-emoji')];
			for (let emoji of emojiButtons) {
				if (typeof emoji.onclick == 'function') continue;
				emoji.innerText = '😃';
				emoji.onclick = () => {
					this.showEmoji = !this.showEmoji;
				};
			}
		},
	};
</script>

<style>
	.ql-snow .ql-tooltip[data-mode=link]::before {
		content: "请输入链接地址:" !important;
	}
	.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
		border-right: 0px !important;
		content: '保存' !important;
		padding-right: 0px !important;
	}

	.ql-snow .ql-tooltip[data-mode=video]::before {
		content: "请输入视频地址:" !important;
	}

	.ql-snow .ql-picker.ql-header .ql-picker-label::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item::before {
		content: '文本' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
		content: '标题1' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
		content: '标题2' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
		content: '标题3' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
		content: '标题4' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
		content: '标题5' !important;
	}
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
		content: '标题6' !important;
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
	  font-family: "SimSun";
	  content: "宋体";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
	  font-family: "SimHei";
	  content: "黑体";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Microsoft-YaHei"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Microsoft-YaHei"]::before {
	  font-family: "Microsoft-YaHei";
	  content: "微软雅黑";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
	  font-family: "KaiTi";
	  content: "楷体";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
	  font-family: "FangSong";
	  content: "仿宋";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
	  font-family: "Arial";
	  content: "Arial";
	}

	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
	  font-family: "sans-serif";
	  content: "sans-serif";
	}

	.ql-font-SimSun {
	  font-family: "SimSun";
	}

	.ql-font-SimHei {
	  font-family: "SimHei";
	}

	.ql-font-Microsoft-YaHei {
	  font-family: "Microsoft-YaHei";
	}

	.ql-font-KaiTi {
	  font-family: "KaiTi";
	}

	.ql-font-FangSong {
	  font-family: "FangSong";
	}

	.ql-font-Arial {
	  font-family: "Arial";
	}

	.ql-font-sans-serif {
	  font-family: "sans-serif";
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
	  content: '14px';
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
	  content: '16px';
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
	  content: '20px';
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
	  content: '24px';
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='30px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='30px']::before {
	  content: '30px';
	}

	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='36px']::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before {
	  content: '36px';
	}

</style>
