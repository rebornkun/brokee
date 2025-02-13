import { Button } from "antd";
import { UserSvg } from "../../assets/svg/svg";
import { capitalizeWords, currencyFormatter } from "../../utils/helper";
import { LuCopyMinus, LuCopyPlus } from "react-icons/lu";
import { TTrader } from "../../types/types";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "../../enums/react-query";
import { copyTrader, stopTrader } from "../../services/trades/trades.service";
import { useAppStore } from "../../store/store";
import { queryClient } from "../../utils/react-query";
import { toast } from "sonner";

const TraderBar = ({
  fullName,
  id,
  imgUrl,
  profitShare,
  winRate,
  minDeposit,
}: TTrader) => {
  const userData = useAppStore((state) => state.userData);
  const userWallet = useAppStore((state) => state.userWallet);
  const { mutate: copyTraderMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.COPYTRADER],
    mutationFn: (traderId: string) => {
      return copyTrader(traderId, userData.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETUSERDATA}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETALLTRADERS}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const { mutate: stopTraderMutate, isPending: stopTraderIsPending } =
    useMutation({
      mutationKey: [MutationKeys.STOPTRADER],
      mutationFn: () => {
        return stopTrader(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETUSERDATA}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLTRADERS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  return (
    <div className=" ">
      <div className="w-full h-full flex items-center gap-8 flex-wrap max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-[14px] !text-black !font-[500]">
          <div className="h-[50px] w-[50px] rounded-full bg-[#F9F5FF] flex items-center justify-center overflow-hidden  ">
            {imgUrl ? (
              <img src={imgUrl} alt="trader" className="w-full h-full" />
            ) : (
              <UserSvg className="w-[22px] h-[22px]" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] 2xl:text-[16px] font-[600] leading-[1] text-green">
            {capitalizeWords(fullName)}
          </p>
          <p className="text-[12px] 2xl:text-[14px] font-[400] leading-[1] text-darkGrey">
            {winRate}% Win Rate
          </p>
          <p className="text-[12px] 2xl:text-[14px] font-[400] leading-[1] text-textGrey">
            {profitShare}% Profit Share
          </p>
          <p className="text-[12px] 2xl:text-[14px] font-[400] leading-[1] text-textGrey">
            {currencyFormatter(minDeposit)} Min Deposit Required
          </p>
        </div>
        {userData.my_trader === id ? (
          <Button
            type="primary"
            className="md:ml-auto rounded-[8px] h-[40px] !px-[14px] !py-[8px] flex items-center text-white font-[500] text-[12px] 2xl:text-[14px] bg-darkRed hover:!bg-darkRed hover:!text-white hover:opacity-[0.8] "
            icon={<LuCopyMinus className="text-[14px] text-white" />}
            loading={stopTraderIsPending}
            onClick={() => {
              stopTraderMutate();
            }}
          >
            {" "}
            Stop
          </Button>
        ) : (
          <Button
            type="primary"
            className="md:ml-auto rounded-[8px] h-[40px] !px-[14px] !py-[8px] flex items-center text-white font-[500] text-[12px] 2xl:text-[14px] bg-green hover:!bg-green hover:!text-white hover:opacity-[0.8] "
            icon={<LuCopyPlus className="text-[14px] text-white" />}
            loading={isPending}
            onClick={() => {
              if (userWallet.usd < minDeposit) {
                toast.error(
                  "You cant copy this trader cause your deposit balance is not enough!"
                );
              } else {
                copyTraderMutate(id);
              }
            }}
          >
            {" "}
            Copy
          </Button>
        )}
      </div>
    </div>
  );
};

export default TraderBar;
