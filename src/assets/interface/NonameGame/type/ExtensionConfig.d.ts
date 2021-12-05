/** 扩展通用配置项 */
interface ExCommonConfig {
    /** 
     * 扩展名
	 *
	 * 类型：字符串
	 * 
	 * @type {string}
     */
    name?: string;

    /********************************import:extentsion******************************* */

    // 这个还是放在各自的文件中比较好
    /**
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：布尔值
	 * 
     * 作用：扩展是否可以联机
     * 
	 * 已废弃，因为现在扩展禁止联机（有的大佬写的额外的联机不算在内）
	 * 
	 * @type {boolean}
     */
    connect?: boolean|SMap<SelectConfigData>;
    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：键值对 或 字符串
	 * 
     * 作用：翻译（本地化）
	 * 
     * 该扩展使用的常量字符串
     * 
     *  注：用于game.addMode中时，translate是单字符串，表示当前mode的翻译，即lib.mode[xxxmode].name；
	 * 
	 * @type {SMap<string>|string}
     */
    translate: SMap<string>|string;
    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：帮助文本
	 * 
     * 帮助内容将显示在菜单－选项－帮助中
	 * 
     * 游戏编辑器的帮助代码基本示例结构：
	 * 
     * "帮助条目":"
	 * 
     *  \<ul\>
	 * 
     *      \<li\>列表1-条目1
	 * 
     *      \<li\>列表1-条目2
	 * 
     *  \</ul\>
	 * 
     *  \<ol\>
	 * 
     *      \<li\>列表2-条目1
	 * 
     *      \<li\>列表2-条目2
	 * 
     *  \</ul\>"
	 * 
     * (目前可显示帮助信息：mode，extension，card卡包，character武将包)
	 * 
	 * @type {SMap<string>}
     */
    help?: SMap<string>;

    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：字符串
	 * 
	 * 作用：用于解析用的key，不直接参与游戏逻辑，参与自己定义的解析流程，统一该包的前缀 
	 * 
	 * @type {string}
	 */
    key?:string;
    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：布尔值
	 * 
     * 作用：是否可编辑该扩展（需要打开显示制作扩展）
	 * 
     * （都满足条件，则可以开启“编辑此扩展”功能）
	 * 
	 * @type {boolean}
     */
    editable: boolean;

    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：该扩展菜单页面的设置
     * 
     * 名字："extension_" + 扩展名 + config的键
	 * 
     * (也是游戏编辑器中的选项代码部分)
	 * 
	 * @type {SMap<SelectConfigData>}
     */
    config: SMap<SelectConfigData>;

    /**
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：联机配置
     * 
     * 特殊接口：update
     */
    connect?: SMap<SelectConfigData>;

    /**
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：扩展的包信息
	 * 
     * （主要是通过系统内部自带编译器编辑的代码，导入逻辑其实基本一致）
	 * 
	 * @type {PackageData}
     */
    package: PackageData;

    /**
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：函数
	 * 
     * 作用：函数执行时机为游戏数据加载之后、界面加载之前
     * （也是游戏编辑器中的主代码部分）
     * 
     * 注：即选择了玩法模式之后加载的内容部分
	 * 
     * @param config 扩展选/配置
     * @param pack 扩展定义的武将、卡牌和技能等
	 * @returns 无返回值
     */
    content(config: SMap<any>, pack: PackageData): void;
    /**
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
     * 作用：函数执行时机为游戏数据加载之前，且不受禁用扩展的限制，除添加模式外请慎用
	 * 
     * （也是游戏编辑器中的启动代码部分）
     * 
     * 注：game.import添加扩展时就加载，即当前游戏加载菜单界面时就已经加载；
	 * 
     * @param data 保存在lib.config中”extension_扩展名“为前缀的配置
	 * @returns 无返回值
     */
    precontent(data: SMap<any>): void;
    /** 
	 * 应用于： game.import的第一个参数为"extentsion"。
	 * 
	 * 类型：函数
	 * 
	 * 作用：删除该扩展后调用此函数
	 * 
	 * @type {function():void}
	 * @returns 无返回值
	 */
    onremove(): void;

