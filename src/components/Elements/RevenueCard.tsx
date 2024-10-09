import moment from "moment";
import { IoMdArrowForward } from "react-icons/io";
import { useAppStore } from "../../store/store";
import { TRevenueData } from "../../types/types";
import { currencyFormatter } from "../../utils/helper";
import { RefreshSvg } from "../../assets/svg/svg";

type Prop = {
  type: "revenue" | "transactions";
  title: string;
  icon: React.ReactNode;
  amount: number;
  percentage?: number;
  lastUpdated?: Date;
  currencySymbol?: string;
  isLoading?: boolean;
  revenues?: TRevenueData[];
  activeIndex?: number;
};

const RevenueCard = ({
  type,
  title,
  icon,
  amount,
  percentage,
  lastUpdated,
  currencySymbol,
  isLoading,
  revenues,
  activeIndex,
}: Prop) => {
  const hideAccountBalance = useAppStore((state) => state.hideAccountBalance);
  return (
    <div className="rounded-[8px] bg-darkGreen h-full min-w-full relative cursor-pointer overflow-hidden box-border">
      <div className="designBox h-[65px] w-[96px] bg-gradient-to-r from-[#efefef6E] to-[#F8F2E800] rotate-[115deg] absolute bottom-[35px] right-[80px] "></div>
      <div className="designBox h-[65px] w-[96px] bg-gradient-to-r from-[#efefef6E] to-[#F8F2E800] rotate-[115deg] absolute bottom-[0px] right-[-10px] "></div>
      <div
        className={`absolute w-full h-full flex items-center pr-4 ${
          type === "transactions" && "!p-6 !gap-4"
        } gap-2 `}
      >
        {icon}
        <div className="flex justify-between flex-1 text-white">
          <div
            className={`flex flex-col gap-[13px] ${
              type === "transactions" && "!mt-0"
            } mt-4 w-full`}
          >
            <p className="text-[14px] 2xl:text-[16px] font-[300] leading-[1] capitalize">
              Total {title}
            </p>
            <div className="flex justify-between w-full">
              {hideAccountBalance ? (
                <h2 className="text-[30px] 2xl:text-[34px] font-[400] leading-[1] h-[30px] pt-[6px] tracking-[1px] align-middle">
                  *****
                </h2>
              ) : (
                <h2 className="text-[30px] 2xl:text-[34px] font-[400] leading-[1] ">
                  {currencySymbol}
                  {currencyFormatter(amount)}
                </h2>
              )}
              {percentage && (
                <div className="bg-[#9fe0b2] rounded-[8px] flex items-center gap-[5px] p-[5px] py-[2px] ">
                  <IoMdArrowForward
                    className={`text-white ${
                      percentage < 0 ? "rotate-[45deg]" : "rotate-[-45deg]"
                    } font-[700] transition-all duration-300 `}
                  />
                  <p className="text-[13px] 2xl:text-[15px] font-[300] leading-[1]">
                    {percentage % 1 === 0 ? percentage : percentage.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
            <p className="text-[14px] 2xl:text-[16px] font-[300] leading-[1] flex items-center gap-[16px]">
              Last updated {moment(lastUpdated).startOf("minutes").fromNow()}{" "}
              <RefreshSvg
                className={`cursor-pointer ${isLoading && "animate-spin"}`}
              />
            </p>
            {type !== "transactions" && (
              <div className="flex gap-[5px]">
                {revenues?.map((rev, ind, arr) => (
                  <div
                    key={ind}
                    className={`w-[7px] h-[7px] bg-${
                      activeIndex === ind ? "white" : "transparent"
                    } border-[1px] border-white rounded-full`}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <div className="flex "></div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;
