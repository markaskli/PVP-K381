import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { styled } from "nativewind";
import { CreatedTask } from "../../api/supabase/types";
import { LIGHER_GREY_COLOR } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";
import { StatusLabel } from "../status-label/StatusLabel";
import { startOfDay } from "date-fns";
const StyledText = styled(Text);
const StyledView = styled(View);

type TaskProps = {
  task: CreatedTask;
  isStudent?: boolean;
};

export const Task: React.FC<TaskProps> = ({ task, isStudent = false }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleTaskClick = () => {
    if (!isStudent) {
      navigation.navigate("ParentTaskPreview", {
        taskId: task.taskId.toString(),
      });
      return;
    }
    navigation.navigate("TaskPreview", { taskId: task.id.toString() });
  };

  const isPastCompletion = startOfDay(new Date()) > startOfDay(task.dueDate);
  return (
    <TouchableOpacity
      onPress={handleTaskClick}
      style={[styles.element, { opacity: isPastCompletion ? 0.5 : 1 }]}
    >
      <StyledText className='w-1/4 font-bold text-md'>
        {task.taskName.length > 20
          ? `${task.taskName.slice(0, 20)}...`
          : task.taskName}
      </StyledText>
      <StyledText className='w-1/4' style={styles.description}>
        {task.description.length > 20
          ? `${task.description.slice(0, 20)}...`
          : task.description}
      </StyledText>
      <StyledView className='w-1/4'>
        <StatusLabel isFinished={task.isFinished} />
      </StyledView>
      <StyledView className='flex flex-col justify-center items-center w-1/6'>
        <Image
          style={styles.image}
          alt='reward'
          source={require("../../assets/reward.png")}
        />
        <StyledText>{task.points}</StyledText>
      </StyledView>
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
    objectFit: "contain",
  },
});
