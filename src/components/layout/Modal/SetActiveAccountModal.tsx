import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { BsBank2 } from "react-icons/bs";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  setActiveFiatAccountForDistributor,
  setActiveUsdcAccountForDistributor,
} from "../../../services/distributor/distributor.service";
import { useAppStore } from "../../../store/store";

const SetActiveAccountModal = () => {
  const modalType = useAppStore((state) => state.modalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const modalData = useAppStore((state) => state.modalData);
  const setModalData = useAppStore((state) => state.setModalData);

  const queryClient = useQueryClient();

  const { mutate: setActiveUsdcAccountMutate, isPending: activeUsdcIsPending } =
    useMutation({
      mutationKey: [MutationKeys.SETACTIVEUSDCACCOUNT],
      mutationFn: () => setActiveUsdcAccountForDistributor(modalData[0]),
      onSuccess: (data) => {
        setModalIsOpen(false);
        setModalData([]);
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETDISTRIBUTORUSDCACCOUNTS}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETAVAILABLEBALANCES}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const { mutate: setActiveFiatAccountMutate, isPending: activeFiatIsPending } =
    useMutation({
      mutationKey: [MutationKeys.SETACTIVEFIATACCOUNT],
      mutationFn: () => setActiveFiatAccountForDistributor(modalData[0]),
      onSuccess: (data) => {
        setModalIsOpen(false);
        setModalData([]);
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETDISTRIBUTORFIATACCOUNTS}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETAVAILABLEBALANCES}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const getText = () => {
    if (modalType === "setActiveFiatAccount") {
      return { head: "Fiat Account", body: "this fiat account" };
    } else if (modalType === "setActiveUsdcAccount") {
      return { head: "Usdc Account", body: "this usdc account" };
    }
  };

  const getSetActiveMutate = () => {
    if (modalType === "setActiveFiatAccount") {
      return setActiveFiatAccountMutate();
    } else if (modalType === "setActiveUsdcAccount") {
      return setActiveUsdcAccountMutate();
    }
  };

  return (
    <div className="w-[370px] h-[280px] bg-white rounded-[8px] shadow ">
      <div className="flex flex-col w-full h-full items-center justify-between p-[30px] ">
        <div className="rounded-full bg-yellow h-[59px] w-[59px] flex items-center justify-center ">
          <BsBank2 className="text-[33px] text-darkYellow " />
        </div>
        <div className="flex flex-col items-center justify-center gap-[2px] text-center">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[24px] text-[#1E1E1E]">
            Set {getText()?.head}?
          </h5>
          <p className="Nunito font-[300] text-[13px] 2xl:text-[15px] text-[#6B7280]">
            Are you sure you want to make {getText()?.body} your active
            withdrawal account?
          </p>
        </div>
        <div className="flex items-center justify-center w-full gap-[10px] ">
          <Button
            type="primary"
            htmlType="button"
            className="Nunito w-full max-w-[95px] h-[30px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
            loading={false}
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="Nunito w-full max-w-[95px] h-[30px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow !text-white hover:!text-white hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
            loading={activeUsdcIsPending || activeFiatIsPending}
            onClick={() => {
              getSetActiveMutate();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetActiveAccountModal;
