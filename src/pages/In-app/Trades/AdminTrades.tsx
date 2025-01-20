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
  getUserTrader,
  stopTrader,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";

const pageLimit = 10;
const AdminTrades = () => {
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
      QueryKeys.GETALLADMINTRADES,
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
      // console.log(res);
      setPaginationData(res.data.pagination || initPaginationData);
      setLastVisible(res.data.pagination?.lastVisible);
      return res.data;
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
          value1={200}
          value2={200}
          isLoading={false}
        />
      </div>
      <h1 className="pb-2 max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
        All Trades
      </h1>
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
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default AdminTrades;
