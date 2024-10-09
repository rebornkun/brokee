import { ReactElement } from "react";
import PlanCard from "../../../components/Billing/PlanCard";
import TableComp from "../../../components/layout/Table/TableComp";
import { initPaginationData } from "../../../utils/constants";

const basicPlanGains = [
  "6% fee on ransactions",
  "Lease Managements",
  "Reports",
  "Device Imports",
  "24/7 Support",
];
const standardPlanGains = [
  "5% fee on ransactions",
  "Lease Managements",
  "Reports",
  "Device Imports",
  "24/7 Support",
];
const premiumPlanGains = [
  "4% fee on ransactions",
  "Lease Managements",
  "Reports",
  "Device Imports",
  "24/7 Support",
];

const columns = [
  {
    title: "TRANSACTION ID",
    dataIndex: "transaction_ID",
    key: "transaction_ID",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "PLAN",
    dataIndex: "plan",
    key: "plan",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

const data = [
  {
    key: "1",
    transaction_ID: "Jane Karmel",
    date: "10/04/2024",
    amount: "100 USDC",
    plan: "Premium Plan",
    status: "Completed",
    _id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    key: "2",
    transaction_ID: "Jane Karmel",
    date: "10/04/2024",
    amount: "50 USDC",
    plan: "Standard Plan",
    status: "Completed",
    _id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function Billing(): ReactElement {
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
            name={"Basic"}
            title={"Perfect Plan for Starters"}
            isActive={true}
            amount={0}
            gains={basicPlanGains}
          />
          <PlanCard
            name={"Standard"}
            title={"Perfect Plan for Starters"}
            isActive={false}
            amount={50}
            gains={standardPlanGains}
          />
          <PlanCard
            name={"Premium"}
            title={"Perfect Plan for Starters"}
            isActive={false}
            amount={100}
            gains={premiumPlanGains}
          />
        </div>
      </div>
      <div className="w-full mt-[50px]">
        <h5 className="text-[20px] 2xl:text-[22px] text-[#1E1E1E] font-[400] mb-[27px] ">
          Billing Transactions
        </h5>
        <TableComp
          columns={columns}
          data={data}
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
