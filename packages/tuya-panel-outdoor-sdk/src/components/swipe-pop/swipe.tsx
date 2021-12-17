/**
 * @title 可分段式上滑弹出窗组件
 */
import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Arrow from './arrow';

const { height: winHeight } = Utils.RatioUtils;
const arrowBoxHeight = 30;

interface Section {
  key: string | number;
  height: number;
  position?: number;
}

const defaultProps = {
  showHeight: 0, // 显示高度
  sections: [{ key: 'full', height: winHeight }] as Section[], // 显示阶段，即上滑时分几个阶段显示
  lastArrowOffset: 0, // 最后箭头相对顶部的偏移量，当为全屏弹窗是可针对刘海屏做相应的处理
  arrowColor: 'rgba(0,0,0,0.4)', // 窗口收起时，箭头的颜色
  arrowTintColor: '#fff', // 窗口展开时，箭头的颜色
  activeKey: 'none', // 当前窗口位置, 默认为收起
  showMask: true, // 显示mask
  maskColor: 'rgba(0,0,0,0.7)',
  contentType: 'normal' as 'normal' | 'full', // 内容显示范围设备，normal 表示内容显示区为箭头下方区域， full 表示内容显示区为整个窗口
  startValidHeight: 10, // 滑动起作用距离
  disabled: false, // 是否禁用
  onKeyChange(key: string | number) {}, // 当窗口发生变化时调用
  onSwiping(arg: { scrollTop?: number; maxTop?: number } = {}) {},
};

type DefaultProps = Readonly<typeof defaultProps>;
type IProps = {} & DefaultProps;

interface IState {
  activeKey: string | number;
}

