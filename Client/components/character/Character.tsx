import React from 'react';

import { StyleSheet, Image } from 'react-native';

export const Character: React.FC = () => {
  return (
    <Image
      style={styles.image}
      alt="reward"
      source={require('../../assets/OwlGif.gif')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
});
