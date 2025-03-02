import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {goBack} from '@utils/NavigationUtils';
import BookingScreen from './BookingScreen';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

const EventDetails = ({route}) => {
  const {imagePath, title, description, details} = route.params;
  const [chefType, setChefType] = useState('Basic');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [tempChefType, setTempChefType] = useState(chefType);
  const [isBookNowClicked, setIsBookNowClicked] = useState(false);

  // Animated values
  const boxAnim = useRef(new Animated.Value(800)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const imageBlur = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Handle the book now button
  const handleBookNowButton = () => {
    setIsBookNowClicked(!isBookNowClicked);

    // Box animation
    Animated.timing(boxAnim, {
      toValue: isBookNowClicked ? 800 : 50,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Title animation
    Animated.timing(titleAnim, {
      toValue: isBookNowClicked ? 0 : -180,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Blur and overlay animations
    Animated.timing(imageBlur, {
      toValue: isBookNowClicked ? 0 : 10,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(overlayOpacity, {
      toValue: isBookNowClicked ? 0 : 0.6,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBookNow = () => {
    // navigation.navigate('CheckoutScreen', {
    //   title,
    //   numberOfHours,
    //   numberOfPeople,
    //   guestQuantity,
    //   selectedDate,
    //   selectedTime,
    //   eventType,
    //   vegNonVeg,
    // });
    // navigation.navigate('BookingScreen', { title, imagePath, description });
  };

  // Handle Picker modal
  const openPicker = () => {
    setTempChefType(chefType);
    setPickerVisible(true);
  };

  const onDonePress = () => {
    setChefType(tempChefType);
    setPickerVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      {/* Transparent Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Image
            source={require('@assets/auth/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Image Section with Blur and Overlay */}
        <Animated.View style={styles.imageContainer}>
          <Animated.Image
            source={imagePath}
            style={[styles.eventImage, {opacity: isBookNowClicked ? 0.8 : 1}]}
            blurRadius={imageBlur}
          />
          {/* Black overlay */}
          <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]} />
        </Animated.View>

        {/* Title and Description Section */}
        <Animated.View
          style={[
            styles.textContainer,
            {transform: [{translateY: titleAnim}]},
          ]}>
          <CustomText
            fontFamily={Fonts.Bold}
            fontSize={RFValue(14)}
            style={[
              styles.eventTitle,
              {color: isBookNowClicked ? '#fff' : '#333'},
            ]}>
            {title}
          </CustomText>
          <CustomText
            fontFamily={Fonts.Regular}
            fontSize={RFValue(10)}
            style={[{color: isBookNowClicked ? '#fff' : '#111'}]}>
            {description}
          </CustomText>
        </Animated.View>

        <View style={styles.textContainer}>
          <CustomText
            fontFamily={Fonts.Regular}
            fontSize={RFValue(10)}
            style={styles.dropdownLabel}>
            {details}
          </CustomText>
        </View>

        {/* Chef Type Dropdown */}
        <Animated.View style={styles.chefTypeContainer}>
          {Platform.OS === 'android' ? (
            // Normal Picker for Android
            <>
              <CustomText style={styles.dropdownLabel}>Chef Type</CustomText>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={chefType}
                  onValueChange={itemValue => setChefType(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="Basic" value="Basic" />
                  <Picker.Item label="Professional" value="Professional" />
                </Picker>
              </View>
            </>
          ) : (
            // Custom Modal Picker for iOS
            <>
              <CustomText style={styles.dropdownLabel}>Chef Type</CustomText>

              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={openPicker}>
                <Text style={styles.dropdownButtonText}>{chefType}</Text>
              </TouchableOpacity>
              <Modal
                visible={isPickerVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setPickerVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.chefTypeHeader}>
                      <CustomText style={styles.modalTitle}>
                        Select Chef Type
                      </CustomText>
                      <TouchableOpacity
                        style={styles.doneButton}
                        onPress={onDonePress}>
                        <CustomText style={styles.doneButtonText}>
                          Done
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={tempChefType}
                      onValueChange={itemValue => setTempChefType(itemValue)}
                      style={styles.picker}>
                      <Picker.Item label="Basic" value="Basic" />
                      <Picker.Item label="Professional" value="Professional" />
                    </Picker>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </Animated.View>

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNowButton}>
          <CustomText style={styles.bookButtonText}>Book Now</CustomText>
        </TouchableOpacity>

        {/* Sliding Box */}
        <Animated.View
          style={[
            styles.boxContainer,
            {
              transform: [{translateY: boxAnim}],
            },
          ]}>
          <BookingScreen
            title={title}
            imagePath={imagePath}
            description={description}
            chooseChef={chefType}
            setChooseChef={setChefType}
            openPicker={openPicker}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  textContainer: {
    padding: 20,
  },
  eventTitle: {
    marginBottom: 4,
  },

  chefTypeContainer: {
    // backgroundColor: 'black',
    paddingHorizontal: 14,
  },

  dropdownLabel: {
    color: '#333',
    marginBottom: 8,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  chefTypeHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    // height: 200,
    width: '100%',
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#503a73',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#503a73',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxContainer: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#666',
  },
});

export default EventDetails;
