import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { BasePage } from '../../base-page/BasePage';
import { Character } from '../../character/Character';
import { Healthbar } from '../../character/healthbar/Healthbar';
import { Inventory } from '../../inventory/InventoryBlock'; // Naudojame numatytąjį importą
import {
  ACCENT_COLOR,
  GREY_COLOR,
  LIGHER_GREY_COLOR,
} from '../../../utils/constants';

export const CharacterPage: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = useState(false);

  const toggleInventory = () => {
    setInventoryVisible(!inventoryVisible);
  };

  return (
    <View style={styles.container}>
      <BasePage>
        <TouchableOpacity onPress={toggleInventory}>
          <Image
            style={styles.inventoryButton}
            alt="inventory"
            source={require('../../../assets/ready-stock.png')}
          />
        </TouchableOpacity>
        <View></View>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Character />
          <View style={{ marginTop: 20 }}>
            <Healthbar />
          </View>
        </View>

        {inventoryVisible && (
          <View style={styles.inventoryContainer}>
            <Inventory onClose={toggleInventory} />
          </View>
        )}
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  inventoryButton: {
    width: 50,
    height: 50,
    top: 10,
    right: 170,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  characterContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  healthbarContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  inventoryContainer: {
    position: 'absolute',

    //width: '100%',
    //height: '50%',
    //backgroundColor: ACCENT_COLOR,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 250,
    top: 500,
    left: -175,
  },
});
