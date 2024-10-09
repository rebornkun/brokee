import { SetStateAction, useEffect, useState } from "react";
import TableComp from "./TableComp";
import {
  TPagination,
  TSortDropItem,
  TStatusDropItem,
  TTableColumn,
  TTableData,
} from "../../../types/types";
import { useAppStore } from "../../../store/store";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import SearchInput from "../../Elements/SearchInput";
import StatusDropDown from "../../Elements/StatusDropDown";
import SortDropDown from "../../Elements/SortDropDown";
import DeleteBtn from "../../Elements/DeleteBtn";

function TableWithSearch({
  columns,
  status,
  setStatus,
  statusOptions,
  activeSort,
  setActiveSort,
  sortOptions,
  pageNo,
  setPageNo,
  setSearchValue,
  paginationData,
  data,
  hasStatusBtn,
  hasDeleteBtn,
  isLoading,
}: {
  columns: TTableColumn[];
  status: TStatusDropItem;
  setStatus: React.Dispatch<SetStateAction<TStatusDropItem>>;
  statusOptions: TStatusDropItem[];
  activeSort: TSortDropItem;
  setActiveSort: React.Dispatch<SetStateAction<TSortDropItem>>;
  sortOptions: TSortDropItem[];
  pageNo: number;
  setPageNo: React.Dispatch<SetStateAction<number>>;
  setSearchValue: React.Dispatch<SetStateAction<string | undefined>>;
  paginationData: TPagination;
  data: TTableData[];
  hasStatusBtn?: boolean;
  hasDeleteBtn: boolean;
  isLoading: boolean;
}) {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalData = useAppStore((state) => state.setModalData);
  const modalData = useAppStore((state) => state.modalData);
  const modalType = useAppStore((state) => state.modalType);

  const [allCheckedIDs, setAllCheckedIDs] = useState<string[]>([]);

  const location = useLocation();
  const { pathname } = location;

  const deleteBtnAction = () => {
    if (allCheckedIDs.length >= 1) {
      if (pathname === "/customers") {
        setModalType("deleteCustomers");
      } else if (pathname === "/payment-plans") {
        setModalType("deletePaymentPlans");
      } else if (pathname === "/devices") {
        setModalType("deleteDevices");
      }

      setModalIsOpen(true);
      setModalData(allCheckedIDs);
    } else {
      toast.error("Please select item(s) from the table");
    }
  };

  useEffect(() => {
    if (modalData.length === 0 && modalType !== "none") {
      setAllCheckedIDs(modalData); //clear checkedIDs after delete
    }
  }, [modalData]);

  return (
    <div className="flex flex-col gap-[27px] ">
      <div className="flex justify-between w-full gap-2">
        <div
          className={`flex flex-1 gap-[10px] flex-wrap ${
            !hasDeleteBtn && "justify-between"
          }`}
        >
          <SearchInput setSearchValue={setSearchValue} setPageNo={setPageNo} />

          <div className={`flex gap-[10px]`}>
            {hasStatusBtn && (
              <StatusDropDown
                state={status}
                setState={setStatus}
                setPageNo={setPageNo}
                options={statusOptions}
              />
            )}

            <SortDropDown
              state={activeSort}
              setState={setActiveSort}
              setPageNo={setPageNo}
              options={sortOptions}
            />
          </div>
        </div>
        {hasDeleteBtn && <DeleteBtn action={deleteBtnAction} />}
      </div>
      <TableComp
        columns={columns}
        data={data}
        isLoading={isLoading}
        allCheckedIDs={allCheckedIDs}
        setAllCheckedIDs={setAllCheckedIDs}
        pageNo={pageNo}
        setPageNo={setPageNo}
        paginationData={paginationData}
      />
    </div>
  );
}

export default TableWithSearch;
