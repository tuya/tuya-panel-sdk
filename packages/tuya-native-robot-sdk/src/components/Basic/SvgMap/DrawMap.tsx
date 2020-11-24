import React, { PureComponent } from 'react';

import { Svg, G, Circle, Path, Defs, Use, Image as SvgImage } from 'react-native-svg';
import _isEmpty from 'lodash/isEmpty';

// import data from './data.json';
import defaultConifg, { ISvgMapConfig } from './defaultConifg';

import { View, Image, StyleSheet } from 'react-native';

export interface IPoint {
  x: number;
  y: number;
}
export interface IProps {
  // 视图宽高
  height: number;
  width: number;

  mapData: {
    // 背景地图相关数据
    pointsData: { [type: string]: { x: number; y: number }[] }; // 背景地图绘制，多type后期支持多种颜色path绘制
    pilePos: IPoint; // 充电桩坐标
  };
  pathData: {
    // 路径相关数据
    curPos?: IPoint; // 当前点
    pointsData?: { x: number; y: number; type?: number }[]; // 路径点，不包含数据 （仅接口设计）
  };

  // 配置相关
  config: ISvgMapConfig;
}

interface IState {
  // 最小、最大坐标点
  mapPointMin: IPoint;
  mapPointMax: IPoint;

  // 地图svg数据
  mapSvgDataCollection: Map<string, string>;

  curPos: IPoint; // 当前点
  pilePos: IPoint; // 充电桩
}

export default class DrawMap extends PureComponent<IProps, IState> {
  state = {
    mapPointMin: { x: 0, y: 0 },
    mapPointMax: { x: 0, y: 0 },
    curPos: { x: 0, y: 0 },
    pilePos: { x: 0, y: 0 },
    mapSvgDataCollection: new Map(),
  };

