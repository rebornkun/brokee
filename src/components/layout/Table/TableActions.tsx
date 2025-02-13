import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { AdminRoutesUrl } from "../../../container/Routes";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  suspendUser,
  unSuspendUser,
} from "../../../services/user/user.service";
import { TUserData } from "../../../store/store.types";
import { TDepositData } from "../../../types/types";
import {
  approveDeposit,
  cancelDeposit,
} from "../../../services/deposits/deposits.service";

const TableActions = ({ userData }: { userData: TUserData | TDepositData }) => {
  const queryClient = useQueryClient();

  const { mutate: suspendUserMutate, isPending: suspendUserIsPending } =
    useMutation({
      mutationKey: [MutationKeys.SUSPENDUSER],
      mutationFn: () => {
        return suspendUser(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLUSERS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const { mutate: unSuspendUserMutate, isPending: unSuspendUserIsPending } =
    useMutation({
      mutationKey: [MutationKeys.SUSPENDUSER],
      mutationFn: () => {
        return unSuspendUser(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLUSERS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const { mutate: approveDepositMutate, isPending: approveDepositIsPending } =
    useMutation({
      mutationKey: [MutationKeys.APPROVEDEPOSIT],
      mutationFn: () => {
        return approveDeposit(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLDEPOSITS}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLDEPOSITSSTATS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const { mutate: cancelDepositMutate, isPending: cancelDepositIsPending } =
    useMutation({
      mutationKey: [MutationKeys.CANCELDEPOSIT],
      mutationFn: () => {
        return cancelDeposit(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLDEPOSITS}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLDEPOSITSSTATS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const location = useLocation();

  return (
    <div className="flex gap-2">
      {location.pathname === AdminRoutesUrl.USERS ? (
        <Button
          className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] !Noto w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer "
          onClick={() => {
            if ((userData as TUserData).state === "inactive") {
              unSuspendUserMutate();
            } else {
              suspendUserMutate();
            }
          }}
          loading={suspendUserIsPending || unSuspendUserIsPending}
        >
          {(userData as TUserData).state === "inactive"
            ? "Unsuspend"
            : "Suspend"}
        </Button>
      ) : location.pathname === AdminRoutesUrl.DEPOSITS ? (
        <div className="flex gap-2">
          <Button
            className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] !Noto w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer "
            onClick={() => {
              approveDepositMutate();
            }}
            loading={approveDepositIsPending}
          >
            Approve
          </Button>
          <Button
            className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] !Noto w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer "
            onClick={() => {
              cancelDepositMutate();
            }}
            loading={cancelDepositIsPending}
          >
            Reject
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] !Noto w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer "
            onClick={() => {
              approveDepositMutate();
            }}
            loading={approveDepositIsPending}
          >
            Approve
          </Button>
          <Button
            className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] !Noto w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer "
            onClick={() => {
              cancelDepositMutate();
            }}
            loading={cancelDepositIsPending}
          >
            Reject
          </Button>
        </div>
      )}

      {/* <Button className="!text-[#6B7280] !bg-[#FFFFFF] hover:!text-[#6B7280] Nunito w-fit h-fit flex items-center justify-center   hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD]  !border-[1px] rounded-[8px] cursor-pointer ">
        Suspend
      </Button> */}
    </div>
  );
};

export default TableActions;
