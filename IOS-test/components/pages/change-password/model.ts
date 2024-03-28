import { z } from "zod";

export enum ChangePasswordField {
  CURRENT_PASSWORD = "currentPassword",
  NEW_PASSWORD = "newPassword",
}

export const changePasswordFormSchema = z.object({
  currentPassword: z.string().nonempty(),
  newPassword: z.string().nonempty(),
});

export const defaultChangePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
};

export type ChangePasswordFormKey =
  keyof typeof defaultChangePasswordFormValues;
