/* eslint-disable react/sort-comp */
import color from 'color';
import * as React from 'react';
import { View, FlatList, StyleSheet, Platform, StatusBar, InteractionManager } from 'react-native';
import { Rect } from 'react-native-svg';
import { TYSdk, Utils, Swipeout, LinearGradient, TopBar } from '@tuya-rn/tuya-native-components';
import _isEmpty from 'lodash/isEmpty';

import appointed from '../../../../protocol/ledong/AppointedCleaning';

import { timer as timerTheme } from '../theme';
import { GetRepeatStr } from '../utils';
import { FloatFromBottom } from '../config';
// import { TopBar } from '../components';
import GetTimerList from './getTimerList';
// @ts-ignore
import Strings from '../i18n';
import TimerCell from './timerCell';
import { ITimerProps, ITheme, IETimerProps } from './interface';
import {
  Center,
  StyledContainer,
  StyledSubTitle,
  StyledListWrapper,
  StyledImage,
  StyledButton,
  StyledButtonText,
} from './style';
import { dpCodesEnum } from '../../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';

const { convertX: cx, convertY: cy, width, isIphoneX } = Utils.RatioUtils;
// const timerList = new GetTimerList();

class Timer extends React.Component<ITimerProps, any> {
  // static defaultProps = {
  //   dataSource: [],
  // };
  timerList: GetTimerList;
  category: string = 'rnTimer';

  constructor(props: ITimerProps) {
    super(props);
    this.timerList = new GetTimerList({
      is12Hours: props.is12Hours,
      commonCmdCode: dpCodesEnum.commRaw,
    })
    // this.state = {
    //   dataSource: props.dataSource,
    //   mainSwitch: true,
    //   // scrolled: false,
    // };
    // this.category = props.timerConfig.category;
  }
  subscriptionCommonCmd$: any;

  state = {
    dataSource: [],
    mute: {},
  };

  // componentWillReceiveProps(nextProps: ITimerProps) {
  //   this.setState({
  //     dataSource: nextProps.dataSource,
  //     mainSwitch: nextProps.mainSwitchValue,
  //   });
  // }

  componentDidMount() {
    this.subscriptionCommonCmd$ = this.timerList
      .createSubscribe()
      .subscribe((data: { timer: object[]; mute: object }) => {
        const { timer, mute } = data;
        console.warn('componentDidMount dataSource', data);

        if (timer) {
          this.setState({ dataSource: [...timer] });
        }
        if (mute) {
          this.setState({ mute });
        }
      });
    // subscriptionTimer$.subscribe(dataSource => {
    //   console.warn('componentDidMount dataSource', dataSource);

    //   this.setState({ dataSource });
    // });

    // subscriptionMute$.subscribe(muteDate => {
    //   console.warn('componentDidMount muteDate', muteDate);

    //   this.setState({ mute: muteDate });
    // });

    TYSdk.mobile.showLoading();
    InteractionManager.runAfterInteractions(() => {
      this.timerList.getTimerList().then(() => {
        TYSdk.mobile.hideLoading();
      });
    });
  }

  componentWillUnmount() {
    this.subscriptionCommonCmd$ && this.subscriptionCommonCmd$.unsubscribe();
    // timerList.destroySubscribe();
  }

  get theme() {
    const theme = this.props.theme ? this.props.theme : timerTheme;
    return theme;
  }

  pushToAdd = (groupId?: number, isEdit?: boolean, index?: number, timer?: any) => {
    const { theme, is12Hours, laserMapConfig } = this.props;
    const { mute } = this.state;
    const {
      addTimerRouter,
      repeatRouter,
      repeat,
      repeatType,
      limit = 15,
      isMainSwitch,
      loop,
      isPickerAlignCenter = true,
      isTimeZone,
      timeZoneType,
      fetchType = 'cloud',
      dpId,
      saveExtraHandler,
      renderDpItem,
    } = this.props.timerConfig;
    const config = this.props.timerConfig.data;
    if (!isEdit && this.state.dataSource.length >= limit) {
      TYSdk.mobile.simpleTipDialog(Strings.formatValue('dpToMuchWarning', limit), () => {});
      return;
    }
    this.props.navigator.push({
      theme,
      is12Hours,
      isPickerAlignCenter,
      groupId,
      isEdit,
      timer,
      index,
      isMainSwitch,
      loop,
      isTimeZone,
      timeZoneType,
      fetchType,
      dpId,
      mainSwitch: this.state.mainSwitch,
      id: addTimerRouter,
      hideTopbar: true,
      repeatRouter,
      repeatType,
      hasRepeat: repeat === 0,
      dpDataList: config,
      category: this.category,
      fetchData: this.props.fetchData,
      dataSource: this.state.dataSource,
      isSupportNotice: !!this.props.isSupportNotice,
      saveExtraHandler,
      sceneConfigs: FloatFromBottom,
      renderDpItem,
      mute,
      laserMapConfig,
    });
  };

