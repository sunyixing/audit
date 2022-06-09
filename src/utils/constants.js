/**
 * 微信后台常量
 */

export const menuTypeEnum = {//菜单内容类型枚举
  "URL": "view",
  "TEXT": "text",
  "IMAGE": "image",
  "NEWS": "news",
  "ADVANCE": 'advance',
  "CLICK": 'click',
  "MINI": 'miniprogram'//小程序
}

export const imagePrefix = '';//'/wechat/api/material/downloads?image=';//图片前缀

export const activityTypeList = [//活动类型
  { label: '实物商品', value: 'real' },
  { label: '虚拟商品', value: 'virtual' }
]

export const backgroundTypeList = [//背景图片类型
  { label: '显示', value: 'show_user' },
  { label: '隐藏', value: 'hide_user' }
]

export const prizeCategoryList = [//奖品链接类型
  { label: '单链接', value: 'single_link' },
  { label: '多连接', value: 'multi_link' },
  { label: '回复文字', value: 'none_link' }
];


/**
 * 本地存储中使用的key值
 */
export const storageKeyPlatform = 'platform';//平台
export const storageKeyPermission = 'permission';//用户权限
export const storageKeyUserInfo = 'userInfo';//用户信息
export const storageKeyIsChange = 'changePeriod';//用来判断是否需要显示切换成功字段
export const storageKeyLogin = "isLogin";

/*
 * 美店后台常量
 */

// 频道类型
export const channelTypeList = [
  {
    "value": 0,
    "label": "首页"
  },
  {
    "value": 1,
    "label": "普通频道页"
  },
  {
    "value": 2,
    "label": "美好知识"
  },
  {
    "value": 3,
    "label": "百匠"
  }
]


export const channelType = (function(){
  var result = {};
  channelTypeList.forEach(item => {
    result[item.value] = item.label;
  });
  return result;
})();

//活动状态
export const activityState = {
  "NOT_START": '未开始',
  "ONGOING": '进行中',
  "EXPIRED": '已结束'
}

/**
 * 发布状态
 */
export const publishStateList = [
  { label: '已发布', value: 'PUBLICHED' },
  { label: '未发布', value: 'NOT_PUBLISHED' }
]

export const publishState = (function(){
  var result = {};
  publishStateList.forEach(item => {
    result[item.value] = item.label;
  });

  return result;
})();

/**
 * 页面编辑状态
 */
export const editStateList = [
  { label: '草稿', value: 'EDITING' },
  { label: '完成', value: 'FINISHED' }
]

export const editState = (function(){
  var result = {};
  editStateList.forEach(item => {
    result[item.value] = item.label;
  });
  return result;
})();




/**
 * 表格上方的按钮操作类型
 */
export const tableActionType = {
  'ADD': 'add',//新增
  'BATCHPUBLISH': 'batchPublish'//批量发布
}

/**
 * 表格上方按钮的内容类型
 */
export const contentType = {
  "BTN": 'btn'
}

/**
 * 列操作类型
 */
export const columnActionType = {
  'EDIT': 'edit',//编辑按钮
  'DELETE': 'delete',//删除按钮
  'SHELF': 'shelf',//上下架按钮
  'URL': 'url',//页面跳转
  'CONTENTUPDATE': 'contentupate',//内容更新(用于专栏)
  'MOVEUP': 'moveup',//上移
  'MOVEDOWN': 'movedown',//下移

}

/**
 * 表单输入框类型
 */
export const formInputType = {
  'INPUT': 'input',
  'SWITCH': 'switch',
  'LOCALSELECT': 'localSelect',//本地下拉框
  'REMOTESELECT': 'remoteSelect',//远程下拉框
  'DATERANGE': 'dateRange'
}

/**
 * 商品模块类型
 */
export const moduleTypeList = [
  { label: '商品一排一',   value: 'PRODUCT_ONE' },
  { label: '商品一排二',   value: 'PRODUCT_TWO' },
  { label: '商品横向滑动', value: 'PRODUCT_SLIDE' },
  { label: '专栏一排一',   value: 'COLUMN_ONE' },
  { label: '专栏横向滑动', value: 'COLUMN_SLIDE' },
  { label: '音频一排一',   value: 'AUDIO_ONE' },
  { label: '音频横向滑动', value: 'AUDIO_SLIDE' },
  { label: '图片Banner轮播', value: 'IMG_BANNER' },
  { label: '图片一排一', value: 'IMG_ONE' },
  { label: '图片一排二矮图', value: 'IMG_TWO_LOW' },
  { label: '图片卡片滑动', value: 'IMG_SLIDE' },
  { label: '匠人横向滑动', value: 'ARTISAN_SLIDE' },
  { label: '匠人卡片', value: 'PRODUCT_ARTISAN_CARD' }
]
/**
 * 商品模块名称列表，用于常量匹配
 */
