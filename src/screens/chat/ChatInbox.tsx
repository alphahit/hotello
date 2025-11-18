import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../theme/colors';
import {FONTS, RH, RW, SIZES} from '../../theme/fonts';

type DeliveryPartner = {
  id: string;
  name: string;
  phone: string;
  avatarUri?: string | null;
};

type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  fromMe: boolean;
  status?: 'read' | 'sent';
};

type ChatInboxRoute = RouteProp<{ChatInbox: {partner: DeliveryPartner}}, 'ChatInbox'>;
type ChatInboxNav = NavigationProp<{ChatInbox: {partner: DeliveryPartner}}>;

const QUICK_REPLIES = ["I've arrived", 'Running late'];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "I'm arriving now, I'll be there in 2 minutes.",
    timestamp: '10:30 AM',
    fromMe: true,
    status: 'read',
  },
  {
    id: '2',
    text: "Okay, I'm at the front door.",
    timestamp: '10:31 AM',
    fromMe: false,
  },
  {
    id: '3',
    text: 'Perfect, I see you.',
    timestamp: '10:31 AM',
    fromMe: true,
    status: 'read',
  },
];

const ChatInbox = () => {
  const navigation = useNavigation<ChatInboxNav>();
  const route = useRoute<ChatInboxRoute>();
  const partner = route.params.partner;
  const [inputValue, setInputValue] = useState('');
  const [messages] = useState<ChatMessage[]>(initialMessages);

  const renderMessage = ({item}: ListRenderItemInfo<ChatMessage>) => {
    const bubbleStyle = item.fromMe
      ? [styles.bubble, styles.myBubble]
      : [styles.bubble, styles.theirBubble];
    const containerStyle = item.fromMe
      ? [styles.messageRow, styles.myMessageRow]
      : [styles.messageRow, styles.theirMessageRow];
    return (
      <View style={containerStyle}>
        {!item.fromMe && partner.avatarUri ? (
          <Image source={{uri: partner.avatarUri}} style={styles.inlineAvatar} />
        ) : null}
        <View>
          <View style={bubbleStyle}>
            <Text
              style={
                item.fromMe
                  ? styles.messageText
                  : [styles.messageText, styles.messageTextAlt]
              }>
              {item.text}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {item.fromMe ? (
              <MaterialIcons
                name="done-all"
                size={RW(14)}
                color={COLORS.primary}
                style={styles.metaIcon}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={RW(16)}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          {partner.avatarUri ? (
            <Image source={{uri: partner.avatarUri}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitials}>
                {partner.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.headerName}>{partner.name}</Text>
        </View>
        <TouchableOpacity style={styles.callButton} activeOpacity={0.85}>
          <MaterialIcons name="call" size={RW(16)} color={COLORS.primaryDark} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.quickReplies}>
        {QUICK_REPLIES.map((label, index) => (
          <TouchableOpacity
            key={label}
            style={[styles.chip, index > 0 && styles.chipSpacing]}
            activeOpacity={0.85}>
            <Text style={styles.chipText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
          <MaterialIcons name="add" size={RW(20)} color={COLORS.secondary} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type your message"
          placeholderTextColor={COLORS.textGray}
          style={styles.textInput}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
          <MaterialIcons
            name="insert-photo"
            size={RW(20)}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.9}>
          <MaterialIcons name="send" size={RW(20)} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatInbox;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.collpasableGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RH(16),
    paddingVertical: RH(12),
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: RW(12),
  },
  avatar: {
    width: RH(40),
    height: RH(40),
    borderRadius: RH(20),
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.primaryLight0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.s,
    color: COLORS.primaryDark,
  },
  headerName: {
    marginLeft: RW(12),
    fontFamily: FONTS.PB,
    fontSize: SIZES.m,
    color: COLORS.secondary,
  },
  callButton: {
    width: RH(32),
    height: RH(32),
    borderRadius: RH(16),
    backgroundColor: COLORS.primaryLight0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    paddingHorizontal: RH(16),
    paddingBottom: RH(16),
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: RH(12),
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: RW(16),
    paddingVertical: RH(10),
    borderRadius: RH(16),
  },
  myBubble: {
    backgroundColor: COLORS.primaryDark,
    borderBottomRightRadius: RH(4),
  },
  theirBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: RH(4),
  },
  messageText: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.white,
  },
  messageTextAlt: {
    color: COLORS.secondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RH(4),
  },
  metaIcon: {
    marginLeft: RW(4),
  },
  timestamp: {
    fontFamily: FONTS.PR,
    fontSize: SIZES.xs,
    color: COLORS.textGray,
  },
  inlineAvatar: {
    width: RH(32),
    height: RH(32),
    borderRadius: RH(16),
    marginRight: RW(8),
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: RH(16),
    paddingBottom: RH(8),
  },
  chip: {
    backgroundColor: COLORS.primaryLight0,
    paddingHorizontal: RW(14),
    paddingVertical: RH(6),
    borderRadius: RH(16),
  },
  chipSpacing: {
    marginLeft: RW(8),
  },
  chipText: {
    fontFamily: FONTS.PB,
    fontSize: SIZES.xs,
    color: COLORS.secondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RH(12),
    paddingVertical: RH(10),
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderGray,
  },
  iconButton: {
    width: RH(32),
    height: RH(32),
    borderRadius: RH(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: RW(8),
    paddingVertical: RH(8),
    fontFamily: FONTS.PR,
    fontSize: SIZES.s,
    color: COLORS.secondary,
  },
  sendButton: {
    width: RH(40),
    height: RH(40),
    borderRadius: RH(20),
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RW(6),
  },
});