export default class SwipePop extends Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;
  private arrowRef: Arrow | null;
  private animation: Animated.Value = new Animated.Value(0);
  private arrowAnimation: Animated.Value = new Animated.Value(arrowBoxHeight);
  private panResponder: PanResponderInstance;
  private terminationRequest = true;
  private positionY = 0;
  private maxTop = 0;
  private arrowMaxHeight: number = arrowBoxHeight;
  private sections: Section[];
  private currentSection: Section;
  private direction = 'show'; // 当前的显示阶段方向，是在展开还是在隐藏
  private heightInputRange: number[] = [];
  private heightOutputRange: number[] = [];
  private timer: number;

  constructor(props: IProps) {
    super(props);
    this.initData(this.props);
    if (!this.currentSection) {
      this.currentSection = this.sections[0];
    }
    this.animation.addListener(({ value }) => {
      const { sections, maxTop } = this;
      const { lastArrowOffset } = this.props;
      // 最后一个分段，箭头做变化
      const lessPosition = sections[sections.length - 2].position || 0;
      const maxPosition = maxTop + lastArrowOffset;
      let rate = 0;
      if (value <= lessPosition) {
        rate = (value - lessPosition) / (maxPosition - lessPosition);
        if (rate < 0) {
          rate = 0;
        } else if (rate > 1) {
          rate = 1;
        }
      }
      if (value - maxTop < lastArrowOffset) {
        this.arrowAnimation.setValue(arrowBoxHeight + lastArrowOffset - value + maxTop);
      } else {
        this.arrowAnimation.setValue(arrowBoxHeight);
      }
      this.arrowRef.update(rate);
      this.props.onSwiping({ scrollTop: -value, maxTop: -maxTop });
    });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleSetMoveResponder,
      onPanResponderMove: this.handlGestureMove,
      onPanResponderRelease: this.handlGestureEnd,
      onPanResponderTerminationRequest: () => this.terminationRequest,
      // 当前有其他的东西成为响应器并且没有释放它。
      onPanResponderReject: this.handleTerminate,
      onPanResponderTerminate: this.handleTerminate,
    });
  }

  componentDidMount() {
    if (this.props.activeKey !== 'none') {
      // 延后处理，确保 interpolate 起效果
      this.timer = setTimeout(() => {
        this.show(this.props.activeKey);
      }, 300);
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { activeKey, sections } = nextProps;
    this.initData(nextProps);
    if (activeKey !== this.props.activeKey || !isEqual(sections, this.props.sections)) {
      // 延后处理，确保 interpolate 起效果
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show(activeKey);
      }, 10);
    }
  }

  getMaxHeight(sections: Section[]) {
    let maxHeight = 0;
    sections.forEach(({ key, height }) => {
      if (maxHeight < height) {
        maxHeight = height;
      }
    });
    return maxHeight;
  }

  getWillSection(positionY: number) {
    let section = this.sections[0];
    let diff = Math.abs(positionY - section.position);
    this.sections.some(item => {
      const d = Math.abs(positionY - (item.position || 0));
      if (d < diff) {
        section = item;
        diff = d;
      }
    });
    return section;
  }

  handleSection(showHeight: number, sections: Section[]) {
    const result: Section[] = sections
      .map(item => ({ ...item, position: showHeight - item.height }))
      .sort((item1, item2) => {
        return item1.height > item2.height ? 1 : item1.height < item2.height ? -1 : 0;
      });
    // 加入隐藏阶段
    result.splice(0, 0, { key: 'none', height: showHeight, position: 0 });
    this.sections = result;
    const heightInputRange: number[] = [];
    const heightOutputRange: number[] = [];
    for (let i = result.length - 1; i >= 0; i--) {
      const item = result[i];
      heightInputRange.push(item.position || 0);
      heightOutputRange.push(item.height);
    }
    this.heightOutputRange = heightOutputRange;
    this.heightInputRange = heightInputRange;
  }

  initData(props: IProps) {
    const { showHeight, sections, lastArrowOffset, activeKey } = props;
    const maxHeight = this.getMaxHeight(sections);
    this.maxTop = showHeight - maxHeight;
    this.arrowMaxHeight = arrowBoxHeight + lastArrowOffset;
    this.handleSection(showHeight, sections);

    if (activeKey && activeKey !== this.props.activeKey) {
      let currentSection = this.sections.find(item => item.key === activeKey);
      if (!currentSection) {
        currentSection = this.sections[0];
      }
      this.currentSection = currentSection;
    }
  }

  // 隐藏窗口
  hide() {
    this.animation.stopAnimation();
    Animated.timing(this.animation, {
      duration: 300,
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(({ finished }) => {
      if (finished) {
        this.positionY = 0;
        if (this.currentSection.key !== this.sections[0].key) {
          this.currentSection = this.sections[0];
          this.props.onKeyChange(this.currentSection.key);
        }
      }
    });
  }

  /**
   * 显示弹窗
   * @param key 分段 key，不填写默为最高层分段
   */
  show(key?: string | number) {
    if (typeof key === 'undefined') {
      key = this.sections[this.sections.length - 1].key;
    }
    const exist = this.sections.find(item => item.key === key);
    if (exist) {
      this.animation.stopAnimation();
      Animated.timing(this.animation, {
        duration: 300,
        toValue: exist.position || 0,
        easing: Easing.out(Easing.cubic),
      }).start(({ finished }) => {
        if (finished) {
          this.direction = this.positionY > exist.position ? 'show' : 'hidden';
          this.positionY = exist.position || 0;
          if (exist.key !== this.currentSection.key) {
            this.currentSection = exist;
            this.props.onKeyChange(this.currentSection.key);
          }
        }
      });
    }
  }

  handleSetMoveResponder = (e: GestureResponderEvent, { dx, dy }: PanResponderGestureState) => {
    if (this.props.disabled) {
      return false;
    }
    // 确保子组件的按钮点击生效
    if (Math.abs(dx) < 4 && Math.abs(dy) < 4) {
      return false;
    }
    if (Math.abs(dy) < this.props.startValidHeight) {
      return false;
    }
    this.terminationRequest = false;
    return true;
  };

  handleTerminate = () => {
    // 响应器已经从该视图抽离
    this.terminationRequest = true;
  };

  handlGestureMove = (e: GestureResponderEvent, { dy }: PanResponderGestureState) => {
    this.updateMove(dy);
  };

  handlGestureEnd = (e: GestureResponderEvent, { dy, vy }: PanResponderGestureState) => {
    const positionY = this.updateMove(dy);
    // 做一定的惯性处理，预判手势能到达的位置
    const acceleration = 0.02 * (vy < 0 ? 1 : -1);
    const destination = positionY - vy ** 2 / (acceleration * 2);
    // 查找对应在哪个档
    const section = this.getWillSection(destination);
    this.show(section.key);
  };

  updateMove(dy: number) {
    let positionY = this.positionY + dy;
    if (positionY < this.maxTop) {
      positionY = this.maxTop;
    }
    this.animation.setValue(positionY);
    return positionY;
  }

  handleClickArrow = () => {
    if (this.props.disabled) {
      return;
    }
    const { sections, direction } = this;
    const lastIndex = sections.length - 1;
    // 当前位置
    let index = -1;
    sections.some((item, i) => {
      if (item.key === this.currentSection.key) {
        index = i;
        return true;
      }
      return false;
    });
    if (index < 0) {
      index = 0;
    }
    if (direction === 'show') {
      // 是否已经是最高
      if (index === lastIndex) {
        this.direction = 'hidden';
        this.show(sections[lastIndex - 1].key);
      } else {
        this.show(sections[index + 1].key);
      }
    } else {
      // 是否是第一个
      // eslint-disable-next-line no-lonely-if
      if (index === 0) {
        this.direction = 'show';
        this.show(sections[1].key);
      } else {
        this.show(sections[index - 1].key);
      }
    }
  };

  render() {
    const {
      showHeight,
      children,
      arrowTintColor,
      arrowColor,
      contentType,
      showMask,
      maskColor,
    } = this.props;
    const { sections, heightInputRange, heightOutputRange } = this;
    const firstPosition = sections[1].position;
    const range = Math.max(-200, firstPosition || 0);
    const halfRange = range / 2;

    return (
      <View style={[styles.wrapper, { height: showHeight }]}>
        {showMask && (
          <Animated.View
            style={[
              styles.mask,
              {
                backgroundColor: maskColor,
                opacity: this.animation.interpolate({
                  inputRange: [range, halfRange],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: this.animation.interpolate({
                      inputRange: [halfRange, 0],
                      outputRange: [-winHeight, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        )}
        {/* 窗口 */}
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.animation,
              },
            ],
            height: this.animation.interpolate({
              inputRange: heightInputRange,
              outputRange: heightOutputRange,
            }),
          }}
          {...this.panResponder.panHandlers}
        >
          <Animated.View
            style={[
              styles.arrow,
              contentType === 'full' && {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
              },
              {
                height: this.arrowAnimation,
              },
            ]}
          >
            <Arrow
              ref={ref => {
                this.arrowRef = ref;
              }}
              color={arrowColor}
              tintColor={arrowTintColor}
              deep={0}
            />
            <TouchableOpacity
              onPress={this.handleClickArrow}
              style={styles.arrowBtn}
              activeOpacity={1}
            />
          </Animated.View>
          <View
            style={{
              flex: 1,
            }}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    height: arrowBoxHeight,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    width: '100%',
  },
  arrowBtn: {
    bottom: (arrowBoxHeight - 40) / 2,
    height: 40,
    position: 'absolute',
    width: 100,
  },
  mask: {
    bottom: -winHeight,
    height: winHeight,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  wrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
