import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import {
  ACCENT_COLOR,
  GREY_COLOR,
  LIGHER_GREY_COLOR,
  PRIMARY_COLOR,
} from "../../../utils/constants";
import { FormPage } from "../../base-page/FormPage";
import { useAddChild } from "./childQueries";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddChildField,
  addChildFormSchema,
  defaultAddChildFormValues,
} from "./model";
import { styled } from "nativewind";
import { BaseTextField } from "../../input/BaseTextField";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../contexts/appContext";
import { useGetParentChilds } from "../../../api/supabase/queries/childQueries";
import { Button } from "../../buttons/Button";

const StyledView = styled(View);
const StyledText = styled(Text);

export const AddChildPage: React.FC = () => {
  const { selectUser } = useAppContext();
  const { refetch } = useGetParentChilds(selectUser.id);

  const navigation = useNavigation();
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
  const [showChildCode, setShowChildCode] = useState(false);
  const [childCreateInfo, setChildCreateInfo] = useState(null);
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
        onSuccess: (res) => {
          setShowChildCode(true);
          setChildCreateInfo(res);
          // refetch();
          // navigation.goBack();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const handleModalClose = () => {
    setShowChildCode(false);
    refetch();
    navigation.goBack();
  };

  return (
    <FormPage title='Vaiko priskyrimas'>
      <FormProvider {...methods}>
        <Modal
          visible={showChildCode}
          animationType='slide'
          transparent={true}
          onRequestClose={handleModalClose}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "70%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Vaiko duomenys
              </Text>
              <StyledView className='flex flex-col gap-1 mb-3'>
                <StyledText className='text-md font-bold'>
                  Priskyrimo kodas:
                </StyledText>
                <Text>{childCreateInfo?.invitationCode}</Text>
              </StyledView>
              <StyledView className='flex flex-col gap-1 mb-3'>
                <StyledText className='text-md font-bold'>
                  Laikinasis slaptažodis:
                </StyledText>
                <Text>{childCreateInfo?.tempPassword}</Text>
              </StyledView>
              <StyledView className='flex flex-row gap-1 items-center mb-5'>
                <Image
                  style={styles.image}
                  source={require("../../../assets/info.png")}
                />
                <StyledView className='flex flex-col gap-2'>
                  <Text style={styles.infoText}>
                    Priskyrimo kodas bus matomas vaiko skiltyje.
                  </Text>
                  <Text style={styles.infoText}>
                    Laikinasis slaptažodis rodomas tik vieną kartą.
                  </Text>
                </StyledView>
              </StyledView>

              <Button color={PRIMARY_COLOR} onClick={handleModalClose}>
                <Text>Uždaryti</Text>
              </Button>
            </View>
          </View>
        </Modal>

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
  infoText: {
    color: LIGHER_GREY_COLOR,
  },
  image: {
    width: 20,
    height: 20,
  },
});
