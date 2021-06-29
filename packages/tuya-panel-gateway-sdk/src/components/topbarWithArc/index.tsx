import React, { FC } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';
import Svg, { Ellipse } from 'react-native-svg';
import { TopBarWithArcProps } from './interface';
import Strings from './i18n';

const { width: windowWidth } = Dimensions.get('window');

const TopBarWithArc: FC<TopBarWithArcProps> = ({
  title,
  color,
  onBack,
  barStyle,
  topBarParams,
  fill,
  arcWidth,
  arcHeight,
  renderStatusBar: customRenderStatusBar,
  renderTopBar: customRenderTopBar,
  renderArc: customRenderArc,
}: TopBarWithArcProps) => {
  const renderStatusBar = () => {
    return <StatusBar barStyle={barStyle} animated backgroundColor={fill} />;
  };

  const renderTopBar = () => {
    return (
      <TopBar
        title={title}
        color={color}
        onBack={onBack}
        style={{ backgroundColor: fill }}
        {...topBarParams}
      />
    );
  };

  const renderArc = () => {
    return (
      <Svg width={arcWidth} height={arcHeight}>
        <Ellipse cx={arcWidth / 2} cy="0" rx={arcWidth / 1.4} ry={arcHeight} fill={fill} />
      </Svg>
    );
  };

  return (
    <>
      {customRenderStatusBar ? customRenderStatusBar() : renderStatusBar()}
      {customRenderTopBar ? customRenderTopBar() : renderTopBar()}
      {customRenderArc ? customRenderArc() : renderArc()}
    </>
  );
};
TopBarWithArc.defaultProps = {
  title: Strings.getLang('topBarWithArc'),
  color: '#FFF',
  onBack: () => TYSdk.Navigator.pop(),
  barStyle: 'light-content',
  fill: '#27b6ff',
  arcWidth: windowWidth,
  arcHeight: 80,
  topBarParams: {},
  renderStatusBar: null,
  renderTopBar: null,
  renderArc: null,
};

export default TopBarWithArc;
