import { useEffect } from "react";
import DrawTableTr from "./DrawTableTr";
import DrawTableHead from "./DrawTableHead";
import { Button } from "antd";
import { PiWarningBold } from "react-icons/pi";
import { useAppStore } from "../../../store/store";
import { QueryKeys } from "../../../enums/react-query";
import { useQuery } from "@tanstack/react-query";

const TransactionsDraw = () => {
  const drawerId = useAppStore((state) => state.drawerId);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalData = useAppStore((state) => state.setModalData);

  // const {
  //   isLoading: getTransactionDataIsLoading,
  //   error,
  //   data: transactionData,
  // } = useQuery({
  //   queryKey: [QueryKeys.GETTRANSACTIONDATA, drawerId],
  //   queryFn: async () => {
  //     const res = await getTransaction(drawerId);
  //     return res.data;
  //   },
  // });

  // const handleReportTransaction = () => {
  //   setModalType("reportTransaction");
  //   setModalIsOpen(true);
  //   setModalData([transactionData?.payload._id]);
  // };

  return (
    <div className="max-md:p-[15px] p-[30px] w-full">
      <h5 className="text-[16px] 2xl:text-[20px] font-[600] text-[#374151]">
        DETAILS
      </h5>

      <div className="mt-[30px]">
        {/* <table className="w-full">
          <thead>
            <DrawTableHead
              title1="Transaction details"
              title2={
                new Date(
                  transactionData?.payload?.createdAt || ""
                ).toDateString() || ""
              }
              isLoading={getTransactionDataIsLoading}
            />
          </thead>
          <tbody>
            <DrawTableTr
              title={"Amount paid"}
              value={`${transactionData?.payload?.amount || ""} USDC`}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Transaction fee"}
              value={`${transactionData?.payload?.transactionFee || ""} USDC`}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Net Pay"}
              value={`${transactionData?.payload?.netPay || ""} USDC`}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Status"}
              value={
                <StatusValue
                  value={transactionData?.payload?.status}
                  className="ml-auto"
                />
              }
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Memo"}
              value={transactionData?.payload?.memo}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Transaction hash"}
              value={transactionData?.payload?.transactionHash}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Description"}
              value={transactionData?.payload?.description}
              isLoading={getTransactionDataIsLoading}
            />
          </tbody>
        </table> */}
      </div>

      {/* <div className="mt-[45px]">
        <table className="w-full">
          <thead>
            <DrawTableHead
              title1="customer information"
              title2=""
              isLoading={getTransactionDataIsLoading}
            />
          </thead>
          <tbody>
            <DrawTableTr
              title={"Full name"}
              value={transactionData?.payload?.customer?.fullName || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Email"}
              value={transactionData?.payload?.customer?.email || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Phone number"}
              value={transactionData?.payload?.customer?.phone || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Address"}
              value={transactionData?.payload?.customer?.address || ""}
              isLoading={getTransactionDataIsLoading}
            />
          </tbody>
        </table>
      </div> */}

      {/* <div className="mt-[45px]">
        <table className="w-full">
          <thead>
            <DrawTableHead
              title1="device information"
              title2={""}
              isLoading={getTransactionDataIsLoading}
            />
          </thead>
          <tbody>
            <DrawTableTr
              title={"Serial number"}
              value={transactionData?.payload?.device?.serialNumber || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Starting code"}
              value={transactionData?.payload?.device?.startingCode || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Key"}
              value={transactionData?.payload?.device?.key || ""}
              isLoading={getTransactionDataIsLoading}
            />
            <DrawTableTr
              title={"Total Cost"}
              value={transactionData?.payload?.device?.totalCost || ""}
              isLoading={getTransactionDataIsLoading}
            />
          </tbody>
        </table>
      </div> */}

      {/* <div className="mt-[30px] flex justify-end">
        <Button
          type="primary"
          className="rounded-[8px] h-[40px] !px-[16px] !py-[10px] flex items-center text-darkYellow font-[500] text-[14px] 2xl:text-[16px] bg-[#FFF1DA] hover:!bg-[#FFF1DA] hover:!text-darkYellow hover:opacity-[0.8] "
          icon={<PiWarningBold className="text-[20px] text-darkYellow" />}
          onClick={handleReportTransaction}
        >
          {" "}
          Report Transaction
        </Button>
      </div> */}
    </div>
  );
};

export default TransactionsDraw;
