import { ReactElement } from "react";
import { BiLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useAppStore } from "../../../store/store";

function Kyc(): ReactElement {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);
  const userData = useAppStore((state) => state.userData);
  return (
    <div className="mt-[32px] max-sm:mt-[11px] flex flex-col  w-full">
      {/* //card */}
      <div
        className="w-full lg:w-[400px] h-[150px] border-green rounded-[8px] border-[1px] bg-navGreen p-4 flex flex-col justify-between cursor-pointer "
        onClick={() => {
          if (!userData.kycDoc) {
            setModalIsOpen(true);
            setModalType("kyc");
          }
        }}
      >
        <div className="flex justify-between ">
          <h5 className="text-[16px] 2xl:text-[18px] font-[500] text-black ">
            KYC PROCESS
          </h5>
          {userData.kycDoc ? (
            userData.verified ? (
              <div className="flex gap-4 items-center text-green">
                <p className="text-[12px] 2xl:text-[14px]">Verified!</p>
              </div>
            ) : (
              <div className="flex gap-4 items-center text-green">
                <p className="text-[12px] 2xl:text-[14px]">Awaiting Review</p>
              </div>
            )
          ) : (
            <div className="flex gap-4 items-center text-green">
              <p className="text-[12px] 2xl:text-[14px]">continue process</p>
              <BiSolidRightArrow className="text-[10px]" />
            </div>
          )}
        </div>
        <p className="text-[12px] 2xl:text-[14px]">
          Personal Identity Verification
        </p>
        <div className="flex gap-2 flex-col w-full">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] 2xl:text-[16px] text-textGrey text-end">
              {userData.verified ? 100 : 0}%
            </p>
            <div className="barContainer h-[6px] bg-white rounded-[8px] overflow-hidden ">
              <div
                style={{ width: userData.verified ? "100%" : "0%" }}
                className="h-full w-full bg-green transition-all"
              ></div>
            </div>
            <p className="text-[10px] 2xl:text-[12px] text-green">
              {userData.verified ? 100 : 0}% completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kyc;
