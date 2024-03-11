import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { BaseDateProps } from "../types/baseComponent";

export const BaseDatePicker: React.FC<BaseDateProps> = ({
  formField,
  label,
  control,
  format,
  errorMessage,
  minDate,
  maxDate,
  className,
  disabled = false,
  views = ["year", "month", "day"],
}) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <DesktopDatePicker
          {...field}
          format={format}
          label={label}
          views={views}
          disabled={disabled}
          className={className}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              size: "small",
              error: !!errorMessage,
              helperText: errorMessage,
            },
          }}
        />
      )}
    />
  );
};
