import { GiReceiveMoney } from "react-icons/gi";
import RevenueCard from "../../../components/Elements/RevenueCard";
import WithdrawalsGreeting from "../../../components/Withdrawals/WithdrawalsGreeting";
import TransactionStats from "../../../components/Elements/TransactionStats";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import {
  dashboardSortOptions,
  initPaginationData,
  withdrawalColumns,
  withdrawalStatusOptions,
  withdrawalTableData,
} from "../../../utils/constants";
import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
} from "../../../types/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../enums/react-query";
import { useAppStore } from "../../../store/store";
import { handleParams } from "../../../utils/helper";
import {
  getWithdrawalsById,
  getWithdrawalsStats,
} from "../../../services/withdrawals/withdrawals.service";

const pageLimit = 10;
const Withdrawals = () => {
  const [status, setStatus] = useState<TStatusDropItem>(
    withdrawalStatusOptions[0]
  );
  const [activeSort, setActiveSort] = useState<TSortDropItem>({
    order: SortOrder.DESC,
    field: "createdAt",
  });
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] =
    useState<TPagination>(initPaginationData);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const userData = useAppStore((state) => state.userData);
  const [lastVisible, setLastVisible] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: [
      QueryKeys.GETWITHDRAWALTABLEDATA,
      activeSort,
      status,
      { pageNo, pageLimit },
      searchValue,
      userData.id,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      // console.log({ sort, filter, pagination, search });
      const res = await getWithdrawalsById(userData.id, {
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

  const {
    isLoading: statsIsLoading,
    error: statsErr,
    data: statsData,
  } = useQuery({
    queryKey: [QueryKeys.GETWITHDRAWALSSTATS, userData.id],
    queryFn: async () => {
      const res = await getWithdrawalsStats(userData.id);

      return res.data;
    },
  });

  console.log(data);

  return (
    <section className="w-full h-full ">
      <WithdrawalsGreeting />
      <div className="flex max-lg:flex-col max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] gap-[26px] ">
        <div className="flex min-w-[376px] h-[149px]">
          {statsIsLoading ? (
            <div className="sk_bg max-lg:w-full w-[390px] h-[149px] rounded-[8px]"></div>
          ) : (
            <RevenueCard
              type="transactions"
              title="Withdrawals"
              icon={
                <div className="h-[50px] w-[50px] rounded-full bg-navGreen flex items-center justify-center activeSideNav">
                  <GiReceiveMoney className="sideIcon text-green transition-all text-[20px]" />
                </div>
              }
              currencySymbol={"$"}
              lastUpdated={new Date()}
              amount={statsData?.payload?.totalWithdrawals || 0}
              isLoading={statsIsLoading}
            />
          )}
        </div>
        <TransactionStats
          icon1={
            <GiReceiveMoney className="sideIcon text-green transition-all text-[20px]" />
          }
          icon2={
            <GiReceiveMoney className="sideIcon text-green transition-all text-[20px]" />
          }
          title1={"Total Successful"}
          title2={"Total failed"}
          value1={statsData?.payload?.successful}
          value2={statsData?.payload?.failed}
          isLoading={statsIsLoading}
        />
      </div>
      <div className="flex flex-col gap-[35px]">
        <TableWithSearch
          hasDeleteBtn={false}
          status={status}
          setStatus={setStatus}
          statusOptions={withdrawalStatusOptions}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          sortOptions={dashboardSortOptions}
          pageNo={pageNo}
          setPageNo={setPageNo}
          setSearchValue={setSearchValue}
          columns={withdrawalColumns}
          data={data?.payload}
          paginationData={paginationData}
          isLoading={isLoading}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default Withdrawals;
