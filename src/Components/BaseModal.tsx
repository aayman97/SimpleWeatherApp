import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  testID: string;
};

const BaseModal = ({
  modalVisible,
  setModalVisible,
  children,
  testID,
}: props) => {
  return (
    <Modal
      testID={testID}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior="height">
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Modal Content */}
        {children}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BaseModal;
