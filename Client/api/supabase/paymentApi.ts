import axiosInstance from "../axios";

const BASE_URL = `http://10.0.2.2:5228/api/Payment`;

export const paymentApi = {
  createPaymentIntent: async ({ points }: { points: number }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, {
      points,
      paymentIntent: "",
    });

    return result.data;
  },
};
