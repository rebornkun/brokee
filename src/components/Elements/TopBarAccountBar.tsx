import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { NigeriaFlagSvg, USDCFlagSvg } from "../../assets/svg/svg";

const NAIRA_AMOUNT = 50000;

function AccountBar({
  icon,
  amount,
  details,
}: {
  icon: React.ReactNode;
  amount: string | number;
  details: string;
}) {
  return (
    <div className="px-4 w-full min-h-full flex items-center justify-start gap-6 border-[1px] border-grey rounded-[8px]">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="text-black text-[14px] 2xl:text-[16px]">{amount}</p>
      </div>
      <p className="text-textLightGrey text-[14px] 2xl:text-[16px]">
        {details}
      </p>
    </div>
  );
}

function TopBarAccountBar() {
  const [stage, setStage] = useState(false);

  const handleToggle = () => {
    setStage((prev) => !prev);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="max-md:w-full w-[342px] h-[42px] overflow-hidden relative">
      <div
        className={`h-full w-full flex flex-col gap-2 transition duration-300 ${
          stage ? "translate-y-[-120%]" : "translate-y-[0%]"
        }`}
      >
        <AccountBar
          icon={<NigeriaFlagSvg className="" />}
          amount={NAIRA_AMOUNT.toLocaleString()}
          details="0735...941, Access Bank"
        />
        <AccountBar
          icon={<USDCFlagSvg className="" />}
          amount={500}
          details="500USIhducbe...vu2hjjbjDC"
        />
      </div>
      <div
        role="button"
        tabIndex={0}
        className="h-[24px] w-[24px] flex flex-col items-center justify-center cursor-pointer shadow rounded-[8px] absolute m-auto top-0 bottom-0 right-4 transition hover:scale-[1.15]"
        onClick={handleToggle}
        onKeyPress={handleKeyPress}
      >
        <MdKeyboardArrowUp className="text-[24px] text-darkYellow" />
        <MdKeyboardArrowDown className="text-[24px] text-darkYellow" />
      </div>
    </div>
  );
}

export default TopBarAccountBar;
