import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import SelectMeal from './SelectMeal';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckoutScreen from './CheckoutScreen';

const OPTIONS = [
  {label: 'Proffesional', value: 'proffesional'},
  {label: 'Basic', value: 'Basic'},
];

const BookingScreen = ({
  title,
  imagePath,
  description,
  chooseChef,
  setChooseChef,
  openPicker,
}) => {
  // const { title, imagePath, description } = route.params;
  const [chefType, setChefType] = useState('');
  const [isChefTypeModalVisible, setChefTypeModalVisible] = useState(false);
  const [selectedChefType, setSelectedChefType] = useState('Chef Type');
  const [modalVisible, setModalVisible] = useState(false);
  const options = [
    {label: 'Professional', value: 'professional'},
    {label: 'Basic', value: 'basic'},
  ];
  const [hours, setHours] = useState('');
  const [showChefDropdown, setShowChefDropdown] = useState(false);
  const [showHoursDropdown, setShowHoursDropdown] = useState(false);
  const [dishes, setDishes] = useState('');
  const [selectedOption, setSelectedOption] = useState('veg');
  const [numberOfHours, setNumberOfHours] = useState(2);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  // dropdown state
  const [selectedChef, setSelectedChef] = useState('Chef Type');
  const [isChefDropdownVisible, setChefDropdownVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState('Guests');
  const [isGuestDropdownVisible, setGuestDropdownVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleDone = () => {
    setPickerVisible(false);
  };
  const [currentStep, setCurrentStep] = useState(1); // Step tracking

  //   const { user, logoutUser, isProfilePercent, setIsProfilePercent } = useContext(UserContext);

  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [breakFastTime, setBreakFastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');

  const navigation = useNavigation();

  const handleBookNow = () => {
    // if (!isProfilePercent) {
    //   Alert.alert(
    //     "Complete Your Profile",
    //     "You need to Complete Your Profile to book events.",
    //     [
    //       {
    //         text: "Edit Profile",
    //         onPress: () => {
    //           navigation.navigate('EditProfile');
    //         },
    //       },
    //       {
    //         text: "Cancel",
    //         style: "cancel",
    //       },
    //     ]
    //   );
    //   return;
    // }

    // if (!user?.token) {
    //   Alert.alert(
    //     "Login or Register to Book",
    //     "You need to log in or register to book events.",
    //     [
    //       {
    //         text: "Login/Register",
    //         onPress: () => {
    //           logoutUser();
    //           navigation.navigate('Auth');
    //         },
    //       },
    //       {
    //         text: "Cancel",
    //         style: "cancel",
    //       },
    //     ]
    //   );
    //   return;
    // }
    let selectedTime = '';
    if (breakFastTime) {
      selectedTime = breakFastTime;
    } else if (lunchTime) {
      selectedTime = lunchTime;
    } else if (dinnerTime) {
      selectedTime = dinnerTime;
    }

    navigation.navigate('CheckoutScreen', {
      title,
      numberOfHours: numberOfHours,
      numberOfPeople: 4,
      guestQuantity: dishes,
      selectedDate,
      selectedTime,
      eventType: chooseChef,
      vegNonVeg: selectedOption,
    });
    // navigation.navigate('BookingScreen');
  };

  const isFormValid = () => {
    return chefType && hours && dishes && selectedDate && breakFastTime;
  };

  // Generate the next 5 dates
  const dates = [...Array(5).keys()].map(offset =>
    moment()
      .add(offset + 1, 'days')
      .format('YYYY-MM-DD'),
  );

  const handleGuestSelection = number => {
    setnumberOfHours(number);
  };

  const handleDateSelection = date => {
    setSelectedDate(date);
  };

  const handleOptionSelect = value => {
    setChefType(value);
    // Keep the modal open
  };

  const handleChefSelection = type => {
    setSelectedChef(type);
    setChefDropdownVisible(false);
  };

  const handleGuestCountSelection = type => {
    setSelectedGuest(type);
    setGuestDropdownVisible(false);
  };

  // Move to the next step if the current step is valid
  const handleNextStep = () => {
    if (isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Check if the current step is valid
  const isStepValid = () => {
    if (currentStep === 1) return chooseChef && dishes && selectedOption;
    if (currentStep === 2) return numberOfHours;
    if (currentStep === 3) return selectedDate && selectedMeal;
    return true;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.formSection}>
          {/* Step 1
          
          : Chef Type, Dishes, Veg/Non-Veg */}
          {currentStep >= 1 && (
            <>
              {/* Chef Type input */}
              <View style={[styles.chefTypeContainer]}>
                {Platform.OS === 'android' ? (
                  <>
                    <CustomText fontFamily={Fonts.Regular} style={styles.dropdownLabel}>Chef Type</CustomText>
                    <View style={styles.pickerContainer1}>
                      <Picker
                        selectedValue={chooseChef}
                        onValueChange={itemValue => setChooseChef(itemValue)}
                        style={styles.picker}>
                        <Picker.Item label="Basic" value="Basic" />
                        <Picker.Item
                          label="Professional"
                          value="Professional"
                        />
                      </Picker>
                    </View>
                  </>
                ) : (
                  <>
                    <CustomText fontFamily={Fonts.Regular} style={styles.dropdownLabel}>Chef Type</CustomText>
                    <TouchableOpacity
                      style={styles.dropdownButton}
                      onPress={openPicker}>
                      <CustomText fontFamily={Fonts.Regular} style={styles.dropdownButtonText}>
                        {chooseChef}
                      </CustomText>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* VEG NON-VEG DISHES INPUT */}
              <View style={styles.vegNonVegDishesContainer}>
                <View style={styles.dropdownContainer}>
                  <CustomText fontFamily={Fonts.Regular} style={styles.dropdownLabel}>Select Dishes</CustomText>
                  {Platform.OS === 'android' ? (
                    <>
                      <View style={styles.pickerContainer1}>
                        <Picker
                          selectedValue={dishes}
                          onValueChange={itemValue => setDishes(itemValue)}>
                          <Picker.Item label="Select a Dish" value="" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                          <Picker.Item label="6" value="6" />
                        </Picker>
                      </View>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.inputButton}
                      onPress={() => setPickerVisible(true)}>
                      <CustomText fontFamily={Fonts.Regular} style={styles.inputText}>
                        {dishes || 'Select a Dish'}
                      </CustomText>
                    </TouchableOpacity>
                  )}

                  {/* Modal for Picker */}
                  {isPickerVisible && (
                    <Modal transparent={true} animationType="slide">
                      <View style={styles.modalOverlay}>
                        <View style={styles.pickerContainer}>
                          <Picker
                            selectedValue={dishes}
                            onValueChange={itemValue => setDishes(itemValue)}>
                            <Picker.Item label="Select a Dish" value="" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                          </Picker>
                          {/* Done button */}
                          <TouchableOpacity
                            style={styles.doneButton}
                            onPress={handleDone}>
                            <CustomText style={styles.doneText}>Done</CustomText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>

                <View style={styles.vegNonVegButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.vegButton,
                      selectedOption === 'veg' && styles.activeVegButton,
                    ]}
                    onPress={() => setSelectedOption('veg')}>
                    <View style={styles.vegButtonContent}>
                      <Image
                        source={require('../../assets/auth/veglogo.jpeg')}
                        style={styles.vegLogo}
                      />
                      <Text
                        style={[
                          styles.vegText,
                          selectedOption === 'veg' && styles.activeVegText,
                        ]}>
                        Veg
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.nonVegButton,
                      selectedOption === 'nonveg' && styles.activeNonVegButton,
                    ]}
                    onPress={() => setSelectedOption('nonveg')}>
                    <View style={styles.nonVegButtonContent}>
                      <Image
                        source={require('../../assets/auth/nonveg.jpeg')}
                        style={styles.nonVegLogo}
                      />
                      <Text
                        style={[
                          styles.nonVegText,
                          selectedOption === 'nonveg' &&
                            styles.activeNonVegText,
                        ]}>
                        Non-Veg
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {/* Step 2: Number of Guests */}
          {currentStep >= 2 && (
            <View style={styles.guestsContainer}>
              <Text style={styles.guestsHeading}>Number of Hours</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.guestsButtonsContainer}>
                  {[...Array(7).keys()].map(i => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.guestButton,
                        numberOfHours === i + 1 && styles.guestButtonActive,
                      ]}
                      onPress={() => setNumberOfHours(i + 1)}>
                      <Text
                        style={[
                          styles.guestButtonText,
                          numberOfHours === i + 1 &&
                            styles.guestButtonTextActive,
                        ]}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Step 3: Select Date and Meal Type */}
          {currentStep >= 3 && (
            <View style={styles.datesContainer}>
              <Text style={styles.datesHeading}>Select the Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.datesButtonsContainer}>
                  {dates.map((date, index) => {
                    const isTomorrow = index === 0;
                    const displayDate = moment(date).format('D MMM');
                    const dayOfWeek = isTomorrow
                      ? 'Tomorrow'
                      : moment(date).format('ddd');

                    return (
                      <TouchableOpacity
                        key={date}
                        style={[
                          styles.dateButton,
                          selectedDate === date && styles.dateButtonActive,
                        ]}
                        onPress={() => setSelectedDate(date)}>
                        <Text
                          style={[
                            styles.dateDay,
                            selectedDate === date && styles.dateDayActive,
                          ]}>
                          {dayOfWeek}
                        </Text>
                        <Text
                          style={[
                            styles.dateText,
                            selectedDate === date && styles.dateTextActive,
                          ]}>
                          {displayDate}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <View style={styles.timeSection}>
                <Text style={styles.timeSectionHeading}>
                  Select the time and Meal Type
                </Text>
                <SelectMeal
                  selectedMeal={selectedMeal}
                  setSelectedMeal={setSelectedMeal}
                  breakFastTime={breakFastTime}
                  setBreakFastTime={setBreakFastTime}
                  lunchTime={lunchTime}
                  setLunchTime={setLunchTime}
                  dinnerTime={dinnerTime}
                  setDinnerTime={setDinnerTime}
                />
              </View>
            </View>
          )}

          {/* Next Step Button */}
          {!isStepValid() && (
            <Text style={{color: 'red'}}>
              Please fill all fields to proceed.
            </Text>
          )}
          {isStepValid() && currentStep < 3 && (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleNextStep}>
              <Text style={styles.bookButtonText}>Next</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          {currentStep === 3 && isStepValid() && (
            <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
              <Text style={styles.bookButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d9c8e3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chefTypeContainer: {
    // backgroundColor: 'black',
    // paddingHorizontal: 14,
    marginVertical: 20,
  },
  dropdownLabel: {
    color: '#111',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold'
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
  pickerContainer1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    zIndex: -5,
    position: 'relative',
    borderBottomLeftRadius: 50,
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  topDropdown: {
    width: '100%',
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 90,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
    // backgroundColor: '#fff',
    borderRadius: 20,
  },
  dropdownContainerTransparent: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.TRANSPARENT_PICKER,
    borderRadius: 20,
  },
  inputButton: {
    // width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputText: {
    color: '#333',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 12,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    color: '#000',
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 6,
  },

  formSection: {
    // flex: 1,
    backgroundColor: '#d9c8e3',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    zIndex: -1,
    paddingBottom: 70,
  },

  // chef dropdown starts
  chefContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chefTypeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chefButtonText: {
    color: '#000',
    fontSize: 16,
  },
  chefDropdownBox: {
    position: 'absolute',
    top: 60, // Adjust based on the position below the button
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
    width: 150,
  },
  chefDropdownItem: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 8,
  },
  // chef dropdown ends

  // guest dropdown starts
  guestContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  guestTypeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  guestButtonText: {
    color: '#000',
    fontSize: 16,
  },
  guestDropdownBox: {
    position: 'absolute',
    top: 60, // Adjust based on the position below the button
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
    width: 150,
  },
  guestDropdownItem: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 8,
  },
  // guest dropdown ends

  guestsContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },

  vegNonVegDishesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Vertically center buttons
    gap: 4,
    borderRadius: 10,
    marginBottom: 20,
  },
  dishesContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  dishesInput: {
    height: 50,
    color: '#000',
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 6,
    width: 174,
  },
  vegNonVegButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    // padding: 2,
  },
  vegButton: {
    borderRadius: 24,
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4, // Space between buttons
    backgroundColor: '#ffffff', // Default background
  },
  vegButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vegLogo: {
    width: 24, // Adjust the size as needed
    height: 24, // Adjust the size as needed
    marginRight: 8, // Space between logo and text
  },
  nonVegButton: {
    borderRadius: 24,
    width: 120,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Default background
  },
  nonVegButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nonVegLogo: {
    width: 24, // Adjust the size as needed
    height: 24, // Adjust the size as needed
    marginRight: 8, // Space between logo and text
  },
  vegText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 2,
  },
  nonVegText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 2,
  },
  activeVegButton: {
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#e0ffe0', // Light green background
  },
  activeNonVegButton: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#ffe0e0', // Light red background
  },
  activeVegText: {
    color: 'green',
  },
  activeNonVegText: {
    color: 'red',
  },

  guestsHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 16,
    color: Colors.text,
  },
  guestsButtonsContainer: {
    flexDirection: 'row',
  },
  guestButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
  },
  guestButtonActive: {
    borderWidth: 2,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3',
  },
  // guestButtonText: {
  //   color: 'black',
  //   fontFamily: 'Montserrat-Bold',
  //   fontSize: 18,
  // },
  guestButtonTextActive: {
    color: '#503a73',
  },
  datesContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  datesHeading: {
    fontSize: 16,
    marginBottom: 16,
    color: Colors.text,
  },
  datesButtonsContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    width: 74,
    height: 80,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
  },
  dateButtonActive: {
    borderWidth: 2,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3',
  },
  dateText: {
    color: 'black',
    fontSize: 16,
  },
  dateTextActive: {
    color: '#503a73',
  },
  dateDay: {
    color: 'gray',
    fontSize: 12,
  },
  dateDayActive: {
    color: '#503a73',
  },
  timeSection: {
    marginTop: 20,
  },
  timeSectionHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    color: Colors.text,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  placeholder: {
    fontSize: 16,
    color: '#777',
  },
  modalContainer: {
    position: 'absolute',
    top: '100%', // Position below the select input
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    marginTop: -20, // Adjust to place it directly below
    zIndex: 0,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
