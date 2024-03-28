import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { GroupForm } from "./GroupForm";

type RootStackParamList = {
  GroupEdit: { groupId: string }; // Define the parameter type for TaskEdit screen
};

type GroupEditScreenRouteProp = RouteProp<RootStackParamList, "GroupEdit">;

export const GroupPage = () => {
  const route = useRoute<GroupEditScreenRouteProp>();
  const { groupId } = route.params || {};

  return (
    <View>
      <GroupForm groupId={groupId} />
    </View>
  );
};
