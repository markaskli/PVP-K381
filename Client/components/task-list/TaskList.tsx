import React from "react";
import { View, SafeAreaView } from "react-native";
import { styled } from "nativewind";
import { CreatedTask } from "../../api/supabase/types";
import { Task } from "../task/Task";
const StyledView = styled(View);

type TaskListProps = {
  tasks: CreatedTask[];
  isStudent?: boolean;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isStudent = false,
}) => {
  console.log(tasks);
  return (
    <View>
      <StyledView className='flex flex-col gap-4'>
        {tasks?.map((task, id) => (
          <Task isStudent key={id} task={task} />
        ))}
      </StyledView>
    </View>
  );
};

export default Task;
