/**
 * 乐动系面板配置平台地图组件配置项
 *
 * @interface ILaserMapPanelConfig
 */
export interface ILaserMapPanelConfig {
  /** 充电桩配置 */
  pile: {
    iconUrl: string; // 充电桩图标地址
    showWithForbiddenEdit: boolean; // 是否在编辑禁区/虚拟墙时开启
    ringRadiusRealMeter: number; // 预警圈真实半径米数
    ringBorderColor: string; // 预警圈边框颜色（虚线颜色）
    ringBgColor: string; // 预警圈颜色
  };
  /** 区域配置 */
  area: {
    minWidth: number; // 划区/禁区框最小边长
    appointIconUrl: string; // 指哪扫哪图标url
    isForbiddenRotate: boolean; // 禁区框是否旋转

    sweepBgColor: string; // 清扫区域 (背景色)
    forbiddenSweepBgColor: string; // 禁扫区域(背景色)
    forbiddenMopBgColor: string; // 禁拖区域(背景色)
    forbiddenWallBgColor: string; // 虚拟墙(背景色)

    forbiddenWallLineWidth: number; // 虚拟墙（宽度）

    sweepBorderColor: string; // 清扫区域 (边框色)
    forbiddenSweepBorderColor: string; // 禁扫区域(边框色)
    forbiddenMopBorderColor: string; // 禁拖区域(边框色)

    sweepTextColor: string; // 清扫区域 (字体色)
    forbiddenSweepTextColor: string; // 禁扫区域(字体色)
    forbiddenMopTextColor: string; // 禁拖区域(字体色)

    sweepNameDisplay: boolean; // 清扫区域（是否展示名称）
    forbiddenSweepNameDisplay: boolean; // 禁扫区域（是否展示名称）
    forbiddenMopNameDisplay: boolean; // 禁拖区域（是否展示名称）

    sweepNameEdit: boolean; // 清扫区域（是否可以编辑名称）
    forbiddenSweepNameEdit: boolean; // 禁扫区域（是否可以编辑名称）
    forbiddenMopNameEdit: boolean; // 禁拖区域（是否可以编辑名称）

    showFactor: boolean; // 是否展示区域底部信息
    factorFontSize: number; // 区域底部信息字体大小
    factorFontColor: string; // 区域底部信息字体颜色
  };
  /** 当前点配置 */
  curPos: {
    iconUrl: string; // 扫地机的图片 (当前点的 marker)
    showBreathingRingWithRobotCharge: boolean; // 是否在扫地机充电时展示呼气圈
    ringRate: number; // 呼吸圈闪烁时最大放大倍数
    ringBgColor: string; // 呼吸圈颜色 ARGB
    ringDuration: number; // 呼吸圈动画频率
  };
  /** 路径配置 */
  path: {
    width: number; // 路径宽度
    color: string; // 颜色 （优先级较低）
    planPathWidth: number /** 规划路径宽度 */;
    planPathColor: string /** 规划路径颜色 */;
    commonTypeColor: string; // 正常清扫路径 (路径颜色)
    userTransitionsTypeColor: string; // 用户自定义转场(路径颜色)
    chargeTypeColor: string; // 回充路径(路径颜色)
    transitionsTypeColor: string; // 转场路径(路径颜色)
    controlTypeColor: string; // 控制路径(路径颜色)
  };
  /** 地图配置 */
  map: {
    sweepPointTypeColor: string; // 清扫点(点颜色)
    barrierPointTypeColor: string; // 障碍点
    unknownPointTypeColor: string; // 未知区域
    batteryPointTypeColor: string; // 充电桩点
    isTypeManager: boolean; // 整体map是否走TypeManager（谨慎配置）
    bgImg: number; // 地图背景（暂定类型
    loadingColor: string; // loading组件颜色
    loadingShowType: 'bubble' | 'image'; // 地图loading展示形式
    loadingImageUri: string; // 地图Loding图片地址
    isShowLoadingTips: boolean; // 是否展示地图loading提示
  };
  /** 房间属性配置 */
  room: {
    waterEnum: string[];
    waterIcons: string[];
    fanEnum: string[];
    fanIcons: string[];
  };
  voice: {
    [index: string]: {
      voiceUri: string /* 语音链接*/;
      iconUri: string /** 语音包图标链接 */;
    };
  };
}

