import React from "react";
import { PRIMARY_COLOR } from "../../../../utils/constants";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useRegisterChild } from "./childQueries";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StudentRegistrationField,
  defaultStudentRegistrationFormValues,
  studentRegistrationFormSchema,
} from "./model";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../../input/BaseTextField";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../utils/navigations";
import { useAppContext } from "../../../../contexts/appContext";
import { BasePage } from "../../../base-page/BasePage";
import { FormPage } from "../../../base-page/FormPage";
const StyledView = styled(View);

export const RegistrationPage: React.FC = () => {
  const registerChild = useRegisterChild();
  const { changeIsLoggedIn, setUser } = useAppContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const methods = useForm({
    resolver: zodResolver(studentRegistrationFormSchema),
    defaultValues: defaultStudentRegistrationFormValues,
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
    const childInformation = studentRegistrationFormSchema.parse(values);

    registerChild.mutate(
      {
        userInformation: childInformation,
      },
      {
        onSuccess: async (res) => {
          await AsyncStorage.setItem("token", res.token);
          const { username, roleId, id } = res;
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ username, id, roleId })
          );
          changeIsLoggedIn(true);
          setUser({ id });
          navigation.navigate("Dashboard");
        },
        onError: (err) => {
          console.log(err.message);
        },
      }
    );
  };

  return (
    <FormPage title='Registracija'>
      <BasePage>
        <FormProvider {...methods}>
          <StyledView className='mb-4 w-full'>
            <BaseTextField
              control={control}
              formField={StudentRegistrationField.USERNAME}
              label={"Slapyvardis"}
              errorMessage={errors.username?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={StudentRegistrationField.REGISTRATION_CODE}
              label={"Registracijos kodas"}
              errorMessage={errors.registrationCode?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={StudentRegistrationField.CURRENT_PASSWORD}
              label={"Dabartinis slaptažodis"}
              type='password'
              errorMessage={errors.currentPassword?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={StudentRegistrationField.NEW_PASSWORD}
              label={"Naujas slaptažodis"}
              type='password'
              errorMessage={errors.newPassword?.message}
            />
          </StyledView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Baigti registraciją</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={require("./doctors.svg")} />
        </FormProvider>
      </BasePage>
    </FormPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 450,
    marginBottom: 30,
  },
  image: {
    resizeMode: "contain",
    height: 200,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
