import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RotationView, Utils, TYText, Button } from 'tuya-panel-kit';
import ManagerContext from './context/managerContext';
import Strings from './i18n';
import { OpenStateEnum } from './interface';

const { height: screenHeight, width: screenWidth, convertX: cx, convertY: cy } = Utils.RatioUtils;

interface IProps {
  openState: OpenStateEnum;
}

const openTextMap = {
  success: Strings.getLang('TYLock_openDoor_success'),
  fail: Strings.getLang('TYLock_openDoor_fail'),
  loading: Strings.getLang('TYLock_openDoor_loading'),
  refuse: Strings.getLang('TYLock_openDoor_refuse'),
};

const OpenDoorState: React.FC<IProps> = ({ openState }) => {
  const { modal } = useContext(ManagerContext);
  const openText = openTextMap[openState];
  const isLoading = openState === 'loading';

  const stateMapImg = {
    success: require('./res/open_success.png'),
    fail: require('./res/open_fail.png'),
  };

  const resultImageSource =
    openState === 'refuse' ? require('./res/open_fail.png') : stateMapImg[openState];

  return (
    <View
      style={[
        styles.container,
        { height: screenHeight, justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      {openState === 'loading' && (
        <View style={styles.loadingWrap}>
          <RotationView active duration={1000}>
            <Image source={require('./res/unlockLoadingBg.png')} style={styles.unlockLoadingBg} />
          </RotationView>
          <Image source={require('./res/unlockLoading.png')} style={styles.icon} />
        </View>
      )}

      {!isLoading && <Image style={styles.unlockLoadingBg} source={resultImageSource} />}

      <TYText style={styles.openStateText}>{openText}</TYText>

      {!isLoading && (
        <Button
          image={require('./res/close.png')}
          wrapperStyle={styles.closeBottom}
          onPress={() => modal.close()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  closeBottom: {
    bottom: cy(80),
    position: 'absolute',
  },

  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: screenWidth,
    zIndex: 9999,
  },

  icon: {
    height: cx(130),
    position: 'absolute',
    width: cx(130),
  },

  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  openStateText: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: cx(16),
    fontWeight: 'bold',
    marginTop: cx(32),
    textAlign: 'center',
  },

  unlockLoadingBg: {
    height: cx(168),
    width: cx(168),
  },
});

export default React.memo(OpenDoorState);
