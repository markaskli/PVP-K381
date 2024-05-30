import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ACCENT_COLOR, LIGHER_GREY_COLOR } from "../../../utils/constants";
import { BasePage } from "../../base-page/BasePage";
import { Character } from "../../character/Character";
import { Healthbar } from "../../character/healthbar/Healthbar";
import {
  useAcquireHeroe,
  useGetChildHeroes,
  useGetHeroes,
} from "../../../api/supabase/queries/heroesQueries";

export const CharacterPage: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data: heroes } = useGetHeroes();
  const { data: childHeroes } = useGetChildHeroes();
  const buyHero = useAcquireHeroe();

  const showAlert = ({ title, message }: { title: string; message: string }) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Uždaryti",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  const handleHeroBuy = (id: number) => {
    buyHero.mutate(
      { id: id.toString() },
      {
        onSuccess: () => {
          showAlert({
            title: "Pirkimas sėkmingas",
            message: "Sėkmingai nusipirktas personažas",
          });
        },
        onError: (err) => {
          showAlert({
            title: "Trūksta taškų",
            message: "Netinkamas taškų kiekis norimam personažui nusipirkti.",
          });
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      {isModalOpened && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "red",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              gap: 50,
            }}
          >
            {heroes &&
              heroes?.map((heroe) => (
                <TouchableOpacity onPress={() => handleHeroBuy(heroe.id)}>
                  <Image
                    key={heroe.taskId}
                    style={{
                      height: 150,
                      width: 150,
                      opacity: childHeroes.find((childHeroe) => {
                        console.log(childHeroe.id, heroe.id);
                        return childHeroe.id === heroe.id;
                      })
                        ? 0.1
                        : 1,
                    }}
                    alt='reward'
                    source={{ uri: heroe.heroPng }}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}
      <View style={{ position: "absolute", top: 0, right: 0, zIndex: 100000 }}>
        <TouchableOpacity onPress={() => setIsModalOpened(!isModalOpened)}>
          <Image
            style={{ height: 35, width: 35, margin: 10 }}
            alt='reward'
            source={require("../../../assets/backpack.png")}
          />
        </TouchableOpacity>
      </View>
      <BasePage>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Character />
          <View style={{ marginTop: 20 }}>
            <Healthbar />
          </View>
        </View>
      </BasePage>
      <View style={{ position: "absolute", bottom: "5%", display: 'flex', flexDirection: 'row', gap: 10 }}>
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  energyBar: {
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    borderColor: ACCENT_COLOR,
    borderWidth: 1,
  },
  inlineWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  middleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  inputsContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 72,
    fontWeight: "700",
    color: "#232222",
    textAlign: "left",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    color: LIGHER_GREY_COLOR,
  },
  image: {
    width: 20,
    height: 20,
  },
});
