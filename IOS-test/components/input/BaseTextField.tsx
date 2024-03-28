import { InputBaseComponentProps } from "@mui/material";
import { Controller, useController, useFormContext } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../types/baseComponent";
import { TextInput, Text, StyleSheet, View } from "react-native";
import { GREY_COLOR } from "../../utils/constants";

interface BaseTextFieldProps extends BaseComponentProps {
  inputProps?: InputBaseComponentProps;
  endIcon?: {
    icon: React.ReactNode;
    tooltip?: string;
  };
  multiline?: boolean;
  autoComplete?: string;
  minRows?: number;
  rows?: number | string;
  size?: "small" | "medium";
  white?: boolean;
  transformToUppercase?: boolean;
  type?: HTMLInputTypeAttribute;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

export const BaseTextField: React.FC<BaseTextFieldProps> = ({
  formField,
  control,
  label,
  inputProps,
  errorMessage,
  disabled,
  endIcon,
  required,
  rows,
  onBlur,
  white = false,
  className = "",
  autoComplete = "off",
  minRows = 3,
  size = "small",
  transformToUppercase = false,
  type = "text",
  multiline = false,
}) => {
  const styles = generateStyling({ white });
  const formContext = useFormContext();
  const { fieldState } = useController({
    control: formContext?.control ?? control,
    name: formField,
  });

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value.toString()}
            keyboardType={type === "numeric" ? "numeric" : "default"}
            secureTextEntry={type === "password" ? true : false}
            {...field}
          />
          {fieldState.error && (
            <Text style={styles.error}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
      rules={{ required: "Name is required" }}
    />
  );
};

const generateStyling = ({ white = false }: { white?: boolean }) => {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: GREY_COLOR,
      borderRadius: 10,
      padding: 10,
      backgroundColor: white ? "#fff" : "transparent",
      width: "100%",
      height: 40,
      fontSize: 16,
    },
    label: {
      marginBottom: 4,
      fontSize: 18,
      fontWeight: "bold",
    },
    error: {
      color: "red",
      fontSize: 12,
      marginTop: 4,
    },
  });
};
