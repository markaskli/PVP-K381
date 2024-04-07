export type RegisterParentData = {
  surname: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
};

export type CreateTaskData = {
  name: string;
  description: string;
  points: number;
  dueDate: string;
  assignedToId: string;
};

export type CreatedTask = {
  id: number;
  name: string;
  description: string;
  points: number;
  isFinished: boolean;
  dueDate: string;
  createdById: string;
  assignedToId: string;
  assignedToRoomId?: string;
};

export type RegisterTeacherData = {
  surname: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  school: string;
  profession: string;
};

export type LoginParentOrTeacherData = {
  email: string;
  password: string;
};

export type ChildLoginRequest = {
  username: string;
  password: string;
};

export type ChangePasswordRequest = {
  newPassword: string;
  currentPassword: string;
};

export type ChildInsertionInformation = {
  name: string;
  class: string;
};

export type RegisterChildRequest = {
  username: string;
  registrationCode: string;
  newPassword: string;
  currentPassword: string;
};