var moduleTypeNameValue = {};
moduleTypeList.forEach(item => {
  moduleTypeNameValue[item.value] = item.value;
});
export const moduleTypeName = moduleTypeNameValue;
/**
 * 模块类型对象
 */
export const moduleType = (function(){
  var result = {};
  moduleTypeList.forEach(item => {
    result[item.value] = item.label;
  });
  return result;
})();

/**
 * 属性启用状态
 */
export const enableTypeList = [
  { label: '有效', value: true },
  { label: '无效', value: false }
]

export const enableType = (function(){
  var result = {};
  enableTypeList.forEach(item => {
    result[item.value] = item.label;
  });
  return result;
})();

/**
 * 属性值属性状态
 */
export const propTypeList = [
  { label: '手写', value: 0 },
  { label: '单选', value: 1 },
  { label: '多选', value: 2 }
]

export const propType = (function(){
  var result = {};
  propTypeList.forEach(item => {
    result[item.value] = item.label;
  });
  return result;
})();

// 上架状态
export const shelfStateList = [
  { label: '未上架', value: 'BEFORESALE' },
  { label: '定时上架', value: 'TIMERSALE' },
  { label: '出售中', value: 'ONSALE' },
  { label: '已下架', value: 'OUTOFSHELF' }

]

// 库存状态
export const storageStateList = [
  { label: '缺货', value: 0 },
  { label: '库存紧张', value: 1 },
  { label: '有货', value: 2 },

]

//TODO 订单状态

// 优惠券类型  TODO 注释掉了购物赠券
export const couponTypeList = [
  { label: '注册赠券', value: 'COUPON_REGISTER' },
  // { label: '裂变券', value: 'COUPON_VIRUS'},
  { label: '全场券', value: 'COUPON_MALL' },
  { label: '购物赠券', value: 'COUPON_SHOPPING'}
]
/**
 * 模板消息渲染时，可用的变量表
 */
