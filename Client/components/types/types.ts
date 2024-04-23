import { CreatedTask } from "../../api/supabase/types";

export type Role = "student" | "teacher" | "parent";

export type Child = {
  name: string;
};

export type Children = {
  id: string;
  username: string;
  class: string;
  name: string;
  invitationCode: string;
  hasJoined: boolean;
};

export type TaskCompletion = {
  isConfirmedByParent: boolean;
  isConfirmedByChild: boolean;
  childId: string;
  childName: string;
  id: string;
};

export type PreviewTask = {
  task: CreatedTask;
  completions: TaskCompletion[];
};
