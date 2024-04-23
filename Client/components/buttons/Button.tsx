import React from "react";
import { convertStyles } from "./styles";
import { TouchableOpacity } from "react-native";

type ButtonProps = {
  color: string;
  onClick?: () => void;
  styles?: { [key: string]: string | number };
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  color,
  onClick,
  disabled = false,
  styles,
  children,
}) => {
  const styling = convertStyles({ backgroundColor: color, styles });
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onClick?.()}
      style={[styling.button, { opacity: disabled ? 0.5 : 1 }]}
    >
      {children}
    </TouchableOpacity>
  );
};
