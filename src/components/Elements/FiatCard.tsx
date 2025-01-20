import { Tooltip } from "antd";
import { capitalizeWords } from "../../utils/helper";
import StatusValue from "./StatusValue";
import AccountCardDropDown from "./AccountCardDropDown";

const FiatCard = ({
  id,
  name,
  bank,
  accNo,
  currency,
  img,
  status,
  isActiveAccount,
}: {
  id: string;
  name: string;
  bank: string;
  accNo: string;
  currency: string;
  img: string;
  status: string;
  isActiveAccount: boolean;
}) => {
  return (
    <div
      className={` ${isActiveAccount && "bg-lightYellow"} ${
        status === "pending" && "!bg-lighterGrey"
      } transition-all max-w-[243px] w-[243px] p-[15px] flex flex-col items-start justify-between border-[0.77px] border-[#E5E7EB] rounded-[8px] cursor-pointer overflow-hidden relative`}
    >
      <div className="flex justify-between w-full ">
        <div className="flex gap-[16px] items-center">
          <img
            src={img}
            alt="flag"
            className="rounded-full w-[18px] h-[18px]"
          />
          <p className="Nunito text-[#9CA3AF] font-[400] text-[15.45px] ">
            {capitalizeWords(currency)}
          </p>
        </div>
        {status === "pending" ? (
          <Tooltip title="this account is awaiting confirmation">
            <p className=" border-[0.5px] border-lightYellow rounded-[8px] px-2 bg-yellow text-[10px] h-fit text-darkYellow ">
              Pending
            </p>
          </Tooltip>
        ) : (
          <div className="flex items-start gap-[3px]">
            <div
              className={`w-[15px] h-[15px] rounded-full border-[0.75px] border-[#D0D5DD] ${
                isActiveAccount && "border-darkYellow"
              } transition-all flex items-center justify-center `}
            >
              {isActiveAccount && (
                <div className="bg-darkYellow rounded-full w-[6px] h-[6px] transition-all "></div>
              )}
            </div>
            <AccountCardDropDown id={id} type={"Fiat"} />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="Nunito text-black font-[500] text-[15.45px] mt-[15px] line-clamp-1 uppercase">
          {name}
        </p>
        <p className="Nunito text-[#6B7280] font-[500] text-[15.45px] mt-[8px] line-clamp-1 ">
          {bank}
        </p>
        <p className="Nunito text-[#4B5563] font-[500] text-[15.45px] mt-[0px] line-clamp-1 ">
          {accNo}
        </p>
      </div>
    </div>
  );
};

export default FiatCard;
