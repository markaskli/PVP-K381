import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
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
import { BasePage } from "../../base-page/BasePage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useAppContext } from "../../../contexts/appContext";

const StyledView = styled(View);

export const ParentsSignUpPage: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const registerParent = useRegisterParent();
  const { changeIsLoggedIn, setUser } = useAppContext();
  const methods = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: defaultParentSignUpFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

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
          setUser(res);
          changeIsLoggedIn(true);
          navigation.navigate("Dashboard");
          showAlert({
            title: "Regsitracija sėkminga",
            message: "Registracijos etapas baigtas.",
          });
        },
        onError: () => {
          showAlert({
            title: "Įvyko klaida",
            message: "Įvyko klaida, bandykite dar kartą.",
          });
        },
      }
    );
  };

  return (
    <ScrollView>
      <FormPage parentOrTeacher title={"Registracija"}>
        <BasePage>
          <FormProvider {...methods}>
            <View style={styles.inlineWrapper}>
              <StyledView className='mb-4 w-1/2'>
                <BaseTextField
                  control={control}
                  formField={ParentSignUpField.NAME}
                  label={"Vardas"}
                  errorMessage={errors.name?.message}
                />
              </StyledView>
              <StyledView className='mb-4 w-1/2'>
                <BaseTextField
                  control={control}
                  formField={ParentSignUpField.SURNAME}
                  label={"Pavardė"}
                  errorMessage={errors.surname?.message}
                />
              </StyledView>
            </View>

            <View style={styles.inlineWrapper}>
              <StyledView className='mb-4 w-1/2'>
                <BaseTextField
                  control={control}
                  formField={ParentSignUpField.EMAIL}
                  label={"El. paštas"}
                  errorMessage={errors.email?.message}
                />
              </StyledView>
              <StyledView className='mb-4 w-1/2'>
                <BaseTextField
                  control={control}
                  formField={ParentSignUpField.PHONE_NUMBER}
                  label={"Telefono numeris"}
                  errorMessage={errors.phoneNumber?.message}
                />
              </StyledView>
            </View>
            {/* <StyledView className='mb-4'>
          <BaseDatePicker
            name={ParentSignUpField.BIRTH_DATE}
            control={control}
            className='mb-4'
            label={"Gimimo data"}
          />
        </StyledView> */}
            <StyledView className='mb-4 w-full'>
              <BaseTextField
                control={control}
                type='password'
                formField={ParentSignUpField.PASSWORD}
                label={"Slaptažodis"}
                errorMessage={errors.password?.message}
              />
            </StyledView>
            <StyledView className='mb-4 w-full'>
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
        </BasePage>
      </FormPage>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  bubbleContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  inlineWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
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
