import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, RH, RW, SIZES} from '../../theme';
import {SwipeAction} from '../../components/SwipeAction';

const thumb = {
  uri: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a₹q=80&w=400&auto=format&fit=crop',
};

const OrderDetails = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: RH(24)}}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={SIZES.l}
            color={COLORS.secondaryDark}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{width: RW(24)}} />
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>No. of Clothes and Details</Text>
        <Text style={styles.otpText}>OTP-0682</Text>
      </View>

      <View style={styles.itemCard}>
        <View style={styles.rowBetween}>
          <View style={styles.itemLeft}>
            <Image source={thumb} style={styles.itemThumb} />
            <View style={{flex: 1}}>
              <Text style={styles.itemTitle}>Shirt</Text>
              <Text style={styles.itemMeta}>
                <Text style={styles.metaStrong}>Quantity</Text> 1{' '}
                <Text style={styles.dot}>•</Text>{' '}
                <Text style={styles.metaStrong}>Ironing</Text> 1{' '}
                <Text style={styles.dot}>•</Text>{' '}
                <Text style={styles.metaStrong}>Washing</Text> 1
              </Text>
              <Text style={styles.offerText}>5% Off</Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.priceNow}>₹360</Text>
            <Text style={styles.priceWas}>₹400</Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <TouchableOpacity>
          <Text style={styles.linkText}>2 Clothes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>3 Clothes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardMenuBtn}>
          <Icon name="ellipsis-v" size={SIZES.m} color={COLORS.appGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.remarksCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Remarks</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.remarkText}>
          Amazing deals at reasonable prices. Thanks!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Shipping Details</Text>
      <Text style={styles.bodyText}>Main Road, SST Nagar, 846009.</Text>
      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Payment Summary</Text>
      <View style={styles.rowBetween}>
        <Text style={styles.grayRow}>Total Items Fee</Text>
        <Text style={styles.grayRow}>₹ 400</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.grayRow}>Spot, Colour & Removing Fee</Text>
        <Text style={styles.grayRow}>₹ 100</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.grayRow}>Tax</Text>
        <Text style={styles.grayRow}>₹ 20</Text>
      </View>
      <View style={[styles.rowBetween, {marginTop: RH(6)}]}>
        <Text style={styles.toPay}>To Pay</Text>
        <Text style={styles.toPay}>₹ 520</Text>
      </View>

      <Text style={styles.dueAmount}>Due Amount - ₹420</Text>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Pickup Partner Details</Text>
      <View style={styles.partnerRow}>
        <Image
          source={{uri: 'https://i.pravatar.cc/80₹img=12'}}
          style={styles.avatar}
        />
        <View style={{flex: 1}}>
          <Text style={styles.partnerName}>Ramesh</Text>
          <Text style={styles.partnerPhone}>9876543210</Text>
          <View style={styles.chipsRow}>
            <Text style={styles.chipLabel}>Machine:</Text>
            <View style={styles.grayChip}>
              <Text style={styles.chipText}>246</Text>
            </View>
            <View style={styles.doneChip}>
              <Text style={styles.doneChipText}>Done</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {marginTop: RH(8)}]}>
        Search Delivery Partner
      </Text>
      <View style={styles.rowAlignCenter}>
        <Text style={styles.grayRow}>Next Date - 04/08/21</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.savePill}>
          <Text style={styles.savePillText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: RW(10)}}>
          <Text style={styles.linkText}>Remind</Text>
        </TouchableOpacity>
      </View>

      <SwipeAction
        title="Swipe to confirm delivery"
        subtitle="Slide right to mark delivery complete"
        completedText="Delivery marked"
        onComplete={() => {}}
        containerStyle={{marginTop: RH(16)}}
      />

      <Text style={styles.otpCenter}>OTP-0468</Text>
      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Delivery Partner Details</Text>
      <View style={styles.partnerRow}>
        <Image
          source={{uri: 'https://i.pravatar.cc/80₹img=5'}}
          style={styles.avatar}
        />
        <View style={{flex: 1}}>
          <Text style={styles.partnerName}>Suresh</Text>
          <Text style={styles.partnerPhone}>9123456780</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Done</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, {marginTop: RH(16)}]}>
        Feedback by Customer
      </Text>
      <View style={styles.rowAlignCenter}>
        {[0, 1, 2, 3].map(i => (
          <Icon
            key={i}
            name='star'
            size={SIZES.m}
            color={COLORS.warning}
            style={{marginRight: RW(4)}}
          />
        ))}
        <Icon
          name="star-o"
          size={SIZES.m}
          color={COLORS.warning}
          style={{marginRight: RW(6)}}
        />
        <Text style={styles.ratingText}>(4.0)</Text>
      </View>
      <Text style={styles.bodyText}>
        The delivery was on time and the clothes were perfectly ironed. Great
        service!
      </Text>
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
    paddingHorizontal: RW(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RH(12),
  },
  headerTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.l,
    color: COLORS.secondaryDark,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RH(6),
    marginBottom: RH(8),
  },
  sectionTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginTop: RH(10),
  },
  otpText: {
    fontFamily: FONTS.PB,
    color: COLORS.primaryDark,
    fontSize: SIZES.s,
  },
  itemCard: {
    backgroundColor: COLORS.white,
    borderRadius: RW(12),
    padding: RW(12),
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RW(12),
    flex: 1,
  },
  itemThumb: {
    width: RW(56),
    height: RW(56),
    borderRadius: RW(8),
    marginRight: RW(12),
    backgroundColor: COLORS.gray3,
  },
  itemTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginBottom: RH(2),
  },
  itemMeta: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
  },
  metaStrong: {
    fontFamily: FONTS.PM,
    color: COLORS.appGray,
  },
  dot: {color: COLORS.gray},
  offerText: {
    marginTop: RH(6),
    color: COLORS.success,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
  priceNow: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
  },
  priceWas: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
    textDecorationLine: 'line-through',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.borderGray,
    marginVertical: RH(10),
  },
  linkText: {
    color: COLORS.primaryDark,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    marginVertical: RH(4),
  },
  cardMenuBtn: {
    position: 'absolute',
    right: RW(10),
    top: RH(10),
    padding: RW(6),
  },
  remarksCard: {
    backgroundColor: COLORS.white,
    borderRadius: RW(12),
    padding: RW(12),
    marginTop: RH(12),
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginBottom: RH(6),
  },
  remarkText: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.appGray,
  },
  bodyText: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.appGray,
    marginTop: RH(8),
  },
  grayRow: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.appGray,
    marginVertical: RH(6),
  },
  toPay: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.sm,
    color: COLORS.secondaryDark,
  },
  dueAmount: {
    textAlign: 'center',
    color: COLORS.danger,
    fontFamily: FONTS.PB,
    fontSize: SIZES.sm,
    marginTop: RH(12),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.borderGray,
    marginVertical: RH(14),
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(10),
  },
  avatar: {
    width: RW(46),
    height: RW(46),
    borderRadius: RW(23),
    marginRight: RW(12),
    backgroundColor: COLORS.gray3,
  },
  partnerName: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.sm,
    color: COLORS.secondaryDark,
  },
  partnerPhone: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(8),
  },
  chipLabel: {
    fontFamily: FONTS.PM,
    fontSize: SIZES.s,
    color: COLORS.appGray,
    marginRight: RW(8),
  },
  grayChip: {
    paddingHorizontal: RW(10),
    paddingVertical: RH(4),
    backgroundColor: COLORS.gray3,
    borderRadius: RW(8),
    marginRight: RW(10),
  },
  chipText: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    color: COLORS.secondaryDark,
  },
  doneChip: {
    backgroundColor: COLORS.success,
    paddingHorizontal: RW(12),
    paddingVertical: RH(6),
    borderRadius: RW(8),
  },
  doneChipText: {
    color: COLORS.white,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(8),
  },
  savePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: RW(12),
    paddingVertical: RH(6),
    borderRadius: RW(16),
  },
  savePillText: {
    color: COLORS.darkBlack,
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
  },
  otpCenter: {
    textAlign: 'center',
    fontFamily: FONTS.PB,
    color: COLORS.secondaryDark,
    marginVertical: RH(14),
  },
  primaryBtn: {
    backgroundColor: COLORS.success,
    borderRadius: RW(10),
    paddingVertical: RH(12),
    alignItems: 'center',
    marginTop: RH(10),
  },
  primaryBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.PB,
    fontSize: SIZES.sm,
  },
  ratingText: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    color: COLORS.appGray,
  },
});




