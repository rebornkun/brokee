import { useState } from "react";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import TradesGreeting from "../../../components/Trades/TradesGreeting";

import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
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
import { capitalizeWords } from "../../../utils/helper";
import { GrCopy } from "react-icons/gr";
import { Button } from "antd";
import { LuCopyMinus } from "react-icons/lu";

const pageLimit = 10;
const Trades = () => {
  const [status, setStatus] = useState<TStatusDropItem>(tradeStatusOptions[0]);
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
      <TradesGreeting />
      <div className="flex max-lg:flex-col max-md:mb-[47px] max-lg:mb-[44px] mb-[40px] gap-[26px] ">
        <div className="flex min-w-[376px] h-[149px]">
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
        </div>
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
      <div className="flex flex-col gap-2">
        <div className=" flex flex-col max-md:items-center gap-4 max-md:gap-6 border-[1px] border-[#EFEFEF] rounded-[8px] max-md:px-4 max-md:py-8 p-6 max-md:mb-[47px] max-lg:mb-[44px] mb-[40px]">
          <p className="text-[14px] 2xl:text-[16px] font-[400] leading-[1] text-textGrey">
            Active trader:
          </p>
          <div className="w-full h-full flex items-center gap-8 flex-wrap max-md:flex-col max-md:gap-4">
            <div className="flex items-center gap-[14px] !text-black !font-[500]">
              <div className="h-[30px] w-[30px] rounded-full bg-[#F9F5FF] flex items-center justify-center overflow-hidden  ">
                {true ? (
                  <img
                    src={"/profileEazi.jpeg"}
                    alt="userImg"
                    className="w-full h-full"
                  />
                ) : (
                  <UserSvg className="w-[14px] h-[14px]" />
                )}
              </div>
              {capitalizeWords("Mary Jackson")}
            </div>
            <p className="text-[16px] 2xl:text-[18px] font-[400] leading-[1] text-green">
              60% Win Rate
            </p>
            <p className="text-[16px] 2xl:text-[18px] font-[400] leading-[1] text-darkGrey">
              10% Profit Share
            </p>
            <Button
              type="primary"
              className="md:ml-auto rounded-[8px] h-[40px] !px-[14px] !py-[8px] flex items-center text-white font-[500] text-[12px] 2xl:text-[14px] bg-darkRed hover:!bg-darkRed hover:!text-white hover:opacity-[0.8] "
              icon={<LuCopyMinus className="text-[16px] text-white" />}
              onClick={() => {}}
            >
              {" "}
              Remove Trader
            </Button>
          </div>
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
          data={tradeTableData}
          paginationData={paginationData}
          isLoading={false}
          hasStatusBtn={true}
        />
      </div>
    </section>
  );
};

export default Trades;
