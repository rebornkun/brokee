import { toast } from "sonner";
import { useAppStore } from "../../store/store";
import { UsdcChains } from "../../types/types";
import {
  capitalizeWords,
  checkIfUserAlreadyHaveAccountType,
} from "../../utils/helper";

const SelectUsdcNetwork = ({
  name,
  icon,
  state,
  setState,
}: {
  name: UsdcChains;
  icon: string;
  state: UsdcChains | undefined;
  setState: (network: UsdcChains) => void;
}) => {
  const userUsdcAccounts = useAppStore((state) => state.userUsdcAccounts);

  return (
    <div
      className={`rounded-[8px] max-md:h-[50px]  h-[100px] flex-1 border-[1px] border-grey cursor-pointer flex flex-col max-md:flex-row items-center justify-center gap-2 transition-all ${
        state === name ? "border-green border-[2px]" : "opacity-[0.5] "
      } hover:opacity-[0.7]`}
      onClick={() => {
        if (checkIfUserAlreadyHaveAccountType(name, userUsdcAccounts, "usdc")) {
          toast.warning(
            "you already have this network type connected to your account. you can delete the previous one and try again."
          );
        } else {
          setState(name);
        }
      }}
    >
      <img
        src={icon}
        className="max-md:w-[20px] max-md:h-[20px] w-[30px] w-[30px]"
      />
      <p className="max-md:text-[14px] text-[16px] text-black font-[500]">
        {capitalizeWords(name)}
      </p>
    </div>
  );
};

export default SelectUsdcNetwork;
