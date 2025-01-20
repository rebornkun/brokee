import { useAppStore } from "../../store/store";
import { capitalizeWords } from "../../utils/helper";

const DashBoardGreeting = () => {
  const userData = useAppStore((state) => state.userData);
  return (
    <div className="top max-md:mt-[20px] max-md:mb-[30px] mt-[36px] mb-[50px]">
      <h1 className="max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
        Welcome Back, {capitalizeWords(userData.fullName.split(" ")[0])}
      </h1>
      <p className="text-[16px] 2xl:text-[18px] font-[300] leading-normal">
        Track, manage and view your recent trades.
      </p>
    </div>
  );
};

export default DashBoardGreeting;
