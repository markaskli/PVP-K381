import { StyleSheet, View } from "react-native";
import { PRIMARY_COLOR } from "./utils/constants";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "./contexts/appContext";
import { setDefaultOptions } from "date-fns";
import { lt } from "date-fns/locale";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStack } from "./stacks/AuthStack";
import { AppStack } from "./stacks/AppStack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./utils/navigations";
import Push from './components/Push'

// Create a client
const queryClient = new QueryClient();

setDefaultOptions({ locale: lt });

const Stack = createNativeStackNavigator();

export const Main = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isLoggedIn, changeIsLoggedIn } = useAppContext();

  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem("token");
      changeIsLoggedIn(!!userToken);
      if (!!userToken && isLoggedIn) navigation.navigate("Dashboard");
    };

    checkAuthentication();
  }, [isLoggedIn]);
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='AuthenticationPage'>
          {isLoggedIn ? (
            <Stack.Screen name='App' component={AppStack} />
          ) : (
            <Stack.Screen name='Auth' component={AuthStack} />
          )}
        </Stack.Navigator>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: PRIMARY_COLOR,
  },
});
