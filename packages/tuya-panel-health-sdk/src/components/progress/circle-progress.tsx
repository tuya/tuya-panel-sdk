import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TYText } from 'tuya-panel-kit';
import styles from './style';

const VIEWBOX_WIDTH = 100; // width of viewBox
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2;
const DEFAULT_STROKE_WIDTH = 8;
const viewBox = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_WIDTH}`;

interface ProgessProps {
  /**
   * 画布的宽高
   */
  size?: number;

  /**
   * 所占百分比
   */
  percent?: number;

  /**
   * 文本渲染函数
   * @param {Number} percent 当前的进度信息
   * @return {ReactNode} 返回自定义文案渲染组件，默认显示百分比
   */
  textRender?: (percent: number) => ReactNode;

  /**
   * 进度条颜色
   */
  color?: string;

  /**
   * 底层环的背景色
   */
  backgroundColor?: string;
}

class Progess extends React.Component<ProgessProps> {
  static defaultProps = {
    color: '#56C0FF',
    backgroundColor: '#EEF8FF',
    percent: 0,
    size: 100,
    textRender: (percent: number) => <TYText style={styles.progressCircleText}>{percent}%</TYText>,
  };

  private getPath(radius: number) {
    return `M ${HALF_VIEWBOX_WIDTH},${HALF_VIEWBOX_WIDTH} m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
      2 * radius
    } a ${radius},${radius} 0 1 1 0,-${2 * radius}`;
  }

  private computeOverlayStrokeDashOffset() {
    const underlayStrokeWidth = DEFAULT_STROKE_WIDTH;
    const overlayStrokeWidth = DEFAULT_STROKE_WIDTH;

    const overlayRadius =
      HALF_VIEWBOX_WIDTH - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
    const overlayLen = Math.PI * 2 * overlayRadius;
    return ((VIEWBOX_WIDTH - this.props.percent) / VIEWBOX_WIDTH) * overlayLen;
  }

  render() {
    const { size, percent, textRender, color, backgroundColor } = this.props;
    const underlayStrokeWidth = DEFAULT_STROKE_WIDTH;
    const overlayStrokeWidth = DEFAULT_STROKE_WIDTH;

    // underlay path
    const underlayRadius = HALF_VIEWBOX_WIDTH - underlayStrokeWidth / 2;
    const underlayPath = this.getPath(underlayRadius);

    // overlay path
    const overlayRadius =
      HALF_VIEWBOX_WIDTH - overlayStrokeWidth / 2 - (underlayStrokeWidth - overlayStrokeWidth) / 2;
    const overlayPath = this.getPath(overlayRadius);

    // 关于strokeDasharray, https://moxo.io/blog/2017/07/22/svg-circular-animation/
    const overlayLen = Math.PI * 2 * overlayRadius;
    const overlayStrokeDasharray = [overlayLen, overlayLen];
    const overlayStrokeDashOffset = this.computeOverlayStrokeDashOffset();

    const suffixText = textRender(percent);

    return (
      <View style={{ width: size, height: size }}>
        <Svg viewBox={viewBox} style={styles.container}>
          <Path
            d={underlayPath}
            fillOpacity="0"
            stroke={backgroundColor}
            strokeWidth={DEFAULT_STROKE_WIDTH}
            strokeLinecap="round"
          />
          <Path
            d={overlayPath}
            fillOpacity="0"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={DEFAULT_STROKE_WIDTH}
            strokeDasharray={overlayStrokeDasharray}
            strokeDashoffset={overlayStrokeDashOffset}
          />
        </Svg>

        {suffixText ? (
          <View style={[styles.progressCircleTextContainer, { width: '100%', height: '100%' }]}>
            {suffixText}
          </View>
        ) : null}
      </View>
    );
  }
}

export default Progess;