  static defaultProps = {
    config: defaultConifg,
  };

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.mapData.pointsData !== nextProps.mapData.pointsData) {
      this.parseMapPointsData(nextProps.mapData.pointsData);
    }
    if (this.props.pathData.curPos !== nextProps.pathData.curPos) {
      this.parseCurPos(nextProps.pathData.curPos);
    }
    if (this.props.mapData.pilePos !== nextProps.mapData.pilePos) {
      this.parseCurPos(nextProps.mapData.pilePos);
    }
  }

  parseMapPointsData = pointsData => {
    if (!pointsData || !Object.keys(pointsData).length) return;

    const map = new Map();

    let minX = 0,
      minY = 0,
      maxX = 0,
      maxY = 0;
    // const arr = Array.from(this.mapCoordinates.values());
    Object.keys(pointsData).forEach((type: string, j) => {
      const points = pointsData[type];
      const path = [];
      points.forEach((value, i: number) => {
        if (!minX && !minY && !maxY && !minY) {
          // 计算最小最大点
          minX = value.x;
          minY = value.y;
          maxX = value.x;
          maxY = value.y;
        }
        minX = Math.min(value.x, minX);
        minY = Math.min(value.y, minY);
        maxX = Math.max(value.x, maxX);
        maxY = Math.max(value.y, maxY);

        if (i === 0) {
          path.push(`M${value.x} ${value.y}`);
        } else if (i === points.length) {
          path.push(`M${value.x} ${value.y}`);
        } else if (
          Math.abs(value.x - points[i - 1].x) > 1 ||
          Math.abs(value.y - points[i - 1].y) > 1
          // (Math.abs(value.x - arr[i - 1].x) === 1 && Math.abs(value.y - arr[i - 1].y) === 1) // 斜的点项连
        ) {
          // 不是相邻的点
          // console.log('不是相邻的点', value, mapData[i - 1]);

          path.push(`M${value.x} ${value.y}`);
        } else {
          // 连线
          path.push(`L${value.x} ${value.y}`);
        }
      });
      path.length && map.set(type, path.join(' '));
    });

    // console.warn('minX, minY, maxX, maxY', minX, minY, maxX, maxY);

    this.setState({
      mapSvgDataCollection: map,
      mapPointMin: { x: minX, y: minY },
      mapPointMax: { x: maxX, y: maxY },
    });
  };

  parseCurPos = curPos => {
    if (!curPos || _isEmpty(curPos)) return;
    this.setState({ curPos: { ...curPos } });
  };
  parsePilePos = pilePos => {
    if (!pilePos || _isEmpty(pilePos)) return;
    this.setState({ pilePos: { ...pilePos } });
  };

  renderPath() {
    const { mapSvgDataCollection } = this.state;

    const {
      config: { mapPointsDataType },
    } = this.props;

    const path = [];
    mapSvgDataCollection.forEach((value: string, key: string) => {
      console.warn('mapPointsDataType[key]', mapPointsDataType[key], key, mapPointsDataType);

      if (!!value) {
        path.push(
          <Path
            d={value}
            key={`${key}-${new Date().getTime()}`}
            fill="transparent"
            stroke={mapPointsDataType[key] || 'transparent'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      }
    });
    // console.warn('path', path);

    if (path.length) return path;
    return null;
  }

  renderFakeStroke() {
    const { mapSvgDataCollection } = this.state;
    const {
      config: { mapPointsDataType },
    } = this.props;

    const path = [];
    mapSvgDataCollection.forEach((value: string, key: string) => {
      if (!!value) {
        path.push(value);
      }
    });
    // console.warn('path', path);

    if (path.length) {
      return (
        <Path d={path.join(' ')} fill="transparent" strokeLinecap="round" strokeLinejoin="round" />
      );
    }
    return null;
  }

  renderPoint() {
    // const {
    //   mapData: { pointsData = [] },
    // } = this.props;
    // if (!pointsData.length) return;
    // return pointsData.map(value => {
    //   return (
    //     <G>
    //       <Circle x={value.x} y={value.y} r="0.1" fill="red" />
    //       <Text
    //         fontSize="0.3"
    //         x={value.x - 0.5}
    //         y={value.y}
    //         fill="#ffffff"
    //         // stroke="#ffffff"
    //       >{`${value.x}, ${value.y}`}</Text>
    //     </G>
    //   );
    // });
  }

  renderCurPoint() {
    const { curPos, mapSvgDataCollection } = this.state;
    const {
      config: { mapPointsDataType, curPointIconUrl },
    } = this.props;
    if (curPos && (curPos.x || curPos.y) && mapSvgDataCollection.size) {
      // if (!!curPointIconUrl) return <Use href="#curpos" x={curPos.x} y={curPos.y} />;
      return <Circle x={curPos.x} y={curPos.y} r="0.5" fill="red" />;
    }
    return null;
  }

  renderPilePoint() {
    const { pilePos, mapSvgDataCollection } = this.state;
    const {
      config: { mapPointsDataType, curPointIconUrl },
    } = this.props;

    if (pilePos && mapSvgDataCollection.size) {
      // if (!!curPointIconUrl) return <Use href="#curpos" x={curPos.x} y={curPos.y} />;
      return <Circle x={pilePos.x} y={pilePos.y} r="0.2" fill="green" />;
    }
    return null;
  }

  render() {
    const margin = 5;
    const { height, width, config } = this.props;
    const { mapPointMin, mapPointMax, curPos } = this.state;
    // console.warn('mapData', mapData);
    // const { minX, minY, maxX, maxY } = this.minMaxPoint;

    const svgMinX = mapPointMin.x - margin;
    const svgMinY = mapPointMin.y - margin;
    const mapWidth = 2 * margin + (mapPointMax.x - mapPointMin.x);
    const mapHight = 2 * margin + (mapPointMax.y - mapPointMin.y);

    const paths = this.renderPath();
    const fakeStroke = this.renderFakeStroke();
    const curpos = this.renderCurPoint();
    console.warn('curPos', curPos);

    return (
      // <View style={{ flex: 1 }}>
      <Svg
        height={`${height}`}
        width={`${width}`}
        viewBox={`${svgMinX} ${svgMinY} ${mapWidth} ${mapHight}`}
        preserveAspectRatio="xMidYMid meet"
        // style={{ borderWidth: 1, borderColor: 'red' }}
      >
        <Defs>
          <G id="path" strokeWidth="1.5">
            {paths}
          </G>
          <G id="path2" stroke={config.mapPointsDataType.barrier || '#000'} strokeWidth="1.6">
            {fakeStroke}
          </G>
          {/* <G id="curpos">
            <SvgImageUri
              uri={'https://images.tuyacn.com/misc/marker1.png'}
              preserveAspectRatio="xMidYMid meet"
              width="50"
              height="10"
            />
          </G> */}
        </Defs>
        <Use href="#path2" x={`${0}`} y={`${0}`} />
        <Use href="#path" x={`${0}`} y={`${0}`} />
        {/* {调试连线} */}
        {/* <G stroke="#000" strokeWidth="0.1">
          {fakeStroke}
        </G> */}

        {curpos}
        {/* <SvgImageUri
          uri={'https://images.tuyacn.com/misc/marker1.png'}
          // preserveAspectRatio="xMidYMid meet"
          x={curPos.x}
          y={curPos.y}
          width="20"
          height="20"
        /> */}
      </Svg>
      // <Image
      //   source={{ uri: 'https://images.tuyacn.com/misc/marker1.png' }}
      //   style={styles.point}
      // />

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  point: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
});
