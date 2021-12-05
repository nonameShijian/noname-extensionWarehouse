<template>
    <el-container style="height: 100%">
        <el-header>
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                style="cursor: pointer;font-size: 20px;line-height: 4; width: 70%;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item >
                <el-breadcrumb-item>代码教程</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-tabs
                ref='tabs'
                tab-position="left"
                style="height: 100%;"
                :lazy="true"
                @tab-click="tabClick"
                v-model="activeName">
                <el-tab-pane
                    v-for="(item, index) in dataList"
                    :key="index"
                    :index="index">
                    <span slot="label">
                        <i v-if="activeName == index" class="el-icon-edit"></i>
                        <span class="span-box">
                            <span>{{ item.title }}</span>
                            <el-tooltip
                                v-if="item.tip"
                                effect="dark"
                                :content="item.tip"
                                placement="bottom-start">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </span>
                    </span>
                    <div style="position: relative; width: 100%; height: 100%;">
                        <div class="previous-next-links noselect">
                            <div class="previous-design-link" v-if="dataList[index - 1]" @click="activeName = String(index - 1)">
                                 <i style="font-size:16px;" class="el-icon-back"></i>
                                <a href="javascript:void(0)">{{ dataList[index - 1].title }}</a>
                            </div>
                            <div class="next-design-link" v-if="dataList[index + 1]" @click="activeName = String(index + 1)">
                                <a href="javascript:void(0)">{{ dataList[index + 1].title }}</a>
                                <i style="font-size:16px;" class="el-icon-right"></i>
                            </div>
                        </div>
                        <div v-if="!item.hasEditor" v-html="highlight(item.content)"></div>
						<div v-else style="position: relative; width: 100%; height: 100%;">
							<div v-if="item.content" v-html="item.content"></div>
							<monaco-editor v-if="index == dataList.length - 1" :id="item.editorId" :language="'javascript'" :codes="item.codes" @onMounted="javascriptOnMounted" @onCodeChange="javascriptOnCodeChange" />
						</div>
                        <div v-if="item.hasFooter" class="previous-next-links noselect">
                            <div class="previous-design-link" v-if="dataList[index - 1]" @click="activeName = String(index - 1)">
                                 <i style="font-size:16px;" class="el-icon-back"></i>
                                <a href="javascript:void(0)">{{ dataList[index - 1].title }}</a>
                            </div>
                            <div class="next-design-link" v-if="dataList[index + 1]" @click="activeName = String(index + 1)">
                                <a href="javascript:void(0)">{{ dataList[index + 1].title }}</a>
                                <i style="font-size:16px;" class="el-icon-right"></i>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import monacoEditor from '@/components/monacoEditor';
import { dataList } from 'assets/help-dataList.js';
import HighlightJS from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
HighlightJS.configure({
	tabReplace: '	',
	useBR: true,
	languages: ['html', 'css', 'javaScript'],
});
export default {
    components: {
		monacoEditor
	},
    data() {
        return {
            activeName: '1',
            dataList,
        };
    },
    methods: {
        tabClick(active) {},
        highlight(text) {
            //text = text.replace(/^ {20}/gm, '');
            let str = '';
            let match = text.match(/<pre class="ql-syntax" spellcheck="false">[\s\S]*?<\/pre>/g);
            if (match != null) {
                let length = 0;
                for (let index = 0; index < match.length; index++) {
                    let result = match[index];
                    let begin = text.indexOf(result);
                    let skillBegin = begin + 42;
                    let skillEnd = begin + result.length - 6;
                    str += text.slice(length, skillBegin) + HighlightJS.highlightAuto(text.slice(skillBegin, skillEnd)).value + '</pre>';
                    length = begin + result.length;
                    if (index == match.length - 1) {
                        //最后一个加上后面的内容
                         str += text.slice(begin + result.length);
                    }
                }
            }
            return str || text;
        },
		javascriptOnMounted(editor) {},
		javascriptOnCodeChange({value, id}, event) {}
    },
    watch: {
        activeName() {
            //换教程页面后，回到顶部
            this.$refs.tabs.$el.lastChild.scrollTop = 0;
        }
    },
    mounted() {
		//console.log(dataList);
	}
};
</script>

<style>
.el-tabs--left .el-tabs__item.is-left {
    text-align: center;
}

.el-tabs__content {
    height: 100%;
    overflow: scroll scroll !important;
}

.el-tabs__content > .el-tab-pane {
	height: 100%;
}

.previous-next-links {
    line-height: 24px;
    overflow: hidden;
    padding: 10px 30px 10px 30px;
    background: #fbfbfb;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    color: #8590a6;
    font-size: 15px;
    border: 1px solid #e7eaf1;
    box-shadow: 0 1px 3px rgb(0 37 55 / 5%);
    box-sizing: border-box;
}

.previous-design-link {
    float: left;
}

.next-design-link {
    float: right;
}

.previous-next-links a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}

.previous-next-links i {
    cursor: pointer;
}
</style>
