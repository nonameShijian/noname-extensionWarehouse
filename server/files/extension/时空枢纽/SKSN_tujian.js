window.version='1.5';
window.SKSN_tujian={	 
  '影':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_ying"],
    'info':'<b>技能介绍：<br>影狩</b>「<font color=red>暗影猎杀</font>」<br><li>出牌阶段限一次，你可以移动到任意一名角色的前一位，视为对其使用了一张不计入出杀次数的杀，若你已无法出杀时，你不能使用此技能<br><br><b>杀戮</b>「<font color=red>杀戮之影</font>」<br><li><b>锁定技</b>，你的杀无视距离;<br>①每回合限一次，当你使用杀或决斗造成伤害后，你获得技能<b><font color=red>终结</font></b>直到回合结束；<br>②每当你令一名其他角色进入濒死状态时，你于后续的回合结束后摸一张牌并执行一个额外的回合<br><br><b><li>以下为获得的技能：<br>终结</b>「<font color=red>一击必杀</font>」<br><li><b>锁定技</b>，你的杀或决斗造成的伤害+x点，结算后失去此技能（x为目标当前体力值）',
    'cards':[],
  },
    '铁心':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_tiexin"],
    'info':'<b>技能介绍：<br>匠魂</b>「<font color=orange>天才工匠</font>」<br><li><b>锁定技</b>，出牌阶段限X次（X为你当前的体力值），你每使用一张锦囊牌后，你获得一张装备牌；每使用一张装备牌后，你摸一张牌；你的装备区没有数量限制',
    'cards':[],
  },
  '艾德华':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_aidehua"],
    'info':'<b>技能介绍：<br>怪盗</b>「<font color=cyan>贵族大盗</font>」<br><li><b>锁定技</b>，每当你即将造成伤害时：<br>①若目标没有手牌则此伤害翻倍<br>②若目标在本回合成为过技能<font color=cyan><b>骗术</b></font>的目标，则你获取目标x张牌（x为本次伤害量）<br><br><b>骗术</b>「<font color=cyan>致命玩笑</font>」<br><li>出牌阶段限X次（X为你的体力值数），你可以将至多两张手牌交给一名本回合内未成为过技能<font color=cyan><b>骗术</b></font>目标的角色，然后其弃置所有手牌，再摸等量的牌并展示，若如此做，其选择一项：<br><br>①令使用者获得你x张牌（x为其手牌中非延时锦囊牌的数量）<br><br>②进入『<font color=cyan><b>虚弱</b></font>』状态直到其回合结束<br><br><b><li>以下为获得的技能：<br>虚弱</b>「<font color=cyan>苟延残喘</font>」<br><li><b>锁定技</b>，你不能使用或打出卡牌，其他角色计算与你的距离始终为1',
    'cards':[],
  },
    '兰伯特':{  
    'version':'<b><font color=yellow>斗士型</font></b>',
	'players':["sksn_lanbote"],
    'info':'<b>技能介绍：<br>燕反</b>「<font color=cyan>防守反击</font>」<br><li>回合限一次，每当你成为其他角色的某张卡牌的惟一目标时，你可以弃置一张手牌，将使用者与目标对调<br><br><b>剑圣</b>「<font color=cyan>剑圣英姿</font>」<br><li><b>锁定技</b>，一名角色回合结束时，若你在本回合造成过伤害且你的的手牌数小于你当前的体力值，则你将手牌摸至你当前的体力值',
    'cards':[],
  },
    '塞缪尔':{  
    'version':'<b><font color=yellow>斗士型</font></b>',
	'players':["sksn_saimiuer"],
    'info':'<b>技能介绍：<br>反击</b>「<font color=orange>礼尚往来</font>」<br><li><b>锁定技</b>，当你成为其他角色使用基本牌或普通锦囊牌的目标时（【借刀杀人】，【声东击西】除外），你视为对其使用一张相同牌名的牌<br><br><b>裁决</b>「<font color=orange>神圣裁决</font>」<br><li>当你对其他角色即将造成伤害时，若有任意一项符合以下条件时，你可以弃置2x张手牌（无牌则不弃，不足则全弃）并令此伤害+x（x为符合条件数）<br><br><li><b>裁决条件：</b><br>①该角色的手牌数大于等于你<br>②该角色的体力值大于等于你<br>③该角色装备区的牌数大于你',
    'cards':['SKSN_anjinshengjian'],
  },
    '伊格诺斯':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_yigenuosi"],
    'info':'<b>技能介绍：<br>穿梭</b>「<font color=cyan>时空穿梭</font>」<br><li>出牌阶段限一次，你可以选择一名其他角色并与其交换位置，然后你获得技能<b><font color=cyan>崩乱</font></b>和<b><font color=cyan>撕裂</font></b>直到出牌阶段结束<br><br><b>共振</b>「<font color=cyan>空间共振</font>」<br><li><b>锁定技</b>，你的基础攻击范围为2；你防止在自身回合内受到的伤害；每当你使用杀造成伤害后，你可以弃置一张牌并摸一张牌然后对距离目标1以内的其他角色各造成一点伤害<br><br><b><li>以下为获得的技能：<br>崩乱</b>「<font color=cyan>时空崩乱</font>」<br><li>锁定技，每当你使用一张杀，你令所有不是此杀目标的其他角色有50%概率成为此杀的额外目标<br><br><b>撕裂</b>「<font color=cyan>空间撕裂</font>」<br><li>出牌阶段限一次，你选择一名攻击范围内的其他角色，并对其造成一点伤害',
    'cards':[],
  },
  '提隆·嘉尼奥':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_jianiao"],
    'info':'<b>技能介绍：<br>转换</b>「<font color=red>刺客信条</font>」<br><li>出牌阶段你可以转换一次形态，将形态转为『<b>隐匿</b>』或『<b>刺杀</b>』状态。<br> <br>『<b>隐匿</b>』增加一点体力上限并恢复一点体力，然后获得技能<b><font color=red>隐匿</font></b>；<br><br>『<b>刺杀</b>』减少一点体力上限，然后获得技能<b><font color=red>刺杀</font></b>；<br><br><li><b>转换状态规则：</b><br>①出牌阶段开始时重置状态，此时你处于无状态阶段。<br>②进入『<b>隐匿</b>』状态后，你将跳过弃牌阶段<br>③进入『<b>刺杀</b>』状态后，你摸一张牌<br><br><b><li>以下为获得的技能：<br>隐匿</b>「<font color=red>匿迹潜形</font>」<br><li><b>锁定技</b>，当你造成或受到伤害时，你令此伤害减一<br><br><b>刺杀</b>「<font color=red>匿影暗杀</font>」<br><li>出牌阶段限一次，你可以与一名其他角色进行一次拼点，若你赢，该角色进入『<b><font color=red>负伤</font></b>』状态直到其回合结束，然后受到一点伤害；若你没赢，你摸两张牌，然后该角色弃置两张手牌<br><br><b>负伤</b>「<font color=red>遍体鳞伤</font>」<br><li><b>锁定技</b>，当你受到伤害时，你令此伤害加一，并弃置一张牌',
    'cards':[],
  },
    '艾萝依':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_ailuoyi"],
    'info':'<b>技能介绍：<br>唤魔</b>「<font color=grey>魔种召唤</font>」<br><li><b>锁定技</b>，当游戏开始/你的出牌阶段开始/你受到伤害之前，若你此时未进入『<b>唤魔</b>』状态，则你进入『<b>唤魔</b>』状态然后随机变身为〖<b><font color=#F0F>虚影</font></b>〗，〖<b><font color=orange>炎魔</font></b>〗，〖<b><font color=cyan>塞壬</font></b>〗中的一个<br><br><li><b>召唤规则：</b><br>进入『<b>唤魔</b>』状态后你获得相应技能，并将体力上限改为2<br>当你进入濒死状态时，你退出『<b>唤魔</b>』状态，你获得一点护甲，并将体力上限改为3，再将手牌摸至体力上限，然后将体力值复原为进入『<b>唤魔</b>』状态之前，再失去1点体力<br><br><li><b>召唤物技能：</b><br><li><b><font color=#F0F>〖虚影〗</font>：</b><b><font color=#F0F>虚灵</font></b>，<b><font color=#F0F>吞噬</font></b><br><li><b><font color=orange>〖炎魔〗</font>：</b><b><font color=orange>灼烧</font></b>，<b><font color=orange>炎狱</font></b><br><li><b><font color=cyan>〖塞壬〗</font>：</b><b><font color=cyan>魅音</font></b>，<b><font color=cyan>妖异</font></b><br><br><b>占星</b>「<font color=grey>预知未来</font>」<br><li><b>锁定技</b>，当你进行判定前，你摸1张牌并取消之<br><br><b><li>以下为获得的技能：<br>虚灵</b>「<font color=#F0F>死灵虚影</font>」<br><li><b>锁定技</b>，你的攻击范围+1；你的你的黑色手牌均视为【<b>雷杀</b>】，红色手牌均视为【<b>闪</b>】；你的手牌上限为体力值的三倍<br><br><b>吞噬</b>「<font color=#F0F>灵魂收割</font>」<br><li><b>锁定技</b>，当你造成伤害后，你摸1张牌并令下一次退出『<b>唤魔</b>』状态后的体力值+1，然后目标弃置需1张手牌并刷新其装备区<br><br><b>灼烧</b>「<font color=orange>地狱之炎</font>」<br><li><b>锁定技</b>，你造成的伤害均视为火属性伤害；每当你造成火属性伤害时，有50％的概率令此伤害+1<br><br><b>炎狱</b>「<font color=orange>烈焰地狱</font>」<br><li>出牌阶段结束时，你可以对至多2名角色各造成1点火属性伤害<br><br><b>魅音</b>「<font color=cyan>妖魅之音</font>」<br><li>当你即将受到伤害时，你可以摸等同于伤害值数的牌，若此伤害大于1，则你防止此伤害<br><br><b>妖异</b>「<font color=cyan>妖异之气</font>」<br><li>准备阶段，你可以摸1张牌并使下次退出『<b>唤魔</b>』状态后的体力值+1，然后你退出『<b>唤魔</b>』状态',
    'cards':[],
  },
  '澜零':{  
    'version':'<b><font color=lightgreen>辅助型</font></b>',
	'players':["sksn_lanling"],
    'info':'<b>技能介绍：<br>反击</b>「<font color=grey>灵魂摆渡</font>」<br><li>回合内每名角色限一次，出牌阶段，你可以将一张牌（【<b>闪</b>】、【<b>无懈可击</b>】除外）交给一名其他角色并令其选择一项：<br><br>①使用此牌并且你摸一张牌（可取消使用）<br><br>②将所有手牌交给你（至少一张）并回复一点体力<br><br><b>契约</b>「<font color=grey>凋零契约</font>」<br><li>当一名其他角色进入濒死状态时，你可以获取该角色所有手牌（至少一张）并令其回复一点体力',
    'cards':[],
  },
  '杰西·弗雷查':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_fuleicha"],
    'info':'<b>技能介绍：<br>材料</b>「<font color=orange>零件收集</font>」<br><li><b>锁定技</b>，每轮游戏开始时/你的回合开始时/你的回合结束时/每当你受到伤害时，你获得一张【<b><font color=orange>基础材料</font></b>】；你的锦囊牌不计入手牌上限<br><br><b>融合</b>":"「<font color=orange>高级素材</font>」<br><li>高级材料获得方式：<br><br>①出牌阶段，你可以将三张【<b><font color=orange>基础材料</font></b>】合成为【<b><font color=orange>高级材料</font></b>】；<br><br>②<b>锁定技</b>，每当你击杀一名角色时，你获得一张【<b><font color=orange>高级材料</font></b>】<br><br><b>制作</b>「<font color=orange>军火大师</font>」<br><li>出牌阶段，你可以将两张【<b><font color=orange>基础材料</font></b>】随机合成为【<b><font color=orange>炸弹牌</font></b>】<br><br><b>爆破</b>「<font color=orange>狂轰滥炸</font>」<br><li>出牌阶段，你可以将两张【<b><font color=orange>高级材料</font></b>】合成为【<b><font color=orange>终极炸弹</font></b>】<br><br><b><li>以下为杰西·弗雷查专属卡牌：</b>',
    'cards':['jxflc_cai','jxflc_cai_gao','jxflc_shou','jxflc_di','jxflc_ding','jxflc_dian','jxflc_wu','jxflc_zhong'],
  },
    '新田布止':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_xintianbuzhi"],
    'info':'<b>技能介绍：<br>觉醒</b>「<font color=cyan>异能觉醒</font>」<br><li><b>锁定技</b>，你的回合内，当你使用一张锦囊牌后，你从剩余武将牌堆中抽取出三张拥有发动时机为出牌阶段的技能的武将牌。你可以选择发动这些技能中的一个，每个技能只能使用一次<br><br><li>回合结束时，若你本回合发动该技能的次数不大于x，则你摸y张牌（x为你当前的体力值，y为你本回合发动该技能的次数）<br><br><li> 关键牌:所有锦囊牌<br><br><li>定位:爆发<br><br><li>技能技巧:<b><font color=#F0F>异能</font></b>发动后，选择技能时若无特殊需求，尽量选择与锦囊牌有关的技能，确保与<b><font color=#F0F>异能</font></b>发生联动。其次还要注意使用次数(注:x为当前体力值)，要保证每回合都能摸牌，以实现持续爆发 。 ',
    'cards':[],
  },
  '奥丁格兰':{  
    'version':'<b><font color=lightgreen>专业型</font></b>',
	'players':["sksn_aodinggelan"],
    'info':'<b>技能介绍：<br>求真</b>「<font color=grey>卫道先师</font>」<br><li>一名角色在其出牌阶段，可以交给你一张牌，然后你可以展示牌堆顶的十张牌，令其获得所有花色与其相同的牌。<br><br><b>寻道</b>「<font color=grey>求真寻道</font>」<br><li>你受到一张牌造成的伤害后，你可以摸一张牌并将对你造成伤害的牌牌放在牌堆底。一名角色的摸牌阶段，你可以令其从牌堆底摸牌。<br><br><b>死志</b>「<font color=grey>意志传承</font>」<br><li>你死亡后，令一名角色获得<b><font color=grey>求真</font></b>与<b><font color=grey>寻道</font></b>两个技能之一。',
    'cards':[],
  },
    '哈利迪斯':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_halidisi"],
    'info':'<b>技能介绍：<br>影狩</b>「<font color=#F0F>寂灭之心</font>」<br><li><b>锁定技</b>，当你进场/回合开始/每受到一点伤害/一名角色阵亡时，你都会获得一枚“<b><font color=#F0F>魔能</font></b>”标记；<br><br><b>黑镰</b>「<font color=#F0F>静默之镰</font>」<br><li>出牌阶段，若你没有技能<b><font color=#F0F>魔镰</font></b>并且你满足以下条件你可以弃置相应“<b><font color=#F0F>魔能</font></b>”然后获得相应等级的<b><font color=#F0F>魔镰</font></b>直到回合结束<br><br><li><b>魔镰获得方式：</b><br>①若你的“<b><font color=#F0F>魔能</font></b>”标记大于0并且小于等于2，你可以弃置1枚“<b><font color=#F0F>魔能</font></b>”标记并获得技能<b><font color=#F0F>魔镰·一阶</font></b><br>②若你的“<b><font color=#F0F>魔能</font></b>”标记大于等于3，你可以弃置2枚“<b><font color=#F0F>魔能</font></b>”标记并摸两张牌，然后获得技能<b><font color=#F0F>魔镰·二阶</font></b><br><br><b><li>以下为获得的技能：<br>魔镰·一阶</b>「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌会额外结算一次，然后失去此技能<br><br><b>魔镰·二阶</b>「<font color=#F0F>静默之镰</font>」<br><li><b>锁定技</b>，你使用基本牌或非延时锦囊牌会额外结算两次，然后失去此技能',
    'cards':[],
  },
  '桀拉尔':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_jielaer"],
    'info':'<b>技能介绍：<br>诡影</b>「<font color=red>诡影舞步</font>」<br><li>出牌阶段，你可以弃置两张手牌与一名攻击范围内的角色交换位置。若如此做，视为你对其使用一张<b>【杀】</b>且本回合内无法再次选取其为此技能的目标<br><br><b>降临</b>「<font color=red>真身降临</font>」<br><li><b>限定技</b>，<b>锁定技</b>，当你的体力值降至1或更低时，你将手牌摸至体力上限再失去一点体力上限，并无视任何阶段强行获得一个额外的回合，然后变身为〖<b><font color=red>影诛神</font></b>〗，再获得技能<b><font color=red>影刃</font></b>和<b><font color=red>影诛</font></b>。<br><br><b>以下为获得的技能：<br><br>影刃</b>「<font color=red>影刃诛神</font>」<br><li><b>锁定技</b>，回合开始时，若你的装备区内没有<b>【<font color=red>影刃刀</font>】</b>，则你使用之<br><br><b>影诛</b>「<font color=red>诛神之力</font>」<br><li><b>锁定技</b>，你的回合内每当你使用一直杀时你会获得一枚“<b><font color=red>诛神</font></b>”标记，你的回合结束时，若你的“<b><font color=red>诛神</font></b>”标记不小于1则你失去一枚“<b><font color=red>诛神</font></b>”标记，当你的“<b><font color=red>诛神</font></b>”标记不小于一定数量时你会获得相应的能力；<br><br><b>两枚：</b>每当你的杀即将造成伤害时，你摸一张牌<br><br><b>三枚：</b>你的杀无法被闪避<br><br><b>四枚：</b>你的杀造成伤害+1，然后弃置所有“<b><font color=red>诛神</font></b>”标记',
    'cards':["SKSN_yingrendao"],
  },
    '鬼厌':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_guiyan"],
    'info':'<b>技能介绍：<br>鬼染</b>「<font color=red>魇语低吟</font>」<br><li>锁定技，出牌阶段开始前，你选择一名角色进行拼点，然后你令其获得<b><font color=red>鬼染</font></b>并失去此技能；若你不选择拼点目标则视为你输；当你死亡时，你令你的下家获得<b><font color=red>鬼染</font></b><br><br><li><b>拼点规则：</b><br>赢：弃置一张牌<br>平：双方各失去一点体力<br>输：随机获得一项惩罚<br><li><b>惩罚方式：</b><br>①弃置两张牌<br>②失去一点体力。"<br><br><b>隐祸</b>「<font color=red>暗染奕局</font>」<br><li><b>锁定技</b>，你不能成为<b><font color=red>鬼染</font></b>的目标；当有角色失去体力时，你摸一张牌<br><br><b>祸乱</b>「<font color=red>混沌起点</font>」<br><li><b>觉醒技</b>，<b>锁定技</b>，若你没有技能<b><font color=red>抹杀</font></b>则你可以通过以下方式获得<br><br><li><b>觉醒方式：</b><br>①每当一名角色失去体力时，你会获得一枚“<b><font color=red>祸乱</font></b>”标记；当你的回合结束时，若你的“<b><font color=red>祸乱</font></b>”标记不小于5，则你弃置所有“<b><font color=red>祸乱</font></b>”标记并获得技能<b><font color=red>抹杀</font></b>，然后失去此技能<br><br>②当一名其他角色阵亡时，你获得技能<b><font color=red>抹杀</font></b>，然后失去此技能<br><br><b>以下为获得的技能：<br><br>抹杀</b>「<font color=red>斩草除根</font>」<br><li><b>锁定技</b>，每当一名其他角色进入濒死状态时，你按照以下规则执行此技能，然后你选择摸一张牌或恢复一点体力<br><br><b><li>抹杀规则：</b><br>①若伤害来源为其他角色，你令该角色或伤害来源双方中的无牌角色摸一张牌，然后令该角色对伤害来源进行拼点，若该角色胜利，伤害来源与其一同死亡，若伤害来源胜利，该角色立即死亡<br><br>②若无伤害来源或伤害来源为你，则该角色立即死亡',
    'cards':[],
  },

  '琼斯':{  
    'version':'<b><font color=red>刺杀型</font></b>',
	'players':["sksn_qiongsi","sksn_qiongsi_soul"],
    'info':'<b>技能介绍：<br>袭掠</b><font color=red>「风驰电掣</font>」<br><li>当你使用『杀』指定手牌数大于你的其他角色为目标时，你可以获得其1张手牌，若此时你与其手牌数相等，你获得其一张装备区的牌<br><li>锁定技，你与手牌数不小于你的角色计算距离时均视为1。<br><li>溃军</b>「<font color=red>百战不殆</font>」<br>锁定技，当你对其他角色造成伤害后，你令受到伤害的角色选择一项：<br>①先摸x张牌，然后弃置2x张牌<br>②随机受到X/2X/0点无来源的伤害<br>（X为伤害值数）<br><li>追命</b>「<font color=red>不死不休</font>」<br>锁定技，你对拥有『<b><font color=red>追命</font></b>』标记的角色使用牌时没有距离限制，若此牌为【杀】，则此牌不计入次数<br><li>锁定技，当拥有『<b><font color=red>追命</font></b>』标记的角色死亡后，你死亡',
    'cards':[],
  },

  '凯恩':{  
    'version':'<b><font color=lightgreen>辅助型</font></b>',
	'players':["sksn_kaien"],
    'info':'<b>技能介绍：<br>同袍</b><font color=cyan>「爱兵如子</font>」<br>限定技，当有角色进入濒死状态时，你可以选择一名其他角色令其于当前回合结束后获得『<b><font color=cyan>同袍</font></b>』和『<b><font color=cyan>袍泽</font></b>』，然后若你为『<b><font color=cyan>凯恩</font></b>』，你将体力值回复至体力上限数<br><li>袍泽</b><font color=yan>「与子同袍</font>」<br>锁定技，每种类型每回合限一次，当拥有『<b><font color=cyan>袍泽</font></b>』的角色使用装备牌时，若场上有其他拥有『<b><font color=cyan>袍泽</font></b>』的角色且其装备区内没有相对应的牌，其视为使用此牌<br><li>锁定技，你的手牌上限额外+X（X为场上其他拥有『<b><font color=cyan>袍泽</font></b>』的角色的数量）<br><li>当场上拥有『<b><font color=cyan>袍泽</font></b>』的角色受到【杀】造成的伤害后，若伤害来源未拥有 『<b><font color=cyan>袍泽</font></b>』，则场上所有拥有『<b><font color=cyan>袍泽</font></b>』的角色可以失去1点体力或弃置2张手牌，然后视为对伤害来源使用一张【杀】<br><li><b>锁定技</b>，当你失去最后一张装备牌时，你须弃置一张牌 ',
    'cards':[],
  },

  '司吉':{  
    'version':'<b><font color=cyan>专业型</font></b>',
	'players':["sksn_siji"],
    'info':'<b>技能介绍：<br>秘教</b>「<font color=red>密隐朝堂</font>」<br>出牌阶段限一次，你可以扣置一张【杀】或普通非指向锦囊牌，并选择一名其他角色，其为此牌指定至少一个目标 ，然后你翻开此牌，若这些目标中含有不合法目标，其弃置X张牌（X为不合法的目标数，不足则全弃）；否则你与其各摸一张牌。最后令其对其指定的目标使用之。<br><li>博众</b>「<font color=red>广博识才</font>」<br>摸牌阶段开始时，你可以令至多X+1名其他角色选择一项：①摸一张牌并可交给你一张牌；②观看你手牌并令你本回合手牌上限+1。然后若选①的角色手牌数均小于你，你放弃摸牌。(X为你已损失体力值）',
    'cards':[],
  },

  '涅普顿':{  
    'version':'<b><font color=yellow>斗士型</font></b>',
	'players':["sksn_niepudun"],
    'info':'<b>技能介绍：<br>海王</b>「<font color=blue>镇海平渊</font>」<br>当你回复体力后，你可以视为使用一张【杀】。若此【杀】造成伤害，该技能本回合失效，你回复1点体力。<b>技能介绍：<br>覆涛</b>「<font color=blue>惊涛骇浪</font>」<br><li>锁定技，一名角色回合开始前，你记录你的体力值为X。本回合你前两次受到伤害时，若你体力值大于1，则防止之并失去体力至1点，且每以此法失去1点体力便摸一张牌；本回合结束后，若你体力值小于X，你回复X-2点体力，且每以此法回复1点体力便弃置一张手牌（不足则全弃）。',
    'cards':[],
  },

  '埃得华':{  
    'version':'<b><font color=lightgreen>辅助型</font></b>',
  'players':["sksn_eidehua"],
    'info':'<b>技能介绍：<br>散威</b>「<font color=black>意想不到</font>」<br>当你于其他角色回合内造成伤害后，你可以令所有手牌数小于当前回合角色的角色各选择是否获得其一张手牌。若其没有手牌可得，其失去1点体力并终止此次结算，且你本局内不能再对其发动〖散威〗。<br><li>借势</b>「<font color=black>有借无还</font>」<br>其他角色受到伤害时，你可以弃置受伤角色1张牌令该伤害-1。若你手牌数大于伤害来源，你可以对受伤角色造成1点伤害；否则你摸一张牌。',
    'cards':[],
  }
  
  /*'模板':{  
    'version':'简介',
	'players':["wwyj_"],
    'info':'技能描述',
    'cards':[],
  },*/
  
  
  
			   
  
}