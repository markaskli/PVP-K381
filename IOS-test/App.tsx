import { AppProvider } from "./contexts/appContext";
import { NavigationContainer } from "@react-navigation/native";
import { Main } from "./Main";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppProvider>
  );
}
