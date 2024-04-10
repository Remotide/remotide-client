import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@/helpers";
import {useNotification} from "@/hooks";
import { getUser } from "./user.action"; 

const baseURL="/users/company/profile"

export const useFetchCompanyProfile = () => {
    const user = getUser();
    const { _id:userId } = user || {};
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["company/profile", userId ],
      queryFn: async () => {
        if (userId) {
          try {
            const res=await axiosService.get(`${baseURL}/${userId}`)
            const profile=res.data["data"]["companyProfile"];
            return profile;
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

export const useEditCompanyProfile= () => {
    const user = getUser();
    const { _id:userId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editCompanyProfile,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (values) => {
        // const { name,companyEmail,description,website } = values;
        const {Profile,navigate} = values;
        if (userId) {
          try {
            await await axiosService.patch(`${baseURL}/${userId}`,Profile,{
              headers :{
                "Content-Type": "multipart/form-data"
              }
            })
            notify({
              title: "Success",
              variant: "success",
              description: "Profile successfully edited",
            });
            navigate("/company/profile")
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
        ["company/profile",userId],
        {exact:true}
        );
      },
    });
  
    return {
      editCompanyProfile,
      isEditing,
      isEdited,
    };
  };