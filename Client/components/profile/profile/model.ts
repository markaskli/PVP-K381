import { z } from "zod";

export enum ProfileField {
  NAME = "name",
  SURNAME = "surname",
  EMAIL = "email",
  CAPTURED_POINTS = "capturedPoints",
  GROUPS = "groups",
  PARENTS = "parents",
  CREATED_AT = "createAt",
}

export const profileFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  capturedPoints: z.number(),
  groups: z.array(z.string()),
  parents: z.array(z.string()),
  createAt: z.date().transform((val) => val.toISOString()),
});

export const defaultProfileFormValues = {
  name: "",
  surname: "",
  email: "",
  capturedPoints: 0,
  groups: [],
  parents: [],
  createAt: "",
};

export type ProfileFormKey = keyof typeof defaultProfileFormValues;
