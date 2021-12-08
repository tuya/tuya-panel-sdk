import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: cx(60),
    justifyContent: 'center',
    width: '100%',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  btnText: {
    color: '#22242C',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: cx(22),
    textAlign: 'center',
  },
  centerText: {
    fontSize: cx(20),
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: cx(26),
    paddingTop: cx(30),
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
    justifyContent: 'space-between',
    overflow: 'hidden',
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
