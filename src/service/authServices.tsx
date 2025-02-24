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

