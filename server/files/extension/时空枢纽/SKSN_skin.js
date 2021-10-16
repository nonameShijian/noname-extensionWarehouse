'use strict';
window.sksn_import(function(lib,game,ui,get,ai,_status){
    if(!lib.qhlypkg){
        lib.qhlypkg = [];
    }
    if(!lib.qhly_groupimage){
        lib.qhly_groupimage = {};
    }
    lib.qhly_groupimage['SK_qun'] = 'extension/时空枢纽/name_SK_qun.webp';
    lib.qhly_groupimage['SK_king'] = 'extension/时空枢纽/name_SK_king.webp';
    lib.qhly_groupimage['SK_sea'] = 'extension/时空枢纽/name_SK_sea.webp';
    lib.qhly_groupimage['SK_east'] = 'extension/时空枢纽/name_SK_east.webp';
    lib.qhly_groupimage['SK_demon'] = 'extension/时空枢纽/name_SK_demon.webp';
    lib.qhly_groupimage['SK_shen'] = 'extension/时空枢纽/name_SK_shen.webp';

    if(!lib.qhly_groupcolor){
        lib.qhly_groupcolor = {};
    }
    lib.qhly_groupcolor['SK_qun'] = "#778899";
    lib.qhly_groupcolor['SK_king'] = "#FFD700";
    lib.qhly_groupcolor['SK_sea'] = "#436EEE";
    lib.qhly_groupcolor['SK_east'] = "#FF0000";
    lib.qhly_groupcolor['SK_demon'] = "#CD1076";
    lib.qhly_groupcolor['SK_shen'] = "#FF7F00";

    var taici={
      /*'sksn_xxx':{
	        'sksn_xxx':{
	           order:1,
	           content:"<br>",
	        },
            'sksn_xxx':{
        		order:2,
        		content:"<br>",
        	},
        	'die':{
        		order:3,
                content:"",
            }
        },*/
        'sksn_yilian':{
            'sksn_xingyun':{
               order:1,
               content:"",
            },
            'sksn_sifu':{
                order:2,
                content:"你的眼睛，清澈无比。<br>伊莲喜欢主人，喵。",
            },
            'sksn_fuyun':{
                order:3,
                content:"花开花落，福运连连。<br>伊莲不是吉祥物。",
            },
            'sksn_qiyuan':{
                order:4,
                content:"伊莲希望世界和平。<br>主人，快许个愿吧。",
            },
            'die':{
                order:5,
                content:"活下去，你比伊莲更加重要。",
            }
        },
        'sksn_muguchen':{
            'sksn_qiulu':{
               order:1,
               content:"注意，我去了。<br>走啊。",
            },
            'sksn_paihuai':{
                order:2,
                content:"我把钥匙丢哪儿了？<br>我可没来过这儿。",
            },
            'die':{
                order:3,
                content:"又来了啊……",
            }
        },
        'sksn_lujinuo':{
            'sksn_bianmou':{
               order:1,
               content:"战争，从来都不是一成不变的。<br>要去分析，要学会思考。",
            },
            'sksn_libing':{
                order:2,
                content:"离兵之计，在于分合。<br>这是人民的战争。",
            },
            'die':{
                order:3,
                content:"为了自由，请踏着我的尸体前进吧……",
            }
        },
        'sksn_fuleicha':{
	        'sksn_shouji':{
	           order:1,
	           content:"乱世之中，风中残烛。<br>火焰与温暖，密不可分。",
	        },
            'sksn_zhizuo':{
        		order:2,
        		content:"一但下定决心，我就不会再迟疑。<br>危险动作，请勿模仿。",
        	},
        	'die':{
        		order:3,
                content:"待一切重归平静，我想带你去看看我的家。",
            }
        },
        'sksn_occupatee':{
            'sksn_xueren':{
                order:1,
                content:"杀戮，才是兽性的根本！<br>鲜血在呼唤我！",
            },
            'sksn_zhenyin':{
                order:2,
                content:"不够！不够！还远远不够！<br>别死的那么早啊，我还没玩够呢。",
            },
            'sksn_jianling':{
                order:3,
                content:"痛苦地哀嚎吧，这里没有人会听到你的声音的。<br>就凭你们，也敢到老子的地盘撒野吗？",
            },
            'sksn_huangyin':{
                order:4,
                content:"所有人都在向往“那片”酒池肉林，嘿嘿，我也不例外。<br>别提什么利益……只是老子的欲望罢了。",
            },
            'die':{
            	order:5,
                content:"嘿嘿，又有新玩具了……呃……怎、怎么会！？",
            }
        },
        'sksn_huaideqiao':{
            'sksn_yinjue':{
               order:1,
               content:"恩荫袭爵，天生贵族。<br>刁民们，我是你贵族爷爷。",
            },
            'sksn_ezheng':{
                order:2,
                content:"我抢来的东西，岂有还回去的道理？<br>这点钱，还不够我塞牙缝的。",
            },
            'die':{
                order:3,
                content:"你是个什么东西？",
            }
        },
        'sksn_lanbote':{
            'sksn_yanfan':{
               order:1,
               content:"以彼之剑，攻彼之躯。<br>来而不往非礼也。",
            },
            'sksn_jiansheng':{
                order:2,
                content:"高处不胜寒啊。<br>这，可不仅仅是个名号。",
            },
            'die':{
                order:3,
                content:"徒儿……终有一天，你也会明白的。",
            }
        },
        'sksn_maisike':{
        	'sksn_dingtie':{
                order:1,
                content:"孰贵孰贱，自是由我说了算。<br>人命，同样可以明码标价。",
        	},
        	'sksn_wuhuan':{
        		order:2,
        		content:"就凭你，也配跟我讨价还价？<br>自由？呵，那可贵着呢。",
        	},
        	'sksn_changfan':{
        		order:3,
        		content:"做好这件事，你就自由了。<br>这种废物，也就这点价值了。",
        	},
        	'die':{
        		order:4,
                content:"这世上怎会有……无价之物？",
            }
        },
        'sksn_dongfanghongdao':{
	        'sksn_chouyou':{
	           order:1,
	           content:"理想与现实之间，奔涌着一条鲜血汇聚的河流。<br>谁终将点燃闪电，必长久如云漂泊。",
	        },
            'sksn_yunshi':{
        		order:2,
        		content:"我于星夜之中，守望黎明。<br>我是现实中的人，幻想从来都与我无缘。",
        	},
        	'sksn_funeng':{
        		order:3,
        		content:"她是一滴雨露，润物无声。<br>漫天星斗，为殉道者而明。",
        	},
        	'die':{
        		order:4,
                content:"太阳，升起……",
            }
        },
        'sksn_feieryide':{
	        'sksn_chengE':{
	           order:1,
	           content:"你的审判，该开始了<br>无辜的亡魂在哭喊着，要你偿还。<br>不要以为你可以永远逃脱制裁。",
	        },
            'sksn_yejv':{
        		order:2,
        		content:"黑夜挡住了神的双眼，但挡不住他们的罪恶。<br>我闻到了鲜血的味道，费尔伊德，你也开始躁动了吗？<br>你怕的是什么？是我的正义还是你的罪恶？<br>如若神无力拯救世人，就让我来制裁罪恶。",
        	},
        	'sksn_tongnan':{
        		order:3,
        		content:"这里早已被神所遗弃，你能依靠的只有自己。<br>我只能救出你的肉体，你的灵魂还是得靠你自己夺回。<br>我要看到你的救赎，这是你最后的机会。<br>为什么永远不会有人能从他人身上吸取到教训？",
        	},
        	'die':{
        		order:4,
                content:"只要罪恶还未消亡，我便……永存……",
            }
        },
        'sksn_nuoya':{
	        'sksn_sanlei':{
	           order:1,
	           content:"雷电，高悬世人头顶的神明之剑。<br>真正的威力在于闪电，而无关惊雷。",
	        },
            'sksn_lianneng':{
        		order:2,
        		content:"以邪灵之躯，行正义之道。<br>一个伟大的灵魂，会强化思想和生命。",
        	},
        	'sksn_lingbao':{
        		order:3,
        		content:"击碎命运，重掌人生！<br>惊雷奋兮震万里，威凌宇宙动四海！",
        	},
        	'sksn_yexing':{
        		order:4,
                content:"在太阳中沉睡，从黑夜中醒来。<br>月夜如牢，围困迷失之魂。",
            },
            'die':{
        		order:5,
                content:"无惧黑夜之人……亦无惧死亡……",
            }
        },
        'sksn_pianxian':{
	        'sksn_bugua':{
	           order:1,
	           content:"星辰流转，万古如斯。<br>卜卦一念，歧路多生。",
	        },
            'sksn_mingyu':{
        		order:2,
        		content:"如烟似雾，非云非霞。<br>众生缄默，为君悲歌。",
        	},
        	'die':{
        		order:3,
                content:"鱼水之交，终归，陌路……",
            }
        },
        'sksn_ximengyaweili':{
	        'sksn_mijian':{
	           order:1,
	           content:"事已至此，将军是想登峰造极，还是引颈受戮？<br>我有一计，可使陛下无忧。",
	        },
            'sksn_suozhan':{
        		order:2,
        		content:"战争，到达和平的最终手段。<br>如果我们不选择战争，战争也会选择我们。",
        	},
        	'die':{
        		order:3,
        		content:"我仿佛……听到了胜利的呼声……但我听不到，她的声音……",
        	}
        },
        'sksn_deyingkemeng':{
	        'sksn_yingning':{
	           order:1,
	           content:"嗯？<br>嗯嗯嗯。",
            },
             'die':{
                order:2,
                content:"阿姆，吼吼……",
            }
	    },
        'sksn_guergewen':{
            'sksn_ankui':{
               order:1,
               content:"鸟翔之地，大洋之渊，我自能窥探之。<br>没有什么秘密，能瞒住我们的眼睛。",
            },
            'sksn_chuanmi':{
                order:2,
                content:"告诉你也无妨。<br>一言之意，千金难抵。",
            },
            'die':{
                order:3,
                content:"格温……请带我回家……",
            }
        },
        'sksn_xintianbuzhi':{
	        'sksn_yineng':{
	           order:1,
	           content:"谁终将声震人间，必长久深自缄默。<br>我能在群星之中，看到你的名字。<br>隔绝你我的不是现实的沟壑，而是理想的河流。<br>众星熠熠，为谁而明？<br>他是一束光，宣告黎明。<br>幻想之光，照亮现实之人。",
	        },
        	'die':{
        		order:2,
                content:"星光，不见了……",
            }
        }
    };
    lib.qhlypkg.push({
        isExt:true,//是否是扩展，一般填true
        filterCharacter:function(name){
            return name.indexOf('sksn_') == 0;//判断此ID的武将是否属于此皮肤包
        },
        characterNameTranslate:function(name){
            if(name == 'sksn_dongfanghongdao'){
                return "东方弘道";
            }
            if(name == 'sksn_yigenuosi'){
                return "伊格诺斯";
            }
            return get.translation(name);
        },
        hideSkin:function(name,skin){
            
        },
        characterTaici:function(name){
            return taici[name];
        },
        characterMp:function(name){
            return null;
        },
        originSkinInfo:function(name){
            return null;
        },
        characterInfo:function(name){

        },
        isLutou: lib.config.extension_时空枢纽_sksn_lutou,//判断是否当前启用露头，没有露头皮肤可不需要此项。
        prefix:'extension/时空枢纽/', //原皮前缀，标识原皮肤的位置。
        lutouPrefix:'extension/时空枢纽/lutou/',//露头原皮皮肤前缀，标识露头原皮皮肤的位置。
        skin:{
            standard:'extension/时空枢纽/skin/standard/',//可切换普通皮肤的前缀
            lutou:'extension/时空枢纽/skin/lutou/',//可切换露头皮肤的前缀
        },
        audioOrigin:'extension/时空枢纽/',//原技能配音位置
        audio:'extension/时空枢纽/skin/audio/',//切换皮肤后的技能配音位置
        replaceAvatarDestination:function(name,skin){

        },
        skininfo:{
            //skin taici
            'kangpasi1':{
                level:'精品',
                order:1,
                translation:'尘封往事',
                info:"是沉是浮，全凭本事",
                skill:{

                },
            },
            'yilian2':{
                level:'史诗',
                order:2,
                translation:'绿茵棒球',
                info:"请自由地挥洒汗水吧，主人喵",
                skill:{

                },
            },
            'eidehua1':{
                level:'精品',
                order:1,
                translation:'驱魔猎人',
                info:"圣剑驱散不了的，交由魔法来解决",
                skill:{

                },
            },
            'gaogeli1':{
                level:'精品',
                order:1,
                translation:'登山破袭',
                info:"激水之急，可以漂石",
                skill:{

                },
            },
            'lujinuo1':{
                level:'精品',
                order:1,
                translation:'牧场少女',
                info:"你想成为我的牧羊犬吗？",
                skill:{

                },
            },
            'yigenuosi1':{
                level:'精品',
                order:1,
                translation:'恶魔猎人',
                info:"圣光驱散不了的，交由圣剑来解决",
                skill:{

                },
            },
            'delike1':{
                level:'普通',
                order:1,
                translation:'黄金船长',
                info:"挖什么矿啊，黄金不都是抢来的吗？",
                skill:{

                },
            },
            'maisike1':{
                level:'史诗',
                order:1,
                translation:'罪恶帝王',
                info:"踩在我头上的人，必须死。",
                skill:{

                },
            },
            'anjielina1':{
                level:'精品',
                order:1,
                translation:'静谧森林',
                info:"夜晚的森林，危机与平静并存",
                skill:{

                },
            },
            'xiluwei1':{
                level:'精品',
                order:1,
                translation:'白皇后',
                info:"一直向前走的小卒，终会迎来她的蜕变",
                skill:{

                },
            },
            'deyingkemeng1':{
                level:'精品',
                order:1,
                translation:'黑帮教父',
                info:"社会你熊哥，人狠话不多",
                skill:{

                },
            },
            'guiyan2':{
                level:"#level_zhongyuan",
                order:2,
                translation:'恐怖南瓜',
                info:"“喂，你看到了吗？南瓜田里好像有什么东西？”",
                skill:{
                    'sksn_yanyu':{
	                    order:1,
	                    content:"我是来帮忙的。<br>一分耕耘，一分收获。",
	                },
                    'sksn_yinhuo':{
        		        order:2,
        		        content:"田野里有什么东西？。<br>怪物！",
        	        },
        	        'die':{
        		        order:3,
                        content:"它还没死...",
                    }
                },
            },
            'fuleicha1':{
                level:'史诗',
                order:1,
                translation:'雾言之盟',
                info:"战争得不到的东西，在谈判桌上也得不到",
                skill:{
                	'sksn_shouji':{
	                    order:1,
	                    content:"我们此刻的决定将会改变世界的轨迹。<br>我们只有实现通力合作，才能实现共同的理想。",
	                },
                    'sksn_zhizuo':{
        		        order:2,
        		        content:"砰，烧烧烧。<br>彻底燃烧吧。",
        	        },
        	        'die':{
        		        order:3,
                        content:"我愿倾尽我的所有，来换回你的笑颜。",
                    }
                },
            },
            'lanling1':{
                level:'精品',
                order:1,
                translation:'紫幻迷情',
                info:"千万不要沉溺在欲望的支配下哦",
                skill:{

                },
            },
            'muguchen1':{
                level:"史诗",
                order:1,
                translation:'踏星逐辰',
                info:"星月之下，众生微渺",
                skill:{
            'sksn_qiulu':{
               order:1,
               content:"世界如此宽广，前进的道路还很漫长。<br>愿人们都能在井底处窥见天光。",
            },
            'sksn_paihuai':{
                order:2,
                content:"满是荆棘的道路上，我看不清未来的方向。<br>我看到了人情冷暖，也知晓世态炎凉。",
            },
            'die':{
                order:3,
                content:"游子，终会有回家的一天……",
            }
                },
            },
            'wuruiya1':{
                level:'传说',
                order:1,
                translation:'未来纪元',
                info:"指令：终结",
                skill:{
                    'sksn_xianmou':{
	                order:1,
	                content:"求你了，不要，不要再……系统重启。<br>这不是我的双手。<br>我到底做了什么？",
	              },
                    'sksn_jieli':{
        		    order:2,
        		    content:"暂停，视网膜扫描开启。<br>别想逃跑。",
        	      },
        	        'sksn_yihua':{
        		    order:3,
        		    content:"目标锁定。<br>目标扫描，有机物，风险——低。",
        	      },
        	       'die':{
        		   order:4,
        		   content:"我想要……活下去……",
        	      }
                },
            },
            'gaozesi1':{
                level:'精品',
                order:1,
                translation:'粉红兔兔',
                info:"你看兔子像火锅，兔子看你像萝卜",
                skill:{

                },
            },
            'hailingji1':{
                level:'史诗',
                order:1,
                translation:'人鱼之泪',
                info:"神明，也会流泪吗？",
                skill:{

                },
            },
            'ferwork1':{
                level:'普通',
                order:1,
                translation:'冰封刺客',
                info:"冰冷的心，等待可以融化它的人",
                skill:{

                },
            },
            'ying1':{
                level:'普通',
                order:1,
                translation:'新月匿踪',
                info:"所谓杀手，必然要不走寻常之路",
                skill:{

                },
            },
            'tangning1':{
                level:'普通',
                order:1,
                translation:'逍遥快活',
                info:"三点几啦，饮茶先啦，做卵工啊做",
                skill:{

                },
            },
            'aidehua1':{
                level:'精品',
                order:1,
                translation:'侠盗佐罗',
                info:"我活着的唯一乐趣，就是看你们一个接一个地出洋相",
                skill:{

                },
            },
            'siji1':{
                level:'精品',
                order:1,
                translation:'铁面人',
                info:"“也许他没有看上去那么强....对吧？”",
                skill:{

                },
            },
            'yunru1':{
                level:'史诗',
                order:1,
                translation:'持枪械斗',
                info:"尊严只在剑锋之上，真理只在大炮的射程范围内",
                skill:{

                },
            },
            'wulamu1':{
                level:'普通',
                order:1,
                translation:'甘酒嗜音',
                info:"老子打了一辈子的仗，还不能享受享受吗？",
                skill:{

                },
            },
            'jianiao1':{
                level:'精品',
                order:1,
                translation:'怅然若失',
                info:"目标，貌似跟丢了...",
                skill:{

                },
            },
            'lanbote1':{
                level:'史诗',
                order:1,
                translation:'王者独尊',
                info:"王座之下，白骨累累",
                skill:{

                },
            },
            'feiluo1':{
                level:'普通',
                order:1,
                translation:'修行之途',
                info:"远行，是为了寻觅书籍中所领悟不到的真谛",
                skill:{

                },
            },
            'pianxian1':{
                level:'史诗',
                order:1,
                translation:'流光溢彩',
                info:"我能在你的眼睛中，看到星河",
                skill:{

                },
            },
            'saimiuer1':{
                level:'普通',
                order:1,
                translation:'圣光守护',
                info:"圣光啊，请再次庇佑这座城",
                skill:{

                },
            },
            'niepudun1':{
                level:'精品',
                order:1,
                translation:'海神本相',
                info:"大海无量。",
                skill:{

                },
            },
            'halidisi1':{
                level:'精品',
                order:1,
                translation:'灵魂禁锢',
                info:"死亡，是我对你们最后的慈悲",
                skill:{

                },
            },
            'jielaer1':{
                level:'史诗',
                order:1,
                translation:'诅咒之刃',
                info:"最后杀死的，是亲人",
                skill:{

                },
            },
            'qiongsi1':{
                level:'精品',
                order:1,
                translation:'雨夜行舟',
                info:"海盗从来不看天气，只看人气",
                skill:{

                },
            },
            'occupatee1':{
                level:'普通',
                order:1,
                translation:'魔王',
                info:"异变的尽头，是不可名状之物",
                skill:{

                },
            },
            'zage1':{
                level:'精品',
                order:1,
                translation:'贪狼将军',
                info:"狼群，需要一位强大的领袖",
                skill:{

                },
            },
            'clemtin1':{
                level:'史诗',
                order:1,
                translation:'少年英才',
                info:"爹，您要不现在就退了吧，反正这位子迟早是要传给我的~",
                skill:{

                },
            },
            'sigeruopi1':{
                level:'精品',
                order:1,
                translation:'曾经的我',
                info:"这是斯格教授没有变成熊之前的模样...",
                skill:{

                },
            },
            'ailuoyi1':{
                level:'普通',
                order:1,
                translation:'血色童年',
                info:"那把刀，依旧悬在心头",
                skill:{

                },
            },
            'guiyan1':{
                level:'史诗',
                order:1,
                translation:'地狱浮屠',
                info:"地狱空荡荡，魔鬼在人间",
                skill:{

                },
            },
            'yilian1':{
                level:'精品',
                order:1,
                translation:'战场猫娘',
                info:"主人，时代变了",
                skill:{

                },
            },
            'haimode1':{
                level:'精品',
                order:1,
                translation:'福岛鲨鱼',
                info:"当鲨雕片变成了现实......",
                skill:{

                },
            },
            'youliweisi1':{
                level:'精品',
                order:1,
                translation:'奶油小生',
                info:"年轻的时候，我还是挺帅气的。当然，年纪大了也一样",
                skill:{

                },
            },
            'youliweisi2':{
                level:'史诗',
                order:2,
                translation:'未来纪元',
                info:"指令：构建",
                skill:{

                },
            },
            'xintianbuzhi1':{
                level:'史诗',
                order:1,
                translation:'异能觉醒',
                info:"超能力，我才不稀罕呢",
                skill:{
                'sksn_yineng':{
	           order:1,
	           content:"谁终将声震人间，必长久深自缄默。<br>我能在群星之中，看到你的名字。<br>隔绝你我的不是现实的沟壑，而是理想的河流。<br>众星熠熠，为谁而明？<br>他是一束光，宣告黎明。<br>幻想之光，照亮现实之人。",
	        },
        	'die':{
        		order:2,
                content:"星光，不见了……",
            }
                },
            },
        }
    });

    if(!lib.qhlyMusic){
        lib.qhlyMusic = {};
    }
    var musics = {
        'riluo':'日落',
        'bingbian':'兵变',
        'zhengyi':'正义',
        'liesefen':'列瑟芬',
        'theAncientFear':'恐惧',
        'criminal':'罪犯',
    };
    for(var m in musics){
        var path = 'extension/时空枢纽/sksn_bgm_'+m+".mp3";
        lib.qhlyMusic[path] = {
            name:musics[m],
            path:path
        };
    }

    if(!lib.qhly_characterMusicMapper){
        lib.qhly_characterMusicMapper = [];
    }

    lib.qhly_characterMusicMapper.push(function(name){
        if(name.indexOf('sksn_') != 0)return;
        var map = {
            'sksn_gaogeli':'bingbian',
            'sksn_guiyan':'theAncientFear',
            'sksn_jiamiu':'theAncientFear',
            'sksn_saimiuer':'zhengyi',
        };
        if(!map[name]){
            map[name] = 'liesefen';
        }
        return 'extension/时空枢纽/sksn_bgm_'+map[name]+'.mp3';
    });

});