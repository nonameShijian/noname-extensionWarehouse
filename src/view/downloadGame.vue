<template>
	<div id="downloadGame">
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-header>
				<el-breadcrumb separator-class="el-icon-arrow-right" style="cursor: pointer; font-size: 20px; line-height: 4; width: 70%;">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>游戏下载</el-breadcrumb-item>
				</el-breadcrumb>
			</el-header>
			<el-main>
				<el-tabs v-model="activeName">
					<el-tab-pane label="游戏介绍" name="first">
						<el-card>
							<div slot="header" class="clearfix">
								<span>游戏介绍</span>
							</div>
							<h4 v-html="introductionFirst"></h4>
						</el-card>
					</el-tab-pane>
					<el-tab-pane label="应用下载" name="second">
						<el-card>
							<div slot="header" class="clearfix">
								<span>应用下载</span>
							</div>
							<div class="tip">
								<p>无名杀应用和完整包/离线包的区别是，前者是一个软件，后者是前者中的数据压缩包</p>
								<p>无名杀应用用于游玩无名杀，而完整包是包含游戏所有武将，皮肤，音频，技能代码的游戏数据包，二者缺一不可，应用就好比一个容器来装入数据。</p>
							</div>
							<h4>Android平台</h4>
							<el-table :data="AndroidData" border style="width: 100%">
								<el-table-column align="center" prop="name" label="文件名称"></el-table-column>
								<el-table-column align="center" prop="size" label="文件大小"></el-table-column>
								<el-table-column align="center" prop="info" label="文件说明"></el-table-column>
								<el-table-column align="center" fixed="right">
									<template slot="header" slot-scope="scope">
										<i class="el-icon-download">下载</i>
									</template>
									<template slot-scope="scope">
										<el-link :underline="false" :href="scope.row.href" :download="scope.row.name + '.apk'" target="_blank">
											<el-button size="mini" type="danger" icon="el-icon-download">点击下载</el-button>
										</el-link>
									</template>
								</el-table-column>
							</el-table>
							<h4>IOS平台</h4>
							<el-table :data="IOSData" border style="width: 100%">
								<el-table-column align="center" prop="name" label="文件名称"></el-table-column>
								<el-table-column align="center" prop="size" label="文件大小"></el-table-column>
								<el-table-column align="center" prop="info" label="文件说明"></el-table-column>
								<el-table-column align="center" fixed="right">
									<template slot="header" slot-scope="scope">
										<i class="el-icon-download">下载</i>
									</template>
									<template slot-scope="scope">
										<el-link :underline="false" :href="scope.row.href" :download="scope.row.name + '.ipa'" target="_blank">
											<el-button size="mini" type="danger" icon="el-icon-download">点击下载</el-button>
										</el-link>
									</template>
								</el-table-column>
							</el-table>
							<h4>Windows平台</h4>
							<el-table :data="WindowsData" border style="width: 100%">
								<el-table-column align="center" prop="name" label="文件名称"></el-table-column>
								<el-table-column align="center" prop="size" label="文件大小"></el-table-column>
								<el-table-column align="center" prop="info" label="文件说明"></el-table-column>
								<el-table-column align="center" fixed="right">
									<template slot="header" slot-scope="scope">
										<i class="el-icon-download">下载</i>
									</template>
									<template slot-scope="scope">
										<el-link :underline="false" :href="scope.row.href" :download="scope.row.name + '.exe'" target="_blank">
											<el-button size="mini" type="danger" icon="el-icon-download">点击下载</el-button>
										</el-link>
									</template>
								</el-table-column>
							</el-table>
							<h4>Linux平台</h4>
							<el-table :data="LinuxData" border style="width: 100%">
								<el-table-column align="center" prop="name" label="文件名称"></el-table-column>
								<el-table-column align="center" prop="size" label="文件大小"></el-table-column>
								<el-table-column align="center" prop="info" label="文件说明"></el-table-column>
								<el-table-column align="center" fixed="right">
									<template slot="header" slot-scope="scope">
										<i class="el-icon-download">下载</i>
									</template>
									<template slot-scope="scope">
										<el-link :underline="false" :href="scope.row.href" :download="scope.row.name + '.zip'" target="_blank">
											<el-button size="mini" type="danger" icon="el-icon-download">点击下载</el-button>
										</el-link>
									</template>
								</el-table-column>
							</el-table>
							<h4>Mac平台</h4>
							<el-table :data="MacData" border style="width: 100%">
								<el-table-column align="center" prop="name" label="文件名称"></el-table-column>
								<el-table-column align="center" prop="size" label="文件大小"></el-table-column>
								<el-table-column align="center" prop="info" label="文件说明"></el-table-column>
								<el-table-column align="center" fixed="right">
									<template slot="header" slot-scope="scope">
										<i class="el-icon-download">下载</i>
									</template>
									<template slot-scope="scope">
										<el-link :underline="false" :href="scope.row.href" :download="scope.row.name + '.dmg'" target="_blank">
											<el-button size="mini" type="danger" icon="el-icon-download">点击下载</el-button>
										</el-link>
									</template>
								</el-table-column>
							</el-table>
						</el-card>
					</el-tab-pane>
					<el-tab-pane label="完整包" name="third">
						<el-card>
							<div slot="header" class="clearfix">
								<span>完整包</span>
							</div>
							<h4 v-html="introductionThird"></h4>
							<el-link :underline="false" :href="download_all" download="完整包.zip" target="_blank">
								<el-button type="danger" icon="el-icon-download">点击下载完整包</el-button>
							</el-link>
						</el-card>
					</el-tab-pane>
					<el-tab-pane label="离线包" name="fourth">
						<el-card>
							<div slot="header" class="clearfix">
								<span>离线包</span>
							</div>
							<h4 v-html="introductionFourth"></h4>
							<el-link :underline="false" :href="download_update" download="离线包.zip" target="_blank">
								<el-button type="danger" icon="el-icon-download">点击下载离线包</el-button>
							</el-link>
						</el-card>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import getServer from '@/config.js';
	export default {
		name: 'downloadGame',
		data() {
			return {
				activeName: 'first',
				download_all: 'https://hub.fastgit.org/libccy/noname/archive/refs/heads/master.zip',
				download_update: getServer + '/getApp/update/离线包.zip',
				AndroidData: [{
					name: '安卓由理版',
					size: '3.11 MB',
					info: '无名杀应用安卓端',
					href: getServer + '/getApp/app/无名杀由理版.apk',
				}, {
					name: '安卓由理兼容版',
					size: '23.4 MB',
					info: '与安卓由理版的区别是，兼容版适用于低版本安卓系统（内核版本低，不支持新的JavaScript特性等）',
					href: getServer + '/getApp/app/无名杀由理兼容版.apk',
				}, {
					name: '安卓玄武版',
					size: '12.5 MB',
					info: '与安卓由理版的区别是，玄武版突破了安卓11的限制，可以通过qq下载完压缩包后，直接导入到无名杀中',
					href: getServer + '/getApp/app/无名杀玄武版.apk',
				}],
				IOSData: [{
					name: '无名杀-ios',
					size: '4.21 MB',
					info: '无名杀应用苹果端',
					href: getServer + '/getApp/app/无名杀-ios.ipa',
				}],
				WindowsData: [{
					name: 'Windows 64位安装程序',
					size: '72.0 MB',
					info: '无名杀应用Windows 64位安装包(不适用于XP系统)，内置了【拖拽读取】，【在线更新】扩展',
					href: getServer + '/getApp/app/无名杀win64位安装程序.exe',
				}, {
					name: 'Windows 32位安装程序',
					size: '69.2 MB',
					info: '无名杀应用Windows 32位安装包(不适用于XP系统)， 功能和64位安装程序相同',
					href: getServer + '/getApp/app/无名杀win32位安装程序.exe',
				}],
				LinuxData: [{
					name: '无名杀-Linux',
					size: '87.9 MB',
					info: '无名杀应用Linux 64位压缩包，内置了【拖拽读取】，【在线更新】扩展。解压后执行"chmod 777 ./无名杀"修改文件权限，然后执行"./无名杀 --no-sandbox"运行无名杀',
					href: getServer + '/getApp/app/无名杀-linux-x64.zip',
				}],
				MacData: [{
					name: '无名杀-Mac',
					size: '49.8 MB',
					info: '无名杀应用Mac端',
					href: getServer + '/getApp/app/无名杀-mac.dmg',
				}],
				introductionFirst: `<label>游戏介绍</label>：无名杀是基于JS编程开发的一款单机弱联网类且自由度超高的卡牌策略游戏</br>
				<label>核心玩法</label>：类似三国杀及其同类卡牌游戏，通过拓展包可实现很多其他卡牌游戏没有的新机制</br>
				<label>客户端平台</label>：安卓、苹果、windows、mac以及支持web内核的浏览器版本</br>
				<label>玩法模式</label>：包含目前所有的三国杀模式，身份、明忠、国战、双将、对决挑战等等，除此之外还有自主创新的战棋、塔防等新模式，武将方面比官方略快一点，基本爆料一出下次更新就可以玩到，除此之外还包含被官方削弱之前的武将在怀旧包供大家体验，以及无名杀拓展作者制作的精良拓展和吧友自主设计的DIY武将，游戏内部支持玩家自主DIY，无论萌新大神都可以快速上手，游戏乱斗模式还支持玩家自主设计关卡对局等等，当然也少不了单机游戏的标配</br>
				<label>内置控制台</label>：单机模式下，对局内可通过控制台实现伤害、回复、摸牌、弃牌等效果</br></br>
				本游戏为贴吧大神水乎大佬于2013年底发布，从一开始的水乎老大孤军奋战到现在扩展作者多如牛毛，更新快速且稳定无不象征着咱们的游戏蒸蒸日上，绝大部分作者都是为爱发电，纯公益的发布自己的扩展不为盈利。用代码写扩展，设计自己的桌游世界。`,
				introductionThird: `<label>基本介绍</label>：并非单独完整的游戏。实为包含游戏“无名杀”运行所需全部素材的资源文件。资源主要包括：游戏运行所需全部代码、武将图片、武将皮肤、声音音效、界面图片、字体文件等。</br>
									<label>完整包用途</label>：</br>1.首次安装游戏“无名杀”后，使用“完整包”进行素材打底；</br>2.游戏崩溃后的重装；</br>3.也可用于游戏更新（但完整包过大，且涵盖的内容与上一版本大部分重复，造成大量的资源冗余。因此更推荐采用“离线包”进行更新）。</br>
									<label>PS</label>：“无名杀”游戏只需主代码即可正常运行，但若无武将图片、音效等素材文件，游戏会非常朴素且不美观，如无特殊需求，一般建议安装完整包以体验完整“无名杀”的游戏魅力。`,
				introductionFourth: `<label>基本介绍</label>：同“完整包”一样，离线包同样也是游戏“无名杀”运行所需的资源文件。但与“完整包”不同，“完整包”涵盖了所有资源，“离线包”则只涵盖本次因更新而产生的额外内容。资源主要包括：游戏运行所需全部代码，新武将的图片，新武将的音效等。</br>
									<label>离线包用途</label>：</br>1.用于游戏“无名杀”的更新（离线包通常文件较小，且涵盖的内容与上一版本极少重复，均为更新后的新内容，因此主要作用就是游戏更新）；</br>2.游戏崩溃后的重装；</br>3.也可用于首次安装游戏后正常进入游戏（但离线包所含的主要为游戏代码，几乎不含任何素材文件，只安装离线包进入游戏会导致游戏界面过于朴素且不美观）。</br>
									<label>PS</label>：“无名杀”游戏更新频率较高，但游戏内部的在线更新功能并不稳定，因此如有更新需求，请使用“离线包”覆盖的方法进行更新。<label>(【在线更新】扩展也可以进行游戏更新，并且防止了崩溃)</label>`,
			};
		},
		methods: {}
	};
</script>

<style>
	#downloadGame {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
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
	}

	label {
		color: red;
	}

	.el-tabs__item,
	.el-button,
	.el-table {
		font-size: 20px;
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
</style>
