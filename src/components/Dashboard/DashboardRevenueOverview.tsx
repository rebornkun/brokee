import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TGraphTimeline } from "../../types/types";
import TimelineDropDown from "../Elements/TimelineDropDown";
import { chartTimelineOptions } from "../../utils/constants";
import { CreditCardAcceptSvg, CreditCardRefundSvg } from "../../assets/svg/svg";
import StatBox from "../Elements/StatBox";
import { Gauge } from "./gauge";
import { QueryKeys } from "../../enums/react-query";
import { useAppStore } from "../../store/store";
import { getTradeStats } from "../../services/trades/trades.service";

function DashboardRevenueOverview() {
  const [timeline, setTimeline] = useState<TGraphTimeline>("monthly");
  const userData = useAppStore((state) => state.userData);
  // const {
  //   isLoading: isRevenueOverviewLoading,
  //   data,
  //   refetch,
  // } = useQuery({
  //   queryKey: [QueryKeys.GETREVENUEOVERVIEW, timeline],
  //   queryFn: async ({ queryKey }) => {
  //     const [, timeline] = queryKey;
  //     const res = await getRevenueOverview(timeline);
  //     return res.data;
  //   },
  // });

  const {
    isLoading: userTradeStatsIsLoading,
    error: userTradeStatsErr,
    data: userTradeStatsData,
  } = useQuery({
    queryKey: [QueryKeys.GETTRADESSTATS, userData.id],
    queryFn: async () => {
      const res = await getTradeStats(userData.id);
      return res.data;
    },
  });

  const changeHandler = () => {
    // refetch();
  };

  // const revenueOverview = data?.payload as TRevenueOverview | undefined;
  const revenueOverview = {
    successCount: 0,
    successRate: 0,
    refundCount: 0,
    refundRate: 0,
    baseRate: 0,
  };

  console.log(userTradeStatsData);
  return (
    <div className="max-lg:w-full w-[47%] max-lg:h-fit h-[472px] border-[1px] border-[#EFEFEF] rounded-[8px] max-md:p-4 p-8 flex flex-col justify-between max-md:gap-6 gap-8">
      <div className="flex justify-between w-full">
        <p className="text-[22px] 2xl:text-[28px] font-[500]">Trades</p>
        {/* <TimelineDropDown
          options={chartTimelineOptions}
          state={timeline}
          setState={setTimeline}
          changeHandler={changeHandler}
        /> */}
      </div>
      <div className="flex flex-1 gap-4 max-sm:flex-col">
        <div className="flex flex-col gap-4 justify-between max-sm:w-full max-lg:w-[50%] w-[35%]">
          <StatBox
            icon={<CreditCardAcceptSvg className="" />}
            type="Won"
            amount={userTradeStatsData?.payload?.won ?? 0}
            percentage={userTradeStatsData?.payload?.wonPer ?? 0}
          />
          <StatBox
            icon={<CreditCardRefundSvg className="" />}
            type="Lost"
            amount={userTradeStatsData?.payload?.lost ?? 0}
            percentage={userTradeStatsData?.payload?.lostPer ?? 0}
          />
        </div>
        <div className="flex flex-col justify-between max-sm:w-full max-lg:w-[50%] w-[65%] h-full">
          <div className="bg-[#F9FAFB] rounded-[8px] w-full h-full flex flex-col p-6 gap-2">
            <div className="flex items-center justify-center flex-1 w-full">
              <Gauge
                value={userTradeStatsData?.payload?.wonPer ?? 0}
                gapPercent={6}
                strokeWidth={13}
                primary={"#00BD6F"}
                secondary={"#dbf9ec"}
                color="#8B8B94"
                fontWeight={600}
                fontSize={13}
                equal={true}
                className={"max-w-full h-full max-lg:w-[80%] max-lg:h-[80%]"}
              />
            </div>
            <div className="flex justify-between w-full mb-2">
              <div className="flex gap-[7px] items-center">
                <div className="w-[18px] h-[12px] bg-darkGreen" />
                <p className="text-black text-[12.5px] 2xl:text-[14px] font-[500]">
                  Won{" "}
                </p>
              </div>
              <div className="flex gap-[7px] items-center">
                <div className="w-[18px] h-[12px] bg-navGreen" />
                <p className="text-black text-[12.5px] 2xl:text-[14px] font-[500]">
                  Lost{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardRevenueOverview;
