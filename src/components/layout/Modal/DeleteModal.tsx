import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { logOutUser } from "../../../services/auth/auth.service";
import {
  deleteFiatAccount,
  deleteUser,
  deleteUserWallet,
} from "../../../services/user/user.service";
import { useAppStore } from "../../../store/store";
import { DeleteSvg } from "../../../assets/svg/svg";

const DeleteModal = () => {
  const userData = useAppStore((state) => state.userData);
  const modalType = useAppStore((state) => state.modalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const modalData = useAppStore((state) => state.modalData);
  const setModalData = useAppStore((state) => state.setModalData);

  const queryClient = useQueryClient();

  const { mutate: deleteUserMutate, isPending: deleteDistributorIsPending } =
    useMutation({
      mutationKey: [MutationKeys.DELETEUSER],
      mutationFn: () => deleteUser(userData),
      onSuccess: (data) => {
        setModalIsOpen(false);
        setIsDrawerOpen(false);
        setModalData([]);
        logOutUser();
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const {
    mutate: deleteFiatAccountForDistributorMutate,
    isPending: deleteFiatAccountForDistributorIsPending,
  } = useMutation({
    mutationKey: [MutationKeys.DELETEFIATACCOUNT],
    mutationFn: () => deleteFiatAccount(modalData[0]),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETUSERWALLETDATA],
      });
      setModalIsOpen(false);
      setModalData([]);
    },
  });

  const {
    mutate: deleteUsdcAccountForUserMutate,
    isPending: deleteUsdcAccountForUserIsPending,
  } = useMutation({
    mutationKey: [MutationKeys.DELETEWALLETADDRESS],
    mutationFn: () => deleteUserWallet(modalData[0]),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETUSERWALLETDATA],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.GETAVAILABLEBALANCES],
      // });
      setModalIsOpen(false);
      setModalData([]);
    },
  });

  const getText = () => {
    if (modalType === "deleteUser") {
      return { head: "Account", body: "your Account" };
    } else if (modalType === "deleteFiatAccount") {
      return { head: "Fiat Account", body: "this fiat account" };
    } else if (modalType === "deleteUsdcAccount") {
      return { head: "Wallet", body: "this wallet" };
    }
  };

  const getDeleteMutate = () => {
    if (modalType === "deleteUser") {
      return deleteUserMutate();
    } else if (modalType === "deleteFiatAccount") {
      return deleteFiatAccountForDistributorMutate();
    } else if (modalType === "deleteUsdcAccount") {
      return deleteUsdcAccountForUserMutate();
    }
  };

  return (
    <div className="w-[370px] h-[280px] bg-white rounded-[8px] shadow ">
      <div className="flex flex-col w-full h-full items-center justify-between p-[30px] ">
        <div className="rounded-full bg-navGreen h-[59px] w-[59px] flex items-center justify-center ">
          <DeleteSvg className="w-[33px] h-[33px] " color={"#00BD6F"} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[2px] text-center">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[24px] text-[#1E1E1E]">
            Delete {getText()?.head}?
          </h5>
          <p className="Nunito font-[300] text-[13px] 2xl:text-[15px] text-[#6B7280]">
            Are you sure you want to delete {getText()?.body}? <br></br>This
            action cannot be undone
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
            className="Nunito w-full max-w-[95px] h-[30px] flex items-center justify-center bg-darkRed hover:!bg-darkRed !text-white hover:!text-white hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
            loading={
              deleteDistributorIsPending ||
              deleteUsdcAccountForUserIsPending ||
              deleteFiatAccountForDistributorIsPending
            }
            onClick={() => {
              getDeleteMutate();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
