// AppContext.js
import React, { createContext, useState, useContext } from "react";
import { Child } from "../components/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a Context
const AppContext = createContext({});

export type UserData = {
  id: string;
  roleId: string;
  points: number;
  username: string;
};

type AppState = {
  authenticationAction: AuthenticationActionTypes | null;
  childInsertion: Child[];
  isLoggedIn: boolean;
  selectedGroup: string;
  user: UserData;
};

export type AuthenticationActionTypes = "register" | "login";

// Create a Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({
    user: {
      id: "",
      roleId: "",
      points: 0,
      username: "",
    },
    authenticationAction: null,
    childInsertion: [],
    isLoggedIn: false,
    selectedGroup: "",
  });

  const authenticationAction = state.authenticationAction;

  const selectUser = state.user;

  const selectedGroup = state.selectedGroup;

  const modifyPoints = async (count: number) => {
    setUser({
      ...selectUser,
      points: Number(selectUser.points) + count,
    });

    const userData = await AsyncStorage.getItem("user");
    const { name, surname, email, points, id } = JSON.parse(userData);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        name,
        surname,
        email,
        id,
        points: Number(selectUser.points) + Number(count),
      })
    );
  };

  const setAuthenticationAction = (action: AuthenticationActionTypes) => {
    setState((prevState) => ({
      ...prevState,
      authenticationAction: action,
    }));
  };

  const setUser = (userData: UserData) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        ...userData,
      },
    }));
  };

  const setSelectedGroup = (state: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedGroup: state,
    }));
  };

  const changeIsLoggedIn = (state: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: state,
    }));
  };

  const child = state.childInsertion;

  const isLoggedIn = state.isLoggedIn;

  const addChild = (child: Child) => {
    setState((prevState) => ({
      ...prevState,
      childInsertion: [...state.childInsertion, child],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        authenticationAction,
        setAuthenticationAction,
        setSelectedGroup,
        selectedGroup,
        child,
        modifyPoints,
        setUser,
        selectUser,
        addChild,
        isLoggedIn,
        changeIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
