import { useState } from "react";
import { GiPayMoney } from "react-icons/gi";
import DepositsGreeting from "../../../components/Deposits/DepositsGreeting";
import RevenueCard from "../../../components/Elements/RevenueCard";
import TransactionStats from "../../../components/Elements/TransactionStats";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
} from "../../../types/types";
import {
  dashboardSortOptions,
  depositsColumns,
  depositsStatusOptions,
  depositsTableData,
  initPaginationData,
} from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../enums/react-query";
import { handleParams } from "../../../utils/helper";
import {
  getDepositsById,
  getDepositsStats,
} from "../../../services/deposits/deposits.service";
import { useAppStore } from "../../../store/store";

const pageLimit = 10;
const Deposits = () => {
  const userData = useAppStore((state) => state.userData);
  const [status, setStatus] = useState<TStatusDropItem>(
    depositsStatusOptions[0]
  );
  const [activeSort, setActiveSort] = useState<TSortDropItem>({
    order: SortOrder.DESC,
    field: "createdAt",
  });
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] =
    useState<TPagination>(initPaginationData);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [lastVisible, setLastVisible] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: [
      QueryKeys.GETDEPOSITSTABLEDATA,
      activeSort,
      status,
      { pageNo, pageLimit },
      searchValue,
      userData.id,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      // console.log({ sort, filter, pagination, search });
      const res = await getDepositsById(userData.id, {
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
    queryKey: [QueryKeys.GETDEPOSITSSTATS, userData.id],
    queryFn: async () => {
      const res = await getDepositsStats(userData.id);

      return res.data;
    },
  });

  return (
    <section className="w-full h-full ">
      <DepositsGreeting />
      <div className="flex max-lg:flex-col max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] gap-[26px] ">
        <div className="flex min-w-[376px] h-[149px]">
          {statsIsLoading ? (
            <div className="sk_bg max-lg:w-full w-[390px] h-[149px] rounded-[8px]"></div>
          ) : (
            <RevenueCard
              type="transactions"
              title="Deposits"
              icon={
                <div className="h-[50px] w-[50px] rounded-full bg-navGreen flex items-center justify-center activeSideNav">
                  <GiPayMoney className="sideIcon text-green transition-all text-[20px]" />
                </div>
              }
              currencySymbol={"$"}
              lastUpdated={new Date()}
              amount={statsData?.payload?.totalDeposits || 0}
              isLoading={statsIsLoading}
            />
          )}
        </div>
        <TransactionStats
          icon1={
            <GiPayMoney className="sideIcon text-green transition-all text-[20px]" />
          }
          icon2={
            <GiPayMoney className="sideIcon text-green transition-all text-[20px]" />
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
          statusOptions={depositsStatusOptions}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          sortOptions={dashboardSortOptions}
          pageNo={pageNo}
          setPageNo={setPageNo}
          setSearchValue={setSearchValue}
          columns={depositsColumns}
          data={data?.payload}
          paginationData={paginationData}
          isLoading={isLoading}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default Deposits;
