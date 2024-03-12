export type RegisterParentData = {
  surname: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
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

export type ChildInsertionInformation = {
  name: string;
  class: string;
};
