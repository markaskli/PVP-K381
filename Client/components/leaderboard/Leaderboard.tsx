import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import {
  COMPLEMENTARY_COLOR,
  DARK_COMPLEMENTARY_COLOR,
  PRIMARY_COLOR,
} from "../../utils/constants";
import { useGetGlobalLeaderboard } from "../../api/supabase/queries/leaderboardQueries";
import { BasePage } from "../base-page/BasePage";

export const Leaderboard: React.FC = () => {
  const { data: globalLeaderboard } = useGetGlobalLeaderboard();

  return (
    <View style={style.container}>
      <BasePage>
        <Text style={{ fontWeight: "800", fontSize: 36, marginBottom: 20 }}>
          Bendra lyderių lentelė
        </Text>
        <ScrollView horizontal>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              flex: 1,
              width: "100%",
              gap: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text style={{ width: 40 }}>Vieta</Text>
              <Text style={{ width: 180 }}>Vartotojas</Text>
              <Text style={{ width: 50 }}>Taškai</Text>
            </View>
            {globalLeaderboard?.slice(0, 5).map((rank, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  padding: 10,
                  ...(index % 2 === 0 && {
                    backgroundColor: "lightgrey",
                    borderRadius: 10,
                  }),
                }}
              >
                <Text style={{ fontWeight: "700", width: 40 }}>
                  {rank.rank}
                </Text>
                <Text style={{ width: 180 }}>{rank.childId.slice(0, 20)}</Text>
                <Text style={{ width: 50 }}>{rank.points}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </BasePage>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: COMPLEMENTARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: DARK_COMPLEMENTARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  groupButtonText: {
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  createButtonText: {
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
