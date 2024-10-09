import { Button } from "antd";
import { FaCheck } from "react-icons/fa6";
import { USDCFlagSvg } from "../../assets/svg/svg";

const PlanCard = ({
  name,
  title,
  isActive,
  amount,
  gains,
}: {
  name: string;
  title: string;
  isActive: boolean;
  amount: number;
  gains: string[];
}) => {
  return (
    <div
      className={`px-[20px] py-[24px] border-[1px] border-[#EFEFEF] rounded-[8px] max-w-[296px] w-[296px] max-sm:w-full max-sm:max-w-full flex flex-col ${
        !isActive && "bg-lightGreen"
      } `}
    >
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[17.5px] 2xl:text-[20px] text-[#1E1E1E] font-[600] leading-[24px] ">
            {name} Plan
          </p>
          <p className="text-[15.3px] 2xl:text-[17px] text-[#1E1E1E] font-[500] leading-[21px] ">
            {title}
          </p>
        </div>
        {isActive && (
          <div className="bg-[#DEF7EC] rounded-[8px] w-fit h-fit px-[10px] py-[2px] text-[12px] font-[400] text-green ">
            Active
          </div>
        )}
      </div>
      <div className="flex items-center gap-[10px] mt-[30px] ">
        <USDCFlagSvg className="w-[33px] h-[33px]" />
        <p className="text-[34px] 2xl:text-[40px] text-[#1E1E1E] font-[600] ">
          {amount}
        </p>
        <p className="text-[15.31px] 2xl:text-[18px] text-[#1E1E1E] font-[500] pl-[9px] ">
          /lifetime
        </p>
      </div>
      <div className="w-full mt-[30px] ">
        {isActive ? (
          <Button
            type="primary"
            htmlType="button"
            className="Nunito w-full h-[40px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] disabled:border-none !text-black hover:!text-black hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
            loading={false}
            disabled
          >
            Current plan
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="Nunito w-full h-[40px] flex items-center justify-center bg-darkGreen hover:!bg-darkGreen hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
            loading={false}
          >
            Upgrade
          </Button>
        )}
      </div>
      <div className="w-full flex flex-col gap-[14.5px] mt-[30px] ">
        {gains.map((datum, index) => {
          return (
            <div key={index} className="flex items-center gap-[22px] ">
              <div className="h-[20px] w-[20px] bg-[#BCF0DA60] rounded-[8px] flex items-center justify-center  ">
                <FaCheck className="text-[#0E9F6E] text-[11px] " />
              </div>
              <p className="text-[15.31px] 2xl:text-[18px] text-[#1E1E1E] font-[500] ">
                {datum}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanCard;
