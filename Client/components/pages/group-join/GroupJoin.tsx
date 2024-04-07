import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  JoinGroupField,
  defaultGroupJoinFormValues,
  groupJoinFormSchema,
} from "./model";
import { useGetChildRooms, useJoinRoom } from "../groups/groupsQueries";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { DashboardNavbar } from "../dashboard/DashboardNavbar";
import { FormPage } from "../../base-page/FormPage";
import { styled } from "nativewind";
import { ACCENT_COLOR } from "../../../utils/constants";
import { BaseTextField } from "../../input/BaseTextField";
import { useSignOut } from "../dashboard/dashboardQueries";
import { useAppContext } from "../../../contexts/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StyledView = styled(View);

export const GroupJoin = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { refetch } = useGetChildRooms();

  const methods = useForm({
    resolver: zodResolver(groupJoinFormSchema),
    defaultValues: defaultGroupJoinFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const joinGroup = useJoinRoom();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;

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
    const { invitationCode } = groupJoinFormSchema.parse(values);

    joinGroup.mutate(
      {
        code: invitationCode,
      },
      {
        onSuccess: async (res) => {
          refetch();
          navigation.navigate("Dashboard");
        },
        onError: async (res) => {
          if (res.message.includes("401")) {
            handleSignOut();
          }
        },
      }
    );
  };
  return (
    <View>
      <FormPage title='Grupės užklausa'>
        <FormProvider {...methods}>
          <View style={styles.inputsContainer}>
            <StyledView className='mb-4'>
              <BaseTextField
                formField={JoinGroupField.INVITATION_CODE}
                label={"Kodas"}
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
    </View>
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
