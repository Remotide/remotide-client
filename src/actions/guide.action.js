import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";


const baseURL="/admin/guides";

export const useFetchAllGuides = () => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["guides"],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}`);
            return res["guides"];
          } catch (error) {
            // console.log(error);
          }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchGuide = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["guides",id],
      queryFn: async () => {
        if(id) {
          try {
            const res=await fetcher(`${baseURL}/${id}`);
            // console.log(res)
            return res["guide"];
          } catch (error) {
            // console.log(error);
          }
      } else {
        return {
          title:"",
          description:""
        }
      }}
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useCreateGuide= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: createGuide,
      isPending: isCreating,
      isSuccess: isCreated,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload
        // const { title,description } = values;
          try {
            await axiosService.post(`${baseURL}`, values);
            notify({
              title: "Success",
              variant: "success",
              description: "Guide successfully Posted",
            });
            navigate("/admin/guides")
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
        ["guides"],
        {exact:true}
        );
      },
    });
  
    return {
        createGuide,
        isCreating,
        isCreated
    };
  };

export const useEditGuide= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editGuide,
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
            description: "Guide Edited Successfully",
        });
        navigate("/admin/guides")
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
        ["guides",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        editGuide,
        isEditing,
        isEdited,
    };
  };
  export const useDeleteGuide= () => {  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deleteGuide,
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
            description: "Guide removed Successfully",
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
        ["guides",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        deleteGuide,
        isDeleting,
        isDeleted
    };
  };