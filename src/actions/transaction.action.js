import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosService,fetcher } from "@/helpers";
import { useNotification } from "@/hooks";
const baseURL = "/transaction";

export const useFetchTransactions = () => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}`);
        // TODO : RETURN THE TRANSACTIONS DATA HERE
        return res["data"];
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchFlutterWaveBanks = (code) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["flutterWaveBanks",code],
    queryFn: async () => {
      try {
        const res = await fetcher(`${baseURL}/getFlutterWaveBanks/${code}`);
        // TODO : RETURN THE BANKS DATA HERE
        return res["data"];
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useFetchTransaction = (id) => {
  
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["transactions",id],
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

export const useCreatePaypalOrder = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createPaypalOrder,
    isPending: isCreating,
    isSuccess: isCreated,
    data: payment,
  } = useMutation({
    mutationFn: async (payload) => {
      try {
        const payment = await axiosService.post(
          `${baseURL}/createPaypalOrder`,
          payload
        );
        notify({
          title: "Success",
          variant: "success",
          description: "Payment Initiated Successfully",
        });
        return payment.data;
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          variant: "error",
          description: error.response.data.message,
        });
      }
    }
  });

  return {
    createPaypalOrder,
    isCreating,
    isCreated,
    payment,
  };
};

export const useCapturePaypalOrder = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: capturePaypalOrder,
    isPending: isExecuting,
    isSuccess: isExecuted,
  } = useMutation({
    mutationFn: async (payload) => {
      const { data, navigate } = payload;
      try {
        await axiosService.post(`${baseURL}/capturePaypalOrder`, data);
        notify({
          title: "Success",
          variant: "success",
          description: "Payment executed Successfully",
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
    capturePaypalOrder,
    isExecuting,
    isExecuted,
  };
};

export const useCreatePaypalPayout = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createPaypalPayout,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: async (payload) => {
      const { data,navigate } = payload;
      try {
        const payment = await axiosService.post(
          `${baseURL}/createPaypalPayout`,
          data
        );
        notify({
          title: "Success",
          variant: "success",
          description: "Payout Successfully Received",
        });
        navigate('/transaction')
        console.log(payment);
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
      queryClient.invalidateQueries(["transactions"], { exact: true });
    },
  });

  return {
    createPaypalPayout,
    isCreating,
    isCreated
  };
};


export const useCreateFlutterWaveTransfer = () => {
  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: createFlutterWaveTransfer,
    isPending: isCreating,
    isSuccess: isCreated
  } = useMutation({
    mutationFn: async (payload) => {
      const { data,navigate } = payload;
      try {
        const payment = await axiosService.post(
          `${baseURL}/createFlutterWaveTransfer`,
          data
        );
        notify({
          title: "Success",
          variant: "success",
          description: "Payout Successfully Received",
        });
        navigate('/transaction')
        console.log(payment);
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
      queryClient.invalidateQueries(["transactions"], { exact: true });
    },
  });

  return {
    createFlutterWaveTransfer,
    isCreating,
    isCreated,
  };
};


export const useCreateFlutterWavePayment = () => {
  const [notify] = useNotification();

  const {
    mutate: createFlutterWavePayment,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: async (payload) => {
      const {data}=payload
      console.log(data)
      try {
        const response = await axiosService.post(
          `${baseURL}/createFlutterWavePayment`,
          data
        );
        notify({
          title: "Success",
          variant: "success",
          description: "Payment initiated Successfully",
        });
        console.log(response)
        const link = response.data.link
        return link
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          variant: "error",
          description: error.response.data.message,
        });
      }
    }
  });

  return {
    createFlutterWavePayment,
    isCreating,
    isCreated
  };
};