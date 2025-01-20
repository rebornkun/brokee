import { useState } from "react";
import DashBoardChart from "../../../components/Dashboard/DashBoardChart";
import DashboardRevenueOverview from "../../../components/Dashboard/DashboardRevenueOverview";
import DashBoardGreeting from "../../../components/Elements/DashBoardGreeting";
import DashBoardStats from "../../../components/Elements/DashBoardStats";
import TotalRevenueSlides from "../../../components/Elements/TotalRevenueSlides";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
} from "../../../types/types";
import {
  dashboardColumns,
  dashboardSortOptions,
  dashboardStatusOptions,
  dashboardTableData,
  initPaginationData,
  withdrawalColumns,
  withdrawalStatusOptions,
} from "../../../utils/constants";
import { QueryKeys } from "../../../enums/react-query";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../../../store/store";
import { handleParams } from "../../../utils/helper";
import { getWithdrawalsById } from "../../../services/withdrawals/withdrawals.service";
import { getUserWallet } from "../../../services/user/user.service";
import { TUserWallet } from "../../../store/store.types";

const pageLimit = 10;
const DashBoard = () => {
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
    isLoading: walletIsLoading,
    // error,
    data: walletData,
  } = useQuery({
    queryKey: [QueryKeys.GETUSERWALLETDATA],
    queryFn: async () => {
      const res = await getUserWallet();
      return res.data;
    },
  });

  return (
    <section className="w-full h-full ">
      <DashBoardGreeting />
      <div className="flex max-lg:flex-col gap-6 mb-[49px] ">
        <TotalRevenueSlides />
        <DashBoardStats
          isLoading={walletIsLoading}
          stats={{
            deposit: (walletData?.payload as TUserWallet)?.usd || 0,
            available: (walletData?.payload as TUserWallet)?.available || 0,
            withdrawn: (walletData?.payload as TUserWallet)?.earned || 0,
          }}
        />
      </div>
      <div className="w-full flex max-lg:flex-col gap-12 mb-[49px]">
        {/* <DashBoardChart /> */}
        <DashboardRevenueOverview />
      </div>
      <div className="flex flex-col gap-[35px]">
        <h2 className="text-[24px] 2xl:text-[30px] font-[300]">Withdrawals</h2>
        <TableWithSearch
          hasDeleteBtn={false}
          status={status}
          setStatus={setStatus}
          statusOptions={dashboardStatusOptions}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          sortOptions={dashboardSortOptions}
          pageNo={pageNo}
          setPageNo={setPageNo}
          setSearchValue={setSearchValue}
          columns={withdrawalColumns}
          data={data?.payload}
          paginationData={paginationData}
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default DashBoard;
