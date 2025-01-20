import { TbCopy } from "react-icons/tb";
import { UsdcChains, UsdcChainsImg } from "../../types/types";
import { capitalizeWords, handleWalletAddress } from "../../utils/helper";
import AccountCardDropDown from "./AccountCardDropDown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { Tooltip } from "antd";

const UsdcCard = ({
  id,
  isActiveAccount,
  chain,
  publicKey,
  status,
}: {
  id: string;
  isActiveAccount: boolean;
  chain: UsdcChains;
  status: string;
  publicKey: string;
}) => {
  return (
    <div
      className={` ${isActiveAccount && "bg-lightYellow"} ${
        status === "pending" && "!bg-lighterGrey"
      } transition-all max-w-[243px] w-[243px] p-[15px] flex flex-col items-start justify-between border-[0.77px] border-[#E5E7EB] rounded-[8px] cursor-pointer overflow-hidden relative`}
    >
      <div className="flex w-full justify-between ">
        <div className="flex gap-[16px] items-center">
          <img
            src={"/src/assets/coins/Bitcoin.png"}
            alt="flag"
            className=" w-[18px] h-[18px] "
          />
          <p className="Nunito text-[#9CA3AF] font-[400] text-[15.45px] ">
            {capitalizeWords(chain)}
          </p>
        </div>
        {status === "pending" ? (
          <Tooltip title="this account is awaiting confirmation">
            <p className=" border-[0.5px] border-lightGreen rounded-[8px] h-fit px-2 bg-navGreen text-[10px] text-darkYellow ">
              Pending
            </p>
          </Tooltip>
        ) : (
          <div className="flex items-start gap-[3px]">
            <div
              className={`min-w-[15px] max-w-[15px] h-[15px] rounded-full border-[0.75px] border-[#D0D5DD] ${
                isActiveAccount && "border-green"
              } transition-all flex items-center justify-center `}
            >
              {isActiveAccount && (
                <div className="bg-green rounded-full w-[6px] h-[6px] transition-all "></div>
              )}
            </div>
            <AccountCardDropDown id={id} type={"Usdc"} />
          </div>
        )}
      </div>
      <div className="w-full  flex justify-between items-center mt-[15px]">
        <p className="Nunito text-black font-[500] text-[15.45px] text-ellipsis overflow-hidden uppercase">
          {handleWalletAddress(publicKey)}
        </p>
        <CopyToClipboard
          text={publicKey}
          onCopy={() => toast.success("Wallet address copied successfully!")}
        >
          <TbCopy className="text-black text-[16px] cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default UsdcCard;
