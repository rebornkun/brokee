import "./Elements.css";
const BouncingBtn = ({
  type,
  className,
}: {
  type?: string;
  className?: string;
}) => {
  return (
    <div
      className={`bouncingBtn ${type} bg-green p-[1.2rem] px-[1.8rem] rounded-[3px] w-fit ${
        className && className
      }`}
    >
      <p className="text-white max-md:text-[0.7rem] text-[0.85rem] font-[500] tracking-[3px]">
        {type ? type : "GET STARTED"}
      </p>
    </div>
  );
};

export default BouncingBtn;
