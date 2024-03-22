import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";
import { getUser } from "./user.action"; 
const baseURL="/jobs";
export const useFetchAllJobs = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["jobs"],
    queryFn: async ()=> {
      try {
        const res=await fetcher(`${baseURL}/allJobs`);
        return res;
      } catch (error) {
        // console.log(error);
      }
    }
  })
  return { isPending, isSuccess, isError, isFetching, error, data };
}
export const useFetchJobs = () => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["jobs"],
      queryFn: async () => {
          try {
            const res=await fetcher(`${baseURL}`);
            return res;
          } catch (error) {
            // console.log(error);
          }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchJob = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["jobs",id],
      queryFn: async () => {
        if(id){
          try {
            const res=await fetcher(`${baseURL}/${id}`);
            return res;
          } catch (error) {
            // console.log(error);
          }
        }else{
          return {
            _id: "",
            company_id: "",
            title: "",
            description: "",
            payment: "",
            skills: [],
          }
        }
      },
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useCreateJob= () => {
    const user = getUser();
    const { _id:companyId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: createJob,
      isPending: isCreating,
      isSuccess: isCreated,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload;
        
        // const { title,description,payment,skills } = values;
        if (companyId) {
          try {
            values["company_id"]=companyId
            await axiosService.post(`${baseURL}`, values);
            notify({
              title: "Success",
              variant: "success",
              description: "Job successfully Posted",
            });
            navigate("/company/jobs")
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
        ["jobs"],
        {exact:true}
        );
      },
    });
  
    return {
        createJob,
        isCreating,
        isCreated,
    };
  };

export const useEditJob= () => {
    const user = getUser();
    const { _id:companyId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editJob,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values,navigate}=payload;

        // const { title,description,payment,skills } = values;
        try {
          const {_id:id}=values;
          await axiosService.patch(`${baseURL}/${id}`, values);
        notify({
            title: "Success",
            variant: "success",
            description: "Job Edited Successfully",
        });
        navigate("/company/jobs")
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
        ["jobs"],
        {exact:true}
        );
      },
    });
  
    return {
        editJob,
        isEditing,
        isEdited,
    };
  };
  export const useDeleteJob= () => {
    const user = getUser();
    const { _id:companyId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deleteJob,
      isPending: isDeleting,
      isSuccess: isDeleted,
    } = useMutation({
      mutationFn: async (id) => {
        // const { title,description,payment,skills } = values;
        try {
        await axiosService.delete(`${baseURL}/${id}`);
        notify({
            title: "Success",
            variant: "success",
            description: "Job removed Successfully",
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
        ["jobs"],
        {exact:true}
        );
      },
    });
  
    return {
        deleteJob,
        isDeleting,
        isDeleted
    };
  };