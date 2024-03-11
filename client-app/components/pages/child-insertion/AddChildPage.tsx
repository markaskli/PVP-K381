import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BaseInput } from "../../input/BaseInput";
import { ACCENT_COLOR } from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { useAddChild } from "./childQueries";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddChildField,
  addChildFormSchema,
  defaultAddChildFormValues,
} from "./model";
import { BaseTextField } from "../../input/BaseTextField";
import { styled } from "nativewind";

const StyledView = styled(View);

export const AddChildPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const methods = useForm({
    resolver: zodResolver(addChildFormSchema),
    defaultValues: defaultAddChildFormValues,
    reValidateMode: "onSubmit",
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = methods;
  const [childName, setChildName] = useState("");
  // const { addChild } = useAppContext();
  const addChild = useAddChild();
  // const handleButtonPress = () => {
  //   // Handle button press action here
  //   addChild(childName);
  //   navigation.navigate("ChildInsertionPage");
  // };

  const submitForm = () => {
    const values = getValues();
    const form = addChildFormSchema.parse(values);

    addChild.mutate(
      {
        childInformation: form,
      },
      {
        onSuccess: () => {
          navigation.navigate("ChildInsertionPage");
        },
      }
    );
  };

  return (
    <FormPage title='Vaiko priskyrimas'>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleSubmit(submitForm);
        }}
        noValidate
      >
        <FormProvider {...methods}>
          <View style={styles.inputsContainer}>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={AddChildField.NAME}
                label={"Vaiko vardas"}
                errorMessage={errors.name?.message}
              />
            </StyledView>
            <StyledView className='mb-4'>
              <BaseTextField
                control={control}
                formField={AddChildField.CLASS}
                label={"Klasė, į kurią eina"}
                errorMessage={errors.class?.message}
              />
            </StyledView>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(submitForm)}
          >
            <Text style={styles.buttonText}>Pridėti vaiką</Text>
          </TouchableOpacity>
        </FormProvider>
      </form>
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
