import { IconType } from "react-icons";
import { GiTakeMyMoney } from "react-icons/gi";

const BalanceBoard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) => {
  return (
    <div className="w-full h-fit rounded-[9px] shadow border-[0.5px] border-lightGrey bg-white py-6 p-4 flex flex-col gap-4 items-center justify-center flex-1 min-w-[250px]">
      <div className="flex gap-2 items-center">
        {icon}
        <h2 className="text-[1rem] text-black text-start font-[400]">
          {title}:
        </h2>
      </div>
      <h2 className="text-[1.5rem] text-black text-start font-[500]">
        $ {value.toLocaleString()}
      </h2>
    </div>
  );
};

export default BalanceBoard;
