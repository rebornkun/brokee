import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import StatBlock from "./StatBlock";

type TDashboardStats = {
  noOfCustomers: number;
  noOfDevices: number;
  noOfTransactions: number;
};
const DashBoardStats = ({
  stats,
  isLoading,
}: {
  stats: TDashboardStats;
  isLoading: boolean;
}) => {
  return (
    <div className="flex-1 flex justify-between h-[149px] border-[1px] border-[#EFEFEF] rounded-[8px] max-md:px-4 px-8 p-6 iconColorYellow">
      <StatBlock
        icon={
          <div className="rounded-full bg-navGreen p-2 flex items-center justify-center">
            <GiPayMoney className="text-[20px] text-darkGreen" />
          </div>
        }
        text="Deposits"
        value={stats.noOfDevices}
        isLoading={isLoading}
      />
      <StatBlock
        icon={
          <div className="rounded-full bg-navGreen p-2 flex items-center justify-center">
            <GiTakeMyMoney className="text-[20px] text-darkGreen" />
          </div>
        }
        text="Profits"
        value={stats.noOfCustomers}
        isLoading={isLoading}
      />
      <StatBlock
        icon={
          <div className="rounded-full bg-navGreen p-2 flex items-center justify-center">
            <GiReceiveMoney className="text-[20px] text-darkGreen" />
          </div>
        }
        text="Withdrawn"
        value={stats.noOfTransactions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashBoardStats;
