import toast from "react-hot-toast";

export const DarkToast = (text: string) => {
  toast(text, {
    icon: "⌘",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const SuccessNotification = (message: string) => {
  toast.success(message);
};

export const ErrorNotification = (errMessage: string) => {
  toast.error(errMessage);
};

export const PromiseNotification = (
  promiseReq: Promise<any | void>,
  loadingMessage: string,
  completingMessage: string,
  funcOnSuccess?: () => void,
  funcOnError?: () => void
) => {
  toast.promise(promiseReq, {
    loading: loadingMessage,
    error: (err: any) => {
      let message =
        err?.response?.data || String(err) || "Something went wrong";
      funcOnError?.();
      return message;
    },
    success: (res: any) => {
      funcOnSuccess?.();
      return completingMessage;
    },
  });
};