    /************************import:mode***************************/
    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：字符串
	 * 
     * 作用：【特殊】用于game.addMode添加时，
     * 用于显示模式icon，所有的图片路径的imgsrc，指定外层扩展文件名；
	 * 
	 * @type {string}
     */
    extension?:string;


    /** 
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：技能（主要是放些该模式下特有的技能） 
	 * 
	 * @type {SMap<ExSkillData>}
	 * */
    skill?: SMap<ExSkillData>;
    /** 
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：武将包：
     * （主要导入该模式下特有的武将，角色）
	 * 
     * 主要以一个个包形式导入，每个包包含这该包一系列武将信息
	 * 
	 * @type {SMap<SMap<HeroData>>}
     */
    characterPack?: SMap<SMap<HeroData>>;
    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：武将分类排序：
	 * 
     * 整合在该模式下的某些武将排序。
	 * 
	 * @type {SMap<SMap<string[]>>}
     */
    characterSort?: SMap<SMap<string[]>>;
    /** 
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：卡牌（主要是放些该模式下特有的卡牌） 
	 * 
	 * @type {SMap<ExCardData>}
	 * */
    card?: SMap<ExCardData>;
    /** 
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：卡包：
     * （主要导入该模式下特有的卡牌）
	 * 
     * 主要以一个个包形式导入，每个包包含这该包一系列卡牌名
	 * 
	 * @type {SMap<SMap<string[]>>}
     */
    cardPack?: SMap<SMap<string[]>>;

    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：函数
	 * 
     * 作用：mode的init方法
     * （若有，init是最早启动的方法）
	 * 
	 * @type {function():void}
	 * @returns 无返回值
     */
    init?(): void;
    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：函数
	 * 
     * 作用：mode的start启动方法
	 * 
	 * @type {function():void}
	 * @returns 无返回值
     */
    start(): void;
    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：函数
	 * 
     * 作用：mode的start启动之前的处理方法
	 * 
	 * @type {function():void}
	 * @returns 无返回值
     */
    startBefore?(): void;
    /**
	 * 应用于： game.import的第一个参数为"mode"。
	 * 
	 * 类型：函数
	 * 
     * 作用：重新初始化
	 * 
     * 在lib.client.reinit中，
     * game.loadModeAsync，读取mode时启用这个初始化。
	 * 
     * 具体作用：有待考究
	 * 
	 * @type {function():void}
	 * @returns 无返回值
     */
    onreinit?(): void;

    /*******************************import:player****************************** */
    /** 
	 * 应用于： game.import的第一个参数为"player"。
	 * 
	 * 类型：字符串数组
	 * 
	 * 作用：设置禁用此扩展的模式 
	 * 
	 * @type {string[]}
	 * */
    forbid: string[];
    /** 
	 * 应用于： game.import的第一个参数为"player"。
	 * 
	 * 类型：字符串数组
	 * 
	 * 作用：设置可使用模式 
	 * 
	 * @type {string[]}
	 * */
    mode: string[];

    //自定义是实现核心初始化方法
    init?(): void;
    arenaReady?(): void;

    /*******************************import:card********************************* */
    /** 
	 * 应用于： game.import的第一个参数为"card"。
	 * 
	 * 类型：布尔值
	 * 
	 * 作用：设置该卡包是否可以联机 
	 * 
	 * @type {boolean}
	 * */
    connect?: boolean;
    /** 
	 * 应用于： game.import的第一个参数为"card"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置卡牌
	 * 
	 * @type {SMap<ExCardData>}
	 * */
    card: SMap<ExCardData>;
    /** 
	 * 应用于： game.import的第一个参数为"card"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置卡牌技能 
	 * 
	 * @type {SMap<ExSkillData>}
	 * */
    skill: SMap<ExSkillData>;
    /** 
	 * 应用于： game.import的第一个参数为"card"。
	 * 
	 * 类型：数组
	 * 
	 * 作用：设置从牌堆添加指定卡牌
	 * 
	 * @type {CardBaseData[]}
	 * */
    list: CardBaseData[];


