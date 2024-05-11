import React, { useEffect } from "react";
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
import { GroupPreviewPage } from "../components/pages/group-preview/GroupPreviewPage";
import { ChildrenInGroupPage } from "../components/pages/children-in-group-preview/ChildrenInGroupPreviewPage";
import { ParentTaskPreviewPage } from "../components/pages/parent-task-preview/ParentTaskPreviewPage";
import { FooterDashboard } from "../components/footer-dashboard/FooterDashboard";
import { View, StyleSheet } from "react-native";
import { Leaderboard } from "../components/leaderboard/Leaderboard";
import { CharacterPage } from "../components/pages/character-page/CharacterPage";
import { PaymentScreen } from "../components/pages/payment/PaymentScreen";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const { setUser, selectUser } = useAppContext();
  useEffect(() => {
    const getRole = async () => {
      const value = await AsyncStorage.getItem("user");
      const { id, roleId, points } = JSON.parse(value);
      if (!value) return;
      setUser({
        id,
        roleId,
        points,
      });
    };
    getRole();
  }, []);
  const userRole = selectUser.roleId;
  if (!userRole) return;

  return (
    <>
      <Stack.Navigator
        initialRouteName='Dashboard'
        screenOptions={{
          header:
            userRole === USER_ROLE.CHILD ? () => <StudentHeader /> : undefined,
        }}
      >
        <Stack.Screen name='Task' component={TaskPage} />
        <Stack.Screen name='Character' component={CharacterPage} />

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
        <Stack.Screen name='Payments' component={PaymentScreen} />
        <Stack.Screen name='Groups' component={GroupsPage} />
        <Stack.Screen name='Leaderboard' component={Leaderboard} />
        <Stack.Screen name='Group' component={GroupPage} />
        <Stack.Screen name='JoinGroup' component={GroupJoin} />
        <Stack.Screen name='TaskPreview' component={TaskPreviewPage} />
        <Stack.Screen
          name='ParentTaskPreview'
          component={ParentTaskPreviewPage}
        />
        <Stack.Screen name='ChangePassword' component={ChangePasswordPage} />
        <Stack.Screen name='AddChildPage' component={AddChildPage} />
        <Stack.Screen name='ChildrenPreview' component={ChildrenPreviewPage} />
        <Stack.Screen
          name='ChildrenInGroupPreview'
          component={ChildrenInGroupPage}
        />
        <Stack.Screen name='GroupPreview' component={GroupPreviewPage} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
