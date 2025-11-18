import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {COLORS} from '../../theme/colors';
import {FONTS, SIZES, RH, RW} from '../../theme/fonts';

type Partner = {
  id: string;
  name: string;
  phone: string;
  avatarUri?: string | null;
};

// Sample data; replace avatar URIs with real images
const partners: Partner[] = [
  {id: '1', name: 'Aarav Sharma', phone: '+91 9876543210', avatarUri: null},
  {id: '2', name: 'Priya Mehta', phone: '+91 9876543211', avatarUri: null},
  {id: '3', name: 'Vikram Singh', phone: '+91 9876543212', avatarUri: null},
  {id: '4', name: 'Rahul Raj', phone: '+91 9876543213', avatarUri: null},
];

type ChatNav = NavigationProp<{ChatInbox: {partner: Partner}}>;

const ChatHome = () => {
  const navigation = useNavigation<ChatNav>();

  const renderPartner = ({item}: {item: Partner}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ChatInbox', {partner: item})}>
      <View style={styles.avatarContainer}>
        {item.avatarUri ? (
          <Image
            source={{uri: item.avatarUri}}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Icon name="user" size={SIZES.xl} color={COLORS.secondary} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>Phone no. - {item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={partners}
      renderItem={renderPartner}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={SIZES.l}
              color={COLORS.secondaryDark}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Help the Doorstep Partner</Text>
        </View>
      }
    />
  );
};

export default ChatHome;

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
    marginBottom: RH(24),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.PB,
    fontSize: SIZES.l,
    color: COLORS.secondaryDark,
    marginRight: RW(24), // balance back-arrow width
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight0,
    borderRadius: RH(12),
    padding: RH(12),
    marginBottom: RH(12),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    width: RW(50),
    height: RW(50),
    borderRadius: RW(25),
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RW(12),
    backgroundColor: COLORS.white,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: RW(25),
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondaryDark,
    marginBottom: RH(4),
  },
  phone: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.textGray,
  },
});
