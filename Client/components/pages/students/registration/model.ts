import { z } from "zod";

export enum StudentRegistrationField {
  REGISTRATION_CODE = "registrationCode",
  USERNAME = "username",
  CURRENT_PASSWORD = "currentPassword",
  NEW_PASSWORD = "newPassword",
}

export const studentRegistrationFormSchema = z.object({
  registrationCode: z.string(),
  username: z.string(),
  currentPassword: z.string(),
  newPassword: z.string(),
});

export const defaultStudentRegistrationFormValues = {
  registrationCode: "",
  username: "",
  currentPassword: "",
  newPassword: "",
};

export type CreateTaskFormKey =
  keyof typeof defaultStudentRegistrationFormValues;
