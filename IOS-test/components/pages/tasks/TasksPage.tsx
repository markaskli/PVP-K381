import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useGetTasksByUser } from "./tasksQueries";
import { CreatedTask } from "../../../api/supabase/types";
import { Task } from "../../task/Task";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";

const StyledView = styled(TouchableOpacity);

type TasksPageProps = {
  userId: string;
};

export const TasksPage: React.FC<TasksPageProps> = ({ userId }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: tasks } = useGetTasksByUser(userId);
  if (!tasks) return;
  return (
    <View>
      {tasks.map((task: CreatedTask) => (
        <StyledView
          onPress={() =>
            navigation.navigate("Task", { taskId: task.id.toString() })
          }
          className='mb-4'
          key={task.id}
        >
          <Task task={task} />
        </StyledView>
      ))}
    </View>
  );
};