export const templateVariableMap = {
  'nickname': {
    text: '主动助力人昵称',
    constant: 'Syvia'
  },
  'fans_num': {
    text: '已完成集call数',
    constant: 'X'
  },
  'fans_needed_num': {
    text: '当前还差集call数量',
    constant: 'X'
  },
  'source_nickname': {
    text: '被助力人昵称',
    constant: 'Nickname'
  },
  'source_fans_num': {
    text: '好友完成集call数',
    constant: 'X'
  },
  'source_fans_needed_num': {
    text: '好友当前还差集call数量',
    constant: 'X'
  },
  'remain_time': {
    text: '剩余时间',
    constant: '30分钟'
  },
  'express_name': {
    text: '快递名称',
    constant: '快递名称'
  },
  'express_id': {
    text: '快递单号',
    constant: '快递单号'
  },
  'trade_id': {
    text: '订单编号',
    constant: '订单编号'
  },
  'trade_status': {
    text: '订单状态',
    constant: '订单状态'
  },
  'batch_name': {
    text: '优惠券名称',
    constant: '优惠券名称'
  }
}
export const wechatMessageTemplate = {//微信消息模板配置项
  'ORDER_PAY_REMIND': {//订单催付通知
    title: '订单未付款通知',
    header: {
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'delay',
            placeholder: ['买家下单', '未付款']
          }
        },
        {
          label: '发送时间段',
          content: {
            type: 'range'
          }
        }
      ]
    },
    urlDisabled: true,
    content: [
      {
        position: 'top',
        color: '#173177',
        field: 'first',//生成的微信模板消息的字段
        default: '亲爱的{user_name}，你有一条订单还未付款，{remain_time}分钟后订单就要失效了，真希望你能将这份美好带去身边呢！',
        variables: ['user_name', 'remain_time']
      },
      {
        position: 'center',
        template: '订单编号: {trade_id}',
        color: '#173177',
        variables: ['trade_id'],
        field: 'OrderSn',
      },
      {
        position: 'center',
        color: '#173177',
        template: '订单状态: {trade_status}',
        variables: ['trade_status'],
        field: 'OrderStatus',
      },
      {
        position: 'center',
        color: '#173177',
        template: '商品信息: {content}',
        variables: [{//局部变量写法
          field: 'content',
          value: '商品信息...'
        }],
        fallback: true
      },
      {
        position: 'bottom',
        color: '#173177',
        variables: [],
        default: '点击此处立刻拥有这份美好>',
        field: 'remark',
      }
    ]
  },
  'ORDER_PAY_SUCCESS': {//订单支付成功
    // templateId: 'iPk5sOIt5X_flOVKn5GrTFpncEYTojx6ddbt8WYoV5s',
    title: '订单支付成功',
    header: {//头部配置字段
      enableHint: {
        text: '支付成功通知目前由有赞免费发送，此部分短信不计费'
      },
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'text',
            placeholder: ['买家付款后立即发送']
          }
        }
      ]
    },
    urlDisabled: false,
    content: [
      {
        position: 'top',
        color: '#000',
        field: 'first',//生成的微信模板消息的字段
        default: '恭喜你购买成功{user_name}',
        variables: ['user_name']
      },
      {
        position: 'center',
        template: '支付金额: {fee}',
        color: '#000',
        variables: [{
          field: 'fee',
          value: '10.00元',
        }],
        field: 'orderMoneySum',
      },
      {
        position: 'center',
        color: '#000',
        template: '商品信息: {content}',
        variables: [{
          field: 'content',
          value: '美好...',
        }],
        field: 'orderProductName',
      },
      {
        position: 'bottom',
        color: '#000',
        variables: [{
          field: 'content',
          value: '美好...',
        }],
        default: '欢迎下次光临',
        field: 'Remark',
      }
    ]
  },
  'EXPRESS_DELIVERY': {//发货通知
    title: '订单发货提醒',
    header: {
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'text',
            placeholder: ['卖家点击"发货"之后立即发送']
          }
        },
        {
          label: '发送时间段',
          content: {
            type: 'range'
          }
        }
      ]
    },
    urlDisabled: true,
    content: [
      {
        position: 'top',
        color: '#173177',
        field: 'first',//生成的微信模板消息的字段
        default: '亲爱的{user_name}，快递员哥哥带着“你的美好”正飞奔向你！',
        variables: ['user_name']
      },
      {
        position: 'center',
        template: '订单编号: {trade_id}',
        color: '#173177',
        variables: ['trade_id'],
        field: 'OrderSn',
      },
      {
        position: 'center',
        color: '#173177',
        template: '订单状态: {trade_status}',
        variables: ['trade_status'],
        field: 'OrderStatus',
      },
      {
        position: 'center',
        color: '#173177',
        template: '美好送货: {express_name}',
        variables: ['express_name'],
        fallback: true
      },
      {
        position: 'center',
        color: '#173177',
        template: '物流单号: {express_id}',
        variables: ['express_id'],
        fallback: true
      },
      {
        position: 'bottom',
        color: '#173177',
        variables: [],
        default: '点击此处查看物流信息>>',
        field: 'remark',
      }
    ]
  },
  'EXPRESS_SIGN': {//包裹签收提醒
    title: '订单签收提醒',
    header: {
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'text',
            placeholder: ['包裹被买家签收后']
          }
        },
        {
          label: '发送时间段',
          content: {
            type: 'range'
          }
        }
      ]
    },
    urlDisabled: false,
    content: [
      {
        position: 'top',
        color: '#173177',
        field: 'first',//生成的微信模板消息的字段
        default: '亲爱的{user_name}，你的美好已经抵达！',
        variables: ['user_name']
      },
      {
        position: 'center',
        template: '订单编号: {trade_id}',
        color: '#173177',
        variables: ['trade_id'],
        field: 'OrderSn',
      },
      {
        position: 'center',
        color: '#173177',
        template: '订单状态: {trade_status}',
        variables: ['trade_status'],
        field: 'OrderStatus',
      },
      {
        position: 'center',
        color: '#173177',
        template: '美好送货: {express_name}',
        variables: ['express_name'],
        fallback: true
      },
      {
        position: 'center',
        color: '#173177',
        template: '物流单号: {express_id}',
        variables: ['express_id'],
        fallback: true
      },
      {
        position: 'bottom',
        color: '#173177',
        variables: [],
        default: '点击此处再来“美好”看看>>',
        field: 'remark',
      }
    ]
  },
  'COUPON_PUSH': {//优惠券到账提醒
    title: '优惠券到账提醒',
    disableAdd: true,
    header: {
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'text',
            placeholder: ['非手动领取的优惠券到账即发送此消息通知，一个发放策略对应一个消息模版']
          }
        }
      ]
    },
    urlDisabled: true,
    content: [
      {
        position: 'top',
        color: '#173177',
        field: 'first',//生成的微信模板消息的字段
        default: '恭喜你获得了{batch_name}优惠券',
        variables: ['batch_name']
      },
      {
        position: 'center',
        template: '账户名: {user_name}',
        color: '#173177',
        variables: ['user_name'],
        field: 'keyword1',
      },
      {
        position: 'center',
        color: '#173177',
        template: '数量: {count}',
        variables: [{
          field: 'count',
          value: '数量'
        }],
        field: 'keyword2',
      },
      {
        position: 'center',
        color: '#173177',
        template: '时间: {fetch_time}',
        variables: [{
          field: 'fetch_time',
          value: '获取时间'
        }],
        field: 'keyword3'
      },
      {
        position: 'bottom',
        color: '#173177',
        variables: [],
        default: '点击查看我的优惠券>>',
        field: 'remark',
      }
    ]
  },
  'COUPON_EXPIRE': {//优惠券到期
    title: '优惠券到期提醒',
    disableAdd: true,
    header: {
      formItemList: [
        {
          label: '发送时间点',
          content: {
            type: 'text',
            placeholder: ['优惠券到期前1天的早上9点']
          }
        }
      ]
    },
    urlDisabled: true,
    content: [
      {
        position: 'top',
        color: '#173177',
        field: 'first',//生成的微信模板消息的字段
        default: '早上好，你的优惠券还有1天就要到期了！',
        variables: []
      },
      {
        position: 'center',
        template: '到期任务: {content}',
        color: '#173177',
        variables: [{
          field: 'content',
          value: '任务名称'
        }],
        field: 'keyword1',
      },
      {
        position: 'center',
        color: '#173177',
        template: '到期时间: {expire}',
        variables: [{
          field: 'expire',
          value: '到期时间'
        }],
        field: 'keyword2',
      },
      {
        position: 'bottom',
        color: '#173177',
        variables: [],
        default: '点击此处立即使用>>',
        field: 'remark',
      }
    ]
  },
}

