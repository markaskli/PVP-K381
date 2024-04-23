import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
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
import { useGetChildRooms } from "../../pages/groups/groupsQueries";
import { GroupsList } from "../../groups-list/GroupsList";

const StyledView = styled(View);

export const ProfileStudent = () => {
  const { changeIsLoggedIn } = useAppContext();
  const { data: rooms } = useGetChildRooms();
  const signOut = useSignOut();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const methods = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const {
    control,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      const { username, points } = JSON.parse(userData);
      setValue("name", username);
      setValue("capturedPoints", points.toString());
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

  return (
    <BasePage>
      <StyledView className='flex flex-col gap-3 pt-3'>
        <View style={styles.inlineWrapper}>
          <View>
            <Image
              style={{ width: 80, height: 80 }}
              alt='profile'
              source={require("../../../assets/profile-bigger.png")}
            />
          </View>
          <StyledView className='flex flex-col gap-3'>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={ProfileField.NAME}
                label={"Vardas"}
                errorMessage={errors.name?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                disabled={true}
                formField={ProfileField.CAPTURED_POINTS}
                label={"Surinkti taškai"}
                errorMessage={errors.capturedPoints?.message}
              />
            </StyledView>
          </StyledView>
        </View>
        <View>
          <Text style={stylesheetStyles.label}>Grupės</Text>
          <GroupsList onlyList joinGroup groups={rooms} />
        </View>

        {/* <StyledView className='flex flex-row gap-3'>
          <StyledView className='mb-4'>
            <BaseTextField
              control={control}
              formField={ProfileField.PARENTS}
              label={"Tėvai"}
              errorMessage={errors.parents?.message}
            />
          </StyledView>
        </StyledView> */}
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
