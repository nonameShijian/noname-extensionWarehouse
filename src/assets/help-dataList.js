const dataList = [{
	title: '教程简介',
	hasFooter: true,
	content: `
<div class="tip">
	<p>由于大部分玩家学习无名杀的代码，是为了做出自己心仪的武将，所以我们将从如何编写技能开始学习</p>
</div>
<h3>谁适合阅读本教程?</h3>
<p>1.想学习如何无名杀技能代码</p>
<p>2.想了解无名杀中的各种api</p>
<div class="el-divider el-divider--horizontal"></div>
<h3>一个简单的技能代码例子</h3>
<p>让我们拿标准包武将貂蝉技能【闭月】作为例子</p>
<p style="color: red">【闭月】：结束阶段，你可以摸一张牌。</p>
<pre class="ql-syntax" spellcheck="false">
skill = {
	audio:2,
	trigger:{
		player:"phaseJieshuBegin",
    },
    frequent:true,
    content:function(){
        player.draw();
    },
}
</pre>
<div class="el-divider el-divider--horizontal"></div>
<h3>阅读本教程前，您需要了解的知识:</h3>
<div class="tip">
	<p>您也可以通过本教程来间接学习下面的知识，但是本教程讲的不会有下面的详细</p>
</div>
<p>
    <a href="https://www.runoob.com/js/js-intro.html" target="_blank" class="el-link el-link--primary is-underline">
        <span class="el-link--inner" style="font-size: 23px;">
            <i class="el-icon-view el-icon--left"></i>
            JavaScript基础
        </span>
    </a>
</p>
<p>
    <a href="https://www.runoob.com/css/css-tutorial.html" target="_blank" class="el-link el-link--primary is-underline">
        <span class="el-link--inner" style="font-size: 23px;">
            <i class="el-icon-view el-icon--left"></i>
            CSS基础
        </span>
    </a>
</p>
`,
}, {
	title: 'JS基础',
	hasFooter: true,
	content: `
<div class="tip">
	<p>本页面参考自菜鸟教程和MDN</p>
</div>
<h3>变量<h3>
<div class="tip">
	<p>变量是用于存储信息的"容器"。</p>
</div>
<h3>一个简单的声明变量的例子</h3>
<pre class="ql-syntax" spellcheck="false">
/*
* num1 和 num2是变量，且num1的值是1，num2的值为3
*/
var num1 = 1;
var num2 = num1 + 2;
</pre>
<h3>变量声明规则</h3>
<div class="tip">
	<p>在JavaScript中，用var关键字声明过的变量可以重复声明，但不建议这么做</p>
</div>
<ul>
    <li>变量必须以字母开头</li>
    <li>变量也能以 $ 和 _ 符号开头（不推荐这么做）</li>
    <li>变量名称对大小写敏感（y 和 Y 是不同的变量）</li>
</ul>
<h3>变量声明</h3>
<pre class="ql-syntax" spellcheck="false">
/*
* 在 JavaScript 中创建变量通常称为"声明"变量。
* 我们使用 var 关键词来声明变量：
*/
var carname;
/*
* 变量声明之后，该变量是空的（它没有值）。
* 如需向变量赋值，请使用等号：
*/
carname = "Volvo";
/*
* 不过，您也可以在声明变量时对其赋值：
*/
var carname = "Volvo";
/*
* 您可以在一条语句中声明很多变量。该语句以 var 开头，并使用逗号分隔变量即可：
*/
var lastname = "Doe", age = 30, job = "carpenter";
/*
* 声明也可横跨多行：
*/
var lastname = "Doe",
age = 30,
job = "carpenter";
/*
*  一条语句中声明的多个变量不可以同时赋同一个值:
* x,y 为 undefined， z 为 1。
*/
var x, y, z = 1;
</pre>
<h3>函数</h3>
<p>函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。</p>
<h4>函数语法</h4>
<p>函数就是包裹在花括号中的代码块，前面使用了关键词 function：</p>
<p style="color: red;">JavaScript 对大小写敏感。关键词 function 必须是小写的，并且必须以与函数名称相同的大小写来调用函数。</>
<pre class="ql-syntax" spellcheck="false">
/*
* 当调用该函数时，会执行函数内的代码。
* 可以在某事件发生时直接调用函数（比如当用户点击按钮时），
* 并且可由 JavaScript 在任何位置进行调用。
*/
function functionname() {
    // 执行代码
}
</pre>
<h4>调用带参数的函数</h4>
<pre>
在调用函数时，您可以向其传递值，这些值被称为参数。
这些参数可以在函数中使用。
您可以发送任意多的参数，由逗号 (,) 分隔：
</pre>
当您声明函数时，请把参数作为变量来声明：
<pre class="ql-syntax" spellcheck="false">
/*
* 变量和参数必须以一致的顺序出现。第一个变量就是第一个被传递的参数的给定的值，以此类推。
*/
function myFunction(var1, var2){
    //代码
}
</pre>
<h4>带有返回值的函数</h4>
<pre>
有时，我们会希望函数将值返回调用它的地方。
通过使用 return 语句就可以实现。
在使用 return 语句时，函数会停止执行，并返回指定的值。
</pre>
<pre class="ql-syntax" spellcheck="false">
/*
* 下面的函数会返回值 5。
*/
function myFunction(){
    var x = 5;
    return x;
}
/*
* 注意： 整个 JavaScript 并不会停止执行，仅仅是函数。JavaScript 将继续执行代码，从调用函数的地方。
* 函数调用将被返回值取代：
* myVar 变量的值是 5，也就是函数 "myFunction()" 所返回的值。
*/
var myVar = myFunction();
</pre>
<h3>数据类型</h3>
<div class="tip">
	<p>本教程只列出无名杀游戏中常用的数据类型</p>
</div>
<p>原始值( primitive values )</p>
<pre>
除 Object 以外的所有类型都是不可变的（值本身无法被改变）。
例如，与 C 语言不同，JavaScript 中字符串是不可变的
（如，JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变）。
我们称这些类型的值为“原始值”。
</pre>
<h4>Boolean</h4>
布尔类型，布尔表示一个逻辑实体，可以有两个值：true 和 false。
<h4>Null</h4>
Null 类型只有一个值： null
<h4>Undefined</h4>
一个没有被赋值的变量会有个默认值 undefined
<h4>Number</h4>
数字类型可以使用运算符来进行运算，比如数学中的加减乘除(+, -, *, /)
数字类型中只有一个整数有两种表示方法： 0 可表示为 -0 和 +0（"0" 是 +0 的简写）。
在实践中，这也几乎没有影响。 例如 +0 === -0 为真。 但是，你可能要注意除以0的时候：
<pre class="ql-syntax" spellcheck="false">
42 / +0; // Infinity
42 / -0; // -Infinity
</pre>
<h4>String</h4>
<pre>
JavaScript 的字符串类型用于表示文本数据。
在字符串中的每个元素占据了字符串的位置。
第一个元素的索引为 0，下一个是索引 1，依此类推。字符串的长度是它的元素的数量。
</pre>
<h4>Object</h4>
在计算机科学中, 对象是指内存中的可以被标识符引用的一块区域.
<pre>
<h4>属性</h4>
在 JavaScript 里，对象可以被看作是一组属性的集合。
用对象字面量语法来定义一个对象时，会自动初始化一组属性。
（也就是说，你定义一个var a = "Hello"，那么a本身就会有a.substring这个方法，以及a.length这个属性等；
如果你定义了一个对象，var a = {}，那么 a 就会自动有 a.hasOwnProperty 及 a.constructor 等属性和方法。）
而后，这些属性还可以被增减。
属性的值可以是任意类型，包括具有复杂数据结构的对象。
属性使用键来标识，它的键值可以是一个字符串或者符号值（Symbol）
</pre>
<h4>Array</h4>
<pre>
数组是一种使用整数作为键(integer-key-ed)属性和长度(length)属性之间关联的常规对象。
此外，数组对象还继承了 Array.prototype 的一些操作数组的便捷方法。
例如, indexOf (搜索数组中的一个值) or push (向数组中添加一个元素），等等。
这使得数组是表示列表或集合的最优选择
</pre>
`
}, {
	title: '技能分类',
	//tip: "技能分类",
	hasFooter: true,
	content: `
<div class="tip">
	<p>无名杀的技能主要由主动技，触发技，mod技组成</p>
    <p>本章节不详细讲述代码所代表的意思，只讲述不同类别技能代码的特性</p>
</div>
<h3>主动技</h3>
<p>主动技大部分由以下类型的技能构成：</p>
<p>1. 出牌阶段时可以使用的技能(和出牌阶段使用手牌一个时机)</p>
<pre class="ql-syntax" spellcheck="false">
skill = {
    /* enable 指的是主动技能触发的时机，是辨别是否是【主动技】的关键
    * 'phaseUse' 指的就是【出牌阶段】了
    * 如果需要这个技能有多个触发时机，可以写成：enable: ['phaseUse', 'chooseToUse']
    * (chooseToUse: 需要选择并使用牌时)
    */
    enable: 'phaseUse',
    /*
    * usable 指的是，技能一回合内至多发动几次
    * 比如要一回合最多发动2次，就是 usable: 2
    */
    usable: 1,
    /*
    * selectTarget 指的是，发动技能前，选择的目标的数量。
    * 比如说王朗【鼓舌】，选择一到三名其他角色, 就是 selectTarget: [1, 3]
    */
    selectTarget: 1,
    /*
    * filterTarget 指的是，发动技能前，限制选择的目标的条件。
    * 比如说曹叡【明鉴】，选择一个其他角色
    * 没有filterTarget 和 selectTarget 时，就是发动此技能时，不需要选择角色
    */
    filterTarget: function(card, player, target) {
        /*
        * card: 卡牌
        * player: 要发动技能的角色（即自己）
        * target: 要选择的目标
        * 返回值： Boolean (布尔值，只有真 和 假两个值)， 即target是否可以被这个技能选为目标
        * return player != target && target.countCards('h') > 0 的意思是，
        * 如果player不等于target 且 target的手牌数大于0，返回真，否则为假
        */
        return player != target && target.countCards('h') > 0;
    },
    /*
    * filter 指的是，发动技能前，限制发动技能的条件。
    */
    filter: function(event, player) {
        /*
        * event: 事件
        * player: 要发动技能的角色（即自己）
        * 返回值： Boolean (布尔值，只有真 和 假两个值)， 即是否可以发动此技能
        * return player.countCards('h') > 0 的意思是， 如果player的手牌数大于0，返回真，否则为假
        */
        return player.countCards('h') > 0;
    },
    /*
    * content 指的是，发动技能时要执行的内容。
    */
    content: function() {
        /*
        * content函数里并没有参数，是因为在无名杀中，必要的一些参数会注入到这个函数中。
        * step x : 步骤x，在这里执行一些特殊的api需要分步执行，这一步骤做出动作，下一步骤得到结果
        * target: 发动技能选择的单个目标，多个目标请用targets
        * 下面代码的意思:
        * 步骤0，目标强制选择一张手牌
        * 步骤1，如果有（选择的）结果，你获得那张牌（其交给你那张牌）
        */
        'step 0'
        target.chooseCard('h', true);
        'step 1'
        if(result.bool) {
            var card = result.cards[0];
            player.gain(card, target, 'giveAuto');
        }
    },
    /*
    * ai 指的是，让ai了解发动这个技能对自己，其他人的收益，以及设置一些技能标签，技能嘲讽值，身份暴露值等等。
    * 例子省略，在以后的ai教程中会讲
    */
    ai:{}
}
</pre>
<p>2. 转化类技能</p>
<pre class="ql-syntax" spellcheck="false">
skill = {
    /*
    * enable 指的是主动技能触发的时机，是辨别是否是【主动技】的关键
    * chooseToRespond: 选择卡牌打出
    * chooseToUse: 选择卡牌使用
    */
    enable:["chooseToRespond", "chooseToUse"],
    /*
    * filterCard: 选择卡牌的条件
    * card: 卡牌
    * player: 要发动技能的角色（即自己）
    * 返回值： Boolean (布尔值，只有真 和 假两个值)， 即card是否是这个技能的合法卡牌
    * get.color(card) == 'red' 指的是，判断卡牌的颜色是否为红色，如果是，返回真，否则为假
    * 即这个转化类技能只有红色的card才能使用（参考关羽【武圣】）
    */
    filterCard: function(card, player){
        return get.color(card) == 'red';
    },
    /*
    * position: 可以从哪些区域选择牌
    * h：手牌区， e：装备区，s：木牛流马盖牌区域
    */
    position: "hes",
    /*
    * viewAs: 要被视为的卡牌名称
    * “sha”: 卡牌【杀】的id
    */
    viewAs: {
        name: "sha",
    },
    /*
    * viewAsFilter: 什么条件下才可以发动技能来转化牌
    * player: 要发动技能的角色（即自己）
    * 返回值： Boolean (布尔值，只有真 和 假两个值)， 即是否可以发动技能来转化牌
    * 返回值默认视为true(真)
    */
    viewAsFilter: function(player) {
        /*
        * player.countCards: player的特定区域下，指定条件的卡牌数
        * player.countCards(String position, Object condition);
        * position: 卡牌区域， h：手牌区， e：装备区，s：木牛流马盖牌区域
        * condition: 特定条件
        * {color:'red'} 指卡牌的颜色
        * 返回值： Number， 即指定条件的卡牌数
        */
        if( !player.countCards('hes', {color:'red'}) ) return false;
    },
    /*
    * prompt: 技能发动提示
    */
    prompt: "将一张红色牌当杀使用或打出",
     /*
    * 关于ai的例子省略，在以后的ai教程中会讲，这里只保留必要的
    * respondSha: 在没有【杀】时依旧可以相应【决斗】，【南蛮入侵】等卡牌
    * skillTagFilter: 此技能所有设置过的标签的条件，返回值为false则关闭标签的效果
    */
    ai: {
        respondSha: true,
        skillTagFilter: function(player) {
            if(!player.countCards('hes',{color:'red'})) return false;
        },
    }
}
</pre>
<div class="el-divider el-divider--horizontal"></div>
<h3>触发技</h3>
<p>触发技的类型就很单一了：</p>
<pre class="ql-syntax" spellcheck="false">
skill = {
    /*
    * trigger: 技能触发时机，是辨别是否是【触发技】的关键
    * 类型：Object， 即一对大括号，里面是“键值对”
    * player 和 global 解析为字符串类型的“键”
    * 'damageEnd' 和 'phaseJieshuBegin' 就是“值”
    *
    * player: 要发动技能的角色（即自己）
    * global: 任一角色
    *
    * damageEnd: 受到伤害后
    * phaseJieshuBegin： 回合结束时（结束阶段）
    */
    trigger: {
        player: 'damageEnd',
        global: 'phaseJieshuBegin',
    },
    /*
    * frequent: 是否自动发动
    */
    frequent: true,
    /*
    * filter: 发动技能前，限制发动技能的条件。
    */
    filter: function(event, player) {
        /*
        * event: 事件
        * player: 要发动技能的角色（即自己）
        * 返回值： Boolean (布尔值，只有真 和 假两个值)， 即是否可以发动此技能
        */
        if (event.player == player) {
            /*
            * event.player: 触发当前事件的角色
            * event.player == player: 判断触发当前事件的角色是否等于要发动技能的角色（即自己）
            * 判断的意义在于，区分触发的时机是 player: 'damageEnd' 还是  global: 'phaseJieshuBegin'
            * event.num: 当前事件的点数，例如伤害，回血等等是有点数的
            * event.num && event.num > 0: 当前事件有点数，且点数大于0
            */
            return event.num && event.num > 0;
        } else {
            /*
            * 进入此else的条件是，触发事件的角色不是自己（即【其他角色回合结束时】）
            */
            return true;
        }
    },
    content: function() {
        /*
        * content函数里并没有参数，是因为在无名杀中，必要的一些参数会注入到这个函数中。
        * trigger: 在content函数中，trigger等同于filter里的第一个参数event
        */
        if (trigger.player == player) {
            /*
            * player.draw(Number num)
            * 玩家(发动技能的角色)摸num张牌
            */
            player.draw(2);
        } else {
            /*
            * player.drawTo(Number num)
            * 玩家(发动技能的角色)摸至num张牌
            */
            player.drawTo(4);
        }
    },
}
</pre>
<div class="el-divider el-divider--horizontal"></div>
<h3>mod技</h3>
<p>mod技能指的是一种永久状态(除非失去技能)，不能被主动使用或者某一时机触发</p>
<pre class="ql-syntax" spellcheck="false">
skill = {
    /*
    * mod: 是辨别是否是【mod技】的关键
    * 类型：Object， 即一对大括号，里面是“键值对”
    */
    mod: {
        /*
        * targetEnabled: 是否可以成为card的目标
        * 返回值类型: Boolean(布尔值，只有真 和 假两个值)， 即是否可以成为card的目标
        * card: 将要进行判断的卡牌
        */
        targetEnabled: function(card) {
            /*
            * typeList: 一个数组
            * 'trick': 非延时锦囊的类型id
            * 'delay': 延时锦囊的类型id
            * typeList.contains(any item): 判断typeList中有没有item。返回值类型: Boolean
            * get.type(Object obj): 判断obj的类型(一般是判断卡牌的类型)。返回值类型: String | void
            * get.color(Object obj): 判断obj的颜色(一般是判断卡牌的颜色)。返回值类型: String
            */
            var typeList = ['trick', 'delay'];
            if( typeList.contains( get.type(card) ) &&
                get.color(card) == 'black' ) return false;
        },
        /*
        * cardUsable: 卡牌使用数量限制
        * 返回值类型: Number, 默认为num
        * card: 将要进行判断的卡牌
        * player: 技能拥有者（即自己）
        * num: 原先可使用的数量
        */
        cardUsable: function(card, player, num) {
            /*
            * card.name: 卡牌名称(英文id)
            * 'sha': 卡牌【杀】的英文id
            * Infinity: 正无穷
            */
            if(card.name == 'sha') return Infinity;
        },
    }
}
</pre>
`,
}, {
	title: '常用名词',
	hasFooter: true,
	content: ``
}, /*{
	title: '试一试',
	hasEditor: true,
	editorId: '1',
	codes: ['skill = {', '}'].join('\r\n'),
	hasFooter: false,
	content: ``
}*/];

export {dataList};
