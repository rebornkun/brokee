import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PiWarningBold } from "react-icons/pi";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { deleteDevices } from "../../../services/devices/devices.service";
import { useAppStore } from "../../../store/store";
import { ChangeEvent, useState } from "react";
import { reportTransaction } from "../../../services/transactions/transactions.service";

const ReportTransactionModal = () => {
  const modalType = useAppStore((state) => state.modalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const modalData = useAppStore((state) => state.modalData);
  const setModalData = useAppStore((state) => state.setModalData);

  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  const {
    mutate: reportTransactionMutate,
    isPending: reportTransactionIsLoading,
  } = useMutation({
    mutationKey: [MutationKeys.REPORTTRANSACTION],
    mutationFn: () => reportTransaction(modalData[0], message),
    onSuccess: (data) => {
      setModalIsOpen(false);
      setIsDrawerOpen(false);
      setModalData([]);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETTRANSACTIONTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="w-[420px] h-[370px] bg-white rounded-[8px] shadow ">
      <div className="flex flex-col w-full h-full items-center justify-between p-[30px] ">
        <div className="rounded-full bg-yellow h-[59px] w-[59px] flex items-center justify-center ">
          <PiWarningBold className="text-[33px] text-darkYellow" />
        </div>
        <div className="flex flex-col items-center justify-center gap-[2px] text-center w-full ">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[24px] text-[#1E1E1E]">
            Report Transaction
          </h5>
          <p className="Nunito font-[300] text-[13px] 2xl:text-[15px] text-[#6B7280]">
            Please enter reason for report!
          </p>
          <div className="my-2 w-full">
            <TextArea
              onChange={handleMessageChange}
              className="h-[110px] !min-h-[110px] max-h-[110px] Nunito bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] 2xl:text-[16px] font-[300] !text-[#667085]"
            />
          </div>
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
            loading={reportTransactionIsLoading}
            onClick={() => {
              reportTransactionMutate();
            }}
          >
            Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportTransactionModal;
