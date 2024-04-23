import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormPage } from "../../../base-page/FormPage";
import { styled } from "nativewind";
import { ACCENT_COLOR } from "../../../../utils/constants";
import { useCreateTask } from "./createTaskQueries";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTaskField,
  createTaskFormSchema,
  defaultCreateTaskFormValues,
} from "./model";
import { BaseTextField } from "../../../input/BaseTextField";
import { useQueryClient } from "@tanstack/react-query";

const StyledView = styled(View);

const queryClient = useQueryClient();

export const CreateTask: React.FC<{ navigation: any }> = ({ navigation }) => {
  const createTask = useCreateTask();
  const methods = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: defaultCreateTaskFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const submitForm = () => {
    const values = getValues();
    const form = createTaskFormSchema.parse(values);

    createTask.mutate(
      {
        task: form,
      },
      {
        onSuccess: async (res) => {
          queryClient.invalidateQueries({ queryKey: ["GET_TASKS_BY_USER"] });
          navigation.navigate("Dashboard");
        },
      }
    );
  };

  return (
    <FormPage parentOrTeacher title='Sukurti užduotį'>
      <form>
        <FormProvider {...methods}>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.GROUP}
              label={"Grupė"}
              errorMessage={errors.group?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.NAME}
              label={"Užduoties pavadinimas"}
              errorMessage={errors.name?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.DESCRIPTION}
              label={"Užduoties aprašymas"}
              errorMessage={errors.description?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            {/* <BaseDatePicker
              formField={CreateTaskField.DUE_DATE}
              control={control}
              format='yyyy-MM-dd'
              className='mb-4'
              label={"Užduoties atlikimo data"}
              errorMessage={errors.dueDate?.message}
            /> */}
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={CreateTaskField.POINTS}
              label={"Atliktos užduoties taškai"}
              errorMessage={errors.points?.message}
            />
          </StyledView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Sukurti</Text>
          </TouchableOpacity>
        </FormProvider>
      </form>
    </FormPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  bubbleContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  inlineWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
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
  bubble: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#232222",
    textAlign: "left",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
