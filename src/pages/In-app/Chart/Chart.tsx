import { TradingViewWidget } from "../../../components/Elements/TradingViewWidget";

const Chart = () => {
  return (
    <section className="w-full h-full ">
      <div className="top max-md:mt-[20px] max-md:mb-[30px] mt-[36px] mb-[30px]">
        <h1 className="max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
          Trading Chart
        </h1>
        <p className="text-[16px] 2xl:text-[18px] font-[300] leading-normal">
          View the trading chart live
        </p>
      </div>
      <TradingViewWidget />
    </section>
  );
};

export default Chart;
