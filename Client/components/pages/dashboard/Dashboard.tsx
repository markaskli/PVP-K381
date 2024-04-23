import React, { useEffect, useState } from "react";
import { TasksPage } from "../tasks/TasksPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BasePage } from "../../base-page/BasePage";
import { DashboardNavbar } from "./DashboardNavbar";
import { RoomFilter } from "../../room-filter/RoomFilter";

export const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) return;
      setUserId(JSON.parse(user).id);
    };
    checkAuthentication();
  }, []);

  if (!userId) return;

  return (
    <View>
      <DashboardNavbar />
      <BasePage>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Užduotys</Text>
          <Text
            onPress={() => navigation.navigate("Task")}
            style={{ fontSize: 24 }}
          >
            +
          </Text>
        </View>
        <View>
          <RoomFilter />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 400 }}>
          <TasksPage userId={userId} />
        </ScrollView>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  header: {
    fontSize: 42,
    fontWeight: "900",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
