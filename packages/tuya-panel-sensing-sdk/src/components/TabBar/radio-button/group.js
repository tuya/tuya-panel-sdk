/* eslint-disable prettier/prettier */
import React from 'react'
import { View, ViewPropTypes, Animated, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Utils } from 'tuya-panel-kit'
import RadioButton from './radioButton'

const { convertY, convertX } = Utils.RatioUtils

const styles = StyleSheet.create({
  activeViewStyle: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  containerStyle: {
    backgroundColor: '#1D1E24',
    borderColor: '#FFFFFF',
    borderRadius: convertX(8),
    height: convertY(30),
    justifyContent: 'center',
  },
  wrapperStyle: {
    flexDirection: 'row',
  },
})

class Group extends React.PureComponent {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    style: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    activeColor: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    gutter: PropTypes.number,
    onChange: PropTypes.func,
    type: PropTypes.oneOfType([PropTypes.oneOf(['radio', 'radioCircle']), PropTypes.string]),
  }

  static defaultProps = {
    style: {},
    wrapperStyle: {},
    activeColor: '',
    defaultActiveIndex: 0,
    gutter: 2,
    onChange: () => {},
    type: 'radio',
  }

  constructor(props) {
    super(props)
    const activeIndex =
      props.activeIndex !== undefined ? props.activeIndex : props.defaultActiveIndex
    this.state = {
      activeLeft: new Animated.Value(0),
      activeIndex,
      activeViewHidden: true,
      wrapperWidth: 0,
    }
    this.containerSize = null
    this.wrapperSize = null
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.moveActiveView(nextProps.activeIndex)
    }
  }

  getItem = () => {
    const { wrapperWidth, activeViewHidden, activeIndex } = this.state
    const { tabs, type, tabTextStyle, tabActiveTextStyle } = this.props
    const buttonStyle = [{ width: wrapperWidth / tabs.length }]
    const defaultTextStyle = [{ opacity: activeViewHidden ? 0 : 1 }]
    const circleStyle = tabTextStyle &&
      tabTextStyle.color && { backgroundColor: tabTextStyle.color }
    return tabs.map((item, index) => {
      const { style, textStyle, ...other } = item
      return (
        <RadioButton
          activeTextStyle={tabActiveTextStyle}
          circleStyle={circleStyle}
          {...other}
          // eslint-disable-next-line react/no-array-index-key
          key={`tab_${index}`}
          type={type}
          style={[buttonStyle, style]}
          textStyle={[defaultTextStyle, tabTextStyle, textStyle]}
          onItemPress={() => this.changeTab(index, item, item.onItemPress)}
          isActive={activeIndex === index}
        />
      )
    })
  }

  moveActiveView = index => {
    const { everyWidth, activeLeft } = this.state
    const { gutter, isOverlay } = this.props
    const currentLeft = index * everyWidth + gutter - (isOverlay ? 2 : 0)
    Animated.spring(activeLeft, {
      toValue: currentLeft,
    }).start()
    this.setState({
      activeIndex: index,
    })
  }

  changeTab = (index, item, func) => {
    const { activeIndex } = this.state
    if (func) func(index)
    if (index === activeIndex) return
    const { onChange } = this.props
    onChange && onChange(index, item)
    if ('activeIndex' in this.props) return
    this.moveActiveView(index)
  }

  containerLayout = e => {
    this.containerSize = e.nativeEvent.layout
    this.completeCalcWidth()
  }

  wrapperLayout = e => {
    this.wrapperSize = e.nativeEvent.layout
    this.completeCalcWidth()
  }

  completeCalcWidth = () => {
    const { activeLeft, activeIndex } = this.state
    const { isOverlay = false } = this.props
    if (!this.wrapperSize || !this.containerSize) return
    const { tabs, gutter } = this.props
    const everyWidth = this.wrapperSize.width / tabs.length
    activeLeft.setValue(gutter + everyWidth * activeIndex - (isOverlay ? 2 : 0))
    this.setState({
      containerHeight: this.containerSize.height,
      wrapperWidth: this.wrapperSize.width,
      activeViewHidden: false,
      everyWidth,
    })
  }

  render() {
    const {
      style,
      wrapperStyle,
      activeColor,
      tabs,
      gutter,
      wrapActiveViewStyle,
      isOverlay = false,
    } = this.props
    const { activeLeft, wrapperWidth, containerHeight, activeViewHidden } = this.state
    const containerPadding =
      StyleSheet.flatten([styles.containerStyle, style]).borderRadius + gutter - (isOverlay ? 4 : 0)
    const containerStyle = [styles.containerStyle, style, { paddingHorizontal: gutter }]
    const customWrapperStyle = [styles.wrapperStyle, wrapperStyle]
    const activeViewStyle = [
      styles.activeViewStyle,
      {
        width: wrapperWidth / tabs.length + (isOverlay ? 4 : 0),
        height: containerHeight - gutter * 2 + (isOverlay ? 2 : 0),
      },
      activeColor && { backgroundColor: activeColor },
      { borderRadius: containerPadding },
      { left: activeLeft },
      wrapActiveViewStyle,
    ]
    return (
      <View onLayout={this.containerLayout} style={containerStyle}>
        {!activeViewHidden && <Animated.View style={activeViewStyle} />}
        <View onLayout={this.wrapperLayout} style={customWrapperStyle}>
          {this.getItem()}
        </View>
      </View>
    )
  }
}

export default Group
