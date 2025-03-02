import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { Colors, Fonts } from '@utils/Constants';
import { getBookingById } from '@service/authServices';
import CustomText from '@components/ui/CustomText';

const ViewOrderScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getBookingById(orderId);
        setOrderDetails(response.booking);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const calculatePriceBreakdown = (totalPrice) => {
    const serviceFee = totalPrice * 0.25;
    const sgst = totalPrice * 0.05;
    const cgst = totalPrice * 0.05;
    const cookFee = totalPrice - (serviceFee + sgst + cgst);
    
    return {
      serviceFee,
      sgst,
      cgst,
      cookFee,
      total: totalPrice
    };
  };

  const cleanAddress = (address) => {
    const addressParts = address.split('|');
    return addressParts.slice(0, 2).join(', ');
  };

  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const priceBreakdown = calculatePriceBreakdown(orderDetails.price);

  const normalStatuses = [
    { 
      name: 'Pending', 
      icon: '📝',
      color: orderDetails.status === 'New' ? Colors.GREEN : Colors.GRAY 
    },
    { 
      name: 'Confirmed', 
      icon: '✅',
      color: orderDetails.status === 'Accepted' ? Colors.GREEN : Colors.GRAY 
    },
    { 
      name: 'Cooking', 
      icon: '🧑‍🍳',
      color: orderDetails.status === 'Ongoing' ? Colors.GREEN : Colors.GRAY 
    },
    { 
      name: 'Completed', 
      icon: '🎉',
      color: orderDetails.status === 'Completed' ? Colors.GREEN : Colors.GRAY 
    }
  ];

  const rejectedStatuses = [
    { 
      name: 'Pending', 
      icon: '📝',
      color: Colors.GRAY 
    },
    { 
      name: 'Confirmed', 
      icon: '✅',
      color: Colors.GRAY 
    },
    { 
      name: 'Cooking', 
      icon: '🧑‍🍳',
      color: Colors.GRAY 
    },
    { 
      name: 'Canceled', 
      icon: '❌',
      color: Colors.RED
    }
  ];


    // Choose which status array to use based on order status
  const displayStatuses = orderDetails.status === 'Rejected' ? rejectedStatuses : normalStatuses;

  return (
    <CustomSafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image
              source={require('@assets/auth/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <CustomText fontFamily={Fonts.SemiBold} style={styles.screenTitle}>Order Details 📋</CustomText>
        </View>

        {/* Timeline Card */}
        <View style={styles.timelineCard}>
          <CustomText style={styles.timelineTitle}>Order Status</CustomText>
          <View style={styles.timeline}>
            {displayStatuses.map((status, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={[styles.circle, { backgroundColor: status.color }]}>
                  <CustomText style={styles.statusIcon}>{status.icon}</CustomText>
                </View>
                <CustomText style={[
                  styles.statusName,
                  { 
                    color: status.color === Colors.GREEN ? Colors.GREEN : 
                           status.color === Colors.RED ? Colors.RED : Colors.GRAY_DARK 
                  }
                ]}>
                  {status.name}
                </CustomText>
                {index < displayStatuses.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    { backgroundColor: status.color === Colors.GREEN ? Colors.GREEN : Colors.GRAY }
                  ]} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <CustomText style={styles.sectionTitle}>📝 Order Information</CustomText>
          {[
            { label: '📍 Address', value: cleanAddress(orderDetails.address) },
            { label: '🔢 Booking Number', value: orderDetails.booking_number },
            { label: '⏱️ Duration', value: `${orderDetails.booking_duration} hours` },
            { label: '📌 Location', value: orderDetails.location },
            { label: '📊 Status', value: orderDetails.status },
            { label: '👨‍🍳 Cook Type', value: orderDetails.cook_type },
            { label: '🍳 Cuisine', value: orderDetails.cuisine_type },
            { label: '🎉 Event Type', value: orderDetails.event_type },
            { label: '🍽️ Dishes', value: orderDetails.no_of_dishes },
            { label: '👥 People', value: orderDetails.no_of_people },
            { label: '📅 Date & Time', value: new Date(orderDetails.date).toLocaleString() },
          ].map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>{item.label}</CustomText>
              <CustomText style={styles.detailValue}>{item.value}</CustomText>
            </View>
          ))}
        </View>

        {/* Price Breakdown Card */}
        <View style={styles.detailsCard}>
          <CustomText style={styles.sectionTitle}>💰 Price Breakdown</CustomText>
          <View style={styles.priceContainer}>
            {[
              { label: '👨‍🍳 Cook Fee', value: priceBreakdown.cookFee },
              { label: '🛠️ Service Fee (25%)', value: priceBreakdown.serviceFee },
              { label: '📊 SGST (5%)', value: priceBreakdown.sgst },
              { label: '📊 CGST (5%)', value: priceBreakdown.cgst },
            ].map((item, index) => (
              <View key={index} style={styles.priceRow}>
                <CustomText style={styles.priceLabel}>{item.label}</CustomText>
                <CustomText style={styles.priceValue}>₹{item.value.toFixed(2)}</CustomText>
              </View>
            ))}
            <View style={styles.totalRow}>
              <CustomText style={styles.totalLabel}>Total Amount</CustomText>
              <CustomText style={styles.totalValue}>₹{priceBreakdown.total.toFixed(2)}</CustomText>
            </View>
          </View>
        </View>

      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: 22,
    color: Colors.primary,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 8,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingVertical: 20,
  },
  timelineItem: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusIcon: {
    fontSize: 16,
  },
  statusName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  timelineLine: {
    position: 'absolute',
    top: 20,
    height: 3,
    width: '100%',
    left: '70%',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 8,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1.5,
    textAlign: 'right',
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  priceLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  priceValue: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default ViewOrderScreen;