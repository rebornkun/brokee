import { FcGoogle } from "react-icons/fc";
import "./Elements.css";
const GoogleBtn = ({
  type,
  className,
}: {
  type?: string;
  className?: string;
}) => {
  return (
    <div
      className={` ${type} bg-white border-lightGrey border-[1px] p-[1.2rem] px-[1.8rem] rounded-[3px] w-fit cursor-pointer ${
        className && className
      } flex items-center gap-4`}
    >
      <FcGoogle className="text-[1.3rem] " />
      <p className="text-grey max-md:text-[0.7rem] text-[0.85rem] font-[500] tracking-[3px]">
        {type ? type : "GET STARTED"}
      </p>
    </div>
  );
};

export default GoogleBtn;