// 平台配置
const laserMapConfig = {
  /** 充电桩配置 */
  pile: {
    iconUrl: {
      type: 'string',
      desc: '充电桩图标地址url',
      value: 'https://images.tuyacn.com/smart/chongdian2x.png',
    }, // 充电桩图标地址
    showWithForbiddenEdit: {
      type: 'boolean',
      desc: '是否在编辑禁区/虚拟墙时开启预警圈',
      value: true,
    }, // 是否在编辑禁区/虚拟墙时开启
    ringRadiusRealMeter: { desc: '预警圈真实半径米数', value: 1 }, // 预警圈真实半径米数
    ringBorderColor: {
      desc: '预警圈边框颜色（虚线颜色）',
      type: 'color',
      value: '#ffffff',
    }, // 预警圈边框颜色（虚线颜色）
    ringBgColor: {
      desc: '预警圈颜色',
      type: 'color',
      value: 'rgba(0,0,0,0.4)',
    }, // 预警圈颜色
  },
  /** 区域配置 */
  area: {
    minWidth: { desc: '划区/禁区框最小边长', value: 20 }, // 划区/禁区框最小边长
    appointIconUrl: {
      desc: '指哪扫哪图标url',
      type: 'string',
      value: 'https://images.tuyacn.com/smart/Group6@2x.png',
    },
    isForbiddenRotate: {
      desc: '禁区框是否可旋转',
      type: 'boolean',
      value: true,
    }, // 禁区框是否旋转
    sweepBgColor: {
      desc: '清扫区域 (背景色)',
      type: 'color',
      value: 'rgba(255,255,255,0.3)',
    }, // 清扫区域 (背景色)
    forbiddenSweepBgColor: {
      desc: '禁扫区域(背景色)',
      type: 'color',
      value: 'rgba(254, 61, 35, 0.5)',
    }, // 禁扫区域(背景色)
    forbiddenMopBgColor: {
      desc: '禁拖区域(背景色)',
      type: 'color',
      value: 'rgba(254, 61, 35, 0.5)',
    }, // 禁拖区域(背景色)
    forbiddenWallLineWidth: { desc: '虚拟墙(宽度)', value: 1 },
    forbiddenWallBgColor: { desc: '虚拟墙(背景色)', value: '#F5A623' }, // 虚拟墙(背景色)
    sweepBorderColor: { desc: '清扫区域 (边框色)', value: '#ffffff' }, // 清扫区域 (边框色)
    forbiddenSweepBorderColor: {
      desc: '禁扫区域(边框色)',
      value: '#ffffff',
    }, // 禁扫区域(边框色)
    forbiddenMopBorderColor: { desc: '禁拖区域(边框色)', value: '#ffffff' }, // 禁拖区域(边框色)
    sweepTextColor: { desc: '清扫区域 (字体色)', value: '#ffffff' }, // 清扫区域 (字体色)
    forbiddenSweepTextColor: { desc: '禁扫区域(字体色)', value: '#ffffff' }, // 禁扫区域(字体色)
    forbiddenMopTextColor: { desc: '禁拖区域(字体色)', value: '#ffffff' }, // 禁拖区域(字体色)

    sweepNameDisplay: {
      desc: '清扫区域（是否展示名称）',
      type: 'boolean',
      value: true,
    }, // 清扫区域（是否展示名称）
    forbiddenSweepNameDisplay: {
      desc: '禁扫区域（是否展示名称）',
      type: 'boolean',
      value: true,
    }, // 禁扫区域（是否展示名称）
    forbiddenMopNameDisplay: {
      desc: '禁拖区域（是否展示名称）',
      type: 'boolean',
      value: true,
    }, // 禁拖区域（是否展示名称）

    sweepNameEdit: {
      desc: '清扫区域（是否可以编辑名称）',
      type: 'boolean',
      value: true,
    }, // 清扫区域（是否可以编辑名称）
    forbiddenSweepNameEdit: {
      desc: '禁扫区域（是否可以编辑名称）',
      type: 'boolean',
      value: true,
    }, // 禁扫区域（是否可以编辑名称）
    forbiddenMopNameEdit: {
      desc: '禁拖区域（是否可以编辑名称）',
      type: 'boolean',
      value: true,
    }, // 禁拖区域（是否可以编辑名称）

    showFactor: {
      desc: '是否展示区域底部信息',
      type: 'boolean',
      value: true,
    }, // 是否展示区域底部信息
    factorFontSize: { desc: '区域底部信息字体大小', value: 10 }, // 区域底部信息字体大小
    factorFontColor: { desc: '区域底部信息字体颜色', value: '#ffffff' }, // 区域底部信息字体颜色
  },
  /** 当前点配置 */
  curPos: {
    iconUrl: {
      desc: '扫地机的图片 (当前点的 marker)',
      type: 'string',
      value: 'https://images.tuyacn.com/smart/robot_v1_24x24.png',
    }, // 扫地机的图片 (当前点的 marker)
    showBreathingRingWithRobotCharge: {
      desc: '是否在扫地机充电时展示呼气圈',
      type: 'boolean',
      value: true,
    }, // 是否在扫地机充电时展示呼气圈
    ringRate: { desc: '呼吸圈闪烁时最大放大倍数', value: 2.0 }, // 呼吸圈闪烁时最大放大倍数
    ringBgColor: { desc: '呼吸圈颜色', value: 'rgba(0,0,0,0.5)' }, // 呼吸圈颜色
    ringDuration: { desc: '呼吸圈动画频率', value: 1.0 }, // 呼吸圈动画频率
  },
  /** 路径配置 */
  path: {
    width: { desc: '路径宽度', value: 0.8 }, // 路径宽度
    color: { desc: '颜色（优先级较低）', value: '#717BFF' }, // 颜色 （优先级较低）
    planPathWidth: { desc: '规划路径宽度', value: 0.8 } /** 规划路径宽度 */,
    planPathColor: {
      desc: '规划路径颜色',

      value: '#FFD700',
    } /** 规划路径颜色 */,
    commonTypeColor: { desc: '正常清扫路径(路径颜色)', value: '#717BFF' }, // 正常清扫路径 (路径颜色)
    userTransitionsTypeColor: {
      desc: '用户自定义转场(路径颜色)',
      value: '#717BFF',
    }, // 用户自定义转场(路径颜色)
    chargeTypeColor: { desc: '回充路径(路径颜色)', value: '#717BFF' }, // 回充路径(路径颜色)
    transitionsTypeColor: { desc: '转场路径(路径颜色)', value: '#717BFF' }, // 转场路径(路径颜色)
    controlTypeColor: { desc: '控制路径(路径颜色)', value: '#717BFF' }, // 控制路径(路径颜色)
  },
  /** 地图配置 */
  map: {
    sweepPointTypeColor: { desc: '清扫点(点颜色)', value: '#5B5A69' }, // 清扫点(点颜色)
    barrierPointTypeColor: { desc: '障碍点(点颜色)', value: '#888893' }, // 障碍点
    unknownPointTypeColor: {
      desc: '未知区域(点颜色)',

      value: 'rgba(255,255,255, 0)',
    }, // 未知区域
    batteryPointTypeColor: {
      desc: '充电桩点(点颜色)',

      value: 'rgba(255,255,255, 0)',
    }, // 充电桩点
    isTypeManager: {
      desc: '是否使用TypeManager（尽量不用修改这个配置）',
      type: 'boolean',
      value: true,
    },
    bgImg: { desc: '地图背景（无用，预留）', value: 0 }, // 地图背景
    loadingColor: { desc: '地图Loading主题颜色', value: '#CDCCCC' },
    loadingShowType: {
      desc: '主地图加载样式',
      value: 'image',
      type: 'radio',
      values: [
        { label: '冒泡泡', value: 'bubble' },
        { label: '图片', value: 'image' },
      ],
    },
    loadingImageUri: {
      desc: '主地图加载图片uri地址（加载样式为图片时生效）',
      type: 'string',
      value: '',
    },
    isShowLoadingTips: {
      desc: '是否显示主地图加载提示',
      type: 'boolean',
      value: true,
    },
  },
  room: {
    waterEnum: {
      type: 'tags',
      desc: '房间属性_水量档位（多语言字段roomWater_xxx）',
      value: ['none', '0', '1', '2', '3'],
    },
    waterIcons: {
      desc: '房间属性_水量档位对应图标',
      type: 'tags',
      value: [
        '',
        '',
        'https://images.tuyacn.com/app/robot/png/Water_2.png',
        'https://images.tuyacn.com/app/robot/png/Water_3.png',
        'https://images.tuyacn.com/app/robot/png/Water_4.png',
      ],
    },
    fanEnum: {
      type: 'tags',
      desc: '房间属性_风机档位（多语言字段roomFan_xxx）',
      value: ['none', 'quiet', 'auto', 'strong', 'max'],
    },
    fanIcons: {
      desc: '房间属性_风机档位对应图标',
      type: 'tags',
      value: [
        '',
        'https://images.tuyacn.com/app/robot/png/Water_1.png',
        'https://images.tuyacn.com/app/robot/png/Water_2.png',
        'https://images.tuyacn.com/app/robot/png/Water_3.png',
        'https://images.tuyacn.com/app/robot/png/Water_4.png',
      ],
    },
  },
  /* 语音包 */
  voice: {
    /* 语音包名称： 对应配置 */
    '0': {
      iconUri: {
        desc: '语音包0_图标（连接为空不显示图片）',
        type: 'string',
        value: 'https://images.tuyacn.com/app/robot/png/Water_1.png',
      },
      voiceUri: {
        desc: '语音包0_语音连接（连接为空会去取dp功能配置）',
        type: 'string',
        value:
          'https://images.tuyacn.com/app/package/yxzn_LS_amwreslbw9qpl7c9_vioce3_ch_md5_1affbaa90459f7be9ad621edaf379429',
      },
    },
    '1': {
      iconUri: {
        desc: '语音包1_图标（连接为空不显示图片）',
        type: 'string',
        value: 'https://images.tuyacn.com/app/robot/png/Water_1.png',
      },
      voiceUri: {
        desc: '语音包1_语音连接（连接为空会去取dp功能配置）',
        type: 'string',
        value:
          'https://images.tuyacn.com/app/package/yxzn_LS_amwreslbw9qpl7c9_vioce3_en_md5_776578e0cf4d79ec4b68a8b706a3532f',
      },
    },
  },
  /* 定时 */
  timer: {
    cleanMode: {
      // 工作模式
      isShow: {
        desc: '乐动定时_工作模式功能_是否显示',
        value: true,
        type: 'boolean',
      },
      enumValues: {
        type: 'tags',
        desc: '乐动定时_工作模式功能_档位（多语言字段timer_cleanMode_xxx）',
        value: ['0', '1', '2', '6'],
      },
    },
    fan: {
      // 风机
      isShow: {
        desc: '乐动定时_风机功能_是否显示',
        value: true,
        type: 'boolean',
      },
      enumValues: {
        type: 'tags',
        desc: '乐动定时_风机功能_档位（多语言字段timer_fan_xxx）',
        value: ['quiet', 'auto', 'strong', 'max'],
      },
      disableWithCleanMode: {
        desc: '乐动定时_风机功能_需要在定时清扫模式下禁用的档位(不需要禁用填-1)',
        value: '-1',
        type: 'text',
      },
    },
    water: {
      // 水箱
      isShow: {
        desc: '乐动定时_水箱功能_是否显示',
        value: true,
        type: 'boolean',
      },
      enumValues: {
        type: 'tags',
        desc: '乐动定时_水箱功能_档位（多语言字段timer_water_xxx）',
        value: ['0', '1', '2', '3'],
      },
      disableWithCleanMode: {
        desc: '乐动定时_风机功能_需要在定时清扫模式下禁用的档位(不需要禁用填-1)',
        value: '-1',
        type: 'text',
      },
    },
  },
};

function getDefaultPanelConfig(panel) {
  const config = {};
  Object.keys(panel).forEach((configKey: string) => {
    if (panel[configKey].value !== undefined) {
      const value = panel[configKey].value;
      config[configKey] = value;
    } else if (typeof panel[configKey] === 'object') {
      // 如果没有value，代表有嵌套
      config[configKey] = getDefaultPanelConfig(panel[configKey]);
    }
  });
  return config;
}

const defaultPanelConfig = getDefaultPanelConfig(laserMapConfig);

export default defaultPanelConfig;