    /********************************import:character**************************** */
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：布尔值
	 * 
	 * 作用：设置该武将包是否可以联机 
	 * 
	 * @type {boolean}
	 * */
    connect?: boolean;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：字符串数组
	 * 
	 * 作用：设置联机武将禁用列表 
	 * 
	 * @type {string[]}
	 * */
    connectBanned?: string[];
    
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：设置武将基本配置信息
	 * 
	 * @type {SMap<HeroData>}
     */
    character: SMap<HeroData>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置武将介绍 
	 * 
	 * @type {SMap<string>}
	 * */
    characterIntro?: SMap<string>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置武将标题（用于写称号或注释） 
	 * 
	 * @type {SMap<string>}
	 * */
    characterTitle?: SMap<string>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置技能 
	 * 
	 * @type {SMap<ExSkillData>}
	 * */
    skill?: SMap<ExSkillData>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置珠联璧合武将 
	 * 
	 * @type {SMap<string[]>}
	 * */
    perfectPair?: SMap<string[]>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置指定武将的过滤方法（传入一个mode，用于过滤玩法模式） 
	 * 
	 * @type {SMap<OneParmFun<string, boolean>>}
	 * */
    characterFilter?: SMap<OneParmFun<string, boolean>>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：设置在武将包界面分包
	 * 
	 * @type {SMap<SMap<string[]>>}
     */
    characterSort?: SMap<SMap<string[]>>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置该武将包独有的卡牌（或者是特殊卡牌） 
	 * 
	 * @type {SMap<ExCardData>}
	 * */
    card?: SMap<ExCardData>;
    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：设置自定义卡牌类型的排序用的优先级 
	 * 
	 * @type {SMap<number>}
	 * */
    cardType?: SMap<number>;

    /**
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：设置动态翻译（本地化）【v1.9.105】
     * 
     * 指定lib.dynamicTranslate.xxx为一个函数 即可让技能xxx显示的描述随玩家状态而变化 并实现技能修改等
     * 
     * Player:指技能拥有者；
	 * 
	 * @type {SMap<OneParmFun<Player,string>>}
     */
    dynamicTranslate?: SMap<OneParmFun<Player,string>>;

    /** 
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：选择武将时，武将左下角可进行替换的武将配置【v1.9.106.3】 
	 * 
	 * @type {SMap<string[]>}
	 * */
    characterReplace?: SMap<string[]>;

    /**
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
	 * 作用：对应lib.element,
     * 若里面是项目内的同名字段，将覆盖原方法
	 * 
	 * @type {SMap<any>}
     */
    element?: SMap<any>;
    /**
	 * 应用于： game.import的第一个参数为"character"。
	 * 
	 * 类型：键值对
	 * 
     * 作用：对应ai
	 * 若里面是项目内的同名字段，将覆盖原方法
	 * 
	 * @type {SMap<any>}
     */
    ai?: SMap<any>;
    /**
     * 应用于： game.import的第一个参数为"character"。
     * 
     * 类型：键值对
     * 
     * 作用：对应ui
     * 若里面是项目内的同名字段，将覆盖原方法
     * 
     * @type {SMap<any>}
     */
    ui?: SMap<any>;
    /**
     * 应用于： game.import的第一个参数为"character"。
     * 
     * 类型：键值对
     * 
     * 作用：对应game
     * 若里面是项目内的同名字段，将覆盖原方法
     * 
     * @type {SMap<any>}
     */
    game?: SMap<any>;
    /**
     * 应用于： game.import的第一个参数为"character"。
     * 
     * 类型：键值对
     * 
     * 作用：对应get
     * 若里面是项目内的同名字段，将覆盖原方法
     * 
     * @type {SMap<any>}
     */
    get?: SMap<any>;

    /** 其余的全部保存到lib中，若有则覆盖，若没有则添加 */
    [key: string]: any;
}

/** 
 * 菜单的选项的配置 
 * 
 * config的功能菜单的node._link.config，就是该config
 * 内部代码略复杂，太多UI相关逻辑，看不懂（等日后精进，再继续再战）
 */
