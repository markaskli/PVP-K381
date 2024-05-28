import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const fruits = ['Obuolys', 'Vyšnia', 'Kriausė'];
interface InventoryProps {
  onClose: () => void;
}
export const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Inventory</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Image
          style={styles.closeButtonImage}
          source={require('../../assets/close-button.png')}
        />
      </TouchableOpacity>
      {fruits.map((fruit, index) => (
        <Text key={index} style={styles.item}>
          {fruit}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    padding: 10,
    backgroundColor: '#green',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    width: 400,
    height: 250,
    left: 25,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  closeButtonImage: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
  },
});