export const wechatTemplateList = (function(){//当前可用消息类型的列表
  var result = [];
  for(var key in wechatMessageTemplate){
    if(wechatMessageTemplate.hasOwnProperty(key)){
      result.push({
        label: wechatMessageTemplate[key].title,
        value: key
      })
    }
  }

  return result;
})();

export const wechatTemplateMap = (function(){//用于快速检索
  var map = {};
  wechatTemplateList.forEach(item => {
    map[item.value] = item.label
  });

  return map;
})();


/**
 * 美好体验时指定用用户类型，(新 | 老)
 */
export const experienceUserTypeList = [
  { label: '新用户', value: 'new' },//未订阅用户
  { label: '老用户', value: 'old' }
];

/**
 * 微信性别类型
 */
export const wechatSexTypeList = [
  { label: '男', value: '1' },
  { label: '女', value: "2" },
  { label: '未知', value: '0' }
];

/**
 * 自定义海报配置
 */
export const customPosterconfig  = {
  showAvatar: true,
  avatarTop: 310,
  avatarLeft: 200,
  avatarLength: 200,
  showNickName: true,
  nickNameTop: 526,
  nickNameLeft: 0,
  nickNameFontSize: 32,
  nickNameIsBlock: true,
  nickNameWidth: 600,
  showCode: true,
  codeTop: 680,
  codeLeft: 210,
  codeLength: 176,
  showMainPic: false,
  mainPicLeft: 0,
  mainPicTop: 0,
  mainPicWidth: 540,
  mainPicHeight: 270,
  showTitle: true,
  titleLeft: 30,
  titleTop: 126,
  titleFontSize: 48,
  titleIsBlock: true,
  titleWidth: 540,
  showJoinCount: true,
  joinCountLeft: 30,
  joinCountTop: 615,
  joinCountFontSize: 32,
  joinCountIsBlock: true,
  joinCountWidth: 540,
  bg: 'https://cdn.imeihao.shop/jizan/poster_bg_default.jpg'
}

/**
 * 自定义领奖配置
 */
export const customRewardconfig = {
  showAvatar: true,
  avatarTop: 540,
  avatarLeft: 300,
  avatarLength: 200,
  showNickName: true,
  nickNameTop: 740,
  nickNameLeft: 0,
  nickNameFontSize: 48,
  nickNameIsBlock: true,
  nickNameWidth: 800,
  showCode: true,
  codeTop: 950,
  codeLeft: 280,
  codeLength: 240,
  showMainPic: false,
  mainPicLeft: 60,
  mainPicTop: 50,
  mainPicWidth: 600,
  mainPicHeight: 300,
  showTitle: false,
  titleLeft: 30,
  titleTop: 126,
  titleFontSize: 48,
  titleIsBlock: true,
  titleWidth: 540,
  showJoinCount: false,
  joinCountLeft: 30,
  joinCountTop: 615,
  joinCountFontSize: 32,
  joinCountIsBlock: true,
  joinCountWidth: 540,
  bg: 'https://cdn.imeihao.shop/jizan/reward_bg.jpg'
}
