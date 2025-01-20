import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useAppStore } from "../../store/store";
import { GrCopy } from "react-icons/gr";

const UsersGreeting = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setDrawerType = useAppStore((state) => state.setDrawerType);
  return (
    <div className="top max-md:mt-[20px] max-md:mb-[30px] mt-[36px] mb-[50px] flex justify-between items-center gap-[36px] flex-wrap">
      <div className="">
        <h1 className="max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
          Users
        </h1>
        <p className="text-[16px] 2xl:text-[18px] font-[300] leading-normal">
          Track and manage all users
        </p>
      </div>
    </div>
  );
};

export default UsersGreeting;
