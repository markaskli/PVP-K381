import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskForRoom, useGetTaskById } from "./taskQueries";
import { useNavigation } from "@react-navigation/native";
import {
  CreateTaskField,
  createTaskFormSchema,
  defaultCreateTaskFormValues,
} from "./model";
import { FormPage } from "../../base-page/FormPage";
import { BaseTextField } from "../../input/BaseTextField";
import { ACCENT_COLOR } from "../../../utils/constants";
import { BaseDatePicker } from "../../input/BaseDatePicker";
import { useGetRooms } from "../groups/groupsQueries";
import { BaseSelectionField } from "../../input/BaseSelectionField";
import { useAppContext } from "../../../contexts/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSignOut } from "../dashboard/dashboardQueries";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";

const StyledView = styled(View);

type TaskFormProps = {
  taskId?: string;
  refetch?: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ taskId, refetch }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const createTask = useCreateTaskForRoom();
  const { data: rooms } = useGetRooms();
  const methods = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: defaultCreateTaskFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const { data: task } = useGetTaskById(taskId);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (task) {
      setValue("group", task.assignedToRoomId);
      setValue("name", task.name);
      setValue("description", task.description);
      setValue("points", task.points.toString());
      setValue("dueDate", new Date(task.dueDate));
    }
  }, [task]);

  const roomOptions = useMemo(() => {
    if (!rooms) return [];
    return rooms.map((room) => ({ key: room.id, value: room?.name || "" }));
  }, [rooms]);

  const { changeIsLoggedIn } = useAppContext();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    signOut.mutate();
    await AsyncStorage.clear();
    changeIsLoggedIn(false);
    navigation.navigate("AuthenticationPage");
  };

  const getRoomOptionId = (value: string) => {
    return roomOptions.find((option) => option.value === value);
  };

  const submitForm = () => {
    const values = getValues();
    const { name, description, points, dueDate, group } =
      createTaskFormSchema.parse(values);
    const modifiedTask = {
      name,
      description,
      points,
      dueDate,
      assignToRoomId: getRoomOptionId(group).key,
    };

    createTask.mutate(
      {
        task: modifiedTask,
      },
      {
        onSuccess: async (res) => {
          navigation.goBack();
          refetch?.();
        },
        onError: async (res) => {
          if (res.message.includes("401")) {
            handleSignOut();
          }
          console.log(res.stack);
        },
      }
    );
  };

  return (
    <FormPage parentOrTeacher title='Sukurti užduotį'>
      <FormProvider {...methods}>
        <StyledView className='mb-5'>
          <StyledView className='mb-4'>
            <BaseSelectionField
              items={roomOptions}
              formField={CreateTaskField.GROUP}
              label={"Grupė"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.NAME}
              label={"Užduoties pavadinimas"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.DESCRIPTION}
              label={"Užduoties aprašymas"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseDatePicker
              formField={CreateTaskField.DUE_DATE}
              control={control}
              format='yyyy-MM-dd'
              className='mb-4'
              label={"Užduoties atlikimo data"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              type='numeric'
              formField={CreateTaskField.POINTS}
              label={"Atliktos užduoties taškai"}
            />
          </StyledView>
        </StyledView>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(submitForm)}
        >
          <Text style={styles.buttonText}>Sukurti</Text>
        </TouchableOpacity>
      </FormProvider>
    </FormPage>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  middleContainer: {
    maxWidth: 500,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
