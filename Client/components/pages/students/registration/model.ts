import { z } from "zod";

export enum StudentRegistrationField {
  REGISTRATION_CODE = "registrationCode",
  USERNAME = "username",
  CURRENT_PASSWORD = "currentPassword",
  NEW_PASSWORD = "newPassword",
}

export const studentRegistrationFormSchema = z.object({
  registrationCode: z.string().min(1, "Šis laukelis yra privalomas"),
  username: z.string().min(1, "Šis laukelis yra privalomas"),
  currentPassword: z.string().min(1, "Šis laukelis yra privalomas"),
  newPassword: z.string().min(1, "Šis laukelis yra privalomas"),
});

export const defaultStudentRegistrationFormValues = {
  registrationCode: "",
  username: "",
  currentPassword: "",
  newPassword: "",
};

export type CreateTaskFormKey =
  keyof typeof defaultStudentRegistrationFormValues;
