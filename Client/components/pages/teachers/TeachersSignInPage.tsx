import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ACCENT_COLOR } from "../../../utils/constants";
import { styled } from "nativewind";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPage } from "../../base-page/FormPage";
import {
  TeacherSignInField,
  defaultTeacherSignInFormValues,
  signInFormSchema,
} from "./modelSignIn";
import { useLoginParentOrTeacher } from "../parents/authenticationQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../input/BaseTextField";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useAppContext } from "../../../contexts/appContext";

const StyledView = styled(View);

export const TeachersSignInPage: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { changeIsLoggedIn, setUser } = useAppContext();
  const methods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: defaultTeacherSignInFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const loginTeacher = useLoginParentOrTeacher();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const submitForm = () => {
    const values = getValues();
    const form = signInFormSchema.parse(values);

    loginTeacher.mutate(
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
    <FormPage title='Prisijungimas'>
      <FormProvider {...methods}>
        <View style={styles.inputsContainer}>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={TeacherSignInField.EMAIL}
              label={"El. paštas"}
              errorMessage={errors.email?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              type='password'
              formField={TeacherSignInField.PASSWORD}
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
