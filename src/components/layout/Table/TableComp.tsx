import { Pagination, Tooltip } from "antd";
import React, { SetStateAction, useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { TPagination, TTableColumn, TTableData } from "../../../types/types";
import EmptyTable from "./EmptyTable";
import Skel from "./Skel";
import TrData from "./TrData";
import {
  tooltipTH,
  tooltipTHDashboardValue,
  tooltipTHDepositValue,
} from "./tooltip";
import { useLocation } from "react-router-dom";
import { ProtectedRoutesUrl } from "../../../container/Routes";
import CheckBoxTable from "../../Elements/CheckBoxTable";

function TableComp({
  columns,
  data,
  isLoading,
  allCheckedIDs,
  setAllCheckedIDs,
  pageNo,
  setPageNo,
  paginationData,
}: {
  columns: TTableColumn[];
  data: TTableData[];
  isLoading: boolean;
  allCheckedIDs: string[];
  setAllCheckedIDs: React.Dispatch<SetStateAction<string[]>>;
  pageNo: number;
  setPageNo: React.Dispatch<SetStateAction<number>>;
  paginationData: TPagination;
}) {
  const [activeChecker, setActiveChecker] = useState("0");

  const handlePageNoChange = (newPageNo: number) => {
    setPageNo(newPageNo);
  };

  const { pathname } = useLocation();
  const getToolTipValue = (value: string) => {
    if (pathname === ProtectedRoutesUrl.DEPOSITS) {
      return (tooltipTHDepositValue as any)[value];
    } else if (pathname === ProtectedRoutesUrl.WITHDRAWALS) {
      return (tooltipTHDashboardValue as any)[value];
    }
  };

  return (
    <>
      <div className="rounded-[8px] shadow border-[0.2px] border-[#E5E7EB] w-full overflow-hidden ">
        <div className="w-full overflow-auto">
          <table className="w-full relative">
            <thead className="w-full relative">
              <tr className="bg-[#F9FAFB] h-[50px] w-full ">
                {columns.map((datum, index) => {
                  return datum.dataIndex === "select" ? (
                    <th
                      key={index}
                      className="text-start  p-[16px] border-b-[1px] border-[#E5E7EB] w-[70px] "
                    >
                      {!isLoading && data && (
                        <CheckBoxTable
                          type={"main"}
                          data={data}
                          allCheckedIDs={allCheckedIDs}
                          setAllCheckedIDs={setAllCheckedIDs}
                          activeChecker={activeChecker}
                          setActiveChecker={setActiveChecker}
                        />
                      )}
                    </th>
                  ) : (
                    <th
                      key={index}
                      className="text-[#6B7280] text-[12px] 2xl:text-[14px] font-[500] text-start  p-[16px] border-b-[1px] border-[#E5E7EB] w-fit whitespace-nowrap "
                    >
                      <div className="flex items-center w-full gap-2">
                        {datum.title}
                        {tooltipTH.includes(datum.title) && (
                          <Tooltip title={getToolTipValue(datum.dataIndex)}>
                            <div>
                              <HiOutlineQuestionMarkCircle className="text-[14px] text-[#00000073] cursor-help" />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {isLoading || !data ? (
                <>
                  <Skel columns={columns} />
                </>
              ) : data.length < 1 ? (
                <>
                  <EmptyTable />
                </>
              ) : (
                data.map((datum, index) => {
                  return (
                    <TrData
                      key={index}
                      dataNo={index}
                      data={datum}
                      columns={columns}
                      allData={data}
                      allCheckedIDs={allCheckedIDs}
                      setAllCheckedIDs={setAllCheckedIDs}
                      activeChecker={activeChecker}
                      setActiveChecker={setActiveChecker}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full flex max-md:flex-col-reverse gap-4 justify-between py-[22px] px-[16px] items-center">
          <p className="font-[300] text-[14px] ">
            Showing{" "}
            <span className="font-[500]">
              {paginationData?.currentPage === 1
                ? 1
                : 1 + 10 * (paginationData?.currentPage - 1)}
            </span>
            -
            <span className="font-[500]">
              {paginationData?.currentPage === 1
                ? paginationData?.pageItems
                : 10 * (paginationData?.currentPage - 1) +
                  paginationData?.pageItems}
            </span>{" "}
            of{" "}
            <span className="font-[500]">
              {paginationData?.totalFilteredItems}
            </span>
          </p>

          <Pagination
            total={paginationData?.totalFilteredItems}
            showSizeChanger={false}
            onChange={handlePageNoChange}
            rootClassName="Pagination Nunito"
            current={paginationData?.currentPage}
            // showQuickJumper
            // showTotal={(total) => `Total ${total} items`}
          />
        </div>
      </div>
    </>
  );
}

export default TableComp;
