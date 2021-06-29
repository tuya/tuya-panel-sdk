import _ from 'lodash';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { TYSdk, NavigatorLayout, TopBar } from 'tuya-panel-kit';
import composeLayout from './composeLayout';
import configureStore from './redux/configureStore';
import { routers, SCOPE_MAP } from './config';
import Strings from './i18n';

export const store = configureStore();

// const linearGradientBackground = {
//   '3%': '#fa7e28',
//   '90%': '#fa7e28',
// };

console.disableYellowBox = true;

class MainLayout extends NavigatorLayout {
  constructor(props) {
    super(props);
    console.log('TYSdk :', TYSdk);
    console.log('TYSdk.devInfo :', TYSdk.devInfo);
    console.log('Strings: ', Strings);
  }

  componentDidMount() {
    const { scope, component } = this.props;
    super.componentDidMount();
    const element = SCOPE_MAP[scope];
    const path = `${element}.${component}`;
    if (
      typeof scope === 'string' &&
      typeof component === 'string' &&
      routers.find(r => r.id === path)
    ) {
      TYSdk.Navigator.push({
        id: path,
        title: path,
      });
    }
  }

  /*
  hookRoute 可以做一些控制处理
  return 是一个 Object,
  {
    background: backgroundImage | linearGradientBackground,
    backgroundColor: '#FCFCFC', // 颜色值
    style: ViewPropTypes.style,
    // topbarStyle: ViewPropTypes.style, // 需要 Android TopBar 组件支持设置 style
    hideFullView: true | false,   // 控制是否隐藏 FullView
    renderFullView: (props) => {
      return (
        <FullView>
        </FullView>
      );
    },
    FullView: ReactComponent,     // 自定义的 FullView 组件, 如果使用自定义 FullView 组件，TopBar、OfflineView 也需要在 FullView 里面调用
    hideTopbar: true | false,   // 控制是否隐藏 TopBar
    OfflineView: ReactComponent, // 自定义的 OfflineView 组件
    showOfflineView: true | false, // 是否渲染 OfflineView
  }
  */
  // eslint-disable-next-line
  hookRoute(route) {
    //   switch (route.id) {
    //     case 'main':
    //       // eslint-disable-next-line
    //       route.background = background;
    //       break;

    //     default:
    //       break;
    //   }
    const { theme } = this.props;
    const { type } = theme;
    return {
      ...route,
      showOfflineView: true,
      renderStatusBar: () => (
        <StatusBar barStyle={type === 'light' ? 'default' : 'light-content'} />
      ),
      renderTopBar: () => {
        if (
          route.id === 'Ipc.IpcPlayer' ||
          route.id === 'Gateway.TopBarWithArc' ||
          route.id === 'Gateway.TempHumWithBlur'
        ) {
          return null;
        }
        return (
          <TopBar
            style={{ zIndex: 999 }}
            title={route.id === 'main' ? ' ' : route.title}
            color="#000"
            actions={null}
            onBack={() => {
              const routes = TYSdk.Navigator.getCurrentRoutes();
              if (routes.length === 1) {
                TYSdk.mobile.back();
              } else {
                TYSdk.Navigator.pop();
              }
            }}
          />
        );
      },
    };
  }

  renderScene(route, navigator) {
    let Scene = <View />;
    let schema = {};
    let uiConfig = {};
    const { dispatch, devInfo } = this.props;

    if (!_.isEmpty(devInfo)) {
      schema = devInfo.schema || {};
      uiConfig = devInfo.uiConfig || {};
    }

    const router = routers.find(r => r.id === route.id);

    if (router && router.Scene) {
      const Component = router.Scene;
      Scene = <Component dispatch={dispatch} navigator={navigator} {...route} />;
    }

    return Scene;
  }
}

export default composeLayout(store, MainLayout);
