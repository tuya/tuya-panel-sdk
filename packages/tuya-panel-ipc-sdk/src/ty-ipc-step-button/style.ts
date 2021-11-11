import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    width: 220,
  },
  controlButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  textWrap: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  unit: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  value: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    padding: 0,
    textAlign: 'right',
  },
});

export default styles;
