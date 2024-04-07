import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ACCENT_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "nativewind";
import { BaseTextField } from "../../input/BaseTextField";
import { GroupField, defaultGroupFormValues, groupFormSchema } from "./model";
import { useCreateRoom, useGetRoomById } from "./groupsQueries";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/navigations";
import { DashboardNavbar } from "../dashboard/DashboardNavbar";

const StyledView = styled(View);

type GroupFormProps = {
  refetch?: () => void;
  groupId?: string;
};

export const GroupForm: React.FC<GroupFormProps> = ({ refetch, groupId }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const createRoom = useCreateRoom({
    onSuccess: () => {
      refetch?.();
    },
  });
  const methods = useForm({
    resolver: zodResolver(groupFormSchema),
    defaultValues: defaultGroupFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const { data: group } = useGetRoomById(groupId);

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (group) {
      setValue("name", group.name);
    }
  }, [group]);

  const submitForm = () => {
    const values = getValues();
    const form = groupFormSchema.parse(values);

    createRoom.mutate(form, {
      onSuccess: async (res) => {
        navigation.goBack();
      },
    });
  };

  return (
    <View>
      <DashboardNavbar />
      <FormPage parentOrTeacher title='Grupės sukūrimas'>
        <FormProvider {...methods}>
          <View style={styles.inputsContainer}>
            <StyledView className='mb-4'>
              <BaseTextField
                formField={GroupField.NAME}
                label={"Grupės pavadinimas"}
              />
            </StyledView>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Sukurti</Text>
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
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
