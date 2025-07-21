import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import ReviewModal from '../../components/ReviewModal';

export default function OrderComplete() {
  const navigation = useNavigation();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const handleDone = useCallback(() => {
    setReviewModalVisible(true);
  }, []);

  const handleReviewModalClose = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'BottomTabGroup', params: { screen: 'Feed' } }
        ],
      })
    );
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Center animation */}
      <LottieView
        source={require('../../assets/lottie/ticksuccess.json')}
        style={styles.centerAnimation}
        autoPlay
        loop={false}
        // onAnimationFinish={handleDone}
      />

      {/* Success message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Booking Successful</Text>
      </View>

      {/* Bottom animation */}
      <LottieView
        source={require('../../assets/lottie/bookingsuccess.json')}
        style={styles.bottomAnimation}
        autoPlay
        loop={false}
        onAnimationFinish={handleDone}
      />
      <ReviewModal
        visible={reviewModalVisible}
        onClose={handleReviewModalClose}
        onSave={handleReviewModalClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFED7',
  },
  centerAnimation: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: '30%',
  },
  messageContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  messageText: {
    color: '#AD40AF',
    fontSize: 20,
    textAlign: 'center',
  },
  bottomAnimation: {
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
