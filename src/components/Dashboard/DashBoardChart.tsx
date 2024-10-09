import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TimelineDropDown from "../Elements/TimelineDropDown";
import { graphTimelineOptions } from "../../utils/constants";
import { DashboardGraph } from "./DashboardGraph";
import { TGraphTimeline } from "../../types/types";

function DashBoardChart() {
  // const { isLoading: isGraphDataLoading, data } = useQuery({
  //   queryKey: [QueryKeys.GETGRAPHDATA],
  //   queryFn: async () => {
  //     const res = await getGraphData();

  //     return res.data;
  //   },
  // });

  // const graphData = data?.payload as TGraphData[] | undefined;
  // const graphData = data?.payload as TGraphData[] | undefined;

  // const currencies = graphData?.map((data) => data.currency);
  // const [currencyFlag, setCurrencyFlag] = useState<string | undefined>(
  //   currencies?.[0]?.flag
  // );

  // const selectedCurrency = currencies?.find((acc) => acc.flag === currencyFlag);

  const [timeline, setTimeline] = useState<TGraphTimeline>("daily");

  // const selectedGraphData: TAxisData | undefined = graphData?.find(
  //   (data) => data.currency.code === selectedCurrency?.code
  // )?.data[timeline];

  // useEffect(() => {
  //   if (data && !currencyFlag) {
  //     const res = data.payload as TGraphData[];
  //     setCurrencyFlag(res?.[0]?.currency.flag);
  //   }
  // }, [data]);

  return (
    <div className="max-lg:w-full w-[53%] max-md:h-[450px] max-lg:h-fit h-[472px] border-[1px] border-[#EFEFEF] rounded-[8px] max-md:p-4 p-8 flex flex-col max-md:gap-6 gap-10 justify-between">
      <div className="flex justify-between w-full">
        <p className="text-[22px] 2xl:text-[28px] font-[500]">
          Revenue Overview
        </p>
        <div className="flex align-middle">
          {/* <CurrencyDropDown
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            currencyFlag={currencyFlag}
            setCurrencyFlag={setCurrencyFlag}
          /> */}
          <TimelineDropDown
            options={graphTimelineOptions}
            state={timeline}
            setState={setTimeline}
          />
        </div>
      </div>
      <div className="flex-1 !max-h-[100%] w-full !flex items-end">
        {/* <DashboardGraph
          data={selectedGraphData}
          currencySymbol={selectedCurrency?.symbol}
        /> */}
      </div>
    </div>
  );
}

export default DashBoardChart;
