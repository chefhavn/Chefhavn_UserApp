import {View, Image, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {screenWidth} from '@utils/Scaling';

const images = [
  require('../../assets/slider/slider-img-1.jpeg'),
  require('../../assets/slider/slider-img-2.jpeg'),
  require('../../assets/slider/large-event.jpeg'),
];

const Promotion = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <Image source={item} style={styles.image} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  image: {
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 10,
    marginHorizontal: screenWidth * 0.01,
  },
});

export default Promotion;
