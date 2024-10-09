import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useAppStore } from "../../store/store";
import { GrCopy } from "react-icons/gr";

const TradesGreeting = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setDrawerType = useAppStore((state) => state.setDrawerType);
  return (
    <div className="top max-md:mt-[20px] max-md:mb-[30px] mt-[36px] mb-[50px] flex justify-between items-center gap-[36px] flex-wrap">
      <div className="">
        <h1 className="max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
          Trades
        </h1>
        <p className="text-[16px] 2xl:text-[18px] font-[300] leading-normal">
          Track, manage and forecast yours trades and traders
        </p>
      </div>
      <Button
        type="primary"
        className="rounded-[8px] h-[40px] !px-[24px] !py-[10px] flex items-center text-white font-[500] text-[14px] 2xl:text-[16px] bg-darkGreen hover:!bg-darkGreen hover:!text-white hover:opacity-[0.8] "
        icon={<GrCopy className="text-[20px] text-white" />}
        onClick={() => {
          setDrawerType("addCustomer");
          setIsDrawerOpen(true);
        }}
      >
        {" "}
        Copy Trades
      </Button>
    </div>
  );
};

export default TradesGreeting;
