// AppContext.js
import React, { createContext, useState, useContext } from "react";
import { Child } from "../components/types/types";

// Create a Context
const AppContext = createContext({});

type AppState = {
  authenticationAction: AuthenticationActionTypes | null;
  childInsertion: Child[];
  isLoggedIn: boolean;
  selectedGroup: string;
  user: {
    id: string;
  };
};

export type AuthenticationActionTypes = "register" | "login";

// Create a Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({
    user: {
      id: null,
    },
    authenticationAction: null,
    childInsertion: [],
    isLoggedIn: false,
    selectedGroup: "",
  });

  const authenticationAction = state.authenticationAction;

  const selectUser = state.user;

  const selectedGroup = state.selectedGroup;

  const setAuthenticationAction = (action: AuthenticationActionTypes) => {
    setState((prevState) => ({
      ...prevState,
      authenticationAction: action,
    }));
  };

  const setUser = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        id,
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
