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

const pageLimit = 10;
const Deposits = () => {
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

  return (
    <section className="w-full h-full ">
      <DepositsGreeting />
      <div className="flex max-lg:flex-col max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] gap-[26px] ">
        <div className="flex min-w-[376px] h-[149px]">
          {false ? (
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
              amount={50000 || 0}
              isLoading={false}
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
          value1={20}
          value2={20}
          isLoading={false}
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
          data={depositsTableData}
          paginationData={paginationData}
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default Deposits;
