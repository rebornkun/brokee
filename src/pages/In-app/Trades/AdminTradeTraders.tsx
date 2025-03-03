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
  traderColumns,
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
  getAllTradersForTable,
  getTradesById,
  getUserTrader,
  stopTrader,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";
import { Link } from "react-router-dom";
import { AdminRoutesUrl } from "../../../container/Routes";
import { BiLeftArrowAlt } from "react-icons/bi";

const pageLimit = 10;

const AdminTradeTraders = () => {
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
      QueryKeys.GETALLADMINTRADERS,
      activeSort,
      status,
      { pageNo, pageLimit },
      searchValue,
      userData.id,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      // console.log({ sort, filter, pagination, search });
      const res = await getAllTradersForTable({
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

  return (
    <section className="w-full h-full ">
      {/* <TradesGreeting /> */}
      <div className="flex items-center gap-2 py-2 mb-8">
        <Link to={AdminRoutesUrl.TRADES}>
          <div className="rounded-full border-[1px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer ">
            <BiLeftArrowAlt className="text-green text-[30px]" />
          </div>
        </Link>
        <h1 className=" max-sm:text-[24px] text-[28px] 2xl:text-[32px] font-[300] leading-normal">
          All Traders
        </h1>
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
          columns={traderColumns}
          data={data?.payload}
          paginationData={paginationData}
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default AdminTradeTraders;
