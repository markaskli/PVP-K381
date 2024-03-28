import React from "react";
import { convertStyles } from "./styles";
import { TouchableOpacity, View } from "react-native";

type ButtonProps = {
  color: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ color, onClick, children }) => {
  const styling = convertStyles({ backgroundColor: color });
  return (
    <TouchableOpacity onPress={() => onClick?.()} style={styling.button}>
      {children}
    </TouchableOpacity>
  );
};
