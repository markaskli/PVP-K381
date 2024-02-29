import { StyleSheet, Text, View } from "react-native";
import { RegistrationPage } from "./components/pages/students/registration/RegistrationPage";
import { PRIMARY_COLOR } from "./utils/constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationPageStep2 } from "./components/pages/students/registration/RegistrationPageStep2";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='StudentRegistration'>
          <Stack.Screen
            name='StudentRegistration'
            component={RegistrationPage}
          />
          <Stack.Screen
            name='StudentRegistrationStep2'
            component={RegistrationPageStep2}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
});
