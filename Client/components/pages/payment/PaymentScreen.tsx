import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { BasePage } from "../../base-page/BasePage";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Payment } from "../../payment/Payment";
import { GREY_COLOR } from "../../../utils/constants";

export const PaymentScreen: React.FC = () => {
  const [points, setPoints] = useState(50);
  const onPointsChange = (value: any) => {
    setPoints(Number(value));
  };
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <BasePage>
        <ScrollView>
          <Text style={styles.title}>Taškų pirkimas</Text>
          <Text style={styles.description}>
            Įveskite norimą kiekį nusipirkti taškų
          </Text>
          <TextInput
            value={points.toString()}
            onChangeText={onPointsChange}
            style={styles.input}
          />
          <StripeProvider publishableKey='pk_test_51P9VK4LU0NzXxhZP0gfKNWmmbq9ZJhhVrrMeps9VXggD9FKbRlZl5QvylYCdaoo5bjDV7cAbkjDadpaUAz14gK0300vp9NfOlu'>
            <Payment pointsToBuy={points.toString()} />
          </StripeProvider>
          <Text style={styles.sumText}>{points / 100}€</Text>
        </ScrollView>
      </BasePage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  input: {
    backgroundColor: "#F5EBEB",
    height: 35,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 15,
  },
  sumText: {
    fontSize: 22,
    fontWeight: "700",
  },
});
