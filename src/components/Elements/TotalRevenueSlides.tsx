import { useEffect, useState } from "react";
import RevenueCard from "./RevenueCard";
import { NigeriaFlagSvg, USDCFlagSvg } from "../../assets/svg/svg";
import { useAppStore } from "../../store/store";
import { currencyFormatter, getCurrentRate } from "../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/react-query";
import { getUserWallet } from "../../services/user/user.service";

const NAIRA_AMOUNT = 50560.56;
const CRYPTO_AMOUNT = 50560.56;
const PERCENTAGE = 4.0;

function TotalRevenueSlides() {
  const [stage, setStage] = useState(false);
  const [rateIsLoading, setRateIsLoading] = useState(false);
  const [converted, setConverted] = useState(0);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setStage((prev) => !prev);
    }
  };

  const getBtcEqiv = async (value: number) => {
    setRateIsLoading(true);
    const rateObj = await getCurrentRate("BTC");
    const rate = rateObj["bitcoin"].usd;
    setRateIsLoading(false);
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
        res.data.payload?.available + res.data?.payload?.earned || 0
      );
      return res.data;
    },
  });

  return (
    <div className="max-lg:w-full w-[390px]  h-[149px] overflow-hidden relative">
      <div
        className={`h-full w-full flex gap-2 transition duration-300 ${
          stage
            ? "max-sm:translate-x-[-102%] max-lg:translate-x-[-101%] translate-x-[-102%]"
            : "translate-x-[0%]"
        }`}
        onClick={() => {
          setStage((prev) => !prev);
        }}
        role="button"
        tabIndex={0}
        onKeyPress={handleKeyPress}
        aria-label="Toggle revenue cards"
      >
        <RevenueCard
          type="revenue"
          title="revenue"
          icon={
            <img
              src="../../coins/usdt.svg"
              className="w-[45px] h-[45px] mx-2 rounded-full"
            />
            // <NigeriaFlagSvg className="w-[45px] h-[45px] mx-2" />
          }
          amount={currencyFormatter(
            walletData?.payload?.available + walletData?.payload?.earned || 0
          )}
          currencySymbol={"$"}
        />
        <RevenueCard
          type="revenue"
          title="revenue"
          icon={
            <img
              src="../../coins/Bitcoin.png"
              className="w-[45px] h-[45px] mx-2 rounded-full"
            />
            // <USDCFlagSvg className="w-[45px] h-[45px] mx-2" />
          }
          amount={converted.toFixed(6)}
          currencySymbol={"BTC "}
        />
      </div>
    </div>
  );
}

export default TotalRevenueSlides;
