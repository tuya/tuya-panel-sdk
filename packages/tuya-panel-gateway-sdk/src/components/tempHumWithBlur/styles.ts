import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const styles = StyleSheet.create({
  splitLine: {
    height: cx(38),
    position: 'absolute',
  },
  tempHumBlurView: {
    borderRadius: cx(16),
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  tempHumContent: {
    alignItems: 'center',
    borderColor: '#FFF',
    borderRadius: cx(16),
    borderWidth: 1,
    flexDirection: 'row',
    height: cx(92),
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: cx(336),
  },
  tempHumImage: {
    marginRight: cx(8),
    width: cx(24),
  },
  tempHumItem: {
    alignItems: 'center',
    flex: 1,
    height: cx(52),
    justifyContent: 'space-between',
  },
  tempHumItemContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tempHumItemLabel: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 14,
    lineHeight: cx(20),
  },
  tempHumItemValue: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 28,
    fontWeight: '500',
    marginRight: cx(3),
  },
  tempHumItemValueAndUnit: {
    alignItems: 'baseline',
    flexDirection: 'row',
    position: 'relative',
  },
  tempHumUnit: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 14,
  },
});
export default styles;
