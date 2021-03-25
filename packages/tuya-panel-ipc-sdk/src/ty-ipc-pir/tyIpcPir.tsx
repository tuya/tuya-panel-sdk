import React from 'react';
import { View, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Res from './res';
import Styles from './style';
import { TYIpcPirProps } from './interface';
import OnePir from './onePir';
import TwoPir from './twoPir';
import ThreePir from './threePir';
import publicConfig from '../publicConfig';

const { cx } = publicConfig;

const pirWidth = cx(327);
const pirHeight = cx(130);

const TYIpcPir: React.FC<TYIpcPirProps> & { defaultProps: Partial<TYIpcPirProps> } = props => {
  const {
    title,
    activeColor,
    containerStyle,
    titleStyle,
    OnText,
    OffText,
    pieNumber,
    dpCodeA,
    dpCodeAValue,
    dpCodeB,
    dpCodeBValue,
    dpCodeC,
    dpCodeCValue,
    pieBtnTextStyle,
  } = props;

  const onChangePir = (dpCode, value) => {
    props.onChangePir(dpCode, value);
  };

  const pirTrue = dpCodeAValue || dpCodeBValue || dpCodeCValue;

  return (
    <View style={[Styles.pirPiePage, containerStyle]}>
      {title && <TYText style={[Styles.pirTip, titleStyle]}>{title}</TYText>}
      <Image
        source={Res.lightPirCircle}
        style={[Styles.lightPirCircle, { tintColor: pirTrue ? activeColor : undefined }]}
      />
      {pieNumber === 1 && (
        <OnePir
          dpCodeA={dpCodeA}
          dpCodeAValue={dpCodeAValue}
          pirWidth={pirWidth}
          pirHeight={pirHeight}
          onChangePir={onChangePir}
          OnText={OnText}
          OffText={OffText}
          pieBtnTextStyle={pieBtnTextStyle}
          activeColor={activeColor}
        />
      )}
      {pieNumber === 2 && (
        <TwoPir
          dpCodeA={dpCodeA}
          dpCodeAValue={dpCodeAValue}
          dpCodeB={dpCodeB}
          dpCodeBValue={dpCodeBValue}
          pirWidth={pirWidth}
          pirHeight={pirHeight}
          onChangePir={onChangePir}
          OnText={OnText}
          OffText={OffText}
          pieBtnTextStyle={pieBtnTextStyle}
          activeColor={activeColor}
        />
      )}
      {pieNumber === 3 && (
        <ThreePir
          dpCodeA={dpCodeA}
          dpCodeAValue={dpCodeAValue}
          dpCodeB={dpCodeB}
          dpCodeBValue={dpCodeBValue}
          dpCodeC={dpCodeC}
          dpCodeCValue={dpCodeCValue}
          pirWidth={pirWidth}
          pirHeight={pirHeight}
          onChangePir={onChangePir}
          OnText={OnText}
          OffText={OffText}
          pieBtnTextStyle={pieBtnTextStyle}
          activeColor={activeColor}
        />
      )}
    </View>
  );
};

TYIpcPir.defaultProps = {
  pieNumber: 1,
  title: 'PIR Title',
  titleStyle: {},
  activeColor: '#fc2f07',
  OnText: 'ON',
  OffText: 'OFF',
  dpCodeA: 'flight_pir_a',
  dpCodeAValue: false,
  dpCodeB: 'flight_pir_b',
  dpCodeBValue: false,
  dpCodeC: 'flight_pir_c',
  dpCodeCValue: false,
  pieBtnTextStyle: {},
  onChangePir: () => {},
};

export default TYIpcPir;
