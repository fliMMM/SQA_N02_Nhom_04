import { useSnackbar } from "notistack";

type NotiType = "default" | "error" | "success" | "warning" | "info";

const useNotis = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (message: string, messageType: NotiType) =>
    enqueueSnackbar(message, {
      variant: messageType,
      autoHideDuration: 2000,
      preventDuplicate: true,
    });
};

export default useNotis;
