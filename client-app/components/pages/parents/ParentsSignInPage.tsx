import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ACCENT_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ParentSignInField,
  defaultParentSignInFormValues,
  signInFormSchema,
} from "./modelSignIn";
import { BaseTextField } from "../../input/BaseTextField";
import { styled } from "nativewind";
import { useLoginParentOrTeacher } from "./authenticationQueries";
import cookie from "cookiejs";

const StyledView = styled(View);

export const ParentsSignInPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const methods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: defaultParentSignInFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const loginParent = useLoginParentOrTeacher();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const submitForm = () => {
    const values = getValues();
    const form = signInFormSchema.parse(values);

    loginParent.mutate(
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
    <FormPage title='Prisijungimas'>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleSubmit(submitForm);
        }}
        noValidate
      >
        <FormProvider {...methods}>
          <View style={styles.inputsContainer}>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={ParentSignInField.EMAIL}
                label={"El. paštas"}
                errorMessage={errors.email?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={ParentSignInField.PASSWORD}
                type='password'
                label={"Slaptažodis"}
                errorMessage={errors.password?.message}
              />
            </StyledView>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Prisijungti</Text>
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  inputsContainer: {
    marginBottom: 15,
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
