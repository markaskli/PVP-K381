import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LIGHER_GREY_COLOR, PRIMARY_COLOR } from "../../utils/constants";
import { BasePage } from "../base-page/BasePage";
import { Button } from "../buttons/Button";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { PreviewTask } from "../types/types";
import { useCompleteTaskChild } from "../../api/supabase/queries/tasks";
import { StatusLabel } from "../status-label/StatusLabel";
import { format, startOfDay } from "date-fns";
import { useAppContext } from "../../contexts/appContext";

const StyledView = styled(View);

type TaskPreviewProps = {
  task: PreviewTask;
};

export const TaskPreview: React.FC<TaskPreviewProps> = ({ task: taskData }) => {
  const { task } = taskData;
  const navigation = useNavigation();
  const { modifyPoints } = useAppContext();

  const completeTask = useCompleteTaskChild();

  const showAlert = ({ title, message }: { title: string; message: string }) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Uždaryti",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const isPastCompletionDate =
    startOfDay(new Date()) > startOfDay(new Date(task.dueDate));

  const handleTaskCompletion = () => {
    if (isPastCompletionDate) return;
    completeTask.mutate(
      {
        taskId: task.id.toString(),
      },
      {
        onSuccess: () => {
          console.log("success");
          showAlert({
            title: "Užduotis atlikta sėkmingai",
            message:
              "Užduotis atlikta sėkmingai. Šią užduotį turi patvirtinti ir grupės atstovas.",
          });
          modifyPoints(taskData.task.points);
        },
        onError: (res) => {
          console.log(res);
          showAlert({
            title: "Užduotis jau patvirtinta!",
            message: "Palaukite kol grupės atstovas ją patvirtins.",
          });
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <BasePage>
        <StyledView className='flex flex-row justify-between'>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Atgal</Text>
          </TouchableOpacity>
          <StyledView>
            <StatusLabel isFinished={task.isFinished} />
          </StyledView>
        </StyledView>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduoties aprašymas</Text>
          <StyledView className='flex flex-row gap-1 items-center'>
            <Image
              style={styles.image}
              source={require("../../assets/task.png")}
            />
            <Text style={styles.description}>{task.name}</Text>
          </StyledView>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduoties atlikimo taškai</Text>
          <StyledView className='flex flex-row gap-1 items-center'>
            <Image
              style={styles.image}
              source={require("../../assets/reward.png")}
            />
            <Text style={styles.description}>{task.points}</Text>
          </StyledView>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Užduoties atlikimo terminas</Text>
          <StyledView className='flex flex-row gap-1 items-center'>
            <Image
              style={styles.image}
              source={require("../../assets/clock.png")}
            />
            <Text style={styles.description}>
              {format(new Date(task.dueDate), "yyyy-MM-dd")}
            </Text>
          </StyledView>
        </View>
        {!task.isFinished && (
          <View style={styles.footer}>
            <Button
              disabled={isPastCompletionDate}
              onClick={handleTaskCompletion}
              color={PRIMARY_COLOR}
            >
              <Text>Atlikti užduotį</Text>
            </Button>
          </View>
        )}
        {!task.isFinished && isPastCompletionDate && (
          <StyledView className='flex flex-row gap-1 mt-2 items-center'>
            <Image
              style={styles.image}
              source={require("../../assets/info.png")}
            />
            <Text>
              Užduotis negali būti užfiksuota kaip baigta dėl pasibaigusio
              termino.
            </Text>
          </StyledView>
        )}
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
  footer: {
    marginTop: 40,
  },
  image: {
    width: 20,
    height: 20,
    objectFit: "contain",
  },
});
