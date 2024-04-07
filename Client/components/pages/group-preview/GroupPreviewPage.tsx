import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useGetRoomById } from "../groups/groupsQueries";
import { GroupPreview } from "../../group-preview/GroupPreview";

type RootStackParamList = {
  GroupPreview: { groupId: string };
};

type GorupPreviewScreenRouteProp = RouteProp<
  RootStackParamList,
  "GroupPreview"
>;

export const GroupPreviewPage = () => {
  const route = useRoute<GorupPreviewScreenRouteProp>();
  const { groupId } = route.params || {};

  const { data: group } = useGetRoomById(groupId);
  if (!group) return;
  return (
    <View>
      <GroupPreview group={group} />
    </View>
  );
};
