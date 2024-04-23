import React from "react";
import { ACCENT_COLOR } from "../../../../utils/constants";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoginChild } from "./childQueries";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseTextField } from "../../../input/BaseTextField";
import {
  StudentLoginField,
  defaultStudentLoginFormValues,
  studentLoginFormSchema,
} from "./modelSignIn";
import { useAppContext } from "../../../../contexts/appContext";
import { FormPage } from "../../../base-page/FormPage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../utils/navigations";
const StyledView = styled(View);

export const LoginPage: React.FC = () => {
  const { changeIsLoggedIn, setUser } = useAppContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const loginChild = useLoginChild();
  const methods = useForm({
    resolver: zodResolver(studentLoginFormSchema),
    defaultValues: defaultStudentLoginFormValues,
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
    const childInformation = studentLoginFormSchema.parse(values);

    loginChild.mutate(
      {
        userInformation: childInformation,
      },
      {
        onSuccess: async (res) => {
          await AsyncStorage.setItem("token", res.token);
          const { username, roleId, id, points } = res;
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ username, id, roleId, points })
          );
          changeIsLoggedIn(true);
          setUser({ id, roleId, points, username });
          navigation.navigate("Dashboard");
        },
        onError: (res) => {
          console.log(res.message);
        },
      }
    );
  };

  return (
    <FormPage title='Prisijungimas'>
      <FormProvider {...methods}>
        <View style={styles.middleContainer}>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={StudentLoginField.USERNAME}
              label={"Slapyvardis"}
              errorMessage={errors.username?.message}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={StudentLoginField.PASSWORD}
              label={"Slaptažodis"}
              errorMessage={errors.password?.message}
            />
          </StyledView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Prisijungti</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={require("./doctors.svg")} />
        </View>
      </FormProvider>
    </FormPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ACCENT_COLOR,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  middleContainer: {
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
