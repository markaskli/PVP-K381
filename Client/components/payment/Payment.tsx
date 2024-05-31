import React, { useState } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { useCreatePaymentIntent } from "../../api/supabase/queries/paymentQueries";
import { useAppContext } from "../../contexts/appContext";

type PaymentProps = {
  pointsToBuy: string;
};

export const Payment: React.FC<PaymentProps> = ({ pointsToBuy }) => {
  const [clientSecret, setClientSecret] = useState("");
  const createPaymentIntent = useCreatePaymentIntent();
  const { modifyPoints } = useAppContext();

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
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );

  const fetchPaymentIntentClientSecret = async () => {
    try {
      createPaymentIntent.mutate(
        {
          points: Number(pointsToBuy),
        },
        {
          onSuccess: (res) => {
            setClientSecret(res.clientSecret);
          },
        }
      );
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  const { confirmPayment, loading } = useConfirmPayment();
  const handlePayPress = async () => {
    const billingDetails = {
      email: "jenny.rosen@example.com",
    };

    await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log("Payment confirmation error", error);
      showAlert({ title: error.localizedMessage, message: error.message });
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
      showAlert({
        title: "Mokėjimas sėkmingas",
        message: `Sėkmingai nupirkta ${paymentIntent.amount / 10} taškų`,
      });
      modifyPoints(paymentIntent.amount / 10);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button onPress={handlePayPress} title='Apmokėti' disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  bubbleElement: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  bubble: {
    width: 100,
    height: 100,
    objectFit: "contain",
    borderRadius: 50,
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
});
