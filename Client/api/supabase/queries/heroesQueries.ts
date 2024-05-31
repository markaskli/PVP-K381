import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../react-query/queryKeys";
import { heroesApi } from "../heroApi";
export const useGetHeroes = () => {
  return useQuery({
    queryKey: [QueryKey.GET_HEROES],
    queryFn: heroesApi.getHeroes,
  });
};

export const useGetChildHeroes = () => {
  return useQuery({
    queryKey: [QueryKey.GET_CHILD_HEROES],
    queryFn: heroesApi.getChildHeroes,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QueryKey.GET_PRODUCTS],
    queryFn: heroesApi.getProducts,
  });
};

export const useAcquireHeroe = () => {
  return useMutation({
    mutationKey: [QueryKey.GET_HEROES],
    mutationFn: heroesApi.buyHero,
  });
};

export const useFeedHero = () => {
  return useMutation({
    mutationKey: [QueryKey.FEED_HERO],
    mutationFn: heroesApi.feedHero,
  });
};
