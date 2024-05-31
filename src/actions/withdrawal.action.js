import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@/helpers";
import {useNotification} from "@/hooks";
import { fetcher } from "@/helpers";

const baseURL="/withdrawal";

export const useFetchWithdrawalMethods = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["withdrawalMethods"],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}`);
        // TODO : RETURN THE WITHDRAWAL METHOD DATA HERE
        return res["data"];
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchWithdrawalMethod = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["withdrawalMethods",id],
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

export const useCreateWithdrawalMethod = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createWithdrawalMethod,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: async (payload) => {
      const { Withdrawal, navigate } = payload;
      try {
        await axiosService.post(`${baseURL}`, Withdrawal);
        notify({
          title: "Success",
          variant: "success",
          description: "Invoice successfully Created",
        });
        navigate("/talent/withdrawalMethods");
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
      queryClient.invalidateQueries(["withdrawalMethods"], { exact: true });
    },
  });

  return {
    createWithdrawalMethod,
    isCreating,
    isCreated,
  };
};

export const useEditWithdrawalMethod= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editWithdrawalMethod,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload
        // const { title,description } = values;
        const {_id:id}=values
        try {
        await axiosService.patch(`${baseURL}/${id}`, values);
        notify({
            title: "Success",
            variant: "success",
            description: "Withdrawal Method Successfully",
        });
        navigate("/talent/withdrawalMethods")
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Request failed",
        });
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["withdrawalMethods",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        editWithdrawalMethod,
        isEditing,
        isEdited,
    };
  };
  export const useDeleteWithdrawalMethod= () => {  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deleteWithdrawalMethod,
      isPending: isDeleting,
      isSuccess: isDeleted,
    } = useMutation({
      mutationFn: async (id) => {
        // const { title,description } = values;
        try {
        await axiosService.delete(`${baseURL}/${id}`);
        notify({
            title: "Success",
            variant: "success",
            description: "Withdrawal method removed Successfully",
        });
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Request failed",
        });
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["withdrawalMethods",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        deleteWithdrawalMethod,
        isDeleting,
        isDeleted
    };
  };