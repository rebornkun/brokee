import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import StatBlock from "./StatBlock";

type TDashboardStats = {
  deposit: number;
  available: number;
  withdrawn: number;
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
        value={stats.deposit}
        isLoading={isLoading}
      />
      <StatBlock
        icon={
          <div className="rounded-full bg-navGreen p-2 flex items-center justify-center">
            <GiTakeMyMoney className="text-[20px] text-darkGreen" />
          </div>
        }
        text="Available"
        value={stats.available}
        isLoading={isLoading}
      />
      <StatBlock
        icon={
          <div className="rounded-full bg-navGreen p-2 flex items-center justify-center">
            <GiReceiveMoney className="text-[20px] text-darkGreen" />
          </div>
        }
        text="Withdrawn"
        value={stats.withdrawn}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashBoardStats;
