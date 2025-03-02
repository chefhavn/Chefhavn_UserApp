import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Button,
  Linking,
} from 'react-native';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
// import MyOrderSkeleton from '../Skelitons/MyOrderScreenSkeleton';
import {Colors} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import {getBookingsByUserId} from '@service/authServices';
import AuthPrompt from '@components/myorder/AuthPrompt';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomFooter from '@components/global/CustomFooter';
import CustomText from '@components/ui/CustomText';
import { goBack, navigate } from '@utils/NavigationUtils';

export default function MyOrderScreen() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const {user} = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Function to fetch bookings
  const fetchBookings = async () => {
    if (user?.token) {
      setLoading(false);
    }

    if (user?.id) {
      try {
        const response = await getBookingsByUserId(user?.id);
        if (response?.bookings?.length) {
          setBookings(response.bookings);
          setFilteredBookings(response.bookings);
          console.log(response.booking);
          console.log(user?.id);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } else {
          setBookings([]);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert(
          'Error',
          'There was an issue fetching your bookings. Please try again later.',
          [{text: 'OK'}],
        );
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
  };

  // Use useFocusEffect to refetch bookings when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, []),
  );

  const getFormattedDateTime = date => {
    return moment(date).format('DD MMM, h:mm A');
  };

  const isWithinTwoHours = date => {
    const now = moment();
    const bookingTime = moment(date);
    return bookingTime.diff(now, 'hours') <= 2 && bookingTime.isAfter(now);
  };

  return (
    <CustomSafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image
              source={require('@assets/auth/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <CustomText style={styles.header}>My Orders</CustomText>
        </View>

        {!user?.id && <AuthPrompt />}

        {user?.token && bookings.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#6c757d',
                textAlign: 'center',
              }}>
              No Orders Found
            </CustomText>
          </View>
        )}

        {/* {loading ? <MyOrderSkeleton /> : user?.token && filteredBookings.length > 0 && ( */}
        {loading ? (
          <CustomText>Loading</CustomText>
        ) : (
          user?.id &&
          filteredBookings.length > 0 && (
            <>
              {filteredBookings?.map((booking, index) => (
                <TouchableOpacity
                  key={booking._id}
                  onPress={() => {
                    navigate('ViewOrderScreen', {
                      orderId: booking._id,
                    });
                  }}>
                  <View style={styles.orderItem}>
                    <View style={styles.orderHeader}>
                      <View style={styles.orderDetails}>
                        <CustomText style={styles.restaurantName}>
                          {booking.event_type}
                        </CustomText>
                        <CustomText style={styles.restaurantLocation}>
                          {booking.cuisine_type}
                        </CustomText>
                      </View>
                    </View>

                    <View style={styles.orderContent}>
                      <CustomText>Scheduled Date: </CustomText>
                      <CustomText style={styles.orderItemText}>
                        {getFormattedDateTime(booking.date)}
                      </CustomText>
                    </View>

                    <View style={styles.orderMetaContainer}>
                      <CustomText style={styles.orderDate}>
                        Placed on {getFormattedDateTime(booking.created_at)}
                      </CustomText>
                      <CustomText style={styles.orderStatus}>{booking.status}</CustomText>
                    </View>

                    {isWithinTwoHours(booking.date) && (
                      <>
                        <CustomText style={styles.otpText}>
                          OTP for chef: {booking?.otp || '1234'}
                        </CustomText>
                        <View
                          style={{
                            backgroundColor: Colors.primary,
                            padding: 5,
                            borderRadius: 5,
                            alignItems: 'start',
                            marginTop: 10,
                            color: '#fff'
                          }}>
                          <Button
                            title="Call Now"
                            onPress={() => {
                              Linking.openURL('tel:7989207370');
                            }}
                          />
                        </View>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )
        )}
      </ScrollView>
    </CustomSafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 16,
  },
  menuDots: {
    fontSize: 24,
    color: Colors.BLACK,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    marginLeft: 16,
    color: Colors.BLACK,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.BLACK,
  },
  filterOptionsContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  filterOption: {
    fontSize: 14,
    paddingVertical: 4,
    color: Colors.BLACK,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  orderItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 16,
  },
  restaurantName: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  restaurantLocation: {
    fontSize: 14,
    color: Colors.BLACK,
    marginBottom: 4,
  },
  viewMenuText: {
    fontSize: 14,
    color: Colors.primary,
  },
  orderContent: {
    marginTop: 8,
  },
  orderItemText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  orderSubItemText: {
    fontSize: 14,
    color: Colors.BLACK,
    marginBottom: 4,
  },
  orderMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  orderStatus: {
    fontSize: 14,
    color: Colors.GREEN,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  otpText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  chefDetailsButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  chefCallButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'left',
  },
  chefDetailsText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  menuDropdown: {
    position: 'absolute',
    right: 0,
    top: 30,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    zIndex: 99999999,
  },

  menuOption: {
    fontSize: 14,
    color: Colors.WHITE,
    padding: 8,
    backgroundColor: Colors.primary,
  },
});
