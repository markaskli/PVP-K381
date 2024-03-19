import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cookie from "cookiejs";
import { styled } from "nativewind";
import {
  TeacherSignUpField,
  defaultTeacherSignUpFormValues,
  signUpFormSchema,
} from "./modelSignUp";
import { useRegisterTeaher } from "./authenticationQueries";
import { BaseTextField } from "../../input/BaseTextField";
import { BaseDatePicker } from "../../input/BaseDatePicker";

const StyledView = styled(View);

export const TeachersSignUpPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const methods = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: defaultTeacherSignUpFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const registerTeacher = useRegisterTeaher();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const submitForm = () => {
    const values = getValues();
    const { repeatPassword, ...form } = signUpFormSchema.parse(values);

    registerTeacher.mutate(
      {
        userInformation: form,
      },
      {
        onSuccess: (res) => {
          cookie("token", res.token, 1);
        },
      }
    );
  };
  return (
    <FormPage title='Registracija'>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleSubmit(submitForm);
        }}
        noValidate
      >
        <FormProvider {...methods}>
          <View style={styles.middleContainer}>
            <Text style={styles.title}>Registracija</Text>
          </View>
          <View style={styles.inlineWrapper}>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={TeacherSignUpField.NAME}
                label={"Vardas"}
                errorMessage={errors.name?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={TeacherSignUpField.SURNAME}
                label={"Pavardė"}
                errorMessage={errors.surname?.message}
              />
            </StyledView>
          </View>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={TeacherSignUpField.EMAIL}
              label={"El. paštas"}
              errorMessage={errors.email?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={TeacherSignUpField.PHONE_NUMBER}
              label={"Telefono numeris"}
              errorMessage={errors.phoneNumber?.message}
            />
          </StyledView>
          <View style={styles.inlineWrapper}>
            <StyledView className='mb-4'>
              <BaseDatePicker
                formField={TeacherSignUpField.BIRTH_DATE}
                control={control}
                format='yyyy-MM-dd'
                className='mb-4'
                label={"Gimimo data"}
                errorMessage={errors.birthDate?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={TeacherSignUpField.SCHOOL}
                label={"Mokykla"}
                errorMessage={errors.school?.message}
              />
            </StyledView>
          </View>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={TeacherSignUpField.PASSWORD}
              label={"Slaptažodis"}
              type='password'
              errorMessage={errors.password?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={TeacherSignUpField.REPEAT_PASSWORD}
              label={"Pakartokite slaptažodį"}
              type='password'
              errorMessage={errors.repeatPassword?.message}
            />
          </StyledView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Registruotis</Text>
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
    backgroundColor: PRIMARY_COLOR,
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
