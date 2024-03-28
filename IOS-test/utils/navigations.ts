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
};
