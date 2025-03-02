import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import {createBooking} from '@service/authServices';
import PriceBreakDown from '@components/eventScreen/PriceBreakDown';
import EventDetailsCard from '@components/eventScreen/EventDetailsCard';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';

const formatText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    title,
    numberOfHours,
    numberOfPeople,
    guestQuantity,
    selectedDate,
    selectedTime,
    eventType,
    vegNonVeg,
  } = route.params;
  const [paymentData, setPaymentData] = useState('pay_PbPex2D6soK0yv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const {user} = useAuthStore();

  useEffect(() => {
    if (user) {
      setUserName(user.name || 'John Doe');
      setPhoneNumber(user.phone || '9437751812');
    }
  }, []);

  // Function to format the date and time
  const formatDateTime = (dateString, timeString) => {
    const [timePart, ampm] = timeString.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const dateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const formattedDate = `${
      dateTime.getMonth() + 1
    }/${dateTime.getDate()}/${dateTime.getFullYear()}`;

    const formattedHours = dateTime.getUTCHours() % 12 || 12;
    const formattedMinutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${
      dateTime.getUTCHours() >= 12 ? 'PM' : 'AM'
    }`;

    return {formattedDate, formattedTime};
  };

  const {formattedDate, formattedTime} = formatDateTime(
    selectedDate,
    selectedTime,
  );

  const handleMapScreen = () => {
    //todo: Will Handle Map Screen Later
    // navigation.navigate('SelectLocation');
  };

  const getPrice = () => {
    const priceBreakup = {
      2: {basicCookPrice: 599, professionalPrice: 899},
      3: {basicCookPrice: 699, professionalPrice: 999},
      4: {basicCookPrice: 799, professionalPrice: 1199},
      5: {basicCookPrice: 899, professionalPrice: 1299},
      6: {basicCookPrice: 999, professionalPrice: 1499},
      7: {basicCookPrice: 1099, professionalPrice: 1599},
      8: {basicCookPrice: 1199, professionalPrice: 1799},
      9: {basicCookPrice: 1299, professionalPrice: 1899},
      10: {basicCookPrice: 1399, professionalPrice: 2099},
    };
    if (!priceBreakup[numberOfHours]) return 0;
    return eventType === 'Basic'
      ? priceBreakup[numberOfHours].basicCookPrice
      : priceBreakup[numberOfHours].professionalPrice;
  };

  const price = getPrice();
  const serviceFee = price * 0.25;
  const sgst = serviceFee * 0.09;
  const cgst = serviceFee * 0.09;
  const cook = price * 0.75 - (sgst + cgst);
  const totalAmount = price;

  const handleCheckout = async () => {
    setIsProcessing(true);

    // const locationDetailsString = `${locationDetails?.name}|${locationDetails?.address}|${locationDetails?.latitude}|${locationDetails?.longitude}`;
    const locationDetailsString = 'Address Name|Address|latitude|longitude';

    try {
      // Create the booking and pass the necessary data
      const result = await createBooking(
        user.id,
        title,
        eventType || 'Basic',
        numberOfHours || 2,
        numberOfPeople,
        guestQuantity,
        vegNonVeg,
        totalAmount,
        formattedDate,
        formattedTime,
        'Hyderabad',
        locationDetailsString,
        'hgfgfh',
      );

      setIsProcessing(false);
      navigation.navigate('SuccessOrderScreen', {
        orderDetails: {
          title,
          eventType: eventType || 'Basic',
          numberOfHours: numberOfHours || 2,
          numberOfPeople,
          guestQuantity,
          vegNonVeg,
          totalAmount,
          formattedDate,
          formattedTime,
          locationDetails: locationDetailsString,
          razorpayPaymentId: 'hgfghfh',
        },
      });
    } catch (error) {
      console.error('Error creating booking', error);
      Alert('There was an issue with creating the booking. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <CustomSafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('../../assets/auth/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMapScreen}>
            <CustomText style={styles.locationText}>Hyderabad</CustomText>
            <CustomText style={styles.subLocationText}>
              Hi-Tech City Metro Station
            </CustomText>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.detailsContainer}>
            <View style={styles.section}>
              <EventDetailsCard
                eventType={title}
                numberOfHours={numberOfHours}
                numberOfPeople={numberOfPeople}
                guestQuantity={guestQuantity}
                vegNonVeg={vegNonVeg}
                formattedDate={formattedDate}
                formattedTime={formattedTime}
              />
            </View>

            <View style={styles.section}>
              <PriceBreakDown
                price={price}
                serviceFee={serviceFee}
                sgst={sgst}
                cgst={cgst}
                cook={cook}
              />
            </View>

            {/* Selected Address Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Selected Address</Text>
              <View style={styles.addressContainer}>
                <CustomText style={[styles.addressText, styles.selectAddressText]}>
                  Hyderabad
                </CustomText>
              </View>
            </View>

            {/* User Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactInfoContainer}>
                <CustomText style={styles.contactInfoText}>Name: {userName}</CustomText>
                <CustomText style={styles.contactInfoText}>Phone: {phoneNumber}</CustomText>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                isProcessing && styles.disabledButton,
              ]}
              onPress={handleCheckout}
              disabled={isProcessing}>
              {isProcessing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <CustomText style={styles.checkoutButtonText}>Checkout</CustomText>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  addressText: {
    fontSize: 16,
    color: '#666',
  },
  contactInfoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  contactInfoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerInfo: {
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 16,
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#666',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleIcon: {
    height: 25,
    width: 25,
    tintColor: Colors.primary,
  },
  eventTitle: {
    fontSize: 18,
    color: Colors.primary,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  eventDetail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  breakdownDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 18,
    color: Colors.primary,
    marginTop: 10,
  },

  checkoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    height: 75,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 20,
    // fontWeight: 'bold',
  },
});

export default CheckoutScreen;
