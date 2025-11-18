import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/colors';
import { FONTS, SIZES, RH, RW, RHA } from '../../theme/fonts';

const Home = () => {
  const [isOrderAcceptEnabled, setIsOrderAcceptEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header: Toggle + Notification */}
      <View style={styles.header}>
        <Text style={styles.headerText}>New Order Accept</Text>
        <View style={styles.headerActions}>
          <Switch
            value={isOrderAcceptEnabled}
            onValueChange={setIsOrderAcceptEnabled}
            trackColor={{ true: COLORS.primaryDark, false: COLORS.borderGray }}
            thumbColor={isOrderAcceptEnabled ? COLORS.primary : COLORS.white}
          />
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell-o" size={SIZES.l} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Orders */}
      <Text style={styles.sectionTitle}>Today's Orders</Text>
      <View style={styles.orderRow}>
        <View style={styles.orderCard}>
          <Text style={styles.cardTitle}>Pickup</Text>
          <Text style={styles.cardSubtitle}>
            No. of Orders: <Text style={styles.cardSubtitleBold}>20</Text>
          </Text>
          <Text style={styles.cardAmount}>₹10,000</Text>
        </View>
        <View style={styles.orderCard}>
          <Text style={styles.cardTitle}>Delivery</Text>
          <Text style={styles.cardSubtitle}>
            No. of Orders: <Text style={styles.cardSubtitleBold}>15</Text>
          </Text>
          <Text style={styles.cardAmount}>₹8,000</Text>
        </View>
      </View>

      {/* This Week */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekChartPlaceholder}>
        <Text style={styles.placeholderText}>Weekly chart will be displayed here.</Text>
      </View>

      {/* This Month */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>This Month</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.monthSummaryRow}>
        <View style={styles.monthCard}>
          <View style={styles.monthCardHeader}>
            <Icon name="check-circle" size={SIZES.m} color={COLORS.success} />
            <Text style={styles.monthCardTitle}>24</Text>
          </View>
          <Text style={styles.monthCardSubtitle}>Pickup</Text>
          <Text style={styles.monthCardAmount}>₹20,000</Text>
        </View>
        <View style={styles.monthCard}>
          <View style={styles.monthCardHeader}>
            <Icon name="check-circle" size={SIZES.m} color={COLORS.success} />
            <Text style={styles.monthCardTitle}>500</Text>
          </View>
          <Text style={styles.monthCardSubtitle}>Delivery</Text>
          <Text style={styles.monthCardAmount}>₹50,000</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  contentContainer: {
    padding: RH(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RH(24),
  },
  headerText: {
    fontFamily: FONTS.PM,
    fontSize: SIZES.sm,
    color: COLORS.secondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: RW(12),
  },
  sectionTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.l,
    color: COLORS.secondaryDark,
    marginBottom: RH(12),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RH(24),
  },
  orderCard: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RH(12),
    padding: RH(16),
    marginHorizontal: RW(4),
  },
  cardTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginBottom: RH(4),
  },
  cardSubtitle: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
  },
  cardSubtitleBold: {
    fontFamily: FONTS.PB,
    color: COLORS.textGray,
  },
  cardAmount: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginTop: RH(8),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RH(12),
  },
  viewAll: {
    fontFamily: FONTS.PM,
    fontSize: SIZES.s,
    color: COLORS.primaryDark,
  },
  weekChartPlaceholder: {
    height: RH(120),
    backgroundColor: COLORS.collpasableGray,
    borderRadius: RH(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RH(24),
  },
  placeholderText: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
  },
  monthSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RH(12),
    padding: RH(16),
    alignItems: 'center',
    marginHorizontal: RW(4),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  monthCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RH(4),
  },
  monthCardTitle: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginLeft: RW(4),
  },
  monthCardSubtitle: {
    fontFamily: FONTS.PM,
    fontSize: SIZES.s,
    color: COLORS.textGray,
    marginBottom: RH(4),
  },
  monthCardAmount: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.sm,
    color: COLORS.secondaryDark,
  },
});
