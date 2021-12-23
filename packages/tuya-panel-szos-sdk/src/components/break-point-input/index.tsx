/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
/* eslint-disable no-cond-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
import PropTypes from 'prop-types';
import React, { FC, useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import MyIpt from '../number-area-input';

const { convertX, convertY } = Utils.RatioUtils;
interface IPutProps {
  /*
   * 必须有一个唯一的name
   */
  name: string;
  /*
   * 输入框ref
   */
  ref?: any;
  /*
   * 输入框聚焦时触发
   */
  focusFuc?: any;
  /*
   * 默认的值
   */
  placeHolder?: string;
}

const MyInput: FC<IPutProps> = forwardRef(({ name, focusFuc, placeHolder }, ref) => {
  const [ipAdd, setIpA] = useState<any[]>([]);
  const [ipAddRess, setIpAddRes] = useState<string>('');
  const refMap = useRef({ current: null });

  useEffect(() => {
    if (placeHolder.indexOf('.') === -1) {
      return;
    }
    const arr = placeHolder.split('.');
    const reg = /^[0-9]*$/;
    let validateRes = true;
    arr.map(it => {
      if (!reg.test(it)) {
        validateRes = false;
        return false;
      }
      validateRes = true;
      return true;
    });
    if (validateRes) {
      setIpA(arr);
    }
  }, [placeHolder]);

  const changeText = (idx: number, val: any) => {
    const ipAddRes = ipAdd;

    ipAddRes.splice(idx, 1, val);
    const testVal = ipAddRes.join('.');
    // 输入完成跳转下一个input
    const inputVal = parseInt(val, 10);
    if (inputVal === 0 || val.length === 3) {
      refMap?.current[idx + 1]?.setFocus();
    }
    setIpAddRes(testVal);
  };

  useImperativeHandle(ref, () => ({
    value: ipAdd,
    ipAddRess,
  }));

  return (
    <View style={styles.ip}>
      <View style={styles.ipCon}>
        {ipAdd &&
          ipAdd.map((ip, index) => {
            return (
              <>
                <MyIpt
                  ref={(f: any) => {
                    refMap.current[index] = f;
                  }}
                  key={`${name}-${index}`}
                  name={`${name}-${index}`}
                  placeholder={ip}
                  focusFuc={focusFuc}
                  minVal={index === 0 && name === 'ip' ? 1 : 0}
                  changeText={(e: any) => changeText(index, e)}
                />
                {ipAdd.length - 1 !== index && (
                  <View style={styles.pointWpt}>
                    <View style={styles.poit} />
                  </View>
                )}
              </>
            );
          })}
      </View>
    </View>
  );
});

MyInput.propTypes = {
  name: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  ref: PropTypes.any,
  focusFuc: PropTypes.func,
  placeHolder: PropTypes.string,
};

MyInput.defaultProps = {
  name: '',
  ref: { current: null },
  focusFuc: () => {},
  placeHolder: '192.168.2.2',
};

const styles = StyleSheet.create({
  ip: {
    height: convertY(56),
    marginBottom: convertY(20),
    paddingHorizontal: convertY(10),
    position: 'relative',
    width: '100%',
  },
  ipCon: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    width: '100%',
  },
  ipInputBg: {
    height: convertY(56),
    left: convertX(10),
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  pointWpt: {
    alignItems: 'center',
    height: convertX(15),
    justifyContent: 'center',
    position: 'relative',
    width: convertX(12),
  },
  poit: {
    backgroundColor: '#67707B',
    bottom: convertY(3),
    height: convertX(2),
    position: 'absolute',
    width: convertX(2),
  },
});

export default MyInput;
