import { useEffect } from "react";
import DrawTableTr from "./DrawTableTr";
import StatusValue from "../../atoms/StatusValue";
import DrawTableHead from "./DrawTableHead";
import { Button } from "antd";
import { PiWarningBold } from "react-icons/pi";
import { useAppStore } from "../../../store/store";
import { QueryKeys } from "../../../enums/react-query";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "../../../services/transactions/transactions.service";
import { getWithdrawal } from "../../../services/withdrawal/withdrawal.service";
import { handleWalletAddress } from "../../../utils/helper";

const DashBoardDraw = () => {
  const drawerId = useAppStore((state) => state.drawerId);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalData = useAppStore((state) => state.setModalData);

  const {
    isLoading: getWithdrawalDataIsLoading,
    error,
    data: withdrawalData,
  } = useQuery({
    queryKey: [QueryKeys.GETWITHDRAWALDATA, drawerId],
    queryFn: async () => {
      const res = await getWithdrawal(drawerId);
      return res.data;
    },
  });

  const handleReportWIthdrawal = () => {
    setModalType("reportWithdrawal");
    setModalIsOpen(true);
    setModalData([withdrawalData?.payload._id]);
  };

  return (
    <div className="max-md:p-[15px] p-[30px] w-full">
      <h5 className="text-[16px] 2xl:text-[20px] font-[600] text-[#374151]">
        DETAILS
      </h5>

      <div className="mt-[30px]">
        <table className="w-full">
          <thead>
            <DrawTableHead
              title1="Withdrawal details"
              title2={
                new Date(
                  withdrawalData?.payload?.createdAt || ""
                ).toDateString() || ""
              }
              isLoading={getWithdrawalDataIsLoading}
            />
          </thead>
          <tbody>
            <DrawTableTr
              title={"Amount withdrawn"}
              value={`${withdrawalData?.payload?.amount || ""} ${withdrawalData?.payload?.currencySymbol || ""}`}
              isLoading={getWithdrawalDataIsLoading}
            />
            <DrawTableTr
              title={"Currency"}
              value={`${withdrawalData?.payload?.currency || ""}`}
              isLoading={getWithdrawalDataIsLoading}
            />
            <DrawTableTr
              title={"Status"}
              value={
                <StatusValue
                  value={withdrawalData?.payload?.status}
                  className="ml-auto"
                />
              }
              isLoading={getWithdrawalDataIsLoading}
            />
          </tbody>
        </table>
      </div>

      <div className="mt-[45px]">
        <table className="w-full">
          <thead>
            <DrawTableHead
              title1="Account information"
              title2=""
              isLoading={getWithdrawalDataIsLoading}
            />
          </thead>
          {withdrawalData?.payload?.destinationAccount?.accountType ===
          "fiat" ? (
            <tbody>
              <DrawTableTr
                title={"Full name"}
                value={
                  withdrawalData?.payload?.destinationAccount?.accountData
                    ?.accName || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
              <DrawTableTr
                title={"Account Number"}
                value={
                  withdrawalData?.payload?.destinationAccount?.accountData
                    ?.accNumber || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
              <DrawTableTr
                title={"Bank"}
                value={
                  withdrawalData?.payload?.destinationAccount?.accountData
                    ?.bank || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
              <DrawTableTr
                title={"Country"}
                value={withdrawalData?.payload?.country || ""}
                isLoading={getWithdrawalDataIsLoading}
              />
            </tbody>
          ) : (
            <tbody>
              <DrawTableTr
                title={"Chain"}
                value={
                  withdrawalData?.payload?.destinationAccount?.accountData
                    ?.chain || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
              <DrawTableTr
                title={"Wallet Address"}
                value={
                  handleWalletAddress(
                    withdrawalData?.payload?.destinationAccount?.accountData
                      ?.publicKey
                  ) || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
              <DrawTableTr
                title={"Token Type"}
                value={
                  withdrawalData?.payload?.destinationAccount?.accountType || ""
                }
                isLoading={getWithdrawalDataIsLoading}
              />
            </tbody>
          )}
        </table>
      </div>

      <div className="mt-[30px] flex justify-end">
        <Button
          type="primary"
          className="rounded-[8px] h-[40px] !px-[16px] !py-[10px] flex items-center text-darkYellow font-[500] text-[14px] 2xl:text-[16px] bg-[#FFF1DA] hover:!bg-[#FFF1DA] hover:!text-darkYellow hover:opacity-[0.8] "
          icon={<PiWarningBold className="text-[20px] text-darkYellow" />}
          onClick={handleReportWIthdrawal}
        >
          {" "}
          Report Withdrawal
        </Button>
      </div>
    </div>
  );
};

export default DashBoardDraw;
