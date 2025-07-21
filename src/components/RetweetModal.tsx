import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const RetweetModal = ({
  isVisible,
  onClose,
  onRetweet
}: {
  isVisible: any;
  onClose: any;
  onRetweet: any;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#E8DBFF', // Added border color
          shadowColor: '#E8DBFF', // Added shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.5, // Shadow opacity
          shadowRadius: 3.84, // Shadow radius
          elevation: 5, // For Android shadow
        }}
      >
        <Text
          style={{
            fontSize: 14,
            marginBottom: 10,
            color: "black",
            textAlign: "center",
          }}
        >
          Are you sure you want to retweet this tweet?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{ 
              flex: 1, 
              marginRight: 5,
              borderWidth: 1, 
              borderColor: '#E8DBFF', 
              shadowColor: '#E8DBFF', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.5, 
              shadowRadius: 3.84, 
              elevation: 5,
            }}
          >
            <Text
              style={{ fontSize: 16, color: 'red', textAlign: 'center' }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRetweet}
            style={{ 
              flex: 1, 
              marginLeft: 5,
              borderWidth: 1, 
              borderColor: '#E8DBFF', 
              shadowColor: '#E8DBFF', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.5,
              shadowRadius: 3.84, 
              elevation: 5, 
            }}
          >
            <Text
              style={{ fontSize: 16, color: 'green', textAlign: 'center' }}
            >
              Retweet
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RetweetModal;