  goBack = () => {
    if (this.props.navigator.getCurrentRoutes().length === 1) {
      TYSdk.mobile.back();
    } else {
      this.props.navigator.pop();
    }
  };

  handleMainSwitch = (value: boolean) => {};

  swipeoutOnOpen = (index: number) => {
    const dataSource = this.state.dataSource;
    dataSource[index].rowOpen = !dataSource[index].rowOpen;
    this.setState({
      dataSource,
    });
  };

  onValueChange = async (groupId: number, index: number, status: boolean) => {
    try {
      const { dataSource, mute } = this.state;
      const extendsData = [];
      dataSource.forEach((item, i) => {
        if (index !== i && item.originalData) extendsData.push(item.originalData);
        if (index === i && item.originalData) {
          extendsData.push({ ...item.originalData, unlock: status });
        }
      });
      if (!_isEmpty(mute)) extendsData.push(mute);
      const cmd = appointed.encode(
        {
          extendsData,
        },
        { isAdd: false }
      );

      await this.timerList.putTimerList(cmd);
    } catch (error) {
      console.warn('deleteTimer Error: ', error);
    }
  };

  onCellLongPress = (...args: any[]) => {
    if (Platform.OS !== 'android') return;
    TYSdk.mobile.simpleConfirmDialog(
      Strings.getLang('timerDelete'),
      Strings.getLang('timerDeleteTip'),
      () => this.deleteTimer(...args),
      () => {}
    );
  };

  deleteTimer = async (groupId?: number, index?: number) => {
    try {
      const { dataSource, mute } = this.state;
      const extendsData = [];
      dataSource.forEach((item, i) => {
        if (index !== i && item.originalData) extendsData.push(item.originalData);
      });
      if (!_isEmpty(mute)) extendsData.push(mute);
      const cmd = appointed.encode(
        {
          extendsData,
        },
        { isAdd: false }
      );

      await this.timerList.putTimerList(cmd);
    } catch (error) {
      console.warn('deleteTimer Error: ', error);
    }
  };

  onCellPress = (...args: any[]) => {
    this.pushToAdd(...args);
  };

  _onLayout = (e: IETimerProps) => {
    const { height } = e.nativeEvent.layout;
    this.setState({
      flatHeight: height,
    });
  };

