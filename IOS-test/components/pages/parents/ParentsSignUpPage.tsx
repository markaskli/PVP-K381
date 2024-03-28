import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ParentSignUpField,
  defaultParentSignUpFormValues,
  signUpFormSchema,
} from "./modelSignUp";
import { styled } from "nativewind";
import { useRegisterParent } from "./authenticationQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../input/BaseTextField";
import { BaseDatePicker } from "../../input/BaseDatePicker";

const StyledView = styled(View);

export const ParentsSignUpPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const registerParent = useRegisterParent();
  const methods = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: defaultParentSignUpFormValues,
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
    const { repeatPassword, ...form } = signUpFormSchema.parse(values);

    registerParent.mutate(
      {
        userInformation: form,
      },
      {
        onSuccess: async (res) => {
          await AsyncStorage.setItem("token", res.token);
          const { name, surname, email, id, roleId } = res;
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ name, surname, email, id, roleId })
          );
        },
      }
    );
  };

  return (
    <FormPage title={"Registracija"}>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleSubmit(submitForm);
        }}
        noValidate
      >
        <FormProvider {...methods}>
          <View style={styles.inlineWrapper}>
            <BaseTextField
              control={control}
              formField={ParentSignUpField.NAME}
              label={"Vardas"}
              errorMessage={errors.name?.message}
            />
            <BaseTextField
              control={control}
              formField={ParentSignUpField.SURNAME}
              label={"Pavardė"}
              errorMessage={errors.surname?.message}
            />
          </View>

          <View style={styles.inlineWrapper}>
            <BaseTextField
              control={control}
              formField={ParentSignUpField.EMAIL}
              label={"El. paštas"}
              errorMessage={errors.email?.message}
            />
            <BaseTextField
              control={control}
              formField={ParentSignUpField.PHONE_NUMBER}
              label={"Telefono numeris"}
              errorMessage={errors.phoneNumber?.message}
            />
          </View>
          <StyledView className='mb-4'>
            {/* <BaseDatePicker
              name={ParentSignUpField.BIRTH_DATE}
              control={control}
              className='mb-4'
              label={"Gimimo data"}
            /> */}
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              type='password'
              formField={ParentSignUpField.PASSWORD}
              label={"Slaptažodis"}
              errorMessage={errors.password?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              type='password'
              formField={ParentSignUpField.REPEAT_PASSWORD}
              label={"Pakartokite slaptažodį"}
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
    marginBottom: 20,
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
