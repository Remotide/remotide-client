import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";

const baseURL="/admin/skills";

export const useFetchAllSkills = () => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["skills"],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}`);
            return res;
          } catch (error) {
            // console.log(error);
          }
      },
    });
    const skills=data?.skills;
    return { isPending, isSuccess, isError, isFetching, error, skills };
};
export const useFetchSkill = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["skills",id],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}/${id}`);
            return res;
          } catch (error) {
            // console.log(error);
          }
      },
    });
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useCreateSkill= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: createSkill,
      isPending: isCreating,
      isSuccess: isCreated,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values}=payload;
        // const { name } = values;
          try {
            await axiosService.post(`${baseURL}`, values);
            notify({
              title: "Success",
              variant: "success",
              description: "Skill successfully Posted",
            });
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
        ["skills"],
        {exact:true}
        );
      },
    });
  
    return {
        createSkill,
        isCreating,
        isCreated
    };
  };

export const useEditSkill= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editSkill,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values}=payload;
        const { _id:id } = values;
        try {
        await axiosService.patch(`${baseURL}/${id}`, values);
        notify({
            title: "Success",
            variant: "success",
            description: "Skill Edited Successfully",
        });
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
        ["skills"],
        {exact:true}
        );
      },
    });
  
    return {
        editSkill,
        isEditing,
        isEdited,
    };
  };
  export const useDeleteSkill= () => {  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deleteSkill,
      isPending: isDeleting,
      isSuccess: isDeleted,
    } = useMutation({
      mutationFn: async (id) => {
        // const { name } = values;
        try {
        await axiosService.delete(`${baseURL}/${id}`);
        notify({
            title: "Success",
            variant: "success",
            description: "Skill removed Successfully",
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
        ["skills",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        deleteSkill,
        isDeleting,
        isDeleted
    };
  };