  renderItem = ({ item, index }: { item: any; index: number }) => {
    const { isMainSwitch } = this.props.timerConfig;
    const { id, formatTimeStr, tagStr, repeatStr, switchValue, dpStrArr } = item;
    // 勿扰数据不显示
    if (!id) return;
    const cellLine = this.theme.cellLine;
    const timerCell = (
      <View
        key={id}
        onLayout={(e: IETimerProps) => {
          const { height } = e.nativeEvent.layout;
          this.setState({
            cellHeight: Math.round(height),
          });
        }}
      >
        <TimerCell
          accessibilityLabel={`Timer_TimerCell${index}`}
          style={[
            index === 0 && {
              borderColor: cellLine,
              borderTopWidth: StyleSheet.hairlineWidth,
            },
            index === this.state.dataSource.length - 1 && {
              borderColor: cellLine,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          ]}
          // theme={theme}
          switchChange={(value: boolean) => this.onValueChange(id, index, value)}
          switchValue={switchValue}
          tagStr={tagStr}
          timeStr={formatTimeStr}
          // eslint-disable-next-line new-cap
          repeatStr={GetRepeatStr(repeatStr)}
          dpStr={dpStrArr.length > 1 ? dpStrArr.join(' ') : dpStrArr.join('')}
          bordered={index !== this.state.dataSource.length - 1}
          onLongPress={() => this.onCellLongPress(id, index)}
          onPress={() => this.onCellPress(id, true, index, item.originalData)}
          rightItem={isMainSwitch ? 'arrow' : 'switch'}
        />
      </View>
    );
    return Platform.OS === 'ios' ? (
      <Swipeout
        autoClose={true}
        accessibilityLabel={`Timer_Swipeout${index}`}
        backgroundColor="transparent"
        onOpen={() => this.swipeoutOnOpen(index)}
        close={!this.state.dataSource[index].rowOpen}
        right={[
          {
            text: Strings.getLang('timerDelete'),
            onPress: () => this.deleteTimer(id, index),
            type: 'delete',
            fontStyle: { color: '#fff', fontSize: cx(16) },
          },
        ]}
      >
        {timerCell}
      </Swipeout>
    ) : (
      timerCell
    );
  };

  renderHeader = () => {
    const { titleBg, titleFontColor } = this.theme;
    return (
      <TopBar
        background={titleBg}
        color={titleFontColor}
        title={Strings.getLang('timerList')}
        onBack={this.goBack}
      />
    )
  };

  getMainSwitchRow = () => {
    return (
      <View style={{ marginBottom: cx(16) }}>
        <TimerCell
          timeStr={`${Strings.getLang('timerSwitch')}`}
          switchValue={this.state.mainSwitch}
          onPress={() => {
            return false;
          }}
          rightItem="switch"
          switchChange={(value: boolean) => this.handleMainSwitch(value)}
        />
      </View>
    );
  };

  renderListHeaderComponent = () => {
    return (
      <StyledSubTitle
        onLayout={(e: IETimerProps) => {
          const { height } = e.nativeEvent.layout;
          this.setState({
            titleHight: height,
          });
        }}
        style={{
          padding: cx(16),
          paddingBottom: cx(8),
        }}
      >
        {Strings.getLang('timerWarning')}
      </StyledSubTitle>
    );
  };

  render() {
    const { tintEmptyImage = true, timerConfig } = this.props;
    const isDisabled = !timerConfig && this.state.dataSource.length;
    const isEmpty = this.state.dataSource.length === 0;
    const footerDimension = { width, height: isIphoneX ? 118 : cx(88) };
    const { cellHeight, titleHight, flatHeight } = this.state;
    const scrollEnabled = cellHeight * this.state.dataSource.length + titleHight > flatHeight;

    const boardBg = this.theme.boardBg;
    const statusBgStyle = this.theme.statusBgStyle;

    const c1 = color(boardBg).alpha(0).rgbString();
    return (
      <StyledContainer>
        <StatusBar barStyle={statusBgStyle} />

        {this.renderHeader()}
        {/* {timerConfig.isMainSwitch && this.getMainSwitchRow()} */}
        <StyledListWrapper isDisabled={isDisabled}>
          {this.state.dataSource.length ? (
            <FlatList
              onLayout={this._onLayout}
              keyExtractor={item => item.id}
              data={this.state.dataSource}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
              scrollEnabled={scrollEnabled}
              ListHeaderComponent={this.renderListHeaderComponent}
              // extraData={this.state}
            />
          ) : (
            <Center>
              <StyledImage tintEmptyImage={tintEmptyImage} />
              <StyledSubTitle style={{ marginTop: cy(18), textAlign: 'center' }}>
                {Strings.getLang('noTimerList')}
              </StyledSubTitle>
              {isEmpty && (
                <StyledButton
                  accessibilityLabel="Timer_AddSchedule"
                  isEmpty={true}
                  onPress={() => this.pushToAdd()}
                >
                  <StyledButtonText isEmpty={true}>{Strings.getLang('addTimer')}</StyledButtonText>
                </StyledButton>
              )}
            </Center>
          )}
        </StyledListWrapper>
        {/* 占位用于显示阴影 */}
        {!isEmpty && (
          <View
            style={[
              footerDimension,
              {
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'transparent',
              },
            ]}
          >
            <LinearGradient
              style={footerDimension}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="40%"
              stops={{
                '0%': c1,
                '100%': boardBg,
              }}
            >
              <Rect {...footerDimension} />
            </LinearGradient>
          </View>
        )}
        {!isEmpty && (
          <StyledButton
            accessibilityLabel="Timer_AddSchedule"
            isEmpty={false}
            onPress={() => this.pushToAdd()}
          >
            <StyledButtonText isEmpty={false}>{Strings.getLang('addTimer')}</StyledButtonText>
          </StyledButton>
        )}
      </StyledContainer>
    );
  }
}

// eslint-disable-next-line new-cap
export default Timer;
