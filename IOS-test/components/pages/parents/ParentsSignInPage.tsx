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
import { styled } from "nativewind";
import { useLoginParentOrTeacher } from "./authenticationQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../input/BaseTextField";
import { useAppContext } from "../../../contexts/appContext";

const StyledView = styled(View);

export const ParentsSignInPage: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { changeIsLoggedIn, setUser } = useAppContext();
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
        onSuccess: async (res) => {
          await AsyncStorage.setItem("token", res.token);
          const { name, surname, email, id, roleId } = res;
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ name, surname, email, id, roleId })
          );
          changeIsLoggedIn(true);
          setUser(id);
          navigation.navigate("Dashboard");
        },
      }
    );
  };
  return (
    <FormPage parentOrTeacher title='Prisijungimas'>
      <FormProvider {...methods}>
        <View style={styles.inputsContainer}>
          <StyledView className='mb-4'>
            <BaseTextField
              formField={ParentSignInField.EMAIL}
              label={"El. paštas"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={ParentSignInField.PASSWORD}
              type='password'
              label={"Slaptažodis"}
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
