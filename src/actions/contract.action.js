import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService } from "@/helpers";
import { useNotification } from "@/hooks";
import { getUser } from "./user.action";
import { fetcher } from "@/helpers";

const baseURL = "/contract";
export const useFetchContracts = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}`);
        // TODO : RETURN THE CONTRACTS DATA HERE
        return res["data"];
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchAllContracts = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}/allContracts`);
        // TODO : RETURN THE CONTRACTS DATA HERE
        return res["data"];
      } catch (error) {
        // console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchTalentContracts = () => {
  const { _id: id } = getUser();
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["talent_contracts", id],
    queryFn: async () => {
      if (id) {
        try {
          const res = await fetcher(`${baseURL}/talent`);
          console.log(res);
          return res["data"];
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchCompanyContracts = () => {
  const { _id: id } = getUser();
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["company_contracts", id],
    queryFn: async () => {
      console.log(id);
      if (id) {
        try {
          const res = await fetcher(`${baseURL}/company`);
          return res["data"];
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchContract = (id) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["contracts", id],
    queryFn: async () => {
      if (id) {
        try {
          const res = await fetcher(`${baseURL}/${id}`);
          // console.log(res)
          return res["data"];
        } catch (error) {
          // console.log(error);
        }
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useCreateContract = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createContract,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: async (payload) => {
      const { Contract, navigate } = payload;
      try {
        await axiosService.post(`${baseURL}`, Contract, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        notify({
          title: "Success",
          variant: "success",
          description: "Contract successfully Posted",
        });
        navigate("/contracts");
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          variant: "error",
          description: "Request failed",
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["contracts"], { exact: true });
    },
  });

  return {
    createContract,
    isCreating,
    isCreated,
  };
};

export const useDeleteContract = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: deleteContract,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useMutation({
    mutationFn: async (id) => {
      try {
        await axiosService.delete(`${baseURL}/${id}`);
        notify({
          title: "Success",
          variant: "success",
          description: "Contract removed Successfully",
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
      queryClient.invalidateQueries(["contracts", variables?.id], {
        exact: true,
      });
    },
  });

  return {
    deleteContract,
    isDeleting,
    isDeleted,
  };
};

export const useSignContract = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();
  const { _id: talentId } = getUser();
  const {
    mutate: signContract,
    isPending: isSigning,
    isSuccess: isSigned,
  } = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      const { contractId, navigate } = payload;
      try {
        await axiosService.post(`${baseURL}/sign/${contractId}`, {
          id: talentId,
        });
        notify({
          title: "Success",
          variant: "success",
          description: "Contract signed Successfully",
        });
        navigate("/contracts");
      } catch (error) {
        notify({
          title: "Error",
          variant: "error",
          description: "Request failed",
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["contracts", variables?.id], {
        exact: true,
      });
    },
  });

  return {
    signContract,
    isSigning,
    isSigned,
  };
};

export const useInviteTalent = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: inviteTalent,
    isPending: isInviting,
    isSuccess: isInvited,
  } = useMutation({
    mutationFn: async (payload) => {
      const { email, description, contractId } = payload;
      try {
        await axiosService.post(`${baseURL}/${contractId}`, {
          email,
          description,
        });
        notify({
          title: "Success",
          variant: "success",
          description: "Talent Invited successfully",
        });
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          variant: "error",
          description: "Request failed",
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["contracts"], { exact: true });
    },
  });

  return {
    inviteTalent,
    isInviting,
    isInvited,
  };
};
