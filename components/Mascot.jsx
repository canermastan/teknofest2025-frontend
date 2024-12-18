import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Mascot = ({ style }) => {
  return (
    <View style={[styles.mascotContainer, style]}>
      <Image
        source={require('../assets/mascot.png')}
        style={styles.mascot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mascotContainer: {
    overflow: 'hidden',
  },
  mascot: {
    width: 300,
    height: 450,
    resizeMode: 'cover',
    transform: [{ translateY: 10 }],
  },
});

export default Mascot;
