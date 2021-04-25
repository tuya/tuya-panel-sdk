import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Utils, SwitchButton, IconFont } from 'tuya-panel-kit';
import { LinkSelectProps, LinkSelectState } from './interface';
import Res from '../res';
const infoImage = require('../res/info.png');
const { convertX, width } = Utils.RatioUtils;

export default class LinkSelect extends Component<LinkSelectProps, LinkSelectState> {
  state: LinkSelectState;
  props: LinkSelectProps;
  data: any;
  static defaultProps = {
    titleMaxShow: 1,
    tipMaxShow: 2,
  };
  constructor(props: any) {
    super(props);
    this.data = {};
    this.init(this.props);
    this.state = {
      ...this.data,
    };
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps !== this.props) {
      this.init(nextProps);
      this.setState({ ...this.data });
    }
  }

  getListType(param: any) {
    //param 当前结点
    const { tip, title, style, keyValue } = param;
    return {
      switch: (
        <View style={[styles.spaceView, { ...style }]}>
          {this.renderSwitch('switchValue' + keyValue, param)}
        </View>
      ),
      click: (
        <View style={[styles.spaceView, { ...style }]}>
          {this.renderClickList(title, tip, param)}
        </View>
      ),
      switchInfo: (
        <View style={[styles.spaceView, { ...style }]}>
          {this.renderSwitchInfo('switchValue' + keyValue, param)}
        </View>
      ),
    };
  }
  getListTree(param: LinkSelectProps, superParam: LinkSelectProps) {
    //视图递归渲染树
    //param 当前结点 superParam 父结点
    const { style, customLinkList, type, relation } = param;
    const typeView = this.getListType(param);
    if (customLinkList && customLinkList.length > 0) {
      const viewData = customLinkList.map(element => {
        return this.getListTree(element, param);
      });
      if (relation) {
        const { keyValue } = superParam;
        const superType = superParam.type;
        let result = false;

        if (superType === 'switch') {
          result = !!relation && this.state[relation[0] + keyValue].toString() === relation[2];
        } else {
          result = !!relation && this.state[relation[0] + keyValue] === relation[2];
        }
        return (
          result && (
            <View style={[styles.spaceView, style]}>
              {typeView[type]}
              {viewData}
            </View>
          )
        );
      } else {
        return (
          <View style={[styles.spaceView, style]}>
            {typeView[type]}
            {viewData}
          </View>
        );
      }
    } else {
      if (relation) {
        const { keyValue } = superParam;
        const superType = superParam.type;
        let result = false;

        if (superType === 'switch') {
          result = !!relation && this.state[relation[0] + keyValue].toString() === relation[2];
        } else {
          result = !!relation && this.state[relation[0] + keyValue] === relation[2];
        }
        return result && typeView[type];
      } else {
        return typeView[type];
      }
    }
  }
  init(param: any) {
    //state 递归树 递归创建每个结点的state 用于联动
    //param 当前结点
    const { keyValue, type, customLinkList } = param;
    const dataKey = type === 'click' ? 'choiceValueKey' : 'switchValue';
    this.data = {
      ...this.data,
      [dataKey + keyValue]: type === 'click' ? param.choiceValueKey : param.switchValue,
    };
    if (customLinkList && customLinkList.length > 0) {
      customLinkList.forEach(element => {
        this.init(element);
      });
    } else {
      return;
    }
  }
  renderSwitchInfo(switchFlag: string, param: LinkSelectProps) {
    //param 当前结点
    const {
      tip,
      title,
      onSwitch,
      innerStyle,
      info,
      switchProps,
      titleStyle,
      tipStyle,
      titleMaxShow,
      tipMaxShow,
    } = param;
    return (
      <View
        style={[
          styles.inputView,
          { borderBottomWidth: 0 },
          // tip ? { height: convertX(70) } : {},
          innerStyle,
        ]}
      >
        <View>
          <View style={styles.question}>
            <Text style={[styles.userTip, titleStyle]} numberOfLines={titleMaxShow}>
              {title}
            </Text>
            <TouchableOpacity onPress={() => info()}>
              <Image source={infoImage} />
            </TouchableOpacity>
          </View>
          {!!tip && (
            <Text style={[styles.tip, tipStyle]} numberOfLines={tipMaxShow}>
              {tip}
            </Text>
          )}
        </View>

        <SwitchButton
          onTintColor="#0076FF"
          value={this.state[switchFlag]}
          onValueChange={(value: boolean) => {
            this.setState({
              [switchFlag]: value,
            });
            onSwitch && onSwitch(value);
          }}
          {...switchProps}
        />
      </View>
    );
  }
  renderSwitch(switchFlag: string, param: LinkSelectProps) {
    //param 当前结点
    const {
      tip,
      title,
      onSwitch,
      innerStyle,
      switchProps,
      titleStyle,
      tipStyle,
      titleMaxShow,
      tipMaxShow,
    } = param;
    return (
      <View
        style={[
          styles.inputView,
          { borderBottomWidth: 0 },
          // tip ? { height: convertX(70) } : {},
          innerStyle,
        ]}
      >
        <View>
          <Text style={[styles.userTip, titleStyle]} numberOfLines={titleMaxShow}>
            {title}
          </Text>
          {!!tip && (
            <Text style={[styles.tip, tipStyle]} numberOfLines={tipMaxShow}>
              {tip}
            </Text>
          )}
        </View>

        <SwitchButton
          onTintColor="#0076FF"
          value={this.state[switchFlag]}
          onValueChange={(value: boolean) => {
            this.setState({
              [switchFlag]: value,
            });
            onSwitch && onSwitch(value);
          }}
          {...switchProps}
        />
      </View>
    );
  }

  renderClickList(title: any, tip: any, param: LinkSelectProps) {
    //param 当前结点
    const {
      onClick,
      type,
      innerStyle,
      choiceValue,
      titleStyle,
      tipStyle,
      titleMaxShow,
      tipMaxShow,
    } = param;
    const styleListA = {
      view: { height: convertX(70) },
      text: styles.userTip,
    };
    const styleListB = {
      view: { height: convertX(38), paddingBottom: 10, alignItems: 'center' },
      text: {
        color: '#333',
        fontSize: convertX(14),
        maxWidth: 200,
      },
    };
    return (
      <View
        style={[
          styles.inputView,
          // tip ? styleListA.view : type === 'switchAndClick' ? styleListB.view : {},
          innerStyle,
        ]}
      >
        <View>
          <Text
            style={[type === 'switchAndClick' ? styleListB.text : styleListA.text, titleStyle]}
            numberOfLines={titleMaxShow}
          >
            {title}
          </Text>
          {!!tip && (
            <Text style={[styles.tip, tipStyle]} numberOfLines={tipMaxShow}>
              {tip}
            </Text>
          )}
        </View>
        <View style={styles.onclickView}>
          <Text
            style={{
              color: '#333',
              fontSize: convertX(14),
              lineHeight: convertX(24),
              maxWidth: 100,
            }}
            numberOfLines={1}
          >
            {choiceValue}
          </Text>
          <IconFont d={Res.arrow} color="#999999" size={24} />
        </View>
        <TouchableOpacity onPress={() => onClick()} style={styles.clickTouch} />
      </View>
    );
  }
  render() {
    return <View>{this.getListTree(this.props, this.props)}</View>;
  }
}

const styles = StyleSheet.create({
  userTip: {
    color: '#333',
    fontSize: convertX(16),
    maxWidth: 200,
  },
  spaceView: {
    backgroundColor: '#fff',
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputView: {
    flexDirection: 'row',
    width: convertX(343),
    // height: convertX(50),
    paddingVertical: convertX(15),
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: convertX(16),
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#eee',
  },

  tip: {
    color: '#999999',
    fontSize: convertX(12),
    marginTop: convertX(6),
    maxWidth: convertX(270),
  },
  onclickView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clickTouch: {
    width: convertX(343),
    height: convertX(50),
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  question: {
    flexDirection: 'row',
  },
});
