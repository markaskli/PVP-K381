import { Control } from "react-hook-form";
import { DateOrTimeView, DateView } from "@mui/x-date-pickers";
export type BaseComponentProps = {
  formField: string;
  label: string;
  control?: Control<any, any>;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export type BaseDateProps = BaseComponentProps & {
  views?: DateView[];
  format?: string;
  minDate?: Date;
  maxDate?: Date;
};

export type BaseDateTimeProps = BaseComponentProps & {
  views?: DateOrTimeView[];
  format?: string;
  minDateTime?: Date;
  maxDateTime?: Date;
};
