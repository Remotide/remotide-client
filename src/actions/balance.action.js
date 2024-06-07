import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helpers";

const baseURL="/balance";

export const useFetchBalance = () => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["balance"],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}`);
            return res["data"];
          } catch (error) {
            // console.log(error);
          }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};