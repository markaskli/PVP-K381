import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import {
  ChangePasswordField,
  changePasswordFormSchema,
  defaultChangePasswordFormValues,
} from "./model";
import { FormPage } from "../../base-page/FormPage";
import { BaseTextField } from "../../input/BaseTextField";
import { ACCENT_COLOR } from "../../../utils/constants";
import { BaseDatePicker } from "../../input/BaseDatePicker";
import { BaseSelectionField } from "../../input/BaseSelectionField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useChangePassword } from "../../../api/supabase/queries/authenticationQueries";
import { useSignOut } from "../dashboard/dashboardQueries";
import { useAppContext } from "../../../contexts/appContext";

const StyledView = styled(View);

type TaskFormProps = {
  taskId?: string;
};

export const ChangePasswordPage: React.FC<TaskFormProps> = ({ taskId }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const methods = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: defaultChangePasswordFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = methods;
  const changePassword = useChangePassword();
  const [role, setRole] = useState<number>(1);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      const { name, surname, email, roleId } = JSON.parse(userData);
      setRole(roleId);
    };
    getUserData();
  }, []);

  const signOut = useSignOut();
  const { changeIsLoggedIn } = useAppContext();

  const handleSignOut = async () => {
    signOut.mutate();
    await AsyncStorage.clear();
    changeIsLoggedIn(false);
    navigation.navigate("AuthenticationPage");
  };

  const submitForm = () => {
    const values = getValues();
    const { newPassword, currentPassword } =
      changePasswordFormSchema.parse(values);
    const changePasswordForm = {
      newPassword,
      currentPassword,
    };

    changePassword.mutate(
      {
        passwordDetails: changePasswordForm,
      },
      {
        onSuccess: async (res) => {
          navigation.goBack();
        },
        onError: async (res) => {
          if (res.message.includes("401")) {
            handleSignOut();
          }
          console.log(res.stack);
        },
      }
    );
  };

  return (
    <FormPage
      parentOrTeacher={role === 1 ? true : false}
      title='Slaptažodžio keitimas'
    >
      <FormProvider {...methods}>
        <StyledView className='mb-5'>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={ChangePasswordField.CURRENT_PASSWORD}
              label={"Dabartinis slaptažodis"}
            />
          </StyledView>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={ChangePasswordField.NEW_PASSWORD}
              label={"Naujas slaptažodis"}
            />
          </StyledView>
        </StyledView>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(submitForm)}
        >
          <Text style={styles.buttonText}>Pakeisti</Text>
        </TouchableOpacity>
      </FormProvider>
    </FormPage>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
