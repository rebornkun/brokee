import { ReactElement, useState } from "react";
import PlanCard from "../../../components/Billing/PlanCard";
import TableComp from "../../../components/layout/Table/TableComp";
import {
  depositsStatusOptions,
  initPaginationData,
} from "../../../utils/constants";
import { useAppStore } from "../../../store/store";
import { plans } from "../../../enums/plans";
import { getBillingsById } from "../../../services/plans/plans.service";
import { handleParams } from "../../../utils/helper";
import { QueryKeys } from "../../../enums/react-query";
import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
} from "../../../types/types";
import { useQuery } from "@tanstack/react-query";

const basicPlanGains = [
  "Interest: 200%",
  "Min: $1000",
  "Max: $2999",
  "Duration: 5 days",
];
const standardPlanGains = [
  "Interest: 300%",
  "Min: $3000",
  "Max: $7499",
  "Duration: 5 days",
];
const goldPlanGains = [
  "Interest: 400%",
  "Min: $7500",
  "Max: $14999",
  "Duration: 5 days",
];
const platinumPlanGains = [
  "Interest: 500%",
  "Min: $15000",
  "Max: $unlimited",
  "Duration: 5 days",
];

const columns = [
  {
    title: "TRANSACTION ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "AMOUNT",
    dataIndex: "amountInUsd",
    key: "amountInUsd",
  },
  {
    title: "PLAN",
    dataIndex: "planName",
    key: "planName",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

// const data = [
//   {
//     key: "1",
//     transaction_ID: "Jane Karmel",
//     date: "10/04/2024",
//     amount: "100 USDC",
//     plan: "Premium Plan",
//     status: "Completed",
//     _id: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     key: "2",
//     transaction_ID: "Jane Karmel",
//     date: "10/04/2024",
//     amount: "50 USDC",
//     plan: "Standard Plan",
//     status: "Completed",
//     _id: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

const pageLimit = 10;
function Billing(): ReactElement {
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
      QueryKeys.GETBILLINGTABLEDATA,
      activeSort,
      status,
      { pageNo, pageLimit },
      searchValue,
      userData.id,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      // console.log({ sort, filter, pagination, search });
      const res = await getBillingsById(userData.id, {
        sort,
        pagination,
        lastVisible,
      });
      setPaginationData(res.data.pagination || initPaginationData);
      setLastVisible(res.data.pagination?.lastVisible);
      return res.data;
    },
  });
  return (
    <div className="mt-[32px] max-sm:mt-[11px] flex flex-col  w-full mb-[100px]">
      <div className="p-[30px] max-sm:p-[20px] flex flex-col gap-[18px] w-full max-w-fit max-md:max-w-full  border-[1px] border-[#E5E7EB] rounded-[8px] ">
        <h5 className="text-[20px] 2xl:text-[22px] text-[#1E1E1E] font-[400] ">
          Account plan
        </h5>
        <p className="text-[15.5px] 2xl:text-[18px] text-[#1E1E1E] font-[400] mt-[-18px] ">
          Simple and transparent prices
        </p>
        <div className="mt-[10px] flex w-full gap-[33px] flex-wrap justify-center">
          <PlanCard
            name={plans.BASIC}
            title={"Perfect Plan for Starters"}
            isActive={userData.current_plan === plans.BASIC}
            amount={1000}
            duration={"24hrs"}
            gains={basicPlanGains}
          />
          <PlanCard
            name={plans.STANDARD}
            title={"Perfect Plan for Starters"}
            isActive={userData.current_plan === plans.STANDARD}
            amount={3000}
            duration={"24hrs"}
            gains={standardPlanGains}
          />
          <PlanCard
            name={plans.GOLD}
            title={"Perfect Plan for Starters"}
            isActive={userData.current_plan === plans.GOLD}
            amount={7000}
            duration={"24hrs"}
            gains={goldPlanGains}
          />
          <PlanCard
            name={plans.PLATINUM}
            title={"Perfect Plan for Starters"}
            isActive={userData.current_plan === plans.PLATINUM}
            amount={15000}
            duration={"24hrs"}
            gains={platinumPlanGains}
          />
        </div>
      </div>
      <div className="w-full mt-[50px]">
        <h5 className="text-[20px] 2xl:text-[22px] text-[#1E1E1E] font-[400] mb-[27px] ">
          Billing Transactions
        </h5>
        <TableComp
          columns={columns}
          data={data?.payload}
          isLoading={false}
          allCheckedIDs={[]}
          setAllCheckedIDs={() => {}}
          pageNo={1}
          setPageNo={() => {}}
          paginationData={initPaginationData}
        />
      </div>
    </div>
    //TODO: missing fields
  );
}

export default Billing;
