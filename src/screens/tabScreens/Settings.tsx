import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/colors';
import { FONTS, SIZES, RH } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  // Dummy user data

  // {
  //   name: 'John Doe',
  //     id: 'Doorstep Partner ID',
  //     phone: '+1 234 567 890',
  //     email: 'john.doe@example.com',

  // }

  const user = {
    name: 'Prateek Traveler',
    id: 'Booking User ID: 102938',
    phone: '+1 555 123 4567',
    email: 'Prateek.traveler@gmail.com',
  };

  // [

  // { label: 'Activity Manager', onPress: () => {} },
  // { label: 'Chat with Kucryn', onPress: () => {} },
  // { label: 'Payments', onPress: () => {} },
  // { label: 'Document Upload', onPress: () => {} },
  // { label: 'Contact Us', sub: 'Email, Phone', onPress: () => {} },
  // ]

  // Option list data
  const navigation = useNavigation();
  const options = [
    { label: 'My Bookings', onPress: () => navigation.navigate('Bookings') },
    { label: 'Saved Hotels', onPress: () => {} },
    { label: 'Payment Methods', onPress: () => {} },
    { label: 'Support & Help', onPress: () => {} },
    { label: 'Contact Us', sub: 'Email, Chat, Phone', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Account</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          {/* Placeholder avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>J</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.partnerId}>{user.id}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.infoText}>
            Phone no. <Text style={styles.infoValue}>{user.phone}</Text>
          </Text>
          <Text style={styles.infoText}>
            email ID: <Text style={styles.infoValue}>{user.email}</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.allDetails}>All details</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Options List */}
      <View style={styles.optionsList}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.label}
            style={styles.optionRow}
            onPress={opt.onPress}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              {opt.sub && <Text style={styles.optionSub}>{opt.sub}</Text>}
            </View>
            <Icon name="angle-right" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
    padding: RH(16),
  },
  header: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.PB,
    color: COLORS.black,
    marginBottom: RH(16),
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RH(16),
    padding: RH(16),
    marginBottom: RH(20),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  avatarWrapper: {
    marginRight: RH(14),
  },
  avatar: {
    width: RH(60),
    height: RH(60),
    borderRadius: RH(30),
    backgroundColor: COLORS.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: SIZES.xl,
    color: COLORS.primaryDark2,
    fontFamily: FONTS.PB,
  },
  profileInfo: {
    flex: 1,
  },
  partnerId: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
    marginBottom: 2,
  },
  name: {
    fontSize: SIZES.m,
    color: COLORS.black,
    fontFamily: FONTS.PB,
    marginBottom: 2,
  },
  infoText: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
  },
  infoValue: {
    color: COLORS.textGray,
    fontFamily: FONTS.PB,
  },
  allDetails: {
    color: COLORS.success,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    marginTop: 2,
  },
  editBtn: {
    position: 'absolute',
    top: RH(12),
    right: RH(12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RH(20),
    paddingHorizontal: RH(14),
    paddingVertical: RH(4),
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  editBtnText: {
    color: COLORS.primaryDark,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
  optionsList: {
    backgroundColor: COLORS.white,
    borderRadius: RH(16),
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RH(18),
    paddingHorizontal: RH(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
  optionLabel: {
    fontSize: SIZES.m,
    color: COLORS.black,
    fontFamily: FONTS.PB,
  },
  optionSub: {
    fontSize: SIZES.s,
    color: COLORS.textGray,
    fontFamily: FONTS.PR,
    marginTop: 2,
  },
});
