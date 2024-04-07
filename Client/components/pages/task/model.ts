import { z } from "zod";

export enum CreateTaskField {
  GROUP = "group",
  NAME = "name",
  DESCRIPTION = "description",
  POINTS = "points",
  DUE_DATE = "dueDate",
  ASSIGNED_T0 = "assignedToId",
}

export const createTaskFormSchema = z.object({
  group: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  points: z
    .string()
    .nonempty()
    .transform((val) => Number(val)),
  dueDate: z.date().transform((val) => val.toISOString()),
  assignedToId: z.string(),
});

export const defaultCreateTaskFormValues = {
  group: "",
  name: "",
  description: "",
  points: "0",
  dueDate: new Date(),
  assignedToId: "",
};

export type CreateTaskFormKey = keyof typeof defaultCreateTaskFormValues;
