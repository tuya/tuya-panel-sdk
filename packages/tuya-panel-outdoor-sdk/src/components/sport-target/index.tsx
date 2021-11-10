// import Res from '@res';
// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// import { Utils, Progress, IconFont } from 'tuya-panel-kit';
// import { useIoTUIValue } from '@models';
// import SportTargetContent from './sport-target-content';

// const { convertX: cx } = Utils.RatioUtils;

// type IProps = {
//   curStep: number;
//   targetSteps: number;
// };

// const SportTarget: React.FC<IProps> = (props: IProps) => {
//   const { curStep, targetSteps } = props;
//   const themeColor = useIoTUIValue('themeColor');

//   const CenterView = () => {
//     return (
//       <View style={styles.progressCenterView}>
//         <View style={styles.centerViewBox}>
//           <ImageBackground style={styles.centerViewContent} source={Res.sport_clock}>
//             <SportTargetContent step={curStep} />
//           </ImageBackground>
//         </View>
//       </View>
//     );
//   };

//   const percent = Math.floor((curStep / targetSteps) * 100);

//   return (
//     <View style={styles.content}>
//       <View style={styles.head}>
//         <Text style={[styles.headTitle, { color: themeColor }]}>
//           {`今日目标 ｜ ${targetSteps}步`}
//         </Text>
//         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={styles.headContent}>
//             你已经完成了目标的
//             <Text style={{ color: themeColor }}>{`${percent}%`}</Text>
//           </Text>
//         </View>
//       </View>
//       <View style={styles.progress}>
//         <Progress
//           style={{ width: cx(216), height: cx(216) }}
//           foreColor={themeColor}
//           thumbFill={themeColor}
//           thumbStroke={themeColor}
//           thumbStrokeWidth={0}
//           thumbRadius={cx(7)}
//           scaleHeight={cx(16)}
//           min={0}
//           max={300}
//           value={200}
//           startDegree={135}
//           andDegree={270}
//           stepValue={10}
//           disabled={true}
//         />
//         <CenterView />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   content: {
//     height: cx(350),
//   },
//   head: {
//     height: cx(120),
//     alignItems: 'center',
//   },
//   headTitle: {
//     marginTop: cx(20),
//     marginBottom: cx(4),
//     width: cx(270),
//     height: cx(30),
//     lineHeight: cx(30),
//     fontSize: cx(12),
//     textAlign: 'center',
//   },
//   headContent: {
//     width: cx(200),
//     fontSize: cx(24),
//     textAlign: 'center',
//   },
//   progress: {
//     height: cx(230),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   progressCenterView: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     width: '100%',
//     height: cx(230),
//   },
//   centerViewBox: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   centerViewContent: {
//     width: cx(150),
//     height: cx(150),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default React.memo(SportTarget);
