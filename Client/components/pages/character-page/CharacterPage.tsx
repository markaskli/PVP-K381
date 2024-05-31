import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { ACCENT_COLOR, LIGHER_GREY_COLOR } from "../../../utils/constants";
import { BasePage } from "../../base-page/BasePage";
import { Character } from "../../character/Character";
import { Healthbar } from "../../character/healthbar/Healthbar";
import {
  useAcquireHeroe,
  useFeedHero,
  useGetChildHeroes,
  useGetHeroes,
  useGetProducts,
} from "../../../api/supabase/queries/heroesQueries";
import { useAppContext } from "../../../contexts/appContext";

export const CharacterPage: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isShopOpened, setIsShopOpened] = useState(false);
  const { data: heroes } = useGetHeroes();
  const { data: childHeroes, refetch } = useGetChildHeroes();
  const { data: products } = useGetProducts();
  const buyHero = useAcquireHeroe();
  const { selectUser, setUser } = useAppContext();

  const feedHero = useFeedHero();

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCharacterIndex, setselectedCharacterIndex] = useState(0);

  useEffect(() => {
    if (childHeroes) {
      setSelectedCharacter(childHeroes[0]);
    }
  }, [childHeroes]);

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

  const changeHero = () => {
    if (!childHeroes?.length) return;
    if (selectedCharacterIndex + 1 >= childHeroes.length) {
      setselectedCharacterIndex(0);
      setSelectedCharacter(childHeroes[0]);
    } else {
      const nextIndex = selectedCharacterIndex + 1;
      setselectedCharacterIndex(nextIndex);
      setSelectedCharacter(childHeroes[nextIndex]);
    }
  };

  const handleHeroBuy = (heroe: any, name: string) => {
    if (isBought(name)) return;
    buyHero.mutate(
      { id: heroe.id.toString() },
      {
        onSuccess: () => {
          showAlert({
            title: "Pirkimas sėkmingas",
            message: "Sėkmingai nusipirktas personažas",
          });
          refetch();
          setUser({ points: Number(selectUser.points) - Number(heroe.cost) });
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

  const isBought = (name: string) => {
    return childHeroes?.find((childHeroe) => {
      return childHeroe.name === name;
    });
  };

  const handleHeroFeed = (productId: string) => {
    if (!selectedCharacter) {
      showAlert({
        title: "Maitinimas negalimas",
        message:
          "Negalite pamaitinti, nes neturite nusipirkę bent vieno herojaus.",
      });
      return;
    }
    feedHero.mutate(
      {
        heroId: selectedCharacter.acquiredHeroId,
        productId,
      },
      {
        onSuccess: () => {
          refetch();
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
            <ScrollView>
              {heroes &&
                heroes?.map((heroe) => (
                  <TouchableOpacity
                    key={heroe.heroPng}
                    onPress={() => handleHeroBuy(heroe, heroe.name)}
                  >
                    <Image
                      key={heroe.taskId}
                      style={{
                        height: 150,
                        width: 150,
                        opacity: childHeroes?.find((childHeroe) => {
                          return childHeroe.name === heroe.name;
                        })
                          ? 0.5
                          : 1,
                      }}
                      alt='reward'
                      source={{ uri: heroe.heroPng }}
                    />
                    <Text>{heroe.cost}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
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
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: !childHeroes?.length ? "center" : "stretch",
          }}
        >
          <Character character={selectedCharacter} />
          {childHeroes?.length && (
            <View style={{ marginTop: 20 }}>
              <Healthbar health={selectedCharacter?.health || 0} />
            </View>
          )}
          {!childHeroes?.length && (
            <View>
              <Text>Neturite aktyvaus herojaus. Nusipirkite.</Text>
            </View>
          )}
        </View>
        {childHeroes?.length && (
          <TouchableOpacity onPress={changeHero}>
            <Text>Pakeisti herojų</Text>
          </TouchableOpacity>
        )}
      </BasePage>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {products?.map((product) => (
          <View
            key={product.id}
            style={{ width: 50, height: 50, backgroundColor: "red" }}
          >
            <TouchableOpacity onPress={() => handleHeroFeed(product.id)}>
              <Image
                style={{ height: 35, width: 35, margin: 10 }}
                alt='reward'
                source={{ uri: product.pictureUrl }}
              />
            </TouchableOpacity>
          </View>
        ))}
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
