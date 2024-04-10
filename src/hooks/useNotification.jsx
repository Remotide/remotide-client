import { toast } from "react-hot-toast";

export default function useNotification() {
  const notify = ({ title, description, variant = "success" }) => {
    const toastFunction =
      variant === "success"
        ? toast.success
        : variant === "error"
        ? toast.error
        : toast;
    toastFunction(
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-black font-extrabold text-xl">{title}</span>
        <span className="text-black font-extrabold text-xl">{description}</span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return [notify];
}
