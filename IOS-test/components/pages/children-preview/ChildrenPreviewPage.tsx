import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useAppContext } from "../../../contexts/appContext";
import { useGetParentChilds } from "../../../api/supabase/queries/childQueries";
import { ChildrenPreview } from "../../children-preview/ChildrenPreview";

type RootStackParamList = {
  ChildrenPreview: { childrenId: string }; // Define the parameter type for TaskEdit screen
};

type TaskPreviewScreenRouteProp = RouteProp<
  RootStackParamList,
  "ChildrenPreview"
>;

export const ChildrenPreviewPage = () => {
  const route = useRoute<TaskPreviewScreenRouteProp>();
  const { childrenId } = route.params || {};
  const { selectUser } = useAppContext();
  const { data: childs } = useGetParentChilds(selectUser.id);

  const selectedChild = useMemo(
    () => childs.find((child) => child.id === childrenId),
    [childs]
  );

  if (!selectedChild) return;
  return (
    <View>
      <ChildrenPreview children={selectedChild} />
    </View>
  );
};
