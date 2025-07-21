import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONTS, SIZES, RH } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { storageMMKV } from '../../utils/MMKV';

const ROOM_TYPES = ['Single Room', 'Double Room', 'Suite', 'Deluxe'];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  guests: Yup.number()
    .required('Number of guests is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
  roomType: Yup.string().required('Room type is required'),
  checkIn: Yup.date().required('Check-in date is required'),
  checkOut: Yup.date()
    .required('Check-out date is required')
    .min(Yup.ref('checkIn'), 'Check-out must be after check-in'),
});

const BookNow = () => {
  const [roomTypeModal, setRoomTypeModal] = useState(false);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const hotelName = (route as any)?.params?.hotelName || '';

  const handleBooking = (values: any) => {
    // Get existing bookings
    let bookings = [];
    try {
      const stored = storageMMKV.getString('bookings');
      if (stored) bookings = JSON.parse(stored);
    } catch (e) {}
    // Add new booking (include hotelName)
    bookings.push({ ...values, hotelName });
    storageMMKV.set('bookings', JSON.stringify(bookings));
    navigation.navigate('OrderComplete');
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        guests: '',
        roomType: '',
        checkIn: null,
        checkOut: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleBooking}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Booking Form</Text>

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.textGray}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {touched.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textGray}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          {/* Number of Guests */}
          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of guests"
            placeholderTextColor={COLORS.textGray}
            value={values.guests}
            onChangeText={handleChange('guests')}
            onBlur={handleBlur('guests')}
            keyboardType="numeric"
          />
          {touched.guests && errors.guests && (
            <Text style={styles.errorText}>{errors.guests}</Text>
          )}

          {/* Dates row */}
          <View style={styles.dateRow}>
            {/* Check‑in */}
            <View style={styles.dateColumn}>
              <Text style={styles.label}>Check‑in</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpenCheckIn(true)}
              >
                <Text
                  style={{
                    color: values.checkIn ? COLORS.black : COLORS.textGray,
                  }}
                >
                  {values.checkIn
                    ? new Date(values.checkIn).toDateString()
                    : 'Check-in date'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={openCheckIn}
                date={values.checkIn ? new Date(values.checkIn) : new Date()}
                mode="date"
                onConfirm={date => {
                  setOpenCheckIn(false);
                  setFieldValue('checkIn', date);
                }}
                onCancel={() => setOpenCheckIn(false)}
              />
              {touched.checkIn && errors.checkIn && (
                <Text style={styles.errorText}>{errors.checkIn}</Text>
              )}
            </View>

            {/* Check‑out */}
            <View style={[styles.dateColumn, { marginLeft: RH(8) }]}>
              <Text style={styles.label}>Check‑out</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpenCheckOut(true)}
              >
                <Text
                  style={{
                    color: values.checkOut ? COLORS.black : COLORS.textGray,
                  }}
                >
                  {values.checkOut
                    ? new Date(values.checkOut).toDateString()
                    : 'Check-out date'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={openCheckOut}
                date={values.checkOut ? new Date(values.checkOut) : new Date()}
                mode="date"
                onConfirm={date => {
                  setOpenCheckOut(false);
                  setFieldValue('checkOut', date);
                }}
                onCancel={() => setOpenCheckOut(false)}
              />
              {touched.checkOut && errors.checkOut && (
                <Text style={styles.errorText}>{errors.checkOut}</Text>
              )}
            </View>
          </View>

          {/* Room Type */}
          <Text style={styles.label}>Room Type</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setRoomTypeModal(true)}
          >
            <Text
              style={{
                color: values.roomType ? COLORS.black : COLORS.textGray,
              }}
            >
              {values.roomType ? values.roomType : 'Select room type'}
            </Text>
            <Icon
              name="chevron-down"
              size={18}
              color={COLORS.textGray}
              style={styles.chevron}
            />
          </TouchableOpacity>
          {touched.roomType && errors.roomType && (
            <Text style={styles.errorText}>{errors.roomType}</Text>
          )}

          {/* Room Type Modal */}
          <Modal visible={roomTypeModal} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setRoomTypeModal(false)}
            >
              <View style={styles.modalContent}>
                <FlatList
                  data={ROOM_TYPES}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setFieldValue('roomType', item);
                        setRoomTypeModal(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.confirmBtnText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default BookNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
    padding: RH(20),
  },
  header: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    alignSelf: 'center',
    marginVertical: RH(16),
  },
  label: {
    fontSize: SIZES.s,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    marginBottom: RH(4),
  },
  input: {
    backgroundColor: COLORS.gray3,
    borderRadius: RH(10),
    paddingHorizontal: RH(16),
    paddingVertical: RH(14),
    fontSize: SIZES.s,
    fontFamily: FONTS.PR,
    color: COLORS.black,
    marginBottom: RH(4),
    position: 'relative',
  },
  dateRow: {
    flexDirection: 'row',
    marginBottom: RH(16),
  },
  dateColumn: {
    flex: 1,
  },
  chevron: {
    position: 'absolute',
    right: RH(16),
    top: RH(16),
  },
  confirmBtn: {
    backgroundColor: '#4EFFB6',
    borderRadius: RH(20),
    paddingVertical: RH(16),
    alignItems: 'center',
    marginTop: RH(30),
  },
  confirmBtnText: {
    color: COLORS.black,
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RH(12),
    padding: RH(16),
    width: '80%',
    maxHeight: '50%',
  },
  modalItem: {
    paddingVertical: RH(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
  },
  modalItemText: {
    fontSize: SIZES.s,
    color: COLORS.black,
    fontFamily: FONTS.PR,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: SIZES.s,
    marginTop: RH(2),
    marginBottom: RH(8),
  },
  hotelNameText: { fontSize: SIZES.m, color: COLORS.primaryDark, marginBottom: RH(8), textAlign: 'center' },
});
