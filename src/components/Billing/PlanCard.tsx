import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { FaCheck } from "react-icons/fa6";
import { USDCFlagSvg } from "../../assets/svg/svg";
import { MutationKeys, QueryKeys } from "../../enums/react-query";
import { TBuyPlan } from "../../types/types";
import { useAppStore } from "../../store/store";
import { toast } from "sonner";
import { buyPlan } from "../../services/plans/plans.service";
import { currencyFormatter } from "../../utils/helper";

const PlanCard = ({
  name,
  title,
  isActive,
  amount,
  gains,
  duration,
}: {
  name: string;
  title: string;
  isActive: boolean;
  amount: number;
  gains: string[];
  duration: string;
}) => {
  const queryClient = useQueryClient();
  const userData = useAppStore((state) => state.userData);
  const userWallet = useAppStore((state) => state.userWallet);

  const { mutate: buyPlanMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.BUYPLAN],
    mutationFn: (values: TBuyPlan) =>
      buyPlan({ ...values }, userData.id, userWallet.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETUSERDATA}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETUSERWALLETDATA}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETBILLINGTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const checkBalance = () => {
    if (userWallet.usd < amount) {
      toast.error("Insufficient funds in deposit wallet! please fund account.");
    } else if (userData.current_plan) {
      toast.error("You have an Active plan.");
    } else {
      buyPlanMutate({ amountInUsd: amount, name: name });
    }
  };

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
        {/* <USDCFlagSvg className="w-[33px] h-[33px]" /> */}
        <img
          src="../../../coins/usdt.svg"
          className="w-[33px] h-[33px] rounded-full"
        />
        <p className="text-[34px] 2xl:text-[40px] text-[#1E1E1E] font-[600] ">
          {currencyFormatter(amount)}
        </p>
        <p className="text-[15.31px] 2xl:text-[18px] text-[#1E1E1E] font-[500] pl-[9px] ">
          /{duration}
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
            onClick={() => {
              checkBalance();
            }}
            loading={isPending}
          >
            Buy Plan
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
