import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  useForm,
  Controller,
  useFormContext,
  useController,
  Control,
} from "react-hook-form";
import { GREY_COLOR } from "../../utils/constants";

type BaseSelectionFieldProps = {
  label: string;
  items: { key: string; value: string }[];
  formField: string;
  control?: Control<any, any>;
};

export const BaseSelectionField: React.FC<BaseSelectionFieldProps> = ({
  label,
  formField,
  items,
  control,
}) => {
  const [open, setOpen] = useState(false);

  const formContext = useFormContext();
  const { fieldState, field } = useController({
    control: formContext?.control ?? control,
    name: formField,
  });

  const getDefaultOption = (value: string) => {
    return items.find((item) => item.key === value);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Controller
        control={control}
        name={formField}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>{label}</Text>
            <SelectList
              defaultOption={getDefaultOption(value)}
              save='value'
              setSelected={onChange}
              data={items}
            />
            {fieldState.error && (
              <Text style={styles.error}>{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 10,
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
