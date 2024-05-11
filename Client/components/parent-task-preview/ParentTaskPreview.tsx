import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LIGHER_GREY_COLOR } from "../../utils/constants";
import { BasePage } from "../base-page/BasePage";
import { Button } from "../buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { PreviewTask } from "../types/types";
import { styled } from "nativewind";
import { useCompleteTaskParent } from "../../api/supabase/queries/tasks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/navigations";
import { useQueryClient } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
const StyledView = styled(View);
const StyledText = styled(Text);
type TaskPreviewProps = {
  task: PreviewTask;
};

export const ParentTaskPreview: React.FC<TaskPreviewProps> = ({
  task: taskData,
}) => {
  const { completions, task } = taskData;
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const completeTask = useCompleteTaskParent();

  const handleTaskCompletion = (id: string) => {
    completeTask.mutate(
      {
        taskId: id,
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: ["GET_TASK_BY_ID", { id }],
          });
          navigation.goBack();
        },
      }
    );
  };

  const isPastCompletionDate =
    startOfDay(new Date()) > startOfDay(new Date(task.dueDate));

  return (
    <View style={styles.container}>
      <BasePage>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Atgal</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduoties aprašymas</Text>
          <Text style={styles.description}>{task.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduoties atlikimo taškai</Text>
          <StyledView className='flex flex-row gap-1 items-center'>
            <Image
              style={styles.bubble}
              alt='reward'
              source={require("../../assets/reward.png")}
            />
            <Text style={styles.description}>{task.points}</Text>
          </StyledView>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduočių atlikimai</Text>
          <StyledView className='flex flex-row gap-3'>
            <StyledView className='w-1/12'></StyledView>
            <StyledText className='w-1/4 font-bold text-lg'>Vardas</StyledText>
            <StyledText className='w-1/4 font-bold text-lg'>Vaikas</StyledText>
            <StyledText className='w-1/4 font-bold text-lg'>Tėvai</StyledText>
            <StyledText className='w-1/4 font-bold text-lg'></StyledText>
          </StyledView>
          <StyledView className='flex flex-col gap-3'>
            {completions.map((completion) => (
              <StyledView
                key={completion.childId}
                className='flex flex-row gap-3'
              >
                <StyledView className='w-1/12'>
                  <Image
                    style={styles.bubble}
                    alt='profile'
                    source={require("../../assets/profile.png")}
                  />
                </StyledView>
                <StyledText className='w-1/4' key={completion.childId}>
                  {completion.childName}
                </StyledText>
                <StyledText className='w-1/4'>
                  {completion.isConfirmedByChild ? "Atlikta" : "Neatlikta"}
                </StyledText>
                <StyledView className='w-1/4'>
                  <StyledText>
                    {completion.isConfirmedByParent ? "Atlikta" : "Neatlikta"}
                  </StyledText>
                  {!isPastCompletionDate &&
                    (completion.isConfirmedByChild ||
                      (!completion.isConfirmedByParent && (
                        <Button
                          onClick={() => handleTaskCompletion(completion.id)}
                          color='#000'
                        >
                          <StyledText style={{ color: "#fff" }}>
                            Patvirtinti
                          </StyledText>
                        </Button>
                      )))}
                </StyledView>
              </StyledView>
            ))}
          </StyledView>
        </View>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
  backText: {
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    paddingTop: 30,
  },
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  description: {
    fontSize: 20,
    color: LIGHER_GREY_COLOR,
    fontWeight: "400",
  },
  bubble: {
    width: 20,
    height: 20,
  },
  footer: {
    marginTop: 40,
  },
});
