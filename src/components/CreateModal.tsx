import React, {useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import {GlobalContext} from '../context';
// import { socket } from '../utils';

const CreateGroupModal = () => {
  const context = useContext(GlobalContext);
  // const [text, onChangeText] = useState('');
  if (!context) {
    throw new Error('GlobalContext must be used within a GlobalState provider');
  }
  const {modalVisible, setModalVisible, currentGroupName, setCurrentGroupName} =
    context;

    const handleCreateNewRoom = () => {
      console.log('Current Group Name: ' + currentGroupName);
      // socket.emit('createNewGroup',currentGroupName);
      setModalVisible(false);
      setCurrentGroupName('');
      Keyboard.dismiss();
    }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredBackdrop}>
        <View style={styles.modalView}>
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.input}
              onChangeText={(value)=> setCurrentGroupName(value)}
              value={currentGroupName || ''}
              placeholder="Create A New Group"
              placeholderTextColor="#999"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={handleCreateNewRoom}
              >
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  centeredBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    minWidth: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonClose: {
    backgroundColor: '#D32F2F',
    marginLeft: 20,
  },
  buttonCreate: {
    backgroundColor: '#1976D2',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    minWidth: 220, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: 'white',
    color: '#000',
    borderRadius: 10,
  },
});

export default CreateGroupModal;
