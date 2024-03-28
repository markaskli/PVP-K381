import { format } from "date-fns";
import { useState } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { GREY_COLOR } from "../../utils/constants";

export const BaseDatePicker: React.FC<any> = ({
  formField,
  label,
  control,
  name,
  open,
  errorMessage,
  minDate,
  maxDate,
  className,
  value,
  disabled = false,
}) => {
  const formContext = useFormContext();
  const { fieldState } = useController({
    control: formContext?.control ?? control,
    name: formField,
  });
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Controller
      control={formContext?.control ?? control}
      name={formField}
      defaultValue={value}
      render={({ field: { onChange, value } }) => (
        <TouchableWithoutFeedback onPress={onClose}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={format(new Date(value.toString()), "yyyy-MM-dd")}
              onFocus={onOpen}
            />
            {isOpen && (
              <Calendar
                markedDates={{ [value]: { selected: true } }}
                onDayPress={(day) => {
                  onChange(new Date(day.dateString));
                  onClose();
                }}
              />
            )}
            {fieldState.error && (
              <Text style={styles.error}>{fieldState.error.message}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    />
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
    width: "auto",
    height: 40,
    fontSize: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
