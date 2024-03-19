import { StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR } from './utils/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegistrationPageStep2 } from './components/pages/students/registration/RegistrationPageStep2';
import { AuthenticationPage } from './components/pages/authentication/AuthenticationPage';
import { RoleSelectionPage } from './components/pages/role-selection/RoleSelectionPage';
import { TeachersSignUpPage } from './components/pages/teachers/TeachersSignUpPage';
import { TeachersSignInPage } from './components/pages/teachers/TeachersSignInPage';
import { AppProvider } from './contexts/appContext';
import { ParentsSignInPage } from './components/pages/parents/ParentsSignInPage';
import { ParentsSignUpPage } from './components/pages/parents/ParentsSignUpPage';
import { RegistrationPage } from './components/pages/students/registration/RegistrationPage';
import { ChildInsertionPage } from './components/pages/child-insertion/ChildInsertionPage';
import { AddChildPage } from './components/pages/child-insertion/AddChildPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { setDefaultOptions } from 'date-fns';
import { lt } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Child } from './components/pages/profile/Child';
// Create a client
const queryClient = new QueryClient();

setDefaultOptions({ locale: lt });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <NavigationContainer>
            <View style={styles.container}>
              <Stack.Navigator initialRouteName="AuthenticationPage">
                <Stack.Screen
                  name="AuthenticationPage"
                  component={AuthenticationPage}
                />
                <Stack.Screen
                  name="RoleSelectionPage"
                  component={RoleSelectionPage}
                />
                <Stack.Screen
                  name="TeachersSignUpPage"
                  component={TeachersSignUpPage}
                />
                <Stack.Screen
                  name="StudentRegistrationStep2"
                  component={RegistrationPageStep2}
                />
                <Stack.Screen
                  name="TeachersSignInPage"
                  component={TeachersSignInPage}
                />
                <Stack.Screen
                  name="ParentsSignInPage"
                  component={ParentsSignInPage}
                />
                <Stack.Screen
                  name="ParentsSignUpPage"
                  component={ParentsSignUpPage}
                />
                <Stack.Screen
                  name="ChildInsertionPage"
                  component={ChildInsertionPage}
                />
                <Stack.Screen name="AddChildPage" component={AddChildPage} />
                <Stack.Screen
                  name="RegistrationPage"
                  component={RegistrationPage}
                />
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </LocalizationProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
});
