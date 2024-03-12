import { InputBaseComponentProps, TextField, Tooltip } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../types/baseComponent";
import { ComponentUtils } from "../../utils/componentUtils";

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
  className = "",
  autoComplete = "off",
  minRows = 3,
  size = "small",
  transformToUppercase = false,
  type = "text",
  multiline = false,
}) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          onChange={(e) => {
            const { value } = e.target;
            const updatedValue = transformToUppercase
              ? value.toUpperCase()
              : value;
            field.onChange(updatedValue);
          }}
          disabled={disabled}
          className={`mb-4 ${className}`}
          size={size}
          onBlur={onBlur}
          label={ComponentUtils.generateLabel(label, { required })}
          inputProps={inputProps}
          error={!!errorMessage}
          helperText={errorMessage}
          multiline={multiline}
          minRows={minRows}
          rows={rows}
          autoComplete={autoComplete}
          InputProps={{
            endAdornment: endIcon ? (
              <Tooltip title={endIcon.tooltip}>
                <InputAdornment position='end'>{endIcon.icon}</InputAdornment>
              </Tooltip>
            ) : null,
          }}
        />
      )}
    />
  );
};
