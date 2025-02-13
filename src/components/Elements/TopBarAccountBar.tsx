import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { QueryKeys } from "../../enums/react-query";
import { getUserWallet } from "../../services/user/user.service";
import { useAppStore } from "../../store/store";
import { getCurrentRate, handleWalletAddress } from "../../utils/helper";

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
  const hideAccountBalance = useAppStore((state) => state.hideAccountBalance);
  return (
    <div className="px-4 w-full min-h-full flex items-center justify-start gap-6 border-[1px] border-grey rounded-[8px]">
      <div className="flex gap-2 items-center">
        {icon}
        {hideAccountBalance ? (
          <p className="text-black text-[16px] 2xl:text-[22px] h-full pt-[8px] tracking-[1px] align-middle">
            *****
          </p>
        ) : (
          <p className="text-black text-[14px] 2xl:text-[16px]">{amount}</p>
        )}
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

  const [converted, setConverted] = useState(0);

  const getBtcEqiv = async (value: number) => {
    const rateObj = await getCurrentRate("BTC");
    const rate = rateObj["bitcoin"].usd;
    const final = value / rate;
    setConverted(final);
    return final;
  };

  const {
    isLoading: walletIsLoading,
    // error,
    data: walletData,
  } = useQuery({
    queryKey: [QueryKeys.GETUSERWALLETDATATWO],
    queryFn: async () => {
      const res = await getUserWallet();
      await getBtcEqiv(
        res.data.payload?.available + res.data?.payload?.usd || 0
      );
      return res.data;
    },
  });

  return (
    <div className="max-md:w-full w-[342px] h-[42px] overflow-hidden relative">
      <div
        className={`h-full w-full flex flex-col gap-2 transition duration-300 ${
          stage ? "translate-y-[-120%]" : "translate-y-[0%]"
        }`}
      >
        <AccountBar
          icon={
            <img
              src="../../usa_circle.png"
              className="w-[25px] h-[25px] m-0 rounded-full"
            />
          }
          amount={
            (
              walletData?.payload.available + walletData?.payload.usd
            ).toLocaleString() || 0.0
          }
          // details="0735...941, Access Bank"
          details=""
        />
        <AccountBar
          icon={
            <img
              src="../../coins/Bitcoin.png"
              className="w-[25px] h-[25px] m-0 rounded-full"
            />
          }
          amount={converted.toFixed(6)}
          details={
            handleWalletAddress(walletData?.payload.wallet_address) ?? ""
          }
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
