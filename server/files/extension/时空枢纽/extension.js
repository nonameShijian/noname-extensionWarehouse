game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"时空枢纽",
editable:false,
content:function (config,pack){
/*
	BUFF模板、瞬发技按钮、时空地图和发现等框架已迁至precontent中
*/
//————露头切换————//
if(config.sksn_lutou){
    var func = HTMLDivElement.prototype.setBackgroundImage;
    HTMLDivElement.prototype.setBackgroundImage = function(name){
        if((this.classList.contains('avatar') || this.classList.contains('avatar2') || this.classList.contains('qh-image-lutou')) && name.indexOf('extension/时空枢纽/sksn_') == 0){
            name = name.replace('extension/时空枢纽/','extension/时空枢纽/lutou/');
        }
        func.apply(this,arguments);
    };	
}
 //—————武将评级——————//
 window['ui']=ui;
 lib.characterTitle.sksn_yilian='<img src='+lib.assetURL+"extension/时空枢纽/sksn_pj_xczs.png"+' width="100" height="40">';
    if(lib.rank){
        //lib.rank.rarity.common.addArray(['sksn_guiyan']);
        lib.rank.rarity.junk.addArray(['sksn_huaideqiao','sksn_zage','sksn_wulamu','sksn_wuruiya']);
        lib.rank.rarity.rare.addArray(['sksn_jiamiu','sksn_kaien','sksn_guergewen','sksn_haimode','sksn_youliweisi','sksn_lujinuo','sksn_nuodengsi','sksn_anjielina','sksn_ferwork','sksn_gaozesi','sksn_geleier','sksn_lanling','sksn_qiongsi','sksn_ailuoyi','sksn_aodinggelan','sksn_tiexin','sksn_halisen','sksn_gaogeli','sksn_ximengyaweili','sksn_nuoya']);
        lib.rank.rarity.epic.addArray(['sksn_niepudun','sksn_maisike','sksn_dongfanghongdao','sksn_sigeruopi','sksn_you','sksn_feieryide','sksn_muguchen','sksn_agebu','sksn_luoyiao','sksn_mogen','sksn_feiluo','sksn_suerjiade','sksn_jianiao','sksn_siji','sksn_saimiuer','sksn_lanbote','sksn_halidisi','sksn_eidehua','sksn_aidehua','sksn_yigenuosi','sksn_pianxian','sksn_clemtin','sksn_occupatee']);
        lib.rank.rarity.legend.addArray(['sksn_hualun','sksn_kangpasi','sksn_yunru','sksn_xintianbuzhi','sksn_ying','sksn_jielaer','sksn_yilian','sksn_xiluwei','sksn_fuleicha']);
    }
//————文件导入代码————//（摘取学习来源xw代码）
//
 game.sksnHasExtension = function(str){
        return lib.config.extensions && lib.config.extensions.contains(str) && lib.config['extension_'+str+'_enable'];
    };
 game.sksnHasExtensionInstalled = function(str){
        return lib.config.extensions && lib.config.extensions.contains(str);
    };
 window.sksnOpenLoading = function(){
        var dialog = ui.create.div('.sksn-loading',document.body);
        var text = ui.create.div('.sksn-loading-text',dialog);
        dialog.subViews = {text};
        return dialog;
    };
  window.sksnOpenDialog = function(title,icon,content){
        if(!title)title = ""; 
        if(!content)content = "";
        if(!window.sksnCurrentDialogs){
            window.sksnCurrentDialogs = [];
        }
        var dialog = ui.create.div('.sksn-dialog',document.body);
        window.sksnCurrentDialogs.push(dialog);
        var icondiv = ui.create.div('.sksn-dialog-icon',dialog);
        if(icon){
            icondiv.setBackgroundImage(icon);
        }else{
            icondiv.hide();
        }
        var text = ui.create.div('.sksn-dialog-text',dialog);
        text.innerHTML = content;
        if(lib.config.touchscreen){
            lib.setScroll(text);
        }
        var titlediv = ui.create.div('.sksn-dialog-title',dialog);
        titlediv.innerHTML = title;

        var close = ui.create.div('.sksn-dialog-close',dialog);
        close.addEventListener('click',function(){
            window.sksnCurrentDialogs.remove(dialog);
            dialog.delete();
        });
        return dialog;
    };
//卡牌导入
 game.sksnInstallhutongCard = function(){
        if(game.sksnHasExtension("十周年UI")){
            if(!game.getFileList){
                alert("初始化发生异常，请检查game.getFileList是否被异常修改。");
                return;
            }
            var loading = window.sksnOpenLoading();
            loading.subViews.text.innerHTML = "正在复制文件";
            game.getFileList("extension/时空枢纽/card/hutong",function(folder,files){
                if(!files){
                    alert("安装失败");
                    loading.delete();
                    return;
                }
                var count = 0;
                var max = files.length;
                var process = function(name){
                    count++;
                    loading.subViews.text.innerHTML ="（"+count+"/"+max+"）"+"正在复制文件"+name;
                };
                game.sksnFilesCopy("extension/时空枢纽/card/hutong",
                "extension/十周年UI/image/card",files,function(success){
                    loading.delete();
                    if(count == max){
                        alert("安装完成，重新启动游戏后卡牌生效。");
                        game.reload();
                    }else{
                        alert("安装完成，但有部分文件安装失败，可能是缺少相应资源，请安装时空枢纽完整包再次尝试。请重新启动游戏。");
                        game.reload();
                    }
                },null,process,true);
            });
         }else{
             alert('你没有安装十周年UI扩展！');
         }
    };
 game.sksnInstallyuanbanCard = function(){
        if(game.sksnHasExtension("十周年UI")){
            if(!game.getFileList){
                alert("初始化发生异常，请检查game.getFileList是否被异常修改。");
                return;
            }
            var loading = window.sksnOpenLoading();
            loading.subViews.text.innerHTML = "正在复制文件";
            game.getFileList("extension/时空枢纽/card/yuanban",function(folder,files){
                if(!files){
                    alert("安装失败");
                    loading.delete();
                    return;
                }
                var count = 0;
                var max = files.length;
                var process = function(name){
                    count++;
                    loading.subViews.text.innerHTML ="（"+count+"/"+max+"）"+"正在复制文件"+name;
                };
                game.sksnFilesCopy("extension/时空枢纽/card/yuanban",
                "extension/十周年UI/image/card",files,function(success){
                    loading.delete();
                    if(count == max){
                        alert("安装完成，重新启动游戏后卡牌生效。");
                        game.reload();
                    }else{
                        alert("安装完成，但有部分文件安装失败，可能是缺少相应资源，请安装时空枢纽完整包再次尝试。请重新启动游戏。");
                        game.reload();
                    }
                },null,process,true);
            });
         }else{
             alert('你没有安装十周年UI扩展！');
         }
    };
//导入
 game.sksnFilesCopy=function(from,to,files,callback){
	if(!game.readFile||!game.writeFile){
		if(callback) callback(false);
		return;
	}
	if(typeof files=='string'){
		var file=files;
		game.readFile(from+'/'+file,function(data){
			game.writeFile(data,to,file,function(){
				if(callback) callback(true);
			});
		},function(err){
			if(callback) callback(false);
		});
		return;
	}
	if(files.length==0){
		if(callback) callback(true);
		return;
	}
	var list=files.slice(0);
	var file=list.shift();
	game.sksnFilesCopy(from,to,file,function(success){
		if(!success){
			if(callback) callback(false);
			return;
		}
		game.sksnFilesCopy(from,to,list,function(success){
			if(callback) callback(success);
		})
	});
};
		//————图片导入————//
var SKSN_JPGFiles_copy_num={
	ailuoyi:3,
	camp:7
};//有新的文件需要导入请在这里修改数值或者建立新的项目
if(!lib.config.SKSN_JPGFiles_ailuoyi||lib.config.SKSN_JPGFiles_ailuoyi<SKSN_JPGFiles_copy_num.ailuoyi){
	game.sksnFilesCopy(
		"extension/时空枢纽",
		"image/character",
		['sksn_ailuoyi_hy.jpg','sksn_ailuoyi_xy.jpg','sksn_ailuoyi_ym.jpg'],
		function(success){
			if(success){
				game.saveConfig('SKSN_JPGFiles_ailuoyi',SKSN_JPGFiles_copy_num.ailuoyi);
			}
		}
	);
}
if(!lib.config.SKSN_WEBPFiles_camp||lib.config.SKSN_WEBPFiles_camp<SKSN_JPGFiles_copy_num.camp){
	game.sksnFilesCopy(
		"extension/时空枢纽",
		"extension/十周年UI/image/decoration",
		['name_SK_demon.webp','name_SK_east.webp','name_SK_king.webp','name_SK_qun.webp','name_SK_sea.webp','name_SK_shen.webp'],
		function(success){
			if(success){
				game.saveConfig('SKSN_WEBPFiles_camp',SKSN_JPGFiles_copy_num.camp);
			}
		}
	);
}
//伊凡帝勒颜色变化（摘录自概念武将）
var style=document.createElement('style');
	style.innerHTML="@keyframes sksn_yifandile{"
	for(var i=1;i<=20;i++){
		var rand1=Math.floor(Math.random()*255),rand2=Math.floor(Math.random()*255),rand3=Math.floor(Math.random()*255),rand4=Math.random();
		style.innerHTML+=i*5+'%{text-shadow: black 0 0 1px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 2px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 5px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 10px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 10px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 20px,rgba('+rand1+', '+rand2+', '+rand3+', 0.6) 0 0 20px}';
	}
	style.innerHTML+="}";
	document.head.appendChild(style);
 //————个性设置————//
//——————阵亡配音——————//
if(config.sksn_die_dub==true){
    lib.skill._sk_diedubs={
    trigger:{
        player:'dieBegin',
    },
    priority:-Infinity,
    forced:true,
    unique:true,
    content:function(){
       "step 0"
        var name=get.truename(player);
        var name2=player.name2;
        var tags=lib.character[name][4];
            if(name2) var tags=lib.character[name2][4];
            if(tags&&tags.length){
			for(var i=0;i<tags.length;i++){
				if(tags[i].indexOf('dieAudio:')==0){
					var audionum=tags[i].slice(9);
	    		}
	    	}
	    }
		if(audionum){
			audionum=+audionum;
			if(audionum>1) var num=get.rand(1,audionum);
				else var num=1;
				var audioname=name+num;		
			    game.playSK(audioname);
			}
		else{
			game.playAudio('..','extension','时空枢纽',name);
			event.KJ=true;
		}
		if(name2&&tags2&&tags2.length){
			event.tags2=tags2;
			event.name=name2;			
		}
		else{				
			setTimeout(function(){
				game.playSK(name2);
            },3000)
            event.finish();
		}					
		"step 1"
		var tags2=event.tags2;
		var name=event.name;
		for(var i=0;i<tags2.length;i++){
			if(tags2[i].indexOf('dieAudio:')==0){
				var audionum=tags2[i].slice(9);			
			}
		}
		if(audionum){
	    	audionum=+audionum;
			if(audionum>1) var num=get.rand(1,audionum);
			else var num=1;
			var audioname=name+num;		
			    if(event.KJ) game.playSK(audioname);
	    else{
		    setTimeout(function(){
		    	game.playSK(audioname);
                },3000)
		    }
		}
		else{
			setTimeout(function(){
				game.playSK(name);
            },3000)
		}
   	},
}
}
    game.playSK= function(fn, dir, sex) {
			if (lib.config.background_speak) {
				if (dir && sex)
					game.playAudio(dir, sex, fn);
				else if (dir)
					game.playAudio(dir, fn);
				else
					game.playAudio('..', 'extension', '时空枢纽', fn);
			}
		}
		//get函数
    var pack={
        get:{
            truename:function(pe){
            if(get.itemtype(pe)=="player"){
            if(get.mode()=="guozhan") return pe.name1;
            else return pe.name;
            }
        else return;
        }
    }
}
    for(var i in pack.get) get[i]=pack.get[i];
    

//彩色描述
    if(config.sksn_info_color==true){
    lib.skill._sk_color_info={
        trigger:{
            global:["gameDrawAfter","phaseBefore"],
        },
        forced:true,
        priority:-1,
        content:function(){
            'step 0'
            for(var x=0;x<player.skills.length;x++){
            if(lib.translate[player.skills[x]+'_info']){
            if(lib.translate[player.skills[x]+'_info'].indexOf('锁定技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/锁定技/g,'<span class="yellowtext"><b>锁定技</b></span>');       
            } 

			if(lib.translate[player.skills[x]+'_info'].indexOf('限定技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/限定技/g,'<span class="yellowtext"><b>限定技</b></span>');       
            }

			if(lib.translate[player.skills[x]+'_info'].indexOf('觉醒技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/觉醒技/g,'<span class="greentext"><b>觉醒技</b></span>');        
            }

			if(lib.translate[player.skills[x]+'_info'].indexOf('转换技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/转换技/g,'<span class="bluetext">转换技</span>');                
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('阵法技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/阵法技/g,'<span class="bluetext">阵法技</span>');                
            }

			if(lib.translate[player.skills[x]+'_info'].indexOf('主公技')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/主公技/g,'<span class="firetext"><b>主公技</b></span>');          
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('回复')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/回复/g,'<span style="color:#87CEEB">回复</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('恢复')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/恢复/g,'<span style="color:#87CEEB">恢复</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('伤害')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/伤害/g,'<span style="color:#FFC0CB">伤害</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('翻面')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/翻面/g,'<span style="color:#9370DB">翻面</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('获得技能')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/获得技能/g,'<span style="color:#FF1493">获得技能</span>');         
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('失去技能')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/失去技能/g,'<span style="color:#6A5ACD">失去技能</span>');         
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('废除')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/废除/g,'<span style="color:#708090">废除</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('视为')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/视为/g,'<span style="color:#00FF7F">视为</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('使用')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/使用/g,'<span style="color:#00FFFF">使用</span>');               
            }

            if(lib.translate[player.skills[x]+'_info'].indexOf('状态')!=-1){
            lib.translate[player.skills[x]+'_info']=lib.translate[player.skills[x]+'_info'].replace(/状态/g,'<span style="color:#E0FFFF">状态</span>');               
            }
//————————————————————//
                }
            }
        }
    }
}
//————定义背景————//
//背景音乐
    if(config.sksn_music==1){//随机
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){ 
                var n=[1,2,3,4,5,6].randomGet();
                if(n==1) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_riluo.mp3'; 
                if(n==2) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_bingbian.mp3';    
                if(n==3) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_zhengyi.mp3';     
                if(n==4) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_liesefen.mp3';
                if(n==5) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_theAncientFear.mp3'; 
                if(n==6) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_criminal.mp3'; 
                ui.backgroundMusic.addEventListener('ended',function(){
                setTimeout(function(){ 
                    var n=[1,2,3,4,5,6].randomGet();
                    if(n==1) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_riluo.mp3'; 
                    if(n==2) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_bingbian.mp3';    
                    if(n==3) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_zhengyi.mp3';     
                    if(n==4) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_liesefen.mp3';
                    if(n==5) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_theAncientFear.mp3'; 
                    if(n==6) ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_criminal.mp3'; 
                    },2000);
                });
            },       
        }  
    }
    if(config.sksn_music==2){//日落
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_riluo.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }
    if(config.sksn_music==3){//兵变
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_bingbian.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }
    if(config.sksn_music==4){//正义
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_zhengyi.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }
    if(config.sksn_music==5){//列瑟芬
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_liesefen.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }
    if(config.sksn_music==6){//恐惧
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_theAncientFear.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }
    if(config.sksn_music==7){//罪犯
        lib.skill._sksn_bgmsuiji={
            trigger:{ 
                global:"gameStart",
            }, 
            forced:true, 
            nobracket:true, 
            priority:-9992,
            content:function (){  
                var n=[1].randomGet();
                if(n==1){  
                    ui.backgroundMusic.src=lib.assetURL+'extension/时空枢纽/sksn_bgm_criminal.mp3'; 
                }  
                ui.backgroundMusic.loop=true;           
            },       
        }  
    }

//专属背景
    if(config.sksn_picture=="1"){//随机
        lib.skill._sksnPicSuiji={
            trigger:{
                global:'gameStart',
            },
            direct:true,
            nobracket:true, 
            priority:-9991,
            content:function(config,pack){
                var n=[1,2,3,4].randomGet();
                    if(n==1) game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture1.jpg");
                    if(n==2) game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture2.jpg");
                    if(n==3) game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture3.jpg");
                    if(n==4) game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture4.jpg");
            },
        }
    }
    if(config.sksn_picture=="2"){//夜幕
        lib.skill._sksnPicYmdh={
            trigger:{
                global:'gameStart',
            },
            direct:true,
            nobracket:true, 
            priority:-9991,
            content:function(config,pack){
                game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture1.jpg");
            },
        }
    }
    if(config.sksn_picture=="3"){//枫桥
        lib.skill._sksnPicFqyb={
            trigger:{
                global:'gameStart',
            },
            direct:true,
            priority:-9991,
            content:function(config,pack){
                    game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture2.jpg");
            },
        }
    }
    if(config.sksn_picture=="4"){//极冰
        lib.skill._sksnPicJbha={
            trigger:{
                global:'gameStart',
            },
            direct:true,
            nobracket:true, 
            priority:-9991,
            content:function(config,pack){
                    game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture3.jpg");
            },
        }
    } 
    if(config.sksn_picture=="5"){//魔窟
        lib.skill._sksnPicMkzc={
            trigger:{
                global:'gameStart',
            },
            direct:true,
            nobracket:true, 
            priority:-9991,
            content:function(config,pack){
                    game.broadcastAll()+ui.background.setBackgroundImage("extension/时空枢纽/picture4.jpg");
            },
        }
    } 
//——————高级选项——————//
//更新日志
lib.extensionMenu.extension_时空枢纽.SKSN_gengxinrizhiA={
			"name":"<b><li>【更新日志】",
			"clear":true,
		};
	lib.extensionMenu.extension_时空枢纽.SKSN_gengxinrizhi={
			//"name":"<span style='text-decoration: underline'>查看更新日志</span>",
			"name":"<li><font color=silver>[点击查看日志]</font>",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_gengxinrizhi();
				//alert('网络链接失败');
			},
		};	
	lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_gengxinrizhi',function(){});
	
	//分界线2
lib.extensionMenu.extension_时空枢纽.SKSN_xianA2={
			"name":"———————————————",
			"clear":true,
		};
	
	
//角色图鉴
lib.extensionMenu.extension_时空枢纽.SKSN_tujianA={
			"name":"<b><li>【角色图鉴】",
			"clear":true,
		};
		
lib.extensionMenu.extension_时空枢纽.SKSN_tujianB={
			"name":"<li><font color=silver>[点击查看图鉴]</font>",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_tujian();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_tujian',function(){});		
		

//分界线3
lib.extensionMenu.extension_时空枢纽.SKSN_xianA3={
			"name":"———————————————",
			"clear":true,
		};


//背景故事
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS={
			"name":"<b><li>【背景故事】</b>",
			"clear":true,
		};
		
//前言
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS_A={
			"name":"<li>[<font color=orange>前言·设定</font>]",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_BJGS_A();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_BJGS_A',function(){});
		
		
//第一章
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS_B={
			"name":"<li>[<font color=red>第一章·帝都</font>]",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_BJGS_B();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_BJGS_B',function(){});
		

//第二章
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS_C={
			"name":"<li>[<font color=cyan>第二章·海洋</font>]",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_BJGS_C();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_BJGS_C',function(){});
		
		
//第三章
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS_D={
			"name":"<li>[<font color=pink>第三章·东极</font>]",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_BJGS_D();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_BJGS_D',function(){});


//第四章
lib.extensionMenu.extension_时空枢纽.SKSN_BJGS_E={
			"name":"<li>[<font color=orange>第四章·桎梏</font>]",
			"clear":true,
			"onclick":function(){
				ui.click.configMenu();
				game.sksn_showSKSN_BJGS_E();				
			},
		};
		lib.init.js(lib.assetURL+'extension/时空枢纽','SKSN_BJGS_E',function(){});
		
		
//分界线4
lib.extensionMenu.extension_时空枢纽.SKSN_xianA4={
			"name":"———————————————",
			"clear":true,
		};
lib.extensionMenu.extension_时空枢纽.SKSN_KPZY={
			"name":"<b><li>【卡牌资源】</b>",
			"clear":true,
		};		
//卡牌安装
lib.extensionMenu['extension_时空枢纽']['sksnhutong'] = {
        clear: true,
        name: '<b>点击安装OL互通版卡牌资源<b>',
        onclick: function(item) {          
             if(game.sksnHasExtension("十周年UI")){
                 game.sksnInstallhutongCard();
             }else{
                 alert('你没有安装十周年UI扩展！');
             }
        },
    };	
lib.extensionMenu['extension_时空枢纽']['sksnyuanban'] = {
        clear: true,
        name: '<b>点击安装十周年原版卡牌资源<b>',
        onclick: function(item) {          
             if(game.sksnHasExtension("十周年UI")){
                 game.sksnInstallyuanbanCard();
             }else{
                 alert('你没有安装十周年UI扩展！');
             }
        },
    };	
		
//分界线5
lib.extensionMenu.extension_时空枢纽.SKSN_xianA5={
			"name":"———————————————",
			"clear":true,
		};
//地图
lib.extensionMenu.extension_时空枢纽.SKSN_ditu1={
			"name":"<b><li>【世界地图】",
			"clear":true,
		};
		

//整体地图
lib.extensionMenu.extension_时空枢纽.SKSN_map_A={
			"name":"<li><font color=cyan>[点击进入地图]</font>",
			"clear":true,
			onclick:function(){
		game.SKNQ_DITU();
	},
	clear:true,};
				

//分界线5
lib.extensionMenu.extension_时空枢纽.SKSN_xianA5={
			"name":"———————————————",
			"clear":true,
		};
		
//————地图系统————//
game.SKNQ_DITU=function(){
	var 中部=['sksn_jianiao','sksn_ailuoyi','sksn_aidehua','sksn_ying','sksn_saimiuer','sksn_lanbote','sksn_aodinggelan','sksn_fuleicha','sksn_yigenuosi','sksn_eidehua','sksn_luoyiao','sksn_feieryide','sksn_youliweisi','sksn_sigeruopi','sksn_hualun'],
	西部=['sksn_ferwork','sksn_anjielina','sksn_nuodengsi','sksn_muguchen'],
	时空圣殿=['sksn_jielaer','sksn_halidisi','sksn_niepudun'],
	海之都=['sksn_xintianbuzhi','sksn_qiongsi','sksn_kaien','sksn_siji','sksn_hailingji','sksn_clemtin','sksn_mogen','sksn_tangning','sksn_deyingkemeng','sksn_delike','sksn_you','sksn_haimode','sksn_xiayi','sksn_xieyaoxiafeiji','sksn_kangpasi'],
	荒芜疆土=['sksn_guergewen'],
	东极=['sksn_tiexin','sksn_guiyan','sksn_wulamu','sksn_agebu','sksn_halisen','sksn_pianxian','sksn_gaogeli','sksn_ximengyaweili','sksn_nuoya','sksn_huaideqiao','sksn_yilian','sksn_feiluo','sksn_suerjiade','sksn_geleier','sksn_xiluwei','sksn_yunru','sksn_lujinuo','sksn_maisike','sksn_dongfanghongdao'],
	魔能之地=['sksn_lanling','sksn_jiamiu','sksn_occupatee','sksn_wuruiya','sksn_gaozesi','sksn_zage'];
	
	var 地域背景={
		时空圣殿:"<b>时空圣殿：</b><br><li>维护着时空的平衡，同时降下神谕指引各个世界的凡人，一共拥有八位神明以及一位时空圣殿最高统治者神王路西法。但是似乎自从时空出现裂隙，异世界与主世界重合之后，整个圣殿便被一丝恐怖的气息笼罩着",
		中部:"<b>中部：</b><br><li>盘踞着最大的封建制王国路西费尔王国。威廉四世掌握着这个早已腐朽的帝国的所有权力。但是由于时空裂隙将主世界的人传送至此，存活下来的主世界之人组成雾言联盟，试图推翻这个腐朽的王国。这里临近着时空圣殿的实际位置，国人也全都信仰着时空圣殿(即所谓路西法教)，因此神谕在此地出现最多",
		海之都:"<b>海之都：</b><br><li>南部沿海王国尼吉拉斯王国的王都。因为海上交通便利，所以这里便是东西部交流的中心，中心城市早早步入了近代化，最大的城镇东港被誉为机械之都，商贸极为发达。平民们大多信仰着路西法教的分支一-海神教，祈祷着海神大人为他们在海上提供庇护。但是因为王国边缘地带时常有魔物出现，所以几乎没有处地人妄图进入尼吉拉斯王国的核心。沿着尼吉拉斯航线可到达东方的大陆，往南则是一片汪洋",
		东极:"<b>东极：</b><br><li>整个东大陆唯一政权，在东极建国前，整个东极大陆曾被七位领主瓜分。东极幅员辽阔，北通贡冈沙漠，南连阿港海湾，东部飞云渡抵御魔能之地的侵蚀，西部则是一条宽广的天水圣河，国家体制相较西方落后一些，仍实行着落后的奴隶制民主，但是信仰却与西部的路西费尔与尼吉拉斯出奇的一致，在首都西尔斯城的长明殿是东大陆的宗教中心。由于东极天堑的存在，与海洋世界的关联甚少，唯有南部被称为“天堑之路”的海滨城市阿弗斯赫特与西部的尼吉拉斯王国进行着商贸往来。但是城主乌拉姆似乎正在暗处蠢蠢欲动",
		西部:"<b>西部：</b><br><li>圣堂教廷的所在地，最西部则是其附属王国瓦伦丁尼安。教廷拥有着世俗界的最大的权力，能够轻易干涉各国的内政。但是现在的教皇克雷芒三世沉迷于神学，甚至于西边接壤的瓦伦丁尼安的内政都不过多干预。瓦伦丁尼安实行二权分立，权力由执政官、元老院分别掌管一部分。内部形势稳定，信仰着最纯正的路西法教",
		荒芜疆土:"<b>荒芜疆土：</b><br><li>自世界出现以来便存在的未知区域，由东极向北便可到达。荒芜疆土的三角域是人类活动的中心，三角域三角即为天涯城，采石场，白灼宫，在中部的古老王国废墟之下则是曲折宏大的地下迷宫。再北端就是生命禁地贡冈沙漠。荒芜疆土虽然没有魔能之地中那超脱人们思维的魔物，但是很显然，这里的生物比人们见过的更加壮硕嗜血，而毛皮药物以及矿物资源同时也比其它的地区更加丰富优越。地理自然环境导致了此处民风彪悍，崇尚武力。建立在三角域中的天涯城拥有着世界上最大的冒险者协会和拥全世界最优秀的冒险者和骑土团",
		魔能之地:"<b>魔能之地：</b><br><li>这是片连神明都不愿踏足的土地，在时空裂隙出现前，这片东大陆最远端的地区便被魔能腐化，大部分生物也因为魔能的侵蚀而发生了变异。现在的魔能之地被四大魔物领主给占据，他们位列东南西北，北境死地，南部豕国，东方部落，西部鹰角域围绕着中央的未知之域陨落天。而如今，这片恐怖的领域里某些东西正在苏醒......",
	};
	
//————角色传记————//
	var Stories={//模板:`<b>简介：</b><br><li><br>暂无`,
        //华伦
        sksn_hualun:`<b>简介：</b><br><li><br>虚无教派代行者，被称为幕月之弦。原来是帝都宫廷乐团的一名大提琴手，后来因一次意外冲突失去了自己的一切，从而委身虚无。`,
        //康帕斯
        sksn_kangpasi:`<b>简介：</b><br><li><br>雾海上游荡的亡灵船长，遵从未知神明的命令，将在三分海上死去的灵魂载往彼岸。`,
		//虾兵蟹将
		sksn_xieyaoxiafeiji:`<b>简介：</b><br><li><br>海默德手下的四大战力之二，被其派往人鱼湾把守进入光明礁的要道。蟹尧和虾费基作为最早跟随海默德的一批船员，位高权重，但海默德却常常因他们俩的智力问题大发雷霆。`,
		//夏依
		sksn_xiayi:`<b>简介：</b><br><li><br>克莱门汀在东港城微服私访时碰到的一位颇有灵性的金发少女，她神秘的身份还有和一头白熊结伴的行为令这名年轻的君主十分感兴趣，甚至萌生了异样的情愫......`,
		//斯格若皮
		sksn_sigeruopi:`<b>简介：</b><br><li><br>凯洛亚学院炼金学教授，因一次实验意外身体变成了棕熊的模样，远离了讲台后在学院的地下室里继续进行着他的工作。`,
		//古尔格温
		sksn_guergewen:`<b>简介：</b><br><li><br>地下世界的帝王之一，秘密情报组织诡影的首领，古尔和格温作为不同种族的魔物，却有着非比寻常的共生关系。`,
		//德里克
		sksn_delike:`<b>简介：</b><br><li><br>第一位征服了三分海的航海家，尼吉拉斯王国御封的第一任皇家海盗船长，在他年轻的时候就一直为了海族与人类之间的交流搭建桥梁，一生为了三分海的和平而努力，矢志不渝。`,
		//海默德
		sksn_haimode:`<b>简介：</b><br><li><br>鲨鱼人，沙虎鲨类，鱼人海盗船“皇家宝藏号”的船长，极度嗜血和暴虐，十年前在鱼渊兴风作浪，被涅普顿击败并封印在血海，现在封印被解除，这条鲨鱼又闻着血腥味卷土重来...`,
		//佑
		sksn_you:`<b>简介：</b><br><li><br>海洋之魂，三分海意志的化身，是海族尤其是人鱼族的精神领袖，在血染峡湾事件发生后，为了寻觅能够拯救三分海和平的破局者一直在海上漂泊。`,
		//东方弘道
		sksn_dongfanghongdao:`<b>简介：</b><br><li><br>旧世界人，异裂时空的幸存者之一，为了找寻时空异变的真相和回到故乡的办法，东方弘道在异世界进行了漫长而缜密的布局，他决心以整个世界作为棋盘，与那些未知的存在一一对奕。`,
		//迈斯克
		sksn_maisike:`<b>简介：</b><br><li><br>地下世界帝王之一，班卡姆斯领主，东极最大的奴隶贸易体系的掌控者，西尔斯和阿港都想拉拢的中间派，迈斯克凭借着强悍的兵力和坚固的堡垒在东极的中部地区建立了一座供其享乐的黑暗王国。`,
		//玉米
		sksn_youliweisi:`<b>简介：</b><br><li><br>尤里维斯是来自旧世界的核物理学家，和奥丁格兰结识后被后者邀请前往凯洛亚学院执教，在奥丁格兰牺牲后独自挑起了学院的大旗，保护学生不被教会继续迫害。`,
		//卢基诺
		sksn_lujinuo:`<b>简介：</b><br><li><br>羊人族少女，在一次躲避捕奴队的袭击时被东方弘道所救，后来一直在协助东方弘道。卡尔·卢基诺在科恩战争中充分展现了卓越的军事才能，是黎明阵线的核心领导人之一。`,
		//傻逼
		sksn_huaideqiao:`<b>简介：</b><br><li><br>原东极科恩领主，统治极其黑暗，剥削压迫的手段层出不穷，人民愤而义起，在黎明阵线的带领下推翻了领主的统治，第二次在科恩城建立了人类亚人相互联合的人民政权。`,
		//费尔伊德
		sksn_feieryide:`<b>简介：</b><br><li><br>阴云密布下的帝都，游荡着法外施暴的幽灵，对于那些犯了大错的上位者而言，费尔伊德或许只是一个毫无意义的名字，他们真正应当恐惧的，应该是他们自己......`,
		//扎格
		sksn_zage:`<b>简介：</b><br><li><br>魔能之地的狼族统领，奉魔域同盟之命率领魔物突袭飞云渡，是东部守军所面临的最为严峻的威胁和挑战`,
		//沐孤尘
		sksn_muguchen:`<b>简介：</b><br><li><br>来自旧世界的旅行者，他手中持有一些具有空间能力的地图，能够在遭遇危险的时候及时脱身，当下在西大陆暗中执行帮助破局者的任务，是东方弘道最信任的好友。`,
		//诺登斯
		sksn_nuodengsi:`<b>简介：</b><br><li><br>禁锢森林上古遗迹的守卫者，神明在击退了异界生物的入侵后，委托诺登斯守护连通两个世界的异界之门，但因长时间的侵蚀腐化，诺登斯也逐渐失去了之前的慈祥，变成了仅仅只知道消灭入侵者的守门魔人。`,
		//嘤嘤熊
		sksn_deyingkemeng:`<b>简介：</b><br><li><br>海都边缘禁锢森林的白色巨熊，喜食瓜果鱼类，通人性，声如小儿啼哭，嘤嘤嘤。`,
		//芸如
		sksn_yunru:`<b>简介：</b><br><li><br>来自旧世界的天才少女，被东方弘道请来为守护科恩城进行科技研发，个性散漫，对政治不上心。`,
		//安洁莉娜
		sksn_anjielina:`<b>简介：</b><br><li><br>精灵女王的护卫队队长，禁锢森林的守卫者，在遭遇了潜入禁地的菲儿的偷袭后，敌视所有的外来者并向随后出现的伊格诺斯一行发动了攻击。`,
		//菲儿
		sksn_ferwork:`<b>简介：</b><br><li><br>雪灵族女孩，曾经的宗教审判厅的执行官，伊凡帝勒的养女和下属，在伊凡帝勒消失的时间里一直在为了寻找他而奔波，最后与司吉合作，以生命为代价实现了自己的夙愿。`,
		//罗意奥
		sksn_luoyiao:`<b>简介：</b><br><li><br>凯洛亚学院的学生，在奥丁格兰牺牲后，罗意奥为了保护奥丁的手稿选择潜入教会内部成为一名卧底，忍辱负重，因教会欢迎并大肆宣扬他的归化而被昔日的同学所不耻。`,
		//唐宁
		sksn_tangning:`<b>简介：</b><br><li><br>尼吉拉斯王国东港执政官，为人圆滑，深谙自保之道，在东港的势力根深蒂固，克莱门汀上位后一直对其进行敲打，唐宁也逐渐认识到了只有跟随现在的新王自己的地位才能维系下去。`,
		//摩根
		sksn_mogen:`<b>简介：</b><br><li><br>地下世界的帝王之一，海都最大的商行掌舵者，摩根财团的幕后boss，一直在向世界各地输送军火，但血染峡湾事件发生后，摩根嗅到了危险的气息，逐步将自己隐藏了起来。`,
		//高泽斯
		sksn_gaozesi:`<b>简介：</b><br><li><br>魔域同盟四大领主之一，没有自己的领地，但却长期蛰伏在东极内部，伺机行动。甚至成为了苏尔嘉德的暗卫队长...`,
		//斐洛
		sksn_feiluo:`<b>简介：</b><br><li><br>长明殿先知，在明王初入西尔斯城时还是一个见习的牧师，斐洛毕生都在东极寻找神明的踪迹，帮助了不少穷苦的百姓，在民间很有威望。斐洛是飞云渡抵御大阵的制作者，长明殿也一直在为对抗魔域同盟而战斗。`,
		//格雷尔
		sksn_geleier:`<b>简介：</b><br><li><br>东极礼仪大臣，保皇派，在苏尔嘉德掌权期间一直站在希露薇一侧，不卑不亢，据理力争，为希露薇争夺王权立下汗马功劳。`,
		//苏尔嘉德
		sksn_suerjiade:`<b>简介：</b><br><li><br>东极的摄政王，上代皇帝苏利文三世的弟弟，在其执政期间对于政见不合者采取强硬手段，打压异己，积极扩张。苏尔嘉德掌控着东极的最高权力，在希露薇年幼之时是东极实质意义上的皇帝。但随着希露薇的成长，他与这位侄女之间的关系也逐渐僵化。`,
		//希露薇
		sksn_xiluwei:`<b>简介：</b><br><li><br>东极的第四任君王，帝国女皇。在从摄政王苏尔嘉德手里夺回王权后，希露薇开始为了东极的未来进行了大规模的改革，这也直接为高戈里的叛乱埋下祸根。`,
		//伊莲
		sksn_yilian:`<b>简介：</b><br><li><br>猫耳族亚人，在西尔斯城被翩跹从奴隶商人手里救下后，便一直跟随着东方弘道。拥有着可以让人们变得幸福的萌气能量。`,
		//乌瑞娅
        sksn_wuruiya:`<b>简介：</b><br><li><br>原本是苏尔嘉德的暗卫，被派往飞云渡监视哈里森时被西蒙发现身份并设计陷害于魔能之地，但乌瑞娅并没有因此死去，在以撒的帮助下，她转变成了魔物并失去了之前的记忆。`,
        //诺亚
		sksn_nuoya:`<b>简介：</b><br><li><br>诺亚是人类和魔物的混血儿，拥有着能够控制雷电的魔能，但在其童年时代受尽了别人的白眼和歧视，诺亚在一次坠崖意外时结识了刚刚踏入东极疆土的东方弘道并在其的帮助下逐渐找回了自我，最终配合东方弘道夺取了科恩城。`,
		//西蒙雅维利
        sksn_ximengyaweili:`<b>简介：</b><br><li><br>塞弥恩公爵的两个儿子，从小就和希露薇一同长大，西蒙参军之后逐渐接替了塞弥恩大公的位置，帮助希露薇掌控一定的兵权，雅维利则作为近侍一直保护着希露薇的安全。`,
        //giao戈里
        sksn_gaogeli:`<b>简介：</b><br><li><br>征南将军，在阿港掀起叛乱之时，奉摄政王苏尔嘉德之命率军镇压，在奇袭了阿弗斯赫特后又先后打败了琼斯和凯恩的舰队，威震北部海。但其蠢蠢欲动的野心被西尔斯察觉，希露薇听从了西蒙的建议，欲削夺其兵权，但高戈里率先得到消息，以清君侧的名义掀起了东极内战。`,
        //牛头人
        sksn_occupatee:`<b>简介：</b><br><li><br>魔域同盟盟主，长相似牛，以残暴荒淫著称，在魔能之地西部的鹰角城建立了统治，是飞云渡乃至东极所面临的最大威胁，奥克佩特一直在为侵略东极不断积蓄着力量。`,
        //阿贝尔加缪
        sksn_jiamiu:`<b>简介：</b><br><li><br>魔域同盟四大领主之一，北部死域的掌控者，加缪的一切都是一个谜团，他从雾气中诞生，但却超脱了迷雾而存在，是陨落天入口唯一的把守者。`,
        //克莱门汀
        sksn_clemtin:`<b>简介：</b><br><li><br>海都新君，在其上任后一改之前偏安一隅的政策，积极为向海洋深处的扩张筹备力量，同时对东部的阿港虎视眈眈。`,
        //海灵姬
		sksn_hailingji:`<b>简介：</b><br><li><br>海灵姬是人鱼族祭司的尊称，是侍奉海神涅普顿之人。海灵姬掌控着整个人鱼族，也是海族所推举的共主，她在任时准寻海洋之魂的意志，开始与人类进行试探性的交流，是三分海和平的守护者。`,
		//翩跹
        sksn_pianxian:`<b>简介：</b><br><li><br>长明殿的圣女，斐洛的亲传弟子，在厌倦了僧侣们的说教后听从了东方弘道的建议，决定自己去观察这个美丽的世界。`,
        //哈里森
        sksn_halisen:`<b>简介：</b><br><li><br>东极大将，顽固的保皇派，在飞云渡抵御着魔域同盟的侵袭。经西蒙的游说，采用金蝉脱壳之计率兵围住西尔斯城，帮助希露薇顺利夺取王权。`,
        //涅普顿
        sksn_niepudun:`<b>简介：</b><br><li><br>海神，时空圣殿的世界管理者之一，在神主路西法被哈利迪斯囚禁后前往三分海隐藏了起来，但血染峡湾事件发生后，帕朵玛拉的血液污染了海洋，涅普顿无所遁形，被下界搜寻的桀拉尔发现并与其展开大战。`,
        //雅各布传记
        sksn_agebu:`<b>简介：</b><br><li><br>东极的建立者，亚人族所推举的明王，原本是一个古老家族的后裔，但为了实现心中的抱负，他踏上了东极的土地，并在这片被七大领主分割的黑暗大陆上点亮了第一束光芒。雅各布在建立东极后，便消失在了人们的视线中，东极也没有按照其预想的道路走下去。`,
        //鬼厌传记
        sksn_guiyan:`<b>简介：</b><br><li><br>虚无教派的代行者之一，被称为人间恶魔。对于鬼厌，我们不知道他的名字，我们也不知道他行动的目的，也许他只是想看着世界在熊熊烈火中燃烧......`,
        //乌拉姆传记//
        sksn_wulamu:`<b>简介：</b><br><li><br>乌拉姆是阿弗斯赫特的城主，也是一个颇具特色的野心家，在其统治的时间内，不断扩充军力，与东极中央分庭抗礼，终于在鬼厌的蛊惑下宣布独立。他为了强化军队的战力所培育的邪神之花帕朵玛拉是血染峡湾事件的元凶。`,
        //埃得华传记//
        sksn_eidehua:`<b>简介：</b><br><li><br>为了生存而模仿爱德华爵士行骗，被发现后导致自己妻子的惨死，在爱德华的邀请下加入了雾言联盟。`,
        //琼斯传记
        sksn_qiongsi:`<b>简介：</b><br><li><br>北部海航路的霸主，在海默德消失的时代里一跃成为三分海的海盗之王，为了从乌拉姆手里夺回帕朵玛拉，琼斯与克莱门汀达成一项交易，成为了进攻阿港的先遣舰队。`,
        //凯恩传记
        sksn_kaien:`<b>简介：</b><br><li><br>统管海都舰队的将领，琼斯的死敌，被德里克推荐而成为维护北部海航线稳定的中坚力量，被海都先代君主称为御海之盾。`,
        //提隆嘉尼奥传记
	    sksn_jianiao:`<b>简介：</b><br><li><br>雾言联盟盟主，旧世界人，因不满帝都的昏暗统治，以及对于他们旧世界人的打压，嘉尼奥团结了旧世界同胞和异世界的一些人，创建了雾言联盟组织，企图通过暗杀来达成目的。`,
	    //桀拉尔传记
	    sksn_jielaer:`<b>传记一：</b><br><li>桀拉尔，你当真要去下面？”哈利迪斯坐在大殿的宝座上，白色的枯骨咯吱作响。<br><li>“既然路西法大人已经为我们所用，兄长也已经掌控了整个时空圣殿，我也想去逍遥逍遥。”<br><li>“既然如此，那再交给你个任务。”哈利迪斯手中的镰刀划着地板。<br><li>“不会是让我收拾海神他们吧，我可没那么多闲工夫去找他。”<br><li>“当然不是。你可记得出现在圣殿前的那个男子？”<br><li>“你是说，那个吸收走了水晶的小崽子？”<br><li>“找到他，把水晶带回来。”哈利迪斯森森的笑着，整个白袍随着白骨的抖动而颤抖着。<br><li>“好吧好吧，那我就再帮哥哥一个忙。”<br><li>桀拉尔打了个冷颤，如果哈利迪斯愿意，他随时可以把那柄镰刀收走他的神魄。<br><li>“这才是为兄的好弟弟。”白袍慢慢飘动着，白骨之手在桀拉尔额头上轻轻一点，一道黑色的印记出现在桀拉尔的额头上。<br><li>“为兄会好好关注你的，桀拉尔。”<br><br><li>“这身皮囊怎么那么奇怪？人类真的令人作呕的生灵。也不知道路西法大人为何要创造人类出来。”尼吉拉斯王国郊外，一抹倩影慢慢浮现，吐出的确是温润的男音。<br><br>“女人，应该怎么说话来着？”桀拉尔想着自己见过的女人，似乎只有路西法大人，还有她。<br><br><li>“终于弄好了，那么，就让我们去那个王国稍微玩一会吧？”妩媚的声音传出，似有摄人心魄的能力。<br><li>桀拉尔右手一挥，一柄漆黑如夜的战刃出现在桀拉尔的右手上。一双丹凤眼细细端详着影刃刀。良久，桀拉尔大笑一声：“路西法大人，或许你有卷土重来的机会，但现在，你只能为我们三神所用！”<br><br><li>“哟，没想到郊外还有这么火辣的美人儿。”<br><li>“那柄战刃，似乎挺不错的。”<br><li>“不如抱那美人回去，再好好研究研究那战刃？”<br><li>“两位大哥，不知有什么事情小女子可以帮忙么？”桀拉尔心中冷笑着，竟有如此不知尊卑的人类。<br><li>“这郊外危险，常有魔物出现，不如哥哥护送你去最近的城镇，如何？”<br><li>两人哈哈大笑着，却是直接架住了桀拉尔瘦小的身躯。<br><li>“两位大哥，这是为何？”<br><li>“为何？当然是与小美人共度良宵了！”<br><li>“小女子的意思是，为何要来送死呢？”桀拉尔的身躯慢慢融化在树荫之中，影刃刀插在泥土中。“什么？竟然是魔物？”<br><li>“小女子可不是魔物，小女子，是你们的神！”桀拉尔妩媚的声音在森林中回荡着，影刃刀随音而起，变幻成一柄双刃刀，将两人直接二分为四，那柄漆黑的利刃甚至没有沾上血液。<br><li>“若是让影刃刀沾上血，那岂不是对神明的玷污？”桀拉尔轻轻一笑，“路西法大人，且看我将这世界彻底当做我的玩具。”<br><br>“身化万物，影刃诛神。”`,
        //艾德华传记
        sksn_aidehua:`<b>传记一：</b><br><li><br>“你去看昨天晚上艾德华爵士的表演了吗？”<br>“那当然，艾德华爵士的表演，我可是一次也没落下。”<br>“什么时候我也能像艾德华爵士有那么高超的骗术呢？”<br>“就你？痴人说梦去吧。”<br>他们口中的艾德华爵士，十年前继承了父亲老艾德华留在来的爵位和财产，以及路西费尔王室对艾德华家族的信任。<br><br>王都中心的艾德华庄园内，艾德华仍在呼呼大睡。昨晚喝了几瓶烈酒庆祝新骗术，梦乡中的艾德华隐约听到了管家的叩门声。<br>“艾德华少爷，起床了。外面有一位客人想要见您。”<br>过了一会，房间中才传出迷迷糊糊的一声“我知道了”。<br>会客室内，黑衣男子品着王室特供的茶水，一双锐眼不时着扫着会客室的环境。<br>“哟，竟然是嘉尼奥先生，不知有何事情，竟要您大驾光临寒舍？”艾德华推门而入，看着正在品茶的嘉尼奥调侃道。<br>“艾德华先生，看来是我来的有些早了，您竟然还没睡醒。”<br>“嘉尼奥先生还会偷师了？我的毒舌怎么长到你的嘴巴里了？”<br>“这次来，所为何事？”艾德华收起那副玩世不恭的表情，眉头紧皱着。肯定是非常严重的事情，不然的话嘉尼奥不会亲自前来。<br>“你昨晚，感没感觉到有人跟踪你？”<br>“你是说。。。”<br>“王室已经起疑心了，”嘉尼奥放下茶杯，神情异常严肃，<br>“我们的时间所剩无几。”<br>“需要我做什么？”<br>“我需要你，继续潜伏。”<br>“继续潜伏？可是你不是说。。。”<br>“只是起了疑心而已，这次是我们近期的最后一次联络了，雾言联盟现在需要封闭，是否能撑过这段时间不被发现，就得看你的骗术有多么的精湛了。”<br>“我明白了。”<br><br>“少爷。”会客室的门被打开，管家再次看到了艾德华那张玩世不恭的戏谑笑脸。<br>“送客。<br>“是，少爷。”管家颔首答应了一声，“尊贵的客人，请跟我来。”<br>庄园的门口，一个络腮胡大汉正坐在那里抽烟。<br>“客人，慢走。”<br><br>“嘉尼奥先生，如何了？”<br>“很好，放心吧，你那边呢？”<br>“庄园的几个关键位置都已经放上炸药了。”<br>“记住，能够相信的，只有来自主世界的我们。”<br>“明白，嘉尼奥先生。”<br><br>庄园卧室的落地窗边，艾德华倚在墙上，静静的注视着渐渐走远的嘉尼奥二人。<br>“看来，我不过是个局外人罢了，不，只是个工具罢了。”<br>“但是我甘愿成为推翻这个腐朽王国的一柄利刃。”`,
        //哈利迪斯传记
	    sksn_halidisi:`<b>传记一：</b><br><li>哈利迪斯，你为何要带领冥神和影诛神反叛？”<br>时空圣殿的大殿内，金色的婀娜身影跪在地上，似乎已经力竭。<br>“路西法大人，这个世界已经不适合由您再来掌管，为何不干脆放权给我们，好好荡涤这个罪恶的世界？”<br>那漂浮在半空的白袍底下，一只仅有森森白骨的手紧握着一柄刀刃处睁着眼睛的镰刀，那眼睛散发出一股邪异的红光，似乎要将整个世界吞没进去。<br>“那神器。。。我果然当初就不该把他创造出来。”<br>“路西法大人，说了那么多，您还是不愿意交出时空圣殿的掌控权？”<br>“这圣殿，本就在你们的掌握之中。”路西法叹了口气，身上的圣光也暗淡了下来，“那八大神器，是支撑着时空圣殿运转的关键。”<br>“哦？”哈利迪斯饶有兴趣的看着自己手中这柄镰刀。<br>路西法环视着周围倒下的五位天神，眼神中暗藏着决意。“正因如此，我才不能让已经被腐蚀的你，集齐八大神器！”<br>路西法身上光芒大盛，浓厚的圣光源源不断地融入已经倒下的五大天神体内。<br>“可恶！路西法！！！”“终会有一天，你会明白自己的过错。”<br>光芒消散之后，整个大殿只剩下路西法已经倒下的身躯，五大天神早已消失不见。<br>“你以为这就能阻止我吗！我要让你亲眼见证我创造时空圣殿的辉煌！”哈利迪斯声嘶力竭地怒吼道。冰冷的镰刃划在时空圣殿金色的地板上，发出刺耳的噪音。<br>“我会创造出时空圣殿的辉煌！以死亡之名！`,
	    //新田布止传记
	    sksn_xintianbuzhi:`<b>简介：</b><br><li><br>来自旧世界的女孩，在被东方弘道收留后一直幻想自己可以拥有异能，但世纪高塔事件发生后，她才真正明白自己想要的究竟是什么。`,
	    //艾萝依传记
	    sksn_ailuoyi:`<b>简介：</b><br><li><br>帝都圣光教会的占星师，因其掌控着诡异的力量而被教皇严加管束在大教堂的塔楼顶，直到伊格诺斯从天而降，将爱萝依带出了帝都。`,
	    //司吉传记
        sksn_siji:`<b>简介：</b><br><li><br>虚无代行者之一，被称为彼岸海棠。司吉的过去是一个迷，只知道他在友人死去后背弃了圣光，转而研究起了古代神明。或许是为了纪念友人，司吉在其庭院里种满了海棠花。`,
        //伊格诺斯传记
	    sksn_yigenuosi:`<b>传记一：</b><br><li>伊拉！”<br>“哥哥！”<br>“啊！”伊格诺斯猛然惊醒。妹妹被暴虐的时空撕裂的那一幕，在他眼前久久不能消散。<br>“怎么，还是这里？”伊格诺斯环视四周，这里与时空裂缝几乎无异，但是这里的能量都很平和，与那时空裂隙中的完全不同。<br>“嗯？这是？”伊格诺斯白皙的指尖轻轻地碰触破碎的能量晶体，晶体慢慢的泛起涟漪，竟呈现出主世界的一处海峡。<br>“难道，我们的世界已经崩坏了？”伊格诺斯的手指转向另一个能量晶体，那显现海峡的能量晶体瞬间暗淡下来，伊格诺斯手指触摸着的，显现出主世界的一个半岛。<br>“果然是这样么。”伊格诺斯猛然发现，周围是他独自一人。<br>“其他人呢？不可能只有我一个人活下来。”<br>“我的孩子，你想的并没有错。他们已经先你一步到达了异世界。”<br>“是谁在。。。”伊格诺斯眉头一皱，这空荡荡的时空漩涡内，竟有除他之外的另一个声音。<br>“竟然在我的体内？？”伊格诺斯脱去上衣，自己胸口透出微弱的蓝色光芒，隐约可以看出是一个菱形。<br>“你到底是什么东西？”<br>“你现在还不能知道，我的孩子。现在，你必须从这里离开。”<br>“这不是废话吗？”<br>“我会告诉你离开的办法，但是否能成功，就得靠你自己的力量了。”<br>“那也没有别的选择了，说吧。这个什么。。。”伊格诺斯无奈地叹了口气。<br>“我的实体是一块水晶。将这个漩涡里的能量晶片收集并拼凑起来。拼凑时不能有一点差错。”<br>“我一个凡人怎么可能做到啊，你就不能给我点儿力量？”伊格诺斯微微一笑，这要是不压榨她点力量出来，那可是也太亏了，毕竟住在我身体里还不得交房租？<br>“当然可以。”<br>伊格诺斯的右手迸发出强烈的蓝色光芒，覆盖住了整个右臂。<br>“这是蕴含时空的温和力量，当然，它完全可以为你所用。”<br>“哼，那就开始吧，让我离开这个鬼地方。”伊格诺斯右手握拳，激荡的时空力量迸发出闪耀的光芒。<br>“祝你好运，我的孩子。”水晶散发出微弱的光芒，它的力量似乎已经极弱。`, 
        //奥丁格兰传记
	    sksn_aodinggelan:`<b>简介：</b><br><li><br>凯洛亚学院的院长，为了追寻世间的真理，奥丁格兰不惧教会的淫威，毅然赴死，开启了帝都的启蒙时代。`,
	    //澜零传记
	    sksn_lanling:`<b>传记一：</b><br><li>不知从何时起，我便能看清每个人的颜色，我说的那种颜色不是物体反射呈现出来的光色，而是人身体内灵魂的颜色。<br>每个人的灵魂都有多种颜色，红，黄，蓝，紫，等等。当一个人的情感发生变化时，他灵魂的颜色也会随之变化。<br>我只不过是一个蹩脚的画家，连调色都难以达到顾客要求。可即便如此，我也想让这个世界充满美感。每个人心中都有属于他的颜色，即使是和我平时结伴而行的朋友，灵魂上也刻着骇人的黑色。我知道，这是他们潜藏的欲望。当我看向那些大恶之人时，他们的灵魂中的黑色已经吞噬了其他的颜色。<br>黑色……代表了欲望。当我看到他们内心深处的黑暗时，无论他们的外表多么光鲜，言语多么动听，我都感到一股厌恶，我厌恶黑色的灵魂，我亦有办法对付它们。我深知我的能力是什么，我可以操控灵魂，并洗涤它的颜色。我也知道我要做什么。<br>我从身边的人入手，我用力量洗涤了他们的灵魂，剔除了令我厌恶的黑色，他们果然变的无比单纯，如同刚出世的婴儿般一尘不染，不过他们也丧失了绝大多数欲望，但这并不算什么副作用。<br>我开始着手于为世界重新勾勒色彩，像那些穷凶极恶之人，我也为他们黑色的心上染上一片赤红。但总有那么一部分站在世界顶端的人，他们的心是洗不白的，无论多么鲜艳的色彩，全部被他们黑色的灵魂贪婪地吞噬，那些“人生赢家”不会放过一丁点光亮，这时我终于明白了：他们灵魂上那漆黑黑的并不是颜色，而是自人类出现文明以来，就一直存在的贪婪，杀戮和苦难。<br>我第一次感到了无力，但我并不想放弃，既然他们的心染上白色，那么就让我来吸收所有的黑色，我可以做到，不过我知道一旦这么做就很难再恢复。但我必须如此，为了重构一个不存在任何污点的世界，我开始向四周汲取颜色，当我将全世界的黑色吸收到自己体内后，我睁开了眼睛，世界仿佛静止了。<br>突然，天空和大地开始出现裂缝，向是一幅被撕成两半的水彩画，天空的颜色由蔚蓝变得诡异了起来，海洋也如同一摊死水，刚发芽的青草开始枯萎，花朵开始凋谢……最后，世界居然变成了一片灰色。<br>怎么……会这样？<br>难道被我吸收的不只是黑色？<br>没错，我失败了，我夺走了这个世界除了灰色以为全部的色彩……<br>当我跪倒在逐渐崩坏的灰色土地上时，在天空裂缝中，一道金色的光芒照射进了这个世界并笼罩了大地。崩坏停止了，不，停止的不只有崩坏，还有时间。<br>我寻着光线的源头，看到了散发着光芒的那道人影。那是一尊怎样的存在啊，祂背后映射出五彩斑斓的霞光，如同《圣经》中所描述的上帝<br>祂看似不经意的话语，仿佛是神谕降临：<br>“我知道你的所思所想，的确黑色是令人厌恶的，但世界缺不得它，一个缺少了任何颜色的世界都是不可能正常运作的。一旦停止的时间开始运转，这个世界马上就会崩坏”<br>世界崩坏？这不是我想要的结果，我只是希望每个人的灵魂都是纯洁的无色，我仅仅是想让他们摒弃多余的欲望……<br>直到现在，我才发现自己错了。<br>我的能力，不能被用来毁灭世界！<br>如果世界没有了颜色，那就让我用画笔，为她重新勾勒<br>世界的色彩从我的指甲蔓延到周围，为灰色的世界染上鲜艳的颜色，而我的身体也渐渐暗淡，但我并不后悔。我看着逐渐愈合的世界和自己崩坏的身躯，渐渐的灰色蔓延到我的眼睛，我看不见任何东西了，但我却能感知到它们的存在，每一片叶子，每一朵花，每一个人。<br>“色彩因我而消亡，从此我便是色彩。”<br>终于，斑斓的颜色蔓延到世界最后的角落，<br>人们惊奇地发现，世界好像明亮了许多，<br>就连斑马和熊猫也有些说不出的不同。`,	    
        //影传记
	    sksn_ying:`<b>传记一：</b><br><li>他是一名手上沾满了鲜血的刺客。他杀人无数，有皇室的贵族，有贫民窟的贫民甚至还有强大的异能者似乎没什么是他无法杀死的，每到夜幕降临他就会在帝都的某个角落开始他的屠杀，没有人能看清他的身影，就算是看清了，下一秒人头就落地了，几乎没人不畏惧他，此后人们称他为杀戮之影<br><br><b>传记二：</b><br><li>昏暗的房间内，淡淡的烛光闪烁着。房间内灰尘迭起，唯有那张桌子和桌子上的神位洁净如新。<br>“嘎吱”身着黑衣的男子推门而入。踏着吱嘎作响的地板，男子走到神位前，脱下兜帽，病态白皙的脸上看不出一丝情感的波动。双手合十，低声吟诵着苦涩难懂的语言。<br>男子走出房间，淡淡的对一旁的阴影说道：“吉塔娜。是陛下让你来的？”<br>那片阴影出现了一丝涟漪，淡出了一身铠甲，铠甲包裹着的火辣身姿吐出冷淡的话语，“有些事情，影大人还是不必知道的好。”<br>“也罢。”影戴上兜帽，“今天的目标是？”<br>只要完成那人的委托，就能得到他的首肯，而我的计划就能开始实现了。<br>“盯紧艾德华，这是他下达的唯一指令。”<br><br>“艾德华爵士，再来一个！”<br>“就是啊，艾德华爵士，这次我肯定能发现你的破绽！”<br>“切，就你这眼神，能把母猪看成公猪！”<br>威尔之森小酒馆内，艾德华正尽兴地表演着他的新骗术。<br>“诸位，时间也不早了。威尔！今天晚上的单子我请了！”艾德华笑着收起扑克牌，冲着吧台前细细擦拭着酒杯的大胡子老板说道。<br>“哎，还希望多看看艾德华爵士的骗术呢。”<br>“放弃吧，就算想学你也学不来！艾德华爵士是什么人，你又是什么人。”<br>艾德华微笑着起身，向酒馆里的各位道了一声晚安，不紧不慢地离开了酒馆。<br>“什么人？”艾德华眼神微眯，他分明看到了一旁的阴影起了微小的波动。虽然很微小，但是艾德华骗术高超，眼神自然相当锐利。<br>一人和一片阴影就这么僵持了一会，艾德华摇了摇头，自言自语道：“可能是朗姆酒喝多了吧。”<br><br>待到艾德华远去，那片阴影才慢慢淡出一袭黑袍。<br>“如此锐利的观察力，这个人身上应该有很多秘密。”<br>“哼，艾德华可是骗术大师，观察力强没什么好奇怪的。”吉塔娜也慢慢淡出，不屑地嘲讽道。<br>“呵呵，你还是太年轻了。我能嗅到，他身上藏着秘密。”影笑了笑，渐渐地重返阴影之中。<br>“告诉陛下，最近你不要跟着我了，我单独观察这个人。”<br>“哼，仗着影化暗杀就敢这么对我说话，总有一天。。。”吉塔娜不满的嘟囔着。`,  
       //塞缪尔传记
		sksn_saimiuer:`<b>简介：</b><br><li>塞缪尔是帝都教会的一名执行者，同时也是一名体内蕴含强大能力的异能者，被帝都的人们称之为上帝的义人。<br>他身穿暗金战甲，手上拿着由东极最好的铁匠打造的暗金圣剑，不不服从于教会的人都由他裁决，如今的他已是一人之下万人之上，可谁知道他辉煌背后有着一段这样的故事。<br>七年前在尼吉拉斯王国，还是青少年的塞缪尔在野外狩猎意外受到魔种袭击身受重伤，被路过的剑圣兰伯特所救，受伤痊愈后塞缪尔决定拜他为师从此以后与他一起四处流浪，四处修行.<br>但好景不长他们路过了一个叫路西费尔帝国（现帝都）的国家，此时这个国家的教会正在处置被关押的犯人，看到一个又一个人头落地.<br>塞缪尔忍不住冲上前去问：为什么要这样做？执行者怒斥道：我们这是在执行正义，来人把这个小子给我带下去！<br>什么是正义？塞缪尔挣扎着问道。教会就是正义，一切违抗教会的人通通都将受到裁决！执行者回答道。<br>这句话深深的刻在了年少无知的塞缪尔心中，此后他问师傅兰伯特什么是正义，兰伯特也回应了他。<br>但是塞缪尔更倾向于前者，最后两人因为理念不同而分道扬镳。<br>三年后塞缪尔加入了帝都的教会，以他从剑圣兰伯特那学来的实力，仅仅只用了一年时间就成为了教会的执行者。<br>如今师徒二人必将会有一场大战究竟是哪一方的正义更胜一筹呢？敬请期待...`,		
        //兰伯特传记
		sksn_lanbote:`<b>简介：</b><br><li>兰伯特是世上最强的剑术大师，人们都称他为剑圣，他为了寻找最强的对手而四处流浪，在尼吉拉斯王国郊外解救了被魔种袭击的塞缪尔，在其伤势痊愈后收他为徒，此后两人一起踏上了旅途，<br>在途中兰伯特教会了塞缪尔很多很多，塞缪尔天赋过人在几个月的时间内进步神速，兰伯特也十分欣慰，<br>但好景不长两人来到了路西费尔帝国（简称帝都）在这里整个国家都由教会统治着，人们崇拜着教会认为教会是唯一离神明最近的地方，认为教会就是正义，<br>塞缪尔也被灌输了这样的思想，此后迷茫的塞缪尔问兰伯特：什么是正义？<br>兰伯特回答道：正义？胜利就是正义，唯有胜利者才能定义正义。<br>显然这个回答让塞缪尔心中更倾向于前者，此后塞缪尔跟随了兰伯特两年后最终因为理念不同而分道扬镳。<br>四年后一名不愿意透露姓名的刺杀者找到了兰伯特，称自己为反叛军的首领，并告诉了他塞缪尔的所在地，<br>他决定为自己愚蠢的徒弟上一课，此后兰伯特加入了反叛军，在这为无名刺杀者的带领下，师徒二人也即将开始一场大战，<br>究竟是哪一方的正义更胜一筹呢？敬请期待..`,		
		//杰西弗雷查传记
		sksn_fuleicha:`<b>简介：</b><br><li><br>旧世界人，在帝都帝都铁匠铺，靠打造兵器谋生。在弗雷查与雾言联盟的首领提隆嘉尼奥接触后，成为了后者最得力的助手，是雾言联盟的二号人物。`,
		//铁心传记
		sksn_tiexin:`<b>简介：</b><br><li><br>东极铁匠，塞谬尔为了打造暗金之剑曾经拜访过她。`,		
	}
	//————地图按钮————//
	var background=ui.create.div({
		zIndex:9999999,
		width:"100%",
		height:"100%",
		background:'url("'+lib.assetURL+'extension/时空枢纽/SKSN_ditu.jpg")',
		backgroundSize:'100% 100%',
	},ui.window);

	ui.create.div('.hth_shujubg','<img src="'+lib.assetURL+'extension/时空枢纽/SKSN_break.jpg" style="width:200px">',background,function(){
		background.remove();
	},{
		width: '0%',
		height: '0%',
		top: '0%',
		left: '0%',
	});

	ui.create.div(background,{
		width: '5%',
		height: '5%',
		top: '26%',
		left: '19%',
        opacity: '0%',
		backgroundColor:'rgb(65,162,64)',
	},function(){
		Regionalclick('西部',西部);
	});//西部

	ui.create.div(background,{
		width: '6%',
		height: '5%',
		top: '34%',
		left: '41%',
        opacity: '0%',
		backgroundColor:'rgb(226,215,36)',
	},function(){
		Regionalclick('中部',中部);
		
	});//中部

	ui.create.div(background,{
		width: '6%',
		height: '5%',
		left: '40%',
		top: '20%',
        opacity: '0%',
		backgroundColor:'rgb(22,182,126)',
	},function(){
		Regionalclick('时空圣殿',时空圣殿);
	});//时空圣殿

	ui.create.div(background,{
		width: '5%',
		height: '5%',
		top: '53%',
		left: '42%',
        opacity: '0%',
		backgroundColor:'rgb(56,142,195)',
	},function(){
		Regionalclick('海之都',海之都);
	});//海之都

	ui.create.div(background,{
		width: '5%',
		height: '5%',
		right: '27%',
		top: '23%',
        opacity: '0%',
		backgroundColor:'rgb(184,31,54)',
	},function(){
		Regionalclick('荒芜疆土',荒芜疆土);
	});//荒芜疆土

	ui.create.div(background,{
		width: '6%',
		height: '5%',
		right: '38%',
		top: '34%',
        opacity: '0%',
		backgroundColor:'rgb(240,172,73)',
	},function(){
		Regionalclick('东极',东极);
	});//东极

	ui.create.div(background,{
		right: '7%',
		width: '7%',
		height: '5%',
		top: '52%',
        opacity: '0%',
		backgroundColor:'rgb(238,100,246)',
	},function(){
		Regionalclick('魔能之地',魔能之地);
	});//魔能之地

	var info=ui.create.div({
		height:'100%',
		width:'0px',
		background: 'linear-gradient(rgba(58, 151, 197, 0.8),rgba(0, 44, 66, 0.8))',
		right: '0px',
	},background);
	
	lib.setScroll(info.intro=ui.create.div({
		height:'25%',
		width:'100%',
		overflow: 'hidden scroll',
		position: 'relative',
		borderBottom:'blue solid 2px',
	},info));
	
	lib.setScroll(info.players=ui.create.div('.buttons',{
		height:'25%',
		width:'100%',
		overflow: 'hidden scroll',
		position: 'relative',
		borderBottom:'blue solid 2px',
	},info));
	
	lib.setScroll(info.players_intro=ui.create.div({
		width:'100%',
		height:'calc(100% - 54%)',
		overflow: 'hidden scroll',
		position: 'relative',
	},info));
	
	var clearIntro=function(){
		info.players_intro.innerHTML='';
		info.players.innerHTML='';
		info.intro.innerHTML='';
	};
	var Regionalclick=function(x,arrayX){
		clearIntro();
		clickInfo.click();
		info.intro.innerHTML=地域背景[x];
		var buttons=ui.create.buttons(arrayX,'character',info.players,false)
		for(var i of buttons){
			i.addEventListener('click',function(){
				info.players_intro.innerHTML=Stories[this.link];
			});
		};
	};
	
	var toggleHeight=false;
	var clickInfo=ui.create.div({
		background:'url("'+lib.assetURL+'extension/时空枢纽/SKSN_ditu_A.jpg")',
		backgroundSize: '100% 100%',
		transform: 'rotateZ(90deg)',
		top: '47%',
		height: '30px',
		width: '140px',
		left: '-5.3rem',
		cursor: 'pointer',
	},info,function(){
		if(!toggleHeight){
			info.style.width="14rem";
			toggleHeight=true;
		}else{
			info.style.width="0px";
			toggleHeight=false;
		}
	});
	return background;
};

//————更新内容————//
    sksn_update=[
       '<br><li>新增角色：【康帕斯】【华伦】<br><li>修改部分细节',
       'players://["sksn_kangpasi","sksn_hualun"]',
    ];
    sksn_version='更新日期：2021年9月8日';

    game.sksn_update=function(){
       var sksn=document.createElement('sksn');
       sksn.style.textAlign='left';
       var players=null,cards=null;
       for(var i=0;i<sksn_update.length;i++){
       if(sksn_update[i].indexOf('players://')==0){
       try{
         players=JSON.parse(sksn_update[i].slice(10));
       }
       catch(e){
       players=null;
       }
       }
       else if(sksn_update[i].indexOf('cards://')==0){
       try{
       cards=JSON.parse(sksn_update[i].slice(8));
       }
       catch(e){
       cards=null;
       }
       }
       else{
       var li=document.createElement('li');
       li.innerHTML=sksn_update[i];
       sksn.appendChild(li);
       };
       };
       var dialog=ui.create.dialog('【时空枢纽】的更新内容<br>'+sksn_version,'hidden');
       dialog.content.appendChild(sksn);
       if(players){
       dialog.addSmall([players,'character']);
       };
       if(cards){
       for(var i=0;i<cards.length;i++){
       cards[i]=[get.translation(get.type(cards[i])),'',cards[i]]
       };
       dialog.addSmall([cards,'vcard']);
       };
       dialog.open();
       var hidden=false;
       if(!ui.auto.classList.contains('hidden')){
       ui.auto.hide();
       hidden=true;
       };
       game.pause();
       var control=ui.create.control('确定',function(){
       dialog.close();
       control.close();
       if(hidden) ui.auto.show();
       game.resume();
       });
       };
       lib.skill._sksn_update={
       trigger:{
          global:"gameStart"
       },
       priority:Infinity,
       forced:true,
       content:function(){
              if(lib.config.sksn_version!=sksn_version){
              game.sksn_update();
              game.saveConfig('sksn_version',sksn_version);
       }
       },
       }      

//————更新日志————//
 game.sksn_showSKSN_gengxinrizhi=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(100%)';
			dialog.style.width='calc(100%)';
			dialog.style.left='0px';
			dialog.style.top='0px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_gengxinrizhi=[];
			for(var i in window.SKSN_gengxinrizhi){
				list_SKSN_gengxinrizhi.push({
					data:i,
					info:window.SKSN_gengxinrizhi[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_gengxinrizhi.length) num=list_SKSN_gengxinrizhi.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_gengxinrizhi[0].data;
					var info=list_SKSN_gengxinrizhi[0].info;
					var list=[];
					var list1=[];
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_gengxinrizhi.remove(list_SKSN_gengxinrizhi[0]);
					if(list_SKSN_gengxinrizhi.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='5px';
			div.style.left='calc(100% - 55px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};
		
		
//————角色图鉴————//
game.sksn_showSKSN_tujian=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_tujian=[];
			for(var i in window.SKSN_tujian){
				list_SKSN_tujian.push({
					data:i,
					info:window.SKSN_tujian[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_tujian.length) num=list_SKSN_tujian.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_tujian[0].data;
					var info=list_SKSN_tujian[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_tujian.remove(list_SKSN_tujian[0]);
					if(list_SKSN_tujian.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};
		
		
//——————背景故事————//
//前言·起源
game.sksn_showSKSN_BJGS_A=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_BJGS_A=[];
			for(var i in window.SKSN_BJGS_A){
				list_SKSN_BJGS_A.push({
					data:i,
					info:window.SKSN_BJGS_A[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_BJGS_A.length) num=list_SKSN_BJGS_A.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_BJGS_A[0].data;
					var info=list_SKSN_BJGS_A[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_BJGS_A.remove(list_SKSN_BJGS_A[0]);
					if(list_SKSN_BJGS_A.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};
		
		
		
//第一章.帝都
game.sksn_showSKSN_BJGS_B=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_BJGS_B=[];
			for(var i in window.SKSN_BJGS_B){
				list_SKSN_BJGS_B.push({
					data:i,
					info:window.SKSN_BJGS_B[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_BJGS_B.length) num=list_SKSN_BJGS_B.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_BJGS_B[0].data;
					var info=list_SKSN_BJGS_B[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_BJGS_B.remove(list_SKSN_BJGS_B[0]);
					if(list_SKSN_BJGS_B.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};		
		
		
//第二章.海洋
game.sksn_showSKSN_BJGS_C=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_BJGS_C=[];
			for(var i in window.SKSN_BJGS_C){
				list_SKSN_BJGS_C.push({
					data:i,
					info:window.SKSN_BJGS_C[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_BJGS_C.length) num=list_SKSN_BJGS_C.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_BJGS_C[0].data;
					var info=list_SKSN_BJGS_C[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_BJGS_C.remove(list_SKSN_BJGS_C[0]);
					if(list_SKSN_BJGS_C.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};	


//第三章.东极
game.sksn_showSKSN_BJGS_D=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_BJGS_D=[];
			for(var i in window.SKSN_BJGS_D){
				list_SKSN_BJGS_D.push({
					data:i,
					info:window.SKSN_BJGS_D[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_BJGS_D.length) num=list_SKSN_BJGS_D.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_BJGS_D[0].data;
					var info=list_SKSN_BJGS_D[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_BJGS_D.remove(list_SKSN_BJGS_D[0]);
					if(list_SKSN_BJGS_D.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};	
		
		
//第四章·桎梏
game.sksn_showSKSN_BJGS_E=function(){
			var dialog=ui.create.dialog('hidden');
			dialog.style.height='calc(80%)';
			dialog.style.width='calc(70%)';
			dialog.style.left='155px';
			dialog.style.top='60px';
			dialog.classList.add('popped');
			dialog.classList.add('static');
			var list_SKSN_BJGS_E=[];
			for(var i in window.SKSN_BJGS_E){
				list_SKSN_BJGS_E.push({
					data:i,
					info:window.SKSN_BJGS_E[i],
				});
			};
			var interval=setInterval(function(){
				var num=20;
				if(num>list_SKSN_BJGS_E.length) num=list_SKSN_BJGS_E.length;
				for(var i=0;i<num;i++){
					var data=list_SKSN_BJGS_E[0].data;
					var info=list_SKSN_BJGS_E[0].info;
					var list=[];
					var list1=[];
					if(info.players.length>0){
						for(var j=0;j<info.players.length;j++){
							if(lib.character[info.players[j]]!=undefined) list.push(info.players[j]);
						};
					};
					if(list.length>0) dialog.addSmall([list,'character']);
					
					dialog.addText(data+'   ('+info.version+')'+'<br>',false);
					dialog.addText('<li>'+info.info,false);
					
					if(info.cards.length>0){
						for(var j=0;j<info.cards.length;j++){
							if(lib.card[info.cards[j]]!=undefined) list1.push(info.cards[j]);
						};
					};
					if(list1.length>0) dialog.addSmall([list1,'vcard']);
					list_SKSN_BJGS_E.remove(list_SKSN_BJGS_E[0]);
					if(list_SKSN_BJGS_E.length==0){
						clearInterval(interval);
					};
				};
			},100);
			ui.window.appendChild(dialog);
			var div=ui.create.div('.menubutton.round','×',function(){
				clearInterval(interval);
				dialog.delete();
				ui.window.removeChild(this);
			});
			div.style.top='60px';
			div.style.left='calc(100% - 155px)';
			div.style['zIndex']=1000;
			ui.window.appendChild(div);
		};
    
},
precontent:function (shikongs){
//————主代码————//
//胜利宣言
lib.init.js(lib.assetURL +'extension/时空枢纽/SKSN_achievement.js');
//瞬发技按钮//
var initCSS = function(){
    var url = lib.assetURL + 'extension/时空枢纽';
    lib.init.css(url, 'extension');
};
initCSS();
if(lib.config.skFreeChoose){
    var characterDialogSkOrigin = ui.create.characterDialog;
    ui.create.characterDialog = function(){
        Array.prototype.skAddOrigin = Array.prototype.add;
        Array.prototype.add = function(a){
            if(a == 'shen' || a == 'key'){
                if(this[0] == 'wei' && this[1] == 'shu' && this[2] == 'wu'){
                    this.splice(0,this.length);
                    var newArray = ['SK_east','SK_sea','SK_king','SK_demon','SK_qun','SK_shen'];
                    for(var i of newArray){
                        this.push(i);
                    }
                }
            }else{
                this.skAddOrigin(a);
            }
        };
        var ret = characterDialogSkOrigin.apply(this,arguments);
        Array.prototype.add = Array.prototype.skAddOrigin;
        delete Array.prototype.skAddOrigin;
        return ret;
    };
}
lib.element.player.sksnShunfajiInit = function(skillname){
    if(this != game.me){
        return;
    }
    var info = lib.skill[skillname];
    if(!info)return;
    if(info.clickable){
        var button = ui.create.div('.sksn-shunfaanniu',this);
        button.innerHTML = get.translation(skillname);
        var player = this;
        button.listen(function(){
            if(player.hasSkill(skillname)){
                if(info.clickable){
                    if(!info.clickableFilter(player)){
                        alert("当前不可发动！");
                        return;
                    }
                    info.clickable(player);
                }
            }else{
                button.delete();
            }
        });
    }
};

//buff模板
lib.sksnBUFF=[
	"_sksn_buff_zengshi",//「增势」
	"_sksn_buff_jiangshi",//「降势」
	"_sksn_buff_huihun",//「回魂」
	"_sksn_buff_diaoling",//「凋零」
	"_sksn_buff_fushang",//「负伤」
	"_sksn_buff_shufu",//「束缚」
	"_sksn_buff_yazhi",//「压制」
	"_sksn_buff_mingshi",//「明视」
	"_sksn_buff_ranshao",//「燃烧」
	"_sksn_buff_mimang",//「迷茫」
	"_sksn_buff_kangji",//「亢击」
	/*新buff请在这个列表中添加*/
	//"sksn_buff_",//「」
];
get.SksnBUFFNum=function(player,buff){
	if(!player.storage[buff]||player.storage[buff]<0) return 0;
	return player.storage[buff];
};
get.SksnBUFFRank=function(player,buff,income){
	var rank=lib.skill[buff].buffRank,plies=get.SksnBUFFNum(player,buff);
	var i=(income===true)?0:1;
	var num=0;
	if(rank.basic) num+=rank.basic[i];
	if(rank.add) num+=rank.add[i]*plies;
	var random2=1;
	if(rank.randomPower) random2=rank.randomPower;
	if(rank.random) num+=Math.min(1,rank.random[i]*plies)*random2;
	return num;
};
get.SksnBUFFList=function(player,callback){
	var list=[];
	for(var i of lib.sksnBUFF){
		if(get.SksnBUFFNum(player,i)==0) continue;
		if(callback){
			if(typeof callback=='function'){
				if(callback(player,i)==true) list.push(i);
			}else if(typeof callback=='string'){
				if(lib.skill[i].callback==true) list.push(i);
			}
		}else list.push(i);
	}
	return list;
};
game.changeSksnBUFF=function(player,buff,num,naturalLose){
	var event=game.createEvent('changeSksnBUFF');
	if(!num||typeof num!='number'){
		num=1;
	}
	event.set('player',player);
	event.set('buff',buff);
	event.set('num',num);
	event.set('naturalLose',naturalLose===true);
	event.setContent(function(){
		//this.trigger('changeSksnBUFFBegin');//事件开始，只能检测这个时机，不能在此时机更改效果
		"step 0"
		this.trigger('changeSksnBUFFBegin1');//事件开始，取消buff层数更改
		"step 1"
		this.trigger('changeSksnBUFFBegin2');//事件开始，更改buff效果名称和改变层数的地方
		"step 2"
		if(this.num!=0&&lib.sksnBUFF.contains(this.buff)){
			var tip1;
			if(this.num>0){
				if(!this.player.storage[this.buff]){
					this.player.storage[this.buff]=0;
					tip1='附加了';
				}else{
					tip1='增加了';
				}
			}else{
				if(this.naturalLose==true){
					tip1='自然减少了';
				}else{
					tip1='移除了';
				}
			}
			this.player.storage[this.buff]+=this.num;
			if(this.player.storage[this.buff]<0) this.player.storage[this.buff]=0;
			this.player.syncStorage(this.buff);
			if(this.player.storage[this.buff]>0){
				this.player.markSkill(this.buff);
			}else{
				this.player.unmarkSkill(this.buff);
			}
			game.log(this.player,tip1,Math.abs(this.num),'层「',this.buff,'」');
		}
		"step 3"
		this.trigger('changeSksnBUFFEnd1');//事件结束
	});
};
lib.element.player.changeSksnBUFF=function(buff,num){
	return game.changeSksnBUFF(this,buff,num,false);
};
lib.element.player.countSksnBUFF=function(except){
	var num=0;
	for(var i=0;i<lib.sksnBUFF.length;i++){
		if(Array.isArray(except)){
			if(except.contains(lib.sksnBUFF[i])) continue;
		}else{
			if(except==lib.sksnBUFF[i]) continue;
		}
		if(get.SksnBUFFNum(this,lib.sksnBUFF[i])>0) num++;
	}
	return num;
};
	lib.translate["_naturalLoseSksnBUFF"]="自然衰减";
	lib.skill["_naturalLoseSksnBUFF"]={
		trigger:{
			player:"phaseAfter",
		},
		forced:true,
		popup:false,
		priority:Infinity,
		content:function (){
			for(var i=0;i<lib.sksnBUFF.length;i++){
				if(lib.skill[lib.sksnBUFF[i]].naturalLose!==false&&get.SksnBUFFNum(player,lib.sksnBUFF[i])>0){
					game.changeSksnBUFF(player,lib.sksnBUFF[i],-1,true);
				}
			}
		}
	};
	
//增势
	lib.translate["sksn_buff_zengshi_name"]="增势";
	lib.translate["sksn_buff_zengshi_name_info"]="「<font color=yellow>锐不可当</font>」<br><li>自然衰减：<b>是</b><br><li>你摸牌时，20X%的几率摸牌数+1。<br><li>你造成伤害时，15X%的几率伤害值+1。";
	lib.translate["_sksn_buff_zengshi"]="增势";
	lib.skill["_sksn_buff_zengshi"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_zeng.jpg>",
		intro:{
			content:"「<font color=yellow>锐不可当</font>」<br><li>自然衰减：<b>是</b><br><li>你摸牌时，20X%的几率摸牌数+1。<br><li>你造成伤害时，15X%的几率伤害值+1。",
		},
		trigger:{
			player:"drawBegin",
			source:"damageBegin",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_zengshi")==0) return false;
			return true;
		},
		content:function (){
			var onrewrite=event.triggername;
			var num=get.SksnBUFFNum(player,"_sksn_buff_zengshi");
			if(onrewrite=="drawBegin"){
				if(Math.random()<=num*0.2){
					game.log(player,'受「<font color=yellow>增势</font>」影响，本次摸牌数+1');
					trigger.num++;
				}
			}
			if(onrewrite=="damageBegin"){
				if(Math.random()<=num*0.15){
					game.log(player,'受「<font color=yellow>增势</font>」影响，本次造成的伤害值+1');
					trigger.num++;
				}
			}
		},
		naturalLose:true,
		buffRank:{
			random:[0.25,0],
			randomPower:1.5,
		},
	};
//降势
	lib.translate["sksn_buff_jiangshi_name"]="降势";
	lib.translate["sksn_buff_jiangshi_name_info"]="「<font color=blue>士气低落</font>」<br><li>自然衰减：<b>是</b><br><li>你摸牌时，若摸牌数大于1，20X%的几率摸牌数-1。<br><li>你造成伤害时，15X%的几率伤害值-1。";
	lib.translate["_sksn_buff_jiangshi"]="降势";
	lib.skill["_sksn_buff_jiangshi"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_jiang.jpg>",
		intro:{
			content:"「<font color=blue>士气低落</font>」<br><li>自然衰减：<b>是</b><br><li>你摸牌时，若摸牌数大于1，20X%的几率摸牌数-1。<br><li>你造成伤害时，15X%的几率伤害值-1。",
		},
		trigger:{
			player:"drawBegin",
			source:"damageBegin",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player,onrewrite){
			if(get.SksnBUFFNum(player,"_sksn_buff_jiangshi")==0) return false;
			if(onrewrite=="drawBegin") return event.num>1;
			return true;
		},
		content:function (){
			var onrewrite=event.triggername;
			var num=get.SksnBUFFNum(player,"_sksn_buff_jiangshi");
			if(onrewrite=="drawBegin"){
				if(Math.random()<=num*0.2){
					game.log(player,'受「<font color=blue>降势</font>」影响，本次摸牌数-1');
					trigger.num--;
				}
			}
			if(onrewrite=="damageBegin"){
				if(Math.random()<=num*0.15){
					game.log(player,'受「<font color=blue>降势</font>」影响，本次造成的伤害值-1');
					trigger.num--;
				}
			}
		},
		naturalLose:true,
		buffRank:{
			random:[0,0.25],
			randomPower:1.5,
		},
	};
//回魂
	lib.translate["sksn_buff_huihun_name"]="回魂";
	lib.translate["sksn_buff_huihun_name_info"]="「<font color=olivedrab3>回魂新生</font>」<br><li>自然衰减：<b>是</b><br><li>自然衰减时，你摸X/2张牌（向上取整），15X%的几率回复1点体力。";
	lib.translate["_sksn_buff_huihun"]="回魂";
	lib.skill["_sksn_buff_huihun"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_huihun.jpg>",
		intro:{
			content:"「<font color=olivedrab3>回魂新生</font>」<br><li>自然衰减：<b>是</b><br><li>自然衰减时，你摸X/2张牌（向上取整），15X%的几率回复1点体力。",
		},
		trigger:{
			player:"changeSksnBUFFBegin",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_huihun")==0) return false;
			return event.buff=='_sksn_buff_huihun'&&event.naturalLose==true;
		},
		content:function (){
			var num=get.SksnBUFFNum(player,"_sksn_buff_huihun");
			game.log(player,'受「<font color=olivedrab3>回魂</font>」影响');
			player.draw(Math.ceil(num/2));
			if(player.isDamaged()&&Math.random()<=num*0.15){
				player.recover();
			}
		},
		naturalLose:true,
		buffRank:{
			random:[0.15,0],
			randomPower:2,
			add:[0.5,0],
		},
	};
//凋零
	lib.translate["sksn_buff_diaoling_name"]="凋零";
	lib.translate["sksn_buff_diaoling_name_info"]="「<font color=slategrey>魂魄凋零</font>」<br><li>自然衰减：<b>是</b><br><li>自然衰减时，若你没有牌，你失去1点体力；否则你弃置X/2张牌（向上取整），10X%的几率失去1点体力。";
	lib.translate["_sksn_buff_diaoling"]="凋零";
	lib.skill["_sksn_buff_diaoling"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_diaoling.jpg>",
		intro:{
			content:"「<font color=slategrey>魂魄凋零</font>」<br><li>自然衰减：<b>是</b><br><li>自然衰减时，若你没有牌，你失去1点体力；否则你弃置X/2张牌（向上取整），10X%的几率失去1点体力。",
		},
		trigger:{
			player:"changeSksnBUFFBegin",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_diaoling")==0) return false;
			return event.buff=='_sksn_buff_diaoling'&&event.naturalLose==true;
		},
		content:function (){
			var num=get.SksnBUFFNum(player,"_sksn_buff_diaoling");
			game.log(player,'受「<font color=slategrey>凋零</font>」影响');
			if(!player.countCards('he')){
				player.loseHp();
			}else{
				player.chooseToDiscard(Math.ceil(num/2),'he',true);
				if(Math.random()<=num*0.1){
					player.loseHp();
				}
			}
		},
		naturalLose:true,
		buffRank:{
			random:[0,0.1],
			randomPower:2,
			add:[0,0.5],
		},
	};
//负伤
	lib.translate["sksn_buff_fushang_name"]="负伤";
	lib.translate["sksn_buff_fushang_name_info"]="「<font color=red>遍体鳞伤</font>」<br><li>自然衰减：<b>是</b><br><li>你受到伤害时，你弃置一张牌，伤害值+1，然后移除1层「<font color=red>负伤</font>」。";
	lib.translate["_sksn_buff_fushang"]="负伤";
	lib.skill["_sksn_buff_fushang"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_fushang.jpg>",
		intro:{
			content:"「<font color=red>遍体鳞伤</font>」<br><li>自然衰减：<b>是</b><br><li>你受到伤害时，你弃置一张牌，伤害值+1，然后移除1层「<font color=red>负伤</font>」。",
		},
		trigger:{
			player:"damageBegin",
		},
		audio:"ext:时空枢纽:1",
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_fushang")==0) return false;
			return true;
		},
		content:function (){
			if(Math.random()>0.1) player.say('伤口...止不住啊!');
			var num=get.SksnBUFFNum(player,"_sksn_buff_fushang");
			game.log(player,'受「<font color=red>负伤</font>」影响，本次受到的伤害值+1');
			player.chooseToDiscard(1,'he',true);
			trigger.num++;
			player.changeSksnBUFF("_sksn_buff_fushang",-1);
		},
		naturalLose:true,
		buffRank:{
			basic:[0,3],
			add:[0,0.1],
		},
	};
//束缚
	lib.translate["sksn_buff_shufu_name"]="束缚";
	lib.translate["sksn_buff_shufu_name_info"]="「<font color=cyan>苟延残喘</font>」<br><li>自然衰减：<b>是</b><br><li>你不能使用或打出手牌，其他角色到你的距离为1。<br><li>你受到伤害后，移除1层「<font color=cyan>束缚</font>」。";
	lib.translate["_sksn_buff_shufu"]="束缚";
	lib.skill["_sksn_buff_shufu"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_shufu.jpg>",
		intro:{
			content:"「<font color=cyan>苟延残喘</font>」<br><li>自然衰减：<b>是</b><br><li>你不能使用或打出手牌，其他角色到你的距离为1。<br><li>你受到伤害后，移除1层「<font color=cyan>束缚</font>」。",
		},
		mod:{
			globalTo:function(from,to,distance){
				if(get.SksnBUFFNum(to,"_sksn_buff_shufu")>0) return distance-Infinity;
			},
			cardEnabled:function(card,player){
				if(get.SksnBUFFNum(player,"_sksn_buff_shufu")>0) return false;
			},
			cardUsable:function(card,player){
				if(get.SksnBUFFNum(player,"_sksn_buff_shufu")>0) return false;
			},
			cardRespondable:function(card,player){
				if(get.SksnBUFFNum(player,"_sksn_buff_shufu")>0) return false;
			},
			cardSavable:function(card,player){
				if(get.SksnBUFFNum(player,"_sksn_buff_shufu")>0) return false;
            },
        },
		trigger:{
			player:"damageAfter",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_shufu")==0) return false;
			return true;
		},
		content:function (){
			player.changeSksnBUFF("_sksn_buff_shufu",-1);
		},
		naturalLose:true,
		buffRank:{
			basic:[0,3.5],
			add:[0,0.1],
		},
	};
//压制
	lib.translate["sksn_buff_yazhi_name"]="压制";
	lib.translate["sksn_buff_yazhi_name_info"]="「<font color=slateblue>气势熏灼</font>」<br><li>自然衰减：<b>否</b><br><li>你的攻击范围-X。<br><li>弃牌阶段结束时，若你有手牌，你随机弃置1~X张手牌，若你因此弃置了全部手牌，你弃置装备区内的所有牌并移除1层「<font color=slateblue>压制</font>」。";
	lib.translate["_sksn_buff_yazhi"]="压制";
	lib.skill["_sksn_buff_yazhi"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_yazhi.jpg>",
		intro:{
			content:"「<font color=slateblue>气势熏灼</font>」<br><li>自然衰减：<b>否</b><br><li>你的攻击范围-X。<br><li>弃牌阶段结束时，若你有手牌，你随机弃置1~X张手牌，若你因此弃置了全部手牌，你弃置装备区内的所有牌并移除1层「<font color=slateblue>压制</font>」。",
		},
		mod:{
			attackFrom:function (player){
				if(get.SksnBUFFNum(player,"_sksn_buff_yazhi")>0) return +get.SksnBUFFNum(player,"_sksn_buff_yazhi");
			},
		},
		trigger:{
			player:"phaseDiscardEnd",
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_yazhi")==0) return false;
			return true;
		},
		content:function (){
			"step 0"
			if(player.countCards('h')){
				game.log(player,'受「<font color=slateblue>压制</font>」影响');
				var num=get.SksnBUFFNum(player,"_sksn_buff_yazhi");
				var cardList=[],cardOn;
				for(var i=0;i<num;i++){
					cardOn=player.getCards('h').randomGet();
					if(!cardList.contains(cardOn)) cardList.push(cardOn);
				}
				player.discard(cardList);
			}else event.finish();
			"step 1"
			if(!player.countCards('h')){
				if(player.countCards('e')) player.discard(player.getCards('e'));
				player.changeSksnBUFF("_sksn_buff_yazhi",-1);
			}
		},
		naturalLose:false,
		buffRank:{
			basic:[0,1],
			add:[0,0.5],
		},
	};
//明视
	lib.translate["sksn_buff_mingshi_name"]="明视";
	lib.translate["sksn_buff_mingshi_name_info"]="「<font color=#FFF0AC>皆为定数</font>」<br><li>自然衰减：<b>是</b><br><li>你的回合外，当前回合角色手牌对你可见。<br><li>你在一回合内首次摸牌时，〖观星2〗。";
	lib.translate["_sksn_buff_mingshi"]="明视";
	lib.skill["_sksn_buff_mingshi"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_mingshi.jpg>",
		intro:{
			content:"「<font color=#FFF0AC>皆为定数</font>」<br><li>自然衰减：<b>是</b><br><li>你的回合外，当前回合角色手牌对你可见。<br><li>你在一回合内首次摸牌前〖观星2〗。",
		},
		trigger:{
			player:"drawBefore",
		},
		usable:1,
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_mingshi")==0) return false;
			return true;
		},
		content:function (){
			player.chooseToGuanxing(2);
		},
		naturalLose:true,
		buffRank:{
			basic:[0.6,0],
		},
		ai:{
			viewHandcard:true,
			skillTagFilter:function(player,tag,arg){
				if(get.SksnBUFFNum(player,"_sksn_buff_mingshi")==0) return false;
				if(player==arg||_status.currentPhase!=arg) return false;
			},
		}
	};
//燃烧
	lib.translate["sksn_buff_ranshao_name"]="燃烧";
	lib.translate["sksn_buff_ranshao_name_info"]="「<font color=fire>遗祸之火</font>」<br><li>自然衰减：<b>是</b><br><li>当你受到冰属性伤害时，你移除X层「<font color=fire>燃烧</font>」。<br>自然衰减时，你受到1点无来源火属性伤害。";
	lib.translate["_sksn_buff_ranshao"]="燃烧";
	lib.skill["_sksn_buff_ranshao"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_ranshao.jpg>",
		intro:{
			content:"「<font color=fire>遗祸之火</font>」<br><li>自然衰减：<b>是</b><br><li>当你受到冰属性伤害时，你移除X层「<font color=fire>燃烧</font>」。<br>自然衰减时，你受到1点无来源火属性伤害。",
		},
		trigger:{
			player:["damage","changeSksnBUFFBegin"],
		},
		forced:true,
		silent:true,
		priority:3,
		filter:function (event,player,onrewrite){
			if(get.SksnBUFFNum(player,"_sksn_buff_ranshao")==0) return false;
			if(onrewrite=='damage') return event.nature&&event.nature=='ice';
			else return event.buff=='_sksn_buff_ranshao'&&event.naturalLose==true;
		},
		content:function (){
			var onrewrite=event.triggername;
			if(onrewrite=='damage'){
				var num=get.SksnBUFFNum(player,'_sksn_buff_ranshao');
				player.changeSksnBUFF('_sksn_buff_ranshao',num);
			}else{
				player.damage('fire','nosource');
			}
		},
		naturalLose:true,
		buffRank:{
			basic:[0,2],
			add:[0,0.2],
		},
	};
//迷茫
	lib.translate["sksn_buff_mimang_name"]="迷茫";
	lib.translate["sksn_buff_mimang_name_info"]="「<font color=#E5E5D0>茫然失措</font>」<br><li>自然衰减：<b>是</b><br><li>你不能使用或打出实体的【杀】和【无懈可击】。";
	lib.translate["_sksn_buff_mimang"]="迷茫";
	lib.skill["_sksn_buff_mimang"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_mimang.jpg>",
		intro:{
			content:"「<font color=#E5E5D0>茫然失措</font>」<br><li>自然衰减：<b>是</b><br><li>你不能使用或打出实体的【杀】和【无懈可击】。",
		},
		mod:{
			cardEnabled2:function(card,player){
				if(get.SksnBUFFNum(player,"_sksn_buff_mimang")>0){
					if(card.name=='sha'||card.name=='wuxie') return false;
				}
			},
        },
		naturalLose:true,
		buffRank:{
			basic:[0,1.5],
			add:[0,0.1],
		},
	};
//亢击
	lib.translate["sksn_buff_kangji_name"]="亢击";
	lib.translate["sksn_buff_kangji_name_info"]="「<font color=fire>热血澎湃</font>」<br><li>自然衰减：<b>否</b><br><li>你的【杀】命中后，令此【杀】不计入次数并弃置目标X张牌，然后移除一层「<font color=fire>亢击</font>」；<br><li>你的攻击范围+X，你的手牌上限-X。";
	lib.translate["_sksn_buff_kangji"]="亢击";
	lib.skill["_sksn_buff_kangji"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽//sksn_icon_buff_kangji.jpg>",
		intro:{
			content:"「<font color=fire>热血澎湃</font>」<br><li>自然衰减：<b>否</b><br><li>你的【杀】命中后，令此【杀】不计入次数并弃置目标X张牌，然后移除一层「<font color=fire>亢击</font>」；<br><li>你的攻击范围+X，你的手牌上限-X。",
		},
		trigger:{
            player:"shaHit",
        },
        forced:true,
        silent:true,
        priority:3,
        filter:function (event,player){
            if(get.SksnBUFFNum(player,"_sksn_buff_kangji")==0) return false;
            return true;
        },
        content:function (){
            game.log(player,'受「<font color=red>亢击</font>」影响');
            game.log(player,'使用的',trigger.card,'不计入次数限制');
            player.getStat().card.sha--;
            var num=get.SksnBUFFNum(player,"_sksn_buff_kangji");
            if(trigger.target.countDiscardableCards(player,'he')>0) player.discardPlayerCard(trigger.target,num,'he',true);
            player.changeSksnBUFF("_sksn_buff_kangji",-1);
        },
		mod:{
			attackFrom:function(from,to,distance){
                if(get.SksnBUFFNum(from,"_sksn_buff_kangji")>0){
                    var num=get.SksnBUFFNum(from,"_sksn_buff_kangji");
                    return distance-num;
                }
            },
            maxHandcard:function (player,num){
                if(get.SksnBUFFNum(player,"_sksn_buff_kangji")>0){
                    var numx=get.SksnBUFFNum(player,"_sksn_buff_kangji");
                    return num-numx;
                }
            },
        },
		naturalLose:false,
		buffRank:{
			basic:[1,0],
			add:[1.15,0.4],
		},
	};

//新buff创建模板
/*
	lib.translate["sksn_buff_BUFF名称_name"]="BUFF名称翻译";
	lib.translate["sksn_buff_BUFF名称_name_info"]="BUFF描述";
	lib.translate["_sksn_buff_BUFF名称"]="BUFF名称翻译";
	lib.skill["_sksn_buff_BUFF名称"]={
		marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_buff_xxxx.jpg>",
		intro:{
			content:"BUFF描述",
		},
		mod:{
			（有需要的话，这里写mod类效果，没有就省略）
		},
		trigger:{
			（这里写时机）
		},
		forced:true,
		silent:true,
		priority:3,//这三项是默认的。//PS:别再写奇奇怪怪的优先度了好吗
		filter:function (event,player){
			if(get.SksnBUFFNum(player,"_sksn_buff_BUFF名称")==0) return false;
			（这里写其余判断条件）
		},
		content:function (){
			（这里写效果）
		},
		naturalLose:（是否为自然衰减类buff，不是填false）,
		buffRank:{
			basic:[0,0],（这里写不受层数影响的收益）
			random:[0,0],（这里写受层数和随机数影响的收益，结果值填概率）
			randomPower:0,（这里写倍率，与上面random挂钩）
			add:[0,0],（这里写受层数影响的收益，结果值不需取整）
		},（第一个数为正收益，第二个为负收益。PS:基本收益论：一牌1收益，一血2收益）
		（其余什么的都写在后面，方便你也方便我们）
	};
*/
//地图
lib.element.player.changeSksnLand=function(url){
	if(url.indexOf('/')===-1){
		url='extension/时空枢纽/'+url;
//		url='extension/时空枢纽/'+url;
	}
	if(url.indexOf('.png')==-1&&url.indexOf('.jpg')==-1){
		url+='.jpg';
	}
	return game.changeLand(url,this);
};
//发现
lib.element.player.sksnFaxian=function(choose){
	var next=game.createEvent('sksnFaxian');
	if(arguments.length==1){
		for(var i in choose){
			next[i]=choose[i];
		}
	}
	if(next.select==undefined){
		next.select=[3,1];
	}else if(typeof next.select=='number'){
		next.select=[next.select,1];
	}
	if(next.ai==undefined){
		next.ai=function(button){
			return get.value({name:button.link[2]});
		};
	}
	if(next.prompt==undefined){
		next.prompt=='请选择一张牌';
	}
	switch(typeof next.cardList){
		case 'function':next.cardList=next.cardList();break;
		case 'string':next.cardList=[next.cardList];break;
	}
	next.player=this;
	next.setContent(function(){
		"step 0"
		this.trigger('sksnFaxianBegin1');//防止、结束事件
		"step 1"
		this.trigger('sksnFaxianBegin2');//改变选择范围
		"step 2"
		event.list=this.cardList.randomGets(this.select[0]);
		for(var i=0;i<event.list.length;i++){
			if(typeof event.list[i]=='string'){
				event.list[i]=[get.type2(event.list[i]),'',event.list[i]];
			}
			/*if(get.itemtype(event.list[i])!='card'){
				if(typeof event.list[i]=='object'){
					event.list[i]=game.createCard(event.list[i]);
				}else if(typeof event.list[i]=='string'){
					event.list[i]=game.createCard({name:event.list[i][2]});
				}
			}*/
		}
		event.list.slice(0);
		this.trigger('rewriteSksnFaxianList');
		"step 3"
		var player=this.player;
		//var dialog=ui.create.dialog(this.prompt,event.list,'hidden');
		player.chooseButton([this.prompt,[event.list,'vcard']],true).set('selectButton',this.select[1]).set('ai',this.ai);
		"step 4"
		var cards=result.links.slice(0);
		for(var i=0;i<cards.length;i++){
			cards[i]=game.createCard({name:cards[i][2]});
		}
		event.result=cards;
		this.trigger('rewriteSksnFaxianResult');
	});
	next._args=Array.from(arguments);
	return next;
};
//千幻皮肤
window.sksn_import=function(f){
    f(lib,game,ui,get,ai,_status);
};
lib.init.js(lib.assetURL +'extension/时空枢纽/SKSN_skin.js');
//————启动代码————//
//附属目标(此写法参考玄武江湖)
get.SkCanHasMoreTarget=function(cardname){
    var info=get.info({name:cardname});
        if(!info)return false;
        if(info.notarget)return false;
        if(info.type == 'delay'||info.type == 'equip'){
            return false;
    }
        if(info.multitarget)return false;
            return true;
};
//分界线1
lib.extensionMenu.extension_时空枢纽.SKSN_xianA1={
			"name":"———————————————",
			"clear":true,
		};
		
//————————武将势力（兼容十周年UI）————————//
	var tenUi=document.createElement('style');//十周年UI支持
	var style2=document.createElement('style');//帝势力SK_king
	var style3=document.createElement('style');//海势力SK_sea
	var style4=document.createElement('style');//东势力SK_east
	var style5=document.createElement('style');//魔势力SK_demon
	var style6=document.createElement('style');//游侠势力SK_qun
	var style7=document.createElement('style');//神明势力SK_shen
//--var stylex=document.createElement('style');//新势力添加

//——帝势力——金黄255,225,0——//
	style2.innerHTML=".player.identity[data-color='SK_king'],";
	style2.innerHTML+="div[data-nature='SK_king'],";
	style2.innerHTML+="span[data-nature='SK_king'] {text-shadow: black 0 0 1px,rgba(255,225,0,1) 0 0 2px,rgba(255,225,0,1) 0 0 5px,rgba(255,225,0,1) 0 0 10px,rgba(255,225,0,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_kingm'],";
	style2.innerHTML+="span[data-nature='SK_kingm'] {text-shadow: black 0 0 1px,rgba(255,225,0,1) 0 0 2px,rgba(255,225,0,1) 0 0 5px,rgba(255,225,0,1) 0 0 5px,rgba(255,225,0,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_kingmm'],";
	style2.innerHTML+="span[data-nature='SK_kingmm'] {text-shadow: black 0 0 1px,rgba(255,225,0,1) 0 0 2px,rgba(255,225,0,1) 0 0 2px,rgba(255,225,0,1) 0 0 2px,rgba(255,225,0,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style2);
	lib.group.add('SK_king');
	lib.translate.SK_king='帝';
	lib.translate.SK_king2='帝';
	lib.groupnature.SK_king='SK_king';
	tenUi.innerHTML=".player>.camp-zone[data-camp='SK_ci']>.camp-back {background: linear-gradient(to bottom, rgb(133,133,133), rgb(255,255,240));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_ci']>.camp-name {text-shadow: 0 0 5px rgb(255,225,0), 0 0 10px rgb(255,225,0), 0 0 15px rgb(255,225,0);}";

//——海势力——深蓝0,67,107——//
	style3.innerHTML=".player.identity[data-color='SK_sea'],";
	style3.innerHTML+="div[data-nature='SK_sea'],";
	style3.innerHTML+="span[data-nature='SK_sea'] {text-shadow: black 0 0 1px,rgba(0,67,107,1) 0 0 2px,rgba(0,67,107,1) 0 0 5px,rgba(0,67,107,1) 0 0 10px,rgba(0,67,107,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_seam'],";//亮度增强
	style2.innerHTML+="span[data-nature='SK_seam'] {text-shadow: black 0 0 1px,rgba(0,103,154,1) 0 0 2px,rgba(0,103,154,1) 0 0 5px,rgba(0,103,154,1) 0 0 5px,rgba(0,103,154,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_seamm'],";
	style2.innerHTML+="span[data-nature='SK_seamm'] {text-shadow: black 0 0 1px,rgba(0,103,154,1) 0 0 2px,rgba(0,103,154,1) 0 0 2px,rgba(0,103,154,1) 0 0 2px,rgba(0,103,154,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style3);
	lib.group.add('SK_sea');
	lib.translate.SK_sea='海';
	lib.translate.SK_sea2='海';
	lib.groupnature.SK_sea='SK_sea';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_sea']>.camp-back {background: linear-gradient(to bottom, rgb(0,67,107), rgb(51,102,255));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_sea']>.camp-name {text-shadow: 0 0 5px rgb(0,67,107), 0 0 10px rgb(0,67,107), 0 0 15px rgb(0,67,107);}";

//——东势力——橘红255,63,0——//
	style4.innerHTML=".player.identity[data-color='SK_east'],";
	style4.innerHTML+="div[data-nature='SK_east'],";
	style4.innerHTML+="span[data-nature='SK_east'] {text-shadow: black 0 0 1px,rgba(255,63,0,1) 0 0 2px,rgba(255,63,0,1) 0 0 5px,rgba(255,63,0,1) 0 0 10px,rgba(255,63,0,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_eastm'],";
	style2.innerHTML+="span[data-nature='SK_eastm'] {text-shadow: black 0 0 1px,rgba(255,63,0,1) 0 0 2px,rgba(255,63,0,1) 0 0 5px,rgba(255,63,0,1) 0 0 5px,rgba(255,63,0,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_eastmm'],";
	style2.innerHTML+="span[data-nature='SK_eastmm'] {text-shadow: black 0 0 1px,rgba(255,63,0,1) 0 0 2px,rgba(255,63,0,1) 0 0 2px,rgba(255,63,0,1) 0 0 2px,rgba(255,63,0,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style4);
	lib.group.add('SK_east');
	lib.translate.SK_east='东';
	lib.translate.SK_east2='东';
	lib.groupnature.SK_east='SK_east';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_east']>.camp-back {background: linear-gradient(to bottom, rgb(135,0,0), rgb(255,63,0));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_east']>.camp-name {text-shadow: 0 0 5px rgb(255,63,0), 0 0 10px rgb(255,63,0), 0 0 15px rgb(255,63,0);}";

//——魔势力——嫣紫207,56,177——//
	style5.innerHTML=".player.identity[data-color='SK_demon'],";
	style5.innerHTML+="div[data-nature='SK_demon'],";
	style5.innerHTML+="span[data-nature='SK_demon'] {text-shadow: black 0 0 1px,rgba(207,56,177,1) 0 0 2px,rgba(207,56,177,1) 0 0 5px,rgba(207,56,177,1) 0 0 10px,rgba(207,56,177,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_demonm'],";
	style2.innerHTML+="span[data-nature='SK_demonm'] {text-shadow: black 0 0 1px,rgba(207,56,177,1) 0 0 2px,rgba(207,56,177,1) 0 0 5px,rgba(207,56,177,1) 0 0 5px,rgba(207,56,177,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_demonmm'],";
	style2.innerHTML+="span[data-nature='SK_demonmm'] {text-shadow: black 0 0 1px,rgba(207,56,177,1) 0 0 2px,rgba(207,56,177,1) 0 0 2px,rgba(207,56,177,1) 0 0 2px,rgba(207,56,177,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style5);
	lib.group.add('SK_demon');
	lib.translate.SK_demon='魔';
	lib.translate.SK_demon2='魔';
	lib.groupnature.SK_demon='SK_demon';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_demon']>.camp-back {background: linear-gradient(to bottom, rgb(103,0,153), rgb(207,56,177));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_demon']>.camp-name {text-shadow: 0 0 5px rgb(207,56,177), 0 0 10px rgb(207,56,177), 0 0 15px rgb(207,56,177);}";

//——游侠势力——亮灰177,177,127——//
	style6.innerHTML=".player.identity[data-color='SK_qun'],";
	style6.innerHTML+="div[data-nature='SK_qun'],";
	style6.innerHTML+="span[data-nature='SK_qun'] {text-shadow: black 0 0 1px,rgba(177,177,127,1) 0 0 2px,rgba(177,177,127,1) 0 0 5px,rgba(177,177,127,1) 0 0 10px,rgba(177,177,127,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_qunm'],";
	style2.innerHTML+="span[data-nature='SK_qunm'] {text-shadow: black 0 0 1px,rgba(177,177,127,1) 0 0 2px,rgba(177,177,127,1) 0 0 5px,rgba(177,177,127,1) 0 0 5px,rgba(177,177,127,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_qunmm'],";
	style2.innerHTML+="span[data-nature='SK_qunmm'] {text-shadow: black 0 0 1px,rgba(177,177,127,1) 0 0 2px,rgba(177,177,127,1) 0 0 2px,rgba(177,177,127,1) 0 0 2px,rgba(177,177,127,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style6);
	lib.group.add('SK_qun');
	lib.translate.SK_qun='游';
	lib.translate.SK_qun2='游';
	lib.groupnature.SK_qun='SK_qun';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_qun']>.camp-back {background: linear-gradient(to bottom, rgb(69,139,116), rgb(177,177,127));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_qun']>.camp-name {text-shadow: 0 0 5px rgb(177,177,127), 0 0 10px rgb(177,177,127), 0 0 15px rgb(177,177,127);}";
//神明势力   245, 245, 74     204,255,0
    style7.innerHTML=".player.identity[data-color='SK_shen'],";
	style7.innerHTML+="div[data-nature='SK_shen'],";
	style7.innerHTML+="span[data-nature='SK_shen'] {text-shadow: black 0 0 1px,rgba(255,204,51,1) 0 0 2px,rgba(255,204,51,1) 0 0 5px,rgba(255,204,51,1) 0 0 10px,rgba(255,204,51,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_shenm'],";
	style2.innerHTML+="span[data-nature='SK_shenm'] {text-shadow: black 0 0 1px,rgba(204,255,0,1) 0 0 2px,rgba(204,255,0,1) 0 0 5px,rgba(204,255,0,1) 0 0 5px,rgba(204,255,0,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_shenmm'],";
	style2.innerHTML+="span[data-nature='SK_shenmm'] {text-shadow: black 0 0 1px,rgba(204,153,204,1) 0 0 2px,rgba(204,153,204,1) 0 0 2px,rgba(204,153,204,1) 0 0 2px,rgba(204,153,204,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(style7);
	lib.group.add('SK_shen');
	lib.translate.SK_shen='神';
	lib.translate.SK_shen2='神';
	lib.groupnature.SK_shen='SK_shen';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_shen']>.camp-back {background: linear-gradient(to bottom, rgb(255,102,0), rgb(255,204,0));}";
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_shen']>.camp-name {text-shadow: 0 0 5px rgb(255,204,0), 0 0 10px rgb(204,255,0), 0 0 15px rgb(204,153,204);}";
//——十周年UI收尾语句——//
	document.head.appendChild(tenUi);
//——新势力添加模板——//
/*
X为新势力排序，从2开始，顺次接即可；SK_name为新势力代码名，SK_name2为标签名，请统一；rgb和rgba为颜色代码，请谨慎填写
//——势力名——势力颜色——//
	styleX.innerHTML=".player.identity[data-color='SK_name'],";
	styleX.innerHTML+="div[data-nature='SK_name'],";
	styleX.innerHTML+="span[data-nature='SK_name'] {text-shadow: black 0 0 1px,rgba(0,0,0,1) 0 0 2px,rgba(0,0,0,1) 0 0 5px,rgba(0,0,0,1) 0 0 10px,rgba(0,0,0,1) 0 0 10px}";
	style2.innerHTML+="div[data-nature='SK_namem'],";//名称描边染色
	style2.innerHTML+="span[data-nature='SK_namem'] {text-shadow: black 0 0 1px,rgba(0,0,0,1) 0 0 2px,rgba(0,0,0,1) 0 0 5px,rgba(0,0,0,1) 0 0 5px,rgba(0,0,0,1) 0 0 5px,black 0 0 1px;}";
	style2.innerHTML+="div[data-nature='SK_namemm'],";//名称描边染色
	style2.innerHTML+="span[data-nature='SK_namemm'] {text-shadow: black 0 0 1px,rgba(0,0,0,1) 0 0 2px,rgba(0,0,0,1) 0 0 2px,rgba(0,0,0,1) 0 0 2px,rgba(0,0,0,1) 0 0 2px,black 0 0 1px;}";
	document.head.appendChild(styleX);
	lib.group.add('SK_name');
	lib.translate.SK_name = '势力简称（请用一个字表示）';
	lib.translate.SK_name2 = '同上';
	lib.groupnature.SK_name = 'SK_name';
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_name']>.camp-back {background: linear-gradient(to bottom, rgb(0,0,0), rgb(0,0,0));}";//十周年UI武将名背景
	tenUi.innerHTML+=".player>.camp-zone[data-camp='SK_name']>.camp-name {text-shadow: 0 0 5px rgb(0,0,0), 0 0 10px rgb(0,0,0), 0 0 15px rgb(0,0,0);}";//十周年UI势力

*/


//——————角色包——————//		
    delete lib.extensionMenu.extension_时空枢纽.delete;
    if(shikongs.enable){
		game.import('character',function(){			
			var shikongs={
				name:'shikongs',
				connect:true,
				character:{
//————角色编辑————//
//——神将——//        
                    sksn_gongjvshen:['male','shen',1,[],["unseen"]],//工具神
					sksn_niepudun:["male","SK_shen","3/4",["sksn_Haiwang","sksn_futao"],[]],
					sksn_halidisi:["male","SK_shen",3,["SKSN_HLDS_A","SKSN_HLDS_B"],[]],
					sksn_jielaer:["female","SK_shen",3,["sksn_xueshi","sksn_yingzhu","sksn_yingfeng"],[]],					
//——帝势力——//
					sksn_aidehua:["male","SK_king",3,["sksn_pianshu","sksn_guaidao"],[]],
					sksn_ying:["male","SK_king",3,["SKSN_Y_A","SKSN_Y_B","SKSN_say_Y"],[]],
					sksn_fuleicha:["male","SK_king",4,["sksn_shouji","sksn_zhizuo"],[]],
					sksn_jianiao:["male","SK_king",3,["sksn_bianshi","sksn_wumeng"],[]],
						sksn_jianiao_a:["male","SK_king",3,[],["unseen"]],
						sksn_jianiao_b:["male","SK_king",3,[],["unseen"]],
					sksn_eidehua:["male","SK_king",3,["sksn_jieshi","sksn_sanwei"],[]],
					sksn_aodinggelan:["male","SK_king",3,["SKSN_ADGL_A","SKSN_ADGL_B","SKSN_ADGL_C"],[]],
					sksn_lanbote:["male","SK_king",4,["sksn_yanfan","sksn_jiansheng","SKSN_say_LBT"],[]],
					sksn_saimiuer:["male","SK_king",4,["SKSN_SME_A","SKSN_SME_B","SKSN_say_SME"],[]],
					sksn_ailuoyi:["female","SK_king",3,["sksn_huanmo"],[]],
					    sksn_ailuoyi_hy:["female","SK_king",2,["sksn_hy_meiyin"],["unseen"],[]],
					    sksn_ailuoyi_xy:["male","SK_king",3,["sksn_xy_shihun"],["unseen"],[]],
					    sksn_ailuoyi_ym:["male","SK_king",2,["sksn_ym_yanyu"],["unseen"],[]],
					sksn_luoyiao:["male","SK_king",3,["sksn_lipan","sksn_chengzhi"],[]],   
					sksn_ferwork:["female","SK_king",3,["sksn_sanhua","sksn_ninghen","sksn_dongzhi"],[]], 
					sksn_youliweisi:["male","SK_king",4,["sksn_wenshi","sksn_taohui"],[]],
					sksn_sigeruopi:["male","SK_king",4,["sksn_xilian","sksn_paozhi"],[]],
                    sksn_hualun:['male','SK_king',3,['sksn_yinxian'],[]],
					//sksn_yifandile:["male","SK_king",3,[],[]],
//——海势力——//
					sksn_kaien:["male","SK_sea","4/5",["sksn_tongpao","sksn_paoze","sksn_shuwei"],[]],
					sksn_qiongsi:["male","SK_sea",4,["sksn_xilue","sksn_zhenjing","sksn_zhuiming"],[]],
                        sksn_qiongsi_soul:["male","SK_demon",4,["sksn_yuanling"],["unseen"],[]],
					sksn_wulamu:["male","SK_sea",5,["sksn_yunshen","sksn_wangtian","sksn_gongjian"],[]],           
					sksn_guiyan:["male","SK_sea",3,["sksn_yanyu","sksn_yinhuo"],[]],
					sksn_siji:["male","SK_sea",3,["sksn_mijiao","sksn_bozhong"],[]],
                    sksn_hailingji:["female","SK_sea",3,["sksn_xinglang","sksn_jianhao"],[]],
                    sksn_clemtin:["male","SK_sea",4,["sksn_angdou","sksn_zhengfa","sksn_jdxbw"],[]],
                    sksn_mogen:["male","SK_sea",3,["sksn_shangdao","sksn_shangtu","sksn_qiangdai"],[]],
                    sksn_tangning:["male","SK_sea",4,["sksn_fengyuan","sksn_woquan"],[]],
                    sksn_deyingkemeng:["male","SK_sea",4,["sksn_yingning"],[]],
                    sksn_you:["female","SK_sea",3,["sksn_muhai","sksn_chaoyong","dualside"],["dualside:sksn_cang"]],
			            sksn_cang:["female","SK_shen",3,["sksn_jingling","sksn_chaoku","dualside"],["unseen"]],
			        sksn_haimode:["male","SK_sea",4,["sksn_xiechi","sksn_chitu"],[]],
			        sksn_delike:["male","SK_sea",4,["sksn_qihang","sksn_shulu"],[]],
			        sksn_xiayi:["female","SK_sea",3,["sksn_liuli","sksn_qiqi"],[]],
			        sksn_xieyaoxiafeiji:["male","SK_sea",3,["sksn_xingli","sksn_zaoshi"],[]],
//——东势力——//
					sksn_tiexin:["female","SK_east",3,["sksn_jianghun","sksn_zongjiang"],[]],
					sksn_agebu:["male","SK_east",3,["sksn_qiming","sksn_xingyi","sksn_yiqi"],[]],
                    sksn_halisen:["male","SK_east",4,["sksn_luezhen","sksn_zhengjun"],[]],
                    sksn_pianxian:["female","SK_east",3,["sksn_bugua","sksn_mingyu"],[]],
                    sksn_gaogeli:["male","SK_east","3/4",["sksn_yixi","sksn_kexian","sksn_liangfeng"],[]],
                    sksn_ximengyaweili:["male","SK_east",3,["sksn_mijian","sksn_suozhan"],[]], 
                    sksn_yilian:["female","SK_east",3,["sksn_xingyun","sksn_sifu","sksn_qiyuan"],[]],
                    sksn_xiluwei:["female","SK_east",3,["sksn_liyu","sksn_liansheng","sksn_tianze","sksn_enzhao"],[]],
                    sksn_suerjiade:["male","SK_east",4,["sksn_quanshi","sksn_jiquan","sksn_muzheng"],[]],
                    sksn_geleier:["male","SK_east",3,["sksn_fengdui","sksn_nilun"],[]],
                    sksn_feiluo:["male","SK_east",4,["sksn_chaosheng","sksn_jiaohua","sksn_zijie"],[]],
                    sksn_huaideqiao:["male","SK_east",2,["sksn_yinjue","sksn_ezheng"],["forbidai"]],
					sksn_lujinuo:["female","SK_east",4,["sksn_bianmou","sksn_libing"],[]],
					sksn_nuoya:["male","SK_east",3,["sksn_sanlei","sksn_lianneng","sksn_lingbao"],[]],
//——魔势力——//
                    sksn_maisike:["male","SK_demon",3,["sksn_dingtie","sksn_wuhuan","sksn_changfan"],[]],
					sksn_jiamiu:["none","SK_demon",3,["sksn_lingjiang","sksn_yaowu","sksn_shenshi","sksn_mingwei"],["hiddenSkill"]], 
                    sksn_occupatee:["male","SK_demon",4,["sksn_xueren","sksn_zhenyin","sksn_jianling","sksn_huangyin"],["hiddenSkill"]], 
                    sksn_wuruiya:["female","SK_demon",3,["sksn_xianmou","sksn_jieli","sksn_yihua"],[]],
                    sksn_gaozesi:["female","SK_demon",3,["sksn_qianmian","sksn_yingmo","sksn_zhefu"],["hiddenSkill"]],
                    sksn_nuodengsi:["male","SK_demon",3,["sksn_yumen","sksn_zhichu"],[]],
                    sksn_zage:["male","SK_demon",4,["sksn_langhun","sksn_baying","sksn_jishi","SKSN_say_ZG"],[]],
                    sksn_guergewen:["male","SK_demon",3,["sksn_ankui","sksn_chuanmi"],[]],
                    sksn_lanling:["female","SK_demon",3,["sksn_zonghun"],[]],
                    sksn_kangpasi:["female","SK_demon","3/5",["sksn_duoling","sksn_lingti"],[]],
//——游侠势力——//
					sksn_yigenuosi:["male","SK_qun",3,["sksn_chuansuo","sksn_benglie"],[]], 
					sksn_xintianbuzhi:["female","SK_qun",3,["sksn_yineng"],[]], 
					sksn_muguchen:["male","SK_qun",4,["sksn_qiulu","sksn_paihuai"],[]], 
					sksn_feieryide:["male","SK_qun",3,["sksn_chengE","sksn_yejv","sksn_tongnan"],[]],     
					sksn_dongfanghongdao:["male","SK_qun",3,["sksn_chouyou","sksn_yunshi","sksn_funeng"],[]],
					sksn_yunru:["female","SK_qun",3,["sksn_qudong","sksn_keyan"],[]],
					sksn_anjielina:["female","SK_qun",3,["sksn_genzhi","sksn_congbing","sksn_susheng"],[]],
                },
    //————角色介绍————//               
     characterIntro:{
    sksn_hualun:'<li>【基础信息】<br>技能设计：寰宇星城<br>故事：爪巴<br>称号：<font color=#460046>暮月之弦</font><br>姓名：华伦<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，数学家<br><br><li>【背景故事】<br>他手中的大提琴是一件精美的乐器，古铜色的云杉琴身搭配着金色的细弦，如同天然形成的珍宝一般，这样巧夺天工的艺术品印证着制造者的不凡。高雅，自然，与宫廷里的那些华而不实的家伙事有着根本的不同。<br><br>每天一有空闲，他都会去反复擦拭这把他珍爱的老朋友，直到第三次，他认为琴已经足够干净时，才恋恋不舍地将它轻放到一个精美的木匣中，他绝不允许琴离开自己的视线，所以他将其供奉在自己床前的长方形木桌上，以便在早晨醒来睁开眼时第一时间就能看到它。<br><br>琴，是有生命的。<br><br>华伦对待琴，就像是对待他的爱人。当他架起琴身，轻抚琴弓之时，就感觉自己正在理顺妻子的飘飘长发。当他轻轻拨动琴弦，感觉就像是在与妻子交流，虽然他已经无法再发出任何声音。<br><br>“先生准备好了吗？公爵大人已经到场了。”剧场的女佣隔着门说道。她的活泼音调里听不出来太多的情绪<br><br>今天是表演的日子，他要在公爵千金的成人礼上献曲作陪。如果不是公爵强硬的命令，他才不愿意把自己的“爱人”展示给这些庸俗至极者，那些大腹便便的贵族，他们又怎能理解这琴声中所蕴含的真意？当那些贵族将目光放在他的琴上称赞时，他感觉自己的爱人就像是被他们用眼神玷污了一般。在催促他上台表演的女佣离开后，一股无名的怒火涌上了华伦的心头，他摇了摇三次脑袋，冷静，现在的他只能忍气吞声。<br><br>将琴弓搭上三根金弦，华伦就立刻进入了状态，一切的苦闷的烦躁都在乐曲第一个音符出现之时烟消云散，华伦是天生的艺术家，他不允许自己完美的演出出现任何不和谐的情绪。无论他对那些贵族有多么厌恶，在演奏之时，他始终是心无旁骛，一心一意投入到音律之中。<br><br>华伦双臂轻微张合，大提琴平静地吟唱，使听众的思绪像是舞台下被阳光通透的蜘蛛网一样，轻薄晶莹，与乐声一道随风而去。<br><br>这脉脉含情的微声细语，好像能从中听到粼粼的波光，人们坐在摇摆的独木舟上随波逐流，斑驳陆离的色彩，变换交织的光影，如印象派画家所勾勒的水光天色一般，满目芳馨，满心暖阳。<br><br>忽然间，声调一转，低音奏出的风声描绘出夜幕中森林的冷风萧萧，烘托出沉闷的气氛。忽而弓弦极速变换，激荡出阵阵寒意，好似黑夜冷风中，有谁在策马急奔，弓速愈快，音量愈强，焦急，烦闷，不安的情绪跃然于乐章之上。<br><br>华伦没有按照既定的乐谱演奏，他即兴而作，有感而发，就如同在述说着他的困苦一般，像一个纯真好奇的野孩子，在满是荆棘的黑暗丛林中，看不到回家的路。<br><br>那些贵族们不懂得乐律，他们只是在声波之间感到一阵阵灵魂的颤栗。他们不是为了音乐而来，他们只是在应酬，附和巴结端坐于主人之位上的公爵罢了，而这些道理，华伦都清楚。<br><br>于是，琴声越来越悲怆，越来越惨烈，像是白色月光无精打采地照耀在萧条肃杀的大地。任何音乐家都懂得，悲愁是可耻的，它会悄悄地偷袭一颗高贵的心灵。可华伦难以抒怀自己的孤苦情感，于是他拨动琴弦，带着每个寂静夜晚独自谱曲的孤独演奏着他的一生。<br><br>沉默如冬季冰封的圣河之水，埋葬着暖春的碧波，但华伦始终没有等到解封严寒的春日，至少在下面的人群中，他看不到阳光。<br><br>丝弦非俗物，没有清净的情怀，复杂的情感是很难弹奏越世之音的。灵巧素指，拨动的不仅仅是云杉上的丝，更是心中的弦。音乐是可以洗心的，她可以抵达生命的肌理，并触及灵魂。弦动人心，也惊鬼神。那一道道饱含诗意的琴音贯穿了墙壁，在大剧院上方的天空中回荡，就连弥漫帝都笼罩天空的白雾也渐渐退散。<br><br>一曲作罢，华伦起身谢幕，琴弦之上，仍有华光流转。三息沉默之后，他才看见众人起立，自己被四面八方的称赞和掌声所环绕，所奏的浑厚余音依然在舞台上空回响。<br><br>一次精彩的演出，但对华伦来说并不算成功，他想表达的东西太多了，但当他看向那些底下端坐的听众时，却失望再三。作为请他来演奏的最重要的听众，路西菲尔的公爵大人正受着簇拥在他身边的那些小贵族的殷勤，他们并不在乎华伦演奏的如何，他们只是想靠称赞公爵请的乐师来恭维公爵罢了，毕竟这是贵族社交中最重要的一环。<br><br>也有不少人向华伦投来赞许的目光，但他明白，那不是理解的神情，他是靠自己精湛的技术俘获了听众，但他们却没有一个人能懂自己。华伦无声轻叹，准备转身离开。<br><br>“我想要他的琴！”<br><br>一个女孩的声音传到了舞台之上。华伦停下了脚步，他看到乐团团长在和公爵交流了几秒后匆匆走上台来。<br><br>“这位是公爵之女，今天成人礼宴的主角。”团长向华伦介绍道。之前团长向权贵阿谀奉承的样子就令华伦十分厌恶，现在他跑到华伦跟前，这种厌恶感在华伦脑海里又冒了出来。<br><br>“大小姐看上你的琴了，想把它买下来，华伦，你开个价吧。”<br><br>华伦再三摇头，拒绝了团长的要求。这把琴对他来说就是他最珍贵的宝物，比他的生命还要重要，岂能转手让人？<br><br>“你别不识好歹，得罪了公爵大人我们整个宫廷乐团都得跟着你受罪。”<br><br>华伦仍然是一脸严肃的神情，他不容得别人玷污他所视为爱人的琴。<br><br>“父亲大人，我想要嘛~”女孩的撒娇声从舞台下方传来，公爵的脸色已经十分难看，他边哄着自己的宝贝女儿，边用那凌厉的眼睛瞪着乐团团长。<br><br>“呸，不识抬举！你今天卖也得卖，不卖也得卖！”团长见无法用正常手段从他手里得到那把大提琴，居然直接扒住琴身，想从华伦手里直接把琴抢过来。<br><br>华伦气愤不已，他死死地拽住尾柱，眼神里怒火燃烧。团长立马就招呼了两个手下去拉开华伦，但无论他们怎么对华伦拳打脚踢，华伦始终不松开手。终于，团长恼火了，他一脚踹开华伦，但令其想不到的是他居然手一松，大提琴重重地摔在舞台上，琴身断裂开来，琴弦也全部崩断。<br><br>“唔啊啊咳咳！”<br><br>华伦痛苦地发出一段段痛苦的嘶吼，他是一个天生失声者，儿时受尽了鄙夷和欺凌。自从有了琴，他才真正找回了自己，所以琴对他而言，是相互帮助的朋友，是彼此关怀的家人，更是他存在的意义。然而现在琴已断，他的生命里也就失去了唯一的光。<br><br>“切，断了啊，真没劲。”大小姐扫兴地离开了，公爵用满是怒意的眼神瞪了一眼舞台上的乐团团长后，急忙去哄自己的女儿了。<br><br>乐团团长立刻就有了一种如坠冰窟的感觉。他深知在帝都惹怒了这位大公爵的下场，恐怕自己以及整个宫廷乐团都再难立足，而导致这一切的罪魁祸首……<br><br>“妈的，都是你，败了我们乐团的名声，你特么的……”<br><br>乐团团长气不打一处来，他抄起舞台旁摆放的一把扫帚，朝华伦身上拍去。那些小贵族们聚在下方，现在没有人敢去接近愤怒的公爵，但现在舞台上貌似有乐子可以看，他们这些娱乐至死的家伙们便对舞台上发生的一切都冷眼旁观，期待着一出好戏的上演。<br><br>刹那间，令所以人始料未及的事情发生了，华伦起身将琴弓捅进了团长的胸膛，鲜血顺着琴弓上绷直的马尾缓缓流淌，一滴滴落在舞台之上。<br><br>“杀人了！杀人了！”<br><br>一些小贵族惊呼，他们谁都没有想到，居然有人敢在公爵举办的宴会上杀人。有些叫着卫兵，有些则是如老鼠一般四处逃散。<br><br>华伦无视了倒在血泊中的乐团团长，他耸立在原地，闭上眼睛轻轻抚摸着重新回到自己怀抱里的琴，他的手指划过琴身的裂痕，划过已经不存在的琴弦，他知道，这把琴已经无法再修复如初，就像他之后也再也不能上台演出一样……<br><br><br><br>在一间昏暗的房屋内，窗帘被紧紧拉上，一名红衣女佣端着一杯热咖啡，走到了正在窗边演奏着乐章的大提琴家面前。<br><br>“主人，如今奥丁格兰已死，教会的学院陷入敌对，下一步是否要鼓动国王和雾言联盟之间的战争呢？”<br><br>女佣的声音机械生硬，空洞的眼神里看不到光泽，仿佛一个被随意摆弄的提线木偶。<br><br>华伦没有理会女佣的请示，他自我陶醉在大提琴的舒缓弦音之中，过了许久后才把眼睛缓缓睁开。<br><br>他摇了摇头，至少现在还不是时候……<br><br>最近帝都并不太平，加里恩公爵无故身亡，令人匪夷所思的是，在人们发现他的时候，他就像往常一样瘫坐在自家的沙发上，面目狰狞，耳朵和鼻孔的缝隙里渗出已经凝固的黑色血液，眼神里尽是惊恐，仿佛是在死前看到了什么恐怖的景象。<br><br>根据现场收集到的证据表明，杀害公爵的罪魁祸首是臭名昭著的帝都雾魇费耳伊德。<br><br>巡防的骑士们这些天的精神都不太好，整日整夜战战兢兢地提防着隐藏在街角旮旯里的未知危险，通缉费耳伊德的告示贴满了每个路口，但办案进度却丝毫不见成色。<br><br>雾夜，是帝都最危险的时间。<br><br>隐匿的刺客跟随着贵族的脚步，前往了一个隐蔽的小巷中，浓郁的迷雾阻挡了影的视线，使经验丰富的他跟丢了目标。<br><br>‘莫不是那爱德华已经发现我了？’<br><br>影这样想到，但忽然间，他好像听到一段低沉阴晦的琴弦之声，从雾气弥漫的小巷尽头缓缓传来……',
    sksn_kangpasi:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#D0D0D0>雾海魅影</font><br>姓名：布萝肯·康帕斯<br><br><li>【能力数据】<br>身份定位：反贼，忠臣，内奸<br>能力定位：专业型，控制<br><br><li>【背景故事】<br>布萝肯•康帕斯曾经是一代传奇，但现在她所在的海盗团已经被人遗忘，而她也成为了最后的幸存者——如果说成为幽灵也算是幸存的话。<br><br>她不知道现在的自己属于什么样的存在，说不上是诅咒抑或是祝福，至少她现在还能够用那飘渺虚妄的大脑进行思考。与她一同被困在雾海的，只有自己心爱的“莫比迪克”号海盗船，还有漫游到自己身边终日尖啸的死灵。<br><br>雾海表面像镜子一样平静而且黑暗，海面之上到处都是翻腾的白雾，天空是灰蒙蒙的，微弱的阳光忽明忽暗，经过层层阻碍照射到海面上，映出一片孤寂和惨淡。康帕斯无法离开被漫天大雾笼罩的地区，她只身架着破败的海盗船，漫无目的地在雾海的地界上游荡。她不知道自己是否会像故事书上说的那样，在没有肉体的状态下灵魂渐渐消散，就像是风中的灰烬一般。直到一天，突然有个声音传入了她的脑海里。<br><br>“去引导那些迷失方向的亡魂，他们需要乘船前往彼端世界……”<br><br>这声音深邃至极，浩瀚犹如深渊，似嘲弄，又似命令，又似褒奖，隐隐蕴含着不可违抗的意志，就像是契约一样牢牢地将康帕斯禁锢在原地。只听到寥寥数语，康帕斯的精神便开始涣散，灵魂出现扭曲。<br><br>康帕斯立刻跪下，丝毫不敢忤逆这神秘的存在。从此以后她担负起了收纳海上亡灵的任务，虽然不知道该如何将亡灵渡向往生，但她还是不遗余力地日夜工作着。那些在海上落难的可怜家伙们的亡灵在白天会隐匿雾气之中，在夜晚到来时进行着慎入骨髓般阴冷的哭泣。这时，康帕斯便撒下用灵魂编织的渔网，将那些哀嚎的孤魂野鬼从海里捞起，被她所捕获的灵魂会被神秘的法则禁锢，与海盗船融为一体，不能再离开。<br><br>那道神秘的声音再也没有出现过，但康帕斯却渐渐发现，随着她捕获的亡灵越多，自己的实力就越是强大，身体也越发实质化。于是，康帕斯有了一个大胆的念头，如果有一天她收集了足够多的灵魂，那么她是不是能够重新变回人类呢？<br><br>闻到血腥味的饿狼会主动寻觅猎物的踪迹，康帕斯喜欢看到海上爆发战斗，海盗们的相互攻伐会为她提供足够多的死人。当战斗平息后，便有大雾袭来，笼罩住这片被血液染红的海域，康帕斯无需费力便能坐享其成。<br><br>三分海每天都会爆发或大或小的争端，杀人越货的行为十分常见，康帕斯远远瞭望着海岸线旁起火的船舶，她知道自己该去工作了。<br><br>当幽灵船“莫比迪克”号靠近起火的船舶时，康帕斯才发现，这片战场的惨烈远远超过了她的想象……<br><br>康帕斯长裙飘飘，登上了正在被烈火燃烧的一艘战船。这里刚刚爆发了一场惨烈的战斗，折断的桅杆七零八落地倒在甲板上，旁边几艘较小的船只被整个摧毁，它们仅剩的残骸也渐渐沉入海底，人的身体碎块像垃圾一样漂浮在海面上，引来一群食肉鱼类的争夺，康帕斯听到了还尚未从尸体上离开的灵魂们的哀求，她用带钩子的栓绳将挣扎的死灵从他们原本的身体里拽出来。在收拾完毕后，她突然感受到了一股强大的灵魂能量，康帕斯像是久旱逢甘霖的农民一样，欣喜若狂地奔向能量的源头，在那里，她看到了一个像是鲨鱼的海族海盗倒在一滩血泊之中，光洁的甲板上流淌着猩红。那些想要夺走他生命的人类俯卧在他的周围，早已经没有生机。<br><br>这可是送上门的肥羊！康帕斯心想到。正当她准备张开灵魂的罗网将那个海族的灵魂从躯体里拖出时，一种如同被猎食者盯上的紧张感在康帕斯的脑海里油然而生。<br><br>就在她迟疑之时，那位本该倒在地上的鲨鱼海族突然间腾身而起。<br><br>“传闻中的幽灵？哼哼……可惜，老子现在还没死呢！”海默德扬起他的铁钩子，向康帕斯袭去，康帕斯忽得感受到一丝危险，急忙后退，但手臂上却被钩子划出了一道骇人的伤口。<br><br>康帕斯难以置信地瞪着这个样貌不凡的鲨鱼海族，他刚刚那一击居然能伤到身为灵魂体的自己。虽然她已不被生命所掣肘，但面对面前这位鲨鱼海族时却仍然感到一丝颤栗。<br><br>不过海默德并没有要继续攻击康帕斯的意思，他舔舐着手臂上还在流淌着鲜血的伤口，瞳孔笼上了一层血红的薄膜，海默德看着自己满是伤痕的身躯，细长的嘴缝一直咧到耳根处，像是在欢笑的疯子。<br><br>“那些该死的人类，他们欺骗了我……”<br><br>海默德如是道，他手上青筋爆起，显然是陷入了极度的愤怒之中，那些血淋淋的伤口，就是他落难的证明。<br><br>“我放下海族的高傲，想与他们平等地谈判，但他们却早已经埋伏好舰队，就等着我来咬钩？！”<br><br>憎恶，仇恨，自嘲，以及难以置信的情感冲击着海默德的理智，现在的他更像是一个嗜血的猛兽，势必要撕碎周围的一切事物。<br><br>“也许我们可以谈谈，或许我可以帮你，这位……船长？”<br><br>康帕斯端详着这头暴怒的鲨鱼，她突然计上心来，之前她通过守株待兔获取灵魂的方式效率太低了，为什么不能主动去杀戮呢？在获得了捕获灵魂的力量后，只需要循循诱导，康帕斯就能让那些挣扎的怨魂们为其卖命，而面对性格已经扭曲的人效果更甚。不过海默德也不是什么等闲之辈，他回过头看着向自己抛出橄榄枝的幽灵，心中也有了自己的打算……<br><br>从此之后，他们便结成了同盟。人类的舰队还在为消灭了鱼人海盗而欣喜，他们丝毫不知道，这片美丽的海洋将会面临怎样的恐怖……<br><br>海默德再也没有回到鱼渊，他像是个黑暗森林里的猎手一般在三分海四处游荡，这股笼罩了整片雾海的迷雾飘到哪里，两艘满载着死亡的船就航行到哪里。在白雾的掩护下，它们悄悄靠近形影单薄的船舶，待到那些无知的水手陷入恐惧的情绪无法自拔后，海默德便从迷雾中突然钻出，用他那锈迹斑斑的铁钩收割他们的生命。然后，康帕斯的“莫比迪克”号便慢悠悠地出来收拾残局，将一切倾覆于浪涛之下，最后所有的物质和灵魂都湮灭于大雾之中，海面上留不住任何痕迹。<br><br>杀戮与鲜血改变了这个曾经志在远方的船长，他变得残忍和暴虐。大雾和诅咒将康帕斯囚禁于雾海，而仇恨则将海默德牢牢地和战争捆绑在一起。<br><br>夜晚，当海默德倚靠在甲板的围栏上时，就听见了船周围亡灵的哭喊和悲嚎，‘莫比迪克’号上死去的船员们站在他身边，他们的灵魂在月光的照射下显出了清晰的轮廓。海默德厌恶地挥了挥手，拍散了周围的灵魂。<br><br>“他们只是一些死人，海默德船长。他们不会感到痛苦，不会恐惧，不会有任何欲望，他们刚刚只是被你身上的生气吸引罢了。”康帕斯说道。<br><br>“我只是感叹这个世界太不公平，它总是让想努力活着的人遗憾地死去，让想死的人痛苦的活着。”海默德注视着那些被他拍散，正在缓缓凝聚身形的亡灵们，这些人里不乏有生前驰骋海洋的一方霸主，富可敌国的商人，经验丰富的海兽猎人，但如今他们却只能以如此卑微的形态存在着。<br><br>“但这就是现实。”康帕斯的声音冰冷死寂。',
    sksn_xieyaoxiafeiji:'<li>【基础信息】<br>角色设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#4A4AFF>劫海二将</font><br>姓名：蟹尧&虾费基<br><br><li>【能力数据】<br>身份定位：忠臣<br>能力定位：辅助型，卖血<br><br><li>【背景故事】<br>海默德踢开了躺在大殿地面上的一具尸体，他缓缓走向殿堂中央，在那里，畏缩着龙庭最后的抵抗势力。海默德用仅剩的那只手擦拭着一根生锈的铁钩子，上面还时不时滴落着未干涸的血液。<br><br>对于光明礁来说，这一天格外的漫长……<br><br>一群海灵护卫将他们的统治者海灵姬牢牢围住，不让海默德靠近分毫。双方形势剑拔弩张，整个龙庭静得连呼吸声都听得格外清晰。<br><br>经过了一段漫长的沉默后，他终于开口道:“我十年前对涅普顿说过，如果你不杀死我，那么等我再度回归之时，就会杀死你们。可我现在打算给你们一个机会，海灵姬……交出那个东西，向我投降，我保证你们人鱼王室的安全。”<br><br>“呸！休想，殿下，我们决不能向这个叛贼屈服啊！”一名人鱼护卫将海灵姬护在身后，双手紧紧握住兵器，大有与其死战之势。<br><br>不过在海默德看来，这不过是小孩子在虚张声势而已，他大笑道:“是的，我是一个所谓的反叛者，但你们为什么不用自己愚蠢的脑袋去想想，在我的皇家宝藏号进入人鱼湾之时，为什么没有人上前阻拦？我们的同胞们？他们默认了我的作法。他们喜欢看到我们蹂躏那些该死的人类，而不是卑躬屈膝地乞求和平，这是就是为什么海族抛弃了你们，而选择了我的缘故……我们曾经是海洋的霸主，但你们人鱼一族为了维系自己的统治，却压制其他海族强者的成长，在你们所设立的秩序下，我们没有了对武力的崇拜，越来越偏安一隅，海族的整体实力每况愈下。而人类，却因为内斗和战争不断进步，实力越来越强大，以至于现在他们能可以将船开到三分海的任何地方。不过现在不一样了，我回来了，我来将他们带向未来！”<br><br>一名人鱼护卫听不得他在此狂妄，按捺不住怒气，嘴唇不停地发抖。“你一个残暴嗜血的鲨鱼，又有什么资格来决定海族的未来？作为弱肉强食的信奉者，满口都是强盗逻辑，你们又怎么会为整个海族的利益考虑？”<br><br>“尊贵的人鱼小姐们，我是残忍，可你们谁又在乎过海族同胞们的生命呢？我曾到很多地方，包括人类所统治的陆地，我看见我们的同胞，他们的脖子上戴着枷锁。鱼人在人类社会就是一件活着的商品，他们被奴役，被驱打，他们成为了贵族们的展览品……是我杀了那些商人，毁了他们城镇，才把我们那些可怜的同胞们从人类手中解救出来，他们加入了我的船队，成为了我的同伴，我们不断地进攻陆地，不断地和人类交战，不断地变强才得以在这三分海上所向披靡，使人类听到我们海族的名号才能闻风丧胆！我有时候就在想……他们在牢笼中苦苦哀求的时候，你们在哪里？海族的庇佑者们又在哪里？”<br><br>海默德张开了双臂，如一个救世主般地宣讲道:“所以，我的回归将改变我们同胞的命运，将海族带向本该属于它的巅峰。我要让那些该死的陆地裸猿为自己的傲慢付出代价！用他们的鲜血来祭奠我们死去的同胞！”<br><br>海灵姬皱着眉头，义正言辞地反驳道:“我们的存在，不是为了战争！”<br><br>海默德微微一笑:“我们进行战争，是为了能够生存！”<br><br>“战争就像是平原上的野火，一但燃烧就再难停息。我们和人类之间需要和平，以暴制暴永远没有出路，不是今天你杀我，就是明天我杀你，仇恨在孩子心头发芽，他们无时无刻不担心自己被杀死，每天都在担忧自己能不能看到明天的太阳，这样的世界真的是海族想要的世界吗？这样的生活真的是海族想过的生活吗？为什么我们与人类不能和平共处？为什么我们不能共同创造一个美好的世界？！”<br><br>“美好是小孩子的童话书，可现实总是残酷的。弱肉强食，天经地义，在这个世界上不是小鱼被吃掉，就是大鱼被饿死。不是我们奴役他们，就是他们奴役我们……你们站在高处，自然看不到匍匐在海底的蠕虫，也自然不知道和平对他们而言，还不如一顿饱饭重要。”海默德的表情突然变得严肃起来。<br><br>自知已经无法再与海默德交流，海灵姬只得选择殊死一战，她向着周围的战士们吩咐道:“海灵护卫！迎敌！”<br><br>随着海灵姬的一声令下，海灵护卫摆出了进攻的姿态，向海默德冲来。海默德纹丝不动，只见他身后蹿出两个巨大的身影。一个高尖瘦长，操着一根银色的尖叉，但身形却是如佝偻一般。一个身体宽厚扁平，一对大鳌虎虎生风。一个似虾，一个似蟹，位列海默德左右两侧，招架住了海灵护卫们的攻击。<br><br>这便是海默德独霸三分海所倚仗的两员大将——蟹尧和虾费基。<br><br>“当你将战胜我的方法从言语转向武力的时候，你的意志就已经动摇，也就不配做我的对手了。”海默德失望地摇了摇头，然后向着比了虾费基一个手势，在众人的注视下转身离开了大殿。<br><br>虾费基当然知道海默德的意思，他对着一旁挥舞着巨钳，已经饥渴难耐的蟹尧说道:“蟹老哥，这次你终于可以杀个痛快了，船长说只留海灵姬殿下一人。”<br><br>“哼！你们以为自己有多强吗？居然敢小瞧我们，看招！”鱼人护卫们受不了这等侮辱，一股脑的冲上前，其中一个挑起长枪向虾费基刺去。<br><br>“咔”的一声，那长枪居然被蟹尧的一枚巨钳给硬生生地接下，蟹尧咔擦一剪，就好似削铁如泥一般直接将枪头剪成两段。<br><br>“吼吼吼，看来你们也迫不及待了啊。”蟹尧放声大笑，直接向尚在惊惧之中海灵护卫们冲撞过去。<br><br>鱼人护卫们在蟹尧的攻势下毫无还手之力，被打散开来，不一会儿便逐一被蟹尧击溃。这些负责保护着海灵姬的人鱼护卫们连三息的时间都没有坚持到，便被虾蟹二人全灭。蟹尧一个瞬身，控制住了还想负隅顽抗的海灵姬。<br><br>人鱼们的鲜血四溅，残缺的肢体七零八落，龙庭霎那间化为了人间炼狱。虾费基用他的尖叉一个接一个地将还在地上喘息的海灵护卫们刺死。尽管她们不敌面前的虾蟹，但脸上却没有一丝恐惧之情，取而代之的是极度厌恶和恨意。<br><br>她们的大无畏精神把虾费基震慑住了，虾费基握着尖叉，气得浑身发抖，他看向仅剩的一个倒在地上苦苦挣扎的海灵战士，讽刺地问道:“为什么？你们可以心安理得地接受自己统治别人的命运，却不能接受自己将要被别人统治的事实？”<br><br>“与其被你们这种低贱的败类统治，我还不如去死！”那名海灵战士怒吼道，她不知道从哪里爆发出了强大的力量，一个加速起身冲向虾费基，却被后者轻松地挑起尖叉贯穿了身体。<br><br>“不要！！！”海灵姬泪水立刻涌了上来。但护卫的鲜血已经顺着那根尖叉缓缓流下，虾费基没有任何表情，他自言道:“我是一个卑劣的虾人族，但那又怎样？我是在杀戮中站起来，从血海里走出来的……我比你们这些在安逸环境中成长的战士要强得多。”<br><br>人鱼那双空洞的眼睛还在死死地盯着虾费基，这蔑视的眼神洞穿了他的脑海，回忆像海浪一样缓缓涌来，他任凭海风呼啸，海浪涛涛。<br><br>虾费基将尖叉从那名海灵护卫的尸体上拔出。舔了舔上面残存的鲜血，继续说道:“你们人鱼族能够统治海族千年靠得不是高贵的血统，而是因为你们的祖先比其他的海族要强大，但现在我们比你们要强大，所以你们就该接受自己的命运。因为古往今来，强者统治弱者是永恒的，而强者却不是永恒的。”<br><br>蟹尧钳住了海灵姬的两个手腕，将她像抓小鸡一样提到虾费基身前。“我说老弟，这个该怎么处置啊。”<br><br>“船长命令我们不要杀她，但船长并没有说过我们不能给她一点儿教训……”<br><br>虾费基挥动着尖叉，将其狠狠地刺进了海灵姬的鱼尾里，海灵姬撕心裂肺的大声尖叫，但这样只能引来虾蟹的一阵阵狂笑。<br><br>“神明啊……请救救海族……救救三分海……”<br><br>海灵姬只得祈祷，随后便失去了意识。',
    sksn_xiayi:'<li>【基础信息】<br>技能设计：§<br>故事：爪巴<br>称号：<font color=#FFAAD5>所谓伊人</font><br>姓名：夏依<br><br><li>【能力数据】<br>身份定位：主公，忠臣，反贼<br>能力定位：辅助型，防御，过牌<br><br><li>【背景故事】<br>克莱门汀，作为海都新君，按照传统登基后的第一件事情就是立后，但克莱门汀不想自己的人生受到别人的左右，所以他利用“新任国师”司吉打压负责礼仪的大小祭司并最终将他们全部赶出了宫殿。<br><br>作为一个有志青年，事业未成，何以家为？况且他本来就看不上那些贵族家里出来的胭脂俗粉们，跟她们打交道总能闻到一股子令人上头的浓郁香水味。<br><br>“朕就算要找王后，也得找个素一点的！”<br><br>这是克莱门汀当着群臣的面所宣誓的择偶标准。当然，整个朝堂也没有人把这些话当真。<br><br>目前的形势下公开选妃是没戏了，但克莱门汀的顺位继承还得继续。群臣只当这是一个小小的插曲，反而他们是不相信克莱门汀能耐的住寂寞，愿意一直打光棍。等到克莱门汀将来“龙性大发”的时候，他们再把自己家族选出来的女孩子送到他床上，然后生米做成熟饭，一步跃为皇亲国戚。<br><br>“整个王宫乌烟瘴气，到底是小爷，呸，朕要找老婆还是他们要找老婆！”克莱门汀勃然大怒，猛地一拍桌子，把面前侍立的唐宁吓的不清。<br><br>“可是，我的陛下啊，您也不能偷偷溜到这东港城吧，我又没往您那儿塞女人……”唐宁搓着手，战战兢兢地说道。<br><br>“哼，听说东港发展的不错，朕就打算来你这里散散心。怎么？不欢迎朕？”<br><br>“没有没有，只是臣惶恐接待不周……”<br><br>“朕不用你接待，你呢就呆在这里，哪也不准去，最好也别派人偷偷跟着朕。朕就在这东港城里转转。如果被我发现你有什么小动作，你知道的……”克莱门汀语气很平静，但威胁之意也是浮于表面。<br><br>“遵命，陛下。您尽管转，放心，东港的治安绝对没问题，我拿自己的人头来担保。”唐宁听得出克莱门汀话里有话，也是，借着消遣的幌子来查他，不过这些年来唐宁能稳住脚跟的一大原因就是他深谙自保之道，合法合规地捞钱握权，这违背皇权的事他是一个也不会去碰的，自然也有底气任凭克莱门汀去查。<br><br>在克莱门汀昂首阔步出了城主府后，一个仆役出现在了唐宁身后。<br><br>“老爷，真的不用派人跟着陛下吗？”<br><br>“蠢货，当然得派了，让那些城防队的都利索点，要是他在东港城出了什么闪失，你我都得完蛋。不过也不用跟的太紧，别被陛下察觉就行。”唐宁白了他一眼，恨铁不成钢地骂道。<br><br>东港城是海都尼吉拉斯王国的经济中心，得意于地理优势，商贸产业十分发达，同时也滋生了大量的娱乐场所，比如克莱门汀现在走着的这条灯红酒绿街就能使人从洁身自好走向腐化堕落。<br><br>“看起来唐宁这厮的小日子过得挺滋润的啊……”克莱门汀看着街道两旁的店铺，通通装饰地富丽堂皇，其中也不乏一些风月场所。街道中心区域对角的摩根商行，看上去已经被搬空了，现在被对面的宝石店给盘了下来，正在搞着装修。<br><br>“这里居然有座赌场……”克莱门汀对面前的一个地方起了兴趣，他大步走进海都最大的亨利赌场。就在这时，一个年纪轻轻的金发女孩引起了他的注意。<br><br>“梭哈——开！”女孩游刃有余地将一枚枚银币收入怀中，兴高采烈地在赌桌前欢呼着，在她的身后，一直有一个全身被黑色斗篷裹得严严实实的壮汉站在她的身后，那壮汉约有两米五，而且在层层的包裹下克莱门汀甚至看不清他的脸。<br><br>“看你面生，你是第一次来这里？”没过多久，女孩注意到这一帮老赌鬼里居然混进来一个生面孔，一个和那些野兽般的家伙们格格不入的金发帅哥。<br><br>“嗯。”克莱门汀点点头，他对面前的女孩很是疑惑，毕竟这么小就在赌场里可不是什么好事啊。<br><br>“赌钱是不好的，搞不好哪天就倾家倒产，你还年轻，最好别来趟这浑水。”女孩拍着克莱门汀肩膀说道，活像一个长者在教育后辈。这倒是把克莱门汀给逗乐了。<br><br>他紧接着说道:“稍微玩玩，没什么关系的吧。”<br><br>女孩不知道克莱门汀为什么发笑，还以为他认为赌博并没什么可怕的，于是她便补充说:“你看那边那个缺了一个手指的大叔，他原来也是抱着这些想法上赌桌的，结果现在呢，房子没了，连老婆孩子也都搭进去了，借着高利贷还在赌，还因缺钱被人家切了根手指。”女孩摇着头指了指旁边赌桌旁一个抱头痛哭的中年男人，看上去他刚刚又输了不少。克莱门汀流露出了厌恶的神情，在他的眼中，这种烂人绝不值得同情。<br><br>“那你既然知道赌博的危害，为什么还在这里呆着呢？”克莱门汀反问道。<br><br>“我？我手气好呗。”女孩显得十分淡定，这时，庄家已经开始催促他们下注了。<br><br>克莱门汀不知道该怎么玩，直接把一枚金币丢到了赌桌正中心，这时，他听到了女孩恨铁不成钢似的叹息:“唉，你别下这个啊，会赔死的。”<br><br>“什么？那怎么办啊？这是我身上全部的钱了。”克莱门汀装作着急的样子，他想逗一逗这个表现奇特的女孩。<br><br>“哎呀，你这家伙怎么就……算了，我来帮你赢回本钱，然后你赶紧走人，以后再也别来这个地方了。”女孩很是气愤，但她还是帮克莱门汀下了一注。<br><br>“选豹子！全下。”女孩将所有的赌资压到了豹子上。庄家难以置信地问道:“你确定？豹子的几率可是……”<br><br>“就选豹子，三个三！”<br><br>开盘，令所有人都意外的事情发生了，这骰子的结果真如女孩所说的一样，三个三点。<br><br>全场立刻爆发了猛烈的欢呼声，女孩在众人羡慕的目光中将钱收入囊中，然后将一枚金灿灿的金币抛给了克莱门汀。<br><br>“收好了哦，下次可别再学别人玩这些东西了，对你没什么好处。”然后她又换了一个赌桌，继续开始了自己的赌神表演。<br><br>克莱门汀突然注意到，女孩每次下注前，都要和她身边的那个裹得严严实实的壮汉交流一番。他转头又看向了庄家，对方的脸色很差，或许他都没有想到女孩居然能猜中这千载难逢的豹子。<br><br>就在他刚想离开时，一帮子中年人围住了女孩，他们拉着女孩的身子跪着恳求道:<br><br>“这位小姐，也帮我下一注吧。求求您了，我的儿子治病还需要一大笔钱。”<br><br>“还有我，我家老母……”<br><br>克莱门汀看着这一个一个找上女孩的赌徒们，他们的眼神里没有丝毫的光亮，什么为了救治病人，全是谎言。在他们的眼睛里，女孩不是什么救世主，而是满足他们贪婪欲望的摇钱树。只不过是女孩心生怜悯，不懂拒绝。她一一应下，今天她要代表这些赌徒们和庄家进行一场豪赌。<br><br>庄家也不甘示弱，他心想我还连你这个丫头片子都赢不了吗？，于是他将其中的一枚骰子悄悄替换，然后对着女孩说:“这次你赌什么？”<br><br>“三个一，点小。”女孩看向庄家，嘴角微微勾起。<br><br>庄家冷笑一声，心想小妮子你太年轻了，这次他使用了外挂，保准不赔死你！但随着开盘后，女孩却再一次地创造了奇迹。<br><br>“这不可能。”庄家目瞪口呆地看着三枚刚好都是一点的骰子，他换的一枚骰子明明是灌铅的，百分百掷大点啊。一定是这个女孩，一定是她用了什么手段改变了最终的点数！<br><br>“你出老千！”庄家不能接受这样的结果，他直接伸手拽住了女孩纤细的手臂。<br><br>“我没有，你有证据吗？没证据你就是在诬陷。”女孩扯着对方的手针锋相对，毫不退让，没有丝毫地慌张，这让庄家很是不爽，他开了这么多年的赌场，居然看不出来面前的女孩是如何出的千。在庄家心里，让那些赌鬼们赢钱比他自己赔钱还要气，况且面前的还是个小丫头片子。<br><br>“我诬陷你又怎么了，在这里我说你出了你就是出了，不然你怎么每次都能赢？！”随着庄家开口，赌场四周的安保人员闻讯向女孩靠拢。<br><br>尽管女孩一直在说冤枉，但那庄家打定了女孩是在出千，就算她没有耍手段，但她从庄家手里赢的钱也太多了，庄家自然看不惯她，只不过她没有想到这些人居然明目张胆地想用暴力令她屈服。<br><br>“呸，不要脸，仗势欺人的狗东西，给我放手！看招！”女孩可不想坐以待毙，她伸头咬住了庄家的手腕，趁着对方吃痛时将手臂抽出，与她同行的壮汉张开双臂将她拥入怀中，然后往地上扔了一个白色的物体。“噗呲”一声，整个赌场都被白色的烟雾覆盖。<br><br>“抓住她。”庄家护着自己流血的手腕愤怒地嘶吼着，在烟雾中，克莱门汀也渐渐隐去了身形。<br><br>女孩拼命地逃跑，和那神秘的壮汉一同钻进了一个幽深小巷中。她气喘吁吁地呼吸着，将胳膊搭在了壮汉的背上。<br><br>“唉，又搞砸了，今天可倒霉透了啊……”<br><br>就在此时，女孩突然感受到一丝寒冷的气息，一个看起来像小混混的男人转着一把十分锋利的匕首，他的胸口别着一个银白色的铭牌。他俯视着躲在角落中的二人，轻蔑地说道:“我就说为什么老板让我死盯着你，好家伙，原来这些天赌场经营不善全是你这小娘皮搞的鬼。”<br><br>常在河边走，哪有不湿鞋的，女孩套路了这座赌场这么久，就是再迟钝的老板也该发现一些端倪了。只不过现在好像已经没有别的办法了，她将壮汉护在身后，在那混混的步步紧逼下不断后退。<br><br>“哦？居然还要一个小女孩来保护，你特么是男人吗？”混混冲着裹得严严实实的白熊嘲讽道。那壮汉一听火气立马就上来了，但女孩死死地抓住他，如果他爆发了，那么城防的检测装置会立刻发生反应，到时候就麻烦了。<br><br>正当她在思考该如何应对现在的危机时，只听见“咣当”一声闷响，那混混应声倒地，脑袋被砸了一个大包。<br><br>克莱门汀放下了手里的瓦罐，向着女孩打了一个招呼。<br><br>“唉？你是刚刚那个谁！”女孩疑惑地看着克莱门汀，刚刚的确是他出手救了她，可又为什么呢？<br><br>“我平生最讨厌仗势欺人的地头蛇，包括他们的狗腿子。刚刚看到他想对你做些不好的事情，就下意识地出手了。”克莱门汀微笑道，他一脚将趴在地上的混混踢到一旁，眼神里显露出一丝轻蔑。<br><br>“那谢谢啦，我会找机会报答你的。”女孩不好意思地挠了挠头，然后打算转身离开。<br><br>“等等。”克莱门汀喊住了她。<br><br>“你的同伴……好像有些问题啊，别是什么通缉犯。”克莱门汀觉察到裹住身子的壮汉的异常情况，这个跟穿了夜行衣一样的怪人，早在克莱门汀进赌场时就感觉到了有不对劲，海都气候炎热，怎么会有人把自己裹成这个样子？再加上壮汉大约有两米半高，更引起了克莱门汀的怀疑。<br><br>“不，他是个好人。”女孩否认道，她不想多生事端，连忙拉着壮汉的手，打算赶紧离开这里。<br><br>但……不知是尺码问题还是太过于紧张了，女孩只抓住了壮汉的衣服袖子，走的时候一把将披在壮汉身上的宽大斗篷扯了下来，白色柔顺的毛发从黑布之下倾泻而出，壮汉的身体一览无余地展现在克莱门汀面前。<br><br>这家伙貌似是一头成年白熊……<br><br>“……”<br><br>两人双视无言，随着很长一段时间的沉默后，夏依尴尬地又重新给白熊套上了斗篷。“那个……其实我可以解释……”<br><br>“我缓缓，其实你是驯兽师吧？”克莱门汀猜测道。<br><br>“嗯，唉唉，不是？”<br><br>“虽然海都已经多少年没见过驯兽师了，但我还是有印象的，只是你是不是没有在冒险者协会申请执照，怕被人查出来啊。”克莱门汀没听到女孩疑惑的声音，自顾自地分析。<br><br>“大概……貌似就是你说的那样。”女孩也不打算解释了，越解释越不清，还是顺着他说吧。<br><br>“算了，我也不管这事，只不过现在海都的法律很严，你牵着头熊出门可是会被拘捕的。”克莱门汀关心地问道，东港城内禁止饲养肉食性猛兽，这都是明文规定的。<br><br>不过出乎他意料的是，那头白熊仿佛像是听懂了他们的话一样，连忙摇头，仿佛在说自己并不是猛兽，而是萌兽。<br><br>“那么……你会举报我们吗？”女孩小心翼翼地问道。她的表情可怜兮兮的，也不知是真的还是装的。<br><br>“不会，你们帮我从那些混蛋手里赢回了钱，我不能现在就恩将仇报吧。”<br><br>“害，你早说啊，那我们现在就是一路人了嘛。”女孩兴奋地将手搭在克莱门汀的双手上，但突然间她好像意识到什么，连忙将手抽回，然后回过头尴尬地向着那头白熊说道:“额……熊先生，我们得尽快想个法子出城了，估计这场骚乱一会儿就会传到城防队那里。”<br><br>“你要出城？”克莱门汀问道。<br><br>“对啊，我在这里又没住的地方，不出城等着晚上宵禁了被抓吗？”<br><br>“那我能跟你们一起走吗？我刚好也想要出城。”<br><br>“可以是可以，但为什么你要跟我们走？”<br><br>“世界很大，我想去看看。”<br><br>说实话，这个理由不怎么样，但是女孩通过打量克莱门汀，看着他一身名贵的服饰，想来也不是什么打卡上班的城防守卫。况且这个人的气质给她一种那些豪门世家里正处于叛逆期的公子哥的印象。他自己说想出城，估计是瞒着家人去寻点乐子吧，不过这个人看着挺呆的，感觉像是个老好人，稍微地利用一下也不是不行。<br><br>“那你自己有办法出城吗？我们只能偷渡出去。”<br><br>“这没什么难事，我这儿有枚通行证，到时候你们可以藏到我的马车里，就不用再偷偷摸摸地混出去了。”<br><br>唉？还有了意外之喜，这家伙要是真有通行证的话那么她就不必想法子偷渡出关了，于是女孩很快就同意了克莱门汀的提议。<br><br>“所以，美丽的小姐，我的名字是克莱……克莱恩。不知是否能知晓您的芳名？”克莱门汀行了一个骑士礼，颇有绅士风度地询问道。<br><br>“夏依。”女孩的回应干脆利落，然后拍着白熊的肚皮介绍道:“他是德嘤克萌。”<br><br>不过夏依也不是那种可以无条件信任别人的笨蛋。为了保险，她始终紧紧地和克莱门汀站在一块，以保证自己能在第一时间控制住他，避免他临时变卦向那些城防们举报自己。不过克莱门汀没有在意，或者说他看着女孩形影不离地跟着自己，还略微地有一丝享受……<br><br>克莱门汀找了辆马车，雇了一个车夫，他将女孩和熊都躲进了车厢里，然后交给车夫一枚令牌，并告诉他在出城的时候直接向守城的队长展示即可。<br><br>等到他们出城时，果然碰到了 城防的警戒，原因自然是夏依引起的赌场骚乱，不过今天他们城防队长收到了唐宁的密令，旁敲侧击地告诉他有个大人物要来海都视察，检查进出关人员的态度都好一点。<br><br>“队长，我们拦了一个马车，刚要搜查的时候对方就递过来一个令牌，说您看了自然就明白了……”一个士兵急匆匆地跑到城防队长的跟前，递上一枚金黄色的令牌。<br><br>队长接过令牌一看，连眼都直了，他赶忙跟那人说道“嘘，那里面是个咱惹不得的大人物，快快放行。”他双手颤抖着将令牌还了回去，那上面可是尼吉拉斯王室的标志。<br><br>“放行！”拦车的城防们在接到命令后，立刻一字排开让开了一个通道让马车过去了。<br><br>在顺利地通过城关后，夏依用胳膊肘捅了捅身旁的克莱门汀，赞赏道:“行啊你，这令牌是什么玩意？把那些人都唬住了。”<br><br>“这个啊，我从我爹那里搞来的。”克莱门汀笑道，他可没撒谎，之前这玩意的确是他父王的，只不过现在已经是他的象征了。但夏依没往这方面想，她更坚定了克莱门汀是个大官儿子的认识。<br><br>马车向着城外行进了一段路后，他们在夏依所说的森林外围下了车。这一片森林的树木都普遍发黑，相比于平常的树木好像都低了一个亮度，高耸的参天巨木，还有和成年人差不多高的灌木丛，遍布的荆棘……这些特征都表明了他们面前这片森林的身份。<br><br>克莱门汀感叹道:“禁锢森林……居然已经蔓延到东港城外了吗？”<br><br>“只是一小片飞地罢了，和西部那真正的大森林差远了。”夏依抚摸着白熊柔顺的毛发，对着他亲昵地说道:“我们到家了，熊先生。”<br><br>他们沿着森林的崎岖小路一直向里，走到了一块较为宽敞的空地，那里有一个简陋的小棚，旁边还有一个黑黝黝的山洞。<br><br>“这就是我的营地了，注意别乱跑，要是到森林其他地方，万一迷路了就完了。”夏依跟克莱门汀交代道，如果她拍了拍白熊的背:“熊先生，给咱们的客人先去找点吃的吧，我有些事情要处理，稍后就回来。”<br><br>白熊点了点头，跑出了两人的视线范围。<br><br>“那么，克莱门汀先生，您就在这里稍微休息一会儿吧。我有些事情要处理一下，一会儿就回来。”夏依也朝一个方向走远了，整个营地只剩下了克莱门汀一人，也正因如此，静下心来的克莱门汀才开始思考起自己正在做的事来。<br><br>“我今天脑子好像也秀逗了，居然跟一个陌生的女孩跑到了这种荒郊野外……”克莱门汀自嘲道，但他却并不讨厌今天发生的事。无论是那些赌场的混混，还是白熊跟女孩，这些新奇的冒险是他在宫内从未有过的经历，不得不说，这个名叫夏依的女孩身上的确有什么吸引他的东西。<br><br>天色渐黑，克莱门汀在营地里转了一圈，发现有生火用的篝火堆，但整个山洞里却没有木柴，在森林的夜晚，没有火种是一件极其危险的事，但女孩和那头白熊现在都没有回来，克莱门汀打算自己先去捡几个枯枝。<br><br>树林曲折幽暗，克莱门汀不知道自己该往哪儿走，他忽然想起来女孩告诫他不要一个人到处乱跑，他没有听，结果现在迷了路。克莱门汀打算先去到空旷开阔的地方寻找方向，就在这时，他听到了涓涓细流的声音，那就说明在他的附近应该会有河流小溪。<br><br>于是他顺着声音摸索过去，在扒开了灌木丛的阻碍后，他看到了令他一生都难以忘怀的景象。<br><br>女孩坐在河边的石台上，正一层层脱下自己的衣物，原本就有些轻薄的衣物被潮湿的雾珠打湿后，将少女那曼妙的身躯勾勒得完美无瑕，在粉嫩的肌肤衬托下变得愈发透明，少女那白皙如玉的小脚浸泡在缓缓的清澈河流中，简直让人浮想联翩。<br><br>简直就像是一幅夺人眼目的画卷！笑靥如花，水波灵动，即使身上沾染了一些泥土，也依然遮掩不住她那如同精雕细琢的翡翠一样的躯干，仿佛是工匠大师的打磨艺术品一般。<br><br>蒹葭苍苍，白露为霜，所谓伊人，在水一方。<br><br>克莱门汀痴痴地呆滞在原地。他甚至忘记了自己才是破坏这场景美感的不和谐一笔。<br><br>夏依感受到了一双眼睛正在盯着自己，她慌忙地转过头来，喊到:“是谁？！”<br><br>“呼，你这家伙是怎么摸到这里的？”但当她看到在灌木丛后贼头贼脑的克莱门汀时，这松了一口气。还好他不是敌人，万幸她还没有将衣物全部脱完。<br><br>“天快黑了，我想去捡些木柴，一不小心就到这里了……嗯……我说我不是故意的你相信吗？”克莱门汀现在已经理解到当前的情况了——女孩，河流，洗澡。好家伙，他一个堂堂的正人君子莫名其妙地成了偷窥狂。不过克莱门汀现在也只能硬着头皮解释。<br><br>夏依没有在意他的无礼，或许是在森林里生活久了，这些男女之别已经渐渐淡化。她滑稽地一笑，在克莱门汀的注视下慢慢将自己的脸皮扯下来，露出了另外一个人的面容，而且这个面貌比起之前的那个更加清纯唯美。<br><br>“人皮面具？”克莱门汀认出了夏依所扯下的那张脸皮是什么物件，只是他没有想到，这个在女孩居然是一直佩戴着人皮面具。<br><br>“认识？那就好说了，我原本还以为你会吓一跳呢，只是这张‘脸’估计之后就会上通缉令，真可惜，以后都不能在东港城使用了……”夏依遗憾地叹息道。她将面具用燧石点燃，烧成了灰烬。<br><br>“可我觉得你真正的样子更美。”克莱门汀注视着她那蓝宝石般的眼睛，夸赞道。<br><br>夏依一听到别人夸她，鼻子翘得老高，并挺起来她并不丰硕的双胸自豪地说道:“吼吼，那是自然……等等，这不是你偷看我洗澡的理由，给爷爬！”<br><br>突然意识到当下情况的夏依两颊潮红，气冲冲拾起一枚地上的石子就朝克莱门汀丢去，克莱门汀使用了闪避，石子使用了极速，石子正中克莱门汀脑壳，克莱门汀阵亡……<br><br>白熊这个时候从灌木丛里钻了出来，然后将在地上躺尸的克莱门汀一路拖出了河流的范围，并往他嘴里塞了一个刚摘的苹果。<br><br>“谢谢，挺甜的。”克莱门汀笑道，也不知他说的是苹果还是别的。<br><br>白熊手舞足蹈，就这样他们一直等到了天黑，夏依抱着一捆干柴回到了营地。<br><br>蘑菇，水果，还有一筐鱼，鬼知道白熊是从哪里搞来这么多鱼的，他们就坐在火堆旁，拿着干竹签串起食物烤着吃。<br><br>女孩不像那些小家碧玉一样每个食物都浅尝辄止，给海都造成了严重的餐桌浪费。她更像是一头真正的熊一样，双手捧着鱼凑到嘴边，用两排牙齿撕咬着鲜嫩的鱼肉，丝毫不在意旁边克莱门汀的眼神。<br><br>克莱门汀也不再拘泥，况且他本来就有个改不掉的陋习，那就是大口吃肉，大碗喝酒。无论皇家礼仪老师怎么教他都死也不学贵族用餐的礼仪，最终他获得了胜利，只是老国王再也没有带他出席过什么有聚餐活动。<br><br>女孩一身轻装，完美地勾勒出她并不完美的曲线，她的衣服上面补丁压着补丁，但并没有显得出杂乱，女孩也并非那种邋遢之人，看得出来她也很爱干净。<br><br>还有一个细节引起了克莱门汀的注意，女孩身上别着的冒险者协会的铭牌，是他们海都分部发行的，但这个铭牌却是改版前的老款式，当时除了一些没有下落的冒险者的外，基本上所有的旧铭牌都被回收。也就是说，女孩至少得到它快6年了，但以当时她的年龄的话，是绝对达不到成为冒险者的标准的。<br><br>而且这块铭牌还是个黄金级的纹章……有意思，要么是她偷的，要么就是……<br><br>克莱门汀看着她的一身行装猜测道:“你是偷偷从家里跑出来的？”<br><br>“不是。”<br><br>“那你是怎么得到的这种铭牌的，冒险者协会现在可没有这种东西，这都是老款式了。”<br><br>“我爹留给我的。”<br><br>“你的父母……”<br><br>“死了，他们只给我留下了这个东西。”夏依满不在乎地从披风上解下了黄金纹章，在火焰的照射下，纹章反射着星星点点的光芒。<br><br>“对不起……”克莱门汀不知道她有着如此身世，他为自己的唐突而道歉。他也知道，冒险者如果遇到什么意外，若没有其他的经济来源，他们的子女之后的生活肯定很凄惨。<br><br>“没关系，生离死别嘛，都是很常见的事。”女孩说得很轻松，仿佛这些跟她没有任何关系，但克莱门汀注意到，她偷偷地从背包里掏出一瓶朗姆酒。夏依注意到了他的眼神，便晃了晃酒瓶子解释说:“别用这眼神看我，这个是我自己花钱买的。”<br><br>“花你骗来的钱？”克莱门汀呵呵一笑。<br><br>“赌场赚的本来就是不义之财嘛，我靠自己的本事拿他们的钱这叫替天行道。”夏依哼了一声，虽然面上说的振振有词但实际上却没什么底气。<br><br>“那你所谓的行道就是买酒喝？你成年了吗？”克莱门汀不打算揭穿她稚劣的辩解，微笑着摇了摇头。<br><br>“略略略，要你管啊，不过你这人看着倒是像那些大官的后代，怎么？想去叫城防来抓我吗？”<br><br>“这倒不必，我只是很好奇你和那头熊是怎么组合起来把东港的商人们耍的团团转的。你和那白熊是怎么认识的？”克莱门汀指了指正在扭动身躯蹭着树挠痒痒的白色巨熊。<br><br>“喂！什么那头熊这头熊的，熊先生有名字的，他叫德嘤克萌！至于我们为什么相遇……算了，告诉你也没用。先喝酒！”女孩抓起地上的酒瓶便一饮而尽，然后吐了吐舌头，显然是因为不适应酒精的甘辣。克莱门汀默默注视着这个略显“颓废”的女孩，他总觉得在她的身上有着什么秘密。<br><br>夜深人静，也到了该休息的时间了。<br><br>女孩居无定所，只得山洞里的火堆旁依偎在白熊的怀里浅睡。但正因如此，克莱门汀才得以近距离地观察她，当然还有那头白熊。<br><br>她的睡颜很美，与那些贵族家的小姐们不同，夏依的外貌是天然且未经雕刻的，她的呼吸平稳，半散的头发压在肩后，肌肤如云，沁出一层淡淡的樱粉。<br><br>谁不喜欢这样的女孩子呢？可爱，率真，直爽，要强。凶起来也像那头白熊一样萌萌的惹人怜爱。她的气质和克莱门汀之前所看到的任何人都不同，心境也比一般的人更加坚定，仿佛是夏日盛开的青莲一样出淤泥而不染。如果能将她接进宫里……<br><br>“呸，禽兽，我到底在想什么啊……”<br><br>克莱门汀自嘲道，他什么时候开始关注起这些庸俗的事情来了。只不过，眼前女孩的身份却令他有了兴趣。先不提她和那头白熊的关系，光是他从女孩的言语中，就能觉察到曾经有什么特殊的事件发生在她的身上。<br><br>他忽得想起来在6年前他的父王曾处理过的一件案子，当时的海都正在纠察与地下世界有染，企图颠覆尼吉拉斯王国的异乡人，冒险者协会也进行了一次大洗牌。不少冒险者查出了密谋造反的证据，被处以极刑。当然，克莱门汀也清楚，这些人也并非全都是反贼，有些是得罪了别人被拉出来顶包的。也是自那之后，协会改革，基本上焕然一新，包括身份铭牌这种小物件都翻新重置。<br><br>算了，不想了。克莱门汀打算给女孩守夜，毕竟他也说不出来这东港城外的禁锢森林里到底有没有能威胁到他们的野兽存在，但当他看向德嘤克萌的时候，一切顾虑都消除了，试问有哪个野兽不长眼敢在一头巨熊的眼皮子底下惹事呢？又或许，这片林子里最厉害的猛兽就是德嘤克萌他自己。<br><br>就在这个时候，他的手突然摸到了一个软软的东西，仔细一看，居然是一个黑色的睡袋，看来是夏依她在野外露营时用的啊。这睡袋的质量倒是挺不错的，就是他在软床上睡惯了，在野外的露天环境下怎么也睡不着，自然也就用不上这些东西。<br><br>看上去这丫头是把睡袋留给了他使用，是担心他这个“贵族子弟”在野外睡不着吗？也是够傻的，居然把自己唯一的“床”给了一个刚认识没一天的外人。<br><br>“看来那段过去发生的事比我想的要复杂啊……夏依，你究竟是什么人呢？”克莱门汀看向星星点点的夜空，抬起右手想去触摸苍穹，但却碰不到任何东西。<br><br>“老爹啊，你以前是不是做错了什么事啊……”<br><br>克莱门汀转身望向熟睡的夏依。他的目光浅浅，露出了和以往昂扬傲气完全不同的姿态。她走到夏依的身前，将自己的大衣解下，披在了她的白熊的身上，然后向火堆里又添了一块柴……',
    sksn_guergewen:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>角色配音：九醉书生<br>称号：<font color=#D200D2>隐穹微澜</font><br>姓名：古尔·格温<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：辅助型，控制<br><br><li>【背景故事】<br>科恩城的领主府，现在已经改名为执政厅的后庭里，有三人在一座小凉亭下无所事事，仿佛在等待着什么的到来。<br><br>东方弘道难得叫上了诺亚，为的就是在交易方到来时撑一撑场面，至于猫娘伊莲，杵在原地当个吉祥物就很好，又萌又乖巧。因为对方到了规定的时间点还没有出现，所以东方弘道直接开始赏起了领主府的花来，<br><br>“你叫的这外援不怎么守时啊，到现在了还不来，咱到这亭子里来还真成了赏花的了。”诺亚不耐烦的坐到东方弘道对面的石凳上，嘀咕道。<br><br>“正常现象，古尔格温对传送法阵这东西抱有极度的怀疑，所以选择的赶路方式很是原始，不过不用担心，他基本上不会让我等太久的。”东方弘道解释说。<br><br>“主人，请用茶。”伊莲小心翼翼地将一壶茶水递到东方弘道跟前。东方弘道立即夸了夸这个可爱的猫咪。<br><br>“等等……你是说，古尔格温？那个地下世界情报组织的老大？”诺亚瞪大了眼睛，惊讶地问道。<br><br>东方弘道点了点头，他给自己倒了一杯清茶:“嗯，早些年我跟他打过交道……”<br><br>这时，茶杯里的水面突然有了明显的波动。东方弘道微微抬头，他知道对方已经到了。<br><br>“来了……”东方弘道随后将茶杯放在石桌上。<br><br>一声清脆的鸟鸣之声从执政厅花园的上空传来，诺亚和伊莲连忙走出亭子，注视着远处的天空。一道黑影从远方极速飞来，然后在离他们很近的地方上空突然悬停。这时诺亚才看到这不明飞行物是什么东西——一只约有一个成年人身高的白色巨鸟。<br><br>东方弘道探头望向悬停在执政厅上方的白色巨鸟，没有像他们一样显露出惊讶的神情。<br><br>他呵呵一笑，毕竟谁也不会想到，眼线遍布东大陆的情报组织【诡影】的老大古尔•格温居然是一只紫皮蛤蟆和一只白色的乌鸦。东方弘道在第一次接触古尔•格温时也深受震撼，不过现在不一样了，他越看古尔越觉得他是那只炮灰蛤蟆（魔王蛙）的远房亲戚。<br><br>“那只鸟……很厉害，我在她的身上感受到了强烈的魔能波动……等等，还有另一个气息。”诺亚凑近东方弘道，提醒他道。<br><br>东方弘道点了点头。谁也不曾想过，地下世界的情报帝王古尔•格温竟然是两个人。蛤蟆古尔和白鸦格温这俩贵物始终是形影不离，走到哪里都不分开，他们两个的羁绊甚至超越了物种界限。作为诡影的领导者，古尔实力不算强，但有了堪比领主级魔物的格温守护，地下世界还真没有几个人能战胜的了他。<br><br>巨鸟张开翅膀滑翔，待平稳地降落到庭院后，一个紫色脸上佩戴着古怪面具的紫色矮“人”从巨鸟的背上跳跃下来，轻盈地落到地上，这时诺亚才注意到，面前的这个不足半米的小东西居然是只魔物。<br><br>“下午好，科恩城的诸位大人……咕呱呱。”紫色蛤蟆向三人行了一个标准的贵族礼，伊莲立刻回了一个提裙礼，诺亚愣了愣，也赶忙回礼。只有在石桌边趴着身子的东方弘道一动不动……<br><br>“先让我看看你的东西吧，古尔。”东方弘道一个胳膊撑着脑袋，漫不经心地说道。<br><br>虽然是地下世界的一方帝王，但那个名叫古尔的紫皮蛤蟆好像根本就不在意东方弘道的无礼，他在东方弘道说完后便从袖口里抽出了三枚令牌，然后在空中一字排开。这三枚令牌上面都刻画着两个锁链困住一头雄狮的标志，代表着班卡姆斯城。看来这三枚令牌就是他们需要的通行证了。<br><br>“就这些？”东方弘道大致扫了一眼，语气略带失望。<br><br>“什么叫就这些？你还想要多少？”古尔白了他一眼，不满地说道:“咕呱，你不知道从迈斯克手里捞点东西有多难吗？况且这三个通行证都是经过检验的万能号，你随随便便填个名就能用。”<br><br>眼见古尔这蛤蟆都气的跳脚了，东方弘道敷衍地安抚道:“好好好，你厉害，那你想从我这里要什么？先说好，科恩城目才才刚刚步入发展阶段，拿不出多少钱来。”<br><br>“不，现在还不用你出钱。这算是我给你们的一份见面礼。”古尔指着那三张令牌笑道。<br><br>“礼物？”伊莲歪着脑袋，不明白他的意思。<br><br>“没错，小姐，向客户附赠礼物也是商业模式的一部分嘛。”古尔转头解释道，他随后便将那只大鸟身上驮着的一个橡木箱子卸下，然后用他的权杖敲了敲，箱子应声打开。“这些才是我要交易的东西。”<br><br>伊莲和诺亚二人凑近一看，宝箱里面整齐分列着各式各样的卷轴和道具，便携式收纳袋，各种各样的凭证和腰牌，以及各服务行业的贵宾卡，最重要则是一个金色的纹章。<br><br>“全套服务啊……”诺亚惊叹不已，这蛤蟆怎么对他们需要的东西这么清楚，他于是回头看向东方弘道，后者示意他不必过度惊讶。<br><br>古尔一听他们感叹，属于商人的本能便来了，于是挑出几样宝物便一一讲解道:“当然了，这些东西可难找了，光是这些地图就经历了数十道关口才偷运出来的，还有这个能探查灵力波动的紫耀石，诡影联络人员的信物，以及这伪装成扇子的灵器……”<br><br>“直接说价。”东方弘道不想再继续听他吹嘘自己商品的废话。<br><br>“咕呱，如今东极即将面临一场大洗牌，地下世界的大人物们都已经选好了自己要下注的一方。而我则选择了科恩。我帮你们进入班卡姆斯城，你们帮我扳倒迈斯克，事成之后，班卡姆斯城归你们，迈斯克手里的产业咱们五五平分。如何？”<br><br>“这好啊。”诺亚怕他变卦，于是抢先答应。他心想这不明显就是空手套白狼吗？他们科恩现在啥东西都没有，正愁该怎么进入班卡姆斯城的时候，这个蛤蟆就来雪中送炭，大善人啊。<br><br>古尔一听诺亚答应了，也十分高兴，看来这个新上任的执政官完全不懂奴隶贸易这里面的水有多深，甚至还以为自己赚了。<br><br>这俩人于是互相握手，相处十分融洽。两人都认为自己没有吃亏，一切都是那么和谐美好，仿佛没有人受伤的世界就这么达成了。<br><br>“我拒绝。”东方弘道的这三个字直接给他俩头上浇了盆冷水。<br><br>“喂，你什么意思？！”古尔一听自己的计划被东方弘道打乱了，于是气愤地喊道。<br><br>“行了，古尔，你也别搞这些套路了。咱们开门见山，我的要求是，班卡姆斯城和迈斯克的产业全部归科恩所有。以及将来南部各城镇里的贸易也同时全部归属科恩管辖。”<br><br>“咕哼哼，你这要求可不怎么有诚意啊，你拿着一个空头支票就想跟我坐地起价吗？。”古尔皱了皱眉，不满地回复。<br><br>“东极地下世界最大的帝王便是迈斯克，他倒台之后所空余出来的市场庞大无比，你可以从中捞多少好处你自己心里清楚。但迈斯克的那些明面上的产业对于科恩的发展来说尤为重要，如果没有这些的话，那我们就没有什么可以谈的了。”东方弘道说罢，便要起身离开座位。<br><br>“慢着！”古尔一个健步冲到东方弘道面前的石桌上，伸出双臂拦住了他。东方弘道低头注视着这个仅仅有半米高的小怪物，脸上没有显露出任何妥协的表情。<br><br>古尔知道在这场交易中他已经无法再从东方弘道手里讨得什么好处了，他咬咬牙，说道:“好，算你狠，我答应你的要求。不过我要附加一个条件，以后你们要是踏足地下世界的话，首要考虑的合作对象必先是诡影。”<br><br>“这没问题。”东方弘道爽快地答应了，他招呼着诺亚将那三枚令牌和宝箱一并收入囊中。<br><br>古尔哼了一声，也不打算再说什么。他回到自己原来的位置拍了拍格温，后者温顺地将头低下，俯身让古尔坐上去。古尔将那根比他还高的木杖横在身后，向东方弘道挥手道。<br><br>“那么就祝你们好运了，可千万别死在了班卡姆斯城啊，咕呵呵。”<br><br>“那也听我一句劝吧，古尔。最近南边不怎么太平，你最好还是回荒芜疆土的大本营里呆着吧，东极的水太深，你把持不住。”东方弘道戏谑道。<br><br>“？”古尔没有理解到东方弘道最后那句话的意思，什么水深？他把持不住啥？但格温已经伸展翅膀，腾空而去。<br><br>“嗯……他刚刚为什么就这么同意了。按理说我们没有付出任何代价吧。”诺亚在古尔格温走后，向东方弘道请教道。<br><br>“交易不一定要我们现在就能给出什么东西，这更像是诡影的一场投资。诺亚，你知道地下世界为什么叫做地下世界吗？就是因为古尔这些无法在明面上活动的人，他们既渴望获得巨大的利益，又不想让自己身处危险，所以他们便躲在黑暗中，培养和扶植他们的代理人来帮助他们进行统治和掠夺。我没有想到的是，古尔的眼光居然这么刁钻，他放弃了阿港和西尔斯选择了科恩，看来诡影密切的情报网给了他比别人更加丰富的信息量啊……”<br><br>“那我们能赢吗？”伊莲担忧地嘀咕着。<br><br>“一个从来都没有站错队的地下世界帝王都站在了我们这里，你还担心什么？”东方弘道哈哈一笑，宠溺地摸了摸伊莲的脑袋便带着她离开了后庭。<br><br>诺亚呆滞地看着这木箱子，突然间，他的小脑瓜就想到了一件很糟心的事。“*！”（一种植物），合着你东方弘道叫我过来，就是为了让我给你搬箱子？！',	
    sksn_sigeruopi:'<li>【基础信息】<br>角色设计：我是染柒<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#00EC00>炼金大师</font><br>姓名：斯格若皮<br><br><li>【能力数据】<br>身份定位：反贼，忠臣，内奸<br>能力定位：专业型，印卡，强化卡牌<br><br><li>【背景故事】<br>“这次就麻烦你了，亚伯。”<br><br>“没关系的，教授。既然您是奥丁学院长选择的接班人，那么学院里的每一个人都会像对待学院长一样对待您的。如果有什么需要帮助的，尽管告诉我们学生会就好了。”亚伯回头看向尤里维斯，在这黑暗的旋梯处，他的眼睛依然纯结明亮。<br><br>“教授，请跟紧我，这一段路没有灯光照明，小心脚下和头顶。”亚伯将煤油灯举起提醒道。<br><br>“好的，话说为什么这位炼金学的教授会住在这么一个偏僻的地方呢？”尤里维斯随口一问。<br><br>“这个嘛，因为只有地下室才能最大程度上避免和学生们直接接触。自从那场意外发生后，斯格若皮教授就远离了讲台，因为学生们貌似无法接受他的……画风。不过斯格若皮教授平常很好相处，您也不用过于担心。”<br><br>在走完最后一段旋梯后，亚伯将手中的煤油灯递给了尤里维斯，然后说道:“教授，地下室到了，斯格若皮教授这个时间应该在里面做实验，如果没什么事的话我就先回去了。”<br><br>尤里维斯点了点头，后者微微颔首示意，然后渐渐消失在上旋的阶梯处。<br><br>“这小鬼是不用灯也能看清路吗？”尤里维斯望着亚伯消失的地方，囔囔道。亚伯在学院中实在是过于神秘，基本上就不见他到教室里上过课，但成绩考核依旧不错，听说现在他在给学生会工作，也不知道在做些什么……尤里维斯摇了摇头，现在不是想这些的时候，还是见斯格若皮要紧。<br><br>“斯格若皮教授？您在里面吗？”尤里维斯借着灯光靠进并敲了敲地下室的木门。<br><br>“啊？我现在在忙，门开着呢，请进。”地下室里的一个浑厚的声音回复道。<br><br>“谢谢，您……好？”在听到里面那人的答复后，尤里维斯打开了地下室的木门。这个时候足以令他震惊的一幕发生了。<br><br>一个高大的生物闻声便从一个工作桌后转过身来，微笑着和他四目相对。<br><br>这个与尤里维斯眼对眼的生物，居然是一头双手捧着药材篓的棕熊！它大约有两米多高，浑身上下毛发充盈，俩眼珠子黑漆漆的，左边的眼睛上还戴着一片护目镜。更令人惊讶的是这头熊的身体后面还安装着两只正在活动的机械手。<br><br>“哇！”尤里维斯发出一声惊呼，他吓得紧忙后退，这一举动貌似也将那头熊给惊的一个踉跄坐在了地面上。啪叽一声，那头熊身旁的玻璃制的瓶瓶罐罐便碎了一地，桌上仪器也被震翻了……<br><br>啥情况？地下室怎么会有熊？！有没有求助热线啊？学院的地下室里遭遇了棕熊该怎么办？！在线等！很急！<br><br>“咦？唉唉唉？啊！抱歉，我忘了自己现在的模样了。您先冷静一下，听我说一句。”那头熊也没想到尤里维斯会如此反应，于是他连忙站起身来挥手道。<br><br>这不开口还好，一开口尤里维斯的脑袋更加懵了。如果说有比在地下室里遇到一头熊更让人感到惊恐的事情的话，那便是这头熊能口吐人言。<br><br>但好在尤里维斯提前有了心理准备，这些年也碰到了不少稀罕事，这也致使他没有像以前一样撒腿就跑，再说这头熊看起来貌似有神智，通人性（雾），貌似是可以交谈哒。于是他弱弱地问了句:“那个，请问您……是熊吗？”<br><br>熊先是愣了愣，他突然缓过身来，挠着这个布满了毛发的后脑勺说:“啊这？哈哈哈，别担心，先生。您别看我这个样子，我之前可是个货真价实的人类，只是因为一场意外变成了这样而已。所以您不用害怕的，我不吃人。”<br><br>“……”尤里维斯不知道该说些什么了，他走向了棕熊，打量了对方几秒后，便开口问道:“是吗……所以说，您就是凯洛亚学院的炼金学教师——斯格若皮教授？”<br><br>这回和他设想的一样，那棕熊立刻点头，用他粗大的熊掌拍了拍自己的胸脯言道:“没错，我就是斯格若皮，如假包换。”<br><br>“那我能问一下你是怎么……变成熊的吗？我不是歧视熊啊，我只是有些好奇而已。”尤里维斯尴尬地笑道。奥丁曾说过有些魔物可以伪装成人类的模样，但他没说过人还能变动物啊……<br><br>“啊？我这样子是因为之前喝了一瓶炼制失败的变形药水，而且我现在找不到解药，所以这熊身一时半会也变不回去。虽然现在我的意识没有变成熊的意识，但用这双熊掌操控高精度的实验来还是有些力不从心，所以我就给自己安了一双机械臂……”斯格若皮指了指他身后的那两只辅助手，其中一只还挥了挥向着尤里维斯打了个招呼。<br><br>“那我正式地介绍一下自己吧，我的名字是尤里维斯，很高兴认识你，斯格若皮教授。”尤里维斯身体微倾，并向前伸出右手。<br><br>“尤里维斯？久仰大名啊，我之前就听奥丁格兰提起过你，这些天您为学院东奔西跑，劳心伤神的，我们这些教师都打心底里感激您。”斯格若皮接过他的右手，紧紧地握住。<br><br>“分内之事罢了，我做的还不及奥丁的一半……不说这个了，您现在是在炼药吗？”尤里维斯的目光绕过斯格若皮魁梧的身躯，看向了后面还在冒着热气一口黑色大锅，不出意外的话这便是斯格若皮教授的炼药锅了。<br><br>“啊，对，差点忘记了！这是提纯迷惑菇的汤剂，迷惑蘑菇能让人产生快感的极度的兴奋，但它也有着强烈的毒性，这种药剂能在最大程度上洗去迷惑蘑菇的毒性，只留下兴奋作用。”斯格若皮咧嘴笑道，他快速跑向炼药锅，两个如玻璃球般的黑色眼珠中洋溢着快乐的神情。<br><br>提纯剂？听上去的确不错。可当自己望向那口泛着绿色泡沫的炼药锅时，尤里维斯却怎么也无法将它和“药剂”联系到一块。<br><br>所以炼金学还真是神奇啊……<br><br>“我想您来这地下室并不是为了看我做实验的吧，尤里维斯教授。”斯格若皮转过头用他那戴着护目镜的左眼看着尤里维斯，双手还在握着一柄银色的勺子使劲搅拌着炼药锅。<br><br>“嗯，奥丁给我留下了一封信，他让我将地下室里的‘那件东西’尽快从学院宝库里转移到别的地方。”尤里维斯说罢，便将一封烫有金边的白色信封递给斯格若皮，后者伸出一个机械臂接了过去。<br><br>斯格若皮抬手调了调他的护目镜，对焦到信封上。“哦，原来如此，‘那件东西’对学院来说也算是个拥有着非凡意义的宝物。”<br><br>“那个所谓的宝物……其实是是一根人类的骨头吧。最近我在帝都的地下交易站里听到了一些风声，有些人花大价钱打听一截遗骨的下落。”尤里维斯问道。<br><br>“没错，那是首任学院长该隐•凯洛亚的腿骨。在凯洛亚逝去后，学院准备按照其遗愿举行火葬。但在遗体被送进焚尸炉前，一个狂热的宗教徒冲上前来，硬生生地从学院长身上掰下了一截腿骨。当然，他也被当时围观的群众们抓住并关进了监狱里，后来这截腿骨就一直由学院保留着。不过，人类的骨骼并没有什么特别的用途，黑市上能花重金索取的不该是龙骨吗？我实在是想不明白为什么会有人惦记这个东西。”斯格若皮边说边用他的机械臂操纵着镊子将几柄棕色蘑菇加到熔炉锅里，炼药锅霎时间沸腾了。<br><br>尤里维斯谨慎地远离了乘着不明的绿色液体还在咕嘟咕嘟冒着气泡的炼药锅，随便找了个储物柜靠到边上。“我倒是听闻了一个说法，圣光教会三大圣物之一的【圣人骸骨】具有重塑神格的功能，如果配合某种秘法的话可以强化或重塑腐朽平庸的躯体。”<br><br>斯格若皮摇了摇他的棕熊脑袋讥讽道:“都是些以讹传讹的传说罢了，帝都已经多少年没出现过圣人了？况且凯洛亚学院长至死都宣称自己是无神论者，怎么可能会被冠以圣光教会的圣人名号呢？”<br><br>尤里维斯也陪衬着笑了一下，但根据罗意奥的情报，先代学院长该隐•凯洛亚在教会的英灵殿里的确有对应的圣位，至于为什么一个反对宗教的人会被教会供奉，或许这些只有教会他们自己人才知道了。<br><br>在尤里维斯思考的时候，斯格若皮从一旁的柜子里取出一个黑色的锅盖，用它盖住了冒着绿泡的炼药锅，开始了最后的焖制环节。<br><br>在找了一圈没有发现自己将板凳放到了哪里后，斯格若皮干脆就像头真正的棕熊一样直接坐在了地上，然后向尤里维斯问道:“不过如果是奥丁格兰要求的话，那么自然有他的考量。不过我很好奇，你打算把它转移到哪里？学院可没有多少地方能藏得住东西。”<br><br>“一个其他人都想不到的地方。”尤里维斯从衣服口袋里掏出一个金色十字架晃了晃。<br><br>“哈哈，这个地方的确是想不到啊。”斯格若皮恍然大悟，他终于明白奥丁为什么要选尤里维斯做为接班人了，就在此时，随着炼药锅盖发出一阵长时间的气鸣，斯格若皮的惑菇提纯终于完成了。<br><br>“您要尝一个吗？”斯格若皮兴奋地指着炼药锅里漂浮的蘑菇说道。<br><br>“额……下次一定。”',
    sksn_delike:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#004B97>远洋之志</font><br>姓名：德里克<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，距离掌控者<br><br><li>【背景故事】<br>“船长，我们马上就要驶入雾海了。”一名水手端着望远镜观察着远方的海面，向弗兰西·德里克船长汇报道。<br><br>德里克一手捧着罗盘，一手握着航海图，气定神闲地说道:“升帆。”<br><br>这已经是他第六次出航到雾海了，虽然雾海和北部海并没有什么明显的界线，甚至北部海就是由雾海和血海的北部地区所构成的一个狭长的海上走廊，但海都的船长们都有一个约定俗成的规则:驶入了雾海，才算真正进入了世界的尽头——三分之海。<br><br>“这船还挺快的嘛。”伊格诺斯从船舱里探出头来，挥手向德雷克打招呼。<br><br>“是啊，海都科技名不虚传。”<br><br>德里克十分感慨，若不是这位少年突如其来的资助，他平生最后一次的航海将是遥遥无期的泡影。作为本次航行的最大股东，伊格诺斯没有向德里克索要任何战利品分成，而是提了一个再简单不过的要求:载他去鱼渊的中心地区——光明礁。<br><br>光明礁是一片由珊瑚礁和一连串的火山岛形成一条岛链，是海族的栖息之地。其中的人鱼湾更是人鱼族的圣地，也是所有探险家所向往的藏宝之所。德里克自然也不例外，在他跟随老船长第三次出海时，他们误打误撞驶入了鱼渊，被一群人鱼拯救，跟海族结下了深深的友谊。从此，老船长便反复穿越雾海，成为海族和人类之间交流和贸易的桥梁。在他与老船长最后一次航海中，老船长得了败血症，根据他的遗愿，德里克将他埋葬在光明礁旁的一座无名小岛上。<br><br>“船长……我们马上就能再见了……”德里克盯着手中的罗盘囔囔道。<br><br>弗兰西·德里克，海都历史上第一位征服了三分之海的船长。先前他不过只是一个见习海盗，自从跟随老船长弃暗投明后，便被海都的老国王授予的骑士勋章。在他的提倡下，海都组建了强大的海军，并由其好友凯恩来担任司令。可随着德里克年纪越来越大，他逐渐远离了他热爱的海洋，退居幕后，但他想要出海的愿望却一直没有改变。正巧一位少年找到了他，说他愿意出资帮助他再次驶向他心心念念的鱼渊。于是德里克重新将自己的罗盘从储藏室里翻了出来，他怀着激动的心情立刻用自己的人脉集结了十多位海员，趁着风平浪静即刻出航。<br><br>伊格诺斯靠在甲板的围栏上，眺望着远处的大海，一些水手海员也欣赏着海面上跃起的飞鱼和时不时略过的海鸟。他们大部分也是第一次出航到雾海，毕竟这条航线没有一个有经验的船长带领的话极其容易迷失方向。征服三分海是每个航海者的梦想，但往往他们连最开头的雾海都无法穿越，其中一条原因便是——<br><br>“船长先生，前方有些不太妙啊”伊格诺斯注意到前方几百米开外的海面上的异动，十几道黑色的身影正朝他们极速冲来。<br><br>“海蛟群！是一群出来狩猎的海蛟！”船长端起了望远镜惊呼道。他赶紧唤来大副，对其交代道:“让所有人都备好武器，我们有大麻烦了。”<br><br>“妈的，早知道就跟凯恩借门大口径火炮了。”德里克懊恼地说道，他们配备的对付海盗的火枪打在海蛟这种生物的身上简直是在挠痒痒。“所有人打好十二分注意，海蛟不是单独的狩猎者，他们会像狼群一样分工合作，切莫落单！”<br><br>“船长先生，既然你说这些海蛟很像狼群，那么它们的狩猎模式是不是也同狼群一样，总会有一头海蛟在里面领头指挥。”伊格诺斯冷静地分析道。<br><br>“你的意思是……”<br><br>“如果我们把领头的那只杀死，会怎样？”<br><br>“失去了首领后他们就会一哄而散，这倒是个办法，但问题是我们怎么才能找到那个为首的海蛟呢？”德里克摇了摇头，叹息道。<br><br>“这就交给我吧……”伊格诺斯看到海蛟，有一只明显散发与其他海蛟不同气息，伊格诺斯嗅到了这点不同，那是上位者的统御之气。<br><br>“左舷第三只，集中火力攻击它！”伊格诺斯高呼道。海员们立即按他的指示向那只海蛟开枪。<br><br>“不行啊船长，我们没有办法击穿它的鳞甲！”一名海员惊慌地大喊。<br><br>“唔哇，它生气了，它冲过来了。”另一名则是指着海蛟尖叫道。<br><br>火枪的骚扰令首领海蛟暴怒，它像毒蛇一样从海面弹射而起，冲向甲板上站着的几名海员，德里克见机抄起一根粗长的鱼叉，径直往海蛟的血盆大口里掷去，银色的鱼叉在空中略过一道椭圆形的弧线，径直刺进海蛟的上颚并穿透了它的头盖骨。<br><br>“哐当”一声，海蛟的躯体重重地落到甲板上，给围栏砸了一个大口子，其血液通过伤口不断流淌，染红了一测的船身。<br><br>随着首领的死亡，其余的海蛟见状则是四散开来，根本无需他们再次开枪驱赶。德里克招呼几个水手扒开了海蛟的皮，又敲下了几颗长牙，这些都能在黑市上卖个好价钱，可见即使是成为皇家骑士船长后，德里克的海盗习性仍然未泯，或许这才是他最真实的样子吧——自由地远航，然后回归。<br><br>“呼，好在你能找到它们的首领，不然我们就危险了……”德里克心脏跳的飞快，他已经不是当年的青年海盗，现在的他只不过是一个垂暮老人，体力和反应都大不如前，但刚刚的千钧一发之际他仿佛感觉自己又回到了三十年前，自己和北海巨妖搏斗时的状态了。<br><br>“怎么这么吵啊？发生什么事了？伊格诺斯。”一个小女孩的声音从船舱里传来，爱萝依穿着睡衣抱着一个白晶抱枕光着脚丫走了出来。<br><br>“没事，碰上了几只不长眼的畜牲罢了，已经解决了。”伊格诺斯轻轻地说道。<br><br>“啊？这样啊，那我先回屋睡了……”爱萝依揉了揉眼睛，打着哈欠就向舱里返回了。<br><br>“船长……刚刚那个……是幼女吗？”大副凑到德里克耳边，小心翼翼地问道。“这位老板玩的可真花啊……这要在海都——”<br><br>“嘘。”德里克将食指抵在嘴边，示意结束此话题。他虽然已经是一个“保守”的老家伙了，但谁没有过年轻气盛的时候？人嘛，总是要犯点错误的……近年来海都的经济和科技飞速发展，人们的生活也越来越富足，难免会出现些道德滑坡。反正跟他没关系，这次他就是个给别人打工的……<br><br>伊格诺斯打了两个喷嚏，他转身看向德里克船长，发现对方正对着他笑，但那张胡子拉碴的脸笑起来总感觉有些不对劲，给人的感觉就好像是……理解和劝戒？<br><br>“船长，我们已经驶入雾海了。”站在桅杆上的海员汇报道。<br><br>“嗯，那么现在船上的磁性罗盘应该已经没有用了，之后你们要听我的口令调整方位。”德里克握着自己手心里的罗盘说道<br><br>“是！”<br><br>在雾海航行了一段时间后，他们渐渐感到船舶周围被一层薄薄的水雾笼罩，已经看不太清远处的海面了，这就是迷失的雾海，没有经验的船长很有可能被困在这里一辈子。<br><br>“船长，前面有道黑影。”突然变故来了，远处的海面出现了一个庞然大物，但隔着薄雾海员们都看不清楚那是什么东西。<br><br>“绕开它！那是‘莫比迪克’号，一艘永远不能离开雾海的幽灵船！”德里克直接下令，焦急的他亲自跑到了舵盘处，把持着方向。<br><br>黑影越来越大，速度貌似也越来越快，德里克船长见机左满舵使船头转向，在两船即将相撞之时将船头偏移，他们便与那艘幽灵船擦肩而过，无事发生。<br><br>“若是与那艘船相撞，我们就只能在雾海里等死了。”德里克感慨道，这艘雾海上的破船十年难得一遇，现在却让他们给碰到了，还好之前跟随老船长的时候有过经验，不至于无法应对。<br><br>“咣咚”船身发生了剧烈的摇晃。<br><br>“又怎么了？”德里克感觉这次出海自己运气差到了极点，别是触礁了吧。<br><br>“没有事，船长，我们刚才撞到了一个方型物体，不过船头没有损坏！”大副回应道。<br><br>等他们将与之相撞的东西打捞上来的时候，所有人都震惊了。<br><br>这是一口漆黑色的棺材。上面描绘着在任何人类国家都未曾见过的纹路，整个棺材并不算大，而且底部极其细长，不像是为人类准备的。<br><br>“开棺。”伊格诺斯有种感觉，他觉得里面好像有什么东西在呼唤着他，但他不确定棺内究竟是吉是凶。况且在大海上出现棺材，在迷信之人的眼中已经是大难临头的凶兆了。<br><br>“可是……”一名海员支支吾吾地说，他们哆嗦着，谁都不敢靠近这口黑棺。<br><br>也是大副胆子比较大，他找了把撬棍，将棺材翘起一个开口。伊格诺斯走上前，将棺盖抬起。众人按耐不住好奇心，往里面望去。<br><br>“人……人鱼？”<br><br>里面静静地躺着一条上半身是女孩的躯体，下半身是鱼尾的传说中的生物。她的胸口均匀地上下起伏，说明她是睡着了而不是已经死亡。<br><br>“哇！船长，这可是活的人鱼啊，活体人鱼在黑市上可是顶级商品，难得一见啊。”大副两眼放光，尖叫道。<br><br>“废话，这我他妈的当然知道，都别给我吵吵了。”德里克让大副安静下来，顺便把其他船员都给吼了一遍。<br><br>“得先把她弄醒再说。”见多识广的德里克船长思索道。他感觉平白无故出现一口装着人鱼的棺材不是什么偶然，在里面可能有别的故事。<br><br>伊格诺斯不知道怎么的，他隐约地在这条人鱼身上感受到了一丝令他熟悉的感觉，他走到人鱼身边摇晃着她的肩膀，但并没有太大的作用，他只好贴近人鱼，悄悄地将自己的异能输送到人鱼身体里。<br><br>人鱼突然醒了过来，睁开了那双美丽到惑人心弦的眼睛，她没有在意其他人，直接将目光锁定到了伊格诺斯身上，开口道:“血色噩梦不久便会降临海洋，迷途之人切莫再复前行……”<br><br>这声音空灵回转，使人沉沦，一时间所有人都像是醉酒了一样飘飘欲仙。但伊格诺斯突然缓了过来，却发现人鱼再次闭上了眼睛。他赶紧叫醒了还在沉溺中的船员们。<br><br>“那声音你们都听到了吗？唉？她怎么又晕了？”一个海员说道。<br><br>“先扶她到船舱里休息吧，其他人都回去干自己的活儿，让我先思考思考。”德里克皱起了眉头，向海员们吩咐道。<br><br>在海员们忙着修理甲板和护栏时，德里克独自爬到二层甲板上一屁股坐下，他倚靠着桅杆，右手拿着一瓶海都产的苹果酒。伊格诺斯在后面慢慢攀上了甲板，向其走近。<br><br>德里克一见他来了，便直接开口询问道:“老板，你怎么想？发生了这些事后，我们还要继续向鱼渊航行吗？”<br><br>言下之意很是清楚，他们这次航行所经历的邪门事太多了，先是海蛟跑出自己的地盘狩猎，再是大海上的幽灵船，最后具体能捞到一口装着活人鱼的黑色棺材。现在返航实际上是最好也是最安全的选择。<br><br>“自然是要前进了，你不也是想继续出发的吗？”伊格诺斯回答的很干脆。<br><br>“不瞒你说，伊格诺斯老板，我已经年近七十，满打满算这都是我最后一次出海了……我等这次机会等十好几年，我不想再留下一辈子的遗憾……”德里克开了一瓶苹果酒，摇晃了起来。<br><br>“哪怕会死？”伊格诺斯直白地问道。<br><br>“人类最伟大的地方，就是在于即使他知道前方道路上有怎样的危险，但依然选择继续向前。”德里克眼睛闪烁着勇敢者的光芒，他继续道:“哪怕面临死亡，我也义无反顾。海洋是我一生的写照，如果人能选择自己的结局，那我想死在航行途中……不过你呢？你为什么还坚持前进呢？我载过无数的人，他们或是为了钱和宝藏或是仅仅只为了体验航海。但你不同，如果为了钱，那条人鱼就够一船人逍遥快活一生的了，如果仅仅是想去人鱼湾转转的话，也不至于面对海蛟群时依旧保持冷静。我很好奇啊，伊格诺斯老板，你是为了什么而前往光明礁呢？”<br><br>“找人。”伊格诺斯轻描淡写地回了一个词。<br><br>“光明礁可没有人类啊，都是些鱼头鱼脑的家伙罢了。”船长呵呵一笑，显然是不相信。<br><br>“不去又怎么知道呢？况且我也并非漫无目的地瞎找。”伊格诺斯也不怨他，毕竟他刚刚说的语气的确像是在开玩笑。<br><br>“好好，那我就祝你好运了。”船长笑了笑，将瓶中的苹果酒一饮而尽。',
    sksn_you:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#40E0D0>海洋之魂</font><br>姓名：佑<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，过牌<br><br><li>【背景故事】<br>经过了一系列惊险奇异的事件后，船终于顺利驶出了雾海的迷雾区，船员们又见到了久违的天空，但即使现在夜晚的月亮已经高悬在天边，他们仍然没有丝毫困意。伊格诺斯倚靠在桅杆旁，宛如一座雕像，纹丝不动。<br><br>“老板，你相信世界上存在神明吗？”德里克船长悄无声息地从甲板上走了过来，抬头望着天空中的星星向伊格诺斯问道。<br><br>“不信。”伊格诺斯将一杯苹果酒凑进自己的鼻尖，闻了闻。他隐约记得以前学业考试前，自己曾在床头上握着十字架默念了几百遍我主保佑，但这并没有使逃脱他挂科的命运。<br><br>“那可不行啊，如果没有信仰的话，万一在大海上迷失了方向，就很难保持精神正常。信仰能强化自己的精神力量，使其在绝望中免于崩溃。”德里克向他分享起来自己的航海经验，上了年纪后，他乐衷于向航海的后辈们讲述自己的故事。<br><br>“或许吧。”伊格诺斯吹着海风，敷衍地说道。<br><br>“船长，船长，那条人鱼醒了！”一名水手跑过来，火急火燎地说道。<br><br>“我们去看看吧。”德里克伸了伸懒腰，向伊格诺斯伸出手，将后者拉了起来。<br><br>他们赶到船舱时，里面基本上已经被躁动的水手们给塞满了。大伙儿基本上都没有见过真正的人鱼，所以像是观光团一样将其中的人鱼女孩团团围住。大副一见船长来了，急忙让出一个过道来，伊格诺斯和德里克就这样从人群里穿了过去。<br><br>人鱼静静地盘坐在床上，她披着海员们给她盖的被子，一条鱼尾随着船身的晃动而晃动。她精致的就像是布偶娃娃，但白皙的小脸上却看不出任何表情，她丝毫不受喧闹的水手的影响，仿佛是在静静地等待着什么人的到来。在感知到两个气息的靠近后，她看向了伊格诺斯和德里克。<br><br>“你叫什么名字？”德里克直接开口问人鱼女孩道。<br><br>“‘佑’，我是三分海之灵，庇佑鱼渊的海洋之魂。”佑一字一词的回答道，她的脸上并没有挂着什么表情，就像是一位刚刚下凡还不食人间烟火的仙子。<br><br>“海洋之魂？”德里克倒吸了一口凉气，他瞪着跟板栗大一样的眼睛审视着佑。虽然之前已经遭遇了各种离奇事件，但他还是深深的被震撼到了，海族对于神明的信仰很纯正，他们是不会冒充自己所敬仰的神明的，尤其是人鱼族，所以这个女孩很有可能是真正的海洋神明。<br><br>但德里克却有一个困惑，他问道:“那为什么你会躺在一口棺材里，还飘到了雾海？”<br><br>“为了躲避一条被血腥污染之灵的魔掌，现在的人鱼族祭司海灵姬将我封印在黑棺里，通过洋流送出了鱼渊。”<br><br>“神也有怕的人吗？”其中一名水手嘀咕道。<br><br>“我是三分海的意志，海族的守护者，但这并不意味着我就比其他海族要强大。”佑解释道，她不像海神涅普顿一样拥有着踏浪弄潮之力，她更像是一种精神的具现，是海洋的传声筒。<br><br>佑扫视着围绕在她身边的人类们，最后将目光停在了伊格诺斯身上。<br><br>“你很特别，伊格诺斯。”她直接叫出来伊格诺斯的名字，但声音依旧没有什么情感。伊格诺斯却突然感受到了一股强大的威压，那种能穿透身体的神识在他身上不断游走，佑始终保持一个面瘫脸，直到她貌似找到了自己想要的东西后，才将神识从伊格诺斯身上撤走。<br><br>伊格诺斯就像是明天就要体测所以今天拼命练习的体育差生跑完十来圈一样累的满头大汗，他喘着粗气，眼睛丝毫不敢从佑身上移开。<br><br>“你怎么知道我的名字？”伊格诺斯问道。<br><br>“变革的时代已经来临，维系了千年的规则即将被改写。”佑没有回答他，她淡然自若，静静注视着伊格诺斯的眼睛，声音空灵回荡:“破局者该如何做才能棋胜一招？”<br><br>“你说变革？难道鱼渊出事了吗？”德里克急忙问道，但佑没有理会他，反而只等着伊格诺斯给出答案。<br><br>“我会亲眼见证这一切，然后在这变革之中竭尽全力保护我所爱的人……”伊格诺斯几乎没有思考，立刻回答了出来。<br><br>“呵，跟那家伙完全不同的答案啊……”佑摇了摇头，苦涩一笑。她轻轻抬起右手，指向伊格诺斯，一卷羊皮地图从伊格诺斯衣服口袋里飞了出来，精准地落在了她的手中。她打开了地图，向伊格诺斯说道:<br><br>“你要寻找的预知之镜，它的贮藏之地没有我的指引任何人都无法接近。伊格诺斯，我们进行一场交易吧，海默德已经侵占了光明礁，现在正在四处搜寻我的踪迹，他想通过我来号令海族发动对陆地的战争。而我需要你来护送我到光明礁后的坠龙渊，抢在在海默德之前拿到海族秘宝，等到我使用秘宝的力量战胜了海默德后，便将预知之镜借给你。”<br><br>“为什么选择我？我看上去就是一个普通人。”<br><br>“不是我选择了你，伊格诺斯，我没有自己的情感和意志，我始终代表了海洋的意愿，而这片大海如今选择相信你。”<br><br>伊格诺斯再三思考，只能应下来，他不愿卷入一场其他种族的冲突，给自己找不必要的麻烦，但如果真按佑所说，海默德得到海族秘宝后势必要向人类发动战争，那时他也无法独善其身。为了预知镜，也为了两族间的和平，他必须得接受佑的条件。<br><br>德里克在旁听完了所有的谈话，他轻声叹息，将手搭在了伊格诺斯肩上。示意他出去谈谈。<br><br>“德里克船长，你打算如何？”伊格诺斯边走边问。<br><br>“我跟你一起去，海族也算是我的老朋友了，他们现在有危难，我怎能不去帮助他们呢？”德里克声音很小，但却无比坚定。<br><br>“这算是航海家的义气吗？”<br><br>“是为了赎罪，这些年人类欠海族的太多了……唉，不说了，如果我能在有生之年再为海族和人类之间的和平做些什么，那么我是一定会去的。”',
    sksn_cang:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#40E0D0>浮海若梦</font><br>姓名：沧<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，过牌<br><br><li>【背景故事】<br>暂无',
    sksn_haimode:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#930000>血海狂鲨</font><br>姓名：海默德<br><br><li>【能力数据】<br>身份定位：内奸，反贼<br>能力定位：专业型，控制，污染牌堆<br><br><li>【背景故事】<br>慵懒的太阳挂在空中，无精打采地照射着平静的海面，鱼人海盗船‘皇家宝藏’号在无风的情况下缓缓驶入了雾海，海默德亲自掌舵，船面向着一个方位一直向前。<br><br>鱼人海盗们不理解他们的船长在占领了光明礁后为什么还要出海，不过既然是船长的命令，那他们只能遵守，或许还能在途中劫掠一下偶然碰到的可怜商船。<br><br>但今天注定不是什么收获日，在大雾弥漫的海面上航行本就是一个危险的事，就算是身为海族的他们同样也是如此，不过这群在刀尖上舔血的怪胎们早已经习惯了杀戮，正活动着筋骨跃跃欲试。但接下来的事情，却给他们的狂热倒泼了一桶冷水。<br><br>一道黑影出现在了海面的尽头，隔着大雾看不清楚它究竟是什么。<br><br>“来了……”海默德停住舵盘了，他命令水手抛锚停船。<br><br>“船长，难道您今天要找的就是……”见多识广的章鱼脸鱼人凑到海默德面前，毕恭毕敬地问道。<br><br>“莫比迪克号……我已经有十多年没来雾海了……”<br><br>“可是船长，那个‘莫比迪克’号上根本就没有活人……”章鱼人不禁打了一个冷颤。<br><br>“哦，戴维，你知道我从数亿年的生命演进中学到了什么吗？这世间唯一真理就是物竞天择，适者生存的弱肉强食法则。只要你足够强大，即使面对的是幽灵，你也不会有丝毫畏惧。”海默德静静地等待着那道黑影的靠近。在离“皇家宝藏”号还有几米的距离时，黑影突然停止了，这时鱼人们才能够看清这个黑影是什么东西。<br><br>那是一艘高大的有桅黑色帆船，一面三骨海盗骷髅旗无力地飘荡在桅杆的顶端。船身中部有两排炮眼，加起来足足有四十八门，即使是放在今天的海都，这艘船都称得上是最顶端的存在。但奇怪的是，其广阔的船体表面并没有什么船员，就连有人存在的踪迹都找不到。只有淡淡的灰白色薄雾渐渐笼罩了整个船身……<br><br>“船长？这是……”章鱼戴维哆嗦地说着。<br><br>还未等他发出完整的感慨，海默德便走到了甲板上，将手放在了围栏边静静等待着对方船上的那个家伙的现身。<br><br>在‘莫比迪克’号的空荡荡的甲板上，突然从雾气中显露出一个女人的身影，她走到围栏旁，用一双血色的眸子扫视着‘皇家宝藏’号上的每一名成员，除海默德外的鱼人们不禁倒吸一口凉气，感受到一股刺骨的阴寒，被这个女人注视的感觉就仿佛是被死神盯上了一般。这便是‘莫比迪克’号船长——布萝肯·康帕斯。<br><br>“幽……幽灵？”一个鱼人水手结结巴巴地问道。他刚刚清楚地看到，那个女人的头发正不自然地飘动着，时不时还有分裂出一粒粒灰烬消失在雾气中，她的手臂呈现半透明状，如同她的船一样若隐若现。<br><br>“只是一个令人厌恶的女人罢了，没什么可怕的。”海默德虽然是这样说，但生前的康帕斯可谓是三分海上的一朵玫瑰，她的一颦一笑都带有海上贵族的韵味，她的身材匀称，曲线勾勒，足以让绝大多数的男性在其石榴裙下折服。而现在，成为幽灵的她身着一件黑色的礼服，那礼服就像是雾气所构成，隐隐约约还半透着这位幽灵白皙的酮体。<br><br>海默德对人类女性的身体倒是没什么感觉，况且他总能康帕斯身上闻到一股像是尸体腐败变质的气息。康帕斯远没有看上去的那么端庄优雅，她有着和自己面容完全不匹配的恶劣性格，比起海默德，她更加的疯狂和不可理喻，她曾经在海都当着市民的面将三十七名无辜平民一一斩首，犯下了滔天罪行。虽然海默德对人类的死活不感兴趣，但他却不想和这个危险的幽灵有过多焦急，虽然她的言行举止的确是楚楚可人，但给海默德的感觉却仿佛是海岸上一摊被螃蟹啃过的烂泥。<br><br>“布萝肯.康帕丝船长，好久不见。”海默德隔空敷衍地问候道。<br><br>“看看是谁来了，这不是我亲爱的小鲨鱼吗？我们得有十多年没见了吧……”康帕斯右手托着脸颊，左手缠绕着自己飘动的黑色长发。她在看到海默德时，就回想起了当年那条浑身是伤的鲨鱼……<br><br>“谈谈吧，康帕斯，就在你的船上……”海默德不想在这件事上跟她过多地交谈，于是便脱下了自己的宽沿船长帽，眯缝着眼睛用他那替换成钩子的左手说道。<br><br>康帕斯向后比了个手势，空荡的甲板处便多出来几名小鬼，他们气喘吁吁地从甲板上翘起一块木板，搭在了两船之间。<br><br>海默德登上了木板，迎着康帕斯走去。木制义肢和木板相碰的时候咯噔咯噔的，引得康帕斯不禁轻声发笑，在她身后则聚集了一些身体残缺不堪，眼睛冒着红色幽光的鬼魂。海默德没有理会小鬼们的辱骂和嘲讽的叽喳声，他沿着从幽灵船上放过来的木板，一步一步登船。<br><br>等到海默德登上了莫比迪克号的甲板，康帕斯便开口道:“我可是都听说了啊，你在光明礁干的好事。这些天下来海上的亡魂可增加了足足有一倍之多……”<br><br>康帕斯的裙摆轻飘飘的，随着她的身形的移动而不断摇晃着。她走到海默德对面，脸上的表情立刻凝固。“海默德，你这三分海的霸主过的到是挺滋润的，我一度还以为你已经忘了是谁在你最难的时候拉了你一把。”<br><br>“哼，闭嘴吧，幽灵，那份人情我早已经还完了。”鲨鱼磨了磨牙，用那尖细的眼睛盯着她道。海默德刚一登船，那连接用的木板便化做了薄雾消失了。<br><br>“还完了？就凭这么点人的灵魂你觉得够吗？”康帕斯扭头看了一眼后方，问道。<br><br>“行了，我今天来这里不是跟你讨价还价的，康帕斯，再说你现在也不怎么缺灵魂……”海默德瞟了一眼她后面站着的幽灵小鬼们，他们生前或多或少都是在这大海上有名的人物，在海上死亡后，便被莫比迪克号捕获，并成为它永远的奴隶船员。<br><br>“哦？那你来我船上是为了什么？总不能告诉我你只是想跟我显摆你现在的身份吧？”康帕斯有些愠怒，她瞬身闪现到海默德面前，两者的间距只剩两个拳头的距离。其他的小鬼和幽灵水手还在一旁瞎起哄，其中有一些还亮出了银光闪闪的刀子。<br><br>“哼，康帕斯，我可是带了诚意来的，如果你还想踏足陆地的话，现在最好乖乖听我的。”海默德张开他的大嘴朝她吹了一口气，那气味就像是夹杂了铁锈味的湿海带一样，不过幽灵没有嗅觉，自然也闻不到。<br><br>海默德扭了扭它的鲨鱼脖子，然后从大衣口袋里掏出了一张泛黄的油皮纸做的地图。<br><br>“陆地……你的意思是？”康帕斯退后几步，抱着手倚靠在桅杆上。但她的视线却始终没有离开海默德手中的地图。<br><br>“涅普顿一死，隐匿那件东西气息的封印也就自然解除了，我估算着它的出世也就是最近这两天。它被涅普顿放在了坠龙渊……一个海族无法前往的禁地，但是……”<br><br>“幽灵却可以造访，所以你想让我帮你去取来那件东西？”康帕斯接话。<br><br>“没错，虽然现在涅普顿已死，人鱼祭司也被我控制，只剩了一个孤立无援的海洋之魂还逃逸在外，我倒是不担心羸弱的她能搞什么乱子，但我需要确保万无一失。”海默德将那张油纸地图展开，对着她讲到。<br><br>“你就不怕我拿了东西就跑吗？”<br><br>海默德哼哼一笑，他扶着围栏站了起来，抖了抖身上凝结的水珠，张开臂膀向着康帕斯解释道:“你是聪明人，康帕斯船长，你应该知道我既然敢放心让你去取一件东西必然是有方法能让你完完整整地给我带回来。事成之后，我就用它帮你解除诅咒，顺便……”<br><br>“血洗尼吉拉斯……”康帕斯眼中燃起一股无名怒火，她咬牙切齿地说道。莫比迪克号在雾海上已经漂泊近百年，而这一切的始作俑者，与海都尼吉拉斯王国有着千丝万缕的联系，以至于康帕斯一提到这个地方，便忍不住发怒。<br><br>“对，是复仇。康帕斯船长，我们要向那些该死的人类……复仇。”海默德咧着嘴笑道。',
    sksn_maisike:'<li>【基础信息】<br>角色设计：柚子丶奶茶丶猫以及面具<br>技能设计：琉璃菠萝<br>故事：爪巴<br>角色配音：九醉书生<br>称号：<font color=slateblue>奴隶主</font><br>姓名：迈斯克<br><br><li>【能力数据】<br>身份定位：内奸<br>能力定位：专业型，控制<br><br><li>【背景故事】<br>班卡姆斯城位于东极版图的中央，是联络南北东西的大枢纽，其繁华程度丝毫不亚于首都西尔斯城。这里奴隶贸易是支柱产业，另有全世界最大的角斗场和拍卖所，往来王公贵族络绎不绝。班卡姆斯城也依托这些资金高筑城墙，修建堡垒，不断强化军备力量。<br><br>领主迈斯克承袭侯爵之位，掌控了班卡姆斯的全部权力，并通过一系列地手段在地下世界里垄断了人口交易这一黑色产业，被同行称之为“大奴隶主”。迈斯克狡黠难料、精于算计，在取得了地位和财富后他没有选择修建供自己享乐的宫殿花园，反而取而代之为三座半球形的暗堡，分列于城池各处。暗堡内曲折复杂，对外界来说就像是一张还未绘制的地图，迈斯克就潜藏在其中一座暗堡里默默操纵着班卡姆斯城这片黑暗王国。<br><br>一个身穿着黑白女仆装，头顶上有两只兔耳朵的亚人少女推开了一扇精致的木门，她悄悄地接近房间内的一名正在躺椅上闭目休息的男人，在离他还有十步的地方突然停下，然后开口道:<br><br>“主人，今晚将由我来服侍您，请您下令。”<br><br>“哦？兔人族，我之前在暗堡内怎么没有见过你。”迈斯克缓缓睁开眼睛，上下打量着突然闯入的兔耳娘，这座暗堡里的人他都曾见过，但对面前这个亚人却没有一点印象。<br><br>“回主人，我是被族群送来履行成年义务的，今夜只听主人的差遣。”兔耳娘的声音渐渐微弱，脸上泛起一片潮红，就像是一个青春期的人类少女面对喜欢的人一样娇羞地抿了抿嘴唇。<br><br>“义务？哦，我想起来了，之前我是颁布了一个什么法律——领主拥有领地内所有女性奴隶的初夜权……好！那么，你应该知道现在自己该做什么吧？”迈斯克显露出笑容，像极了一位擅长社交的王子，因为他样貌长的还不错，举止也尽显礼节，所以很多人会将他错认为一名文质彬彬的贵族公子，但知道迈斯克真面目的人都清楚，这是他将要“猎食”的信号。<br><br>“是的，主人。”兔耳娘娇滴滴地回应道，她缓缓解开了自己的衣襟，将雪白的肩膀露出，随着系腰用的丝带掉落在地上，一大片不能过审的画面呼之欲出。<br><br>迈斯克舔了舔嘴唇，他迎上前来，仔细观摩着兔耳娘她那如一件精美艺术品的洁白无瑕的酮体。<br><br>正当他伸出双手慢慢靠近兔耳娘，准备享用这份荒诞的盛宴之时，令他意料不到的变故发生了——<br><br>“下地狱去吧！恶魔！”<br><br>兔耳娘脸色忽然急剧变化，她娇哼一声，不知从哪里掏出了一把沾满了蛇毒的匕首，以极快的速度径直刺入迈斯克的喉咙。后者连尖叫都没有发出就闷头倒地，一动不动了。<br><br>“我杀死他了？！我终于杀死他了吗？”兔耳娘难以置信地盯着躺着地上不断流血的迈斯克惊呼道。<br><br>奴隶主迈斯克，人人得而诛之。兔耳娘心脏跳的飞快，她的复仇之路并不顺利。她的族群之前被迈斯克的捕奴队袭击，父母双双战死，而自己只能慌忙逃命，幸好碰到了那位大人收留了自己，并将自己训练成一名出色的刺客，兔耳娘自始至终都没有忘记她肩负的血仇。没过多久那位大人需要她去行刺迈斯克，她义无反顾地同意了。在那位大人的帮助下，她顺利地以适龄的奉献少女的身份混进了暗堡，而且得到了单独服侍迈斯克的机会。在前往暗堡时，她就已经有了和奴隶主迈斯克同归于尽的觉悟……为了那位大人，她可以献出自己的一切，包括自己的生命。可她没想到的是自己居然这么容易的就杀掉了号称最难以杀死的地下世界的帝王。<br><br>“嘶……”<br><br>一阵像是毒蛇在发动攻击前吐信子一样的声音从兔耳娘背后冷不丁地传来——<br><br>“一击毙命，不留余地……究竟是谁派你来的呢？我很是好奇啊。”<br><br>迈斯克那辨识度极高的鬼魅声音从她的身后传来。兔耳娘不敢相信自己的耳朵，她慌忙地检查着地上迈斯克的尸体，却发现一层层金色的卡片从其身体上剥落，最后地面上只剩下了一个木制晾衣架。而就在此时，她突然感觉到自己纤细的腰肢被什么人从身后搂住。<br><br>“你……怎么会……？！”兔耳娘面露惊恐地盯着这个从身后突然冒出的男人，迈斯克轻易地就钳住了她拿着匕首的手腕，然后伸出湿滑的舌头顺着她脖子舔舐。<br><br>“嘶嘶，这味道品尝起来还真是美味啊，只可惜，现在我的对你的感觉就像是经历了几天的饥饿之人坐在满桌山珍海味前但却不知道该从何处下嘴一样。”迈斯克品味着舌尖上的奇妙感觉，他嘴里分泌出了大量的唾液，浑身也燥热起来，但最终还是露出了残忍的神情。<br><br>‘好恶心……’<br><br>兔耳娘忍受不了这等羞辱，她旋过身来挣脱了迈斯克的控制，然后右手挥舞着匕首向迈斯克刺去。眼看就要刺中迈斯克的眼睛时，她的手臂突然停滞在空中，再也无法移动分毫。<br><br>这时她才发现刚刚一道金色的卡片刺进了自己的手臂，并渐渐融入进去。<br><br>“这是什么东西？！”<br><br>没等她再次发出惊讶，兔耳娘的手臂忽然从静止中恢复，却反过来划破了她的胸口，霎时间鲜血喷涌。兔耳娘感觉浑身的力气突然丧失，胸腔内的血液也不断流失，她痛苦地倒在地上，意识也渐渐模糊。<br><br>“你……你做了什么？！我的手……为什么不听使唤了？！”<br><br>“我刚刚用金帖买下了你右臂的控制权，现在你的右臂只会依照我的命令行动。”迈斯克两根手指间夹着一张金色卡片，向其展示道。<br><br>“不可能……怎么会有这种事。”<br><br>迈斯克将地上的匕首踢到一旁，然后整理了一下自己的衣领。他以一种蔑视的表情看着倒在地上的兔耳娘，摆弄着金帖淡然说道:<br><br>“这世间的万事万物都有其相对应的价值，而你亦在其中。通过这些金帖，我可以交换同价值的两个物体之间的所有权。不论是身体，记忆亦或是灵魂，在这个世界上，没有不可交换之物，所谓的无价只是开出的条件达不到对方的预期罢了。<br><br>这就是『The Definition of Price』！你的一切早已被定义。”<br><br>兔耳娘忍受着疼痛，想再爬起来想最后殊死一搏时，却发现自己的身上却早已经插满了刚刚的那些金色卡片。随着迈斯克轻轻一个响指，兔耳娘应声倒地，她的瞳孔里失去了生命的光泽，身体也再无动静。<br><br>迈斯克走到兔耳娘的身边，蹲下身子将那些金帖一一收回，然后他看向自己的左臂说道。<br><br>“我想你的伤也好的差不多了，高泽斯·拜蒙。现在我送给你一副新的皮囊，但在之后你得去帮我做一件事……”<br><br>迈斯克说罢，只见从他衣服的左袖里钻出来一条白色蠕虫，扭动着身躯啪叽一声落到地上的兔耳娘尸体上，并不断蠕动着向她的耳朵里钻。片刻后，令人惊悚的事情发生了，本是死亡已久的少女这时以一种诡异的姿势重新站了起来，像一个机器人一样不断咔咔作响地活动着关节。等她再度睁开眼睛时，原本瑰红色的瞳孔已经变成了妖艳的紫色。<br><br>“这具身体倒是不错，就是力量不怎么强劲……算了，总比没有强……那么，你想要我帮你做什么事情呢？迈斯克大人~”已经被高泽斯附身的“兔耳娘”妩媚地说道，她慢慢攀上了迈斯克的手臂，向他耳语道。<br><br>“每年的角斗大赛我都会准备一件宝物作为附赠给优胜者的奖品，今年我没有什么好主意，索性随意找了一块会发光的石头……”<br><br>迈斯克伸出手来，一块散发着淡蓝色光芒的晶体出现在他的手心，高泽斯瞪大眼睛惊呼道:“不会吧，这东西难道是？！”<br><br>“是饵，我要通过它，钓到那些隐匿在班卡姆斯城里的大鱼……”<br><br>迈斯克没有再理会这条令人厌恶的蠕虫，他收起了时空碎片后，便将在地上躺着的晾衣架扶起，他的嘴角微微上扬，眼睛里尽显阴狠毒辣。',	
    sksn_dongfanghongdao:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>角色配音：山驴<br>称号：<font color=#FFED97>黎明之眼</font><br>姓名：东方弘道<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，补牌<br><br><li>【背景故事】<br>“主人，这里就是班卡姆斯城吗？好漂亮啊。”伊莲望着齐整的地面，金碧辉煌的城墙感慨道。<br><br>“漂亮？那是当然，这里每一块精致雕刻的地板砖下都埋葬着奴隶和苦工的尸骸。”东方弘道停下了脚步，摆手道。<br><br>听完这话后，伊莲和诺亚感觉到脚下的地砖缝中貌似渗出一股阴寒……<br><br>“我说东方，你别讲的那么吓人啊，都把伊莲唬到了。”诺亚支支吾吾地说道，他把伊莲拉到一边，自己脸色也不怎么好看。<br><br>东方回给他一个耐人寻味的眼神，然后将伊莲抱起来，狠狠吸了一口。<br><br>“喵哈哈，主人，痒啊喵~”<br><br>这个世界啥都不好，除了猫娘。东方弘道如是想到。待到他心满意足后，又恢复了之前那静如止水的表情，然后开口说道:<br><br>“作为能在地下世界呼风唤雨的大人物之一，迈斯克跟怀德乔不同，他更加的阴险诡诈，行迹也难以捉摸。所以接下来我们得想一个能找到并接近他的方法。”<br><br>“那不如咱们去参加这个角斗大会，听说他会亲自接见优胜者，只要我们赢下比赛，就能得到一个与他单独接触的机会……”诺亚指着远处在街道上行进的商队，还有跟随在他们后面各式各样的像是来参加比赛，正在摩拳擦掌的勇士们提议道。这群裸露上身的肌肉男们看起来也不太像是角斗奴隶，更像是从外界入城的冒险者，估摸着也是奔着角斗大赛那高额的奖金来的。<br><br>“打住，我可不想去角斗场里当个被人观摩的猴子。在这个世界上办法多的是，但人的脸面可就只有一张。”东方弘道坚决地否定了诺亚的提议，但他也注意到了那批商队。角斗大赛不光是血与汗的比拼，同时也吸引了各地的商人，他们趁着比赛的热闹聚集在一起，交易着各地的物产珍宝，这段时间的拍卖场也是人员爆满。<br><br>“或许我遗漏了什么地方……”东方弘道思索着，他回过头来，向还在发愣的猫娘说道:“伊莲，把那张地图拿出来。”<br><br>伊莲小心翼翼地将一张羊皮卷地图从背包里取出。东方弘道接过后便开始阅览，发现上面所绘制的班卡姆斯城街道图也仅仅只有个大概，中心的一座角斗场，以及在它右方的拍卖场被重点标识。其余就是各个区域的名称。不过有一处异样引起了东方弘道的注意，那是三个围绕在角斗场旁的圆形建筑，在地图上面既没有名称，也没有用途，这三座在地图上没有任何信息的建筑物让东方弘道感到十分突兀。<br><br>“地图上并没有标注领主府的位置，但这已经是我从古尔那只蛤蟆那里所能得到的信息最为详尽的地图了。这么看是迈斯克有意隐藏了自己的老窝。”东方弘道卷起地图，无奈地摇头叹息。看来还是得找一个熟悉环境的本地人来带路才行啊。<br><br>“像这么大的城市，应该会有导游之类的职业者吧。”东方弘道向诺亚询问道。<br><br>“导游……嗯？你是说“鼠人”吗？这些人通常是乞丐或者无职业者，他们混迹于街头巷角，为了生存什么地方都敢钻，钻的地方深了，知道的也比一般人多，尤其是一些小道消息，因为他们浑身脏兮兮的，又老是住在一些充满污秽的地方，所以被形象地描述为‘鼠人’。我听说某些地方的“鼠人”还形成了组织，在地下世界也有一席之地。不过‘鼠人’的风评普遍不好，很多人，包括我在内都不太想和他们扯上关系。”<br><br>“‘鼠人’吗？我之前倒是听过这个名词，但问题是我们该去哪里找到他们？”<br><br>东方弘道有些烦闷，这种无法掌控精准信息的感觉，就如同在黑暗的房间里寻找一枚掉在地上的黑色纽扣一样。虽然这是他第一次来班卡姆斯城，对于此地一无所知也是正常的事，但他还是有一种莫大的压力。之前他之所以能快人一步攻占科恩，击退高泽斯，就是利用信息的不对称，打了对方一个措手不及。但现在形势是他在明，敌人在暗，他的一举一动对方可能都已经知悉，而自己却连对方躲在哪里的大致方向都没有。<br><br>况且因为奴隶主在地下世界的特殊身份，所以在他的地盘上基本上不存在和外界独立联通的组织，自然也就不存在可以帮助他们的线人，一切还得靠自己<br><br>“不用刻意去找的，只要你透露出自己外来人的身份，他们自然会来找上你。瞧，他们来了。”诺亚指着远处一名靠过来的乞丐说道。<br><br>等那乞丐走进了，东方弘道才看清楚他的模样，灰头土脸，身上像是披了一片廉价的破布，袖子缝缝补补，还穿着和自己年龄并不相符的大鞋。不过东方弘道发现了一个特殊的地方，和一般的乞丐不一样的地方，他的眼睛很清澈，很干净，就像是乱石堆里的一汪清泉，出淤泥而不染。<br><br>“请问大人们是第一次来班卡姆斯城吗？”那小子不断打量着三人，在他眼中领头的那名黑发少年从气质上看不是贵族就是富商的儿子，剩余的两个可能是他的侍卫或者仆从，估计是初来乍到，不知道该往哪里走。<br><br>东方弘道没有立刻回应，诺亚则是直接开口问道:“那你知道领——”<br><br>“我们是来初来此地和客户交易的商人，不过对方目前还有些事需要处理，所以我们想先寻一个地方住下。”东方弘道打断了诺亚的话，并用眼神示意道:‘先别暴露自己的目的。’<br><br>“啊，这简单，大人们跟我来吧，最近班卡姆斯城要举办角斗大赛，所以外来人很多，城中心的旅店基本上都早已经住满了，不过我知道几间离中心区比较远的旅店，那里估计还有谢客房。”<br><br>“你叫什么名字？”<br><br>“‘鼠人’没有名字，不过大人叫我兰斯就好了，这是我的代号。”<br><br>“兰斯是吗？我记住了。所以你要的价钱是多少？”<br><br>“大人，领路的话是两个铜板，帮忙跑腿的话同样。”兰斯掰着手指头合计道。<br><br>诺亚看了看东方，凑到他耳边说:“的确不贵，相反比科恩的都便宜多了。”<br><br>兰斯在前方领路，东方则在后面听他讲述班卡姆斯城的各种奇闻异事，以及最令外来者感兴趣的娱乐场地，看来熟悉历史和地理也是“鼠人”必要的技能。正当兰斯准备讲到角斗大会时，远处有一个人直接喊了他的名字，并向其不断招手。<br><br>“大人们，能给我一些时间吗？我遇到了一个朋友……不会耽搁太久的。”兰斯在看到那个人后，转过身来向东方他们请求道。<br><br>东方弘道点头默许。<br><br>兰斯感激地向他鞠了一躬，快速跑到那个招呼他的少年身旁，后者见兰斯跑过来，直接拥抱了他。<br><br>“兰斯，你在这里啊，我都找你半天了。”<br><br>“瑞纳，你怎么？”<br><br>“拿着这个。”瑞纳将十几个铜币塞到了兰斯的手中。<br><br>“这是……”<br><br>“今天我开张了哦，你妹妹不是需要钱吗？虽然也没有多少，但还是先用这个顶一下吧。”<br><br>“可是……”<br><br>“别可是了，我先走啦，兰斯，之后有时间再见。”瑞纳没有给他开口的机会，便转身离开。正当诺亚以为他们的交谈已经结束的时候，令他意想不到的情况发生了。<br><br>兰斯以一种极其诡异的步子迈向瑞纳，周围的一切事物都好像变慢了，树叶慢悠悠地飘落，扬起的尘土就好像定格一般。兰斯悄悄地将那些钱全都塞辉了瑞纳的口袋里。在此过程中，瑞纳的眼睛一直看着前方的道路，没有丝毫觉察。<br><br>“东方！刚刚那是？！”诺亚不敢相信自己的眼睛，但他刚刚的确是看到了兰斯那快的出奇的手法。<br><br>“嗯，他貌似是动用了某种能力，那速度快到对方没有一丝察觉。”东方弘道目不转睛地盯着还在向另一位同伴招手的兰斯，分析道。<br><br>“这个兰斯不简单啊，话说他有这个本事，怎么还在这里当‘鼠人’呢？”诺亚表示不解。<br><br>等兰斯告别他的‘鼠人’同伴后，便向着东方一行急匆匆地跑过来，双手合十抱歉道:“先生们对不起，刚刚因一些事情耽误了一些时间，感谢您们的宽限，之后如果有需要兰斯的地方还请直接吩咐。”<br><br>东方摆了摆手表示不必在意，他看着兰斯背在身后的右手，问道:<br><br>“兰斯，我看着你不像是一些穷苦人家出身的孩子，你的言行举止告诉我你曾经上过学，那么为什么你还要出来做这鼠人呢”<br><br>“妹妹的病……需要钱。”<br><br>“是吗？这的确是一个令人心痛的事，那么刚刚你的同伴交给你钱的时候你为什么不接受，反而还回去了呢？”<br><br>“啊？您刚刚都看到了吗？！”兰斯有些吃惊地瞪大了眼睛，他早就觉得这位东方弘道不是一般人，没想到自己的能力这么快就暴露了出来。<br><br>东方没有回答，他只是稍微地点头默认，兰斯不敢抬头注视东方的眼睛，于是低下了脑袋，调整好了状态才缓缓开口解释道:<br><br>“先生，不怕您笑话，身为‘鼠人’的我们每天都在过着流离失所的生活，往往是吃饱了这顿没有下顿，您别看我们整天跑东跑西，实际上能赚到的钱很少很少，如果我当时真的接受了他的施舍，那么他今天就得挨饿了。”<br><br>诺亚和伊莲相视无言，东方弘道拍了拍兰斯的肩膀，鼓励他道:“别担心，兰斯。我并不觊觎你拥有的特殊力量，我只是比较好奇罢了。你妹妹的事情我并不怎么了解，但只要你相信自己有能力去改变现状，那你就一定可以做到。”<br><br>“谢谢您，先生。那么我们继续走吧，旅店就在前面了。”兰斯抬起头，眼神里充满了感激和释然，他用手背擦了擦眼角的泪滴，然后面露微笑继续跑到前方领路了。<br><br>等他们到了旅店后，东方弘道便将兰斯唤到自己身边。“兰斯，你先过来。”<br><br>“先生，是有什么需要我帮忙的吗？”<br><br>“我这里列了一个清单，你熟悉城里的环境，所以跑跑腿帮我买一些东西回来。另外，你要求的那两个铜板的小费我也放在里面了。”东方弘道将一张纸条和一个钱袋子拿出来，递给了兰斯。<br><br>“先生……我都还没有帮上您什么忙，怎么还敢收您的金币呢？”兰斯推脱道。<br><br>“为什么不能收呢？兰斯，我们是生意人，你给我们带路，就相当于和我们进行交易，而在有些交易中支付定金是很常见的行为。”<br><br>“可是这么多的钱，您真的放心交给我吗？”兰斯抬头看向东方弘道，平常没有人会放心把如此多的金钱交给‘鼠人’，即使是心善之人偶尔将一大袋子钱交给‘鼠人’们，大多也是出于怜悯而不是信任，他们根本不指望‘鼠人’们能完璧归赵。所以东方弘道的这个行为令他深受感动。<br><br>“为什么不呢？兰斯，做生意的第一要素就是要相信自己的客户。”东方笑言道。<br><br>在兰斯离开后，诺亚凑到东方弘道身边，疑惑地问道:“喂，东方，这钱可不是什么小数目啊，况且你刚刚都听他说了，他妹妹生病了，你就不怕他拿着这些钱半路跑路吗？”<br><br>“伊莲你的看法呢？”东方弘道没有正面回应诺亚的问题，反而揉了揉伊莲的脑袋，把问题抛给了她。<br><br>“伊莲觉得，兰斯先生是个好人，他一定会遵守承诺的喵……”<br><br>“可他毕竟是‘鼠人’……他们随时会做成为了金钱出卖自己的雇主的事情来。”诺亚摇了摇头，‘鼠人’最遭人恨的地方就是他们不讲信义，只要为了钱什么法律道德都能践踏。相信一个‘鼠人’守信还不如相信老母猪能飞天。<br><br>“所以这是一场‘考验’，对我们，对他来说这都是一场考验。那清单上的东西都是我随意写的，搁到哪个市场上都有贩卖，所以只要他想办事的话很容易就能完成任务再赶回来。我已经向他率先表达了自己的信任，现在就看他如何回应了。”<br><br>东方弘道清楚，要想在班卡姆斯城行动，就必须先得和一些人建立稳固的联系，如果没有一个值得信任的人，他们就如同在悬崖峭壁上攀岩——寸步难行。<br><br>诺亚还是有些不放心，他看向伊莲，给了她一个眼神指示，伊莲微微点头，然后隐匿了自己的气息，向兰斯离开的方向追了上去。东方弘道虽然看在眼中，但也没有阻止。<br><br>“如果一切顺利，等兰斯回来后，你们就可以先让他领你们四处逛逛，熟悉熟悉班卡姆斯城的构造，以便在行动后能很快地脱离事发地。我们的目的不光是要打败迈斯克，我们还得活着回到科恩城。听到了吗？我们，还有伊莲都要活着回去，一个人也不能少。”东方弘道看着远去地伊莲，郑重地向诺亚交代道。<br><br>“但愿吧……最近我总有些不好的预感。”诺亚怀揣着不安，应声答道。<br><br>东方弘道踱步到窗口，看着街道上的车水马龙感慨道:“小心驶得万年船，这句话是没错，但你也没必要整天把自己搞的战战兢兢，毕竟现在我们和迈斯克的较量才刚刚开始……”',
    sksn_youliweisi:'<li>【基础信息】<br>角色设计：寰宇星城<br>故事：爪巴<br>称号：<font color=#E800E8>续燃烛光</font><br>姓名：尤里维斯<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，印卡<br><br><li>【背景故事】<br>尤里维斯一夜无眠。<br><br>他被办公桌上的各种信件搞的焦头烂额。在奥丁格兰事件发生后，学院被打了个措手不及，许多事情都如一团乱麻，尤里维斯也只能按照先后顺序一件件的打点。<br><br>在往桌上的煤油灯里添了一些新的燃料后，整间屋子终于变得明亮了一些。尤里维斯轻轻叹息，只有借助这不怎么稳定的灯火，他才能理得清地面上积压的一叠叠信件。<br><br>这些信件有公署的，也有私人的，但不论写信的是谁，信上的大部分内容都和奥丁格兰有着千丝万缕的联系。<br><br>“奥丁……你给我留的这烂摊子可真够多的啊。”尤里维斯无奈地挖苦道。<br><br>夜渐渐深了，办公桌上摆着的铜钟正按着它预定的规则不断嘀嗒着，尤里维斯的思绪却已回到过去——<br><br>一个炎热的下午，尤里维斯推开校长室的门，正巧看见奥丁格兰正带着一个单片眼镜，全神贯注地阅览着一本黑色的笔记，丝毫没有觉察到尤里维斯正悄悄靠近他。<br><br>因过于专注，奥丁格兰竟然将写字用的墨水和涂抹面包的黄油搞混，就着蘸满墨水的面包津津有味地咀嚼着。<br><br>“你那面包什么味啊，奥丁。”<br><br>“啊？尤里维斯你来了，我刚刚都没注意到。”<br><br>“你没注意到的可不只是我进来这一件事。”尤里维斯指了指奥丁手上握着的黑漆漆的“墨水面包”。<br><br>奥丁这才意识到自己刚刚做了一件多么滑稽的事，哈哈笑道:“哈哈哈，我就说这黄油的味道怎么和之前的不一样了。”<br><br>“你还没回答我的问题呢，这面包好吃吗？”尤里维斯乐呵呵地坐到一旁打趣道。<br><br>“甜，信仰的味道很甜。”<br><br>奥丁摘下眼镜，用他那深邃而富有智慧的蓝色眼睛注视着尤里维斯，并将那本黑色的笔记递给了后者。在尤里维斯带着疑惑不停地翻阅时，他开口缓缓说道:“真是震撼，我现在才知道，原来我们并不是在孤身奋战。早在百余年前，在那片太阳初生之地的东方大陆，就已经出现了先觉者，而且他通过实践，组建了自己的队伍，居然推翻了根深蒂固的领主制度，建立了一个由各种族人民自由联合的新国度。”<br><br>“雅各布·拜伦……这本书简直是通向云顶的天梯，这些观点哪怕是放到我之前的世界里都太激进了！光是上面写着的‘世界不是神明创造的乐园，而是一团燃烧的活火’这一条就足以被教会当成异端抓去审判。”<br><br>“没错，但真理之所以为真理，就是在于他的永不妥协，直指根源。这个世界，需要被正确地解释和定义，否则我们的一切行动，将是无源之水，无根之木，我们必须在神创论说和教会正式对抗，用真理战胜虚妄。”<br><br>“现在的世界如同一条奔涌不息的河流，而你却妄想逆水行舟，直溯它的源头？”尤里维斯不解地问道，他深知在这么一个黑暗的时代，奥丁格兰这一激进的想法所带来的后果是什么。<br><br>“逆水行舟……确实如此，不过我这条破船上不是还有你呢嘛？现在的真理的大道就敞在我们面前，总得有人迈出这第一步的，我这一生几乎什么地方都去过，什么事都经历过，这辈子已经值了。如果现在天底下需要有一个有着牺牲觉悟的人来成为先行者的话，那他就由我来当吧。”<br><br>“真理不是在天界孤独燃烧的野火，它应到为天下人带来光明。”在煤油灯的照射下，奥丁格兰眼中闪烁着微光。此时的他，仿佛不再是一位久经沧桑的老者，知识渊博的老人，而是一位满腔热血，散发着无穷生命力的勇士。<br><br>——————<br><br>“那位躲在黑暗中的朋友，请出来吧。”尤里维斯停下了手头的工作，他看向办公室角落里摆放的会客用的沙发，淡然说道。<br><br>此时，一个身着夜行衣的神秘男人端坐在沙发上，昏暗的灯光下尤里维斯无法看清那个家伙的具体面貌，不过看这行装还有风格，不像是教会的人。<br><br>“打扰了，尤里维斯先生，吾名提隆·嘉尼奥。深夜到访只为合作而来。”男人起身将右手护在胸前，微微颔首自我介绍道。<br><br>“是吗？可我怎么看你都不像是来求合作的。”尤里维斯边说着边伸手向桌下的抽屉里摸去，在奥丁出事后，他就往里面塞了一把填满了弹药的火铳，以便用来应对像当前一样的突发状况。<br><br>“我并无恶意，尤里维斯先生。”嘉尼奥注意到了尤里维斯的小动作，但他并不在意，毕竟他此行的目的不是刺杀，而是谈判。<br><br>“夜闯学院，悄无声息地混进了这幢建筑，说是没有恶意，您觉得谁会相信呢？”尤里维斯摸到了枪柄，但他并不想直接和对方交手，那个被兜帽遮住了脸庞的男人身上散发着令他不安的气息，男人浑身透露着一股肃杀和萧条，和他面对面交谈就像是在冰天雪地里紧握铁栅栏一样难以耐受。<br><br>“我来此地是因为刚刚知道贵校遇上了些麻烦，正巧现在雾言联盟和教会不怎么对付，为什么我们不能联合起来共同对抗教会呢？我们不奢望贵校能帮助我们扩展势力，只希望贵校能够在此地为我们设置一个联络点，方便我们的人员行动而已。而我们会竭尽所能为贵校学院长奥丁格兰先生复仇，同时提供大量的资金帮助贵校能平稳地度过难关。”<br><br>“的确，你的条件很难让人拒绝……但，凯洛亚学院永远都是学术的圣地，这里的人们所寻求的是真理而不是纷争。我们不想，也绝不会主动介入到任何势力的斗争中去。”尤里维斯义正言辞地回绝道。<br><br>嘉尼奥没想到他会如此坚决地回拒，他想大概是现在时机还不成熟，或者尤里维斯此人并非他想象中的容易相处，不过这并不是什么着急的事，毕竟现在的凯洛亚学院即使不成为雾言联盟的盟友，也不可能帮助教会来阻碍他们的行动了。<br><br>“那恕我打扰，如果以后您需要我们的帮助，雾言联盟的大门随时向您敞开。”嘉尼奥说罢便消失在阴影中。<br><br>“雾言联盟……被大雾所笼罩的帝都，人们又怎会看到光明？”尤里维斯看着空无一人的沙发囔囔道。他早已经对这个组织有所了解，学院中的部分学生甚至还有的还与其建立了联系，可见雾言的渗透力是多么的强大。但尤里维斯在不确定对方真实意图的时候是不会和他们走的太近的，毕竟他明白现在的学院正是需要冷静的时候，切忌病急乱投医。<br><br>气温有些凉了，尤里维斯手头上的工作也都处理的差不多了。于是他披上大衣，徒步走向教学楼外的空地，入眼可见的是一片广阔的实验田，自从奥丁将这块地赠送给尤里维斯后，他便在此种满了玉米，当奥丁格兰问其为何选择种地时，尤里维斯说这是“在科研的道路上自食其力”。<br><br>绿油油的玉米叶上布满露珠，这时，东方的地平线上出现了一缕曙光，如同结婚戒上的钻石一样在这漆黑的幕帘上显得无比耀眼。<br><br>阳光映射在露水中，像一颗颗闪烁的星星静静地守候黎明。尤里维斯注视着金灿灿的玉米田，这些颗粒饱满的作物映照着渐渐升起的朝阳，散发着生命的气息。<br><br>——“尤里维斯，你说会有黎明到来的那一天吗？”<br><br>——“嗯，或许吧。”<br><br>——“那这奇怪的植物真的会结出果实吗？”<br><br>——“呐，这是当然的啦。”',
	sksn_lujinuo:'<li>【基础信息】<br>角色设计：愉渊<br>故事：爪巴<br>称号：<font color=#FFFF37>黎明之剑</font><br>姓名：卡尔·卢基诺<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，保核<br><br><li>【背景故事】<br>“咚咚。”在一所驿站里，卢基诺敲了敲一间锁着的漆黑色的房门。<br><br>“啊，是卢基诺小姐喵。”一个娇小的猫娘打开了门，卢基诺顺势一把揽入了怀中。<br><br>“啊哈哈，痒啊喵！”伊莲挣扎着，但却并不能阻止卢基诺的撸耳朵“攻势”。<br><br>“叫我卡尔就好了，伊莲妹妹。”卢基诺享受地吸了一口猫，然后将她放下，问道:“东方先生是在忙吗？”<br><br>“没有哦，主人正在读书呢喵。”伊莲将卢基诺请进了屋，然后敲了敲书房的门。<br><br>“进来吧。”<br><br>伊莲在开门后，卢基诺就看到在书桌旁借着阳光阅读着一本黑色笔记的东方弘道，他的目光温柔而明亮，像是冬日的暖阳一般融化了女孩的心灵。<br><br>东方弘道摆了摆手，小猫娘便独自跑到了窗户边，只留下卢基诺和他面对面。<br><br>“东方先生……”卢基诺不知道怎么开口。<br><br>东方弘道看着她，突然认真了起来，他合上那本笔记，安然说道:“我知道你为什么来找我，卡尔，但这大会我是不会去的。”<br><br>“东方先生……可是，没有您去主持的话，我们实在是不知道该做些什么。”<br><br>“只要路线错不了，没有我你们照样可以前进。这是你们独立自主地决定自己命运的时候，我不便也不能参加。”<br><br>卢基诺失落地垂下了头，但东方弘道笑着揉了揉她的脑袋。<br><br>“行了，我不会不管你们的，毕竟现在的科恩还有我的一份心血在里面。只是这次该你们自己尝试着独立去完成一件事了。我能帮你们一时，但最终能决定你们命运的，还是你们自己。”<br><br>东方弘道取出一面红色的旗帜，上面有一个特殊的图案，就像是星空下的黑色眼睛。他将其郑重地交给了卢基诺。<br><br>“拿着它，对于东极亚人们的主事者来说，这比任何政令都管用。明王之名，还是应该由你们东极人自己来继承。”<br><br>“伊莲，我们出门转转吧。”东方弘道招呼着正趴在窗口看风景的猫娘，后者蹦蹦跳跳地就跑到他的身边，蹭了蹭他的衣袖。<br><br>“咱们就共同努力吧，卡尔。我刚来的时候这个城市缺衣少粮，我希望在我走的时候，这座城市衣食无忧……”<br><br>经过多日准备，科恩城的建制大会终于召开，参加会议的有人类，也有亚人。有农民，也有修表匠。有街边小贩，还有卫队士兵。但无一例外，他们都怀着同样的目的，那就是组建一个与旧势力彻底分割的属于人民的新政权。<br><br>会议中心最显眼的地方空着一个位置，诺亚坐在左边，而卢基诺则在空位的右侧。芸如自己找了一个角落窝着，她本来是不想来的，但东方那厮非要社恐的她出面跟代表们混个脸熟。<br><br>会议开始没多久，就听见下面的与会代表们窃窃私语，目光都盯着台中间的空位，卢基诺轻叹一声，起身回应了他们的疑惑。<br><br>“诸位也都看到，东方弘道并没有出席我们的会议，但这并不意味着他就对我们撒手不管了。东方先生这么做的目的是想告诉我们，他带领我们推翻了怀德乔的残暴统治并非是想成为科恩城新的领主，反而他已经将一切抉择权都交给到了我们手里。所以我们在之后的这段时间里，要独立地解决旧时代遗留下来的问题，以及确定未来的发展方针，这样才不负先生的信任。”<br><br>会议热火朝天地展开了，诺亚不厌其烦地让每一位代表都发了言，在旁的芸如甚至困到直接睡了过去，而卢基诺则是一直在维持秩序，这些情绪激动的代表们咒骂着贵族和官吏，宣泄着自己的不满，而诺亚积极引导，总能将会议继续引到他原本的进程上来。<br><br>“大会已经决定在将贵族的土地验检完后，合理分配给每一个少地缺地的平民。为了一个人人平等，衣食无忧的新世界，我们自当做好一切包括牺牲在内的准备，用我们的毕生，为我们的同胞，为我们的子孙后代开辟出一条通途出来。”<br><br>“群众万岁，人民万岁！”不知道谁突然站了起来喊了一句口号。<br><br>“群众万岁！人民万岁！”接着如排山倒海般的附和传来。<br><br>看着群情激动的代表们，卢基诺突然站起身来举出红色的明王旗，在场代表们无不动容，掩面而泣，以往的领主们都只把他们当作敛财的工具，随意驱使的奴隶，而这些年轻人，居然能平等地对待他们，听取他们的声音，将庄园拆解分给他们土地，免除各种苛政杂税。<br><br>“明王……明王回来了！”一位亚人长者眼眶含着泪水，哆哆嗦嗦地哽咽着。其余的人也都彼此鼓励，人类，亚人……这面旗子可以团结一切可以团结的对象。他如同黑夜中的黎明号角，像众生宣告新世界的来临。<br><br>最后，诺亚起身总结，而在座的各位不由自主地全都起身肃立，他们庄严地看着双手捧读着一张薄薄的白纸的诺亚，后者向全场人员微微颔首，然后宣读了上面的四个大字:<br><br>“诸位，经过这次讨论，我们与会代表一致同意，科恩新政权以后的名字就叫做———<br><br>黎明阵线！”',
    sksn_huaideqiao:'<li>【基础信息】<br>角色设计：爪巴<br>故事：爪巴<br>角色配音：德乔本乔<br>称号：<font color=red>煞笔</font><br>姓名：怀德乔<br><br><li>【能力数据】<br>身份定位：无<br>能力定位：搞笑型，选了就输<br><br><li>【背景故事】<br>监牢里，领主怀德乔坐在角落的草垫上闭目冥想，这时，他听到了铁门被钥匙打开的声音。<br><br>他睁开眼睛，站起身直盯着面前这位缓缓走进来的黑发少年。这两天怀德乔从狱卒们的谈话中已经得知了少年的身份，以及他所做的一些事迹……<br><br>东方弘道歪着脑袋看了看他身后那扇被钉上铁栅栏的窗户，语气轻松地朝怀德乔说道:“窗户没给你全封死，这两天你应该也都透过它看见外面发生什么了。”<br><br>“我当然看到了，你们这帮人毁掉了科恩，毁掉了秩序和法律……”怀德乔囔囔道，他显然是不接受自己失败的事实。昔日的一方诸侯如今却沦为了阶下囚，在这如过山车般的人生里他有一件事却怎么也想不明白。于是片刻后，他情绪激动，冲着东方弘道质问道:“我看见外面那些亚人打着一面旗子，那面红色的明王旗！你怎么会知道使用那个东西去召集亚人？！你究竟是从什么时候盯上科恩的？又用了什么法子让那些刁民追随你？！”<br><br>东方冷笑一声，伸出三根手指说道:“这次行动从谋划到准备我花了三个月，而从实施到最终获得胜利却只经过了五天，这五天里每一天早上我都会给那些因沉重徭役赋税而饿的半死的穷人们分钱发粮，他们刚得到粮食还没等到天黑起灶就被你的卫队收缴了，得到容易失去难啊，这一来一往，让他们本就不满的情绪无限扩大……然后，我为他们带来了出路，在看到那面顶风飘扬的红色旗帜后，他们终于在绝望和愤怒中爆发，在我和诺亚行动的时候，他们自发集结打败了你的卫队，接管了科恩城的守备和政权，而这一过程远比我预计的都要快很多。”<br><br>“你是激起了他们的怒啊……”怀德乔一屁股坐到了草垫上。他摇了摇头，反问道:“以前不是没有人这么做过，但他们都没有形成势力，我不明白那些贱民怎么就心甘情愿追随了你？”<br><br>“这你就想错了，我不需要让他们追随我，我只是想通过这件事情告诉他们——他们团结起来所爆发出的力量，究竟能给他们带来什么？穷人，奴隶，他们的力量确是弱小，但那是因为他们之前都是一个个单一的个体，等到他们集结起来的时候，所形成的力量不亚于任何人类军队。虽然他们身上还佩戴着枷锁，但当他们心中的枷锁被破除的时候，势必将以摧枯拉朽之势摧毁禁锢限制他们自由的一切旧事物。<br><br>在那种情况下，群众就像是一个卡在半山腰的车轮，你需要做的只是轻轻一推。”<br><br>东方弘道做了一下推手的动作，然后他在牢房里来回踱步，边走边打量着怀德乔，虽然他面色憔悴，但衣冠服饰却整理的十分整洁，看上去仍像是一位地位显赫的贵族老爷。<br><br>“我看过你的资料，你的祖父曾经跟随雅各布南征北战，功勋赫赫，你怎么说也算是一个英雄的后裔。我还听说你年轻时还因为替毫不相识的穷人出头被令尊关了紧闭……所以这两天我在想，究竟是什么让一个充满了英雄气概的少年最终变成了一个鱼肉百姓的恶魔。”<br><br>“时间，权力会改变一切的，不管你承不承认，当你到了这个位置的时候，你就会看到一些不一样的东西……堕入黑暗的代价是什么？我当然清楚，但如果你不成为它们，它们便会反过来吞噬你……”<br><br>怀德乔和东方弘道互相对视着，但前者的眼睛里却看不出什么光泽。东方弘道沉默不语，他别过头去轻叹一声，之后对这位冥顽不化的旧贵族说道:<br><br>“不管怎么说，这次是我赢了。你会成为科恩历史上最后的领主，而我们将在这里建立一个崭新的国家，一个雅各布所设想的生机勃勃，没有压迫和剥削，各族之间消弭了隔阂的新世界。”<br><br>“你赢了？呵呵呵呵，东方弘道，你以为自己就掌控一切了吗？驱使他们反抗我的不是什么忽悠人的明王旗，也不是你所谓的那些苛政，而是不断轮回的历史。没错，我怀德乔是败了，可之后呢？这科恩城不过只是换了一个新的领主，一个新的怀德乔而已……<br><br>你拿明王来说事，那好，我就跟你讲讲明王的故事。在雅各布建立东极之后，他一件事就是废除领主剥削奴隶的制度，但同时也废除了仁慈的领主照顾其领地内衰老，贫弱的奴隶的义务。他给予了所有穷人自由，但你猜这样的结果是什么？第二天就有一帮子老奴跪着请求让他们重新回到被奴役的地位——否则他们在遭遇不幸的时候谁能来照顾他们呢？<br><br>无论是自愿还是强迫，受到保护还是遭到践踏，甘受奴役的现象永远不会消失。占社会多数的愚民始终比不过少数的精英，就算你把他们脖子上的镣铐摘掉了，但奴隶还是奴隶，他们从出生时刻在骨子里的奴性决定了他们的未来，他们的子孙后代最终也会重新戴上枷锁。而在这漫长的轮回中不变的只有一条，“贵族”将永远站在金字塔顶端。<br><br>你们没有赢，明王也是如此，你们今天可以鼓动他们来毁掉我的一切，以后也会有人来拉拢他们去毁掉你们！”<br><br>怀德乔从一开始的气愤逐渐转换为歇斯底里的嘲讽，但东方弘道始终没有什么表情变化。他淡然说道:<br><br>“这你不用担心，以后的事情就让以后的人解决，我只做我现在该做的事。”<br><br>“那你现在该做的是什么？”<br><br>“解决你。”<br><br>东方弘道目无表情地看着他，怀德乔愣神片刻后捂着肚子冲着东方弘道哈哈大笑。东方弘道无可奈何地摇了摇头，他的嘴角微微勾起，也跟着笑了起来。<br><br>——————<br><br>“东方先生！”守在监牢外的亚人族少女卡尔·卢基诺一见到东方弘道出了牢房，便朝他招手。<br><br>“感谢您为我的同胞们做出的一切……”卢基诺在东方弘道走到他面前时，猛地弯曲身子，朝他下跪。东方弘道见状没有犹豫便直接扯住了她的右臂将其拉起。<br><br>“别跪，卡尔，这里没有人值得你去下跪……现在是，以后也一样。”<br><br>卢基诺擦了擦因感激而不自觉涌出的眼泪。她感慨道:“先生……您真是明王再世……”<br><br>“行了，叫你来是为了正事的。之后我要去一趟西尔斯城处理一下科恩还有南方的问题，这段时间内我要你去游说各亚人部族的，争取组建一个绝大部分都由亚人构成的队伍，科恩现在形势并不好，必须加强守备力量。”<br><br>“明白，我一定不负先生重托，不过我怎么没见到诺亚前辈，他去哪里了？”卢基诺向后看了看，并没有发现之前那个和东方弘道形影不离的男人<br><br>“他嘛，衣锦还乡。”东方弘道摆了摆手，没有再说什么，独自向北方走去了。',
    sksn_feieryide:'<li>【基础信息】<br>角色设计：九醉书生<br>技能设计：琉璃菠萝<br>故事：爪巴<br>角色配音：九醉书生<br>称号：<font color=#DDDDFF>恐惧之面</font><br>姓名：费尔伊德<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：刺客型，持续输出<br><br><li>【背景故事】<br>帝都，阴云密布，可能不久便会下雨。<br><br>墙角的那朵玫瑰枯萎了，花瓣凋落的不成样子，就像是一摊黑色的血液。<br><br>街道上，那只野猫的尸体很快就被清理掉，清道夫把它丢进臭水沟里，等着它自然腐烂，和城市融为一体。<br><br>黑夜下的帝都，随处可见的道德沦丧，在教堂周围，灯红酒绿的快活场所，牧师和妓女们混在一起。在圣洁伟岸的神像前，愉悦地代替神明完成她的工作——创造生命。当大雨倾盆而下时，水沟里的肮脏之物就会翻涌上来，首先淹没了无知的平民。<br><br>这时政客，神职人员，还有那些富商们就会漠然地站在悬崖峭壁，向下凝视血色的深渊，看着挣扎的人们交杯畅饮。他们以此为乐，有时会虚伪地将手伸进口袋，仿佛要给那些痛苦地喊着“救救我们”的乞丐递上一份虚假的希望。但等到他们艰难地到脚边时，再一脚踹开，毫不在意地说道:哦，对不起，我骗了你。<br><br>街道的角落里阴冷潮湿，巷子深处，不时会传来女人的呼救，这是帝都进入夜晚的序曲，总会有堕落的野兽在夜晚脱下那虚伪的人皮，也总会有倒霉的羔羊被它们盯上。女人被堵到角落里，她哭喊着，哀求着，但这却不能阻止野兽们那沸腾的兽性。不知道到底是为了钱或是色心……还有两者都有。夜晚成了最好的庇护，当黑色的幕帘笼罩世界的时候，在路上总是会游荡着一群吃人的恶鬼。<br><br>我的名字是费尔伊德，它并不代表什么意义，它只是一个符号，它只是……一张面具。我的故事微不足道……至少在这个令人堕落的城市里没有人会对它感兴趣，他们更乐于把自己沉浸在拥有着英雄的神话里，期望这个世界上能凭空诞生出一个万能的救世主，引领他们走向充斥着爱与和平的天堂。<br><br>不过若是你真的对此感兴趣的话，那我也可以说说，只不过你得先告诉我……在你的眼中，我是什么模样？<br><br>我脸上总是佩戴着一张面具，那就是我的脸，在我很小的时候，妈妈就用行为告诉我，你得学会伪装。而她的确很会伪装，哪怕是面对自己厌恶的人，只要对方将一枚银币放在床上。她都会表现得很高兴，然后愉快地脱掉衣服，跟他翻云覆雨。她从来没有提起过我的父亲，或许她自己也不知道谁是我的父亲，我很感激她即使这样也决定把我生下来并养大，而且我从她那里学到了很多，其中最重要的一点就是，我的的确确需要一张面具，一张能让我不再需要伪装的——面具。<br><br>黑夜降临后，我第一次戴上我的面具走在帝都的街道上，那时候，我看到一个乞讨的小姑娘，当她看到我时，她兴奋地跑过来称赞我说:先生，您的面具真漂亮。我递给了她浑身上下仅有的三枚铜币，她向我鞠躬，然后便跑开了，看得出来，她很高兴。直到后来，我在另一个地方见到了其中的一枚铜币……<br><br>那天夜里，我路过富人区，一栋占地极广的院子的一扇窗户底下，我捡到了一枚很熟悉的铜币，上面还残留着我衣服上的味道。屋子里不断传来窸窸窣窣的动静，我扒着窗户，想看看里面有什么。但我该怎么描述自己看到的呢？那个曾和我有一面之缘的女孩，浑身赤裸地躺在地板上，她双眼无神，目光呆滞，眼角残留着泪痕，嘴张着，口水止不住地流，她仿佛想要抽泣，但却早已没了力气。她纤细的脖子上系着一根粗大的锁链，身上青一块紫一块的全是瘀痕。两腿蜷缩着，地上血和一些黄白色的不明液体混在了一起，充斥着淫靡的味道。她发现了我，但却没有任何动作，眼睛里没有了一丝的神采，我们就这样默默地互相注视着。直到她被屋子里的另一个人抓着脚拖进了阴影里……我已经不记得自己当时是什么表情了，但我记得我下意识地看了一眼那镶着金边的门牌，上面的名字我不记得了。但我知道他们一定比妈妈更会伪装自己。<br><br>帝都里每天都会发生这种事，大家心照不宣，见怪不怪，就像是看见老鼠钻进下水道一样习以为常。没有人喜欢多管闲事，她放弃，我沉默……多么默契的配合啊。但是，我突然脑子里萌生出一个想法，我想知道她刚刚再次看到我的面具的时候，会不会和第一次有什么不同。<br><br>那高大的铁门紧闭着，仿佛很害怕被别人透过栏杆看到其中的黑暗，我只好翻过那高大的围墙，闯进了陌生人的院子……但那又如何呢？<br><br>但里面跟我想的不同，什么都没有发生。只是发生了一件每天都不知道会发生多少次的事情：一个无辜生命的凋零。那个身着华丽的男人，他戴着的白手套一尘不染，手里拿着一把木匠用的锯子，在案板上割着什么东西，地上尽是散落的碎块和猩红的液体。而当他看到我时，我第一次看到这样身份的家伙那早已麻木的灵魂露出这般恐惧的模样，他大声地咒骂我是地狱来的魔鬼，但他却始终不敢直视我面具上的花纹。我想他是害怕我的样子，我这真正的样子……但这真是太奇怪了，连生活在最底层的小女孩都不怕我的脸，而他却仿佛见到了最可怕的修罗恶鬼一般。我拿着那把锯子来回切割着，我也不知道为什么我如此的熟练，也许我天生就该干这个，手臂来回摆动的酸痛感觉让我记忆深刻，温暖的鲜血溅到我的脸上，我不知道这个时候该摆出什么表情……那天夜晚，我没有找到那个女孩……但我找到了自己，真正的自己……<br><br>黑夜，是野兽的猎场，他们和我一样喜欢黑夜，因为只有在晚上，他们才会脱掉白天的伪装，将自己的本性显露出来……是的，他们白天的伪装难以辨认，或是每天主持婚礼的神父，或是在谈判桌上舌灿莲花的外交官，又或是看着仿佛一无所知的学生，可能也是脸上有伤疤的小混混……但这些身份到了夜晚，在灯光昏暗时你就会发现，它们其实都一样。它们都曾经有过选择，小的时候谁都不想成为那带着面具的恶鬼，但这座城市，总是引诱着人们堕落……<br><br>野猫总在夜晚发出刺耳的声音，我透过乌云密布的天空想要寻找神明，我希冀着她能给我这靠谎言活着的可怜虫一点救赎，但我却什么也没有发现，厚实的乌云遮盖着天空，没有露出一丝光亮，这城市的黑夜如同遮羞布一般将罪恶彻底遮盖……在抛弃了幻想中的一切美好后，我明白了一切，杀死那个女孩的不是神明，将她肢解成碎块和肉末也不是什么命运……而是我们自己。<br><br>就这样，从那时起，我便真正成为了费尔伊德……<br><br>后来，城市的掌权者们开始恐慌了，他们通缉我，他们把费尔伊德的“脸”画到一张纸上，满城张贴，可明明是同样的一张面具，那些目击者们却无法给出一个统一的形象，于是画着各种各样面具的费尔伊德通缉令便出现在了城市的各个地方。不管是牧师商人，还是流氓地痞，他们都恐惧着费尔伊德，因为他们从那些画有他面具的通缉令中看到了更多可怕的东西。他们颤抖着，祈祷着，畏惧着……我不知道他们害怕的究竟是什么，是费尔伊德的面具，亦或是他们无法压抑的本性。<br><br>但同样的，我也不得不在白天伪装自己，我只能将我的“脸”摘下来，藏在了箱子最底下的夹层里。伪装成一个合格的良好公民。我无可奈何地模仿那些贵族老爷们，在出门前对着镜子仔细打理着自己的仪容，但我没法看到自己的表情。不过这样做的好处是，小孩子们很喜欢我，他们觉得我的这份“伪装”很好看，呵呵，的确是。<br><br>而等到这座城市进入了夜晚，我才能真正地活着。有些外表光鲜的家伙一听到费尔伊德的名字就跌跌撞撞地转身逃跑，我变成了悬在他们头顶的一柄利刃。而最后，我将送他们到了一个再也见不到费尔伊德的地方。法律呢？教会颁布的法律限制不了罪恶，但我或许可以……<br><br>市民们无法理解费尔伊德，他们说将其描述为从地狱中爬出来的恶鬼，是个无法无天的杀人犯，哦，我是从地狱中爬出来的不假，但我只是那群失去人性的野兽眼中的恶鬼……<br><br>我有时候也在想，也许那些人走上这条罪恶之道是由于各种各样的理由，也许他们一开始只是被逼无奈，他们在白天说不定也会跑进教堂的忏悔室里哭诉……但那又如何呢？这座城市每天都有堕入深渊的野兽。我并不关心行凶者悲惨的过去，我只知道受害者的未来已经消失……<br><br>就这样，人们逐渐发现费尔伊德已经成为了社会常态。成千上万的人在疾病、战争和饥荒中死去，而某些人对此却是漠不关心，他们凭靠着黑夜的掩饰，为了自己的一己私欲，将整个社会拖入一条污秽的绝路……但在费尔伊德那张面具的阴霾下，他们却只能向着天空虚伪地寻求神明的保佑，但当他们抬头时却只能看到——<br><br>帝都，阴云密布，可能不久便会下雨。',
    sksn_muguchen:'<li>【基础信息】<br>角色设计：摄心人。<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=cyan>未知旅行</font><br>姓名：沐孤尘<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，全场效果<br><br><li>【背景故事】<br>“吾名伊凡帝勒，诸位又是何人？”<br><br>伊凡帝勒身穿着红色道袍，站立于异界之门前，淡漠的问道。此时的他，浑身透露出一股威严，让在场的每一位都不由自主的产生臣服的感情，仿佛是一尊君王般俯瞰着世间万物。<br><br>“伊凡帝勒……我曾在教会的图书馆的万国博闻书上看到过这个名字，不朽者伊凡帝勒为了寻求超世之法曾攀越圣山，登上了时空圣殿，但他不应该早已经被神主给驱逐了吗？”爱萝依瑟瑟发抖地躲在安洁丽娜身后，紧紧抱着精灵大姐姐死不放手。<br><br>“的确是他……原来他一直都被关在这异界之门后，等待时机卷土重来……”安洁丽娜紧握双拳，不敢把目光从那个男人身上移开。她知道面前这个诡秘男人的回归对这个世界来说将会是一场巨大的灾难。<br><br>伊凡帝勒没有在意他们的小动作，他怀抱中菲儿沃克的身躯此时渐渐化作了星星点点的蓝色光粒，慢慢向天空飘散，最后只在他手里剩下了一颗通透的水晶。<br><br>“那个女孩……不是普通人类。”安洁丽娜看到此情此景后，忽然想起了极北地区的雪灵族，传说这个种族的成员死后都会化为一枚通透的冰晶，但雪灵族不是早就已经灭亡了吗？<br><br>伊凡帝勒将冰晶收起，他望向还在发愣的三人。<br><br>“诸位不说些什么吗？”<br><br>“我们和你可没什么好说的。”安洁丽娜说道，她在那个男人身上感受到了令人厌恶的气息，于是搭起弓箭瞄准了伊凡帝勒。<br><br>“是吗？那么真是可惜……”伊凡帝勒浮起乍看就显得无可奈何的笑意。<br><br>“轰隆”一声，阴暗的天空径直落下一道霹雳，爱萝依下意识地将安洁丽娜扑倒才使后者躲过了这致命的闪电。但紧接着伊凡帝勒就出现在伊格诺斯身前，<br><br>“不要！”爱萝依尖叫道。<br><br>就在此时，一个娇小的倩影挡在了伊格诺斯身前，她张开了多重的结界，挡住了伊凡帝勒的攻击，但却因力量太过悬殊，她屈膝跪下，嘴里吐出一口鲜血。<br><br>“新田！”<br><br>“你们快走……我替你们挡住他。这件事因我而起，如果不是我执意去寻找什么真相，那么也不会……快！伊格诺斯，带她们离开这里！”<br><br>伊凡帝勒没有想到居然有人能挡住这招，便加大了力量，新田布止的屏障开始出现一道又一道的裂痕。<br><br>“快走！我坚持不了多久……”<br><br>她说罢，整个身子便被一道白光彻底吞噬。<br><br>“不要！！！”伊格诺斯痛苦地嘶喊着。<br><br>“别这么着急就跟人诀别嘛，小姐，您要是死这里的话我可没办法跟那家伙交代……”<br><br>一个背着一个巨大的旅行背包的小伙子出现在众人的视线中，沐孤尘击碎了迎面的雷霆，然后他顺势将新田布止拥入怀中，单手挡住了四散的霹雳。<br><br>新田布止感到一丝熟悉的气息，她缓缓睁开眼睛，却看到了与想象中不同的面孔……<br><br>伊格诺斯踉跄地跑到他们身旁，担忧地问道:“没有事吧，新田？”<br><br>新田布止摇了摇头，表示自己并无大碍，应伊格诺斯这才松了口气，他看向沐孤尘，紧紧握住了他的手:“谢谢你救了我的朋友，我是伊格诺斯。”<br><br>沐孤尘眼前一亮，他上下打量着伊格诺斯，然后郑重地自我介绍道:“我叫沐孤尘，姑且是一名旅行家。额……现在貌似不是说这个的时候。”<br><br>沐孤尘转头看向远处如一尊神像般的伊凡帝勒，突然感到一股无形的压力向他袭来。伊凡帝勒稍微扫了他一眼，他就感到双腿沉重，仿佛自己是只被老虎盯上的绵羊。<br><br>“唔……看着就打不过啊……算了还是试试吧。”<br><br>沐孤尘十分犹豫，但他回身看向一脸迷茫的新田和伊格诺斯，他们束手无策的样子还真是可怜，就像是……<br><br>沐孤尘眼神突然坚定了，他向他们轻声说道:“一会儿协助我靠近他……不然我没有任何胜算……”<br><br>伊格诺斯虽然不知道他的来历，但他毕竟刚刚挡下了那道致命的雷霆并救下了新田，而且听他话里的意思，应该站在他们这边的吧。<br><br>“为什么帮我们？”伊格诺斯和沐孤尘肩并肩，面向伊凡帝勒摆出了应战的姿势。<br><br>“都是来自那个世界的老乡，自然是要互相扶持的……我上了。”<br><br>未等伊格诺斯反应，沐孤尘积蓄已久的力量便于此刻爆发，他一个跃步冲向伊凡帝勒，但就在快接近对方时，眼前却突然扫过一道猩红，沐孤尘离开就感到胸口遭受了一记重击，整个身体被带着打飞了出去！<br><br>一股强大的力量将沐孤尘击飞，他在撞断了一棵大树后一头栽倒地上，不停地咳着鲜血。他难以置信地瞪着伊凡帝勒，刚刚他居然连对方的出招都没有看清就被打飞了。<br><br>“咳咳……果然不行啊，试试就逝世……”<br><br>沐孤尘艰难地从地上爬起，拍了拍脸上的灰尘。他身上能抗住高阶魔兽攻击的魔能甲在刚刚伊凡帝勒的随手一击下居然化成了粉末，现在他的脑袋昏昏沉沉，但仿佛眼前能直愣愣地看到一个大写的‘危’字。<br><br>“有趣的小老鼠……虽然不知道你是从哪儿来的，不过也到此为止了。”伊凡帝勒不屑地嘲讽道。他丝毫不在意沐孤尘身上到底有多少底牌，在绝对的实力下，任何的花招都是徒劳无用。伊凡帝勒如今也玩腻了，他伸出左手食指，射出一道紫色疾雷。<br><br>在这千钧一发之际，伊格诺斯瞬身到沐孤尘身边，扯着他躲过了那道疾雷。与此同时，爱萝依召唤出炎魔参战。<br><br>炎魔和虚影不同，它咆哮着向伊凡帝勒发动攻击。炽热的岩浆迎面袭来，伊凡帝勒并没有退后，他只是轻轻抬手，数道紫红色的雷电形成了一只巨大的屏障，挡住了炎魔的拳头。<br><br>雷霆和火焰交锋，这两张自然界中最暴躁的元素激烈地冲击着，元素对冲引起的强大爆炸声贯穿了众人的耳膜，他们只能听到一段很长时间的嗡鸣。<br><br>伊凡帝勒饶有兴致得审视着这个满身流淌着炽热熔岩的巨人，那样子就像是在观摩一个精巧的玩具。他渐渐加大了力量输出，雷霆逐渐蔓延到炎魔身上，霹雷电闪不断摧毁着构成它身体的岩浆块。<br><br>炎魔痛苦地嘶吼着，它的身躯不断瓦解，直到再也无法继续保持形态，最后碎裂成了一块又一块焦黑色的岩石。爱萝依也因此受到了极大的反噬，喷出一口鲜血。<br><br>安洁丽娜见此也只能硬着头皮上了，她操纵泥土里的种子疯狂地生根发芽，用生出数根藤蔓扯住伊凡帝勒的双脚，但也只能限制他仅仅一秒钟。而就在这短短的一秒钟内，伊格诺斯再次发动瞬身带着沐孤尘扑到伊凡帝勒面前，沐孤尘从身后的背包中甩出一张地图。<br><br>“给我滚到里面吧！”沐孤尘将那地图拍向伊凡帝勒。伊凡帝勒破开藤蔓的束缚，反手抵挡那张地图，却正中沐孤尘下怀。<br><br>地图和伊凡帝勒接触后四射出五彩虹光，将他吸入图内。沐孤尘赶忙卷起地图，然后用一根粗绳使劲在上面缠来绕去。在确保万无一失后他将地图丢到一旁，甩了甩头上的汗。<br><br>“真险啊……”他看向伊格诺斯，如释重负地笑道。<br><br>新田布止心脏跳的飞快，刚刚那如此惊心动魄的一幕，被她尽收眼底。<br><br>“成功了吗？”安洁丽娜在处理完爱萝依的伤势后，跑上前问道。<br><br>沐孤尘先是点头，但紧接着摇头叹息道:“这东西困不了他太久，现在我们必须转移出这片森林……只是，我最多只能带自己离开……”<br><br>沐孤尘挠着头皮使劲想着办法，突然，他看到了远处有一个东西在暗处发光，于是便走过去，将一个蓝色水晶从地里拔了出来:“有了，就用这个。”<br><br>他将时空碎片丢到伊格诺斯手里，那时空碎片刚一和伊格诺斯接触，就如获生机般地明亮了起来。淡蓝色的荧光让在场除沐孤尘外的所有人都十分惊奇。<br><br>“真不愧是‘破局者’，就是自带外挂啊。”<br><br>在确认了伊格诺斯的身份后，沐孤尘心里嘀咕道。他酸了，要是自己能用这玩意的话，还至于天天迷路吗？<br><br>事实上，他应该早就赶过来阻止他们前往异界之门的，但因沐孤尘并不认路，才耽误了好长一段时间，以至于现在陷入困境。<br><br>不过伊格诺斯他们并不知道这些就是了，他们甚至不知道沐孤尘是来干啥的。<br><br>“时空碎片是需要充能才能使用的，遇到不适应它的人就会吸干使用者的所有力量……包括生命力。但若是碰到适应它的人，就会是现在这样。”沐孤尘解释道，他看着那不断闪烁的蓝色光芒，不禁感慨:“我的地图一次只能转移一个人，但时空碎片中蕴含着无穷无尽的空间之力，足够带我们所有人逃出生天，而现在只有你伊格诺斯才能平安无事地使用它。”<br><br>沐孤尘将包裹收好，然后让众人以伊格诺斯为核心手拉手围成一个圆圈，尽量互相贴合着，不留缝隙。<br><br>伊格诺斯问道:“那我该怎么去用它呢？”<br><br>“你只需要仔细回想一个你记忆中曾到的地方，自然而然地就能激活它。”沐孤尘牢牢地握住了伊格诺斯的手，盯着他另一只手中的时空碎片说道。<br><br>“我曾到过的地方……”伊格诺斯看着新田布止，回想着当时他们初遇时的那座普通宅院。<br><br>这时，地图上缠绕的绳子一个个的崩裂，那个带来恐惧的男人毫发无损地从图中走出来。<br><br>一道冰冷目光向他们扫射过来，沐孤尘不禁感到一阵心悸。<br><br>“喂！他出来了！”爱萝依惊呼道。<br><br>伊凡帝勒手掌中迸射出三道颜色各异的闪电，直向众人袭来，沐孤尘一咬牙，挺身去挡。<br><br>“唔啊！”沐孤尘发出一声惨叫。就在此时，时空碎片转化成一道激烈的漩涡，将五人卷入进去，同时强大的斥力直接把伊凡帝勒的三道异色闪电击碎。<br><br>伊凡帝勒揉了揉因力量反噬而生痛的手腕，他冷冰冰地注视伊格诺斯他们消失的地方，突然大笑不止:<br><br>“呵呵呵呵，有意思，看来我不在的这段时间里，这个世界发生了很多事……”<br><br>——————<br><br>“新田妹妹不处理一下伤口吗？精灵族对于疗伤还是很在行的。”安洁丽娜在给爱萝依包扎完后，向一旁靠墙站着的新田布止问道。<br><br>“不了，谢谢，现在我想一个人走走……”新田谢绝了安洁丽娜的好意。她徘徊到房子的大门前，停下了脚步。<br><br>新田布止仔细回想，她知道自己看的很清楚，当时沐孤尘舍身替他们挡住那三道雷霆时，他胸口有一个物件在散发着白色的光芒。而那个东西，她记得……<br><br>之后，沐孤尘此刻没有在屋子里疗伤，他仅仅是要了瓶酒就跑到了院子里去了。<br><br>她刚一出房门，就发现了沐孤尘正在院子里懒洋洋地倚靠着一棵老槐树晒太阳，他手里还举着一酒杯，悠然自得地对着空气哼着不知道从哪里听来的小调。见新田朝自己走了过来，他顺手将酒杯一举，对她说道:<br><br>“小姐不来一杯吗？海都的苹果酒可是旅途必备啊。”<br><br>“算了吧，我还没到能喝酒的年纪。”<br><br>沐孤尘瞥了一眼她，问道:“那既然不是找我来喝酒的，就是……有什么事情要问吧？”<br><br>“的确是……我现在有一些困惑，不知道以后该怎么生活。以前的话，有个家伙老是不尊重我的意愿就替我拿主意，虽然我很反感这种行为，但却清楚的知道自己下一步该做什么，不至于迷失方向。但现在他已经离开了……”<br><br>往事不堪，新田只能苦笑一声，她接着说道:<br><br>“我听他们说你是一位正在游历世界的旅行家，所以我想请教一个问题:如果身处一个未知的地方，面临未知的困境，孤身一人找不到方向时，我该怎么去做呢？”新田布止一字一句地问道。<br><br>“没有方向吗？你这倒是问住我了……我想想，当我不知道该往什么地方走的时候，我就会抬头看看星空，跟着那最亮的一颗走。”<br><br>“倘若白日当空，星星不见了又当如何？”<br><br>“这简单，只需要静心等待就好了。白天的星星，会因太阳的光芒太过强大而暂时隐藏起来，但实际上它们从未离去。”沐孤尘肯定地点了点头，微笑着说道。<br><br>微风轻轻掠过女孩的发梢，秋天的三两片落叶向树梢挥手告别，黄昏的阳光均匀地撒在这并不算大的院落里，一切都显得那么的自然和谐。新田把手张开对着太阳，然后紧紧握住，那一刻，她仿佛感觉自己抓住了阳光。<br><br>新田布止已经懂得了沐孤尘这番话的含义，于是微微颔首，谢道:“这样吗……那我明白了，谢谢你。”<br><br>“不必客气……反正这原话也不是我说的。”沐孤尘没有注意到新田心态的转变，他摇晃着酒杯，轻声嘟囔道。<br><br>在新田离开后，沐孤尘摸了摸自己胸前的口袋，然后从里面翻出来一个像是吊坠一样的小玩意——庇佑护符。那时就是这个看似平平无奇的铁制饰品，替他挡住了伊凡帝勒的最后一击。而这个救命的宝物，却是那个家伙随手塞给他的……<br><br>他捏着这枚已经破裂的庇佑护符，仔细一看，才发现上面歪歪扭扭地刻着几个字——愿神明指引你。<br><br>“神明？呵，若神明真的能指引世人，又怎会有深陷迷途之人？又怎会……<br><br>沐孤尘苦涩地笑了一声后便将它收起，对着杯子把里面仅剩的苹果酒一饮而尽。<br><br>天色渐晚，沐孤尘起身伸了个懒腰，然后摇摇头走出院子，晃晃悠悠地走到街上。夕阳下的少年如同一张黑色剪影，向着日落之处继续远行。',
    sksn_zage:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=slateblue>喋血幽狼</font><br>姓名：扎格<br><br><li>【能力数据】<br>身份定位：反贼<br>能力定位：刺客型，爆发<br><br><li>【背景故事】<br>飞云渡外围的哨塔，汉克和他的同伴约瑟夫守卫于此，原本他们是有三十来人的，可领队的队长带着绝大部分人前往前哨站去探查了，只留下了五个人看家。而汉克和约瑟夫作为留守人员里最强壮的两个人，则每日都要去哨塔四周巡防。<br><br>今天他们俩像往常一样结伴巡防，不过约瑟夫却不停地左顾右盼，慌慌张张。<br><br>“怎么了？约瑟夫。”汉克向他的同伴询问道。<br><br>“没什么，只是我有些担心队长他们。”约瑟夫战战兢兢地说道。<br><br>“这有什么可担心的，队长只是去前线查看情况了，咱这飞云渡固若金汤，那些怪物们是怎么也打不过来的。”<br><br>“可现在哈里森将军不在，新来的这个女将军也不知道整天在想写什么，把兵力都集中到后方，前线就留了几座哨塔。我的神啊，真希望别出什么岔子。”约瑟夫担忧地说着。<br><br>“老弟，打仗这事就是上头要咱怎么办咱就怎么办，你担心也没有用，咱们就做份内的事就行了，至于形势什么的这些都留给上面的操心吧。”汉克看的很开，他也不明白上面这么做的目的是什么，但他们这些下层士兵又能决定什么呢？<br><br>“话虽然是这么说，但我最近总有一种不好的预感……真是糟透了……”约瑟夫嘟囔着重复着一些词，完全没有听进汉克的话。<br><br>汉克也不想再和这个胆小怕事的家伙说话了，在完成了今天的巡逻后，他已经迫不及待想回去歇会，明天来哨塔换班的就到了，那时候他就能远离前线，在后方安稳地混日子。<br><br>“啪嗒，啪嗒。”<br><br>“你听到什么声音了吗？”约瑟夫疑惑地问道。<br><br>“没有，有啥声音吗？”<br><br>“奇怪了，我明明听到好像是动物的脚步声，咱去那边看看吧。”约瑟夫催促着说道。<br><br>“好好好，你就是整天自己吓自己，我去看看总行了吧。”<br><br>汉克走到路边，略微眺望着远方的密林，但并没有发现什么异常的情况。这片林子就连一只小型野兽的踪迹都见不着。<br><br>“呵，我就说没什么异常吧，我看你就是杞人忧天，整天把自己搞的神经兮兮的。”<br><br>他回过头来，想嘲笑一番约瑟夫，但却并没有看到他的人影。<br><br>“约瑟夫？你跑哪儿去了？约瑟夫？！”<br><br>冷风吹过，卷起了地上的枯枝败叶，整片林子静的可怖。如果让汉克找个词来形容现在的情况的话，那就只有死寂……如同大洋深渊般的死寂。<br><br>汉克冷汗直流，他慌张地不知道该怎么办，他想要后退，但根本不知道该往那个方向跑，他踉跄着走了没两步，就被地上的一个荆棘给扳倒了。<br><br>“啪嗒……”<br><br>那是汉克踩碎了荆棘枝条的声音。汉克揉了揉屁股，他随手一抓，把那段枝条从脚下的土地里扯了出来。<br><br>“切，我当是什么声音，原来是这个……”汉克如释重负地感叹道。<br><br>“啪嗒……”<br><br>突然从他身后又传来了类似的声音，汉克如一只惊弓之鸟般忽的回头，但只见一道紫色的身影闪过，掠起一阵阴冷的风，尖锐的利爪划破凝滞的空气，霎时血液喷溅，如同一条优美的红色抛物线。可怜的汉克还不知道发生了什么就已经是身首异处。<br><br>“呵呵，两条杂鱼……”<br><br>一头直立的紫色毛发的狼人单手提着男人的头颅，眼冒红光戏谑地说道，之后他便将人头当做皮球踢到一旁。在他身后，又有两头灰色的狼人推着一个四轮车缓缓走过来，那四轮车上端坐着一位闭着眼睛，气定神闲的狈族老人，虽然他跛了一只脚，但却丝毫不减威风。<br><br>“扎格将军，依老夫看不远处就是飞云渡前的最后一座哨塔了。”那狈眯缝着眼睛，看着地上的无头尸体说道。<br><br>“呵，这么说现在他们的外围阵地已经全部丢失？好啊，那么之后我们该如何？军师先生。”狼人回身向其毕恭毕敬地请教道。<br><br>“那些暴躁魔兽的特点决定了我们宜急不宜缓，我们不能像人类军队一样围而不攻，打持久战，而是必须集中全部兵力专攻一处，只要能把飞云渡破开一道口子，那么一切就都结束了。”<br><br>老狈名为旺达尔，是鹰角域领主奥克佩特花大力气从魔狼族中请出来的军师。这次进攻飞云渡，奥克佩特特意派他来协助先锋大将狼人扎格，并给予他计划方案的最终决策权。<br><br>作为狈类魔人，旺达尔比他的狼人同胞们更加狡猾和残忍，他为扎格所谋划的蚕食政策已经初现成效，现在飞云渡前的十座哨塔在不知不觉中悉数被他们拔除。现在他们距离胜利只差最后也是最难的一步——攻克飞云渡。<br><br>“那就一鼓作气，集结所有兵力强行攻城，不拿下这飞云渡，我等将永远困顿于魔能之地这片没有曙光照耀的萧条废土。”<br><br>扎格的血红色竖瞳凶光外显，他将自己的利爪收敛起来，看着东方的天空。在不远处那座屹立百年的关隘，即将迎来一场无可避免的浩劫。',
    sksn_nuodengsi:'<li>【基础信息】<br>技能设计：§<br>故事：爪巴<br>称号：<font color=#D200D2>守门人</font><br>姓名：诺登斯<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，保护<br><br><li>【背景故事】<br>“这就是上古废墟吗？”新田布止囔囔道，她将身后背着的爱萝依放下，仔细观察着满是碎石和附着植物的遗弃之地，这片罕无人迹的荒凉废墟令她感到一阵阵莫名的寒意。<br><br>她四处张望，但没有发现什么异样，这里除了残墙断壁就是各种草木。不过这些不知道历经了多少岁月的石墙石砖上，倒有一些还未被风雨侵蚀的符号绘画。<br><br>新田靠近了一面苔藓遮盖的石墙，在触碰到石壁上的古怪符号后，她胸口系着的时空碎片闪烁出耀眼的光芒，汇成一条线向远方散去，新田感觉它好像是在指向一个地方，于是便跟随着光芒向那里走去。<br><br>上古废墟处处都是破损的白色建筑，新田跟着那道渐渐消散的光勉勉强强挤过一道狭长的走道，来到了一处类似祭坛的地方。这时，一扇历经了岁月的沧桑的石门映入眼帘，门约五米高，宽两米左右，上面绘刻着看不清楚的奇异符号，门中央有一道细长的缝隙，但却看不到里面有什么。大概是因长期废弃，爬山虎，苔藓等附着类植物从大门四周向中间延伸。这扇门没有拼接的地方，就向是将一块巨大的石头直接削成平面，再加上鬼斧神工的雕刻制造而成。它有何用途？又为谁制造？现在仍旧是个迷。<br><br>“好壮观……”<br><br>但还未等新田感叹完，一段尖锐的冰刺就朝她袭了过来，新田勉强躲过，她转向冰刺袭来的方向，问道:“谁？！”<br><br>只见一名蓝发女孩从一面白色断墙后走出来，她身上覆盖着一层薄薄的白色冰雾，刚刚那块冰晶看来就是由这雾气凝结而成。<br><br>菲儿沃克早已在此地埋伏多时，虽然之前误打误撞跑到禁锢森林的深处和精灵起了冲突，但她还是顺利的跑掉并来到这上古废墟。并提前埋伏起来，等待新田布止的到来。<br><br>菲儿掷出凝结出的两把冰刀，新田蹲下躲闪，但还是被其中一把划破右臂，血液像泉水一样涌出，新田疼地一屁股坐到地上。她禁咬牙关，用灵力止住了伤口，然后翻滚到最近的石墙后面躲避对方的远距离攻击。<br><br>新田感觉最近是倒霉极了，才摆脱麻烦没多久，又迎头碰上一个难缠的能力者，可能一会说不定还有什么别的幺蛾子。<br><br>“可恶……”新田布止躲在石头后想着对策，爱萝依依旧在昏迷中，她在不清楚对方实力的情况下也不敢贸然出手，况且，她来这里的目的也不是为了跟人掐架的。<br><br>蓝发女孩到底是谁？新田现在并不关心，能知道自己持有时空碎片，并这片人迹罕至的上古废墟中埋伏，想都不用想肯定是司吉那个老神棍把她给出卖了。<br><br>“从一开始这就是一个局吗？我中计了。”<br><br>新田布止心想道。她之前还因东方弘道说她头脑简单和他打过一架，这下如果东方弘道知道她又在这种事上栽跟头还不得拍着膝盖笑话死她。<br><br>“东方……”新田失落地囔囔道，她突然意识到，那家伙已经不在了……<br><br>她和菲儿还在对峙中，而对方的目标明显就是奔着她身上携带的时空碎片来的。<br><br>“把时空碎片交出来，我保证你可以安全离开。”菲儿身上冰霜凝聚，时刻能再次发起攻击，但新田同样在调动灵力随时准备还击。<br><br>“你说这个东西吗？哼，有本事就过来抢啊！”<br><br>新田从石墙后露出头，将时空碎片从胸口拿出，对着菲儿摆来摆去挑衅着，她早已做出了选择，并思索着该如何应付对方的突袭。<br><br>“呵，但你的对手可不只有我……他已经醒了。”没想到菲儿居然不受她言语的影响，反而微微一笑。<br><br>突然间，一道不知从何处轰来的深绿色光波贯穿了数块石墙直向新田布止袭来。新田之前的预感没有错，菲儿并非她要面对的唯一麻烦，不过这光波里蕴藏的能量居然让她感到深深的厌恶。她看向光波的源头，一位身着灰黑色巫师袍，拄着一把已经完全锈蚀的黑色银质权杖的老者出现在她的视线中，那老者半抬的手掌上还有些残余的绿色粒子在不断消散。<br><br>“你又是谁？”新田感到很大的压力，她没有把握同时对付两个实力未知的能力者。<br><br>老者用一种审视的目光仔细观摩着新田还有菲儿，他慢慢悠悠地走到离她们不远的位置，然后将自己的权杖杵在地上，向二人宣告:<br><br>“吾乃守门人诺登斯……是这片遗迹的看护者，你们现在已经闯入了你们不该闯入的禁地，速速退去，否则吾将以神之名制裁你们。”<br><br>新田胸口的时空碎片这时突然不停颤动，诺登斯颇好奇地看向它，但下一秒却脸色大变。诺登斯知道这块淡蓝色水晶代表了什么，他现在已经将新田还有菲儿认定为要破坏异界之门的恶人，于是便要履行自己的职责，将她们驱离上古废墟并把时空碎片夺回来。<br><br>“把那个水晶给我！它不是你们所能掌控的东西。”诺登斯指着新田胸口的时空碎片说道。<br><br>“休想。”新田坚决地回绝了诺登斯的要求。她并不惧怕这个看上去就很强悍的老法师，相反她甚至还觉得诺登斯知道一些她苦苦寻找而不得的事情。<br><br>菲儿看着场面僵持，她决定想退到一旁，等两人打起来坐收渔翁之利，没想到她刚一后撤，诺登斯就一发元素波轰了过来。<br><br>“可恶，你这老家伙……”菲儿咬牙切齿地骂道，这老头明显是把她当成新田布止的同伴，以为她刚刚是想逃跑。<br><br>数不清的蓝色冰凌在菲儿四周盘旋，而诺登斯也聚合了一个半人高的绿色光球，新田布止微微叹息，她知道一场战斗已是不可避免……<br><br>——————<br><br>在解除了和精灵安洁丽娜之间的误会后，伊格诺斯便和她火急火燎地赶到这里，他们刚靠近废墟便听到了灵力爆炸的声响。<br><br>伊格诺斯没有立刻前去探查，他感应到了一个熟悉的气息，然后绕道一根石柱后面，恰好看到了正倚靠着一块残垣断壁呼呼大睡的爱萝依。<br><br>战斗异常激烈，三方都是拼上了全力，时不时波及到四周的石墙的石柱。随着一阵阵响声，被风化的碎石块不停从高处掉落，伊格诺斯赶紧跑过去护住爱萝依。<br><br>安洁丽娜对伊格诺斯说道:“你先去找你的朋友吧，我来照顾她。”<br><br>伊格诺斯再三思考，想着也没其他办法，于是点头答应，然后紧忙跑向爆炸的地方。<br><br>在那扇高大的石门前，伊格诺斯看到三个人在相互攻击，新田不断闪避着诺登斯发来的光球还有菲儿的冰刺。<br><br>伊格诺斯眉头紧锁，他盯着左右躲避诺登斯攻击的菲儿沃克，心想这不正是之前他在东港城区里碰到的那个女孩吗？<br><br>“奇怪啊，诺登斯大人之前不会平白无故地攻击闯入者的……”<br><br>安洁丽娜背着爱萝依也赶到了门前，她很是疑惑，精灵族世代都与异界守门人诺登斯交好，据上任女王陛下的说法，诺登斯原是时空圣殿的一位神明，但在远古时代与异界魔物的战斗中被魔能侵蚀，无法再回到上界，于是神主路西法命他在这上古废墟处永世守护异界之门，以防止不怀好意之人再次通过此门将灾厄释放。而诺登斯虽然被魔能侵蚀，但却仍保有一颗善良的心，对于平时误入禁地的生灵也是保持极度的克制，但今天怎么偏偏频出杀招呢？<br><br>因诺登斯攻势猛烈，菲儿受伤后只能转向被动防御，她边用手抹去嘴角的血渍边看向从一旁突然钻出来的伊格诺斯他们。她没有想到伊格诺斯支援的这么快，况且那精灵跟在他身后，貌似已经不把他当作入侵森林的敌人，现在局势对她而言很不利。<br><br>诺登斯也注意到周围又多了三个人的气息，但他现在已经应接不暇，那名蓝发女孩的灵力仿佛能阻止他的魔能释放，使他不得不花大量精力抵御这种侵蚀。而另外一个长着东方面孔的，则让他有某种强烈的危机感，不只是她身上携带的时空碎片，还有她使用的那奇怪的力量，不是灵力或异能，而是某种……更为原始的东西。<br><br>新田布止转头看向伊格诺斯，松了一口气。菲儿找准时机，挥舞着一把冰刃向新田刺去。伊格诺斯突破空间限制，眨眼就到新田身前，张开结界替她挡下了这招。<br><br>“让开，伊格诺斯，我不想伤害你。”菲儿皱着眉头说道。<br><br>“你们认识？”新田退到一旁看向伊格诺斯，她不知道这两人的关系，但看上去这两人很是暧昧。<br><br>但这一片刻的分神使得诺登斯抓住了机会，他双手结出一道法阵，向新田布止轰去，新田一时心头剧震，已经来不及躲闪，眼看就要被这魔能波击中。<br><br>“快闪开！”伊格诺斯惊呼道。<br><br>“虚影，去救人。”这时，在安洁丽娜怀中的爱萝依突然醒了过来，随着她的呼唤，一个散发着彻骨幽寒的骷髅鬼影从她的影子里钻了出来。<br><br>虚影立刻化作一道黑色之雾，抄着一把豁口镰刀横在了诺登斯和新田布止面前。诺登斯先是一惊，但随后便将虚影也当成了敌人，与其缠斗起来，伊格诺斯趁着这个时机，使力一抬将菲儿击退。<br><br>诺登斯与虚影之间的余波卷出一道道蕴含着狂暴能量的气浪，紫色的魔力光束被黑色镰刀斩断，碎裂为了纯粹的魔能，巨大的冲击将大地撕裂。<br><br>眼见对方四人汇合，菲儿意识到形势不妙，于是灵机一动，朝在一旁观战的伊格诺斯喊道:“伊格诺斯，你不会想趁此机会把时空碎片独吞吧？”<br><br>伊格诺斯不由得一愣，他不知道菲儿这话是什么意思，爱萝依头顶也冒出一个大大的问号来，不知所言。而新田却被这离间计给触动了，她先是用带有些许怀疑的目光看向伊格诺斯，见伊格诺斯还在一直看着菲儿，她于是默默护住了时空碎片，逐渐远离他。<br><br>诺登斯显然不会放过他们这一愣神的时机，他迅速从与虚影的僵持中脱困，马上向新田布止攻去，新田没能想到诺登斯会突然向她袭来，边护着碎片边向后退。<br><br>诺登斯步步紧逼，新田屏住呼吸，边退边防御，并卖了一个破绽，勾引诺登斯往前突击，然后像一条泥鳅一样使出一招灵活的侧身躲闪，接着从自己手掌中迸发的一道纯粹异能，狠狠地拍在诺登斯的背上。诺登斯回身用权杖砸去，但新田布止突然握起一把光剑，两兵相交，发出清脆的声响。<br><br>诺登斯不知道她哪里拿出了一把流光溢彩的细剑，但仔细观察后才发现，原来是刚刚新田布止重塑了时空碎片的形态，将其化作一把适手的兵器。<br><br>两种灵力相撞对冲，发出低沉的轰鸣。新田看准空档，踏空一脚将受伤的诺登斯踢到在地。新田气喘吁吁地瞪着菲儿，问道:“你刚刚说的话是什么意思。”<br><br>菲儿没能想到新田能打赢诺登斯，但她却没有显现出慌张的样子，反而开口回答道:“对于你们这些异世界人来说，异界之门是连接两个世界的大门，而时空碎片则是打开此门的唯一钥匙，亏你还掌握了这件别人梦寐以求的宝物，居然连这都不知道，伊格诺斯是想要利用你来打开这扇能让他回家的门啊。”<br><br>新田迟疑了，但还未等她加以辩识和思考，菲儿就紧接着说道:“呵呵，看来这里只有你被蒙在鼓里，你还真是可怜啊，想打开异界之门需要持有时空碎片的人进行自我献祭，你以为他们陪你到这里是因为什么？他根本不是想要帮你，他只是为了自己的目的罢了。”<br><br>菲儿这一段颠倒黑白的言论令新田布止为之颤动，在这种情况下，任何能让人感到怀疑的事都会被无限放大，新田不知道自己是不是该相信菲儿说的，但伊格诺斯身上的的确确的有她琢磨不透的地方。<br><br>“是这样吗？伊格诺斯……”新田布止转过头，握紧了拳头面无表情地朝伊格诺斯问道，伊格诺斯连忙摇头，解释道:“不是的，我只是和她简单的有一个照面，我根本不知道这东西有什么用。”<br><br>新田布止内心烦乱，她的眼前仿佛忽得出现了一个黑发少年的身影。男孩轻轻挥手，将她的思绪带到了几个月前——<br><br>那时自己耐不住寂寞想要出门，想要离开世纪高塔，在海都交际圈内展现自我时，东方弘道却伸手拦住她，并说了一段至今令她记忆犹新的话。<br><br>“出了这扇门后，你会碰到很多人……可能也会交上一些朋友，但那种被背叛之后的痛苦，那种无人可信，世界上仿佛只有你自己存在的孤独感……也会在你交往的过程中由然而至。但愿你已经想好要怎么应对这种情况了。”<br><br>诺登斯眼见新田迟疑了，便开口嘲讽道:“哼，看来内讧是你们人类从古至今都有的特点，我岂能让你们这些家伙破坏异界之门！”<br><br>新田布止不想听他废话，一脚牢牢踩住诺登斯后背。<br><br>“新田，快住手，诺登斯不是敌人！”伊格诺斯着急地喊道。他知道新田布止已经不相信他了，但诺登斯现在绝不能被她杀死。于是便眼神示意爱萝依，但后者摆手表示无能为力。<br><br>“你闭嘴！”新田布止喝止住了他，她瞪了一眼伊格诺斯，内心五味陈杂。虽然新田已经做好了死亡的觉悟，但却不能这么不明不白地死在真相的大门前。她现在谁都不敢相信，东方弘道所言说的那种孤独感，她现在正深刻地体会着。<br><br>“如果我用这东西杀了你，那扇门是不是就会打开了。”新田将光剑抵住诺登斯的喉咙，声音夹杂着强烈的怒意和悲伤，但诺登斯只感受到了一股强大的杀气。<br><br>“……”诺登斯一言不发，他没能想到自己会败在一个小丫头手里，她手中握有的时空碎片居然能化为一把利剑，简直是闻所未闻。<br><br>菲儿眼见新田动摇了，暗自窃喜，这个机会千载难逢，她必须现在就做出行动。<br><br>菲儿趁着新田布止将注意放在诺登斯身上的时候，不顾一切地扑倒她，拼死抢夺新田手上那把时空碎片化作的光剑。诺登斯身上的压制力突然消失，他侧翻到一旁，并怒吼着快速向二人轰出一道魔能冲击。<br><br>这强力的招术引发了周围空间范围内的爆炸，将墙壁上的碎石炸的七零八落，卷起了地上的尘土，刮的到处都是。震耳欲聋的爆炸声使在场的人耳朵都长时间嗡鸣。<br><br>“新田！”伊格诺斯向爆炸处跑去，却被安洁丽娜伸手拦住。<br><br>待烟雾散去，众人急忙看向异界之门的位置，只见手臂断了一截的菲儿沃克正站在大门前，她咬着牙，强忍着疼用冰晶冻结了伤臂的截断面，而她另一只手死死握住已经恢复本样的时空碎片，浑身上下还在不停地流着血。而不远处新田布止昏倒在地，因爆炸暂时失去意识。<br><br>菲儿沃克咳出一口鲜血，里面还有内脏的碎片，她没有管自己的伤势，反而望向了伊格诺斯。<br><br>“伊格诺斯……对于欺骗你们我很抱歉……我说过我并不想伤害你，我也不想和你们作对，只是我们彼此命运注定我们将成为敌人……谢谢你的之前的挺身而出，但你救了一个不该救的人……”<br><br>菲儿说罢，便目光决绝，反手握着尖锐的时空碎片刺入自己胸腔，红色的鲜血瞬间喷涌而出，浸红了她的上半身。<br><br>时空碎片被激活了，它就像一只嗷嗷待哺的羔羊一样贪婪地吮吸着菲儿的生命力。<br><br>诺登斯感到不妙，伊格诺斯从爆炸的余波中缓过来，一脸震惊地看着捂着心口的菲儿。<br><br>霎时间时空碎片闪烁着诡异的光芒，虹彩笼罩了整个上古遗迹，异界之门仿佛感应到了献祭，它上面布满的藤蔓和苔藓，碎石和土灰纷纷剥落，那铭刻着古代文字的纹路如同久逢甘霖的种子一样，散发着斑斓光芒向四周扩散。<br><br>“父亲……菲儿等这一天已经太久了……”<br><br>被时空碎片吸走了生命力的菲儿沃克如同断线风筝一样，踉踉跄跄地向着门口倒去。时空碎片在得到了足够的能量后，便从菲儿的胸口脱离出来，飘浮到了空中，然后闪着炫光极速向大门的闭合处飞去。<br><br>“休想得逞！”<br><br>诺登斯怒吼一声，冲上前去想夺下那时空碎片，但为时已晚。时空碎片如同一把利剑插进门缝内，将大门的封印破除，那来自异界的强大能量潮从门后像长河之水一样倾泻而出，在场的众人都有一种头晕目眩的感觉。虚影连忙招出结界抵御这异界能量的侵蚀。<br><br>诺登斯顶着倾泻的能量冲上前，想用自己的身体抵住正在缓缓张开的大门。但就在这时，一只枯槁的手从门后伸出，迎面按住了诺登斯的额头，诺登斯满脸惊恐地睁大眼睛，瞪着那个从异界之门里渐渐显露身形的男人。<br><br>他穿着一身教会的红色十字袍，身体干瘦，眼窝深陷，两个墨绿色的眼睛向两把尖刀一样，令人毛骨悚然。他的手指修长，皮肤就像是直接披在骨头上一样，活脱脱地如同一个许久未见太阳，刚刚从坟墓里爬出的食尸鬼。<br><br>“你……是你？！”<br><br>诺登斯惊恐地说道，但男人却不想同他交谈，手掌一用力就捏碎了诺登斯的头颅……<br><br>奉神明之命守护异界之门至今的诺登斯没能完成他的使命，甚至连一丝挣扎都没有便一命呜呼。而随着诺登斯的死亡，异界之门已经完全地打开……<br><br>男人将诺登斯的无头身躯随手一丢，像是一个出门丢垃圾的小孩一样，在处理完这件‘寻常小事’后便不再看一眼。<br><br>他深吸一口空气，嘴角微微勾起，张开双臂向着这一方天地自言自语地说着:“我回来了……美丽的家园。”<br><br>然后，他将目光扫向了在场的众人，从他身上散发出的庞大的灵力席卷而来，让防御结界荡漾起层层波纹，虚影在看到男人的面容后直接化作黑雾钻回了爱萝依的影子里。<br><br>随着虚影的消失，它所制造的结界也失去了作用，伊格诺斯瞬间就感受到一股强大的威压，双腿不由自主的发软，跌跌撞撞地扶着墙壁稳住身形。爱萝依甚至痛苦地跪倒在地上喘着粗气。安洁丽娜也没好到哪去，她冷汗直流，瞳孔收缩……死死盯住这个从异界之门里走出的怪人。三十年前，她曾从女王口中听到过一个故事，而那个故事中的人……<br><br>男人轻蔑地一笑，解除了自己刚刚散发的威压。他没有理会如释重负，正在调整着呼吸的伊格诺斯他们，而是蹲下身子，打量着倒在血泊中的菲儿。他眼中忽地闪过一丝难以被察觉到的悲伤，怜惜地双手将菲儿缓缓抱起，轻轻擦去她脸上的血迹。异界之门此时在他身后缓缓关闭，时空碎片被弹出，扎到伊格诺斯面前的地面上，而这些，男人并没有看一眼……<br><br>许久后，他抬起头来，对着还在惊颚中未缓过神来的众人开口说道:<br><br>“受到神明声音迷惑的穷苦贫民们，拼命挤进天堂的大门，但当大门在身后砰然关上时，他们却发现自己是在地狱里……吾名伊凡帝勒，诸位又是何人？”',
    sksn_deyingkemeng:'<li>【基础信息】<br>角色设计：轮回中的消逝者<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#FBFBFF>人畜无害</font><br>姓名：德嘤克萌<br><br><li>【能力数据】<br>身份定位：嘤嘤嘤<br>能力定位：嘤嘤嘤<br><br><li>【背景故事】<br>“一定……一定要活下去……”<br><br>这是夏依从母亲口中所听到的最后一句话。<br><br>禁锢森林这地方，蒙蒙细雨很平常，但大雨却不怎么常见，但好巧不巧，今日这瓢泼大雨偏偏是百年一遇。雨幕下，泥泞的地面越来越难走，但夏依还是不顾一切的向前跑着，她知道，一旦她停下脚步，等待她的就只有死亡。<br><br>“快追！等到了森林深处就保不齐会碰上什么魔物。”后面嘈杂的声音时不时传到她耳朵里，夏依知道那些来杀她的人就在不远的地方。<br><br>“老大，咱都追到这个地方了，还没有追上那个小娘皮，这再往前可就是那些高级魔兽的领地了。”一个黑衣人喘着粗气，向着前方马不停蹄的头领说道。<br><br>“吼……”一阵低沉的吼声在树林间环绕，这让再场的所有人心头一紧，夏依躲到了一个老树后面，不敢出声。她已经精疲力尽，如果那些黑衣人再上前的话，那么她绝对会被他们发现，但现在来看，前面也不是什么光明大道，极有可能是一头猛兽为了觅食而四处游荡……<br><br>“啪嗒。”静的可怖的森林中传出了树枝被折断的声音，同时惊起来不少飞鸟。<br><br>一个喽啰害怕，便向头领喊道:“唔啊！老大我们快撤吧，真的有魔物啊！”又有人指着一片密林说:“那里魔兽！是一头高级魔兽！”<br><br>头领停下脚步，仔细一想，他们只是拿钱办事，没必要为了一个小女孩把自己的命搭在这个冒险者的禁地。况且这里魔物众多，那个女孩无依无靠，铁定是活不下来的，最终也就会有个葬身野兽腹中的结局。<br><br>“吼哦哦哦！”一道震耳欲聋的嘶吼声传来，一个巨大的黑影出现在离他们所在位置不远的地方，头领见状直接大喊撤退。于是这些黑衣人们被这庞大的黑影吓得抱头鼠窜，躲在树后的夏依缓过神来，但她却没有看清楚那个黑影是什么就因体力不支晕倒了。<br><br>在夏依晕倒前，她好像看到了一团白色的云朵正向她靠了过来……<br><br>在细雨蒙蒙的禁锢森林中部地带，一头毛发雪白的熊嘴里叼着一名羸弱的女孩，在沿途野兽畏惧的目光中慢慢悠悠地走回了他黑黝黝的巢穴，外面的雨下个不停，整个洞穴也十分阴冷和黑暗。<br><br>在将女孩放到一块表面平坦的大石头上后，白熊搬来了一堆稻草，盖在了女孩的身上，然后在她身边转来转去，想了想感觉缺点什么，又从洞穴深处摸了两块燧石，叭哒一摩擦，打出了火星，并叼来了几根枯木，生起火来。<br><br>星星火苗，照亮了整个洞穴，白熊像一个小孩子一样坐在一个木桩上，静静地观摩这个娇小玲珑的人类女孩。这是他第一次近距离地跟人类接触，以前那些森林外的冒险者见到他要么吓的跑开，要么就对他用弓箭石头驱赶。<br><br>“唔……”夏依眼球动了动，白熊觉察到了异样，连忙上前查看。女孩面色很苍白，眉头紧锁，像是做了恶梦……<br><br>“不要……妈妈……不要死……”<br><br>女孩口中不断吐露出一些含混不清的词语。白熊轻轻将爪子放在她的额头，满满揉着，没一会儿女孩就恢复了平静。白熊满意地笑了，嘴咧的很大，看着甚至有些骇人。<br><br>白熊想起了自己小时候，在离开母亲后，他就一直害怕这些两脚兽。只敢远远地在很远的地方偷瞄这些穿着奇形怪状的家伙们，对于森林以及其中的生灵来说，人类是那么的格格不入。<br><br>白熊如释重负地呼出一口气，但却意外的将女孩惊醒。一人一熊大眼瞪小眼，气氛立刻尴尬了起来。<br><br>“你是……熊？”夏依揉了揉眼睛，她突然就懵了，不敢相信自己所看到的景象，但站在她眼前的确实是一头巨大的白熊。但自己为什么会在熊窝里醒来呢？<br><br>白熊同样眼睛瞪的贼大，双脚直立，像是很害怕面前这位人类幼崽的样子。他不敢上前，但却又十分好奇。<br><br>夏依面露怯意，她不敢在一头熊面前轻举妄动，她不知道这头熊把她叼来是要吃掉她还是什么。但当看到白熊像是一个拙劣的窃贼一样依靠着墙角蹑手蹑脚的双腿直立时，不由得笑出了声。<br><br>“唔嘤！”白熊好像是受了什么刺激，连连退后。他的双眼始终警惕着女孩，浑身不自主地颤抖。而夏依居然大胆地走到白熊身前，看着白熊无处安放的小手，再看了看自己刚刚躺着的地方铺满的稻草。她问道:“是熊先生救了我吗？”<br><br>白熊见女孩没有伤害他的意思，慢慢放松了警惕，他趴下身子，四肢着地，然后探出头来嗅了嗅女孩的身子。发现这个女孩身上并没有他想象中的威胁时，便点了点头，应道:“嘤。”<br><br>“谢谢……”女孩想说些什么，但半天下来，却只挤出了这么简短的一句话……<br><br>女孩整理了一下凌乱的衣服，将被雨水打湿的外套脱下。这时，一个在外套衣领上别着的银色铭牌吸引住了白熊的注意，他歪着头，仿佛在思索这个东西的用处。夏依见白熊目不转睛的盯着她衣领上银色铭牌看，于是便将其摘下取下。银质铭牌，这是冒险者协会发给冒险者的凭证。<br><br>“奥特•得英克蒙。”夏依念出了上面刻着的名字，这是她父亲的名字。她的父亲曾是海都的一名白银级冒险者，而这铭牌则是他留给夏依的唯一遗产。<br><br>夏依见白熊一直盯着这个铭牌，便已经想好了该如何做了，她将它别在了白熊胸口的毛发上，然后向着白熊微笑道:“白熊先生喜欢吗？那就送给你好了，谢谢你救了我。”<br><br>白熊就像是得到了新玩具的孩子一样，在洞穴里直转圈，喉咙里哼着不着边际的小调，时不时翻看把玩这特殊的银质铭牌，用引得夏依也跟着笑了起来。<br><br>当夜，雨仍然在下，白熊冒着雨从洞穴外不远处的小溪里叼回了两条鲢鱼，然后用木棍串起来，放在火堆上烤熟后递给了夏依。夏依一开始很惊讶，一头熊为什么会这么聪明，她甚至觉得白熊只是一个不会说话的亚人。<br><br>“熊先生一直是一个人吗？就住在这个山洞里？”夏依狼吞虎咽地解决完了一条烤鱼后，向着在烤另一条鱼的白熊问道。<br><br>“嘤嘤嘤。”白熊直起身子，双手搭在身前，眼神忧伤地看着夏依点了点头。<br><br>“这样吗……我也一样……我的家人都死了，被一个不知道姓名冒险者杀死……母亲死前叫我去海都，拿着父亲铭牌找协会的会长申冤，说会长会帮助我们……可他们哪晓得那个会长就是幕后主使。他派人追杀我，一直追到了这里……我已经一无所有，就像是被全世界给抛弃了一样……”夏依眼中露出了一丝寂寞的神色，自嘲道。在这潮湿的山洞里，一人一熊就这么干坐着，沉默了好长一段时间。<br><br>突然，白熊突然咕噜了一声，他抖擞了一下全身的水滴，然后站起来身来张开臂膀，冲着夏依手舞足蹈，像是要表达什么。<br><br>“熊先生……是想说……你愿意陪着我吗？”<br><br>白熊点头，黑漆漆的眼球中满是期待，夏依会心一笑，然后她做出了一个寻常人都不会做出的举动——她走上前，张开自己的双臂，紧紧地抱住了白熊。<br><br>“熊先生的怀抱很温暖，毛发也好柔顺……”夏依幸福地依偎在白熊怀中，就像是抱住了一个大号抱枕一样，又仿佛置身于一大团棉花糖中。<br><br>白熊轻轻抱住了她，生怕用力气过大伤到了夏依娇小的身体。夏依将脑袋紧紧埋在白熊的胸脯处，白熊也将脑袋稍微搭在女孩的头顶，这份温暖而甜蜜感觉令夏依很熟悉，就像是……家人一样。<br><br>“那么以后就请多多指教了，熊先生……”<br><br>白熊是独自生存的白熊，女孩是被人追杀的女孩。<br><br>一人一熊就这样彼此拥抱着，直到雨过天晴。',
    sksn_yunru:'<li>【基础信息】<br>角色设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#008080>第一生产力</font><br>姓名：芸如<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，爆发，比较全能<br><br><li>【背景故事】<br>科恩城主府，现在已经改为了联合议事厅。在东方弘道和诺亚鼓动平民还有亚人奴隶发动兵变，夺取了科恩的最高权力后，便以此为行政中心，不断颁布各种新政法案，以巩固新生的联合政权。<br><br>“代理城主，新政已经推行到领地内的各个村镇，但效果不怎么明显……”一个虎族亚人向正在审阅各地报表的诺亚汇报道,“那些怀德乔时期的贵族把持的地方庄园，俨然如一个个独立王国，我们的新政无法进到他们那里，不少奴隶仍然在被强迫劳动。”<br><br>诺亚揉着太阳穴，这些事情令他十分烦躁，东方弘道在离开前曾全权委托他代管科恩，但是他却如坐针毡，生怕会断送这个刚刚有些希望的领地。所以他采取的手段十分柔和，对于那些怀德乔时期的各方势力也极尽安抚，尽量不去触及他们的利益，但现在这些旧贵族却成了推行新政路上的一个难以祛除的顽疾。<br><br>“怎么了？有烦心事？”正当诺亚苦思冥想时，一个活泼但却不轻浮的声音传入他的耳中。诺亚抬头一看，一个粉发少女坐到了他的办公桌上，嘴里还叼着一枚点心。右手拿着一封文件，大致扫了一眼。<br><br>芸如，科恩兵变的策划者之一，东方弘道称其为自己的合作者，在诺亚接任领地的工作后，东方弘道便将她从海都叫了过来，帮助诺亚进行城市布防和武器研发。<br><br>“是你啊，不呆在你实验室里，怎么有时间来我这儿逛了？”诺亚并不能经常见到芸如，这家伙老是窝在一间小屋里不知道在搞些什么稀奇古怪的玩意。<br><br>“饿了，顺便出来透透气。不过看来外面也是挺闷的，把一个大活人都搞蔫了。”芸如将最后一块点心塞进嘴里，然后招呼虎族亚人离开，让他俩单独谈话。<br><br>“唉，别说了，新政推行很不顺利，那些贵族拼了命的阻拦，仗着自己的私人武装在地方作威作福。”诺亚扶额苦恼道。<br><br>“这样啊……你怎么打算的？”芸如看着桌子上被扔到一旁的名单，上面的名字上全是诺亚划的一个又一个红叉。<br><br>“不知道……”<br><br>“那我有个办法，你想听吗？”<br><br>“请讲。”<br><br>“东方弘道既然让你全权处理科恩的一切事宜，就是要你不惜一切代价把新政推行出去，出什么事他担着。现在南方不太平，这些私人庄园如果不能尽快除掉的话，对科恩来说就是安在身体里的定时炸弹，刮骨疗毒，虽然暂时会很疼，但确是必要的。”诺亚频频点头，表示赞同，但芸如接下来的话令他神色大变。“他们不听科恩城的调令，无非就是仗着自己的庄园能自给自足，现在秋天快到了，空气干燥的很，你若在田里点上一把火，那会如何？”<br><br>粉毛切开都是黑的，东方弘道曾这样描述过芸如，而现在诺亚总算知道了这句话是什么意思了。<br><br>“这是步险棋啊，而且……”<br><br>“但你没有那么多时间了，若是连一个科恩城都治理不好，那不如早点回家种地。”芸如是一点都不客气，但现在的情况确实需要下一剂猛药。<br><br>“我再想想吧……”诺亚还是没有想好。<br><br>芸如也不再等他回应，拿起桌上的一张名单就踹进了自己兜里，反正东方弘道交代的她已经跟这傻小子讲完了，也是时候回去继续她的研究了。她走回了议事厅旁边的一间小屋里，点亮了屋子里的灵石水晶灯，这种灯依靠一种矿石中的灵力为能源，海都人运用符文当作控制其灭亮的开关，从此令照明脱离了火焰的束缚。<br><br>她将一个黑色立方体搁到屋子中间的工作台上并在上面轻轻一拍，那立方体离开就像魔方一样旋转起来，直到变成了一个类似投影仪的东西。<br><br>芸如走到投影仪前，敲了敲它的外壳。“喂，这东西是用灵石当能源的，别浪费时间了。”<br><br>说罢，立方体便投出一道淡蓝色的光芒，一个人形投影渐渐被构建出来，那道投影开口道:“好久不见，芸如，怎么样，科恩这地方还不错吧。”这投影的映射出的正是远在西尔斯的东方弘道。但他的状态明显是不太妙，不过投影恰巧看不出他苍白的脸色和颤抖的身躯，所以芸如也没有在意。<br><br>“客套话就免了吧，你在海都的‘后事’我可都安排妥当了，只不过……你确定要把那个东西交给她吗？”<br><br>“那东西只有放新田手里我才放心，她知道该怎么去处理。对了，那个破局者你找到了吗？”东方弘道语言缓慢，但却十分坚决。<br><br>芸如把桌子上的一张设计图卷起来，塞进旁边的书架里。然后又从书架处取出了一张画像，上面描绘的人物正是伊格诺斯。<br><br>“找是找到了，但那小鬼看着挺呆的，他身边还跟着一个挺恐怖的女孩，我本想让摩根敲打敲打他，但好像他最后跟小新田搭上伙了。我说东方啊，你就这么忍心把她一个人扔到那里吗？”芸如皱着眉头看着画像上的伊格诺斯，但她无论怎么看都觉得这不像是一个靠谱的家伙。<br><br>东方弘道的投影在屋子中来回踱步，他在思索，他也不知道让新田布止接近破局者对她来说是福还是灾祸，或者他应该直接把新田带到东极来，远离西大陆这个是非之地。可现在东极的情况比海都也好不到哪里去……<br><br>“我不可能保护她一辈子，至少呆在破局者身边能让她在海都的浊流中稍微看清些形势，至少在东极稳定前，把她接过来不是个明智的选择。”<br><br>“的确啊，今天诺亚又为新政的事板着个脸，始终下不了决心去搞那些旧权贵们。”芸如想起来刚刚的事情，诺亚整天就为了这个事愁眉莫展。<br><br>东方弘道听到后，长叹一声。“怪我走的早，没能把那些寄生虫给全部除掉……这些贵族该怎么处理，等我回来再说吧。诺亚心善，凡事你多帮着他点，这段时间别让他被那些人精给坑了。我还得在西尔斯城多呆会儿，一切就都拜托你了。”<br><br>“切……说的就跟再也见不到一样，算了，告诉你个好消息吧，那东西的研发已经快要到尾声了，等你回来时就应该会有成品做出来。”芸如看上去有些疲惫，便向后瘫倒在一张摇摇椅上，伸着懒腰直打哈欠。<br><br>东方弘道见状，知道她昨天又在熬夜搞研发，便走上前，用虚拟的手隔空摸了摸她的脑袋。他的声音很温柔，带有一丝心疼。<br><br>“接下来会发生什么，我心里也没有底，但如果在科恩我们都立足不下去的话，那这个世界将没有我们的生存之地。亚人和平民都是我们的天然盟友，他们比我们更想守住现在的科恩城，有什么想法多听听他们的意见，对你们在科恩的工作会很有帮助。”<br><br>东方弘道最后交代道，说不担心他们是不可能的，毕竟科恩城现在算的上他们在东极的大本营，而这立足之地的处境是内忧外患，所以推行新政如履薄冰，但又不能不行。<br><br>“哟，你啥时候也懂得发动群众了？你以前可不是这种热衷于政治的人，是什么让你转变的？”芸如躺着椅子上，揉着困倦的眼睛问道。<br><br>这不经意地一问，令东方弘道想起了那本奥丁格兰交给他的雅各布日记。在那上面不光记载了东方弘道最想了解的异世界真相，还有些别的内容触动了他早已经坚若寒冰的内心。<br><br>他缓缓开口道:“某天，那是一个晴朗的夜晚，当我抬头向上看时，才发现异世界同样有着璀璨的繁星。”<br><br>“你说啥胡话呢？我怎么听不懂？唉？人呢？”芸如睁开眼睛时，却发现投影仪已经恢复成原来的立方体，而东方弘道的影像早已经消失。<br><br>芸如用手臂半遮的脸颊上不断有泪珠滚落，她当然知道，海都的分身死亡对东方弘道的重创有多大，这个看起来比他大不了多少的少年整天在死亡线上徘徊，过着正常人难以想象的生活，但却极力关照他的每一位故友……<br><br>不能让他一个人替我们把活全干了……<br><br>芸如从口袋里掏出来那些拒不执行新政的权贵名单，她突然想到了一个好主意，并像反派一样阴冷地笑道:“哼，就让这些土著看看科技的力量吧！”',
    sksn_anjielina:'<li>【基础信息】<br>角色设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#9DEF1F>万物芳茵</font><br>姓名：安洁莉娜·奈林<br><br><li>【能力数据】<br>身份定位：主公，反贼，忠臣<br>能力定位：辅助型，防御，控制，保护<br><br><li>【背景故事】<br>禁锢森林，位于西大陆最西端瓦伦丁尼安王国的南部，是一片广袤的原始森林。自世界诞生以来，这片森林便持续存在至今。因为位置太过偏僻，树林茂密，猛兽众多，所以这里远离人类世界，并保持着最原始的生命气息。在森林的最深处，有精灵族世代守护着的世界初生时的第一株树——桫椤神树。所有的树精灵都是由这株参天巨木孕育而出的，所以她们亲切地称其为“母树”。<br><br>在仙境般的草木繁茂之处，精灵族傍树落居，依川沉栖。在圣树的绿荫下过着无拘无束的生活。但自从冒险者发现这个地方的时候，困扰也随之来临。精灵族的美貌是有目共睹的，禁锢森林里生长的奇珍异材也令他们趋之若鹜，更有甚者为了金钱干起了走私的勾当。<br><br>精灵女王艾丝仙蒂跪在神树祭坛前，极度虔诚地为圣树祷告。在她身后，一位皮肤白皙，肤如凝脂的金发女郎悄悄地跪在她身后，她身着蝉翼般的半透明薄纱，浑身萦绕着出尘的仙气。<br><br>“陛下，刚刚闯入的侵略者已经被赶走了，不过那个人很强，而且可能还有其他同伙，我们是不是要……”<br><br>艾丝仙蒂满怀敬意地看着神树的枝丫上结出的一颗又一颗褐色的果实，其中有一颗上还有着金黄色的纹路。她伸手一抬，一道金色的灵力便从她手中脱出，环绕着果实不断盘旋，最后被吸收进果实内。<br><br>“安洁你看，母树的果实快要成型了，而且还孕育出了神圣之种，精灵族的下一任女王、你们的公主殿下不久就会出生了。”<br><br>“真的吗？说起来精灵族好久没有新生儿了。”安洁丽娜兴奋地说道。<br><br>‘真不知道公主大人会是什么样子，应该很像女王陛下吧。毕竟历代从神圣之种里诞生的精灵女王都几乎是一个模子刻出来的。’安洁丽娜这样想到，她已经迫不及待地想看到公主殿下出生了。精灵族作为最贴近自然的亚人族，她们的繁衍大多数是通过母树结果，而这神圣之种，则是精灵王族的象征。<br><br>“嗯，神圣之种不容有失，所以这段时间务必加强领地周围的戒备，以提防不怀好意之人再次进入到禁锢森林的核心。这次来的人可能只是一个试探，等下次再发现有人闯入时，我准许你使用一切手段驱逐他们。”<br><br>“陛下放心，安洁丽娜定不辱使命。”<br><br>安洁丽娜退下后，艾丝仙蒂轻叹一声。她最近总有种不好的预感，母树与她之间的联系越来越淡薄，仿佛是想隐蔽起来躲避危险一般。<br><br>艾丝仙蒂虽然想做好迎接困难的准备，但却是有心无力。精灵是一个没心没肺的快活种族，哪怕危难就要来临，她们也不会忧心自己的处境。她们漫长的生命和富足的生活使她们不用像其他种族一样为了生存而拼命。在她们的价值观里，安于现状就是幸福。<br><br>精灵女王面向圣树，微微颔首，她双手合于胸前，祈祷道:“桫椤母树在上，请保佑精灵族能平安度过这次难关，艾丝仙蒂敬谢。”<br><br>——————<br><br>“我感觉我们貌似被那神棍给坑了……”新田布止踢倒了一块挡路的枯木，他们现在正向正北方向前行。因为禁锢森林荒无人烟，所以不存在道路这一说，他们便用刀和斧子开路前行，以保证方向的准确。<br><br>“别感觉，就是。”伊格诺斯用柴刀砍断了前方密密麻麻的荆棘，吃力地说道。<br><br>“啊，好麻烦啊我们到底要去哪里啊。”爱萝依打着哈欠，抱怨道。森林里蚊虫众多，让爱萝依很是烦躁。<br><br>“所以你为什么非得跟过来……”伊格诺斯嘟囔道。<br><br>“你说什么？”爱萝依和善地朝他微笑。<br><br>“没有……啥都没说。”<br><br>行进在远离外界的原始森林，自然气息扑面而来，三人组已经从森林边缘一路摸索，正朝着异界之门的所在地——上古废墟前进。尽管路上没有遭遇想象中的猛兽，但却让他们丝毫不敢松懈，伊格诺斯觉得这冒险者的坟墓一定有什么恐怖之处才令那些侥幸逃出森林的人如此印象深刻。<br><br>“有些不正常啊，按理说我们已经到了森林较为中间的位置，可除了几只虫子外，什么野兽都没有见到，这样下去午饭可就没着落了。”伊格诺斯发出一声感叹，他的肚子也跟着咕咕叫。<br><br>“等等，你说午饭？你没带便当吗？”新田诧异地瞪大了眼睛。<br><br>“没有啊，咱这不是去森林吗？我寻思着到时候可以逮几只野兔现烤，那成想不光没有野兔，连只耗子都没有。”伊格诺斯摆手道。<br><br>“……”<br><br>沉默，持续的沉默在三人间不断发酵，最终爱萝依满脸黑线，怒不可揭的向伊格诺斯猛扑了过去。新田也摇了摇头，挥舞着拳头朝伊格诺斯走去。<br><br>“喂！别过来啊！这只是意外！大大的意外！啊！！！”<br><br>伊格诺斯的惨叫声响彻了禁锢森林的天空，但却并没有引出其他生物的声音，只有风吹过树梢，木叶莎莎作响。整个森林仿佛就剩下了他们三个人，寂静的令人发怵。<br><br>“嘘！真的不对劲……他刚刚嚎的这么大声，可连只鸟都没有惊出来，不好，我们可能中套了。”新田在收拾完伊格诺斯后，对爱萝依比了个静止的手势。<br><br>“你是说……我们被人阴了？”伊格诺斯从地上爬了起来，整理了一下被爱萝依挠的凌乱的头发，然后接着说:“可我们并没有觉察到什么异常状态啊……”<br><br>“伊格诺斯，我们什么时候进的森林。”新田布止扭头问道。<br><br>“上午7时吧，现在应该过去了三四个小时了。”<br><br>“对，按理说在这个时间，这个位置，正午的太阳应该就在我们头顶，但你看现在的太阳在哪里？”<br><br>伊格诺斯抬头一看，居然在正上方看不到太阳。他急忙爬上一棵树，并向东方眺望。<br><br>“这……”伊格诺斯不敢相信自己的眼睛，他看到太阳仍然在东方地平线稍向上一点的位置，好像这几个小时下来根本就没有移动片刻一般。他赶忙把这个异常情况报告给了新田，后者也是不知道如何解释。<br><br>“幻境……还是什么的奇怪的领域能力？”伊格诺斯猜测道。<br><br>“不知道，但如果不赶紧想办法离开这片森林的话，我们的性命很有可能会搭在这里……原路折回估计没戏了，放手一博吧。”新田布止轻叹一声。“幻境是光线的折射再加上某种能阻碍感觉器官的东西对大脑进行影响，依托于现实的物质场地所构建的虚幻景象。不过不用管这些，如果这片森林是幻境的话，那就用最快的方法物理破除，把能构造幻境的基础给它全破坏了就行。”<br><br>伊格诺斯脑瓜飞速旋转，突然他想到了一个主意，于是便径直走到爱萝依身边，顺手把她托起来，两眼眯成一条缝，不怀好意的微笑道:<br><br>“大小姐，我们都没有啥厉害的范围技能，这回只能靠你开路喽。”<br><br>爱萝依白了伊格诺斯一眼，但还是同意了他的请求，她向前伸出左手，使出了一个召唤术。<br><br>“炎魔！烧尽这片森林！”<br><br>随着一声沉闷的巨响，大地突然被一股怪力撕裂开，一个庞然大物从地面的裂口钻了出来，它身上尽是燃烧的火焰和滚烫的岩浆。<br><br>炎魔怒吼一声，裂焰从它口中喷射而出，高温引燃了周遭的树木，伊格诺斯赶紧带新田远离火焰，退到爱萝依身后。<br><br>烈火肆虐，吞噬着一方生灵。树木在高温和火焰下碳化，化作灰烬。浓烟滚滚，让人睁不开眼睛。过于茂密的树林是火焰天生的温床，如果不加控制，整片林场变为火场只是时间问题。<br><br>伊格诺斯右手紧握，放火烧山的确是无奈之举，而且他无意于烧尽整片森林，他只是在赌这是一场人为的幻境。<br><br>“住手！”一道清冽的声音传来，三人向声音的源头望去，一位耳朵尖尖的金发美人正站在远处一棵树的树枝上怒气冲冲地喊道：“快住手！”<br><br>“唉？精灵？！”新田布止瞪大了眼睛，火海的边缘处居然潜藏着一个精灵，她搭着弓箭，直接射向爱萝依。<br><br>“呜啊！”<br><br>爱萝依没有防备，一支爆裂箭扎到它脚下的土地上，轰的一声，她被爆炸产生的冲击震飞，倒在地上失去了意识。炎魔失去了主人的控制后，便停下了攻击，身躯化做粒子慢慢消散。<br><br>精灵没有停手，她紧接着射出第二箭，但被伊格诺斯用柴刀挡下。但却引发了再次爆炸，产生的余波直接吹灭了周围树上的明火。<br><br>“敌人吗？！”伊格诺斯下意识地想发动异能还击。但被新田伸手拦住。“不，先别动手。”<br><br>“没想到你们还有点本事，侵略者们！”这位精灵即是安洁丽娜，她瞪着做出防御姿态的二人，轻蔑地嘲讽道。<br><br>“这位精灵小姐，我们并无恶意，如果误入了您的领地的话我们马上就离开。”新田布止急忙解释。<br><br>伊格诺斯甩了甩被震的生疼的手臂，他注意到，在安洁丽娜腰间别着一只布袋还有一株紫色的花。“那朵花……看着不像什么好东西。”<br><br>“迷幻香，禁锢森林特产植物，能散发让人陷入幻境的花粉，但受热的话会失去效用。”新田布止显示是做足了功课，看来之前的怪异都是朵花搞的鬼，也就是说他们在刚进入森林中心时就中了那个精灵的套，但没想到爱萝依这一烧，歪打正着把迷幻香制造的幻境给解除了。她盯着站在树梢上的安洁丽娜，接着说道:“精灵族通常不会和人类起冲突，可能是我们闯入她们的领地了，先试试能不能交流。”<br><br>但——“哼，卑鄙的人类，你们来一次还不够，还敢再回来，这次你们休想全身而退！”安洁丽娜声音中透露着愤怒，明显是不打算和他们和平交流。<br><br>安洁丽娜将腰间的布袋解开，从里面取出一粒绿色的圆豆向地面扔去，那像树苗一样的圆豆在接触到地面后立刻膨胀，逐渐成长为一个树状的魔物。在它树冠处垂下数不清的藤条，树干中央裂开两道口子，形成了一双红色眼睛。<br><br>“撒豆成兵？”伊格诺斯不可思议地盯着刚刚掘地而起的树精，他庆幸对方不是直接将树转化为树精，否则在这大森林里就难以应付了。<br><br>树精挥舞着藤鞭向他们抽来，新田躲过了这招，翻滚到一旁，对伊格诺斯说:“咱们不知道她还有没有帮手，况且在森林里和精灵起冲突是最不理智的行为，先撤吧。”新田冷静地分析形势，她先是护住了晕倒在地上的爱萝依，然后急忙远离树精的攻击范围。<br><br>“好，我打掩护，你带着爱萝依继续往北方走。”伊格诺斯替新田挡下了树精的藤鞭，转身对她说道。<br><br>“你多保重，我们异界之门再会。”新田经历了片刻的犹豫后，向伊格诺斯点头示意，然后抱起了昏迷的爱萝依，钻进了丛林中。<br><br>伊格诺斯在新田离开后，转过身来，略带嘲笑地看了一眼面前的树精。他眼中闪过一道流光，一个幻化闪烁的水晶在他的手心凝结。<br><br>“终于打算还击了吗？”安洁丽娜冷哼一声，仿佛并不在意逃走的新田她们，搭起弓箭直接瞄准了伊格诺斯。<br><br>“来而不往非礼也，就算是脾气再好的人受到这种无由头的攻击也都会还手的吧。”<br><br>时空之核散发出五彩斑斓的虹光，伊格诺斯冷冷地看着安洁丽娜，后者居然从心底里感到一丝恐惧，但她还是握紧了弓箭。<br><br>“绝对……绝对不会让你们这些侵略者得逞。”',
    sksn_ferwork:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#EFF>凝霜之眸</font><br>姓名：菲儿沃克<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：辅助型，控制<br><br><li>【背景故事】<br>海都，在东港城的街头漫步，你会碰到形形色色的异乡人，他们有些是来此地做生意的商人，有些是奔走各地的冒险者，还有些则是在阴暗处不怀好意者，蛀蚀着城市的根基……<br><br>东港城治安一直都是让海都头疼的大问题，城区大，各个街道错综复杂，以及帮派林立，港口停泊着成百上千艘的船，人员流动频繁，发生了事情也很难去追查，再加上执法官唐宁的“自我调节”政策，让这座繁华的城市蒙上了一丝阴霾。<br><br>“小妮子，从帝都来的？”一帮地痞无赖堵在了一个狭小过道的两侧，中间则是一个吉普赛女郎打扮般的女孩，这帮人嘴里不时冒出些污言秽语，让人听了直作呕。<br><br>一个虎背熊腰的大汉走上前，直接长满了老茧的粗手抬起女孩的下巴，语言轻佻道:“哟，这等姿色的美人，怎么只有一个人出来啊？要不要跟大爷我做个伴。”<br><br>“请不要这样……”女孩看上去有些害怕，但却没有丝毫慌张。<br><br>“为什么不要呢？你看我有这么多弟兄，你不跟我的话我只能把你交给他们了。”<br><br>旁边那些贼眉鼠眼之辈不断起哄，有的已经想上前扒掉女孩的衣服，但碍于老大的面子迟迟没有动手，但那双贪婪的目光令菲儿感到非常恶心。<br><br>“别这样……我不想和你们有冲突。”菲儿再次请求。<br><br>菲儿漂亮的海蓝色瞳孔闪着迷茫，修长的睫毛都有些颤抖...她不断恳求着。但这却只会增加这些精虫上脑的人渣们的欲望，那大汉扯住了菲儿的身子，然后暴力地撕开了她的上衣，洁白的香肩外露，菲儿没想到他们居然如此放肆，她眼中泛出星星泪花，楚楚可怜。<br><br>“喂，光天化日之下，能不能别搞这些伤风败俗之事。”一道嘲讽的声音给大汉发热的脑袋浇了盆冷水，他停了下来，然后回头想看看是哪个不长眼的混蛋坏他好事。只见伊格诺斯打着哈欠，在不远处朝大汉喊话，爱萝依紧紧跟在他身后，对他们露出了极度厌恶的表情。<br><br>“你又是哪来的小子，我……”<br><br>没等他按照规矩介绍完自己，伊格诺斯一个瞬身直接出拳招呼了上来，那大汉没反应过来，直接被打了个措手不及。他缓过神来大骂，然后出拳向伊格诺斯反击。<br><br>伊格诺斯侧过身躲过拳头，然后又给了那大汉一计鞭腿，后者直接就被踢飞出好几米，咣当一声横倒在地上。他艰难地起身，想叫小弟们一起上把这小子揍一顿，但突然看到了爱萝依背后有个鬼魅的身影不断冲他笑，那个单手持着镰刀的骷髅直接把他吓的两眼翻白，不省人事。<br><br>爱萝依收回了虚影，上前将菲儿护到自己身后。<br><br>“带着你们的头头，滚！”伊格诺斯释放出异能威压，强大的压迫感瞬间占据了混混们的大脑。在那些惊恐的流氓们抬着他们晕厥的大哥抱头鼠窜后，伊格诺斯蹲下身子看着菲儿，女孩那宛若天仙般绝美无暇的脸庞，雪白脸颊上的几缕冰蓝色发丝增添美感的同时吸引人的注意力，又不喧宾夺主，就像是从北境诞生的冰雪精灵一样圣洁美丽，让人有着爱惜和保护的欲望。<br><br>但与此不符的是她手上正凝结出一层一层淡蓝色冰晶，伊格诺斯从上面觉察到了极度的危险和震撼。<br><br>“异能……刚刚你自己完全就可以对付他们，为什么不反抗呢？”<br><br>“如果我用了这份力量……他们会死的……”菲儿低下了头，冰晶刹那间就溶解了，她双手抱住了自己的身体，唯唯诺诺的像是一个犯了错的孩子。<br><br>爱萝依见此，抬起右腿轻轻踹了伊格诺斯一脚，她气愤地将伊格诺斯推到一边，从背包里取出一件风衣，披到了菲儿的身上，然后安慰道:<br><br>“姐姐别怕，现在没事了，爱萝依会保护你的。”<br><br>伊格诺斯不解地看着爱萝依，脸上直冒问号，但他猛地想到，帝都人是不待见异能者的，教会认为如果力量不来自信仰圣光，那便是对神灵的亵渎。就跟爱萝依一样，被发现了很有可能被当成魔女处置，于是他们这些异类拼命隐藏自己的力量，像平常人一样生活，但在那个环境下却时刻都得提心吊胆，以至于大部分异能者都积压出各种各样的心病……<br><br>或许是同命相怜，爱萝依对这个陌生少女有天生的好感，她抱住了菲儿，像只小猫一样亲昵地蹭来蹭去，她的天蓝色头发柔顺而丝滑，肌肤水润而富有弹性，整个身体冰冰凉凉的，抱起来十分舒服。<br><br>“那……那个……能先放开我吗？太……太紧了……”菲儿小声地请求道，爱萝依看到她眼中带泪的可怜样子，好像自己做了什么十恶不赦的坏事，突然一股浓郁的负罪感从心底涌上来。<br><br>伊格诺斯无奈帝捂着额头，将爱萝依提溜起来，他伸出手将菲儿从地上拉了起来。<br><br>“你没事就行，我们还有事要做，现在也该走了，请多多保重。”伊格诺斯拽起爱萝依，不管她的挣扎。<br><br>“那个……谢谢。”少女神情委婉，鼓起小嘴，双手扭捏的说道。<br><br>“没什么。”伊格诺斯的笑容像是冬日的太阳。<br><br>——————<br><br>“这就是司吉家？”伊格诺斯朝着一所中式院子问道。<br><br>“嗯，听说这两天他不接见任何人，把自己龟缩在这个地方不知道在搞些什么。”新田走到大门前，敲了敲门。<br><br>他们现在已经到了司吉府前，伊格诺斯仔细观察这座具有东式风格的建筑，他对在海都这个到处是机械和钢铁的城市中居然还有如此复古的院落感到非常震惊，而新田正盘算着怎么从这个老神棍嘴里挖出点东西。<br><br>“司吉……听说他几个月前刚被海都的国王册封为国师。你是怎么把他给请出来的？”<br><br>“我答应把东方弘道异能炮给他，当然，只是个壳子。”新田毫不在意地回应道，她静静等着，仿佛知道门一定会开一样。<br><br>伊格诺斯久不见动静，有些焦躁地来回踱步，正当他想接着问时，门突然开了。<br><br>扫堂风卷起了地上的海棠花瓣，在空中曼舞，那瑰红色的花瓣就像是刚刚破蛹而出的蝴蝶一样，有着几分灵性，在打开的门后悄悄探出了一个人的脑袋，看着像是个普通的仆役。<br><br>“二位贵客请进，国师大人已经等候多时了。”看门小僮向他们拱手作揖道。<br><br>伊格诺斯和新田彼此眼神交流后，便跟着他进了院子，小僮在他们刚一进门，便将大门紧闭，然后拾起地上的一根扫帚，一言不发，自顾自地扫着地上的花瓣和落叶。<br><br>满园海棠不负春光，悄然绽放，花朵随风摇曳，红的像火，粉的像霞，白的像雪，构成一幅色彩浓郁的美丽画卷。淡淡花香扑鼻而来，令人沉醉。<br><br>“真美啊……”新田情不自禁感慨道。<br><br>“您说的对……可惜整个海都也没有几个人能欣赏这份美。”<br><br>一道深沉的声音打破了满园诗意，司吉依旧披着他那老旧的连帽红袍，宽大的帽沿遮住了他大半个脸庞，他悄无声息地在海棠花丛后走出来，朝着新田布止说道。<br><br>“你就是国师司吉？”伊格诺斯审视着面前的男人，他隐隐约约有种不安，这个号称为海都最神秘的人，身上的秘密恐怕比这满园海棠加起来还多。<br><br>“如假包换，先生。”司吉回应道，他微微挥手，招呼他们在院子里的一座凉亭处落座。<br><br>新田布止开门见山，她将一个紧闭的木箱子从收纳空间里取出，撂到亭中的石桌上。司吉眼中带有喜色，他迫切地想伸手打开箱子，但却被新田直接打断。<br><br>“别着急啊，国师，我已经把东西带来了，也让我们看看你的诚意吧。”<br><br>新田将手死死地按在箱子上，盯着已经将手抬在半空的司吉，司吉尴尬地将手收了回来，他也不生气，慢吞吞地说道。<br><br>“我这里没什么规矩，有什么想知道的，尽管问。”司吉回给她一个鬼魅的笑容。<br><br>“这东西你知道怎么用吗？”新田抬起手来，一块淡蓝色的瑰丽水晶出现在她的手心里，司吉漫不经心扫了一眼，有条不紊解释道:<br><br>“时空碎片吗？这东西可不常见啊，作为一把能连通两个世界的钥匙，若想让它发挥作用，就需要找到能使用它的大门。”<br><br>“那么这扇大门在哪里，又有什么用。”伊格诺斯抢先一步问道。<br><br>“异界之门是神明为了更好联通异世界，所设立的一个可以撕裂空间的通路，门后的世界是什么样的，我就不清楚了。因为这些秘密没有多少人知道，也没有多少人能得到这把钥匙。”<br><br>司吉将目光从时空碎片移到新田身上，他仿佛根本就不在意这件宝物，然后接着说道:<br><br>“距离海都最近的异界之门，则是位于禁锢森林的边缘的一处无名山谷中，那里现在是无人区，以前曾有过冒险者前去寻宝，但能活着回来，或者得到什么宝贝的寥寥无几。”<br><br>司吉觉得已经透露的差不多了，便站起身，趁着新田不注意，一把将木箱子收入囊中，对着已经打扫完院子的仆僮使了个眼色。<br><br>“如果你们想知道这东西具体有什么作用，最好去那里看看。好了，我还有些别的事，你们也是时候该回去了。”<br><br>伊格诺斯和新田布止还在思索，便被仆僮打断，催促着离开了司吉的府邸。看着紧闭的大门，伊格诺斯怒气冲冲地切了一声，骂道:“这老神棍神气什么，有这么赶人的吗？”<br><br>“他的话，哼，七分假三分真，不过不管哪句是真哪句是假，如果东方送来时空碎片的意思是要我利用它做些什么，那么这异界之门我看是非去不可了。”<br><br>新田冷哼一声，她倒是不着急，想从司吉这个老狐狸嘴里套点东西简直比登天还难，眼下最重要的就是这异界之门的情况，既然时空碎片和异界之门有联系，那么如果能找到异界之门的话，就可能找到其他线索，接此了解到袭击世纪高塔的幕后黑手到底想做什么。<br><br>送走了新田他们后，司吉长舒一口气，然后抱着木箱子癫狂地发笑，嘴里还时不时嘟囔着好宝贝之类的词语。而在他背后，一个淡蓝色头发，冷若冰霜的女孩默默从花丛中走出。<br><br>“都听到了吧，你要找的“钥匙”可就在他们身上。”司吉忽的镇定下来，冷言道。<br><br>菲儿神情复杂，她不敢想象在此地居然会碰到伊格诺斯。早些时候，司吉就告诉她自己会给她带来两个棋子，供他的主人能够完成自己的计划，但菲儿没能想到，这两个棋子居然有一位已与她相识。<br><br>可他不是坏人，也曾帮过自己……<br><br>菲儿不知道该如何去做，如果她按照和司吉预先确定的原计划执行，那么这两个棋子都会成为主人回归的祭品。<br><br>“唉，有些事我本不该过问，但你身上可肩负着你主人的期望，切莫为了什么小恩小惠而坏了大事。”司吉看出了她的小心思，面无表情地提醒道。<br><br>“我知道……”菲儿表面应了一句，但全然没有听进去司吉的话。<br><br>“太过于怜悯，反而会让你失去一切，我之前就是因为这样才……呵呵，不说了，你也该出发了。”司吉见此则是品了最后一口花茶，他也不想和菲儿交流过多，直接摆手送客。<br><br>“感谢国师大人的帮助，事成之后，主人答应您的东西，菲儿会悉数奉上。”菲儿回过劲后先是拜谢司吉，然后急匆匆地离开了司吉的府邸。<br><br>“呵，小丫头……这世上那有这么容易的事，人越是想得到更多，越是要舍弃更多，到最后才发现，他们所拥有的已经化作了泡影，他们追逐的不过是一片虚无。”<br><br>司吉感慨道，他扣上茶杯，环视着这满园随风飘散的花瓣，这盘足以改变世界局势的棋局他已经早已经布置好，而有些棋子，一开始就是要被舍弃的。<br><br>“经年的夙愿就快要实现……只可惜，你不能和我一同见证这一切了……”<br><br>不堪重对故园愁，海棠依旧满枝头。<br><br>司吉左手按着木箱，另一只手向前伸出，捻住一朵飘落的花瓣，谁也不曾想到，如同冰川一般冷漠的司吉眼中也会充满着思念和忧伤。',
    sksn_luoyiao:'<li>【基础信息】<br>角色设计：寰宇星城<br>故事：爪巴<br>称号：<font color=grey>承道之志</font><br>姓名：罗意奥<br><br><li>【能力数据】<br>身份定位：内奸<br>能力定位：专业型，控顶控底，爆发<br><br><li>【背景故事】<br>“罗意奥，你怎能背叛学院长？”<br><br>“你个叛徒，奥丁老师对你这么好，你却害死了他。”<br><br>“背弃恩师，助纣为虐，从此以后，你就是凯洛亚学院的敌人。”<br><br>罗意奥从噩梦中惊醒，最近他太过疲惫，以至于在整理资料的时候就趴在桌子上睡了过去。他看着桌上的各种报道和资料，心绪杂乱。<br><br>教会害死了他的恩师奥丁格兰，但他却为了能从塞谬尔手中救出那些被收缴的手稿，甘愿当一名“背叛者”去给教会那帮人当牛做马。<br><br>教会对他的投诚是无比欢迎的，凯洛亚学院的学生会长，奥丁格兰的大弟子都拥抱圣光了，这对那些顽固的学生，对异端分子们无疑是一个巨大的打击。<br><br>然而，对于罗意奥来说，他所付出的代价还有风险都是巨大的，被曾经的导师误解，被昔日的同学唾骂，被帝都市民讥讽……但相比他刚刚完成的工作，这一切又都是值得的。他冒着生命危险，将这些被收缴的奥丁遗留下来的手稿偷偷收集起来，然后秘密送往学院。奥丁格兰的思想不能断，他没有办法救下奥丁，只能尽力弥补，他认为这是他现在唯一能做到的，纵然在别人眼中，他是在与仇人同流合污。<br><br>罗意奥将最后一份材料放进了牛皮袋里，这些就是整理出来的最后的资料了，今晚趁着天黑把它们送到学院后，自己就将再无顾虑……<br><br>罗意奥如释重负地笑了，现在他已经做好了在潜伏中和教会死磕到底的觉悟……<br><br>凯洛亚学院，帝都文化和学术的中心。据说他的建立者该隐•凯洛亚曾游历世界，回国后他将自己感悟向帝都城中的人们宣讲，感染了当时帝都城里的一位大贵族，那位崇敬知识的贵族出钱出地，以凯洛亚的名义修建了一所供各地的学者互相交流见解和辩论的场地，这便是凯洛亚学院的前身。在凯洛亚逝去后，他的得意门徒们便在此设科教学，凯洛亚学院于是逐渐成为西大陆学术和艺术的中心，不断向外输出优秀人才。<br><br>可在凯洛亚死后，教会便对这个宣扬进步思想的学院百般刁难，以至今日奥丁格兰被以蛊惑人心罪处死……<br><br>罗意奥像往常一样翻过了围墙，将那撑的鼓鼓的牛皮袋放在尤里维斯的实验室旁后，便急匆匆地准备再翻越回去。<br><br>“谁在那里，站住！”一个他非常熟悉的声音传来，罗意奥紧张的不行，他最怕见到的人，就这么出现在了他的身后。<br><br>尤里维斯……奥丁格兰的挚友，也是着重培养了自己的导师，而现在他估计已经将自己当作出卖恩师的叛徒。<br><br>“菲尔可•罗意奥，你是连正门都不敢走了吗？”尤里维斯皱着眉头看着他，但他好像也并不意外。他在看到了地上放着的皮袋时，心里已经有了个大概。<br><br>“尤里维斯老师……”罗意奥不敢直言，因为在凯洛亚学院师生眼中，自己的形象已经成为了和教会狼狈为奸的叛徒。但出乎他的意料，尤里维斯的话里没有任何愤怒的情绪。<br><br>“之前的那些手稿，都是你送的吧。我还以为你是真的脑袋抽筋着了教会的魔了。让我想想，这应该是叫卧底还是间谍……”尤里维斯看着罗意奥，后者也一动不动地看着他，突然，他们心照不宣地同时笑了起来。之前所积累的一切误会好像在此刻都被解开了。<br><br>“也是啊，我早该想到的，从奥丁牺牲后的第二天，就一直有人向我递送那些被教会收缴的笔记和手稿，我想也只有一个人能做到。但是……菲尔可•罗意奥，你在凯洛亚学院这三年就学会了个无间道吗？”<br><br>“不是的，尤里维斯老师，这些都是奥丁学院长的心血，我不能看着它们就这么被教会那帮混蛋销毁。”罗意奥急忙解释道。<br><br>“够了！你根本就不懂奥丁格兰……”尤里维斯打断了他。<br><br>“对他来说，这些破纸一文不值，他真正在乎的是你们，而不是这些冷冰冰的文字。你们这些学生才是他思想的延续，只有你们活着，才能将他的学说传承下去，而你却舍本逐末，将自己处于危险之地，你不觉得自己违背了他的初衷了吗？”尤里维斯严肃地说道。<br><br>“您教训的是。”罗意奥低头认错，但他却丝毫没有动摇的意思。<br><br>“回来吧，罗意奥，你已经做的很好了，再在那个地方呆着也没有任何作用。你的事情我会去和同学们解释，他们会理解你的。”尤里维斯见此，劝他道。<br><br>“不，尤里维斯老师……我现在还不能回来，我得等一个机会，学院长不能就这么被他们给害死，必须得有人付出代价……”罗意奥额头青筋暴露，他紧握拳头，咬牙说道。他当然知道自己将会面对什么，但他不能看着自己恩师就这么含恨而终……<br><br>“唉，孩子，奥丁已经走了，想扳倒教会也不是一朝一夕的事，你想过没有？在这期间你会被你曾经的朋友和同学唾弃，被他们当成叛徒咒骂，在教会也没有人会看的起一个‘卖主求荣’的投降者，这种环境会把你压垮的……”尤里维斯担忧地叹息道。<br><br>“或许吧，但被误解总比面对仇人时无能为力要强……”<br><br>罗意奥只能苦笑，事实上同学们骂自己骂的越厉害，教会也就越会相信自己，毕竟他们会认为自己已经在学院臭了，只能依附于教会。<br><br>“既然如此……那我也不多说什么了……”<br><br>尤里维斯知道自己已经无法再劝住他了，菲尔可•罗意奥和他的恩师奥丁格兰一样，都是些无可救药的死脑筋。<br><br>“那学生就先回去了，免得被他们觉察到什么，估计这是我最后一次回来了，老师您以后还请多多保重。”罗意奥说罢，深鞠一躬后便转身离开。<br><br>“等等。”尤里维斯叫住了罗意奥，后者回过头来，尤里维斯满脸骄傲地看着他。<br><br>“奥丁格兰有一句话没能告诉你，但我希望你能时刻记住:正义只在刀锋之上。”尤里维斯最后说道。<br><br>强权面前无正义，你必须先使自己强大起来，在此之前，任何设想都是奢望。<br><br>罗意奥领悟到了这句话的意思，他点了点头，然后翻过了学院的围墙，消失在夜幕中……<br><br>尤里维斯望着学生远去的背影，仿佛想起了故乡历史上中世纪那一个个为了真理奋斗的人们，他们同样面临着教会的打压，他们同样在真理和性命面前被迫抉择，但他们同奥丁，同他的后辈们一样毫不畏惧牺牲。<br><br>自打来到这个世界后，他就深切地感受到在这个异界的土地之上，亦存在着比圣光更加伟大的信仰，比神明更加强大的力量。<br><br>正如该隐•凯洛亚死后，继承了他的意志之人在帝都兴建学院宣扬他的思想一样，总有一天，也会有继承奥丁格兰意志的人出现。<br><br>粉饰成光明的夜幕中总会诞生出驱逐黑暗的星芒，即使血脉已经断绝，承蒙他们庇佑的人们同样会得到星空的指引，一代代的将光明传递下去。当黑暗再次席卷这片大地，他们将会以各种方式散发自己的光，到时的世界，将为之倾覆。<br><br>星光不灭，真理永存！',
    sksn_tangning:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#7D7DFF>执法者</font><br>姓名：唐宁<br><br><li>【能力数据】<br>身份定位：忠臣<br>能力定位：辅助型，保护（比较硬核）<br><br><li>【背景故事】<br>“大人，您已经在这儿坐了快两个小时了……”摩根看了看挂钟，向面前正在品着红茶的唐宁说道。<br><br>“怎么，想赶我走了？”唐宁仍然是没有动作。<br><br>“不是不是，只是大人您到小人这儿来，既不是叙旧，也不是不谈生意，小人实在是不知道……”<br><br>“我说你怎么脑子里只惦记着钱？”唐宁不耐烦地讽刺道。<br><br>“生意人嘛，职业习惯……”摩根尴尬地笑着说。<br><br>唐宁脸色一沉，眼神尖锐瞪着摩根，他搓了搓手，问道:“行，我就直说了。有人告诉我，东方弘道曾在你这里寄存了一个东西，我想知道那是什么东西，现在又到了谁的手里？”<br><br>“您从哪听的那些谣言啊，他哪有什么东西存我这儿，大人，就算是真的有，我不能平白无故的就把客人的隐私告诉别人吧，这不合做生意的规矩啊。”<br><br>唐宁冷冷笑着，如同一只盯上了猎物的狮子，他知道像摩根一样靠摸爬滚打一路上位的商业资本家都是些连节操都能卖的玩意，他不和你进行交易的唯一原因就是你给的不够多，但他唐宁是那种规规矩矩拿钱换情报的主吗？<br><br>“知道吗？摩根先生，这些年你在暗地里干的事已经够让你在东港城边上吊个几百年路灯了。如果你不想让这本账册出现在克莱门汀陛下的桌子上，那么最好别给我整这些虚的玩意。”唐宁见他三缄其口，便直接掏出一本账册甩到了桌子上威胁道。<br><br>摩根刚看到自己的账本时，不禁大吃一惊，但他赶忙恢复到镇定的神态，却被唐宁看得一清二楚。<br><br>“这……大人，我平常也就搞一些买卖特产啊，您要是拿这个威胁我，未免也太……”<br><br>唐宁不想听他解释，他两根手指不耐烦地敲着桌子，咚咚哒哒的声音令摩根心里发怵。<br><br>“摩根先生，你也知道，咱们这边新继位的国王陛下可是对投机倒把的行为深恶痛绝，如果他看到了在自己家门口居然有人能绕过王室垄断东港城的交易，你说他会怎么办？”<br><br>唐宁说罢，盯着故作镇静的摩根。<br><br>“现在你还有机会，摩根，我又不是什么贩卖情报的商人，跟我说什么都是不会影响到你在海都的生意，但现在纠察队就在外面等着，你是想要跟我交代呢，还是想跟他们交代？”<br><br>摩根不禁吞了口水，他战战兢兢地走到展示柜旁，将一个装饰精美的盒子取下，双手哆嗦的呈给了唐宁。后者也没见外，直接接过来打开一瞧，一枚墨绿色的珍珠在阴暗处散发着幽幽荧光。<br><br>“大人，这是我早些年从海外淘来的夜明珠，现在小人家里也装上了照明的萤石灯，这个放我这里也没有什么用处，如果大人喜欢的话……”摩根小心翼翼地说道，生怕惹火了他。<br><br>“唉？我怎么能拿你的东西呢？不妥不妥。”唐宁摆手推脱道。<br><br>“没有什么不妥的，大人，您就先收下吧。只是我们做这一行的，必须得为客人保密，这点还请您也谅解一下。”说罢，他又给唐宁塞了一张纸条，唐宁看了看上面的字，思考片刻后呵呵一笑。<br><br>“那么，咱就不打扰您做生意了……今天就当我没来过这儿，哈哈。”唐宁冷笑道，他把账册扔给了摩根后起身伸了个懒腰，便向外面走去。<br><br>“是是是，您请。”摩根急忙躬身为唐宁拉开了门帘，虽然他身体肥胖臃肿，但还是弯成了一个拱形。<br><br>唐宁在捞到好处后便心满意足地离开了，摩根不禁冷汗直流，世人都说唐宁属于那种酒囊饭袋吃空饷的货色，可今日一见，让他倍感压力，今天虽然只送出去一颗夜明珠，但若是他继续敲诈勒索下去，那还了得。<br><br>这海都怕是呆不下去了。摩根心想，他真是后悔啊，当时就不该贪财，结果信那小子的邪，给他保管什么异能炮，这下好了，引火上身。<br><br>在唐宁从摩根的会馆出来后，唐宁的副官就立刻迎了上去，急切的问道:“大人，他交代了吗？”<br><br>唐宁把纸条拆开给了副官，后者看完后便说道:“我这就去调动港防军实施抓捕。”<br><br>“哎哎哎，回来，着什么急啊，你就给我死死盯住这张纸上的地址，别打草惊蛇。”<br><br>“可陛下不是说……”<br><br>“嘘，你跟我没多久，所以有些情况你还不懂。你想想，这东方弘道可是陛下所赏识的人才，全海都都知道，可就是这么一个红人，却在他眼皮子底下被人给暗杀了，你说谁有这个能耐？这其中又都牵扯到了什么人？又有几个是明面上的大人物？你当然可以把他们全部都抓起来，但之后呢？这些空出来的位置留给谁，你这一抓让他们个个提心吊胆，谁又能在你说话的时候站出来反对你……陛下最怕的，不是手下的人所做的那些小动作，而是权力的失衡啊。”<br><br>唐宁见副官似懂非懂，一把将他揽了过来，然后将刚刚从摩根那里敲诈来的夜明珠交给了他。<br><br>“你去找个地方把这东西出手了，换来的钱都分给兄弟们，这两天事情多可能会有点累，让他们都打起点精神。”<br><br>副官接过了夜明珠，感激道:“谢大人，我等定尽心尽力，不负大人所托。”<br><br>忠臣的游戏，自打他进到海都政治的核心时就已经结束了，年轻时他也是一腔热血，可他得到了什么？同僚的倾轧，国王的怀疑，亲人的不理解，他越是为上面着想，越是累的半死不活。于是他转变了，他开始和那些自己曾厌恶的家伙们狼狈为奸，发展自己的势力，搭建自己的关系网。渐渐的一切都改变了，那些曾瞧不起他的人排着队登门拜访，那些对他有所怀疑的上司也逐渐给他一些权力，只是因为他懂人情世故……<br><br>唐宁耸了耸肩，打了个哈欠，海都风风雨雨几十年，他就靠这一手平衡术而立于不败之地，即使现在被司吉或是凯恩压了一头也不会对他有什么影响。他的根基就是这东港城，每天打卡上班，捞捞油水，只要他不站在权力的风口浪尖，避其锋芒，那么就算是克莱门汀也拿他没辙。<br><br>唐宁可不管这高塔事件是谁搞出的阴谋，又带来了什么影响，只要他手中牢牢握着相关者的把柄，那么在东港城，他便是不可撼动的存在。<br><br>“还有，你秘密安排些人过去给司吉找点麻烦，我就不信他是真的在家里没事干，整天种些破花消遣。”<br><br>现在是时候敲打敲打那些他平常就看不顺眼的家伙们了……',
    sksn_mogen:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#949449>海都商人</font><br>姓名：亨利·摩根<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：专业型，过牌<br><br><li>【背景故事】<br>海之都，一座已经半步跨入近代化的城市，是从西部森林冒险而归的旅行者们最向往的港湾。伊格诺斯同样也不例外，自从出了帝都后，能再次见到这等发达的城市也是足以令他感到惊讶的，不过他可不是来旅游的，那个神秘的女孩帮他在海都约了一个大人物，而且这个大人物很有可能知道他想找的东西在哪里。<br><br>“喂，你到底要去跟谁见面啊！都走了半天了”爱萝依抱着个加大号的沙丁鱼抱枕，不满地朝伊格诺斯嘟囔道。谁知道这家伙瞒着她偷偷跑出来想干什么。<br><br>“我的大小姐，我是有正事要去做，你跟着我又玩不了，自己乖乖在旅馆呆着不好吗？”伊格诺斯拿这个古灵精怪的小鬼没有一点办法，明明自己已经躲着她出门了，但她却还是趁自己不注意跟了上来。<br><br>爱萝依掐着腰，做出一副大人教训小孩般的样子，指着伊格诺斯说道:“你这么不想带着我，是不是想要去外面找那些坏女人。”<br><br>？？？<br><br>伊格诺斯满脸问号，这小丫头脑袋里都装了些啥，帝都小孩都这么早熟的吗？麻烦啊，早知道就在来海都的路上把她丢森林里喂狼了。<br><br>当然，这也只是说说而已，伊格诺斯没有什么哄小孩的能力，他也不想费口舌解释自己是真的有要事，如果爱萝依不信，那便让她跟着呗。<br><br>“行了，我带你去还不行，只是到了地方后别乱说话，这次是真的有要事。”<br><br>见伊格诺斯妥协了，爱萝依便吐着舌头摆出一个鬼脸。<br><br>“知道啦～”<br><br>伊格诺斯要前往的地方是一个高档酒馆，刚一进门他们就看见了在一处靠窗的角落，一位矮矮胖胖，穿着华丽，嘴里还叼着一根烟卷的白发长者正冲着他们微笑。伊格诺斯根据他的行头判断这就是他所邀约的海都商人——亨利•摩根，于是便牵着爱萝依向他走过去。<br><br>“喂，这个人看起来不像是个好人啊。”爱萝依扯住伊格诺斯的袖子说道。<br><br>“他是不是好人不重要，只要他知道我想要的东西在哪里，就是阎罗恶鬼，我也得见他一面。”<br><br>伊格诺斯不顾爱萝依的阻拦，直接在摩根面前的空位坐下。他一边打量着这个油滑的胖商人，一边开门见山地道明自己的来历:<br><br>“先生，让您久等了，我叫伊格诺斯，是一位旅行者。有位朋友告诉我，说摩根先生作为海都的商界大鳄，见多识广，凡事奇珍异宝就没有他不知道的东西，所以我借他之手约您出来，是想打听一个东西的位置。”<br><br>说罢，他便将一张画纸按在桌子上，摩根结果后，看了一眼上面画着的东西。<br><br>“这个东西……”摩根眼神闪过一丝惊讶，但很快就被他巧妙的掩饰过去。他看了看伊格诺斯，发现对方并没有在意他的片刻迟疑。所以他站起来身来，把窗帘拉下，然后从自己的怀里取出一张古朴的羊皮卷。<br><br>“咦，好破啊。”爱萝依嫌弃地说道。但伊格诺斯立刻给了她一个脑瓜崩，爱萝依吃痛，正想开口骂他，结果抬头就看见了一脸严肃的伊格诺斯，于是便扭过头，两个腮帮鼓鼓的直生闷气。<br><br>“它所在的位置就在这张地图上，这地图对我来说并没有什么大用，给你也不是不可以。”摩根见状也是呵呵一笑，不在意这些细枝末节。<br><br>“您真爽快，那么我要支付的金额是多少呢？”<br><br>“啊？别一见面就谈钱嘛，年轻人。这玩意可不是一般的东西，仅仅靠钱可是买不到的。不过，我这里倒是有一份简单的工作，如果你能先帮我做完这份工作的话，我就把它交给你。如何？这可是一场共赢的交易。”摩根饶有兴趣地看着一脸严肃的伊格诺斯，笑眯眯地回答道。<br><br>——————<br><br>“所以……你所说的“工作”到底是什么？”伊格诺斯皱着眉头，这一路下来令感到十分心累。摩根在带他们前往所谓的“工作地”的路途中给他们讲了半天的海都风景名胜地产珍奇，但就是不告诉伊格诺斯他想让自己做什么，问他又硬生生地转移话题，简直是个现实版的谜语人。不过爱萝依对这老头的故事到显得十分感兴趣，一路上问这问那，搞的伊格诺斯很是头疼，而现在他们终于到达了目的地。<br><br>他们在一处别墅前停下了脚步，摩根将别墅旁的一所仓库的大门打开，然后转过身来狡黠地一笑，他点燃了一根香烟，然后用手杖指了指自己背后的一辆马车上用麻布盖着的巨型木箱。箱子看着十分破旧，就像刚刚从旧物市场里掏到的老古董一样。<br><br>“这份工作其实也没什么难的，就是最近我这里人手不够，想让你帮我送一下这个东西罢了。”摩根将一张信纸交给伊格诺斯，上面仅仅写着一行地址。<br><br>“运货这种事，你随便找个人就能干，为什么非得要我一个刚刚来海都的外地人做呢？”伊格诺斯疑惑地看着摩根身后的那箱“货物”，他总感觉这个小老头没打什么好算盘。<br><br>“呵呵呵，你是聪明人，你该知道有些事是不能讲透的，我可以告诉你的是这里面的“货物”绝对不是什么伤天害理的东西，只是有些拿不上台面罢了。”摩根摆出一副认真的姿态一字一句地说道。<br><br>伊格诺斯思虑再三，最终决定还是先答应他的条件，如果真是什么见不得光的东西，那他也不会让自己一个外人来送。不管这货物有什么特殊的地方，他已经打算好了，一但觉察到任何危险，那他便立刻放弃，直接带爱萝依离开。<br><br>“行，那我们说好了，我把东西送到后，你把地图交给我。”<br><br>摩根听到伊格诺斯的回应后嘿嘿一笑，他爽快地拍着自己的胸脯保证道：“那是自然，干我们这行就讲一个“信”字。”<br><br>伊格诺斯不想再看他那见利眼开的嘴脸，他摇了摇头，将马车上的货箱用麻布盖上，然后跃上马车，在没有其他人注意的情况下驶出了摩根的府邸。<br><br>看着远去的马车，摩根如释重负地呼出一口气。但他没想到的是，一直跟着伊格诺斯的爱萝依却没有随前者离开，反而在原地一直盯着他。<br><br>“箱子里有什么？”爱萝依面无表情地问道。<br><br>摩根突然从她身上感受到一股轻微的压力。但他却仍然在女孩面前保持笑容，毫不显露出自己的惊奇。<br><br>“就只是一些工具罢了，放心吧美丽的小姐，我还打算和他长期合作，不会让他有事的。哦，我这里还有些别的事，就先失陪了。”<br><br>摩根在连哄带骗的支开了爱萝依后，松了一口气，然后打开了自家别墅的大门，他的房间很朴素整洁，装修也是简约大方，木制的家具上一尘不染，墙壁上的挂画，窗台上的摆件都突显着房间主人的品味。<br><br>桌子物件寥寥无几，仅有几本账册，还有一张报纸，正面刊载的是世纪高塔坍塌的新闻。但摩根却并没有看一眼，他反而走向窗台，将在窗户上悬挂的鸟笼取下，仔细翻找后才发现里面塞有一封很小很小的信件。<br><br>在阅读了这封信后，摩根脸色沉重地瘫坐在他的真皮椅子上，烟草中尼古丁的镇静效果令他不至于过于愤怒。<br><br>信件的内容大致是，海上航线已经断了，地下世界正在通缉鬼厌这个罪魁祸首，在地下世界重组之前，摩根在阿弗斯赫特的交易恐怕是要泡汤了。<br><br>“鬼厌……”摩根思来想去，也不明白这个带来混乱的男人想做什么。<br><br>利益即是一切行动的根源，这是他作为一个商人所信奉的准则，但点燃阿弗斯赫特战火的鬼厌的目的究竟是什么？名誉，权力，金钱……不，通通不是，他仅仅是将阿港搞乱后便销声匿迹，仿佛只是和所有人开了个玩笑，但这个致命玩笑的代价是巨大的，不论是各个国家还是地下世界，都因这场剧变而发生或多或少的动荡，而始作俑者直到现在依旧无声无息，不知道又在酝酿什么惊世阴谋。<br><br>摩根敏锐的直觉令他现在不敢轻易做什么决断，作为商人，他对风险有异常的敏感，这段时间令他感到意外的事实在是太多了。地下世界里呼风唤雨的乌拉姆居然被暴民用鱼叉给捅死，简直是匪夷所思。新继位的这个海都国王他还没有拜访过，亦不知道他的脾性和手段如何。<br><br>还真是活的久见识的就多啊，之前所用的那些残酷手段，看来还得再拾起来啊……<br><br>然而现在摩根只能收紧羽翼，先把自己从海都政商界那错综复杂的关系中解脱出来，以图在即将到来的大变革中尽量自保。<br><br>“哼，东方小子，这是我和你进行的最后一场交易了，以后你是死是活，跟我一点关系也没有……”<br><br>他的眼神突然狠毒起来，仿佛是一条伺机而动的毒蛇。亨利•摩根成为富甲一方的商界大鳄的道路上，究竟还倒下了多少同他一样的人，这在海都已经没有几个活人知道了……',
    sksn_gaozesi:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#5151A2>千面妖魔</font><br>姓名：高泽斯·拜蒙<br><br><li>【能力数据】<br>身份定位：主公，忠臣<br>能力定位：专业型，寄生虫，拉人垫背，发死人财<br><br><li>【背景故事】<br>高泽斯是本来计划的好好的，在拿到钥匙后直奔东部宝仓而去，得到长明殿遗落的神器【日落星辰】然后用其突破飞云渡的圣光壁垒，到时候魔域同盟的大军将长驱直入，横扫东极。<br><br>不过，现在她正被一个黑发少年拦在了宝仓的门口……<br><br>东方弘道笑眯眯地看着她，高泽斯嘛，虽然也是一位领主，但实力跟魔能之地的那三妖魔鬼怪完全不是一个档次的。在被斐洛先知不讲武德地教育了一通后，东方弘道就想找个倒霉蛋发泄一下。好巧不巧，在从摄政王的暗卫身上，他嗅到了魔能的气息，于是便提前隐藏了起来，先看看究竟是哪个家伙想在西尔斯城混水摸鱼，高泽斯就送上门来了。<br><br>“你这小鬼到是有些本事，不如加入姐姐的麾下，姐姐可以给你你想要的任何东西哦～”<br><br>“那能给我你的项上人头吗？”<br><br>“哼，找死！”高泽斯听到这句话顿时恼羞成怒，他一个健步向东方弘道袭来。<br><br>正当东方弘道准备大展身手迎击高泽斯时，他突然感到心脏传来一阵剧烈的刺痛。这个感觉，是能力反噬……<br><br>“怎么可能？！海之都……新田……”<br><br>他刚刚感知到自己留在海之都的身外化身已经死亡，世纪高塔也被人给毁掉，而且只是一瞬间的事。<br><br>高泽斯见此机会紧步直上，一拳直逼他的胸口，东方弘道大惊失色，赶忙躲闪，但是速度比起完全释放能力的高泽斯来说还是慢了半拍，他被打中胸口，吐出几口鲜血。<br><br>高泽斯冷哼一声，又是一脚踢出，东方弘道赶紧用双臂抵挡，但是这一脚却还是把他踢飞了出，撞到宝仓的石头墙壁上。<br><br>“我去……不讲武德啊你。”东方弘道艰难地站起身来，但高泽斯不会给他喘息之机，一个瞬移出现在东方弘道的身前，右手成爪状往他脸上抓去，东方弘道急忙蹲下，躲过一劫，高泽斯的爪击竟然直接将墙壁砸出一个坑。<br><br>东方弘道打了个滚，踉跄地爬了起来。<br><br>高泽斯冷笑一声：“不堪一击，虽然不知道你为什么突然变得这么虚弱，不过正合我意，乖乖地去死吧！”说着，高泽斯便朝东方弘道冲了过去，东方弘道知道她的厉害，急忙向旁边躲闪，但是高泽斯的速度太快，再加上地形狭窄，根本就无处可逃。<br><br>"噗……"<br><br>高泽斯一爪子将东方弘道抓在手心。<br><br>"啊！"东方弘道痛叫一声，咽喉被高泽斯掐住，双脚离地，只能用拳头狠狠捶打高泽斯的肩膀。<br><br>高泽斯没有放过东方弘道，左手紧紧抓住他的右手，右臂一抖，直接把东方弘道甩飞了出去，东方弘道撞在墙壁上，直接吐出一口血。<br><br>“敬酒不吃吃罚酒，放心，你死了之后，姐姐会把你的面皮剥下来好好收藏的。”<br><br>东方弘道心里骂道，真是时运不济，尚且不知道海都发生了什么怪事，单是现在面前的一个高泽斯他就难以应付，在未被反噬前东方弘道还能同她势均力敌，但这一变动好巧不巧把他的计划打的七零八落。<br><br>完蛋了……<br><br>东方弘道紧忙检查自己的伤势，他这回没路可退了，高泽斯慢慢悠悠地踏着猫步朝他走过来，向是在欣赏一件艺术品一样玩味地盯着他看。东方弘道现在只想着赶紧离开这里，等到恢复后再做打算，但这需要时机……<br><br>高泽斯走到他跟前，以一种上位者的姿态俯视着东方弘道，同时也封死了他的所有退路，东方弘道别无选择，他想着只能靠灵爆符来跟她炸个两败俱伤，再等奇迹降临了……<br><br>正当东方弘道准备自爆时，一道圣光术朝高泽斯袭来，高泽斯感知到危险左跳躲开，圣光术直接轰到了东方弘道头顶的墙壁上，炸了他满头灰。<br><br>“是谁在偷袭？！”<br><br>东方弘道和高泽斯异口同声地骂道。翩跹从远处怒气冲冲地跑了过来。<br><br>“东方弘道，你把我跟伊莲丢下，就是为了她？！”<br><br>“？！”东方弘道和高泽斯一脸懵逼，这小妮子在说啥，他们刚刚不是在互掐吗？<br><br>还是高泽斯先反应过来，她笑了笑，对翩跹说道:“这位妹妹先不要着急嘛，这个人是你男朋友吧，姐姐只是在和他玩个游戏哦～”<br><br>“这里没你的事！”翩跹一发圣光术朝高泽斯攻去，但高泽斯闪身躲过，她神色严肃起来<br><br>“你是长明殿的人？！”高泽斯问道。<br><br>“是又如何！”翩跹气愤地怼道，从她来时就发现，这个女人身上有股令她十分不适的气息，那种好像与生俱来的厌恶感令翩跹很反感她的一言一行，但高泽斯却没有立刻亮出她的身份，她自信打量着翩跹，如同在观赏一个新的玩具。<br><br>“没什么，只是姐姐想起了一位故人。”高泽斯笑眯眯地靠近翩跹，右手则背到身后，悄悄唤出一把骨刺。<br><br>“危险！”东方弘道提醒道。但高泽斯眼疾手快右手一辉，向翩跹刺去。翩跹急忙踹出一脚，踢飞了高泽斯的骨刺，但却被她的左手拽住了衣领，翩跹吓到了，圣光之力迸发出来，高泽斯感到一阵热浪，急忙松开了被圣光灼伤的左手，翩跹重心不稳，向后倒在地面上。<br><br>“圣灵之护！你是这一任的长明供奉？！”高泽斯惊呼道。<br><br>“魔能……”翩跹也反应过来，面前这个女人并不是和东方弘道私会的坏女人，而是一个混入西尔斯城的魔人。<br><br>东方弘道急忙启用一张烟雾符文，封闭了在场之人的视线，然后带着翩跹躲进了贮藏各种宝物的内仓。<br><br>烟雾散去，高泽斯发现人已经消失，她冷冷笑道:“躲猫猫吗？那你们最好不要让姐姐找到哦～否则……呵呵呵～”<br><br>————<br><br>“你怎么受这么重的伤？她是谁？还有你为什么来这个地方？”翩跹如连珠炮一般一个接一个地问道<br><br>东方弘道摆了摆手，他往自己嘴里塞了几个药丸，又喝了一瓶红色药剂。“先别管这个，找东西，快！”<br><br>“找什么？”<br><br>“【日落星辰】，模样跟一个水晶球差不多，如果是你的话应该能感应到它的存在，找到之后就拿个东西把它装起来从后门带出去，记住，千万别用手碰它。”<br><br>翩跹点了点头，向仓库里面走去，东方弘道拍了拍身上的灰，他从口袋里掏出了一个熟睡中的紫皮蛤蟆，看来要想拖住高泽斯话，就得用上它了……<br><br>翩跹一个货架一个货架的搜索，但始终却没能发现什么水晶球，她知道现在要分秒必争，而且东方弘道说她能感应到那什么神器的存在，可她现在却毫无头绪。<br><br>如果她能感应到神器，那为什么东方弘道不带她来呢？如果不是伊莲发动【幸运】的能力猜测出东方弘道的方位，那她现在还被蒙在鼓里。而且到现在东方弘道还说不让她碰那东西，真是的，有什么不能见人的秘密嘛。<br><br>翩跹走到一个木匣前，突然感受到自己体内的灵力在活跃地翻腾，好像在鼓动她打开木匣。她将双手搭上木匣后，意识突然变得模糊起来，眼前好像被笼了一层白雾，而白雾退散后，翩跹看到了她之前从未见过的画面……<br><br>她如同神明一屹立在长明殿的中央，右手捧着【日落星辰】，她庄严地传递着神明的天谕，在她身前，万人跪拜……<br><br>————<br><br>高泽斯今天是碰上了硬茬，东方弘道这家伙躲在暗处时不时给她骚扰一下，最终她启用了自己的魔眼，探查躲起来的东方弘道，突然，她感知到了一个犄角旮旯里散发出来的强大气息。<br><br>她唤出骨枪，向那个地方刺了过去。<br><br>“呱哇！”<br><br>一只紫色的青蛙惊慌地从那地方蹦了出来，被高泽斯一把擒住。<br><br>“魔王蛙？”高泽斯愣住了，这种能模仿高位魔兽气息和威压的魔物怎么会在这个地方？<br><br>“放开我的蛤！”东方弘道的声音从她身后响起，她急忙转过身去，却被一拳捣在了脸上，飞出去了好几米。<br><br>“咳咳，声东击西？小子！我要杀了你……”高泽斯吐了口血重新站了起来，再次激发魔能，但她突然感到面部发烫，在她刚被拳头捣中的右脸上，一道紫色的符文正被激活。<br><br>"砰"的一声巨响，一团火焰升腾而起，高泽斯只感觉浑身一阵刺痛，眼前一片模糊，什么都看不到，只有一阵剧烈的灼烧，疼痛传遍了她全身。<br><br>魔爆符，与灵爆符类似，但它作用于魔能，被附着的物体所蕴含的魔能越强威力就越大。<br><br>高泽斯猝不及防，强大的魔能爆炸能破坏任何护体护盾，但作为一个魔人领主，她硬生生地吃下了这一招。这一击，几乎将她半边身子毁掉，高泽斯右脸被炸的血肉模糊，右臂的关节处仅有几块焦肉连接着，好像随时会断掉。<br><br>高泽斯忍着疼痛，艰难的睁开左眼，映入眼帘的是东方弘道幸灾乐祸的表情，她心中充满了愤怒，她感受着自己的身躯被毁掉的痛苦，感觉整个人似乎被掏空了一般，这是她从未遇过的伤势，从来没有一次伤害会比这个还要强大，还要让她难受。<br><br>不过她的身体正以肉眼可见的速度自我修复，这一击并未动摇她的根本，等她缓过劲来，实力依然不会受到影响。<br><br>东方弘道见状直接乘胜追击，他秉承打架前先上buff的套路，把什么圣光灵力异能全用上，一脚踢飞了高泽斯，打断了她的恢复。<br><br>但这一击同样也耗干了东方弘道的所有力气，再加上他之前分身死亡所造成的反噬，如今的东方弘道再难使用一次能力。<br><br>“呵呵呵呵，小鬼，你是已经不行了吗？”一道妩媚的声音传来，高泽斯完好无损地出现在他面前，东方弘道吃惊地瞪大了眼睛。<br><br>“怎么会……”<br><br>还未等东方弘道惊叹完，高泽斯就直接用骨枪抵住他的脖子，嘲讽道:“听着，人类，魔能之地的领主不是你们耍些阴招就能轻易战胜的。不过你做的不错，居然逼我用上了保命的底牌，但也只是不错而已……”<br><br>东方弘道闭上了眼睛，他还有一招，不过现在还不能拿出来，他必须等高泽斯懈怠，但预料的死亡瞬间并没有到来。他疑惑地睁开眼睛，却发现高泽斯面色惊恐，死死地盯着一个早就该离开这里的人。<br><br>翩跹……不，现在应该说是太古之魂了，她一步一步地从宝仓里走出，眼瞳散发着永不熄灭的白色光芒，浑身上下尽被游离的圣光粒子包裹，在她右手上托着一个不断运转的紫色水晶，满脸威严和冷漠，她看向高泽斯，缓缓说道:“魔域之物，诛之。”<br><br>【日落星辰】散发出耀眼的紫色光芒，刺痛了东方弘道的眼睛，等他缓过来神时，发现高泽斯已经消失不见了，而她原来站立的地方，已经被圣光轰成了一片狼藉。<br><br>“死了吗？不，看样子是逃走了……”东方弘道回过头来端详着翩跹，发现她也在打量着自己<br><br>“吾好像……在哪里见过汝？”翩跹歪着头，疑惑不解地看着东方弘道，这个少年好像给她一种特别熟悉的感觉，但她的记忆中又没有这个人的身影……<br><br>东方弘道心中一惊，不会真这么巧吧……斐洛这个乌鸦嘴还真说中了？他试探性地问她道:“翩……跹？”<br><br>“翩跹……是在说吾吗？对不起，吾不知道汝为何人，不过吾乃太古之魂，神王路西法的化身，东大陆的守护者。吾此次回归，是要重塑东极破败的秩序。”翩跹回应道。她实在是想不起来面前的这个少年到底是何人，现在她的力量还没有完全觉醒，还须回到长明殿将自己凡人的意志全部剔除才行。<br><br>东方弘道脸色阴沉，他想到了斐洛同他讲的那句话——<br><br>我希望你能放手……<br><br>他重新抬起头来，面带微笑地看着翩跹，女孩内心突然被这微笑触动，好像回忆起什么，但却立刻就被太古之魂的意志给平复了下来。<br><br>“命运吗？还真是在给我找麻烦啊……”<br><br>东方弘道苦涩地笑道，突然他好像做出来什么艰难的决定一样，他走向翩跹，后者也没有阻拦他，他们就这样面对面地站在了一起。<br><br>“说实话，我根本没必要去趟你们长明殿的浑水，我从海都不远万里到这里不是来管东大陆的闲事的。我听说长明殿的先知能通晓过去和未来，原本我打算去问他关于【时空异变】的事情，但却因为一些原因，最后我临时改变了主意。”东方弘道停顿了一下，他叹了口气，接着说道。<br><br>“在刚来异界的时候，我跟这里的土著之间没有多少交集，毕竟我们的世界观是不同的。但自从我因追踪【虚无】而来到东大陆，结识了一个又一个性格互异，经历不同的人后，我才意识到，异世界并非我想象中的冷漠无情，这里的人也并非愚昧不堪，他们都是鲜活的生命，他们和我一样都是人。他们有自己的情感，有自己的追求，他们努力打破自己的命运，即使是身处绝境也不放弃追求希望。这些有血有肉的人是我对这个世界的唯一好感，也是我为自己划下的红线……<br><br>太古之魂是吧，你觉不觉醒我管不着，你想怎么带来新的秩序我也不想知道，可面前这个我所认识的女孩，她的名字只有一个，那就是——翩跹！”<br><br>东方弘道眼睛突然散发出圣洁的白色光芒，一时间，周围的所有的灵力都停止了律动，翩跹如同定格动画一样停住了她的动作和呼吸，飘在空中的尘埃也停止了降落和扩散，世界仿佛陷入了一片可怖的沉寂中，东方弘道眼瞳中的光很快散去，他突然有一阵晕眩感，仿佛力量全部都流失了，但还是扶着自己的额头，咬牙坚持。<br><br>明王止杀域。<br><br>一种可以停止周围时间的强大异能，雅各布曾凭借它战胜了兵力数十倍于西尔斯城的敌军。这是东方弘道的底牌之一，本来是想在最后时刻用它来对付高泽斯，但现在也管不了那么多了，他伸出手想将翩跹手中的【日落星辰】夺过来。<br><br>但翩跹的目光却随着他的移动而移动，东方弘道面色惊诧，意识到自己低估了神明的力量，翩跹仅仅静止了几秒钟便恢复了行动能力，东方弘道急忙后撤但却被她死死钳住了刚刚伸出的手臂。<br><br>“时间之力……虽然不知道汝与此身原主有何关系，但现在看来，在查清楚前吾不能放汝离开了。”翩跹冷冷地说道，这个少年所掌控的力量超过了她的想象，必须把他牢牢控制在长明殿，才能防止他在东极肆意妄为。<br><br>东方弘道呵呵一笑，他回忆起与翩跹刚刚见面的时候，那时的她，就像是一只好奇的小猫。<br><br>“我跟她，呵呵，我们什么关系都没有。我和她刚认识没几天……但我知道，从前，有个女孩，为了找寻人生的意义，她放弃了长明独一无二的地位，放弃了自己的平静生活，毅然决然地跳出了舒适圈。即使知道自己很强，她也从来都没有漠视任何人，她感受这片大陆上每一个生命的呼吸，享受着丰富的情感为她带来的体验……我没能想象到这个世界也会出现这种人，我敬佩她的毅力和抉择，所以我延后了预订的计划，我打算先要帮她，帮那些和她一样抗争命运的人实现他们的夙愿……”<br><br>东方弘道不知道用从哪里爆发出来的力量，扯开了翩跹的钳制，东方弘道正气凛然，他的意志已经不再受太古之魂威压的影响。<br><br>“什么太古之魂？什么狗屁神明，有本事你只凭自己重塑身躯，别用这种说是觉醒实际是夺舍的方式一次又一次地祸害别人。你只不过是一个可有可无的化身罢了，凭啥每一次觉醒就要毁掉别人的灵魂？”<br><br>东方弘道眼睛重新明亮，那淡白色的光芒圣洁纯粹，同那屹立于世界之巅的神明之瞳并无两样，他直面已经做好预警的翩跹，毫不畏惧。<br><br>“那么吾可以认为，汝要做长明的敌人吗？”<br><br>“我的对手始终在苍穹之上……你们，还不配。”<br><br>翩跹面无表情地抬起来右手，圣光在她掌心汇聚。滔天的杀意袭来，东方弘道没有丝毫犹豫，他拽住了翩跹的右手，将它捅入自己的胸口，血液四溅。<br><br>“这血液……【混沌】？！”翩跹惊呼道。<br><br>东方弘道面带微笑向后仰去，胸口喷出心头血溅到【日落星辰】上，将神器的光芒遮盖，神器【日落星辰】被他的血液污染，散发的光芒也逐渐暗淡了下来。<br><br>太古之魂面色凝重，好像受到神器带来的反噬，她看着倒下的东方弘道，不知为何，少年倒下时她感到一种说不出口的悲伤，明明已经觉醒了意志，明明她已经蜕变为了神明，明明她已经封印了原主的情感……为什么现在却突然想要哭泣……这个人……究竟是谁？！<br><br>翩跹的脸颊有泪水划过，她的意识开始模糊，开始回到西尔斯城那条宽阔的街道，少年牵着一个猫人族女孩，自然地同她打着招呼。他跟她讲过许多许多她未曾听闻的故事，他让她对这个美丽的世界充满了好奇……<br><br>【日落星辰】发出一声嗡鸣，它感受到太古之魂的异状，它与太古之魂的联系被这血污切断，现在的太古的之魂意志正在消散……<br><br>翩跹神志不清，她的泪水止不住地流淌，终于，她跪倒在地上，看着倒在血泊中的东方弘道，她伸出手，再次触摸少年的脸颊。<br><br>“东方……”翩跹痛苦地喊出了他的名字，她揽住少年的身体，最后晕倒在少年身上。<br><br>一道温暖的光照亮了宝仓，斐洛面色复杂从光芒中心走出，他袖袍一卷，带走了倒在地上的翩跹和东方弘道。他默默端详着滚落到一角的【日落星辰】，像一位久别重逢的旧友，最后他还是对着暗淡的【日落星辰】叹息道:<br><br>“如今太阳将要升起，东极，已经不再需要星光了……”<br><br>【日落星辰】在听到这句叹息后碎裂开来，失去了它最后的光芒……',
    sksn_feiluo:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#FFF8D7>神启者</font><br>姓名：斐洛<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，加减buff<br><br><li>【背景故事】<br>西尔斯城的夜晚，是静默的夜晚，为了指引受难的亡灵，长明殿总是灯火通明。那盏不依靠任何燃料就能燃烧的魂灯散发着微微火光，仿佛在安抚受难的魂灵。<br><br>神启殿内，斐洛闭上眼开始了他的冥想。不过一个人的到来，打破了长明殿寂静的夜晚。一位黑发少年，不知道用什么方法穿过了长明殿的圣光屏障，出现在斐洛的身前，而少年打着哈欠的样子，就像一只刚刚睡醒的猫，慵懒又迷人。<br><br>“远方来的朋友，我已等你许久，坐吧，我会尽我所能解答你的疑惑。”斐洛面无表情，仿佛是已经预见到将要发生的事。<br><br>“很抱歉这么晚来打扰您休息，只是我有三个问题，还是希望先知能帮我解答。不过，我不会已经打扰到您的冥想了吧？”东方弘道借势坐下。意味深长地看着这个盘腿而坐的老者——长明先知斐洛。<br><br>“无妨，在我冥想时会我的身体会自然而然地回答你提出的问题。”斐洛挥手一拂，在二者间忽然现出一面棋盘。<br><br>“这是异界之人带过来的游戏，不知同样来自那里的朋友，能否先陪我下一盘棋呢？”<br><br>东方弘道点头应答，执黑先落一子。他目不转睛地盯着斐洛，慢慢问道:“那么先知，我的第一个问题是:长明殿的供奉，上一代太古之魂，是怎么死的……”<br><br>斐洛紧闭双眼，但执白子紧跟布局，他叹了一口气:“三十年前，高泽斯突袭长明殿，那时我在北方游历，寻觅神明的踪迹，情急之下，上任长明供奉强行使用神器【日落星辰】融合太古之魂，逼退了高泽斯，但也因神器反噬，最终消散。”<br><br>“激活那玩意还能死人？”东方弘道表示怀疑。<br><br>“神迹未显，时机未到，太古之魂的神器【日落星辰】的力量太过强大，况且当时长明供奉又非完全的太古之魂，自然承受不住神器的反噬。此举莫过于逆天而行，自然会被天道惩罚。”<br><br>东方弘道冷笑一声，他随意地将黑子点到棋盘的一处，看着这个下棋也要冥想的长明先知，阴阳怪气地说道:“你们被明王赶出西尔斯城的时候，也是时机未到？”<br><br>“朋友何必来挖苦我，你兜了这么大一个圈子，无非是想问，能激活太古之魂力量的【日落星辰】现在在何处。”<br><br>东方弘道迟疑了一下，他抓起一枚黑子，思索道:“我不想知道那破摆锤在哪，我想知道的是，用那玩意激活太古之魂之后，翩跹会怎样？”<br><br>“执行神明的意志，觉醒无可匹敌的力量，但她个人的意识会被太古之魂同化，失去所有的情感和记忆。”斐洛声音不夹杂任何情感，在东方弘道落子后，他静静地将白子落在下方，封住黑子出路。“当然，这也是所有长明供奉命中注定的蜕变。”<br><br>白子步步紧逼，却被黑子一次又一次化解，双方都知道，试探已经结束，这场无声较量才刚刚开始……<br><br>"蜕变？什么意思？"东方弘道皱起眉头问道。<br><br>"太古之魂和【日落星辰】本来就是神明的一部分，东大陆的守护神是路西法万千化身中的一员，祂将自己的精神化作太古之魂，力量凝聚成神器【日落星辰】。当东大陆受到灾难时，长明供奉就会使用【日落星辰】的力量同太古之魂融合，履行她救赎众生的职责。"斐洛淡漠地回答道。“对于翩跹来说，这不是代表死亡，而是回归。她自身的一切都是属于神明，也自当回归神明。”<br><br>斐洛沉默了，没有再继续说话。这个回答，并不在东方弘道的意料之外，但却令他非常不爽，以至于按在棋盘上的右手青筋外露。<br><br>“她是一个活生生的人，她有自己的情感，她有去追求幸福的权利，她不是维系你们权威的工具。你所谓的命运，就是为了自己位子的坐的安稳逼迫一个女孩抹杀自己的灵魂吗？”东方弘道见缝插针，落子利落，破开斐洛的夹击。<br><br>“翩跹是长明供奉，东极未来的守护者，命运必将引领她与太古之魂融合，以驱散黑暗。作为她的师父和引路人，我很感激你能在她的生命中给予她缺乏的温暖和快乐，但是，当那一天真的来临的时候，我希望朋友还是能放手，这是为了她好，也是为了你好。”<br><br>“放手？开什么玩笑，命运这东西，只有当它顺我意的时候，我才看它两眼。”<br><br>片刻后，那棋盘上的白子已经初显规模，而黑子则是杂乱无章。东方弘道心思不在棋上，他仔细回想斐洛话语中的漏洞，太古之魂自古以来就是由长明殿所控制，斐洛不着急寻回翩跹，要么是他真是个脑瘫信了所谓命运的预言，要么就是他有什么办法能让翩跹心甘情愿地回来。不过，哪一种对东方弘道来说都是难以处理的，长明殿屹立千年而不倒，自然会有自己的底牌在，但他也并非毫无准备，因为长明殿所建立的基础，不还是路西法神教吗。<br><br>“第二个问题，魔能和圣光，灵力和异能，他们看似毫无关系，但实质上是否是一种东西？”东方弘道手指敲着棋盘，提醒他该落子了。<br><br>“是，魔能，灵力，圣光其实都是一种特殊的异能，祈祷看似是祈求神明的力量，实际上则是某种特殊异能的激活方式。”斐洛回答的很干脆，他将白子压在一个关键位置。<br><br>魔能，源自于陨落天倾泻而出的具有强烈辐射的能量，能够在体质和精神上改造一个生物;圣光是人们对神明信仰的回应，是一种源自神明的纯粹力量，他能驱散诅咒，增强自身;灵力是人们在各种自然界的物质中都能发现的一种能量，当它们聚集到一定规模时就能产生各种神奇的效果;最后是异能，异能的历史很短暂，它来源于时空圣殿，那些时空异变的幸存者，身体中都多少容纳着这种力量，异能种类繁多，代表了世界的法则。<br><br>而奥丁格兰在长时间研究后，得出了一个骇人听闻的结论，这四类能量，它们的实质是相同的，而且它们之间可以互相转化，亦能被赋予和夺取。这令以圣光信仰为基础的教会大为恼火，他们将奥丁格兰斥为异教徒，将他烧死在火刑架上。<br><br>“看来你的觉悟也不高嘛，跟帝都那些宗教狂热分子比差远了。”东方弘道耸了耸肩。<br><br>“当一个人步入超凡境时，自然会对这个世界，对它所蕴含的一切事物，有新的感悟。当我冥想的时候，精神就会从长明，蔓延到西尔斯城，再往上走到东极，之后是整块大陆……”<br><br>“所以……你现在已经看到时空圣殿了吗？”东方弘道到底是想看看这个闭着眼睛的老东西想搞什么名堂。斐洛，整个东极最接近神明的悟道者，他这一生见证了这片大陆的各种重大的历史变迁，曾被尊为国师，布道讲坛，也曾被人赶出神殿，流落街头。这些经历都让他的心境如同止水一般，但这次，他感受到内心的一阵波动，面前这个不知道来自何处的旅人，轻描淡写地将这世界的秘密一一列举，他看不透东方弘道，看不清他的过去还有未来……<br><br>斐洛深吸一口气，他从冥想中缓过神来，但眼睛还是牢牢紧闭着。<br><br>“不，在那之上。”<br><br>白子轻轻落下收官，这盘棋下到现在，黑棋尽数被围，已无活气，东方弘道实际上已经输了，无论他接下来如何落子，这盘死局都已无力回天。<br><br>“朋友，你已经无路可走。”斐洛微笑着提醒道。<br><br>东方弘道捻起一枚黑子，嘴角勾起一丝笑容。“呵，无路可走？大师您可能不了解我，有的时候下一盘棋即使是我要输了，但这也不代表对方就要赢了。”<br><br>东方弘道突然右手猛的一拍棋盘，将棋子拍散，棋盘也被掀起，碎成了几块，散落一地。东方弘道站起身来，边打哈欠边伸了一下懒腰。<br><br>仅仅将胜利拘泥于这小小的一块棋盘，接受别人所制定的规则，这绝不是东方弘道的作风。斐洛这时终于睁开了他深邃的灰色眼睛，他身体的表层逐渐笼罩上一团没有色彩的圣光，他注视了东方弘道许久才开口道:<br><br>“那么，就请说出你的最后一个问题吧……”<br><br>东方弘道面色凝重，将身体内外的所有游离的灵力全部调动了起来，借以抵挡斐洛附加在他身上的无形威压。斐洛的目光如同实质般的盯着东方弘道，那眼神就像是两把尖刀，直接刺进人的心脏中。<br><br>东方弘道面不改色地问道:“最后一个问题……关于【虚无】，你都知道什么？”<br><br>斐洛眉头一皱，强大的灵力波从他体内爆发了出来，掀翻了殿前的摆件，吹灭了燃烧的蜡烛，气浪席卷了神启殿的四周，东方弘道紧忙双臂护在胸前防御，但仍然被这爆发出来的气浪给击飞出去。<br><br>“你从哪里听到的这个词？”斐洛眼神中露出一股自他悟道以来都未曾有过的杀气。<br><br>“呵，如果我说了，你是一定会杀了我的。”东方弘道艰难地顶着千金重的威压爬起来，他言语针锋相对，气势上丝毫不让。<br><br>“【虚无】……是一个本不该存在于这个世界的东西，只要跟它扯上关系的，最终都会成为这个世界的敌人。”斐洛能量喷涌，向东方弘道袭去，后者大骂一声某种植物，急忙甩出一张灵爆符文，激烈的爆炸冲散了灵力，也将神启殿的地砖掀飞了十几块。<br><br>剧烈爆炸产生的烟尘充斥了整个殿堂，不少长明殿弟子被这爆炸惊醒，他们急忙赶往神启殿，却发现先知一个人站在大殿外，背着手孤零零的看着天空中为数不多的星辰叹息，而东方弘道早已经没了踪影……',
    sksn_jiamiu:'<li>【基础信息】<br>角色设计：§<br>故事：爪巴<br>称号：<font color=slategrey>黯魍幽魂</font><br>姓名：阿贝尔加缪<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：斗士型，加伤免伤<br><br><li>【背景故事】<br>魔能之地的北境之地总是笼罩着一片雾霭，这里原来是有几座人类和亚人混居的村庄，但现在却再也看不见了，偶尔会有些冒失的冒险者闯入此地，然后在迷雾中失去方向活活饿死，哪怕有活着回来的人，他们也仅仅只带回一个又一个骇人听闻的故事。<br><br>冒险者率领着一个七人的小队，接受了来自飞云渡的悬赏任务，调查魔能之地北境领主阿贝尔加缪和鹰角域联盟的事宜。<br>身为东极绝无仅有的几个的黄金级冒险者，他却丝毫不敢有任何松懈，他深知魔能之地的恐怖，自打出了前哨站，他们仅仅只是遭遇了几只无头脑的野兽后便再无战斗，这让他心里有些不安。<br>这北境不同于魔能之地的其他地界，荒凉，肃杀，大路上见不到任何生灵的气息。而现在他们已经深入了北境的腹地，相传此地之前曾有一座座繁华的村落，但却因战争而遭受涂炭，转变成了刽子手们的屠宰场，而正当入侵者屠杀村民时，一股股白色的浓烟从地下渗出来，弥漫并笼罩了整个北境，几乎所有的生灵都死在了这片雾中，也正是在那时，阿贝尔加缪出现在了东极人的视线中，如同死神一样统治了这个被迷雾笼罩的死亡世界。<br>也不知走了多久，空气中逐渐多了一丝雾气，那些凝结在空中的水滴打在他们的脸庞，却让他们感觉不到湿润和清凉，渐渐的，他们开始看不清前方的路，当他们注意到不对劲时，漫天的迷雾已经笼罩了这个经验丰富的冒险者小队。<br><br>“队长，有情况。”队伍里的侦查者提醒道。他指着脚下的土地，但没有再接着说下去。<br>冒险者走上前，用白色重剑的剑鞘将地上的一层浮土拨开，露出了一根白色的骨头，紧接着，队员们也蹲在地上用各种工具扒开周围的地面，他们惊奇的发现，这看似平平无奇的黑色土地，居然埋藏着一具又一具令人毛骨悚然的骸骨，他们绝大多数好像都是些逃难的平民，身上还披着破碎的麻布衣，有些则是身着铠甲，但已经被锈蚀的看不清样式，但明显能看出有两波不同阵营的人在互相攻击。<br>这里应该是一处古代战场，这些白骨已经在这里不知道躺了多少岁月。<br>正当冒险者思索时，一声不知道从什么方向传来的深沉低吟打破了寂静，冒险者远远的看到有什么东西在这漫天白雾中不断地蠕动，但却很快销声匿迹。<br><br>雾气渐浓，两股白色烟团在冒险者身前不远处凝聚成了人形，好像一男一女。冒险者愣住了，那两团烟雾居然是……<br>“父亲……母亲……？”<br>这两团白雾好像听到了他的呼唤似的，向他靠近，这让他想起了当初自己刚刚完成了雇主的任务回到家时，总会有两个身影早早地在门口守望他们的儿子，他们不在乎自己孩子在冒险者协会中享有了怎样的声誉，他们将他视为骄傲但他们仍然只是期望他能平平安安地回到故土。<br>可他们却遭受了无妄之灾，兽潮席卷了脆弱的城镇，他的故乡毁在了火与杀戮中……<br>那团像女人一样的雾气好像张开了双臂，向他飘了过来，仿佛是想给他一个拥抱，他也张开臂膀，想再一次拥抱许久未见的“母亲”。<br>但就是一刹那，他身子一斜，躲开了那团白雾，然后掏出重剑刮出一道剑风将雾气驱散。黄金冒险者的专业素养在生死的瞬间给他了警醒，他刚刚差点就中招了。<br><br>他赶忙呼唤自己的同伴们，但却没有一人应答，冒险者队伍里的人有的面色呆滞，有的看起来痛苦，有的则是紧紧闭着眼睛，如同睡着了一般，他们口中嘟囔着什么，语言含糊。但无论如何，他们都没有办法听到队长的呼喊。<br>该死……<br>冒险者想到要拿出教会分发的圣水来救助这些陷入幻境的同伴们，却被一道空灵的声音阻止。<br>“不可以哦，对于陷入绝望的人来说，死亡或许是一场解脱……”<br><br>一个约么十一二岁的女孩从白色迷雾中走了出来，她的身上仅仅披了一层布满了褶皱的破布，外露出了女孩大片还算稚嫩的洁白酮体，犹如含苞待放的花骨朵一般惹人怜爱。不过冒险者也无暇欣赏这人间绝色，能在这种鬼地方平白无故出现的存在，不是死人的幽灵，就是伪装的怪物……<br>以撒玩味地看着这个不知所措的闯入者，她知道这位黄金级的冒险者现在正因恐惧而变的高度紧张，不过她可不是专门出来吓唬这个无知的入侵者的。<br>四周窸窸窣窣的诡异声音响起，紫色的浓雾从女孩的背后弥漫开来，笼罩了他们在场的所有人，那些陷入幻境中的人并不知道他们现在面临的情境，但他直观深切地感受到了一阵渗入骨髓的阴寒。<br>“你……你是谁？”<br>冒险者壮起胆子质问女孩，但他心里非常清楚，面前的这个女孩肯定不是什么普通人，但无论他怎么回想，在记忆中的魔能之地都不应该存在这么一位神秘的女孩……<br>以撒没有理会他的话语，她指着冒险者脚下的土地，声音中不带有一丝人类的情感。<br>“她说你踩疼她了……”<br>他顺着女孩的手指的方向看去，发现自己左脚正踩着一个硬物，那是一具只剩下了半张面皮的骷髅，看样子是一个五六岁的女孩，她暴露在外的脊椎上有一道长长的凹痕，看来是被利器砍杀而死的。她那只有几片萎缩皮肤的手中还攥着一株早已经枯萎的白色花朵。<br><br>他吓的急忙后退，然后抬头注视着女孩，这时他终于看清了那团紫色雾气中所隐匿的东西是什么，一个如同毒蛇一样枯槁瘦小的人形魔物，它紫色的皮肤不断向外释放出一阵阵看上去就带有致命毒素的烟雾，有如此特征只能是北境的领主——阿贝尔加缪……<br>没想到他们小队居然直接遭遇了魔能之地最恐怖的存在之一。冒险者刚想准备战斗，但女孩的声音就让他丧失了所有信心。<br>“阿贝尔，让他解脱吧。”<br>女孩稚嫩的声音带着一种从远古而来的深邃和莫名的哀伤，这一种命令的语气让他大吃一惊，也昭告了他的死亡。<br>还未等他做出反应，怪物的口中便呼出一股白茫茫的雾气，萦绕在陷入幻境的冒险者们周围，冒险者猛地瘫倒，他的意识慢慢消失。这致命的烟雾夺走他们的生机，令他们变成了一具具冰冷的尸体，如同那些被浮尘掩埋的骷髅一样永远地留在了此地。<br><br>阿贝尔加缪，是北境死国唯一的活物。他刚刚夺走了一整个冒险团的生命，这些人甚至没能同这位阴森之域的领主交手便毫无价值地成为了战争的牺牲品。<br>加缪伸出干枯的手掌，将一块金色的牌子从冒险者的腰间扯了下来，然后他又拿出了一块金铭牌并小心翼翼地放在女孩的手心。<br>“这块是他身上的，另一块是奥克佩特的使者送过来的。”<br>以撒仔细端详这两块相似的铭牌，她嘴角勾起一丝微笑。<br>“这铭牌上倒没有什么记录个人信息的地方，看来就是一个简单的出行证，飞云渡没有把你们当成和他们具有同等智慧的生物，他们还认为你们只不过是没有头脑的野兽。那这样就让我回去看看这阔别已久的人类世界吧”<br>“您是要亲自去飞云渡吗？”<br>“嗯，我离开前会让奥克佩特撤离鹰角域，退到陨落天去，等东极的军队行军到陨落天时，自会有来收拾他们的，至于东极军队撤退之后你们该怎么做，我想那头蠢牛比我要明白。”<br>她半蹲着，将白骨女孩手中握着的枯萎鲜花摘下，她用指甲划破了自己的食指，将鲜血滴到花瓣上，这朵花在沾到她的血液后重新绽放，白色的花瓣也变成了妖艳的血红色。她将花朵重新插回死者的手中，拍了拍身上由雾气凝结成的露水，然后回过头来同加缪说道:<br>“将这片古老战场上的死者都安葬吧。他们比我要幸运的多，至少他们所经历的死亡……只是一瞬间的事……”<br><br>萦绕鬼雾，妖影摄魂',  				     		
	sksn_occupatee:'<li>【基础信息】<br>角色设计：血刀少主<br>技能设计：琉璃菠萝<br>故事：竹林七闲（林啸霜）<br>角色配音：九醉书生<br>称号：<font color=red>莽血魔王</font><br>姓名：奥克佩特<br><br><li>【能力数据】<br>身份定位：反贼<br>能力定位：刺客型，女性武将终结者<br><br><li>【背景故事】<br>多摩镇的小酒馆，是飞云渡外所有冒险者最喜欢去的地方。东极科里恩城产的烈酒入喉，在闷热的天气下，无疑是上天给予的恩赐。<br>“砰！”酒馆的大门被一脚踹开，一尊巨大的牛头人身的怪物出现在众人的眼前。<br>“沃吉尔，能不能不要每次都把门踹开？”老板放下手中的酒杯，无奈的叹了一口气。<br>“嘿嘿，老板，你就不会把这个门换大点？”那牛头人身的怪物身躯庞大，只能勉强挤进酒馆，看起来十分滑稽。<br>“哟，沃吉尔，你这是又回部落了？”<br>“是啊，俺听说隔壁部落的酋长又娶媳妃儿了，这俺肯定要去贺一下礼啊！”沃吉尔发出振聋发聩的笑声，天花板似乎都被这洪钟似的声响震了一下。<br>“贺礼？我看你是又去糟蹋人家媳妃儿了吧？”<br>“切，别提了！”维吉尔接过酒馆老板为他特制的“酒桶”，痛饮了一番，“不到十分钟，那娘们儿就一动不动了，俺一看，气儿都断了。 ”<br>酒馆里不熟悉沃吉尔的人感到一阵恐怖，这世上竟有如此令人作呕的怪物？<br>“我说你呀，就别老是糟蹋人家媳妃儿了，你啥时候娶媳妇，我们肯定为你贺礼。”<br>“你想糟蹋俺媳妇儿？”沃吉尔猛地站起身，一把将那出言开玩笑的人抓起来。<br>“贺礼！是去恭喜你的！你以为谁都像你一样去糟蹋人家媳妃儿啊！”<br>沃吉尔这才慢慢将那人放下，又不好意思的挠挠头：“不好意思啊，兄弟。我忘记了，你们不好这口，俺就不一样了，俺就喜欢别人家的媳妃儿。当然，谁敢糟蹋俺朋友的媳妇，俺肯定一拳把他打成肉饼，活吃了他！”<br>“沃吉尔！”门口传来一声呼唤。<br>“团长！”沃吉尔扭头一看，那站在门口的黑衣男子不正是自己冒险团的团长吗？<br>“别聊了，整个冒险团就等你了，有个叛徒马上就回来了，我们必须尽快解决，走，回驻地。”<br>“是，团长。”沃吉尔不好意思地挠挠头，“你们继续喝酒，等俺解决了再回来继续聊。”<br>“得了吧，沃吉，你还是去找媳妇吧”酒馆里传出了欢快的空气。<br><br>“我跟你说了多少次了，沃吉尔，现在战事正是吃紧的时候，你没事别去那些地方鬼混，就你这模样，要是被当成魔物被抓了，老子还得去赎你。”<br>“放心吧团长，俺力气大，谁来谁都被俺揍趴下，吼吼。”<br>团长捂住额头，虽然这牛头人看起来和个傻子一样，但如果不是当初它靠一身蛮力把冒险团硬生生地背出战场，估计他们这些人都得丢掉性命。<br>“对了这是上面刚刚发下来的凭证，现在得佩戴这个才能自由出入飞云渡，尤其是你更得戴好，就你这牛头人身的，知道的以为你是牛首族亚人，不知道的还以为你是魔物呢”<br>团长将一个金闪闪的牌子丢给了沃吉尔，后者捏着它凑到鼻孔处闻来闻去。<br>“就这玩意？又不能吃，俺看不出有啥用处。”<br>“你啊……唉”团长扶着额头叹气道。<br><br>等他们回到了营地，天色已晚，一进营地的大门他们就见到一对男女青年在互相打闹，男的是黄金级的冒险者刺客哈维，也是他们团队中的最强者，另一位是他的伴侣牧师莎雅，这两人平常就互有好感，行动时也是总在一块。<br>“你们小两口就别在这里打情骂俏了，等这次任务结束了，我给你们在飞云渡的广场上举办一场婚礼。”团长推了推哈维和莎雅，两人面面相觑，脸上出现了一道红晕。<br>“婚婚婚……婚礼？团长你搞错了吧，我才不要嫁给这个木头！”莎雅向哈维吐了吐舌头，气鼓鼓地把脑袋别了过去，掐起腰来，活像只受气的小猫。<br>“团长，凯尔回来了……”这时，一个哨兵跑到团长跟前耳语道，团长点了点头，握紧了手中的钢刀。<br><br>团长召集了冒险团的所有人到营地中间开会，等人都到齐了，他便看到一个鬼鬼祟祟的身影始终不敢站到前面，这个鬼祟的家伙，就是他们要抓的叛徒——凯尔。<br>他命沃吉尔去将他拎出来，牛头人大步走上前，瞥了那家伙一眼，什么都没说便一把将他拽起来扔到人群中间，让他摔了个狗啃泥。<br>“你这混蛋在干什么？”凯尔骂道。<br>“是我让他这么做的，凯尔，回答我，前些日子你跑到鹰角域做什么去了？”团长声音中带着一丝愠怒。<br>“什么鹰角域？你们在说什么？我从来没有去过！”<br>“没有？可当时前线的哨口报告，我们营地有一个人半夜溜进了鹰角域，当天夜里我急忙把所以人都叫出来挨个点了一遍，凯尔，就是没有你。”团长死死地盯着他。<br>“现在人都到齐了，凯尔，你还有什么要说的”<br>凯尔左顾右看，不少人已经掏出了武器准备动手。<br>“是的，团长，都到齐了啊……”凯尔将自己的装备卸下，声音低沉，阴森森地笑道。<br><br>霎时，一道刺眼的红光闪过，等到人们反应过来时，发现他们的团长已经是人头落地，但身体却保持着站立的状态，而在已死的团长身旁，赫然耸立着一个高大粗犷的怪物，血色的纹路布满了他的身躯，一对牛角闪烁着暗红色的光芒，他的一双眼睛如同麦芽般金黄，昭示着其主人的不凡地位，但气质却如同一只狂暴的野兽，从头到脚都充满了杀戮的气息。<br>“沃吉尔，你在干什么？！”一个冒险者质问道。但发生异变的牛头人没有给他回应，反而唤出一把巨大的血魇魔刀径直冲向没有防备的人群，血色大刀肆意挥舞着，不断收割着这些可怜人的生命，虽然他们都是些实力强劲的冒险者，但在那把暴戾的血魇刀下却毫无还手之力，霎时间营地内血肉横飞，宛若人间炼狱。<br>就在这时，一个紫色的法球击中了沉溺于杀戮中的沃吉尔，他转过头来看到了一个女人正双手握着法杖瑟缩着躲在营地的帐篷后，随着一段不怎么标准的吟唱，她的法杖又喷射出了一团火焰，但被牛头人轻易地给拍灭了。<br>“吼吼，我记得你是叫莎雅对吧？老子老早就想尝尝你的味道了。”<br>沃吉尔根本不在意她的戒备，他淫笑着拖着那把沾满鲜血的大刀朝莎雅慢慢地靠近。<br><br>“怪物，休得放肆！”<br>隐匿多时的哈维找准时机向沃吉尔使出一记附带着雷电的飞刀，但却被后者坚实的牛角给弹飞。牛头人回过身来瞪了他一眼，哈维就感受到一种令人窒息的压迫感，那种精神高度紧张的感觉，使他喘不过气来。<br>还没等他反应过来，哈维只感觉到一阵风从耳边刮过，自己就被牛头人掐住脖子死死地按在地上，并砸出了一个大坑。<br><br>莎雅这才明白，面前的这尊牛头怪物根本不是什么北部部落的亚人，能瞬间秒杀他们的团长，将黄金级的哈维打的毫无还手之力的牛首怪物，只能是魔能之地的鹰角域领主——莽血魔王奥克佩特。<br>为什么，为什么这种存在会潜藏在自己的冒险团中……<br>赢不了，哈维赢不了他，这根本就不是一在量级上，被一个魔物领主盯上的猎物，就算是逃，也不可能逃掉。莎雅绝望地跪倒在地，神志恍惚，哈维还在努力向她伸出手。<br>“莎雅，快逃……快逃……”<br>牛头人最喜欢看这种生死离别的忠贞爱情，他曾经想过找这么一个爱他的老婆，但那些抓来的女人没两天就坏掉了，这一度令他十分郁闷。<br>沉重的牛蹄子狠狠踩在哈维的背上，后者咳出一口鲜血，奥克佩特哼着难听的小调享受着这肋骨断裂的声音，牛鼻音中洋溢着残忍和疯狂。<br>“吼吼，知道老子平时最特么烦的是什么吗？自以为是的蝼蚁们……就凭你们这些酒囊饭袋也敢来攻打老子的鹰角域？！”<br>奥克佩特没有给他留下遗言的机会，他抡起血魇刀，手起刀落砍飞了哈维的脑袋，人头就像是皮球一样滚的老远，温热的血液如喷泉一般从脖颈的断切面涌出。莎雅惊声尖叫，却立刻就被奥克佩特捂住了嘴。<br>“别在这里乱叫嘛，小美人，等跟老子回去之后慢慢地让你在床上叫个够，吼吼吼。”<br>莎雅不断挣扎着，她用尽了力气拍打着牛头人粗壮的手臂，但却怎么也掰不开奥克佩特的一根手指，很快她就因大脑缺氧而昏死过去。<br><br>这时一道阴邃的身影从暗处显现出来，凯尔褪去了身上的伪装，露出了头顶暗红色的犄角，他的脸上布满了诡异的血丝，夜色下散发着幽幽青光的竖瞳正昭示着他的身份——堕落的魔人<br>“大王，现在我们该怎么办？”凯尔向奥克佩特鞠躬，丝毫不敢怠慢。<br>“暴露了啊，吼吼，不过这也不是什么意外的事。得亏这些废物想独吞揪住卧底功劳，没有把事情上报给那些烦人的骑士团，不然咱们还得费点力气去解决援兵。”奥克佩特踹了一脚横躺在地上的无头尸体，嘲讽道。<br>“这回出来孙子也装够了，东西也到手了，哈里森的阵营里还真多了些不容小觑的家伙，将这些情况都上报给陨落天的那位吧，飞云渡的守军快集结完毕了，现在也得回去准备了。”<br><br>奥克佩特将冒险者凭证仍给了对方，然后大手一挥收起血魇刀，并将昏死的莎雅扛在右肩说道:<br>“把这些死人身上的这玩意都收了，对面已经有所戒备，拿着这些东西回去研究一下对策。另外，这座镇子里的女人都抓回鹰角域，老子也好久没开过荤了，吼吼。”<br>“遵命，那剩下的人该怎么处理呢？”<br>“剩下的嘛……哼哼，以前在部落的时候，老子刚从那些捕奴队的手中逃出来，他们在后面拼命地就朝我射箭，箭头上带着致命的毒药，他们是想要把逃走的我就地杀掉而不是再抓回去，我知道，比起用活的奴隶换钱，他们更想要斩草除根，他们是害怕老子逃走后会一天去报复他们……”<br>牛头人盯着远方灯火通明的多摩镇，舔舐着嘴角沾上的鲜血:“现在我也害怕……”<br><br>喧哗，骚乱，死寂，等到了乌云遮住了月的一角时，多摩镇的热闹，从此也成为了历史……', 
    sksn_geleier:'<li>【基础信息】<br>技能设计：愉渊<br>故事：爪巴<br>称号：<font color=#FF8F59>说大人则藐之</font><br>姓名：奥托·格雷尔<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：专业型，拼点<br><br><li>“【背景故事】<br>今日请诸位大臣前来，一是为庆贺南方战事大捷，二是为祝贺摄政王殿下寿辰，薇儿在此先敬皇叔一杯。”希露薇端起酒杯面向苏尔嘉德道。<br><br>苏尔嘉德也举起酒杯，一饮而尽:“谢过陛下。如今南方大捷，这场宴会原就是为庆祝高戈里将军胜利而办，只不过是恰逢本王生辰罢了，本王请了西尔斯城最好的表演团，愿在坐各位今天能玩的尽兴，东极的和平时代才刚刚开始！”<br><br>群臣共举手中酒杯，向苏尔嘉德敬酒，希露薇扫视了一圈看见宾客席中有一人巍然不动，那个银发的家伙，好像是叫什么……奥托•格雷尔来着。但希露薇没想到的是格雷尔突然发出了一阵冷笑。<br><br>“哼，摄政王殿下，此言差矣。”奥托·格雷尔将酒杯拍在桌子上。在诸位大臣惊愕的目光中从列宾席走了出来，他拍了拍衣袖，拱手道:“陛下，诸位大臣，现在西尔斯城内忧外患，我们却在这里大摆宴席，这实在是让臣难以接受。”<br><br>“格雷尔卿说笑了，西尔斯城在陛下与摄政王的治理下井然有序，哪有什么危机啊。”在王座一旁侍立的雅维利不知道格雷尔这个时候站出来是为何事，但他有种不好的预感，所以赶忙圆话道。<br><br>格雷尔摇了摇头，向希露薇劝谏道:“陛下是真不知吗？如今高戈里已达中部领班卡姆斯，距离西尔斯城也只有两个领的距离，他打着勤王的旗号，收编各地兵权，人数已达三十余万，在中央的南方虎视眈眈。陛下应早做打算，亲政统军，以皇室之威震慑那些在暗处肆意妄为的谋逆分子”<br><br>这一席话令在场的群臣发出了惊异的声音，一位老臣赶紧质询道:“高戈里将军刚刚拿下了阿弗斯赫特，目前应该正忙着收拾敌人的残部，怎么可能会出现在班卡姆斯城呢？”<br><br>“就是就是，就算是他想回来，但行军打仗哪有这么快的啊。”其他人附和道。<br><br>“哦？可我听说，高戈里在南方可没有呆多久，反而后纵变前纵，日夜兼程往西尔斯的方向赶呐，中央还没给他返程的命令，他这么着急是得到了谁的指示？”格雷尔环视了一圈坐在席位上的大臣，最后将目光锁向了苏尔嘉德。<br><br>格雷尔看向苏尔嘉德，苏尔嘉德也目不转睛地瞪着他，仿佛在看一个将死之人。格雷尔没有再理这个司马脸，他又把头转向了各位大臣。<br><br>“亏你们还是二朝老臣，说什么陛下年幼，缺乏经验，实际上你们一个个在私下里中饱私囊，为了那一点金子连国家安危都弃之不顾，对皇城内某人的谋逆行为置若罔闻。至于摄政王殿下，暗自调兵，谎报军情，其心可诛，让一个掌握了数十万大军的南方总帅将大军秘密进发皇城西尔斯，这是要犒赏三军，还是说摄政王殿下想要借大军之势逼宫造反？！”格雷尔情绪激昂，毫无惧色。<br><br>“放肆！”希露薇狠狠拍了一下桌子，整个殿堂立即肃静了下来。<br><br>“奥托·格雷尔！你知道在大殿上诽议王室的后果是什么吗？！你现在立即跪下，请求陛下和摄政王殿下的宽恕，否则——”一位大臣站身来呵斥道。<br><br>“便死无葬身之地。”格雷尔微笑道。他大笑三声，便将目光转向群臣，瞧瞧这些老臣，个个都是国家栋梁，可在摄政王的淫威下，却没有一人敢出来替陛下说话。哪怕摄政王狼子野心如此显露，也没有一人敢维护正义。<br><br>他看到有的人已经羞愧到掩面，有的则是在冷笑，仿佛在嘲笑他的自不量力，有的则是满脸惋惜，感叹他的悲哀下场。<br><br>苏尔嘉德嘉德脸色阴沉，他瞪着希露薇，看她想如何处置这个不知道天高地厚的文臣，希露薇轻叹一声。<br><br>“来人，将奥托·格雷尔压入死牢，择日发落。”希露薇面无表情地说道。<br><br>摄政王哼了一声，拍了拍手，两排披甲侍卫冲上殿来，将格雷尔直接架起，在格雷尔即将迈出大殿时，他高喊道:<br><br>“夜明群星不明，东极亡矣，东极亡矣！”<br><br>雅维利听罢，眉头一皱，在没有任何人注意到的情况下，悄悄离开了大殿。<br><br>大殿上，希露薇咬着了嘴唇，她调整了一下呼吸，对苏尔嘉德说:“抱歉扰了皇叔的兴致，薇儿待查明后一定将此人从重发落。”<br><br>苏尔嘉德又饮了一杯酒:“无妨，我苏尔嘉德早就习惯了这些无名诽谤，只要陛下不轻信那些流言蜚语，那本王亦不在意。”<br><br>希露薇露出笑容，然后再次举起了酒杯:“这杯酒，算薇儿为皇叔赔罪。”<br><br>“这倒不必。”苏尔嘉德呵呵一笑，招呼了一下身边的侍从，那位身披黑暗斗篷的侍卫捧着一个木匣，走到苏尔嘉德身前，苏尔嘉德接过木匣，站起身来，缓步走到了希露薇身前。<br><br>“陛下，本王前日得到了一件宝物，名叫业火萃心莲，这朵萃心莲可同兵器一同炼化，赋予兵器火焰之力，也能直接食用锻炼身躯，增强体魄。”苏尔嘉德将木匣呈上。希露薇看着他手中捧出的木匣，不知道该如何处理。她回过头看了一眼，发现本该在一旁侍奉的雅维利不知道跑到了什么地方去了。而雅维利之前曾再三强调，让她不要碰苏尔嘉德的任何东西。<br><br>“怎么，陛下不打开看看吗？”苏尔嘉德冷眼相视，如同一头盯上了猎物的饿狼。<br><br>“这……”希露薇不知所措，她抬起了右手，却迟迟没有触碰木匣。<br><br>“还是说……陛下并不相信本王？！”苏尔嘉德咄咄相逼，他知道只要希露薇打开这装有噬心莲的木匣，噬心莲散发的灵力就能立刻让希露薇陷入幻境，之后他再说出那句驱使噬心莲的“密语”，希露薇的灵魂就会被永远禁锢在莲花内，而身体就会转化为被他控制的傀儡。所以只要希露薇能打开这木匣，一切就都结束了……<br><br>希露薇心跳的飞快，她能隐隐约约地感受到，那木匣中隐藏着一个天大的阴谋，但若是她在这个时候不按苏尔嘉德说的办，万一苏尔嘉德狗急跳墙，让控制了宫廷军的暗卫营提前动手，到时候又将是一场杀伐。<br><br>雅维利这家伙这种时刻不知道跑去干什么了，这满朝文武，竟没有一人出来替她解围，她抬起头来，对视着苏尔嘉德的眼睛，在苏尔嘉德的眼中，她看到了一顶金色的王冠。<br><br>原来……你一直想要的，就是这个破东西吗？<br><br>希露薇苦笑了一声，她将手按在木匣上，大殿上所有人的眼睛就聚焦在木匣上，苏尔嘉德面露出阴谋得逞的奸笑。希露薇轻轻地打开木匣的盖子，在所有人的注视下，她从木匣里捧起了一朵洁白无瑕的莲花。<br><br>花朵是如此圣洁，仿佛一切黑暗都无所遁形，一切争端都能被它包容吸纳，它是如此美丽，如此妖艳，希露薇从来都没有见过这等鲜丽的花儿。<br><br>苏尔嘉德面色狰狞，脸上的每一块肌肉感受到了大事将成的愉悦，当他说出那段释放噬心莲之力的密语时，希露薇释然地闭上眼睛……<br><br>“等等，这不是噬心莲！这是什么东西？！”苏尔嘉德突然意识到，这朵花不是他将要使用的噬心莲，噬心莲通体红色，象征着血和灾厄，而这朵，就同后花园里的普通莲花并无二样。<br><br>他将花朵一把夺过，莲花被使劲一挤，花瓣居然霎那间绽放，两条如同白蛇一般的花蕊以迅雷之势弹射出来，如同蛇牙一般直接刺进苏尔嘉德手背，注入了毒素。遇到刺激立刻释放毒素，有这种独特防御机制的珍奇物种就是产自于科恩城的蛇莲，它猛烈的毒素甚至能杀死一头水牛。<br><br>苏尔嘉德痛的大喊，他甩开蛇莲，从喉咙里发出撕心裂肺的嚎叫。希露薇不知道发生了什么，她慌忙地后退，却被王座绊倒，一屁股坐到王位上，<br><br>“这是……蛇莲？！小皇帝，你居然敢算计我！”苏尔嘉德忍着剧痛掐住手腕，阻止毒素蔓延，在他的喊叫下，殿外待命的暗卫冲进大殿，亮出了剑刃兵器，劫持了在场的各位大臣，他们无不惊呼，慌不择路，但却被暗卫死死围住。<br><br>“乱动者杀无赦！”苏尔嘉德咬着牙威胁道。<br><br>希露薇脑袋懵了，事态已经超过了她的想象，苏尔嘉德提前行动了，而西蒙他们还没有赶到，雅维利……雅维利难道已经抛弃她了吗？她的思绪如一团乱麻，甚至感到了一丝绝望。但她还是哆哆嗦嗦地站了起来，即使是面临死亡，她也要维护王族最后的尊严。<br><br>“皇……不，苏尔嘉德！你想要谋反吗？”希露薇义正言辞地质问道。<br><br>苏尔嘉德呵呵一笑:“谋反？哈哈哈哈，陛下，什么才叫谋反？先祖苏利文一世，背弃了他同明王的允诺，加冕做了这东极皇帝。先皇苏利文三世，在苏利文二世活着的时候，毒死了已经成为皇储的大哥才上的位。为了巩固他的位子，他当皇帝的那些年打了多少仗，死了多少人，整个西尔斯城，已经抽调不出一个士兵，一斤粮食，那段时间我在议政厅里一睁眼就是那些民众交上来的积压如山的满纸怨言。”<br><br>希露薇没有反驳，她也无法反驳，苏尔嘉德说的是事实，是王室历来忌讳提及的真相，但她还是没有动摇，她是东极的皇帝，是未来的苏利文四世，她绝不能退缩。<br><br>苏尔嘉德吃力地走到她的跟前，他癫狂地掐住了希露薇的脖子，眼神中尽是贪婪。<br><br>“在争夺皇权的战争中，只有输家和赢者，没有平叛和谋逆！”',           
    sksn_suerjiade:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=#BEBEBE>幕政驭王权</font><br>姓名：苏尔嘉德·尤利文<br><br><li>【能力数据】<br>身份定位：主公，内奸<br>能力定位：专业型，控制<br><br><li>【背景故事】<br>苏尔嘉德怎么也没能想到，他居然也有被人算计的一天，他苦苦经营了多年的科恩城，在一朝一夕之间就被怀德乔那个蠢蛋给葬送了，亏得他还打算把怀德乔当成副手来培养，结果这家伙竟然是一个扶不起的公猪。还有那高戈里，什么将在外君命不受，他要的是和乌拉姆长期对峙，借以收缴南方各地兵权和贡粮，没让他直接把阿弗斯赫特给攻下来，那些领主一见战事平息，还肯将物资兵员掏出来吗？！<br><br>他气不打一处来，发疯般地将书房砸的乱七八糟，这一顿歇斯底里令王府的女仆和下人们心惊胆战的。服侍他的女仆跪倒在地，生怕触怒了这位大人。<br><br>“看什么？都给我滚出去！废物，都是一群废物！”苏尔嘉德破口大骂，将他们轰了出去。他瘫坐在椅子上，揉着太阳穴，心绪杂乱。<br><br>这时一位高大的身影从窗沿的帷幕中无声无息地走了出来，他面带着妖鬼面具，身着一层黑色的夜行衣，左腰上系着一个暗金色的纹章，上面刻着“暗”的符号。来者即是摄政王暗卫营统领——冯•克劳德。<br><br>克劳德单膝跪地，向苏尔嘉德行礼。“属下参见摄政王殿下。”<br><br>“哦，你来了啊，那件事情准备的怎么样了。”苏尔嘉德抬了抬手，让他起身说话。<br><br>“回殿下，我们已经成功地从拍卖场拿到了噬心莲，而且暗卫营的人最近已经安排进了宫廷近卫军，到时候您一声令下即可接管西尔斯城的守备。”<br><br>苏尔嘉德由怒转喜，对克劳德嘉奖道:“做的好，克劳德，幸亏有你在啊，不然我还真不好把计划继续实行下去。那你看科恩城这事，我该怎么处理。”<br><br>“殿下，恕属下直言，科恩城主怀德乔平日骄横跋扈，肆意欺压市民，已经不得民心，失败是迟早的事。不过虽然现在科恩已经脱离了我们的掌控，但我们同样可以借着科恩叛乱的机会，将高戈里调往东方，和哈里森对峙，让飞云渡不敢轻举妄动。”<br><br>“好啊，这样一来，就有了我们事成之后清理中央的时间了。到时候再收拾哈里森，他就是一支前有狼后有虎的孤军。”<br><br>“只是……属下有一事不明。”<br><br>“何事？但说无妨。”<br><br>“以殿下的权势，明明可以在希露薇公主登基之前就可以直接一步登天，为什么要还要等到现在呢？”克劳德知道，在先皇临崩时，明确地要把东极传给自己的兄弟，也就是如今的摄政王殿下，可摄政王却又扶持了希露薇公主登基。<br><br>苏尔嘉德愣了一下，他回忆起当年，苏利文三世强娶他的青梅竹马娜莎，致使苏尔嘉德一心投身于政治，娜莎皇后在生希露薇时难产而死。当时的苏利文三世正在南方打仗，是苏尔嘉德在最后时间陪在了她身边，皇后紧紧地握着苏尔嘉德的手，犹如儿时他牵着自己在山坡上奔跑一样……<br><br>在皇后死后，尤利文三世的性格就越发乖僻，他时常迁怒于人，总是吓的满城之人心惊胆战，他甚至怀疑自己的两个儿子要造反，便命苏尔嘉德秘密杀死了他们，苏尔嘉德为了自保，只能按他的意愿行事，所行所思如履薄冰。直到苏利文三世临崩时，这个昏庸的皇帝将苏尔嘉德唤到自己的身边，他所立下的唯一遗诏居然是让长的最像娜莎皇后的公主希露薇给他陪葬，为此，他不惜让苏尔嘉德继位做东极的四世皇帝。在尤利文三世驾崩后，苏尔嘉德在群臣的注视下缓步走到了希露薇的身前，公主呆呆地立在大殿的一侧不知所措。正当他想宣读遗诏时，他无意间瞟到女孩的眼睛，希露薇公主的蓝色眼眸令他回忆起了娜莎皇后，他迟疑了……<br><br>他没有遵循苏利文三世的遗命，反而径直将希露薇牵到了王座上，自己则以摄政王的身份在幕后把控着东极的权柄。<br><br>苏尔嘉德在往后十年间位极人臣，剑履上殿，赞拜不名，入朝不趋，在整个西尔斯城一手遮天，成为实质上的影子皇帝——尤利文四世。<br><br>只是最近希露薇越来越不听话，在言语和行动上频繁地与他相背，朝堂上的那些新派的势力也愈发强大，这让苏尔嘉德觉得自己的地位已经岌岌可危，于是他便要借此机会，绝除祸患。<br><br>“正是当年我一时心软，如今才走到了这种局面，所以这次机会我不会再放手了。”苏尔嘉德狠狠攥紧拳头，咬着牙说道。<br><br>噬心莲可以吞噬它人的灵魂，如果借用它的力量，那么苏尔嘉德就能在精神上控制希露薇，也就真正地将这个年幼的君主变成自己的傀儡和工具，绝除保皇派的二心。<br><br>苏尔嘉德抬头看着墙壁上先祖苏利文一世的挂画，画像上的皇帝英姿飒爽，正欲将一柄宝剑拔出鞘来。当时在雅各布离开后，西尔斯城内忧外患，所有事情如同一团乱麻，但苏利文一世成功地扫平了叛乱，并在之后加冕称帝，建立东极帝国这百年奇功。<br><br>苏尔嘉德不禁感叹道:“先祖留下的基业，我不能眼睁睁看着它被毁掉，雅维利这小子之前还说什么改革，简直是笑话。现在那些刁民都闹腾个不停，地方的领主天天写信跟我诉苦，不是说闹事就是说罢工。哼，要是真给了他们自由，这西尔斯城还不得被掀翻天吗？什么狗屁新政，统统都是无用的废纸，东极只有在我手里，才有未来……”<br><br>————————<br><br>苏尔嘉德漫步在皇宫的后花园中，希露薇则在后面陪同，只不过她无心赏花，她还不知道摄政王叫她过来是为何事。<br><br>“这朵花，是你种的吗？”苏尔嘉德的脚步停在了一簇三色堇旁边，他轻轻捻下一朵红色花，将它赠予希露薇，希露薇不知道此举是何用意，但还是接下了这朵红色三色堇。<br><br>“薇儿谢过皇叔，只是皇叔平日里从来都不来这宫廷的花园，薇儿也不知道皇叔喜欢哪种花，索性就都种了一点。皇叔今天来……是有什么事情吗？”希露薇轻声问道，她不知道这个老狐狸在想些什么东西，雅维利曾提醒过她，在摄政王面前要时刻注意自己的一言一行。<br><br>“没什么，只是想起来一些过去的事罢了。”苏尔嘉德背过身去，他大致地瞥了一眼这偌大的花园，在光魔法的加护下，各色鲜花不遵季节，竞相开放，这让他想到了儿时的那片山坡，虽然花不多，而且大多都是杂草，但他却在那地方将自己的一生所爱都给了那个女孩，可她到最后却做了别人的新娘……<br><br>摄政王在此之后，便失去了对爱情的期望。他谁也不娶，也不收养孩子，直到今天还是孤身一人。直到娜莎皇后临终时，他也从未展现出自己的真实情感，只是做了一个臣子应尽的本分，这也让尤利文三世对他尤为信任。<br><br>“如今南方战事已平，我欲嘉奖南方将领。不知陛下意欲如何。”苏尔嘉德突然打断了希露薇的思绪。<br><br>“南方战事能够胜利，多亏皇叔在中央日夜操劳，过两天就是皇叔六十寿辰，薇儿想沾沾这胜利的喜气，为皇叔祝寿。不如就同这嘉奖宴合办，也更热闹一些。”希露薇请示道。<br><br>“你现在真是越来越像你母亲了……”苏尔嘉德盯着希露薇的眼睛感慨道，他摆了摆手，不等希露薇回应，便带着侍从自顾自地走远了。<br><br>希露薇孤零零地站在原处，手上还拿着一朵红色三色堇。她突然有些困惑，她感觉这个在东极呼风唤雨，权势滔天的摄政王，言语中隐隐约约的有一种说不出来的悲伤……',
    sksn_xiluwei:'<li>【基础信息】<br>技能设计：§<br>故事：爪巴<br>称号：<font color=#EA7500>凰权女帝</font><br>姓名：希露薇·尤利文<br><br><li>【能力数据】<br>身份定位：主公，忠臣，反贼<br>能力定位：辅助型，控场<br><br><li>【背景故事】<br>苏尔嘉德死死掐住了希露薇的脖子，希露薇不断挣扎着，她用力拍击苏尔嘉德手上的伤口，苏尔嘉德吃痛，只能松开她。<br><br>希露薇瘫跪在地上不停喘着气，她看向苏尔嘉德，眼睛里没有丝毫恐惧。<br><br>“别用你的眼睛瞪我，你还配不上它！”苏尔嘉德使劲的扇了希露薇一巴掌，他从来都没有如此动怒过，这双眼睛，明明是那么美丽无瑕，却长在了自己仇敌的女儿脸上。<br><br>苏尔嘉德大手一挥，一把金色细剑出现在他的手心中，他将剑尖抵在希露薇的脖子上，他想看到这个年幼的皇帝在死亡前惊恐求饶的表情，他想看到苏利文三世的子嗣给他跪下祈求生路的样子，但希露薇没有任何动作，她只是轻轻地说道:“即使是死，我也绝不会屈服。”<br><br>苏尔嘉德咬牙切齿地恨啊，这句他最想从那个人口中听到的话居然被希露薇给说出来了。<br><br>“混蛋……”苏尔嘉德正欲刺死希露薇时，大殿突然“轰”的一声被炸开了一个口子。苏尔嘉德赶忙回头，发现克劳德真急匆匆地冲上殿来，随身的还有四五个暗卫。<br><br>“殿下快走！我们中计了，宫廷军已经脱离了我们的掌控。”<br><br>“怎么会？宫廷军的长官不是已经被我们控制了吗？还有谁能调动他们？”苏尔嘉德怒不可揭。<br><br>“是哈里森来了！哈里森带着几千人已经赶到皇宫外，他们拿着皇帝的手谕，我们的人还没来得及动手，宫廷军直接被接管了。”<br><br>“什么？！”苏尔嘉德难以置信地拽着克劳德的领子。哈里森之前明明还在飞云渡，怎么一转眼就直接出现在了西尔斯城，难道……难道从一开始，他就被算计了吗？<br><br>“殿下快撤吧，他们马上就要冲进来了！”克劳德拉着苏尔嘉德，打算撤退。可苏尔嘉德不甘心地死死瞪着希露薇，他举起长剑，向她刺去。<br><br>但在剑刃距离希露薇仅仅半毫时，他犹豫了，那双如蓝宝石般的眼睛静静地看着他，苏尔嘉德仿佛在这瞬间回到几十年前，女孩湛蓝色带着坚韧和不甘，她挥手同他道别，也向自己的人生诀别……<br><br>“放开她！”一道凛冽的气浪击在苏尔嘉德持剑的手臂，将他的金色长剑弹飞。雅维利带着一众披甲侍卫冲破了暗卫的封锁，往大殿内涌来。<br><br>克劳德见势，也顾不得寻求苏尔嘉德的意愿了，他直接引爆了一张雾符，在烟雾的掩护下带着苏尔嘉德遁入影子中，消失不见。<br><br>“薇儿！”雅维利冲到殿内，跑到希露薇身边将她扶起来，希露薇惊魂未定，她刚才有一瞬间认为自己已经被杀了。<br><br>“我没事……雅维利，我没事。”希露薇平复了一下呼吸，向他问道:“现在我们是成功了吗？”<br><br>雅维利点头，然后单膝下跪，向希露薇汇报道:“陛下，西蒙和哈里森率领三千余人，从飞云渡星夜兼程，秘密进驻西尔斯，目前我们基本上控制了整个西尔斯城，只有北部几个由苏尔嘉德掌控的军营未能被收编。宫廷军已经被解除了武装，现在皇城里除了摄政王的府卫，所有的抵抗力量尽已消灭。”<br><br>希露薇点了点头，他看着那些蜷缩在殿内角落里的诸位大臣，失望地摇了摇头。<br><br>“对了，格雷尔卿现在在哪里？”<br><br>“已经被我们的人给接应到了，说起来这次反攻的信号，还是他给的。”<br><br>“可格雷尔卿是如何传递信号的？”<br><br>“格雷尔大人在离开大殿时，曾说‘夜明星不明’，如果一个晴朗的夜空中群星暗淡，那便只有一种可能——曜日东升，所以我猜他的意思是哈里森的东部军已经到达了皇城，他们现在需要有人指引，所以我悄悄离开，和西蒙他们会合。”<br><br>“还真是委屈他了……”希露薇回想起那个巍然屹立的身影，感慨道。<br><br>雅维利看了一眼杂乱无章的宴会场，对希露薇请示道:“请陛下下令全城警戒，捉拿叛贼苏尔嘉德，我们绝对不能让他逃出西尔斯城。”<br><br>希露薇摇了摇头，她站起身来，看着殿外的天空。<br><br>“不必了，我知道他在哪里……”<br><br>——————<br><br>苏尔嘉德被克劳德从阴影中拖了出来，映入眼帘的是摄政王府的书房，苏尔嘉德气愤地将房屋里的家具砸了一个遍。<br><br>“殿下，恕属下直言，眼下我们应该离开西尔斯城，和南方高戈里军汇合，再做打算。”<br><br>“离开，到哪去？我现在什么都没了，你让我去见高戈里？那个混蛋肯定会把我的人头送给希露薇，用来巩固他自己的地位和军权。”<br><br>克劳德不敢出声。<br><br>“不，我还没输，我还有一个底牌没用呢。克劳德，拿着这个钥匙去东边的皇城宝仓，里面有一个东西，只要拿到了它，我就还有机会。”苏尔嘉德将一把镀金的钥匙从自己的口袋里取了出来，他紧紧攥着这把他从未在任何人眼前掏出过的钥匙，郑重地交给了克劳德。<br><br>克劳德接过钥匙，突然邪魅一笑<br><br>“属下遵命……”<br><br>他从腰间弹出一把匕首，直直捅进了苏尔嘉德的腹腔。苏尔嘉德惊悸地瞪着克劳德。<br><br>“克劳德……你……”<br><br>克劳德将钥匙收到了自己的阴影里，他的右手死死握着匕首的刀柄，病态的说道:<br><br>“对不起～殿下，属下自始至终都不是殿下的人呐～”克劳德突然被一团黑雾包围，只露出两只碧绿色的眼睛，待黑雾退去后，一个妖娆的黑发女人出现在苏尔嘉德的眼前。<br><br>“你是……高泽斯？！”苏尔嘉德难以置信，魔能之地的东部领主，无相妖魔高泽斯•拜蒙，居然伪装成了克劳德，在长明之战后躲在西尔斯城的暗处休养生息，一直在他身边潜伏了三十余年。<br><br>高泽斯妩媚一笑，一颦一眸都透露着致命的诱惑，令人浮想联翩，她将手指放在苏尔嘉德脸上，指甲刺破肌肤，划开了一条猩红的口子。<br><br>“被绝望所侵染的失败者的血肉，听说很美味呐，殿下，我曾说会过追随您一辈子，那么殿下就奉上自己的身体，成为我的一部分，和我永远地在一起吧～”<br><br>苏尔嘉德冷哼一声，他手中汇聚出一道火焰，直接拍在了高泽斯的胸口，将她击退了数米，但自己却因伤势过重喷出一口鲜血。高泽斯气急败坏，她整理好狼狈的妆容，唤出一把骸骨长枪，打算直接了结了苏尔嘉德。但这时外面突然传来了破门而入的声音，追拿摄政王的卫队闯入了王府的大门。<br><br>“该死，真是败我兴致，算了，反正东西到手了，我就不打扰你和你的亲侄女叙旧了……”<br><br>高泽斯鬼魅一笑，消失在黑暗中。<br><br>就在同时，希露薇破开书法的大门，冲了进来，她渐渐停下了脚步，看到倒在书桌旁，伤口还在不停流血，眼睛紧闭的苏尔嘉德。<br><br>“叫医生！快！”希露薇对后面的侍从吼道，她赶紧上前扶住了苏尔嘉德，将他的头靠在自己的肩膀上，右手汇出一团金色的圣光，覆盖在苏尔嘉德的伤口上。苏尔嘉德感受到治愈的圣光，他睁开了眼睛，忽然感觉世界很安静，他所有的不甘，所有的愤怒，好像都在这如同天使的黎羽般的圣光中无声无息地化解了，他抬起头，看到了满脸担忧的希露薇。<br><br>“娜莎……”他缓缓地唤出他已经几十年都没有说出的名字。<br><br>希露薇紧紧牵住了他的手，她看见苏尔嘉德目不转睛地看着她，却又像是在看另一个人。<br><br>娜莎……是她母亲的名字，希露薇从未见过母亲，在她出生后，娜莎皇后便因难产身亡。但听哥哥们说，母亲这一生并不幸福。哥哥们整理过母亲的遗物，那里有一个破旧的日记本，在那上面，她看到了自己母亲的过去。<br><br>娜莎从来都不是一个会轻易屈服的人，她委身于苏利文三世，实际上是为了保护一个人。当年，苏利文三世拿这个人的性命相要挟，娜莎没有办法，只能屈从于他，但据哥哥们说，母亲从来都没有开心的笑过，她厌恶苏利文三世，她甚至也厌恶同他所生下的孩子……<br><br>希露薇早就知道了苏利文三世的遗诏究竟上写了什么，他也明白母亲为什么讨厌他们。她知道，身前的这个在生死线上徘徊的男人是母亲一生的遗恨。<br><br>“不，你不是她……你不是她……呵呵呵，我失败了……希露薇，你终究还是蜕变为一位可以统御天下的皇帝了”苏尔嘉德笑道。<br><br>“说起来，这权谋之术我还是从皇叔那里学到的。薇儿小时候背不会的书文，还是皇叔拿着戒尺将薇儿打到哭才记住的。”希露薇苦涩地笑道。<br><br>“是啊，那么，希露薇，下面我说的你都要记住了……”苏尔嘉德将北部营区的兵符从腰间解下，用颤抖的左手将它递给了希露薇。<br><br>“我死了之后，那些领主，各地的将军都不会安分的，高戈里拥兵自重，在我之后没人能制约的了他，所以为了西尔斯城的安危，你得把能掌控的兵权牢牢握在自己手里，西蒙那小子虽然我看不惯他，但是……要除掉高戈里，你必须还得听他的……另外，高泽斯……她去了东部宝仓，想对付她你还得请求长明殿先知的帮助，咳咳”<br><br>“高泽斯自会有人去收拾她的，皇叔……先别说了，你再坚持一会儿，医生就快要到了。”<br><br>“没用的，那匕首上有毒，我撑不到那时候了。希露薇……我没有后代，你算是我苏尔嘉德在世上唯一的亲人，现在你赢了我，成为一个真正的皇帝，那么之后也就再也不能回头了。一个统御天下的皇帝，不能在别人面前随意透露自己的感情。”苏尔嘉德用尽了最后的力气交代道。希露薇点头应下，她不知道该说些什么。<br><br>“我苏尔嘉德这辈子殚精毕力，庇护西尔斯城于危难中，无愧于先祖，无愧于东极……只有一人……我欠的太多了……”<br><br>苏尔嘉德瞳孔失去了光亮，这个东极地位最为显赫的政治人物，在西尔斯城呼风唤雨的影子皇帝，在东极新任女皇希露薇的怀抱中，走完了他的一生……',
    sksn_wuruiya:'<li>【基础信息】<br>角色设计：§<br>故事：爪巴<br>称号：<font color=#5B00AE>身陷虚无</font><br>姓名：乌瑞娅<br><br><li>【能力数据】<br>身份定位：反贼，忠臣，内奸<br>能力定位：斗士型，防御，拆迁流<br><br><li>【背景故事】<br>乌瑞娅曾经是一名声名显赫的人物，在西尔斯城中可谓是无人不识，她幼年时被苏尔嘉德提携，加入了王城守备军，成为了摄政王的贴身近卫，终生恪尽职守，帮助摄政王处理了一个又一个的危机。<br><br>但因一封密信，摄政王对她的忠诚产生了怀疑，她不知道是谁写信诽谤她，她从未有过二心，可摄政王多疑的性格使他渐渐疏远了乌瑞娅。直到一名刺客的出现，乌瑞娅因为密信的事浑浑噩噩而没能在第一时间戒备，使得刺客近了摄政王的身，虽然刺客的萃毒匕首没能刺中苏尔嘉德，而后刺客也被反应过来的乌瑞娅斩杀，但摄政王依旧雷霆震怒，他严厉地呵斥乌瑞娅，然后将她调离了近卫军。<br><br>乌瑞娅对自己的失责深感内疚，她跪在摄政王府的门前，请求苏尔嘉德能再给她一次将功赎罪的机会，她愿为他做任何事。摄政王思索再三，决定给她一个机会，派她前往飞云渡监视哈里森的一举一动。<br><br>乌瑞娅不远万里，风雨兼程的赶到了东部前线，这时飞云渡刚刚成功抵御了第三波兽潮，哈里森和西蒙正策划着趁敌人修整时反攻鹰角域，见乌瑞娅到来，便将这个重任交付了她。命她带一队精英共200人前往鹰角域追击奥克佩特。<br><br>“乌瑞娅是一个忠义之士，这样的人在东极可不多见了，你就这么忍心让这朵纯净之花凋零吗？”哈里森惋惜道。<br><br>“我对忠义之人向来抱以最大的敬意，但在权力的斗争中，从来都不存在无辜者。”西蒙轻叹一声，雅维利的这招离间技虽然有效，但可谓是真不光彩。<br><br>兽潮虽然已经退散，但飞云渡同样是弹尽粮绝，可鹰角域的魔头居然不趁机进攻反而撤退到陨落天，这不禁令哈里森感到困惑，他不能确定这是否是敌人的诱兵之计。所以他需要人去探察一番，正巧摄政王将乌瑞娅安插进来。<br><br>“雅维利……我就替你小子收个尾吧。”西蒙说罢，便将地图上的鹰角域划了一个叉。<br><br>——————<br><br>空无一物的鹰角域就是一个陷阱，漫天的迷雾席卷而来，恐怖的莽血魔王率领着黑压压的魔物大军将她们团团围住。因为数量差距太过悬殊，乌瑞娅只能眼睁睁地看着随她而来的战士们被杀死，被撕碎，直到最后只剩了她一人……<br><br>“吼吼吼，东极是没人了吗？居然让一个女人来前线送死！”奥克佩特挥舞着血刃大刀嘲讽道。在他身前，乌瑞娅倚靠在战友的尸体身旁，咬牙切齿地瞪着这个牛头怪物。<br><br>乌瑞娅捂着不断流血的伤口，咬着牙喘着粗气，却一声不吭，奥克佩特见此感叹道:“就带来这么一点兵力来魔能之地，看来你就是一枚弃子啊……那么我倒是有些同情你了，如果你要是做我的女人的话，我就饶你一命，如何？”<br><br>但乌瑞娅拒绝了，她朝奥克佩特的牛脑袋吐了口水，奥克佩特恼羞成怒，一刀贯穿了她的胸口，同时，那些张牙舞爪魔物冲了上来，撕咬着她的身体，乌瑞娅只能奄奄一息地看着自己被肢解被凌辱，但她用尽最后的力气一拳砸死了一只低级魔兽……<br><br>当乌瑞娅再度睁开眼睛时，一切都变了，诡异的力量萦绕在她的身旁，她的样貌，她的外表都发生了变化，她努力地回忆自己曾经的记忆，但那些支离破碎的片段渐渐消散，什么荣耀，准则，在她被怪物蹂躏时就都已经破碎了……她如今的心中只有深深的绝望和孤寂……<br><br>“重获新生的感觉如何……”一道空灵婉转的声音从她的身后响起。乌瑞娅回头看到一个赤着脚丫，身上仅仅披着几片破麻布的大约十二岁的女孩缓缓向她走来，女孩轻轻抬起了她的左手，一团紫色的幽萤从她手中脱离，向是轻纱一般笼罩住她的面庞，渐渐地，她的负面情绪得到了平息，她开始重新审视自己<br><br>她像是披上了一层脱不掉的黑色铠甲，那些曾被魔兽撕咬的肌肤转化为了半透明的样子，她的瞳孔散发着幽暗的靛蓝色荧光，她感受到自己的身体内有种暴戾的力量在不断运转着。她看向面前的这个神秘的女孩，这个身体如同羊脂一样洁白但却满身伤痕的女孩，乌瑞娅仿佛也能感受到她曾经遭受的一切，她和她好像有了共情，她仿佛看到在那稚幼的外表下，潜藏的比大洋深渊还要空洞的虚无。<br><br>“曾经的乌瑞娅已经在战场上死去了，虚无赋予你了新生，所以要好好为祂工作哦。”女孩伸出手说道，乌瑞娅不受控制地点了点头，牵住了她的手。<br><br>然后，乌瑞娅被一片黑暗笼罩，渺无音讯。',
    sksn_yilian:'<li>【基础信息】<br>技能设计：§；琉璃菠萝<br>故事：爪巴<br>角色配音：棠梨<br>称号：<font color=#FF60AFC>大嘤萌主</font><br>姓名：伊莲<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，玄学改命<br><br><li>【背景故事】<br>“我说，你真的是来西尔斯做生意的？”在行进的马车上，翩跹掐着腰，盯着东方弘道的眼睛质问道。<br><br>“自然，只不过和我交易的对象的身份有些特殊而已。”东方弘道嘿嘿一笑，然后挼了一下趴着他大腿上打盹的伊莲头顶的耳朵，小伊莲一激灵，立即清醒了过来，抬头便看到东方弘道的手正在理顺她的发丝。她脸上立刻泛起一片绯红。<br><br>“主主主……主人，对不起，伊莲一不小心睡着了。”随着马车的颠簸，翩跹头顶的两只耳朵一抖一抖的，可爱极了。<br><br>“没事，我只是提醒你一下，我们就快到目的地了。”东方弘道宠溺地刮了一下伊莲的鼻尖，这让伊莲本就红彤彤的脸蛋更加诱人。一旁的翩跹撅起嘴用不屑地声音小声骂道:“呸，浪荡子。”<br><br>不久后，马车停靠在了一座金碧辉煌的大型圆顶建筑前，这是西尔斯城也是东极最大的拍卖场，当然，并不是谁都能进的。今天这场好像就是一个正常的宝物拍卖，估计也不会发生什么龙傲天少年为了救人打砸烧抢坏的事。东方弘道将伊莲和翩跹牵下了马车，然后直接向会场内走去。<br><br>“这位先生，请出示您的证件。没有证件不能进入会场。”一个站在会场门口的接待员拦住了东方弘道一行，他瞟了一眼躲在东方弘道身后两位女孩，一个身装华丽，看起来不是贵族就是商人家的大小姐，而另外那个身披斗篷的娇小女孩，她的绿色竖瞳昭示着她并非人类。在东极这很常见，毕竟哪个权贵老爷没养着几个“宠物”呢？“当然，如果您是来出售商品的话可以另谈。”<br><br>东方弘道瞪了他一眼，然后将一张铭牌甩给接待员，后者仔细查验后将他还给了东方弘道。<br><br>“原来是科恩的尼塔玛德先生啊，小人失礼了，不过听说科恩城最近不太平啊。”接待员说道。<br><br>“管好你的嘴，不该问的最好别问。”东方弘道将一张金券塞到服务生的口袋里，后者立刻换上一副职业笑脸，毕恭毕敬地招呼着东方弘道一行进了拍卖场。<br><br>“好家伙，还真是见钱眼开。”翩跹不满地嘟囔道。<br><br>“这位小姐，做我们这行的，自然要为最有价值的客户提供最尊贵的服务。”他也不生气，反而自我调侃了起来，看样子也是个职场老油条，干他们这行的，最重要的就是脸皮比铁锅厚。<br><br>不一会儿，他们便被他领到了二层一处雅间里，接待员微微颔首:“请诸位客人稍等片刻，拍卖马上开始，如果有什么需要的话，可以摇铃呼叫我。那么，我就先告辞了，祝您接下来能拍到自己想要的宝贝。”他将门关上后，伊莲才将兜帽摘下，她长呼出一口气，露出了两只毛绒绒的猫耳朵。<br><br>东方弘道大概看了一圈，这VIP室就是气派，可以直接纵览拍卖会场的展台，隔间的墙壁上挂着价值不菲的油画，四周还摆放着各种艺术品，最显眼的茶几上是几盘新鲜的瓜果和各种各样的小甜点。<br><br>“主人，这些点心伊莲能吃吗？”猫娘的眼睛闪着小星星，她第一次见到这些琳琅满目的点心和水果，口水都快要流了出来。她扯着东方弘道的袖口，卖萌道。<br><br>“吃，当然得吃，反正都已经花钱了，不吃白不吃。”没等东方弘道回答，翩跹便将一块蛋糕塞进了自己嘴里。紧接着她捏起一个樱桃，投喂给了伊莲，伊莲第一次吃这种水果，兴奋地连耳朵都竖了起来。翩跹见此直接将伊莲搂到身前又亲又抱，嘴里还说着什么伊莲真可爱让姐姐康康之类的奇妙词语。<br><br>“行了，咱们又不是过来买东西的，仔细盯着下面这些人，看看有没有我们要找的那位。”东方弘道环视着下面所坐的人群，发现了一个行踪可疑的蒙面人，他的身披黑色便衣，一副生人勿近的模样。可东方弘道知道，这可以摄政王暗卫的标配啊，这一身黑不溜秋的装备，跟刚从煤坑里爬出来的一样，所以摄政王家里是开煤矿的吗？需要不要头上再系个照明灯？<br><br>之后的拍卖场就充斥着各种叫价和叫骂，各大家族各大派系互相给对面使绊子，放狠话，反正志在必得的flag一立，就肯定立马会被打脸。有个看样子就是扮猪吃老虎的金发少年，惹了他周围的一圈虎背熊腰的大汉，估计之后这些人就想去杀人越货然后被反向教育，唉，真是无聊啊。这场拍卖会下来，东方弘道并没有看到什么感兴趣的东西，居然连压轴的亚人奴隶这种环节都没有，还亏得是个奴隶制国家，平角裤平角裤。但那个黑衣人貌似以高价拍到了一个叫做噬心莲的东西，只见拍卖结束后，他便急急忙忙地离开了会场。<br><br>“我们该走了。”东方弘道伸了个懒腰对着翩跹说道，但翩跹无奈地指了指蜷缩在沙发上睡着的伊莲，东方弘道上去轻轻摸了一下她的脑袋，伊莲就迷迷糊糊地蹭了蹭他的手心。<br><br>“算了，就让她睡一会吧，你就在这里陪着她，我去去就回。”东方弘道交待道。<br><br>“你不会真的要插手王室的事吧。”翩跹担忧地问他。刚刚那个黑衣人她也认的出来，摄政王苏尔嘉德的暗卫的标志太明显了，但同样也在宣誓着其主人身份。<br><br>东方弘道慢慢顺着伊莲的猫耳，伊莲的呼吸渐渐安稳，脸上露出享受的表情，好像很喜欢别人抚摸她的耳朵。<br><br>东方弘道看着熟睡的伊莲，会心一笑。他的声音虽轻，但却令翩跹感到一丝寒意:“以前的我只关心结果，走的太急反而失去了很多东西……现在，我想一一把它们都拾起来。他们谁赢谁输对我而言毫无意义，只是有一件事，我必须亲自完成……”<br><br>————————<br><br>癸在拍得了摄政王交代的噬心莲后，就将它放在一个木匣内，他小心翼翼地避开所有人的目光，转进了一个小巷，这时他听到从头顶传来了一道低沉的声音。<br><br>“看起来你已经完成我交代的任务了。”东方弘道披了一个黑色的行装，并用面具遮住了自己的脸，然后从房顶跳了下来，这种登场方式虽然老套，但神秘感和逼格十足，对方智商直接减50%。<br><br>“克劳德大人，您怎么亲自来了”癸仔细一看这个打扮，分明就是他的顶头上司，暗卫营的统领冯•克劳德。但他却抱有一丝怀疑，毕竟克劳德大人神出鬼没，从来就跟他们这些暗卫营的小人物有什么交集，怕是有人在伪装。<br><br>“怎么，现在暗卫营的人见到本统领居然都不行礼了吗？”东方弘道看出了他的疑虑，便使劲捏了一下口袋里塞着的魔蛙，魔蛙受到攻击会立刻就释放出堪比一只高级魔兽的威压，强大的压迫感刹那间便笼罩在癸的身上，使他喘不过来气。<br><br>是真的！这等可怖的威压也只有克劳德大人才有，看来真的是统领大人，于是他赶紧下跪说道：“望大人恕罪，属下一时走神，大人交代的事，属下已经办妥了。”癸赶紧将木匣呈上。<br><br>“哼，吾来是告诉你，摄政王大人命你从拍卖场再寻一物，同噬心莲一并交付。”东方弘道接过木匣放在一边，然后不紧不慢地说道。<br><br>“再寻一物？可属下要再寻什么呢？”<br><br>“一种名为萨雕的猛禽，这对大人的计划有很大的作用。”<br><br>“是吗？那属下会尽力去寻，可这萨雕属下实在不知是何物，能否请大人告知这是哪个地方的奇兽？”癸从来都未听过这个名字，但既然是摄政王大人交代的任务，那么他便得先问清楚才能确保没有任何差池。<br><br>东方弘道招呼他上前，然后嗤笑道：“这都不知道？废物!你听好了，萨雕只有萨毕城才有。”<br><br>“那这萨毕城在什么地方？是北部领的城邦吗？”癸并不记得东极有萨彼城这种地方，难道是新建的城池？<br><br>正当他思索的时候，东方弘道突然从背后掏出一把闪着银光的匕首，径直捅进癸的心脏，嘲讽道:“萨毕城当然在萨毕多的地方啊！”<br><br>东方弘道攥着刀把使劲一拧，还没等癸发出哀嚎，便令他断了气。东方弘道解下了癸腰间的纹章，然后将尸体用火焰法术焚烧，再往地面泼了几盆水冲干血迹，整个流程一气呵成，丝毫不拖泥带水。他捡起了遗落在地上的木匣，将里面的噬心莲取出，并放了一个东西进去。然后他便幻化成了癸的模样，消失在了小巷中……',
    sksn_nuoya:'<li>【基础信息】<br>角色设计：愉渊<br>故事：爪巴<br>称号：<font color=#9999CC>暗夜雷光</font><br>姓名：诺亚<br>角色配音：陆寿<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：专业型，欧皇非酋检测机<br><br><li>【背景故事】<br>所以他就是摄政王派过来的联络人？”诺亚不可思议地盯着这个被他放倒在地上不省人事的黑衣人，向着在他旁边摸尸的黑发少年问道。<br><br>“看这身行头是苏尔嘉德的暗卫，代号好像是叫什么……寅？”东方弘道将黑衣人腰上系的纹章抛给了诺亚，嘴里还嘟囔着什么非酋啊爆率之类的奇怪词语。<br><br>这月黑风高的时候正适合杀人越货，但他明显是没扒到什么有价值的东西，一个联络情报员身上居然连个密信都没有，简直离谱。不过这也并不影响原先预定的计划，今夜，他们要在科恩城搞个大新闻。<br><br>诺亚拿出一张卷轴，将上面绘画的赤红色符号按到自己的右掌心中。东方弘道捏碎了黑衣人的纹章，从手中又复刻出两枚质地几乎一模一样的，只不过上面的字略有些不同。<br><br>“话说，这东西真的管用吗？怀德乔可是一个媲美紫金级的强者。”诺亚观摩着掌心的符号，在他雷电之力的加持下，这些符号如同有了生命一般，散发出暗红色光芒。<br><br>“放心吧，只要你能碰到他的身体就行。如果是别的领主我可能还得再三考虑，但谁让咱遇上的是科恩城的这位啊。”东方弘道露出一丝奸笑，诺亚满脸黑线，悄悄远离了他，他明白虽然自己的力量源自黑暗，但跟面前这家伙比起来简直是小巫见大巫，东方弘道看样子就像是一个邻家的阳光男孩，但诺亚无比清楚，他的心是黑的。<br><br>————<br><br>科恩的领主，贵族怀德乔侯爵在结束了一天的巡视工作，在侍从的带领下回到了领主府的书房，但当他推开门时，却感知到一丝异样。<br><br>“两位客人深夜到访，所为何事啊？”怀德乔轻蔑地一笑，只见诺亚和东方弘道从一处阴影里现身并走了出来，这倒让一旁护卫的侍从们惊出了一身冷汗，连忙架起长枪，却不敢轻举妄动。<br><br>“领主大人好生健忘，今天可是每个月例行的联络日，我等是受摄政王殿下派遣，代替寅前辈来与大人进行之后的联络。”东方弘道示意诺亚将身份纹章交给怀德乔。<br><br>诺亚一声不吭，将两枚纹章递给了怀德乔。根据东方弘道讲的，只要不说话，就不用担心说错话，再加上一个冷漠的表情，一副生人勿近的样子，看上去就是那种不好惹的绝世高手，这样别人就不会轻易试探他。怀德乔明显是被他的姿态给唬住了，表情逐渐严肃起来。<br><br>“这是苏尔嘉德大人暗卫的纹章？不知两位是何人？前来科恩所为何事？”怀德乔接过了身份纹章，仔细端详着东方弘道和诺亚，他看不穿两人的实力，也感受不到他们气息中所蕴含的情绪，不过有一点可以肯定，纹章的材质是真货。<br><br>“请恕我等不能告诉大人自己的真名，不过为了方便沟通，我可以告诉大人我的代号是堞，我同伴的则是倏。我们都是摄政王殿下暗卫营中纽碧营的暗卫。”东方弘道收回纹章，恭敬地鞠了一躬。诺亚见状也学着鞠躬。<br><br>“堞，倏……”怀德乔仔细一想，这的确是摄政王苏尔嘉德暗卫的单字起名风格，听着云里雾里的，显得非常神秘。<br><br>“哦？我听着这位堞的声音，不像是本地人啊。”怀德乔眯缝着眼睛说道，在此之前，他要先确定这两人的真实身份。<br><br>“回领主大人，我来自北方领的一个小村落，早年受摄政王殿下点拨，便潜心修炼，后来如愿加入暗卫，以报摄政王殿下的知遇之恩。”东方弘道对答如流，这说谎不打草稿的本事把一旁的诺亚给看的一愣一愣的。<br><br>“原来是北方领的，也难怪，哦对了，摄政王大人现在还喜欢去北方赏雪吗？”<br><br>“领主大人是记岔了吗？摄政王殿下可从未有这种闲情雅适，殿下为东极忙里忙外，哪有休息的时间啊。”东方弘道摆出了职业笑脸，诺亚却不禁紧张起来，刚刚这个老狐狸明显是在用问题诈他们。<br><br>怀德乔满意地点了点头，作为一城之主，他见任何人前都会给自己留个心眼。刚刚就编造了一个幌子诈了一下面前的两人，但对方却如实的回答了，看这行头和风格的确是暗卫营才能教出来的，那么他们前来的目的应该不仅仅是传递军务。<br><br>“领主大人，我们长话短说吧，摄政王殿下此次派我们前来科恩，是为了传达一个口谕。”东方弘道用眼神瞟了瞟房间内的其他侍从，怀德乔马上就领会道了他的意思。他摆手道:“都退下吧，之后没有我的命令不许进来。”<br><br>侍从行过礼后便转身离开，并将房门带上，偌大个书房如今只剩了三个人。怀德乔转过身来恭敬地询问道:“不知堞大人和倏大人带了摄政王殿下的什么口谕呢？”<br><br>“摄政王殿下得到了一本古书，在书上所记载的一段漫长的历史中对圣光有了新的领悟，总结出了十四字秘诀，所以急忙命我们前来知会领主，助领主能早日突破桎梏，冲击超凡。”东方弘道不紧不慢地说道。<br><br>“太好了，苏尔嘉德大人果然是东极的荣光，看本古书都能有所领悟，吾辈万万所不能及啊。那么大人所领悟到的十四字秘诀究竟是什么？”怀德乔心切的问道，摄政王给他带来的秘诀可能就是他苦苦寻找的契机。如果真的能从这种秘诀感应出什么，那他的实力将逼近紫金级的顶峰，就连哈里森和高戈里恐怕都不是他的对手。<br><br>“摄政王殿下在书中的漫长历史里领悟到的就是——”诺亚示意他上前附耳倾听，怀德乔面露饥渴地凑了上去。<br><br>“人类是有极限的——”突然，东方弘道从后方直接捂住了他的嘴。<br><br>“所以我不做人了！”诺亚见状一掌拍在了怀德乔的胸口，霎那间紫色雷霆从他掌中迸发，被激活的暗红色纹路从怀德乔胸口瞬间蔓延到全身，东方弘道赶忙松开双手向后闪身退去，只听见澎的一声，强大的电流将房间的墙壁劈的黝黑。怀德乔口中冒烟，两眼翻白，仰面倒了下去。<br><br>“没想到这个符文居然真的能引爆人体内的灵力，让一个堪比紫金级冒险者的强者瞬间失去战力。”房间内的霹雳逐渐停息，诺亚盯着自己右手上那已经失去了光泽的红色画符，惊叹道。<br><br>“怀德乔早年曾在长明殿效力，圣光赋予了他永不消散的灵力护体，所以怀德乔才不会时刻防备别人的偷袭，甚至刚才让你如此近身，我不过是恰好利用了这点罢了。灵爆符文会引爆一切它所能接触的灵力，对手灵力越充沛威力就越大。你没有事的原因是因为你的力量实质是魔能，所以不会受灵爆的影响。”<br><br>“魔能……你已经知道了吗。”诺亚握紧了拳头，肃然而立。<br><br>“事实上从你我刚见面时，我就知道了。”东方弘道正视着诺亚那如同璀璨宝石般的紫色眼眸，虽然诺亚隐藏了自己的黑暗气息，但他仍然能看出一丝端倪，不过他也没曾想到，居然真的有人能掌控魔能。<br><br>“那你为什么不向教会检举我……毕竟我这种存在，对于东极来说就是个危险的敌人。”诺亚低下头苦涩地问道，这种事他已经见的太多太多了，在遇到东方弘道之前，他曾经向很多人寻求过帮助，但他们无一例外地拒绝了他，甚至有的人还拉响警报致使教会的人追杀他。<br><br>东方弘道没有立刻回答他，他知道这一切的根源是什么，人类对魔物，对亚人，甚至是对他们自己的同胞，都得分个尊卑优劣。划分的根据不是品行，而是出身。怀德乔作恶多端，却时刻被圣光护佑，有的人虽然堕入黑暗，但却仍然在为了人们而战，魔物之心仍存善念，人类之中亦有蛆虫。强调出身的尊卑，地位的高低，自以为是万物之灵长，要做那瞧不起别人的人上人，这简直就是一个笑话。<br><br>“诺亚……在这片大陆上，偏见才是人类最大的敌人。”<br><br>“偏见……”诺亚重复着这个词语，当时的他，也受尽了他人的偏见……身为人类和魔物的混血，他平日受尽了周围人的白眼，在角色扮演游戏中，他始终是被打败的“魔王”。他的母亲厌恶他，因为诺亚是代表了她被俘时受尽屈辱的产物，是魔物在她身心里留下的阴影。<br><br>诺亚自知是怪物的子嗣，所以他总是极尽谦卑，就算被欺负被殴打，也不会反抗，甚至吭一声。因为在东极，杀死一个有威胁的魔人是不用负任何责任的。<br><br>他曾以为同龄的孩子没有被世俗的恶念侵染，不经世事的孩童是最真诚的，他可以同他们毫无顾虑地成为朋友，他已经不想再孤身一人……<br><br>可当那些所谓的天真烂漫的儿童，将他一步步逼到悬崖峭壁，嬉闹着把他推了下去的时候。他明白了一切，在诺亚跌落山崖时，他看到动手推他的那个同龄人正被孩子们簇拥着，仿佛是一位被圣光眷顾的勇者，而他则是一个被正义所击溃的魔王……<br><br>“诺亚，人最该思考的，不是自己是什么，而是你想要成为什么？”东方弘道将怀德乔身上的兵符解了下来，走上前拍了拍迷茫的少年的肩膀，会心一笑。<br><br>————<br><br>“科恩暂时不会再有什么变动了，现在我得去一趟西尔斯城，一是为了和雅维利的交易，二呢，距飞云渡的战场消息，那魔能之地的四个老魔居然失踪了一位，我怀疑它已经混进了东极，并可能会在西尔斯城搞点什么动静。”东方弘道边收拾行囊边同诺亚讲到，他将一本黑色的笔记本揣入怀中，抖了抖披在身上的外套，然后满意地露出了笑容。<br><br>“等等，少的那个不会是——”<br><br>“千面妖魔高泽斯•拜蒙，相传它上次现身导致了上一任长明供奉牺牲，守护东大陆的魂灯也一度熄灭了三十余年。这次它又失踪了，我感觉它会在东极搞点大事出来。所以啊，在前往西尔斯城的这段时间里，我需要有人守住这科恩城，这个人不能是科恩的原住民，我信不过他们。况且我们干掉了怀德乔，苏尔嘉德是不会善罢甘休的，他很快就会派各种杀手混进来，首当其冲的就是城主府。”<br><br>“所以你就拿我当挡箭牌？”诺亚的额头爆出一道青筋。<br><br>“谁让你是我朋友呢？我不坑你坑谁啊。”东方弘道揽着诺亚，咧着嘴嬉皮笑脸地打趣道。<br><br>“切，那你是以什么身份去？别告诉我是科恩的新领主。”诺亚上下打量着东方弘道的行装，怎么看也不像一个权贵的样子，倒像是个随处可见的路人。<br><br>“当然不是，从现在开始，我就是科恩的一个普通商人， 来自郊外日伲玛村的尼塔玛德。”<br><br>“虽然我听不懂，不过总感觉不是什么好名字……”有时候诺亚是真的搞不懂这家伙的脑回路。<br><br>诺亚依然清晰地记得，那夜满月高悬。他躲在树林的阴暗处忍受魔能的侵蚀，满身都是教会的圣光术留下的伤痕，对死亡的恐惧占据了他的大脑，耳边不断有一个低沉的声音在不断呓语，鼓动他接受黑暗，向那些欺负过他的蝼蚁复仇。<br><br>思绪逐渐混乱，意志开始消散，他的双眼朦胧，仿佛被罩上了一片虚妄，大脑和身体都处在一种破碎的混沌之中，有那么一瞬间他感觉自己都不再是自己……<br><br>在他已经绝望到要放弃抵抗，任由力量将自己吞噬的时候，面前的这个同他年纪相差无几的家伙不知道从哪个地方钻了出来，没有丝毫犹豫便伸手将他从黑暗中捞出，当时，诺亚呆滞地抬起头来，他看到在这个少年背后的夜空中，闪烁着点点星光……<br><br>“当初为什么要救我？”诺亚不经意地问道。<br><br>“因为我恰好路过啊……”东方弘道背上了行囊，笑容如同黎明时的一线微茫。',
    sksn_ximengyaweili:'<li>【基础信息】<br>技能设计：§；愉渊<br>故事：爪巴<br>角色配音：山驴<br>称号：<font color=#FFFFAA>通权达变</font><br>姓名：西蒙&雅维利<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：专业型，搅局<br><br><li>【背景故事】<br>飞云渡城内的马场里，正倚靠着一匹黑色俊马的西蒙思索地望着西方的平原，却望不见西尔斯城的影子。<br><br>“特使大人不会是想家了吧，现在飞云渡战事已经平息，特使不妨就先回去吧。”哈里森开了一瓶酒，直接就往肚子里灌。<br><br>“游子自然会思乡，如今的东大陆已是冬季，家父又年迈，不知道身体是否安康。”<br><br>“塞弥恩公爵吗？说起来也有十多年未见了。”哈里森苦笑道，时间如梭，旧时南征北战的兄弟，如今也是天各一方。<br><br>“罢了，不说我了，将军都在这里驻守了十多年了，难道就不想回去吗？西尔斯城的士兵们也早就听过将军大名，他们都想让将军指点一二。”<br><br>哈里森晃着酒瓶，听出了他的言外之意，他抬头看着西蒙，后者意味深长地盯着他，他立刻领悟到了西蒙的意思并把酒瓶扔到草地上，双手抱拳，诚恳地请教:<br>“愿闻其祥。”<br><br>“我看将军的配剑很不错，但却只能拘泥于这边陲之地同野兽厮杀，不觉得很可惜吗？”西蒙指着哈里森腰间佩戴的那柄剑问道。<br><br>“这宝剑是先皇赐予我，并命我守护东极的大好河山。”哈里森将剑从腰间拔出，宝剑发出一声清脆的震响，反射出银色光芒。<br><br>“呵，但现在东极却面临着支离破碎的风险……”西蒙苦苦笑道。<br><br>“嗯？这是为何？”<br><br>“将军可知这天下是谁的天下？”<br><br>“当今皇帝是先皇苏利文三世的嫡出，这天下自然是陛下的天下。”<br><br>“是啊，可现在西尔斯城又是谁说了算呢？”<br><br>“这……你是说摄政王苏尔嘉德？”哈里森回想起那个同苏利文三世相似的身影，摄政王苏尔嘉德，是先皇的同胞兄弟，十分得其信任，在苏利文三世南征北战时，朝堂几乎都是由苏尔嘉德打理，但自打先皇驾崩后，苏尔嘉德便将东部的军费一减再减，若不是和那尖酸刻薄的科恩领主怀德乔达成的交易，用狩猎的魔兽素材换取粮食，飞云渡估计早就发生了哗变。<br><br>“陛下已经临近成年，可摄政王非但没有将权力转交给陛下，还在她周围不断安插自己的眼线，同时往各领地派遣所谓的巡查官强化自己的控制力，这已经让一些领主颇为不满。同时，他不考虑东线的边防困境，反而派高戈里南下去攻打阿弗斯赫特，借此巩固自己的兵权，从而置飞云渡的边防于危险之境，这些将军已经亲身体验到了。再者说，摄政王纵容手下贪腐，那几个他支持的城主大肆典财，贵族们欺压百姓，掳掠良家妇女为奴，肆意屠杀亚人，边远地区的人们都活不下去了。现在科恩城中已经发生叛乱。科恩距将军仅有十几里地，商贸，人员流动与飞云渡密切相关，到时候摄政王追查责任，将军您就是首当其冲。”<br><br>“这，那我该怎么办？”哈里森听罢后惊出一声冷汗，如果摄政王以此为借口夺他的兵权，魔能之地的怪物们再闻风反扑，几十年的驻防必将毁于一旦。<br><br>“事已至此，就看将军是想要登峰造极，还是引颈受戮？”西蒙目视着西方的天空，他的眼中始终在牵挂着那个娇小的身影……<br><br>————<br><br><br>雅维利匆匆忙忙地赶到了大殿，迎面撞见了刚从殿内怒气冲冲地走出来的摄政王苏尔嘉德。<br><br>“参见摄政王殿下，是什么让您如此大动肝火啊？”雅维利拱手问道。<br><br>苏尔嘉德仅仅瞥了他一眼，哼了一声便踏上了早在殿外备好的马车，雅维利尴尬地摇了摇头，轻叹着跨进了殿内。<br><br>殿里的王座上并没有人，因为不是上朝的时间，整个殿内也没有其他人，雅维利便转头离开，这时，一双玲珑小手捂住了他的眼睛。<br><br>“猜猜看我是谁？”<br><br>“陛下不要闹了，雅维利有正事要说。”<br><br>“切，真没劲，你跟西蒙比起来就是一个闷罐。”希露薇的脸鼓成一个包子，像只生闷气的小奶猫，但雅维利注意到，她的脸颊上有两道并不明显的泪痕。<br><br>“你哭了……”他想拿出手帕擦拭着女孩的脸颊。<br><br>“没……才没有。”希露薇拍开了雅维利的手，别过脸去回避他的目光，她咬着樱桃小嘴，两只手怯懦地紧紧攥着，不知所措。<br><br>“是摄政王吧？他又朝你发火了吗？”<br><br>希露薇没有回复，只是低着头，像是受了委屈的孩子在强装坚强。雅维利很是心疼，他无奈地轻叹一声。<br><br>希露薇公主，从小就是在呵斥声中长大的，老皇帝苏利文三世晚年脑子就糊涂了，他听信谗言，将自己的两个儿子，也就是希露薇的哥哥下了狱，最终导致他们惨死。希露薇便成了整个东极帝国的唯一的继承人，所以本该天真烂漫的公主却陷入了朝堂之上权力争夺的泥潭。每一句话都必须深思熟虑，每走一步都仿佛如履薄冰，脸上不再有微笑，也不会表现出悲伤，她变得冷漠，变得像一个帝王，可雅维利知道，她并不想成为这样的人。<br><br>“那你知道他为什么这么生气吗？”雅维利伸出食指弹了一下她的额头，希露薇气愤地握紧拳头捣了他一下，然后摇了摇头。<br><br>“科恩城，是摄政王的心腹之地，城主怀德乔曾是他的得力干将，但现在这个一城之主却被吊死在科恩城集市的市门上，整个科恩城的消息全部封闭了，亚人，还有人类，曾经是奴隶的人群暴动了一阵后就莫名其妙地被平息了。”雅维利从怀中取出一枚金黄色的五角星，这是科恩城主的徽章，贵族身份的象征，但当雅维利发现它时，它却在集市上随意被人践踏。<br><br>“很明显这是一次有策划的政变，而且这次政变改变了东部的局势，科恩是东部领中最富饶的一块宝地，是飞云渡与西尔斯城唯一的通路。此次事变直接导致了摄政王再也无法插手飞云渡的边防，也让哈里森脱离了他的掌控。”西蒙轻蔑地一笑，继续说道。<br><br>“我刚从那里回来，现在科恩已经有了一个新的领主，他是一个外来人……叫东方弘道，他策划了此次政变并接管了科恩城所有武装。城里的那些奴隶们基本上都被释放了，贵族的家产被查封，领地法令被废止，粮仓全被搬空分发给了贫民。现在除了没有名义上的独立之外，科恩已经实质上脱离了西尔斯城的掌控。”<br><br>“东方弘道……”希露薇重复着这个名字，她好像是在什么地方听到过，但却怎么也想不起来。<br><br>“这次科恩之行，我见到东方弘道了，但我看不清他的一切，在他身后是一个我无法想象的谜团，他知道我的身份和目的，他甚至知道我们在谋划什么，但我却不知道他想要做什么。他说他能帮助我们扳倒苏尔嘉德，但同时也开了一个条件。”<br><br>“什么条件？”<br><br>“废除东极的奴隶制……实际上他已经在科恩废除了这个制度。那些被释放的奴隶们自愿参军，维系着科恩城的治安。亚人，尤其是兽人的实力我们可是有目共睹，现在的科恩简直就是一个全民皆兵的军营。”<br><br>“所以你答应他了？”希露薇托着腮问道。<br><br>“是的，我以你的名义正式任命东方弘道为科恩领主，并同意在扳倒苏尔嘉德后实行新政。事实上东极也是时候应该改变了，我看到了亚人被解放后的样子，他们在干某些职业时具有人类所不具有的优势，但我们一直把他们当成杂役使唤，这大大地阻碍了东极的发展。所以，在从摄政王手里夺回权力后，那些苏尔嘉德所维系的旧制度，我们也必须一并清除。”<br><br>雅维利本来计划着是分一部分兵力去牵制怀德乔，但令他没想到的是，这个世界上居然有连西蒙都没有算到的事发生，实力堪比黄金级冒险者的怀德乔领主居然就这么被杀了。东方弘道的出现对于他们的计划来说是一个极大的变数，摄政王很有可能会提前行动。如果高戈里正常行军，那么想要攻下阿港至少得一个多月，但据西蒙说，高戈里这个人很不简单，南部战争结束的时间很有可能会缩短到两个星期。现在西蒙已经说服哈里森，就看高戈里什么时候能把阿弗斯赫特攻下来，而摄政王必然会在那时行动。<br><br>“现在我们对手的实力都已经到了最薄弱的时候，只要陛下一声令下，北部二领，塞弥恩亲兵，科恩城都将为您所用，我等亦会生死相随。”<br><br>“雅维利……”<br><br>“不用担心，希露薇殿下，雅维利永远都是您的骑士。”雅维利单膝下跪，如同儿时他与希露薇初见时一样，他在后花园的路西法像前以神明起誓向公主效忠，至死不渝。<br><br>希露薇上前搂住了雅维利，哭出了声，后者顺势抱住了她，轻轻安抚着，即使已经快要成年了，可希露薇始终是个不经世事的孩子。<br><br>“我真的能成为一个好皇帝吗？”希露薇弱弱地问道，在得知自己成为皇储后，她始终怀疑自己是否有能统御一个国家的能力。<br><br>希露薇的自我疑问令雅维利突然想起来，在科恩城的城主府，那个端着茶水神情自若的黑发少年问他的一个问题:<br><br>“我当然可以帮助你们的皇帝从苏尔嘉德手里夺回权力，但之后的东极就会变好吗？”<br><br>东极，自苏利文三世以来长年都在战争，民生凋敝，各种社会问题不断积压，官僚骑士的剥削压榨，亚人奴隶的悲惨境遇，贫民因为饥饿屡屡发生暴乱……整个国家看似平静，实际上早已经是千疮百孔。雅维利曾经一度想放弃这片故土远走他乡求学，但直到她的出现——<br><br>希露薇……雅维利始终相信，这位西尔斯城最善良的女孩，悯怀众生的公主殿下，她的莅临一定会给这个破败的大陆带来新的曙光。<br><br>“一定会的……希露薇殿下，您一定可以做到。”雅维利的眼中闪烁着光芒。长明殿的灯火已经点亮，东极帝国的新篇章就此开启。',
    sksn_gaogeli:'<li>【基础信息】<br>技能设计：§<br>故事：爪巴<br>角色配音：山驴<br>称号：<font color=#C48888>撼山平南</font><br>姓名：高戈里<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：刺客型，瞬间伤害<br><br><li>【背景故事】<br>东极南部的天堑，数百年来鲜有人能够翻越，大部分商贾都是走路上通道，将阿弗斯赫特港的货物拉到东极，再将东极的农产品和手工业品拉去阿港。这唯一的路上通道被城主乌拉姆设了数道关卡，并配有重兵监视着中央的一举一动。<br>乌拉姆是阿港的土皇帝，阿港城人是不受东极直接管辖的，有些土生土长的人甚至都不知道阿港竟然是隶属于东极的一个自治领。<br>是时候改变现状了。<br>高戈里是这么想的。<br><br>登山，行军————当高戈里最喜欢的两件事放在一起的时候，他就展现出同年轻人一样的活力。这个年过四巡的军官对这南部天堑颇有兴趣，于是，在大军行进到山脚下时，他命全军扎营。自己带了三个下属，徒手攀爬。<br>他的副官必须跟着他，摄政王要求他时刻盯着这个莽撞的长官，而他又没有办法阻止高戈里去做一些莫名其妙的事。<br>山爬到了一半，汗水就浸透了高戈里的衣襟，他靠在一颗树上，目测着此地到山顶的距离。<br>“长官，您今天打算爬到山顶吗？”副官一边问，一边摘下他的头盔，用手扇着风。副官跟随高戈里已经戎马数十载了，换作以前，高戈里现在应该已经准备放弃，然后回营喝酒去了。<br>“作个标记吧，明天继续。”高戈里擦了擦头上的汗，露出微笑。<br>副官眼冒金星。“您是认真的？”<br>高戈里拿随身携带的小刀往树上划了几道。“当然了，明天的时候把装备卸掉，再试试能不能走到山顶。”<br><br>————————<br><br>高戈里的南征军自从中央下调以来，一路上花费了数周时间，历经三个自治领，那些领主面临大军直接压境，直接吓破了胆子，将自家的领主军拱手送上。高戈里派人将兵符送到西尔斯城后便马不停蹄继续开往南方。他想在乌拉姆反攻东极前先夺下阿港。<br>乌拉姆和那些闻风而降的内陆领主不同，他是一个难啃的硬骨头。就凭他那滔天的野心想来必然不会束手就擒，而用军队直接攻打地上防线势必会造成己方的重大伤亡，就算是勉强打过去，那乌拉姆也有了充足的时间将战线引到海上。况且他豢养所谓的邪神不知道是个什么东西，越拖下去越对自己这边越不利。<br>高戈里将这些都甩在了脑后，他现在只想要看看，在轻装以后是否能登上这天堑山脉。满脸怀疑的副官跟在他背后，用笔测绘着登山的地图。他们现在已经越过了昨天的记号，并走了好长一段距离。<br>“长官，前面还有路吗？”副官翻了个白眼。<br>“啊，那肯定是没有的，这种荒山野岭，我们可是它的第一个访客。”高戈里回答道。<br>“您莫不是在拿我们开心。”副官苦笑。<br>“那你开心吗？”高戈里反问道。<br>“这……”<br>高戈里回过身来，拍了拍副官的肩膀。“别这么容易就泄气，年轻人。人活着的目的，就是向高处攀登啊。”<br>他指着前方，双眼放光。“今天就到这里，做好记号，明天我们把补给放下再来。”<br><br>—————————<br><br>“别放弃嘛，虽然你跟我这么多年了，但要是你累死在这山坡上，我也没地方埋你。”高戈里已经是第五次攀登了，这次他带了一个小队，而副官已经累瘫，双腿不断发抖。<br>他扶着一颗树气喘吁吁地说道:“长官，停下吧，自古以来，就没几个能爬上这座山的，我们已经尽力了。”<br>“是吗？可我觉得我还有力气。”高戈里装出一副轻松的样子，但他也有些体力不支。<br>他也在想着，是不是该在此刻放弃。但这时，他忽然感受到一阵凉爽的风。有风，就代表前方是空旷的地带。<br>“说多少遍了，别轻言放弃，只要你坚持走下去，奇迹就在眼前。”高戈里挥出匕首，砍断了一个挡路的宽厚叶子。前方的道路明晰了起来，阳光撒在他们脸上，山顶就在眼前十几米处。<br>“看吧，兄弟们，是谁说人类征服不了这座山峰的？”<br>小队的每人脸上都显的十分疲惫，但他们却感到无比自豪。高戈里登上山顶，眺望远方的云海，南部的海岸线已经能看清一二。<br>“诸位，我们不仅仅是在进行一场战争，我们还在创造历史，自古以来南部天堑就是阻挡东极的遮眼布，但现在我已经能看到外面的世界了。如果是之前，我们可能要硬闯地上的层层关卡，损失必然会是十分惨重，但现在我们只需要翻一座山，就可以让将士们绕过敌人的防线，直捣黄龙。这几日的登山已经证明了，人类可以战胜前方的一切困难，现在我们已经征服了山峰，之后我们也将战无不胜！”<br>“回去后修整一日，后天我们进军阿港，扔掉所有负重，每人携带一日干粮，然后一天之内拿下阿弗斯赫特。”高戈里眼神如鹰。<br><br>—————————<br><br>“这海边的空气……还真是湿润啊”高戈里坐在一处城墙上，远远地望着停泊在港口的帆船。这是他第一次看到真正的海洋，和画本上或是吟游诗人口中都不甚相似，它更宽广，更神秘，更加令人向往。<br>仅仅半天，他们就从山顶直直冲了下来，犹如一支天降骑兵，绕过了城主的层层封锁，直接攻破了阿港中心，这一路上到处有起义的人们夹道欢迎，等他们进驻城区才发现，城主府已经被愤怒的人群给占领，城主乌拉姆被人用鱼叉刺破了喉咙，正倒吊在城主府的门口，被几个愤怒的群众拿鞭子使劲抽。高戈里赶紧让人挖了个坑把这惨不忍睹的尸体给埋了。<br>进驻的军队忙着接管防备，也没时间维护海港的治安，所以街道和集市一片混乱，那些商人小心翼翼地护着自己的商品，但仍然防不住暴民。高戈里知道，现在还不是该整肃的时候，他得让这些愤怒的人民充分发泄完再进行下一步动作。这些人虽然乱，但不会有太大影响，只是他有种预感，这场战争绝没有这么容易就结束。<br>“长官，我们已经将城内的起义军收编，城主乌拉姆的残部也已派人追剿。下一步我们该如何？”副官登上阶梯，向其请示道。<br>“那株邪神的花苞呢？”<br>“目前下落不明，我们还在调查中。另外，警备营报告他们从灯塔的瞭望镜中，看到西边的海岸上有异动。”<br>“想必是乌拉姆请的援军，正好你们没有跟海上的敌人打过仗，趁着这个机会也练一练。我们现在控制了阿港大部分海岸线，可以在港口处架上几门火炮，等他们来了直接点火，轰他个船毁人亡。”高戈里拍了拍身上的水汽，高举一只手臂伸着懒腰。<br>“管他什么牛鬼蛇神，我东极铁军已至，将不会再有一寸土地供他们肆意妄为。”高戈里摆弄着一把刚刚缴获的火统，用它的准星对准了西方的海岸线。<br><br>“通向外界的大门，已经被我永久地打开了，未来的东极也必将屹立于大陆之巅！”',
    sksn_clemtin:'<li>【基础信息】<br>技能设计：小月纸<br>故事:爪巴<br>称号：<font color=yellow>海都小霸王</font><br>姓名：克莱门汀<br><br><li>【能力数据】<br>身份定位：反贼<br>能力定位：刺客型，爆发，进攻<br><br><li>【背景故事】<br>一个霹雷电闪大雨滂沱之夜，骇人的雷声混在恐怖的雨声中撕扯着天地，把尼吉拉斯这块海滨大地投入浑浑沌沌的境地。漆黑得伸手不见五指的暴风雨中，鬼火一样的烛光时隐时现，照亮了在窗台前站立之人的半边脸庞。<br><br>克莱门汀倚靠在皇城内庭的窗台边，看着窗外的瓢泼大雨一言不发。<br><br>前去阿弗斯赫特的舰队遭受了阻击，无功而返——这是在书桌上一封格外醒目的信件上写着的唯一一段话。<br><br>雷声阵阵，夹带着雨水的风从窗口卷进了屋子，让克莱门汀打了个冷颤，但他的眼睛如同一匹饥渴的狼，死死盯着像是在诸神的愤怒中遭受洗礼的天地。<br><br>“你以为这样就能让我放弃了吗？”克莱门汀不甘心地冷哼一声。<br><br>正如港口那些水手说的，不是每次远航都能找到他们渴望的宝藏，但只要能找到一次，那他们将一劳永逸。克莱门汀知道现在的失败只是一种轻微的试探，这不过只是证明了这片海洋比他想象的更加广阔，远方的敌人也更加强大，但这并不会成为阻挡他前进的顽石，他有的是时间和耐心陪那些未知的敌人慢慢磨下去。<br><br>咯噔咯噔。<br><br>一阵硬靴踏地的声音传来，一位身着暗棕色袍子，手中还握着一根文明仗的中年男人闯进了克莱门汀所在的房间。<br><br>“唐宁？你现在应该在港口巡逻才对，怎么跑我这里来了？”克莱门汀朝着面前这位耸着肩弓着腰，正气喘吁吁的男人问道。<br><br>唐宁连呼了几口气，紧忙说道:“陛下，出大事了，港口那座世纪高塔塌了，我们赶过去救火，可火烧的太大了，我们只找到一具烧焦的尸体，根据特征判断……是高塔的主人东方弘道……”<br><br>克莱门汀眼神犀利，他走上前，双手掐住唐宁的两肩，质问道:“什么？怎么会这样！？”<br><br>“根据我们判断……应该是有人蓄谋已久，前些日子东方弘道和陛下见面后，就有人猜测陛下将什么传承宝物秘密转移到新建的高塔里，不过他们打错了算盘，世界高塔里并没有藏着什么宝物，我们的损失也不太大……”<br><br>唐宁汇报完后，瞟了一眼克莱门汀，发现对方在直勾勾地盯着自己，他不禁颤抖，不知道自己那句话触怒了这个尼吉拉斯雄狮的逆鳞。<br><br>“世纪高塔里，只有一件宝物，那就是东方弘道本身。一个能造出异能炮这种战略武器的人才说死就死了，这就是你说的没有什么损失？！”克莱门汀瞪着唐宁，声音愠怒道。<br><br>那双清澈的黑色眸子清冷，却有说不出来的幽深。唐宁就像是被生活在雾海中千年的老怪盯上的猎物，感到一阵窒息以及深深的畏惧。<br><br>“我不管你用什么方法，把罪魁祸首给我找出来，敢在我眼皮底下搞破坏的苍蝇，我一定要把他们挫骨扬灰。”<br><br>唐宁应了一下，在他刚要打算离开时，克莱门汀叫住了他。<br><br>“先别走，我有事要你去办。”他将唐宁唤到身边，耳语道。<br><br>“给我死死盯住司吉，有什么不对劲的地方立刻向我汇报，记住，别轻举妄动。”<br><br>唐宁拱手领命，他慢慢退了出去，不禁冷汗直流……不同于老国王的圆滑和其他大贵族的隐忍，克莱门汀显然更加激进，也更加难以侍奉。他有某种预感，这位年轻的君主未来势必会在海都掀起一场变革的浪潮。<br><br>窗外的暴雨越下越大，天空时不时落下闪彻苍穹的霹雳，山林的野兽都躲进了自己的巢穴，恐惧在惧怕雷声的孩子心头蔓延，一切都在预兆着海都这片土地的祥和与平静，将永远扫入历史的灰尘堆……',
    sksn_hailingji:'<li>【基础信息】<br>角色设计：§<br>故事:爪巴<br>称号：<font color=blue>祈海之歌</font><br>姓名：海灵姬<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：专业型，拆迁流<br><br><li>【背景故事】<br>海灵姬已经被囚禁了有一段时间了，自从那个可怕的海盗一路上所向披靡，冲入光明礁的人鱼湾之时，她就已经明白自己的命运将是怎样的了。海默德船长重新踏上他日思夜想的故乡的土地，并在光明礁掀起了一场血雨腥风。他的海盗喽啰们烧杀抢掠，无恶不作，一时间无辜者的鲜血竟然染红人鱼湾。而面对这一切，离开了海神的海灵姬却毫无办法，只能任由海默德的手下将自己囚禁在人鱼宫殿——龙庭内的一根庭柱旁。<br><br>“咯噔，咯噔”一阵木头敲地的声音由远及近地传来。<br><br>“从受万人敬仰，到成为阶下之囚，这滋味不好受吧……海灵姬，我可是在那没有边际的血海上漂流了十余年啊。”海默德拖着他那条早已经被替换成木头的义肢一瘸一拐地走向海灵姬，他右手提着一个披散着长发的人头。<br><br>“那是……”海灵姬恍惚地看着他手中的那颗人头。<br><br>“一个自不量力的蠢货罢了……不过她对你很是忠心啊，现在的情况下还想着要来救你……”海默德轻描淡写地将那人头撂倒她面前，这时海灵姬才看清那人的面容。<br><br>“这是……艾尔莎？！怎么会……不……艾尔莎！”海灵姬脑袋嗡嗡的，然后她突然向被泼了冷水一样清醒了过来，她极度痛苦的嘶吼着，泪水不断从脸颊滴落。<br><br>那是她的侍卫长，也是她同为人鱼一族的挚友，艾尔莎的头颅。在海默德攻占光明礁，海灵姬被其的手下囚禁后，艾尔莎便一直集结反抗军准备着潜入龙庭，将海灵姬解救出来。但没想到的是居然有叛徒将她们的计划和盘托出，海默德找到了她们的据点，并亲手杀死了艾尔莎。<br><br>“你这混蛋，我要杀了你，我杀了你。”海灵姬嘶吼着冲向海默德，但却被身上的锁链给扯住，动弹不得。<br><br>“呵，堂堂海族之王，自诩文明的人鱼族圣女，居然也露出了这种表情。”海默德言语中的嘲讽之意甚浓。<br><br>“为什么？你若只是因为想当这海洋的王，为什么要滥杀无辜？！”<br><br>“你说我是为了什么？”海默德看向龙庭宝座上镶嵌的那颗巨大的黑色珍珠，他张开自己的双臂，如同傲世的君王一样向着盘尾而坐的海灵姬讲道:<br><br>“我们海族自诞生以来就在不断地进化着，我们不断适应着海洋的变化，不断强化自己的力量，我们的存在曾遍及了每一片海域……但现在的大海太不公平了，整个社会的结构如同海沟深渊一样黑暗到没有一丝光明。我们的进化已经变得十分缓慢，我们不再崇拜强者，反而开始向裸猿一样论血统和出身。你知道原因是什么吗？那些早已经爬到顶端的种族不想要别人比他们更强，他们掌控着海洋绝大部分的资源，天生就比其他种族更高贵，他们想让整个海族的进化为了他们能永远把持大海的私心被迫停滞。海族不需要统治阶级。他们不需要约束自己的教条，不需要有人站在高处告诉他们该如何生存，他们只要求一个无序的环境，一个供他们可以彻底地平等地展示自己力量的修罗场，弱肉强食对他们来说才是真正的公平。”<br><br>“你只不过是一只躲在石缝里太久以至于完全认同了黑暗的蠕虫，有什么资格替其他同胞们否认光明！”海灵姬拉扯着捆在她身上的锁链，朝海默德咆哮道:“海洋自有其秩序存在，海族自有其尊严存在。一个和平的大海是所有海族向往的家园，我们进化之路上所经历的磨难不都是为了一个迎来不必再去争抢生存空间，全海族和谐共生的未来吗？你自己躲到了石头后面，却口口声声说光明对你太不公平？”<br><br>海默德眯起来眼睛盯着海灵姬那纤细的腰肢和鳞光闪闪的鱼尾，然后又看了看自己残缺的手臂和满身的伤痕，他突然发笑道:<br><br>“公平？咯呵呵呵，说的倒是好听。但这片大海不会给所有人像你们人鱼一样可以选择自己人生的权力，只会给他们被选择的命运……我从出生前就经历了一场战争，为了争夺母胎那少的可怜的养料，我和我的兄弟姐妹们在子宫里就开启了一场厮杀，较早成熟的胚胎会主动游曳到其他未成型的胚胎处，将其活活咬死，然后夺取更多的空间和养分，直到最后只剩一个胚胎……只有活到最后的，才有幸能够出生，能够见到这美丽的海洋。我和你们人鱼不同，你们衣食无忧，是大海的宠儿，但我只能永远成为嗜血屠夫，被你们唾弃的野蛮种族……野蛮？呵呵，我们也曾想活在光明之下啊，可为了生存，我们却不得不在那漆黑无比的子宫里同类相食。若你出生的时候手上就已经沾满了同胞的鲜血，你还能做到宽以待人吗？当面对生存和死亡抉择的时候，你来告诉我海洋的秩序何在？海族的尊严何在？”<br><br>海默德闭上了他那尖细的眼睛，他的鼻尖嗅着周围夹杂着海带气息的潮湿空气。母胎里的那段黑色回忆现在想来仍是令他感到恐惧，若他当时没能第一个苏醒，若他没有狠下心来咬死自己的亲兄弟们，那么他现在就不可能和海灵姬在这里大谈生命。<br><br>“你……”<br><br>海灵姬不知道该如何反驳他，至少她无法用自己的经历去说。海默德有一句话说的没错，人鱼族是海神的眷属，他们天生就立于众生之上，自然是无需考虑生存问题。人鱼族爱好和平，当然也并没有经历过杀戮和战争。<br><br>“但这并不能成为你侵占光明礁的理由，人鱼族世代守护的海洋圣地，岂能让你一个海盗给玷污。”<br><br>“玷污？我是在将海族从光明礁这二亩三分地中解救出来，他们应当看到更加广阔的大海。”<br><br>“可在你攻占人鱼湾时，你的喽啰杀了一名人类王国的使者，这件事若是传到了他们人类那里，他们会怎么看待我们海族？你的行为毁了我们与人类的和平。”海灵姬不甘示弱地回应说。<br><br>“和平？呵呵，我们与人类之间可从没有过和平……”海默德瞪着海灵姬，怒气冲天。<br><br>“那些陆地上的裸猿，他们已经将陆地给全部占领了，但还不知道满足，反而造了无数艘船远洋出海。他们在海面上依托着装载了武器的船舶横行霸道，大肆捕杀我海洋的子民，把自己处理不了的腐臭垃圾一股脑全倾倒在海里，将我族逼离沿海，他们还垂涎海床里蕴藏的矿产，哪怕冒着会引发海啸的危险也要来搅乱底栖种族的安宁。现在，就连帕朵玛拉那禁忌之物都被他们夺去，把北部海的生态搞的支离破碎……”<br><br>海灵姬难以置信地瞪着海默德，她居然在这条嗜血鲨鱼的眼睛里看到了闪闪的泪光，海默德真的动情了，他没有注意到海灵姬的表情，反而看向自己残缺不堪的掌心道:<br><br>“大海是仁慈的，她默默无声地忍受这一切，即使被伤害的千疮百孔，她仍然期冀这群猴子们能回心转意……但我不能，在离开母亲独自谋生后，我就只有大海这一个家了。海族的地盘，岂能让裸猿糟践？卧榻之侧,岂容他人鼾眠？”<br><br>海默德攥紧拳头，露出了滔天杀意。海灵姬丝毫不退缩，她瞪着暴怒的海默德，死死如归地骂道:“别再假惺惺地说是为了海洋了，海盗！海洋的意志不是不想阻止人类，而是因为她更想维护一个人族与海族共生的和谐秩序，用合作而不是对抗的方式来解决问题。而你，海默德！你越俎代庖的行为只不过是为了自己的欲望罢了，你只是想要肆意地杀戮，享受鲜血带给你的刺激和快感，你为了一己之私就想把整个三分海拖入万劫不复之地！”<br><br>海默德面临凶光，咬牙切齿，他用自己已经被替换成钩索的右手死死钳住了海灵姬的脖子，将她提起。<br><br>“你们所谓的和谐只不过是妥协，没有力量维系的和平终将抹杀海族的未来。我们天生就比裸猿更加适应大海，凭什么要与他们共享我们的家园？物竞天择，适者生存，海洋不需要秩序。”<br><br>在海灵姬意识快要消失之时，海默德突然松手，海灵姬啪的一身摔在地上，在重新接受到新鲜空气后，海灵姬不断地咳嗽和喘息着。<br><br>“我先留你一条命，在找到【那个东西】之前，我不会杀你，我要让你亲眼见证，海族是怎样重新崛起……”',
    sksn_pianxian:'<li>【基础信息】<br>角色设计：诗笺<br>故事：爪巴<br>角色配音：小萌泪<br>称号：<font color=yellow>长天镜明</font><br>姓名：翩跹<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：斗士型，攻防一体<br><br><li>【背景故事】<br>太古阴阳之魂，是神明遗赠给东大陆原住民的礼物，每逢一甲子的轮回，祂都会化身成先知者四处布道，直到今日仍然在指引着人们走向未来。<br>而最近的一次化身是一位来自北方的自治领的名为翩跹的小女孩，在其四岁时觉醒了勘合乾坤的力量后，被一位在北境追寻神迹的苦行僧带回了王城。<br>当时，长明已三十年未能掌握阴阳魂的行踪，长明殿上的魂灯也灭了三十年。这一来，整个教会的僧侣们都为之振奋，他们传授她力量和智慧，教授她如何看破神明的预言，并将她作为圣女供奉。当僧侣们合手为她祷告时，她听到了内心深处一直传来一种并不清晰声音。当翩跹将此事告知寺宇中最德高望重的先知时，后者立即教给了她如何聆听神明的声音。<br>东极人是非常严律的，他们总是按造一个规划好的方式生活，丝毫不差。一旦有什么意外事件，东极的守卫军总能第一时间解决，绝不会让意外影响到人们平静有序的生活。稳定的代价就是枯燥的日常，翩跹作为长明的供奉，自然必须要遵守各种戒律，不能私自出行，使用能力，每日诵读教义经典，做祷告。虽然翩跹有了匹敌异能者的实力，但仍然被要求做一个文静的修女。<br>翩跹可不能忍受这种度日如年的生活，趁着僧侣们开坛布道时，她就会从后门偷偷溜出长明，去城市各地闲逛。<br><br>东极人缺乏娱乐精神，或者说他们根本没有办法闲下来，每一个人……都在被一个隐形的齿轮推动着。<br>在翩跹最后一次偷跑出来时，她看到一个身材臃肿的商人挥鞭驱使着一个体态娇小的猫人族奴隶，小猫娘因为崴了脚不能前进而引发了奴隶商人的不满。翩跹想起了儿时自己家乡镇上的恶霸，他们丑陋的嘴脸简直如出一辙。翩跹愤怒地抬起左手，强大的力量从她手中倾泄出来，将奴隶商人化为了灰烬……<br>僧侣们怒斥翩跹随意使用神器的力量，僧侣们解释道，东极的律法正是如此，奴隶受到什么待遇都与他人无关。她本应当成为维护东极秩序稳定的守护者，而她这一出手，则会打破东极维持百余年的宁静，让这个秩序的国度重新陷入混乱的境地。他们告诉翩跹守护东极需要的是规则而不是力量，身为守护者更应当按规定行事，你是一位替神明布道的觉悟者而不是舞动刀枪的战士。<br>“那奴隶是神明所规定的吗？”<br>翩跹如此问道，僧侣们无言。<br><br>他们都明白，东极的和平是一个虚伪的假象，这里的人封闭在自己圈子里，有了食物和衣服就心满意足，遵循着一个僵化的行为标杆，称自己为神明的选民。哪怕是作为奴隶，也没有一人反抗，因为反抗是不符合东极人的思想的，反抗只能让本来就负罪的他们罪加一等。井井有序的社会结构让东极人失去了他本来的斗志，成为了芸芸众生中普通的一分子。哪怕被恶人欺辱也会暗暗吃下苦果。<br>东极人是不懂得罪恶的，他们总认为那些衣着华贵的老爷说的就是正确的，他们认为在告示栏上张贴的新法就是神明的旨意。奴隶生来低贱，是因为他们需要这辈子用自由赎上辈子犯过的罪。<br>每个人都有自己应该呆的地方，谁都不能逾越，低贱的愚者于庙堂之上大放阙词，高尚的智者在阴暗之处渡化枯骨。人和人之间有无法逾越的鸿沟，而连接沟壑两岸的桥梁，却早已随时间化为了尘土。东极的秩序在累累白骨之上矗立，而站在最顶层俯视白骨之人，自然要比白骨尊贵。<br><br>一个完善的秩序真的能带来安定吗？<br>翩跹与僧侣们争吵，她一怒之下推倒了庙宇中供奉的神像，夺门而出。天空降下了滂沱大雨，透过屋顶的缝隙滴落在倒塌的神像面庞，从脸颊划过流到地上，不知究竟是泪水还是雨滴……<br>之后，僧侣们没有找到她的踪迹，但他们已经感应到了先知者的觉醒，老人们发现，已经熄灭了三十余年的长明之灯，又重新点亮……<br>在这片历经沧桑的土地上，古老的心已经被唤醒，守护的剑也随征战的铁骑重新出鞘，东方时不时传出一个又一个的英雄故事，维系这个古老大陆的锈蚀齿轮好像突然裂了个口子。<br><br>翩跹穿梭在街道的车水马龙中，她用心感受每一个迷茫的灵魂的诉求，忽然间，她听到了一个声音。<br>“姐姐，是我。您之前救过我......“<br>一个披着连帽袍的女孩小跑过来扯了扯她的袖子。翩跹仔细一看，这不是当时那个被奴隶商人驱赶的猫人族女孩吗？<br>“是你啊，可那个商人不是死了吗？为什么你还在西尔斯城啊？”<br>“额，是主人救了我，还给了我一个安稳的家喵”<br>“主人？”<br>翩跹眉头一皱，她明明已经将奴役猫娘的商人杀死了，为什么她的口中还有主人......难道......<br>“伊莲，你又乱跑了，别又被拐跑了”<br>一个青涩的声音从远处传来，翩跹看见一个头戴兜帽的黑发少年跑了过来，他一把抓住了小猫娘，数落了起来。<br>“对不起主人，但伊莲刚刚遇到了恩人小姐喵。”<br>伊莲指了指愣着的翩跹，少年露出微笑，想同她握手。却没想到翩跹一个跃步冲上前，抓住了他的手臂，往前一扯。然后接着侧踢他的膝盖一脚，少年重心不稳，眼看就要被放倒。但他却淡然一笑，在即将接触到地面时，消失了。<br>少年从翩跹背后突然冒出，翩跹急忙将伊莲护在身后。<br>“小姐我们好像并没有什么恩怨吧”<br>“你很强，但也并不意味着就可以奴役他人。”<br>“奴役？你是说伊莲吗？我想你是误会了，你不妨问问伊莲，我有没有奴役她。”<br>翩跹蹲下身子，余光还在警惕着无奈地抱着手的少年，她看着伊莲，问道：<br>“你叫伊莲是吗？告诉姐姐，这个人是不是欺负过你，放心，姐姐很强，他不敢轻举妄动”<br>“不是的，在姐姐从奴隶商人手里救了我之后，我就没有什么地方去了，是主人在街角里发现并帮助了我，还给了我好多好多小鱼干。主人从来都没有让伊莲做过自己不想做的事，只是.......伊莲无以为报，伊莲只能做些杂务，帮主人分担辛苦。”<br>小猫娘头摇的像拨浪鼓，急切地说道。<br>“那你为什么喊他主人？”<br>“以前在拍卖所里，伊莲是被这样教的”<br>翩跹一时间不知道该说些什么，她回过头来盯着少年，质问道：<br>“东极人向来是对亚人族不屑一顾，为什么你却不同。”<br>“你不也是吗？小姐，这个世界上有谁不喜欢猫娘呢？”<br>少年风度翩翩地回答道，他招手，伊莲便边跑边跳地回到了他的身边，亲昵地蹭了蹭他的手背。少年反手便摸了摸她的两只猫耳朵，伊莲一个激灵，气鼓鼓地瞪了他一眼。<br>“对不起，是我错怪你了。”翩跹低头道歉说。<br>“无妨，不过我也没想到，居然能在西尔斯城看到一位替亚人说话的人，你的眼中有着微光，这让我看到了东极的过去还有未来。”<br>少年笑道，他牵着伊莲的小手，向还在思索的翩跹告别<br>“我的眼中......等等，能告诉我你的名字吗？”<br>“东方弘道，一个时代变迁浪潮中小角色罢了”',
    sksn_halisen:'<li>【基础信息】<br>角色设计：§<br>故事：爪巴<br>称号：<font color=chocolate>守御之将</font><br>姓名：哈里森<br><br><li>【能力数据】<br>身份定位：反贼，忠臣，内奸<br>能力定位：斗士型，拆迁流<br><br><li>【背景故事】<br>“你说摄政王已经派高戈里南下进攻阿弗斯赫特港了？”<br>哈里森在议事厅内来回踱步，他十分不理解，为什么在东方战事吃紧的时候，上面还要南下开辟新的战场。而中央派来的监察官西蒙则是保持着一种气定神闲的样子。<br>“是的，将军，阿港城主乌拉姆在知道了魔能之地的变动后，立刻调集了军队造反，宣布城邦从东极独立。”<br>西蒙不紧不慢地回答道。<br>“乌拉姆，这个混蛋……那么陛下是怎么说的？”<br>“陛下命将军坚守飞云渡，在平定乌拉姆的叛乱前，抵御住魔能之地的兽潮。<br>“可我需要大量的兵力，你们非但不给增援，反而把军队派往南方。这次兽潮非比寻常，仅凭这点守军怎能抗衡？”<br>“将军勿虑，陛下遣我来就是为了协助将军。我这里有东极王室发布的英雄榜，凭借它就可以招募各地的冒险团扩充军力，冒险者的实力参差不齐，虽然不如正规的军队有效，但也足以抵挡小规模的兽潮。”<br><br>西蒙说罢便把一张烫金卷轴递上，哈里森接过并将其打开，仔细观摩起来。<br>“就单凭这东西，真的能调动那些冒险者吗？”<br>他掂量着这薄薄的一层卷轴，表示怀疑。<br>“当然，靠这些还不够，我们还需要提供些足以引起他们重视的奖励，冒险者都是一群受雇于人的战士，他们在各地接受任务换取赏金无非就是为了名利。而这些东极都能给他们，所以他们是一定会来的。另外，我还请到了西尔斯最强的冒险团赤薇，现在我们不但能抵御魔兽潮，我们甚至还可以反攻魔能之地。”<br><br>哈里森长叹一声，他将英雄榜卷起来，看着议事厅中央摆放的一张巨型地图，飞云渡正处于地图中心位置，往西则是幅员辽阔的东极各领，往东看就是罗格镇，格力切镇等东极外围城市，而再往东一些则是大片的空白，那是人类数百年都未曾踏足的禁域，嗜血暴虐的怪物们盘踞的地盘——魔能之地。<br>“陛下说，如果仅仅只是一味地坚守飞云渡，迟早得有一天会被敌人抓住破绽，飞云渡的兵力坚持不到南部战事结束，只能举守城的全军之力一击定胜负……陛下令将军要想个办法把战线开辟到这里。”<br>西蒙跟上前并指着地图的一个位置，那是魔能之地牛首魔王奥克佩特的地盘，西部鹰角域。魔能之地的四大领主盘踞在中心之域陨落天四周，北部由阿贝尔加缪统领的死域和南部皮谢尔掌控的豕国互为掎角之势，而西部距离飞云渡最近的牛头魔王奥克佩特则是不断骚扰西部边境的主谋。只有除掉了牛头怪，东极的军队才能进军到敌人心脏处，北可控制阿贝尔加缪的势力，南可抵御皮谢尔的蚕食。<br>“的确，飞云渡现在不应当坐以待毙，必须出击鹰角域取得战争的主动权。”<br>哈里森点头道，西蒙然后将食指移到了鹰角域的东侧——未知之域陨落天。<br>“将军，如果要破除魔能之地的威胁，还必须得注意这里啊。”<br>“陨落天吗？之前派往前线的斥候来报，这是连那四个魔头都不擅入的禁地。这次的兽潮异常凶险，很大可能是受到了陨落天的影响。”<br><br>陨落天对东极人来说是一个充满了迷雾色彩的禁地，传说在东大陆被神明开辟前，旧世纪的天空在此地坠落，强大天域之外的魔能倾泻，使附近的生物发生了异变，人们把这些异变的生物称为魔物。东极建国前，东部领主格兰杰勋爵在魔能之地外围修筑飞云渡，以抵御魔能入侵的影响，随着时间的推移，魔能的影响渐渐地消散，饱受战乱或是压迫的人们便前往飞云渡外围垦荒种田，建立了一个一个孤立的城镇。但最近兽潮不断骚扰城镇边境，东部战事愈发激烈。<br>飞云渡的守将哈里森十几年前便被先帝尤利文三世派到此处率军抵御兽潮，但自新帝登基已来，在摄政王的干预下东极便不断削减东部的守备兵力，飞云渡已然是捉襟见肘，而此时魔能之地又发生异变，躁动的魔物们不断袭击外围村镇，每天都有各种伤亡报告传到哈里森的耳根。他知道现在已经拖不得了，虽然他的任务是坚守不动，但他却不能眼睁睁看着魔兽们逼近飞云渡城下。<br><br>西蒙看出了哈里森的思量，他走近哈里森，将一个东西交到后者手里，然后轻声说道:<br>“将军无需多虑，陛下在我临行前曾命我将东部领的兵符交与将军，有了它，将军对于东部战线的大小事务亦可以自行决断。”<br>哈里森接过这如同一条的金色盘龙般的兵符，他看了一眼西蒙，后者眯着眼睛，不知道在想什么。而哈里森却已然明白远在西尔斯城的小皇帝的言外之意，<br>“我受先帝知遇之恩，还未曾报答，先帝便随神明而去。而今陛下贵为先帝之子，东极唯一无上的皇帝，愿意信任我并将这假节钺之权交给我。请阁下回到西尔斯城后代我转告陛下，哈里森愿为陛下赴汤蹈火，万死不辞。”<br>西蒙拱手相谢。<br>“将军无需多礼，需要将军做什么陛下到时自然会来告诉将军。不过现在最重要的是东方的战事，我看将军貌似已经想到了对抗兽潮的办法。”<br>“是的，魔能之地的兽潮们源源不断，他们仰仗的莫过于陨落天倾泻的魔能，如果能捣毁陨落天产生魔能的源头，那兽潮自然就退散，魔物们也会逐渐被我们一一剿灭。”<br>“但目前来看，飞云渡和陨落天之间还隔着一个鹰角域，那可是牛头怪的大本营啊。”<br>西蒙将一张羊皮纸摆在桌上，上面绘画的是一个牛头人身的怪物，猩红的眼睛就好像在盯着看着这张画像的人。<br>“对，如果要进军陨落天，那么必须得除掉这个魔头。牛头怪奥克佩特，残暴荒淫，被他掳掠的妇婴难以计数。虽然只是一个魔物，但却极其狡诈狠毒，我们之前在他手上吃了不少亏。而且鹰角域内部错综复杂，极易迷路。”<br>哈里森愤怒地锤了一下桌子，他看着画像中凶神恶煞的牛头怪奥克佩特，突然心生一计。<br>“不过他倒是有一个特点，十分好色，这点也许可以成为我们的突破口。现在莽血魔头势力正盛，必然会重于进攻而轻于戒备，赤薇冒险团不都是女性冒险者吗，那我们便派她们乔装成俘虏，混进鹰角域，我再派一只精锐部队，分成两股从两侧包抄，然后里应外合，同时发动突袭，一举拿下鹰角域。”<br><br>他收起了右手中紧紧攥着的兵符，走到议事厅的墙壁边，上面挂着一柄银白色的长剑。和一套漆黑的胸甲。哈里森抚摸着这把陪他征战多年的战友，不禁感慨。<br>“自打被派到飞云渡，我已有十几年没能再上沙场了，现在南部摄政王的军队风头正盛，我们东部也不能毫无建树。为了陛下，也为了东极的和平，就算拼了我这条命也在所不辞。”<br>宝剑出鞘，在空中划出一道亮银色的圆弧，哈里森闭上双眼，仔细回想当年征战沙场时自己杀敌的一招一式。许久，他睁开眼睛，目光坚定地说道:<br>“若此计能成，便可以借鹰角域为跳板长驱直入，然后荡平魔能之地的南北各方，我东极东部边境将再无祸患。”',
    sksn_agebu:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=Gold>星芒缔造者</font><br>姓名：雅各布·拜伦<br><br><li>【能力数据】<br>身份定位：主公<br>能力定位：专业型，控场<br><br><li>【背景故事】<br>身为此次起义的领袖，雅各布欣慰地看着周围这些充满着活力的人，他们刚刚攻破了西尔斯领主的城堡。并将被其关押的奴隶们释放出来并将地牢砸了个粉碎。现在他们正和刚刚被解放的亚人们一起，准备将西尔斯城主所立的丰碑给推倒。<br>“你知道我现在在想些什么吗？尤利文。”<br>雅各布向一个正在指挥着推到领主雕像的年轻人问道。<br>“先生可是在想西尔斯郊外驻扎的骑士团？”<br>尤利文看出了他的担忧。<br>雅各布应了一声，他十分清楚，将领主赶走并不意味着胜利的到来，在西尔斯领的四周，还驻扎着由领主直接统辖的骑士团。如果现在领主就跑到了那里搬救兵，那么他们最晚会在两个小时后反扑过来，将他们团团包围。<br>现在还不是该庆祝的时候！<br><br>雅各布手一挥，叫停了正在破坏领主雕像的人群。他缓步走到一个亚人身边，那是一个狐族的母亲，怀中还有一个嗷嗷待哺的幼儿。他伸出了手，但狐族母亲却接连后退，对这个人类抱有极大的戒心。哪怕是他刚刚将他们从昏暗的地牢中解救出来。<br>“别怕，我不会伤害你的。”<br>雅各布温柔的说道，他的手伸向那位母亲，这时，她怀中的婴儿伸出了小手，握住了雅各布的手指。孩子脸上带着笑容。<br>雅各布将孩子的手放在自己的手心，感受这个鲜活生命的温度，他对狐族母亲笑着说:<br>“真是一个可爱的孩子啊，从此以后，他不会再被任何人奴役了。”<br><br>在东大陆，人类对亚人的态度都是不屑一顾的，他们认为这些保留着某些动物特征的亚人是神明创造的失败产物，他们不配和人类拥有相等的地位和权利，不过只是一群会说话的牲畜。<br>但这个年轻的领导者却一反常态，他居然愿意接近被人类当成下等种族的亚人，并将他们从奴隶的境遇中解放出来，在他的眼睛中，仿佛他们和人类没什么两样……<br>周围的亚人们看到这一幕，纷纷下跪，高呼:“明王万岁！”<br>雅各布突然抬高音量，对着匍匐在地上的人们说道:“站起来，亚人兄弟们，这个世界上没有什么人值得你们下跪！”<br><br>其中一位长耳族的老者走向雅各布，他仔细地打量着这个令亚人们感到惊奇的人类领导者，雅各布也默默地注视着他，眼神清澈而明亮。<br>许久，老者眼含热泪，他情绪激动，双手颤抖地献上了一顶镶嵌着五颗宝石的金色王冠，这是长耳族世代相传的宝物，象征着他们所信仰神明的权威。<br>“神明在上，从此以后，亚人族谨遵明王调遣，明王之命即为神明之命，明王之志即为神明之志，吾族将肝脑涂地，誓死相随。”<br>而后，亚人们齐声欢呼，人类也和声相随。尤利文上前替雅各布接过王冠并叫人收好，然后走到雅各布身边，耳语道:<br>“先生，我们的探子回报，菲利普·西尔斯已经逃到城外的骑士营地了。”<br>雅各布点了点头，叫他把人们都聚集到城堡外的花园中去。在他看来当前的形势已经无法得到和平解决，他们这些起义者必须得同被解放的奴隶们联合起来保卫这个他们刚刚攻破的城邦。<br><br>没过多久，所有的义军和自由人都聚集到了花园中央，他们目视着雅各布走上了刚刚搭好的高台，他看着台下喧嚷的人群，挥手示意大家保持安静。当声音渐渐消停后，他便掏出了一叠厚厚的纸张。<br>“诸位，知道我手中的是什么吗？”<br>“那是领主颁布的各种法令！”<br>台下有个男人说道。领主就是靠这些东西剥削和压榨他们的，之前每个星期都会有各种各样的条例被颁布，上面血淋淋的每一条规则都明摆着要榨取他们的劳动果实，他们对这些害人的玩意可是恨的咬牙切齿。<br>雅各布看了一眼台下疑惑的人群，然后他的右手出现了一团火星，点燃了所有的纸张，他将着火的法令抛在空中。在火焰中，那些如同枷锁般禁锢着人们的法条一溜烟儿便化为了一撮灰烬。<br>“自今日起，那些强加在你们头顶的负担，全部消失了！你们通过劳动收获的粮食，应当属于你们自己。我代表义军宣布，从此废除一切严苛法度，西尔斯不会再有设有领主以及元老会，我们将建立我们自己的决策机构，城邦的权力将回归到你们手中！”<br><br>雅各布注意到，人们的情绪十分激动，于是他接着说道:<br>“安静一下，我们已经打破了旧社会在我们身上是束缚，但我们想建立的新秩序，是脆弱的，我们没有领主的军队，没有锋利的武器，我们甚至连西尔斯的全部领土都没掌握，但我们就一无所有吗？我们有我们爱的人，我们有在乎我们的人，在旧领主时代，我们被当成活动的工具，能说话的牲畜，但现在一切都变了，我们是和他们一样平等的人！<br>他们是靠我们拼死拼活的劳作而生活的，但这些卑劣的既得利益者宁愿将满桌的山珍海味倒进垃圾堆里，也不愿将那些残羹剩饭分给我们一口。他们把我们视为蝼蚁，草芥，所以他可以肆意夺走我们的财产，侵犯我们的尊严，现在，他们还妄想靠自己的骑士来夺走我们的生命！我要告诉你们，你们的生命只属于你们自己！死亡不属于你们！<br><br>在义军攻陷西尔斯之前，东大陆所发生的一切战争，都是强盗之间的战争，他们忽悠人们为他们买命，可人们得到的有什么？只有家破人亡！保家卫国不过是那些贵族官僚的说辞。现在的人们一天比一天清楚，这是偷窃者、强盗的战争，他们所争夺的不过是谁能分到更多的赃物，掠夺更多的土地，蹂躏和奴役更多的人民。<br>安静！听我说，我们现在，我们正处在最艰难的时期，西尔斯郊外的骑士团已经集结，他们时刻准备从我们手中抢走我们拥有的一切。他们幻想重新奴役我们，但我们的理想不只有打败他们，我们还要让自由和真理的声音在这片大陆的每一寸土地上回荡！我们要让我们的同胞和兄弟也从压迫中解放出来！我们要在这腐朽败落的废墟上建立一个新世界！<br>旧秩序已经在我们心头腐烂了，只不过让它完全消失还需要时间，我们需要加倍的警惕和耐心，大家应该守住你们的岗位，做好你们的本职。现在，我们只有一条出路，那便是胜利。我们必须战斗，直到将侵略者，压迫者，剥削者和掠夺者们永远地赶出我们世代生存的土地，让我们的后代不必为了明天的晚餐而没日没夜地辛苦奔劳。<br><br>兄弟姐妹们，为了所爱之人的幸福，你们愿意战斗吗？现在你们不再是被奴役，被压迫的下等人了，也不再是债务和徭役的奴隶。你们现在可以自己做出决定，是像一个人一样活着，还是如同猪狗一样死去。你们当然有选择的权力，你们可以战斗或是离开，领主们不会给你们选择，他们只会拿鞭子抽打你们。仔细看着吧，我有预感，一个理想的时代，一个属于你们的时代就要来了，而现在它就掌握在你们手里。”<br>台下的人们沸腾起来，不管是人类还是亚人，不管是男人还是女人，甚至八九岁的孩童都拿出了各种各样的武器，他们高呼“胜利”和“万岁”，声音震耳欲聋，时刻准备与领主手中打算反攻的军队决一死战。雅各布从腰间拔出长剑，直指苍穹。<br>“拿起武器保卫我们的家园吧！我们或许有一天会失去一切，但绝不会在今天！“<br><br>此夜，众星为殉道者而明！',
    sksn_eidehua:'<li>【基础信息】<br>角色设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=black>狐假虎威</font><br>姓名：福斯·埃得华<br><br><li>【能力数据】<br>身份定位：反贼，忠臣<br>能力定位：辅助消伤，拉牌差<br><br><li>【背景故事】<br>阿廖莎一直不知道埃德华为什么总是出去一趟后回来就多了这么多钱，而后者也闭口不谈。<br>埃得华点燃了一卷香烟，对他躺着床上养病的妻子说道:<br>我有事出去一下，今天是我们的结婚纪念日，等我回来给你个惊喜。<br>但阿廖沙却叫住了他<br>你总是这么说，可你从来都没有做到过早归，你是不是又和你的那群狐朋狗友鬼混去了？<br>但埃得华没有理会她，他披上了大衣，戴上宽边帽，活像是一位养尊处优的贵族老爷。<br><br>今天的埃得华同往常一样，将继续用他精湛地演技去诈取那些黑市商人的金钱，如果帝都上层人士看到了他，会亲切地向他行礼，因为在他们眼中，他就是那个驰骋帝都上流社会的诡诈师——爱德华爵士。但埃得华自己心里清楚，他不过是个假仗人势的骗子，一个假扮成骗子的骗子罢了。<br>但不得不说，这个假冒的身份给了他很多便利，爱德华声名远扬，而且行踪诡异，即使是耍手段套路了别人，也没有人会不讲武德来偷袭他这个小同志，这令他的伪装越来越精湛。<br>正当埃得华为从几个黑商手中诈得几根金条而窃窃自喜时，一个富有磁性的男人的声音从他身后传来，这声音他再熟悉不过了，甚至已经成了他的一部分——这是他一直模仿的，爱德华爵士的声音<br>先生，假冒我会令你感到有趣吗？<br>埃得华回身死死盯着面前这个同他十分相似的男人，他戴着一顶三角帽，帽沿边上别着一根白色的羽毛，嘴角叼着一根不知道是什么牌子的香烟，身上的华贵服饰暴露出他的贵族身份——埃德华一直模仿的正主找上门来了<br>但欺诈师的职业能力令埃得华很快镇静了下来，这里没有其他人能看到，那些赌场的老爷们还沉寂在在损失了几块金条的郁闷之中，只要这个面前的看起来深不可测男人没有太多动作，没有人会注意到他们俩个。况且，即使他要去向别人告发自己，自己也能用自己的手段进行周旋。<br>但爱德华却摆手说道:<br>放心，我不会用这种低级的手法去揭发你，既然你成功地骗到他们，那自然是你的本事。我对这种行为是没有反感的，我拿各种魔术手法去忽悠那些地下世界的黑商，和你则是用我的面貌去欺诈，两者本身没有本质的区别。<br>埃得华满脸震惊，他曾在脑海中做好了最坏的打算，但这个是他始料未及的。<br>这么说你默许了我以你的身份去欺诈别人？<br>爱德华目无表情，他压低了帽沿同他讲道：<br>是的，你当然可以继续用我的名号去骗那群傻子，只是…你就没有想过他们为什么在被骗后从来都不去找我的麻烦？你觉得他们忌惮的究竟是爱德华本人，还是爱德华的爵位？<br>他侧身从埃得华身边通过，告诫他：<br>这些泼皮无赖只有在爵士面前，才会坐下来讲道理。<br>埃得华愣了一下，但爱德华爵士没有再多说什么，他点燃了嘴角的烟，自顾自地走出了会场。<br><br>他忽然意识到了什么，如果爱德华是从赌场里面出来的，那么他早就被那些黑商看到了，也就是说，埃得华在加入赌桌前就已经被识破，难怪那些黑商在看他时总是一幅幸灾乐祸的样子，哪怕他骗走了他们的财富，他们也没有显得太过伤心……那些人，早就知道自己是冒充的，他们只是在和他演戏？那他们到底是想干什么？！<br>他急忙追上了爱德华，询问道:<br>先生，啊不，爵士，请等一下。<br>他的叫住了爱德华，后者停下了步子，却看着他一言不发。<br>您是不是已经知道我暴露了，那些商人为什么不在您面前揭发我？<br>他们可不是什么省油的灯，你骗了他们那么多钱财，他们肯定会报复，如果现在没有事在你身上发生，那就说明你周围的人会——<br>那您为什么刚才不告诉我！<br>我没有告诉一个假冒我的人他是否被别人盯上的义务！<br>爱德华义正言辞地驳斥道。<br>既然都是欺诈师，你就早该明白一切谎言都会有败露的一天。我早就说过了，他们不管你的名字是不是爱德华，他们只关心你是不是一个权势滔天的贵族。他们不敢动你，因为他们不确定你是冒充的还是真正的爱德华，但你的家人……我想她可不会变成别人的样子，如果你现在就回去的话，估计还赶的上——<br>埃得华松开了爵士的衣领。<br>混蛋……<br><br>他再不管爱德华，迈起腿来拼命往家跑，但刚到家门前，他就看到了被破坏的门框和散落一地的家具，纸张和各种厨具杂乱无章地横在道路两边，这一切都表明家里出事了……<br>阿廖沙！<br>埃得华大喊妻子的名字，但却看到了他最不想看到的一幕，阿廖沙躺在床上，衣服凌乱不堪，她的左臂被刀划破了一个大口子，血流不止，染红了床铺和地毯。<br>埃得华跪倒在阿廖莎的床榻前，他不知道该说什么，一切都是因为他的原因，才让自己无辜的妻子遭受这种无妄之灾，但后者并没有责怪他，在看见埃得华走了进来后，她反而像是松了一口气。<br>阿廖沙，坚持住，我去请医生！<br>不用了，福斯，已经太晚了……<br>不，阿廖沙，没事的，一定会没事的，你等我，我这就去。<br>但阿廖沙却用带血的手死死抓住埃得华的手臂<br>别再离开我了，福斯，你总说很快就回来……可你总是在骗我……我不想死的时候还是孤独一人……<br>对不起，阿廖沙，我对不起你……<br>埃得华无助地哽咽道，阿廖沙轻抚他的脸颊，后者将她揽入怀中保持她因流血过多而逐渐散失的体温。<br>我不怪你，福斯。我知道你做那些你并不想做的事都是在为了我，我不怪你。这是我自己用刀子划破的，他们一看到我这样，就都被吓跑了……呵呵，我没有让他们得逞……我知道你会回来的，咳咳。<br>阿廖莎知道，这个面前的男人总是满嘴谎言，但在最后他还是如约而至。<br><br>她遥记得当年他们刚刚结婚时，她静静地看着埃得华那如蓝宝石般璀璨的眼睛。<br>答应我，福斯，以后不要再去骗人了好吗？<br>但后者没有给他明确的回答。他只是尴尬地笑了笑，拍着胸脯自信地打趣道:<br>可如果不去忽悠他们的话，我怎么能给你赚来整个世界啊～<br><br>可你最终没能骗来全世界，<br>但却骗来了我……<br>阿廖莎面带着微笑，安静地阖上了眼，在她心爱的男人怀着永远地睡着了。埃得华紧紧搂住了她的身体，感受着她缓缓消逝的体温。<br><br>他忽然回想起被他冒充的爱德华讲的那句话，如果不是假借贵族之名，他怎能在这个阴暗的地下世界中混的风生水起？也是因为并非贵族的身份，所以他会随意被高位者肆意宰割，贵族……贵族……。<br>也许没有了贵族阶级，他们这些底层人，这个压抑城市、这个腐朽的国家才有出路……埃得华将她缓缓放平，在他身后，一个戴着三角帽，面容与他无异的男人倚靠在灰色的墙壁，他的半张脸隐藏在阴影中，他低着头，摘下了标志性的三角帽放在胸前，对一个无辜生命的逝去默哀。<br>埃得华紧紧握着阿廖莎的手，为她戴上了他很久之前就想送给她的戒指——这是他唯一通过打工赚钱换来的东西。他的泪水不停地滴落在她身上，他哽咽地向她保证，哪怕躺在床上的妻子再也不能回应他的话语。<br><br>阿廖莎，我答应你，这是最后一次了……',
    sksn_siji:'<li>【基础信息】<br>角色设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=red>彼岸海棠</font><br>姓名：司吉<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：控制<br><br><li>【背景故事】<br>海之都中每个匆匆疾行的人都有自己的目的，为了贸易的商人徘徊在市集中，寻找他们想要的货物，有的人则是将刚刚从渔船上卸下的海鱼摆在一旁供人挑选，并盘算着今年的收成。<br>这种祥和的景象从尼吉拉斯新王继位开始一直持续到今天，年轻的海都君主克莱门汀的执政理念不同于所有先代国王的守旧主义，他深信自由贸易能带来大量财富，并出台了一系列的政策保护商人的利益。这些商人通过雇佣船队跨越大洋到东方的阿弗斯赫特港交易来谋取巨额利润，海上航线盛极一时。<br>但克莱门汀的野心并不局限于此，他的目光放在了更遥远的彼岸，而非眼前的这一片海域。于是，无数的奇人异士前来海之都，期望得到这位青年君王的赏识，而这些人中，有一位身穿红色法袍的男人尤其出众。<br>司吉双手捧着一张航海地图，呈给了克莱门汀，后者大喜，并向司吉询问了他是如何了解自己想要什么的。司吉微微叩首，笑道:<br>我不仅知道王想要什么，我还可以帮助您得到您想要的东西，例如……彼岸的世界<br>克莱门汀起身走进司吉，打量着面前这位气宇不凡的男人，他的眼睛深邃而又神秘<br>那么你想从我这里得到什么？<br>克莱门汀抛出了这么一个问题，他想知道司吉的目的，从他的眼睛中——<br>一处安身之地，能供我侍奉神明。<br>克莱门汀没有看出司吉在说谎，不过不管他想要什么，他能带来什么才是关键。<br>彼岸的大陆，克莱门汀在未继位前就思考这件事情，他将这个宏图大业牢牢地埋在心里，从未透露，无论关于这个信息的得出是来自司吉的洞察还是所谓的神谕，他都能成为克莱门汀争霸海洋道路上的一个助力。<br>于是克莱门汀拜他为国师，而他仅仅要了王宫外的一座不大的宅子，当地人从这座府邸旁路过时，会闻到了一丝海棠花的香气。虽然被拜为了国师，得到了参政议政的权力，但司吉如同退休老臣一样，上朝次数寥寥无几，这引发了部分海都人的议论，但这些流言蜚语都在海棠的花香中飘散殆尽。<br>有人说司吉是天神的口舌，是传递神明启示的神谕者，有人说他只是个巧言令色的江湖骗子，还有的人认为他有能洞察人心的能力……<br>就在所有人都猜测司吉的神秘身份时，一位身着银甲的将领踏进了这弥漫着花香的大门，在所有人都没预料到的情况下，凯恩造访了司吉的住处，不，并不是所有人……<br>将军突然莅临寒舍，在下未能做好准备，还望将军恕罪。<br>司吉早已身着正装，见凯恩进门便躬身迎接，凯恩摆了一下手，道:<br>国师不必客气，我听闻国师三次上朝，但却未进一言，想了解一下这是为何？<br>司吉裁下一株海棠，笑道:<br>在下本是市井小民，仅会些奇技淫巧罢了，不敢妄议朝政，不过若陛下有需，在下必当尽心竭力。<br>说罢，便向凯恩递上一杯点缀着海棠花瓣的清茶。<br>凯恩品了一口这海棠花茶。<br>先王临终前，曾也递给我一杯清茶，我知道那是先王在告戒我，他告诉我无论任何情况下都应当清心寡欲，不争才可使国家安宁。先王将陛下托付与我，亦是出于此等考量。陛下年轻，朝气蓬勃，敢于进取，但也容易被人蛊惑，走上穷兵黩武的征伐之道。<br>司吉微笑着，眯着眼睛。<br>将军这是何意？<br>没什么，我只是想知道，国师心中是否如这杯茶一般清淡呢？<br>凯恩放下了茶杯，盯着司吉那令人发颤的深邃眼睛，警告道:<br>不论你要做什么，我都不会让你得逞的。<br>凯恩拂袖而去，只留下了沉默的司吉和满园含苞待放的海棠。<br>呵，不会吗？凯恩，时代可站在我这边啊……<br>司吉关上了府邸的大门，继续修剪起来他的海棠枝丫，他的眼睛中泛出一丝血红色，在他的额头中间，一道代表了邪神印记的纹路时隐时现。<br>海之都里生活的每个人都有自己的目的，克莱门汀想要统御整片大海，凯恩想要守护海都的和平，路上的行人每日每夜都在期望过更加美好的生活……而他司吉，亦是在为了一个目的活着。<br>为了达成自己的夙愿，他知道还需要很长时间的等待，不过这并没有什么关系，他已经看到了那天将会发生的一切——当满园海棠竞相开放的时候，人们将明白什么才是真正的神迹……',
    sksn_wulamu:'<li>【基础信息】<br>技能设计：琉璃菠萝<br>故事：爪巴<br>称号：<font color=slateblue>驭神的野心家</font><br>姓名：乌拉姆<br><br><li>【能力数据】<br>身份定位：反贼<br>能力定位：自爆<br><br><li>【背景故事】<br>对于阿弗斯赫特的住民来说，城主乌拉姆是一个颇有绅士风度的贵族。因为他制定的自由贸易政策，往来的商贩受他庇佑，各种族之间能互通买卖关系。<br>城主穿着很有讲究，言语谈吐也充满了苹果酒的气息，路上的商贩见城主到来，纷纷上前寒暄几句。今日的海港城邦，依旧和平。<br>在结束了一天的巡视工作后，城主回到了府邸，而迎接他的，是个戴着石鬼面的怪人。城主不屑地问道：<br>“哼，我记得我今天可没有邀请你啊，鬼厌。”<br>“但我是来解答您的疑惑的，先生”<br>鬼厌笑眯眯地回答着，从面具缝隙中透出一丝阴冷的气息。<br>城主走进庭院，在海洋神像面前停下了脚步，这是阿弗斯赫特原生的信仰，海洋之神。渔民出海前总是向她祈求。但从没有人见过她散播神迹的场面。<br>“既然是来为我答疑解惑，那么我有一个问题要问你，你觉得为什么这些愚民总是信奉那些虚无缥缈的神像呢？明明是我的军队一直在庇护着他们，而他们却拿财物供奉一个压根就没有显现过神迹的石头而不感谢我？”<br>城主不满地嘟囔。<br>“庸人总是会祈求神明的帮助，而不想着自己变强，他们仅仅是在愚昧的相信，妄图能从神明处得到好处，实际上他们根本就不在乎庙里供奉的是哪尊大神”<br>鬼厌走上前去，盯着海神像若有所思。<br>“况且，您不觉得这尊雕像已经很旧了吗？”<br>城主点了点头，语气轻蔑道：<br>“那就让我再重塑一尊新的神像吧。”<br>阿弗斯赫特的富裕源自来往的商贸税收，但与之对应的则是地下世界的黑色产业——奴隶贸易。东极是唯一承认奴隶制的国家，所以东极大量的奴隶由此销往世界各地。而城主则是掌控这个地下世界的boss。<br>“对了，那些积压的“货物”是不是到该清理的时候了”<br>城主向鬼厌询问道。<br>“这些“货物”可有许多残次品，难以直接交易，而且你的仓库已经将近饱和了吧。”<br>“那就让他们发挥最后的价值吧，带他们去加工厂，我的计划马上就能实现了”<br>鬼厌暗暗发笑：<br>“最后的价值？呵，他们的价值还多着呢”阿弗斯赫特最大的秘密，就是这个地下加工厂，在加工厂核心，有一个十多米长的巨型蓝色结晶，呈现出花朵的模样。这是由一位航海家从深海中打捞上来的未知生命体。原先仅仅有十公分长，但如今已成庞然大物。<br>城主通过古籍得知，此物名为深渊之花，传说祂以生物的血肉为养料，当其盛放之时，神迹就会降临，海平面将被冰封千里，大雾将弥漫滩涂，鲸群将搁浅自杀。而这一切都是为了迎接祂的莅临——曾经统治了大海的深渊霸主帕朵玛拉。<br>城主建立这加工厂，用奴隶的血肉滋养帕朵玛拉，为的就是获得祂的力量，当神迹出现在他的城市之时，他便能以此号令四方。<br>利用这尊远古邪神的力量，到时候什么东极海都，通通都会被他踩在脚下。<br>终于，在某天海岸出现了冰层和大雾之后，城主宣告了神迹的降临。<br>一声令下，海港的卫队推倒了港口耸立的海洋女神像，整个阿弗斯赫特，改信深渊之神帕朵玛拉。<br>“你就不怕东极来报复吗？”<br>鬼厌冷笑道。<br>城主站在城墙上眺望着海岸线上缓缓落下的夕阳，染红的天空如同魔鬼的笑容一样，残忍而妖艳。<br>“当深渊之花的力量觉醒之时，在这片大海上，我将天下无敌。”',
    sksn_kaien:'<li>【基础信息】<br>角色设计：§<br>故事：爪巴<br>称号：<font color=blue>御海之盾</font><br>姓名：凯恩<br><br><li>【能力数据】<br>身份定位：忠臣<br>能力定位：辅助型，群殴<br><br><li>【背景故事】<br>一份航海图被平铺到作战室的桌上，四周是不安的同僚和各舰的代表。而在航海图旁拿着直尺不断进行丈量的，是吉尼拉斯王国的海军统帅—凯恩将军<br>“此次与琼斯合作进攻阿弗斯赫特，诸位将士有何高见？”<br>凯恩放下了直尺，重新戴上了他的单片眼镜。他从办公桌的抽屉里拿出一瓶朗姆酒，为一位下属斟上，后者连连鞠躬，凯恩将军可是他的偶像，在年轻一辈将士中有极高声望，因为只有凯恩在战场前线与他们共同进退，至死不渝。也只有凯恩会在作战之前，将他们这些资历尚浅的将领召来询问他们的意见。<br>“别紧张，年轻的海兵，在作战会议中，你可以将自己的想法都说出来，这里没有官阶和职位的限制，也没有什么资历和出身的要求，只要你的提议是为了海都的利益，我都会考虑”<br>见将军如此开明，诸位将士也不好再推脱.<br>“将军，我想不明白，为什么我们要与一介海盗合作，明明琼斯那个混蛋曾经烧杀抢掠我们的船舶，在我刚当上一名水手的时候，我的战友也因他丧命，王为什么还要招安这种渣滓？”<br>“就是，我宁肯跟他拼个你死我活。不就是阿弗斯赫特吗？只有我们也一样能打垮它”<br>“对，我们先灭了海盗！”<br>凯恩注视着这些热血沸腾的年轻人，他突然想到了自己刚刚成为海兵时，老船长就语重心长的告诉他：当你有能力保护这艘船上绝大多数人的安全时，你就能成为这艘船的船长了。他一直以老船长为榜样，在海都的近海守护着出发与归来的渔民。<br>直到那一天，地平线上升起了一条条黑色骷髅旗，炮火直直轰向海岸，老船长为了掩护渔民撤退，被炮弹炸死，葬身大海。余下的船员惊慌失措，死伤参半，凯恩在绝望中回想起老船长的话，他站了出来：<br>“大家先冷静！听我说，如果我们这么乱下去而不还击，我们就只有死路一条了，兄弟们，跟在我后面，我们去闯出一条血路来！”<br>在他有条不紊的指挥下，船员开始还击。为置死地而后生，他命令舵手全速撞击为首的船只。顶着千百道炮火，凯恩的船与为首的海盗船猛烈碰撞。混乱之中，凯恩的枪对准了敌船的船长，一个长着浓密络腮胡，满脸凶相的海盗。而对方也举着一把火统对着他，两人没有任何交谈，在炮火硝烟和折断的桅杆之下，海兵与海盗同时扣动扳机……<br>“没想到，那时候碰见的海盗，居然是如今海盗之王的父亲……”凯恩囔囔道<br>他将自己的佩枪放在了航海图上，枪口指向图上的阿弗斯赫特。对着四周的将士们说：<br>“与琼斯合作并非我意，但王如此做一定有他的考量，我知道诸位对海盗都是深恶痛绝，我也是如此。不过，此次我们的目标是阿弗斯赫特，乌拉姆背弃了神明，如果我们不去处理掉他，迟早有一天他会来攻打我们，而且阿弗斯赫特的军队与海盗孰强孰弱，诸位也心知肚明，不妨先让他们彼此消耗，我们坐观虎斗再一网打尽”<br>凯恩环视着这些令他骄傲的年轻人，他们是未来维护海上和平的中坚力量，不过现在他们还需要一场磨练。<br>“诸位，我已经有了一个计划，可使海都风平浪静，重返祥和安宁。即使王已招安了琼斯，但大海绝不能是海盗的大海！” ',
    sksn_qiongsi:'<li>【基础信息】<br>角色设计：§<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=red>袭海劫浪</font><br>姓名：琼斯<br><br><li>【能力数据】<br>身份定位：反贼<br>能力定位：刺杀型，破核<br><br><li>【背景故事】<br>在这海上最令人闻风丧胆的名字，不是天神路西法，而是海盗王琼斯。<br>南部之海的一片汪洋上，一面飘扬的骷髅旗帜闪耀在阳光之下。在瞭望台上，黑色的身影正在用望远镜查探着什么。<br>“哼。那东西果然是不祥之物，还好我趁早将他出手给了那个蠢蛋。”<br>“船长。”<br>身着水手服饰的小矮子爬上瞭望台，<br>“那位先生……”<br>“呸！晦气！”<br>船长一甩袖子，将望远镜抛给那水手，一口痰吐向大海中，<br>“那狗东西又惹了什么祸？”<br>“船长，他说。。。”<br>“罢了，我亲自下去问他。”<br>船中的贵宾室，身着名贵衣服的男子瘫在华贵的座椅上，细细品着尼吉拉斯最好的葡萄酒。<br>“碰！”贵宾室门应声而开，黑色身影拿着早已上膛的手枪，对准着正是那所谓的“尼吉拉斯王使”。<br>“琼斯船长，凯恩将军派人告诉我，你的船队行进颇慢，不知为何？难道是怕了那阿弗斯赫特的船队，亦或是，船长不肯放下那海盗王的名声，为我尼吉拉斯王国效力？”<br>哪里有什么凯恩将军的使者，只是这王使的走私船队时常被琼斯掠夺，这次正好公报私仇罢了。<br>“少放屁！我们船长可是你们什么狗屁王国求着才答应助他一臂之力的，你们王国在我们眼里什么也不是！”<br>那水手掏出腰间弯刀，怒喝道。<br>“怎么？你们还想杀掉尼吉拉斯王使？琼斯船长明明答应归顺了，不是。。。”<br>枪声一响，整个贵宾室便洒满了那王使的血和脑浆。<br>琼斯吹去了枪口还在冒出的黑烟，淡然道：<br>“把这个房间收拾一下。至于那凯恩，等到占领阿弗斯赫特，再收拾不迟。”<br>夜幕降临，被月光撒满的甲板上，只有掌舵都身影。琼斯默默的擦拭着心爱的“黑色摩尔”——这是他对自己手枪的爱称。<br>“父亲被凯恩杀死，如今我却要和杀父仇人在同一阵线。父亲，您会原谅我吗。。愿路西法大人保佑您。路西法大人，大概不会原谅将那东西重现世间的我吧。”<br>十几年前，琼斯还没有“海盗王”的名号，只是个继承了父亲的船队的愣头青而已。船队航行偏离了轨道，来到了一处冰川。<br>“船长，那里竟有紫色的光芒绽放！”<br>“一定是远古失落的宝藏！准备靠岸，一定要将宝藏取出！”<br>众人大费周章之后，取出的只是一朵巨大的花苞。<br>“船长。。”<br>“罢了，这东西不能砸我们手里，去阿弗斯赫特吧，那里肯定诱人对这种东西感兴趣。”<br>琼斯叹了一口气，发出连他自己都不怎么相信的声音。没想到，那身居高位的城主竟对这种东西感兴趣，花了大价钱买了下来，而船队也借此发展至今如此庞大的规模。<br>“这次，就让我弥补我的过错，重新获得路西法大人的庇佑——庇佑我亲手解决掉我的杀父仇人。”<br>琼斯点上了烟斗，一缕青烟徐徐升起。',
      sksn_qiongsi_soul:'在重做前这只是一个没有任何卵用的肉盾罢了……',
    sksn_guiyan:'<li>【基础信息】<br>角色设计：爪巴<br>故事：爪巴<br>称号：<font color=slateblue>人间恶魔</font><br>姓名：鬼厌<br><br><li>【能力数据】<br>身份定位：内奸<br>能力定位：专业型，拼点<br><br><li>【背景故事】<br>“鬼厌<br>原名不详，自称鬼厌。<br>“使恶越来越强大的，不是恶本身的力量，而是善的妥协与退让！”<br>“如果你们就这么一哄而散地逃跑了，过不了多久就会重新被捉住，这里是用你们的双手建造的城市，你们为什么不能是它的主人？<br>阿弗斯赫特的地下世界，弥漫着恐怖的气息。灯光昏暗的广场上，戴着石鬼面的黑衣男子正在激昂地演说着。<br>台下的人们大多衣衫褴褛，有的甚至只赤裸着上身，露出被鞭笞过的血痕。<br>“鬼厌大人说的有道理！我们凭什么给那些奴隶主干活？凭什么要我们抛弃我们原本的信仰去供奉所谓的‘新神’？”<br>看着台下的骚乱，鬼厌那石鬼面下丑陋的面目逐渐显现出一丝得意。<br>“没错，就是这样，继续躁动起来吧！”<br><br>“不好，是城主的卫兵！”人群中传出一道刺耳的声音，不远处的广场入口涌入着身着白色铠甲的士兵。<br>“城主大人之命，封锁这里，捉拿妖言惑众者！”为首的士兵首领佩剑出鞘，刀锋所向，正是那刚才还在台上激昂演说的鬼厌。<br>“哼，这么快便被那蠢人发现了么。。”鬼厌心中盘算着，“罢了，时机已到，这里也不再需要我了。”<br>鬼厌冲那领头的人扬了扬头：“城主大人，是一个愚蠢的人，你们又何必为他卖命呢？而且，就凭你们，还没办法抓住我。”<br>鬼厌身形一动，演讲台上爆裂声起，黑色的烟幕便彻底掩盖住了鬼厌的身影。<br>“还等什么呢？你们并没有被神明抛弃，只是时机未到。此刻正是向神明展现你们忠诚的时刻！”<br>“还在妖言惑众，给我抓。。。”为首的士兵话还未说完，头部便传来疼痛的感觉。<br>“兄弟们，鬼厌大人是神明的使者，面前是亵渎神明的人，不必惧怕他们，让我们一起反抗，神明定会保佑我们！”一体型壮硕，身上布满鞭痕的男子振臂高呼，首先冲了上去。<br><br>“这群暴民！”富丽堂皇的城主府中，衣着华贵的男子坐在城主之位上，将手中的酒杯扔了出去，“鬼厌人呢？竟敢欺骗于我，本城主定要将他押上火刑架！”<br>“城主，叛乱开始时，他早已消失的无影无踪了。”<br>“一群饭桶！还不快将鬼厌给我抓来！”<br>“那地下世界的骚乱。。。”<br>“一群暴民而已，现在当务之急是将鬼厌抓住！明白么？”<br>“是，城主大人。”<br><br>地下世界的阴影之中，一双眼睛默默注视着城主府与奴隶们的械斗。<br>“就算血流成河又怎样？我就是要让这个世界陷入永久的混乱之中。”',
    sksn_aodinggelan:'<li>【基础信息】<br>角色设计：寰宇星城<br>故事：寰宇星城<br>称号：<font color=grey>卫道先师</font><br>姓名：奥丁格兰<br><br><li>【能力数据】<br>身份定位：忠臣<br>能力定位：辅助型，过牌<br><br><li>【背景故事】<br>金黄色的太阳高高地挂在天空上，散发着灼热的光芒，将空气烤的炙热。明明是三伏夏日，路西费尔帝国最大的学院——凯洛亚学院的广场上，却宛如秋冬一般死寂。硕大的十字架立在广场的正中央，拖下一道长长的阴影。在那十字架的顶端，绑着一个瘦弱的身影，他抬起头来，望向帝都的北方，目光里，充斥着不舍，惋惜，还有一丝坚毅。<br><br>十字架的周围，站满了全副武装的帝国骑士，为首的那人，骑着一匹高大的白马，手里提着一把闪闪发亮的长枪，直直地指着那十字架上可怜的“罪人”。<br><br>“奥丁格兰，主会给所有的罪人最后一次机会。你一直拒绝为主传播光明的福音，用那地狱邪魔的歪理邪说蛊惑学院的学生们。念在你为帝都执教多年，也算有功，今日，你若承诺从此不再传播那罪恶的邪魔的理论，安心接受主的圣光，作为主在人间的代言人，我可以释放你。毕竟，神爱祂的每一个子民！但是，作为不顺从的羊羔，等待他的，只有地狱的烈火！你可要想好了！”<br><br>“哈……哈哈哈哈哈……歪理？邪说？”，十字架上的人低头，望了那主的代言人一眼，“我在学院这五年来，带领着我的学生们，为探究这个世界存在的真理，走过了帝都无数山川河流，做过无数实验，记录过无数的手稿，推翻了无数的假设，最终才得到的事实，居然被你们说是歪理邪说？那你们口中的主，又是什么？是你们妄想的产物？塞缪尔，你这个无耻卑劣的小人，我不知道你用什么方法，让这个国家陷入无知与疯狂，但是，你以为处死我一个，便能将客观的真理从这个世界上抹杀吗？”<br><br>“呵呵，奥丁格兰，不愧是个教书的先生，如此牙尖嘴利！抹杀真理？你看看，这是什么？”，塞缪尔并没有生气，反而露出了嘲讽的笑容，用手往旁边一指。<br><br>十字架旁，几名骑士将一卷卷厚重的羊皮纸扔到了地上。<br><br>“塞缪尔……你！”，奥丁格兰愤怒的目光盯着塞缪尔，仿佛那眼中的烈火，要将这面前的小人焚尽。<br><br>“你这老师是块硬骨头，只可惜学生不是。你存在他们那里，诋毁着主的恩惠的谤书，托主的福，已经被我全部查获了。奥丁格兰，这下你便是去地狱见了邪魔，也难以交代吧？”，塞缪尔用手向那一堆书卷一指，火焰魔法飞腾而去，熊熊火光，滚滚浓烟，刹那间，奥丁格兰一生的心血消失殆尽。<br><br>奥丁格兰没有说话，他的眼眶湿润了，流下的两行却不是眼泪，而是殷红的鲜血。<br><br>孩子们……老师……不怪你们。你们……一定要活下去……只有你们活下去……才能拯救帝都的未来。老师无能，这个世界，靠你们了……<br><br>奥丁格兰对着天空喃喃道，没有人知道他说了什么。随着塞缪尔一声令下，两根粗长的铁锁，在他的身上越勒越紧，直到带走他的最后一丝呼吸。<br><br>鲜血顺着十字架淌了下来，染红了学院的土地。四周的蝉鸣，仿佛在为着被主抛弃的罪人，送上最后的挽歌。',
    sksn_tiexin:'<li>【基础信息】<br>角色设计：帷幕<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=orange>钢铁之心</font><br>姓名：铁心<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：专业型，装备合成，过牌<br><br><li>【背景故事】<br>东极城的一个偏僻地方，坐落着一个好不起眼的铁匠铺。这里，是铸器大师铁心的居所。<br>铛铛的打铁声终于停下，一个壮汉放下手中的重锤，那重锤落地之时，似乎地面都颤抖了一下。<br>壮汉拿着已经被煤炭染黑的毛巾擦去头上的汗，满是茧子的大手端起了小巧的茶杯。<br>“这柄剑终于要出世了。”<br>壮汉大笑一声，“也不枉我这么多天的辛苦。”<br>三个月前，身着路西费尔教会服饰的男子造访了这座不起眼的铁匠铺。<br>“铁心大人，我是路西费尔教会执法者塞缪尔，请求您为我打造一柄圣剑。”<br>房间内传出了震耳欲聋的呼噜声，似乎这座铁匠铺的主人还沉浸在梦乡中。<br>“铁心大人，希望您不要拒绝在下的请求。<br>呼噜声终于停了下来。<br>“我不是什么大人，就是一个小铁匠，没能力为教会打造兵器。”<br>粗犷的声音自房间中传出，震得塞缪尔的耳朵一阵疼痛。<br>“您也是信仰天神的，为何要拒绝一个天神维护者的请求。”<br>“我说没能力，就是没能力。”<br>听到此话，塞缪尔无奈的苦笑一声，但仍没有离去。<br>“你还不走？”<br>赤裸着胸膛的壮汉打开房门，<br>“我要开始铸器了。”<br>“在下就在这里，等候着您的回应。”<br>“哼，真是烦人的苍蝇。”<br>整整一个月，塞缪尔都没有离开铁匠铺，平时只是靠着自身携带的干粮充饥。<br>“喂，给我把茶端过来。”<br>壮汉停下手中的挥锤，对着塞缪尔说道，塞缪尔连忙将桌上的茶杯端上。<br>“我问你，为何找我铸器。”<br>“因为您是这个世界上最好的铸器大师，我希望能够得到您亲手所铸的武器。”<br>“拿到武器，你待如何？”<br>“当然是替天神诛杀那些异端。”<br>“小子，你还是太年轻了。终有一天你会明白的。”<br>壮汉将杯中的茶一饮而尽，<br>“我答应为你铸器，但是，一年，这柄武器只能出鞘一次。”<br>“在下愿意遵守。”<br>“回路西费尔吧，你在这里很影响我铸器。”<br>“是，铁心大人。”<br>“阿廖尔，我可没答应要替那小子打造武器。”<br>从铁匠铺内室中走出一名女子，声音轻柔，却是有着不可违抗的威严。<br>那壮汉连忙低头，<br>“铁心。那小子，挺合老夫口味的，有毅力，只可惜。。。”<br>阿廖尔抬起头来，端详着那柄已经开锋的剑，在阳光下也闪耀的昏暗的光。<br>“罢了，那少年有着非同凡人的毅力，或许有着神明的眷顾，而且他，迟早会懂事的。”<br>铁心淡淡地道，<br>“这柄武器不合格，我来亲自打造。”<br>“铁心，你终于要重开铸器了么！”<br>“仅此一次。”<br>“还有，你竟然敢假扮我，给我滚去阿弗斯赫特替我取来上好的铁矿！”<br>“老婆大人。。。。”<br>“你再敢说？”',
    sksn_xintianbuzhi:'<li>【基础信息】<br>角色设计：别动霊夢书のお金箱<br>故事：爪巴<br>角色配音：小萌泪<br>称号：<font color=cyan>特异持有者</font><br>姓名：新田歩凪<br><br><li>【能力数据】<br>身份定位：全能<br>能力定位：专业型，随机技能<br><br><li>【背景故事】<br> “如果你拥有了改变世界的力量，你会用它做什么？”<br>这是旧世界崩坏之时，新田布止从耳旁听到的呓语……<br>“我们来到这里也有好几年了吧？”<br>布止双手托着脸颊趴在高塔的围栏上，呆呆地看着远方的原野，在她身边，一个身着黑白条纹帽衫的少年正在摆弄着一个镶金瞭望镜。他是海之都世纪高塔的建造者东方弘道，亦是从旧世界穿越而来的幸存者<br>“嗯，有些年数了……过的真快啊，一晃眼，整个世界都变了啊。”<br>布止闷闷不乐地说“那为什么我还没有觉醒力量啊？！不是说我们这些幸存者都或多或少地获得了“时空的馈赠”吗？但现在好像就我一个穿越者还是个弱鸡…”<br>东方弘道轻轻地揉了揉她的脑袋：“别想这么多了，福祸相依，谁也不知道力量会带来什么，你啊，就是小说动漫看多了，天天胡思乱想。”<br>布止把他的手拍开，撅着嘴说：“哼，站着说话不腰疼！你不也靠【筑城】的力量才建造了这个高塔吗？要是你跟我一样弱，人家国王怎么会正眼瞧你？”<br>东方依靠着栏杆，看向东方的海岸：“我建造这座塔楼，只是为了能在远处眺望海岸。我从来都没有想过要用它做什么，可能也不会再使用这个力量了……”<br>布止看着这个和她同年纪的少年，阳光洒在他身上，如同守望着渔船的灯塔一样。经历着她无法想象的沧桑，他开口道：<br>“我自幼在山中长大，只在电视上看过海洋，按理说我应该会很向往它，但实际上，海洋让我感到恐惧……人会对未知的事物感到恐惧。结果到头来我却来到了这么一个三面环海的国家，我害怕海啊，于是我用力量创造了这个高塔，目的就是为了能远远地看着它。它很美，也很危险。”<br>东方回过头来，对布止笑着说：“所以啊，力量也是同理，未知的力量可能会带来灾祸，像你这样的小女孩，一旦觉醒了什么坏能力，就会被人抓住关起来哦！”<br>“明明是个小屁孩，讲什么大道理啊…”<br>布止明显什么都没听进去。<br>“等我有了力量，我就出海去，成为王路飞一样的男人！呵呵呵…”布止傻呵呵地计划道<br>“男人？呵，你也得有硬件啊。”<br>“呸！hentai！”<br>东方没有理她，径直走开，他知道布止是不可能一辈子就呆在这个高塔里，但这个世界充满了危险，她一个没有觉醒任何力量的旧世界来客，是没有办法在外面独自生存的。但现在，他没有时间再想这些事了，东方对着一个水晶石说道：<br>“联系凯恩，就说我想请他帮我一个忙……”<br>——————<br>“今天怎么想出去了？我还以为你要当一辈子死宅呢。”布止锤了锤东方弘道的后背。<br>“你不说想出海吗？今天我们就去港口转一转。跟紧我”东方握紧了她的小手<br>“喂，转就转，你抓那么紧干什么？我们又不是情侣，你这样会让人误会的！喂，你在想什么？你有在听吗？变态，色狼，死宅！放开我。”<br>“别说话，布止，陪我走一会好吗？”<br>布止愣了愣，她发现今天东方弘道有些不对劲，但她说不出来有什么不同。当她刚来到异世界时，噗通一声落进了广场的水池中，虽然水池不是很深，但她身高不够，外加不会游泳，差点被呛死。是东方弘道将她捞了出来，一直照顾她。在她刚来的第一年，东方天天跟她上这个世界的常识课，她也自己感受到了，异世界人对他们抱有不明显的敌意，但害怕他们穿越者的力量而没有表现出来。她没有异世界的朋友，异世界的孩子和她有着思想和行为的天堑。东方弘道说，只有我们这些时空的幸存者才能彼此照应，他们都把我们当成怪物。一个没有了力量的怪物，会被恐惧怪物的人们怎么对待？所以，东方弘道从未允许她独自一人出过高塔。东方弘道倒是不怎么出门，他一直在研究什么东西，还从水晶屏幕前和一个老头交谈，那个老头好像叫什么……格兰？<br>“你是不是，有什么事在瞒着我？”布止停下了脚步，严肃地问他。<br>“没有，只是今天突然想近距离地看看海。”<br>东方弘道向前方出现的一行人招了招手：<br>“喂，在这里！”<br>迎面走来了一个披着海狸皮的男人，后面还跟着几个穿着水手服的海兵。<br>“凯恩，好久不见了”东方弘道寒暄道。<br>“行了东方，客套话就免了，这位就是你说的那个老乡吧？”<br>“嗯，她叫新田布止，这是凯恩将军。”<br>“您就是那个大名鼎鼎的凯恩将军？”布止眼中闪烁着星星，显然凯恩的威名远扬。<br>“布止，你先跟凯恩去看看他的战舰，我去市场买点海货。”<br>“知道了，快走吧你，凯恩将军，我能去看看您的船吗？”<br>“叫我凯恩就好了，东方小友，那么我就先领小布止去船上了”<br>“好，那么，布止。”<br>“嗯？”<br>“再见……”他微笑着，转过身去消失不见了<br>“再……见？”布止不知道他说再见干什么，毕竟这个家伙，从来都不煽情……<br>——————<br>当晚，燃烧的火舌吞噬了整个世纪高塔，距海之都官方描述，高塔的主人东方弘道在高塔起火时被困，待到火灭之后，只发现了一具烧焦的尸体，另外，高塔里住着的另一个女孩下落不明……<br>凯恩叹了口气，望着甲板上沉默不语的少女，自从那晚之后，她就再没有说过一句话，随行的异能者说，她的体内多了一种力量，和那天那个与她同行的男孩一样的力量。<br>布止看着船桨划出的浪花，囔囔道：<br>“这有什么可怕的呢？你这家伙……等着瞧吧，总有一天，大海，以及这个世界，都不会再让人感到恐惧了……”<br>她举起了右手，海面上突然冲出一道水柱，在她的操纵下变换，移动。卷起海底的沙石构造出一个又一个精妙绝伦的艺术品。<br>她不再是那个没有能力的小女孩了，此刻的新田布止，宛若缔造万物的神明。',
    sksn_ailuoyi:'<li>【基础信息】<br>角色设计：§<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=grey>星辰唤魔使</font><br>姓名：艾萝依<br><br><li>【能力数据】<br>身份定位：主公，内奸<br>能力定位：专业型，召唤随从<br><br><li>【背景故事】<br>为何凡人会惧怕死亡？为何连我，也无法逃脱死亡的怪圈？<br>路西费尔王都，居住着“世界上最伟大的预言者”——艾萝依。<br>这是世人给予她的尊贵称呼，路西费尔三世亲自下诏为她建造了一座通天尖塔供她居住。<br>雍容淡雅的房间内，红衣女子安静地坐在梳妆台前。<br>“神谕降临，竟然发出了那种声音。”艾萝依双眸紧闭，“神谕从来都是下达和平安详的指令，而这次，正好在裂隙出现之后。”<br>“艾萝依大人，何必操心凡人之事呢，这些事情与您无关。”艾萝依身后的虚影温柔的为她梳着长发。<br>“我似乎还没有允许你开口说话吧。”<br>“抱歉，艾萝依大人。我只是不愿看到您如此操心。”<br>“也罢。”<br><br>良久，艾萝依才开口道：“你还记得我们第一次相遇么。”<br>“当然记得，艾萝依大人。”<br>那一年，艾萝依才仅仅五岁。天空阴云密布的夜晚，本就该是休息的时刻。此时的村庄，却闪耀着火光——那是村民们举着的火把，而透过火炬，却能看到一道比火光更为耀眼的光芒。<br>“这个小女孩，是被诅咒的天谴。我们绝对不能留下她。”白发苍苍的老人眼神凌厉，无可置疑地说道。<br>“村长，可是。。。”<br>“没有可是！五年前将她从那个森林中抱出来就是一个错误的决定！以路西法之名，我们必须将她放在火刑架上。”<br>小小的艾萝依惊恐的看着这群围在她身边的大人们，不知道为什么，以前对她关爱有加的村民们忽然对她如此态度。艾萝依没有任何力量，只能轻轻的啜泣着，但是，这改变不了村民要烧死她的事实。<br>“喂，小丫头，想逃么？”<b4>“是谁在说话？”艾萝依脑海中忽然传出一个沙哑的声音。<br>“我是来帮助你的，把两只手放到地面。”<br>此刻的艾萝依，没有任何选择。那声音似乎有着蛊惑人心的力量，艾萝依的双手已经不自觉的放到了地面上。<br>地面上渐渐显出一道封印术法，黑色的魔能之力从中倾泻而出。<br>“这，这是什么？”村民们惶恐的盯着那力量中的身影，火把被扔到了地上。<br>“哼，无知的人类。”那身影只是一挥胳臂，村民们就已经倒在地上，气绝而亡。<br>艾萝依安静地看着那身影的屠杀，她似乎感觉到了死亡，这似乎是一种美妙的感觉。<br>“喂，你叫什么名字？”<br>艾萝依正沉浸在这种感觉之中，甚至没有发现屠杀掉整个村子的身影已经来到了她面前。<br>“你也要杀掉我吗？”艾萝依轻轻地开口道。<br>“为何我要杀掉你？”<br>“因为你带来的不是光明，是死亡。”<br>“哼。我不会杀掉你，我会一直跟着你，恢复我的力量，直到我能与那朵花再相见。”',
    sksn_saimiuer:'<li>【基础信息】<br>角色设计：§<br>故事：帷幕<br>称号：<font color=yellow>上帝的义人</font><br>姓名：塞缪尔<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：斗士型，爆发，反击<br><br><li>【背景故事】<br>塞缪尔是帝都教会的一名执行者，同时也是一名体内蕴含强大能力的异能者，被帝都的人们称之为上帝的义人。<br>他身穿暗金战甲，手上拿着由东极最好的铁匠打造的暗金圣剑，不不服从于教会的人都由他裁决，如今的他已是一人之下万人之上，可谁知道他辉煌背后有着一段这样的故事。<br>七年前在尼吉拉斯王国，还是青少年的塞缪尔在野外狩猎意外受到魔种袭击身受重伤，被路过的剑圣兰伯特所救，受伤痊愈后塞缪尔决定拜他为师从此以后与他一起四处流浪，四处修行.<br>但好景不长他们路过了一个叫路西费尔帝国（现帝都）的国家，此时这个国家的教会正在处置被关押的犯人，看到一个又一个人头落地.<br>塞缪尔忍不住冲上前去问：为什么要这样做？执行者怒斥道：我们这是在执行正义，来人把这个小子给我带下去！<br>什么是正义？塞缪尔挣扎着问道。教会就是正义，一切违抗教会的人通通都将受到裁决！执行者回答道。<br>这句话深深的刻在了年少无知的塞缪尔心中，此后他问师傅兰伯特什么是正义，兰伯特也回应了他。<br>但是塞缪尔更倾向于前者，最后两人因为理念不同而分道扬镳。<br>三年后塞缪尔加入了帝都的教会，以他从剑圣兰伯特那学来的实力，仅仅只用了一年时间就成为了教会的执行者。<br>如今师徒二人必将会有一场大战究竟是哪一方的正义更胜一筹呢？敬请期待...',
    sksn_lanbote:'<li>【基础信息】<br>角色设计：帷幕<br>故事：帷幕<br>角色配音：陆寿<br>称号：<font color=cyan>流浪剑圣</font><br>姓名：兰伯特<br><br><li>【能力数据】<br>身份定位：主公，内奸<br>能力定位：斗士型，反弹，过牌<br><br><li>【背景故事】<br>兰伯特是世上最强的剑术大师，人们都称他为剑圣，他为了寻找最强的对手而四处流浪，在尼吉拉斯王国郊外解救了被魔种袭击的塞缪尔，在其伤势痊愈后收他为徒，此后两人一起踏上了旅途，<br>在途中兰伯特教会了塞缪尔很多很多，塞缪尔天赋过人在几个月的时间内进步神速，兰伯特也十分欣慰，<br>但好景不长两人来到了路西费尔帝国（简称帝都）在这里整个国家都由教会统治着，人们崇拜着教会认为教会是唯一离神明最近的地方，认为教会就是正义，<br>塞缪尔也被灌输了这样的思想，此后迷茫的塞缪尔问兰伯特：什么是正义？<br>兰伯特回答道：正义？胜利就是正义，唯有胜利者才能定义正义。<br>显然这个回答让塞缪尔心中更倾向于前者，此后塞缪尔跟随了兰伯特两年后最终因为理念不同而分道扬镳。<br>四年后一名不愿意透露姓名的刺杀者找到了兰伯特，称自己为反叛军的首领，并告诉了他塞缪尔的所在地，<br>他决定为自己愚蠢的徒弟上一课，此后兰伯特加入了反叛军，在这为无名刺杀者的带领下，师徒二人也即将开始一场大战，<br>究竟是哪一方的正义更胜一筹呢？敬请期待..',
    sksn_jianiao:'<li>【基础信息】<br>角色设计：瑾公周<br>背景故事：竹林七闲.（林啸霜）<br>称号：<font color=red>无名刺杀者</font><br>姓名：提隆·嘉尼奥<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：专业型，减伤，爆发，减益buff<br><br><li>【背景故事】<br>“我并非生来就是为了混乱，我生于战乱，将服侍于秩序。”<br>“嘉尼奥先生。”<br>路西费尔王都的贫民窟中，一名穿着西装的男子慢慢走近了一名已经饿到躺在街上的男孩。<br>“孩子，来，这是温妮面包房的面包，快吃吧。”<br“谢谢你，嘉尼奥先生。”男孩赶紧感谢了一句，从嘉尼奥手中夺过面包，开始狼吞虎咽。<br>“乖孩子，不着急，慢慢吃。”<br>“哟，嘉尼奥先生，您也来了啊。”<br>“嗯？”嘉尼奥起身，侧目一看。<br>“艾德华先生，您竟然也回来这种地方吗？”嘉尼奥微笑着打趣道。来者正是路西费尔贵族，艾德华。<br>“怎么？难道只允许您来？”艾德华也笑着回应着。<br>三年前，艾德华在酒馆结识了提隆.嘉尼奥。当时的嘉尼奥坐在角落里，一杯啤酒每次都是浅尝即止。喝醉了的艾德华前去劝酒，却被嘉尼奥暴打了一顿。<br><br>两人站在贫民窟的入口，艾德华从怀中取出一只烟斗，递给嘉尼奥。<br>“真不愧是贵族啊。”嘉尼奥收下烟斗，一缕青烟徐徐升起。<br>“你其实，是不太喜欢我的吧。”艾德华叼着烟斗，看着贫民窟中的人间地狱。<br>“或许有一些吧。可能是你的身份，可能是你的做法。”<br>“但是，我们都有同一个理想。”<br>“哦？”嘉尼奥侧目以视，“艾德华先生，竟然知道我的理想么？”<br>“我生来便是贵族，这是我无法改变的事实。现在的王国，贫民人数远远多于贵族。这意味着，要摧毁这个腐朽的帝国，其实很容易。”<br>“我本意并非摧毁。”嘉尼奥神情严肃。<br>“而是为了创建新的秩序。”两人异口同声道。<br>良久，嘉尼奥向艾德华伸出手掌。<br>“欢迎加入雾言联盟。”<br>“静听盟主差遣。”艾德华伸出手，两只手紧紧地握在一起。',
    sksn_fuleicha:'<li>【基础信息】<br>角色设计：瑾公周<br>故事：爪巴<br>称号：<font color=orange>军火大师</font><br>姓名：杰西·弗雷查<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：专业型，合成，群伤，摸牌<br><br><li>【背景故事】<br>帝都城中，有一家特殊的武器铺，而铺主弗雷查则是享誉帝都的铁匠，传闻他的兵器削铁如泥，轻如蝉翼，但这并不是他成名的原因。<br>没有人知道他来自哪里，只知道三个月年前，他向骑士团要到了帝都的一个铺子，也就是现在他锻造兵器的地方。而现在他正锻打着一把玄铁宝剑。<br>在弗雷查将铁剑放入冷水中淬火的时候，一位头戴暗红色斗笠的中年男人踏进了他的铺子，但他并没有看一眼铺子墙壁上挂着的各色兵器，反而直接走到了弗雷查身边询问道：<br>“大师手里正锻造的这把剑，比起周围挂着展示的如何？”<br>弗雷查抬起头来注视着这位不像是来买兵器的“顾客”，敷衍道:<br>“差不了多少。”<br>“哦，是吗？如果这把兵器比其他的都强，我倒是现在就想把他买下来。”<br>“武器没有强弱之分，我记得这是你们帝都的一位骑士说过的话吧。”<br>弗雷查不耐烦地回道。<br>“武器是没有强弱之分，但只限于冷锋相交，海都的军队配备过一种远程的武器，名为火统，比弓箭威力大，射程远，操作便利。但我知道在大师所锻造的诸多武器中，有一样能破坏神明所构造的大地。”<br>“你……”<br>弗雷查表情严肃起来，他当然知道这个男人指的是什么，时空裂缝出现后，他为了制造出能让普通人对抗异能者的兵器，拜访了诸多名匠，但大多都是刀叉剑戟，没有一样能跳出现有的体系，直到他看到了海都的火统枪，他才意识到，原来在异世界中枪还是有用武之地，只需要稍加改良就能让没有能力的普通人对抗异能者。既然如此，那么为什么不能把旧世界的热武器全部造搬进来呢？<br>于是他开始研究火药和弹丸，走访每一处战场，根据战争中的残存的灵能和各种因灵能爆发而附魔的石头和兵器碎片，再混合硝石硫磺和木炭，他终于研制出来可以对异能者造成大量伤害的炸弹，只需要在其周围引爆，即使是普通人也可以轻松击败他们。<br>当他将这个想法告知帝都的骑士团时，他们装备了弹丸，并对一个反叛的邦国发动了袭击，然而没想到的是，弹丸炸药的杀伤性已经超越了世界上人类能制作出的所有兵器，弗雷查惊恐地看着战火燃烧，硝烟弥漫的土地，上一秒的麦田花海，下一秒就成了人间炼狱。到处都是流离失所的难民，缺臂少腿的士兵，孩子撕心裂肺的哭声……<br>当骑士团对战果进行汇总时，团长向弗雷查邀请为其长期提供弹丸炸药，被后者以材料难求而推脱，弗雷查终究还是停止了他的研究，重新锻造起兵器来。<br>“自从我的炸弹被用于发动对平民的战争后，我就再也没有碰过它们……”<br>弗雷查放下了手中的锻锤<br>“不知道先生为何要重提此事？”<br>“我在想，像大师一样的人才，为什么屈身于这种地方，您应该有更广阔的空间才对。”<br>男人摆弄着一把短刃，问道。<br>“哼，继续给他们打造杀人如麻的凶器然后用来压迫平民吗？”<br>弗雷查不屑地说。<br>“不，恰好相反，我只是觉得有时候凶器也能成为实现和平的利器。”<br>男人斩钉截铁地说道：<br>“我曾经也痴迷于各种各样的兵器，但我现在才明白，最难以打造出来的，是耕地用的铁犁。”<br>“犁？那是和平时代才用的上的玩意。我何尝不想打造最好的铁犁？奈何这战火弥漫的世间没有可以用锄犁长久耕作的土地”<br>弗雷查注视着男人的眼睛，想从他眼神中看出什么，但发现自己怎么也看不透他。但他的眼神中的坚定让弗雷查想起来自己第一次制作出火药的样子，那时的他，意气风发。<br>“所以我需要您的帮助，大师，我们一起来想办法，让所有的兵器都能铸剑为犁。”<br>男人向他抛出了橄榄枝。<br>“铸剑为犁…这到是个不错的想法，不过你又是何人？又为何事而来？”<br>弗雷查站了起来，正视着这个气宇不凡的男人。<br>“提隆•嘉尼奥，我不过只是一只想要冲破牢笼的麻雀罢了…”<br>他向弗雷查伸出了右手：<br>“不知有没有殊荣能与杰西•弗雷大师查共谋大事？”',
    sksn_ying:'<li>【基础信息】<br>角色设计：帷幕<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=red>杀戮之影</font><br>姓名：影<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：刺杀型，换位，秒杀，收割<br><br><li>【背景故事】<br>昏暗的房间内，淡淡的烛光闪烁着。房间内灰尘迭起，唯有那张桌子和桌子上的神位洁净如新。<br>“嘎吱”身着黑衣的男子推门而入。踏着吱嘎作响的地板，男子走到神位前，脱下兜帽，病态白皙的脸上看不出一丝情感的波动。双手合十，低声吟诵着苦涩难懂的语言。<br>男子走出房间，淡淡的对一旁的阴影说道：“吉塔娜。是陛下让你来的？”<br>那片阴影出现了一丝涟漪，淡出了一身铠甲，铠甲包裹着的火辣身姿吐出冷淡的话语，“有些事情，影大人还是不必知道的好。”<br>“也罢。”影戴上兜帽，“今天的目标是？”<br>只要完成那人的委托，就能得到他的首肯，而我的计划就能开始实现了。<br>“盯紧艾德华，这是他下达的唯一指令。”<br><br>“艾德华爵士，再来一个！”<br>“就是啊，艾德华爵士，这次我肯定能发现你的破绽！”<br>“切，就你这眼神，能把母猪看成公猪！”<br>威尔之森小酒馆内，艾德华正尽兴地表演着他的新骗术。<br>“诸位，时间也不早了。威尔！今天晚上的单子我请了！”艾德华笑着收起扑克牌，冲着吧台前细细擦拭着酒杯的大胡子老板说道。<br>“哎，还希望多看看艾德华爵士的骗术呢。”<br>“放弃吧，就算想学你也学不来！艾德华爵士是什么人，你又是什么人。”<br>艾德华微笑着起身，向酒馆里的各位道了一声晚安，不紧不慢地离开了酒馆。<br>“什么人？”艾德华眼神微眯，他分明看到了一旁的阴影起了微小的波动。虽然很微小，但是艾德华骗术高超，眼神自然相当锐利。<br>一人和一片阴影就这么僵持了一会，艾德华摇了摇头，自言自语道：“可能是朗姆酒喝多了吧。”<br>待到艾德华远去，那片阴影才慢慢淡出一袭黑袍。<br>“如此锐利的观察力，这个人身上应该有很多秘密。”<br>“哼，艾德华可是骗术大师，观察力强没什么好奇怪的。”吉塔娜也慢慢淡出，不屑地嘲讽道。<br>“呵呵，你还是太年轻了。我能嗅到，他身上藏着秘密。”影笑了笑，渐渐地重返阴影之中，“告诉陛下，最近你不要跟着我了，我单独观察这个人。”<br>“哼，仗着影化暗杀就敢这么对我说话，总有一天。。。”吉塔娜不满的嘟囔着。',
    sksn_aidehua:'<li>【基础信息】<br>角色设计：帷幕<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=cyan>骗术大师</font><br>姓名：艾德华<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：刺杀型，夺牌，减益buff<br><br><li>【背景故事】<br>“你去看昨天晚上艾德华爵士的表演了吗？”<br>“那当然，艾德华爵士的表演，我可是一次也没落下。”<br>“什么时候我也能像艾德华爵士有那么高超的骗术呢？”<br>“就你？痴人说梦去吧。”<br>他们口中的艾德华爵士，十年前继承了父亲老艾德华留在来的爵位和财产，以及路西费尔王室对艾德华家族的信任。<br><br>王都中心的艾德华庄园内，艾德华仍在呼呼大睡。昨晚喝了几瓶烈酒庆祝新骗术，梦乡中的艾德华隐约听到了管家的叩门声。<br>“艾德华少爷，起床了。外面有一位客人想要见您。”<br>过了一会，房间中才传出迷迷糊糊的一声“我知道了”。<br>会客室内，黑衣男子品着王室特供的茶水，一双锐眼不时着扫着会客室的环境。<br>“哟，竟然是嘉尼奥先生，不知有何事情，竟要您大驾光临寒舍？”艾德华推门而入，看着正在品茶的嘉尼奥调侃道。<br>“艾德华先生，看来是我来的有些早了，您竟然还没睡醒。”<br>“嘉尼奥先生还会偷师了？我的毒舌怎么长到你的嘴巴里了？”<br>“这次来，所为何事？”艾德华收起那副玩世不恭的表情，眉头紧皱着。肯定是非常严重的事情，不然的话嘉尼奥不会亲自前来。<br>“你昨晚，感没感觉到有人跟踪你？”<br>“你是说。。。”<br>“王室已经起疑心了，”嘉尼奥放下茶杯，神情异常严肃，“我们的时间所剩无几。”<br>“需要我做什么？”<br>“我需要你，继续潜伏。”<br>“继续潜伏？可是你不是说。。。”<br>“只是起了疑心而已，这次是我们近期的最后一次联络了，雾言联盟现在需要封闭，是否能撑过这段时间不被发现，就得看你的骗术有多么的精湛了。”<br>“我明白了。”<br><br>“少爷。”会客室的门被打开，管家再次看到了艾德华那张玩世不恭的戏谑笑脸。<br>“送客。<br>“是，少爷。”管家颔首答应了一声，“尊贵的客人，请跟我来。”<br><br>庄园的门口，一个络腮胡大汉正坐在那里抽烟。<br>“客人，慢走。”<br><br>“嘉尼奥先生，如何了？”<br>“很好，放心吧，你那边呢？”<br>“庄园的几个关键位置都已经放上炸药了。”<br>“记住，能够相信的，只有来自主世界的我们。”<br>“明白，嘉尼奥先生。”<br><br>庄园卧室的落地窗边，艾德华倚在墙上，静静的注视着渐渐走远的嘉尼奥二人。<br>“看来，我不过是个局外人罢了，不，只是个工具罢了。”<br>“但是我甘愿成为推翻这个腐朽王国的一柄利刃。”',
    sksn_yigenuosi:'<li>【基础信息】<br>角色设计：最忠诚的叛徒<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=cyan>时空行者</font><br>姓名：伊格诺斯<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：刺杀型，换位，群伤，过牌<br><br><li>【背景故事】<br>“伊拉！”<br>“哥哥！”<br>“啊！”伊格诺斯猛然惊醒。妹妹被暴虐的时空撕裂的那一幕，在他眼前久久不能消散。<br>“怎么，还是这里？”伊格诺斯环视四周，这里与时空裂缝几乎无异，但是这里的能量都很平和，与那时空裂隙中的完全不同。<br>“嗯？这是？”伊格诺斯白皙的指尖轻轻地碰触破碎的能量晶体，晶体慢慢的泛起涟漪，竟呈现出主世界的一处海峡。<br>“难道，我们的世界已经崩坏了？”伊格诺斯的手指转向另一个能量晶体，那显现海峡的能量晶体瞬间暗淡下来，伊格诺斯手指触摸着的，显现出主世界的一个半岛。<br>“果然是这样么。”伊格诺斯猛然发现，周围是他独自一人。<br>“其他人呢？不可能只有我一个人活下来。”<br>“我的孩子，你想的并没有错。他们已经先你一步到达了异世界。”<br>“是谁在。。。”伊格诺斯眉头一皱，这空荡荡的时空漩涡内，竟有除他之外的另一个声音。<br>“竟然在我的体内？？”伊格诺斯脱去上衣，自己胸口透出微弱的蓝色光芒，隐约可以看出是一个菱形。<br>“你到底是什么东西？”<br>“你现在还不能知道，我的孩子。现在，你必须从这里离开。”<br>“这不是废话吗？”<br>“我会告诉你离开的办法，但是否能成功，就得靠你自己的力量了。”<br>“那也没有别的选择了，说吧。这个什么。。。”伊格诺斯无奈地叹了口气。<br>“我的实体是一块水晶。将这个漩涡里的能量晶片收集并拼凑起来。拼凑时不能有一点差错。”<br>“我一个凡人怎么可能做到啊，你就不能给我点儿力量？”伊格诺斯微微一笑，这要是不压榨她点力量出来，那可是也太亏了，毕竟住在我身体里还不得交房租？<br>“当然可以。”<br>伊格诺斯的右手迸发出强烈的蓝色光芒，覆盖住了整个右臂。<br>“这是蕴含时空的温和力量，当然，它完全可以为你所用。”<br>“哼，那就开始吧，让我离开这个鬼地方。”伊格诺斯右手握拳，激荡的时空力量迸发出闪耀的光芒。<br>“祝你好运，我的孩子。”水晶散发出微弱的光芒，它的力量似乎已经极弱。',
    sksn_lanling:'<li>【基础信息】<br>角色设计：心肝儿<br>故事：爪巴<br>称号：<font color=grey>凋零使者</font><br>姓名：澜零<br><br><li>【能力数据】<br>身份定位：忠臣，反贼<br>能力定位：辅助型，治疗，摸牌，弃牌<br><br><li>【背景故事】<br>不知从何时起，我便能看清每个人的颜色，我说的那种颜色不是物体反射呈现出来的光色，而是人身体内灵魂的颜色。<br>每个人的灵魂都有多种颜色，红，黄，蓝，紫，等等。当一个人的情感发生变化时，他灵魂的颜色也会随之变化。<br>我只不过是一个蹩脚的画家，连调色都难以达到顾客要求。可即便如此，我也想让这个世界充满美感。每个人心中都有属于他的颜色，即使是和我平时结伴而行的朋友，灵魂上也刻着骇人的黑色。我知道，这是他们潜藏的欲望。当我看向那些大恶之人时，他们的灵魂中的黑色已经吞噬了其他的颜色。<br>黑色……代表了欲望。当我看到他们内心深处的黑暗时，无论他们的外表多么光鲜，言语多么动听，我都感到一股厌恶，我厌恶黑色的灵魂，我亦有办法对付它们。我深知我的能力是什么，我可以操控灵魂，并洗涤它的颜色。我也知道我要做什么。<br>我从身边的人入手，我用力量洗涤了他们的灵魂，剔除了令我厌恶的黑色，他们果然变的无比单纯，如同刚出世的婴儿般一尘不染，不过他们也丧失了绝大多数欲望，但这并不算什么副作用。<br>我开始着手于为世界重新勾勒色彩，像那些穷凶极恶之人，我也为他们黑色的心上染上一片赤红。但总有那么一部分站在世界顶端的人，他们的心是洗不白的，无论多么鲜艳的色彩，全部被他们黑色的灵魂贪婪地吞噬，那些“人生赢家”不会放过一丁点光亮，这时我终于明白了：他们灵魂上那漆黑黑的并不是颜色，而是自人类出现文明以来，就一直存在的贪婪，杀戮和苦难。<br>我第一次感到了无力，但我并不想放弃，既然他们的心染上白色，那么就让我来吸收所有的黑色，我可以做到，不过我知道一旦这么做就很难再恢复。但我必须如此，为了重构一个不存在任何污点的世界，我开始向四周汲取颜色，当我将全世界的黑色吸收到自己体内后，我睁开了眼睛，世界仿佛静止了。<br>突然，天空和大地开始出现裂缝，向是一幅被撕成两半的水彩画，天空的颜色由蔚蓝变得诡异了起来，海洋也如同一摊死水，刚发芽的青草开始枯萎，花朵开始凋谢……最后，世界居然变成了一片灰色。<br>怎么……会这样？<br>难道被我吸收的不只是黑色？<br>没错，我失败了，我夺走了这个世界除了灰色以为全部的色彩……<br>当我跪倒在逐渐崩坏的灰色土地上时，在天空裂缝中，一道金色的光芒照射进了这个世界并笼罩了大地。崩坏停止了，不，停止的不只有崩坏，还有时间。<br>我寻着光线的源头，看到了散发着光芒的那道人影。那是一尊怎样的存在啊，祂背后映射出五彩斑斓的霞光，如同《圣经》中所描述的上帝<br>祂看似不经意的话语，仿佛是神谕降临：<br>“我知道你的所思所想，的确黑色是令人厌恶的，但世界缺不得它，一个缺少了任何颜色的世界都是不可能正常运作的。一旦停止的时间开始运转，这个世界马上就会崩坏”<br>世界崩坏？这不是我想要的结果，我只是希望每个人的灵魂都是纯洁的无色，我仅仅是想让他们摒弃多余的欲望……<br>直到现在，我才发现自己错了。<br>我的能力，不能被用来毁灭世界！<br>如果世界没有了颜色，那就让我用画笔，为她重新勾勒<br>世界的色彩从我的指甲蔓延到周围，为灰色的世界染上鲜艳的颜色，而我的身体也渐渐暗淡，但我并不后悔。我看着逐渐愈合的世界和自己崩坏的身躯，渐渐的灰色蔓延到我的眼睛，我看不见任何东西了，但我却能感知到它们的存在，每一片叶子，每一朵花，每一个人。<br>“色彩因我而消亡，从此我便是色彩。”<br>终于，斑斓的颜色蔓延到世界最后的角落，<br>人们惊奇地发现，世界好像明亮了许多，<br>就连斑马和熊猫也有些说不出的不同。',        
    sksn_niepudun:'<li>【基础信息】<br>角色设计：等待认领<br>故事：爪巴<br>称号：<font color=blue>海神</font><br>姓名：涅普顿<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：斗士型，卖血不动白，反击，阵容适配性强<br><br><li>【背景故事】<br>三分海之鱼渊，在距离光明礁几海里的一片空荡的海域上，海神涅普顿带着海灵姬，漫步到了一处海岛的礁石滩边。人鱼在海中如同水中精灵一样，不时起伏，卷起一道道浪花。<br><br>“大人是有事要交付于我吗？为何选在了这么一个偏僻的地方？”海灵姬在海中半露着身子，靠在一块礁石旁向涅普顿询问道。<br><br>“的确是有东西要交给你……海灵姬，如今你已经掌管了整个光明礁，成为了人鱼族的女王，所以有个东西我也该交由你保管了。”<br><br>“我明白了，那么……究竟是什么东西？”海灵姬歪着脑袋，语气疑惑地问道。<br><br>“这个嘛……我要你先发誓，不能将它随意展示在任何人面前，也不准随意将它的存在告知任何人。”涅普顿忽然神情严肃。<br><br>“人鱼族世代受海神大人的恩典，即使粉身碎骨，也义不容辞，海灵姬——梅洛斯蒂安以生命起誓，就算是死亡也绝不背叛海神大人。”海灵姬满是敬意，她双手合十护在胸前，向神明起誓道。<br><br>“好，那我就将它……”涅普顿还未说完，便感受到一股奇怪的气息从海平面之外传来，海灵姬也仿佛受到了压制一样，显得局促不安，这种诡异的气息打破了二者间的仪式，涅普顿眉头紧皱，没有再继续下去，而是将目光转向了远方的海面。<br><br>“唉，终究还是找过来了……”涅普顿无奈地叹息道。海灵姬不明白这句话是什么意思，但她刚刚也感受到了某种危险的存在正向他们靠近，于是紧紧地攥着拳头，一言不发。<br><br>一把长剑划破苍穹而来，轨迹直指二人，涅普顿大手一抬，形成一道水幕，使长剑偏离了方向，硬生生地扎进前方不远处的地面上。<br><br>一道交杂着红色闪电的黑雾从长剑中缓缓渗出，形成了一道女人的身形——桀拉尔单手护着左眼，出现在二人身前。<br><br>“好久不见……桀拉尔。”涅普顿面无表情地问候道，他对自己的这个兄弟可没有什么好感。<br><br>“好久不见，涅普顿兄长……他们还说你会藏到别的什么地方，但我不这么认为，我觉得你一定会回到这里……现在看来是我对了。”桀拉尔面带骇人的病态笑容，得意地说道。<br><br>“这里毕竟是我的故乡啊，桀拉尔……”涅普顿不由得叹息。他的确想找一个时空圣殿无法监视到的地方慢慢恢复伤势，但自己却放不下这片美丽的大海。<br><br>“预知之镜在哪里？”桀拉尔眯着眼睛问道。她可不想耗费时间停涅普顿扯什么过去，她此行的目的是找到预知之镜，从而定位‘破局者’的位置，然后再将时空水晶从‘破局者’身上夺回，但预知之镜是鱼渊的秘宝，只有海神才知道它在哪里。<br><br>“我怎么会知道呢，大海这么大，你尽可去找。”涅普顿不以为然地摆手说道，在他身旁，海灵姬已经因桀拉尔散发的威压气喘吁吁。涅普顿见状，便对她轻轻嘱托道:“退到我身后来。”<br><br>桀拉尔轻蔑地看了涅普顿身后的海灵姬，她从地上拔出那把长剑，指着惊慌的人鱼戏谑地说道:“不说没关系，反正我不着急去找那个所谓的‘破局者’，不过完成不了兄长交代的任务会让我很郁闷的，那我就先杀了你，再慢慢通过折磨她来泄愤吧。”<br><br>涅普顿见海灵姬在面对这种情况下茫然失措，于是向她交代道:“现在你只管躲进海里，无论之后发生了什么，都不要露头，快跑！”<br><br>海灵姬担忧地看了看涅普顿，然后一头扎进海中，桀拉尔冲上前想用长剑去追刺她，却被一柄银色的三叉戟给挡住了。<br><br>“住手，你的对手是我！”涅普顿显露海神本相，霎时间整片海域卷起了惊涛骇浪。桀拉尔被迫防御，只能放弃去追早已遁入深海的人鱼。<br><br>桀拉尔冷哼一声，她单手持剑，一个健步便向涅普顿刺去。<br><br>涅普顿轻松应战，他左手打出一道浪花，高速的水流将桀拉尔手里的长剑拦腰斩断。右手挑出的三叉戟银光闪闪，在桀拉尔的皮肤上划出一道猩红的口子。<br><br>桀拉尔伤口处不断扩散出黑色的雾氲，她知道挨了这么一击后这个人类躯壳已经到了极限，于是果断地将断剑随手一丢，开始蜕变。她死死地盯住涅普顿，面前这个男人即使是身负重伤，其实力依然不容小觑。<br><br>“别往海里扔垃圾啊，桀拉尔……”涅普顿面露厌恶的神情，他再次摆好了架势，准备接招。<br><br>“废话少说！”桀拉尔褪去了人类的躯壳，露出了黑色神相，祂双手一挥，两把不断旋转的影刃就出现在祂手上，桀拉尔召出了祂的本命武器，卷出一道旋风直冲涅普顿而来。<br><br>“这个力量……”涅普顿眉头一皱，他赶忙横过三叉戟抵挡，但却被这股力量震退了好几米远。<br><br>“桀拉尔！哈利迪斯到底在这段时间里做什么？！为什么你们能使用‘它’的力量！？”涅普顿吃惊地吼道，这股力量使他倍感压力。<br><br>“呵呵呵，我亲爱的兄长，怎么了？觉得我比之前变强了嫉妒了吗？只要你弃暗投明，重新回到时空圣殿，我们会与你分享这份力量的。”<br><br>“哼，力量已经让你迷失了自我，桀拉尔……无休止地去追逐会逐渐摧毁你们的信念，你们最终会因欲望而自食恶果！”<br><br>“哈哈哈，强者即是正义，涅普顿，这个世界是由至高无上者定义的，而现在那个至高无上的存在，是哈利迪斯大人！而你，只不过是一个被时空圣殿驱逐的叛徒罢了。”桀拉尔变换身形，劈出两刀剑风。涅普顿抬手，操纵海浪打散了气流。<br><br>但没想到的是，突然变强的桀拉尔速度已经快到影响到涅普顿的感知。桀拉尔向一支利箭一样向他突刺过来，涅普顿反手格挡，但丝毫没有影响这招的威力，桀拉尔双手持刀用力一挑，三叉戟便被挑到空中，桀拉尔找准了机会一脚将其踢进海里。<br><br>涅普顿的武器被击落到海中，不过他没有惊慌，反而趁此时机伸手想抓住桀拉尔，但却只扑到了一个残影。<br><br>“你输了，涅普顿！”桀拉尔鬼魅一笑。<br><br>桀拉尔本体闪身到涅普顿背后，将一把影刃从他背后贯穿。但没想到，涅普顿居然没有丝毫惧色，他反手扯住了桀拉尔，一柄闪烁着银色寒光的三叉戟同时刺穿了祂的身躯。<br><br>海神不愧为海神，在大海的加持下他不会轻易陷入被动，涅普顿刚才一直在暗地里操纵三叉戟，并利用潮汐的冲击投掷出来，直接穿进桀拉尔的身躯，霎时间一道道法阵纹路在桀拉尔身上展开，引发了大大小小十多重爆炸。桀拉尔这才意识到自己中计了。<br><br>“涅普顿！就算你现在能击退我，但之后又该如何？整个时空圣殿已经被我们掌控，反抗者最终只有死路一条！”在爆炸中，桀拉尔不甘心地咆哮道，祂的身形渐渐消散，化作了一道红色能量向天空远端飞去。<br><br>“之后？呵呵，之后会有人去阻止你们的，但在此之前，你们休想从我手里掐断那颗还未成熟的青涩果实。”涅普顿单手护着自己的腹部，因失血过多而体力不支，跪倒在一片礁石滩上。<br><br>海灵姬觉察到战斗的结束，赶忙从海中露出了身子，她快速地游向涅普顿，但却只看到了倒在礁石上已经奄奄一息的海神。涅普顿见海灵姬游了过来，便伸手揽住了她。<br><br>“神明大人……对不起，我什么都做不了……对不起……”海灵姬趴在他的身上痛哭流涕，这场神明之间的对决根本没有她插手的余地。神器造成的创伤凭她的力量是消除不了的，即使她不断向涅普顿输送生命能量，也是于事无补。<br><br>“不必了，海灵姬……我现在还有一些事情要告诉你，你要在光明礁等待一位‘破局者’，他是对抗哈利迪斯他们最后的希望……预知之镜，在没有等到它认可的人前是不会现身的，所以不必管它。那么……”<br><br>涅普顿脸色苍白，冷汗直流，他看了看满面悲伤的海灵姬，牵住了她的手，然后将一块蓝色的晶体从胸口掏出，郑重地将它交给了她。<br><br>“这件东西，我就交给你了……那些在深渊中蛰伏的黑暗即将卷土重来，但我希望的是，不论光明礁将来会发生什么，你一定要学会忍耐，一定要等待‘破局者’的到来，然后将这个东西转交给他……只有他才能拯救你们。”<br><br>“我知道了，我知道了……您放心吧……”海灵姬频频点头，向他保证道。<br><br>涅普顿靠在一块巨大的礁石边上，海浪浸湿了他的身体，海风吹在他的脸上，不断带走他逐渐冰冷的体温。涅普顿知道，自己将要离开了……<br><br>如果不是已经兵戎相见的话，他还真想和那些远在各地的兄弟姐妹们分享在这片海洋中发生的所有故事，然后在海边结伴同行，看潮起潮落，就像是彼此之间没有任何隔阂儿时那样。<br><br>海风徐来，水波粼粼，游鱼跃动，飞鸟盘旋，这是在陆地上绝不会看到的美景，不同于天界的庄严、人界的喧闹，这是独属于自然的宁静，处处都蕴含着生命之源的亲切感。<br><br>“大海……真美啊……”<br><br>涅普顿缓缓的闭上了眼睛，他不知道从什么时候起，自己就失去了这份宁静，他忘记了什么才是他最热爱的东西。多年的战斗和职责令他无法回归故土，现在他才明白，自己真正在意的似乎并不是时空圣殿——这片广阔深邃的大海，才是他所想守护的归宿之地。<br><br>从大海中诞生者，也自当回归于大海……<br><br>涅普顿面怀着微笑死去了，他的身体化作了一汪清流，融入了海洋中。海水粼波巡巡，映照着天空的太阳，散射出金灿灿的光芒。<br><br>在几百海里外的血海，乌云密布的沉船区，有一艘破败不堪的海盗船孤零零地在海面上随着波浪起起伏伏，这艘海盗船被神明诅咒，困在血海已经十余年。<br><br>“船长！封印解除了，刚刚封印解除了！”一个章鱼面貌的鱼人海盗火急火燎地推开船长室的大门。<br><br>一个长着鲨鱼脑袋，一只手因残废被装上了一个巨大的铁钩子，一只腿被木制假肢替代的鱼人海盗缓缓转过头来，他盯着那个前来报信的章鱼人久久未能缓过神来，他突然想到了什么，然后从椅子上站起身来，眼中闪烁着残忍的寒光。<br><br>鱼人海盗——海默德船长，因弑杀而被涅普顿连人带着他的海盗船一同封印在血海这片荒芜之域，永世不得离开。而现在，使他们困顿于此的封印已经被解除。<br><br>“哦？这么说涅普顿已经死了……呵呵，想想也是时候了，海神的庇佑已经令海洋沉寂太久太久，我甚至都有点忘记了鲜血的滋味……”<br><br>海默德踏着一瘸一拐的步子走到了甲板，在众鱼头鱼脑的海盗们的嘈杂声中，他走到了桅杆前眺望了一眼远方的海面，然后举起自己的那只前段装有钩子的手臂。<br><br>“神明已死。”海默德缓缓地吐出了这么一句话。<br><br>这些嗜血的怪物全都躁动了起来，血海的死寂已经让他们憋的神志失常，喽啰们都在期待着这位可怖的船长能再次发号施令，带领他们继续驰骋三分海。海默德面露凶光，他早就迫不及待想冲出血海，把那些害他到如此境地的人碎尸万段。<br><br>海默德船长站在舵盘前，他用那仅剩的手掌细细抚摸着那些被风蚀水浸的纹路，之后他苦涩的一笑，露出了两排尖利的牙齿，阴森森地朝着夹板上的喽啰们吩咐道:<br><br>“起锚，升帆，我们要回家了……”',
    sksn_halidisi:'<li>【基础信息】<br>角色设计：神王权笺<br>故事：竹林七闲.（林啸霜）<br>称号：<font color=#F0F>死亡之神</font><br>姓名：哈利迪斯<br><br><li>【能力数据】<br>身份定位：主公，内奸<br>能力定位：刺杀型，群伤，爆发，收割<br><br><li>【背景故事】<br>“哈利迪斯，你为何要带领冥神和影诛神反叛？”<br>时空圣殿的大殿内，金色的婀娜身影跪在地上，似乎已经力竭。<br>“路西法大人，这个世界已经不适合由您再来掌管，为何不干脆放权给我们，好好荡涤这个罪恶的世界？”<br>那漂浮在半空的白袍底下，一只仅有森森白骨的手紧握着一柄刀刃处睁着眼睛的镰刀，那眼睛散发出一股邪异的红光，似乎要将整个世界吞没进去。<br>“那神器。。。我果然当初就不该把他创造出来。”<br>“路西法大人，说了那么多，您还是不愿意交出时空圣殿的掌控权？”<br>“这圣殿，本就在你们的掌握之中。”路西法叹了口气，身上的圣光也暗淡了下来，“那八大神器，是支撑着时空圣殿运转的关键。”<br>“哦？”哈利迪斯饶有兴趣的看着自己手中这柄镰刀。<br>路西法环视着周围倒下的五位天神，眼神中暗藏着决意。“正因如此，我才不能让已经被腐蚀的你，集齐八大神器！”<br>路西法身上光芒大盛，浓厚的圣光源源不断地融入已经倒下的五大天神体内。<br>“可恶！路西法！！！”“终会有一天，你会明白自己的过错。”<br>光芒消散之后，整个大殿只剩下路西法已经倒下的身躯，五大天神早已消失不见。<br>“你以为这就能阻止我吗！我要让你亲眼见证我创造时空圣殿的辉煌！”哈利迪斯声嘶力竭地怒吼道。冰冷的镰刃划在时空圣殿金色的地板上，发出刺耳的噪音。<br>“我会创造出时空圣殿的辉煌！以死亡之名！”',
    sksn_jielaer:'<li>【基础信息】<br>角色设计：竹林七闲.（林啸霜）<br>故事:竹林七闲.（林啸霜）<br>称号：<font color=red>影诛神</font><br>姓名：桀拉尔<br><br><li>【能力数据】<br>身份定位：反贼，内奸<br>能力定位：刺杀型，觉醒<br><br><li>【背景故事】<br>桀拉尔，你当真要去下面？”哈利迪斯坐在大殿的宝座上，白色的枯骨咯吱作响。<br><li>“既然路西法大人已经为我们所用，兄长也已经掌控了整个时空圣殿，我也想去逍遥逍遥。”<br><li>“既然如此，那再交给你个任务。”哈利迪斯手中的镰刀划着地板。<br><li>“不会是让我收拾海神他们吧，我可没那么多闲工夫去找他。”<br><li>“当然不是。你可记得出现在圣殿前的那个男子？”<br><li>“你是说，那个吸收走了水晶的小崽子？”<br><li>“找到他，把水晶带回来。”哈利迪斯森森的笑着，整个白袍随着白骨的抖动而颤抖着。<br><li>“好吧好吧，那我就再帮哥哥一个忙。”<br><li>桀拉尔打了个冷颤，如果哈利迪斯愿意，他随时可以把那柄镰刀收走他的神魄。<br><li>“这才是为兄的好弟弟。”白袍慢慢飘动着，白骨之手在桀拉尔额头上轻轻一点，一道黑色的印记出现在桀拉尔的额头上。<br><li>“为兄会好好关注你的，桀拉尔。”<br><br><li>“这身皮囊怎么那么奇怪？人类真的令人作呕的生灵。也不知道路西法大人为何要创造人类出来。”尼吉拉斯王国郊外，一抹倩影慢慢浮现，吐出的确是温润的男音。“女人，应该怎么说话来着？”桀拉尔想着自己见过的女人，似乎只有路西法大人，还有她。<br><br><li>“终于弄好了，那么，就让我们去那个王国稍微玩一会吧？”妩媚的声音传出，似有摄人心魄的能力。<br><li>桀拉尔右手一挥，一柄漆黑如夜的战刃出现在桀拉尔的右手上。一双丹凤眼细细端详着影刃刀。良久，桀拉尔大笑一声：“路西法大人，或许你有卷土重来的机会，但现在，你只能为我们三神所用！”<br><br><li>“哟，没想到郊外还有这么火辣的美人儿。”<br><li>“那柄战刃，似乎挺不错的。”<br><li>“不如抱那美人回去，再好好研究研究那战刃？”<br><li>“两位大哥，不知有什么事情小女子可以帮忙么？”桀拉尔心中冷笑着，竟有如此不知尊卑的人类。<br><li>“这郊外危险，常有魔物出现，不如哥哥护送你去最近的城镇，如何？”<br><li>两人哈哈大笑着，却是直接架住了桀拉尔瘦小的身躯。<br><li>“两位大哥，这是为何？”<br><li>“为何？当然是与小美人共度良宵了！”<br><li>“小女子的意思是，为何要来送死呢？”桀拉尔的身躯慢慢融化在树荫之中，影刃刀插在泥土中。“什么？竟然是魔物？”<br><li>“小女子可不是魔物，小女子，是你们的神！”桀拉尔妩媚的声音在森林中回荡着，影刃刀随音而起，变幻成一柄双刃刀，将两人直接二分为四，那柄漆黑的利刃甚至没有沾上血液。<br><li>“若是让影刃刀沾上血，那岂不是对神明的玷污？”桀拉尔轻轻一笑，“路西法大人，且看我将这世界彻底当做我的玩具。”<br><br>“身化万物，影刃诛神。”',
                },

	//————角色分栏————//
	characterSort:{
    	'shikongs':{
            "SKSN_hqzz":["sksn_gaogeli","sksn_ximengyaweili","sksn_geleier","sksn_suerjiade","sksn_xiluwei"],
            "SKSN_hdfy":["sksn_xiayi","sksn_deyingkemeng","sksn_tangning","sksn_mogen","sksn_siji","sksn_clemtin"],
            "SKSN_kesg":["sksn_maisike","sksn_guergewen","sksn_lujinuo","sksn_dongfanghongdao","sksn_yunru","sksn_huaideqiao","sksn_nuoya","sksn_yilian"],
            "SKSN_wmdd":["sksn_hualun","sksn_feieryide","sksn_ying","sksn_aidehua","sksn_jianiao","sksn_fuleicha","sksn_lanbote","sksn_saimiuer","sksn_eidehua"],
            "SKSN_qmsd":["sksn_sigeruopi","sksn_youliweisi","sksn_agebu","sksn_luoyiao","sksn_aodinggelan"],
            "SKSN_xrxw":["sksn_kangpasi","sksn_xieyaoxiafeiji","sksn_delike","sksn_haimode","sksn_you","sksn_qiongsi","sksn_kaien","sksn_guiyan","sksn_wulamu","sksn_hailingji"],
            "SKSN_mqdj":["sksn_tiexin","sksn_lanling","sksn_zage","sksn_gaozesi","sksn_feiluo","sksn_wuruiya","sksn_halisen","sksn_pianxian","sksn_jiamiu",'sksn_occupatee'],
            "SKSN_lmzg":["sksn_yigenuosi","sksn_ailuoyi","sksn_xintianbuzhi","sksn_ferwork","sksn_anjielina","sksn_nuodengsi","sksn_muguchen"],
            "SKSN_sntx":["sksn_halidisi","sksn_jielaer","sksn_niepudun"],
            //分栏方式：补充//
            /*"SKSN_qita":[],*/
			},
		},
                    characterTitle:{
                        //————称号————//
                        sksn_hualun:"<font color=#460046>暮月之弦</font>",
                        sksn_kangpasi:"<font color=#D0D0D0>雾海魅影</font>",
                        sksn_xieyaoxiafeiji:"<font color=#4A4AFF>劫海二将</font>",
                        sksn_xiayi:"<font color=#FFAAD5>所谓伊人</font>",
                        sksn_guergewen:"<font color=#D200D2>隐穹微澜</font>",
                        sksn_sigeruopi:"<font color=#00EC00>炼金大师</font>",
                        sksn_delike:"<font color=#004B97>远洋之志</font>",
                        sksn_haimode:"<font color=#930000>血海狂鲨</font>",
                        sksn_you:"<font color=#40E0D0>海洋之魂</font>",
				        sksn_cang:"<font color=#40E0D0>浮海若梦</font>",
                        sksn_maisike:'<font color=slateblue>奴隶主</font>',
                        sksn_dongfanghongdao:'<font color=#FFED97>黎明之眼</font>',
                        sksn_youliweisi:'<font color=#E800E8>续燃烛光</font>',
						sksn_lujinuo:'<font color=#FFFF37>黎明之剑</font>',
                        sksn_huaideqiao:'<font color=red>萨比</font>',
                        sksn_feieryide:'<font color=#DDDDFF>恐惧之面</font>',
                        sksn_muguchen:'<font color=cyan>未知旅行</font>',
                        sksn_zage:'<font color=slateblue>喋血幽狼</font>',
                        sksn_nuodengsi:'<font color=#D200D2>守门人</font>',
                        sksn_deyingkemeng:'<font color=#FBFBFF>人畜无害</font>',
                        sksn_yunru:'<font color=#008080>第一生产力</font>',
                        sksn_anjielina:'<font color=#9DEF1F>万物芳茵</font>',
                        sksn_ferwork:'<font color=#EFF>凝霜之眸</font>',
                        sksn_luoyiao:'<font color=grey>承道之志</font>',
                        sksn_tangning:'<font color=#7D7DFF>执法者</font>',
                        sksn_mogen:'<font color=#949449>海都商人</font>',
                        sksn_gaozesi:'<font color=#5151A2>千面妖魔</font>',
                        sksn_feiluo:'<font color=#FFF8D7>神启者</font>',
                        sksn_niepudun:'<font color=blue>海神</font>',
                        sksn_geleier:'<font color=#FF8F59>说大人则藐之</font>',
                        sksn_suerjiade:'<font color=#BEBEBE>幕政驭王权</font>',
                        sksn_xiluwei:'<font color=#EA7500>凰权女帝</font>',
                        sksn_wuruiya:'<font color=#5B00AE>身陷虚无</font>',
                        sksn_yilian:'<font color=#FF60AFC>大嘤萌主</font>',
                        sksn_nuoya:'<font color=#9999CC>暗夜雷光</font>',
                        sksn_ximengyaweili:'<font color=#FFFFAA>通权达变</font>',
                        sksn_gaogeli:'<font color=#C48888>撼山平南</font>',
                        sksn_occupatee:'<font color=red>莽血魔王</font>',
                        sksn_jiamiu:'<font color=slategrey>黯魍幽魂</font>',
                        sksn_clemtin:'<font color=yellow>海都小霸王</font>',
                        sksn_hailingji:'<font color=blue>祈海之歌</font>',
                        sksn_pianxian:'<font color=yellow>长天镜明</font>',
                        sksn_halisen:'<font color=chocolate>守御之将</font>',
                        sksn_agebu:'<font color=Gold>星芒缔造者</font>',
                        sksn_eidehua:'<font color=black>狐假虎威</font>',
                        sksn_siji:'<font color=red>彼岸海棠</font>',
                        sksn_kaien:'<font color=blue>御海之盾</font>',
                        sksn_qiongsi:'<font color=red>袭海劫浪</font>',
                        sksn_qiongsi_soul:'<font color=red>恶念冤魂</font>',
                        sksn_wulamu:'<font color=slateblue>驭神的野心家</font>',
                        sksn_aodinggelan:'<font color=grey>卫道先师</font>',
                        sksn_ying:'<font color=red>杀戮之影</font>',
                        sksn_tiexin:'<font color=orange>钢铁之心</font>',
                        sksn_aidehua:'<font color=cyan>骗术大师</font>',
                        sksn_lanbote:'<font color=cyan>流浪剑圣</font>',
                        sksn_yigenuosi:'<font color=cyan>时空行者</font>',
                        sksn_jianiao:'<font color=red>无名刺杀者</font>',
                        sksn_saimiuer:'<font color=yellow>上帝的义人</font>',	
                        sksn_ailuoyi:'<font color=grey>星辰唤魔使</font>',	      
                        sksn_xintianbuzhi:'<font color=cyan>特异持有者</font>',
                        sksn_lanling:'<font color=grey>凋零使者</font>',
                        sksn_fuleicha:'<font color=orange>军火大师</font>',
                        sksn_halidisi:'<font color=#F0F>死亡之神</font>',
                        sksn_jielaer:'<font color=red>影诛神</font>',
                        sksn_guiyan:'<font color=slateblue>人间恶魔</font>',
			 		},		 		
skill:{	
//——————武将技能——————//
//华伦
'sksn_yinxian':{
                audio:'ext:时空枢纽:3',
                init:function(player){
                    player.storage.sksn_yinxian = [];
                    player.addSkill('sksn_yinxian_record');
                    player.addSkill('sksn_yinxian_after');
                },
                ai:{
                    effect:{
                        player_use:function(card,player,target){
                            if(_status.event.isPhaseUsing(player) && get.number(card) && player.storage.sksn_yinxian){
                                var arr = player.storage.sksn_yinxian;
                                var arr2 = arr.slice(0);
                                arr2.push(get.number(card));
                                var count1 = lib.skill.sksn_yinxian.countTiaojian(arr);
                                var count2 = lib.skill.sksn_yinxian.countTiaojian(arr2);
                                if(count2 < count1){
                                    return [1,-1.5];
                                }
                            }
                        }
                    }
                },
                mod:{
                    aiOrder:function(player,card,num){
                        if(_status.event.isPhaseUsing(player) && get.number(card) && player.storage.sksn_yinxian){
                            var number = get.number(card);
                            if(player.storage.sksn_yinxian.length == 0){
                                if(player.hp < player.maxHp){
                                    if(number >= 11)return num+=10;
                                }else{
                                    return 14 - number;
                                }
                            }
                            if(player.hp < player.maxHp)return 14 - number;
                            return number;
                        }
                    }
                },
                countTiaojian:function(arr){
                    var skill = lib.skill.sksn_yinxian;
                    var count = 0;
                    if(skill.isDengcha(arr)){
                        count++;
                    }
                    if(skill.isDengbi(arr)){
                        count++;
                    }
                    if(skill.isDizeng(arr)){
                        count++;
                    }
                    if(skill.isDijian(arr)){
                        count++;
                    }
                    if(skill.isFeibonaqie(arr)){
                        count++;
                    }
                    return count;
                },
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"16px":"28px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yinxian.jpg>",
                intro:{
                    name:'阴弦',
                    markcount:function(storage){
                        var skill = lib.skill.sksn_yinxian;
                        return skill.countTiaojian(storage);
                    },
                    content:function(storage){
                        var str = "";
                        for(var s of storage){
                            str += s;
                            str += " ";
                        }
                        str += "<br>满足条件：<br>";
                        var skill = lib.skill.sksn_yinxian;
                        var bool = false;
                        if(skill.isDengcha(storage)){
                            str += "①等差数列<br>";
                            bool = true;
                        }
                        if(skill.isDengbi(storage)){
                            str += "②等比数列<br>";
                            bool = true;
                        }
                        if(skill.isDizeng(storage)){
                            str += "③递增数列<br>";
                            bool = true;
                        }
                        if(skill.isDijian(storage)){
                            str += "④递减数列<br>";
                            bool = true;
                        }
                        if(skill.isFeibonaqie(storage)){
                            str += "⑤斐波那契数列<br>";
                            bool = true;
                        }
                        if(!bool){
                            str += "无";
                        }
                        return str;
                    }
                },
                isDengbi:function(arr){
                    if(arr.length < 3)return false;
                    var p = arr[1]/arr[0];
                    if(p < 1){
                        var revarr = [];
                        for(var i=arr.length-1;i>=0;i--){
                            revarr.push(arr[i]);
                        }
                        p = arr[1]/arr[0];
                    }
                    for(var i=2;i<arr.length;i++){
                        if(arr[i]/arr[i-1] != p)return false;
                    }
                    return true;
                },
                isDengcha:function(arr){
                    if(arr.length < 3)return false;
                    var d = arr[1] - arr[0];
                    for(var i=2;i<arr.length;i++){
                        if(arr[i] - arr[i-1] != d)return false;
                    }
                    return true;
                },
                isFeibonaqie:function(arr){
                    if(arr.length < 3)return false;
                    var feibonaqie = [1,1,2,3,5,8,13];
                    if(arr.length > feibonaqie.length){
                        return false;
                    }
                    for(var i=0;i<feibonaqie.length - arr.length+1;i++){
                        var foundEquals = true;
                        for(var j=0;j<arr.length;j++){
                            if(feibonaqie[i+j] != arr[j]){
                                foundEquals = false;
                                break;
                            }
                        }
                        if(foundEquals)return true;
                    }
                    return false;
                },
                isDizeng:function(arr){
                    if(arr.length < 3)return false;
                    for(var i=1;i<arr.length;i++){
                        if(arr[i] <= arr[i-1])return false;
                    }
                    return true;
                },
                isDijian:function(arr){
                    if(arr.length < 3)return false;
                    for(var i=1;i<arr.length;i++){
                        if(arr[i] >= arr[i-1])return false;
                    }
                    return true;
                },
                group:['sksn_yinxian_end'],
                subSkill:{
                    end:{
                        sub:true,
                        trigger:{
                            player:'phaseJieshuBegin',
                        },
                        filter:function(event,player){
                            var skill = lib.skill.sksn_yinxian;
                            var arr = player.storage.sksn_yinxian;
                            if(skill.isDengcha(arr) || skill.isDengbi(arr) || skill.isDizeng(arr) || skill.isDijian(arr) || skill.isFeibonaqie(arr)){
                                return true;
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            event.sksnskill = lib.skill.sksn_yinxian;
                            var yinxiancheck = ['Dengcha','Dengbi','Dizeng','Dijian','Feibonaqie'];
                            var count = 0;
                            for(var c of yinxiancheck){
                                event[c] = event.sksnskill['is'+c](player.storage.sksn_yinxian);
                                if(event[c]){
                                    count ++;
                                }
                            }
                            event.countTiaojian = count;
                            game.playSK('sksn_yinxian'+Math.floor(Math.random()*3));
                            'step 1'
                            if(event.Dengcha){
                                player.chooseTarget([1,player.storage.sksn_yinxian.length],function(card,player,target){
                                    return target.countDiscardableCards(player,'he');
                                })
                                .set('prompt','【等差数列】：弃置'+get.cnNumber(player.storage.sksn_yinxian.length)+'名角色各一张牌。<br><br><br><br>')
                                .set('ai',function(target){
                                    return -get.attitude(player,target);
                                });
                            }else{
                                event.goto(4);
                            }
                            'step 2'
                            if(result && result.targets && result.targets.length){
                                event.distars = result.targets.slice(0);
                                player.line(result.targets,'green');
                                game.log(player,"选择弃置",result.targets,"各一张牌。");
                            }else{
                                event.goto(4);
                            }
                            'step 3'
                            event.distars.sortBySeat();
                            var tar = event.distars.shift();
                            if(tar){
                                if(tar.countDiscardableCards(player,'he')){
                                    player.discardPlayerCard(tar,'he',true);
                                }
                                event.redo();
                            }
                            'step 4'
                            if(event.Dengbi){
                                player.chooseTarget([1,player.storage.sksn_yinxian.length])
                                .set('prompt','【等比数列】：令'+get.cnNumber(player.storage.sksn_yinxian.length)+'名角色各摸一张牌。<br><br><br><br>')
                                .set('ai',function(current){
                                    return get.attitude(player,current);
                                });
                            }else{
                                event.goto(6);
                            }
                            'step 5'
                            if(result && result.targets && result.targets.length){
                                game.asyncDraw(result.targets);
                                player.line(result.targets,'green');
                                game.log(player,"选择令",result.targets,"摸一张牌。");
                            }
                            'step 6'
                            if(event.Dizeng){
                                player.chooseTarget(1,function(card,player,target){
                                    return player != target;
                                })
                                .set('prompt','【严格单调递增数列】：令一名其他角色失去一点体力。<br><br><br><br>')
                                .set('ai',function(target){
                                    if(get.attitude(player,target < 0)){
                                        return ((10 - target.hp) <= 0) ? 0.5 : (10 - target.hp);
                                    }
                                    return -1;
                                });
                            }else{
                                event.goto(8);
                            }
                            'step 7'
                            if(result && result.targets && result.targets.length){
                                game.log(player,"选择令",result.targets,"失去一点体力。");
                                result.targets[0].loseHp();
                                player.line(result.targets,'green');
                            }
                            'step 8'
                            if(event.Dijian){
                                if(player.hp == player.maxHp){
                                    game.log(player,"体力值已满，无需恢复体力。");
                                    event.goto(10);
                                    return;
                                }
                                player.chooseBool("【严格单调递减数列】：是否恢复一点体力？")
                                .set('ai',function(){
                                    return true;
                                })
                            }else{
                                event.goto(10);
                            }
                            'step 9'
                            if(result.bool){
                                player.recover();
                            }
                            'step 10'
                            if(event.Feibonaqie){
                                player.chooseTarget(1,function(card,player,target){
                                    return player != target;
                                })
                                .set('prompt',"【斐波那契数列】：令一名其他角色翻面。<br><br><br><br>")
                                .set('ai',function(target){
                                    return target.isTurnedOver() ? (get.attitude(player,target)) : (-get.attitude(player,target));
                                });
                            }else{
                                event.goto(12);
                            }
                            'step 11'
                            if(result && result.targets && result.targets.length){
                                player.line(result.targets,'green');
                                game.log(player,"选择令",result.targets,"翻面。");
                                result.targets[0].turnOver();
                            }
                            'step 12'
                            player.draw(event.countTiaojian);
                        }
                    },
                    after:{
                        sub:true,
                        popup:false,
                        forced:true,
                        priority:231,
                        trigger:{
                            player:'phaseJieshuEnd',
                        },
                        filter:function(event,player){
                            return true;
                        },
                        content:function(){
                            player.storage.sksn_yinxian = [];
                            player.syncStorage('sksn_yinxian');
                        }
                    },
                    record:{
                        sub:true,
                        charlotte:true,
                        forced:true,
                        priority:231231,
                        popup:false,
                        trigger:{
                            player:'useCard',
                        },
                        filter:function(event,player){
                            if(!player.hasSkill('sksn_yinxian'))return false;
                            if(!event.isPhaseUsing(player))return false;
                            if(!event.card.number)return false;
                            return true;
                        },
                        content:function(){
                            player.storage.sksn_yinxian.push(trigger.card.number);
                            player.syncStorage('sksn_yinxian');
                        }
                    }
                }
            },
//康帕斯
 "sksn_duoling":{
                audio:"sksn_duoling_yin",
                zhuanhuanji:true,
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_duoling.jpg>",
                intro:{
                    content:function (storage){
                        if(storage==true) return '一名角色翻回正面后，你可以与其各摸一张牌并令其执行一个出牌阶段，然后若你的手牌数小于其，你执行一个出牌阶段。';
                        return '出牌阶段限一次，你可以将弃牌堆中的一张普通锦囊牌或【杀】交给一名手牌数小于体力值的其他角色，若如此做，你与其依次翻至背面。';
                    },
                },
                locked:false,
                ai:{
                    threaten:1.2,
                },
                group:["sksn_duoling_yin","sksn_duoling_yang"],
                subSkill:{
                    yin:{
                        audio:"ext:时空枢纽:2",
                        zhuanhuanji:true,
                        enable:"phaseUse",
                        usable:1,
                        filter:function(event,player){
                            if(player.storage['sksn_duoling']==true) return false;
                            for(var i=0;i<ui.discardPile.childElementCount;i++){
                                if(ui.discardPile.childNodes[i].name=="sha"||get.type(ui.discardPile.childNodes[i])=='trick') return true;
                            }
                            return false;
                        },
                        chooseButton:{
                            dialog:function (player){
                                var list=[];
                                for(var i=0;i<ui.discardPile.childElementCount;i++){
                                    if(get.type(ui.discardPile.childNodes[i])!='trick'&&ui.discardPile.childNodes[i].name!="sha") continue;
                                    list.push(ui.discardPile.childNodes[i]);
                                }
                                return ui.create.dialog('堕灵',list,'hidden');
                            },
                            backup:function (links,player){
                                return {
                                    filterTarget:function(card,player,target){
                                        if(target.hp<=target.countCards('h')) return false;
                                        return player!=target;
                                    },
                                    filterCard:function(){return false},
                                    selectCard:-1,
                                    card:links[0],
                                    delay:false,
                                    direct:true,
                                    content:lib.skill.sksn_duoling_yin.contentx,
                                    ai:{
                                        order:10,
                                        result:{
                                            player:1,
                                            target:function (player,target){
                                                if(target.hasSkill('sksn_yineng')||target.hasSkill('sksn_liyu')) return -5;
                                                var att=get.attitude(player,target);
                                                var num=target.countCards('h')/(player.countCards('h')+1);
                                                if(att>0) return num;
                                                if(att<=0&&!target.isTurnedOver()) return -1;
                                                return 0;
                                            },
                                        },
                                    },
                                }
                            },
                            check:function (button){
                                var player=_status.event.player;
                                var players=game.filterPlayer(function(current){
                                    return current!=player&&current.hp>current.countCards('h');
                                });
                                for(var target of players){
                                    if(get.attitude(player,target)>0) return get.value(button.link);
                                }
                                return 10-get.value(button.link);
                            },
                            prompt:function (links,player){
                                return '将'+get.translation(links[0])+'交给一名手牌数小于体力值的其他角色';
                            },
                        },
                        contentx:function(){
                            player.logSkill("sksn_duoling_yin",target);
                            var card=lib.skill.sksn_duoling_yin_backup.card;
                            player.storage['sksn_duoling']=true;
                            target.gain(card,player,'give');
                            if(!player.isTurnedOver()) player.turnOver();
                            if(!target.isTurnedOver()) target.turnOver();
                        },
                        ai:{
                            order:10,
                            result:{
                                player:1,
                            },
                        },
                        sub:true,
                    },
                    yang:{
                        audio:"ext:时空枢纽:2",
                        zhuanhuanji:true,
                        trigger:{
                            global:"turnOverAfter",
                        },
                        filter:function (event,player){
                            return player.storage['sksn_duoling']==true&&event.player.isAlive()&&!event.player.isTurnedOver();
                        },
                        check:function (event,player){
                            return get.attitude(player,event.player)>0;
                        },
                        logTarget:"player",
                        content:function (){
                            "step 0"
                            player.storage['sksn_duoling']=false;
                            "step 1"
                            player.draw();
                            if(player!=trigger.player) trigger.player.draw();
                            trigger.player.phaseUse();
                            "step 2"
                            if(player.countCards('h')<trigger.player.countCards('h')) player.phaseUse();
                        },
                        sub:true,
                    },
                },
            },
"sksn_lingti":{
                audio:"ext:时空枢纽:2",
                ai:{
                    effect:{
                        target:function (card,player,target,current){ 
                            if(['tiesuo','lulitongxin'].contains(card.name)){ 
                                return 'zeroplayertarget'; 
                            } 
                        },
                    },
                },
                trigger:{
                    player:["linkBegin","damageBefore"],
                },
                filter:function(event,player,onrewrite){
                    if(onrewrite=="damageBefore") return true;
                    return !player.isLinked(); 
                },
                forced:true,
                content:function (){ 
                    var onrewrite=event.triggername;
                    if(onrewrite=="linkBegin"){
                        game.log(player,'取消了横置');
                        trigger.cancel(); 
                    }
                    else{
                        if(!player.isTurnedOver()) player.gainMaxHp(trigger.num);
                        else{
                            trigger.cancel();
                            player.loseMaxHp(trigger.num);
                        }
                    }
                },
            },
//虾兵蟹将
"sksn_xingli":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:"damageEnd"
	},
	direct:true,
	frequent:true,
	filter:function (event,player){
		return event.num>0&&player.isDamaged();
	},
	content:function (){
		"step 0"
		event.num=0;
		"step 1"
		var next=player.chooseTarget();
		next.filterTarget=lib.filter.notMe;
		next.ai=function(target){
			if(_status.event.player.attitudeTo(target)<=0) return 0;
			return 4/Math.max(target.countCards('hs'),1);
		};
		next.set('prompt','是否'+(event.num?'再次':'')+'发动【腥礼】？');
		next.set('prompt2','令一名其他角色摸'+get.cnNumber(2*player.getDamagedHp())+'牌');
		"step 2"
		if(result.bool){
			player.logSkill('sksn_xingli',result.targets);
			result.targets[0].draw(2*player.getDamagedHp());
			event.num++;
			if(event.num<trigger.num){
				event.goto(1);
			}
		}
	},
	ai:{
		threaten:0.6,
		maixie:true,
		"maixie_hp":true,
		effect:{
			target:function (card,player,target,current){
				if(get.tag(card,'damage')){
					if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
					if(!target.hasFriend()) return;
					var num=target.getDamagedHp()+1;
					if(get.attitude(player,target)>0){
						if(player.needsToDiscard()){
							num*=0.7;
						}
						else{
							num*=0.5;
						}
					}
					if(player.hp>=4) return [1,num*2];
					if(target.hp==3) return [1,num*1.5];
					if(target.hp==2) return [1,num*0.5];
				}
			}
		}
	}
},
"sksn_zaoshi":{
	audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		return game.hasPlayer(function(current){
			return current.countCards('h')>player.countCards('h');
		});
	},
	filterTarget:function (card,player,target){
		return target.countCards('h')>player.countCards('h');
	},
	content:function (){
		"step 0"
		var next=target.chooseToDiscard('h',true);
		next.selectCard=target.countCards('h')-player.countCards('h');
		next.ai=function(card){
			if(card.name=='sha') return -get.value(card)+_status.event.eff;
			return -get.value(card);
		};
		next.set('prompt2','然后你对'+get.translation(player)+'依次使用其中的【杀】');
		next.set('eff',get.effect(player,{name:'sha'},target,target));
		"step 1"
		if(result.bool){
			for(var sha of result.cards){
				if(sha.name=='sha'){
					target.chooseUseTarget(sha,player,true,'nodistance').set('addCount',false);
				}
			}
		}
	},
	ai:{
		threaten:2.3,
		expose:0.3,
		order:1,
		result:{
			target:-3,
			player:1
		}
	}
},
//炼金熊
"sksn_xilian":{audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		return player.countCards('h');
	},
	filterCard:true,
	position:"h",
	check:function (card){
		if(game.hasPlayer(function(current){
			return current.hasCard({name:'sksn_card_jinglianfu'},'hejs');
		})) return 0;
		if(_status.event.player.hasCard(function(card){
			return get.subtype(card)=='equip5'&&get.equipValue(card)>6.4;
		},'he')) return 0;
		return 6.4-get.value(card);
	},
	content:function (){},
	ai:{
		order:6,
		result:{
			player:1
		}
	},
	group:["sksn_xilian_getEquip","sksn_xilian_hasEquip"],
	subSkill:{
		getEquip:{
			trigger:{
				global:"gameDrawAfter",
				player:["enterGame","sksn_xilianAfter"],
			},
			direct:true,
			content:function (){
				"step 0"
				var onrewrite=event.triggername;
				if(onrewrite!='sksn_xilianAfter') player.logSkill('sksn_xilian');
				var cardx=get.cardPile(function(card){
					return card.name=='sksn_card_jinglianfu';
				});
				if(!cardx){
					cardx=get.discardPile(function(card){
						return card.name=='sksn_card_jinglianfu';
					});
				}
				if(cardx){
					player.gain(cardx,'gain2','log');
				}
			},
			sub:true
		},
		hasEquip:{
			trigger:{player:"discard"},
			forced:true,
			filter:function (event,player){
				var evt=event.getParent('phaseDiscard',true);
				if(evt&&evt.name=='phaseDiscard') return false;
				if(!player.hasCard({name:'sksn_card_jinglianfu'},'e')) return false;
				for(var i=0;i<event.cards.length;i++){
					if(get.type(event.cards[i])!='basic') return true;
				}
				return false;
			},
			content:function (){
				"step 0"
				var num=0;
				for(var i=0;i<trigger.cards.length;i++){
					if(get.type(trigger.cards[i])!='basic') num++;
				}
				player.draw(num);
			},
			sub:true
		}
	}
},
"sksn_paozhi":{audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	usable:1,
	filter:function(event,player){
		var hs=player.getCards('h');
		if(hs.length<2) return false;
		var suitMap={};
		for(var i of hs){
			if(!suitMap[get.suit(i)]){
				suitMap[get.suit(i)]=1;
			}else return true;
		}
		return false;
	},
	filterCard:function(card,player){
		if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
		var suit=get.suit(card,player);
		return player.countCards('h',function(cardx){
			return cardx!=card&&suit==get.suit(cardx,player);
		})>0;
	},
	complexCard:true,
	selectCard:2,
	position:"h",
	check:function(card){
		return 7-get.value(card);
	},
	content:function (){
		"step 0"
		var cardx=get.cardPile(function(cardi){
			return get.suit(cardi)==get.suit(cards[0])&&
				get.subtype(cardi)=='sksnCtype_ziyuanBao';
		});
		if(cardx){
			var cardxx=game.createCard(cardx);
			player.gain(cardxx,'gain2','log');
		}else{
			var word=['打水漂了...','啊这','倒霉倒霉倒霉！'].randomGet();
				player.say(word);
		}
	},
	ai:{
		order:4,
		result:{
			player:1
		}
	}
},
//夏依
"sksn_qiqi":{   audio:"ext:时空枢纽:2",
                trigger:{
                    target:"useCardToBefore",
                },
                usable:1,
                filter:function (event,player){    
                return get.tag(event.card,'damage')&&player.countCards('h');            
    },
                check:function (){    
                return true;            
    },
                content:function (){
        "step 0"
        player.judge(function(card){
                        if(player.countCards('h',{color:'red'})<player.countCards('h',{color:'black'})&&get.color(card)=='black') return 1;
                        if(player.countCards('h',{color:'red'})>player.countCards('h',{color:'black'})&&get.color(card)=='red') return 1;
                        return 0;
                    })
        "step 1"
    if(result.judge>0){
        trigger.cancel();
        player.gain(trigger.cards,'gain2');
    }
    },
            },
"sksn_liuli":{  audio:"ext:时空枢纽:2",
                trigger:{
                    player:"phaseDrawAfter",
                },
                frequent:true,
                filter:function (event){
        return !event.numFixed;
    },
                content:function (){
        'step 0'
        player.draw(2);
        'step 1'
        player.chooseToDiscard('he',2,true).ai=function(card){
            var val=-get.value(card);
            var player=_status.event.player;
            if(ui.selected.cards.length){
                if(get.number(card)==get.number(ui.selected.cards[0])&&player.hp<player.maxHp) val+=3;
                if(get.color(card)==get.color(ui.selected.cards[0])) val+=0.5;
                if(get.type(card)==get.type(ui.selected.cards[0])) val++;
            }
            return val;
        }
        'step 2'
        var n=0;
        if(result.cards.length==2){
            if(get.color(result.cards[0])==get.color(result.cards[1])){
                player.draw();
            }
            if(get.number(result.cards[0])==get.number(result.cards[1])){
                player.recover();
            }
            if(get.type(result.cards[0])==get.type(result.cards[1])){
                n++;
                var player=_status.event.player;
                player.chooseTarget(get.prompt('sksn_liuli'),'令一名其他角色弃置一张【杀】').set('filterTarget',function(card,player,target){
                    return target!=player&&target.countCards('h');
                }).set('ai',function(target){
            if(get.attitude(player,target)>0) return false;
            return -get.attitude(player,target)+target.countCards('h');
                });
            }
        }                  
        if(n==0) event.finish();
        'step 3'    
        if(result.bool){
            player.line(result.targets[0]);
            if(result.targets[0].countCards('h',{name:'sha'})) result.targets[0].chooseToDiscard('h',{name:'sha'},true);        
}
    },
            },
//古尔格温
"sksn_ankui":{  audio:"ext:时空枢纽:2",
                init:function(player){ 
                    player.storage.sksn_ankui=[];
                },
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                direct:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_ankui.jpg>",
                intro:{
                    name:"鸦",
                    mark:function(dialog,storage,player){ 
                        if(storage){
                            var list=[];
                            for(var i=0;i<storage.length;i++){
                                list.push(storage[i]);
                            }
                            dialog.addSmall(list);
                        }
                    },
                },
                filter:function(event,player){
                    if(!player.storage.sksn_ankui||!player.storage.sksn_ankui.length) return true;
                    return player.countCards('he',{color:'black'})>=game.countPlayer(function(current){
                        return player.storage.sksn_ankui.contains(current)&&current.isAlive();
                    })&&game.hasPlayer(function(current){
                        return current!=player&&!player.storage.sksn_ankui.contains(current);
                    });
                },
                content:function(){
                    "step 0"
                    var num=0;
                    if(player.storage.sksn_ankui&&player.storage.sksn_ankui.length) num=game.countPlayer(function(current){
                        return player.storage.sksn_ankui.contains(current)&&current.isAlive();
                    });
                    if(num>0){
                        player.chooseCardTarget({
                            selectCard:num,
                            filterTarget:function(card,player,target){
                                return player!=target&&(!player.storage.sksn_ankui||!player.storage.sksn_ankui.contains(target));
                            },
                            filterCard:function(card,player){
                                return lib.filter.cardDiscardable(card,player)&&get.color(card)=='black';
                            },
                            selectTarget:1,
                            position:'he',
                            ai1:function(card){
                                return 8-get.value(card);
                            },
                            ai2:function(target){
                                return 1-get.attitude(player,target);
                            },
                            prompt:get.prompt('sksn_ankui'),
                            prompt2:"是否弃置"+get.cnNumber(num)+"张黑色牌令一名其他角色标记为【鸦】",
                        });
                    }
                    else{
                        player.chooseTarget(get.prompt('sksn_ankui'),'是否选择一名其他角色标记为【鸦】',
                            function(event,player,target){
                            return player!=target&&(!player.storage.sksn_ankui||!player.storage.sksn_ankui.contains(target));
                        }).set('ai',function(target){
                            return 1-get.attitude(player,target);
                        });
                    }
                    "step 1"
                    if(result.bool){
                        var target=result.targets[0];
                        player.logSkill('sksn_ankui',target);
                        player.discard(result.cards);
                        if(!player.storage.sksn_ankui) player.storage.sksn_ankui=[];
                        player.storage.sksn_ankui.push(target);
                        player.markSkill('sksn_ankui');
                        player.syncStorage('sksn_ankui');
                        player.storage.sksn_ankui.sortBySeat();
                    }
                },
                ai:{
                    expose:0.2,
        			viewHandcard:true,
        			skillTagFilter:function(player,tag,arg){
        				if(player==arg||!player.storage.sksn_ankui.contains(arg)) return false;
        			},
        		},
        		group:"sksn_ankui_ex",
                subSkill:{
                    ex:{
                        trigger:{
                            global:"drawBegin",
                        },
                        forced:true,
                        filter:function(event,player){
                            return player.storage.sksn_ankui&&player.storage.sksn_ankui.contains(event.player);
                        },
                        content:function(){
                            'step 0'
                            var cards=get.cards(trigger.num);
                            event.cards=cards;
                            player.chooseCardButton('【暗窥】：是否选择其中一张牌并用一张手牌替换之',cards).set('filterButton',function(button,player){
                                if(player.countCards('h')>0) return true;
                                return false;
                            }).set('ai',function(button){
                                return get.value(button.link);
                            });
                            'step 1'
                            if(result.bool){
                                event.card=result.links[0];
                                player.chooseCard('h','是否用一张手牌替换'+get.translation(event.card)).set('ai',function(card){
                                    if(event.card.name==card.name) return 1;
                                    if(player.hasSkill('sksn_chuanmi')) return 2+get.value(event.card)-get.value(card);
                                    return 0.1+get.value(event.card)-get.value(card);
                                });
                            }
                            else{
                                for(var i=event.cards.length-1;i>=0;i--){
                                    event.cards[i].fix();
                                    ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
                                }
                                event.finish();
                            }
                            'step 2'
                            if(result.bool){
                                game.log(player,"替换了牌堆顶的一张牌");
                                event.cards[event.cards.indexOf(event.card)]=result.cards[0];
                                player.lose(result.cards,ui.special);
                                var cardx=ui.create.card();
                                cardx.classList.add('infohidden');
                                cardx.classList.add('infoflip');
                                player.$throw(cardx,1000,'nobroadcast');
                            }
                            else{
                                for(var i=event.cards.length-1;i>=0;i--){
                                    event.cards[i].fix();
                                    ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
                                }
                                event.finish();
                            }
                            'step 3'
                            player.gain(event.card).sksn_ankui_ex=trigger.player;
                            player.$draw();
                            for(var i=event.cards.length-1;i>=0;i--){
                                event.cards[i].fix();
                                ui.cardPile.insertBefore(event.cards[i],ui.cardPile.firstChild);
                            }
                            game.delay();
                        },
                    },
                },
            },
"sksn_chuanmi":{audio:"ext:时空枢纽:2",
                trigger:{
                    player:"gainAfter",
                },
                filter:function(event,player){
                    return event.sksn_ankui_ex&&game.hasPlayer(function(current){
                        return current!=player&&!player.storage.sksn_ankui.contains(current);
                    });
                },
                direct:true,
                content:function(){
                    "step 0"
                    player.chooseTarget(get.prompt('sksn_chuanmi'),'是否令一名不为你所标记的【鸦】的其他角色获得'+get.translation(trigger.cards)+'的复制',function(card,player,target){
                            return target!=player&&(!player.storage.sksn_ankui||!player.storage.sksn_ankui.contains(target));
                    }).set('ai',function(target){     
                            return get.attitude(_status.event.player,target)/(target.countCards('h')+1);            
                    });        
                    "step 1"
                    if(result.bool){
                        var target=result.targets[0];
                        player.logSkill('sksn_chuanmi',target);
                        target.addSkill('sksn_chuanmi_hit')
                        if(!target.storage.sksn_chuanmi_hit) target.storage.sksn_chuanmi_hit=[];
                        var list=[];
                        for(var i=0;i<trigger.cards.length;i++){
                            var card=game.createCard(trigger.cards[i].name,trigger.cards[i].suit,trigger.cards[i].number,trigger.cards[i].nature);
                            card.storage.sksn_chuanmi=trigger.sksn_ankui_ex;
                            card._destroy="sksn_chuanmi";
                            var t=[card,trigger.sksn_ankui_ex];
                            target.storage.sksn_chuanmi_hit.push(t);
                            list.push(card);
                        }
                        target.gain(list,"draw").set('gaintag',['sksn_chuanmi']);
                        target.markSkill('sksn_chuanmi_hit');
                    }
                },
                subSkill:{
                    hit:{
                        trigger:{
                            player:["useCard","loseEnd"],
                        },
                        forced:true,
                        popup:false,
                        temp:true,
                        charlotte:true,
                        intro:{
                            mark:function(dialog,storage,player){ 
                                if(Array.isArray(player.storage.sksn_chuanmi_hit)&&player.storage.sksn_chuanmi_hit.length){ 
                                    if(player.isUnderControl(true)){
                                        dialog.addText('卡牌与对应目标'); 
                                        for(var i=0;i<player.storage.sksn_chuanmi_hit.length;i++){ 
                                            dialog.addSmall([player.storage.sksn_chuanmi_hit[i][0]]); 
                                            dialog.addSmall([player.storage.sksn_chuanmi_hit[i][1]]); 
                                        }
                                    }
                                    else{
                                        return '共有'+get.cnNumber(player.storage.sksn_chuanmi_hit.length)+'张【传密】牌';
                                    }
                                } 
                                else{ 
                                    return; 
                                } 
                            },
                        },
                        filter:function(event,player){
                            if(!player.storage.sksn_chuanmi_hit||!event.cards||!event.cards.length) return false;
                            if(event.name=='lose') return true;
                            else{
                                return event.cards.length==1&&event.card.isCard&&event.card.storage.sksn_chuanmi;
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            if(trigger.name=='useCard'){
                                game.log(trigger.card,"为","#g 【传密】","牌，无法被",trigger.card.storage.sksn_chuanmi,"响应");
                                trigger.directHit.addArray(game.filterPlayer(function(current){
                                    return current==trigger.card.storage.sksn_chuanmi;
                                }));
                            }
                            else{
                                for(var i=0;i<player.storage.sksn_chuanmi_hit.length;i++){
                                    if(!player.getCards('h').contains(player.storage.sksn_chuanmi_hit[i][0])){
                                        var temp=[];
                                        for(var j=0;j<player.storage.sksn_chuanmi_hit.length;j++){
                                            if(i!=j) temp.push(player.storage.sksn_chuanmi_hit[j]);
                                        }
                                        player.storage.sksn_chuanmi_hit=temp;
                                        player.syncStorage('sksn_chuanmi_hit');
                                    }
                                }
                                if(!player.storage.sksn_chuanmi_hit.length) player.unmarkSkill('sksn_chuanmi_hit');
                            }
                        },
                        ai:{
                            expose:0.2,
                            "directHit_ai":true,
                            skillTagFilter:function(player,tag,arg){
                                for(var i=0;i<player.storage.sksn_chuanmi_hit.length;i++){ 
                                    if(player.storage.sksn_chuanmi_hit[i][0]==arg.card&&player.storage.sksn_chuanmi_hit[i][1]==arg.target) return true;
                                }
                                return false;
                            },
                            aiValue:function(player,card,num){
                                if((card.type=='equip'||card.type=='delay')&&card.hasGaintag('sksn_chuanmi')) return num/10;
                                if(card.type!='equip'&&card.hasGaintag('sksn_chuanmi')) return num-0.1;
                            },
                        },
                    },
                },
            },
//德里克
"sksn_qihang":{ audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                usable:1,
                filterCard:true,
                selectCard:1,
                selectTarget:[1,Infinity],
                multiline:true,
                multitarget:true,
                filter:function (event,player){ 
                    return !game.hasPlayer(function(current){
                        return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(player);
                    })
                },
                filterTarget:function(card,player,target){
                    if(ui.selected.targets.length==0) return target==player;
                    else return !game.hasPlayer(function(current){
                        return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(target);
                    }); 
                },
                content:function(){
                    player.storage.sksn_qihang_go=[];
                    for(var i=0;i<targets.length;i++){
                        player.storage.sksn_qihang_go.push(targets[i]);
                    }
                    player.storage.sksn_qihang_go.sortBySeat();
                    player.addTempSkill('sksn_qihang_go',{player:'phaseUseBegin'});
                    player.markSkill('sksn_qihang_go');
                },
                check:function(card,player,target){
                    return 6-get.value(card);
                },
                position:"he",
                ai:{
                    order:7,
                    expose:0.2,
                    result:{
                        target:function(player,target){
                            if(ui.selected.targets.length==1&&get.attitude(player,target)<0&&game.hasPlayer(function(current){
                                return current!=player&&get.attitude(player,current)>0&&get.attitude(current,target)<0&&get.distance(current,target,'pure')==2&&!game.hasPlayer(function(currentx){
                                    return get.attitude(player,currentx)<0&&get.attitude(current,currentx)<0&&current.inRange(currentx);
                                });
                            })){
                                return -2.5;
                            }
                            return 1;
                        },
                    },
                },
                subSkill:{
                    go:{
                        global:["sksn_qihang_all"],
                        onremove:true,
                        temp:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qihang.jpg>",
                        intro:{
                            name:"起航",
                            mark:function(dialog,storage,player){ 
                                if(storage){
                                    var list=[];
                                    for(var i=0;i<storage.length;i++){
                                        list.push(storage[i]);
                                    }
                                    dialog.addSmall(list);
                                }
                            },
                        },
                        onremove:function (player){
                            delete player.storage['sksn_qihang_go'];
                            player.unmarkSkill('sksn_qihang_go');
                        },
                        sub:true,
                    },
                    all:{
                        mod:{
                            globalFrom:function(from,to,distance){
                                if(game.hasPlayer(function(current){
                                    return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(from)&&current.storage.sksn_qihang_go.contains(to);
                                })){
                                    return distance-1;
                                }
                            },
                            globalTo:function(from,to,distance){
                                if(game.hasPlayer(function(current){
                                    return current.storage.sksn_qihang_go&&!current.storage.sksn_qihang_go.contains(from)&&current.storage.sksn_qihang_go.contains(to);
                                })){
                                    return distance+1;
                                }
                            },
                        },
                        sub:true,
                    },
                },
            },
            "sksn_shulu":{audio:"ext:时空枢纽:2",
                mod:{
                    targetInRange:function (card,player,target){
                        if(!target.inRange(player)){
                            return true;
                        }
                    },
                    cardUsableTarget:function(card,player,target){
                        if(!target.inRange(player)&&game.hasPlayer(function(current){
                            return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(player);
                        })) return true;
                    },
                },
                trigger:{
                    global:"dieAfter",
                },
                filter:function(event,player,name){
                    return event.source&&game.hasPlayer(function(current){
                        return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(event.source)&&current.storage.sksn_qihang_go.contains(player);
                    });
                },
                forced:true,
                content:function(){
                    var players=game.filterPlayer();
                    var targets=[];
                    for(var i=0;i<players.length;i++){
                        if(players[i].isAlive()&&game.hasPlayer(function(current){
                            return current.storage.sksn_qihang_go&&current.storage.sksn_qihang_go.contains(player)&&current.storage.sksn_qihang_go.contains(players[i]);
                        })){
                            targets.push(players[i]);
                        }
                    }
                    game.asyncDraw(targets,2);
                },
            },
//海默德
"sksn_xiechi":{audio:"ext:时空枢纽:2",
                trigger:{
                    player:"loseHpEnd",
                },
                forced:true,
                filter:function (event,player,onrewrite){
                    return event.num>0;
                },
                content:function(){
                    event.suitx=['heart','diamond','club','spade'];
                    var list=[];
                    var num=player.hp*30;
                    if(num<30) num=30;
                    var tnum=ui.cardPile.childElementCount;
                    if(tnum>num) tnum=num;
                    for(var i=0;i<tnum;i++){
                        list.push(i);
                    }
                    for(var i=0;i<4;i++){
                        var card=game.createCard('sksn_card_xieer',event.suitx[i]);
                        game.log('牌堆中添加了',card);
                        ui.cardPile.insertBefore(card,ui.cardPile.childNodes[list.randomGet()]);
                        list.push(list.length);
                    }
                    game.updateRoundNumber();
                },
                group:["sksn_xiechi_jiu"],
                subSkill:{
                    jiu:{
                        firstDo:true,
                        trigger:{
                            player:"useCard1",
                        },
                        filter:function(event,player){
                            return event.card&&event.card.name=='jiu'&&event.cards&&
                                event.cards.length==1&&get.name(event.cards[0])=='sksn_card_xieer';
                        },
                        forced:true,
                        content:function(){
                            player.draw();
                            if(player.stat[player.stat.length-1].card.jiu>0){
                                player.stat[player.stat.length-1].card.jiu--;
                            }
                        },
                        mod:{
                            cardname:function (card,player){
                                if(card.name=='sksn_card_xieer') return 'jiu';
                            },
                        },
                        ai:{
                            effect:{
                                target:function(card,player,target){
                                    if(card.name=='sksn_card_xieer') return [1,0.6];
                                },
                            },
                        },
                        sub:true,
                    },
                },
            },
            "sksn_chitu":{audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                usable:1,
                filterCard:function(card){
                    return get.suit(card)=='heart';
                },
                selectCard:[0,1],
                filterTarget:function(card,player,target){
                    if(player==target) return false;
                    return player.inRange(target)&&target.countDiscardableCards(player,'he')>0;
                },
                content:function(){
                    "step 0"
                    if(cards.length==0){
                        player.loseHp();
                    }
                    "step 1"
                    event.temphp=target.hp;
                    player.discardPlayerCard(target,'he',true);
                    "step 2"
                    if(result.bool){
                        if(get.suit(result.cards[0])=='heart') event.lose=true;
                    }
                    else event.finish();
                    "step 3"
                    if(target.hp<event.temphp) event.lose=true;
                    "step 4"
                    if(event.lose==true) player.useCard({name:'sha'},target).set('addCount',false);
                },
                check:function(card){
                    var player=_status.event.player;
                    if(player.hp==1&&player.countCards('h',{name:'jiu'})>0) return 0;
                    if(get.tag(card,'recover')) return 0;
                    return 4-get.value(card);
                },
                position:"he",
                ai:{
                    order:function(){ 
                        return get.order({name:'sha'})+0.11; 
                    },
                    result:{
                        player:function(player,target){
                            var more=0;
                            if(player.hasSkill('sksn_xiechi')) more=1;
                            if(ui.selected.cards.length) return 0+more;
                            if(player.hp>target.hp) return -0.4+more;
                            if(player.hp>2) return -0.9+more;
                            if(player.hp==1&&player.countCards('h',{name:'jiu'})>0) return -1+more;
                            if(player.hp<=2) return -10+more;
                            return -2+more;
                        },
                        target:function(player,target){
                            var es=target.getCards('e');
                            for(var i=0;i<es.length;i++){
                                if(get.suit(es[i])=="heart"){
                                    return -1.5-get.effect(target,{name:'sha'},player,player);
                                }
                            }
                            return -1.5;
                        },
                    },
                },
                threaten:1.3,
            },
            "sksn_card_xieer_g":{
				cardSkill:true,
				trigger:{player:'loseEnd'},
				popup:false,
				forced:true,
				filter:function(event,player){
					if(!event.visible) return false;
					if(event.hs){
						for(var i=0;i<event.hs.length;i++){
							if(get.name(event.hs[i],player)=='sksn_card_xieer') return true;
						}
					}
					return false;
				},
				content:function(){
				    "step 0"
					var num=0;
					for(var i=0;i<trigger.hs.length;i++){
						if(get.name(trigger.hs[i],player)=='sksn_card_xieer') num++;
					}
					event.num=num;
					if(trigger.getParent().name!='useCard'||trigger.getParent().card.name!='sksn_card_xieer') player.popup('血饵','wood');
                    var next=player.chooseToDiscard('he',function(card){
                        return get.suit(card)=='heart';
                    }).set('ai',function(card){
                        return 9-get.value(card);
                    });
                    next.set('prompt2','请弃置'+get.cnNumber(num,true)+'张红桃牌，每少弃置一张牌你便会失去一点体力。');
                    "step 1"
                    if(result.bool) event.num-=result.cards.length;
                    if(event.num>0) player.loseHp(event.num);
				},
				mod:{
                    cardDiscardable:function (card,player){
                        if(!player.hasSkill('sksn_xiechi')&&card.name=='sksn_card_xieer') return false;
                    },
                    globalTo:function(from,to,distance){
                        if(to.hasSkill('sksn_xiechi')) return;
                        var list=to.getCards('h',function(card){
                            return card.name=='sksn_card_xieer';
                        });
                        return distance-list.length;
                    },
                },
			},
//沧佑
"sksn_muhai":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"phaseUseEnd"
	},
	direct:true,
	filter:function (event,player){
		return game.hasPlayer(function(current){
			var num=0;
			current.getHistory('lose',function(evt){
				if(evt.getParent('phaseUse')==event) num+=evt.cards.length;
			});
			return current!=_status.currentPhase&&current.isDamaged()&&num>=3;
		});
	},
	legalTargets:function (event){
		return game.filterPlayer(function(current){
			var num=0;
			current.getHistory('lose',function(evt){
				if(evt.getParent('phaseUse')==event) num+=evt.cards.length;
			});
			return current!=_status.currentPhase&&num>=3;
		});
	},
	content:function (){
		"step 0"
		var next=player.chooseTarget();
		next.filterTarget=function(card,player,target){
			if(target.isHealthy()) return false;
			return _status.event.targets.contains(target);
		};
		next.ai=function(target){
			if(_status.event.player.attitudeTo(target)>0){
				if(target.hp<=1) return 4;
				return 2;
			}
			return 0;
		};
		next.set('prompt',get.prompt2('sksn_muhai'));
		next.set('targets',lib.skill.sksn_muhai.legalTargets(trigger));
		"step 1"
		if(result.bool){
			var target=result.targets[0];
			player.logSkill('sksn_muhai',target);
			target.recover();
		}
	},
},
"sksn_chaoyong":{
	audio:"ext:时空枢纽:2",
	trigger:{
		target:"useCardToTargeted"
	},
	direct:true,
	filter:function (event,player){
		if(event.player!=_status.currentPhase) return false;
		return player.countCards('he');
	},
	content:function (){
		"step 0"
		var next=player.chooseCard('he',[1,trigger.targets.length]);
		next.ai=function(card){
			return 5-get.value(card);
		};
		next.set('prompt',get.prompt2('sksn_chaoyong'));
		"step 1"
		if(result.bool){
			player.logSkill('sksn_chaoyong');
			player.lose(result.cards,ui.discardPile,'visible');
			player.$throw(result.cards,1000);
			game.log(player,'将',result.cards,'置入了弃牌堆');
			player.draw(result.cards.length);
		}else event.finish();
		"step 2"
		if(!player.storage.dualside_over&&Array.isArray(player.storage.dualside)){
			player.chooseBool('潮涌：是否翻面？').ai=function(){
				if(!player.hasSkill('sksn_muhai')) return false;
				var targets=lib.skill.sksn_muhai.legalTargets(trigger.getParent('phaseUse'));
				for(var i=0;i<targets.length;i++){
					if(targets[i].isHealthy()||player.attitudeTo(targets[i])<=0){
						targets.splice(i--,1);
					}
				}
				return targets.length==0;
			};
		}else event._result.bool=false;
		"step 3"
		if(result.bool){
			player.turnOver();
		}
	}
},
"sksn_jingling":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"phaseUseEnd"
	},
	filter:function (event,player){
		if(player.isPhaseUsing()) return false;
		return event.player.getHistory('useCard',function(evt){
			return evt.isPhaseUsing();
		}).length>0;
	},
	prompt2:function (event,player){
		var history=event.player.getHistory('useCard',function(evt){
			return evt.isPhaseUsing();
		});
		event.card=history[0].card;
		event.cards=history[0].cards;
		return '获得并使用'+get.translation(event.card);
	},
	check:function (event,player){
		if(get.position(event.cards[0])=='e'){
			return player.attitudeTo(get.owner(event.cards[0]))<0;
		}
		if(get.position(event.cards[0])=='j'){
			return player.attitudeTo(get.owner(event.cards[0]))>0;
		}
		return true;
	},
	content:function (){
		"step 0"
		player.gain(trigger.cards,'gain2');
		"step 1"
		if(player.hasUseTarget(trigger.card,true,true)){
			player.chooseUseTarget(trigger.card,trigger.cards,true);
		}
	},
},
"sksn_chaoku":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:"useCardToPlayered"
	},
	direct:true,
	filter:function (event,player){
		if(event.getParent().triggeredTargets3.length>1) return false;
		var players=event.targets;
		for(var i=0;i<players.length;i++){
			if(players[i]==player) continue;
			if(players[i].countCards('hej')) return true;
		}
		return false;
	},
	content:function (){
		"step 0"
		var next=player.chooseTarget();
		next.filterTarget=function(card,player,target){
			if(target==player||!target.countCards('hej')) return false;
			return _status.event.targets.contains(target);
		};
		next.ai=function(target){
			if(_status.event.att>0){
				if(target.countCards('j')) return 1.5;
				if(target.countCards('e',function(card){
					return get.value(card,target)<0;
				})) return 2;
				return 1;
			}
			if(_status.event.att<0){
				if(target.hasCard('du','h')) return 1.7;
				return 1.2;
			}
			return 0;
		};
		next.set('prompt',get.prompt2('sksn_chaoku'));
		next.set('targets',trigger.targets);
		next.set('att',get.attitude(player,target));
		"step 1"
		if(result.bool){
			event.target=result.targets[0];
		}else event.finish();
		"step 2"
		player.logSkill('sksn_chaoku',target);
		if(target.hp<=0){
			player.viewHandcards(target);
			event.goto(4);
		}else{
			var next=player.choosePlayerCard(target,'hej','visible',[1,target.hp]);
			next.ai=function(card){
				if(_status.event.att<=0){
					if(get.position(card)=='j') return 10;
					return 5-get.value(card);
				}
				return get.value(card);
			};
			next.set('prompt','潮枯：请选择要重铸的牌');
			next.set('att',get.attitude(player,target));
		}
		"step 3"
		if(result.bool){
			target.lose(result.cards,ui.discardPile,'visible');
			target.$throw(result.cards,1000);
			game.log(target,'将',result.cards,'置入了弃牌堆');
			target.draw(result.cards.length);
		}
		"step 4"
		if(!player.storage.dualside_over&&Array.isArray(player.storage.dualside)){
			player.chooseBool('潮枯：是否翻面？').ai=function(){
				var current=_status.currentPhase;
				var count=-1;
				while(current!=player){
					if(!current.isTurnedOver()) count++;
					current=current.next;
					if(count>0) break;
				}
				return count<=0;
			};
		}else event.finish();
		"step 5"
		if(result.bool){
			player.turnOver();
		}
	}
},
//迈斯克
"sksn_mark_jinqian":{
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_dingtie.jpg>",
                intro:{
                    name:"金帖",
                    markcount:function(storage){
            return get.number(storage)||0;
        },
                    content:"card",
                    onunmark:function (storage,player){
            if(storage!=undefined){
                player.$throw(storage,1000);
                game.cardsDiscard(storage);
                game.log(storage,'被置入了弃牌堆');
                storage=undefined;
            }
        },
                },
            },
            "sksn_dingtie":{
            	audio:"ext:时空枢纽:2",
                locked:false,
                trigger:{
                    global:"phaseUseBegin",
                },
                direct:true,
                filter:function (event,player){
        if(event.player==player) return false;
        if(event.player.storage['sksn_mark_jinqian']) return false;
        return player.countCards('h');
    },
                content:function (){
        "step 0"
        var next=player.chooseToDiscard('h');
        next.ai=function(card){
            if(_status.event.att>0) return 4-get.value(card);
            return 7-get.value(card);
        };
        next.set('prompt',get.prompt2('sksn_dingtie',trigger.player));
        next.set('logSkill',['sksn_dingtie',trigger.player]);
        next.set('att',player.attitudeTo(trigger.player));
        "step 1"
        if(result.bool){
            trigger.player.judge(function(card){
                return 1-Math.floor(get.number(card)/3);
            });
        }else event.finish();
        "step 2"
        trigger.player.storage['sksn_mark_jinqian']=result.card;
        trigger.player.markSkill('sksn_mark_jinqian');
    },
                ai:{
                    threaten:2,
                },
                group:["sksn_dingtie_imm"],
                global:["sksn_mark_jinqian"],
                subSkill:{
                    imm:{
                        trigger:{
                            target:"useCardToTarget",
                        },
                        forced:true,
                        filter:function (event,player){
                if(!event.player.isPhaseUsing()) return false;
                if(!event.player.storage['sksn_mark_jinqian']) return false;
                var number1=get.number(event.card)||14;
                var number2=get.number(event.player.storage['sksn_mark_jinqian'])||0;
                return number1<number2;
            },
                        content:function(){
                trigger.getParent().targets.remove(player);
            },
                        ai:{
                            effect:{
                                target:function(card,player,target,current){
                        if(get.itemtype(player.storage['sksn_mark_jinqian'])=='card'){
                            var number1=get.number(card)||14;
                            var number2=get.number(player.storage['sksn_mark_jinqian'])||0;
                            if(player.isPhaseUsing()&&number1<number2) return 'zeroplayertarget';
                        }
                    },
                            },
                        },
                        sub:true,
                    },
                },
            },
            "sksn_wuhuan":{audio:"ext:时空枢纽:2",
                mod:{
                    cardUsableTarget:function(card,player,target){
            if(target.hasSkill('sksn_wuhuan_inf')){
                var number2=get.number(target.storage['sksn_mark_jinqian'])||13;
                if(get.number(card)>number2) return true;
            }
        },
                },
                locked:false,
                enable:"phaseUse",
                usable:1,
                filter:function (event,player){
        if(!player.countCards('h')) return false;
        return game.hasPlayer(function(current){
            return current.storage['sksn_mark_jinqian'];
        });
    },
                filterTarget:function (card,player,target){
                return target.storage['sksn_mark_jinqian'];
            },
                filterCard:true,
                position:"h",
                discard:false,
                lose:false,
                check:function (card){
        return (7-get.value(card))*(13-get.number(card));
    },
                content:function (){
        "step 0"
        targets[0].gain(cards,player,'giveAuto');
        var next=targets[0].chooseCard('he');
        next.complexCard=true;
        next.selectCard=function(){
            var num=0;
            for(var i=0;i<ui.selected.cards.length;i++){
                num+=get.number(ui.selected.cards[i]);
            }
            if(num>_status.event.number2){
                return [Math.max(ui.selected.cards.length,2),Infinity];
            }
            return ui.selected.cards.length+2;
        };
        next.filterCard=function(card){
            return _status.event.gcard!=card;
        };
        next.ai=function(card){
            var num=4.5;
            if(_status.event.source.countCards('hs')>4) return num=9;
            var number1=get.number(_status.event.gcard);
            if(number1>7) return num=6;
            if(ui.selected.cards.length>=2) num=0;
            return num-get.value(card);
        };
        next.set('prompt','物换：交给'+get.translation(player)+'两张牌，然后将你的「金帖」交给其');
        next.set('prompt2','或取消并用'+get.translation(cards[0])+'替换「金帖」，然后其本回合对你使用牌无次数限制');
        next.set('gcard',cards[0]);
        next.set('number2',get.number(targets[0].storage['sksn_mark_jinqian'])||0);
        next.set('source',player);
        "step 1"
        var card2=targets[0].storage['sksn_mark_jinqian'];
        if(result.bool){
            var card1=result.cards;
            player.gain(card1,targets[0],'give');
            delete targets[0].storage['sksn_mark_jinqian'];
            targets[0].unmarkSkill('sksn_mark_jinqian');
            player.gain(card2,targets[0],'gain2');
        }else{
            targets[0].gain(card2,'gain2');
            targets[0].lose(cards[0],ui.special,'toStorage');
            targets[0].storage['sksn_mark_jinqian']=cards[0];
            targets[0].markSkill('sksn_mark_jinqian');
            targets[0].addTempSkill('sksn_wuhuan_inf');
        }
    },
                ai:{
                    order:8,
                    threaten:1.7,
                    target:function (player,target){
            if(player.countCards('hs')<=4){
                if(target.countCards('he')>5) return -2;
                return 0;
            }
            return -1;
        },
                },
                subSkill:{
                    inf:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_wuhuan.jpg>",
                        intro:{
                            name:"物换",
                            content:"敢不交保护费？",
                        },
                        sub:true,
                    },
                },
            },
            "sksn_changfan":{audio:"ext:时空枢纽:2",
                trigger:{
                    target:"useCardToTarget",
                },
                direct:true,
                usable:1,
                filter:function (event,player){
        if(event.player==player) return false;
        if(event.player.storage['sksn_mark_jinqian']) return false;
        if(event.card.name=='sha'||(get.type2(event.card)=='trick'&&get.info(event.card).multitarget!=true)){
            return game.hasPlayer(function(current){
                return current.storage['sksn_mark_jinqian'];
            });
        }
    },
                content:function (){
        "step 0"
        var next=player.chooseTarget();
        next.filterTarget=function(card,player,target){
            if(!target.storage['sksn_mark_jinqian']) return false;
            var trigger=_status.event.getTrigger();
            var number2=get.number(target.storage['sksn_mark_jinqian'])||13;
            return number2<get.number(trigger.card);
        };
        next.ai=function(target){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            if(get.effect(player,trigger.card,trigger.player,player)>0) return 0;
            if(!trigger.targets.contains(target)){
                return get.effect(target,trigger.card,trigger.player,player);
            }
            return get.attitude(player,target);
        };
        next.set('prompt2','其获得自己的「金帖」，'+get.translation(trigger.card)+'对你无效');
        "step 1"
        if(result.bool){
            player.logSkill('sksn_changfan');
            var target1=result.targets[0];
            var card2=target1.storage['sksn_mark_jinqian'];
            delete target1.storage['sksn_mark_jinqian'];
            target1.unmarkSkill('sksn_mark_jinqian');
            target1.gain(card2,'gain2');
            trigger.getParent().excluded.add(player);
            if(!trigger.targets.contains(target1)){
                target1.draw();
                trigger.targets.push(target1);
                game.log(target1,'代替',player,'成为',trigger.card,'的目标');
            }else{
                game.log(player,'被取消了');
            }
        }
    },
                ai:{
                    effect:{
                        target:function(card,player,target){
                if(!player.storage['sksn_mark_jinqian']&&
                    game.hasPlayer(function(current){
                    return current.storage['sksn_mark_jinqian'];
                })){
                    return [1,-0.2,1,0];
                }
            },
                    },
                },
            },
//东方弘道
"sksn_chouyou":{audio:"ext:时空枢纽:2",
                trigger:{
                    global:"phaseUseBegin",
                },
                filter:function (event,player){
                    return !player.isTurnedOver()||!player.isDamaged()||!player.isLinked();
                },
                direct:true,
                content:function(){
                    "step 0" 
                    player.storage.sksn_chouyou_end=false;
                    event.videoId=lib.status.videoId++;
                    var func=function(target,id,bool){
                        var list=[
                            '横置并令XXX获得一张装备牌', 
                            '失去一点体力并令XXX获得两张基本牌', 
                            '翻面并令XXX获得三张锦囊牌', 
                        ];
                        var choiceList=ui.create.dialog('【筹友】：请选择至多三项','forcebutton');
                        choiceList.videoId=id;
                        for(var i=0;i<list.length;i++){
                            list[i]=list[i].replace(/XXX/g,target);
                            var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                            if(i==0&&!bool) str+='<div style="opacity:0.5">';
                            str+=list[i];
                            if(i==0&&!bool) str+='</div>';
                            str+='</div>';
                            var next=choiceList.add(str);
                            next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
                            next.firstChild.link=i;
                            for(var j in lib.element.button){
                                next[j]=lib.element.button[j];
                            }
                            choiceList.buttons.add(next.firstChild);
                        }
                        return choiceList;
                    };
                    if(player.isOnline2()){
                        player.send(func,get.translation(trigger.player),event.videoId,true);
                    }
                    event.dialog=func(get.translation(trigger.player),event.videoId,true);
                    if(player!=game.me||_status.auto){ 
                        event.dialog.style.display='none'; 
                    } 
                    var next=player.chooseButton(); 
                    next.set('dialog',event.videoId); 
                    next.set('forced',false); 
                    next.set('selectButton',[1,3]); 
                    next.set('filterButton',function(button){ 
                        if(button.link==0){ 
                            return !player.isLinked(); 
                        }; 
                        if(button.link==1){ 
                            return !player.isDamaged(); 
                        }; 
                        if(button.link==2){ 
                            return !player.isTurnedOver(); 
                        }; 
                        return true; 
                    }); 
                    next.set('ai',function(button){ 
                        var player=_status.event.player; 
                        var target=_status.event.getTrigger().player; 
                        if(get.attitude(player,target)<=0) return 0;
                        var att=get.attitude(player,target);
                        switch(button.link){ 
                            case 0:{ 
                                if(target.hasSkill('sksn_lianneng')) return att*1.5;
                                if(target.countCards('e')>2) return 0;
                                return att-3; 
                            } 
                            case 1:{ 
                                if(!game.hasPlayer(function(current){
                                    return get.attitude(player,current)<0;
                                })) return 0;
                                if(target.countCards('h')>target.getHandcardLimit()+2) return 0; 
                                return get.attitude(player,target)-1; 
                            } 
                            case 2:{ 
                                if(!game.hasPlayer(function(current){
                                    return get.attitude(player,current)<0;
                                })) return 0;
                                if(target.hasSkill('sksn_yineng')||target.hasSkill('sksn_mijian')) return att*2;
                                return att-5; 
                            } 
                        } 
                    }); 
                    "step 1" 
                    if(player.isOnline2()){
                        player.send('closeDialog',event.videoId);
                    }
                    event.dialog.close();
                    "step 2"
                    if(result.links){
                        player.logSkill('sksn_chouyou',trigger.player);
                        if(player.isOnline2()){ 
                            player.send('closeDialog',event.videoId); 
                        } 
                        // var list=[];
                        event.equipx=false;
                        event.basicx=false;
                        event.trickx=false;
                        var map=[ 
                            function(player,target){ 
                                player.addTempSkill('sksn_chouyou_buff','phaseUseEnd');
                                if(!player.storage.sksn_chouyou_buff) player.storage.sksn_chouyou_buff=[0,0,0]
                                player.storage.sksn_chouyou_buff[0]=1;
                                player.link(true);
                                event.equipx=true;
                                // var cardx=get.cardPile(function(card){ 
                                    // return get.type(card,'trick')=='equip'; 
                                // }); 
                                // if(cardx){ 
                                    // list.push(cardx);
                                // }
                            }, 
                            function(player,target){ 
                                player.addTempSkill('sksn_chouyou_buff','phaseUseEnd');
                                if(!player.storage.sksn_chouyou_buff) player.storage.sksn_chouyou_buff=[0,0,0]
                                player.storage.sksn_chouyou_buff[1]=2;
                                player.loseHp(); 
                                event.basicx=true;
                                // for(var i=0;i<2;i++){
                                    // var cardx=get.cardPile2(function(card){
                                        // return get.type(card)=='basic'&&!list.contains(card)
                                            // });
                                    // if(cardx) list.push(cardx);
                                // }
                            }, 
                            function(player,target){ 
                                player.addTempSkill('sksn_chouyou_buff','phaseUseEnd');
                                if(!player.storage.sksn_chouyou_buff) player.storage.sksn_chouyou_buff=[0,0,0]
                                player.storage.sksn_chouyou_buff[2]=3;
                                player.turnOver();
                                event.trickx=true;
                                // for(var i=0;i<3;i++){
                                    // var cardx=get.cardPile2(function(card){
                                        // return get.type(card,'trick')=='trick'&&!list.contains(card)
                                            // });
                                    // if(cardx) player.lose(cardx,ui.special),list.push(cardx);
                                // }
                            }, 
                        ]; 
                        for(var i=0;i<result.links.length;i++){ 
                            map[result.links[i]](player,trigger.player); 
                        } 
                        // if(list.length) trigger.player.gain(list,'gain2');
                    }
                    "step 3"
                    var list=[];
                    if(event.equipx){
                        var cardx=get.cardPile(function(card){ 
                            return get.type(card,'trick')=='equip'; 
                        }); 
                        if(cardx){ 
                            list.push(cardx);
                        }
                    }
                    if(event.basicx){
                        for(var i=0;i<2;i++){
                            var cardx=get.cardPile2(function(card){
                                return get.type(card)=='basic'&&!list.contains(card)
                                    });
                            if(cardx) list.push(cardx);
                        }
                    }
                    if(event.trickx){
                        for(var i=0;i<3;i++){
                            var cardx=get.cardPile2(function(card){
                                return get.type(card,'trick')=='trick'&&!list.contains(card)
                                    });
                            if(cardx) list.push(cardx);
                        }
                    }
                    if(list.length) trigger.player.gain(list,'gain2');
                    player.storage.sksn_chouyou_end=true;
                },
                ai:{
                    expose:0.2,
                },
                subSkill:{
                    buff:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_chouyou.jpg>",
                        forced:true,
                        init:function(player){ 
                            player.storage.sksn_chouyou_buff=[0,0,0]
                        },
                        onremove:function(player){
                            delete player.storage['sksn_chouyou_buff'];
                        },
                        trigger:{
                            global:"damageBegin",
                        },
                        filter:function(event,player){ 
                            return player.storage.sksn_chouyou_end==true&&player.storage.sksn_chouyou_buff&&player.storage.sksn_chouyou_buff[0]+player.storage.sksn_chouyou_buff[1]+player.storage.sksn_chouyou_buff[2]>0; 
                        },
                        content:function(){ 
                            var list=[];
                            if(player.storage.sksn_chouyou_buff[0]>0){
                                player.storage.sksn_chouyou_buff[0]--;
                                var card=get.cardPile(function(card){ 
                                    return get.type(card,'trick')=='equip'; 
                                }); 
                                if(card) list.push(card);
                            }
                            if(player.storage.sksn_chouyou_buff[1]>0){
                                player.storage.sksn_chouyou_buff[1]--;
                                var card=get.cardPile(function(card){ 
                                    return get.type(card,'trick')=='basic'; 
                                }); 
                                if(card) list.push(card);
                            }
                            if(player.storage.sksn_chouyou_buff[2]>0){
                                player.storage.sksn_chouyou_buff[2]--;
                                var card=get.cardPile(function(card){ 
                                    return get.type(card,'trick')=='trick'; 
                                }); 
                                if(card) list.push(card);
                            }
                            if(list.length) player.gain(list,'gain2');
                            if(player.storage.sksn_chouyou_buff[0]==0&&player.storage.sksn_chouyou_buff[1]==0&&player.storage.sksn_chouyou_buff[2]==0) player.removeSkill('sksn_chouyou_buff'),player.unmarkSkill('sksn_chouyou_buff');
                            player.update();
                        },
                        intro:{
                            markcount:function(storage,player){
                                if(storage){
                                    var num=0;
                                    for(var i=0;i<3;i++){
                                        if(storage[i]&&storage[i]>num) num=storage[i];
                                    }
                                    return num;
                                }
                                return 0;
                            },
                            content:function(storage,player){
                                if(!storage) return;
                                var str='本阶段下一次有角色受伤时，你获得一张';
                                var temp;
                                for(var i=0;i<3;i++){
                                    if(storage[i]&&storage[i]>0){
                                        if(temp) str+='、';
                                        if(i==0) str+='装备牌';
                                        if(i==1) str+='基本牌';
                                        if(i==2) str+='锦囊牌';
                                        temp=true;
                                    }
                                }
                                str+='。'
                                return str;
                            },
                        },
                        sub:true,
                    },
                    end:{sub:true,},
                },
            },
            "sksn_funeng":{
            	audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                derivation:["sksn_nizong"],
                skillAnimation:true,
                animationStr:"赋能",
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_funeng.jpg>",
                limited:true,
                animationColor:"water",
                unique:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player!=target;
                },
                discard:false,
                lose:false,
                delay:0,
                filterCard:function(card){ 
                    return get.type(card)!='basic'; 
                },
                selectCard:-1,
                filter:function(event,player){
                    return !player.storage.sksn_funeng&&player.countCards('h',function(card){ 
                               if(_status.connectMode) return true; 
                               return get.type(card)!='basic'; 
                           })>0;
                },
                content:function(){
                    player.awakenSkill(event.name);
                    player.storage[event.name]=true;
                    var num1=cards.length,num2=player.countCards('h',{type:'basic'});
                    target.gain(cards,player,'giveAuto');
                    if(num1>num2){
                        player.changeSksnBUFF('_sksn_buff_mingshi',2);
                        target.changeSksnBUFF('_sksn_buff_mingshi',2);
                    }
                    else player.addTempSkill('sksn_nizong',{player:'phaseBegin'});
                },
                ai:{
                    order:function(card,player){ 
                        if(player.countCards('h',function(card){ 
                               return get.type(card)!='basic'; 
                           })<3) return 0;
                        if(player.countCards('h',function(card){ 
                               return get.type(card)!='basic'; 
                           })>player.countCards('h',{type:'basic'})){ 
                            return 12; 
                        } 
                        else{ 
                            return 0.1; 
                        }
                    },
                    result:{
                        player:function(player,target){ 
                            if(player.countCards('h',function(card){ 
                                if(_status.connectMode) return true; 
                                return get.type(card)!='basic'; 
                            })>player.countCards('h',{type:'basic'})){ 
                                return 0; 
                            } 
                            else{ 
                                if(player.countCards('h',function(card){ 
                                    return get.type(card)=='basic'; 
                                })+player.hp<5) return 1; 
                            } 
                        },
                        target:function(player,target){ 
                            if(target.hasSkillTag('nogain')||target.hasSkill('zishou2')||get.SksnBUFFNum(target,"_sksn_buff_shufu")>0) return 0; 
                            if(target.hasJudge('lebu')) return 0;
                            var num1=player.countCards('h',{type:'trick'})+player.countCards('h',{type:'delay'});
                            var num2=player.countCards('h',{type:'equip'});
                            var more=0;
                            if(target.hasSkill('sksn_mijian')) more+=num1;
                            if(target.hasSkill('sksn_yineng')) more+=num1;
                            if(target.hasSkill('sksn_lianneng')) more+=num2;
                            if(player.countCards('h',function(card){ 
                                if(_status.connectMode) return true; 
                                return get.type(card)!='basic'; 
                            })>player.countCards('h',{type:'basic'})){ 
                                return 0.5+more; 
                            } 
                            else{ 
                                return more; 
                            } 
                        },
                    },
                    expose:0.4,
                },
            },
            "sksn_yunshi":{
            	audio:"ext:时空枢纽:2",
                trigger:{
                    player:["linkBegin","loseHpBegin","turnOverBegin"],
                },
                direct:true,
                filter:function (event,player,onrewrite){
                    if(onrewrite=='linkBegin'){
                        return !player.isLinked()&&player.countCards('he',{type:'equip'})>0;
                    }
                    if(onrewrite=='loseHpBegin'){
                        return player.countCards('he',{type:'basic'})>0;
                    }
                    if(onrewrite=='turnOverBegin'){
                        return player.countCards('he',{type:'trick'})+player.countCards('he',{type:'delay'})>0;
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    var onrewrite=event.triggername;
                    var str;
                    if(onrewrite=='linkBegin') str="弃置一张装备牌令一名其他角色弃置一张牌";
                    if(onrewrite=='loseHpBegin') str="弃置一张基本牌令一名其他角色增加一层『迷茫』";
                    if(onrewrite=='turnOverBegin') str="弃置一张锦囊牌对一名其他角色造成一点伤害";
                    player.chooseCardTarget({
                        filterCard:function(card){ 
                            if(onrewrite=='linkBegin') return get.type(card)=='equip';
                            if(onrewrite=='loseHpBegin') return get.type(card)=='basic';
                            if(onrewrite=='turnOverBegin') return get.type(card,'trick')=='trick';
                            return false; 
                        },
                        selectCard:1,
                        filterTarget:function(card,player,target){
                            if(player==target) return false;
                            if(onrewrite=='linkBegin') return target.countDiscardableCards(target,'he')>0;
                            return true;
                        },
                        selectTarget:1,
                        position:'he',
                        ai1:function(card){
                            return 6-get.value(card);
                        },
                        ai2:function(target){
                            if(onrewrite=='turnOverBegin') return ai.get.damageEffect(target,player,player);
                            else return -get.attitude(player,target);
                        },
                        prompt:get.prompt('sksn_yunshi'),
                        prompt2:str,
                    });
                    'step 1'
                    if(result.bool){
                        event.target=result.targets[0];
                        player.logSkill('sksn_yunshi',event.target);
                        player.discard(result.cards);
                        var onrewrite=event.triggername;
                        if(onrewrite=='linkBegin') event.target.chooseToDiscard(1,true,'he'); 
                        if(onrewrite=='loseHpBegin') game.changeSksnBUFF(event.target,'_sksn_buff_mimang',1);
                        if(onrewrite=='turnOverBegin') event.target.damage();
                    }
                    else event.finish();
                },
            },
//尤里维斯
"sksn_wenshi":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    player:'phaseDrawBegin1',
                },
                init:function(player){
                    player.storage.sksn_wenshi = [];
                },
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_wenshi.jpg>",
                filter:function(event,player){
                    return !event.numFixed && player.storage.sksn_wenshi.length >= 2;
                },
                intro:{
                    name:"记住的牌",
                    content:function(storage){
                        var str = "";
                        for(var c of storage){
                            str += get.translation(c.name);
                            str += get.translation(c.suit);
                            str += c.number;
                            str += " ";
                        }
                        return str;
                    }
                },
                check:function(event,player){
                    if(player.storage.sksn_wenshi.filter(function(card){
                        return get.value(card,player) > 5;
                    }).length){
                        return true;
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    trigger.changeToZero();
                    event.models = [];
                    for(var i=0;i<2;i++){
                        var model = player.storage.sksn_wenshi.randomGet();
                        player.storage.sksn_wenshi.remove(model);
                        event.models.add(game.createCard(model.name,model.suit,model.number,model.nature));
                    }
                    player.gain(event.models,'gain');
                    player.syncStorage('sksn_wenshi');
                },
                group:['sksn_wenshi_ji','sksn_wenshi_damage'],
                subSkill:{
                    damage:{
                        sub:true,
                        trigger:{
                            player:'damageEnd',
                        },
                        direct:true,
                        filter:function(event,player){
                            return player.storage.sksn_wenshi.length;
                        },
                        content:function(){
                            'step 0'
                            event.cards = [];
                            for(var card of player.storage.sksn_wenshi){
                                event.cards.push(game.createCard(card.name,card.suit,card.number,card.nature));
                            }
                            player.chooseCardButton("你可选择一条记录删除之，并将其放在排队底。",event.cards,1)
                            .set('ai',function(button){
                                if(get.value(button.link) > 5)return -1;
                                return 20 - get.value(button.link);
                            });
                            'step 1'
                            if(result && result.links && result.links.length){
                                player.storage.sksn_wenshi = player.storage.sksn_wenshi.filter(function(card){
                                    return card.name != result.links[0].name;
                                });
                                player.logSkill('sksn_wenshi');
                                player.syncStorage('sksn_wenshi');
                                event.card = result.links[0];
                                event.cards.remove(event.card);
                                game.cardsDiscard(event.cards);
                            }else{
                                event.finish();
                            }
                            'step 2'
                            event.card.fix();
                            ui.cardPile.appendChild(event.card);
                            game.log(player,'将',event.card,'放在了牌堆底。');
                        }
                    },
                    ji:{
                        sub:true,
                        forced:true,
                        priority:9009,
                        popup:false,
                        trigger:{
                            player:['useCard2','respondEnd']
                        },
                        filter:function(event,player){
                            for(var card of player.storage.sksn_wenshi){
                                if(card.name == event.card.name)return false;
                            }
                            return event.card.name && event.card.suit && event.card.number !== undefined;
                        },
                        content:function(){
                            'step 0'
                            player.storage.sksn_wenshi.push({
                                name:trigger.card.name,
                                suit:get.suit(trigger.card),
                                number:get.number(trigger.card),
                                nature:get.nature(trigger.card),
                            });
                            player.syncStorage('sksn_wenshi');
                        }
                    }
                }
            },
            "sksn_taohui":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:'useCard',
                },
                filter:function(event,player){
                    if(event.player == player)return false;
                    if(!event.isPhaseUsing(event.player))return false;
                    if(event.card.name != 'sha' && get.type(event.card) != 'trick')return false;
                    if(event.player.hp >= event.player.maxHp)return false;
                    if(player.countCards('he',{color:'red'}) == 0)return false;
                    return true;
                },
                direct:true,
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'he',{color:'red'})
                    .set('prompt',get.prompt2('sksn_taohui'))
                    .set('ai',function(card){
                        if(get.attitude(player,trigger.player) < 0){
                            return -10;
                        }
                        return 4 - get.value(card);
                    });
                    'step 1'
                    if(result && result.cards && result.cards.length){
                        player.logSkill('sksn_taohui',trigger.player);
                        trigger.all_excluded = true;
                        trigger.player.recover();
                        trigger.player.draw(2)
                        .set('gaintag',['sksn_taohui'])
                        .set('bottom',true);
                    }else{
                        event.finish();
                    }
                },
                global:['sksn_taohui_c'],
                subSkill:{
                    c:{
                        sub:true,
                        mod:{
                            ignoredHandcard:function (card,player){
                                if(card.hasGaintag && card.hasGaintag('sksn_taohui'))return true;
                            },
                            cardDiscardable:function(card,player,name){
                                if(name=='phaseDiscard' && (card.hasGaintag('sksn_taohui'))){
                                    return false;
                                }
                            },
                            cardUsable:function(card,player){
                                if(card.hasGaintag && card.hasGaintag('sksn_taohui')){
                                    return Infinity;
                                }
                                if(card.cards && card.cards.length){
                                    for(var c of card.cards){
                                        if(!c.hasGaintag || !c.hasGaintag('sksn_taohui'))return;
                                    }
                                    return Infinity;
                                }
                            }
                        },
                    }
                }
            },
//卢基诺
"sksn_bianmou":{
                enable:"phaseUse",
                audio:"ext:时空枢纽:2",
                usable:1,
                delay:false,
                BianmouCard:function(player,card){
                    var cards=player.getCards('hs');
                    var max=0;
                    if(cards.length>0){
                        for(var i=0;i<cards.length;i++){
                            var tcard=cards[i];
                            if(typeof(tcard)=='string'){
                                tcard={name:tcard,isCard:true};
                            }
                            var targets=game.filterPlayer();
                            var value=[];
                            var min=0;
                            var info=get.info(tcard);
                            if(!info||info.notarget) min=0;
                            var range;
                            var select=get.copy(info.selectTarget);
                            if(select==undefined){
                            //    if(info.filterTarget==undefined) return true;
                                range=[1,1];
                            }
                            else if(typeof select=='number') range=[select,select];
                            else if(get.itemtype(select)=='select') range=select;
                            else if(typeof select=='function') range=select(tcard,player);
                            if(info.singleCard) range=[1,1];
                            game.checkMod(tcard,player,range,'selectTarget',player);
                            if(!range) min=0;
                            for(var j=0;j<targets.length;j++){
                                if(player.canUse(tcard,targets[j],true,false)){
                                    var eff=get.effect(targets[j],card,player,player);
                                    value.push(eff);
                                }
                            }
                            value.sort(function(a,b){
                                return b-a;
                            });
                            for(var k=0;k<value.length;k++){
                                if(k==range[1]||range[1]!=-1&&value[k]<=0) break;
                                min+=value[k];
                            }
                            var t=player.getUseValue(tcard);
                            if(get.tag(tcard,'draw')) t=3*t;
                            if(!['yiyi'].contains(tcard)&&!['diaohulishan'].contains(tcard)) min-=t;
                            if(min>max) max=min;
                        }
                    }
                    return max;
                },
                BianmouHandCard:function(player,card,ucard){
                    if(typeof(card)=='string'){
                        card={name:card,isCard:true};
                    }
                    var targets=game.filterPlayer();
                    var value=[];
                    var min=0;
                    var info=get.info(card);
                    if(!info||info.notarget) min=0;
                    var range;
                    var select=get.copy(info.selectTarget);
                    if(select==undefined){
                    //    if(info.filterTarget==undefined) return true;
                        range=[1,1];
                    }
                    else if(typeof select=='number') range=[select,select];
                    else if(get.itemtype(select)=='select') range=select;
                    else if(typeof select=='function') range=select(card,player);
                    if(info.singleCard) range=[1,1];
                    game.checkMod(card,player,range,'selectTarget',player);
                    if(!range) min=0;
                    for(var j=0;j<targets.length;j++){
                        if(player.canUse(card,targets[j],true,false)){
                            var eff=get.effect(targets[j],ucard,player,player);
                            value.push(eff);
                        }
                    }
                    value.sort(function(a,b){
                        return b-a;
                    });
                    for(var k=0;k<value.length;k++){
                        if(k==range[1]||range[1]!=-1&&value[k]<=0) break;
                        min+=value[k];
                    }
                    var t=player.getUseValue(card);
                    if(get.tag(card,'draw')) t=3*t;
                    if(!['yiyi'].contains(card)&&!['diaohulishan'].contains(card)) min-=t;
                    return min;
                },
                content:function(){
                    'step 0'
                    var num=3+(Math.max(0,player.countCards('e')));
                    if(player.storage.yqyl_zhiming) num=7;
                    var list=[];
                    for(var i=0;i<lib.inpile.length;i++){
                        if(get.type(lib.inpile[i])=='trick'&&!get.info({name:lib.inpile[i]}).multitarget){
                            list.push(['锦囊','',lib.inpile[i]]);
                        }
                    }
                    list=list.randomGets(num);
                    player.chooseButton(['变谋',[list,'vcard']]).set('filterButton',function(button,player){
                        return game.hasPlayer(function(current){
                            return player.canUse(button.link[2],current,true,false);
                        });
                    }).set('ai',function(button){
                        var card={name:button.link[2]};
                        var player=_status.event.player;
                        if(['yiyi'].contains(button.link[2])) return 0;
                        else if(['diaohulishan'].contains(button.link[2])) return 0;
                        else return lib.skill['sksn_bianmou'].BianmouCard(player,card);
                    });
                    'step 1'
                    if(result.bool){
                        var name=result.links[0][2];
                        event.cardx={name:name};
                        player.chooseCardTarget({
                            filterCard:function(card){
                                return game.hasPlayer(function(current){
                                    return player.canUse(card,current,true,false);
                                });
                            },
                            position:'hs',
                            filterTarget:lib.filter.filterTarget,
                            selectTarget:lib.filter.selectTarget,
                            ai1:function(card){
                                return lib.skill['sksn_bianmou'].BianmouHandCard(player,card,event.cardx)
                            },
                            ai2:function(target){
                                var card=event.cardx;
                                var player=_status.event.player;
                                return get.effect(target,card,player,player)-2;
                            },
                            _get_card:event.fakecard,
                            prompt:'将一张手牌当作'+get.translation(name)+'使用'
                        }).set('fakecard',ui.selected.cards[0]);
                    }
                    else{
                        player.draw();
                        event.finish();
                    }
                    'step 2'
                    if(result.bool){
                        player.useCard(event.cardx,result.cards,result.targets);            
                    }
                    else player.draw();
                },
                ai:{
                    order:10,
                    result:{
                        player:1,
                    },
                },
            },
            "sksn_libing":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"useCardToPlayered",
                },
                filter:function (event,player){
                    if(player.hasSkill('sksn_libing_off')) return false;
                    if(event.cards.filterInD().length!=1||event.targets.length!=1||event.player==player||event.targets[0]==player||event.player==event.targets[0]) return false;
                    var cards=event.cards.filterInD();
                    return player.canUse('diaohulishan',event.targets[0],false)&&player.countCards('hs',function(card){
                        return get.suit(card)==get.suit(cards[0]);
                    })>0;;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=trigger.cards.filterInD();
                    var suit=get.suit(cards[0]);
                    var target1=trigger.targets[0];
                    var target2=_status.currentPhase;
                    player.chooseCard(function(card,player){
                            return get.suit(card)==suit;
                        },'hs',get.prompt('sksn_libing'),'是否将一张'+get.translation(suit)+'手牌当作【调虎离山】对自己和'+get.translation(trigger.targets[0])+'使用？').set('ai',function(card){
                            var player=_status.event.player;
                            var att=get.attitude(player,target1);
                            var att2=get.attitude(player,target2);
                            if(get.effect(target1,trigger.card,trigger.player,player)>=0) return 0;
                            else if(get.tag(trigger.card,'damage')||get.tag(trigger.card,'recover')) return 7-get.value(card);
                            else if(att<0&&target1==target2) return 9-get.value(card);
                            else if(att>0&&att2<0) return 2-get.value(card)
                    });
                    'step 1'
                    if(result.bool){
                        player.addTempSkill('sksn_libing_off');
                        var targets=get.copy(trigger.targets);
                        targets.add(player);
                        player.useCard({name:'diaohulishan'},result.cards,targets,'sksn_libing');
                    }
                },
                ai:{
                    threaten:1.1,
                    expose:0.2,
                },
                subSkill:{
                    off:{
                        sub:true,
                    },
                },
            },
//怀德乔
"sksn_yinjue":{
                trigger:{
                    global:"phaseBefore",
                },
                forced:true,
                priority:10,
                audio:"ext:时空枢纽:2",
                filter:function (event,player){
        return !player.storage.sksn_yinjue;
    },
                content:function (){
        'step 0'
        player.storage.sksn_yinjue=true;
        var num=game.countGroup();
        player.gainMaxHp(num);
        event.num=num;
        'step 1'
        player.recover(event.num);
        player.say('闸种，我是你爸爸。');
        //player.update();
    },
},
"sksn_ezheng":{
                trigger:{
                    player:"phaseUseBegin",
                },
                audio:"ext:时空枢纽:2",
                direct:true,
                filter:function (event,player){
                    return game.hasPlayer(function(current){
                        return current!=player&&current.countCards('e')>=1;
                    });
                },
                content:function (){
                    "step 0"
                    var check=true;
                    player.chooseTarget(get.prompt2('sksn_ezheng'),function(card,player,target){
                        return player!=target&&target.countCards('e')>=1;
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        var att=get.attitude(player,target);
                        if(target.hasSkillTag('noh')||target.hasSkillTag('noe')) return att*3;
                        if(target.countCards('e')==1) return -att*2;
                        return 1+Math.random();
                    });
                    "step 1"
                    if(result.bool){
                        event.target=result.targets[0];
                        player.logSkill('sksn_ezheng',event.target);
                        event.target.chooseCard(1,'e','恶政：交给'+get.translation(player)+'一张装备区内的牌',true).set('ai',function(card){    
                            if(_status.event.check){
                                return 8-get.value(card);
                            }
                            return 6-get.value(card);
                        }).set('check',get.attitude(event.target,player)>0);
                    }
                    else event.finish();
                    "step 2"
                    if(result.bool){
                        if(!player.storage.sksn_ezheng) player.storage.sksn_ezheng=result.cards.length;
                        player.storage.sksn_ezheng2=event.target;
                        player.gain(result.cards,event.target,'giveAuto');
                    }
                },
                group:"sksn_ezheng_end",
                subSkill:{
                    end:{
                        trigger:{
                            player:"phaseDiscardEnd",
                        },
                        filter:function (event,player){
                            return player.storage.sksn_ezheng&&game.hasPlayer(function(current){
                                return current==player.storage.sksn_ezheng2;
                            });
                        },
                        silent:true,
                        forced:true,
                        popup:false,
                        content:function (){
                            'step 0'
                            var check=true;
                            player.chooseCard(2,'h','恶政：是否还给'+get.translation(player.storage.sksn_ezheng2)+'两张手牌？').set('ai',function(card){
                                if(_status.event.check&&player.needsToDiscard()) return 8-get.value(card);
                                if(!_status.event.check){
                                    if(player.needsToDiscard()) return 6-get.value(card);
                                    else if(player.hp>=2) return -1;
                                }
                                return 6-get.value(card);
                            }).set('check',get.attitude(player,player.storage.sksn_ezheng2)>0);
                            'step 1'
                            if(result.bool){
                            	player.logSkill('sksn_ezheng');
                                player.storage.sksn_ezheng2.gain(result.cards,player,'giveAuto');
                            }
                            else{
                                player.storage.sksn_ezheng2.line(player);
                                player.logSkill('sksn_ezheng');
                                player.draw(2);
                                player.loseMaxHp();
                            }
                            'step 2'
                            delete player.storage.sksn_ezheng2;
                            delete player.storage.sksn_ezheng;
                        },
                        sub:true,
                    },
                },
            },
//费尔伊德
"sksn_mark_zui":{
                onremove:function (player){
        player.removeGaintag('sksn_mark_zui');
    },
            },
            "sksn_chengE":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"damageEnd",
                },
                usable:1,
                forced:true,
                filter:function (event,player){
        if(!event.source||event.source==player) return false;
        if(!event.cards||get.itemtype(event.cards)!='cards'||
        event.cards.length>1||event.card.name!=event.cards[0].name) return false;
        if(player.countCards('h',function(card){
            if(card.hasGaintag('sksn_mark_zui')){
                return card.name==event.card.name;
            }
            return false;
        })) return false;
        return true;
    },
                content:function (){
        player.gain(trigger.cards,'visible','gain2').gaintag.add('sksn_mark_zui');
        if(trigger.player==player){
            player.line(trigger.source,{color:[169,0,0]});
            trigger.source.addTempSkill('sksn_chengE_add',{player:'phaseBegin'});
        }
    },
                group:["sksn_mark_zui"],
                subSkill:{
                    add:{
                        audio:"ext:时空枢纽:1",
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_chengE_add.jpg>",
                        intro:{
                            name:"惩恶",
                            content:"你下次受到的伤害+1<br>或到你下个回合开始时回复1点体力",
                        },
                        onremove:function (player){
                if(!player.storage['sksn_chengE_add']){
                    player.logSkill('sksn_chengE_add');
                    player.recover();
                }else{
                    delete player.storage['sksn_chengE_add'];
                }
            },
                        trigger:{
                            player:"damageBegin3",
                        },
                        forced:true,
                        direct:true,
                        content:function (){
                "step 0"
                player.logSkill('sksn_chengE');
                player.storage['sksn_chengE_add']=true;
                trigger.num++;
                "step 1"
                player.removeSkill('sksn_chengE_add');
            },
                        sub:true,
                    },
                },
            },
            "sksn_yejv":{
                audio:"ext:时空枢纽:4",
                zhuanhuanji:true,
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yejv.jpg>",
                intro:{
                    content:function (storage){
            if(storage==true) return '当你翻回正面时，你可以使用一张牌并摸两张牌；或弃置一张牌。';
            return '你在回合外获得牌后，你可以使用一张不为「罪」的手牌并翻至背面。';
        },
                },
                locked:false,
                group:["sksn_yejv_yin","sksn_yejv_yang"],
                subSkill:{
                    yin:{
                        audio:"sksn_yejv",
                        trigger:{
                            player:"gainAfter",
                        },
                        direct:true,
                        filter:function (event,player){
                if(player.storage['sksn_yejv']===true) return false;
                if(player.hasSkill('sksn_yejv_off')) return false;
                if(_status.currentPhase==player) return false;
                return player.countCards('hs');
            },
                        content:function (){
                "step 0"
                player.addTempSkill('sksn_yejv_off');
                player.chooseToUse({
                    filterCard:function(cardx){
                        if(get.itemtype(cardx)=='card'&&cardx.hasGaintag('sksn_mark_zui')) return false;
                        return lib.filter.filterCard(cardx);
                    },
                    prompt:get.prompt('sksn_yejv'),
                    prompt2:'使用一张非「罪」，然后翻面'
                }).set('logSkill','sksn_yejv');
                "step 1"
                if(result.bool){
                    player.turnOver(true);
                    player.storage['sksn_yejv']=true;
                }
                "step 2"
                player.removeSkill('sksn_yejv_off');
            },
                        sub:true,
                    },
                    yang:{
                        audio:"sksn_yejv",
                        trigger:{
                            player:"turnOverEnd",
                        },
                        direct:true,
                        filter:function (event,player){
                if(player.storage['sksn_yejv']!==true) return false;
                if(player.hasSkill('sksn_yejv_off')) return false;
                if(player.isTurnedOver()) return false;
                return player.countCards('hes');
            },
                        content:function (){
                "step 0"
                player.addTempSkill('sksn_yejv_off');
                player.chooseToUse({
                    prompt:get.prompt('sksn_yejv'),
                    prompt2:'使用一张牌，然后摸两张牌'
                }).set('logSkill','sksn_yejv');
                "step 1"
                if(result.bool){
                    player.draw(2);
                    event.bool=true;
                }else{
                    player.chooseToDiscard('he').set('ai',function(card){
                        return 10-get.value(card);
                    }).set('prompt2','你可以弃置一张牌亦当你发动了【夜惧】').set('logSkill','sksn_yejv');
                }
                "step 2"
                if(result.bool==true||event.bool==true){
                    player.storage['sksn_yejv']=false;
                }
                "step 3"
                player.removeSkill('sksn_yejv_off');
            },
                        sub:true,
                    },
                    off:{
                        sub:true,
                    },
                },
            },
            "sksn_tongnan":{
                audio:"ext:时空枢纽:4",
                zhuanhuanji:true,
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_tongnan.jpg>",
                intro:{
                    content:function (storage){
            if(storage==true) return '当你造成伤害后，你可以选择一名本回合未受到过伤害的角色，除非其弃置一张牌并翻面，否则你对其造成1点伤害。';
            return '其他角色回合结束时，你可以选择一名本回合受到过伤害的角色，你交给其一张牌，其可视为对当前回合角色使用【杀】。';
        },
                },
                locked:false,
                group:["sksn_tongnan_yin","sksn_tongnan_yang"],
                derivation:["sksn_tongnan_tip"],
                subSkill:{
                    yin:{
                        audio:"sksn_tongnan",
                        trigger:{
                            global:"phaseEnd",
                        },
                        direct:true,
                        filter:function (event,player){
                if(player.storage['sksn_tongnan']===true) return false;
                if(_status.currentPhase==player) return false;
                return game.hasPlayer(function(current){
                    return current.getHistory('damage').length>0;
                });
            },
                        content:function (){
                "step 0"
                player.chooseTarget(function(card,player,target){
                    return target.getHistory('damage').length>0;
                },function(target){
                    if(get.attitude(_status.event.player,_status.currentPhase)>0) return 0;
                    return get.attitude(_status.event.player,target);
                }).set('prompt2','你交给其一张牌。其可对'+get.translation(_status.currentPhase)+'视为使用【杀】');
                "step 1"
                if(result.bool){
                    event.target=result.targets[0];
                    player.logSkill('sksn_tongnan',event.target);
                    player.line(event.target,{color:[0,191,255]});
                    player.storage['sksn_tongnan']=true;
                }else event.finish();
                "step 2"
                if(event.target!=player&&player.countCards('he')){
                    player.chooseCard(true,'he',
                        '选择一张牌交给'+get.translation(event.target)
                    ).set('ai',function(card){
                        return -get.value(card);
                    });
                }else event.goto(4);
                "step 3"
                if(result.bool){
                    event.target.gain(result.cards,player,'giveAuto');
                }
                "step 4"
                event.target.chooseUseTarget({name:'sha'},_status.currentPhase).set('addCount',false);
            },
                        sub:true,
                    },
                    yang:{
                        audio:"sksn_tongnan",
                        trigger:{
                            source:"damageAfter",
                        },
                        direct:true,
                        filter:function (event,player){
                if(player.storage['sksn_tongnan']!==true) return false;
                return game.hasPlayer(function(current){
                    return !current.getHistory('damage').length;
                });
            },
                        content:function (){
                "step 0"
                player.chooseTarget(function(card,player,target){
                    return !target.getHistory('damage').length;
                },function(target){
                    if(get.attitude(_status.event.player,target)>0&&target.isTurnedOver()&&
                        target.countCards('he',function(card){
                        return get.value(card)<8&&card.name!='du';
                    })) return 3;
                    var value=3/target.hp||0;
                    value+=2/(target.countCards('he')+1);
                    return -get.attitude(_status.event.player,target)+value;
                }).set('prompt2','除非其弃置一张牌并翻面，否则其受到1点伤害');
                "step 1"
                if(result.bool){
                    event.target=result.targets[0];
                    player.logSkill('sksn_tongnan',event.target);
                    player.line(event.target,{color:[255,69,0]});
                    player.storage['sksn_tongnan']=false;
                }else event.finish();
                "step 2"
                event.target.chooseToDiscard('he').set('ai',function(card){
                    var value=20;
					value/=Math.max(player.hp+1,2);
					return value-get.value(card);
                }).set('prompt','弃置一张牌，或取消并受到一点伤害');
                "step 3"
                if(result.bool){
                    event.target.turnOver();
                }else{
                    event.target.damage();
                }
            },
                        sub:true,
                    },
                },
            },
//沐孤尘//
"sksn_qiulu":{
	audio:"ext:时空枢纽:2",
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qiulu.jpg>",
	intro:{
		content:function (storage){
            if(storage) return '冷却'+get.cnNumber(storage)+'回合';
            return '就緒';
        },
	},
	enable:"phaseUse",
	filter:function (event,player){
        if(player.hasMark('sksn_qiulu')) return false;
        return player.countCards('h');
    },
	filterCard:true,
	check:function (card){
        return 8-get.value(card);
    },
	contentBefore:function (){
        player.addMark('sksn_qiulu',2);
    },
	content:function (){
        "step 0"
        player.sksnFaxian({
            select:2,
            cardList:function(){
                var list=[];
                for(var i in lib.card){
                    if(get.type(i)=='land'){
                        list.push(i);
                    }
                }
                return list;
            },
            prompt:'求路：请选择一张牌获得之'
        });
        "step 1"
        if(result){
            player.gain(result,'log','gain2');
        }
    },
    ai:{
		order:3,
        result:{
			player:1
        },
    },
	group:["sksn_qiulu_cooling"],
	subSkill:{
		cooling:{
			trigger:{
				player:"phaseBefore",
			},
			forced:true,
			silent:true,
			popup:false,
			priority:4,
			filter:function (event,player){
                return player.hasMark('sksn_qiulu');
            },
			content:function (){
                player.removeMark('sksn_qiulu');
            },
			sub:true,
		},
	},
},
"sksn_paihuai":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:["phaseZhunbeiBegin","phaseJieshuBegin"],
	},
	direct:true,
	check:function (event,player){
        var x=player.hp;
        if(x>4) x=4;if(x<2) x=2;
        var num=player.countCards('h')-x;
        if(num>-2&&num<=0||num>2) return false;
        return true;
    },
	changeHandcardTo:function (player,x){
        var num=player.countCards('h')-x;
        if(num>0){
            player.chooseToDiscard(num,true);
        }else{
            player.drawTo(x);
        }
    },
	content:function (){
        "step 0"
        var onreweite=event.triggername;
        if(onreweite=='phaseJieshuBegin'){
            if(player.getHistory('gain',function(evt){
                return evt.getParent(3).skill=='sksn_paihuai';
            }).length>0){
                player.logSkill('sksn_paihuai');
                player.chooseToDiscard(2,'he',true);
            }
            if(player.getHistory('lose',function(evt){
                return evt.getParent(4).skill=='sksn_paihuai';
            }).length>0){
                player.logSkill('sksn_paihuai');
                player.draw(2);
            }
            event.finish();
        }
        "step 1"
        var map={};
        var list=[];
        for(var i=1;i<=4;i++){
            var cn=get.cnNumber(i,true);
            map[cn]=i;
            list.push(cn);
        }
        event.map=map;
        player.chooseControl(list.concat('cancel2'),function(){
            var hs=player.countCards('h');
            if(hs>6||(
				hs<2&&player.countCards('j','lebu')&&player.hp<=2
			)) return 'cancel2';
            if(hs<=1||hs==6) hs=5;
            return hs-2;
        }).set('prompt','徘徊：请选择自己要将手牌摸至或弃至的值');
        "step 2"
        if(result.control!='cancel2'){
            player.logSkill('sksn_paihuai');
            lib.skill['sksn_paihuai'].changeHandcardTo(player,event.map[result.control]||4);
        }
    },
},
//——扎格——//
 "sksn_langhun":{audio:"ext:时空枢纽:2",
            trigger:{
                player:"dying",
            },
            forced:true,
            content:function(){
                player.recover(1-player.hp);
                if(player.isDisabled(1)) player.enableEquip(1);
                player.removeSkill('sksn_langhun');
            },
        },
"sksn_baying":{audio:"ext:时空枢纽:2",
            trigger:{
                player:"phaseUseEnd",
            },
            direct:true,
            filter:function (event,player){
                if(get.SksnBUFFNum(player,"_sksn_buff_kangji")==0) return false;
                return game.hasPlayer(function(current){
                    return current!=player&&(current.countDiscardableCards(player,'e')>0||current.countGainableCards(player,'e')>0);
                }); 
            },
            content:function(){
                'step 0'
                player.chooseTarget(get.prompt('sksn_baying'),function(card,player,target){
                    return target!=player&&(target.countDiscardableCards(player,'e')>0||target.countGainableCards(player,'e')>0);
                }).set('ai',function(target){
                    var player=_status.event.player;
                    var att=get.attitude(player,target);
                    if(att>0){
                        if(target.getEquip('baiyin')&&target.isDamaged()&&
                            get.recoverEffect(target,player,player)>0){
                            if(target.hp==1&&!target.hujia) return 1.6*att;
                            if(target.hp==2) return 0.01*att;
                            return 0;
                        }
                    }
                    var es=target.getCards('e');
                    var noe=target.hasSkillTag('noe');
                    var noe2=(es.length==1&&es[0].name=='baiyin'&&target.isDamaged());
                    if(noe||noe2) return 0;
                    if(att<=0&&!es.length) return 1.5*att;
                    return -1.5*att;
                });
                'step 1'
                if(result.bool){     
                    event.target=result.targets[0];
                    player.logSkill('sksn_baying',result.targets);
                    event.numx=get.SksnBUFFNum(player,"_sksn_buff_kangji");
                    if(event.target.countDiscardableCards(player,'e')<1) event.goto(3);
                    else if(event.target.countGainableCards(player,'e')<1) event.goto(4);
                    else{
                        player.chooseControl(function(){
                            var player=_status.event.player; 
                            var att=get.attitude(player,event.target);
                            if(att>0) return '选项一';
                            else return '选项二';
                        }).set('choiceList',['弃置'+get.translation(event.target)+'一张装备牌并令其摸一张牌','获得'+get.translation(event.target)+get.translation(event.numx)+'张装备牌并对其造成一点伤害，然后你执行一个额外的出牌阶段并失去此技能。']);
                    }
                }               
                else event.finish();
                'step 2'
                if(result.control=='选项二'){
                    event.goto(3);
                }
                else if(result.control=='选项一'){
                    event.goto(4);
                }
                else event.finish();
                'step 3'
                player.gainPlayerCard(event.target,event.numx,'e',true)
                event.target.damage();
                player.removeSkill('sksn_baying');
                var next=player.phaseUse();
                event.next.remove(next);
                trigger.next.push(next);
                event.finish();
                'step 4'
                player.discardPlayerCard(event.target,'e',true)
                event.target.draw();
                event.finish();
            },
            ai:{
                expose:0.2,
            },
        },
 "sksn_jishi":{audio:"ext:时空枢纽:2",
            enable:"phaseUse",
            usable:1,
            filter:function(event,player){
                return player.storage.disableEquip!=undefined&&player.storage.disableEquip.length<5;
            },
            content:function(){
                'step 0'
                player.chooseToDisable(true).set('ai',function(event,player,list){
                    if(list.contains('equip1')&&player.hasSkill('sksn_langhun')) return 'equip1';
                    else if(list.contains('equip5')) return 'equip5';
                    else return list.randomGet();
                });
                'step 1'
                var card=get.cardPile(function(card){
                    return card.name=='sha';
                });
                if(card) player.gain(card,'gain2');
                game.changeSksnBUFF(player,"_sksn_buff_kangji",1);
                player.addTempSkill('sksn_jishi_gogogo',{player:'phaseAfter'});
                if(!player.storage.sksn_jishi_gogogo) player.storage.sksn_jishi_gogogo=0;
                player.storage.sksn_jishi_gogogo++;
                'step 2'
                if(player.storage.disableEquip!=undefined&&player.storage.disableEquip.length==5){
                    player.disableJudge();
                    player.removeSkill('sksn_jishi');
                }
            },
            ai:{
                order:13,
                result:{
                    player:function(player,target){
                        if(game.hasPlayer(function(current){
                            return get.effect(current,{name:'sha'},player,player)>0&&player.canUse({name:'sha'},current,false,false);
                        })) return 1;
                        else return 0;
                    },
                },
            },
            subSkill:{
                    gogogo:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_jishi.jpg>",
                        intro:{
                            content:function(storage){
                                return '每当你的【杀】命中后增加'+storage+'层『增势』';
                            },
                        },
                        onremove:function (player){
                            delete player.storage['sksn_jishi_gogogo'];
                        },
                        trigger:{
                            player:"shaHit",
                        },
                        forced:true,
                        content:function(){
                            var num=player.storage.sksn_jishi_gogogo;
                            for(var i=0;i<num;i++){
                                if(get.SksnBUFFNum(player,"_sksn_buff_jiangshi")>0){
                                    player.changeSksnBUFF("_sksn_buff_jiangshi",-1);
                                }else{
                                    player.changeSksnBUFF("_sksn_buff_zengshi",1);
                                }
                            }
                        },
                    sub:true,
                },
            },
        },
//——诺登斯——//
"sksn_yumen":{  audio:"ext:时空枢纽:2",
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                threaten:1.6,
                direct:true,
                content:function (){
        'step 0'
        game.countPlayer(function(current){
            if(current.hasSkill("sksn_zhichu_damage")) current.removeSkill("sksn_zhichu_damage");
        });     
        'step 1'
        var n=Math.min(game.players.length-1,player.maxHp-player.hp);
        var num=Math.max(n,1);
        player.chooseTarget(get.prompt("sksn_yumen"),[1,num],'选择至多'+num+'名其他角色',function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            var player=_status.event.player;
            if(get.attitude(player,target)>0&&(target.hp<=2||target.countCards('he')<=2||player.hp<=2)) return Infinity-target.hp;
            return 0;
        }).animate=false;
        'step 2'
        player.logSkill('sksn_yumen');
        if(result.bool){
            if(player.hp<player.maxHp) player.recover(result.targets.length);
        else player.draw();
            player.addTempSkill("sksn_zhichu_damage0",{player:'phaseBefore'});
            for(var i=0;i<result.targets.length;i++){  
                result.targets[i].addSkill("sksn_zhichu_damage");
                }
        }
    },
            },
"sksn_zhichu":{audio:"ext:时空枢纽:2",
                trigger:{
                    player:"phaseJieshuBegin",
                },
                forced:true,
                content:function (){
        "step 0"   
        var list=['火','雷','冰'];        
        player.chooseControl(list).set('ai',function(){
            return list.randomGet();
        }).set('prompt',get.prompt('sksn_zhichu')).set('prompt2',get.translation('sksn_zhichu_info'));                                                                                                                                                                             
        "step 1"
        player.addTempSkill("sksn_zhichu_damage00",{player:'phaseUseBegin'});
        if(result.control=='火'){
            player.addTempSkill("sksn_zhichu_fire",{player:'phaseUseBegin'});
        }
        if(result.control=='雷'){
            player.addTempSkill("sksn_zhichu_thunder",{player:'phaseUseBegin'});
        }
        if(result.control=='冰'){
            player.addTempSkill("sksn_zhichu_ice",{player:'phaseUseBegin'});
        }
    },
            },
 "sksn_zhichu_damage0":{
                trigger:{
                    global:"damageBefore",
                },
                forced:true,
                priority:90,
                filter:function (event,player){
        return player!=event.player&&event.player.hasSkill('sksn_zhichu_damage');
    },
                content:function (){
        'step 0'
        player.logSkill("sksn_yumen");
        trigger.cancel();
        player.chooseToDiscard(2).set('ai',function(card){
            if(card.name=='tao') return -10;
            if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
            return get.unuseful(card)+2.5*(5-get.owner(card).hp);
        });            
        "step 1"
        if(result.bool==false){
            player.loseHp();
        }
    },
            },
            "sksn_zhichu_fire":{
                ai:{
                    nofire:true,
                    effect:{
                        target:function(card,player,target,current){
                            if(get.tag(card,'fireDamage')) return 'zerotarget';
                        }
                    }
                }
            },
            "sksn_zhichu_thunder":{
                ai:{
                    nothunder:true,
                    effect:{
                        target:function(card,player,target,current){
                            if(get.tag(card,'thunderDamage')) return 'zerotarget';
                        }
                    }
                }
            },
            "sksn_zhichu_ice":{
                ai:{
                    noice:true,
                    effect:{
                        target:function(card,player,target,current){
                            if(get.tag(card,'iceDamage')) return 'zerotarget';
                        }
                    }
                }
            },
            "sksn_zhichu_damage00":{
                trigger:{
                    player:"damageBefore",
                },
                direct:true,
                priority:99,
                filter:function (event,player){
        return event.nature=='fire'&&player.hasSkill('sksn_zhichu_fire')||event.nature=='thunder'&&player.hasSkill('sksn_zhichu_thunder')||event.nature=='ice'&&player.hasSkill('sksn_zhichu_ice');
    },
                content:function (){
        trigger.num--;
        player.draw(2);
        player.logSkill("sksn_zhichu");    
    },
            },
            "sksn_zhichu_damage":{},
//——嘤嘤熊——//
"sksn_yingning":{
	            audio:"ext:时空枢纽:1",
                zhuanhuanji:true,
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yingning1.jpg>",
                intro:{
                    content:function (storage){
            if(storage==true) return '其他角色的出牌阶段开始时，你可以交给其一张牌，若如此做，其的弃牌阶段结束后，本阶段内进入弃牌堆的牌每有一张有伤害标签的牌或【酒】，你摸一张牌。';
            return '出牌阶段限一次，你可以观看一名手牌数最多（或之一）的其他角色的手牌并选择其中至多X张，若如此做，其选择是否将这些牌交给你，若否，其增加一层“迷茫”。（X为你与其手牌之差的一半，向上取整且至少为1）。';
        },
                },
                locked:false,
                group:["sksn_yingning_yin","sksn_yingning_yang","sksn_yingning_draw"],
                subSkill:{
                    yin:{audio:"ext:时空枢纽:1",
                        prompt:"出牌阶段限一次，你可以观看一名手牌数最多（或之一）的其他角色的手牌并选择其中至多X张，若如此做，其选择是否将这些牌交给你，若否，其增加一层“迷茫”。（X为你与其手牌之差的一半，向上取整且至少为1）。",
                        enable:"phaseUse",
                        usable:1,
                        filter:function(event,player){
                return player.storage.sksn_yingning!=true;
            },
                        filterTarget:function(card,player,target){
                return target!=player&&!game.hasPlayer(function(current){
                    return current.countCards('h')>target.countCards('h');
                });
            },
                        content:function(){
                'step 0'
                player.storage.sksn_yingning=true;
                var num=target.countCards('h')-player.countCards('h');
                num=Math.ceil(num/2);
                if(num>=1){
                player.chooseCardButton([1,num],target,target.getCards('h')).set('ai',function(button){
                    return get.value(button.link);
                });
                }
                else{
                player.chooseCardButton(target,target.getCards('h')).set('ai',function(button){
                    return get.value(button.link);
                });
                }
                'step 1'
                if(result.bool){                           
                    event.cards=result.links;    
                    var evalue=0;
                    for(var i=0;i<event.cards.length;i++){
                        if(event.cards[i]) evalue+=get.value(event.cards[i]);
                    }   
                    var maydis=target.countCards('h',{name:'sha'})+target.countCards('h',{name:'jiu'});
                    target.chooseBool(get.translation(player)+'想要获得你的'+get.translation(event.cards)+'是否交给TA？').ai=function(){ 
                        return get.attitude(target,player)>0||(maydis>0&&target.countCards('h')-target.getHandcardLimit()>2*event.cards.length&&evalue<20); 
                    };           
                }               
                else event.finish();
                'step 2'
                if(result.bool){
                    player.gain(event.cards,target,'giveAuto');
                }
                else game.changeSksnBUFF(target,'_sksn_buff_mimang',1);
            },
                        ai:{
                            order:1,
                            result:{
                                target:function(player,target){
                                    if(get.attitude(player,target)>0) return 0.1;
                                    return -target.countCards('h');
                                },
                            },
                        },
                        sub:true,
                    },
                    yang:{
                        trigger:{
                            global:"phaseUseBegin",
                        },
                        filter:function (event,player){
                return player.storage.sksn_yingning==true&&player.countCards('he')&&event.player!=player;
            },
                        direct:true,
                        content:function (){
                "step 0"
                player.chooseCard('he','是否交给'+get.translation(trigger.player)+'一张牌').set('ai',function(card){
                    if(get.attitude(trigger.player,player)>0) return get.value(card);
                    if(trigger.player.next==player||trigger.player.countCards('h')-trigger.player.getHandcardLimit()>2||(trigger.player.countCards('h')-trigger.player.getHandcardLimit()>0&&(get.SksnBUFFNum(player,"_sksn_buff_mimang")>0||get.SksnBUFFNum(player,"_sksn_buff_shufu")>0))){
                        if(card.name=='jiu'||card.name=='sha') return 8;
                        return 8-get.value(card);
                    }
                    return 0;
                });
                "step 1"
                if(result.bool){
                    player.logSkill('sksn_yingning',trigger.player);
                    player.storage['sksn_yingning']=false;
                    trigger.player.gain(result.cards,player,'giveAuto');
                    trigger.player.addTempSkill('sksn_yingning_mark',{player:'phaseEnd'});
                    trigger.player.storage.sksn_yingning_mark=player;
                }
                else{
                    event.finish();
                }
            },
                        sub:true,
                    },
                    draw:{
                        trigger:{
                            global:"phaseDiscardAfter",
                        },
                        filter:function(event,player){
                            if(event.player!=player&&event.player.storage.sksn_yingning_mark==player){
                                return event.player.getHistory('lose',function(evt){
                                    return evt.type=='discard'&&evt.getParent('phaseDiscard')==event&&evt.hs.filterInD('d').length>0;
                                }).length>0;
                            }
                            return false;
                        },
                        priority:1,
                        direct:true,
                        forced:true,
                        content:function(){
                            "step 0"
                            var cards=[];
                            game.getGlobalHistory('cardMove',function(evt){
                                if(evt.name=='cardsDiscard'&&evt.getParent('phaseDiscard')==trigger) cards.addArray(evt.cards.filterInD('d'));
                            });
                            game.countPlayer2(function(current){
                                current.getHistory('lose',function(evt){
                                    if(evt.type!='discard'||evt.getParent('phaseDiscard')!=trigger) return;
                                    cards.addArray(evt.cards.filterInD('d'));
                                })
                            });
                            if(cards.length){
                            var num=0;
                            for(var i=0;i<cards.length;i++){
                                if(get.tag(cards[i],'damage')||cards[i].name=='jiu') num++;
                            };
                            }
                            if(num>0){
                            player.logSkill('sksn_yingning_draw');
                            player.draw(num);
                            }
                        },
                    },
                    mark:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yingning2.jpg>",
                        intro:{
                            name:"嘤嘤嘤",
                            mark:function(dialog,storage,player){ 
                if(storage){
                    var list=[];
                    list.push(storage);
                    dialog.addSmall(list);
                }
            },
                        },
                        onremove:function (player){
                delete player.storage['sksn_yingning_mark'];
                player.unmarkSkill('sksn_yingning_mark');
            },
                        sub:true,
                    },
                },
            },
//———芸如————//
"sksn_qudong":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:"phaseUseEnd",
	},
	frequent:true,
	filter:function (event,player){
		var type=[];
		player.getHistory('useCard',function(evt){
			if(evt.getParent('phaseUse')==event) type.add(get.type2(evt.card));
		});
		return type.length>=player.hp;
	},
	content:function (){
		"step 0"
		var list=[],except=[];
		player.getHistory('useCard',function(evt){
			if(evt.getParent('phaseUse')==trigger) except.add(evt.card.name);
		});
		for(var i of lib.inpile){
			if(!except.contains(i)&&['basic','trick'].contains(get.type(i))) list.push(i);
		}
		event.list=list;
		"step 1"
		for(var i=0;i<event.list.length;i++){
			var typeTip=get.type(event.list[i]);
			var name=event.list[i];
			event.list[i]=[typeTip,'',name];
		}
		player.chooseButton(['选择一张牌使用之',[event.list,'vcard']]).set('ai',function(button){
			var card={name:button.link[2]},player=_status.event.player;
			if(get.tag(card,'damage')&&player.needsToDiscard()<2) return -1;
			if(['jiu'].contains(button.link[2])) return -1;
			if(player.hasValueTarget(card,false,true)) return player.getUseValue(card);
        }).set('filterButton',function(button){
			if(button.link[2]=='du') return false;
			if(get.tag({name:button.link[2]},'damage')){
				if(player.countDiscardableCards(player,'he')<2) return false;
			}
			return player.hasUseTarget(button.link[2],false,true);
		}).set('prompt2','使用伤害类锦囊牌须弃置两张牌');
		"step 2"
		event.card={name:result.links[0][2]};
		if(get.type(event.card)=='trick'&&get.tag(event.card,'damage')){
			player.chooseToDiscard(2,true);
		}
		player.chooseUseTarget(event.card,true).set('nodistance',true).set('addCount',false);
	},
	group:"sksn_qudong_mark",
	subSkill:{
		mark:{
			marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qudong.jpg>",
			intro:{
				name:"驱动",
				markcount:function (storage){return storage.type.length},
				content:function(storage){
					var tip='';
					if(storage.type.length>0){
						tip+='已使用过的牌类别：';
						tip+=get.translation(storage.type);
					}
					if(storage.name.length>0){
						tip+='<br>已使用过的牌名：';
						tip+=get.translation(storage.name);
					}
					return tip;
				},
			},
			trigger:{player:["phaseUseBefore","useCard","phaseUseAfter"]},
			forced:true,
			silent:true,
			popup:false,
			filter:function (event,player,onrewrite){
				if(onrewrite=='useCard') return player.isPhaseUsing();
				return true;
			},
			content:function (){
				if(player.storage['sksn_qudong_mark']==undefined){
					player.storage['sksn_qudong_mark']={
						count:[],
						name:[],
					};
				}
				var onrewrite=event.triggername;
				switch(onrewrite){
					case 'phaseUseBefore':{
						player.storage['sksn_qudong_mark'].type=[];
						player.storage['sksn_qudong_mark'].name=[];
						break;
					}
					case 'phaseUseAfter':{
						player.unmarkSkill('sksn_qudong_mark');
						break;
					}
					default:{
						player.storage['sksn_qudong_mark'].type.add(get.type2(trigger.card));
						player.storage['sksn_qudong_mark'].name.add(trigger.card.name);
						player.markSkill('sksn_qudong_mark');
					}
				}
			},
			sub:true,
		},
	},
},
"sksn_keyan":{
	audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		return player.countCards('h');
	},
	filterCard:true,
	check:function (card){
		return 7-get.value(card);
	},
	content:function (){
		"step 0"
		player.sksnFaxian({
			select:[3,1],
			cardList:function(){
				var list=[];
				if(['basic','trick','equip'].contains(get.type2(cards[0]))){
					for(var i of lib.inpile){
						if(get.type2(i)==get.type2(cards[0])){
							list.push(i);
						}
					}
				}else{
					for(var i in lib.card){
						if(get.type(i)==get.type(cards[0])){
							list.push(i);
						}
					}
				}
				return list;
			},
			cardSource:cards[0],
			prompt:'科研：请选择一张牌获得之'
		});
		"step 1"
		if(result){
			event.card=result[0];
			player.chooseTarget('将'+get.translation(event.card)+'交给一名角色').set('ai',function(target){
				if(get.attitude(_status.event.player,target)>0){
					return target.getUseValue(_status.event.card2,true,true);
				}
				return 0;
			}).set('card2',event.card);
		}else event.finish();
		"step 2"
		if(result.bool) var target1=result.targets[0];
		else var target1=player;
		target1.gain(event.card,'log','gain2');
	},
	ai:{
		order:1,
		result:{
			player:1
		},
	},
	derivation:["sksn_keyan_tip"],
	group:"sksn_keyan_exact",
	subSkill:{
		exact:{
			trigger:{player:"rewriteSksnFaxianList"},
			direct:true,
			filter:function (event,player,onrewrite){
				return event.getParent(2).skill=='sksn_keyan';
			},
			content:function (){
				var card1=trigger.cardSource;
				var type1=get.type2(card1);
				if(['basic','trick'].contains(type1)){
					var list1=get.inpile(type1);
				}
				if(list1){
					var list2=[];
					var tagList=['damage','recover','draw','discard'];
					for(var i of list1){
						for(var j of tagList){
							if(j=='recover'){
								if((get.tag({name:i},'recover')||get.tag({name:i},'save'))&&(get.tag(card1,'recover')||get.tag(card1,'save'))){
									list2.push(i);
									break;
								}
							}else if(get.tag({name:i},j)&&get.tag(card1,j)){
								list2.push(i);
								break;
							}
						}
					}
				}
				if(list2&&list2.length>0){
					if(list2.length>1) list2.remove(card1.name);
					var boolOfSame=false;
					for(var i=0;i<trigger.list.length;i++){
						if(list2.contains(trigger.list[i][2])){
							boolOfSame=true;
							break;
						}
					}
					if(!boolOfSame){
						trigger.list[0][2]=list2.randomGet();
					}
				}
			},
			sub:true,
		},
	},
},
//——安洁莉娜——//
 "sksn_genzhi":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    player:"phaseDiscardBegin",
                },
                direct:true,
                filter:function (event,player){
        return player.countCards('h',function(card){
            return get.color(card)=='red'||_status.connectMode;
        });
    },
                content:function (){
        "step 0"
        player.chooseToDiscard(function(card){
            return get.type(card)=='basic'&&get.color(card)=='red';
        },function(card){
            if(_status.event.player.needsToDiscard()) return 7-get.value(card);
            return 5-get.value(card);
        }).set('prompt',get.prompt2('sksn_genzhi')).logSkill='sksn_genzhi';
        "step 1"
        if(result.bool){
            player.changeHujia();
        }
    },
                ai:{
                    fireAttack:true,
                    effect:{
                        target:function (card,player,target,current){
                if(target.hujia){
                    if(card.name=='sha'){
                        if(card.nature=='fire') return 1.8;
                        if(player.hasSkill('zhuque_skill')) return 1.75;
                    }
                    if(get.tag(card,'fireDamage')&&current<0) return 1.8;
                }
            },
                    },
                },
                group:["sksn_genzhi_damage","sksn_genzhi_draw","sksn_genzhi_count"],
                subSkill:{
                    damage:{
                        audio:"ext:时空枢纽:1",
                        trigger:{
                            player:"damageBegin3",
                        },
                        forced:true,
                        filter:function (event){
                return event.nature&&event.nature=='fire';
            },
                        content:function (){
                trigger.num+=player.hujia;
            },
                        sub:true,
                    },
                    draw:{
                        audio:"ext:时空枢纽:2",
                        trigger:{
                            player:"drawBegin",
                        },
                        forced:true,
                        filter:function (event,player){
                if(player.storage.sksn_genzhi_count>=player.hujia) return false;
                return true;
            },
                        content:function (){
                trigger.num++;
                player.storage.sksn_genzhi_count++;
            },
                        sub:true,
                    },
                    count:{
                        init:function (player){
                player.storage.sksn_genzhi_count=0;
            },
                        trigger:{
                            global:"phaseBefore",
                        },
                        forced:true,
                        silent:true,
                        priority:1,
                        content:function (){
                player.storage.sksn_genzhi_count=0;
            },
                    },
                },
            },
 "sksn_congbing":{
                audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                viewAs:{
                    name:"caomu",
                },
                filterCard:{
                    suit:"club",
                },
                position:"hes",
                filterTarget:function (card,player,target){
        if(get.distance(player,target)>1||target==player) return false;
        return lib.filter.filterTarget.apply(this,arguments);
    },
                check:function (card){
        return 4.6-get.value(card);
    },
                viewAsFilter:function (player){
        return player.countCards('he',lib.skill.sksn_congbing.filterCard)>0&&game.hasPlayer(function(current){
            return get.distance(player,current)<=1&&current!=player&&player.canUse('caomu',current);
        });
    },
                group:"sksn_congbing_cqby",
                subSkill:{
                    cqby:{
                        trigger:{
                            global:"judgeEnd",
                        },
                        direct:true,
                        filter:function (event,player){
                if(!event.card) return false;
                if(event.card.viewAs) return event.card.viewAs=='caomu';
                return event.card.name=='caomu';
            },
                        content:function (){
                if(trigger.result.card){
                    player.chooseUseTarget([trigger.result.card],{name:'chuqibuyi',isCard:true}).logSkill='sksn_congbing';
                }
            },
                        sub:true,
                    },
                },
            },
            "sksn_susheng":{
                audio:"ext:时空枢纽:1",
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_susheng.jpg>",
                intro:{
                    content:"limited",
                },
                skillAnimation:true,
                animationColor:"wood",
                init:function (player){
        player.storage.sksn_susheng=false;
    },
                trigger:{
                    player:"damageBegin4",
                },
                unique:true,
                filter:function (event,player){
        if(player.storage.sksn_susheng) return false;
        return event.num>=player.hp;
    },
                check:function (event,player){
        if(!player.hujia) return true;
        return !player.isTurnedOver();
    },
                content:function (){
        player.awakenSkill('sksn_susheng');
        trigger.untrigger();
        trigger.finish();
        if(!player.isTurnedOver()){
            player.turnOver();
            player.addSkill('sksn_susheng_overAfter');
        }
    },
                subSkill:{
                    overAfter:{
                        trigger:{
                            player:"turnOverAfter",
                        },
                        forced:true,
                        filter:function (event,player){
                return !player.isTurnedOver();
            },
                        content:function (){
                "step 0"
                player.removeSkill('sksn_susheng_overAfter');
                player.chooseTarget([1,3]).set('ai',function(target){
                    if(target==_status.event.player) return 5;
                    return get.attitude(_status.event.player,target);
                }).set('prompt2','令这些角色各回复一点体力或摸两张牌');
                "step 1"
                if(result.bool){
                    for(var target of result.targets.slice(0)){
                        target.chooseDrawRecover(2,1,true);
                    }
                }
            },
                        sub:true,
                    },
                },
            },
//————菲儿————//
 "sksn_mark_jinxue":{
                onremove:function (player){
        player.removeGaintag('sksn_mark_jinxue');
    },
            },
"sksn_sanhua":{
	audio:"ext:时空枢纽:2",
	mod:{
		ignoredHandcard:function(card,player){
			if(card.hasGaintag('sksn_mark_jinxue')){
				return true;
			}
		},
		cardDiscardable:function(card,player,name){
			if(name=='phaseDiscard'&&card.hasGaintag('sksn_mark_jinxue')){
				return false;
			}
		},
	},
	locked:false,
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		return Math.min(player.countCards('h'),3)-player.countCards('h',function(card){
			return card.hasGaintag('sksn_mark_jinxue');
		})>0;
	},
	filterCard:function (card){
		return !card.hasGaintag('sksn_mark_jinxue');
	},
	selectCard:function (){
		var player=_status.event.player;
		var num=3-player.countCards('h',function(card){
			return card.hasGaintag('sksn_mark_jinxue');
		});
		return [1,num];
	},
	position:"h",
	discard:false,
	lose:false,
	check:function (card){
		if(get.type(card)=='equip') return -1;
		if(get.tag(card,'damage')) return 5;
		return get.value(card);
	},
	content:function (){
		for(var i=0;i<cards.length;i++){
			cards[i].addGaintag('sksn_mark_jinxue');
		}
	},
	ai:{
		order:6,
		result:{
			player:1,
		},
	},
	group:"sksn_mark_jinxue",
	derivation:"sksn_sanhua_tip",
},
"sksn_ninghen":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"damageBefore",
                },
                direct:true,
                filter:function (event,player){
        if(!event.card||!event.source||event.player==player||(event.nature&&event.nature=='ice')) return false;
        if(_status.connectMode) return true;
        return player.countCards('h',function(card){
            return card.hasGaintag('sksn_mark_jinxue')&&get.type2(card)==get.type2(event.card);
        });
    },
                content:function (){
        "step 0"
        player.chooseCard('h',1,function(card){
            return card.hasGaintag('sksn_mark_jinxue')&&get.type2(card)==get.type2(trigger.card);
        },function(card){
            var player=_status.event.player;
            var target=trigger.player,source=trigger.source;
            if(get.attitude(player,target)>0) return false;
            if(get.damageEffect(target,source,player,trigger.nature)>get.damageEffect(target,source,player,'ice')) return 0;
            return 1/(get.value(card)+1);
        }).set('prompt',get.prompt('sksn_ninghen')).set('prompt2',
        '交给'+get.translation(trigger.player)+'一张'+get.translation(get.type2(trigger.card))+'将该伤害改为冰属性伤害？');
        "step 1"
        if(result.bool){
            player.logSkill('sksn_ninghen',trigger.player);
            event.card1=result.cards[0];
            trigger.player.gain(event.card1,player,'gain2','log');
            trigger.nature='ice';
        }else event.finish();
        "step 2"
        event.card1.addGaintag('sksn_mark_jinxue');
        trigger.player.addAdditionalSkill('sksn_ninghen','sksn_ninghen2');
    },
                derivation:"sksn_ninghen2",
            },
"sksn_ninghen2":{
                mod:{
                    cardDiscardable:function (card,player){
            if(card.hasGaintag('sksn_mark_jinxue')) return false;
        },
                    "cardEnabled2":function (card,player){
            if(get.itemtype(card)!='card') return;
            var list=player.getCards('h',function(card){
                return card.hasGaintag('sksn_mark_jinxue');
            });
            for(var i=0;i<list.length;i++){
                if(card.name==list[i].name) return false;
            }
        },
                },
                init:function (player,skill){
        var skills=player.getSkills(true,false);
        for(var i=0;i<skills.length;i++){
            if(lib.skill[skills[i]].charlotte||!lib.translate[skills[i]+'_info']){
                skills.splice(i--,1);
            }
        }
        player.disableSkill(skill,skills[0]);
    },
                onremove:function (player,skill){
        player.enableSkill(skill);
    },
                trigger:{
                    player:["phaseJieshuBegin","damageEnd"],
                },
                forced:true,
                filter:function (event,player,onrewrite){
        if(!player.countCards('h',function(card){
            return card.hasGaintag('sksn_mark_jinxue');
        })) return false;
        if(onrewrite=='damageEnd'){
            return event.nature&&event.nature=='fire';
        }else{
            return true;
        }
    },
                content:function (){
        "step 0"
        player.chooseCard('h',1,true,function(card){
            return card.hasGaintag('sksn_mark_jinxue');
        }).set('prompt','请选择一张「堇雪」牌置入弃牌堆');
        "step 1"
        if(result.bool){
            player.lose(result.cards,ui.discardPile);
            player.$throw(result.cards,1000);
            game.log(player,'将',result.cards,'置入了弃牌堆');
        }
    },
                group:["sksn_mark_jinxue","sksn_ninghen2_lose"],
                subSkill:{
                    lose:{
                        trigger:{
                            player:"loseAfter",
                        },
                        forced:true,
                        silent:true,
                        filter:function (event,player){
                return !player.countCards('h',function(card){
                    return card.hasGaintag('sksn_mark_jinxue');
                });
            },
                        content:function (){
                player.removeAdditionalSkill('sksn_ninghen');
            },
                    },
                },
            },
"sksn_dongzhi":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"damageAfter",
                },
                frequent:true,
                filter:function (event){
        return event.nature&&event.nature=='ice';
    },
                content:function (){
        player.draw();
    },
            },
//————罗意奥————//
"sksn_lipan":{
	audio:"ext:时空枢纽:2",
	zhuanhuanji:true,
	mark:true,
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_lipan.jpg>",
	intro:{
		content:function (storage){
			if(storage==true) return '当一张牌对你结算时，你可以将此牌置于牌堆底，然后摸一张牌。';
			return '出牌阶段限一次，你可以将一张红色手牌当任意基本牌对一名其他角色使用，此牌结算完后将之置于牌堆顶。';
		},
	},
	locked:false,
	ai:{
		threaten:2,
	},
	group:["sksn_lipan_yin","sksn_lipan_yang"],
	subSkill:{
		yin:{
			enable:"phaseUse",
			usable:1,
			filter:function (event,player){
                if(player.storage['sksn_lipan']==true) return false;
                return player.countCards('h',{color:'red'});
            },
			chooseButton:{
				dialog:function (player){
                    var list=[];
                    for(var i=0;i<lib.inpile.length;i++){
                        if(get.type(lib.inpile[i])!='basic') continue;
                        if(lib.inpile[i]=='du') continue;
                        if(lib.inpile[i]=='sha'){
                            list.push(['基本','','sha']);
                            list.push(['基本','','sha','fire']);
                            list.push(['基本','','sha','thunder']);
                            list.push(['基本','','sha','ice']);
                        }else{
                            list.push(['基本','',lib.inpile[i]]);
                        }
                    }
                    return ui.create.dialog('离叛',[list,'vcard']);
                },
				filter:function (button,player){
                    return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
                },
				backup:function (links,player){
                    return {
                        audio:"ext:时空枢纽:2",
                        filterCard:function(card){
                            return get.color(card)=='red';
                        },
						position:"hs",
                        filterTarget:lib.filter.notMe,
                        selectTarget:1,
                        popname:true,
                        viewAs:{name:links[0][2],nature:links[0][3]},
                        check:function(card){
                            return 1/Math.max(0.1,get.value(card));
                        },
                        precontent:function(){
                            player.storage['sksn_lipan']=true;
                            var next=game.createEvent('sksn_lipan_yinInsert');
                            event.next.remove(next);
                            var evt=event.getParent();
                            evt.after.push(next);
                            next.player=player;
                            next.card=event.result.cards[0];
                            next.setContent(function(){
								if(get.position(card,true)=='d'){
									card.fix();
									ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
									game.log(player,'将',card,'置于牌堆顶');
									game.updateRoundNumber();
								}
                            });
                        }
                    }
                },
				check:function (button){
                    var player=_status.event.player;
                    var players=game.filterPlayer(function(current){
                        return current!=player;
                    });
                    for(var target of players){
                        if(get.attitude(player,target)>0){
                            if(target.isDamaged()&&target.hp<=2){
                                if(button.link[2]=='tao') return 3;
                            }
                        }
                    }
                    if(button.link[2]=='sha'){
                        if(button.link[3]=='fire') return 2.97;
                        else if(button.link[3]=='ice') return 2.95;
                        else if(button.link[3]=='thunder') return 2.92;
                        else return 2.9;
                    }
                    return -1;
                },
				prompt:function (links,player){
                    return '将一张红色手牌当作【'+get.translation(links[0][2])+'】使用';
                },
			},
			ai:{
				order:7,
				result:{
					player:1,
				},
			},
			sub:true,
		},
		yang:{
			audio:"ext:时空枢纽:2",
			trigger:{
				target:"useCardToBegin",
			},
			filter:function (event,player){
                if(player.storage['sksn_lipan']!==true) return false;
                return event.cards.filterInD().length>0;
            },
			check:function (){return true},
			content:function (){
                "step 0"
                player.storage['sksn_lipan']=false;
                event.cards=trigger.cards.filterInD();
                if(event.cards.length>1){
                    player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆底（先选择的在下）',event.cards]).set('ai',function(button){
                        var value=get.value(button.link);
                        if(_status.event.reverse) return value;
                        return -value;
                    }).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
                }
                "step 1"
                if(result.bool&&result.links&&result.links.length) cards=result.links.slice(0);
                while(cards.length){
                    var card=cards.pop();
                    if(get.position(card,true)=='o'){
                        card.fix();
                        ui.cardPile.appendChild(card);
                        game.log(player,'将',card,'置于牌堆底');
                    }
                }
                game.updateRoundNumber();
                player.draw();
            },
			sub:true,
		},
	},
},
"sksn_chengzhi":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"dieAfter",
                },
                frequent:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
        "step 0"
        event.num=(trigger.source==player)?5:3;
        event.cards=get.bottomCards(event.num);
        if(event.cards){
            player.showCards(event.cards,'牌堆底的牌');
        }else{
            event.finish();
            return;
        }
        "step 1"
        player.chooseCardButton('承志：选择要使用的牌',event.cards,1).set('filterButton',function(button){
            return _status.event.player.hasUseTarget(button.link,false,true);
        }).set('ai',function(){return 1});
        "step 2"
        if(result.bool){
            event.cards.remove(result.links[0]);
            player.chooseUseTarget(result.links[0],'nodistance').set('addCount',false);
        }else{
            event.goto(4);
        }
        "step 3"
        if(event.cards.length>0){
            event.goto(1);
        }else{
            event.finish();
        }
        "step 4"
        if(event.cards.length>0){
            game.cardsDiscard(event.cards);
        }
    },
            },
//————唐宁—————//
"sksn_fengyuan":{
	audio:"ext:时空枢纽:2",
                subSkill:{
                    lose:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        forced:true,
                        filter:function(event,player){ 
        return player.storage.sksn_fengyuan[1]; 
    },
                        content:function(){
                var num=player.storage.sksn_fengyuan[1];
                player.storage.sksn_fengyuan[1]=0;
                player.loseHp(num); 
    },
                        sub:true,
                    },
                    a:{
                        trigger:{
                            global:"dying",
                        },
                        direct:true,
                        filter:function(event,player){ 
                return player.storage.sksn_fengyuan[0]&&event.player==player.storage.sksn_fengyuan[0];
    },
                        content:function(){
                            'step 0'         
               var list=['用牌','弃牌','失去体力'];
               if(player.countCards('h',function(card){
            return get.tag(card,'recover');
        })<1) list.remove('用牌');
               if(player.countCards('h',{color:'red'})<1) list.remove('弃牌');
            player.chooseControl(list,function(){
                if(list.contains('失去体力')&&get.attitude(player,trigger.player)<=0) return '失去体力';
                else if(list.contains('用牌')) return '用牌';
                else if(list.contains('弃牌')) return '弃牌';
                else return '失去体力'
            },true).set('prompt2',get.translation('sksn_fengyuan_info'));
            'step 1' 
            if(result.control=='用牌'){
                player.logSkill('sksn_fengyuan',trigger.player);
                event.cards=player.getCards('h',function(card){
            return get.tag(card,'recover');
        });
                for(var i=0;i<event.cards.length;i++){
                   player.useCard(event.cards[i],trigger.player);
                }
            }
            else if(result.control=='弃牌'){ 
                player.logSkill('sksn_fengyuan',trigger.player);
                player.discard(player.getCards('h',{color:'red'}));
                trigger.player.recover();
            }
            else if(result.control=='失去体力'){ 
                player.logSkill('sksn_fengyuan');
                player.storage.sksn_fengyuan[1]++;
                player.updateMarks(); 
            }
    },
                        sub:true,
                    },
                },
                trigger:{
                    global:"roundStart",
                },
                forced:true,
                filter:function (event,player){ 
        return game.roundNumber==2; 
    },
                init:function (player){ 
        player.storage.sksn_fengyuan=[false,0];
    },
                direct:true,
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_fengyaun.jpg>",
                intro:{
                    name:"逢源",
                    markcount:function(storage,player){
            if(storage[1]) return storage[1];
            return 0;
        },
                    mark:function(dialog,storage,player){ 
            if(!storage[0]) dialog.addText('未选择【主】'); 
            if(storage[0]&&!storage[1]) {
                var list=[];
                list.push(storage[0]);
                dialog.addSmall(list);
            }
            if(storage[0]&&storage[1]){
                var list=[];
                list.push(storage[0]);
                dialog.addSmall(list);
                dialog.addText('将于回合结束后失去'+storage[1]+'点体力');
            }
        },
                },
                content:function (){ 
        'step 0'
        player.chooseTarget('选择一名其他角色作为【主】',function(card,player,target){
            return player!=target;
        },true).set('ai',function(target){
            var player=_status.event.player;
            var bool=0;
            if(target.hasSkill('sksn_angdou')) bool=0.1;
            return get.attitude(player,target)+bool;
        });
        'step 1'
        if(result.bool){
            player.logSkill('sksn_fengyuan');
            player.line(result.targets);
            player.storage.sksn_fengyuan[0]=result.targets[0];
            player.addSkill("sksn_fengyuan_a");    
            player.addSkill("sksn_fengyuan_lose");    
        }  
        else event.finish();      
    },
            },
"sksn_woquan":{audio:"ext:时空枢纽:3",
                subSkill:{
                    a:{
                        trigger:{
                            global:"damageAfter",
                        },
                        filter:function(event,player){ 
                            if(!event.player.isAlive()) return false;;
                            if(!event.source||event.player==event.source) return false; 
                            if(player!=event.source&&(!player.storage.sksn_fengyuan[0]||event.source!=player.storage.sksn_fengyuan[0])) return false; 
                            return player.storage.sksn_woquan.length; 
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            var next=player.chooseCardButton(get.prompt('sksn_woquan'),player.storage.sksn_woquan);
                            next.ai=function(button){
                                if(trigger.card) ai.num=get.number(trigger.card);
                                else ai.num=0;
                                var att1=get.attitude(player,trigger.player);
                                var att2=get.attitude(player,trigger.source);
                                if(att1>0) return 0;
                                if(att1<0&&att2<0) return ai.num-get.number(button.link);
                                if(att1<0&&att2>0) return 100/(get.number(button.link)-ai.num+1)||ai.num-get.number(button.link);
                                return 0;
                            }
                            'step 1'
                            if(result.bool){
                                player.logSkill('sksn_woquan');
                                var card=result.links[0];
                                var num=card.number;
                                if(trigger.card) var trinum=get.number(trigger.card);
                                else var trinum=0;
                                game.cardsDiscard(card);
                                player.storage.sksn_woquan.remove(card);
                                if(num<trinum){
                                    player.$throw(card);
                                    game.log(card,'进入了弃牌堆');
                                    if(trigger.player.countGainableCards(player,'he')<1) player.draw();
                                    else player.gainPlayerCard(trigger.player,true);
                                }
                                else{
                                    if(trigger.player.countGainableCards(trigger.source,'he')<1) trigger.source.draw();
                                    else trigger.source.gainPlayerCard(trigger.player,true);
                                    player.useCard(card,trigger.player);
                                }
                            };
                        },
                        sub:true,
                    },
                },
                group:["sksn_woquan_a"],
                enable:"phaseUse",
                usable:1,
                filter:function(event,player){ 
                    return player.countCards('h',function(card){
                        return get.tag(card,'damage');
                    });
                },
                filterCard:function (card,player){
                    return get.tag(card,'damage');
                },
                init:function(player){ 
                    player.storage.sksn_woquan=[]; 
                },
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_woquan.jpg>",
                intro:{
                    content:"cards",
                    onunmark:function(storage,player){
                        if(storage&&storage.length){
                        player.$throw(storage,1000);
                        game.cardsDiscard(storage);
                        game.log(storage,'被置入了弃牌堆');
                        storage.length=0;
                        }
                    },
                },
                check:function(card){ 
                    var player=_status.event.player;
                    var num=get.number(card)/10;
                    return num+12-get.value(card)-player.storage.sksn_woquan.length; 
                },
                discard:false,
                prepare:function(cards,player){ 
                    player.$give(cards,player,false); 
                },
                content:function(){ 
                    player.lose(cards,ui.special,'toStorage');
                    player.storage.sksn_woquan=player.storage.sksn_woquan.concat(cards);
                    player.syncStorage('sksn_woquan');
                    player.markSkill('sksn_woquan');
                    game.log(player,'将',cards,'置于武将牌上作为“权”');
                },
                ai:{
                    order:8,
                    result:{
                        player:1,
                    },
                },
            },
//————摩根————//
"sksn_shangdao":{
	audio:"ext:时空枢纽:2",
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_shangdao.jpg>",
	intro:{
		content:"cards",
		onunmark:function (storage,player){
			if(storage&&storage.length){
				player.$throw(storage,1000);
				game.cardsDiscard(storage);
				game.log(storage,'被置入了弃牌堆');
				storage.length=0;
			}
		},
	},
	mod:{
		maxHandcard:function(player,num){
			if(!player.storage['sksn_shangdao']) return;
			return num+player.storage['sksn_shangdao'].length;
		}
	},
	init:function (player){
		player.storage['sksn_shangdao']=[];
	},
	trigger:{
		player:"gainAfter",
	},
	forced:true,
	filter:function (event,player){
		return player.countCards('h',function(card){
			return event.cards.contains(card);
		})>=2;
	},
	content:function (){
		"step 0"
		var halfnum=Math.ceil(trigger.cards.length/2);
		player.chooseCard('h',halfnum,true).set('ai',function(card){
			return -get.value(card);
		}).set('filterCard',function(card){
			return trigger.cards.contains(card);
		});
		"step 1"
		if(result.bool){
			event.num=result.cards.length;
			player.lose(result.cards,ui.discardPile,'visible');
			player.$throw(result.cards,1000);
			game.log(player,'将',result.cards,'置入了弃牌堆');
		}else event.finish();
		"step 2"
		var list=[
			'sha','shan','jiu',
			'sksn_card_huochong','sksn_card_fuhezhongnu','sksn_card_shengguangjiaopao','sksn_card_monengjia','sksn_card_liporenlun','sksn_card_jidianyulei',
			'sksnC_bombGrenade'
		];
		for(var i of lib.inpile){
			if(get.type(i,'trick')=='trick'&&!['naman','wuzhong','juedou','lebu'].contains(i)){
				list.push(i);
			}
		}
		for(var i in lib.card){
			var name=lib.card[i];
			if(get.type(name)=='sksnCtype_ziyuan'&&!get.tag({name:name},'sksnBomb')){
				list.push(name);
			}
		}
		var onCards=list.randomGets(event.num);
		for(var i=0;i<onCards.length;i++){
			if(onCards[i]=='sha'&&Math.random()>0.25){
				player.storage['sksn_shangdao'].push(game.createCard({
					name:'sha',
					nature:['fire','thunder','ice'].randomGet()
				}));
			}else{
				player.storage['sksn_shangdao'].push(game.createCard({
					name:onCards[i]
				}));
			}
		}
		player.syncStorage('sksn_shangdao');
		player.markSkill('sksn_shangdao');
	},
	derivation:["sksn_shangdao_tip"],
},
"sksn_shangtu":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:"phaseDiscardEnd",
	},
	direct:true,
	filter:function (event,player){
		return player.storage['sksn_shangdao'].length>0;
	},
	content:function(){
		"step 0"
		var next=player.chooseCardButton(player.storage['sksn_shangdao'],'选择一张「货」获得之');
		next.set('ai',function(button){
			return get.value(button.link);
		});
		"step 1"
		if(result.bool==false){
			event.finish();
			return;
		}
		var card=result.links[0];
		player.storage['sksn_shangdao'].remove(card);
		player.gain(card,'gain','fromStorage');
		game.log(player,'获得了「货」中的',card);
		"step 2"
		if(player.countCards('h')>player.maxHp){
			player.chooseCard('将一张手牌置于武将牌上作为「货」',true);
		}else event.finish();
		"step 3"
		if(result.bool){
			player.lose(result.cards,ui.special,'toStorage');
			player.storage['sksn_shangdao']=player.storage['sksn_shangdao'].concat(result.cards);
			player.syncStorage('sksn_shangdao');
			player.markSkill('sksn_shangdao');
		}
	},
	group:["sksn_shangtu_damage"],
	global:["sksn_shangtu_py"],
	subSkill:{
		damage:{
			audio:"ext:时空枢纽:1",
			trigger:{
				player:"damageEnd",
			},
            direct:true,
            usable:1,
            filter:function (event,player){
				if(player.storage['sksn_shangdao'].length==0) return false;
                return event.source&&get.distance(event.source,player)<=1;
            },
			content:function (){
				"step 0"
				var card=player.storage['sksn_shangdao'].randomGet();
				if(card){
					player.storage['sksn_shangdao'].remove(card);
					trigger.source.gain(card,player,'give','fromStorage');
					game.log(trigger.source,'获得了',player,'「货」中的',card);
					player.syncStorage('sksn_shangdao');
					if(player.storage['sksn_shangdao'].length==0){
						player.unmarkSkill('sksn_shangdao');
					}
				}
			},
			sub:true,
		},
		py:{
			audio:"ext:时空枢纽:1",
			trigger:{
				player:"phaseUseBegin"
			},
			direct:true,
			filter:function(event,player){
				if(!player.countCards('h')) return false;
				return game.hasPlayer(function(target){
					return target!=player&&get.distance(player,target)<=1&&
						target.storage['sksn_shangdao']&&target.storage['sksn_shangdao'].length>0&&
						!target.hasSkill('sksn_shangdao_off');
				});
			},
			content:function(){
				"step 0"
				player.chooseCardTarget({
					filterCard:true,
					position:'he',
					filterTarget:function(card,player,target){
						return target!=player&&get.distance(player,target)<=1&&
							target.storage['sksn_shangdao']&&target.storage['sksn_shangdao'].length>0;
					},
					ai1:function(card){
						return 7-get.value(card);
					},
					ai2:function(target){
						if(ui.selected.cards.length){
							if(get.value(ui.selected.cards[0])<0){
								return -get.attitude(_status.event.player,target);
							}
							return get.attitude(_status.event.player,target);
						}
					},
					prompt:get.prompt('sksn_shangdao'),
					prompt2:"与亨利·摩根交易"
				});
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					event.target.gain(result.cards,player,'give');
				}else event.finish();
				"step 2"
				var target=event.target;
				var next=player.chooseCardButton(target.storage['sksn_shangdao'],'选择一张「货」获得之',1,true);
				next.set('ai',function(button){
					return get.value(button.link);
				});
				"step 3"
				var target=event.target;
				var card=result.links[0];
				target.storage['sksn_shangdao'].remove(card);
				target.syncStorage('sksn_shangdao');
				if(target.storage['sksn_shangdao'].length==0){
					target.unmarkSkill('sksn_shangdao');
				}
				player.gain(card,'fromStorage');
				game.log(player,'获得了',target,'「货」中的',card);
			},
            ai:{
                expose:0.3,
            },
			sub:true,
		},
		off:{sub:true},
	},
},
"sksn_qiangdai":{
	audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){return player.countCards('he')},
	filterTarget:lib.filter.notMe,
	filterCard:true,
	discard:false,
	lose:false,
	check:function (card){
		return 7-get.value(card);
	},
	content:function (){
		"step 0"
		targets[0].gain(cards,player,'give');
		"step 1"
		targets[0].drawTo(Math.min(player.getHandcardLimit(),game.players.length));
		"step 2"
		targets[0].storage['sksn_qiangdai_mark']=player;
		targets[0].addTempSkill('sksn_qiangdai_mark',{player:'phaseUseEnd'});
        targets[0].markSkill('sksn_qiangdai_mark');
        targets[0].syncStorage('sksn_qiangdai_mark');
	},
    ai:{
        order:1,
        result:{
            target:function (player,target){
				if(target.countCards('h')<player.getHandcardLimit()-1) return 2;
				if(target.countCards('h')>target.hp&&
					target.countCards('h')>=player.getHandcardLimit()-1) return -1;
                return 0;
            },
        },
        threaten:3.3,
    },
	subSkill:{
		mark:{
			mark:true,
			marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qiangdai.jpg>",
			intro:{
				name:"借贷人",
				content:"player",
			},
			onremove:function (player){
				var source=player.storage['sksn_qiangdai_mark'];
				var num=player.countCards('h')-player.hp;
				if(num>0){
					source.gainPlayerCard(player,'h',num,true);
				}
				delete player.storage['sksn_qiangdai_mark'];
			},
		}
	},
},
//————高泽斯————//
"sksn_qianmian":{
	audio:"ext:时空枢纽:2",
	hiddenSkill:true,
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qianmian.jpg>",
	intro:{
		name:"千面",
		content:"character",
	},
	trigger:{
		player:"showCharacterAfter",
	},
	forced:true,
	filter:function (event,player){
		return event.toShow.contains('sksn_gaozesi');
	},
	content:function (){
		"step 0"
		var next=player.chooseTarget(true);
		next.set('filterTarget',lib.filter.notMe);
		next.set('ai',function(){
			return Math.random();
		});
		next.set('prompt2',lib.translate['sksn_qianmian_info']);
		"step 1"
		if(result.bool){
			var target=result.targets[0];
			player.line(target,'fire');
			game.log(target,'的脸被',player,'复制了');
			var name=target.name;
			if(target.name1) name=target.name1;
			player.storage['sksn_qianmian']=name;
			player.syncStorage('sksn_qianmian');
			player.markSkill('sksn_qianmian');
			
		}
	},
},
"sksn_yingmo":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"useCard2",
	},
	direct:true,
	filter:function (event,player){
		if(!player.storage['sksn_qianmian']) return false;
		if(!['basic','trick'].contains(get.type(event.card))) return false;
		if(get.info(event.card).multitarget==true) return false;
		if(!event.targets||!event.targets.length||event.targets.length>1) return false;
		var name=player.storage['sksn_qianmian'];
		if(game.hasPlayer(function(current){
			return current==event.targets[0]&&(current==player||(current.name==name||current.name1==name||current.name2==name));
		})) return true;
		return false;
	},
	content:function (){
		"step 0"
		var name=player.storage['sksn_qianmian'];
		event.list=game.filterPlayer(function(current){
			if(current==player||(current.name==name||current.name1==name||current.name2==name)){
				return !trigger.targets.contains(current);
			}
		});
		if(!event.list.length) event.finish();
		"step 1"
		var tip='是否令另一名角色成为'+get.translation(trigger.card)+'的额外目标？';
		var next=player.chooseTarget();
		next.set('filterTarget',function(card,player,target){
			return event.list.contains(target);
		});
		next.set('ai',function(target){
			return get.effect(target,trigger.card,trigger.player,_status.event.player);
		});
		next.set('prompt',tip);
		"step 2"
		if(result.bool){
			var target=result.targets[0];
			trigger.targets.push(target);
			game.log(target,'成为了',trigger.card,'的额外目标');
			player.logSkill('sksn_yingmo');
		}
	},
	group:"sksn_yingmo_gainSkill",
	subfrequent:['gainSkill'],
	subSkill:{
		gainSkill:{
			audio:"ext:时空枢纽:1",
			trigger:{global:"dieAfter"},
			frequent:true,
			filter:function (event,player){
				if(!player.storage['sksn_qianmian']) return false;
				var name=player.storage['sksn_qianmian'];
				return event.player.name==name||event.player.name1==name||event.player.name2==name;
			},
			content:function (){
				var name=player.storage['sksn_qianmian'];
				var skills=lib.character[name][3];
				for(var i of skills){
					if(!lib.skill[i].hiddenSkill&&lib.translate[i+'_info']){
						player.addSkill(i);
					}
				}
				game.log(player,'获得了“',get.translation(name),'”的所有技能');
			},
			sub:true,
		},
	},
},
"sksn_zhefu":{audio:"ext:时空枢纽:2",
	zhuSkill:true,
	trigger:{
		global:"dying",
	},
	unique:true,
	filter:function (event,player){
		if(!player.hasZhuSkill('sksn_zhefu')) return false;
		if(!player.storage['sksn_qianmian']) return false;
		if(event.player==player||event.player.group!='SK_demon'||event.player.hp>0) return false;
		var name=player.storage['sksn_qianmian'];
		if(event.player.name==name||event.player.name1==name||event.player.name2==name) return false;
		return true;
	},
	content:function (){
		"step 0"
		var name=trigger.player.name;
		if(trigger.player.name1) name=trigger.player.name1;
		player.storage['sksn_qianmian']=name;
		player.syncStorage('sksn_qianmian');
		player.markSkill('sksn_qianmian');
		"step 1"
		var num=1-trigger.player.hp;
		if(num) trigger.player.recover(num);
		trigger.player.addTempSkill('sksn_nizong',{player:'phaseBegin'});
	},
},
//——————斐洛——————//
"sksn_chaosheng":{
	audio:"ext:时空枢纽:3",
	buttonList:function (player,list,videoId){
		var choiceList=ui.create.dialog('朝圣：请为其移除一层BUFF','forcebutton');
		for(var i=0;i<list.length;i++){//
			var str='<div class="popup text" style="width:calc(100% - 10px);display:inline">';
			str+=get.translation(list[i])+'</div>';
			var next=choiceList.add(str);
			next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
			next.firstChild.link=i;
			for(var j in lib.element.button){
				next[j]=lib.element.button[i];
			}
			choiceList.buttons.add(next.firstChild);
		}
		return choiceList;
	},
	global:["sksn_chaosheng_use"],
	subSkill:{
		use:{
			audio:"ext:时空枢纽:1",
            enable:"phaseUse",
			direct:true,
            prepare:function(cards,player,targets){
                targets[0].logSkill('sksn_chaosheng',player);
            },
            filter:function(event,player){
                if(!player.countCards('he')) return false;
                return game.hasPlayer(function(target){
                    return target.hasSkill('sksn_chaosheng')&&!target.hasSkill('sksn_chaosheng_off');
                });
            },
            filterTarget:function(card,player,target){
                return target.hasSkill('sksn_chaosheng')&&!target.hasSkill('sksn_chaosheng_off');
            },
			filterCard:true,
			position:"he",
			check:function (card){
				var player=_status.event.player;
				if(card.name=='du'&&player.hp<2) return 0;
				return 7-get.value(card);
			},
            prompt:function(event,player){
                var list=game.filterPlayer(function(target){
                    return target.hasSkill('sksn_chaosheng')&&!target.hasSkill('sksn_chaosheng_off');
                });
                var str='弃置一张牌并令'+get.translation(list);
                if(list.length>1) str+='中的一人';
				str+='摸一张牌';
                return str;
            },
			content:function (){
				"step 0"
				targets[0].addTempSkill('sksn_chaosheng_off',{player:'phaseUseAfter'});
				targets[0].draw();
				event.list=get.SksnBUFFList(player);
				if(event.list.length==0) event.finish();
				"step 1"
				event.videoId=lib.status.videoId++;
				if(targets[0].isOnline2()){
					targets[0].send(lib.skill.sksn_chaosheng.buttonList,player,event.list,event.videoId);
				}
				event.dialog=lib.skill.sksn_chaosheng.buttonList(player,event.list,event.videoId);
				if(targets[0]!=game.me||_status.auto){
					event.dialog.style.display='none';
				}
				var next=targets[0].chooseButton();
				next.set('dialog',event.videoId);
				next.set('forced',true);
				next.set('ai',function(button){
					if(get.attitude(targets[0],player)>0) return get.SksnBUFFRank(player,event.list[button.link],false);
					return get.SksnBUFFRank(player,event.list[button.link],true);
				});
				"step 2"
				if(targets[0].isOnline2()){
					targets[0].send('closeDialog',event.videoId);
				}
				event.dialog.close();
				if(result){
					player.changeSksnBUFF(event.list[result.links[0]],-1);
				}
			},
            ai:{
                expose:0.3,
				order:function(skill,player){
					if(get.SksnBUFFList(player,function(player,buff){
						return get.SksnBUFFRank(player,buff,false)>0;
					}).length>0) return 10;
					if(player.countCards('h')>player.hp) return 1;
				},
                result:{
                    player:function(player,target){
						if(get.SksnBUFFList(player,function(player,buff){
							return get.SksnBUFFRank(player,buff,false)>0;
						}).length>0) return 1;
						return 0;
                    },
                }
            },
			sub:true,
		},
		off:{sub:true},
	},
},
"sksn_jiaohua":{
	audio:"ext:时空枢纽:2",
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_jiaohua.jpg>",
	intro:{
		name:"教化",
		content:"已因〖教化〗摸了#张牌",
	},
	init:function (player){
		player.storage['sksn_jiaohua_off']=[];
	},
	enable:"phaseUse",
	filter:function (event,player){
		return player.countCards('h',function(card){
			return !player.storage['sksn_jiaohua_off'].contains(get.type(card,'trick'));
		})>=2;
	},
	filterCard:function (card,player){
		return !player.storage['sksn_jiaohua_off'].contains(get.type(card,'trick'));
	},
	selectCard:2,
	position:"h",
	discard:false,
	lose:false,
	delay:0,
	filterTarget:lib.filter.notMe,
	check:function (card){
		if(ui.selected.cards.length){
			if(ui.selected.cards[0].name=='du') return 8-get.value(card)+(card.name=='du')?2:0;
			if(ui.selected.targets.length&&ui.selected.targets[0].countCards('h')){
				if(get.type(card,'trick')==get.type(ui.selected.cards[0],'trick')) return 20-get.value(card);
			}else if(get.type(card,'trick')!=get.type(ui.selected.cards[0],'trick')) return 20-get.value(card);
		}
		return 10-get.value(card);
	},
	content:function (){
		"step 0"
		targets[0].gain(cards,player,'giveAuto');
		if(!player.hasSkill('sksn_jiaohua_off')) player.addTempSkill('sksn_jiaohua_off',{player:'phaseUseAfter'});
		for(var i=0;i<cards.length;i++){
			if(!player.storage['sksn_jiaohua_off'].contains(get.type(cards[i],'trick'))){
				player.storage['sksn_jiaohua_off'].push(get.type(cards[i],'trick'));
			}
		}
		"step 1"
		var next=targets[0].chooseCard('h',2,true,'教化：请交给'+get.translation(player)+'两张手牌');
		next.set('ai',function(card){
			if(_status.event.att&&!_status.event.sameCount){
				c=0;
				if(ui.selected.cards.length){
					c=(get.type(card,'trick')!=get.type(ui.selected.cards[0],'trick'))?10:0;
				}
				return player.getUseValue(card)+c;
			}
			if(targets[0].hp<3&&card.name=='du') return 0;
			return 1;
		});
		next.set('att',get.attitude(targets[0],player)>0);
		next.set('sameCount',targets[0].countCards('h')-2==player.countCards('h')+2);
		"step 2"
		if(result.bool){
			var card1=result.cards;
			targets[0].showCards(card1);
			player.gain(card1,targets[0],'give');
			if(card1.length<2||get.type(card1[0],'trick')==get.type(card1[1],'trick')) event.finish();
		}else event.finish();
		"step 3"
		var ph=player.countCards('h'),th=targets[0].countCards('h');
		if(ph>=th){
			targets[0].drawTo(Math.min(th+3,ph));
			event.finish();
		}else{
			player.drawTo(Math.min(ph+3,th));
		}
		"step 4"
		player.addMark('sksn_jiaohua',result.length,false);
		
	},
	ai:{
		order:6.7,
		threaten:1.1,
		result:{
			target:function(player,target){
				if(target.hasSkillTag('nogain')) return 0;
				if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
					if(target.hasSkillTag('nodu')) return 0;
					return -10;
				}
				if(player.countCards('h')==target.countCards('h')) return 0;
				return 2;
			}
		},
	},
	subSkill:{
		off:{
			onremove:function (player){
				player.storage['sksn_jiaohua_off']=[];
			},
			sub:true,
		},
	},
},
"sksn_zijie":{
	audio:"ext:时空枢纽:2",
	skillAnimation:true,
	animationColor:'thunder',
	trigger:{player:"phaseZhunbeiBegin"},
	juexingji:true,
	unique:true,
	forced:true,
	filter:function (event,player){
		return player.isDamaged()&&player.countMark('sksn_jiaohua')>3;
	},
	content:function (){
		player.awakenSkill('sksn_zijie');
		player.loseMaxHp();
		player.removeSkill('sksn_jiaohua');
		game.log(player,'失去了','#g【'+get.translation('sksn_jiaohua')+'】');
		player.addSkillLog('sksn_tianzhao');
	},
	derivation:["sksn_tianzhao"],
},
"sksn_tianzhao":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:"phaseDrawBegin2",
	},
	direct:true,
	filter:function (event,player){
		return !event.numFixed&&event.num>0;
	},
	content:function (){
		"step 0"
		player.chooseTarget(get.prompt2('sksn_tianzhao')).set('ai',function(target){
			if(get.attitude(_status.event.player,target)<0) return 0;
			return target.countCards('h')>=4;
		}).set('filterTarget',function(card,player,target){
			return player!=target&&target.countCards('he');
		});
		"step 1"
		if(result.bool){
			event.target=result.targets[0];
			player.logSkill('sksn_tianzhao',event.target);
			trigger.num--;
			event.target.chooseCard('he','交给'+get.translation(player)+'一张牌',true);
		}else event.finish();
		"step 2"
		if(result.bool){
			player.gain(result.cards,event.target,'giveAuto');
			var list=[
				'_sksn_buff_zengshi',
				'_sksn_buff_huihun',
				'_sksn_buff_mingshi'
			];
			event.target.changeSksnBUFF(list.randomGet(),1);
			event.target.changeSksnBUFF(list.randomGet(),1);
		}
	},
},
//————格雷尔————//
"sksn_fengdui":{audio:"ext:时空枢纽:3",
                trigger:{
                    player:"phaseUseBefore",
                },
                direct:true,
                filter:function(event,player){
                    var hs=player.getCards('h');
                    return game.hasPlayer(function(current){
                        if(current!=player){
                            for(var i=0;i<hs.length;i++){
                                if(get.info(hs[i]).multitarget) continue;
                                if(lib.filter.targetEnabled2(hs[i],player,current)){
                                    return true;
                                }
                            }
                        }
                    });
                },
                content:function(){
                    'step 0'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            if(get.info(card).multitarget==true) return false;
                            return game.hasPlayer(function(current){
                                return lib.filter.targetEnabled2(card,player,current)&&current!=player;
                            })&&card.name!='du'&&get.type(card)!='delay';
                        },
                        selectCard:1,
                        filterTarget:function(card,player,target){
                            return player!=target;
                        },
                        selectTarget:function (){
                            return ui.selected.cards.length;
                        },
                        position:'h',
                        ai1:function(card){
                            if(get.tag(card,'recover')) return get.order(card)/10+5;
                            if(get.type(card)=='equip') return get.order(card)/10+3;
                            if(get.name(card)=='jiu') return 0;
                            if(!game.hasPlayer(function(current){
                                return player.canUse(card,current,false);
                            })) return get.order(card)/10+2;
                            return get.order(card)/10;
                        },
                        ai2:function(target){
                            if(target.hp==target.maxHp&&get.tag(ui.selected.cards[0],'recover')) return 0;
                            var eff=get.effect(target,ui.selected.cards[0],_status.event.player,_status.event.player);
                            var eff2=get.effect(_status.event.player,ui.selected.cards[0],target,_status.event.player);
                            if(eff2<0&&(!_status.event.player.hasSkill('sksn_nilun')||!_status.event.player.countCards('h',function(card){
                    				return get.value(card)<10&&get.number(card)>8;
                    			}))) return 0;
                            return eff;
                        },
                        prompt:get.prompt('sksn_fengdui'),
                        prompt2:"请选择你要使用的牌和目标",
                    });
                    'step 1'
                    if(result.bool){
                        event.target=result.targets[0];
                        event.card=result.cards[0];
                        player.logSkill('sksn_fengdui',event.target);
                        player.lose(event.card,ui.special);
                    }
                    else{
                        event.finish();
                    }
                    'step 2'
                    player.useCard(event.card,event.target);
                    'step 3'
                    if(event.target.isAlive()){
                        ai.card=event.card;
                        ai.target=event.target;
                        event.target.chooseTarget("选择一名其他角色视为对其使用"+get.translation(event.card)+"，否则"+get.translation(player)+"摸一张牌",function(card,player,target){
                            if(event.target==target) return false;
                            return true;
                        }).ai=function(target){
                               if(target.hp==target.maxHp&&get.tag(ai.card,'recover')) return 0;
                               else return get.effect(target,ai.card,ai.target,ai.target)
                        };
                    }
                    else{
                        player.draw();
                        event.finish();
                    }
                    'step 4'
                    if(result.bool){
                        target2=result.targets[0];      
                        var name=event.card.name;
                        var suit=get.suit(event.card);
                        var number=event.card.number;    
                        event.target.useCard(game.createCard(name,suit,number),target2);      
                    }
                    else{
                        player.draw();
                    }
                },
                ai:{
                    expose:0.2,
                },
            },
"sksn_nilun":{audio:"ext:时空枢纽:4",
                group:["sksn_nilun_1","sksn_nilun_2"],
                subSkill:{
                    "1":{audio:"ext:时空枢纽:2",
                        trigger:{
                            player:"compare",
                            target:"compare",
                        },
                        filter:function(event,player){
                            return player.storage.sksn_nilun>0;
                        },
                        content:function(){
                            var num=player.storage.sksn_nilun;
                            game.log(player,'拼点牌的点数额外增加了',num);
                            if(player==trigger.player){
                                trigger.num1+=player.storage.sksn_nilun;
                                if(trigger.num1>13) trigger.num=13;
                            }
                            else{
                                trigger.num2+=player.storage.sksn_nilun;
                                if(trigger.num2>13) trigger.num=13;
                            }
                        },
                        sub:true,
                        forced:true,
                    },
                    "2":{audio:"ext:时空枢纽:2",
                        sub:true,
                        trigger:{
                            global:"useCard",
                        },                      
                    	check:function (event,player){
                    		if(get.effect(event.targets[0],event.card,event.player,player)<0){
                    			if(event.targets.contains(event.player)){
                    				return player.countCards('h',function(card){
                    					return get.value(card)<10;
                    				});
                    			}
                    			return player.countCards('h',function(card){
                    				return get.value(card)<10&&get.number(card)>8;
                    			})
                    		}
                    		return false;
                    	},
                        filter:function(event,player){
                            return event.targets.length==1&&!event.targets.contains(event.player)&&player.canCompare(event.player)&&get.type(event.card)!='equip'&&get.type(event.card)!='delay'&&get.info(event.card).multitarget!=true;
                        },
                        logTarget:"player",
                        content:function(){
                            'step 0'
                            player.chooseToCompare(trigger.player);
                            'step 1'
                            if(result.bool){
                                player.chooseTarget('请选择一名角色成为'+get.translation(trigger.card)+'的新目标',function(card,player,target){
                                    if(trigger.player==target) return false;
                                    return true;
                                }).set('ai',function(target){
                                    return get.effect(target,trigger.card,trigger.player,player);
                                });
                            }
                            else{
                                if(trigger.targets.contains(player)) event.finish();
                                else event.goto(3);               
                            }
                            "step 2"
                            if(result.bool){
                                event.target=result.targets[0];
                                game.log(event.target,'成为了',trigger.player,'使用',trigger.card,'的新目标');
                                trigger.player.line(event.target);
                                trigger.targets=[event.target];
                                event.finish();
                            }
                            else{
                                game.log(trigger.player,'对',trigger.targets,'使用的',trigger.card,'失去了目标');
                                trigger.targets=[];
                                event.finish();
                            }
                            "step 3"
                             trigger.player.chooseBool('是否让'+get.translation(player)+'成为'+get.translation(trigger.card)+'的额外目标？').ai=function(){               
                                 return get.effect(player,trigger.card,trigger.player,trigger.player)>0;
                             }; 
                            "step 4"
                            if(result.bool){
                                trigger.targets.push(player);
                                trigger.player.line(player);
                                game.log(player,'被追加为',trigger.player,'使用',trigger.card,'的额外目标');
                                event.finish();
                            }
                        },
                        ai:{
                            threaten:1.3,
                            expose:0.2,
                        },
                    },
                },
                init:function(player){
                    player.storage.sksn_nilun=0;
                },
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_nilun.jpg>",
                mark:true,
                intro:{
                    content:"已有#个“论”标记",
                },
                trigger:{
                    player:"chooseToCompareAfter",
                    target:"chooseToCompareAfter",
                },
                filter:function(event,player){
                    if(event.result.winner&&event.result.winner==player) return player.storage.sksn_nilun>0;
                    else return true;
                },
                forced:true,
                content:function(){
                    //if(trigger.result.bool==tie) game.log(player,'不对劲');
                    if(trigger.result.winner&&trigger.result.winner==player&&player.storage.sksn_nilun>0){
                        var number=player.storage.sksn_nilun;
                        game.log(player,'失去了',number,'个“论”标记');
                        player.storage.sksn_nilun=0;
                        player.draw(number);
                        player.updateMarks();
                        event.finish();
                    } 
                    else{// if(trigger.result.bool==tie||(player==trigger.player&&trigger.result.bool==false)||(player!=trigger.player&&trigger.result.bool==true)){
                        game.log(player,'获得了1个“论”标记');
                        player.storage.sksn_nilun++;
                        player.updateMarks();
                    }
                },
            },
//————苏尔嘉德————//
"sksn_quanshi":{
	audio:"ext:时空枢纽:2",
    zhuanhuanji:true,
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_quanshi.jpg>",
    intro:{
        content:function (storage){
            if(storage==true) return '出牌阶段限一次，你可以将一张黑色【杀】当任意有「伤害」标签的锦囊牌使用。';
            return '出牌阶段限一次，你可以令一名其他角色弃置一张牌，其可视为使用一张【杀】。';
        },
    },
    locked:false,
	ai:{
		threaten:1.4,
	},
	group:["sksn_quanshi_yin","sksn_quanshi_yang"],
	subSkill:{
		yin:{
			audio:"ext:时空枢纽:1",
			enable:"phaseUse",
			usable:1,
			filter:function (event,player){
				if(player.hasSkill('sksn_quanshi_off')) return false;
				if(player.storage['sksn_quanshi']==true) return false;
				return game.hasPlayer(function(current){
					return current!=player&&current.countCards('he');
				});
			},
			filterTarget:function (event,player,target){
				return target!=player&&target.countCards('he');
			},
			prompt:"出牌阶段限一次，你可以令一名其他角色弃置一张牌，其可视为使用一张【杀】。",
			content:function (){
				player.storage['sksn_quanshi']=true;
				player.addTempSkill('sksn_quanshi_off',{player:'phaseUseAfter'});
				targets[0].chooseToDiscard('he',true);
				targets[0].chooseUseTarget({name:'sha'});
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						if(game.filterPlayer(function(current){
							return target.canUse({name:'sha'},current,true,true)&&get.effect(current,{name:'sha'},target,target)>0;
						}).length==0) return -1;
						if(game.hasPlayer(function(current){
							return target.canUse({name:'sha'},current,true,true)&&get.effect(current,{name:'sha'},target,player)>0;
						})) return 2;
						return 0;
					},
				},
			},
			sub:true,
		},
		yang:{
			enable:"phaseUse",
			usable:1,
			filter:function (event,player){
				if(player.hasSkill('sksn_quanshi_off')) return false;
				if(player.storage['sksn_quanshi']!==true) return false;
				return player.countCards('h',{name:'sha',color:'black'});
			},
			chooseButton:{
				dialog:function(player){
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						if(get.type(lib.inpile[i],'trick')=='trick'&&get.tag({name:lib.inpile[i]},'damage')){
							list.push(['锦囊','',lib.inpile[i]]);
						}
					}
					return ui.create.dialog('全势',[list,'vcard']);
				},
				filter:function(button,player){
					return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
				},
				backup:function(links,player){
					return {
						audio:"ext:时空枢纽:1",
						filterCard:function(card){
							return card.name=='sha'&&get.color(card)=='black';
						},
						position:"hs",
						popname:true,
						viewAs:{name:links[0][2]},
						onuse:function(result,player){
							player.storage['sksn_quanshi']=false;
							player.addTempSkill('sksn_quanshi_off',{player:'phaseUseAfter'});
						}
					}
				},
				check:function(button){
					var player=_status.event.player;
					var lose=1,players=game.filterPlayer(function(current){
						return current!=player;
					});
					for(var i=0;i<players.length;i++){
						if(get.damageEffect(players[i],player,player,'thunder')>0){
							return (button.link[2]=='shuiyanqijunx')?3:-1;
						}
						if(get.damageEffect(players[i],player,player)>0){
							if(players[i].hp==1&&!players[i].hasSha()){
								return (button.link[2]=='juedou')?2:-1;
							}
							if(players[i].countCards('h')){
								return (button.link[2]=='chuqibuyi')?2:-1;
							}
						}
						if(!players[i].isOut()){
							var totalHp=players[i].hp+players[i].hujia;
							if(get.attitude(player,players[i])>0){
								if(totalHp<2){
									lose-=0.5;
								}
								lose--;
							}else{
								if(totalHp<2){
									lose+=0.5;
								}
								lose++;
							}
						}
					}
					if(lose>0.5) return (button.link[2]==['nanman','wanjian'].randomGet())?1:-1;
				},
				prompt:function(links,player){
					return '将一张黑色【杀】当作'+get.translation(links[0][2])+'使用';
				},
			},
			ai:{
				order:function (){
					return get.order({name:'jiu'})+0.2;
				},
				result:{
					player:1,
				},
			},
			sub:true,
		},
		off:{sub:true},
	},
},
"sksn_jiquan":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"phaseJieshuBegin",
	},
	direct:true,
	filter:function (event,player){
		if(player.hasSkill('sksn_jiquan_off')) return false;
		return game.hasPlayer(function(current){
			return current!=player&&current.getHistory('damage').length>0&&
				current.countGainableCards(player,'he')>0;
		});
	},
	content:function (){
		"step 0"
		player.chooseTarget([1,Infinity]).set('filterTarget',function(card,player,target){
			return target!=player&&target.getHistory('damage').length>0&&
				target.countGainableCards(player,'he')>0;
		}).set('ai',function(target){
			if(get.attitude(_status.event.player,target)>0){
				return target.countCards('e',function(card){
					return 1-get.value(card);
				});
			}
			return -get.attitude(_status.event.player,target);
		}).set('prompt',get.prompt('sksn_jiquan'));
		"step 1"
		if(result.bool){
			player.addTempSkill('sksn_jiquan_off','roundStart');
			var targets=result.targets;
			player.logSkill('sksn_jiquan',result.targets);
			for(var i of targets){
				player.gainPlayerCard(i,'he',true);
			}
		}else event.finish();
		"step 2"
		if(player.countCards('h')>_status.currentPhase.countCards('h')){
			player.chooseBool('集权：是否令'+get.translation(_status.currentPhase)+'增加1层「<font color=slateblue>压制</font>」').set('ai',function(){
                return get.attitude(player,_status.currentPhase)<=0&&player!=_status.currentPhase;
            });
		}else event.finish();
		"step 3"
		if(result.bool){
			_status.currentPhase.changeSksnBUFF('_sksn_buff_yazhi',1);
		}
	},
	subSkill:{
		off:{
			mark:true,
			marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_jiquan.jpg>",
			intro:{
				name:"「<font color=#BEBEBE>权倾朝野</font>」",
				content:"你本轮已发动过〖集权〗",
			},
			sub:true,
		},
	},
},
"sksn_muzheng":{
	locked:true,
	zhuSkill:true,
	global:"sksn_muzheng_unuse",
	subSkill:{
		unuse:{
			mod:{
				cardEnabled2:function(card,player){
					if(_status.currentPhase==player||player.group=='SK_east') return;
					if(_status.currentPhase.hasZhuSkill('sksn_muzheng')){
						if(card.name=='shan'||card.name=='wuxie') return false;
					}
				},
			},
			locked:true,
			sub:true,
		}
	},
},
//————希露薇————//
"sksn_liyu":{audio:"ext:时空枢纽:2",
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(get.tag(card,'damage')&&player!=_status.currentPhase) return 0;
                        },
                        player:function(card,player,target){
                            if(get.tag(card,'damage')&&player==_status.currentPhase) return 0;
                        },
                    },
                },
                trigger:{
        player:"damageBefore",
        source:"damageBefore",
    },
    priority:2.718,
    forced:true,
    filter:function (event,player){
        return event.player==player&&player==_status.currentPhase||event.player!=player&&player!=_status.currentPhase;
    },
    content:function (){
        trigger.cancel();
    },
            },
"sksn_liansheng":{
	audio:"ext:时空枢纽:2",
    trigger:{
        player:"phaseUseBegin",
    },
	direct:true,
	content:function (){
		"step 0"
		var num=Math.max(1,player.hp-1);
		var next=player.chooseTarget([1,num]);
		next.set('ai',function(target){
			if(get.attitude(_status.event.player,target)<=0) return 0;
			if(target.isDamaged()){
				if(target.hp==1) return _status.event.player.hp>=3;
				if(target.countCards('h')<=target.hp) return 5-target.hp;
			}
			if(target.countCards('h')<target.hp) return 4-target.countCards('h');
			return 0;
		}).set('filterTarget',lib.filter.notMe);
		next.set('prompt',get.prompt2('sksn_liansheng'));
		"step 1"
		if(result.bool){
			event.targets=result.targets.slice(0);
			targets=event.targets;
			player.logSkill('sksn_liansheng',result.targets);
			for(var i=0;i<targets.length;i++){
				targets[i].recover();
			}
		}else event.finish();
		"step 2"
		targets=event.targets;
		var loseHpBool=false;
		for(var i=0;i<targets.length;i++){
			if(targets[i].countCards('h')<targets[i].hp){
				targets[i].draw();
			}else{
				loseHpBool=true;
			}
		}
		if(loseHpBool==true) player.loseHp();
	},
},
"sksn_tianze":{audio:"ext:时空枢纽:2",
                init:function (player){
        player.storage.sksn_tianze=0;
    },
                trigger:{
                    player:"phaseJieshuBegin",
                },
                threaten:1.3,
                priority:9989995652,
                check:function (event,player){
        var n=0;
        var num=0;
        var a=player.maxHp-player.hp;
        if(a>3) a=3;
        game.countPlayer(function(current){
            if(get.attitude(player,current)>0){
                if(current.countCards('h')+1>current.hp&&current.countCards('h')-1<=current.hp) n--;
                else{
                if(current.hp==1) n-=0.5;
                n--;   
                num++;
                } 
            }
            if(get.attitude(player,current)<=0){
                if(current.countCards('h')+1>current.hp&&current.countCards('h')-1<=current.hp) n++;
                else{
                if(current.hp==1) n+=0.5;
                n++;   
                num++;
                } 
            }
        });
        if(game.countPlayer()/2>=num) n+=a+1;
        if(player.hp==1&&!player.countCards('h',{name:'jiu'})&&!player.countCards('h',{name:'tao'})>0) n-=10;
        if(num==0) return player.countCards('h')<player.hp;
        return n>0;
    },          
                content:function (){
        'step 0'
        player.storage.sksn_tianze=0;
        event.players=game.filterPlayer().sortBySeat();
        'step 1'
        if(event.players.length){
            event.current=event.players.shift();
            player.line(event.current,'green');
            if(event.current.countCards('h')){
                event.current.chooseToDiscard('h','天泽：弃置1张手牌或取消摸1张牌').set('ai',function(card){
                    if(event.current.countCards('h')+1>event.current.hp&&event.current.countCards('h')-1<=event.current.hp) return 7-get.value(card);
                    return -1;
                });
                event.tempbool=false;
            }
            else{
                event.tempbool=true;
            }
        }
        else{
            game.countPlayer(function(current){
                        if(current.countCards('h')>current.hp) current.loseHp();
                    });
            if(game.countPlayer()>=2*player.storage.sksn_tianze) event.goto(3);
            else event.finish();
        }
        'step 2'
        if(event.tempbool||result.bool==false){
            player.storage.sksn_tianze++;
            event.current.draw();
        }
        event.goto(1);
        'step 3'
        var num=player.maxHp-player.hp;
        if(num>3) num=3;
        if(num<1) num=1;
        player.chooseTarget(get.prompt('sksn_tianze'),'令一名其他角色获得'+num+'张锦囊牌',function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            var player=_status.event.player;
            if(target.countCards('j',{name:'lebu'})) return 1;
            if(get.attitude(player,target)>0&&target.hasSkill('sksn_mijian')) return 3;
            if(get.attitude(player,target)>0&&!target.hasSkill('sksn_mijian')) return 2;
            return 0;
        });
        'step 4'
        if(result.bool){
            player.line(result.targets,'green');
            var num=player.maxHp-player.hp;
            if(num>3) num=3;
            if(num<1) num=1;
            var list=[];
            for(var i=0;i<num;i++){
                var cardx=get.cardPile2(function(card){
                    return get.type(card)=='trick'&&!list.contains(card)
                        });
                if(cardx) list.push(cardx);
                    }
                if(list.length) result.targets[0].gain(list,'draw');
                }
    },
            },
"sksn_enzhao":{
	audio:"ext:时空枢纽:2",
                unique:true,
                zhuSkill:true,
                trigger:{ 
                    global:'phaseJieshuBegin',
                },
                priority:-1.2,
                filter:function(event,player){
                    return player.hasZhuSkill('sksn_enzhao')&&event.player.group=='SK_east'&&!event.player.hasSkill('sksn_enzhao_use')&&event.player!=player;
                },
                direct:true,
                content:function(){
                    'step 0'
                    trigger.player.chooseBool('是否对'+get.translation(player)+'发动「<font color=blue>恩诏</font>」？').set('choice',get.attitude(trigger.player,player)>0&&(trigger.player.hp+2<=trigger.player.maxHp||trigger.player.hp==1));
                    'step 1'
                    if(result.bool){
                        player.logSkill('sksn_enzhao');
                        player.line(trigger.player,'green');
                        trigger.player.draw();
                        trigger.player.loseMaxHp();
                        trigger.player.addSkill('sksn_enzhao_use');
                        player.chooseDrawRecover(2,true);
                        player.getStat().card.sha=0;
                        player.phaseUse();
                    }
            }
        },
"sksn_enzhao_use":{},
//————乌瑞娅————//
"sksn_xianmou":{
	audio:"ext:时空枢纽:3",
	trigger:{
		player:["damageBegin","dying"],
	},
	priority:3.14159,
	forced:true,
	content:function (){
		'step 0'
		if(trigger.name=='dying'){
			player.die();
			event.finish();
		}
		trigger.cancel(true);
		player.randomDiscard(trigger.num,'he');
		'step 1'
		if(player.countCards('he')<=0) player.loseHp();
    },
},
"sksn_jieli":{
	mark:true,
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_jieli.jpg>",
	intro:{
		name:"<font color=purple>竭力</font>",
		content:function(storage){
			return '<li>下一次「<font color=purple>竭力</font>」指定的角色数为'+storage[1]+',弃置的牌数为'+storage[0];
		},
	},
	init:function (player){
		player.storage.sksn_jieli=[1,1];
	},
	audio:"ext:时空枢纽:3",
	trigger:{
		player:"dieBefore",
		source:"damageBegin",
	},
	priority:3.141592,
	direct:true,
	content:function (){
		'step 0'
		var num=player.storage.sksn_jieli[0];
		var tar=player.storage.sksn_jieli[1];
		player.chooseTarget(get.prompt('sksn_jieli'),'令至多'+tar+'名其他角色弃置'+num+'张牌',[1,tar],function(card,player,target){
            return target!=player&&target.countCards('he');
        }).set('ai',function(target){
            return get.attitude(player,target)<=0;
        });
        'step 1'
        if(result.bool){
        player.logSkill('sksn_jieli');
        player.line(result.targets);
        for(var i=0;i<result.targets.length;i++){          
                result.targets[i].randomDiscard(player.storage.sksn_jieli[0],'he');  
        }   
      }
        else event.finish();
        'step 2'
        player.storage.sksn_jieli[0]=1;
	    player.storage.sksn_jieli[1]=1;
    },
},
"sksn_yihua":{
	audio:"ext:时空枢纽:2",
	trigger:{
		player:["loseHpBegin","recoverBegin"],
	},
	priority:3.141592,
	frequent:true,
	content:function (){
		'step 0'
		if(trigger.name=='loseHp') player.storage.sksn_jieli[1]++;
		if(trigger.name=='recover') player.storage.sksn_jieli[0]++;
                'step 1'
                player.update();
    },
},
//————伊莲————//
            "sksn_xingyun_card":{
                trigger:{
                    global:"drawBegin",
                },
                direct:true,
                filter:function (event,player){
                    return ui.cardPile.childElementCount>1&&(event.player.hasSkill('sksn_xingyun')&&event.player==_status.currentPhase||!event.player.hasSkill('sksn_xingyun')&&!player.getFriends().contains(event.player));
                },
                content:function (){
                    if(!trigger.player.hasSkill('sksn_xingyun')){
                    var value=get.value(ui.cardPile.firstChild);
                    var num=Math.min(10,ui.cardPile.childElementCount);
                    var list=[],list2=[],list3=[];
                    for(var i=1;i<num;i++){
                        var val=get.value(ui.cardPile.childNodes[i]);
                        if(val<value){
                            list.push(ui.cardPile.childNodes[i]);
                            if(val<value-1&&val<=4){
                                list2.push(ui.cardPile.childNodes[i]);
                            }
                            if(val<value-1&&val<=2){
                                list3.push(ui.cardPile.childNodes[i]);
                            }
                        }
                    }
                    var card;
                    if(list3.length){
                        card=list3.randomGet();
                    }
                    else if(list2.length){
                        card=list2.randomGet();
                    }
                    else if(list.length){
                        card=list.randomGet();
                    }
                    if(card){
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                    }
                }
                if(trigger.player.hasSkill('sksn_xingyun')){
                    var value=get.value(ui.cardPile.firstChild);
                    var num=Math.min(10,ui.cardPile.childElementCount);
                    var list=[],list2=[],list3=[];
                    for(var i=1;i<num;i++){
                        var val=get.value(ui.cardPile.childNodes[i]);
                        if(val>value){
                            list.push(ui.cardPile.childNodes[i]);
                            if(val>value+1&&val>=7){
                                list2.push(ui.cardPile.childNodes[i]);
                            }
                            if(val>value+1&&val>=8){
                                list3.push(ui.cardPile.childNodes[i]);
                            }
                        }
                    }
                    var card;
                    if(list3.length){
                        card=list3.randomGet();
                    }
                    else if(list2.length){
                        card=list2.randomGet();
                    }
                    else if(list.length){
                        card=list.randomGet();
                    }
                    if(card){
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                    }
                }
                },
            },
            "sksn_xingyun":{
                group:"sksn_xingyun_card",
                trigger:{
                    global:"judgeBegin",
                },
                direct:true,
                filter:function (event,player){
                    return !event.directresult;
                },
                content:function (){
                    if(trigger.player.hasSkill('sksn_xingyun')){
                    var tempcard=false,temp=-Infinity;
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var card=ui.cardPile.childNodes[i];
                        var temp2=trigger.judge(card);
                        if(temp2>temp){
                            tempcard=card;
                            temp=temp2;
                        }
                    }
                    if(tempcard) trigger.directresult=tempcard;
                }
                if(!trigger.player.hasSkill('sksn_xingyun')&&!player.getFriends().contains(trigger.player)){
                    var tempcard=false,temp=Infinity;
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var card=ui.cardPile.childNodes[i];
                        var temp2=trigger.judge(card);
                        if(temp2<temp){
                            tempcard=card;
                            temp=temp2;
                        }
                    }
                    if(tempcard) trigger.directresult=tempcard;
                }
                },
                ai:{
                    luckyStar:true,
                },
            },
            "sksn_sifu":{
                audio:"ext:时空枢纽:2",
            	derivation:"sksn_fuyun",
                trigger:{
                    player:"phaseJieshuBegin",
                },
                direct:true,
                filter:function (event,player){
        return player.countCards('h');
    },
                content:function (){
        "step 0"
        player.chooseCardTarget({
            filterCard:true,
            filterTarget:true,
            position:'h',
            ai1:function(card){
                return 7-get.value(card);
            },
            ai2:function(target){
                if(target.hasSkill('sksn_fuyun')) return 0;
                return get.attitude(_status.event.player,target);
            },
            prompt:get.prompt('sksn_sifu'),
        });
        "step 1"
        if(result.bool){
            var card=result.cards[0],target=result.targets[0];
            player.logSkill('sksn_sifu',target);
            player.lose(card,ui.special,'toStorage');
            if(!target.hasSkill('sksn_fuyun')) target.addSkill('sksn_fuyun');
            target.storage['sksn_fuyun'].push(card);
            target.syncStorage('sksn_fuyun');
            target.markSkill('sksn_fuyun');
        }
    },
            },
            "sksn_fuyun":{
            	audio:"ext:时空枢纽:2",
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_fuyun.jpg>",
                intro:{
                    name:"福运",
                    content:"cards",
                },
                init:function (player){
        player.storage['sksn_fuyun']=[];
    },
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                forced:true,
                filter:function (event,player){
        return player.storage['sksn_fuyun'].length;
    },
                content:function (){
        "step 0"
        event.suit=[];
        var list=player.storage['sksn_fuyun'];
        for(var i=0;i<list.length;i++){
            if(!event.suit.contains(get.suit(list[i]))){
                event.suit.push(get.suit(list[i]));
            }
        }
        player.judge(function(card){
            if(!event.suit.contains(get.suit(card))) return get.value(card);
            return player.storage['sksn_fuyun'].length-2;
        });
        "step 1"
        if(event.suit.contains(result.suit)){
            player.gain(player.storage['sksn_fuyun'],'gain2','fromStorage','log');
            player.storage['sksn_fuyun'].length=0;
            player.unmarkSkill('sksn_fuyun');
            player.removeSkill('sksn_fuyun');
        }else{
            game.cardsGotoSpecial(result.card);
            player.$gain(result.card);
            game.log(player,'将',result.card,'加入了「福」中');
            player.storage['sksn_fuyun'].push(result.card);
            player.syncStorage('sksn_fuyun');
            player.markSkill('sksn_fuyun');
        }
    },
            },
"sksn_qiyuan":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"judgeAfter",
	},
	direct:true,
	filter:function (event,player){
        return get.color(event.result.card)=='red';
    },
	content:function (){
        "step 0"
        var tran=get.translation(trigger.player);
        player.chooseControl('cancel2').set('choiceList',[
            '令'+get.translation(trigger.player)+'弃一张牌',
            '令'+get.translation(trigger.player)+'摸一张牌',
        ]).set('ai',function(){
            return (get.attitude(player,trigger.player)>0)?1:0;
        });
        "step 1"
		if([0,1].contains(result.index)) player.logSkill('sksn_qiyuan',trigger.player);
        switch(result.index){
            case 0:trigger.player.chooseToDiscard('he',1,true);break;
            case 1:trigger.player.draw();break;
        };
    },
},
//诺亚
"sksn_sanlei":{
    audio:"ext:时空枢纽:2",
                trigger:{
                    player:"damageBefore",
                },
                direct:true,
                filter:function (event,player){
        return player.countCards('he',{color:'black'})>0&&event.nature=='thunder'&&event.num>1;
    },
                content:function (){
        "step 0"
        var num=trigger.num;
        num--;
        player.chooseCardTarget({
            filterCard:function(card){
        return get.color(card)=='black';
    },
            selectCard:[1,num],
            filterTarget:function(card,player,target){
                return player!=target;
            },
            selectTarget:function (){
                return ui.selected.cards.length;
            },
            position:'he',
            ai1:function(card){
                return 12-get.value(card);
            },
            ai2:function(target){
                return get.damageEffect(target,player,player);
            },
            prompt:get.prompt('sksn_sanlei'),
            prompt2:"请弃置至多"+num+"张牌并选择等量的目标各为你分担一点雷属性伤害",
        });
        "step 1"
        if(result.bool){
            player.logSkill('sksn_sanlei',result.targets);
            player.discard(result.cards);
            var i=result.cards.length;
            event.targets=result.targets;
            event.targets.sort(lib.sort.seat);
            trigger.num-=i;
        }
        else event.finish();
        "step 2"
        if(event.targets.length){
         event.targets.shift().damage('thunder',trigger.source||'nosource');
            event.redo();
        }
    },
            },
"sksn_lianneng":{
                audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                filterCard:function(card){
                    return get.type(card)=='equip'&&get.subtype(card)!='equip3'&&get.subtype(card)!='equip4';
                },
                position:"he",
                filter:function (card,player){
                    if(player.storage.sksn_lingbao) return false;
                        return player.countCards('he',function(card){
                            return get.type(card)=='equip'&&get.subtype(card)!='equip3'&&get.subtype(card)!='equip4'&&get.subtype(card)!='equip6';
                        })>0;
                },
                check:function(card){
                    var player=_status.currentPhase;
                    if(player.countCards('he',{subtype:get.subtype(card)})>1){
                        return 30-get.equipValue(card);
                    }
                    if(!player.getStat().skill.sksn_lianneng) return 5-get.value(card);
                    return 1-get.value(card);
                },
                discard:false,
                content:function(){
                    player.lose(cards)._triggered=null; 
                    cards[0].storage.vanish=true;
                    game.log(player,'销毁了',cards);
                    player.changeHujia();
                    player.storage.sksn_lianneng++;
                    var num=2-player.getStat().skill.sksn_lianneng;
                    if(num>0) player.draw(3);
                    if(!player.hasJudge('shandian')){
                        event.card1=game.createCard('shandian');
                        player.addJudge({name:"shandian"},event.card1);
                        player.update();
                    }
                },
                init:function(player){ 
                    player.storage.sksn_lianneng=0; 
                },
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_ye.jpg>",
                intro:{
                    content:"已有#个“夜”标记",
                },
                ai:{
                    order:13,
                    result:{
                        player:3,
                    },
                    effect:{
                        target:function(card){
                            if(get.type(card)=='equip') return [1,6];
                        },
                    },
                },
            },
"sksn_lingbao":{
                audio:"ext:时空枢纽:2",
                init:function(player){
                    player.storage.sksn_lingbao=false;
                },
                skillAnimation:"epic",
                animationColor:"thunder",
                unique:true,
                enable:"phaseUse",
                derivation:["sksn_yexing"],
                filter:function (event,player){
                    return !player.storage.sksn_lingbao&&player.storage.sksn_lianneng>game.players.length/2;
                },
                content:function (){      
                    "step 0"
                    player.awakenSkill('sksn_lingbao');
                    player.storage.sksn_lingbao=true;
                    event.current=player.next; 
                    "step 1"
                    if(!event.current.hasSkill('fengyin')) event.current.addSkill('fengyin'); 
                    if(event.current.canAddJudge('shandian')){
                        event.card1=game.createCard('shandian');
                        event.current.addJudge({name:"shandian"},event.card1);
                    }
                    event.current.addTempSkill('zishou2',{player:'phaseEnd'});
                    "step 2"
                    if(event.current.next!=player){
                        event.current=event.current.next;
                        event.goto(1);
                    }
                    "step 3"                
                    player.addSkill('sksn_yexing');
                },
                ai:{
                    result:{
                        player:function (player){
                            if(player.countCards('h')+player.hp<5) return 1;
                            if(player.storage.sksn_lianneng>7) return 1;
                            return 0;
                        },
                    },
                    order:8,
                    threaten:1.4,
                },
            },
"sksn_yexing":{
                group:["sksn_yexing_lose"],
                subSkill:{
        lose:{
            trigger:{
                player:"damageBegin",
            },
            filter:function (event,player){
                return player.storage.sksn_lianneng>0;
     },
                forced:true,
                content:function (){   
         trigger.cancel();
          player.storage.sksn_lianneng-=trigger.num;
          if(player.storage.sksn_lianneng<0) player.storage.sksn_lianneng=0;
          player.update();
    },
                ai:{
                    threaten:2,
                },
            sub:true,
        },
    },
    audio:"ext:时空枢纽:2",
                trigger:{
                    player:["dieBefore","sksn_yexing_loseAfter"],
                },
                filter:function (event,player){
                return !player.hp||!player.storage.sksn_lianneng;
     },
                forced:true,
                content:function (){   
                "step 0"
              player.unmarkSkill('sksn_lianneng');
              "step 1"
              event.current=player.next; 
            "step 2"
            if(event.current.hasSkill('fengyin')) event.current.removeSkill('fengyin'); 
            "step 3"
            if(event.current.next!=player){
                event.current=event.current.next;
                event.goto(2);
            }
            "step 4"
            player.maxHp=1;
            player.update();
        },
            },
//西蒙雅维利
"sksn_mijian":{
                audio:"ext:时空枢纽:2",
                enable:"phaseUse",
                multitarget:true,
                filter:function(event,player){
                    return player.countCards('h',{type:'trick'})||player.countCards('h',{name:'sha'})>0;
                },
                position:"h",
                check:function(card){
                if(get.tag(card,'damage')) return 3;
                return 5;
                },
                filterCard:function (card,player){
                    if(get.info(card).multitarget==true) return false;
                        return game.hasPlayer(function(current){
                            return player.canUse(card,current,false);
                        })&&get.type(card)=='trick'||(get.name(card)=='sha'&&!player.hasSkill('sksn_mijian_off'));
                },
                filterTarget:function(card,player,target){
                    if(ui.selected.targets.length==0&&player==target) return false;
                    return true;
                },
                targetprompt:function (target){
                    if(target==ui.selected.targets[0]) return "用牌者";
                    else return "被用牌者";
                },
                selectTarget:function(event,player){ 
                    var player=_status.event.player;
                    if(player.hasSkill('sksn_suozhan_A')&&player.storage.sksn_suozhan_A) var num=2+player.storage.sksn_suozhan_A;
                    else num=2;
                    if(num==2) return 2;
                    return [2,num]; 
                },
                content:function(){
                    'step 0'
                    event.use=targets[0];
                    event.card=cards[0];
                    list=targets;
                    list.remove(targets[0]);
                    event.targets=list;
                    if(event.card.name=='sha'){
            		    player.addTempSkill('sksn_mijian_off');
                    }
                    if(player.hasSkill('sksn_suozhan_A')&&player.storage.sksn_suozhan_A>0){
                        player.storage.sksn_suozhan_A=0;
                        player.removeSkill('sksn_suozhan_A');
                    }
                    event.use.useCard(event.card,event.targets);
                    'step 1'
                    if(game.countPlayer2(function(current){
                            return current.getHistory('damage').length>0;
                        })==0){
                        player.draw();
                    }
                    else{
                        event.finish();
                    }
                },
                ai:{
                    order:10,
                    result:{
                        target:function(player,target){
                            if(ui.selected.targets.length==0){
                                if(get.tag(ui.selected.cards[0],'damage')) return -1;
                                else return 1;
                            }
                            else{
                                return get.effect(target,ui.selected.cards[0],ui.selected.targets[0],target);
                            }
                        },
                    },
                },
                subSkill:{
                    off:{
                        sub:true,
                    },
                },
            },
"sksn_suozhan":{audio:"ext:时空枢纽:2",
                trigger:{
                    global:["damageAfter"],
                },
                filter:function (event,player){                                                                            
                    return event.player!=player&&_status.currentPhase==player&&player.countCards('he')>0&&!event.player.hasSkill('sksn_suozhan_mark')&&event.player.isAlive();
                },
                direct:true,
                content:function (){
                    'step 0' 
                    var att=get.attitude(player,trigger.player); 
                    player.chooseCard('he',get.prompt('sksn_suozhan'),'是否交给'+get.translation(trigger.player)+'一张牌？').ai=function(card){ 
                        if(get.effect(trigger.source,{name:'sha'},trigger.player,player)<0){ 
                            if(att>0&&get.type(card)=='trick') return 10-get.value(card)
                            else return 0;                
                        } 
                        else return 7-get.value(card);
                    } 
                    'step 1' 
                    if(result.bool){ 
                        player.logSkill('sksn_suozhan',trigger.player);
                        trigger.player.gain(result.cards,player); 
                        if(get.position(result.cards[0])=='h'){ 
                            player.$giveAuto(result.cards,trigger.player); 
                        } 
                        else{ 
                            player.$give(result.cards,trigger.player); 
                        } 
                        player.line(trigger.player,'green'); 
                    } 
                    else{ 
                        event.finish(); 
                    } 
                    'step 2' 
                    trigger.player.addTempSkill('sksn_suozhan_mark');
                    ai.source=trigger.source;
                    ai.player=trigger.player;
                    trigger.player.chooseCard(function(card){
                        return get.type(card)=='trick'
                    },'h','交出一张非延时锦囊牌并令本回合内的下一张非延时锦囊牌目标额外+1',lib.filter.cardDiscardable).set('ai',function(card){
                                if(get.effect(ai.source,{name:'sha'},ai.player,ai.player)>0) return 0;
                                else return 10-get.value(card);
                            }); 
                    'step 3' 
                    if(result.bool){
                        player.gain(result.cards,trigger.player); 
                        trigger.player.$giveAuto(result.cards,player); 
                        if(!player.hasSkill('sksn_suozhan_A')){
                        player.addTempSkill('sksn_suozhan_A');
                        player.markSkill('sksn_suozhan_A');
                        player.storage.sksn_suozhan_A=0;
                        }
                        player.storage.sksn_suozhan_A++;
                    }
                    else{
                        if(trigger.source!=undefined){
                            trigger.player.useCard({name:"sha"},trigger.source);
                            if(!trigger.player.hasSkill('sksn_suozhan_B')){
                                trigger.player.addSkill('sksn_suozhan_B');
                                trigger.player.storage.sksn_suozhan_B=[];
                            }
                            trigger.player.storage.sksn_suozhan_B.push(trigger.source);
                            trigger.player.syncStorage('sksn_suozhan_B');
                            trigger.player.markSkill('sksn_suozhan_B');
                        }
                    }
                },
                subSkill:{
                    A:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_suozhanA.jpg>",
                        intro:{
                            content:function(storage){
                            return '下一张非延时锦囊牌可以额外指定'+storage+'个目标';
                        },
                        },
                        trigger:{
                            player:"useCardAfter",
                        },
                        filter:function(event){
                            return get.type(event.card)=='trick';
                        },
                        silent:true,
                        content:function(){
                            player.storage.sksn_suozhan_A=0;
                            player.removeSkill("sksn_suozhan_A");
                        },
                        mod:{
                            selectTarget:function(card,player,range){
                                if(!player.storage.sksn_suozhan_A) return;
                                if(range[1]==-1) return;
                                if(get.type(card)=='trick'){
                                    var info=get.info(card);
                                    if(info.multitarget) return false;
                                    range[1]+=player.storage.sksn_suozhan_A;
                                }
                            },
                        },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                    B:{ marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_suozhanA.jpg>",
                        intro:{
                            name:"嗦战",
                            content:function(storage){
                                if(storage){
                                    return get.translation(storage);
                                }
                            },
                        },
                        init:function(player){
                            player.storage.sksn_suozhan_B=[];
                        },
                        trigger:{
                            global:"useCardToPlayer",
                        },
                        filter:function(event,player){
                       return player.storage.sksn_suozhan_B.contains(event.player)&&event.target!=player&&get.color(event.card)!='red'&&get.type(event.card)!='equip'&&get.type(event.card)!='delay'&&get.info(event.card).multitarget!=true;
                       },
                        content:function(){
                            trigger.player.line(player);
                            game.log(player,'成为了',trigger.card,'的额外目标。');
                            player.storage.sksn_suozhan_B.remove(trigger.player);
                            if(player.storage.sksn_suozhan_B.length== 0){
                                player.removeSkill('sksn_suozhan_B');
                            }else{
                                player.syncStorage('sksn_suozhan_B');
                                player.markSkill('sksn_suozhan_B');
                            }
                            trigger.getParent().targets.push(player);
                        },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                    mark:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_suozhan.jpg>",
                        direct:true,
                        charlotte:true,
                        intro:{
                            content:"本回合内无法再次选取为<font color=red><b>嗦战</b></font>的目标",
                        },
                        sub:true,
                    },
                },
            },
//giao戈里
"sksn_yixi":{   
                audio:"ext:时空枢纽:3",
                init:function(player){
                    player.sksnShunfajiInit("sksn_yixi");
                },
                clickable:function(player){
                if(!player.hasSkill('sksn_yixi_count')){
                    player.addTempSkill('sksn_yixi_count','phaseZhunbeiBefore');
                    player.turnOver();
                    if(player==_status.currentPhase) player.chooseUseTarget('视为使用一张【杀】',{name:'sha'},true);
                    game.countPlayer(function(current){
                        if(current==_status.currentPhase&&current!=player) player.useCard({name:'sha'},current,true).logSkill='sksn_yixi';
                    });
                    player.updateMark('sksn_yixi',true);
                    player.logSkill('sksn_yixi');
                    if(_status.imchoosing){
                        delete _status.event._cardChoice;
                        delete _status.event._targetChoice;
                        game.check();
                    }
                    }
                },
                clickableFilter:function(player){
                    return !player.isTurnedOver()&&!player.hasSkill('sksn_yixi_count');
                },
                group:'sksn_yixi_ai',
                },
                    "sksn_yixi_count":{},
                    "sksn_yixi_ai":{
                        trigger:{
                            global:"loseAfter",
                        },
                        filter:function(event,player){
                            return (_status.auto||!player.isUnderControl(true))&&!player.isTurnedOver();
                        },
                        priority:3.14159,
                        popup:false,
                        check:function(event,player){
                            return (event.player==_status.currentPhase||player==_status.currentPhase&&player.inRange(event.player))&&get.attitude(event.player,player)<0&&(event.player.countCards('h',{name:'shan'})==0||event.player.hp<=1);
                        },
                        content:function(){
                            lib.skill.sksn_yixi.clickable(player);
                        }
                    },
"sksn_kexian":{ 
                audio:"ext:时空枢纽:3",
                init:function(player){
                    player.storage.sksn_kexian=[];
                    player.storage.sksn_kexian_one=[];
                },
                trigger:{player:'sksn_kexian'},
                frequent:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_kexian.jpg>",
                intro:{
                    content:'已于回合外失去过至少两张同名牌的牌有：$'
                },
                content:function(){
                    player.markSkill('sksn_kexian');
                    if(player.isTurnedOver()) player.turnOver();
                    if(!player.isTurnedOver()) player.draw(2);
                },
                group:'sksn_kexian_one',
            },
                "sksn_kexian_one":{
                        trigger:{player:'loseAfter'},
                        silent:true,
                        filter:function(event,player){
                            return player!=_status.currentPhase&&event.cards&&event.cards.length==1;
                        },
                        content:function(){
                            player.logSkill('sksn_kexian');
                            if(player.storage.sksn_kexian_one.contains(trigger.cards[0].name)){
                                if(!player.storage.sksn_kexian.contains(trigger.cards[0].name)){
                                    player.storage.sksn_kexian.add(trigger.cards[0].name);
                                    event.trigger('sksn_kexian');
                                }
                            }
                            else{
                                player.storage.sksn_kexian_one.add(trigger.cards[0].name);
                            }
                        }
                    },              
"sksn_liangfeng":{
            audio:"ext:时空枢纽:2",
                trigger:{
                            source:"damageBegin",
                        },
                        filter:function(event,player){
                            return player!=_status.currentPhase&&player.countCards('h')!=player.hp;
                        },
                        priority:3.14159,
                        forced:true,
                        content:function(){
                            trigger.num++;
                        }
            },
//牛头人
"sksn_xueren":{
    hiddenSkill:true,
    audio:"ext:时空枢纽:2",
    trigger:{
        player:"showCharacterAfter",
    },
    forced:true,
    filter:function (event,player){
        return event.toShow.contains('sksn_occupatee');
    },
    content:function (){
        player.equip(game.createCard2('sksn_card_swordOfNTR','spade',2));
        if(_status.currentPhase==player){
            player.phaseUse();
        }
    },
},
"sksn_jianling":{
	audio:"ext:时空枢纽:2",
    enable:"phaseUse",
    usable:1,
    filter:function (event,player){
        return game.hasPlayer(function(current){
            return (current.sex=='male')?current.countCards('e'):current.countCards('he');
        });
    },
    filterTarget:function (event,player,target){
		if(!player.inRange(target)) return false;
        if(target.sex=='male') return target.countDiscardableCards(player,'e');
        if(target.sex=='female') return target.countGainableCards(player,'he');
        return false;
    },
    content:function (){
        "step 0"
        if(targets[0].sex=='female'){
            var next=player.gainPlayerCard(targets[0],'he',true);
        }else{
            var next=player.discardPlayerCard(targets[0],'e',true);
        }
        next.set('ai',function(button){
            if(get.subtype(button.link)=='equip2') return 10;
            return get.value(button.link);
        });
        "step 1"
        if(result.bool){
            player.useCard({name:'sha'},targets).set('addCount',false);
        }
        "step 2"
        if(!game.hasPlayer2(function(current){
            return current.getHistory('damage',function(evt){
                return evt.getParent(3)==event;
            }).length>0
        })) player.loseHp();
    },
    ai:{
        order:function (){
            return get.order({name:'sha'})+0.21;
        },
        result:{
            target:function (player,target){
				if(target.sex!='female') return -1;
                return -2;
            },
            player:function (player,target){
                if(player.hp==1&&target.countCards('h','shan')) return 0;
                return 1;
            },
        },
        threaten:1.3,
    },
},
"sksn_zhenyin":{
    audio:"ext:时空枢纽:2",
	trigger:{
		player:"loseHpEnd",
		source:"damageEnd",
	},
	forced:true,
	filter:function (event,player,onrewrite){
		if(onrewrite=="damageEnd"){
			if(!event.card||event.card.name!='sha') return false;
			return event.player.sex=='female'&&!event.player.countCards('e');
		}
		if(onrewrite=="loseHpEnd"){
			return _status.currentPhase==player&&event.num>0;
		}
		return false;
	},
	content:function (){
		var onrewrite=event.triggername;
		if(onrewrite=='loseHpEnd'){
			player.draw(trigger.num);
		}else{
			player.recover();
		}
	},
	ai:{
		NTRpower:true,
		threaten:0.2,
	},
},
"sksn_huangyin":{
    audio:"ext:时空枢纽:2",
    zhuSkill:true,
    trigger:{
		global:"useCard1",
    },
	direct:true,
	filter:function (event,player){
    	if(!player.hasZhuSkill('sksn_huangyin')) return false;
		if(event.player==player||event.player.group!='SK_demon') return false;
		if(event.card.name!='sha') return false;
		for(var i=0;i<event.targets.length;i++){
			if(event.targets[i].sex=='female') return true;
		}
		return false;
	},
	content:function (){
		"step 0"
		var next=trigger.player.chooseCard('he');
		next.set('ai',function(card){
			if(get.attitude(trigger.player,player)>0){
				return 7-get.value(card,player);
            }
            return -get.value(card);
        });
        next.set('prompt','是否交给'+get.translation(player)+'一张牌？');
        next.set('prompt2','其可弃置一张基本牌令你使用的【杀】伤害+1');
        "step 1"
        if(result.bool){
            player.logSkill('sksn_huangyin',trigger.player);
            player.gain(result.cards,trigger.player,'giveAuto');
            player.chooseToDiscard({type:'basic'}).set('ai',function(card){
                var att=0;
                for(var i=0;i<trigger.targets.length;i++){
                    att-=get.attitude(player,trigger.targets[i])*(trigger.targets[i].hp<=2)?1:0.5;
                }
                if(att>0) return 7-get.value(card);
            }).set('prompt','是否弃置一张基本牌令此【杀】伤害增加？');
        }else event.finish();
        "step 2"
        if(result.bool){
            if(typeof trigger.extraDamage!='number') trigger.extraDamage=1;
            else trigger.extraDamage++;
        }
    },
},

//加缪
"sksn_lingjiang":{
    hiddenSkill:true,
    audio:"ext:时空枢纽:1",
    trigger:{
        player:"showCharacterAfter",
    },
    hiddenSkill:true,
    filter:function (event,player){
        var target=_status.currentPhase;
        return target&&target!=player;
    },
    forced:true,
    content:function (){
        var target=_status.currentPhase;
        target.damage();
    },
},
"sksn_yaowu":{
    audio:"ext:时空枢纽:2",
    mod:{
        maxHandcardBase:function(player,num){
            return 3;
            },
        },  
    zhuanhuanji:true,
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_mizong.jpg>",
    intro:{
    content:function (storage){
        if(storage==true) return '阳：准备阶段，你增加1点体力上限并回复1点体力。';
        return '阴：结束阶段，你摸1张牌并减少1点体力上限。';
        },
    },
    trigger:{
        player:["phaseJieshuBegin","phaseZhunbeiBegin"],
    },
    priority:-12,
    filter:function (event,player){
        return event.name=='phaseJieshu'&&player.storage.sksn_yaowu!=true||event.name=='phaseZhunbei'&&player.storage.sksn_yaowu==true;
    },
    forced:true,
    content:function (){
        if(trigger.name=='phaseJieshu'){
            player.draw();
            player.loseMaxHp();
            if(player.maxHp==2) player.storage.sksn_yaowu=true;
        }
        if(trigger.name=='phaseZhunbei'){
            player.gainMaxHp();
            player.recover();
            if(player.maxHp>=4) player.storage.sksn_yaowu=false;
        }
    },
            },          
"sksn_shenshi":{
	            audio:"ext:时空枢纽:2",
	            	            mark:true,
	            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_shenshi.jpg>",
                group:["sksn_shenshi_2","sksn_shenshi_3"],
                init:function (player){
                    if(!player.storage.sksn_shenshi) player.storage.sksn_shenshi=[];
                },
                intro:{
                    content:"cards",
                    onunmark:function (storage,player){
                if(storage&&storage.length){
                    player.$throw(storage,1000);
                    game.cardsDiscard(storage);
                    game.log(storage,'被置入了弃牌堆');
                    storage.length=0;
                        }
                    },
                },
                trigger:{
                    source:"damageBegin",
                },
                priority:12,
                filter:function (event,player){
        return player.storage.sksn_shenshi.length>0&&player.hp>=3;
    },
                check:function (event,player){
        return get.attitude(player,event.player)<0;
    },
                content:function (){
        'step 0'
        player.chooseCardButton('移去一张‘神’',true,player.storage.sksn_shenshi);
        'step 1'
        var card=result.links[0];
        player.storage.sksn_shenshi.remove(card);
        game.cardsDiscard(card);
        player.$throw(card);
        game.log(player,'将',card,'置入弃牌堆');
        player.syncStorage('sksn_shenshi');
        player.loseHp();
        trigger.num++;
    },
            },
"sksn_shenshi_1":{},
"sksn_shenshi_2":{
                trigger:{
                    player:"damageBegin",
                },
                priority:12,
                filter:function (event,player){
        return player.storage.sksn_shenshi.length<player.maxHp&&player.hp<=3&&event.num>0;
    },
                direct:true,
                content:function (){
        "step 0"
        var n=player.maxHp-player.storage.sksn_shenshi.length;
        if(player.countCards('he')){
            player.chooseCard('he','神逝：即将受到'+trigger.num+'点伤害，是否将一张牌置于武将牌上并令伤害-1（可执行'+n+'次）').set('ai',function(card){
                        if(trigger.num>=player.hp) return 8-get.value(card);
                        return 0;
                    });   
        }
        "step 1"
        if(result.cards&&result.cards.length){
            if(!player.hasSkill('sksn_shenshi_1')) player.addSkill('sksn_shenshi_1');
            trigger.num--;
            player.lose(result.cards,ui.special,'toStorage');
            player.storage.sksn_shenshi=player.storage.sksn_shenshi.concat(result.cards);
            player.syncStorage('sksn_shenshi');
            player.markSkill('sksn_shenshi');
            game.log(player,'将',result.cards,'置于武将牌上');
            if(trigger.num>0&&player.storage.sksn_shenshi.length<player.maxHp&&player.countCards('he')) event.goto(0);
        }
        "step 2"
        if(player.hasSkill('sksn_shenshi_1')){
            player.logSkill('sksn_shenshi');
            player.removeSkill('sksn_shenshi_1');
        }
    },
            },
"sksn_shenshi_3":{
                trigger:{
                    player:"loseMaxHpEnd",
                },
                priority:-1,
                filter:function (event,player){
        return player.storage.sksn_shenshi.length>player.hp;
    },
                forced:true,
                content:function (){
        'step 0'
        player.chooseCardButton('神逝：移去一张‘神’',true,player.storage.sksn_shenshi);
        'step 1'
        var card=result.links[0];
        player.storage.sksn_shenshi.remove(card);
        game.cardsDiscard(card);
        player.$throw(card);
        game.log(player,'将',card,'置入弃牌堆');
        player.syncStorage('sksn_shenshi');
    },
            },
"sksn_mingwei":{audio:"ext:时空枢纽:1",
                unique:true,
                group:'sksn_mingwei_1',
                zhuSkill:true,
            },
"sksn_mingwei_1":{
                trigger:{
                    global:'damageSource',
                },
                filter:function(event,player){
        if(player==event.source||!event.source||event.source.group!='SK_demon'||player.storage.sksn_shenshi.length==0) return false;
        return player.hasZhuSkill('sksn_mingwei',event.source);
    },
                direct:true,
                content:function(){
        'step 0'
        var n=player.storage.sksn_shenshi.length;
        trigger.source.chooseCard(n,'he','冥威：是否交出'+n+'张牌并令'+get.translation(trigger.player)+'失去1点体力').set('ai',function(card){
            if(get.attitude(trigger.source,player)>0) return 8-get.value(card);
            return 0;
            });   
        'step 1'
        if(result.bool){
        player.gain(result.cards,trigger.source,'give');
        player.logSkill('sksn_mingwei');
        trigger.source.line(player,'green');
        trigger.source.chooseCardButton('神逝：移去一张‘神’',true,player.storage.sksn_shenshi);
        }
        'step 2'
        var card=result.links[0];
        player.storage.sksn_shenshi.remove(card);
        game.cardsDiscard(card);
        player.$throw(card);
        game.log(trigger.source,'将',card,'置入弃牌堆');
        player.syncStorage('sksn_shenshi');
        trigger.player.loseHp();
    },
            },

//————克莱门汀————//
"sksn_angdou":{
    audio:"ext:时空枢纽:2",
    trigger:{
        player:"phaseUseBegin",
    },
    direct:true,
    filter:function (event,player){
        return player.countCards('h');
    },
    content:function (){
        "step 0"
        player.chooseCardTarget({
            filterCard:true,
            selectCard:[1,3],
            filterTarget:function(card,player,target){
                return player!=target;
            },
            selectTarget:function (){
                return ui.selected.cards.length;
            },
            position:'he',
            ai1:function(card){
                return 7-get.value(card);
            },
            ai2:function(target){
                var att=get.attitude(_status.event.player,target)>0;
                var eff=get.effect(target,{name:'sha'},_status.event.player,_status.event.player);
                var outSha=!player.canUse({name:'sha'},target,true,true);
                if(!att) return outSha;
                return eff;
            },
            prompt:get.prompt('sksn_angdou'),
            prompt2:"<p>请弃置至多三张牌并选择等量的目标</p>",
        });
        "step 1"
        if(result.bool){
        	player.logSkill('sksn_angdou',result.targets);
			player.discard(result.cards);
            event.target1=result.targets,card1=result.cards;
            for(var i=0;i<card1.length;i++){
                var target2=event.target1.randomGet();
                player.useCard({name:'sha'},target2).set('addCount',false);
            }
        }else event.finish();
        "step 2"
        if(!game.hasPlayer2(function(current){
            return current.getHistory('damage',function(evt){
                return evt.getParent(3)==event;
            }).length>0
        })){
            player.draw(event.target1.length);
            player.storage['sksn_angdou_notarget']=event.target1;
            player.addTempSkill('sksn_angdou_notarget',{player:'phaseUseAfter'});
        }
    },
    subSkill:{
        notarget:{
            mod:{
                playerEnabled:function (card,player,target){
                    if(!player.storage['sksn_angdou_notarget']) return;
                    if(player.storage['sksn_angdou_notarget'].contains(target)) return false;
                },
            },
            sub:true,
        },
    },
},
"sksn_zhengfa":{
    audio:"ext:时空枢纽:2",
    trigger:{
        global:"useCardAfter",
    },
    frequent:true,
    filter:function (event,player){
        if(event.card.name!='sha') return false;
		if(get.itemtype(event.cards)!='cards') return false;
		if(event.player==player) return false;
        return event.targets&&event.targets.length;
    },
    content:function (){
        trigger.player.addMark('sksn_zhengfa_mark',1);
    },
    group:"sksn_zhengfa_use",
    subSkill:{
		use:{
            trigger:{
                global:"useCard",
            },
            filter:function (event,player){
				if(get.color(event.card)!='red') return false;
				if(get.type(event.card)!='trick'&&event.card.name!='sha') return false;
                return event.player.hasMark('sksn_zhengfa_mark')&&event.targets.contains(player);
            },
            check:function(event,player){
                return get.effect(event.player,{name:'juedou'},player,player)>0;
            },
            prompt2:function (event,player){
                var cardname=get.translation(event.card);
                var targetname=get.translation(event.player);
                return '是否令'+targetname+'移去一枚“斗”视为对其使用【决斗】？';
            },
            content:function (){
                trigger.player.removeMark('sksn_zhengfa_mark',1);
                player.useCard({name:'juedou'},trigger.player).set('addCount',false);
            },
            sub:true,
		},
        mark:{
            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_zhengfa.jpg>",
            intro:{
                name:"征伐",
                content:"海都小霸王在此，尔敢放肆！",
            },
            sub:true,
        },
    },
},
"sksn_jdxbw":{
    audio:"ext:时空枢纽:2",
    unique:true,
    global:'sksn_jdxbw_give',
    zhuSkill:true,
    subSkill:{
        give:{
            enable:'phaseUse',
            delay:false,
            line:true,
            log:false,
            visible:true,
            prepare:function(cards,player,targets){
                targets[0].logSkill('sksn_jdxbw');
            },
            filter:function(event,player){
                if(player.group!='SK_sea') return false;
                if(player.countCards('h','sha')+player.countCards('h','juedou')==0) return false;
                return game.hasPlayer(function(target){
                    return target!=player&&target.hasZhuSkill('sksn_jdxbw',player);
                });
            },
            filterCard:function(card){
                return card.name=='sha'||card.name=='juedou';
            },
            discard:false,
            lose:false,
            filterTarget:function(card,player,target){
                return target!=player&&target.hasZhuSkill('sksn_jdxbw',player)&&!target.hasSkill('sksn_jdxbw_off');
            },
			check:function (card){
				return 7-get.value(card);
			},
            prompt:function(){
                var player=_status.event.player;
                var list=game.filterPlayer(function(target){
                    return target!=player&&target.hasZhuSkill('sksn_jdxbw',player)&&!target.hasSkill('sksn_jdxbw_off');
                });
                var str='将一张【杀】或【决斗】交给'+get.translation(list);
                if(list.length>1) str+='中的一人';
                return str;
            },
            content:function(){
                "step 0"
                target.gain(cards,player,'giveAuto');
                target.addTempSkill('sksn_jdxbw_off','phaseUseEnd');
                target.chooseUseTarget(cards[0],true,false,'nodistance');
                "step 1"
                if(game.hasPlayer2(function(current){
                    return current.getHistory('damage',function(evt){
                        return evt.getParent(4)==event;
                    }).length>0;
                })==false) target.chooseToDiscard('he',true);
            },
            ai:{
                expose:0.3,
                order:9,
                result:{
                    player:function(player,target){
                        return get.attitude(player,target);
                    },
                }
            },
            sub:true,
        },
        off:{sub:true},
    },
},

//——————海灵姬——————//
"sksn_xinglang":{audio:"ext:时空枢纽:2",
                trigger:{
                    global:["useCardEnd","respondEnd"],
                },
                check:function (event,player){
                    return get.attitude(player,event.player)<0;
                },
                logTarget:"player",
                filter:function (event,player){                                                                            
        return event.player!=player&&_status.currentPhase==player&&event.player.countCards('he')>0;
    },
                content:function (){
        trigger.player.randomDiscard(1,'he');
        var word=['你也想去深海吗？','小心水花','看，那是一条鲨鱼','弃船而逃可不是好船长哦','这是大海的回赠'].randomGet();
            player.say(word);
    },
            },
"sksn_jianhao":{audio:"ext:时空枢纽:2",
    derivation:"SKSN_haiyaozhige",
                usable:1,
                enable:'phaseUse',
                viewAs:{
                    name:'SKSN_haiyaozhige'
                },
                filterCard:function(card,player){
                    if(ui.selected.cards.length){
                        return Math.abs(get.number(card)-get.number(ui.selected.cards[0]))<=player.maxHp-player.hp;
                    }
                    var cards=player.getCards('h');
                    for(var i=0;i<cards.length;i++){
                        if(card!=cards[i]){
                            if(Math.abs(get.number(card)-get.number(cards[i]))<=player.maxHp-player.hp) return true;
                        }
                    }
                    return false;
                },
                selectCard:2,
                complexCard:true,
                check:function(card){
                    var player=_status.event.player;
                    var targets=game.filterPlayer(function(current){
                        return player.canUse('SKSN_haiyaozhige',current);
                    });
                    var num=0;
                    for(var i=0;i<targets.length;i++){
                        var eff=get.sgn(get.effect(targets[i],{name:'SKSN_haiyaozhige'},player,player));
                        if(targets[i].hp==1){
                            eff*=1.5;
                        }
                        num+=eff;
                    }
                    if(!player.needsToDiscard(-1)){
                        if(targets.length>=7){
                            if(num<2) return 0;
                        }
                        else if(targets.length>=5){
                            if(num<1.5) return 0;
                        }
                    }
                    return 10-get.value(card);
                },
                ai:{
                    basic:{
                        order:8.5
                    }          
                }
            },
//——————翩跹——————//
"sksn_bugua":{
    audio:"ext:时空枢纽:2",
    zhuanhuanji:true,
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_bugua.jpg>",
    intro:{
        content:function (storage){
            if(storage==true) return '当其他角色对你造成伤害前，你可令伤害来源选择一项：①令你进行判定，若为红色，该伤害-1；②与你进行拼点且你须用牌堆顶的牌相应拼点，若其没赢，该伤害-1。';
            return '当你对其他角色造成伤害前，你可令受伤角色选择一项：①令你进行判定，若为红色，该伤害+1；②与你进行拼点且你须用牌堆顶的牌响应拼点，若其没赢，该伤害+1。';
        },
    },
    locked:false,
    trigger:{
        player:"damageBefore",
        source:"damageBefore",
    },
    filter:function (event,player){
        if(!event.source||event.player==event.source) return false;
        if(player.storage.sksn_bugua==true) return player!=event.source;
        return player==event.source;
    },
    check:function(event,player){
        var target=(event.player==player)?event.source:event.player;
        return get.attitude(player,target)<=0;
    },
    content:function (){
        "step 0"
        if(player.storage.sksn_bugua!=true){
            player.storage.sksn_bugua=true;
            event.targetx=trigger.player;
            event.playerx=trigger.source;
        }else{
            player.storage.sksn_bugua=false;
            event.targetx=trigger.source;
            event.playerx=trigger.player;
        }
        "step 1"
        if(event.targetx.canCompare(event.playerx)){
            var ap=(trigger.source==player)?'+1':'-1';
            event.targetx.chooseControl().set('choiceList',[
                '令'+get.translation(player)+'进行判定，若为红色，该伤害'+ap,
                '与'+get.translation(player)+'进行拼点，若你没赢，该伤害'+ap,
            ]).set('ai',function(){
				if(event.targetx.countCards('h',function(onCard){
					return (get.number(onCard)>9&&get.value(onCard)<6)||onCard.name=='du';
				})) return 0;
				if(get.attitude(event.targetx,player)>0) return 1;
				return [0,0,1,1,1].randomGet();
			});
        }else event._result.index=0;
        "step 2"
        event.cho=result.index;
        if(event.cho==0){
            game.log(event.targetx,'选择了','#g判定');
            event.targetx.popup('我判！','fire');
            player.judge(function(card){
                if(get.color(card)=='red') return 1.5;
                return -1.5;
            }).sksn_bugua=true; 
        }
        if(event.cho==1){
            game.log(event.targetx,'选择了','#y拼点');
            event.targetx.popup('我拼！','gold');
            event.targetx.chooseToCompare(player).sksn_bugua=true;
        }
        "step 3"
        if(result.bool==(event.cho==0)?true:false){
            trigger.source==player?trigger.num++:trigger.num--;
        }
    },
    group:"sksn_bugua_tianbian",
    subSkill:{
        tianbian:{
            trigger:{
                target:"chooseToCompareBegin",
            },
            forced:true,
            filter:function (event){
                return event.sksn_bugua==true;
            },
            content:function (){
                if(!trigger.fixedResult) trigger.fixedResult={};
                trigger.fixedResult[trigger.target.playerid]=get.cards()[0];
            },
            sub:true,
        },
    },
},
"sksn_mingyu":{
	audio:"ext:时空枢纽:2",
    trigger:{
        player:"judgeBefore",
        target:"chooseToCompareBefore",
    },
    usable:1,
    frequent:true,
    filter:function (event,player,name){
        return event.sksn_bugua==true;
        //return event.getParent().sksn_bugua==true;
    },
    content:function (){
        "step 0"
        event.card1=get.cards(Math.min(5,game.players.length));
        "step 1"
        player.chooseCardButton('明预：选择要使用的牌',event.card1,1).set('filterButton',function(button){
            return get.tag(button.link,'damage')&&game.hasPlayer(function(current){
                return _status.event.player.canUse(button.link,current,true,true);
            });
        }).set('ai',function(button){
            return game.hasPlayer(function(current){
                return get.effect(current,button.link,_status.event.player,_status.event.player);
            });
        });
        "step 2"
        if(result.bool){
            event.card2=result.links[0];
            player.chooseUseTarget(event.card2).set('addCount',false);
        }
        "step 3"
        if(result.bool){
            event.card1.remove(event.card2);
        }
        var onrewrite=event.triggername;
		var tip='拼点';
		if(onrewrite=="judgeBefore") tip='判定';
        var next=player.chooseCardButton(event.card1,event.card1.length,'明预（'+tip+'）：请选择放置顺序（先选择的在上）',true);
        next.set('ai',function(button){
            if(ui.selected.buttons.length>0){
                return 1;
            }else{
                if(_status.event.goon=="judgeBefore"){
                    return (get.color(button.link)=='red')?10:1;
                }else{
                    return button.link.number;
                }
            }
            return get.value(button.link);
        }).set('goon',onrewrite);
        "step 4"
        var cards=result.links.slice(0);
        if(cards){
            while(cards.length){
                var onCard=cards.pop();
                onCard.fix();
                ui.cardPile.insertBefore(onCard,ui.cardPile.firstChild);
            };
        }
    },
},
//——————哈里森——————//
"sksn_luezhen":{audio:"ext:时空枢纽:2",
                trigger:{
                    player:"phaseUseBegin",
                },
                filter:function (event,player){
                    return player.countCards('he');        
                },
                direct:true,
                content:function (){  
        'step 0'
        player.chooseCardTarget({
            filterCard:true,
            selectCard:1,
            filterTarget:function(card,player,target){
                return player!=target;
            },
            filterCard:function(card,player){
                return lib.filter.cardDiscardable(card,player);
            },
            selectTarget:1,
            position:'he',
            ai1:function(card){
                return 20-get.value(card);
            },
            ai2:function(target){
                return -get.attitude(player,target);
            },
            prompt:get.prompt('sksn_luezhen'),
            prompt2:"请选择一张牌和一个目标",
        });
        'step 1'
        if(result.bool){
            event.target=result.targets[0];
            player.discard(result.cards);
            player.logSkill('sksn_luezhen',event.target);
        }
        else event.finish();
        'step 2'
        if(event.target.countDiscardableCards(event.target,'he',{color:'red'})<1) player.draw(2);              
        else event.target.chooseToDiscard('he',{color:'red'},true);                                                 
   },
            },
"sksn_zhengjun":{
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_zhengjun.jpg>",
    intro:{
    content:function (player){
        var num=0;
        game.getGlobalHistory('cardMove',function(evt){
            if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.position==ui.discardPile)) num+=evt.cards.length;
        });
        return '<li>本回合内进入弃牌堆'+num+'张牌';
                },
            },
    mark:true,
                audio:"ext:时空枢纽:2",
                derivation:"sksn_yuzhen",
                trigger:{
                    player:"phaseJieshuBegin",
                },
                forced:true,
                filter:function (event,player){
        var num=0;
        game.getGlobalHistory('cardMove',function(evt){
            if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.position==ui.discardPile)) num+=evt.cards.length;
        });
        return num>player.hp;
    },
                content:function (){      
          'step 0'
        player.draw();
        player.getStat().card.sha=0;
        player.phaseUse();
        player.addTempSkill('sksn_yuzhen',{player:"phaseUseAfter"});
        player.logSkill('sksn_zhengjun');      
        'step 1'
        var stat=player.getStat();
        stat.card={};
        for(var i in stat.skill){
            var bool=false;
            var info=lib.skill[i];
            if(info.enable!=undefined){
                if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
                else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
            }
            if(bool) stat.skill[i]=0;
        }  
    },
            },
"sksn_yuzhen":{
             audio:"ext:时空枢纽:2",
             trigger:{
                 player:"phaseUseEnd",
             },           
                 direct:true,
                 content:function (){       
                    'step 0'   
                    player.chooseTarget(get.prompt('sksn_yuzhen'),'令一名角色与你一起弃置所有黑色️手牌',1,function(card,player,target){
                        return player!=target;
                    }).set('ai',function(target){
                        var num=player.countCards('h',{color:'black'});
                        var num2=target.countCards('h')/2;
                        var num3=0;
                        num3=num2-num;
                        if(get.attitude(player,target)>0) return 0;
                        else if(num3>0) return -get.attitude(player,target)+num3;
                        else return 0;
                    });            
                    'step 1'
                    if(result.bool){
                        event.target=result.targets[0];
                        player.logSkill('sksn_yuzhen',event.target);
                        var word=['看你还有什么手段'].randomGet();
                        player.say(word);
                   }
                   else event.finish();
                   'step 2'
                   player.discard(player.getCards('h',{color:'black'}));
                   event.target.discard(event.target.getCards('h',{color:'black'}));
                 },
},
//——————雅各布——————//
"sksn_qiming":{
    audio:"ext:时空枢纽:2",
    enable:"phaseUse",
    usable:1,
    filterCard:true,
    position:"he",
    filterTarget:function (card,player,target){
        return player!=target&&target.countCards('h');
    },
    check:function (card){
        return 9-get.value(card);
    },
    line:"golden",
    content:function (){
        "step 0"
        var word=['亿万年前死去的星星，他们的光明才刚刚到达我的眼睛','我愿为黑夜的眼睛，守望将至的黎明','此刻需铭记于灿烂星光之中'].randomGet();
            player.say(word);
        var next=player.choosePlayerCard(target,'h','visible',true);
        next.filterButton=function(button){
            return !['delay','equip'].contains(get.type(button.link));
        };
        next.ai=function(button){
            if(button.link.name=='sha'){
                if(_status.event.cansha) return 5;
                return 2;
            }
            if(get.tag(button.link,'damage')) return 4;
            if(get.tag(button.link,'gain')||get.tag(button.link,'discard')) return 3;
            return 1;
        };
        next.set('prompt','启明：请选择其一张牌展示之');
        next.set('cansha',player.canUse('sha',target,true,true));
        "step 1"
        if(result.bool){
            target.showCards(result.links);
            player.storage['sksn_qiming_useAgain']=[target,result.links[0].name];
            player.addTempSkill('sksn_qiming_useAgain',{player:'phaseBefore'});
        }
    },
    ai:{
        order:function (card,player){
            if(player.hasSkillTag('presha',true,null,true)){
                return 10.1;
            }
            return 4;
        },
        result:{
            target:function (player,target){
                var hc=target.countCards('h');
                if(player.inRange(target)) return -1.1*hc;
                return -1*hc;
            }
        },
    },
    subSkill:{
        useAgain:{
            mark:true,
            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_qiming.jpg>",
            intro:{
                name:"启明",
                markcount:function (){return 0},
                content:function(storage){
                    var target=get.translation(storage[0]);
                    var card='【'+get.translation(storage[1])+'】';
                    return '其他角色使用'+card+'结算完后，你可以视为对'+target+'使用同名牌';
                },
            },
            trigger:{
                global:"useCardAfter",
            },
            direct:true,
            filter:function (event,player){
                var card=player.storage['sksn_qiming_useAgain'][1];
                if(event.card.name!==card) return false;
                if(get.itemtype(event.cards)!='cards') return false;
                var target=player.storage['sksn_qiming_useAgain'][0];
                return target.isAlive()&&player.canUse(card,target,true,true);
            },
            content:function (){
                "step 0"
                var target=player.storage['sksn_qiming_useAgain'][0];
                var card=player.storage['sksn_qiming_useAgain'][1];
                var next=player.chooseUseTarget(card,target);
                next.set('addCount',false);
                next.set('prompt','启明：是否对'+get.translation(target)+'视为使用【'+get.translation(card)+'】？');
                next.set('logSkill','sksn_qiming');
            },
            sub:true
        }
    },
},
"sksn_xingyi":{
    audio:"ext:时空枢纽:2",
    enable:"phaseUse",
	filter:function (event,player){
		if((player.getStat().skill.sksn_xingyi||0)>=player.hp) return false;
		return player.countCards('h')>=2;
	},
    filterCard:function (card){
		var hs=_status.event.player.getCards('h');
		var map={'heart':0,'diamond':0,'spade':0,'club':0};
		for(var i=0;i<hs.length;i++){
			map[get.suit(hs[i])]++;
		}
		return map[get.suit(card)]>1;
	},
	discard:false,
	lose:false,
	delay:false,
    filterTarget:lib.filter.notMe,
    check:function(card){
		var hc=_status.event.player.countCards('h');
		if(hc>4) return 2-ai.get.value(card);
		if(hc==4) return 5-ai.get.value(card);
        return 8-ai.get.value(card);
    },
    content:function(){
		"step 0"
		targets[0].gain(cards,player,'giveAuto');
		"step 1"
		player.drawTo(4);
		var word=['众星熠熠，不若一日之明','星光能照亮夜空，却照不到人心','群星之外，吾心之中'].randomGet();
			player.say(word);
	},
    ai:{
        order:4,
        threaten:1.8,
        result:{
            target:function(player,target){
				if(ui.selected.cards.length){
					if(get.value(ui.selected.cards[0])>0){
						return 3;
					}
					return -2;
				}
            },
        },
    },
},
"sksn_yiqi":{
    audio:"ext:时空枢纽:2",
    unique:true,
    zhuSkill:true,
    trigger:{global:"damageEnd"},
    filter:function(event,player){
        if(event.player==player||event.player.group!='SK_east') return false;
		if(event.player.isDead()) return false;
        return player.hasZhuSkill('sksn_yiqi',event.player);
    },
    direct:true,
    content:function(){
        "step 0"
        event.drawnum=Math.min(trigger.player.getDamagedHp(),2);
        var tip='义起：是否令'+get.translation(player);
        if(event.drawnum>0){
            tip+='摸'+get.cnNumber(event.drawnum)+'张牌并';
        };
        tip+='对伤害来源使用一张【杀】或带有「伤害」标签的锦囊牌？';
		trigger.player.chooseBool(tip).set('ai',function(){
			return get.attitude(trigger.player,player)>0&&event.drawnum>0;
		});
        "step 1"
        if(result.bool){
			player.logSkill("sksn_yiqi");
            if(event.drawnum>0) player.draw(event.drawnum);
            player.chooseToUse('请对'+get.translation(trigger.source)+'使用【杀】或伤害类锦囊牌',function(card,player,event){
                if(get.name(card)!='sha'&&(!get.tag(card,'damage')||get.type(card)!='trick')) return false;
                return lib.filter.filterCard.apply(this,arguments);
            },trigger.source,-1).set('addCount',false);
        }else event.finish();
        "step 2"
        if(result.bool==false){
            player.chooseToDiscard(true);
            var word=['时机未到，暂避锋芒','我们还需等待时机'].randomGet();
            player.say(word);
        }
    },
},
//——————鬼厌——————//
"sksn_yanyu":{
	audio:"ext:时空枢纽:2",
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yanyu.jpg>",
    intro:{
		name:"魇语",
        content:"当前有#个“魇语”标记",
    },
    trigger:{
        player:"phaseBegin",
    },
    direct:true,
    filter:function(event,player){
        return player.countMark('sksn_yanyu')>=5||!game.hasPlayer(function(current){
            return current.hasMark('sksn_guiran');
        });
    },
    content:function(){
        "step 0"
        player.chooseTarget('魇语：是否令一名其他角色获得一枚“鬼染”标记？',
            function(event,player,target){
            return target!=player;
        }).set('ai',function(target){
            return -get.attitude(player,target)/(target.countCards('h')+1);
        });
        "step 1"
        if(result.bool){
			var target=result.targets[0];
			player.logSkill('sksn_yanyu',target);
			if(!target.hasSkill('sksn_guiran')) target.addSkill('sksn_guiran');
			target.addMark('sksn_guiran',1);
            var word=['吾非凝视深渊之人，吾即深渊','混乱也是一种秩序','末日就要来临，你可感到兴奋'].randomGet();
				player.say(word);
			if(player.countMark('sksn_yanyu')>=5) player.removeMark('sksn_yanyu',5);
        }else event.finish();
		"step 2"
		if(player.countMark('sksn_yanyu')>=5||!game.hasPlayer(function(current){
			return current.hasMark('sksn_guiran');
        })) event.goto(0);
    },
    derivation:"sksn_guiran",
},
"sksn_guiran":{
	audio:"ext:时空枢纽:2",
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_guiran.jpg>",
    intro:{
		name:"鬼染",
        content:"当前有#个“鬼染”标记",
    },
    trigger:{
        player:"phaseZhunbeiBegin",
    },
	forced:true,
	comparedDo:function (target,win){
		if(win==true){
			if(get.SksnBUFFNum(target,"_sksn_buff_jiangshi")>0){
				target.changeSksnBUFF("_sksn_buff_jiangshi",-1);
			}else{
				target.changeSksnBUFF("_sksn_buff_zengshi",1);
			}
		}else{
			if(get.SksnBUFFNum(target,"_sksn_buff_zengshi")>0){
				target.changeSksnBUFF("_sksn_buff_zengshi",-1);
			}else{
				target.changeSksnBUFF("_sksn_buff_jiangshi",1);
			}
		}
	},
	content:function(){
		"step 0"
		event.num=player.countMark('sksn_guiran');
		if(event,num<=0){
			player.removeSkill('sksn_guiran');
			event.finish();
		}else if(event.num>5){
			player.removeMark('sksn_guiran',event.num-5);
			event.num=5;
		}
		"step 1"
		player.chooseTarget('鬼染：是否选择一名角色拼点？（剩'+event.num+'次）',function(card,player,target){
			return target!=player&&player.canCompare(target);
		}).set('ai',function(target){
			return -get.attitude(player,target)+1;
		});
		"step 2"
		if(result.bool){
			event.num--;
			var target=result.targets[0];
			event.target=target;
			if(!player.countCards('h')) player.draw();
			if(!target.countCards('h')) target.draw();
			player.chooseToCompare(target);
			if(!target.hasSkill('sksn_guiran')) target.addSkill('sksn_guiran');
			target.addMark('sksn_guiran',1);
		}else{
			var num=get.SksnBUFFNum(player,"_sksn_buff_zengshi");
			if(num>0){
				event.num-=num;
				player.changeSksnBUFF("_sksn_buff_jiangshi",-num);
			}
			player.changeSksnBUFF("_sksn_buff_jiangshi",event.num);
			event.finish();
		}
		"step 3"
		if(result.tie){
			lib.skill.sksn_guiran.comparedDo(player,false);
			player.draw();
			lib.skill.sksn_guiran.comparedDo(event.target,false);
			event.target.draw();
		}else{
			if(result.winner==player){
				var loser=event.target;
				var cardL=result.target;
			}
			else{
				var loser=player;
				var cardL=result.player;
			}
			lib.skill.sksn_guiran.comparedDo(loser,false);
			loser.draw();
			lib.skill.sksn_guiran.comparedDo(result.winner,true);
			result.winner.gain(cardL,'gain2');
			player.removeMark('sksn_guiran',1);
			if(!player.hasMark('sksn_guiran')) player.removeSkill('sksn_guiran');
		}
		if(event.num>0) event.goto(1);
	},
	group:["sksn_guiran_die"],
	subSkill:{
		die:{
			trigger:{
				player:"dieBegin",
			},
			forced:true,
			content:function (){
				var next=player.next;
				player.line(next,'thunder');
				if(next&&next.name!='sksn_guiyan'&&next.name1!='sksn_guiyan'&&next.name2!='sksn_guiyan'){
					if(!next.hasSkill('sksn_guiran')) next.addSkill('sksn_guiran');
					next.addMark('sksn_guiran',1);
				}else game.log('然而什么也没有发生');
            },
			sub:true,
		},
	},
},
"sksn_yinhuo":{
	audio:"ext:时空枢纽:2",
    trigger:{
        global:"phaseBegin",
    },
	forced:true,
	filter:function (event,player){
		return event.player.hasMark('sksn_guiran')&&event.player!=player;
	},
	content:function (){
		var num=trigger.player.countMark('sksn_guiran');
		player.addMark('sksn_yanyu',num);
		var word=['仇恨的火焰，燃烧起来就无法熄灭','地狱空荡荡','魔鬼在人间'].randomGet();
			player.say(word);
	},
	ai:{
		noCompareTarget:true,
	},
},
//——埃得华——//
"sksn_sanwei":{
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_sanwei.jpg>",
                intro:{
                    content:"已散尽$的威势",
                },
                init:function (player){
        if(!player.storage['sksn_sanwei']) player.storage['sksn_sanwei']=[];
    },
                audio:"ext:时空枢纽:2",
                trigger:{
                    source:"damageEnd",
                },
                filter:function (event,player){
        return _status.currentPhase!=player&&game.hasPlayer(function(current){
            return current.countCards('h')<_status.currentPhase.countCards('h');
        })&&!player.storage['sksn_sanwei'].contains(_status.currentPhase);
    },
                check:function (event,player){
        return get.attitude(player,_status.currentPhase)<=0;
    },
                gainx:function (event,player,target){
        target.gainPlayerCard('h',_status.currentPhase);
    },
                content:function (){
        var players=game.filterPlayer(function(current){
            return current.countCards('h')<_status.currentPhase.countCards('h');
        });
        _status.currentPhase.line(players,'#ff2400')
        for(var i=0;i<players.length;i++){
            if(!_status.currentPhase.countCards('h')){
                _status.currentPhase.loseHp();
                player.storage['sksn_sanwei'].push(_status.currentPhase);
                break;
            }
            lib.skill.sksn_sanwei.gainx(trigger,player,players[i]);
        }
    },
                ai:{
                    threaten:1.7,
                },
            },			
"sksn_jieshi":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"damageBegin",
	},
    filter:function (event,player){
        return event.player!=player&&event.player.countCards('he');
    },
	check:function (event,player){
        if(get.attitude(player,event.player)>0){
            if(event.num==event.player.hp) return true;
			if(!event.source) return false;
            if(player.countCards('h')<=Math.min(2,event.source.countCards('h'))) return true;
        }else{
			if(!event.source) return false;
            if(player.countCards('h')>event.source.countCards('h')) return true;
        }
        return false;
    },
	prompt:function (event,player){
        var targetP=get.translation(event.player);
		if(event.source){
			if(event.source==player) var sourceP='你';
			else var sourceP=get.translation(event.source);
			return sourceP+'即将对'+targetP+'造成伤害，'+get.prompt('sksn_jieshi');
		}
		return targetP+'即将受到造成伤害，'+get.prompt('sksn_jieshi');
    },
	content:function (){
        "step 0"
        player.discardPlayerCard('he',trigger.player).set('ai',function(button){
			if(get.attitude(player,trigger.player)>0){
				if(trigger.num==trigger.player.hp) return 13-get.value(button.link);
				if(!trigger.source) return 0;
				if(player.countCards('h')<=Math.min(2,trigger.source.countCards('h'))) return 6-get.value(button.link);
			}else{
				if(!trigger.source) return 0;
				if(player.countCards('h')>trigger.source.countCards('h')) return get.value(button.link);
			}
        });
        "step 1"
        if(result.bool){
            trigger.num--;
			if(trigger.source){
				if(player.countCards('h')>trigger.source.countCards('h')){
					player.chooseBool('借势：是否对'+get.translation(trigger.player)+'造成一点伤害？').set('ai',function(){
						return get.attitude(player,trigger.player)<=0;
					});
				}else{
					player.draw();
					event.finish();
				}
			}else event.finish();
        }
        "step 2"
        if(result.bool){
            trigger.player.damage();
             var word=['抱歉，你认错人了','我像他吗？'].randomGet();
            player.say(word);
        }
    },
	ai:{
		threaten:1.2,
	},
            },
//–––涅普顿–––//
"sksn_futao":{
    audio:"ext:时空枢纽:2",
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_futao.jpg>",
    intro:{
        name:"覆涛",
        content:"回合前的体力：#",
    },
    trigger:{
        global:["phaseBegin","phaseEnd"],
    },
    forced:true,
    silent:true,
    priority:-1,
    filter:function (event,player,onrewrite){
        if(onrewrite=='phaseEnd') return player.hp<player.storage.sksn_futao;
        return true;
    },
    content:function (){
        var onrewrite=event.triggername;
        if(onrewrite=='phaseEnd'){
            player.logSkill('sksn_futao');
            var num=Math.min(player.storage.sksn_futao-2,player.getDamagedHp());
            player.recover(num);
            player.chooseToDiscard('h',num,true);
        }else{
            player.storage.sksn_futao=player.hp;
            player.syncStorage('sksn_futao');
            player.markSkill('sksn_futao');
        }
        
    },
    group:["sksn_futao_damage"],
    subSkill:{
        damage:{
            trigger:{
                player:"damageBegin",
            },
            direct:true,
            usable:2,
            filter:function (event,player){
                return player.hp>1;
            },
            content:function (){
                trigger.untrigger();
                trigger.finish();
                var num=player.hp-1;
                player.loseHp(num);
                player.draw(num);
                var word=['哼，沙丁鱼','惊涛骇浪','淹没一切'].randomGet();
            player.say(word);
            },
            sub:true,
        },
    },
            },

"sksn_Haiwang":{
    audio:"ext:时空枢纽:2",
    trigger:{
        player:"recoverAfter",
    },
    frequent:true,
    filter:function (event,player){
        return !player.hasSkill('sksn_Haiwang_off');
    },
    content:function (){
        "step 0"
        player.chooseUseTarget({name:'sha'}).set('addCount',false);
        "step 1"
        if(game.hasPlayer2(function(current){
            return current.getHistory('damage',function(evt){
                return evt.getParent(4)==event;
            }).length>0
        })){
            player.addTempSkill("sksn_Haiwang_off")
            player.recover();
        }
    },
    subSkill:{off:{sub:true}},
            },


//–––凯恩–––//
"sksn_tongpao":{
	            forced:true,
	            audio:"ext:时空枢纽:2",
                group:["sksn_tongpao_1","sksn_tongpao_2","sksn_tongpao_3","sksn_tongpao_4","sksn_tongpao_5"],
            },
            "sksn_tongpao_1":{
                trigger:{
                    global:"useCardAfter",
                },
                usable:1,
                forced:true,
                filter:function (event,player){
        return event.player!=player&&event.player.hasSkill('sksn_tongpao')&&!player.getEquip(1)&&event.card&&get.subtype(event.card)=='equip1'&&player.canUse(event.card,player);
    },
                content:function (){
        var name=trigger.card.name;
        var suit=get.suit(trigger.card);
        var number=trigger.card.number;
        player.useCard(game.createCard(name,suit,number),player);                                                                                                               
    },
            },
            "sksn_tongpao_2":{
                trigger:{
                    global:"useCardAfter",
                },
                usable:1,
                forced:true,
                filter:function (event,player){
        return event.player!=player&&event.player.hasSkill('sksn_tongpao')&&!player.getEquip(2)&&event.card&&get.subtype(event.card)=='equip2'&&player.canUse(event.card,player);
    },
                content:function (){
        var name=trigger.card.name;
        var suit=get.suit(trigger.card);
        var number=trigger.card.number;
        player.useCard(game.createCard(name,suit,number),player);                                                                                                               
    },
            },
            "sksn_tongpao_3":{
                trigger:{
                    global:"useCardAfter",
                },
                usable:1,
                forced:true,
                filter:function (event,player){
        return event.player!=player&&event.player.hasSkill('sksn_tongpao')&&!player.getEquip(3)&&event.card&&get.subtype(event.card)=='equip3'&&player.canUse(event.card,player);
    },
                content:function (){
        var name=trigger.card.name;
        var suit=get.suit(trigger.card);
        var number=trigger.card.number;
        player.useCard(game.createCard(name,suit,number),player);                                                                                                               
    },
            },
            "sksn_tongpao_4":{
                trigger:{
                    global:"useCardAfter",
                },
                forced:true,
                usable:1,
                filter:function (event,player){
        return event.player!=player&&event.player.hasSkill('sksn_tongpao')&&!player.getEquip(4)&&event.card&&get.subtype(event.card)=='equip4'&&player.canUse(event.card,player);
    },
                content:function (){
        var name=trigger.card.name;
        var suit=get.suit(trigger.card);
        var number=trigger.card.number;
        player.useCard(game.createCard(name,suit,number),player);                                                                                                               
    },
            },
            "sksn_tongpao_5":{
                trigger:{
                    global:"useCardAfter",
                },
                usable:1,
                forced:true,
                filter:function (event,player){
        return event.player!=player&&event.player.hasSkill('sksn_tongpao')&&!player.getEquip(5)&&event.card&&get.subtype(event.card)=='equip5'&&player.canUse(event.card,player);
    },
                content:function (){
        var name=trigger.card.name;
        var suit=get.suit(trigger.card);
        var number=trigger.card.number;
        player.useCard(game.createCard(name,suit,number),player);                                                                                                               
    },
            },
            "sksn_paoze":{audio:"ext:时空枢纽:2",
                mod:{
                    maxHandcard:function(player,num){
                        return num+player.storage.sksn_paoze;
                    },
                },
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_paoze.jpg>",
                intro:{
                    content:"手牌上限+#",
                },
                init:function (player){
        if(!player.storage.sksn_paoze) player.storage.sksn_paoze=0;
    },
                trigger:{
                    global:["gameDrawAfter","dieEnd","dying"],
                },
                direct:true,
                filter:function (event,player){
        if(event.name=='die') return event.player.hasSkill('sksn_tongpao');
        if(event.name=='dying'&&game.hasPlayer(function(current){
                return current!=player&&current.hasSkill('sksn_tongpao');
            })) return false;
            return true;
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt2('sksn_paoze'),'令其获得“同袍”',function(card,player,target){
            return player!=target&&!target.hasSkill('sksn_tongpao');
        }).set('ai',function(target){
            var player=_status.event.player;
            if(player.maxHp<=2) return -1;
            if(get.attitude(player,target)>0&&!target.hasSkill('sksn_tongpao')) return target.hp;
            return -1;
        });
        'step 1'
        if(result.bool){
            player.logSkill('sksn_paoze');
            player.loseMaxHp();
            player.storage.sksn_paoze++;
            player.update();
            player.line(result.targets);
            result.targets[0].addSkill('sksn_tongpao');   
      }                                                                                                         
    },
            },
            "sksn_shuwei":{audio:"ext:时空枢纽:2",
                trigger:{
                    global:'damageEnd',
                },
                frequent:true,
                filter:function (event,player){
            return event.player.hasSkill('sksn_tongpao')&&event.source!=event.player&&event.player.isAlive();
    },
                content:function (){
            'step 0'
            if(trigger.player==player){
                player.draw();
                event.finish();
            }
            'step 1'
            player.chooseCard('he','戍卫：交给'+get.translation(trigger.player)+'1张牌或令其摸1张牌').set('ai',function(card){
                        if(get.tag(card,'recover')) return 4;
                        if(get.tag(card,'damage')) return 2;
                        if(get.type(card)=='equip') return 1;
                        return 0;
                    });   
            'step 2'
            if(result.bool){
                trigger.player.gain(result.cards,player,'give');
                if(get.tag(result.cards[0],'recover')) trigger.player.recover();
                if(get.tag(result.cards[0],'damage')) trigger.player.chooseToUse(function(card,player,event){
                        if(card!=result.cards[0]) return false;
                        return lib.filter.filterCard.apply(this,arguments);
                    },'戍卫：是否对'+get.translation(trigger.source)+'使用'+get.translation(result.cards[0])+'？').set('complexSelect',true).set('filterTarget',function(card,player,target){
                        if(target!=trigger.source&&!ui.selected.targets.contains(trigger.source)) return false;
                        return lib.filter.targetEnabled.apply(this,arguments);
                    }).set('sourcex',trigger.source);
                if(get.type(result.cards[0])=='equip'){
                    trigger.player.draw();
                    trigger.player.chooseUseTarget(result.cards[0]);
                }
                    }
            else trigger.player.draw();                                                                                               
    }, 
            },
//琼斯
"sksn_xilue":{  audio:"ext:时空枢纽:2",
                group:"sksn_xilue_getmod",
                trigger:{
                    source:'damageSource',
                },            
                forced:true,        
                filter:function (event,player){
                    return event.player&&event.player.isAlive()&&event.player.countCards('h')&&event.player!=player;
                },                
                content:function (){
                    "step 0"
                    var target=trigger.player;
                    event.target=target;
                    event.videoId=lib.status.videoId++;
                    var cards=target.getCards('h');
                    if(player.isOnline2()){
                        player.send(function(cards,id){
                            ui.create.dialog('袭掠',cards).videoId=id;
                        },cards,event.videoId);
                    }
                    event.dialog=ui.create.dialog('袭掠',cards);
                    event.dialog.videoId=event.videoId;
                    if(!event.isMine()){
                        event.dialog.style.display='none';
                    }
                    player.chooseButton().set('dialog',event.videoId).set('ai',function(button){
                        return get.value(button.link);
                    });
                    "step 1"
                    event.dialog.close();
                    if(result.bool){
                    event.card=result.links[0];
                    var card=event.card;
                    player.gain(card,trigger.player,'give');
                    }                
                },  
            },
            sksn_xilue_mod:{               
                mod:{
                cardname:function(card,player){
                        if(card.name=='shan') return 'sha';
                    },
                targetInRange:function(card){
                        if(get.color(card)=='red') return true;
                    },
                },
            },
            sksn_xilue_getmod:{                  
                trigger:{
                    player:"phaseBefore",
                },
                direct:true,                          
                content:function (){
                    player.addTempSkill('sksn_xilue_mod');                
                },          
            },
"sksn_zhenjing":{
            	audio:"ext:时空枢纽:2",
                shaRelated:true,
                usable:1,
                trigger:{
                    player:'useCardToPlayered',
                },
                check:function(event,player){
                    return get.attitude(player,event.target)<=0&&event.target.countCards('e')>1;
                },
                filter:function(event,player){
                    return event.card.name=='sha'&&event.target.countCards('e');
                },
                logTarget:'target',
                content:function(){
                    "step 0"
                    var n=trigger.target.countCards('e');
                    player.draw(n);
                    player.chooseToDiscard(n,true).set('ai',function(card){
                            var suit=get.suit(card);
                            for(var i=0;i<ui.selected.cards.length;i++){
                                if(get.suit(ui.selected.cards[i])==suit){
                                    return -4-get.value(card);
                                }
                            }
                        return -get.value(card);
                    });
                    "step 1"           
                    if(result.cards){
                        var suits=[];
                        for(var i=0;i<result.cards.length;i++){
                            suits.add(get.suit(result.cards[i]));
                        }
                        if(suits.length==1) player.loseHp();
                        if(suits.length>=2) trigger.getParent().directHit.add(trigger.target);
                        if(suits.length>=3){
                            var trigger2=trigger.getParent();
                            if(typeof trigger2.baseDamage!='number'){
                            trigger2.baseDamage=1;
                        }
                        trigger2.baseDamage++;
                        }
                        if(suits.length==4) trigger.chooseToDiscard('e',trigger.target.countCards('e'),true);
                    }
                },
            },
"sksn_zhuiming":{audio:"ext:时空枢纽:1",
                trigger:{
                    player:"dieBefore",
                },
                forced:true,
                content:function (){
        if(trigger.source&&trigger.source.isIn()){
        trigger.source.markSkillCharacter('sksn_zhuiming',player,'『<b><font color=red>追命</font></b>』','已成为『<b><font color=red>追命</font></b>』的目标');    
        trigger.source.addSkill('sksn_zhuiming_continue');
    }
        player.chooseToDiscard('hej',player.countCards('hej'),true);
        player.init('sksn_qiongsi_soul');     
        trigger.cancel();
    },
            },
            sksn_zhuiming_continue:{},
            sksn_yuanling:{audio:"ext:时空枢纽:2",
                group:["sksn_yuanling_damage","sksn_yuanling_die"],
                trigger:{
                    player:"phaseBefore",
                },
                forced:true,
                content:function (){
        'step 0'
        trigger.cancel();
        event.players=game.filterPlayer(function(current){
            return current!=player;
        }).sortBySeat();
        'step 1'
        if(event.players.length){
            event.current=event.players.shift();
            player.line(event.current);
            if(event.current.countCards('h')&&player.hp!=1&&!event.current.hasSkill('sksn_zhuiming_continue')){
                event.current.chooseToDiscard('h','弃置1张手牌或受到1点体力').set('ai',function(card){
                    return 7-get.value(card);
                });
                event.tempbool=false;
            }
            else{
                event.tempbool=true;
            }
        }
        else{
            event.finish();
        }
        'step 2'
        if(event.tempbool||result.bool==false){
            event.current.damage();
        }
        event.goto(1);
    },
            },
            sksn_yuanling_damage:{
                trigger:{
                    player:'damageBegin3',
                },
                //priority:1,
                direct:true,
                filter:function(event,player){
                    return event.source&&event.source.isIn();
                },
                content:function(){
                    trigger.source.chooseDrawRecover(true);
                    player.logSkill('sksn_yuanling');
                },
                ai:{
                    effect:{
                        target:function(card,player,target,current){
                            if(get.tag(card,'damage')){
                                return [1,-2];
                            }
                        }
                    }
                }
            },            
            sksn_yuanling_die:{
                trigger:{
                    player:'dieBefore',
                },
                //priority:1,
                direct:true,
                filter:function(event,player){
                    return event.source&&event.source.isIn();
                },
                content:function(){
                    trigger.source.draw(3);
                    player.logSkill('sksn_yuanling');
                },
            },

//——————乌拉姆——————//
"sksn_yunshen":{ 
audio:"ext:时空枢纽:2",
trigger:{
        player:["phaseBefore","damageEnd"],
        source:"damageEnd",
    },
    forced:true,
    filter:function (event,player,onrewrite){
        if(onrewrite=='phaseBefore'){
            return !player.getEquip('sksn_Pamadora')&&!player.isMinHp(false);
        }else return player.getEquip('sksn_Pamadora');
        return false;
    },
    content:function (){
        var onrewrite=event.triggername;
        if(onrewrite=='phaseBefore'){
            player.useCard(game.createCard('sksn_Pamadora','spade',9),player);
        }
        else{
            var card=get.cardPile(function(card){
                return card.name=='du';
            });
            if(card){
                player.gain(card,'gain2','log');
            };
        }
    },

},
"sksn_wangtian":{
    audio:"ext:时空枢纽:2",
    skillAnimation:true,
    animationColor:"thunder",
    unique:true,
    juexingji:true,
    trigger:{
        player:"phaseUseBegin",
    },
    forced:true,
    locked:false,
    filter:function (event,player){
        return !player.storage.sksn_wangtian&&player.countCards('h','du')>=player.hp;
    },
    derivation:["sksn_weiya","sksn_buff_yazhi_name"],
    content:function (){
        "step 0"
        player.storage.sksn_wangtian=true;
        player.awakenSkill('sksn_wangtian');
        player.recover(player.getDamagedHp());
        "step 1"
        var next=player.chooseTarget(true,'妄天：选择一名其他角色交换手牌');
        next.set('filterTarget',lib.filter.notMe);
        next.set('ai',function(target){
            if(player.countCards('h','du')<player.countCards('h')/2) return get.attitude(_status.event.player,target);
            return -get.attitude(_status.event.player,target)*target.countCards('h')+1;
        });
        "step 2"
        if(result.bool){
            player.line(result.targets[0],'green');
            player.swapHandcards(result.targets[0]);
        }
        "step 3"
        player.addSkill('sksn_weiya');
         var word=['老子的海军天下无敌！','神明？他™有几个师啊？！'].randomGet();
            player.say(word);
    },
},
"sksn_weiya":{
    audio:"ext:时空枢纽:2",
    trigger:{
        player:"phaseJieshuBegin",
    },
    forced:true,
    content:function (){
        "step 0"
        player.loseMaxHp();
        if(player.hasZhuSkill('sksn_gongjian')){
			event.players=game.filterPlayer(function(current){
                return current!=player&&current.group=='SK_sea';
            });
        }
        "step 1"
        var next=player.chooseTarget(true);
        next.set('filterTarget',lib.filter.notMe);
        next.set('ai',function(target){
            return -get.attitude(player,target);
        });
        "step 2"
        if(result.bool){
			game.changeSksnBUFF(result.targets[0],'_sksn_buff_yazhi',1);
             var word=['就你叫路西法？','你™就是海都国王啊？','东极算个锤子？','教皇？两脚禽兽罢了','魔物，它能给我磨小米吗？','雾言联盟？我还雾都孤儿呢'].randomGet();
            player.say(word);
        }
        "step 3"
        if(event.players&&event.players.length>0){
            var onPlayer=event.players.shift();
            event.onPlayer=onPlayer;
            onPlayer.chooseBool('共僭：是否失去一点体力响应乌拉姆的〖威压〗？').set('ai',function(){
                if(get.attitude(onPlayer,trigger.player)>0){
                    if(player.hp>=2) return player.countCards('h')<=2||player.hp>2;
                    return false;
                }
                return false;
            });
        }else event.finish();
        "step 4"
        if(result.bool){
            event.onPlayer.loseHp();
            event.onPlayer.draw();
            event.goto(1);
        }
        else event.goto(3);
    },
},
"sksn_gongjian":{audio:"ext:时空枢纽:1",
    unique:true,
    zhuSkill:true,
    trigger:{player:"sksn_wangtianAfter"},
    frequent:true,
    filter:function(event,player){
        return player.hasZhuSkill('sksn_gongjian');
    },
    content:function (){
        "step 0"
         var word=['这片海域，是老子说了算！'].randomGet();
            player.say(word);
        player.chooseBool('摸三张牌，或取消并加一点体力上限').set('ai',function(){
            if(player.countCards('h')<player.hp) return true;
            return false;
        });
        "step 1"
        if(result.bool){
            player.draw(3);
        }else{
            player.gainMaxHp();
        }
    },
    ai:{
        skillTagFilter:function (player){
            if(!player.hasZhuSkill('sksn_gongjian')) return false;
            return game.hasPlayer(function(current){
                return current!=player&&current.group=='SK_sea';
            });
        },
    },
},



//——————桀拉尔——————//
"sksn_xueshi":{
	audio:"ext:时空枢纽:2",
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_zhushen.jpg>",
	intro:{
		name:"<font color=red>血弑</font>",
		content:"mark",
	},
	trigger:{
		global:"useCardAfter",
	},
	direct:true,
	filter:function (event,player){
		var list=player.getStat().skill.sksn_xueshi||[];
		if(list&&list.contains(get.type2(event.card))) return false;
		if(get.itemtype(event.cards)!='cards') return false;
		for(var cardi of event.cards){
			if(get.position(cardi,true)=='o') return true;
		}
		return false;
	},
	content:function (){
		"step 0"
		if(!player.getStat().skill.sksn_xueshi){
			player.getStat().skill.sksn_xueshi=[];
		}
		var cards=trigger.cards.filterInD();
		event.cards=cards;
		event.damagedBool=game.hasPlayer2(function(current){
			return current.getHistory('damage',function(evt){
				return evt.card==trigger.card;
			}).length>0;
		});
		var next=player.chooseToDiscard('he');
		next.ai=function(card){
			var player=_status.event.player;
			if(player.hp<=1&&card.name=='du') return -1;
			var getTo='value';
			var value=-1,value2=0;
			for(var cardi of _status.event.cards){
				value+=get.value(cardi);
				if(_status.currentPhase==player){
					value2=Math.max(player.getUseValue(cardi,true,true),value2);
				}
			}
			if(_status.currentPhase==player&&
				player.getUseValue(card,true,true)>=value2) return -1;
			return value-get.value(card)+(_status.event.hadDamaged)?1:-1;
		};
		next.prompt=get.prompt('sksn_xueshi');
		next.prompt2='弃置一张牌获得'+get.translation(event.cards);
		next.set('cards',event.cards);
		next.set('hadDamaged',event.damagedBool);
		next.logSkill='sksn_xueshi';
		"step 1"
		if(result.bool){
			player.getStat().skill.sksn_xueshi.push(get.type2(trigger.card));
			player.gain(cards,'gain2');
			if(event.damagedBool) player.addMark('sksn_xueshi',1);
		}
	},
	ai:{
		threaten:1.3
	}
},
"sksn_yingzhu":{
                audio:"ext:时空枢纽:3",
                trigger:{
                    player:"useCardAfter",
                },
                direct:true,
                priority:1,
                filter:function (event,player){
        if(!event.targets) return false;
        if(!get.tag(event.card,'damage')) return false;
        return player.countMark('sksn_xueshi')>=Math.max(5-player.getDamagedHp(),0);
    },
                content:function (){
        "step 0"
        var targets={damage:[],undamage:[]};
        for(var i=0;i<trigger.targets.length;i++){
            if(trigger.targets[i].getHistory('damage',function(evt){
                return evt.card==trigger.card;
            }).length>0){
                targets.damage.add(trigger.targets[i]);
                trigger.targets[i].markSkill('sksn_yingzhu_mark');
            }else{
                targets.undamage.add(trigger.targets[i]);
            }
        }
        event.targets=targets;
        player.chooseTarget(function(card,player,target){
            if(event.targets.damage.contains(target)){
                return player!=target&&target.countCards('h')>=2;
            }
            return event.targets.undamage.contains(target);
        },function(target){
            var player=_status.event.player;
            if(event.targets.undamage.contains(target)){
                return get.damageEffect(target,player,player)>0;
            }
            return -get.attitude(player,target);
        },get.prompt2('sksn_yingzhu'));
        "step 1"
        if(result.bool){
            player.removeMark('sksn_xueshi',1);
            var target=result.targets[0];
            player.logSkill('sksn_yingzhu',target);
            if(event.targets.damage.contains(target)){
                player.gainPlayerCard(target,2,true,'h');
            }else{
                target.damage();
            }
        }
        for(var targeti of event.targets.damage){
            targeti.unmarkSkill('sksn_yingzhu_mark');
        }
    },
                ai:{
                    combo:"sksn_xueshi",
                },
                subSkill:{
                    mark:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_zhushen1.jpg>",
                        intro:{
                            name:"（临时标记）",
                            content:"这个目标受到了伤害",
                        },
                        sub:true,
                    },
                },
            },
"sksn_yingfeng":{
	audio:"ext:时空枢纽:1",
	mod:{
		attackFrom:function (from,to,attack){
			if(from.isEmpty(1)&&!from.isDisabled(1)) return attack-1;
		},
	},
	locked:true,
	ai:{
		effect:{
			target:function (card,player,target){
				if(player==target&&get.subtype(card)=='equip1'){
					if(get.equipValue(card)<=8) return 0;
				}
				if(!target.isEmpty(1)) return;
			},
		},
	},
	group:["sksn_yingfeng_YRDa","sksn_yingfeng_YRDb"],
	subSkill:{
		YRDa:{
			audio:"sksn_yingfeng",
			equipSkill:true,
			noHidden:true,
			inherit:"SKSN_card_YRD_A",
			filter:function (event,player){
                if(!lib.skill.SKSN_card_YRD_A.filter(event,player)) return false;
                if(!player.isEmpty(1)) return false;
                return true;
            },
			name:"影刃刀",
			sub:true,
		},
		YRDb:{
			audio:"sksn_yingfeng",
			equipSkill:true,
			noHidden:true,
			inherit:"SKSN_card_YRD_B",
			filter:function (event,player){
                if(!lib.skill.SKSN_card_YRD_B.filter(event,player)) return false;
                if(!player.isEmpty(1)) return false;
                return true;
            },
			name:"影刃刀",
			sub:true,
		},
	},
},
//–––司吉–––//
"sksn_bozhong":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"judge",
                },
                filter:function (event,player){
        if(event.player==player) return false;
        return event.player.countCards('h')||player.countCards('h');
    },
                check:function (event,player){
        var target=event.player;
        if(get.attitude(player,target)<=0){
            if(event.judge(target.judging)>=0) return true;
        }else{
            if(event.judge(target.judging)<0) return true;
        }
        return false;
    },
                content:function (){
        "step 0"
        if(!trigger.player.countCards('h')){
            event._result={bool:false};
        }else{
            var next=trigger.player.chooseBool(function(){
                return trigger.player.countCards('h',function(card){
                    return trigger.judge(card)>0;
                });
            }).set('judging',trigger.player.judging[0]);
            next.set('prompt','博众：是否展示手牌？');
            next.set('prompt2','若选是，你打出一张手牌代替判定牌<br>若选否，'+get.translation(player)+'将打出一张手牌替换判定牌');
        }
        "step 1"
        event.resultBool=result.bool;
        if(event.resultBool){
            trigger.player.showHandcards();
        }else if(!player.countCards('h')){
            game.log('然而什么也没有发生');
            event.finish();
            return;
        }
        "step 2"
        var tip=get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+get.translation(trigger.player.judging[0])+'，请打出一张手牌';
        if(event.resultBool){
            tip+='代替判定牌';
            event.current=trigger.player;
            var ai=function(card){
                var trigger=_status.event.getTrigger();
                var player=_status.event.player;
                var judging=_status.event.judging;
                var result=trigger.judge(card)-trigger.judge(judging);
                var attitude=get.attitude(player,trigger.player);
                if(attitude==0||result==0) return 0;
                if(attitude>0){
                    return result-get.value(card)/2;
                }
                else{
                    return -result-get.value(card)/2;
                }
            };
        }else{
            tip+='替换判定牌';
            event.current=player;
            var ai=function(card){
                var trigger=_status.event.getTrigger();
                var player=_status.event.current;
                var judging=_status.event.judging;
                var result=trigger.judge(card)-trigger.judge(judging);
                var attitude=get.attitude(player,trigger.player);
                if(attitude==0||result==0) return 0;
                if(attitude>0){
                    return result;
                }
                else{
                    return -result;
                }
            };
        }
        var next=event.current.chooseCard(tip,'h',function(card){
            var player=_status.event.current;
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        },true);
        next.set('current',event.current);
        next.set('judging',trigger.player.judging[0]);
        next.set('ai',ai);
        "step 3"
        if(result.bool&&result.cards){
            event.current.respond(result.cards,'highlight','sksn_bozhong','noOrdering');
        }else event.finish();
        "step 4"
        if(result.bool){
            if(event.resultBool){
                if(trigger.player.judging[0].clone){
                    trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                    game.broadcast(function(card){
                        if(card.clone){
                            card.clone.classList.remove('thrownhighlight');
                        }
                    },trigger.player.judging[0]);
                    game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
                }
                game.cardsDiscard(trigger.player.judging[0]);
            }else{
                player.$gain2(trigger.player.judging[0]);
                player.gain(trigger.player.judging[0]);
            }
            trigger.player.judging[0]=result.cards[0];
            trigger.orderingCards.addArray(result.cards);
            game.log(trigger.player,'的判定牌改为',result.cards[0]);
        }
        "step 5"
        game.delay(2);
    },
                ai:{
                    rejudge:true,
                    skillTagFilter:function (player,tag,arg){
            if(tag=='rejudge'){
                if(player==arg) return false;
            }
        },
                    tag:{
                        rejudge:1,
                    },
                },
            },
"sksn_mijiao":{
                audio:"ext:时空枢纽:2",
                trigger:{
                    global:"useCard",
                },
                direct:true,
                filter:function (event,player){
        if(!player.countCards('he')) return false;
        if(['equip','delay'].contains(get.type(event.card))||event.card.name=='du') return false;
        return event.player.getHistory('useCard',function(evt){
            return evt.targets&&evt.targets.length;
        }).length==1&&event.targets&&event.targets.length>0;
    },
                presume:function (card,player,targets,legal){
        var list;
        if(legal==true){
            list=game.filterPlayer(function(current){
                return targets.contains(current)&&player.canUse(card,current,true,true);
            });
        }else{
            list=game.filterPlayer(function(current){
                return targets.contains(current)&&!player.canUse(card,current,true,true);
            });
        }
        return list;
    },
                content:function (){
        "step 0"
        player.chooseToDiscard(1,'he').set('ai',function(card){
            var player=_status.event.player;
            if(player==trigger.player){
                if(!game.hasPlayer(function(current){
                    return get.attitude(player,current)&&current.hasSkillTag('rejudge');
                })) return 0;
            }
            var info=get.info(card);
            var filterMod=get.filter(info.filterTarget);
            var selectMod=get.select(info.selectTarget);
            var isGood=false;
            if(get.filter(get.info(trigger.card).filterTarget)==get.filter(lib.filter.isMe)) isGood=true;
            else if(!game.hasPlayer(function(current){
                return get.effect(current,trigger.card,trigger.player,current)<0;
            })&&get.select(get.info(trigger.card).selectTarget)!=-1) isGood=true;
            if(isGood){
                if(selectMod==-1&&filterMod!=get.filter(lib.filter.isMe)) return 10-get.value(card);
                if(!info.range&&filterMod!=get.filter(lib.filter.isMe)) return 7-get.value(card);
            }else{
                if(get.attitude(player,trigger.player)<0){
                    if(filterMod==get.filter(lib.filter.isMe)&&!trigger.targets.contains(trigger.player)) return 7.1-get.value(card);
                    if(!trigger.player.hasUseTarget(card,true,true)) return 7-get.value(card);
                }else{
                    if(!game.hasPlayer(function(current){
                        return !trigger.targets.contains(current)&&get.effect(current,trigger.card,trigger.player,current)>0;
                    })) return 0;
                    if(selectMod==-1&&filterMod!=get.filter(lib.filter.isMe)) return 10-get.value(card);
                    if(!info.range&&filterMod!=get.filter(lib.filter.isMe)) return 7-get.value(card);
                }
            }
            return 0;
        }).set('prompt',get.prompt2('sksn_mijiao',trigger.card));
        "step 1"
        if(result.bool){
            player.logSkill('sksn_mijiao');
            event.card1=result.cards[0];
            trigger.player.judge(function(card){
                if(get.color(card)=='red') return lib.skill['sksn_mijiao'].presume(trigger.card,trigger.player,game.filterPlayer(function(current){
                    return get.attitude(player,current)>0&&!trigger.targets.contains(current);
                }),true).length;
                var jdg=-0.5;
                var unlegalPlayers=lib.skill['sksn_mijiao'].presume(event.card1,trigger.player,trigger.targets,false);
                for(var targetIn of unlegalPlayers){
                    if(get.effect(targetIn,trigger.card,trigger.player,trigger.player)<0) jdg++;
                    else jdg--;
                }
                return jdg;
            });
        }else event.finish();
        "step 2"
        if(result.color=='red'){
            event.goto(3);
        }else{
            var list2=lib.skill['sksn_mijiao'].presume(event.card1,trigger.player,trigger.targets,false);
            if(list2.length) game.log(list2,'被取消了');
            for(var i of list2){
                trigger.targets.remove(i);
            }
            trigger.player.storage['sksn_mijiao_ban']=get.type(event.card1,'trick');
            trigger.player.addTempSkill('sksn_mijiao_ban');
            event.finish();
        }
        "step 3"
        player.chooseTarget(function(card,player,target){
            return trigger.player.canUse(event.card1,target,true,true)&&!trigger.targets.contains(target);
        },[1,Infinity],function(target){
            var player=_status.event.player;
            return get.effect(target,trigger.card,trigger.player,player);
        },'请为'+get.translation(trigger.card)+'选择额外的目标');
        "step 4"
        if(result.bool){
            player.line(result.targets,'water');
            game.log(result.targets.slice(0),'成为了',trigger.card,'的额外目标');
            for(var i of result.targets){
                trigger.targets.push(i);
            }
        }
    },
                subSkill:{
                    ban:{
                        unique:true,
                        charlotte:true,
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_bozhong.jpg>",
                        intro:{
                            name:"秘教",
                            content:function (storage){
                    if(!storage) return '这不对劲';
                    return '不能使用'+get.translation(storage)+'牌';
                },
                        },
                        onremove:true,
                        mod:{
                            "cardEnabled2":function (card,player){
                    if(player.storage['sksn_mijiao_ban']==get.type(card,'trick')) return false;
                },
                        },
                        sub:true,
                    },
                },
            },
//——————哈利迪斯————//
    "SKSN_HLDS_D":{
    trigger:{
        player:"useCardAfter",
    },
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_molian2.jpg>",
    intro:{
        content:"「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌会额外结算两次，然后失去此技能",
    },
    audio:"SKSN_HLDS_C",
    forced:true,
    priority:179,
    filter:function(event,player){
        if(event.parent.name=='SKSN_HLDS_D') return false;
        if(!get.SkCanHasMoreTarget(event.card.name))return false; 
        if(!event.targets||!event.card) return false;
        var type=get.type(event.card);
        if(type!='basic'&&type!='trick') return false;
        var card=game.createCard(event.card.name,event.card.suit,event.card.number);
        for(var i=0;i<event.targets.length;i++){
            if(!event.targets[i].isAlive()) return false;
            if(!player.canUse({name:event.card.name},event.targets[i],false,false)){
                return false;
            }
        }
        return event.targets.length==1&&event.card.name!='shan'&&event.card.name!='wuxie';
    },
    content:function(){      
        var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number);
        player.useCard(trigger.card,false,trigger.targets);
        player.useCard(trigger.card,false,trigger.targets);
        player.removeSkill("SKSN_HLDS_D");
        var word=['沉寂吧！凡人'].randomGet();
            player.say(word);
    },
    ai:{
        threaten:2,
    },
},
    "SKSN_HLDS_C":{
    trigger:{
        player:"useCardAfter",
    },
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_molian1.jpg>",
    intro:{
        content:"「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌会额外结算一次，然后失去此技能",
    },
    audio:"ext:时空枢纽:3",
    forced:true,
    priority:178,
    filter:function(event,player){
        if(event.parent.name=='SKSN_HLDS_C') return false;
        if(!get.SkCanHasMoreTarget(event.card.name))return false;
        if(!event.targets||!event.card) return false;
        var type=get.type(event.card);
        if(type!='basic'&&type!='trick') return false;
        var card=game.createCard(event.card.name,event.card.suit,event.card.number);
        for(var i=0;i<event.targets.length;i++){
            if(!event.targets[i].isAlive()) return false;
            if(!player.canUse({name:event.card.name},event.targets[i],false,false)){
                return false;
            }
        }
        return event.targets.length==1&&event.card.name!='shan'&&event.card.name!='wuxie';
    },
    content:function(){       
        var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number);
        player.useCard(trigger.card,false,trigger.targets);   
        player.removeSkill("SKSN_HLDS_C");
    },
    ai:{
        threaten:2,
    },
},
    "SKSN_HLDS_B":{
        audio:"ext:时空枢纽:6",
        derivation:["SKSN_HLDS_C","SKSN_HLDS_D"],
        enable:"phaseUse",
        filter:function(event,player){
            return player.countMark('SKSN_HLDS_A')>0&&
            !player.hasSkill('SKSN_HLDS_C')&&
            !player.hasSkill('SKSN_HLDS_D');
        },
        content:function(){
            if(player.countMark('SKSN_HLDS_A')>2){
                player.removeMark('SKSN_HLDS_A',2); 
                player.draw();
                player.addTempSkill('SKSN_HLDS_D');
            }
            else if(player.countMark('SKSN_HLDS_A')>0&&player.countMark('SKSN_HLDS_A')<3){
                player.removeMark('SKSN_HLDS_A',1); 
                player.addTempSkill('SKSN_HLDS_C');
            }
        },
        ai:{
            order:5,
            result:{
                player:function(player){
                    if(player.num('h','sha')>0&&
                    !player.hasSkill('SKSN_HLDS_D')){
                        return 2;
                    }
                    var ph=player.get('h');
                    var num=0;
                    for(var i=0;i<ph.length;i++){
                    if(get.tag(ph[i],'damage')) num++;
                }
                if(num>1) return num;
                return 0;
            },
        },
    },
},
    "SKSN_HLDS_A":{
        mark:true,
        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_moneng.jpg>",
        intro:{
            name:"魔能",
            content:"<b>当前标记数为#枚</b><br><br>「<font color=#F0F>寂灭之心</font>」<br><li><b>锁定技</b>，当你进场/回合开始/每受到一点伤害/一名角色阵亡时，你都会获得一枚“<b><font color=#F0F>魔能</font></b>”标记",
        },
        trigger:{
            player:["damageAfter","enterGame","phaseBegin"],
            global:["gameDrawAfter","die"],
        },
        audio:"ext:时空枢纽:3",
        forced:true,
        priority:177,
        filter:function(event){
            return event.name!='damage'||event.num>0; 
        },
        content:function(){
            player.addMark('SKSN_HLDS_A',trigger.name=='damage'?trigger.num:1);
        },
        ai:{
            combo:"SKSN_HLDS_B",
            maixie:true,
            "maixie_hp":true,
        },
    },

//——————奥丁格兰——————//
    "SKSN_ADGL_A":{
        audio:"ext:时空枢纽:2",
        global:["SKSN_ADGL_A_enabl"],
        ai:{
            threaten:3,
        }
    },
    "SKSN_ADGL_A_enabl":{
        audio:"ext:时空枢纽:2",
        enable:'phaseUse',
        position:'he',
        discard:false,
        lose:false,
        usable:1,
        filter:function(event,player){
            return game.hasPlayer(function(current){
                return current!=player&&
                current.hasSkill('SKSN_ADGL_A');
            });
        },
        selectTarget:[1,1],
        filterTarget:function(card,player,target){
            return player!=target&&
            target.hasSkill('SKSN_ADGL_A');
        },
        selectCard:[1,1],
        filterCard:function(card){
            return true;
        },
        check:function(card){
            return 15-get.value(card);
        },
        prompt:"选择将一张牌交给一名角色",
        content:function(){
            'step 0'
            player.logSkill('SKSN_ADGL_A');
            player.give(cards,targets[0]);
            event.gsuit = get.suit(cards[0]);
            'step 1'
            var att = get.attitude(targets[0],player);
            targets[0].chooseBool("是否展示牌堆顶的八张牌，并令其获得花色与其相同的牌？")
                .set('ai',function(){
                    return att>0;
                });
            'step 2'
            if(result.bool){ 
                event.scards=get.cards(8);
                player.showCards(event.scards,"求真");
                event.gcards = [];
                for(var i=0;i<event.scards.length;i++){
                    if(get.suit(event.scards[i]) == event.gsuit){
                        event.gcards.push(event.scards[i]);
                    }
                }
                for(var i=0;i<event.gcards.length;i++){
                    event.scards.remove(event.gcards[i]);
                }
            game.cardsDiscard(event.scards);
            player.gain(event.gcards,'draw');
            }
        },
        ai:{
            order:12,
            result:{
                player:function(player,target){
                    return get.attitude(player,target)>0?1:-1;
                },
                target:1,
            }
        }
    },
    "SKSN_ADGL_B":{
        audio:"ext:时空枢纽:3",
        trigger:{
            player:'damageEnd',
        },
        priority:596,
        filter:function(event,player){
            if(event.cards && event.cards.length){
                for(var i=0;i<event.cards.length;i++){
                    if(get.position(event.cards[i],true) != 'o'){
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        check:function(event,player){
            return get.type(event.cards[0]) == 'trick';
        },
        prompt:function(event,player){
            return "是否将"+get.translation(event.cards)+"放在牌堆底？";
        },
        content:function() {
            for(var i=0;i<trigger.cards.length;i++){
                trigger.cards[i].fix();
                ui.cardPile.appendChild(trigger.cards[i]);
            }
            game.log(player,'将',trigger.cards,'放在了牌堆底。');
            player.draw();
        },
        group:["SKSN_ADGL_B_draw"],
        subSkill:{
            draw:{
            sub:true,
            trigger:{
                global:'drawBegin',
            },
            priority:595,
            audio:"ext:时空枢纽:3",
            filter:function(event,player){
                var evt = event.getParent();
                    return evt.name == 'phaseDraw';
                },
                prompt:function(event,player){
                    return "是否令"+get.translation(event.player)+"从牌堆底摸牌？";
                },
                content:function() {
                    trigger.bottom=true;
                }
            }   
        },
        ai:{
            maixie:true,
            threaten:3,
        }
    },
    "SKSN_ADGL_C":{
        audio:"ext:时空枢纽:1",
        trigger:{
            player:'die',
        },
        direct:true,
        forceDie:true,
        priority:597,
        skillAnimation:true,
        animationColor:'gray',
        animationStr:"意志传承",
        content:function(){
            'step 0'
            player.chooseTarget("死志：请选择令其获得技能的角色。")
                .set('forceDie',true)
                .set('ai',function(target){
                    return get.attitude(player,target);
                });
            'step 1'
            if(result && result.targets && result.targets.length){
                event.tar = result.targets[0];
                player.chooseControl(["SKSN_ADGL_B","SKSN_ADGL_A"]).set("prompt","请选择令"+get.translation(result.targets[0])+"获得的技能？")
                .set('forceDie',true)
                .set('ai',function(){
                    return ["SKSN_ADGL_B","SKSN_ADGL_A"].randomGet();
                });
            }else{
                event.finish();
            }
            'step 2'
            if(result && result.control){
                event.tar.addSkill(result.control);
                game.log(event.tar,'获得了技能',result.control);
                player.logSkill('SKSN_ADGL_C');
                player.say("从此把握自己的命运吧，别浪费了我的牺牲");
            }
        }
    },
//————杰西.弗雷查————//
"sksn_shouji":{
	audio:"ext:时空枢纽:2",
	trigger:{
		global:"dieAfter",
		player:"phaseZhunbeiBegin",
		source:"damageAfter",
	},
	forced:true,
	filter:function (event,player,onrewrite){
		if(onrewrite=='dieAfter') return event.player!=player;
		return true;
	},
	content:function (){
		var onrewrite=event.triggername;
		if(onrewrite=='dieAfter'&&trigger.source==player){
			var card=game.createCard({name:'sksnC_cailiaoSenior'});
		}else{
			var card=game.createCard({name:'sksnC_cailiaoBasic'});
		}
		if(card){
			player.gain(card,'gain2','log');
		}
	},
},
"sksn_zhizuo":{
	audio:"ext:时空枢纽:2",
	enable:"phaseUse",
	filter:function (event,player){
		if(player.countCards('h','sksnC_cailiaoBasic')>=2) return true;
		if(player.countCards('h','sksnC_cailiaoSenior')>=2) return true;
		return false;
	},
	filterCard:function (card){
		if(ui.selected.cards.length) return card.name==ui.selected.cards[0].name;
		return ['sksnC_cailiaoBasic','sksnC_cailiaoSenior'].contains(card.name);
	},
	complexCard:true,
	selectCard:2,
	discard:false,
	loseTo:'discardPile',
	prepare:function(cards,player){
		player.$throw(cards,1000);
		game.log(player,'将',cards,'置入了弃牌堆');
	},
	check:function (card){
		if(card.name=='sksnC_cailiaoSenior') return 5;
		return 2;
	},
	content:function (){
		"step 0"
		var num=0;
		switch(cards[0].name){
			case 'sksnC_cailiaoBasic':num=0.1;break;
			case 'sksnC_cailiaoSenior':num=0.05;break;
		};
		if(Math.random()<num){
			player.damage('nosource');
			player.gain(game.createCard({name:'sksnC_cailiaoBasic'}),'gain2','log');
			if(Math.random()>0.9) player.chat('倒霉');
			player.popup('失败','fire');
			game.log(player,'制作失败');
			event.finish();
		}
		"step 1"
		var num=Math.random(),bombname;
		if(cards[0].name=='sksnC_cailiaoBasic'){
			if(num<=0.35) bombname='sksnC_bombGrenade';//手榴弹
			if(num>0.35&&num<=0.55) bombname='sksnC_bombFire';//燃烧弹
			if(num>0.55&&num<=0.675) bombname='sksnC_bombTime';//定时炸弹
			if(num>0.675&&num<=0.8) bombname='sksnC_bombMine';//地雷
			if(num>0.8&&num<=0.9) bombname='sksnC_bombSmoke';//催泪瓦斯
			if(num>0.9&&num<=1) bombname='sksnC_bombAshes';//灰烬炸弹
		}
		if(cards[0].name=='sksnC_cailiaoSenior'){
			if(num<=0.3) bombname='sksnC_bombDragon';//龙息
			if(num>0.3&&num<=0.55) bombname='sksnC_bombWither';//凋灵之首
			if(num>0.55&&num<=0.8) bombname='sksnC_bombSuperBig';//终极炸弹
			if(num>0.8&&num<=1) bombname='sksnC_bombFixed';//定点炸弹
		}
		if(bombname){
			player.gain(game.createCard({name:bombname}),'gain2','log');
		}
	},
	ai:{
		order:2.9,
		result:{player:1},
		threaten:1.7,
	},
	derivation:['sksn_zhizuo_tip1','sksn_zhizuo_tip2'],
},
//————澜零————//
"sksn_zonghun":{
	audio:"ext:时空枢纽:4",
	trigger:{
		player:"useCardToTargeted",
	},
	forced:true,
    filter:function(event,player){
		if(!event.target) return false;
		if(event.target==player){
			if(get.SksnBUFFNum(player,'_sksn_buff_huihun')>=5) return false;
		}
        return true;
    },
	content:function (){
		"step 0"
		if(trigger.target==player){
			if(get.SksnBUFFNum(trigger.target,'_sksn_buff_huihun')<5){
				game.changeSksnBUFF(trigger.target,'_sksn_buff_huihun',1);
			}
			event.finish();
		}
		"step 1"
		var list=['回魂','凋零'];
		if(get.SksnBUFFNum(trigger.target,'_sksn_buff_huihun')>0){
			list.remove('凋零');
		}
		if(get.SksnBUFFNum(trigger.target,'_sksn_buff_diaoling')>0){
			list.remove('回魂');
		}
		if(list.length==2){
			var next=player.chooseControl(list);
            next.set('prompt','选择令'+get.translation(trigger.target)+'增加2层「<font color=olivedrab3>回魂</font>」或1层「<font color=slategrey>凋零</font>」');
            next.set('choice',get.attitude(player,trigger.target)<=0?1:0);
            next.set('ai',function(){
                return _status.event.choice;
            });
		}else if(list.length==1){
			event._result={control:list[0]};
		}else event.finish();
		"step 2"
		switch(result.control){
			case '回魂':{
				var num1=Math.min(5-get.SksnBUFFNum(trigger.target,'_sksn_buff_huihun'),2);
				if(num1>0) game.changeSksnBUFF(trigger.target,'_sksn_buff_huihun',num1);
				break;
			};
			case '凋零':{
				var num1=Math.min(5-get.SksnBUFFNum(trigger.target,'_sksn_buff_diaoling'),1);
				if(num1>0) game.changeSksnBUFF(trigger.target,'_sksn_buff_diaoling',num1);
				break;
			};
		}
	},
	derivation:["sksn_buff_huihun_name","sksn_buff_diaoling_name"],
},
//————新田布止————//
 "sksn_yineng":{
    init:function (player){
        player.storage.sksn_yineng=0;
    },
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yineng.jpg>",
    intro:{
        name:"<font color=cyan>异能</font>",
        content:"<b>本回合已发动#次</b>",
    },
    audio:"ext:时空枢纽:6",
    group:["sksn_yineng_one","sksn_yineng_two"],
    subSkill:{
        one:{
            trigger:{
                player:"useCardAfter",
            },
            forced:true,
            filter:function(event,player){
        return get.type(event.card,'trick')=='trick'&&
            _status.currentPhase==player;
        },
            content:function(){
        'step 0'
        player.storage.sksn_yineng++;
        player.markSkill('sksn_yineng');
        player.syncStorage('sksn_yineng');
        var list=get.gainableSkills(function(info){
        if(typeof info.enable=='string') return info.enable=='phaseUse';
        if(Array.isArray(info.enable)) return info.enable.contains('phaseUse');
        },player);
        list.remove(player.getSkills());
        list=list.randomGets(3);
        event.skillai=function(){
            return get.max(list,get.skillRank,'item');
        };
        if(event.isMine()){
        var dialog=ui.create.dialog('forcebutton');
        dialog.add('异能：选择获得一项技能');
        var clickItem=function(){
            _status.event._result=this.link;
            dialog.close();
            game.resume();
        };
        for(var i=0;i<list.length;i++){
            if(lib.translate[list[i]+'_info']){
                var translation=get.translation(list[i]);
                if(translation[0]=='新'&&
                translation.length==3){
                    translation=translation.slice(1,3);
                }
                else{
                    translation=translation.slice(0,2);
                }
                var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                item.firstChild.addEventListener('click',clickItem);
                item.firstChild.link=list[i];
                }
            }
        dialog.add(ui.create.div('.placeholder'));
        event.switchToAuto=function(){
            event._result=event.skillai();
            dialog.close();
            game.resume();
        };
        _status.imchoosing=true;
        game.pause();
    }
    else{
        event._result=event.skillai();
    }
    'step 1'
    _status.imchoosing=false;
    var link=result;
    player.addTempSkill(link,'phaseUseAfter');
    player.popup(link);
    player.flashAvatar('gwfengchi',link);
    game.log(player,'获得了技能','【'+get.translation(link)+'】');
    game.delay();
    player.logSkill('sksn_yineng');
        },
            sub:true,
        },
        two:{
            trigger:{
                player:"phaseAfter",
            },
            priority:648,
            forced:true,
            direct:true,
            filter:function(event,player){
            return player.storage.sksn_yineng>0;
        },
            content:function(){
        if(player.storage.sksn_yineng<=player.maxHp){
        player.logSkill('sksn_yineng');
        var word=['看见了星辰，也看见了你','光，不会断绝'].randomGet(); 
        player.say(word);
        player.draw(player.storage.sksn_yineng);
        }
        player.storage.sksn_yineng=0;
        player.markSkill('sksn_yineng');
        player.syncStorage('sksn_yineng');
            },
            sub:true,
        },
    },
},
//艾萝依
"sksn_huanmo":{
	audio:"ext:时空枢纽:4",
	mark:true,
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yhuanmo.jpg>",
	intro:{
		name:"星辰",
		content:"mark",
	},
	trigger:{
		player:"damageAfter",
		global:["phaseBegin","phaseEnd"],
	},
	forced:true,
	filter:function (event,player,onrewrite){
		if(onrewrite=='phaseBegin') return player.countMark('sksn_huanmo')>=3;
		return true;
	},
	content:function (){
		var onrewrite=event.triggername;
		if(onrewrite!='phaseBegin'){
			player.addMark('sksn_huanmo',1);
		}else if(player.countMark('sksn_huanmo')>=3&&!player.hasSkill('subplayer')){
			var n=['hy','xy','ym'].randomGet();
			switch(n){
				case 'hy':player.$skill('魔种召唤<br>海妖','legend','water');break;
				case 'xy':player.$skill('魔种召唤<br>虚影','legend','thunder');break;
				case 'ym':player.$skill('魔种召唤<br>炎魔','legend','fire');break;
			};
			var subPlayer=player.storage['sksn_huanmo_'+n];
			if(subPlayer){
				player.callSubPlayer(subPlayer);
			}else{
				player.popup('召唤失败','thunder');
				game.log('然而什么也没有发生');
			}
		}
	},
	group:["sksn_huanmo_start","sksn_huanmo_exit"],
	subSkill:{
		start:{
			trigger:{
				global:"gameDrawAfter",
				player:"enterGame",
			},
			forced:true,
			content:function(){
				player.addMark('sksn_huanmo',3);
				if(!player.storage['sksn_huanmo_hy']){
					player.storage['sksn_huanmo_hy']=player.addSubPlayer({
						name:'sksn_ailuoyi_hy',
						sex:'female',
						hp:2,
						maxHp:2,
						hs:get.cards(4),
						skills:['sksn_hy_meiyin','sksn_huanmo_dying'],
						skill:'sksn_huanmo',
						intro:'该随从进入濒死状态时终止濒死结算并切换回本体'
					});//海妖
				}
				if(!player.storage['sksn_huanmo_xy']){
					player.storage['sksn_huanmo_xy']=player.addSubPlayer({
						name:'sksn_ailuoyi_xy',
						sex:'none',
						hp:3,
						maxHp:3,
						hs:get.cards(3),
						skills:['sksn_xy_shihun','sksn_huanmo_dying'],
						skill:'sksn_huanmo',
						intro:'该随从进入濒死状态时终止濒死结算并切换回本体'
					});//虚影
				}
				if(!player.storage['sksn_huanmo_ym']){
					player.storage['sksn_huanmo_ym']=player.addSubPlayer({
						name:'sksn_ailuoyi_ym',
						sex:'male',
						hp:2,
						maxHp:2,
						hs:get.cards(3),
						skills:['sksn_ym_yanyu','sksn_huanmo_dying'],
						skill:'sksn_huanmo',
						intro:'该随从进入濒死状态时终止濒死结算并切换回本体'
					});//炎魔
				}
			},
			sub:true,
		},
		exit:{
			trigger:{player:"sksn_huanmo_dyingAfter"},
			forced:true,
			content:function (){
				player.removeMark('sksn_huanmo',3);
				player.loseHp();
			},
			sub:true,
		},
		dying:{
			trigger:{player:"dyingBegin"},
			forced:true,
			silent:true,
			priority:10,
			content:function (){
				player.recover(player.maxHp-player.hp);
				player.exitSubPlayer();
			},
			sub:true,
		},
		hy:{sub:true},xy:{sub:true},ym:{sub:true},
	}
},
"sksn_hy_meiyin":{
	audio:"ext:时空枢纽:1",
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_meiyin.jpg>",
	intro:{
		name:"魅音",
		content:"mark",
	},
	init:function (player){
		if(player.storage['sksn_hy_meiyin']) player.markSkill('sksn_hy_meiyin');
	},
	trigger:{
		player:"damageBefore",
		source:"damageAfter",
	},
	forced:true,
	filter:function (event,player,onrewrite){
		if(onrewrite=='damageAfter') return player.countMark('sksn_hy_meiyin')>1;
		return true;
	},
	content:function (){
		var onrewrite=event.triggername;
		var count=player.countMark('sksn_hy_meiyin');
		if(onrewrite=="damageBefore"){
			if(trigger.num>count){
				trigger.cancel();
				player.addMark('sksn_hy_meiyin',1);
			}else{
				player.draw(count);
			}
		}else if(count>1){
			player.removeMark('sksn_hy_meiyin',1);
		}
	},
},
"sksn_xy_shihun":{
	audio:"ext:时空枢纽:1",
	mod:{
		globalFrom:function(from,to){
			if(from.hp<=to.hp) return -Infinity;
		},
		cardname:function (card,player){
			if(get.color(card)=='red') return 'shan'; 
			if(get.color(card)=='black') return 'sha';
		},
		cardnature:function (card,player){
			if(get.color(card)=='black') return 'thunder';
		},
		maxHandcard:function (player,num){
			return num+player.hp;
		},
	},
	trigger:{
		source:"damageEnd",
	},
	forced:true,
	filter:function (event,player){
		return event.player!=player;
	},
	content:function (){
        player.draw();
        player.discardPlayerCard(trigger.player,'he',1,true);
	},
},
"sksn_ym_yanyu":{
	audio:"ext:时空枢纽:1",
	trigger:{
		player:"damageBegin",
	},
	forced:true,
	direct:true,
	filter:function (event,player){
		if(event.type=='sksn_ym_yanyu') return false;
		return event.num>0&&event.nature&&event.nature=='fire';
	},
	content:function (){
		"step 0"
		var num=trigger.num;
		player.draw(num);
		var next=player.chooseTarget([1,num],true);
		next.set('filterTarget',lib.filter.notMe);
		next.set('ai',function(target){
			return get.damageEffect(target,_status.event.player,_status.event.player,'fire');
		});
		next.set('prompt','炎狱：请选择为你分担伤害的角色');
		"step 1"
		if(result.targets){
			event.targets=result.targets;
			player.logSkill('sksn_ym_yanyu',event.targets);
			trigger.num-=event.targets.length;
		}else event.finish();
		"step 2"
		if(event.targets.length){
			event.targets.shift().damage('fire',trigger.source||'nosource');
			event.redo();
		}
		"step 3"
		if(trigger.num==0){
			trigger.untrigger();
			trigger.finish();
		}
	},
	ai:{
		maixie:true,
		maixie_hp:true,
		threaten:1.4,
		effect:{
			target:function(card,player,target){
				if(get.tag(card,'fireDamage')){
					if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
					return [0,2];
				}
			},
		},
	},
	group:["sksn_ym_yanyu_autotomy"],
	subSkill:{
		autotomy:{audio:"ext:时空枢纽:1",
			trigger:{player:"phaseUseEnd"},
			forced:true,
			content:function (){
				var num=[0,1,2].randomGet();
				if(num>0) player.damage('fire',num);
				else game.log('然而什么也没有发生');
			},
			sub:true,
		},
	},
},
//————塞缪尔————//    
"SKSN_SME_A":{
                trigger:{
                    global:"useCardToTargeted",
                },
                audio:"ext:时空枢纽:2",
                filter:function (event,player){
        return get.itemtype(event.cards)=='cards'&&
        event.card&&
        event.player!=player&&
        event.target==player&&
        (get.type(event.card)=='trick'||get.type(event.card)=='basic')&&
        get.info(event.card).multitarget!=true&&
        player.canUse(event.card,event.player,false,false);
    },
                forced:true,
                priority:354,
                content:function (){   
        player.useCard(trigger.card,trigger.player,false,false);
    },
            ai:{
                    effect:{
                        target:function(card,player,target,current){
                            if((get.type(card)=='trick'||get.type(card)=='basic')&&
                            card.name!='jiedao'&&
                            card.name!='shengdong'&&
                            get.attitude(player,target)<0){
                                return 0.5;
                            }
                        }
                    }
                }
            },
"SKSN_SME_B":{
                trigger:{
                    source:"damageEnd",
                },
                audio:"ext:时空枢纽:2",
                skillAnimation:true,
                animationColor:"metal",
                animationStr:"圣光裁决",
                priority:365,
                direct:true,
                filter:function (event,player){
        return player.countCards('h')&&!player.hasSkill('SKSN_SME_B_1');
    },
                content:function (){
        'step 0'
        var n=0;
        var m=0;
        var player=_status.event.player;
        player.countCards('h',function(card){
        m+=get.value(card);
        });
        game.countPlayer(function(current){
                if(current!=player&&get.distance(player,current)<=1&&get.attitude(player,current)<0) n+=8;
                    });
        player.chooseTarget(get.prompt2('SKSN_SME_B'),[1,player.countCards('h')],function(card,player,target){
            return get.distance(player,target)<=1&&player!=target;
        }).set('ai',function(target){
            if(get.attitude(player,target)<0&&n>=m) return Infinity-target.help;
            return 0;
        });
        'step 1'
        if(result.bool){
            player.logSkill('SKSN_SME_B',result.targets);
            player.addTempSkill('SKSN_SME_B_1');
            player.chooseToDiscard('h',player.countCards('h'),true);
            for(var i=0;i<result.targets.length;i++){
                result.targets[i].damage('fire');
            }
        } 
    },
            },   
"SKSN_SME_B_1":{},
//————提隆·嘉尼奥————//
"sksn_bianshi":{
    audio:"ext:时空枢纽:2",
    zhuanhuanji:true,
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_bianshi.jpg>",
    intro:{
        content:function (storage){
            if(storage==true) return '出牌阶段限一次，你可以获得技能〖刺杀〗直到本回合结束。';
            return '出牌阶段限一次，你可以获得技能〖匿踪〗直到你下回合开始，然后你跳过下个弃牌阶段。';
        },
    },
    enable:"phaseUse",
    usable:1,
    content:function (){
        if(player.storage['sksn_bianshi']==true){
            player.storage['sksn_bianshi']=false;
            player.addTempSkill('sksn_cisha',{player:'phaseEnd'});
			player.setAvatar('sksn_jianiao','sksn_jianiao_a');
            //game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/时空枢纽/sksn_jianiao_a.jpg');
			player.$skill('刺杀状态','legend','metal');
            player.say('时机已到，猎杀开始！');
        }else{
            player.storage['sksn_bianshi']=true;
            player.addTempSkill('sksn_nizong',{player:'phaseBegin'});
            player.skip('phaseDiscard');
			player.setAvatar('sksn_jianiao','sksn_jianiao_b');
            //game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/时空枢纽/sksn_jianiao_b.jpg');
            player.$skill('隐匿状态','legend','metal');
            player.say('世界不是非黑即白，大多数人都行走在灰色地带');   
        }
    },
    ai:{
        order:function (card,player){
			if(player.storage['sksn_bianshi']!==true) return 0.1;
			return 9.5;
		},
        result:{
            player:1,
        },
        threaten:1.55,
    },
	derivation:["sksn_nizong","sksn_cisha","sksn_buff_fushang_name"],
},
"sksn_nizong":{
    mod:{
        targetEnabled:function(card,player,target){
            if(player!=target) return false;
        },
        playerEnabled:function(card,player,target){
            if(player!=target) return false;
        },
		cardSavable:function(card,player,target){
			if(player!=target) return false;
		},
    },
},
"sksn_cisha":{
    audio:"ext:时空枢纽:3",
    enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		return player.countCards('h');
	},
    filterTarget:lib.filter.notMe,
	filterCard:true,
	check:function (card){
		var target=ui.selected.targets[0]||undefined;
		var player=_status.event.player;
		var min=0,list=[];
		if(get.itemtype(target)=='player'){
			if(player.hasSkillTag('viewHandcard',null,target,true)){
				list=target.getCards('he');
			}else{
				list=target.getCards('e');
			}
			for(var i=0;i<list.length;i++){
				if(get.number(list[i])>min) min=get.number(list[i]);
			}
		}
		if((get.number(card)>min)) return 10-get.value(card);
		return 4-get.value(card);
	},
    content:function (){
        "step 0"
        var next=targets[0].chooseToDiscard('he');
		next.filterCard=function(card){
			return get.number(card)>_status.event.number;
		};
		next.ai=function(card){
			return 9-get.value(card);
		};
		next.set('prompt2','否则将受到一点伤害并增加三层「负伤」');
		next.set('number',get.number(cards[0]));
        "step 1"
        if(result.bool!=true){
			targets[0].damage();
			game.changeSksnBUFF(targets[0],"_sksn_buff_fushang",3);
			var word=['再见了弱者！','准备向这个世界告别吧！'].randomGet();
        }else{
			var word=['就差一点','我还会再回来的...'].randomGet();
		}
				player.say(word);
    },
    ai:{
        order:9.3,
        expose:1,
        result:{
            target:function(player,target){
				if(!target.countCards('he')) return -3;
				if(!target.countCards('h')) return -1.5;
				return -2/(target.countCards('he')+1);
			},
        },
        threaten:1.2,
    },
},
"sksn_wumeng":{
	mod:{
		globalFrom:function(from,to,distance){
			if(to.hasSkill('sksn_wumeng_distance')) return distance-Infinity;
		},
	},
    locked:false,
	zhuSkill:true,
	unique:true,
    enable:"phaseUse",
    usable:1,
    audio:"ext:时空枢纽:2",
	filter:function(event,player){
		return player.hasZhuSkill('sksn_wumeng');
	},
    filterTarget:function (event,player,target){
        return player!=target&&target.group=='SK_king';
    },
	filterCard:true,
	discard:false,
	lose:false,
	check:function (card){
		return 7-get.value(card);
	},
	delay:false,
	content:function(){
		targets[0].gain(cards,player,'giveAuto');
		game.filterPlayer(function(current){
			if(targets[0].inRange(current)&&current!=player) current.addTempSkill('sksn_wumeng_distance');
		});
	},
    ai:{
        order:10,
        expose:1,
        result:{
            target:function (player,target){
				if(game.hasPlayer(function(current){
					return target.inRange(current)&&!player.inRange(current)&&
						get.attitude(player,current)<0;
				})) return 2;
			},
			player:function (player,target){
				if(player.countCards('h')<5) return 0;
				return 1;
			},
        },
        threaten:1.2,
    },
	subSkill:{
		distance:{
			mark:true,
			marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_wumeng.jpg>",
			intro:{
				name:"雾盟",
				content:"你逃不掉的...",
			},
			sub:true,
		},
	},
},
//————伊格诺斯————//
"sksn_chuansuo":{
    group:"sksn_chuansuo_mark",
    init:function (player){
        player.storage.sksn_chuansuo=1;
    },
    audio:"ext:时空枢纽:3",
    mark:true,
    marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_chuansuo.jpg>",
    intro:{
        name:"<font color=cyan><b>穿梭</b></font>",
        content:function(storage,player){
        var a=player.storage.sksn_chuansuo;
        var b=player.storage.sksn_benglie*20;
        if(player.hasSkill('sksn_benglie')) return '<b>当前崩裂能量为'+b+'%<br>当前可发动'+a+'次</b><br><br>「<font color=cyan>时空穿梭</font>」<br><li>出牌阶段，你可以与一名攻击距离内的角色交换位置，并补充<font color=cyan><b>20%</b></font>的<font color=cyan><b>能量</b></font>，然后目标需使用一张【<b>闪</b>】，否则你随机执行下列一项：①对目标造成一点雷属性伤害并且该技能的储备时间减少一回合<br><br>②获取目标一张牌<br><br><li><b>储备方式：</b><br>游戏开始时你储备一次该技能；每两回合储备一次该技能，最多储备三次';
        else if(!player.hasSkill('sksn_benglie')) return '<b>当前可发动'+a+'次</b><br><br>「<font color=cyan>时空穿梭</font>」<br><li>出牌阶段，你可以与一名攻击距离内的角色交换位置，并补充<font color=cyan><b>20%</b></font>的<font color=cyan><b>能量</b></font>，然后目标需使用一张【<b>闪</b>】，否则你随机执行下列一项：①对目标造成一点雷属性伤害并且该技能的储备时间减少一回合<br><br>②获取目标一张牌<br><br><li><b>储备方式：</b><br>游戏开始时你储备一次该技能；每两回合储备一次该技能，最多储备三次';
        },
    },
    enable:"phaseUse",
    prompt:"选择一名角色为目标",
    filter:function (event,player){
        return player.storage.sksn_chuansuo>0;
    },
    filterTarget:function (event,player,target){
        return player!=target&&
        get.distance(player,target,'attack')<=1;
    },
    content:function (){
           "step 0"
            game.swapSeat(player,target);
            var word=['距离不是问题','做好空间标记'].randomGet(); 
                player.say(word);    
            player.storage.sksn_chuansuo--;
            player.markSkill('sksn_chuansuo');
            player.syncStorage('sksn_chuansuo');
            if(player.hasSkill('sksn_benglie')&&player.storage.sksn_benglie<5){
                player.storage.sksn_benglie++;
                player.markSkill('sksn_benglie');
                player.syncStorage('sksn_benglie');
                var tim=player.storage.sksn_benglie*20;
                    game.log(player,'：能量<font color=cyan><b>',tim,'%</b></font>');
            }
           "step 1"
            var next=target.chooseToRespond({name:'shan'});
                next.set('ai',function(card){
            var evt=_status.event.getParent();
            if(ai.get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
            return 1;
            });    
            next.autochoose=lib.filter.autoRespondShan;
           "step 2"
            if(result.bool==false){
            var num=[1,2].randomGet(); 
            if(num==1) {
                player.storage.sksn_chuansuo_mark--;
                player.markSkill('sksn_chuansuo_mark');
                player.syncStorage('sksn_chuansuo_mark');
                if(player.storage.sksn_chuansuo_mark<1&&player.storage.sksn_chuansuo<3){
                    player.storage.sksn_chuansuo++;
                    player.markSkill('sksn_chuansuo');
                    player.syncStorage('sksn_chuansuo');
                    player.storage.sksn_chuansuo_mark=2;
                    player.markSkill('sksn_chuansuo_mark');
                    player.syncStorage('sksn_chuansuo_mark');
                    }
                target.damage('thunder');
                }
        if(num==2) {
            if(target.countCards('he')>=1){
                player.gainPlayerCard(target,'he',true);
            }
            else if(target.countCards('he')<1){
                target.damage('thunder');
                player.storage.sksn_chuansuo_mark--;
                player.markSkill('sksn_chuansuo_mark');
                player.syncStorage('sksn_chuansuo_mark');
                if(player.storage.sksn_chuansuo_mark<1&&player.storage.sksn_chuansuo<3){
                    player.storage.sksn_chuansuo++;
                    player.markSkill('sksn_chuansuo');
                    player.syncStorage('sksn_chuansuo');
                    player.storage.sksn_chuansuo_mark=2;
                    player.markSkill('sksn_chuansuo_mark');
                    player.syncStorage('sksn_chuansuo_mark');
                }
            }
        }
    };   
},
    ai:{
        order:9,
        result:{
            player:function (player,target){
        var att=get.attitude(player,target);
        if(target==player.previous&&att>0) return att;
        else if(target==player.previous&&att<0&&
        player.storage.sksn_chuansuo>1) return 5;
        if(target==player.next&&att<0) return -att;
        var att2=get.attitude(player,player.next);
        if(target==player.next.next&&att<0&&att2<0) return -att-att2;
        return 0;
            },
        },
    },
    subSkill:{
        mark:{
            init:function (player){
            player.storage.sksn_chuansuo_mark=2;
            },
            trigger:{
                player:"phaseBegin",
            },
            forced:true,
            priority:164,
            content:function (){
                if(player.storage.sksn_chuansuo<3){
                    player.storage.sksn_chuansuo_mark--;
                    player.markSkill('sksn_chuansuo_mark');
                    player.syncStorage('sksn_chuansuo_mark');
                    var tim=player.storage.sksn_chuansuo_mark;
                    if(tim>0) game.log(player,'的<font color=turquoise2><b>穿梭</b></font>储备时间剩余<b><font color=turquoise2>',tim,'</font></b>回合');
                }
                if(player.storage.sksn_chuansuo_mark<1){
                    player.storage.sksn_chuansuo++;
                    player.markSkill('sksn_chuansuo');
                    player.syncStorage('sksn_chuansuo');
                    var num=player.storage.sksn_chuansuo;
                    game.log(player,'的<font color=turquoise2><b>穿梭</b></font>已储备<b><font color=cyan>',num,'</font></b>次');
                    player.storage.sksn_chuansuo_mark=2;
                    player.markSkill('sksn_chuansuo_mark');
                    player.syncStorage('sksn_chuansuo_mark');
                    if(tim>0) game.log(player,'的<font color=turquoise2><b>穿梭</b></font>储备时间剩余<b><font color=turquoise2>',tim,'</font></b>回合');
                }
            },
            sub:true,
        },
    },
},
"sksn_benglie":{
    group:"sksn_benglie_mark",
    init:function (player){
        player.storage.sksn_benglie=0;
    },
    direct:true,
    trigger:{
        player:"phaseAfter",
    },
    filter:function (event,player){
        return player.storage.sksn_benglie>=5&&
            !player.hasSkill('sksn_benglie_begin');
    },
    content:function (){
        'step 0'
        player.chooseTarget(get.prompt('sksn_benglie'),'是否选择锁定一名角色为目标',
            function(event,player,target){
            return target!=player;
        }).set('ai',function(target){
            return get.attitude(player,target)<=0;
        });
        'step 1'
        if(result.bool){
        var target=result.targets[0];
            player.line(target,'green');
            var word=['永远不要给敌人喘息的机会','目标锁定！'].randomGet(); 
                player.say(word);    
            player.logSkill('sksn_benglie_target');
            player.storage.sksn_benglie=0;
            player.markSkill('sksn_benglie');
            player.syncStorage('sksn_benglie');
            player.addSkill('sksn_benglie_begin');
            player.storage.target=target;
            target.addSkill('sksn_benglie_target');
            game.log(player,'将',target,'锁定为<font color=cyan><b>崩裂</b></font>的目标');
        }
    },
    ai:{
        order:5.5,
        result:{
            player:function (player){
                if(player.hp<player.maxHp) return 4;
                if(player.countCards('h')>player.hp) return 0
                return -1;
            },
            target:4,
        },
        threaten:2,
    },
    subSkill:{
        mark:{
            trigger:{
                source:"damageAfter",
            },
            forced:true,
            priority:518,
            filter:function (event,player){
                return player.storage.sksn_benglie<5;
            },
            content:function (){
                var num=trigger.num;
                player.storage.sksn_benglie+=num;
                player.markSkill('sksn_benglie');
                player.syncStorage('sksn_benglie');
                var ski=player.storage.sksn_benglie;
                if (ski>5){
                    player.storage.sksn_benglie=5;
                    player.markSkill('sksn_benglie');
                    player.syncStorage('sksn_benglie');
                }
                var tim=player.storage.sksn_benglie*20;
                game.log(player,'：能量<font color=cyan><b>',tim,'%</b></font>');
            },
            sub:true,
        },
        target:{
            audio:"ext:时空枢纽:2",
            mark:true,
            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_benglie.jpg>",
            unique:true,
            charlotte:true,
            intro:{
                content:"「<font color=cyan>时空崩裂</font>」<br><li>被标记为<font color=cyan><b>崩裂</b></font>的目标",
            },
            sub:true,
        },
        begin:{
            skillAnimation:true,
            animationColor:"water",
            animationStr:"时空崩裂",
            trigger:{
                player:"phaseBegin",
            },
            audio:"ext:时空枢纽:1",
            forced:true,
            mark:true,
            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_benglie2.jpg>",
            intro:{
                content:"「<font color=cyan>时空崩裂</font>」<br><li><b>锁定技</b>，回合开始时，你将移动至被标记角色的身边，并对其造成x点伤害（x为该角色的已损失体力值，至少为一）若该角色因此进入濒死状态，则你直接将<font color=cyan><b>能量</b></font>补充至<font color=cyan><b>100%</b></font>，并令技能<font color=turquoise2><b>穿梭</b></font>直接储备两次",
            },
            content:function (){    
            var target0=player.storage.target;
                player.line(target0,'green');
                var a=0;
            for(var i=0;i<game.players.length;i++){
                if(game.players[i]==player){
                    var p=i;
                }
                if(game.players[i]==target0){
                    var t=i;
                }
            }
            var a=t-p;
                if(a<0) var a=-a;
                var a2=game.players.length*0.5;
                if(target0==player.previous){
                    game.swapSeat(player,target0);
            }
            else {
                if(a2<=a) {
            var stop=0;
            for(var i=0;i<game.players.length;i++){
                if(player.next!=target0){
                game.swapSeat(player,player.next);
                }
            }
        }
            else {
            for(var i=0;i<game.players.length;i++){
                if(player.previous!=target0){
                game.swapSeat(player,player.next);
                }
            }
        }
    }            
            game.log(player,'：<font color=cyan><b>你逃不出我的时空！</b></font>');
            player.say("你逃不出我的时空！");
            var nh=target0.hp;
            var nm=target0.maxHp;
            var num=nm-nh;
                target0.removeSkill('sksn_benglie_target');
                if(num<=0) var num=1;
            var hurt=num;
                if(hurt>=target0.hp) {
                    player.storage.sksn_benglie=5;
                    player.markSkill('sksn_benglie');
                    player.syncStorage('sksn_benglie');
                    var tim=player.storage.sksn_benglie*20;
                    game.log(player,'：能量<font color=cyan><b>',tim,'%</b></font>');
                if(player.hasSkill('sksn_chuansuo')&&player.storage.sksn_chuansuo<3){
                    player.storage.sksn_chuansuo+=2;
                    player.markSkill('sksn_chuansuo');
                    player.syncStorage('sksn_chuansuo');
                }
                if(player.hasSkill('sksn_chuansuo')&&player.storage.sksn_chuansuo>3){
                    player.storage.sksn_chuansuo=3;
                    player.markSkill('sksn_chuansuo');
                    player.syncStorage('sksn_chuansuo');
                    }
                var ski=player.storage.sksn_chuansuo;
                game.log(player,'的<font color=turquoise2><b>穿梭</b></font>已储备<b><font color=cyan>',ski,'</font></b>次');
                }
            target0.damage(num,'thunder');
            player.removeSkill('sksn_benglie_begin');
            },
            ai:{
                threaten:1.3,
            },
            sub:true,
        },
    },
},
//————兰伯特————//
"sksn_jiansheng":{
    audio:"ext:时空枢纽:2",
    trigger:{
        global:"phaseEnd",
    },
    filter:function(event,player){
        return player.getHistory('sourceDamage').length>0;
    },
    content:function(){
        var word=['各取所需而已','正义？不过是胜利的又一个别称'].randomGet(); 
            player.say(word);           
        player.drawTo(player.hp);
    },
},
"sksn_yanfan":{
	audio:"ext:时空枢纽:2",
	trigger:{
		target:"useCardToBefore",
	},
	direct:true,
	filter:function(event,player){
		if(player.hasSkill('sksn_yanfan_off')) return false;
		if(!player.countCards('he')) return false;
		return event.targets.length==1&&event.player!=player;
	},
	content:function(){
		"step 0"
		var next=player.chooseToDiscard('he').set('ai',function(card){
			var playerx=_status.event.player;var source=trigger.player;
			if(get.effect(playerx,trigger.card,source,playerx)>0) return 0;
			return 10-get.value(card);
		}).set('prompt',get.prompt('sksn_yanfan')).set('logSkill',['sksn_yanfan',trigger.player]);
		next.set('prompt2','将'+get.translation(trigger.card)+'的使用者改为你，令'+get.translation(trigger.player)+'成为此牌的目标');
		"step 1"
		if(result.bool){
			player.addTempSkill('sksn_yanfan_off');
			var word=['哼哼，雕虫小技而已','就只有这点能耐吗','你就像我那愚蠢的徒弟一样'].randomGet(); 
				player.say(word);
			trigger.target=trigger.player;
			trigger.player=player;
			trigger.untrigger();
			trigger.trigger('useCardToBefore');
			game.log(player,'反弹了',trigger.player,'对其使用的',trigger.card);
		}
    },
    subSkill:{off:{sub:true},
    },
},
//————艾德华————//
"sksn_pianshu":{
    audio:"ext:时空枢纽:2",
    enable:"phaseUse",
	filter:function (event,player){
		if((player.getStat().skill.sksn_pianshu||0)>=player.hp) return false;
		if(!game.hasPlayer(function(current){
			return player!=current&&!current.hasSkill('sksn_pianshu_mark');
		})) return false;
		return player.countCards('h');
	},
    filterTarget:function (card,player,target){
        return player!=target&&!target.hasSkill('sksn_pianshu_mark');
    },
    filterCard:true,
    selectCard:[1,2],
	discard:false,
	lose:false,
	delay:false,
    check:function(card){
		if(ui.selected.cards.length&&ui.selected.cards.length==1) return 0;
        return 6-ai.get.value(card);
    },
    content:function(){
		"step 0"
		targets[0].gain(cards,player,'giveAuto');
		targets[0].addTempSkill('sksn_pianshu_mark');
		"step 1"
		var num1=targets[0].countCards('h');
		targets[0].discard(targets[0].getCards('h'));
		targets[0].draw(num1);
		"step 2"
		if(!targets[0].countCards('he')) event.finish();
		"step 3"
		targets[0].showHandcards();
		event.num2=targets[0].countCards('h',{type:'trick'});
		var num2=event.num2;
		targets[0].chooseControl().set('choiceList',[
			'令'+get.translation(player)+'获得你'+num2+'张牌',
			'你增加2层「束缚」'
		]).set('ai',function(event,player){
			if(player.hasSkillTag('immSksnBUFF')) return 1;
			if(player.hp<=1||num2==0) return 0;
			if(num2==player.countCards('h')) return 1;
			var cards=player.getCards('h'),valueAve=0;
			for(var i=0;i<cards.length;i++){
				valueAve+=get.value(cards[i]);
				if(get.tag(cards[i],'save')) valueAve+=2;
			}
			if(valueAve/cards.length>6.8) return 1;
			if(num2>3) return 1;
			return 0;
		});
		"step 4"
		if(result.index==0){
			if(event.num2){
				player.gainPlayerCard(targets[0],'he',event.num2,true);
				if(Math.random()>0.1) targets[0].say('发生了什么？!');
			}
		}else{
			game.changeSksnBUFF(targets[0],"_sksn_buff_shufu",2);
			targets[0].say('你对我做了什么？!');
		}
	},
    ai:{
        order:8.8,
        expose:0.3,
        threaten:1.8,
        result:{
            target:function(player,target){
                return -target.num('h')-player.num('h','du');
            },
        },
    },
	derivation:["sksn_buff_shufu_name"],
    subSkill:{
        mark:{
            mark:true,
            marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_pianshu.jpg>",
            intro:{
                content:"吃一堑长一智",
            },
            sub:true,
        },
    },
},
"sksn_guaidao":{audio:"ext:时空枢纽:2",
	forced:true,
    ai:{
        effect:{
            target:function(card,player,target,current){                
                if(card.name=='sha'&&target.countCards('h')<=1) return [1,-2];            
            },
        },
    },
	group:["sksn_guaidao_before","sksn_guaidao_begin"],
	subSkill:{
		before:{
            audio:"ext:时空枢纽:2",
            trigger:{
                source:"damageBefore",
            },
            forced:true,
            filter:function (event){        
                return event.player.countCards('h')&&event.player.hasSkill('sksn_pianshu_mark');
            },
            content:function (){
                var word=['口袋里揣着把戏，袖子里藏着花招','自我保护，永恒的人生哲理'].randomGet(); 
					player.say(word);
				var num=trigger.num;
                player.gainPlayerCard(trigger.player,'h',num,true);    
            },
			sub:true,
		},
		begin:{
			audio:"ext:时空枢纽:2",
			trigger:{
				source:"damageBegin",
			},
			filter:function(event,player){            
				return !event.player.countCards('h');    
			},
			forced:true,
			content:function(){
				var word=['记住，我终究是个贵族','时刻保持绅士风度'].randomGet();
					player.say(word);
				var num=trigger.num;
				trigger.num+=num;
			},
			sub:true,
		},
	},
},
//————铁心————//
"sksn_jianghun":{
                audio:"ext:时空枢纽:6",
                trigger:{
                    player:"useCard",
                },
                frequent:true,
                filter:function (event,player){
        if(!player.isPhaseUsing()) return false;
        if(!['equip','trick'].contains(get.type2(event.card))) return true;
        return (player.getStat().skill.sksn_jianghun||0)<player.hp;
    },
                prompt:function (event,player){
        var count=player.hp-(player.getStat().skill.sksn_jianghun||0);
        var tip='（还剩'+count+'次';
        if(!['equip','trick'].contains(get.type2(event.card))){
            tip+='，可令剩余次数+1';
        }
        return get.prompt('sksn_jianghun')+tip+'）';
    },
                content:function (){
        "step 0"
        if(!player.getStat().skill.sksn_jianghun){
            player.getStat().skill.sksn_jianghun=0;
        }
        switch(get.type2(trigger.card)){
            case 'equip':{
                player.getStat().skill.sksn_jianghun++;
                player.draw();
                break;
            }
            case 'trick':{
                player.getStat().skill.sksn_jianghun++;
                var name=get.inpile('equip').randomGet();
                player.gain(game.createCard(name),'draw');
                break;
            }
            default:{
                player.getStat().skill.sksn_jianghun--;
            }
        }
        if(event.isMine()){
            if(!lib.config.autoskilllist.contains('sksn_jianghun')){
                event.dialog=ui.create.dialog('【匠魂】还剩'+(player.hp-player.getStat().skill.sksn_jianghun)+'次');
            }
            game.delayx(1);
        }
        "step 1"
        if(event.dialog) event.dialog.close();
    },
            },
            "sksn_zongjiang":{
                trigger:{
                    player:"equipBegin",
                },
                silent:true,
                forced:true,
                popup:false,
                priority:1,
                filter:function (event,player){
        var subtype=get.subtype(event.card);
        return ['equip1','equip2'].contains(subtype)&&player.countCards('e',{subtype:subtype});
    },
                content:function (){
        "step 0"
        trigger.untrigger();
        trigger.finish();
        event.card=trigger.card;
        var card=event.card;
        if(card.clone){
            game.broadcast(function(card,player){
                if(card.clone){
                    card.clone.moveDelete(player);
                }
            },card,player);
            card.clone.moveDelete(player);
            game.addVideo('gain2',player,get.cardsInfo([card.clone]));
        }
        if(lib.config.background_audio){
            game.playAudio('effect',get.subtype(trigger.card));
        }
        player.$equip(card);
        game.addVideo('equip',player,get.cardInfo(card));
        game.log(player,'装备了',card);
        "step 1"
        var card=event.card;
        var info=get.info(card);
        if(info.onEquip&&(!info.filterEquip||info.filterEquip(card,player))){
            var next=game.createEvent('equip_'+card.name);
            next.setContent(info.onEquip);
            next.player=player;
            next.trigger.card=card;
            game.delayx();
        }
        delete player.equiping;
    },
            },
//————影————//
    "YC":{
    skillAnimation:"epic",
    animationColor:"fire",
    audio:"ext:时空枢纽:2",
    mark:true,
    marktext:"<font color=red>终</font>",
    intro:{
        content:"「<font color=red>一击必杀</font>」<br><li><b>锁定技</b>，你的杀或决斗造成的伤害+x点，结算后失去此技能（x为目标当前体力值）",
    },
    trigger:{
        source:"damageBegin1",
    },
    filter:function(event){
        return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&
        event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
    },
    forced:true,    
    content:function(){
        var word=['一击必杀！','你已经进入了我的狩猎场'].randomGet();
        player.say(word);
        var num=trigger.player.hp;
            trigger.num=num+trigger.num;
        player.removeSkill("YC");
    },
 },               

    "SKSN_Y_B":{
    group:["SKSN_Y_B_mark"],
    init:function (player){
        player.storage.SKSN_Y_B=0;
    },
    trigger:{
        global:"phaseAfter",
    },
    audio:"ext:时空枢纽:2",
    forced:true,
    priority:439,
    filter:function (event,player){
        return player.storage.SKSN_Y_B>0;
    },
    content:function (){
        'step 0'
        player.storage.SKSN_Y_B=0;
        player.markSkill('SKSN_Y_B');
        player.syncStorage('SKSN_Y_B');
        'step 1'
        var word=['刀锋所划之地，便是疆土','收割开始'].randomGet();
            player.say(word);
        player.insertPhase();
        if(player.countCards('h')<player.hp){
            player.draw(player.hp-player.countCards('h'));
        }
    },
    subSkill:{
        mark:{
        trigger:{
            source:"dyingBegin",
        },
        round:1,
        forced:true,
        priority:438,
        filter:function (event,player){
            return player.storage.SKSN_Y_B<1;
        },
        content:function (){
            player.storage.SKSN_Y_B=1;
            player.markSkill('SKSN_Y_B');
            player.syncStorage('SKSN_Y_B');
            },
            sub:true,
        },
    },
},
   "SKSN_Y_A":{
        group:["SKSN_Y_A_mark"],
        init:function (player){
            player.storage.SKSN_Y_A=0;
        },
        audio:"ext:时空枢纽:2",
        mark:true,
        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_yingshou.jpg>",
        intro:{
            name:"<font color=red>影狩</font>",
            content:"当前已发动#次</b>",
        },
        trigger:{
            player:"phaseUseAfter",
        },
        priority:509,
        direct:true,
        filter:function (event,player){
            return player.storage.SKSN_Y_A>0;
        },
        content:function(){
            if(player.storage.SKSN_Y_A>=player.maxHp){
                player.chooseUseTarget('###【影狩】###是否视为使用一张没有距离限制的【杀】',{name:'sha'},false,'nodistance').logSkill='SKSN_Y_A';
                var word=['了无遗憾的离开吧','补刀的时刻！'].randomGet();
                    player.say(word);
            }
            player.storage.SKSN_Y_A=0;
            player.markSkill('SKSN_Y_A');
            player.syncStorage('SKSN_Y_A');
        },
        ai:{
            threaten:function(player,target){
                return 1.6;
            },
        },
    subSkill:{
        mark:{
            trigger:{
                player:"useCardAfter",
            },
            audio:"ext:时空枢纽:2",
            forced:true,
            priority:508,
            filter:function (event,player){
                return get.itemtype(event.cards)=='cards'&&
                player.storage.SKSN_Y_A<player.maxHp&&
                _status.currentPhase==player;
            },
            content:function (){
                player.storage.SKSN_Y_A++;
                player.markSkill('SKSN_Y_A');
                player.syncStorage('SKSN_Y_A');
                if(player.countCards('h')>=1){      
                    player.chooseToDiscard('###【影狩】###选择一张手牌进行重铸',1,'h',true);
                    player.draw();
                    var word=['一个人，没有同类','替你的生命倒数'].randomGet();
                        player.say(word);
                }
            },
            sub:true,
            },
        },
    },

//拆弹与合成
"sksn_hecheng":{
	enable:"phaseUse",
	filter:function (event,player){
		if(player.countCards('h','sksnC_cailiaoBasic')>=3) return true;
		return false;
	},
	filterCard:function (card,player){
		if(ui.selected.cards.length){
			return card.name==ui.selected.cards[0].name;
		}
		if(card.name=='sksnC_cailiaoBasic') return true;
		return false;
	},
	selectCard:function (card){
		if(ui.selected.cards.length){
			switch(ui.selected.cards[0].name){
				case 'sksnC_cailiaoBasic':return 3;
			}
		}
		return [1,Infinity];
	},
	discard:false,
	loseTo:'discardPile',
	prepare:function(cards,player){
		player.$throw(cards,1000);
		game.log(player,'将',cards,'置入了弃牌堆');
	},
	check:function(card){
		var map={
			'sksnC_cailiaoBasic':5,
		};
		return map[card.name];
	},
	content:function (){
		"step 0"
		var list=[];
		if(cards[0].name=='sksnC_cailiaoBasic'){
			list.push(['材料','','sksnC_cailiaoSenior']);
		}
		event.list=list;
		"step 1"
		if(event.list.length==1){
			event._result={links:[event.list[0]]};
		}else{
			var next=player.chooseButton(['请选择要合成的牌：'[event.list,'vcard']]);
			next.set('ai',function(button){
				var player=_status.event.player;
				switch(button.link[2]){
					case 'sksnC_cailiaoSenior':{
						if(player.countCards('h','sksnC_cailiaoSenior')<2) return 2;
						break;
					}
				}
				return Math.random();
			});
			next.set('forced',true);
		}
		"step 2"
		if(result.links){
			player.gain(game.createCard({name:result.links[0][2]}),'gain2');
		}
	},
	ai:{
		order:3,
		result:{player:1},
	},
},
"sksn_bombChai":{
	mark:true,
	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_caidan.jpg>",
	intro:{
		mark:function(dialog,storage,player){
			dialog.addText('当前有效炸弹：');
			dialog.add([[['炸弹','',storage.bomb[0].name]],'vcard']);
			dialog.addText('数字标记：'+storage.num);
		},
		markcount:function(storage,player){return storage.num},
	},
	init:function (player){
		player.storage['sksn_bombChai']={
			bomb:[],
			num:0
		};
	},
	onremove:function (player){
		if(player.storage['sksn_bombChai'].bomb.length){
			var bombCard=player.storage['sksn_bombChai'].bomb;
			game.cardsDiscard(bombCard);
			player.storage['sksn_bombChai'].bomb.length=0;
		}
		player.storage['sksn_bombChai'].num=null;
	},
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		if(!player.storage['sksn_bombChai'].num) return false;
		return player.countCards('he');
	},
	filterCard:function (card,player){
		return get.number(card)==player.storage['sksn_bombChai'].num;
	},
	check:function (card){
		return 7-get.value(card);
	},
	content:function (){
		player.removeAdditionalSkill('sksn_bombChai');
	},
	ai:{
		order:9,
		result:{player:1},
	},
	group:["sksnC_bombTime_skill","sksnC_bombMine_skill","sksnC_bombAshes_skill","sksnC_bombFixed_skill"],
},
//————对话彩蛋————//
//塞缪尔
"SKSN_say_SME":{
    group:["SKSN_say_SME_LBT"],
    subSkill:{
        LBT:{
            trigger:{
                source:"dieBefore",
            },
        forced:true,
            priority:-100,
            filter:function (event,player){
    return event.player.hasSkill('SKSN_say_LBT');
    },
            content:function (){
        player.say('我终于战胜了你，师父');   
},
            sub:true,
        },
        
    },
},
//兰伯特
"SKSN_say_LBT":{
    group:["SKSN_say_LBT_SME"],
    subSkill:{
        SME:{
            trigger:{
                source:"dieBefore",
            },
            forced:true,
            priority:-100,
            filter:function (event,player){
    return event.player.hasSkill('SKSN_say_SME');
    },
            content:function (){
        player.say('你还是一点长进也没有');   
},
            sub:true,
        },
        
    },
},
//影
"SKSN_say_Y":{
    group:["SKSN_say_Y_TLJNA","SKSN_say_Y_HLDS"],
    subSkill:{
        TLJNA:{
            trigger:{
                source:"dieBefore",
            },
        forced:true,
        priority:-100,
        filter:function (event,player){
    return event.player.hasSkill('SKSN_TLJNA_A');
    },
            content:function (){
        player.say('你和你的军队已经没有利用价值了');   
},
            sub:true,
        },
        HLDS:{
            trigger:{
                source:"dieBefore",
            },
            forced:true,
            priority:-100,
            filter:function (event,player){
    return event.player.hasSkill('HLDS_A');
    },
            content:function (){
        player.say('死亡之神？可惜你死了');   
},
            sub:true,
        },
    },
},
//扎格
"SKSN_say_ZG":{ 
	trigger:{
                source:"dieBefore",
            },
        forced:true,
            priority:-100,
            filter:function (event,player){
    return event.player.hasSkill('sksn_zhengjun');
    },
            content:function (){
        player.say('你就这点本事，也敢来守飞云渡？');   
},
     },
},
//————转换技提示——————//
dynamicTranslate:{
                    sksn_bugua:function(player){
                        if(player.storage.sksn_bugua==true) return '「<font color=yellow>布阵渡魂</font>」<br><li>转换技，阴：当你对其他角色造成伤害前，你可令受伤角色选择一项：①令你进行判定，若为红色则该伤害+1；②与你进行拼点且你须用牌堆顶的牌响应拼点，若其没赢则该伤害+1。<span class="bluetext">阳：当其他角色对你造成伤害前，你可令伤害来源选择一项：①令你进行判定，若为红色则该伤害-1；②与你进行拼点且你须用牌堆顶的牌相应拼点，若其没赢则该伤害-1。</span>';
                        return '「<font color=yellow>布阵渡魂</font>」<br><li>转换技，<span class="bluetext">阴：当你对其他角色造成伤害前，你可令受伤角色选择一项：①令你进行判定，若为红色则该伤害+1；②与你进行拼点且你须用牌堆顶的牌响应拼点，若其没赢则该伤害+1。</span>阳：当其他角色对你造成伤害前，你可令伤害来源选择一项：①令你进行判定，若为红色则该伤害-1；②与你进行拼点且你须用牌堆顶的牌相应拼点，若其没赢则该伤害-1。';
                    },
                    sksn_quanshi:function(player){
                        if(player.storage.sksn_quanshi==true) return '「<font color=#BEBEBE>一手遮天</font>」<br><li>转换技，出牌阶段限一次，阴：你可以令一名其他角色弃置一张牌，其可视为使用一张【杀】。<span class="bluetext">阳：你可以将一张黑色【杀】当任意有「伤害」标签的锦囊牌使用。</span>';
                        return '「<font color=#BEBEBE>一手遮天</font>」<br><li>转换技，出牌阶段限一次，<span class="bluetext">阴：你可以令一名其他角色弃置一张牌，其可视为使用一张【杀】。</span>阳：你可以将一张黑色【杀】当任意有「伤害」标签的锦囊牌使用。';
						},
                    sksn_lipan:function(player){
                        if(player.storage.sksn_lipan==true) return '「<font color=grey>阳奉阴违</font>」<br><li>转换技，阴：出牌阶段限一次，你可以将一张红色手牌当任意基本牌对一名其他角色使用（无目标合法性限制，但计入使用次数限制且须为你可使用的牌），此牌结算完后将之置于牌堆顶。<span class="bluetext">阳：当一张目标包含你的牌对你结算时，你可以将此牌置于牌堆底，然后摸一张牌。</span>';
                        return '「<font color=grey>阳奉阴违</font>」<br><li>转换技，<span class="bluetext">阴：出牌阶段限一次，你可以将一张红色手牌当任意基本牌对一名其他角色使用（无目标合法性限制，但计入使用次数限制且须为你可使用的牌），此牌结算完后将之置于牌堆顶。</span>阳：当一张目标包含你的牌对你结算时，你可以将此牌置于牌堆底，然后摸一张牌。';
						},
					sksn_bianshi:function(player){
                        if(player.storage.sksn_bianshi==true) return '「<font color=red>完美刺杀</font>」<br><li>转换技，出牌阶段限一次，阴：你可以获得技能〖匿踪〗直到你下回合开始，然后你跳过下个弃牌阶段。<span class="bluetext">阳：你可以获得技能〖刺杀〗直到本回合结束。</span>';
                        return '「<font color=red>完美刺杀</font>」<br><li>转换技，出牌阶段限一次，<span class="bluetext">阴：你可以获得技能〖匿踪〗直到你下回合开始，然后你跳过下个弃牌阶段。</span>阳：你可以获得技能〖刺杀〗直到本回合结束。';
						},
					sksn_yingning:function(player){
                        if(player.storage.sksn_yingning==true) return '「<font color=#FBFBFF>嘤嘤嘤嘤</font>」<br><li>转换技，阴：出牌阶段限一次，你可以观看一名手牌数最多（或之一）的其他角色的手牌并选择其中至多X张，若如此做，其选择是否将这些牌交给你，若否，其增加一层“迷茫”。（X为你与其手牌之差的一半，向上取整且至少为1）<span class="bluetext">阳：其他角色的出牌阶段开始时，你可以交给其一张牌，若如此做，其的弃牌阶段结束后，本阶段内进入弃牌堆的牌每有一张有伤害标签的牌或【酒】，你摸一张牌。</span>';
                        return '「<font color=#FBFBFF>嘤嘤嘤嘤</font>」<br><li>转换技，<span class="bluetext">阴：出牌阶段限一次，你可以观看一名手牌数最多（或之一）的其他角色的手牌并选择其中至多X张，若如此做，其选择是否将这些牌交给你，若否，其增加一层“迷茫”。（X为你与其手牌之差的一半，向上取整且至少为1）</span>阳：其他角色的出牌阶段开始时，你可以交给其一张牌，若如此做，其的弃牌阶段结束后，本阶段内进入弃牌堆的牌每有一张有伤害标签的牌或【酒】，你摸一张牌。';
						},
					sksn_yejv:function(player){
                        if(player.storage.sksn_yejv==true) return '「<font color=#DDDDFF>夜幕低垂</font>」<br><li>转换技，阴：你在回合外获得牌后，你可以使用一张不为「罪」的手牌并翻至背面。<span class="bluetext">阳：当你翻回正面时，你可以使用一张牌并摸两张牌；或弃置一张牌。</span>';
                        return '「<font color=#DDDDFF>夜幕低垂</font>」<br><li>转换技，<span class="bluetext">阴：你在回合外获得牌后，你可以使用一张不为「罪」的手牌并翻至背面。</span>阳：其当你翻回正面时，你可以使用一张牌并摸两张牌；或弃置一张牌。';
						},
					sksn_tongnan:function(player){
                        if(player.storage.sksn_tongnan==true) return '「<font color=#DDDDFF>黑暗黎明</font>」<br><li>转换技，阴：其他角色回合结束时，你可以选择一名本回合受到过伤害的角色，你交给其一张牌，其可视为对当前回合角色使用【杀】。<span class="bluetext">阳：当你造成伤害后，你可以选择一名本回合未受到过伤害的角色，除非其弃置一张牌并翻面，否则你对其造成1点伤害。</span>';
                        return '「<font color=#DDDDFF>黑暗黎明</font>」<br><li>转换技，<span class="bluetext">阴：其他角色回合结束时，你可以选择一名本回合受到过伤害的角色，你交给其一张牌，其可视为对当前回合角色使用【杀】。</span>阳：当你造成伤害后，你可以选择一名本回合未受到过伤害的角色，除非其弃置一张牌并翻面，否则你对其造成1点伤害。';
						},
					sksn_yaowu:function(player){
                        if(player.storage.sksn_yaowu==true) return '「<font color=slategrey>灰雾残影</font>」<br><li>锁定技，阴：结束阶段，你摸1张牌并减少1点体力上限。<span class="bluetext">阳：准备阶段，你增加1点体力上限并回复1点体力。</span>若因此你的体力上限为1/不小于5，你将效果切换为‘阳’/‘阴’。你的手牌上限视为3。';
                        return '「<font color=slategrey>灰雾残影</font>」<br><li>锁定技，<span class="bluetext">阴：结束阶段，你摸1张牌并减少1点体力上限。</span>阳：准备阶段，你增加1点体力上限并回复1点体力。若因此你的体力上限为1/不小于5，你将效果切换为‘阳’/‘阴’。你的手牌上限视为3。';
						},
					sksn_duoling:function(player){
                        if(player.storage.sksn_duoling==true) return '「<font color=#D0D0D0>恶灵相向</font>」<br><li>转换技，阴：出牌阶段限一次，你可以将弃牌堆中的一张普通锦囊牌或【杀】交给一名手牌数小于体力值的其他角色，若如此做，你与其依次翻至背面。<span class="bluetext">阳：一名角色翻回正面后，你可以与其各摸一张牌并令其执行一个出牌阶段，然后若你的手牌数小于其，你执行一个出牌阶段。</span>';
                        return '「<font color=#D0D0D0>恶灵相向</font>」<br><li>转换技，<span class="bluetext">阴：出牌阶段限一次，你可以将弃牌堆中的一张普通锦囊牌或【杀】交给一名手牌数小于体力值的其他角色，若如此做，你与其依次翻至背面。</span>阳：一名角色翻回正面后，你可以与其各摸一张牌并令其执行一个出牌阶段，然后若你的手牌数小于其，你执行一个出牌阶段。';
						},
                },
translate:{
//————翻译————//
//——角色&技能——//
    sksn_hualun:"华伦",
            "sksn_yinxian":"阴弦",
            "sksn_yinxian_info":'「<font color=#460046>诡异琴音</font>」<br><li>出牌阶段，记录你使用牌的点数。回合结束阶段，若你本阶段使用牌至少三张，且点数序列符合条件，你依次执行以下数项，然后你摸满足条件的项数量的牌：<br>①为等差数列，你可以弃置至多X名角色各一张牌。<br>②为等比数列，你可以令至多X名角色摸一张牌。<br>③为严格单调递增数列，你可以令一名其他角色失去一点体力。<br>④为严格单调递减数列，你恢复一点体力。<br>⑤为斐波那契数列的任意子数列，你可以令一名其他角色翻面。',

    sksn_kangpasi:"康帕斯",
            "sksn_duoling":"堕灵",
            "sksn_duoling_info":"「<font color=#D0D0D0>恶灵相向</font>」<br><li>转换技，阴：出牌阶段限一次，你可以将弃牌堆中的一张普通锦囊牌或【杀】交给一名手牌数小于体力值的其他角色，若如此做，你与其依次翻至背面。阳：一名角色翻回正面后，你可以与其各摸一张牌并令其执行一个出牌阶段，然后若你的手牌数小于其，你执行一个出牌阶段。",
            "sksn_lingti":"灵体",
            "sksn_lingti_info":"「<font color=#D0D0D0>幽灵之舞</font>」<br><li>锁定技，你不会被横置；当你受到伤害前，若你的武将牌正面向上，你增加X点体力上限；若你的武将牌背面向上，防止之并减少X点体力上限。（X为伤害值）",

    sksn_xieyaoxiafeiji:"蟹尧虾费基",
            "sksn_xingli":"腥礼",
			"sksn_xingli_info":"「<font color=#4A4AFF>腥味馈赠</font>」<br><li>当你受到1点伤害后，你可以令一名其他角色摸2X张牌（X为你已损失体力值）。",
			"sksn_zaoshi":"造势",
			"sksn_zaoshi_info":"「<font color=#4A4AFF>浩浩汤汤</font>」<br><li>出牌阶段限一次，你可以令一名手牌数大于你的角色将手牌数弃置至与你相等。若弃置的牌中有【杀】，其依次对你使用之。",

    sksn_sigeruopi:"斯格若皮",
            "sksn_xilian":"洗炼",
			"sksn_xilian_info":"「<font color=#00EC00>二次利用</font>」<br><li>出牌阶段限一次，你可以弃置一张手牌。然后、或游戏开始时，你从牌堆或弃牌堆中获得【精炼釜】。若你装备区里有【精炼釜】，当你于弃牌阶段外弃置一张非基本手牌时，摸一张牌。",
			"sksn_paozhi":"炮制",
			"sksn_paozhi_info":"「<font color=#00EC00>如法炮制</font>」<br><li>出牌阶段限一次，你可以弃置两张花色相同的手牌，从牌堆中获得一张同花色珍宝牌的复制。",


    sksn_xiayi:"夏依",
            "sksn_qiqi":"萋萋",
            "sksn_qiqi_info":"「<font color=#FFAAD5>白露未晞</font>」<br><li>每回合限一次，当你成为一名角色使用带有‘伤害’这一标签的牌时，若你有手牌，你可以进行一次判定，若判定结果与你手牌中唯一最多的颜色相同，你获得此牌（若有）并令此牌对你无效。",
            "sksn_liuli":"琉璃",
            "sksn_liuli_info":"「<font color=	#FFAAD5>花晨月夕</font>」<br><li>摸牌阶段结束后，你可以摸2张牌并弃置2张牌，若这2张牌颜色/点数/类别相同，你摸1张牌/回复1点体力/令一名其他角色弃置一张【杀】。",

    sksn_guergewen:"古尔格温",
            "sksn_ankui":"暗窥",
            "sksn_ankui_info":"「<font color=	#D200D2>暗中观察</font>」<br><li>准备阶段开始时，你可以弃置X张黑色牌并选择一名其他角色，标记其为【鸦】，【鸦】的手牌始终对你可见；当【鸦】摸牌时，你观看牌堆顶Y张牌并可以用一张手牌替换其中的一张。（X为存活的【鸦】的数量，Y为此次的摸牌基数）",
            "sksn_chuanmi":"传密",
            "sksn_chuanmi_info":"「<font color=#D200D2>情报贩卖</font>」<br><li>当你因【暗窥】获得牌后，你可以令一名不为你所标记的【鸦】的其他角色获得此牌的复制，此复制无法被与其对应的【鸦】响应，当此复制离开所拥有角色的手牌区时会被销毁。",

    sksn_delike:"德里克",
            "sksn_qihang":"起航",
            "sksn_qihang_info":"「<font color=#004B97>扬帆起航</font>」<br><li>出牌阶段限一次，你可以弃置一张牌并选择你和任意名其他角色，你与这些角色彼此之间计算距离时-1，其他角色计算你与这些角色的距离时+1，直到你的下个出牌阶段开始时。",
            "sksn_shulu":"熟路",
            "sksn_shulu_info":"「<font color=#004B97>轻车熟路</font>」<br><li>锁定技，你对攻击范围内不包含你的角色使用牌无距离限制，若此时你处于【起航】状态，你对这些角色使用牌无次数限制。当一名与你同处【起航】状态的角色杀死其他角色后，你令所有与你同处于【起航】状态的角色摸两张牌。",

    sksn_haimode:"海默德",
            "sksn_xiechi":"血池",
            "sksn_xiechi_info":"「<font color=#930000>血色漩涡</font>」<br><li>锁定技，当你失去体力后，将4张不同花色点数随机的【血饵】洗入牌堆前X张（X为你体力值的30倍且至少为30）；你不受【血饵】的影响，你的【血饵】视为【酒】，且你使用【血饵】转化的【酒】时，你摸一张牌并令此牌不计入次数限制。",
            "sksn_chitu":"齿突",
            "sksn_chitu_info":"「<font color=#930000>血腥撕咬</font>」<br><li>出牌阶段限一次，你可以失去一点体力或弃置一张红桃牌，并弃置攻击范围内的一名其他角色的一张牌，若弃置了其的红桃牌或其的体力值因此而减少，你视为对其使用一张【杀】。（不计入次数限制）。",

    sksn_you:"佑",
			"sksn_muhai":"牧海",
			"sksn_muhai_info":"「<font color=#40E0D0>碧海祈祀</font>」<br><li>一名角色出牌阶段结束时，你可以令本阶段内失去的牌数不少于3的非当前回合角色回复1点体力。",
			"sksn_chaoyong":"潮涌",
			"sksn_chaoyong_info":"「<font color=#40E0D0>幻海潮生</font>」<br><li>当你成为当前回合角色使用牌指定的目标后，你可以重铸1~X张牌（X为此牌目标数），然后你可以『<font color=#40E0D0>翻面</font>』。",
			"sksn_chaoyong_append":"<span style='font-family: yuanli'>背面角色：沧	体力：3<br>技能：〖净灵〗〖潮枯〗</span>",
	sksn_cang:"沧",
			"sksn_jingling":"净灵",
			"sksn_jingling_info":"「<font color=#40E0D0>翻洋覆海</font>」<br><li>其他角色出牌阶段结束时，你可以获得并按照同样的方式使用其本阶段使用的第一张牌。",
			"sksn_chaoku":"潮枯",
			"sksn_chaoku_info":"「<font color=#40E0D0>幻海潮生</font>」<br><li>当你使用牌指定其他角色为目标后，你可以观看并重铸其中一个目标区域内至多Y张牌（Y为其体力值），然后你可以『<font color=#40E0D0>翻面</font>』。",
			"sksn_chaoku_append":"<span style='font-family: yuanli'>正面角色：佑	体力：3<br>技能：〖牧海〗〖潮涌〗</span>",

    sksn_maisike:"迈斯克",
            "sksn_mark_jinqian":"金帖",
            "sksn_dingtie":"定帖",
            "sksn_dingtie_info":"「<font color=slateblue>价格定义</font>」<br><li>其他角色出牌阶段开始时，若其没有「金帖」，你可以弃置一张手牌令其判定，将判定牌置于其武将牌上称「金帖」。其于出牌阶段内使用点数小于「金帖」的牌对你无效。",
            "sksn_wuhuan":"物换",
            "sksn_wuhuan_info":"「<font color=slateblue>同价替换</font>」<br><li>出牌阶段限一次，你可以交给一名有「金帖」的角色一张手牌令其选择一项：①交给你至少两张点数和大于「金帖」的其他牌，你获得其「金帖」；②用此牌替换「金帖」，你本回合对其使用点数大于「金帖」的牌无次数限制。",
            "sksn_changfan":"偿反",
            "sksn_changfan_info":"「<font color=slateblue>利欲熏心</font>」<br><li>每回合限一次，当你成为其他角色使用【杀】或非指向性锦囊牌的目标时，若其没有「金帖」，你可以令一名「金帖」点数小于此牌的角色获得其「金帖」，取消你为目标。若其不为此牌目标，其摸一张牌并成为此牌目标。",

    sksn_dongfanghongdao:"<font color=#FFED97>东方弘道</font>",
    sksn_dongfanghongdao_ab:"东方弘道",
            "sksn_chouyou":"筹友",
            "sksn_chouyou_info":"「<font color=#FFED97>四海皆友</font>」<br><li>一名角色的出牌阶段开始时，你可以选择以下至多三项：若你未横置/受伤/翻面，你可以横置/失去一点体力/翻面并令其获得一张装备牌/两张基本牌/三张锦囊牌，若如此做，该阶段内前1/2/3次有角色受伤时，你获得一张装备/基本/锦囊牌。",
            "sksn_funeng":"赋能",
            "sksn_funeng_info":"「<font color=#FFED97>星芒传递</font>」<br><li>限定技，出牌阶段，你可以将你的所有非基本手牌交给一名其他角色。若你给出的非基本牌大于你手中的基本牌，则你与其获各得两层「<font color=#F0F8FF>明视</font>」，否则你获得【匿踪】直到你的下回合开始。",
            "sksn_yunshi":"运势",
            "sksn_yunshi_info":"「<font color=#FFED97>时转运来</font>」<br><li>当你横置/失去体力/翻面时，你可以弃置一张装备/基本/锦囊牌，令一名其他角色弃置一张牌/增加一层「<font color=#E0E0E0>迷茫</font>」/受到一点伤害。",
         
    sksn_youliweisi:"尤里维斯",
            "sksn_wenshi":"闻识",
            "sksn_wenshi_info":"「<font color=#E800E8>博闻强识</font>」<br><li>你使用或打出牌时，若此牌名未记录，且有花色和点数，你记录此牌信息。摸牌阶段，你可以放弃摸牌，随机删除两条记录并创造记录牌获得之。你受到伤害后，可以删除一条记录，并创造记录的牌放在牌堆底。",
            "sksn_taohui":"韬晦",
            "sksn_taohui_info":"「<font color=#E800E8>隐忍之策</font>」<br><li>一名已受伤的其他角色在其出牌阶段使用『杀』或普通锦囊时，你可以弃置一张红色牌令此牌无效。其恢复一点体力并从牌堆底摸两张牌。以此法获得的牌在弃牌阶段不计入手牌数，在出牌阶段没有使用次数限制。",

    sksn_lujinuo:"卢基诺",
	        "sksn_bianmou":"变谋",
            "sksn_bianmou_info":"「<font color=#FFFF37>兵者诡谋</font>」<br><li>出牌阶段限一次，你可以随机观看X张非指向性普通锦囊牌，然后你将一张手牌当作其中的一张使用且按照所选手牌指定目标的方式指定目标，否则你摸一张牌。（X为你装备区的牌数+3）",
            "sksn_libing":"离兵",
            "sksn_libing_info":"「<font color=#FFFF37>惑敌奇兵</font>」<br><li>每回合限一次，一名其他角色使用牌指定另一名其他角色为唯一目标时，你可以将一张与之花色相同的手牌当作【调虎离山】对自己和目标角色使用。",

    sksn_huaideqiao:"怀德乔",
            "sksn_yinjue":"荫爵",
            "sksn_yinjue_info":"「<font color=red>没啥本事</font>」<br><li>锁定技，游戏开始前，你增加x点体力上限并回复x点体力。(x为全场势力数)",
            "sksn_ezheng":"恶政",
            "sksn_ezheng_info":"「<font color=red>只会搜刮</font>」<br><li>出牌阶段开始时，你可以令一名装备区内有牌其他角色交给你一张其装备区内的牌，若如此做，弃牌阶段结束时，你须交给其两张手牌或摸两张牌并减少一点体力上限。",
            
    sksn_feieryide:"费尔伊德",
            "sksn_mark_zui":"<font color=red>罪</font>",
            "sksn_chengE":"惩恶",
            "sksn_chengE_info":"「<font color=#DDDDFF>罪恶审判</font>」<br><li>锁定技，其他角色于一回合内首次使用一张非转化牌造成的伤害后，若你手牌中没有与之同名「罪」，你将来源牌收入手牌称之为「罪」。<br>若受伤角色为你，伤害来源下次受到伤害+1，直到其下个回合开始时，若其没有触发该效果，其回复1点体力。",
            "sksn_yejv":"夜惧",
            "sksn_yejv_info":"「<font color=#DDDDFF>夜幕低垂</font>」<br><li>转换技，阴：你在回合外获得牌后，你可以使用一张不为「罪」的手牌并翻至背面。阳：当你翻回正面时，你可以使用一张牌并摸两张牌；或弃置一张牌。",
            "sksn_tongnan":"同难",
            "sksn_tongnan_info":"「<font color=#DDDDFF>黑暗黎明</font>」<br><li>转换技，阴：其他角色回合结束时，你可以选择一名本回合受到过伤害的角色，你交给其一张牌，其可视为对当前回合角色使用【杀】。阳：当你造成伤害后，你可以选择一名本回合未受到过伤害的角色，除非其弃置一张牌并翻面，否则你对其造成1点伤害。",
            "sksn_tongnan_tip":"注意事项",
            "sksn_tongnan_tip_info":"阴效果中，“交给其一张牌”与“其可视为使用【杀】”这两项为分开执行：即不论你是否交出一张牌，其均可选择是否视为对当前回合角色使用【杀】；但你若是有可交给其的牌，则你必须交出去。",

    sksn_muguchen:"沐孤尘",
            "sksn_qiulu":"求路",
            "sksn_qiulu_info":"「<font color=cyan>道阻且长</font>」<br><li>出牌阶段，你可以弃置一张手牌，〖发现2〗一张地图牌获得之。每两回合限一次。",
            "sksn_paihuai":"徘徊",
            "sksn_paihuai_info":"「<font color=cyan>惘然又失</font>」<br><li>准备阶段开始时，你可以声明一个不大于4的正整数X，你将手牌调整至X张，若你以此法摸牌/弃牌，结束阶段开始时，你弃置两张牌/摸两张牌。",

    sksn_zage:"扎格",
            "sksn_langhun":"狼魂",
            "sksn_langhun_info":"「<font color=slateblue>临危重振</font>」<br><li>锁定技，你进入濒死状态时，将体力回复至一，若你的武器栏已被废除，你恢复之（若武器栏未被废除则跳过此步骤），然后你失去此技能。",
            "sksn_baying":"拔营",
            "sksn_baying_info":"「<font color=slateblue>攻城拔寨</font>」<br><li>出牌阶段结束时，你可以选择一名其他角色装备区里的至多X张牌并选择一项：①随机弃置其中的一张并令其摸一张牌②获得这些牌并对其造成一点伤害，然后你执行一个额外的出牌阶段并失去此技能。（X为你的『亢击』层数）。",
            "sksn_jishi":"急势",
            "sksn_jishi_info":"「<font color=slateblue>铁蹄强袭</font>」<br><li>出牌阶段限一次，你可以废除一个装备栏并从牌堆/弃牌堆中获得一张【杀】并增加一层『亢击』，若如此做，本回合你的【杀】命中后，你增加一层『增势』，然后若你的装备栏均被废除，你废除判定区并失去此技能。",

    sksn_nuodengsi:"诺登斯",
            "sksn_yumen":"御门",
            "sksn_yumen_info":"「<font color=#D200D2>最后壁垒</font>」<br><li>准备阶段，你可以选择至多x名其他角色并回复等量的体力（若你未受伤则改为摸1张牌）。若如此做，直到你的下一个准备阶段开始或你死亡前，防止这些角色受到的伤害并改为你选择失去1点体力或弃置2张牌。（x为你已损失的体力值数且至少为1）",
            "sksn_zhichu":"支绌",
            "sksn_zhichu_info":"「<font color=#D200D2>顾此失彼</font>」<br><li>锁定技，结束阶段，你从火，雷，冰中选择一个属性。直至你的出牌阶段开始前，你受到对应属性造成的伤害时，摸2张牌并令此伤害-1。",

    sksn_deyingkemeng:"德嘤克萌",
            "sksn_yingning":"嘤咛",
            "sksn_yingning_info":"「<font color=#FBFBFF>嘤嘤嘤嘤</font>」<br><li>转换技，阴：出牌阶段限一次，你可以观看一名手牌数最多（或之一）的其他角色的手牌并选择其中至多X张，若如此做，其选择是否将这些牌交给你，若否，其增加一层“迷茫”。（X为你与其手牌之差的一半，向上取整且至少为1）阳：其他角色的出牌阶段开始时，你可以交给其一张牌，若如此做，其的弃牌阶段结束后，本阶段内进入弃牌堆的牌每有一张有伤害标签的牌或【酒】，你摸一张牌。",

    sksn_yunru:"芸如",
            "sksn_qudong":"驱动",
            "sksn_qudong_info":"「<font color=#008080>后发制人</font>」<br><li>出牌阶段结束时，若你本阶段内使用的牌类别数不小于体力值，你可以选择一张你本阶段内未使用过的基本牌或普通锦囊牌牌名的牌，你视为使用之（无距离限制）。<br>若你选择的是有「伤害」标签的锦囊牌，你须弃置两张牌。",
            "sksn_keyan":"科研",
            "sksn_keyan_info":"「<font color=#008080>有证制造</font>」<br><li>出牌阶段限一次，你可以弃置一张手牌，〖发现〗一张同类别的牌并将之交给一名角色。<br>你以此法〖发现〗的牌组中必定含有与你弃置的牌标签相同的牌。",
            "sksn_keyan_tip":"注意事项",
            "sksn_keyan_tip_info":"发现同标签的牌仅对基本牌、普通锦囊牌和装备牌生效。<br>可检索标签包括：伤害、回复、弃牌、摸牌。",

    sksn_anjielina:"安洁莉娜",
            "sksn_genzhi":"根植",
            "sksn_genzhi_info":"「<font color=#9DEF1F>木之根源</font>」<br><li>弃牌阶段开始时，你可以弃置一张红色基本牌获得1点护甲。<br>若你有护甲：当你受到火属性伤害时，该伤害+X；你每回合前X次摸牌时，多摸一张牌。（X为护甲数）",
            "sksn_congbing":"丛兵",
            "sksn_congbing_info":"「<font color=#9DEF1F>三面埋伏</font>」<br><li>出牌阶段，你可以将一张♣牌当【草木皆兵】对到你距离不大于1的角色使用。<br><li>当一名角色的【草木皆兵】判定牌进入弃牌堆时，你可以将此牌当【出其不意】使用。",
            "sksn_susheng":"苏生",
            "sksn_susheng_info":"「<font color=#9DEF1F>燃尽复生</font>」<br><li>限定技，当你受到不小于体力值的伤害时，你可以防止此伤害并翻至背面。<br>若如此做，你下次翻回正面时，你可以令至多3名角色选择回复1点体力或摸两张牌。",

    sksn_ferwork:"菲儿沃克",
            "sksn_mark_jinxue":"堇雪",
            "sksn_sanhua":"散华",
            "sksn_sanhua_info":"「<font color=#EFF>翩若惊鸿</font>」<br><li>出牌阶段限一次，你可以标记你手中任意张牌，称之为「堇雪」（你手牌中至多有三张「堇雪」牌）。你的「堇雪」牌不计入手牌上限。",
              "sksn_sanhua_tip":"注意事项",
              "sksn_sanhua_tip_info":"离开你手牌区的「堇雪」牌将被取消标记。",
            "sksn_ninghen":"凝痕",
            "sksn_ninghen_info":"「<font color=#EFF>冻结之痕</font>」<br><li>其他角色受到一名角色使用牌造成的伤害时，你可以交给其一张与来源牌同类别的「堇雪」，将该伤害属性改为冰属性。若如此做，其标记此牌为「堇雪」并获得技能〖凝华〗。",
            "sksn_ninghen2":"凝华",
            "sksn_ninghen2_info":"「<font color=#EFF>漫天霜花</font>」<br><li>锁定技，你不能使用或打出「堇雪」牌和与之同名牌，你不能弃置「堇雪」牌，你的第一个技能失效。结束阶段开始时或当你受到火属性伤害后，你将一张「堇雪」置入弃牌堆。你失去最后的「堇雪」牌后，失去技能〖凝华〗。",
            "sksn_dongzhi":"冬至",
            "sksn_dongzhi_info":"「<font color=#EFF>凛冬将至</font>」<br><li>当一名角色受到冰属性伤害后，你可以摸一张牌。",

    sksn_luoyiao:"罗意奥",
            "sksn_lipan":"离叛",
            "sksn_lipan_info":"「<font color=grey>阳奉阴违</font>」<br><li>转换技，阴：出牌阶段限一次，你可以将一张红色手牌当任意基本牌对一名其他角色使用（无目标合法性限制，但计入使用次数限制且须为你可使用的牌），此牌结算完后将之置于牌堆顶。阳：当一张目标包含你的牌对你结算时，你可以将此牌置于牌堆底，然后摸一张牌。",
            "sksn_chengzhi":"承志",
            "sksn_chengzhi_info":"「<font color=grey>卫道之志</font>」<br><li>一名其他角色死亡后，你可以展示牌堆底三张牌（若击杀者为你则改为五张），然后使用其中任意张牌（无距离限制），将其余的牌置入弃牌堆。",

    sksn_tangning:"唐宁",
            "sksn_fengyuan":"逢源",
            "sksn_fengyuan_info":"「<font color=#7D7DFF>左右逢源</font>」<br><li><b>锁定技</b>，第二轮开始时，你需选择一名其他角色，称其为“主”。<br>“主”濒死时，你需选择一项： <br>①将你所有带有回复标签的手牌依次对该角色使用； <br>②弃置所有红色手牌令其回复一点体力； <br>③于回合结束后失去一点体力。 ",
            "sksn_woquan":"握权",
            "sksn_woquan_info":"「<font color=#7D7DFF>杖节把钺</font>」<br><li>出牌阶段限一次，你可以将一张带有伤害标签的牌置于你的武将牌上，称为“权”。<br>当你或【主】对其他角色造成伤害时，你可以选择一张“权”，若此牌的点数小于造成伤害的牌的点数，你将此“权“置入弃牌堆并获得受伤角色的一张牌，否则伤害来源获得受伤的角色一张牌，然后你对受伤的角色使用此“权”（若其没有牌则改为摸一张牌）。",

    sksn_mogen:"摩根",
	        "sksn_shangdao":"商道",
			"sksn_shangdao_info":"「<font color=#949449>聚沙成塔</font>」<br><li><b>锁定技</b>，当你一次性获得至少两张牌后，你须将其中一半的牌置入弃牌堆（向上取整），然后将以下牌名范围中等量的随机牌置于你的武将牌旁，称之为「货」。<br><li><b>锁定技</b>，你的手牌上限+X（X为你「货」的数量）。",
			"sksn_shangdao_tip":"牌名范围",
			"sksn_shangdao_tip_info":"<br>非神属性的【杀】、【闪】、【酒】;<br>牌堆中除【南蛮入侵】、【无中生有】、【决斗】、【乐不思蜀】外的锦囊牌;<br>【魔能甲】、【火铳】、【圣光教袍】、【复合重弩】、【离魄刃轮】;<br>非炸弹资源牌、以及【手榴弹】。",
			"sksn_shangtu":"商途",
			"sksn_shangtu_info":"「<font color=#949449>一本万利</font>」<br><li>到你距离为1的其他角色出牌阶段开始时，其可交给你一张牌，然后其获得你一张「货」。<br>或你在一回合内首次受到这些角色之一造成的伤害后，其获得你的随机一张「货」。<br><li>你的弃牌阶段结束时，你可以获得一张「货」，然后若你手牌数大于体力上限，你将一张牌加入「货」中。",
			"sksn_qiangdai":"强贷",
			"sksn_qiangdai_info":"「<font color=#949449>无奸不商</font>」<br><li>出牌阶段限一次，你可以交给一名其他角色一张手牌，令其将手牌摸至X（X为你手牌上限且至多为场上角色数）。若如此做，其下个出牌阶段结束时或死亡后，你获得其超出手牌上限的手牌。",

    sksn_gaozesi:"高泽斯",
            "sksn_qianmian":"千面",
            "sksn_qianmian_info":"「<font color=#5151A2>万魔一身</font>」<br><li>隐匿技，锁定技，你登场时，选择一名其他角色，复制其主将的武将牌置于你的武将牌旁，称之为「面」。(无视隐匿状态)",
            "sksn_yingmo":"影魔",
            "sksn_yingmo_info":"「<font color=#5151A2>魔影交错</font>」<br><li>当你和与「面」相同武将牌的角色中任意一方成为基本牌或普通锦囊牌的唯一目标时，你可以令另一方也成为此牌目标（无视合法性）。<br><br><li>当其他与「面」相同武将牌的角色死亡后，你可以获得「面」上的所有技能（隐匿技除外）。",
            "sksn_zhefu":"蛰伏",
            "sksn_zhefu_info":"「<font color=#5151A2>黑暗潜伏</font>」<br><li>主公技，当一名其他魔势力角色进入濒死状态时，若其武将牌与「面」不同，你可以复制其主将的武将牌更换你「面」。<br>若如此做，其回复体力至1点，获得〖匿踪〗直到其下个回合开始。",

    sksn_feiluo:"斐洛",
			"sksn_chaosheng":"朝圣",
			"sksn_chaosheng_info":"「<font color=#FFF8D7>圣灵净世</font>」<br><li>每名角色出牌阶段限一次，其可以弃置一张牌并令你摸一张牌。若如此做，你选择其一项BUFF移除1层。",
			"sksn_jiaohua":"教化",
			"sksn_jiaohua_info":"「<font color=#FFF8D7>无尽曙光</font>」<br><li>出牌阶段，你可以交给一名其他角色两张手牌（不能为本阶段以此法给出的类别牌），然后其展示并交给你两张手牌。<br>若这两张牌类别不同，手牌数较少的一方将手牌摸至与较多的一方相等（至多摸三张）。",
			"sksn_zijie":"自诘",
			"sksn_zijie_info":"「<font color=#FFF8D7>静默祈祷</font>」<br><li>觉醒技，准备阶段开始时，若你已受伤且因〖教化〗摸牌超过三张，你减1点体力上限，失去技能〖教化〗并获得技能〖天诏〗。",
			"sksn_tianzhao":"天诏",
			"sksn_tianzhao_info":"「<font color=#FFF8D7>天地启示</font>」<br><li>摸牌阶段，你可以少摸一张牌并令一名其他角色交给你一张牌。<br>若如此做，其增加下列BUFF共计2层（随机分配种类和层数）：<br>①「<font color=yellow>增势</font>」；<br>②「<font color=olivedrab3>回魂</font>」；<br>③「<font color=#F0F8FF>明视</font>」。",

    sksn_geleier:"格雷尔",
            "sksn_fengdui":"锋对",
            "sksn_fengdui_info":"「<font color=#FF8F59>唇枪舌剑</font>」<br><li>出牌阶段开始前，你可以选择一名角色和一张可使用的除延时锦囊外的非指向性手牌，然后将此牌对此角色使用。此牌结算完成后，该角色需对一名除其之外的角色使用此牌，否则你摸一张牌。（无合法性限制）",
            "sksn_nilun":"逆论",
            "sksn_nilun_info":"「<font color=#FF8F59>入室操戈</font>」<br><li>①当一名其他角色使用基本牌或非延时锦囊牌指定除自己外的角色为唯一目标时，你可以与其拼点，若你赢，你取消此牌目标并可重新为其指定一个目标；若你没赢，其可以令你成为此牌的额外目标。（指向性卡牌除外）<br>②锁定技，当你拼点后，若你没赢，你获得一个“论”，若你赢，你移去所有“论”并摸X张牌；你拼点牌的点数额外+X（X为“论”标记数）。",

    sksn_suerjiade:"苏尔嘉德",
            "sksn_quanshi":"全势",
            "sksn_quanshi_info":"「<font color=#BEBEBE>一手遮天</font>」<br><li>转换技，出牌阶段限一次，阴：你可以令一名其他角色弃置一张牌，其可视为使用一张【杀】。阳：你可以将一张黑色【杀】当任意有「伤害」标签的锦囊牌使用。",
            "sksn_jiquan":"集权",
			"sksn_jiquan_info":"「<font color=#BEBEBE>权倾朝野</font>」<br><li>每轮限一次，一名角色结束阶段开始时，你可以获得任意名本回合受到过伤害的角色各一张牌。<br>然后若你的手牌数大于当前回合角色，你可以令其增加1层「<font color=slateblue>压制</font>」。",
            "sksn_muzheng":"幕政",
			"sksn_muzheng_info":"「<font color=#BEBEBE>影子皇帝</font>」<br><li>主公技，锁定技，其他非东势力角色在你的回合内不能使用或打出【闪】或【无懈可击】。",

    sksn_xiluwei:"希露薇",
            "sksn_liyu":"黎羽",
            "sksn_liyu_info":"「<font color=#EA7500>天羽幻生</font>」<br><li>锁定技，防止你于回合内/外受到/造成的伤害。",
            "sksn_liansheng":"怜生",
            "sksn_liansheng_info":"「<font color=#EA7500>庇愈苍生</font>」<br><li>出牌阶段开始时，你可以选择至多X名其他角色（X为你的体力值-1且至少为1）。目标角色各回复1点体力，然后手牌数小于体力值的目标角色各摸一张牌。若其中有角色没有以此法摸牌，你失去1点体力。",
            "sksn_tianze":"天泽",
            "sksn_tianze_info":"「<font color=#EA7500>恩泽万灵</font>」<br><li>结束阶段，你可以令所有角色依次选择摸1张牌或弃置1张手牌，然后手牌数大于体力值的角色失去1点体力。若选摸牌的人数不大于场上存活角色数的一半，你可以令一名其他角色获得x张锦囊牌。（x为你已损失的体力值数且至多为3）",
            "sksn_enzhao":"恩诏",
            "sksn_enzhao_info":"「<font color=#EA7500>圣堂之威</font>」<br><li>主公技，每名其他‘东’势力角色限一次，其回合结束时，其可以减少1点体力上限并摸1张牌，然后你摸2张牌或回复1点体力并进行一个额外的出牌阶段。",

    sksn_wuruiya:"乌瑞娅",
            "sksn_xianmou":"陷谋",
            "sksn_xianmou_info":"「<font color=#5B00AE>池鱼之殃</font>」<br><li>锁定技，当你受到伤害时，防止此伤害并随机弃置x张牌（x为伤害值数，不足则全弃，无牌则不弃），然后若你没有牌，你失去1点体力；当你进入濒死状态时，你死亡。",
            "sksn_jieli":"竭力",
            "sksn_jieli_info":"「<font color=#5B00AE>百念皆灰</font>」<br><li>当你造成伤害时或死亡前，你可以令一名其他角色随机弃置1张牌。",
            "sksn_yihua":"异化",
            "sksn_yihua_info":"「<font color=#5B00AE>绝境异变</font>」<br><li>当你失去/回复体力时，你可以令下一次【竭力】选择的角色数/弃置的牌数+1。",

    sksn_yilian:"伊莲",
            "sksn_sifu":"祀福",
            "sksn_sifu_info":"「<font color=#FF60AF>历添新岁</font>」<br><li>结束阶段开始时，你可以将一张手牌置于一名角色武将牌上，称之为「福」。拥有「福」的角色获得技能〖福运〗。",
            "sksn_fuyun":"福运",
            "sksn_fuyun_info":"「<font color=#FF60AF>漫天华彩</font>」<br><li>锁定技，准备阶段开始时，你判定，若结果花色与你的任意一张「福」相同，你获得所有「福」；均不同，你将此牌加入「福」中。",
            "sksn_qiyuan":"祈愿",
            "sksn_qiyuan_info":"「<font color=#FF60AF>春满山河</font>」<br><li>一名角色红色判定牌生效后，你可以令其摸一张牌或弃置一张牌。",
            "sksn_xingyun":"幸运",
            "sksn_xingyun_info":"「<font color=#FF60AF>福光照耀</font>」<br><li>锁定技，你会比较幸运。",
            
    sksn_nuoya:"诺亚",
            "sksn_sanlei":"散雷",
            "sksn_sanlei_info":"「<font color=#9999CC>暗雷聚涌</font>」<br><li>你受到雷电伤害前，若此伤害大于1，你可以弃置至多X张黑色牌并选择等量的角色，然后这些角色各帮你分担一点雷电伤害。（X为伤害值-1）",
            "sksn_lianneng":"炼能",
            "sksn_lianneng_info":"「<font color=#9999CC>萃化魔能</font>」<br><li>出牌阶段，你可以销毁一张非坐骑牌的装备牌，若如此做，你获得一点护甲并增加一枚“夜”标记，然后若你的判定区没有【闪电】，你将一张【闪电】置入你的判定区；你于回合内第一次发动此技能时，摸三张牌。",
            "sksn_lingbao":"灵爆",
            "sksn_lingbao_info":"「<font color=#9999CC>噬电伏杀</font>」<br><li>限定技，出牌阶段，若你武将牌上的“夜”标记数不少于存活角色数的一半，你可以令所有其他角色非锁定技失效且判定区内没有【闪电】的角色将一张【闪电】置入判定区，所有其他角色不能对其他角色使用牌直到其回合结束，然后你不能再发动『炼能』，获得『夜行』。",
            "sksn_yexing":"夜行",
            "sksn_yexing_info":"「<font color=#9999CC>黑暗无边</font>」<br><li>锁定技，你受到伤害时，若你有“夜”标记，则改为移去等量的“夜”标记，你失去所有标记后或你死亡前，解除所有其他角色的封印，然后将体力上限调整为1。",

    sksn_ximengyaweili:"西蒙雅维利",
            "sksn_mijian":"密谏",
            "sksn_mijian_info":"「<font color=#FFFFAA>事以密成</font>」<br><li>出牌阶段，你可以弃置一张非延时锦囊牌或【杀】（【杀】每回合限一次）并选择两名角色（第一名角色不能为你），第一名角色视为对另外的角色使用此牌,然后若本回合内没有角色受到过伤害，你摸1张牌。",
            "sksn_suozhan":"嗦战",
            "sksn_suozhan_info":"「<font color=#FFFFAA>二虎竞食</font>」<br><li>其他角色于你的回合内受到伤害后，若其本回合内未成为过【嗦战】的目标，你可以交给其1张牌，然后其选择一项： ①视为对伤害来源使用一张【杀】并成为其使用下一张目标不为自己的非红色牌的额外目标。（装备牌，指向性卡牌除外） ②交给你一张非延时锦囊牌并令本回合内你使用的下一张非延时锦囊牌或【密谏】目标额外+1。",

    sksn_gaogeli:"高戈里",
            "sksn_yixi":"翼袭",
            "sksn_yixi_info":"「<font color=#C48888>兵贵神速</font>」<br><li>瞬发技，每回合限一次，你可以将武将牌翻至背面并视为对当前回合的角色（若此时在你的回合内则改为攻击范围内的一名其他角色）使用一张【杀】。（无规则限制）",
            "sksn_kexian":"克险",
            "sksn_kexian_info":"「<font color=#C48888>无畏登攀</font>」<br><li>每当你于回合外失去1张牌时，你记录此牌的牌名。当你在本局游戏中第二次以此法记录一种牌名时，若此时你的武将牌背面朝上，你可以将武将牌翻至正面，否则你可以摸2张牌。",
            "sksn_liangfeng":"良锋",
            "sksn_liangfeng_info":"「<font color=#C48888>枪疾如龙</font>」<br><li>锁定技，你的回合外，若你的体力值和手牌数不相等，你造成的伤害+1。",

    sksn_occupatee:"奥克佩特",
            "sksn_xueren":"血刃",
            "sksn_xueren_info":"「<font color=red>蛮荒暗刃</font>」<br><li>隐匿技，锁定技，当你登场时，你装备【血魇刀】，若此时在你回合内，你进行一个出牌阶段。",
            "sksn_jianling":"践凌",
            "sksn_jianling_info":"「<font color=red>暴虐无道</font>」<br><li>出牌阶段限一次，你可以选择一项：①弃置攻击范围内一名男性角色装备区里的一张牌；②获得攻击范围内一名女性角色一张牌。若如此做，你视为对其使用【杀】，若此【杀】未造成伤害，你失去1点体力。",
            "sksn_zhenyin":"鸩瘾",
			"sksn_zhenyin_info":"「<font color=red>嗜血之心</font>」<br><li>锁定技，当你在回合内失去1点体力时，你摸一张牌；当你使用【杀】对装备区内没有牌的女性角色造成伤害后，你回复1点体力。",
			"sksn_huangyin":"荒淫",
            "sksn_huangyin_info":"「<font color=red>骄奢淫逸</font>」<br><li>主公技，其他魔势力角色使用【杀】时，若目标中包含女性角色，其可交给你一张牌，然后你可以弃置一张基本牌令此【杀】伤害+1。",

    sksn_jiamiu:"加缪",
            "sksn_lingjiang":"灵降",
            "sksn_lingjiang_info":"「<font color=slategrey>鬼神初显</font>」<br><li>隐匿技，锁定技，你于其他角色的回合登场后，你对其造成1点伤害。",
            "sksn_yaowu":"妖雾",
            "sksn_yaowu_info":"「<font color=slategrey>灰雾残影</font>」<br><li>锁定技，阴：结束阶段，你摸1张牌并减少1点体力上限。阳：准备阶段，你增加1点体力上限并回复1点体力。若因此你的体力上限为1/不小于5，你将效果切换为‘阳’/‘阴’。你的手牌上限视为3。",
            "sksn_shenshi":"神逝",
            "sksn_shenshi_info":"「<font color=slategrey>神逝魄夺</font>」<br><li>当你受到/造成伤害时，若你的体力值不大于/不小于3，你可以将一张牌置于武将牌上，称为‘神’/移去一张‘神’并失去1点体力，令此伤害-1/+1。（以此法减少伤害的过程可重复至伤害为0，‘神’数至多为你的体力上限）",
            "sksn_mingwei":"冥威",
            "sksn_mingwei_info":"「<font color=slategrey>深渊凝视</font>」<br><li>主公技，其他‘魔’势力造成伤害后，其可以交给你x张牌并移去一张‘神’，然后令受伤角色失去1点体力。（x为‘神’数）",

    sksn_clemtin:"克莱门汀",
            "sksn_angdou":"昂斗",
            "sksn_angdou_info":"「<font color=cyan>何惧天下</font>」<br><li>出牌阶段开始时，你可以弃置X张牌并指定X名其他角色，你重复以下流程X次：对随机一个目标视为使用【杀】（无合法性限制）。然后若你没有以此法造成伤害，你摸X张牌且本阶段你不能再对这些角色使用牌。（X至多为3）",
            "sksn_zhengfa":"征伐",
            "sksn_zhengfa_info":"「<font color=cyan>继业讨逆</font>」<br><li>其他角色使用目标唯一且有对应实体的【杀】结算完后，你可以令其获得一枚“斗”标记。有“斗”标记的角色使用包含你为目标的红色牌时，你可令其移去一枚“斗”标记并视为对其使用【决斗】。",
            "sksn_jdxbw":"霸王",
            "sksn_jdxbw_info":"「<font color=cyan>虎踞一方</font>」<br><li>主公技，其他海势力角色出牌阶段限一次，其可交给你一张【杀】或【决斗】并令你使用之。若此牌未造成伤害，你弃置一张牌。",

    sksn_hailingji:"海灵姬",
            "sksn_xinglang":"兴浪",
            "sksn_xinglang_info":"「<font color=cyan>翻江倒海</font>」<br><li>当其他角色于你的回合内使用或打出牌后，你可以令其随机弃置1张牌。",
            "sksn_jianhao":"尖嚎",
            "sksn_jianhao_info":"「<font color=cyan>海妖之歌</font>」<br><li>每回合限一次，你可以将两张点数之差不大于x的手牌当作【海妖之歌】使用。（x为你已损失的体力值数）",

    sksn_pianxian:"翩跹",
            "sksn_bugua":"布卦",
            "sksn_bugua_info":"「<font color=yellow>布阵渡魂</font>」<br><li>转换技，阴：当你对其他角色造成伤害前，你可令受伤角色选择一项：①令你进行判定，若为红色则该伤害+1；②与你进行拼点且你须用牌堆顶的牌响应拼点，若其没赢则该伤害+1。阳：当其他角色对你造成伤害前，你可令伤害来源选择一项：①令你进行判定，若为红色则该伤害-1；②与你进行拼点且你须用牌堆顶的牌相应拼点，若其没赢则该伤害-1。",
            "sksn_mingyu":"明预",
            "sksn_mingyu_info":"「<font color=yellow>一语成谶</font>」<br><li>每回合限一次，当你因〖布卦〗进行拼点或判定前，你可以观看牌堆顶X张牌并可使用其中一张带有「伤害」标签的卡牌,然后将其余的牌以任意顺序放回牌堆顶。（X为存活角色数且至多为5）",

    sksn_halisen:"哈里森",        
            "sksn_luezhen":"掠阵",
            "sksn_luezhen_info":"「<font color=chocolate>迎敌破胆</font>」<br><li>出牌阶段开始时，你可以弃置1张牌并选择一名其他角色，若其有红色牌，其弃置其中1张；否则你摸2张牌。",
            "sksn_zhengjun":"整军",
            "sksn_zhengjun_info":"「<font color=chocolate>整戈待旦</font>」<br><li>锁定技，结束阶段，若本回合内进入弃牌堆的牌数大于你的体力值数，你摸1张牌并获得『<b><font color=cyan>御阵</font></b>』直到你的下一个出牌阶段结束后，然后你执行一个出牌阶段。",
            "sksn_yuzhen":"御阵",
            "sksn_yuzhen_info":"「<font color=chocolate>御敌如磐</font>」<br><li>出牌阶段结束时，你可以与一名其他角色各弃置所有黑色手牌。",

    sksn_agebu:"雅各布",
            "sksn_qiming":"启明",
            "sksn_qiming_info":"「<font color=gold>照夜如明</font>」<br><li>出牌阶段限一次，你可以弃置一张牌，观看并展示其他角色一张非装备非延时锦囊手牌，你记录该角色与展示的牌名直到你下回合开始。<br>其他角色使用与你记录的同名且有对应实体牌结算完后，若你记录的角色存活且目标合法，你可视为对你记录的角色使用你记录的牌。",
			"sksn_xingyi":"星熠",
			"sksn_xingyi_info":"「<font color=gold>星火微茫</font>」<br><li>出牌阶段限X次，你可以将手牌中花色不唯一的一张牌交给一名其他角色，然后你将手牌摸至四张。（X为你的体力值）",            "sksn_yiqi":"义起",
            "sksn_yiqi_info":"「<font color=gold>聚义为军</font>」<br><li>主公技，其他东势力角色受到伤害后，可令你摸X张牌并令你选择一项：<br>①对伤害来源使用一张【杀】或带有「伤害」标签的锦囊牌；<br>②弃置一张牌。<br>（X为其已损失体力值且至多为2）",
            
    sksn_eidehua:"埃得华",
            "sksn_sanwei":"散威",
            "sksn_sanwei_info":"「<font color=black>意想不到</font>」<br><li>当你于其他角色回合内造成伤害后，你可以令所有手牌数小于当前回合角色的角色各选择是否获得其一张手牌。若其没有手牌可得，其失去1点体力并终止此次结算，且你本局内不能再对其发动〖散威〗。",
            "sksn_jieshi":"借势",
            "sksn_jieshi_info":"「<font color=black>有借无还</font>」<br><li>其他角色受到伤害时，你可以弃置受伤角色一张牌令该伤害-1。若你手牌数大于伤害来源，你可以对受伤角色造成1点伤害；否则你摸一张牌。",

    sksn_niepudun:"涅普顿",
            "sksn_Haiwang":"海王",
            "sksn_Haiwang_info":"「<font color=blue>镇海平渊</font>」<br><li>当你回复体力后，你可以视为使用一张【杀】。若此【杀】造成伤害，该技能本回合失效，你回复1点体力。",
            "sksn_futao":"覆涛",
            "sksn_futao_info":"「<font color=blue>惊涛骇浪</font>」<br><li>锁定技，一名角色回合开始时，你记录你的体力值为X。本回合你前两次受到伤害时，若你体力值大于1，则防止之并失去体力至1点，且每以此法失去1点体力便摸一张牌；本回合结束时，若你体力值小于X，你回复X-2点体力，且每以此法回复1点体力便弃置一张手牌。（不足则全弃） ",
            "sksn_futao2":"覆涛",
            "sksn_futao2_info":"",

    sksn_siji:"司吉",
            "sksn_bozhong":"博众",
            "sksn_bozhong_info":"「<font color=red>广识博才</font>」<br><li>其他角色判定牌生效前，你可以令其选择是否展示手牌：若选是，其打出一张手牌代替之；若选否，你打出一张手牌替换之。",
            "sksn_mijiao":"秘教",
            "sksn_mijiao_info":"「<font color=red>密隐朝堂</font>」<br><li>一名角色于该回合内使用第一张指定角色为目标的牌后，若此牌不为装备牌或延时性锦囊牌或【毒】，你可以弃置一张牌，假设其使用你弃置的牌指定目标，然后其判定：<br>若结果为红色，你可为此牌额外指定任意名在假设中合法的目标；否则取消所有在假设中不合法的目标，本回合不能使用或打出你弃置的同类别牌。",

    sksn_kaien:"凯恩",
            "sksn_tongpao":"同袍",
            "sksn_tongpao_info":"「<font color=blue>爱兵如子</font>」<br><li>锁定技，每种类型每回合限一次，当拥有“同袍”的角色使用装备牌时，若你对应区域内没有牌，你视为使用此牌。",
            "sksn_paoze":"袍泽",
            "sksn_paoze_info":"「<font color=blue>同甘共苦</font>」<br><li>游戏开始时或一名角色进入濒死状态时（若场上有其他角色拥有“同袍”则改为拥有“同袍”的角色死亡后），你可以减少1点体力上限并令手牌上限+1，令一名角色获得“同袍”。",
            "sksn_shuwei":"戍卫",
            "sksn_shuwei_info":"「<font color=blue>海都之盾</font>」<br><li>拥有“同袍”的角色受到其他角色造成的伤害后，你可以令其摸1张牌或交给其一张牌，若交出的牌：带有‘伤害’这一标签，其可以对伤害来源使用此牌；带有‘回复’这一标签，其回复1点体力；为装备牌，其摸1张牌并可以使用该装备。",

    sksn_qiongsi:"琼斯",
    sksn_qiongsi_soul:"琼斯•亡魂",         
            "sksn_xilue":"袭掠",
            "sksn_xilue_info":"「<font color=red>风驰电掣</font>」<br><li>锁定技，你的回合内，你的【闪】均视为【杀】，且使用红色牌无距离限制。当你造成伤害后，观看受伤角色的手牌并可以获得其中一张。",
            "sksn_zhenjing":"震鲸",
            "sksn_zhenjing_info":"「<font color=red>溃敌于渊</font>」<br><li>每回合限一次，当你使用【杀】指定目标后，你可以摸x张牌并弃置x张手牌，然后根据所弃置牌的花色数：1种，你失去1点体力；2种及以上，此【杀】不可被响应；3种及以上，此【杀】伤害+1；4种，其弃置装备区里所有牌。（x为其装备区里的牌数）",
            "sksn_zhuiming":"追命",
            "sksn_zhuiming_info":"「<font color=red>不死不休</font>」<br><li>锁定技，当你即将死亡时，你令伤害来源（若有）获得『<b><font color=red>追命</font></b>』标记，然后你弃置所有牌并将武将牌替换为『<b><font color=red>琼斯•亡魂</font></b>』。",           
            "sksn_yuanling":"怨灵",
            "sksn_yuanling_info":"「<font color=red>不死不休</font>」<br><li>锁定技，你的回合开始时，跳过之，然后所有其他角色依次选择弃置1张牌或受到1点伤害（若你的体力值为1或目标角色拥有『<b><font color=red>追命</font></b>』则改为强制造成伤害）；对你造成伤害的角色摸1张牌或回复1点体力，杀死你的角色摸3张牌。",       

    sksn_guiyan:"鬼厌",
            "sksn_yanyu":"魇语",
            "sksn_yanyu_info":"「<font color=slateblue>魇语低呤</font>」<br><li>你的回合开始时，只要场上没有拥有“鬼染”标记的角色或你的“魇语”标记数不小于5，你便可重复以下流程：<br>令一名其他角色获得1枚“鬼染”标记，若你的“魇语”标记数不小于5，则移去5枚“魇语”标记。<br><li>拥有“鬼染”标记的角色获得技能〖鬼染〗。",
				"sksn_guiran":"鬼染",
				"sksn_guiran_info":"「<font color=slateblue>恶染峡湾</font>」<br><li>锁定技，准备阶段开始时，①若你“鬼染”标记大于5，移去至5枚；②你选择执行以下流程至多X次（X为发动时你的拥有的“鬼染”标记数）：<br>与一名其他角色拼点并令其获得1枚“鬼染”标记，没赢的角色移除1层「<font color=yellow>增势</font>」（若无则改为增加1层「<font color=blue>降势</font>」）并摸一张牌；赢的角色移除1层「<font color=blue>降势</font>」（若无则改为增加1层「<font color=yellow>增势</font>」）并获得对方的拼点牌，你移去1枚“鬼染”标记。<br><br><li>最后根据你少执行的流程次数你增加等量层「<font color=blue>降势</font>」。<br><br><li>你死亡前，若你下家不为鬼厌，你令其获得1枚“鬼染”标记。",
			"sksn_yinhuo":"隐祸",
			"sksn_yinhuo_info":"「<font color=slateblue>混乱之源</font>」<br><li>锁定技，你不能成为拼点目标；其他角色回合开始时，其每拥有1枚“鬼染”标记你便获得1枚“魇语”标记。",

    sksn_wulamu:"乌拉姆",
            "sksn_yunshen":"孕神",
            "sksn_yunshen_info":"「<font color=slateblue>育神待局</font>」<br><li>锁定技，你的回合开始前，若你装备区里没有【帕朵玛拉】且你的体力值不为全场最少，你使用之；当你造成或受到伤害后，若你装备区里有【帕朵玛拉】，你从牌堆中获得一张【毒】。",
            "sksn_wangtian":"妄天",
            "sksn_wangtian_info":"「<font color=slateblue>遁天妄行</font>」<br><li><b>觉醒技</b>，出牌阶段开始时，若你手牌中【毒】的数量不小于你体力值，你先将体力回复至体力上限，然后与一名其他角色交换手牌并获得技能〖威压〗。",
                "sksn_weiya":"威压",
                "sksn_weiya_info":"「<font color=slateblue>威震四荒</font>」<br><li>锁定技，结束阶段开始时，你减1体力上限令一名其他角色增加1层「<font color=slateblue>压制</font>」。",
            "sksn_gongjian":"共僭",
            "sksn_gongjian_info":"「<font color=slateblue>僭神夺位</font>」<br><li>主公技，你觉醒技发动后，你可摸三张牌或加1体力上限。当你发动〖威压〗后，其他海势力角色可选择是否失去1点体力：选是的角色摸一张牌，你再指定一名角色其他角色增加一层『压制』。",
 
    sksn_jielaer:"桀拉尔",
            "sksn_xueshi":"血弑",
            "sksn_xueshi_info":"「<font color=red>诡影舞步</font>」<br><li>每回合每种类别限一次，一名角色使用牌结算完进入弃牌堆后，你可以弃置一张牌获得之。若此牌造成过伤害，你获得一枚“血弑”标记。",
            "sksn_yingzhu":"影诛",
            "sksn_yingzhu_info":"「<font color=red>影诛世物</font>」<br><li>你使用一张有「伤害」标签的牌结算完后，若你“血弑”标记数不小于5-X（X为你已损失体力值），则你可以移去一枚标记，并对一名未受到此牌伤害的目标角色造成1点伤害；或获得一名受到此牌伤害的目标角色两张手牌。",
            "sksn_yingfeng":"影锋",
            "sksn_yingfeng_info":"「<font color=red>戏命之刃</font>」<br><li>锁定技，若你武器栏没有牌且没有被废除，则你视为装备着【<font color=red>影刃刀</font>】。",

    sksn_halidisi:"哈利迪斯",
    "SKSN_HLDS_D":"魔镰·二阶",
    "SKSN_HLDS_D_info":"「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌指定唯一目标时，会额外结算两次，然后失去此技能。",
    "SKSN_HLDS_C":"魔镰·一阶",
    "SKSN_HLDS_C_info":"「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌指定唯一目标时，会额外结算一次，然后失去此技能。",
    "SKSN_HLDS_B":"黑镰",
    "SKSN_HLDS_B_info":"「<font color=#F0F>静默之镰</font>」<br><li>出牌阶段，若你没有技能<b><font color=#F0F>魔镰</font></b>并且你满足以下条件你可以弃置相应“<b><font color=#F0F>魔能</font></b>”然后获得相应等级的<b><font color=#F0F>魔镰</font></b>直到回合结束<br><br><li><b>魔镰获得方式：</b><br>①若你的“<b><font color=#F0F>魔能</font></b>”标记大于0并且小于等于2，你可以弃置1枚“<b><font color=#F0F>魔能</font></b>”标记并获得技能<b><font color=#F0F>魔镰·一阶</font></b><br>②若你的“<b><font color=#F0F>魔能</font></b>”标记不小于3，你可以弃置2枚“<b><font color=#F0F>魔能</font></b>”标记并摸一张牌，然后获得技能<b><font color=#F0F>魔镰·二阶</font></b>。",
    "SKSN_HLDS_A":"寂灭",
    "SKSN_HLDS_A_info":"「<font color=#F0F>寂灭之心</font>」<br><li><b>锁定技</b>，当你进场/回合开始/每受到一点伤害/一名角色阵亡时，你都会获得一枚“<b><font color=#F0F>魔能</font></b>”标记。",

    sksn_aodinggelan:"奥丁格兰",
    "SKSN_ADGL_A":"求真",
    "SKSN_ADGL_A_info":"「<font color=grey>卫道先师</font>」<br><li>每回合限一次，一名其他角色在其出牌阶段可以交给你一张牌，然后你可以展示牌堆顶的八张牌，令其获得所有花色与其相同的牌。",
    "SKSN_ADGL_A_enabl":"求真",
    "SKSN_ADGL_C":"死志",
    "SKSN_ADGL_C_info":"「<font color=grey>意志传承</font>」<br><li>你死亡后，可令一名角色获得<b><font color=grey>求真</font></b>或<b><font color=grey>寻道</font></b>。",
    "SKSN_ADGL_B":"寻道",
    "SKSN_ADGL_B_info":"「<font color=grey>求真寻道</font>」<br><li>你受到一张牌造成的伤害后，你可以摸一张牌并将对你造成伤害的牌牌放在牌堆底。一名角色的摸牌阶段，你可以令其从牌堆底摸牌。",

	sksn_fuleicha:"弗雷查",
			"sksn_shouji":"收集",
			"sksn_shouji_info":"「<font color=orange>零件收集</font>」<br><li><b>锁定技</b>，准备阶段开始时或当你造成伤害后，你获得一张【基础材料】。<br>其他角色死亡后，若来源为你，你获得一张【高级材料】，否则你获得一张【基础材料】。",
			"sksn_zhizuo":"制作",
			"sksn_zhizuo_info":"「<font color=orange>无证制造</font>」<br><li>出牌阶段，你可以将两张【基础材料】或【高级材料】置入弃牌堆，然后随机获得一张炸弹牌（有概率失败）。<br>失败后，你受到1点无来源伤害并获得一张【基础材料】。",
			"sksn_zhizuo_tip1":"【基础材料】卡池",
			"sksn_zhizuo_tip1_info":"制作失败率10%<br>手榴弹、燃烧弹、定时炸弹、地雷、催泪瓦斯、灰烬炸弹",
			"sksn_zhizuo_tip2":"【高级材料】卡池",
			"sksn_zhizuo_tip2_info":"制作失败率5%<br>龙息、凋灵之首、终极炸弹、定点炸弹",

    sksn_lanling:"澜零",
			"sksn_zonghun":"纵魂",
			"sksn_zonghun_info":"「<font color=#528B8B>灵魂摆渡</font>」<br><li><b>锁定技</b>，当你使用牌指定一个目标时，你选择令其增加2层「<font color=olivedrab3>回魂</font>」或增加1层「<font color=slategrey>凋零</font>」（若其已有其中一种BUFF，则你不能为其增加另一种）。<br><li>若目标为你，改为你获得1层「<font color=olivedrab3>回魂</font>」。<br><br>以此法附加的「<font color=olivedrab3>回魂</font>」和「<font color=slategrey>凋零</font>」上限5层。",

    sksn_xintianbuzhi:"新田布止",
            "sksn_yineng":"异能",
            "sksn_yineng_info":"「<font color=cyan>特殊异能</font>」<br><li><b>锁定技</b>，你的回合内，当你使用一张锦囊牌后，你随机抽取三个时机为出牌阶段使用的技能，然后你选择并获得其中一个技能，直到出牌阶段结束<br><br><li>回合结束时，若你本回合发动该技能的次数不大于自身当前体力上限，则你摸x张牌（x为你本回合使用的锦囊牌数）",

    sksn_ailuoyi:"艾萝依",
			"sksn_huanmo":"唤魔",
			"sksn_huanmo_info":"「<font color=grey>魔种召唤</font>」<br><li><b>锁定技</b>，游戏开始时，你获得3枚“星辰”标记并获得随从〖<font color=cyan>海妖</font>〗、〖<font color=#F0F>虚影</font>〗、〖<font color=orange>炎魔</font>〗各一。<br>一名角色回合开始时，若你的“星辰”标记数不小于3，你随机召唤以上随从之一。<br>一名角色回合结束时或当你受到伤害后，你获得1枚“星辰”标记。<br><br><li>当随从进入濒死状态时回复体力至体力上限，你切换回本体，移去3枚“星辰”标记并失去1点体力。",
	sksn_ailuoyi_hy:"海妖",
	sksn_ailuoyi_hy_info:"「<font color=cyan>秘境海妖</font>」<br><li><b>体力值：2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手牌数：4</b>",
			"sksn_hy_meiyin":"魅音",
			"sksn_hy_meiyin_info":"「<font color=cyan>妖魅之音</font>」<br><li>锁定技，当你即将受到伤害前，若伤害值大于X，防止该伤害并获得1枚“魅音”标记；否则你摸X张牌。<br>当你即将造成伤害前，若X大于1，你移去1枚“魅音”标记。<br>（X为“魅音”标记数）",
	sksn_ailuoyi_xy:"虚影",
	sksn_ailuoyi_xy_info:"「<font color=#F0F>虚空鬼影</font>」<br><li><b>体力值：3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手牌数：3</b>",
			"sksn_xy_shihun":"噬魂",
			"sksn_xy_shihun_info":"「<font color=#F0F>恶灵摄魂</font>」<br><li><b>锁定技</b>，你到体力值不小于你的角色的距离视为1，你的黑色/红色手牌均视为【雷杀】/【闪】，手牌上限+X（X为你的体力值）；当你对其他角色造成伤害后，你摸一张牌并弃置其一张牌。",
	sksn_ailuoyi_ym:"炎魔",
	sksn_ailuoyi_ym_info:"「<font color=orange>地狱炎魔</font>」<br><li><b>体力值：2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手牌数：3</b>",
			"sksn_ym_yanyu":"炎狱",
			"sksn_ym_yanyu_info":"「<font color=orange>烈焰地狱</font>」<br><li>锁定技，当你受到火属性伤害时，你摸X张牌并选择1~X名其他角色（X为伤害值），你转移给这些角色各1点伤害；出牌阶段结束时，你对自己造成随机0~2点火属性伤害。",
        subplayer:"本体",

    sksn_saimiuer:"塞缪尔",
    "SKSN_SME_A":"反击",
    "SKSN_SME_A_info":"「<font color=yellow>神圣之意</font>」<br><li><b>锁定技</b>，当你成为其他角色使用基本牌或普通锦囊牌的目标时视为对其使用一张相同牌名的牌。（带有附属目标的牌除外且须有实体牌）",
    "SKSN_SME_B":"裁决",
    "SKSN_SME_B_info":"「<font color=yellow>圣光裁决</font>」<br><li>每回合限一次，当你造成伤害后，你可以弃置所有手牌并对至多x名你计算其距离为1的角色造成1点火属性伤害。（x为你弃置的牌数）",        
 
    sksn_jianiao:"嘉尼奥",
            "sksn_bianshi":"转换",
            "sksn_bianshi_info":"「<font color=red>完美刺杀</font>」<br><li>转换技，出牌阶段限一次，阴：你可以获得技能〖匿踪〗直到你下回合开始，然后你跳过下个弃牌阶段。阳：你可以获得技能〖刺杀〗直到本回合结束。",
			"sksn_nizong":"匿踪",
			"sksn_nizong_info":"「<font color=red>匿迹潜形</font>」<br><li><b>锁定技</b>，你使用牌不能指定其他角色为合法目标；其他角色使用牌不能指定你为合法目标。",
			"sksn_cisha":"刺杀",
			"sksn_cisha_info":"「<font color=red>匿影暗杀</font>」<br><li>出牌阶段限一次，你可以弃置一张手牌并选择一名其他角色，除非其弃置一张点数更大的牌，否则你对其造成1点伤害并令其增加3层「<font color=red>负伤</font>」。",			
			"sksn_wumeng":"雾盟",
			"sksn_wumeng_info":"「<font color=red>雾言盟誓</font>」<br><li>主公技，出牌阶段限一次，你可以交给其他帝势力角色一张牌。若如此做，本回合你到其攻击范围内的角色距离视为1。",

    sksn_yigenuosi:"<font color=cyan>伊格诺斯</font>",
    sksn_yigenuosi_ab:"伊格诺斯",
            "sksn_chuansuo":"穿梭",
            "sksn_chuansuo_info":"「<font color=cyan>时空穿梭</font>」<br><li>出牌阶段，你可以与一名攻击距离内的角色交换位置，并补充<font color=cyan><b>20%</b></font>的<font color=cyan><b>能量</b></font>，然后目标需使用一张【<b>闪</b>】，否则你随机执行对目标造成一点雷属性伤害或获取目标一张牌中的其中一项，若你因此造成伤害，则该技能储备时间减少一回合。<br><br><li><b>锁定技</b>，游戏开始时你储备一次该技能；每两回合储备一次该技能，最多储备三次。",
            "sksn_benglie":"崩裂",
            "sksn_benglie_info":"「<font color=cyan>时空崩裂</font>」<br><li>回合结束时，若你的<font color=cyan><b>能量</b></font>已达到<font color=cyan><b>100%</b></font>，则你可以消耗所有<font color=cyan><b>能量</b></font>，并锁定一名角色，下回合开始时，你移动至该角色身边，并对该角色造成x点雷属性伤害（x为该角色的已损体力值，至少为一）若该角色因此进入濒死状态，则你直接将<font color=cyan><b>能量</b></font>补充至<font color=cyan><b>100%</b></font>，并令技能<font color=cyan><b>穿梭</b></font>直接储备两次<br><br><li><b>锁定技</b>，每当你造成伤害时，你补充<font color=cyan><b>20%</b></font>的<font color=cyan><b>能量</b></font>。（<font color=cyan><b>能量</b></font>至多为<font color=cyan><b>100%</b></font>）",

    sksn_lanbote:"兰伯特",
            "sksn_yanfan":"燕反",
            "sksn_yanfan_info":"「<font color=cyan>防守反击</font>」<br><li>每回合限一次，其他角色使用牌指定你为唯一目标时，你可以弃置一张牌，令使用者改为你，原使用者代替你成为此牌目标。",
            "sksn_jiansheng":"剑圣",
            "sksn_jiansheng_info":"「<font color=cyan>剑圣英姿</font>」<br><li>一名角色回合结束时，若你在本回合造成过伤害，你可以将手牌数摸至体力值数。",

    sksn_aidehua:"艾德华",
            "sksn_pianshu":"骗术",
	        "sksn_pianshu_info":"「<font color=cyan>致命玩笑</font>」<br><li>出牌阶段限X次（X为你的体力值数），你可以将一至两张手牌交给一名其他角色（不能为本回合以此法选择过的目标）。目标角色弃置所有手牌并摸等量的牌，然后其展示手牌并选择一项：<br>①增加2层「<font color=cyan>束缚</font>」；<br>②令你获得其Y张牌。（Y为其手牌中普通锦囊牌数）",
	        "sksn_guaidao":"怪盗",
	        "sksn_guaidao_info":"「<font color=cyan>贵族大盗</font>」<br><li><b>锁定技</b>，当你对本回合成为过〖骗术〗目标的角色即将造成伤害前，你获得其Z张手牌；当你对没有手牌的角色造成伤害时，你令该伤害+Z。（Z为本次触发技能对应效果前的伤害值数）",

    sksn_tiexin:"铁心",
           "sksn_jianghun":"匠魂",
           "sksn_jianghun_info":"「<font color=orange>巧夺天工</font>」<br><li>出牌阶段内限X次，当你使用一张牌时，若此牌为：装备牌，你可以摸一张牌；锦囊牌，你可以获得一张随机装备牌；否则可令X+1。（X为你的体力值）",
           "sksn_zongjiang":"宗匠",
           "sksn_zongjiang_info":"「<font color=orange>天才工匠</font>」<br><li>锁定技，当你装备区内的武器牌或防具牌因替换而进入弃牌堆时，防止之。",

    sksn_ying:"影",
    "YC":"终结",
    "YC_info":"「<font color=red>一击必杀</font>」<br><li><b>锁定技</b>，你的杀或决斗造成的伤害+x点，结算后失去此技能。（x为目标当前体力值）",
    "SKSN_Y_B":"屠戮",
    "SKSN_Y_B_info":"「<font color=red>杀戮之影</font>」<br><li><b>锁定技</b>，每当你于一轮内首次令一名其他角色进入濒死状态时，你于后续的回合结束后将手牌摸至x张（x为你的体力值），并执行一个额外的回合。",
    "SKSN_Y_A":"影狩",
    "SKSN_Y_A_info":"「<font color=red>狩影忍技</font>」<br><li><b>锁定技</b>，出牌阶段x次，每当你使用一张牌后，你需重铸一张牌<br><br><li>出牌阶段结束时，若你本回合发动技能<font color=red><b>影狩</b></font>的次数不小于x，则你可以视为使用一张杀。（x为你当前的体力上限）",
    
    sksn_yifandile_ab:"伊凡帝勒",
    sksn_yifandile:"伊凡帝勒",

//拆弹与合成
	"sksn_hecheng":"合成",
	"sksn_bombChai":"拆弹",
	"sksn_bombChai_info":"出牌阶段限一次，你可以弃置一张与数字标记点数相同的牌，然后移除你身上所有“可拆弹”的炸弹。",

    //————角色分栏————//
    "SKSN_qmsd":"<b>·<font color=#7AFEC6>启蒙时代</font></b>",
    "SKSN_kesg":"<b>·<font color=#FF9224>科恩曙光</font></b>",
    "SKSN_hqzz":"<b>·<font color=#FFD306>皇权之争</font></b>",
    "SKSN_hdfy":"<b>·<font color=#84C1FF>海都风云</font></b>",
    "SKSN_ylsk":"<b>·<font color=cyan>异裂时空</font></b>",
    "SKSN_wmdd":"<b>·<font color=Gray>雾漫</font><font color=LightGoldenrodYellow>帝都</font></b>",
    "SKSN_xrxw":"<b>·<font color=Crimson>血染</font><font color=RoyalBlue>峡湾</font></b>",
    "SKSN_mqdj":"<b>·<font color=Indigo>魔侵</font><font color=orange>东极</font></b>",
    "SKSN_sntx":"<b>·<font color=LimeGreen>神逆天序</font></b>",
    "SKSN_lmzg":"<b>·<font color=#FFFF37>黎明桎梏</font></b>",
    "SKSN_qita":"·<b>未确认",
},
			};
if(lib.device||lib.node){
				for(var i in shikongs.character){shikongs.character[i][4].push('ext:时空枢纽/'+i+'.jpg');}
			}else{
				for(var i in shikongs.character){shikongs.character[i][4].push('db:extension-时空枢纽:'+i+'.jpg');}
			}
			return shikongs;
		});
		lib.config.all.characters.push('shikongs');
		if(!lib.config.characters.contains('shikongs')) lib.config.characters.remove('shikongs');
		lib.translate['shikongs_character_config'] = "<img style=width:100px src="+lib.assetURL+"extension/时空枢纽/sksn_wujiangfenlan.png>";    
        //一键禁将
        if(lib.config.sksn_only2){
            var savedFilter = lib.filter.characterDisabled;
            lib.filter.characterDisabled = function(i,libCharacter){
                if(i && i.indexOf('sksn_') != 0){
                    return true;
                }
                return savedFilter(i,libCharacter);
            };
 }
//国战珠联璧合
    lib.perfectPair.sksn_ximengyaweili=['sksn_xiluwei','sksn_halisen']
    lib.perfectPair.sksn_aidehua=['sksn_eidehua']
    lib.perfectPair.sksn_lanbote=['sksn_saimiuer']
    lib.perfectPair.sksn_xiayi=['sksn_deyingkemeng','sksn_clemtin']
    lib.perfectPair.sksn_jianiao=['sksn_fuleicha']
    lib.perfectPair.sksn_youliweisi=['sksn_aodinggelan','sksn_luoyiao','sksn_sigeruopi']
    lib.perfectPair.sksn_pianxian=['sksn_feiluo']
    lib.perfectPair.sksn_nuoya=['sksn_lujinuo']
    lib.perfectPair.sksn_you=['sksn_hailingji']
    lib.perfectPair.sksn_dongfanghongdao=['sksn_xintianbuzhi','sksn_muguchen']
    lib.perfectPair.sksn_nuoya=['sksn_lujinuo']
 //名称颜色变化
 lib.translate['sksn_yifandile']='<span style="-webkit-animation:sksn_yifandile 20s infinite;animation:sksn_yifandile 20s infinite;">伊凡帝勒</span>';
        //卡牌（手牌）
        game.import('card',function(){
            var sksnshoupai={
                name:'sksnshoupai',
                connect:true,
    card:{
//——————卡牌——————//
//子夜披风
"sksn_card_ziyepifeng":{
	image:"ext:时空枢纽/sksn_card_ziyepifeng.png",
	fullskin:true,
	type:"equip",
	subtype:"equip2",
	skills:["sksn_card_ziyepifeng_skill"],
	onLose:function(){
		"step 0"
		player.sksnFaxian({
			cardList:get.inpile('basic'),
			prompt:'请选择一张牌获得之'
		});
		"step 1"
		var next=game.createEvent('sksn_card_ziyepifeng_gainShan');
		event.next.remove(next);
		var evt=event.getParent();
		if(evt.getlx===false) evt=evt.getParent();
		evt.after.push(next);
		next.player=player;
		next.cards=result;
		next.setContent(function(){
			player.logSkill('sksn_card_ziyepifeng_skill');
			if(cards.length) player.gain(cards,'draw','log');
		});
	},
	enable:true,
	filterTarget:lib.filter.isMe,
	selectTarget:-1,
	modTarget:true,
	toself:true,
	allowMultiple:false,
	loseDelay:false,
	content:function(){
		if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
	},
},
//精炼
"sksn_card_jinglianfu":{
	image:"ext:时空枢纽/sksn_card_jinglianfu.png",
	fullskin:true,
	fullimage:true,
	type:"equip",
	subtype:"equip5",
	filterTarget:lib.filter.isMe,
	selectTarget:-1,
	toself:true,
	loseDelay:false,
	skills:["sksn_card_jinglianfu_skill"],
	enable:true,
	modTarget:true,
	allowMultiple:false,
	content:function(){
		if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
	},
	ai:{
		basic:{
			equipValue:6.4
		}
	},
},
//烬鸟
"sksn_card_jinniao":{
	image:"ext:时空枢纽/sksn_card_jinniao.png",
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanBao",
	fullskin:true,
	audio:"ext:时空枢纽",
	enable:true,
	global:"sksn_card_jinniao_jinglian",
	range:{attack:1},
	filterTarget:function(card,player,target){
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var num=get.SksnBUFFNum(target,'_sksn_buff_ranshao');
		if(!num){
			target.changeSksnBUFF('_sksn_buff_ranshao',2);
		}else{
			target.changeSksnBUFF('_sksn_buff_ranshao',-num);
			target.damage(num,'fire');
        }
    },
	ai:{
		basic:{
			order:3,
			value:5.1,
			useful:2,
		},
		result:{
			target:function (player,target){
				var num=get.SksnBUFFNum(target,'_sksn_buff_ranshao');
				if(get.damageEffect(target,player,player,'fire')<=0) return 0;
				if(num==0) return -1.5;
				if(num>1) return -2*num;
				return 0;
			}
		},
		tag:{
			damage:1.5,
			natureDamage:1.5,
			fireDamage:1.5,
		}
	}
},
//惑菇
"sksn_card_huogu":{
	image:"ext:时空枢纽/sksn_card_huogu.png",
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanBao",
	fullskin:true,
	audio:"ext:时空枢纽",
	enable:true,
	filterTarget:function(){
		return true;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var next=player.choosePlayerCard(target,'h',1);
		next.filterButton=function(button){
			if(get.name(card)==get.name(button.link)) return false;
			if(_status.event.player.hasSkillTag('sksnJinglian')){
				if(get.type(button.link)=='basic') return true;
			}
			return get.color(card)==get.color(button.link);
		};
		next.ai=function(button){
			if(_status.event.att<=0) return 0;
			var evt=_status.event.getParent();
			return evt.target.hasValueTarget(button.link,true);
		};
		next.set('visible',true);
		next.set('att',get.attitude(player,target));
		"step 1"
		if(result.bool){
			var cardx={name:result.cards[0].name,isCard:true};
			if(target.hasUseTarget(cardx,true)&&
				!['equip','delay'].contains(get.type(cardx))){
				target.chooseUseTarget(cardx,true).set('addCount',false);
			}
		}
	},
	ai:{
		basic:{
			order:9,
			value:[5,3.1],
			useful:2.1,
		},
		result:{
			target:function(player,target,card){
				if(player.hasSkillTag('viewHandcard',null,target,true)||target==player){
					if(target.hasCard(function(cardx){
						return get.color(cardx)==get.color(card)&&
							target.hasValueTarget({name:cardx.name},true);
					},'h')) return 5;
					return 0;
				}
				return Math.min(target.countCards('h')-2,4);
			}
		}
	}
},
//寒潮过境
"sksn_card_hanchaoguojing":{
                image:"ext:时空枢纽/sksn_card_hanchaoguojing.png",
                fullskin:true,
                audio:"ext:时空枢纽",
                type:"trick",
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target!=player;
    },
                reverseOrder:true,
                enable:true,
                content:function(){
        "step 0"
        if(typeof event.baseDamage!='number') event.baseDamage=1;
        if(event.directHit) event._result={bool:false};
        else{
            var next=target.chooseToRespond({suit:'spade'});
            next.set('ai',function(card){
                var evt=_status.event.getParent();
                if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
                if(evt.player.hasSkillTag('notricksource')) return 0;
                if(evt.target.hasSkillTag('notrick')) return 0;
                if(evt.target.hp<=1) return 11-get.value(card);
                return 7-get.value(card);
            });
            next.prompt='【寒潮过境】';
            next.prompt2='请打出一张黑桃牌，或取消并受到一点冰属性伤害';
        }
        "step 1"
        if(result.bool==false){
            target.damage(event.baseDamage,event.customSource||player,'ice');
        }
    },
                ai:{
                    wuxie:function(target,card,player,viewer){
            if(get.attitude(viewer,target)>0&&target.countCards('h',{suit:'spade'})){
                if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
            }
        },
                    basic:{
                        order:9,
                        useful:[5.5,1.5],
                        value:5,
                    },
                    result:{
                        "target_use":function(player,target){
                if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7;
                return -1.5;
            },
                        target:function(player,target){
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7;
                return -1.5;
            },
                    },
                    tag:{
                        respond:1,
                        damage:1,
                        iceDamage:1,
                        natureDamage:1,
                        multitarget:1,
                        multineg:1,
                    },
                },
            },
//扇子
"sksn_card_jidianyulei":{image:"ext:时空枢纽/sksn_card_jidianyulei.png",
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-3,
                },
                ai:{
                    basic:{
                        equipValue:3,
                    },
                },
                skills:["sksn_card_jidianyulei_skill"],
            },
//丰收
"sksn_card_fengshoushengyan":{
                image:"ext:时空枢纽/sksn_card_fengshoushengyan.png",
                fullskin:true,
                audio:"ext:时空枢纽",
                type:"trick",
                enable:true,
                cardcolor:"red",
                filterTarget:true,
                selectTarget:-1,
                ignoreTarget:function (card,player,target){
        return target.isHealthy()&&target.countCards('h')>=4;
    },
                reverseOrder:true,
                content:function (){
        "step 0"
        var list=['回复一点体力','将手牌摸至四张'];
        if(target.countCards('h')>=4){
            list.remove('将手牌摸至四张');
        }
        if(target.isHealthy()){
            list.remove('回复一点体力');
        }
        if(list.length==2){
            var next=target.chooseControl();
            next.set('choiceList',list);
            next.ai=function(){
                var player=_status.event.player;
                if(player.countCards('h')>=3||player.hp==1){
                    return 0;
                }
                return 1;
            };
        }else if(list.length==1){
            event._result.index=(list[0]=='回复一点体力')?0:1;
        }else event.finish();
        "step 1"
        if(result.index==0){
            target.recover();
        }
        if(result.index==1){
            target.drawTo(4);
        }
    },
                ai:{
                    basic:{
                        order:9.5,
                        useful:2,
                        value:1,
                    },
                    result:{
                        target:function (player,target){
                var hs=Math.min(target.countCards('h'),4);
                return (target.hp<target.maxHp)?Math.max(4-hs,2):(4-hs);
            },
                    },
                    tag:{
                        recover:0.5,
                        draw:1,
                        multitarget:1,
                    },
                },
            },
//刃轮
"sksn_card_liporenlun":{image:"ext:时空枢纽/sksn_card_liporenlun.png",
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-1,
                },
                ai:{
                    basic:{
                        equipValue:7,
                        order:function(card,player){
                            if(player&&player.hasSkillTag('reverseEquip')){
                                return 8.5-get.equipValue(card,player)/20;
                            }
                            else{
                                return 8+get.equipValue(card,player)/20;
                            }
                        },
                        useful:2,
                        value:function(card,player,index,method){
                            if(player.isDisabled(get.subtype(card))) return 0.01;
                            var value=0;
                            var info=get.info(card);
                            var current=player.getEquip(info.subtype);
                            if(current&&card!=current){
                                value=get.value(current,player);
                            }
                            var equipValue=info.ai.equipValue;
                            if(equipValue==undefined){
                                equipValue=info.ai.basic.equipValue;
                            }
                            if(typeof equipValue=='function'){
                                if(method=='raw') return equipValue(card,player);
                                if(method=='raw2') return equipValue(card,player)-value;
                                return Math.max(0.1,equipValue(card,player)-value);
                            }
                            if(typeof equipValue!='number') equipValue=0;
                            if(method=='raw') return equipValue;
                            if(method=='raw2') return equipValue-value;
                            return Math.max(0.1,equipValue-value);
                        },
                    },
                    result:{
                        target:function(player,target,card){
                            return get.equipResult(player,target,card.name);
                        },
                    },
                },
                skills:["sksn_card_liporenlun_skill"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target==player;
                },
                modTarget:true,
                allowMultiple:false,
                content:function(){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                toself:true,
                fullimage:true,
            },
//教袍
"sksn_card_shengguangjiaopao":{image:"ext:时空枢纽/sksn_card_shengguangjiaopao.png",
                fullskin:true,
                type:"equip",
                subtype:"equip2",
                skills:["sksn_card_shengguangjiaopao_skill"],
                onLose:function(){
                    if(player.countMark('sksn_card_shengguangjiaopao_skill_zhuo')>0&&player.countDiscardableCards(player,'he')>0){
                        player.logSkill('sksn_card_shengguangjiaopao_skill');
                        var num=player.countMark('sksn_card_shengguangjiaopao_skill_zhuo');
                        player.removeMark('sksn_card_shengguangjiaopao_skill_zhuo',num);
                        player.chooseToDiscard('he',num,true);
                    }
                },
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function(card,player){
                            if(player&&player.hasSkillTag('reverseEquip')){
                                return 8.5-get.equipValue(card,player)/20;
                            }
                            else{
                                return 8+get.equipValue(card,player)/20;
                            }
                        },
                        useful:2,
                        value:function(card,player,index,method){
                            if(player.isDisabled(get.subtype(card))) return 0.01;
                            var value=0;
                            var info=get.info(card);
                            var current=player.getEquip(info.subtype);
                            if(current&&card!=current){
                                value=get.value(current,player);
                            }
                            var equipValue=info.ai.equipValue;
                            if(equipValue==undefined){
                                equipValue=info.ai.basic.equipValue;
                            }
                            if(typeof equipValue=='function'){
                                if(method=='raw') return equipValue(card,player);
                                if(method=='raw2') return equipValue(card,player)-value;
                                return Math.max(0.1,equipValue(card,player)-value);
                            }
                            if(typeof equipValue!='number') equipValue=0;
                            if(method=='raw') return equipValue;
                            if(method=='raw2') return equipValue-value;
                            return Math.max(0.1,equipValue-value);
                        },
                    },
                    result:{
                        target:function(player,target,card){
                            return get.equipResult(player,target,card.name);
                        },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target==player;
                },
                modTarget:true,
                allowMultiple:false,
                content:function(){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                toself:true,
            },
//复合重弩
"sksn_card_fuhezhongnu":{image:"ext:时空枢纽/sksn_card_fuhezhongnu.png",
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-3,
                },
                skills:["sksn_card_fuhezhongnu_skill"],
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function (card,player){
                            if(player&&player.hasSkillTag('reverseEquip')){
                                return 8.5-get.equipValue(card,player)/20;
                            }
                            else{
                                return 8+get.equipValue(card,player)/20;
                            }
                        },
                        useful:2,
                        value:function (card,player,index,method){
                            if(player.isDisabled(get.subtype(card))) return 0.01;
                            var value=0;
                            var info=get.info(card);
                            var current=player.getEquip(info.subtype);
                            if(current&&card!=current){
                                value=get.value(current,player);
                            }
                            var equipValue=info.ai.equipValue;
                            if(equipValue==undefined){
                                equipValue=info.ai.basic.equipValue;
                            }
                            if(typeof equipValue=='function'){
                                if(method=='raw') return equipValue(card,player);
                                if(method=='raw2') return equipValue(card,player)-value;
                                return Math.max(0.1,equipValue(card,player)-value);
                            }
                            if(typeof equipValue!='number') equipValue=0;
                            if(method=='raw') return equipValue;
                            if(method=='raw2') return equipValue-value;
                            return Math.max(0.1,equipValue-value);
                        },
                    },
                    result:{
                        target:function(player,target,card){
                            return get.equipResult(player,target,card.name);
                        },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
                    return target==player;
                },
                modTarget:true,
                allowMultiple:false,
                content:function (){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                toself:true,
            },
//火统枪
 "sksn_card_huochong":{image:"ext:时空枢纽/sksn_card_huochong.png",
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                ai:{
                    order:function(){
            return get.order({name:'sha'})-0.1;
        },
                    equipValue:function(card,player){
            if(player._sksn_card_huochong_temp) return 1;
            player._sksn_card_huochong_temp=true;
            var result=function(){
                if(!game.hasPlayer(function(current){
                    return get.distance(player,current)<=1&&player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
                })){
                    return 1;
                }
                if(player.hasSha()&&_status.currentPhase==player){
                    if(player.getEquip('sksn_card_huochong')&&player.countUsed('sha')||player.getCardUsable('sha')==0){
                        return 10;
                    }
                }
                var num=player.countCards('h','sha');
                if(num>1) return 6+num;
                return 3+num;
            }();
            delete player._sksn_card_huochong_temp;
            return result;
        },
                    basic:{
                        equipValue:5,
                    },
                    tag:{
                        valueswap:1,
                    },
                },
                skills:["sksn_card_huochong_skill"],
            },
//三叉戟
"sksn_card_sanchaji":{
	            image:"ext:时空枢纽/sksn_card_sanchaji.png",
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                skills:["sksn_card_sanchaji_skill"],
                distance:{
                    attackFrom:-2,
                },
                ai:{
                    basic:{
                        equipValue:7,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
//猪幸福
"sksn_card_zhuxingfu":{
	            image:"ext:时空枢纽/sksn_card_zhuxingfu.png",
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
//地图·飞云渡
"sksnC_feiyunduLand":{
                image:"ext:时空枢纽/sksnC_feiyunduLand.jpg",
                type:"land",
                fullborder:"bronze",
                enable:function (card,player){
        return !player.hasSkill('land_used');
    },
                notarget:true,
                content:function (){
        "step 0"
        player.changeSksnLand('sksnC_feiyunduLand');
        "step 1"
        player.chooseTarget('封印一名其他角色',true).set('ai',function(target){
            if(get.attitude(_status.event.player,target)>0) return 0;
            var rank=0;
            var skills=target.getSkills(true,false);
            for(var i=0;i<skills.length;i++){
                if(!get.is.locked(skills[i])&&!lib.skill[skills[i]].charlotte){
                    rank+=get.skillRank(skills[i]);
                }
            }
            return rank;
        }).set('filterTarget',lib.filter.notMe);
        "step 2"
        if(result.targets){
            result.targets[0].addTempSkill('fengyin');
        }
    },
                ai:{
                    value:5,
                    useful:3,
                    order:4,
                    result:{
                        player:1,
                    },
                },
            },
//地图·凯洛亚学院
"sksnC_KelloaCollegeLand":{
                image:"ext:时空枢纽/sksnC_KelloaCollegeLand.jpg",
                type:"land",
                fullborder:"silver",
                enable:function (card,player){
        return !player.hasSkill('land_used');
    },
                notarget:true,
                content:function (){
        "step 0"
        player.changeSksnLand('sksnC_KelloaCollegeLand');
        "step 1"
        player.sksnFaxian({
            cardList:get.inpile('trick','trick'),
            prompt:'请选择一张牌获得之'
        });
        "step 2"
        if(result){
            player.gain(result,'log','gain2');
        }
    },
                ai:{
                    value:5,
                    useful:3,
                    order:4,
                    result:{
                        player:1,
                    },
                },
            },
//魔蛙//
"sksn_card_mowa":{
	image:"ext:时空枢纽/sksn_card_mowa.png",
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanBao",
	fullskin:true,
	audio:"ext:时空枢纽",
	global:["sksn_card_mowa_jinglian"],
	enable:true,
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		target.chooseToUse(function(card,player,event){
			if(get.name(card)!='sha') return false;
			return lib.filter.filterCard.apply(this,arguments);
		},'魔蛙：对'+get.translation(player)+'使用一张【杀】，或被附加2层「<font color=blue>降势</font>」').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
            if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
            return lib.filter.filterTarget.apply(this,arguments);
        }).set('sourcex',player);
        "step 1"
        if(result.bool!=true){
            target.changeSksnBUFF("_sksn_buff_jiangshi",2);
        }
    },
	ai:{
		basic:{
			order:4,
			value:3.1,
			useful:2,
		},
		result:{
			target:function (player,target){
				if(!target.canUse('sha',player,true,true)) return -1.5;
				if(!target.countCards('h')) return -2;
				return -1/target.countCards('h');
			},
			player:function (player,target){
				if(player.hp<=2) return -2;
				if(player.countCards('h','shan')==0) return -0.9;
				return 0;
			},
		},
	},
},
//日落星辰//
"sksn_card_rlxc":{
            	image:"ext:时空枢纽/sksn_card_rlxc.png",
                type:"equip",
                subtype:"equip5",
                filterTarget:function(card,player,target){
                    return player==target;
                },
                selectTarget:-1,
                toself:true,
                loseDelay:false,
                onEquip:function(){
                    card.datas=[player.countCards('h'),player.hp];
                    player.syncStorage('sksn_card_rlxc_skill');
                    player.markSkill('sksn_card_rlxc_skill');
                },
                onLose:function(){
                    if(card.datas){
                        var hp=card.datas[1];
                        var draw=card.datas[0];
                        if(hp>player.hp||draw>player.countCards('h')) player.logSkill('sksn_card_rlxc_skill');
                        if(hp>player.hp){
                            var re=hp-player.hp;
                            if(re>5) re=5;
                            player.recover(re);
                        }
                        if(draw>player.countCards('h')){
                            var dr=draw-player.countCards('h');
                            if(dr>5) dr=5;
                            player.draw(dr);
                        }
                        card.datas=false;           
                        player.unmarkSkill('sksn_card_rlxc_skill');
                    }
                },
                ai:{
                    order:12,
                    value:function(card,player){
                        if(player.hp<2||player.countCards('h')<2||get.position(card)!='e') return 0.5;
                        return player.countCards('h')+player.hp-2;
                    },
                    equipValue:function(card,player){
                        var re=(player.hp-2)*2;
                        var dr=player.countCards('h')-2;
                        return 2+re+dr;
                    },
                    basic:{
                        equipValue:3,
                    },
                },
                skills:["sksn_card_rlxc_skill"],
                enable:true,
                modTarget:true,
                allowMultiple:false,
                content:function(){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                fullskin:true,
            },
//————魔能甲————//
"sksn_card_monengjia":{
	            image:'ext:时空枢纽/sksn_card_monengjia.png',
                type:"equip",
                subtype:"equip2",
                filterTarget:function(card,player,target){
        return player==target;
    },
                selectTarget:-1,
                toself:true,
                loseDelay:false,
                onEquip:function(){
        player.changeHujia();
    },
                ai:{
                    basic:{
                        equipValue:7,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["sksn_card_monengjia_skill"],
                enable:true,
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                fullskin:true,
            },
//——————海蛟——————//
"sksn_card_haijiao":{
         image:'ext:时空枢纽/sksn_card_haijiao.png',
         fullskin:true,
         skills:["sksn_card_haijiao_A"],
           type:"equip",
           subtype:"equip3",
            distance:{
              globalTo:1,
                 },
            enable:true,
           selectTarget:-1,
            filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
                ai:{
                    basic:{
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        equipValue:8,
                        value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                fullimage:true,
            },
//——————雷龙——————//
"sksn_card_poyuleilong":{
	image:'ext:时空枢纽/sksn_card_poyuleilong.png',
	fullskin:true,
                skills:["sksn_card_poyuleilong_A"],
                type:"equip",
                subtype:"equip4",
                distance:{
                    globalFrom:-1,
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
                ai:{
                    basic:{
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        equipValue:6,
                        value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                fullimage:true,
            },
//—————平安坠————//
"sksn_card_biyouhufu":{
                image:"ext:时空枢纽/sksn_card_biyouhufu.png",
                type:"equip",
                fullskin:true,
                subtype:"equip5",
                filterTarget:function(card,player,target){
        return player==target;
    },
                selectTarget:-1,
                toself:true,
                loseDelay:false,
                onEquip:function(){
        player.gainMaxHp();
    },
                onLose:function(){
        player.loseMaxHp();
    },
                ai:{
                    basic:{
                        equipValue:7,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["sksn_card_biyouhufu_skill"],
                enable:true,
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                fullimage:true,
            },
//血魇刀
"sksn_card_swordOfNTR":{
    image:'ext:时空枢纽/sksn_card_swordOfNTR.png',
    fullskin:true,
    type:"equip",
    subtype:"equip1",
    distance:{
        attackFrom:-1,
    },
    skills:["sksn_swordOfNTR1"],
    enable:true,
	filterTarget:lib.filter.notMe,
	selectTarget:1,
    toself:false,
    ai:{
		order:9,
		equipValue:function(card,player){
			if(get.position(card)=='e') return 0;
			return -get.value(player.getCards('e'))+1;
		},
		value:function(card,player){
			if(player.getEquip(1)==card){
				return player.isMaxHp(true)||player.hasSkillTag('NTRpower');
			};
			return 3;
		},
		basic:{
			equipValue:5,
		},
		result:{
			keepAI:true,
			target:function(player,target){
				if(target.isMaxHp(true)){
					if(target.getEquip(1)&&get.value(target.getEquip(1),target)<1) return 1;
					return 0;
				}
				return -1;
			},
		},
    },
},
//蛇莲
"SKSN_card_shelian":{
    image:'ext:时空枢纽/SKSN_card_shelian.png',
    type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanBao",
    fullskin:true,
    audio:"ext:时空枢纽",
    toself:true,
    enable:true,
    global:["sksnS_shelian","sksn_card_shelian_jinglian"],
    selectTarget:-1,
    filterTarget:function(card,player,target){
        return target==player;
    },
    modTarget:true,
    delay:false,
    content:function(){
        target.draw(event.baseDamage||1).type='SKSN_card_shelian';
        if(target.isDamaged()){
            target.draw(event.baseDamage||1).type='SKSN_card_shelian2';
        }
    },
    ai:{
        basic:{
            order:7.3,
            useful:function (card,i){
                if(_status.event.player.isDamaged()) return 7.3;
                if(i==0) return 3;
                return 4.9;
            },
            value:function (card,player,i){
                if(player.getHandcardLimit()>player.countCards('h')){
                    if(i==0) return 6;
                    return 3;
                }
                if(i==0) return 4.9;
                return 2;
            },
        },
        result:{
            target:2,
            "target_use":function (player,target){
                if(target.getHandcardLimit()>target.countCards('h')&&target.isDamaged()){
                    return 4;
                }
                if(player.getHandcardLimit()<=2) return 2;
				if(player.countCards('h',function(card){
					return get.value(card)>get.value({name:'SKSN_card_shelian'});
				})>=player.getHandcardLimit()) return 3;
                return 0;
            }
        },
        tag:{
            draw:1,
        },
    },
},
//海妖之歌
"SKSN_haiyaozhige":{
	image:'ext:时空枢纽/SKSN_haiyaozhige.png',
	fullskin:true,
	audio:"ext:时空枢纽",
	type:'trick',
	selectTarget:-1,
	filterTarget:function(card,player,target){
		return target!=player;
	},
	reverseOrder:true,
	enable:true,
	content:function(){
		"step 0"
		if(typeof event.baseDamage!='number') event.baseDamage=1;
		if(event.directHit) event._result={bool:false};
		else{
			var next=target.chooseToUse();
			next.filterCard=function(card){
				if(get.tag(card,'damage')) return true;
				return false;
			};
			next.prompt='【海妖之歌】';
			next.prompt2='使用一张有「伤害」标签的牌，或取消并受到你下家对你造成1点伤害';
		}
		"step 1"
		if(result.bool==false){
			target.damage(event.baseDamage,target.next||'nosource');
		}
	},
	ai:{
		wuxie:function(target,card,player,viewer){
			if(get.attitude(viewer,target)>0){
				if(target.hp>1||target.countCards('hs')>4) return 0;
			}else{
				if(target.countCards('hs',function(cardx){
					return get.tag(cardx,'damage')&&target.hasUseTarget(cardx,true,true);
				})) return 0.1;
			}
		},
		basic:{
			order:2.1,
			useful:5,
			value:4.5
		},
		result:{
			target_use:function(player,target){
				if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
				var nh=target.countCards('h');
				if(get.mode()=='identity'){
					if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
				}
				if(nh==0) return -2;
				if(nh==1) return -1.7;
				return -1.5;
			},
			target:function(player,target){
				var nh=target.countCards('h');
				if(get.mode()=='identity'){
					if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
				}
				if(nh==0) return -2;
				if(nh==1) return -1.7;
				return -1.5;
			},
		},
		tag:{
			damage:1,
			multitarget:1,
			multineg:1,
		}
	},
},
//暗金圣剑
    "SKSN_anjinshengjian":{
    image:'ext:时空枢纽/SKSN_anjinshengjian.png',
    fullskin:true,
        type:"equip",
        subtype:"equip1",
        skills:["SKSN_anjinshengjian_A"],
    ai:{
        basic:{
            equipValue:7,
            order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
            useful:2,
            value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
        },
        result:{
            target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
        },
    },
    enable:true,
    selectTarget:-1,
    filterTarget:function (card,player,target){
        return target==player;
    },
    modTarget:true,
    allowMultiple:false,
    content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
    toself:true,
    fullimage:true,
},
//帕朵玛拉
"sksn_Pamadora":{
image:'ext:时空枢纽/sksn_Pamadora.png',
type:"equip",
 subtype:"equip5",
 fullskin:true,
    skills:["sksn_pamadora1","sksn_pamadora2"],
    onLose:function (){
        player.logSkill('sksn_pamadora2');
        var next=game.createEvent('sksn_pamadora3');
        event.next.remove(next);
        event.getParent().after.push(next);
        next.player=player;
        next.setContent(function(){
            player.gain(game.createCard2('du','spade',9),'gain2');
        });
    },
    filterLose:function (card,player){
        if(player.hasSkillTag('unequip5')) return false;
        return true;
    },
    ai:{
        equipValue:5,
        basic:{
            equipValue:5,
        },
    },
    fullimage:true,
},

//影刃刀
"sksn_card_yingrendao":{
    image:'ext:时空枢纽/sksn_card_yingrendao.png',
    fullskin:true,
    type:"equip",
    subtype:"equip1",
    distance:{
    attackFrom:-1,
    },
    skills:["SKSN_card_YRD_A","SKSN_card_YRD_B"],
    enable:true,
    selectTarget:-1,
    filterTarget:function (card,player,target){
        return target==player;
    },
    modTarget:true,
    allowMultiple:false,
    content:function (){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
    toself:true,
    ai:{
        basic:{
            equipValue:8,
            order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
            useful:2,
            value:function (card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
        },
        result:{
            target:function (player,target,card){
                return get.equipResult(player,target,card.name);
            },
        },
    },
},
//————专属卡牌————//
//海默德·血饵
"sksn_card_xieer":{
	image:'ext:时空枢纽/sksn_card_xieer.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanBao",
	enable:false,
	global:["sksn_card_xieer_g","sksn_card_xieer_jinglian"],
	ai:{
		value:-4.5,
		useful:0,
	},
},
//杰西·弗雷查
"sksnC_cailiaoBasic":{
	image:'ext:时空枢纽/sksnC_cailiaoBasic.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanCai",
	notarget:true,
	global:"sksn_hecheng",
	ai:{
		basic:{
			order:2,
			useful:2,
			value:3,
		},
	},
},
"sksnC_cailiaoSenior":{
	image:'ext:时空枢纽/sksnC_cailiaoSenior.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanCai",
	enable:true,
	filterTarget:function(card,player,target){
		return target.countCards('h')<5;
	},
	content:function(){
		target.drawTo(5);
	},
	ai:{
		basic:{
			order:1,
			useful:2,
			value:[6,5],
		},
		tag:{
			draw:2,
		},
		result:{
			target:function(player,target){
				return Math.max(4-target.countCards('h'),0);
			},
		},
	},
},

"sksnC_bombGrenade":{
	image:'ext:时空枢纽/sksnC_bombGrenade.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	range:{attack:1},
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		target.damage();
	},
	ai:{
		basic:{
			order:4.1,
			value:3,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
		},
	},
},
"sksnC_bombFire":{
	image:'ext:时空枢纽/sksnC_bombFire.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	range:{attack:1},
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		target.damage('fire');
		target.changeSksnBUFF("_sksn_buff_ranshao",2);
	},
	ai:{
		basic:{
			order:4.1,
			value:3.3,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
			fireDamage:1.5,
			natureDamage:1,
		},
	},
},
"sksnC_bombTime":{
	image:'ext:时空枢纽/sksnC_bombTime.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	range:{attack:1},
	filterTarget:function (card,player,target){
		if(target.hasSkill('sksn_bombChai')) return false;
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var list=[1,2,3,4,5,6,7,8,9,10,11,12,13];
		player.chooseControl(list).set('ai',function(){
			return list.randomGet();
		});
		"step 1"
		if(result.control){
			event.num=result.control;
		}else{
			event.num=13;
		}
		"step 2"
		player.chooseControl().set('choiceList',[
			'成为一张牌的目标后',
			'回复体力后',
			'弃牌阶段开始时'
		]).set('ai',function(){
			if(target&&target.hp<=1) return 1;
			return 0;
		});
		"step 3"
		switch(result.index){
			case 0:event.cho='useCardToTargeted';break;
			case 1:event.cho='recoverAfter';break;
			default:event.cho='phaseDiscardBegin';
		}
		"step 4"
		if(!target.hasSkill('sksn_bombChai')){
			target.addAdditionalSkill('sksn_bombChai','sksn_bombChai');
		}
		target.storage['sksn_bombChai'].num=event.num;
		target.storage['sksn_bombChai'].bomb.push(card);
		target.storage['sksnC_bombTime_skill']=event.cho;
		target.syncStorage('sksn_bombChai');
	},
	ai:{
		basic:{
			order:4.3,
			value:3.4,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
		},
	},
},
"sksnC_bombMine":{
	image:'ext:时空枢纽/sksnC_bombMine.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		if(target.hasSkill('sksn_bombChai')) return false;
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var list=[1,2,3,4,5,6,7,8,9,10,11,12,13];
		player.chooseControl(list).set('ai',function(){
			return list.randomGet();
		});
		"step 1"
		if(result.control){
			event.num=result.control;
		}else{
			event.num=13;
		}
		"step 2"
		var list2=[
			['基本','','sha'],
			['基本','','shan'],
			['基本','','tao'],
			['锦囊','','wuxie'],
		];
		var next=player.chooseButton(['请选择一种牌名：',[list2,'vcard']],1,true);
		next.set('ai',function(button){
			if(target&&target.hp<=1) return button.link[2]=='tao';
			var player=_status.event.player;
			if(player.countCards('h','juedou')) return button.link[2]=='sha';
			return button.link[2]==['shan','wuxie'].randomGet();
		});
		"step 3"
		if(result.links) event.cho=result.links[0][2];
		else event.cho='wuxie';
		"step 4"
		if(!target.hasSkill('sksn_bombChai')){
			target.addAdditionalSkill('sksn_bombChai','sksn_bombChai');
		}
		target.storage['sksn_bombChai'].num=event.num;
		target.storage['sksn_bombChai'].bomb.push(card);
		target.storage['sksnC_bombMine_skill']=event.cho;
		target.syncStorage('sksn_bombChai');
	},
	ai:{
		basic:{
			order:4.3,
			value:3.5,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
		},
	},
},
"sksnC_bombSmoke":{
	image:'ext:时空枢纽/sksnC_bombSmoke.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	range:{attack:1},
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		target.changeSksnBUFF("_sksn_buff_mimang",1);
	},
	ai:{
		basic:{
			order:4.4,
			value:3.7,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
		},
	},
},
"sksnC_bombAshes":{
	image:'ext:时空枢纽/sksnC_bombAshes.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		if(target.hasSkill('sksn_bombChai')) return false;
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var list=[1,2,3,4,5,6,7,8,9,10,11,12,13];
		player.chooseControl(list).set('ai',function(){
			return list.randomGet();
		});
		"step 1"
		if(result.control){
			event.num=result.control;
		}else{
			event.num=13;
		}
		"step 2"
		if(!target.hasSkill('sksn_bombChai')){
			target.addAdditionalSkill('sksn_bombChai','sksn_bombChai');
		}
		target.storage['sksn_bombChai'].num=event.num;
		target.storage['sksn_bombChai'].bomb.push(card);
		target.syncStorage('sksn_bombChai');
	},
	ai:{
		basic:{
			order:4.3,
			value:3.5,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
		},
	},
},
"sksnC_bombDragon":{
	image:'ext:时空枢纽/sksnC_bombDragon.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:function (){
		if(ui.selected.targets.length>1) return 3;
		return [1,3];
	},
	content:function (){
		if(targets.length>1){
			target.damage('fire');
		}else{
			target.damage('fire',2);
			player.discardPlayerCard(target,1,'he',true);
		}
	},
	ai:{
		basic:{
			order:4.2,
			value:3.6,
			useful:3,
		},
		result:{
			target:function(player,target){
				if(ui.selected.targets.length==1) return 0;
				return -2;
			},
		},
		tag:{
			sksnBomb:true,
			damage:2.5,
			fireDamage:2,
			natureDamage:2,
		},
	},
},
"sksnC_bombWither":{
	image:'ext:时空枢纽/sksnC_bombWither.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		if(get.distance(player,target,'attack')<=1) return false;
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		target.damage();
		target.changeSksnBUFF("_sksn_buff_diaoling",2);
	},
	ai:{
		basic:{
			order:4.1,
			value:3.3,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
		},
	},
},
"sksnC_bombSuperBig":{
	image:'ext:时空枢纽/sksnC_bombSuperBig.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		return player!=target;
	},
	selectTarget:[1,2],
	content:function (){
		target.damage(2);
	},
	ai:{
		basic:{
			order:4.1,
			value:3.7,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:2,
		},
	},
},
"sksnC_bombFixed":{
	image:'ext:时空枢纽/sksnC_bombFixed.png',
	fullskin:true,
	type:"sksnCtype_ziyuan",
	subtype:"sksnCtype_ziyuanDao",
	enable:true,
	filterTarget:function (card,player,target){
		if(target.hasSkill('sksn_bombChai')) return false;
		return player!=target;
	},
	selectTarget:1,
	content:function (){
		"step 0"
		var list=[1,2,3,4,5,6,7,8,9,10,11,12,13];
		player.chooseControl(list).set('ai',function(){
			return list.randomGet();
		});
		"step 1"
		if(result.control){
			event.num=result.control;
		}else{
			event.num=13;
		}
		"step 2"
		if(!target.hasSkill('sksn_bombChai')){
			target.addAdditionalSkill('sksn_bombChai','sksn_bombChai');
		}
		target.storage['sksn_bombChai'].num=event.num;
		target.storage['sksn_bombChai'].bomb.push(card);
		target.syncStorage('sksn_bombChai');
	},
	ai:{
		basic:{
			order:4.1,
			value:3.9,
			useful:3,
		},
		result:{
			target:-2,
		},
		tag:{
			sksnBomb:true,
			damage:1,
		},
	},
},
        
},
    skill:{
//————卡牌技能————//
//子夜披风
"sksn_card_ziyepifeng_skill":{
	trigger:{
		player:"loseAfter",
		global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"]
	},
	usable:1,
	forced:true,
	filter:function (event,player){
		if(player==_status.currentPhase) return false;
		if(event.name=='gain'&&event.player==player) return false;
		var evt=event.getl(player);
		if(evt&&evt.cards2&&evt.cards2.length>0){
			for(var i=0;i<evt.cards2.length;i++){
				if(evt.cards2[i].name!='shan') return true;
			}
		}
		return false;
	},
	content:function (){
		"step 0"
		var cardx=get.discardPile(function(card){
			return card.name=='shan';
		});
		if(cardx) player.gain(cardx,'draw','log');
	}
},
//精炼珍宝
"sksn_card_shelian_jinglian":{
	enable:"phaseUse",
	usable:1,
	filter:function (event,player){
		if(player.hasSkillTag('sksnJinglian')){
			return player.hasCard({name:'SKSN_card_shelian'},'h');
		}
		return false;
	},
	filterTarget:lib.filter.notMe,
	filterCard:{
		name:'SKSN_card_shelian'
	},
	position:"h",
	discard:false,
	lose:false,
	delay:false,
	check:function (card){
		var player=get.owner(card);
		if(ui.selected.targets[0]&&ui.selected.targets[0].hp==1) return 7-get.value(card);
		if(player.isHealthy()) return 6-get.value(card);
		return 0;
	},
	content:function (){
		"step 0"
		targets[0].gain(cards,player,'giveAuto');
	},
	ai:{
		order:8,
		result:{
			target:function (player,target){
				if(target.hp==1) return -2;
				if(player.isHealthy()) return 1;
				return 0;
			},
			player:1
		},
	},
},
"sksn_card_mowa_jinglian":{
	trigger:{
		player:"useCardToTargeted"
	},
	forced:true,
	filter:function (event,player){
		if(player.hasSkillTag('sksnJinglian')){
			return event.card&&event.card.name=='sksn_card_mowa'&&
				player.inRangeOf(event.target)&&event.target.getEquip(1);
		}
		return false;
	},
	content:function (){
		"step 0"
		var next=player.discardPlayerCard(trigger.target,'e',true);
		next.filterButton=function(button){
			return get.subtype(button.link)=='equip1';
		};
		next.ai=function(card){
			return get.equipValue(card);
		};
		next.set('prompt','魔蛙精炼：请弃置'+get.translation(trigger.target)+'的武器牌');
	},
},
"sksn_card_xieer_jinglian":{
	mod:{
		ignoredHandcard:function(card,player){
			if(player.hasSkillTag('sksnJinglian')){
				if(card.name=='sksn_card_xieer'){
					return true;
				}
			}
		},
		cardDiscardable:function(card,player,name){
			if(player.hasSkillTag('sksnJinglian')){
				if(name=='phaseDiscard'&&card.name=='sksn_card_xieer'){
					return false;
				}
			}
		}
	},
},
"sksn_card_jinniao_jinglian":{
	mod:{
		targetInRange:function(card,player,target,now){
			if(player.hasSkillTag('sksnJinglian')){
				if(card.name=='sksn_card_jinniao') return true;
			}
		},
	}
},
//精炼锅
"sksn_card_jinglianfu_skill":{
	mod:{
		maxHandcard:function(player,num){
			return num+1;
		}
	},
	ai:{
		sksnJinglian:true
	},
},
//扇子
"sksn_card_jidianyulei_skill":{
                equipSkill:true,
                audio:"ext:时空枢纽:1",
                trigger:{
                    player:"useCard1",
                },
                filter:function(event,player){
                    if(event.card.name=='sha'&&get.color(event.card)=='black'&&player.countCards('h',function(card){
                        return get.color(card)=='black'&&get.number(card)<=9&&get.number(card)>=2;
                    })>0) return true;
                },
                direct:true,
                content:function(){
                    "step 0"
                    var next=player.chooseToDiscard('h',function(card){
                        return get.color(card)=='black'&&get.number(card)<=9&&get.number(card)>=2;
                    }).set('ai',function(card){
                        var eff=0;
                        var player=_status.event.player;
                        for(var i=0;i<trigger.targets.length;i++){
                            var target=trigger.targets[i];
                            if(get.damageEffect(target,player,player,'thunder')<0) return 0;
                            var eff1=get.damageEffect(target,player,player);
                            var eff2=get.damageEffect(target,player,player,'thunder');
                            eff+=eff2;
                            eff-=eff1;
                        }
                        if(eff>0) return 10-get.value(card);
                    }).set('prompt',get.prompt('sksn_card_jidianyulei_skill')).set('logSkill','sksn_card_jidianyulei_skill');
                    next.set('prompt2','将'+get.translation(trigger.card)+'改为雷属性，且伤害+1');
                    "step 1"
                    if(result.bool){
                        if(trigger.card.nature!='thunder'){
                            trigger.card.nature='thunder';
                            if(get.itemtype(trigger.card)=='card'){
                                var next=game.createEvent('sksn_card_jidianyulei_clear');
                                next.card=trigger.card;
                                event.next.remove(next);
                                trigger.after.push(next);
                                next.setContent(function(){
                                    delete card.nature;
                                });
                            }
                        }
                        if(!trigger.baseDamage) trigger.baseDamage=1;
                        trigger.baseDamage++;
                    }
                },
            },
//刃轮
"sksn_card_liporenlun_skill":{audio:"ext:时空枢纽:1",
                equipSkill:true,
                trigger:{
                    player:"useCardToPlayered",
                },
                direct:true,
                filter:function(event,player){ 
                    if(event.card.name!='sha'||player.countCards('h')<1) return false; 
                    if(player.countCards('h',{color:'black'})<1&&event.target.countGainableCards(player,'h')<1) return false; 
                    if(player.countCards('h',{color:'red'})<1&&event.getParent().directHit.contains(event.target)) return false; 
                    return true; 
                },
                content:function(){ 
                    "step 0" 
                    player.chooseToDiscard(get.prompt('sksn_card_liporenlun_skill'),'弃置一张红色手牌获得'+get.translation(trigger.target)+'一张手牌，或弃置一张黑色手牌令'+get.translation(trigger.card)+'需要用两张【闪】抵消。').set('ai',function(card){ 
                        var trigger=_status.event.getTrigger(); 
                        if(get.attitude(trigger.player,trigger.target)>0) return 0;
                        if(!trigger.target.mayHaveShan()&&get.color(card)=='black') return 0;
                        if(trigger.target.countGainableCards(player,'h')<1&&get.color(card)=='red') return 0;
                        return 7-get.value(card); 
                    }).set('logSkill',['sksn_card_liporenlun_skill',trigger.target]);
                    "step 1" 
                    if(result.bool){
                        if(get.color(result.cards[0])=='red'){
                            player.gainPlayerCard(trigger.target,1,'h',true);
                        }
                        else if(get.color(result.cards[0])=='black'){
                            game.log(trigger.player,'对',trigger.target,'使用的',trigger.card,'需要用两张【闪】抵消。');
                            var id=trigger.target.playerid; 
                            var map=trigger.getParent().customArgs; 
                            if(!map[id]) map[id]={}; 
                            if(typeof map[id].shanRequired=='number'){ 
                                map[id].shanRequired++; 
                            } 
                            else{ 
                                map[id].shanRequired=2; 
                            }
                        }
                    }
                },
            },
//教袍
"sksn_card_shengguangjiaopao_skill":{audio:"ext:时空枢纽:1",
                trigger:{
                    player:["changeSksnBUFFBegin1","damageBefore"],
                },
                filter:function (event,player,onrewrite){
                    if(onrewrite=='damageBefore'){
                        return event.nature=='fire';
                    }
                    else return event.num>0;
                },
                check:function (event,player,onrewrite){
                    if(event.name=='damage') return true;
                    else return get.SksnBUFFRank(player,event.buff,false);;
                },
                prompt:function (event,player,onrewrite){
                    var tip='（';
                    if(event.name=='damage'){
                        if(event.source) tip+='防止'+get.translation(event.source)+'即将对你造成的火焰伤害';
                        else tip+='防止你即将受到的火焰伤害';
                    }
                    else{
                        tip+='防止你即将获得的'+get.translation(event.buff);
                    }
                    tip+='）';
                    return get.prompt('sksn_card_shengguangjiaopao_skill')+tip;
                },
                content:function(){
                    'step 0'
                    var onrewrite=event.triggername;
                    if(onrewrite=='damageBefore'){
                        if(trigger.source) game.log(player,'防止了',trigger.source,'即将对其造成的火焰伤害');
                        else game.log(player,'防止了其即将受到的火焰伤害');
                        trigger.cancel();
                    }
                    else{
                        game.log(player,'防止了即将获得的',trigger.buff);
                        trigger.cancel();
                    }
                    'step 1'
                    player.addMark('sksn_card_shengguangjiaopao_skill_zhuo',1);
                    'step 2'
                    if(player.countMark('sksn_card_shengguangjiaopao_skill_zhuo')>3){
                        var num=player.countMark('sksn_card_shengguangjiaopao_skill_zhuo');
                        player.removeMark('sksn_card_shengguangjiaopao_skill_zhuo',num);
                        player.chooseToDiscard(num).set('ai',function(card){ 
                            if(card.name=='tao') return -10; 
                            if(card.name=='jiu'&&_status.event.player.hp==1) return -10; 
                            return get.unuseful(card)+2.5*(5-get.owner(card).hp); 
                        });
                    }
                    else event.finish();
                    'step 3'
                    if(result.bool==false){ 
                        player.loseHp(); 
                    }
                },
                subSkill:{
                    zhuo:{
                        mark:true,
                        marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_zhuo.jpg>",
                        intro:{
                            name:"<b><font color=black>浊</font></b>",
                            content:"mark",
                        },
                        sub:true,
                    },
                },
            },
//火铳
"sksn_card_huochong_skill":{audio:"ext:时空枢纽:1",
                trigger:{
                    player:"shaBegin",
                },
                forced:true,
                filter:function(event,player){
                    var num=player.countUsed('sha',true)
                    return _status.currentPhase==player&&Math.random()<0.2*num;
                },
                content:function(){
                    game.log(player,'对',trigger.target,'使用的',trigger.card,'无法闪避');
                    trigger.directHit=true;
                },
                mod:{
                    cardUsable:function(card,player,num){ 
                        if(card.name=='sha') return num+player.maxHp; 
                    },
                },
            },
//复合重弩
 "sksn_card_fuhezhongnu_skill":{audio:"ext:时空枢纽:1",
                subSkill:{
                    dis:{
                        trigger:{
                            source:["damageAfter"],
                        },
                        filter:function (event,player){ 
                            if(event.player.maxHp-event.player.hp<=event.player.hp) return false;
                            return event.player.isIn()&&event.player.getEquip(2)&&event.card&&event.card.name=='sha'&&event.parent.skill=='sksn_card_fuhezhongnu_skill';
                        },
                        forced:true,
                        content:function(){
                            trigger.player.discard(trigger.player.getEquip(2));
                        },
                        sub:true,
                    },
                },
                enable:"phaseUse",
                usable:1,
                filter:function(event,player){ 
                    return player.hasUseTarget({name:'sha'},false,true)&&player.countCards('h',{name:'sha'})>0;
                },
                filterCard:{
                    name:"sha",
                },
                selectCard:[1,Infinity],
                check:function(card){ 
                    var num=0; 
                    var player=_status.event.player; 
                    var players=game.filterPlayer(); 
                    for(var i=0;i<players.length;i++){ 
                        if(lib.filter.targetEnabled({name:'sha'},player,players[i])&& 
                        get.effect(players[i],{name:'sha'},player)>0){ 
                            num++; 
                            if(num>1&&ui.selected.cards.length<num) return 8-get.value(card); 
                        } 
                    } 
                    return 0; 
                },
                viewAs:{
                    name:"sha",
                },
                selectTarget:function(){
                    if(ui.selected.cards.length<1) return 1;
                    return [1,ui.selected.cards.length];
                },
                ai:{
                    order:function(){ 
                        return get.order({name:'sha'})+0.1; 
                    },
                    basic:{
                        useful:[5,1],
                        value:[5,1],
                    },
                    tag:{
                        respond:1,
                        respondShan:1,
                        damage:function(card){ 
                            if(card.nature=='poison') return; 
                            return 1; 
                        },
                        natureDamage:function(card){ 
                            if(card.nature) return 1; 
                        },
                        fireDamage:function(card,nature){ 
                            if(card.nature=='fire') return 1; 
                        },
                        thunderDamage:function(card,nature){ 
                            if(card.nature=='thunder') return 1; 
                        },
                        poisonDamage:function(card,nature){ 
                            if(card.nature=='poison') return 1; 
                        },
                    },
                },
                group:"sksn_card_fuhezhongnu_skill_dis",
            },
//三叉戟
"sksn_card_sanchaji_skill":{audio:"ext:时空枢纽:1",
                subSkill:{
                    off:{
                        sub:true,
                    },
                },
                equipSkill:true,
                trigger:{
                    player:"shaMiss",
                },
                direct:true,
                filter:function(event,player){
                    if(player.hasSkill('sksn_card_sanchaji_skill_off')) return false;
                    if(player.countCards('h',{suit:'spade'})<1) return false;
                    return player.canUse('shuiyanqijunx',event.target,false);
                },
                content:function(){
                    'step 0'
                    player.chooseCard(function(card,player){
                            return get.suit(card)=='spade'
                        },'h',get.prompt('sksn_card_sanchaji_skill'),'是否将一张黑桃手牌当作【水淹七军】对'+get.translation(trigger.target)+'使用？').set('ai',function(card){
                        if(get.effect(trigger.target,{name:'shuiyanqijunx'},player,player)<0) return 0;
                        else return 9-get.value(card);
                    });
                    'step 1'
                    if(result.bool){
                        player.addTempSkill('sksn_card_sanchaji_skill_off');
                        if(player!=_status.currentPhase) player.useCard({name:'shuiyanqijunx'},'nowuxie',result.cards,trigger.target,'sksn_card_sanchaji_skill');
                        else player.useCard({name:'shuiyanqijunx'},result.cards,trigger.target,'sksn_card_sanchaji_skill');
                    }
                },
            },
//地图·飞云渡
"sksnC_feiyunduLand_skill":{
                enable:"phaseUse",
                usable:1,
                filterCard:{
                    color:"black",
                },
                selectCard:[1,2],
                filterTarget:function (card,player,target){
        if(target==player) return false;
        return target.countDiscardableCards(player,'he');
    },
                selectTarget:function (){
        return ui.selected.cards.length;
    },
                check:function (card){
        return 5-get.value(card);
    },
                content:function (){
        player.discardPlayerCard(target,'he',true);
    },
                ai:{
                    order:function (){
            return get.order({name:'guohe'})-0.05;
        },
                    result:{
                        target:-1,
                        player:1,
                    },
                    mapValue:1,
                },
            },
//地图·学院
"sksnC_KelloaCollegeLand_skill":{
                trigger:{
                    player:"useCardAfter",
                },
                direct:true,
                filter:function (event,player){
        if(_status.currentPhase==player&&player.hasSkill('sksnC_KelloaCollegeLand_skill_off')) return false;
        return get.type(event.card)=='trick'&&event.cards.filterInD().length>0;
    },
                content:function (){
        "step 0"
        if(_status.currentPhase==player) player.addTempSkill('sksnC_KelloaCollegeLand_skill_off');
        "step 1"
        player.chooseCard('h','是否发动【帝都学院】重铸一张手牌并将'+get.translation(trigger.card)+'置于牌堆底？').set('ai',function(card){
            return 5-get.value(card);
        });
        "step 2"
        if(result.bool){
            player.logSkill('sksnC_KelloaCollegeLand_skill_skill');
            player.lose(result.cards,ui.discardPile,'visible');
            player.$throw(result.cards,1000);
            game.log(player,'将',result.cards,'置入了弃牌堆');
            player.draw();
        }else event.finish();
        "step 3"
        event.cards=trigger.cards.filterInD();
        if(event.cards.length>1){
            player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆底（先选择的在下）',event.cards]).set('ai',function(button){
                var value=get.value(button.link);
                if(_status.event.reverse) return value;
                return -value;
            }).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
        }
        "step 4"
        if(result.bool&&result.links&&result.links.length) cards=result.links.slice(0);
        while(cards.length){
            var card=cards.pop();
            if(get.position(card,true)=='o'){
                card.fix();
                ui.cardPile.appendChild(card);
                game.log(player,'将',card,'置于牌堆底');
            }
        }
        game.updateRoundNumber();
    },
                ai:{
                    mapValue:0.5,
                },
                subSkill:{
                    off:{
                        sub:true,
                    },
                },
            },
//日落星辰
"sksn_card_rlxc_skill":{
                mark:true,
                marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" src="+lib.assetURL+"extension/时空枢纽/sksn_icon_rlxc.jpg>",
                intro:{
                    name:"日落星辰",
                    markcount:function (){return 0},
                    content:function(storage,player){
                        var card=player.getEquip(5);
                        var hp=card.datas[1];
                        var c=card.datas[0];
                        return '体力值：'+hp+'<br>手牌：'+c;
                    },
                },
            },
//魔能甲
"sksn_card_monengjia_skill":{audio:"ext:时空枢纽:1",
                equipSkill:true,
                trigger:{
                    player:["phaseJieshuBegin","phaseZhunbeiBegin"],
                },
                forced:true,
                direct:true,
                content:function (){
                    "step 0"
                    if(player.hujia<=0) event.goto(3);
                    "step 1"   
                    player.chooseControl(function(){
                        var player=_status.event.player; 
                        if(player.getDamagedHp()>0) return '选项二';
                        return '选项一';
                                }).set('prompt',get.prompt('sksn_card_monengjia_skill')).set('prompt2',get.translation('sksn_card_monengjia_skill_info')).set('choiceList',['失去1点体力并获得1点护甲','失去1点护甲，回复一点体力并摸一张牌']);                      
                    "step 2"
                    if(result.control=='选项二'){
                        event.goto(4);
                    }
                    else if(result.control=='选项一'){
                        event.goto(3);
                    }          
                    "step 3"
                    player.loseHp();
                    player.changeHujia();
                    player.logSkill('sksn_card_monengjia_skill');
                    event.finish();
                    "step 4"
                    player.changeHujia(-1);
                    player.recover();
                    player.draw();
                    player.logSkill('sksn_card_monengjia_skill');
                    event.finish();
                },
            },
//海蛟
"sksn_card_haijiao_A":{
    audio:"ext:时空枢纽:1",
                equipSkill:true,
                trigger:{
                    player:"phaseDrawBegin",
                },
                priority:3.1415926,
                filter:function (event,player){
        return player.hp<player.maxHp;
    },
                check:function (event,player){
        return player.maxHp-player.hp>1||player.skip('phaseUse');
    },
                content:function (){
        trigger.num--;
        player.addSkill('sksn_card_haijiao_B')
    },
            },
"sksn_card_haijiao_B":{
    audio:"ext:时空枢纽:1",
                trigger:{
                    player:"phaseJieshuBegin",
                },
                priority:3.1415926,
                direct:true,
                content:function (){
        var num=player.maxHp-player.hp;   
        if(num>3) num=3; 
        if(num<1) num=1;       
        player.draw(num);
        player.logSkill('sksn_card_haijiao_A');
        player.removeSkill('sksn_card_haijiao_B');
    },
            },
//————雷龙————//
"sksn_card_poyuleilong_A":{
            audio:"ext:时空枢纽:1",
                ai:{
                    effect:{
                        player:function(card,player,target){
                            if(card.nature=='thunder') return [1,1];
                            if(card.nature=='fire') return [1,-3.5];
                        }
                }
            },
                equipSkill:true,
                trigger:{
                    source:"damageBegin",
                },
                priority:3.1415926,
                filter:function (event){
        return event.nature=='fire'||event.nature=='thunder';
    },
                direct:true,
                content:function (){
        if(trigger.nature=='fire') trigger.num-=1;
        if(trigger.nature=='thunder') trigger.num++;
        if(trigger.num<=0) trigger.cancel();
        player.logSkill('sksn_card_poyuleilong');
        player.logSkill('sksn_card_poyuleilong_A');
    },
            },
//————平安坠————//
"sksn_card_biyouhufu_skill":{
                equipSkill:true,
                audio:"ext:时空枢纽:1",
                trigger:{
                    player:"dying",
                },
                check:function(event,player){
        if(player.countCards('h',function(card){
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardSavable',player);
            if(mod!='unchanged') return mod;
            var savable=get.info(card).savable;
            if(typeof savable=='function') savable=savable(card,player,player);
            return savable;
        })>=1-event.player.hp&&player.maxHp<6) return false;
        if(player.maxHp<3) return false;
        return true;
    },
                filter:function(event,player){
        return player.maxHp>1;
    },
                content:function (){
        "step 0"
         var card=player.getEquip('sksn_card_biyouhufu');
                if(card){
                player.discard(card);
                    }; 
        "step 1"
         player.loseMaxHp();       
         player.recover(player.maxHp-player.hp);
    },
                ai:{
                },
            },
//————血刀————//
"sksn_swordOfNTR1":{
    audio:"ext:时空枢纽:1",
    trigger:{
        player:"useCardToPlayered",
    },
    forced:true,
	equipSkill:true,
    filter:function(event,player){
        return event.card.name=='sha'&&event.target.hp<player.hp;
    },
    content:function(){
		player.loseHp();
        trigger.getParent().directHit.add(trigger.target);
    },
},
//————蛇莲————//
"sksnS_shelian":{
    cardSkill:true,
    trigger:{source:"gainAfter"},
    filter:function(event,player){
        if(event.visible) return false;
        for(var i=0;i<event.cards.length;i++){
            if(get.name(event.cards[i],player)=='SKSN_card_shelian') return true;
        }
        return false;
    },
    check:function (event,player){
        return get.attitude(player,event.player)<=0;
    },
    prompt:"是否发动【蛇莲】卡牌效果？",
    prompt2:function (event,player){
        var num=0;
        for(var i=0;i<event.cards.length;i++){
            if(get.name(event.cards[i],player)=='SKSN_card_shelian') num++;
        }
        var targetname=get.translation(event.player);
        return '令'+targetname+'展示其此次获得的牌并失去'+num+'点体力';
    },
    content:function (){
        trigger.player.showCards(trigger.cards);
        var num=0;
        for(var i=0;i<trigger.cards.length;i++){
            if(get.name(trigger.cards[i],player)=='SKSN_card_shelian') num++;
        }
        trigger.player.loseHp(num);
    },
},
//————帕朵玛拉————//
"sksn_pamadora2":{
    mod:{
        ignoredHandcard:function (card,player){
            if(card.name=='du'){
                return true;
            }
        },
        cardDiscardable:function (card,player,name){
            if(name=='phaseDiscard'&&card.name=='du') return false;
        },
    },
},
"sksn_pamadora1":{audio:"ext:时空枢纽:2",
    forced:true,
    trigger:{
        player:"useCard",
    },
    direct:true,
    filter:function (event,player){
        if(player.hasSkill('sksn_pamadora1_off')) return false;
        return event.targets&&game.hasPlayer(function(current){
			return event.targets.contains(current)&&current!=player&&current.countCards('he');
		});
    },
    content:function (){
        "step 0"
        player.chooseTarget('请选择一个目标').set('filterTarget',function(card,player,target){
            return target!=player&&trigger.targets.contains(target)&&target.countCards('he');
        }).set('ai',function(target){
            var att=get.attitude(_status.event.player,target);
            if(att<0){
                return target.countCards('h');
            }
            return 0;
        });
        "step 1"
        if(result.bool&&result.targets){
            var target1=result.targets[0];
            event.target1=target1;
            player.logSkill('sksn_pamadora1',target1);
            player.addTempSkill('sksn_pamadora1_off');
            player.gainPlayerCard(target1,'he',1,true);
        }else event.finish();
        "step 2"
        if(result.bool&&result.links){
            event.card1=result.links[0];
            player.chooseCard('交给其一张手牌','h',true).set('ai',function(card){
                var c=(get.color(card)!=get.color(event.card1))?0.5:0
                return -get.value(card)+c;
            });
        }
        "step 3"
        if(result.bool){
            event.card2=result.cards[0];
            event.target1.gain(event.card2,player,'giveAuto');
            if(get.color(event.card1)!=get.color(event.card2)){
                trigger.directHit.push(event.target1);
            }
        }
    },
    subSkill:{
        off:{
            sub:true,
        },
    },
},
//————暗金圣剑————//
"SKSN_anjinshengjian_B":{
    audio:"ext:时空枢纽:1",
    trigger:{
        source:"damageEnd",
    },
    usable:1,
    direct:true,
    filter:function (event,player){
        return player.hp>player.countCards('h');        
    },
    content:function (){
        player.logSkill('SKSN_anjinshengjian_B');
        player.chooseUseTarget({name:'sha'},get.prompt('SKSN_anjinshengjian_A'),'「<font color=yellow>破境诛邪</font>」<br><li>视为使用一张<b>【杀】</b>',false);           
    },
},
"SKSN_anjinshengjian_A":{
    group:["SKSN_anjinshengjian_B"],
    mod:{
        globalFrom:function (from,to){
            if(to.hp<to.maxHp) return -Infinity;
        },
    },
},
//————影刃刀————//
"SKSN_card_YRD_A":{
    audio:"ext:时空枢纽:1",
    trigger:{
        source:"damageBefore",
    },
    filter:function (event,player){   
        return event.card&&event.card.name=='sha'&&event.player.hp!=player.hp;
    },
    check:function (event,player){
        var att=get.attitude(player,event.player)>0;
        return (!att&&player.hp<event.player.hp)||(att&&player.hp>3&&event.player.hp==1);
    },
    prompt2:function (event,player){
		var num=event.player.hp-player.hp;
		if(num>0) return '将'+get.translation(event.player)+''+get.cnNumber(Math.min(num,2))+'点体力转移给你';
		return '你将转移'+get.cnNumber(Math.min(-num,2))+'点体力给'+get.translation(event.player);
	},
    content:function (){
        if(player.hp<trigger.player.hp){
            var num=Math.min(2,trigger.player.hp-player.hp);
            player.changeHp(num);
            trigger.player.changeHp(-num);
			game.log(trigger.player,'转移了',get.cnNumber(num),'点体力给了',player);
            if(trigger.player.hp<=0){
                trigger.player.dying();
            }
        }else{
            var num=Math.min(2,player.hp-trigger.player.hp);
            trigger.player.changeHp(num);
            player.changeHp(-num);
			game.log(player,'转移了',get.cnNumber(num),'点体力给了',trigger.player);
            if(player.hp<=0){
                player.dying();
            }
        }
        trigger.untrigger();
        trigger.finish();
    },
},
"SKSN_card_YRD_B":{
	trigger:{
		global:"phaseEnd",
	},
	filter:function (event,player){
		return event.player!=player&&event.player.hp==1;
	},
	check:function (event,player){
		if(get.attitude(player,event.player)>0) return player.hp>3;
		return get.effect(event.player,{name:'sha'},player,player);
	},
	prompt:function (event,player){
		return '影刃刀：是否视为对'+get.translation(event.player)+'使用【杀】？';
	},
	content:function (){
		player.useCard({name:"sha"},trigger.player);
	},
},
//————专属卡牌————//
//——杰西·弗雷查——//
"sksnC_bombTime_skill":{
	trigger:{
		target:"useCardToTargeted",
		player:["recoverAfter","phaseDiscardBegin"],
	},
	forced:true,
	silent:true,
	popup:false,
	priority:2,
	filter:function (event,player,onrewrite){
		if(onrewrite!=player.storage['sksnC_bombTime_skill']) return false;
		return player.storage['sksn_bombChai'].bomb[0].name=='sksnC_bombTime';
	},
	content:function (){
		"step 0"
		game.log(player,'触发了','#g【定时炸弹】');
		var card=player.storage['sksn_bombChai'].bomb[0];
		player.damage('nosource',card);
		player.storage['sksn_bombChai'].bomb.remove(card);
		"step 1"
		if(player.storage['sksn_bombChai'].bomb.length==0){
			player.removeAdditionalSkill('sksn_bombChai');
		}
	},
},
"sksnC_bombMine_skill":{
	trigger:{
		player:"useCard",
	},
	forced:true,
	silent:true,
	popup:false,
	priority:2,
	filter:function (event,player){
		if(event.card.name!=player.storage['sksnC_bombMine_skill']) return false;
		return player.storage['sksn_bombChai'].bomb[0].name=='sksnC_bombMine';
	},
	content:function (){
		"step 0"
		game.log(player,'触发了','#g【地雷】');
		var card=player.storage['sksn_bombChai'].bomb[0];
		trigger.targets.length=0;
		trigger.all_excluded=true;
		player.damage('nosource',card);
		player.storage['sksn_bombChai'].bomb.remove(card);
		"step 1"
		if(player.storage['sksn_bombChai'].bomb.length==0){
			player.removeAdditionalSkill('sksn_bombChai');
		}
	},
},
"sksnC_bombAshes_skill":{
	trigger:{
		player:"useCard",
	},
	forced:true,
	silent:true,
	popup:false,
	priority:2,
	filter:function (event,player){
		if(player.getHistory('useCard').length!=2) return false;
		return player.storage['sksn_bombChai'].bomb[0].name=='sksnC_bombAshes';
	},
	content:function (){
		game.log(player,'触发了','#g【灰烬炸弹】');
		trigger.targets.length=0;
		trigger.all_excluded=true;
		trigger.card.storage.vanish=true;
	},
},
"sksnC_bombFixed_skill":{
	trigger:{
		player:"phaseJieshuBegin",
	},
	forced:true,
	silent:true,
	popup:false,
	priority:2,
	filter:function (event,player){
		return player.storage['sksn_bombChai'].bomb[0].name=='sksnC_bombFixed';
	},
	content:function (){
		game.log(player,'触发了','#g【定点炸弹】');
		var card=player.storage['sksn_bombChai'].bomb[0];
		player.damage('nosource',card);
	},
},

       
},
//技能
//——————翻译——————//                
    translate:{
    "sksn_card_ziyepifeng":"子夜披风",
	"sksn_card_ziyepifeng_info":"锁定技，你的回合外每回合限一次，当你失去手牌时，你从弃牌堆中获得一张【闪】。当你从装备区中失去此牌时，你〖发现3〗获得一张基本牌。<font color=\"#77787b\" size=\"2\"><br>暮色漫斜影，晚风伴随行。</font>",
    "sksn_card_ziyepifeng_skill":"子夜披风",
	"sksn_card_ziyepifeng_skill_info":"锁定技，你的回合外每回合限一次，当你失去手牌时，你从弃牌堆中获得一张【闪】。当你从装备区中失去此牌时，你〖发现3〗获得一张基本牌。",

    "sksn_card_jinniao":"烬鸟",
	"sksn_card_jinniao_info":"出牌阶段，对攻击范围内的一名角色使用。若其没有「<font color=fire>燃烧</font>」，为其增加2层「<font color=fire>燃烧</font>」；否则移去其所有层数的「<font color=fire>燃烧</font>」并对其造成等量火属性伤害。<li>精炼：使用【烬鸟】无视距离限制。<font color=\"#77787b\" size=\"2\"><br>浴火而生，振翅翱翔。</font>",
	
	"sksn_card_huogu":"惑菇",
	"sksn_card_huogu_info":"出牌阶段，对一名角色使用。观看并展示其一张与此牌颜色相同的手牌，令其视为使用同名牌（无距离限制且不计入使用次数限制）。<li>精炼：展示基本牌无颜色限制。<font color=\"#77787b\" size=\"2\"><br>惑菇无毒，尽请食用。</font>",
	
	"sksn_card_jinglianfu":"精炼釜",
	"sksn_card_jinglianfu_info":"锁定技，令你的部分珍宝牌直接获得精炼效果。；你的手牌上限+1。<font color=\"#77787b\" size=\"2\"><br>其状似狗，熔万物之精华而炼之。</font>",

    "sksn_card_hanchaoguojing":"寒潮过境",
    "sksn_card_hanchaoguojing_info":"出牌阶段，对所有其他角色使用。每名目标角色需打出一张♠牌，否则受到1点冰属性伤害。<font color=\"#77787b\" size=\"2\"><br>“比寒潮更令我感到冰冷的，是你那漠视一切的眼睛。”——翩跹</font>",

    "sksn_card_xieer":"血饵",
    "sksn_card_xieer_info":"当此牌在你手牌中时，你的防御距离-1；你无法弃置此牌；当你正面向上失去此牌后，你需弃置一张红桃牌，否则你失去一点体力。<li>精炼：你的【血饵】不计入手牌上限。<font color=\"#77787b\" size=\"2\"><br>海默德船长曾亲切地称它为深海小可爱。</font>",

    "sksn_card_jidianyulei":"疾电御雷",
    "sksn_card_jidianyulei_info":"你使用黑色【杀】指定目标后，你可以弃置一张黑色2~9的手牌令此【杀】改为雷属性且基础伤害+1。<font color=\"#77787b\" size=\"2\"><br>以雷霆，击碎黑暗！</font>",
    "sksn_card_jidianyulei_skill":"疾电御雷",
    "sksn_card_jidianyulei_skill_info":"你使用黑色【杀】指定目标后，你可以弃置一张黑色2~9的手牌令此【杀】改为雷属性且基础伤害+1。",

    "sksn_card_fengshoushengyan":"丰收盛宴",
    "sksn_card_fengshoushengyan_info":"<li>出牌阶段，对所有角色使用。目标角色依据条件选择一项：①若已受伤，回复1点体力；②若手牌数小于四，将手牌摸至四张。<font color=\"#77787b\" size=\"2\"><br>禾下乘凉梦，十里稻花香。</font>",
   	
    "sksn_card_liporenlun_skill":"离魄刃轮",
    "sksn_card_liporenlun_skill_info":"你用【杀】指定目标后，你可以弃置一张红色手牌获得目标一张牌，或弃置一张黑色手牌令此【杀】需要两张【闪】响应。",
    "sksn_card_liporenlun":"离魄刃轮",
    "sksn_card_liporenlun_info":"你用【杀】指定目标后，你可以弃置一张红色手牌获得目标一张牌，或弃置一张黑色手牌令此【杀】需要两张【闪】响应。",
           
    "sksn_card_shengguangjiaopao":"圣光教袍",
    "sksn_card_shengguangjiaopao_info":"你获得buff或受到火焰伤害时，可以防止之并获得一枚【浊】，然后若你的【浊】大于3，你移去所有【浊】并选择弃置等量的牌或失去一点体力。当你失去此牌时，你每有一枚【浊】，你便需弃置一张牌。<font color=\"#77787b\" size=\"2\"><br>“面对邪灵灾厄，我们寻求神明的指引，祈求伟大的至高之神为我们带来救赎……以我们的虔诚熔铸基石，恭迎那束驱散所有黑暗的圣洁之光。”</font>",
    "sksn_card_shengguangjiaopao_skill":"圣光教袍",
    "sksn_card_shengguangjiaopao_skill_info":"你获得buff或受到火焰伤害时，可以防止之并获得一枚【浊】，然后若你的【浊】大于3，你移去所有【浊】并选择弃置等量的手牌或失去一点体力。",

    "sksn_card_fuhezhongnu_skill":"复合重弩",
    "sksn_card_fuhezhongnu_skill_info":"出牌阶段限一次，你可以将任意张【杀】当作【杀】使用，此杀至多可以指定X个目标，此【杀】造成伤害后，若目标的已损失体力值大于体力值，弃置目标的防具牌。（X为选择的实体牌数量）",
    "sksn_card_fuhezhongnu":"复合重弩",
    "sksn_card_fuhezhongnu_info":"出牌阶段限一次，你可以将任意张【杀】当作【杀】使用，此杀至多可以指定X个目标，此【杀】造成伤害后，若目标的已损失体力值大于体力值，弃置目标的防具牌。（X为选择的实体牌数量）",
   
    "sksn_card_huochong":"火铳",
    "sksn_card_huochong_info":"锁定技，你可使用【杀】的次数额外增加你的体力上限值，你于回合内使用的【杀】有20%X的概率无法被闪避。（X为你本回合使用过【杀】的次数且含此次）<font color=\"#77787b\" size=\"2\"><br>子弹有多大，正义就有多大。</font>",
    "sksn_card_huochong_skill":"火铳",
    "sksn_card_huochong_skill_info":"锁定技，你可使用【杀】的次数额外增加你的体力上限值，你于回合内使用的【杀】有20%X的概率无法被闪避。（X为你本回合使用过【杀】的次数且含此次）",

    "sksn_card_sanchaji":"三叉戟",
    "sksn_card_sanchaji_info":"「<font color=#0080FF>大海无量</font>」<br><li>每回合限一次，当你的【杀】被闪抵消后，你可以将一张黑桃手牌当作【水淹七军】对目标使用，若此时于你的回合外，此牌不可被无懈可击响应。",
    "sksn_card_sanchaji_skill":"三叉戟",
    "sksn_card_sanchaji_skill_info":"每回合限一次，当你的【杀】被闪抵消后，你可以将一张黑桃手牌当作【水淹七军】对目标使用，若此时于你的回合外，此牌不可被无懈可击响应。",

    "sksn_card_zhuxingfu":"猪幸福",
    "sksn_card_zhuxingfu_info":"「<font color=#FF8F59>知足常乐</font>」<br><li>锁定技，其他角色计算与你的距离＋1。<font color=\"#77787b\" size=\"2\"><br>不过就是一头猪而已，你还期望它有啥特殊作用？</font>",

    "sksnC_feiyunduLand":"飞云渡",
    "sksnC_feiyunduLand_info":"<li>令一名其他角色非锁定技失效直到回合结束。<br><li>地图效果：出牌阶段限一次，你可以弃置至多两张黑色手牌并弃置等量名其他角色各一张牌。",
    "sksnC_feiyunduLand_skill":"飞云渡",
    "sksnC_feiyunduLand_skill_info":"出牌阶段限一次，你可以弃置至多两张黑色手牌并弃置等量名其他角色各一张牌。",

    "sksnC_KelloaCollegeLand":"帝都学院",
    "sksnC_KelloaCollegeLand_info":"<li>〖发现〗一张锦囊牌获得之。<br><li>地图效果：你使用普通锦囊牌结算完后，你可以重铸一张手牌，然后将你使用的牌置于牌堆底。你的回合内限一次。",
    "sksnC_KelloaCollegeLand_skill":"帝都学院",
    "sksnC_KelloaCollegeLand_skill_info":"<li>〖发现〗一张锦囊牌获得之。<br><li>地图效果：你使用普通锦囊牌结算完后，你可以重铸一张手牌，然后将你使用的牌置于牌堆底。你的回合内限一次。",

    "sksn_card_mowa":"魔蛙",
    "sksn_card_mowa_info":"<li>出牌阶段，对一名其他角色使用。除非其对你使用一张【杀】，否则其增加2层「<font color=blue>降势</font>」。<li>精炼：你对攻击范围内有你的角色使用【魔蛙】时，弃置其装备区里一张武器牌。<font color=\"#77787b\" size=\"2\"><br>魔能之地最凶残的存在</font>",
    "sksn_card_mowa_jinglian":"魔蛙·精炼",
	"sksn_card_mowa_jinglian_info":"你对攻击范围内有你的角色使用【魔蛙】时，弃置其装备区里一张武器牌。",
    
    "sksn_card_rlxc":"日落星辰",
    "sksn_card_rlxc_info":"「<font color=yellow>太古神器</font>」<br><li>锁定技，当此牌进入你的装备区时，你记录你的体力值与手牌数，当此牌离开你的装备区时，你将体力值回复至记录数，再将手牌摸至记录数（分别不超过5）。<font color=\"#77787b\" size=\"2\"><br>群星之外，吾心之中</font>",
    "sksn_card_rlxc_skill":"日落星辰",
    "sksn_card_rlxc_skill_info":"",
    	
    "sksn_card_monengjia":"魔能甲",
    "sksn_card_monengjia_info":"<li>锁定技，此牌进入你的装备区时，你获得一点护甲；准备阶段和结束阶段开始时，你需选择一项：<br>①失去一点体力并获得一点护甲<br>②失去一点护甲，恢复一点体力并摸一张牌。<font color=\"#77787b\" size=\"2\"><br>铠甲中蕴含的魔能之力异常强大，如果穿戴者意志薄弱，便极有可能会堕落成魔物</font>",
    "sksn_card_monengjia_skill":"魔能甲",
    "sksn_card_monengjia_skill_info":"锁定技，准备阶段和结束阶段开始时，你需选择一项：<br>①失去一点体力并获得一点护甲<br>②失去一点护甲，恢复一点体力并摸一张牌。",

    "sksn_card_haijiao":"海蛟",
    "sksn_card_haijiao_info":"<li>锁定技，其他角色计算与你的距离＋1。<br><li>摸牌阶段，若你已受伤，你可以少摸1张牌并于结束阶段摸x张牌。（x为你已损失的体力值数且至多为3至少为1）<font color=\"#77787b\" size=\"2\"><br>其实它和海马是近亲</font>",
    "sksn_card_haijiao_A":"海蛟",
    "sksn_card_haijiao_A_info":"你可以少摸1张牌并于结束阶段摸x张牌（x为你已损失的体力值数且至多为3至少为1）",
    	
    "sksn_card_poyuleilong":"破宇雷龙",
    "sksn_card_poyuleilong_info":"<li>锁定技，你计算与其他角色的距离-1。<br><li>锁定技，你造成的雷/火属性伤害+1/-1。",

    "sksn_card_biyouhufu":"庇佑护符",
    "sksn_card_biyouhufu_info":"<li>锁定技，当此牌进入/离开你的装备区时，你增加/减少一点体力上限。<br><li>当你进入濒死状态时，你可以减少一点体力上限并弃置此牌，然后将体力恢复至体力上限。<font color=\"#77787b\" size=\"2\"><br>异世界土著制造的一种银制的吊坠，他们相信通过它能得到神明的庇佑，拥有起死回生的力量</font>",
    "sksn_card_biyouhufu_skill":"庇佑护符",
    "sksn_card_biyouhufu_skill_info":"<li>你进入濒死状态时，你可以弃置装备区里的庇佑护符并减少一点体力上限然后将体力值回复至体力上限。",

    "sksn_card_swordOfNTR":"血魇刀",
    "sksn_card_swordOfNTR_info":"「<font color=red>牛头人专属</font>」<br><li>锁定技，你使用【杀】指定一个目标后，若你体力值大于其，你失去1点体力令其不能响应此【杀】。<font color=\"#77787b\" size=\"2\"><br>一刀一个纯爱傻叉，一脚一个后宫弱智</font>",
    "sksn_swordOfNTR1":"血魇刀",
       
    "SKSN_card_shelian":"蛇莲",
    "SKSN_card_shelian_info":"<li>出牌阶段，对自己使用，摸一张牌，若已受伤则再摸一张牌；当此牌被其他角色背面朝上获得时，你可以令其展示其获得的牌，其中每有一张此牌便令其失去1点体力。<li>精炼：出牌阶段限一次，你可以将一张【蛇莲】交给一名其他角色。<font color=\"#77787b\" size=\"2\"><br>就是这朵看似不起眼的白色莲花，曾让毫无防备的苏尔嘉德吃了大亏</font>",
    "sksn_card_shelian_jinglian":"蛇莲·精炼",
	"sksn_card_shelian_jinglian_info":"出牌阶段限一次，你可以将一张【蛇莲】交给一名其他角色。",

    "SKSN_haiyaozhige":"海妖之歌",
    "SKSN_haiyaozhige_info":"<li>出牌阶段，对所有其他角色使用。除非目标角色使用一张有「伤害」标签的牌，否则其受到下家对其造成的1点伤害（伤害来源牌仍为此牌）。<font color=\"#77787b\" size=\"2\"><br>放弃幻想吧孩子，这个世界上是不存在人鱼的</font>",

    "sksn_Pamadora":"帕朵玛拉",
    "sksn_Pamadora_info":"「<font color=red>深渊邪神</font>」<br><li>每回合限一次，当你使用一张牌指定其他角色为目标时，你可以获得其中一个目标一张手牌，然后你交给其一张手牌，若这两张牌颜色不同，则其不能响应此牌。<br>锁定技，你的【毒】不计入手牌上限；当你从装备区里失去此装备时，你获得一张【毒】；此牌进入弃牌堆前，销毁之。",

    "SKSN_anjinshengjian":"暗金圣剑",
    "SKSN_anjinshengjian_info":"<li>①<b>锁定技</b>，你与已受伤的角色计算距离时均视为1<br><br><li>②每回合限一次，当你造成伤害后，若你的手牌数小于体力值，你可以视为使用一张【杀】",
    "SKSN_anjinshengjian_A":"暗金圣剑",
    "SKSN_anjinshengjian_B":"暗金圣剑",

    "sksn_card_yingrendao":"影刃刀",
    "sksn_card_yingrendao_info":"「<font color=red>戏命之刃</font>」<br><li>当你使用【杀】对体力值不等于你的角色造成伤害前，你可以令体力值较多的一方转移X点体力给体力值较少的一方，然后防止此伤害（X为体力值之差且至多为2）<br><br><li>其他角色的回合结束时，若该角色的体力值为1，则你可以视为对该角色使用一张【杀】",
    "SKSN_card_YRD_A":"影刃刀",
    "SKSN_card_YRD_B":"影刃刀",
//————炸弹人专属卡牌————//
	"sksnC_cailiaoBasic":"基础材料",
	"sksnC_cailiaoBasic_info":"出牌阶段，你可以将三张【基础材料】合成为一张【高级材料】。",
	"sksnC_cailiaoSenior":"高级材料",
	"sksnC_cailiaoSenior_info":"出牌阶段，对手牌数小于5的一名角色使用。其将手牌摸至五张。",
	"sksnC_bombGrenade":"手榴弹",
	"sksnC_bombGrenade_info":"<li>出牌阶段，对攻击范围内的一名角色使用。对其造成1点伤害。",
	"sksnC_bombFire":"燃烧弹",
	"sksnC_bombFire_info":"<li>出牌阶段，对攻击范围内的一名角色使用。对其造成1点火属性伤害，然后其增加2层「<font color=fire>燃烧</font>」。",
	"sksnC_bombTime":"定时炸弹",
	"sksnC_bombTime_info":"<li>出牌阶段，对攻击范围内的一名没有〖拆弹〗的角色使用。你选择一个数字标记和一个时机。其下次到该时机时受到1点无来源伤害，然后移除该炸弹。可拆弹。<br>可选时机：弃牌阶段开始时、回复体力后、成为一张牌的目标后。",
	"sksnC_bombMine":"地雷",
	"sksnC_bombMine_info":"<li>出牌阶段，对一名没有〖拆弹〗的角色使用。你选择一个数字标记和一种牌名（不可见）。其使用该种牌名的牌时，此牌失效且受到1点无来源伤害，然后移除该炸弹。可拆弹。<br>可选牌名：【杀】、【闪】、【桃】、【无懈可击】。<font color=\"#77787b\" size=\"2\"><br>Suprise mother fucker</font>",
	"sksnC_bombSmoke":"催泪瓦斯",
	"sksnC_bombSmoke_info":"<li>出牌阶段，对攻击范围内的一名角色使用。令其增加1层「<font color=#E5E5D0>迷茫</font>」。",
	"sksnC_bombAshes":"灰烬炸弹",
	"sksnC_bombAshes_info":"<li>出牌阶段，对一名没有〖拆弹〗的其他角色使用。你选择一个数字标记。其每回合使用第二张牌时，令此牌失效并销毁此牌。可拆弹。",
	"sksnC_bombDragon":"龙息",
	"sksnC_bombDragon_info":"「<font color=orange>巨龙吐息</font>」<br><li>出牌阶段，对一名或三名其他角色使用。若目标数为1，则对目标角色造成2点火属性伤害并弃置其一张牌；否则对目标角色造成1点火属性伤害。",
	"sksnC_bombWither":"凋灵之首",
	"sksnC_bombWither_info":"「<font color=orange>结束了？</font>」<br><li>出牌阶段，对攻击范围外的一名其他角色使用。对其造成1点伤害，其增加2层「<font color=slategrey>凋零</font>」。<font color=\"#77787b\" size=\"2\"><br>是的</font>",
	"sksnC_bombSuperBig":"终极炸弹",
	"sksnC_bombSuperBig_info":"「<font color=orange>狂轰滥炸</font>」<br><li>出牌阶段，对一至两名其他角色使用。对目标角色造成2点伤害。<font color=\"#77787b\" size=\"2\"><br>别问，扔就是了</font>",
	"sksnC_bombFixed":"定点炸弹",
	"sksnC_bombFixed_info":"「<font color=orange>生死时速</font>」<br><li>出牌阶段，对攻击范围内的一名没有〖拆弹〗的角色使用。你选择一个数字标记。每到其结束阶段开始时，其受到1点无来源伤害。可拆弹。",
    //卡牌种类
	"sksnCtype_ziyuan":"资源",
		"sksnCtype_ziyuanBao":"珍宝",
		"sksnCtype_ziyuanDao":"道具",
		"sksnCtype_ziyuanCai":"材料",
    },
    //牌堆编辑
    list:[ 
    ["spade",2,"sksn_card_ziyepifeng"],
    ["diamond",6,"sksn_card_jinglianfu"],
    ["club",9,"sksn_card_huogu"],
    ["club",7,"sksn_card_huogu"],
    ["club",8,"sksn_card_huogu"],
    ["heart",13,"sksn_card_jinniao"],
    ["diamond",12,"sksn_card_jinniao"],
    ["diamond",7,"sksn_card_hanchaoguojing"],
    ["diamond",1,"sksn_card_jidianyulei"],
    ["heart",1,"sksn_card_fengshoushengyan"],
    ["heart",3,"sksn_card_fengshoushengyan"],
    ["diamond",2,"sksn_card_liporenlun"],
    ["heart",6,"sksn_card_shengguangjiaopao"],
    ["spade",1,"sksn_card_huochong"],
    ["club",12,"sksn_card_fuhezhongnu"],
    ["spade",3,"sksn_card_sanchaji"],
    ["heart",5,"sksn_card_zhuxingfu"],
    ["spade",6,"sksnC_feiyunduLand"],
    ["club",5,"sksnC_KelloaCollegeLand"],
    ["club",3,"sksn_card_mowa"],
    ["spade",11,"sksn_card_mowa"],
    ["heart",10,"sksn_card_rlxc"],
    ["diamond",9,"sksn_card_monengjia"],
    ["diamond",8,"sksn_card_haijiao"],
    ["club",13,"sksn_card_poyuleilong"],
    ['diamond',3,'sksn_card_biyouhufu'],
    ['spade',2,'sksn_card_swordOfNTR',['gifts']],
    ['diamond',5,'SKSN_card_shelian'],
    ['club',6,'SKSN_card_shelian'],
    ['club',4,'SKSN_card_shelian'],
    ['heart',7,'SKSN_haiyaozhige'],
    ['heart',2,'sksn_card_yingrendao'],
    ['spade',12,'SKSN_anjinshengjian'],
    ],
    };
    return sksnshoupai;
    });
    lib.translate['sksnshoupai_card_config'] = "<img style=width:100px src="+lib.assetURL+"extension/时空枢纽/sksn_wujiangfenlan.png>";
    lib.config.all.cards.push('sksnshoupai');
    if(!lib.config.cards.contains('sksnshoupai')) lib.config.cards.push('sksnshoupai');
    };
},help:{
	'时空枢纽':('<div style="margin:10px">buff机制</div><ul style="margin-top:0">'+
		'<li>Buff是一种状态效果，也可以理解为一种全局性的锁定发动的技能。不论是正面效果、负面效果还是混合效果，都称作“Buff”。<br><li>buff会有专门的图标边框和描述(红色框是减益buff，绿色框是增益buff)，通过部分武将技能或卡牌获得。拥有某种buff的角色会有相应的标记提示，具体效果可以在标记中查看。'+
		'<br><li>衰减方式<br>[1]“自然衰减”<br>有此标签的buff在拥有者回合结束时会自动移除1层。额外的，当buff层数以合法的方式（如“移除”、“调整”）变动至0时，这个buff将自动消失。<br>[2]“条件衰减”<br>有此类标签的buff在拥有者回合结束时不会自动移除，需要满足其描述中特定的方式才会消失。</ul>'+
		'<div style="margin:10px">部分奇特描述解释</div><ul style="margin-top:0">'+
		'<li>【观星2】：观看牌堆顶两张牌然后以将其中任意张牌以任意顺序置于牌堆顶，其余牌以任意顺序置于牌堆底<br><li>【瞬发技】牌局中点击人物右侧按钮或技能页面（送花砸蛋的页面）对应技能下的按钮发动，即刻结算技能效果。<br><li>【幸运】你判定结果会向对自己有利的方向倾斜，你有几率摸到更高价值的牌。<br><li>【翻面】你的武将牌翻面时会自动替换为背面角色，当一面阵亡后，【翻面】将无效。'
		),
},config:{
    //————选项代码————//
     "sksn_kzjs1":{
        "name":'<img src="'+lib.assetURL+'extension/时空枢纽/kzjs_up.png" style="width:245px">',
        clear:true,
        onclick:function(){
			if(this.hth_more==undefined){
				var more=ui.create.div('.hth_more','<div style="border: 1px solid white">'+
				'<font size=2px>&nbsp;&nbsp;&nbsp;&nbsp;嗨!'+lib.config.connect_nickname+'！欢迎您前来体验原创内容扩展<b>《时空枢纽》</b><br>&nbsp;&nbsp;&nbsp;&nbsp;本扩展角色均为原创，角色强度适中，技能极具创意，可玩性较强，本扩展还有着独特的背景故事，庞大的世界观，高质量的配音、壁纸、背景音乐');
				this.parentNode.insertBefore(more,this.nextSibling);
				this.hth_more=more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/kzjs_down.png" style="width:245px">';
			}else{
				this.parentNode.removeChild(this.hth_more);
				delete this.hth_more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/kzjs_up.png" style="width:245px">';
			};
		}
    },
     "sksn_ps":{
        "name":'<img src="'+lib.assetURL+'extension/时空枢纽/zzdh_up.png" style="width:245px">',
        clear:true,
        onclick:function(){
			if(this.hth_more==undefined){
				var more=ui.create.div('.hth_more','<div style="border: 1px solid white">'+
				'<font size=2px><b><font color=cyan>特别鸣谢</b></font><br><li>感谢诗笺，寰宇星城，niya，凉茶，§，琉璃菠萝，愉渊对于代码方面的编写、协助以及指导<br><li>感谢瑾公周，废城的宣传和帮助<br><li>文案支持：爪巴，林啸霜<br><li>配音鸣谢：九醉书生，陆寿，山驴，小萌泪，棠梨<br><li>致谢：时空枢纽扩展群全体成员<br><br><b><font color=cyan>作者的话</b></font><br><li>本扩展供大家免费游玩，严禁商用，部分图片素材，背景音乐来源于网络，如有侵犯您的相关权利，请尽快联系作者修改删除，本扩展故事内容均为原创，如有雷同，纯属巧合<br><br><b><font color=cyan>友情支持</font></b><br><li>在支持本扩展的同时，也请大家多多支持友情扩展《玄武江湖》和《蜀汉中兴》，玄武江湖拥有独特的内力值系统，还有着非常棒的背景故事；蜀汉中兴有着非常棒的功能系统，角色强度较高，可玩性强。');
				this.parentNode.insertBefore(more,this.nextSibling);
				this.hth_more=more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/zzdh_down.png" style="width:245px">';
			}else{
				this.parentNode.removeChild(this.hth_more);
				delete this.hth_more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/zzdh_up.png" style="width:245px">';
			};
		}
    },
    "sksn_gexing":{
        "name":'<img src="'+lib.assetURL+'extension/时空枢纽/gxsz_up.png" style="width:245px">',
        "clear":true,
        onclick:function(){
			if(this.hth_more==undefined){
				var more=ui.create.div('.hth_more','<div style="border: 1px solid white">'+
				'<font size=2px>&nbsp;&nbsp;&nbsp;&nbsp;嗨!'+lib.config.connect_nickname+'！您可在下方按照自己的喜好自定义以下内容');
				this.parentNode.insertBefore(more,this.nextSibling);
				this.hth_more=more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/gxsz_down.png" style="width:245px">';
			}
            else{
				this.parentNode.removeChild(this.hth_more);
				delete this.hth_more;
				this.innerHTML='<img src="'+lib.assetURL+'extension/时空枢纽/gxsz_up.png" style="width:245px">';
			};
		}
    },
    "sksn_picture":{
        name:"<b>专属背景</b>",
        intro:"选定后重启游戏生效，游戏开始时将背景改为选定的图片",
        init:"0",
        item:{
            "0":"默认背景",
            "1":"随机背景",
            "2":"夜幕华灯",
            "3":"枫桥夜泊",
            "4":"极冰海岸",
            "5":"魔窟之城",
        },
    },
    "sksn_music":{
        name:"<b>专属音乐</b>",
        init:"0",
        intro:"选定后重启游戏生效，游戏开始时播放选定的背景音乐",
        item:{
            "0":"默认音乐",
            "1":"随机音乐",
            "2":"日落",
            "3":"兵变",
            "4":"正义",
            "5":"列瑟芬",
            "6":"恐惧",
            "7":"罪犯",
        },
    }, 
    "sksn_info_color":{
        name:"<b>彩色描述</b>",
        intro:"开启后重启游戏后生效，游戏开始时调整场上所有角色技能描述中部分字的颜色",
        init:true,
    },   
    "sksn_lutou":{
        name:"<b>露头皮肤</b>",
        intro:"选定后皮肤替换为露头版，游戏重启生效。",
        init:false,
    }, 
    "sksn_only":{
        "name":"<b>一键禁将</b>",
        "intro":"开启后，保存当前AI禁选配置并强制将所有非时空枢纽扩展的武将配置为AI禁选。关闭此选项后恢复开启时的配置。重启后生效。",
        "init":lib.config.sksn_only2 === undefined ? false : lib.config.sksn_only2,
        onclick:function(item){
            game.saveConfig('sksn_only2',item);
            game.saveConfig('extension_时空枢纽_sksn_only',item);
        }
    },
    "sksn_die_dub":{
        name:"<b>阵亡配音</b>",
        intro:"开启后重启游戏后生效，本扩展角色阵亡时播放阵亡配音",
        init:true,
    },
    "skFreeChoose":{
        name:"<b>时空势力选将</b>",
        intro:"开启后，自由选将界面将全部替换为时空枢纽势力。",
        init:lib.config.skFreeChoose === undefined ? false : lib.config.skFreeChoose,
        onclick:function(item){
            game.saveConfig('skFreeChoose',item);
            game.saveConfig('extension_时空枢纽_skFreeChoose',item);
        }
    },


},

package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:
     '<b>曾经你来过，让人间黎明初现<br> </b><br><font color=yellow>在此特别感谢琉璃菠萝的支持和帮助</font><br></b><br><font color=cyan>扩展QQ群:1075641665</font><br><img src="'+lib.assetURL+'extension/时空枢纽/SKSN_shikongshuniu.jpg" style="width:245px">',
    author:"唯幕",
    diskURL:"",
    forumURL:"",
    version:"1.40",
},files:{"character":[],"card":[],"skill":[]}}})