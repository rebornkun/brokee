import { useState } from "react";
import RevenueCard from "./RevenueCard";
import { NigeriaFlagSvg, USDCFlagSvg } from "../../assets/svg/svg";

const NAIRA_AMOUNT = 50560.56;
const CRYPTO_AMOUNT = 50560.56;
const PERCENTAGE = 4.0;

function TotalRevenueSlides() {
  const [stage, setStage] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setStage((prev) => !prev);
    }
  };

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
          icon={<NigeriaFlagSvg className="w-[45px] h-[45px] mx-2" />}
          amount={20000}
          currencySymbol={"₦"}
          percentage={4.0}
        />
        <RevenueCard
          type="revenue"
          title="revenue"
          icon={<USDCFlagSvg className="w-[45px] h-[45px] mx-2" />}
          amount={30000}
          currencySymbol={"$"}
          percentage={PERCENTAGE}
        />
      </div>
    </div>
  );
}

export default TotalRevenueSlides;