interface SelectConfigData {
    /** 功能名 */
    name: string;
    /** 
     * 【核心】初始化时默认的选项/配置/模式（对应下面item的key）
     */
    init: boolean | string;
    /** 
     * 【核心】二级菜单配置(当前config内容的菜单)
     */
    item?: SMap<string> | NoneParmFum<SMap<string>>;
    /** 
     * 功能说明
     * 
     * 若没有，也不是其他特殊的选项，则显示“设置+name”
     */
    intro?: string | NoneParmFum<string>;

    /**
     * 显示bar(添加了“withbar”,有一定的居中效果，即当前menu的头部或者尾部)
     * 
     * @param node 创建出来的visualBar节点
     * @param item item选项
     * @param create 即内部自定义的createNode方法，一般不直接使用该方法，目前来看，可以内部重新定义覆盖该方法，自己达成创建item列表的方式
     * @param switcher 当前config的item的node节点
     */
    visualBar?: (node: HTMLDivElement, item: SMap<string>, create: OneParmFun<string, void>, switcher?: HTMLDivElement) => void
    /**
     * 显示菜单
     * 显示一个以3列为一行的显示列表（内部实现）
     * @param node 当前配置项的节点
     * @param item 当前node的node._link
     * @param name item选项
     * @param config 当前的config
     */
    visualMenu?: (node: HTMLDivElement, link: any, name: string, config: SelectConfigData) => void;
    /**
     * 文本菜单
     * 当前不存在visualMenu的话，则创建item列表节点，若有该属性则执行
     * @param node 
     * @param link 
     */
    textMenu?(node: HTMLDivElement, link: string, config: SelectConfigData): void;

    /** 
     * 清理游戏，核心选项，应该默认是false(undefined)<--该功能不知是否存在
     * 
     * 若没有nopointer配置（false/undefined）,则设置“pointerspan”
     * 
     * 通“click”,即当前整个node都可以点击<--这个应该才是真实的功能
     */
    clear?: boolean;
    /** 指定该项没有功能，仅展示，项目内多用于描述上 */
    nopointer?: boolean;
    /** 
     * 点击触发事件
     * 
     * 若有返回值false，则当前点击事件的toggle切换无效
     */
    onclick?(item: any): void | boolean;
    onclick?(link: any, node: HTMLDivElement): void | boolean;

    /** 当前没有onclick方法时，除了默认game.saveConfig保存数据配置key的数据，可以使用该方法进行数据处理啊 */
    onsave?(reslut: any): void;

    /**
     * 输入框
     * 
     * 其输入框的默认值是当前的init属性
     */
    input?: boolean;
    /** 取值true，若没有设置可以进行input输入 */
    fixed?: boolean;
    /** 设置input节点的onblur事件的回调（焦点离开输出框） */
    onblur?(): void;

    /**
     * 用于扩展菜单lib.extensionMenu中(目前未见使用)
     */
    onswitch?(bool: boolean): void;

    /** 核心，更新方法 */
    update?(config: SMap<any>, map: SMap<HTMLDivElement>): any;

    /**
     * 在玩法模式选择中： 
     *  是否需要“重启”游戏，若为true，则“启”按钮会高亮（添加“glowing”）
     * 在选项中：
     *  每次改变该选项，都会重置当前的ui选项（增加，减少一些功能项） 
     */
    restart?: boolean | NoneParmFum<boolean>;
    /** 应该与unfrequent功能时一致的，相反判断，直接显示出来的功能项 */
    frequent?: boolean,
    /** 加入更多中（随着下拉出现），用得较多 */
    unfrequent?: boolean;
    /** 不明，用得很少 */
    content?(bool: boolean): void;

    /** 内部属性，记录当前配置的key */
    _name?: string;
}

/** 通常菜单的标准配置 */
interface CommonMenuConfigData {
    name: string,
    /** 估计是联机配置，具体要看代码 */
    connect?: {
        // update(config: any, map: any):any;
        /** 其余配置(混合两种写法，不知怎么写) */
        [key: string]: SelectConfigData;
    }
    config: {
        // update(config: any, map: any):any;
        /** 其余配置(混合两种写法，不知怎么写) */
        [key: string]: SelectConfigData,
    }
}

