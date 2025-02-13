import { Button } from "antd";
import { useAppStore } from "../../store/store";
import { toast } from "sonner";

const WithdrawalsGreeting = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setDrawerType = useAppStore((state) => state.setDrawerType);
  const userData = useAppStore((state) => state.userData);

  return (
    <div className="top max-md:mt-[20px] max-md:mb-[30px] mt-[36px] mb-[50px] flex justify-between items-center gap-[36px] flex-wrap">
      <div className="">
        <h1 className="max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
          Withdrawals
        </h1>
        <p className="text-[16px] 2xl:text-[18px] font-[300] leading-normal">
          Manage your Withdrawals
        </p>
      </div>
      {userData.role !== "ADMIN" && (
        <Button
          type="primary"
          className="rounded-[8px] h-[40px] max-w-[200px] w-full !px-[24px] !py-[10px] flex items-center justify-center text-darkGreen font-[500] text-[14px] 2xl:text-[16px] bg-white hover:!bg-white hover:!text-darkGreen hover:opacity-[0.8] border-[1px] border-darkGreen "
          onClick={() => {
            //check if user has a plan
            if (userData.accountPlan) {
              setDrawerType("withdraw");
              setIsDrawerOpen(true);
            } else {
              toast.error("You need an active plan to Withdraw Funds!");
            }
          }}
        >
          Make Withdrawal
        </Button>
      )}
    </div>
  );
};

export default WithdrawalsGreeting;
