import React, {useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, RH, RW} from '../../theme';

interface OrderItem {
  id: string;
  customer: string;
  pickup: string;
  deliver: string;
  amount: number;
  status: 'New' | 'Delivery' | 'Delay/Rewash' | 'Complete';
}

const sampleOrders: OrderItem[] = [
  {
    id: '246810',
    customer: 'Manish Kumar',
    pickup: '05/02/20 05:00PM',
    deliver: '07/02/20 10:00AM',
    amount: 500,
    status: 'New',
  },
  {
    id: '8101214',
    customer: 'Rakesh Jaiswal',
    pickup: '08/02/20 08:00PM',
    deliver: '10/02/20 10:00AM',
    amount: 200,
    status: 'Delay/Rewash',
  },
  {
    id: '12151617',
    customer: 'Ajay Raj',
    pickup: '04/03/20 02:00PM',
    deliver: '05/03/20 06:00PM',
    amount: 400,
    status: 'Complete',
  },
  {
    id: '9911223',
    customer: 'Kiran Patel',
    pickup: '10/03/20 10:00AM',
    deliver: '12/03/20 10:00AM',
    amount: 350,
    status: 'Delivery',
  },
];

const FILTERS: OrderItem['status'][] = [
  'New',
  'Delivery',
  'Delay/Rewash',
  'Complete',
];

export default function OrdersDetails() {
  const [search, setSearch] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<OrderItem['status'] | 'All'>('All');
  const navigation = useNavigation();

  const filteredOrders = useMemo(() => {
    return sampleOrders.filter(order => {
      const matchText =
        order.id.includes(search) ||
        order.customer.toLowerCase().includes(search.toLowerCase());
      const matchFilter = activeFilter === 'All' || order.status === activeFilter;
      return matchText && matchFilter;
    });
  }, [search, activeFilter]);

  const renderOrder = ({item}: {item: OrderItem}) => {
    const statusColors: Record<OrderItem['status'], string> = {
      New: COLORS.primaryDark,
      Delivery: COLORS.primaryDark,
      'Delay/Rewash': COLORS.warning,
      Complete: COLORS.textGray,
    };

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('OrderDetails' as never)}>
        <View style={styles.cardLeft}>
          <Text style={styles.orderId}>#OrderID-{item.id}</Text>
          <Text style={styles.customer}>{item.customer}</Text>
          <Text style={styles.subText}>Pickup: {item.pickup}</Text>
          <Text style={styles.subText}>Deliver: {item.deliver}</Text>
        </View>
        <View style={styles.cardRight}>
          <View style={[styles.amountCircle, {borderColor: COLORS.primary}]}>
            <Text style={styles.amountText}>{'\u20B9'}{item.amount}</Text>
          </View>
          <Text style={[styles.statusText, {color: statusColors[item.status]}]}>
            {item.status}
          </Text>
          <Text style={styles.detailsLink}>Show details</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders Details</Text>
        <TouchableOpacity
          onPress={() => {
            /* hook up refresh when backend is ready */
          }}>
          <Ionicons name="refresh" size={24} color={COLORS.secondaryDark} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for Orders"
        placeholderTextColor={COLORS.textGray}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={order => order.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={filterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setFilterModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Orders</Text>
            {FILTERS.map(filter => (
              <TouchableOpacity
                key={filter}
                style={styles.filterOption}
                onPress={() => {
                  setActiveFilter(filter);
                  setFilterModalVisible(false);
                }}>
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && {color: COLORS.primaryDark},
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setActiveFilter('All');
                setFilterModalVisible(false);
              }}>
              <Text style={styles.clearText}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setFilterModalVisible(true)}>
        <Ionicons name="filter" size={24} color={COLORS.darkBlack} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const FAB_SIZE = RW(60);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RW(16),
    paddingVertical: RH(12),
  },
  headerTitle: {
    fontSize: RW(20),
    fontWeight: 'bold',
    color: COLORS.secondaryDark,
  },
  searchInput: {
    marginHorizontal: RW(16),
    marginBottom: RH(12),
    paddingHorizontal: RW(12),
    paddingVertical: RH(8),
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: RW(8),
    color: COLORS.secondaryDark,
  },
  listContainer: {
    paddingHorizontal: RW(16),
    paddingBottom: RH(100),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RW(12),
    padding: RW(16),
    marginBottom: RH(12),
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: RW(16),
    fontWeight: 'bold',
    color: COLORS.secondaryDark,
    marginBottom: RH(4),
  },
  customer: {
    fontSize: RW(14),
    color: COLORS.appGray,
    marginBottom: RH(8),
  },
  subText: {
    fontSize: RW(12),
    color: COLORS.appGray,
  },
  cardRight: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountCircle: {
    width: RW(60),
    height: RW(60),
    borderRadius: RW(30),
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RH(4),
  },
  amountText: {
    fontSize: RW(16),
    fontWeight: 'bold',
    color: COLORS.secondaryDark,
  },
  statusText: {
    fontSize: RW(14),
    fontWeight: '600',
    marginBottom: RH(4),
  },
  detailsLink: {
    fontSize: RW(12),
    color: COLORS.primaryDark,
  },
  fab: {
    position: 'absolute',
    bottom: RH(24),
    right: RW(24),
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: RW(12),
    padding: RW(16),
  },
  modalTitle: {
    fontSize: RW(18),
    fontWeight: 'bold',
    color: COLORS.secondaryDark,
    marginBottom: RH(12),
  },
  filterOption: {
    paddingVertical: RH(10),
  },
  filterText: {
    fontSize: RW(16),
    color: COLORS.secondary,
  },
  clearButton: {
    marginTop: RH(16),
    alignSelf: 'flex-end',
  },
  clearText: {
    fontSize: RW(14),
    color: COLORS.danger,
  },
});
