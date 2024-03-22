import { fetcher } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
const baseURL="/ai";

export const useFetchTopTalent = (id) => {
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["topTalents",id],
      queryFn: async () => {
        if (id) {
          try {
            const res=await fetcher(`${baseURL}/bestcandidates/${id}`);
            console.log(res.candidates)
            return res.candidates;
          } catch (error) {
            // console.log(error);
          }
        }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
  }