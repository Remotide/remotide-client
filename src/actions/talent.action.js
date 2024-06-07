import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";
import { getUser } from "./user.action";
const baseURL="/users/talent/profile"

export const useFetchTalentProfile = (talentId) => {
    const user = getUser();
    let userId
    if (talentId) {
      userId = talentId
    } else {
      const { _id } = user || {};
      userId = _id
    }
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["talent/profile", userId ],
      queryFn: async () => {
        if (userId) {
          try {
            const res=await fetcher(`${baseURL}/${userId}`)
            return res["data"]["talentProfile"];
          } catch (error) {
            // console.log(error);
          }
        } else {
          return null;
        }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
  };

export const useEditTalentProfile= () => {
    const user = getUser();
    
    const { _id:userId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editTalentProfile,
      isPending: isEditing,
      isSuccess: isEdited,
      error: editError
    } = useMutation({
      mutationFn: async (values) => {
        // const { availability,resume,bookableCalanderLink,skills } = values;
        const {Profile,navigate} = values;
        if (userId) {
          try {
            await axiosService.patch(`${baseURL}/${userId}`,Profile,{
              headers :{
                "Content-Type": "multipart/form-data"
              }
            })
            // await axiosService.patch(`${baseURL}/${userId}`,values,{headers: { "Content-Type": "multipart/form-data" }});
            notify({
              title: "Success",
              variant: "success",
              description: "Profile successfully edited",
            });
            navigate("/talent/profile")
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: "Request failed",
            });
          }
        } else {
          throw new Error("invalid params");
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["talent/profile",userId],
        {exact:true}
        );
      },
    });
  
    return {
      editTalentProfile,
      isEditing,
      isEdited,
      editError
    };
  };