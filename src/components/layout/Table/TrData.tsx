import { SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../../store/store";
import { TTableColumn, TTableData, TTrade } from "../../../types/types";
import StatusValue from "../../Elements/StatusValue";
import CheckBoxTable from "../../Elements/CheckBoxTable";
import FullNameForTr from "../../Elements/FullNameForTr";
import PaymentPlanTr from "../../Elements/PaymentPlanTr";
import TableActions from "./TableActions";
import { TUserData } from "../../../store/store.types";
import CurrencyBox from "../../Elements/CurrencyBox";
import { IoInformation } from "react-icons/io5";
import { BiInfoCircle } from "react-icons/bi";

const TrData = ({
  dataNo,
  data,
  columns,
  allData,
  allCheckedIDs,
  setAllCheckedIDs,
  activeChecker,
  setActiveChecker,
}: {
  dataNo: number;
  data: TTableData;
  columns: TTableColumn[];
  allData: TTableData[];
  allCheckedIDs: string[];
  setAllCheckedIDs: React.Dispatch<SetStateAction<string[]>>;
  activeChecker: string;
  setActiveChecker: React.Dispatch<SetStateAction<string>>;
}) => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setDrawerId = useAppStore((state) => state.setDrawerId);
  const setDrawerType = useAppStore((state) => state.setDrawerType);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalData = useAppStore((state) => state.setModalData);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const location = useLocation();

  const { pathname } = location;
  const doNotOpenDrawer = ["select", "actions"];
  const setDrawerTypeFunc = () => {
    if (pathname === "/") {
      setDrawerType("dashboard");
    } else if (pathname === "/customers") {
      setDrawerType("customer");
    } else if (pathname === "/transactions") {
      setDrawerType("dashboard");
    }
  };

  return (
    <tr className="bg-transparent h-[50px] cursor-pointer ">
      {columns.map((datum, index) => {
        return (
          <td
            key={index}
            className={`first-of-type:text-black text-[#6B7280] text-[14px] 2xl:text-[16px] font-[400] text-start p-[16px] border-b-[1px] border-[#E5E7EB] whitespace-nowrap`}
            onClick={() => {
              if (doNotOpenDrawer.includes(datum.dataIndex)) {
                //do not open open when these td's are clicked
              } else {
                // setIsDrawerOpen(true);
                // setDrawerId(String(data.id)); //send id to drawer here
                // setDrawerTypeFunc();
              }
            }}
          >
            {datum.dataIndex === "status" ? (
              <StatusValue value={(data as any)[datum.dataIndex]} />
            ) : datum.dataIndex === "select" ? (
              <CheckBoxTable
                type={"sub"}
                data={data}
                allCheckedIDs={allCheckedIDs}
                setAllCheckedIDs={setAllCheckedIDs}
                activeChecker={activeChecker}
                setActiveChecker={setActiveChecker}
              />
            ) : datum.dataIndex === "fullName" ? (
              <FullNameForTr
                avatar={data?.avatar}
                value={(data as any)[datum.dataIndex]}
              />
            ) : datum.dataIndex === "customerFullName" ? (
              <FullNameForTr
                avatar={data?.avatar}
                value={data?.fullName || ""}
              />
            ) : datum.dataIndex === "isActive" ? (
              `${(data as any)[datum.dataIndex]}`
            ) : datum.dataIndex === "verified" ? (
              `${(data as any)[datum.dataIndex]}`
            ) : datum.dataIndex === "deleted" ? (
              `${(data as any)[datum.dataIndex]}`
            ) : datum.dataIndex === "date" ? (
              new Date(data.createdAt?.seconds * 1000).toLocaleDateString()
            ) : datum.dataIndex === "payment_type" ? (
              `${(data as any)[datum.dataIndex]}`
            ) : datum.dataIndex === "payment" ? (
              <BiInfoCircle
                className="h-full text-[20px]"
                onClick={() => {
                  setModalIsOpen(true);
                  setModalType("payInfo");
                  setModalData([data.id]);
                }}
              />
            ) : datum.dataIndex === "currencyName" ? (
              <CurrencyBox data={data as TTrade} />
            ) : datum.dataIndex === "actions" ? (
              <TableActions userData={data as TUserData} />
            ) : (
              (data as any)[datum.dataIndex]
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TrData;
