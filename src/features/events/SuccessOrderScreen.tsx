import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomText from '@components/ui/CustomText';
import { Colors } from '@utils/Constants';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const SuccessOrderScreen = ({ route, navigation }) => {
  const { orderDetails } = route.params;

  const calculatePriceBreakdown = (totalAmount) => {
    const total = parseFloat(totalAmount);
    const serviceFeePercentage = 0.25;
    const taxPercentage = 0.05;

    const serviceFee = total * serviceFeePercentage;
    const sgst = total * taxPercentage;
    const cgst = total * taxPercentage;
    const cookFee = total - serviceFee - sgst - cgst;

    return {
      cookFee: cookFee.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      sgst: sgst.toFixed(2),
      cgst: cgst.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const priceBreakdown = calculatePriceBreakdown(orderDetails.totalAmount);

    // Function to clean the address and remove coordinates
    const cleanAddress = (address) => {
      const addressParts = address.split('|');
      return addressParts.slice(0, 2).join(', ');
    };

  return (
    <CustomSafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <CustomText style={styles.successEmoji}>🎉</CustomText>
          <CustomText style={styles.title}>Order Successful!</CustomText>
          <CustomText style={styles.subtitle}>Your order details are below</CustomText>
        </View>

        <View style={styles.orderDetailsSection}>
          <View style={styles.orderItem}>
            <CustomText style={styles.itemTitle}>
               {orderDetails.title}
            </CustomText>
            <CustomText style={styles.itemType}>Cook Type: {orderDetails.eventType}</CustomText>
          </View>

          {/* Event Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>⏰ Number of Hours</CustomText>
              <CustomText style={styles.detailValue}>{orderDetails.numberOfHours}</CustomText>
            </View>

            <View style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>👥 Number of People</CustomText>
              <CustomText style={styles.detailValue}>{orderDetails.numberOfPeople}</CustomText>
            </View>

            <View style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>📅 Date</CustomText>
              <CustomText style={styles.detailValue}>{orderDetails.formattedDate}</CustomText>
            </View>

            <View style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>🕒 Time</CustomText>
              <CustomText style={styles.detailValue}>{orderDetails.formattedTime}</CustomText>
            </View>

            <View style={styles.detailRow}>
              <CustomText style={styles.detailLabel}>📍 Location</CustomText>
              <CustomText style={styles.detailValue}>{cleanAddress(orderDetails.locationDetails)}</CustomText>
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceBreakdownContainer}>
            <CustomText style={styles.breakdownTitle}>💰 Price Summary</CustomText>
            
            <View style={styles.priceRow}>
              <CustomText style={styles.priceLabel}>👨‍🍳 Cook Fee</CustomText>
              <CustomText style={styles.priceValue}>₹{priceBreakdown.cookFee}</CustomText>
            </View>

            <View style={styles.priceRow}>
              <CustomText style={styles.priceLabel}>🛠️ Service Fee (25%)</CustomText>
              <CustomText style={styles.priceValue}>₹{priceBreakdown.serviceFee}</CustomText>
            </View>

            <View style={styles.priceRow}>
              <CustomText style={styles.priceLabel}>📊 SGST (5%)</CustomText>
              <CustomText style={styles.priceValue}>₹{priceBreakdown.sgst}</CustomText>
            </View>

            <View style={styles.priceRow}>
              <CustomText style={styles.priceLabel}>📊 CGST (5%)</CustomText>
              <CustomText style={styles.priceValue}>₹{priceBreakdown.cgst}</CustomText>
            </View>

            <View style={[styles.priceRow, styles.totalRow]}>
              <CustomText style={styles.totalLabel}>Total Amount</CustomText>
              <CustomText style={styles.totalValue}>₹{priceBreakdown.total}</CustomText>
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.paymentDetails}>
            <CustomText style={styles.sectionTitle}>💳 Payment Details</CustomText>
            <View style={styles.detailRow}>
              <CustomText style={styles.paymentLabel}>PAYMENT ID</CustomText>
              <CustomText style={styles.paymentValue}>{orderDetails.razorpayPaymentId}</CustomText>
            </View>
            <View style={styles.detailRow}>
              <CustomText style={styles.paymentLabel}>STATUS</CustomText>
              <CustomText style={[styles.paymentValue, styles.successText]}>✅ Payment Successful</CustomText>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <CustomText style={styles.homeButtonText}>🏠 Go to Home</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  orderDetailsSection: {
    marginBottom: 24,
  },
  orderItem: {
    marginBottom: 24,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  itemType: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  priceBreakdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  priceValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  paymentDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  paymentValue: {
    fontSize: 14,
    color: '#2C3E50',
    marginTop: 4,
    fontWeight: '500',
  },
  successText: {
    color: '#27AE60',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    marginVertical: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccessOrderScreen;