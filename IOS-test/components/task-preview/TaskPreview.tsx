import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CreatedTask } from "../../api/supabase/types";
import {
  GREY_COLOR,
  LIGHER_GREY_COLOR,
  PRIMARY_COLOR,
} from "../../utils/constants";
import { BasePage } from "../base-page/BasePage";
import { Button } from "../buttons/Button";
import { useNavigation } from "@react-navigation/native";

type TaskPreviewProps = {
  task: CreatedTask;
};

export const TaskPreview: React.FC<TaskPreviewProps> = ({ task }) => {
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
          <Text style={styles.label}>Užduoties aprašymas</Text>
          <Text style={styles.description}>{task.name}</Text>
        </View>
        <View>
          <Text style={styles.label}>Užduoties atlikimo taškai</Text>
          <Text style={styles.description}>{task.points}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Button color={PRIMARY_COLOR}>
              <Text>Atlikti užduotį</Text>
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
  },
});
