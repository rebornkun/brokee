import { IoMdArrowForward } from "react-icons/io";
import StatBlock from "./StatBlock";
import { ReactElement } from "react";

const TransactionStats = ({
  icon1,
  icon2,
  title1,
  title2,
  value1,
  value2,
  percentage1,
  percentage2,
  isLoading,
}: {
  icon1: ReactElement;
  icon2: ReactElement;
  title1: string;
  title2: string;
  value1: number;
  value2: number;
  percentage1?: number;
  percentage2?: number;
  isLoading: boolean;
}) => {
  return (
    <div className="gap-[10px] w-full flex items-center justify-between border-[1px] border-[#EFEFEF] rounded-[8px]">
      <div className=" flex justify-between items-end h-[149px] w-[49%] md:w-[40%] max-md:px-4 p-6 iconColorYellow">
        <StatBlock
          left={true}
          icon={icon1}
          text={title1}
          value={value1}
          isLoading={isLoading}
        />
        {percentage1 && (
          <div
            className={`${
              percentage1 < 0 ? "bg-[#FDE8E8]" : "bg-[#DEF7EC]"
            } rounded-[8px] flex items-center gap-[5px] p-[7px] py-[4px] h-fit transition-all duration-300 `}
          >
            <IoMdArrowForward
              className={`${
                percentage1 < 0
                  ? "text-darkRed rotate-[45deg]"
                  : "text-freshGreen rotate-[-45deg]"
              } font-[700] transition-all duration-300`}
            />
            <p
              className={`text-[13px] 2xl:text-[15px] font-[300] leading-[1] ${
                percentage1 < 0 ? "text-darkRed" : "text-freshGreen "
              } transition-all duration-300`}
            >
              {percentage1.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
      <div className="h-[64px] w-[1px] bg-[#E5E7EB] "></div>
      <div className=" flex justify-between items-end h-[149px] w-[49%] w-[40%] max-md:px-4 p-6 iconColorYellow">
        <StatBlock
          left={true}
          icon={icon2}
          text={title2}
          value={value2}
          isLoading={isLoading}
        />
        {percentage2 && (
          <div
            className={`${
              percentage2 < 0 ? "bg-[#FDE8E8]" : "bg-[#DEF7EC]"
            } rounded-[8px] flex items-center gap-[5px] p-[7px] py-[4px] h-fit transition-all duration-300`}
          >
            <IoMdArrowForward
              className={`${
                percentage2 < 0
                  ? "text-darkRed rotate-[45deg]"
                  : "text-freshGreen rotate-[-45deg]"
              } font-[700] transition-all duration-300`}
            />
            <p
              className={`text-[13px] 2xl:text-[15px] font-[300] leading-[1] ${
                percentage2 < 0 ? "text-darkRed" : "text-freshGreen "
              } transition-all duration-300`}
            >
              {percentage2.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStats;
