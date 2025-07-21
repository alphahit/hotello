import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { storageMMKV } from '../../utils/MMKV';
import { COLORS } from '../../theme/colors';
import { FONTS, SIZES, RH, RW } from '../../theme/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    let stored = storageMMKV.getString('bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        setBookings([]);
      }
    } else {
      setBookings([]);
    }
  }, []);

  const renderBooking = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.bookingCard}>
      {item.hotelName ? (
        <Text style={styles.hotelName}>{item.hotelName}</Text>
      ) : null}
      <Text style={styles.bookingTitle}>{item.name}</Text>
      <Text style={styles.bookingField}>Email: <Text style={styles.bookingValue}>{item.email}</Text></Text>
      <Text style={styles.bookingField}>Guests: <Text style={styles.bookingValue}>{item.guests}</Text></Text>
      <Text style={styles.bookingField}>Room: <Text style={styles.bookingValue}>{item.roomType}</Text></Text>
      <Text style={styles.bookingField}>Check-in: <Text style={styles.bookingValue}>{item.checkIn ? new Date(item.checkIn).toDateString() : '-'}</Text></Text>
      <Text style={styles.bookingField}>Check-out: <Text style={styles.bookingValue}>{item.checkOut ? new Date(item.checkOut).toDateString() : '-'}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-left" size={RW(22)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderBooking}
        contentContainerStyle={{ paddingBottom: RH(24) }}
        ListEmptyComponent={<Text style={styles.emptyText}>No bookings found.</Text>}
      />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
    padding: RW(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RH(16),
  },
  backBtn: {
    marginRight: RW(10),
    padding: RH(4),
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.PB,
    color: COLORS.black,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderWidth:0.5,
    borderColor: COLORS.primaryDark,
    borderRadius: RW(12),
    padding: RW(16),
    marginBottom: RH(14),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingTitle: {
    fontSize: SIZES.m,
    fontFamily: FONTS.PB,
    color: COLORS.primaryDark,
    marginBottom: RH(4),
  },
  bookingField: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
    marginBottom: RH(2),
  },
  bookingValue: {
    color: COLORS.black,
    fontFamily: FONTS.PB,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textGray,
    fontSize: SIZES.m,
    marginTop: RH(40),
  },
  hotelName: {
    fontSize: SIZES.m,
    color: COLORS.success,
    fontFamily: FONTS.PB,
    marginBottom: RH(2),
    textAlign: 'left',
  },
}); 