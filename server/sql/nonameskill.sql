# Host: localhost  (Version 5.7.27-log)
# Date: 2021-09-28 17:14:04
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "extension"
#

DROP TABLE IF EXISTS `extension`;
CREATE TABLE `extension` (
  `extName` varchar(20) NOT NULL DEFAULT '',
  `author` varchar(50) DEFAULT NULL COMMENT '扩展作者',
  `version` varchar(50) DEFAULT NULL COMMENT '扩展版本',
  `intro` text COMMENT '扩展描述',
  `commit` text,
  PRIMARY KEY (`extName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='扩展';

#
# Data for table "extension"
#

INSERT INTO `extension` VALUES ('全能搜索','诗笺','1.5','【武将卡牌搜索器】的重命名版本,导入后会自动卸载【武将卡牌搜索器】','2021-08-20 更新内容：①可以按技能名搜索，支持搜索技能名或技能id。\n②搜索内容加上前缀可以只搜索某一类内容（武将 \"character:\" , 卡牌 \"card:\" , 技能名 \"skill:\"），例如，我只想搜索技能名为无双的技能，输入框里输入\"skill:无双\"即可\n2021-08-14 更新内容：兼容旧版本无名杀\n2021-08-02 更新内容：新增【武将称号】的显示，优化UI，可播放正常扩展的阵亡语音\n2021-07-31 更新内容：改用ES6写法，优化UI，可播放技能语音\n2021-05-06 更新内容：点击技能名可以查看技能代码（可复制内容）'),('合纵抗秦','烟雨墨染&苏婆玛丽奥','1.6','OL的合纵抗秦模式，现在由诗笺维护更新','2021-08-21 更新内容：\n\n芈月阵亡时其他角色移除【诱灭】的负面效果。\n\n张仪阵亡时其他角色移除【连横】的负面效果。\n\n将池中的刘备替换为界刘备。\n\n再次优化ai的选技能方式。\n\n赵高在场时，ai不会选择【恢拓】,【矢北】,【御策】。\n\n\n2021-08-17 更新内容：\n\n禁用【送丧】和【展骥】。\n\n新增【地狱匹配模式】，所有角色五阶。\n\n安装此扩展后关卡全开。\n\n\n2021-08-12 更新内容：\n\n选技能的时候增加提示。\n\n技能组合的数量增加。\n\n修复白起【伐楚】的bug，现在白起可废除宝物栏。\n\n增强白起【伐楚】。\n\n\n2021-08-11 更新内容：\n\n手杀ui开启的情况下不会自动隐藏游戏时间。\n\n增加秦军步兵【方阵】ai。\n\nai队友选技能时，考虑技能组合的情况\n\n（例如：雷击+洛神，诈降+标苦肉等）。\n\n\n2021-08-03 更新内容：\n\n再次修改赵高【改诏】的ai。\n\n再次修改赵高【害忠】的ai。\n\n修复赵姬出闪弹窗的问题。\n\n削弱吕不韦【拜相】。\n\n增加吕不韦【拜相】ai，觉醒之前视为卖血技能。\n\n\n2021-08-02 更新内容：\n\n增加白起【常胜】触发语音。\n\n修复秦军步兵【方阵】在不能使用【杀】时仍\n\n可发动的bug。\n\n增加芈月【隐退】翻面时的ai。\n\n增加芈月【太后】的ai。\n\n增加吕不韦【奇货】的ai。\n\n增加赵姬【善舞】的ai。\n\n增加赵高【改诏】的ai。\n\n修改赵高【害忠】的描述（濒死阶段不触发选择）\n\n，并增加ai。\n\n\n2021-07-16 更新内容：\n\n修复真龙长剑弹窗。\n\n修复张仪ai的bug。\n\n将赵高的改诏技能调整至和描述一致。\n\n修复二阶特权爆栈的问题。\n\n新增选技能的ai的智商和在扩展界面修改显示技能\n\n的总数量。\n\n将池新增： 黄承彦技能禁选缓释（ai是sb），\n\n可选明哲。'),('国战补充','我叫竹小二','Finished','★此扩展为国战模式专属扩展，内含7个特殊模式，32张专属卡牌，7个新君主，14个彩蛋包武将，12个神将，339个专属武将<br>★武将强度略高于官方权包，在十人局整体平衡<br>★有图片素材，配音齐全<br>★由于国战武将的特殊性，非安卓11的版本图片素材将会通过从Gitee自动在线下载的方式进行。若无法正常下载，请尝试按照扩展内置说明手动移动jpg素材文件。',NULL),('在线更新','诗笺','1.17','可以在线更新无名杀的扩展，比本体自带的在线更新稳定，更新失败会重新下载文件，基本不会出现问题。',NULL),('时空枢纽','帷幕','1.40','原创异世界幻想扩展，每个武将都有独特的背景故事和技能设计，扩展内含技能描述提示和地图系统，武将设计全部来自群成员投稿，欢迎大家下载。扩展交流群1075641665，接受武将设计，故事文案和配音招新',NULL),('秦时明月','呲牙哥','2.1.7.4','本扩展会根据大家的反馈进行修改和完善，最新版本已兼容新版无名杀。<br>特别感谢:@Sukincen @Cae <br> 以及\"轮回中的消逝者\"的支持与维护。<br>露头皮肤提供者：诗人李太白<br>最新资讯，请关注微信公众号\"无名杀扩展交流\"',NULL);

#
# Structure for table "extscore"
#

DROP TABLE IF EXISTS `extscore`;
CREATE TABLE `extscore` (
  `extName` varchar(20) NOT NULL DEFAULT '',
  `peopleNum` int(10) NOT NULL DEFAULT '0' COMMENT '评分人数',
  `totalScore` int(10) NOT NULL DEFAULT '0' COMMENT '总分',
  PRIMARY KEY (`extName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='扩展评分';

#
# Data for table "extscore"
#

INSERT INTO `extscore` VALUES ('全能搜索',2,10),('合纵抗秦',1,5),('国战补充',1,5),('在线更新',1,5),('时空枢纽',0,0),('秦时明月',1,5);

#
# Structure for table "registeremail"
#

DROP TABLE IF EXISTS `registeremail`;
CREATE TABLE `registeremail` (
  `email` char(255) NOT NULL DEFAULT '' COMMENT '注册邮箱',
  `code` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱验证码',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='注册邮箱时使用的表';

#
# Data for table "registeremail"
#


#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(25) DEFAULT NULL,
  `passWord` varchar(16) DEFAULT NULL,
  `access` varchar(255) NOT NULL DEFAULT 'normal' COMMENT '用户权限',
  `score` text,
  `email` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='登录用户';

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'root','123456','root','{\"全能搜索\":5}','2954700422@qq.com'),(2,'诗笺','123456','normal','{\"全能搜索\":5,\"在线更新\":5,\"国战补充\":5,\"合纵抗秦\":5,\"秦时明月\":5}','2954700422@qq.com'),(3,'寰宇星城','222222','normal',NULL,'472563655@qq.com');
