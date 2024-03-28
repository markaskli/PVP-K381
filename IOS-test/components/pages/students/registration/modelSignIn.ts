import { z } from "zod";

export enum StudentLoginField {
  USERNAME = "username",
  PASSWORD = "password",
}

export const studentLoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const defaultStudentLoginFormValues = {
  username: "",
  password: "",
};

export type StudentLoginKey = keyof typeof defaultStudentLoginFormValues;
