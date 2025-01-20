import { useAppStore } from "../../store/store";

const HideBalanceBtn = () => {
  const hideAccountBalance = useAppStore((state) => state.hideAccountBalance);
  return (
    <div className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-yellow hover:!text-darkYellow transition">
      <span> {hideAccountBalance ? "Show Balance" : "Hide Balance"}</span>
    </div>
  );
};

export default HideBalanceBtn;
