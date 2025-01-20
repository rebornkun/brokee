import { useState } from "react";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import TradesGreeting from "../../../components/Trades/TradesGreeting";

import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
  TTrader,
} from "../../../types/types";
import {
  dashboardSortOptions,
  initPaginationData,
  tradeColumns,
  tradeStatusOptions,
  tradeTableData,
} from "../../../utils/constants";
import RevenueCard from "../../../components/Elements/RevenueCard";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TransactionStats from "../../../components/Elements/TransactionStats";
import { UserSvg } from "../../../assets/svg/svg";
import { capitalizeWords, handleParams } from "../../../utils/helper";

import { Button } from "antd";
import { LuCopyMinus } from "react-icons/lu";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTradesById,
  getTradeStats,
  getUserTrader,
  stopTrader,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";

const pageLimit = 10;
const Trades = () => {
  const userData = useAppStore((state) => state.userData);
  const [status, setStatus] = useState<TStatusDropItem>(tradeStatusOptions[0]);
  const [activeSort, setActiveSort] = useState<TSortDropItem>({
    order: SortOrder.DESC,
    field: "createdAt",
  });
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] =
    useState<TPagination>(initPaginationData);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();
  const [lastVisible, setLastVisible] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: [
      QueryKeys.GETALLTRADES,
      activeSort,
      status,
      { pageNo, pageLimit },
      searchValue,
      userData.id,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      // console.log({ sort, filter, pagination, search });
      const res = await getTradesById(userData.id, {
        sort,
        filter,
        pagination,
        search,
        lastVisible,
      });
      console.log(res);
      setPaginationData(res.data.pagination || initPaginationData);
      setLastVisible(res.data.pagination?.lastVisible);
      return res.data;
    },
  });

  const {
    isLoading: userTradeStatsIsLoading,
    error: userTradeStatsErr,
    data: userTradeStatsData,
  } = useQuery({
    queryKey: [QueryKeys.GETTRADESSTATS, userData.id],
    queryFn: async () => {
      const res = await getTradeStats(userData.id);
      // console.log(res);
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
      // console.log(res);
      return res.data;
    },
  });

  const { mutate: stopTraderMutate, isPending: stopTraderIsPending } =
    useMutation({
      mutationKey: [MutationKeys.STOPTRADER],
      mutationFn: () => {
        return stopTrader(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETUSERDATA}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLTRADERS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  return (
    <section className="w-full h-full ">
      <TradesGreeting />
      <div className="flex max-lg:flex-col max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] gap-[26px] ">
        {/* <div className="flex min-w-[376px] h-[149px]">
          {false ? (
            <div className="sk_bg max-lg:w-full w-[390px] h-[149px] rounded-[8px]"></div>
          ) : (
            <RevenueCard
              type="transactions"
              title="trades"
              icon={
                <div className="h-[50px] w-[50px] rounded-full bg-navGreen flex items-center justify-center activeSideNav">
                  <FaMoneyBillTransfer className="sideIcon text-green transition-all text-[20px]" />
                </div>
              }
              currencySymbol={"$"}
              lastUpdated={new Date()}
              amount={5000 || 0}
              isLoading={false}
            />
          )}
        </div> */}
        <TransactionStats
          icon1={
            <FaMoneyBillTransfer className="sideIcon text-green transition-all text-[20px]" />
          }
          icon2={
            <FaMoneyBillTransfer className="sideIcon text-green transition-all text-[20px]" />
          }
          title1={"Total Won"}
          title2={"Total Lost"}
          value1={userTradeStatsData?.payload?.won}
          value2={userTradeStatsData?.payload?.lost}
          isLoading={userTradeStatsIsLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-col max-md:items-center gap-4 max-md:gap-6 border-[1px] border-[#EFEFEF] rounded-[8px] max-md:px-4 max-md:py-8 p-6 max-md:mb-[47px] max-lg:mb-[44px] mb-[40px]">
          <p className="text-[14px] 2xl:text-[16px] font-[400] leading-[1] text-textGrey">
            Active trader:
          </p>
          {userTraderData?.payload ? (
            <div className="w-full h-full flex items-center gap-8 flex-wrap max-md:flex-col max-md:gap-4">
              <div className="flex items-center gap-[14px] !text-black !font-[500]">
                <div className="h-[30px] w-[30px] rounded-full bg-[#F9F5FF] flex items-center justify-center overflow-hidden  ">
                  {(userTraderData?.payload as TTrader).imgUrl ? (
                    <img
                      src={(userTraderData?.payload as TTrader).imgUrl}
                      alt="userImg"
                      className="w-full h-full"
                    />
                  ) : (
                    <UserSvg className="w-[14px] h-[14px]" />
                  )}
                </div>
                {capitalizeWords((userTraderData?.payload as TTrader).fullName)}
              </div>
              <p className="text-[16px] 2xl:text-[18px] font-[400] leading-[1] text-green">
                {(userTraderData?.payload as TTrader).winRate}% Win Rate
              </p>
              <p className="text-[16px] 2xl:text-[18px] font-[400] leading-[1] text-darkGrey">
                {(userTraderData?.payload as TTrader).profitShare}% Profit Share
              </p>
              <Button
                type="primary"
                className="md:ml-auto rounded-[8px] h-[40px] !px-[14px] !py-[8px] flex items-center text-white font-[500] text-[12px] 2xl:text-[14px] bg-darkRed hover:!bg-darkRed hover:!text-white hover:opacity-[0.8] "
                icon={<LuCopyMinus className="text-[16px] text-white" />}
                loading={stopTraderIsPending}
                onClick={() => {
                  stopTraderMutate();
                }}
              >
                {" "}
                Remove Trader
              </Button>
            </div>
          ) : (
            <p className="text-textGrey text-[14px]">
              You are not copying any trader
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[35px]">
        <TableWithSearch
          hasDeleteBtn={false}
          status={status}
          setStatus={setStatus}
          statusOptions={tradeStatusOptions}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          sortOptions={dashboardSortOptions}
          pageNo={pageNo}
          setPageNo={setPageNo}
          setSearchValue={setSearchValue}
          columns={tradeColumns}
          data={data?.payload}
          paginationData={paginationData}
          isLoading={userTradersIsLoading}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default Trades;
