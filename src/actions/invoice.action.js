import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@/helpers";
import {useNotification} from "@/hooks";
import { fetcher } from "@/helpers";

const baseURL="/invoice";

export const useFetchInvoices = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}`);
        // TODO : RETURN THE INVOICES DATA HERE
        return res["data"];
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchInvoice = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["invoices",id],
      queryFn: async () => {
        if(id) {
          try {
            const res=await fetcher(`${baseURL}/${id}`);
            // console.log(res)
            return res["data"];
          } catch (error) {
            // console.log(error);
          }
      } }
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useCreateInvoice = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createInvoice,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: async (payload) => {
      const { Invoice, navigate } = payload;
      try {
        await axiosService.post(`${baseURL}`, Invoice);
        notify({
          title: "Success",
          variant: "success",
          description: "Invoice successfully Created",
        });
        navigate("/invoices");
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          variant: "error",
          description: error.response.data.message,
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["invoices"], { exact: true });
    },
  });

  return {
    createInvoice,
    isCreating,
    isCreated,
  };
};