// AppContext.js
import React, { createContext, useState, useContext } from "react";
import { Child } from "../components/types/types";

// Create a Context
const AppContext = createContext({});

type AppState = {
  authenticationAction: AuthenticationActionTypes | null;
  childInsertion: Child[];
};

export type AuthenticationActionTypes = "register" | "login";

// Create a Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({
    authenticationAction: null,
    childInsertion: [],
  });

  const authenticationAction = state.authenticationAction;

  const setAuthenticationAction = (action: AuthenticationActionTypes) => {
    setState((prevState) => ({
      ...prevState,
      authenticationAction: action,
    }));
  };

  const child = state.childInsertion;

  const addChild = (child: Child) => {
    setState((prevState) => ({
      ...prevState,
      childInsertion: [...state.childInsertion, child],
    }));
  };

  return (
    <AppContext.Provider
      value={{ authenticationAction, setAuthenticationAction, child, addChild }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
