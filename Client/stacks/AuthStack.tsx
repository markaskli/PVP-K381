// AuthStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationPage } from "../components/pages/authentication/AuthenticationPage";
import { RoleSelectionPage } from "../components/pages/role-selection/RoleSelectionPage";
import { TeachersSignUpPage } from "../components/pages/teachers/TeachersSignUpPage";
import { ParentsSignInPage } from "../components/pages/parents/ParentsSignInPage";
import { ParentsSignUpPage } from "../components/pages/parents/ParentsSignUpPage";
import { TeachersSignInPage } from "../components/pages/teachers/TeachersSignInPage";
import { ChildInsertionPage } from "../components/pages/child-insertion/ChildInsertionPage";
import { AddChildPage } from "../components/pages/child-insertion/AddChildPage";
import { RegistrationPage } from "../components/pages/students/registration/RegistrationPage";
import { LoginPage } from "../components/pages/students/registration/LoginPage";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='AuthenticationPage' component={AuthenticationPage} />
      <Stack.Screen name='RoleSelectionPage' component={RoleSelectionPage} />
      <Stack.Screen name='TeachersSignUpPage' component={TeachersSignUpPage} />
      <Stack.Screen name='TeachersSignInPage' component={TeachersSignInPage} />
      <Stack.Screen name='ParentsSignInPage' component={ParentsSignInPage} />
      <Stack.Screen name='ParentsSignUpPage' component={ParentsSignUpPage} />
      <Stack.Screen name='ChildInsertionPage' component={ChildInsertionPage} />
      <Stack.Screen name='AddChildPage' component={AddChildPage} />
      <Stack.Screen name='RegistrationPage' component={RegistrationPage} />
      <Stack.Screen name='LoginPage' component={LoginPage} />
    </Stack.Navigator>
  );
};
