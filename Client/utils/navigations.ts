export type RootStackParamList = {
  Profile: undefined;
  AuthenticationPage: undefined;
  Dashboard: undefined;
  Task: undefined | { taskId: string };
  Groups: undefined;
  Group: undefined | { groupId: string };
  JoinGroup: undefined;
  TaskPreview: { taskId: string };
  ChangePassword: undefined;
  AddChildPage: undefined;
  ChildrenPreview: undefined | { childrenId: string };
  ChildrenInGroupPreview: undefined | { childId: string; userId: string };
  GroupPreview: undefined | { groupId: string };
  ParentTaskPreview: { taskId: string };
  Payments: undefined;
};
