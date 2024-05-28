import React from 'react';

import { View } from 'react-native';
import { Character } from '../Character';
import { Healthbar } from '../healthbar/Healthbar';

export const CharacterBlock: React.FC = () => {
  return (
    <View
      style={{
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 15,
          width: '40%',
        }}
      >
        <Character />
        <Healthbar />
      </View>
    </View>
  );
};
