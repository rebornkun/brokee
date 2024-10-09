import { UserSvg } from "../../assets/svg/svg";
import { capitalizeWords } from "../../utils/helper";

const FullNameForTr = ({
  avatar,
  value,
}: {
  avatar?: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-[14px] !text-black !font-[500]">
      <div className="h-[21px] w-[21px] rounded-full bg-[#F9F5FF] flex items-center justify-center overflow-hidden  ">
        {avatar ? (
          <img src={avatar} alt="userImg" className="w-full h-full" />
        ) : (
          <UserSvg className="w-[14px] h-[14px]" />
        )}
      </div>
      {capitalizeWords(value)}
    </div>
  );
};

export default FullNameForTr;
