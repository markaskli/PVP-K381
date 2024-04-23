import { StyleSheet } from "react-native";

export const convertStyles = ({
  backgroundColor,
  styles,
}: {
  backgroundColor: string;
  styles: { [key: string]: string | number };
}) => {
  return StyleSheet.create({
    button: {
      width: "100%",
      borderRadius: 10,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      color: "#fff",
      borderColor: "transparent",
      backgroundColor,
      ...styles,
    },
  });
};
