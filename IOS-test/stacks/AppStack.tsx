import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ROLE } from "./enums/enums";
import { Dashboard as StudentDashboard } from "../components/pages/students/dashboard/Dashboard";
import { Dashboard as ParentOrTeacherDashboard } from "../components/pages/dashboard/Dashboard";
import { StudentHeader } from "../components/student-header/StudentHeader";
import { ProfileStudent } from "../components/profile/profile-student/ProfileStudent";
import { TaskPage } from "../components/pages/task/TaskPage";
import { GroupsPage } from "../components/pages/groups/GroupsPage";
import { GroupPage } from "../components/pages/groups/GroupPage";
import { GroupJoin } from "../components/pages/group-join/GroupJoin";
import { TaskPreviewPage } from "../components/pages/task-preview/TaskPreviewPage";
import { ChangePasswordPage } from "../components/pages/change-password/ChangePassword";
import { ProfilePage } from "../components/profile/profile/Profile";
import { AddChildPage } from "../components/pages/child-insertion/AddChildPage";
import { useAppContext } from "../contexts/appContext";
import { ChildrenPreviewPage } from "../components/pages/children-preview/ChildrenPreviewPage";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const { setUser } = useAppContext();
  const [userRole, setUserRole] = useState<number | null>(null);
  useEffect(() => {
    const getRole = async () => {
      const value = await AsyncStorage.getItem("user");
      const { id, roleId } = JSON.parse(value);
      if (!value) return;
      setUserRole(roleId);
      setUser(id);
    };
    getRole();
  }, []);
  if (!userRole) return;

  return (
    <Stack.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        header:
          userRole === USER_ROLE.CHILD ? () => <StudentHeader /> : undefined,
      }}
    >
      <Stack.Screen name='Task' component={TaskPage} />

      {USER_ROLE.CHILD === userRole ? (
        <>
          <Stack.Screen name='Profile' component={ProfileStudent} />
        </>
      ) : (
        <Stack.Screen name='Profile' component={ProfilePage} />
      )}
      {USER_ROLE.CHILD === userRole ? (
        <>
          <Stack.Screen name='Dashboard' component={StudentDashboard} />
        </>
      ) : (
        <Stack.Screen name='Dashboard' component={ParentOrTeacherDashboard} />
      )}
      <Stack.Screen name='Groups' component={GroupsPage} />
      <Stack.Screen name='Group' component={GroupPage} />
      <Stack.Screen name='JoinGroup' component={GroupJoin} />
      <Stack.Screen name='TaskPreview' component={TaskPreviewPage} />
      <Stack.Screen name='ChangePassword' component={ChangePasswordPage} />
      <Stack.Screen name='AddChildPage' component={AddChildPage} />
      <Stack.Screen name='ChildrenPreview' component={ChildrenPreviewPage} />
    </Stack.Navigator>
  );
};
