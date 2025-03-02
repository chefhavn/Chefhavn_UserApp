import {Colors} from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export const EventCard = ({
  imagePath,
  title,
  subtitle,
  discountText,
  description,
  details,
  imagePathUrl
}) => {

  const handleCardPress = () => {
      navigate('EventDetails', { title, imagePath, description, details });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={imagePath} style={styles.cardImage} />
      {discountText && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountText}</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
  },
  cardContent: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 5,
  },
});
