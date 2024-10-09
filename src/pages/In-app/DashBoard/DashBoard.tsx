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
} from "../../../utils/constants";

const pageLimit = 10;
const DashBoard = () => {
  const [status, setStatus] = useState<TStatusDropItem>(
    dashboardStatusOptions[0]
  );
  const [activeSort, setActiveSort] = useState<TSortDropItem>({
    order: SortOrder.DESC,
    field: "createdAt",
  });
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] =
    useState<TPagination>(initPaginationData);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  return (
    <section className="w-full h-full ">
      <DashBoardGreeting />
      <div className="flex max-lg:flex-col gap-6 mb-[49px] ">
        <TotalRevenueSlides />
        <DashBoardStats
          isLoading={false}
          stats={{
            noOfCustomers: 0,
            noOfDevices: 0,
            noOfTransactions: 0,
          }}
        />
      </div>
      <div className="w-full flex max-lg:flex-col gap-12 mb-[49px]">
        <DashBoardChart />
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
          columns={dashboardColumns}
          data={dashboardTableData}
          paginationData={paginationData}
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default DashBoard;
