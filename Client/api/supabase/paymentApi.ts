import axiosInstance from "../axios";

const BASE_URL = `http://localhost:5228/api/Payment`;

export const paymentApi = {
  createPaymentIntent: async ({ points }: { points: number }) => {
    const result = await axiosInstance.post(`${BASE_URL}`, {
      points,
      paymentIntent: "",
    });

    return result.data;
  },
};
