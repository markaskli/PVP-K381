import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import cookie from "cookiejs";

const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {},
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    const authToken = token ? token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
