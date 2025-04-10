import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../../enums/react-query";
import {
  getAllTraders,
  getUserTrader,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";
import { TTrader } from "../../../types/types";
import TraderBar from "../../Trades/TraderBar";

const CopyTraderDraw = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userData = useAppStore((state) => state.userData);
  const queryClient = useQueryClient();

  const {
    isLoading: tradersIsLoading,
    error: tradersErr,
    data: tradersData,
  } = useQuery({
    queryKey: [QueryKeys.GETALLTRADERS],
    queryFn: async () => {
      const res = await getAllTraders();
      return res.data;
    },
  });

  const {
    isLoading: userTradersIsLoading,
    error: userTraderErr,
    data: userTraderData,
  } = useQuery({
    queryKey: [QueryKeys.GETUSERTRADERS, userData.my_trader],
    queryFn: async () => {
      const res = await getUserTrader(userData.my_trader);
      return res.data;
    },
  });

  return (
    <div className="w-full h-full">
      <div className="w-full bg-navGreen h-[80px] md:h-[100px] flex flex-col items-center justify-center">
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkGreen uppercase">
          Copy Expert Traders
        </h5>
        <p className="text-[10px] text-textGrey">
          copy trades from the bests out there!
        </p>
      </div>

      <div className="Nunito h-fit py-[25px] md:py-[39px] px-[30px] md:px-[58px] rounded-[8px] bg-white flex flex-col w-full gap-[24px] ">
        <div className="Nunito h-fit py-[25px] md:py-[39px] px-[30px] md:px-[58px] border-[1px] border-[#EFEFEF] rounded-[8px] bg-white flex flex-col justify-center items-center w-full gap-[12px] ">
          <h4 className="font-[600] text-green ">My Traders</h4>
          <div className="w-full flex items-center justify-center">
            {userTraderData?.payload ? (
              <div className="w-[55%] rounded-[30px] bg-navGreen flex items-center ">
                <div className="h-[30px] w-[30px] rounded-full bg-[#F9F5FF] flex items-center justify-center overflow-hidden  ">
                  <img
                    src={
                      (userTraderData?.payload as TTrader).imgUrl ||
                      "/profileEazi.jpeg"
                    }
                    alt="userImg"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1 px-4 flex justify-center overflow-hidden">
                  <p className="w-full text-[12px] font-[500] text-darkGrey text-ellipsis whitespace-none truncate ">
                    {(userTraderData?.payload as TTrader).fullName}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-textGrey text-[14px]">
                You are not copying any trader
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col max-md:items-center gap-8 max-md:gap-6  max-md:px-4 max-md:py-8 p-6 max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] border-[1px] border-[#EFEFEF] rounded-[8px]">
          {tradersData?.payload.map((trader: TTrader, i: number) => {
            return (
              <TraderBar
                fullName={trader.fullName}
                id={trader.id}
                imgUrl={trader.imgUrl}
                profitShare={trader.profitShare}
                winRate={trader.winRate}
                minDeposit={trader.minDeposit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CopyTraderDraw;
