import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { MutationKeys } from "../enums/react-query";

import { AccessToken } from "../enums/access-token";
import { ToastStatus } from "../enums/react-hot-toast";
import { DefaultResponse } from "../types/default-response.dto";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 0,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
  mutationCache: new MutationCache({
    onError(err: unknown) {
      const error = new Error(err as string);
      // const parsedError = errorParser(error);
      // if (parsedError) toast.error(parsedError);
      toast.error(error.message);
    },
    onSettled(res, _, __, ___, mutation) {
      const response = res as DefaultResponse;
      if (response && response.data) {
        // const isVerifyOtpMutate =
        //   mutation.options.mutationKey &&
        //   mutation.options.mutationKey[0] === MutationKeys.VERIFYOTP;

        // if (isVerifyOtpMutate) {
        //   const { token } = response.data.payload;
        //   localStorage.setItem(AccessToken.KEY, token);
        // }

        const { alert } = response.data ?? {};
        if (alert && alert.type === ToastStatus.SUCCESS) {
          if (alert.message) {
            toast.success(alert.message);
          }
        } else if (alert && alert.type === ToastStatus.ERROR) {
          if (alert.message) {
            toast.error(alert.message);
          }
        }
      }
    },
  }),
  queryCache: new QueryCache({
    onError(err: unknown) {
      const error = new Error(err as string);
      // const parsedError = errorParser(error);
      // if (parsedError || error.message) {
      //   toast.error(parsedError || error.message);
      // }
      toast.error(error.message);
    },
    onSettled(res: any) {
      const response = res as DefaultResponse;

      if (response) {
        const { alert } = response.data ?? {};
        if (alert && alert.type === ToastStatus.SUCCESS) {
          if (alert.message) {
            toast.success(alert.message);
          }
        } else if (alert && alert.type === ToastStatus.ERROR) {
          if (alert.message) {
            toast.error(alert.message);
          }
        }
      }
    },
  }),
});
