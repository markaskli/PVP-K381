import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { BaseTextField } from "../../input/BaseTextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileField,
  defaultProfileFormValues,
  profileFormSchema,
} from "./model";
import { styles } from "./styles";
import { BasePage } from "../../base-page/BasePage";
import { Button } from "../../buttons/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { useAppContext } from "../../../contexts/appContext";
import { useSignOut } from "../../pages/dashboard/dashboardQueries";
import { ACCENT_COLOR } from "../../../utils/constants";
import {
  useGetChildRooms,
  useGetRooms,
} from "../../pages/groups/groupsQueries";
import { GroupsList } from "../../groups-list/GroupsList";
import { ChildrensList } from "../../childrens-list/ChildrensList";
import { useGetParentChilds } from "../../../api/supabase/queries/childQueries";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledSafeAreaView = styled(SafeAreaView);

export const ProfilePage = () => {
  const { changeIsLoggedIn, selectUser } = useAppContext();

  const { data: rooms } = useGetRooms();
  const { data: childs } = useGetParentChilds(selectUser.id);
  const signOut = useSignOut();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const methods = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  console.log(childs);

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      const { name, surname, email, id } = JSON.parse(userData);
      console.log(userData);
      setValue("name", name);
      setValue("surname", surname);
      setValue("email", email);
    };
    getUserData();
  }, []);

  const logoutUser = () => {
    AsyncStorage.clear();
    signOut.mutate();
    changeIsLoggedIn(false);
    navigation.navigate("AuthenticationPage");
  };

  const navigateToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const submitForm = () => {
    const values = getValues();
    const form = profileFormSchema.parse(values);
  };
  return (
    <BasePage>
      <StyledView className='flex flex-col gap-3'>
        <View style={styles.inlineWrapper}>
          <View style={styles.profileIconContainer}>
            <StyledImage
              style={styles.profileIconContainer}
              className='w-9 h-9'
              source={require("../../pages/students/registration/liftingHealthy.svg")}
            />
          </View>
          <StyledView className='flex flex-col gap-3'>
            <StyledView className='mb-4'>
              <BaseTextField
                white
                control={control}
                formField={ProfileField.NAME}
                label={"Vardas"}
                errorMessage={errors.name?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                white
                formField={ProfileField.SURNAME}
                label={"Pavardė"}
                errorMessage={errors.surname?.message}
              />
            </StyledView>
            <StyledView className='mb-4 w-full'>
              <BaseTextField
                control={control}
                white
                formField={ProfileField.EMAIL}
                label={"Elektroninis paštas"}
                errorMessage={errors.email?.message}
              />
            </StyledView>
            {/* <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={ProfileField.CAPTURED_POINTS}
                label={"Surinkti taškai"}
                type='number'
                errorMessage={errors.capturedPoints?.message}
              />
            </StyledView> */}
          </StyledView>
        </View>
        <View>
          <Text style={stylesheetStyles.label}>Grupės</Text>
          <GroupsList groups={rooms} />
        </View>
        <View>
          <Text style={stylesheetStyles.label}>Vaikai</Text>
          <ChildrensList childrens={childs} />
        </View>
        <StyledView style={stylesheetStyles.buttonsContainer}>
          <Button onClick={navigateToChangePassword} color={ACCENT_COLOR}>
            <Text>Keisti slaptažodį</Text>
          </Button>
          <Button onClick={logoutUser} color={"#ff5252"}>
            <Text>Atsijungti</Text>
          </Button>
        </StyledView>
      </StyledView>
    </BasePage>
  );
};

const stylesheetStyles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
  label: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "bold",
  },
});
