import _ from 'lodash';
import TYSdk from '../api';
import Strings from '../i18n';

const blackList = ['caller', 'length', 'name', 'arguments', 'prototype', 'toString', 'displayName'];

/**
 * @desc
 * 递归遍历根据对象中Scene(React组件)中的静态属性，自动生成子路由
 *
 * @param {Array} routers - something like this { id: 'xxx', Scene: <ReactComponent> }
 * @param {Number} level - 搜索层级
 * @param {Boolean} isFirst - 是否首次搜索(主路由不需要获取)
 */
export const traverseRouters = (routers, level = 1, isFirst = true) => {
  if (level === 0) {
    return routers;
  }
  const subRouters = routers.reduce((acc, cur) => {
    const { id, Scene } = cur;
    const properties = Object.getOwnPropertyNames(Scene);
    const data = _.difference(properties, blackList).map(v => ({
      id: `${id}.${v}`,
      Scene: Scene[v],
    }));
    return [...acc, ...data];
  }, []);
  if (isFirst) {
    return traverseRouters(subRouters, level - 1, false);
  }
  return [...routers, ...traverseRouters(subRouters, level - 1, false)];
};

export const produceRouterDatas = routers => {
  const sortedRouters = _.sortBy(routers, 'id');
  return sortedRouters.map(({ id, routeProps, ...rest }) => {
    console.log(id, 'id');
    return {
      key: id,
      title: id === 'Ipc.IpcCrossDevice' ? `${id}(SDK 3.24.5 and above)` : Strings[id] || id,
      arrow: true,
      styles: {
        container: {
          backgroundColor: '#f5f5f5',
          marginHorizontal: 24,
          borderRadius: 8,
          marginBottom: 8,
        },
        content: {
          paddingTop: 19,
          paddingBottom: 19,
        },
      },
      onPress: () =>
        TYSdk.Navigator.push({
          id,
          title: Strings[id] || id,
          ...routeProps,
        }),
      ...rest,
    };
  });
};
