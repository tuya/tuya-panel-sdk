/* istanbul ignore file */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from 'react'
import { TouchableOpacity, Text, ViewPropTypes, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { TYText } from 'tuya-panel-kit'

const styles = StyleSheet.create({
  activeTextStyle: {
    color: '#57BCFB',
    fontWeight: '500',
  },
  circleStyle: {
    backgroundColor: '#57BCFB',
    borderRadius: 2,
    height: 4,
    width: 4,
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#9CA3A9',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
})

const RadioButton = props => {
  const {
    title,
    onItemPress,
    style,
    isActive,
    textStyle,
    activeTextStyle,
    circleStyle,
    accessibilityLabel,
    textAccessibilityLabel,
    type,
  } = props
  const customTextStyle = [
    styles.textStyle,
    textStyle && textStyle,
    isActive && styles.activeTextStyle,
    isActive && activeTextStyle && activeTextStyle,
  ]
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      accessibilityLabel={accessibilityLabel}
    >
      {typeof title === 'string' || typeof title === 'number' ? (
        isActive || type === 'radio' ? (
          <TYText
            style={customTextStyle}
            numberOfLines={1}
            accessibilityLabel={textAccessibilityLabel}
          >
            {title}
          </TYText>
        ) : (
          <View style={[styles.circleStyle, circleStyle]} />
        )
      ) : (
        title
      )}
    </TouchableOpacity>
  )
}

RadioButton.propTypes = {
  title: PropTypes.node.isRequired,
  isActive: PropTypes.bool,

  accessibilityLabel: PropTypes.string,
  textAccessibilityLabel: PropTypes.string,

  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  activeTextStyle: Text.propTypes.style,

  onItemPress: PropTypes.func.isRequired,
  type: PropTypes.oneOfType([PropTypes.oneOf(['radio', 'radioCircle']), PropTypes.string]),
  circleStyle: ViewPropTypes.style,
}

RadioButton.defaultProps = {
  isActive: false,
  style: {},
  textStyle: {},
  activeTextStyle: {},
  type: 'radio',
  circleStyle: {},
}

export default RadioButton
