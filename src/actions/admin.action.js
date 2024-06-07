import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import {useNotification} from "@/hooks";
import { getUser } from "./user.action"; 


const baseURL="/admin";
const notify = useNotification();
export const useFetchStats = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey:["stats"],
    queryFn: async () => {
      try {
        const res=await fetcher(`${baseURL}/stats`)
        return res
      } catch (error) {
        notify({
          title: "Error",
          variant: "error",
          description: "Stats fetch failed",
      })
      }
    }
  })
  return { isPending, isSuccess, isError, isFetching, error, data };
}
export const useFetchActiveUsers = () => {
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
        queryKey:["activeUsers"],
        queryFn: async () => {
            try {
                const res=await fetcher(`${baseURL}/getActiveUsers`)
                return res.data;
            } catch (error) {
                notify({
                    title: "Error",
                    variant: "error",
                    description: "Users fetch failed",
                })
            }
        }
    })
    return { isPending, isSuccess, isError, isFetching, error, data };
}

export const useFetchInActiveUsers = () => {
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
        queryKey:["inActiveUsers"],
        queryFn: async () => {
            try {
                const res=await fetcher(`${baseURL}/getInActiveUsers`)
                return res.data;
            } catch (error) {
                notify({
                    title: "Error",
                    variant: "error",
                    description: "Users fetch failed",
                })
            }
        }
    })
    return { isPending, isSuccess, isError, isFetching, error, data };
}

export const activateUser = () => {
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: activateUser,
      isPending: isActivating,
      isSuccess: isActivated,
    } = useMutation({
      mutationFn: async (id) => {
          try {
            await axiosService.post(`${baseURL}/activateUser/${id}`, {});
            notify({
              title: "Success",
              variant: "success",
              description: "User is successfully activated.",
            });
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: "User activation failed.",
            });
          }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["activeUsers","inActiveUsers"],
        {exact:true}
        );
      },
    });
  
    return {
        activateUser,
        isActivating,
        isActivated
    };
}

export const deactivateUser = () => {
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deactivateUser,
      isPending: isdeactivating,
      isSuccess: isdeactivated,
    } = useMutation({
      mutationFn: async (id) => {
          try {
            await axiosService.post(`${baseURL}/deactivateUser/${id}`, {});
            notify({
              title: "Success",
              variant: "success",
              description: "User is successfully de-activated.",
            });
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: "User de-activation failed.",
            });
          }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["activeUsers","inActiveUsers"],
        {exact:true}
        );
      },
    });
  
    return {
        deactivateUser,
        isdeactivating,
        isdeactivated
    };
}

// Manage Admins

export const useFetchAllAdmins = () => {
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
        queryKey:["admins"],
        queryFn: async () => {
            try {
                const res=await fetcher(`${baseURL}/manage`)
                return res.data["admins"];
            } catch (error) {
                notify({
                    title: "Error",
                    variant: "error",
                    description: "Admins fetch failed",
                })
            }
        }
    })
    return { isPending, isSuccess, isError, isFetching, error, data };
}

export const useFetchAdmin = (id) => {
  
    const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
      queryKey: ["admins",id],
      queryFn: async () => {
        if(id) {
          try {
            const res=await fetcher(`${baseURL}/manage/${id}`);
            return res["data"]["admin"];
          } catch (error) {
            notify({
                title: "Error",
                variant: "error",
                description: "Admin fetch failed",
            })
          }
      } else {
        return [];
      }}
    });
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useCreateAdmin= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: createAdmin,
      isPending: isCreating,
      isSuccess: isCreated,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values}=payload
        // const { title,description } = values;
          try {
            await axiosService.post(`${baseURL}/manage`, values);
            notify({
              title: "Success",
              variant: "success",
              description: "Admin successfully created",
            });
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: "Admin creation failed",
            });
          }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["admins"],
        {exact:true}
        );
      },
    });
  
    return {
        createAdmin,
        isCreating,
        isCreated
    };
};

export const useEditAdmin= () => {
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: editAdmin,
      isPending: isEditing,
      isSuccess: isEdited,
    } = useMutation({
      mutationFn: async (payload) => {
        const {values}=payload
        // const { title,description } = values;
        const {_id:id}=values
        try {
        await axiosService.patch(`${baseURL}/manage/${id}`, values);
        notify({
            title: "Success",
            variant: "success",
            description: "Admin Edited Successfully",
        });
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Admin edit failed",
        });
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["admins",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        editAdmin,
        isEditing,
        isEdited,
    };
};

export const useDeleteAdmin= () => {  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: deleteAdmin,
      isPending: isDeleting,
      isSuccess: isDeleted,
    } = useMutation({
      mutationFn: async (id) => {
        // const { title,description } = values;
        try {
        await axiosService.delete(`${baseURL}/manage/${id}`);
        notify({
            title: "Success",
            variant: "success",
            description: "Admin removed Successfully",
        });
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Admin remove failed",
        });
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
        ["admins",variables?.id],
        {exact:true}
        );
      },
    });
  
    return {
        deleteAdmin,
        isDeleting,
        isDeleted
    };
  };
export const useUnFlagJob= () => {
    const user = getUser();
    const { _id:companyId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: unflagJob,
      isPending: isUnFlagging,
      isSuccess: isUnFlagged,
    } = useMutation({
      mutationFn: async (id) => {
        // const { title,description,payment,skills } = values;
        try {
        await axiosService.get(`${baseURL}/job-unflag/${id}`);

        notify({
            title: "Success",
            variant: "success",
            description: "Job un-flagged Successfully",
        });
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Un-Flagging Request failed",
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
        unflagJob,
        isUnFlagging,
        isUnFlagged
    };
  };
  export const useFlagJob= () => {
    const user = getUser();
    const { _id:companyId } = user || {};
  
    const [notify] = useNotification();
    const queryClient = useQueryClient();
  
    const {
      mutate: flagJob,
      isPending: isFlagging,
      isSuccess: isFlagged,
    } = useMutation({
      mutationFn: async (id) => {
        // const { title,description,payment,skills } = values;
        try {
        await axiosService.get(`${baseURL}/job-flag/${id}`);

        notify({
            title: "Success",
            variant: "success",
            description: "Job flagged Successfully",
        });
        } catch (error) {
        notify({
            title: "Error",
            variant: "error",
            description: "Un-flagging Request failed",
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
        flagJob,
        isFlagging,
        isFlagged
    };
  };