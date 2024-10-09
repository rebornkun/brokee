import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { percentageFormatter } from "../../utils/helper";

function StatBox({
  type,
  icon,
  amount,
  percentage,
}: {
  type: "Won" | "Lost";
  icon: React.ReactNode;
  amount: string | number;
  percentage: number;
}) {
  const transTypeRotate =
    type === "Won" ? "rotate-[-45deg]" : "rotate-[-320deg]";

  const transTypeColor = type === "Won" ? "text-green" : "text-red";

  return (
    <div className="w-full h-[43%] bg-lightGreen p-4 rounded-[8px] flex flex-col justify-between ">
      <div className="flex justify-between">
        {icon}{" "}
        <div className="flex gap-[5px] items-center">
          <IoMdArrowForward
            className={`font-[700] text-[20px] ${transTypeRotate} ${transTypeColor}`}
          />
          <p
            className={`${transTypeColor} text-[14px] 2xl:text-[16px] font-[400]`}
          >
            {percentageFormatter(percentage)}%
          </p>
        </div>
      </div>
      <h5 className="text-textGrey text-[15px] 2xl:text-[18px] font-[500]  ">
        {type}
      </h5>
      <h2 className="text-black text-[27px] 2xl:text-[34px] font-[500]  ">
        {amount}
      </h2>
    </div>
  );
}

export default StatBox;
