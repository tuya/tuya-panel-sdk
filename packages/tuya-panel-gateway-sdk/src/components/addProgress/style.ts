import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const styles = StyleSheet.create({
  centerText: {
    fontSize: cx(20),
    position: 'absolute',
  },
  desc: {
    color: '#999',
    fontSize: cx(12),
    lineHeight: cx(20),
    marginTop: cx(20),
  },
  main: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: cx(16),
    paddingHorizontal: cx(26),
    paddingVertical: cx(30),
  },
  progressBar: {
    height: cx(130),
    width: cx(130),
  },
  progressMain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    fontSize: cx(16),
    fontWeight: '600',
    marginBottom: cx(20),
  },
});
export default styles;
