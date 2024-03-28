import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { CreatedTask } from "../../api/supabase/types";
import { LIGHER_GREY_COLOR } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";
const StyledText = styled(Text);

type TaskProps = {
  task: CreatedTask;
  isStudent?: boolean;
};

export const Task: React.FC<TaskProps> = ({ task, isStudent = false }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleTaskClick = () => {
    if (!isStudent) return;
    navigation.navigate("TaskPreview", { taskId: task.id.toString() });
  };

  return (
    <TouchableOpacity onPress={handleTaskClick} style={styles.element}>
      <StyledText className='font-bold text-lg'>{task.name}</StyledText>
      <Text style={styles.description}>{task.description}</Text>
      <Text>{task.points}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  element: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  description: {
    color: LIGHER_GREY_COLOR,
  },
  image: {
    width: 20,
  },
});