/** 扩展菜单的标准配置 */
interface ExtensionMenuConfigData {
    /** 开启 */
    enable?: SelectConfigData,
    /** 功能描述 */
    intro?: SelectConfigData,
    /** 作者信息栏 */
    author?: SelectConfigData,
    /** 隐藏此扩展(代码内部添加) */
    hide?: SelectConfigData,
    /** 其余配置 */
    [key: string]: SelectConfigData,
}

/**
 * 玩家相关扩展（import:player）
 * 不过实际上用得少，都是直接在mode中，或者在extension
 */
interface PlayerConfigData extends ExCommonConfig {
    /** 禁用此扩展的模式 */
    forbid: string[];
    /** 可使用模式 */
    mode: string[];

    //自定义是实现核心初始化方法
    init?(): void;
    arenaReady?(): void;

    /** 以下都是执行覆盖或者新增某些方法 */
    element?: SMap<any>;
    ui?: SMap<any>;
    game?: SMap<any>;
    get?: SMap<any>;

}

/** 扩展回调方法 */
type ExtensionFunc = (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => ExCommonConfig;

/**
 * extentsion扩展的配置（import:extentsion）
 * game.import的回调返回值结构
 */
interface ExtensionInfoConfigData extends ExCommonConfig {
    /** 用于解析用的key，不直接参与游戏逻辑，参与自己定义的解析流程，统一该包的前缀 */
    key?:string;
    /** 
     * 是否可编辑该扩展（需要打开显示制作扩展）
     * （都满足条件，则可以开启“编辑此扩展”功能）
     */
    editable: boolean;

    /** 
     * 该扩展菜单的扩展 
     * 
     * 名字：”extension_“+name
     * (也是游戏编辑器中的选项代码部分)
     */
    config: SMap<SelectConfigData>;

    /**
     * 联机配置
     * 
     * 特殊接口：update
     */
    connect?: SMap<SelectConfigData>;

    /**
     * 扩展的包信息
     * （主要是通过系统内部自带编译器编辑的代码，导入逻辑其实基本一致）
     */
    package: PackageData;

    /**
     * 函数执行时机为游戏数据加载之后、界面加载之前
     * （也是游戏编辑器中的主代码部分）
     * 
     * 注：即选择了玩法模式之后加载的内容部分；
     * @param config 扩展选/配置
     * @param pack 扩展定义的武将、卡牌和技能等
     */
    content(config: SMap<any>, pack: PackageData): void;
    /**
     * 函数执行时机为游戏数据加载之前，且不受禁用扩展的限制
     * 除添加模式外请慎用
     * （也是游戏编辑器中的启动代码部分）
     * 
     * 注：game.import添加扩展时就加载，即当前游戏加载菜单界面时就已经加载；
     * 注2：当前扩展联机时，需要直接再此扩展；为了方便扩展，大部分扩展直接在这里扩展；
     * @param data 保存在lib.config中”extension_扩展名“为前缀的配置
     */
    precontent(data: SMap<any>): void;
    /** 删除该扩展后调用 */
    onremove(): void;

    /**
     * 【特殊】用于game.addMode添加时，
     * 用于显示模式icon，所有的图片路径的imgsrc，指定外层扩展文件名；
     */
    extension?:string;

    //基本无用，一般配置直接在package中
    // /** 技能配置 */
    //skill?: SMap<any>;
    // /** 卡牌配置 */
    // card?: SMap<any>;
    // /** 相关文件名 */
    // files?: SMap<any[]>;
    // init?():void;
    // video?():void;
    // arenaReady?():void;

    /**
     * 对应lib.element,
     * 若里面是项目内的同名字段，将覆盖原方法
     */
    element?: SMap<any>;
    /**
     * 对应ai
     */
    ai?: SMap<any>;
    /**
     * 对应ui
     */
    ui?: SMap<any>;
    /**
     * 对应game
     */
    game?: SMap<any>;
    /**
     * 对应get
     */
    get?: SMap<any>;

    /** 
     * 可以继续加入更多对象：
     * 这些对象会对应附加在lib中，或替换对应lib位置的对象：
     * 例如：translate，help，skill... ... 或者其他自定义的...
     */
    [key: string]: any;
}

/**
 * 玩法模式的扩展配置(import:mode)
 * game.import,type为mode的主要返回结构
 * 
 * 若想扩展一些项目内没有的对象，最好采用以下两种结构加入：
 * 1.数组:[];
 * 2.对象结构：{}
 * 要扩充方法，通过对象结构，都会以lib[新对象结构的key]={对象结构}的方式保存在本地。
 */
interface ExModeConfigData extends ExCommonConfig {
    /** 技能（主要是放些该模式下特有的技能） */
    skill?: SMap<ExSkillData>;
    /** 
     * 武将包：
     * （主要导入该模式下特有的武将，角色）
     * 主要以一个个包形式导入，每个包包含这该包一系列武将信息
     */
    characterPack?: SMap<SMap<HeroData>>;
    /**
     * 武将分类排序：
     * 整合在该模式下的某些武将排序。
     */
    characterSort?: SMap<SMap<string[]>>;
    /** 卡牌（主要是放些该模式下特有的卡牌） */
    card?: SMap<ExCardData>;
    /** 
     * 卡包：
     * （主要导入该模式下特有的卡牌）
     * 主要以一个个包形式导入，每个包包含这该包一系列卡牌名
     */
    cardPack?: SMap<SMap<string[]>>;

    /**
     * mode的init方法
     * （若有，init是最早启动的方法）
     */
    init?(): void;
    /**
     * mode的start启动方法
     */
    start(): void;
    /**
     * mode的start启动之前的处理方法
     */
    startBefore?(): void;
    /**
     * 重新初始化
     * 在lib.client.reinit中，
     * game.loadModeAsync，读取mode时启用这个初始化。
     * 具体作用：有待考究
     */
    onreinit?(): void;

    /**
     * 对应lib.element,
     * 若里面是项目内的同名字段，将覆盖原方法
     */
    element?: SMap<any>;
    /**
     * 对应ai
     */
    ai?: SMap<any>;
    /**
     * 对应ui
     */
    ui?: SMap<any>;
    /**
     * 对应game
     */
    game?: SMap<any>;
    /**
     * 对应get
     */
    get?: SMap<any>;

    /** 
     * 可以继续加入更多对象：
     * 这些对象会对应附加在lib中，或替换对应lib位置的对象：
     * 例如：translate，help，skill... ... 或者其他自定义的...
     */
    [key: string]: any;
}

/** 
 * 扩展的包信息
 * 游戏自带编辑器的代码编辑区域的扩展结构：
 * （主要是通过系统内部自带编译器编辑的代码，导入逻辑其实基本一致）
 */
interface PackageData {
    /** 扩展制作作者名 */
    author?: string,
    /** 扩展描述 */
    intro?: string,
    /** 讨论地址 */
    diskURL?: string,
    /** 网盘地址 */
    forumURL?: string,
    /** 扩展版本 */
    version?: string,

    /** 武将导入信息 */
    character?: CharacterConfigData;
    /** 卡牌导入信息 */
    card?: CardHolderConfigData;
    /** 技能导入信息 */
    skill?: ExSkillConifgData;

    /** 相关文件名（扩展所使用的一些图片） */
    files?: {
        character: string[];
        card: string[];
        skill: string[];
    }
}


/** 下载的扩展的基本结构 */
interface ExtensionItemData {
    /** 扩展描述 */
    intro: string;
    /** 扩展作者 */
    author: string;
    /** 网盘地址 */
    netdisk: string;
    /** 来源地址/反馈地址 */
    forum:string;
    /** 版本 */
    version: string;
    /** 文件列表（下载的文件列表） */
    files: string[];
    /** 扩展大小（仅显示用） */
    size: string;
  }