import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";

const baseURL="/admin/packages";

export const useFetchAllPackages = () => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["packages"],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}`);
            return res["data"]["packages"];
          } catch (error) {
            // console.log(error);
          }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchPackage = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["packages",id],
      queryFn: async () => {
        if (id){
          try {
            const res=await fetcher(`${baseURL}/${id}`);
            return res["data"]["package"];
          } catch (error) {
            // console.log(error);
          }
        } else {
          return {
            name:"",
            description:"",
            discount:{}
          }
        }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useCreatePackage= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: createPackage,
      isPending: isCreating,
      isSuccess: isCreated,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload
        // const { name,description,price,discount } = values;
          try {
            await axiosService.post(`${baseURL}`, values);
            notify({
              title: "Success",
              variant: "success",
              description: "Package successfully Posted",
            });
            navigate("/admin/packages")
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: error.response.data.message,
            });
          }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["packages"],
        {exact:true}
        );
      },
    });
  
    return {
        createPackage,
        isCreating,
        isCreated
    };
  };

export const useEditPackage= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editPackage,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload
        // const { name,description,price,discount } = values;
        try {
        const {_id:id}=values;
        await axiosService.patch(`${baseURL}/${id}`, values);
        notify({
            title: "Success",
            variant: "success",
            description: "Package Edited Successfully",
        });
        navigate("/admin/packages")
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: error.response.data.message,
        });
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["packages",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        editPackage,
        isEditing,
        isEdited,
    };
  };
  export const useDeletePackage = () => {  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deletePackage,
      isPending: isDeleting,
      isSuccess: isDeleted,
    } = useMutation({
      mutationFn: async (id) => {
        // const { name,description,price,discount } = values;
        try {
        await axiosService.delete(`${baseURL}/${id}`);
        notify({
            title: "Success",
            variant: "success",
            description: "Package removed Successfully",
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
        ["packages",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        deletePackage,
        isDeleting,
        isDeleted
    };
  };