// import React, { FC, useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ViewStyle,
//   TextStyle,
//   ImageStyle,
//   Animated,
//   Easing,
//   ImageBackground,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Circle } from 'react-native-svg';
// import { Utils, LinearGradient } from 'tuya-panel-kit';
// import Res from '../res';
// import SportTargetContent from './sport-target-content';

// interface IProps {
//   style: ViewStyle | TextStyle | ImageStyle;
//   curStep: number;
// }

// const { convertX: cx, winWidth } = Utils.RatioUtils;

// // 问题
// // todo border渐变好像行不通
// // rn版本5.30不支持高斯模糊，5.31才行,所以目前换成了图片实现
// // <BlurView style={styles.blurView} blurType="light" blurAmount={11.89} />

// // 运动步数区域
// const SportSteps: FC<IProps> = (props: IProps) => {
//   const navigation = useNavigation();
//   const { style, curStep } = props;
//   const dimension = { width: cx(190), height: cx(190) };

//   const rotateAnimate = useRef(new Animated.Value(0)).current;
//   const rotateAnimate2 = useRef(new Animated.Value(0)).current;

//   // 切换tabbar停止动画重新开始
//   useEffect(() => {
//     // 运行动画
//     rotateExecute(rotateAnimate, 4000);
//     rotateExecute(rotateAnimate2, 6000);
//     return () => {
//       rotateAnimate.stopAnimation();
//       rotateAnimate2.stopAnimation();
//     };
//   }, []);

//   const rotateExecute = (animate: any, duration: number) => {
//     animate.setValue(0);
//     Animated.timing(animate, {
//       toValue: 1, // 最终值 为1，这里表示最大旋转 360度
//       duration,
//       easing: Easing.linear,
//     }).start((result: { finished: boolean }) => {
//       if (result.finished) {
//         rotateExecute(animate, duration);
//       }
//     });
//   };

//   const rotateValue = (animate: any) => {
//     const value = animate.interpolate({
//       inputRange: [0, 1], // 输入值
//       outputRange: ['0deg', '360deg'], // 输出值
//     });
//     return value;
//   };

//   return (
//     <View style={[styles.box, style]}>
//       <ImageBackground style={styles.borderOuter} source={Res.sport_border_circle1}>
//         <ImageBackground style={styles.borderInner} source={Res.sport_border_circle1}>
//           <View style={styles.containOuter}>
//             <LinearGradient
//               style={dimension}
//               x1="0%"
//               y1="0%"
//               x2="0%"
//               y2="100%"
//               stops={{
//                 '0%': `#FEFFFF`,
//                 '100%': `#E4EDFE`,
//               }}
//             >
//               <Circle cx={cx(95)} cy={cx(95)} r={cx(95)} />
//             </LinearGradient>
//             <ImageBackground style={styles.contentInner} source={Res.sport_target_content}>
//               <SportTargetContent step={curStep} />
//             </ImageBackground>
//           </View>
//         </ImageBackground>
//         <Animated.Image
//           style={[
//             styles.spot1,
//             {
//               transform: [{ rotate: rotateValue(rotateAnimate2) }, { translateX: cx(112) }],
//             },
//           ]}
//           source={Res.step_spot1}
//         />
//       </ImageBackground>
//       {/* 目前渐变实现很难用，很麻烦 */}
//       <Animated.Image
//         style={[
//           styles.spot2,
//           {
//             transform: [{ rotate: rotateValue(rotateAnimate) }, { translateX: cx(135) }],
//           },
//         ]}
//         source={Res.step_spot2}
//       />
//     </View>
//   );
// };
// export default React.memo(SportSteps);

// const styles = StyleSheet.create({
//   box: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   borderOuter: {
//     width: cx(270),
//     height: cx(270),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   borderInner: {
//     borderColor: '#FFFFFF',
//     width: cx(224),
//     height: cx(224),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   containOuter: {
//     width: cx(190),
//     height: cx(190),
//     borderRadius: cx(95),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   contentInner: {
//     width: cx(220),
//     height: cx(220),
//     // borderRadius: cx(69),
//     // backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   spot1: {
//     position: 'absolute',
//     width: cx(20),
//     height: cx(20),
//   },
//   spot2: {
//     position: 'absolute',
//     width: cx(14),
//     height: cx(14),
//   },
//   // blurView: {
//   //   backgroundColor: '#0376FF',
//   //   opacity: 0.3,
//   //   width: cx(138),
//   //   height: cx(138),
//   //   borderRadius: cx(69),
//   // },
// });
