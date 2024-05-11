import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { paymentApi } from "../paymentApi";
export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationKey: [QueryKey.CREATE_PAYMENT_INTENT],
    mutationFn: paymentApi.createPaymentIntent,
  });
};
