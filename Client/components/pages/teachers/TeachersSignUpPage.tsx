import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "nativewind";
import {
  TeacherSignUpField,
  defaultTeacherSignUpFormValues,
  signUpFormSchema,
} from "./modelSignUp";
import { useRegisterTeaher } from "./authenticationQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../input/BaseTextField";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useAppContext } from "../../../contexts/appContext";
import { useNavigation } from "@react-navigation/native";
import { BasePage } from "../../base-page/BasePage";
import { BaseDatePicker } from "../../input/BaseDatePicker";

const StyledView = styled(View);

export const TeachersSignUpPage: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { changeIsLoggedIn, setUser } = useAppContext();
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
    <FormPage parentOrTeacher title='Registracija'>
      <ScrollView contentContainerStyle={{ paddingBottom: 240 }}>
        <BasePage>
          <FormProvider {...methods}>
            <View style={styles.inlineWrapper}>
              <StyledView className='mb-4 w-1/3'>
                <BaseTextField
                  control={control}
                  formField={TeacherSignUpField.NAME}
                  label={"Vardas"}
                  errorMessage={errors.name?.message}
                />
              </StyledView>
              <StyledView className='mb-4 w-1/3'>
                <BaseTextField
                  control={control}
                  formField={TeacherSignUpField.SURNAME}
                  label={"Pavardė"}
                  errorMessage={errors.surname?.message}
                />
              </StyledView>
            </View>
            <StyledView className='mb-4 w-full'>
              <BaseTextField
                control={control}
                formField={TeacherSignUpField.EMAIL}
                label={"El. pašas"}
                errorMessage={errors.email?.message}
              />
            </StyledView>
            <StyledView className='mb-4 w-full'>
              <BaseTextField
                control={control}
                formField={TeacherSignUpField.PHONE_NUMBER}
                label={"Telefono numeris"}
                errorMessage={errors.phoneNumber?.message}
              />
            </StyledView>
            <View style={styles.inlineWrapper}>
              <StyledView className='mb-4 w-1/3'>
                <BaseDatePicker
                  formField={TeacherSignUpField.BIRTH_DATE}
                  control={control}
                  format='yyyy-MM-dd'
                  label={"Gimimo data"}
                  errorMessage={errors.birthDate?.message}
                />
              </StyledView>
              <StyledView className='mb-4 w-1/3'>
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
        </BasePage>
      </ScrollView>
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
    justifyContent: "space-between",
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
