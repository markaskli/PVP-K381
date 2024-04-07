import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LIGHER_GREY_COLOR, PRIMARY_COLOR } from "../../utils/constants";
import { BasePage } from "../base-page/BasePage";
import { Button } from "../buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { Children } from "../types/types";

type ChildrenPreviewProps = {
  children: Children;
};

export const ChildrenPreview: React.FC<ChildrenPreviewProps> = ({
  children,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BasePage>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Atgal</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Slapyvardis</Text>
          <Text style={styles.description}>{children.username}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Vaiko vardas</Text>
          <Text style={styles.description}>{children.name}</Text>
        </View>
        <View>
          <Text style={styles.label}>Klasė</Text>
          <Text style={styles.description}>{children.class}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Button color={PRIMARY_COLOR}>
              <Text>Išsaugoti</Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button color={"red"}>
              <Text>Ištrinti</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
  backText: {
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    paddingTop: 30,
  },
  textContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  description: {
    fontSize: 20,
    color: LIGHER_GREY_COLOR,
    fontWeight: "400",
  },
  footer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
