import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TYText, TYSectionList } from 'tuya-panel-kit';
import { sections } from '../config';

const Res = {
  logo: require('../res/Logo.png'),
};

const Home = () => (
  <TYSectionList
    style={{ backgroundColor: '#fff' }}
    ListHeaderComponent={
      <View style={styles.header}>
        <Image source={Res.logo} />
        <TYText style={styles.text} text="Tuya Design" weight="500" color="#000" size={16} />
      </View>
    }
    contentContainerStyle={styles.content}
    separatorStyle={{ opacity: 0 }}
    headerStyle={{ marginLeft: 0 }}
    sections={sections}
  />
);

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 46,
  },

  text: {
    marginVertical: 16,
  },
});

export default Home;
