const StatBlock = ({
  left,
  icon,
  text,
  value,
  isLoading,
}: {
  left?: boolean;
  icon: React.ReactNode;
  text: string;
  value: number;
  isLoading: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-[10px] h-full justify-between ${
        left ? "items-start" : "items-center"
      }`}
    >
      {isLoading ? (
        <div className="sk_bg min-w-[35px] max-w-[35px]  min-h-[35px] max-h-[35px] rounded-full bg-navGreen flex items-center justify-center"></div>
      ) : (
        <div className="min-w-[35px] max-w-[35px]  min-h-[35px] max-h-[35px] rounded-full bg-navGreen flex items-center justify-center">
          {icon}
        </div>
      )}
      {isLoading ? (
        <div className="sk_bg w-[100px] h-[15px] "></div>
      ) : (
        <p className="text-[14px] 2xl:text-[16px] leading-[1] font-[300]  ">
          {text}
        </p>
      )}
      {isLoading ? (
        <div className="sk_bg w-[40px] h-[35px] "></div>
      ) : (
        <p className="text-[32px] 2xl:text-[38px] leading-[1] font-[400] text-[#3A3A3A]  ">
          {value}
        </p>
      )}
    </div>
  );
};

export default StatBlock;
