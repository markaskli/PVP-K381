import { CreatedTask } from "../../../../api/supabase/types";
import { Children } from "../../../types/types";

export type Group = {
  id: string;
  createdAt: string;
  name: string;
  invitationCode: string;
  createdBy: string;
  children: Children[];
  tasks: CreatedTask[];
};
