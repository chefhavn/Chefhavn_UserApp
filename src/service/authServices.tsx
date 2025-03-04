import { tokenStorage } from '@state/storage';
import axiosInstance from './axiosInstance';
import { useAuthStore } from '@state/authStore';

// Define types for function parameters
interface LoginPayload {
  email?: string;
  phone?: string;
  role: 'Customer';
}

// API method for logging in
export const login = async (
  email: string,
  phoneNumber: string,
  loginWithEmail: boolean,
): Promise<any> => {
  const payload: LoginPayload = loginWithEmail
    ? {email, role: 'Customer'}
    : {phone: phoneNumber, role: 'Customer'};

  console.log(payload);

  try {
    const response = await axiosInstance.post('/api/auth/auth', payload);
    const {token, user} = response;
    tokenStorage.set("accessToken", token);
    tokenStorage.set("userId", user.id);
    const {setUser} = useAuthStore.getState();
    setUser(user)
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Delete Account
export const deleteAccount = async (userId) => {
  try {
    const response = await axiosInstance.delete('/api/auth/delete-account', {
      data: { userId }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error during account deletion:', error);
    throw error;
  }
};

// API method for sending OTP
export const sendOtp = async (
  email: string,
  phoneNumber: string,
  loginWithEmail: boolean,
): Promise<any> => {
  const payload = {
    email: loginWithEmail ? email.toLowerCase() : null,
    phone: !loginWithEmail ? phoneNumber : null,
  };

  try {
    const response = await axiosInstance.post('/api/send-otp', payload);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// API method to get user details by ID
export const getUserById = async (): Promise<any> => {
  try {
    const userId = tokenStorage.getString("userId");

    if (!userId) {
      throw new Error("User ID not found in storage");
    }

    const response = await axiosInstance.get(`/api/customers/${userId}`);
    console.log("get user",response);
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// API For Create Booking
export const createBooking = async (
  customerId,
  eventType,
  cookType,
  bookingDuration,
  noOfPeople,
  noOfDishes,
  cuisineType,
  price,
  selectedDate,
  selectedTime,
  location,
  addressId,
  paymentData
) => {
  const payload = {
    customer_id: customerId,
    event_type: eventType,
    cook_type: cookType,
    booking_duration: bookingDuration,
    no_of_people: noOfPeople,
    no_of_dishes: noOfDishes,
    cuisine_type: cuisineType,
    price: price,
    date: selectedDate,
    time: selectedTime,
    location,
    addressId,
    paymentData
  };

  console.log("Payment DATA",paymentData)

  try {
    const response = await axiosInstance.post(
      '/api/booking/create-booking',
      payload,
    );
    return response.data; // Return only the data from the response
  } catch (error) {
    console.error('Error during booking creation:', error);
    throw error; // Rethrow to be caught in the caller function
  }
};

export const getBookingsByUserId = async (customerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/booking/bookings/${customerId}`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBookingById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/api/booking/booking/${orderId}`);
    console.log("Booking Details",response)
    return response;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// API method for fetching all addresses
export const fetchAllAddresses = async userId => {
  try {
    const response = await axiosInstance.get(
      `/api/address/get-all-addresses/${userId}`,
    );
    return response;
  } catch (error) {
    console.error('Error during fetching addresses:', error);
    throw error;
  }
};

// API method for deleting an address
export const deleteAddress = async addressId => {
  try {
    const response = await axiosInstance.delete(
      `/api/address/delete-address/${addressId}`,
    );
    return response;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

// API method for setting primary address
export const setPrimaryAddress = async (userId, addressId) => {
  try {
    const response = await axiosInstance.post(
      '/api/address/set-active-address',
      {
        user_id: userId,
        address_id: addressId,
      },
    );
    return response;
  } catch (error) {
    console.error('Error setting primary address:', error);
    throw error;
  }
};