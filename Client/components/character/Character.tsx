import React from "react";

import { StyleSheet, Image } from "react-native";
import { useGetChildHeroes } from "../../api/supabase/queries/heroesQueries";

type CharacterProps = {
  character: any;
};

export const Character: React.FC<CharacterProps> = ({ character }) => {
  if (!character)
    return (
      <Image
        style={styles.noCharacterImage}
        source={require("../../assets/RabbitPortrait.png")}
      />
    );

  return (
    <Image
      style={styles.image}
      alt='reward'
      source={{ uri: character.heroPng }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
  noCharacterImage: {
    width: 90,
    height: 90,
    opacity: 0.4,
  },
});
