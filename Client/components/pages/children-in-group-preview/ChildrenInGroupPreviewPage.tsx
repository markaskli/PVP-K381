import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useAppContext } from "../../../contexts/appContext";
import { useGetParentChilds } from "../../../api/supabase/queries/childQueries";
import { ChildrenInGroupPreview } from "../../children-in-group-preview/ChildrenInGroupPreview";
import { useRemoveChildFromGroup } from "../../../api/supabase/queries/groupQueries";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ChildrenInGroupPreview: { childId: string; userId: string }; // Define the parameter type for TaskEdit screen
};

type ChildrenPreviewInGroupScreenRouteProp = RouteProp<
  RootStackParamList,
  "ChildrenInGroupPreview"
>;

export const ChildrenInGroupPage = () => {
  const route = useRoute<ChildrenPreviewInGroupScreenRouteProp>();
  const { childId, userId } = route.params || {};
  const { selectUser } = useAppContext();
  const removeChild = useRemoveChildFromGroup();
  const { data: childs } = useGetParentChilds(selectUser.id);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectedChild = useMemo(() => {
    return childs?.find((child) => child.id === childId);
  }, [childs]);

  const handleChildDeletion = () => {
    removeChild.mutate(
      {
        information: {
          childId,
          userId,
        },
      },
      {
        onSuccess: () => {
          console.log("deletion success");
          // navigation.navigate("GroupPreview", {})
        },
        onError: (res) => {
          console.log(res);
        },
      }
    );
  };

  if (!selectedChild) return;
  return (
    <View>
      <ChildrenInGroupPreview
        children={selectedChild}
        removeChild={handleChildDeletion}
      />
    </View>
  );
};
