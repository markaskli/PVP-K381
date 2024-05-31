import React from "react";

import { View } from "react-native";
import { Character } from "../Character";
import { Healthbar } from "../healthbar/Healthbar";
import { useGetChildHeroes } from "../../../api/supabase/queries/heroesQueries";

export const CharacterBlock: React.FC = () => {
  const { data: childHeroes, refetch } = useGetChildHeroes();

  return (
    <View
      style={{
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          width: "40%",
        }}
      >
        <Character character={childHeroes?.[0] || null} />
        {childHeroes?.length && (
          <Healthbar health={childHeroes?.[0].health || 0} />
        )}
      </View>
    </View>
  );
};
