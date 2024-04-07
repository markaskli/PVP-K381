import { z } from "zod";

export enum JoinGroupField {
  INVITATION_CODE = "invitationCode",
}

export const groupJoinFormSchema = z.object({
  invitationCode: z.string().nonempty(),
});

export const defaultGroupJoinFormValues = {
  invitationCode: "",
};

export type GroupJoinFormKey = keyof typeof defaultGroupJoinFormValues;
