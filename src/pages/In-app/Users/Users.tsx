import { useEffect, useState } from "react";
import TableWithSearch from "../../../components/layout/Table/TableWithSearch";
import TradesGreeting from "../../../components/Trades/TradesGreeting";

import {
  SortOrder,
  TPagination,
  TSortDropItem,
  TStatusDropItem,
  TTableData,
  TTrader,
} from "../../../types/types";
import {
  dashboardSortOptions,
  initPaginationData,
  tradeColumns,
  tradeStatusOptions,
  tradeTableData,
  usersColumns,
  usersTableData,
} from "../../../utils/constants";
import RevenueCard from "../../../components/Elements/RevenueCard";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TransactionStats from "../../../components/Elements/TransactionStats";
import { UserSvg } from "../../../assets/svg/svg";
import { capitalizeWords } from "../../../utils/helper";

import { Button } from "antd";
import { LuCopyMinus } from "react-icons/lu";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserTrader,
  stopTrader,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";
import UsersGreeting from "../../../components/Users/UsersGreeting";
import { getAllUsers } from "../../../services/user/user.service";
import SearchInput from "../../../components/Elements/SearchInput";

const pageLimit = 10;
const Users = () => {
  const userData = useAppStore((state) => state.userData);
  const [status, setStatus] = useState<TStatusDropItem>(tradeStatusOptions[0]);
  const [activeSort, setActiveSort] = useState<TSortDropItem>({
    order: SortOrder.DESC,
    field: "createdAt",
  });
  const [pageNo, setPageNo] = useState(1);
  const [paginationData, setPaginationData] =
    useState<TPagination>(initPaginationData);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<TTableData[]>([]);

  const {
    isLoading: allUsersIsLoading,
    error: allUsersErr,
    data: allUsersData,
  } = useQuery({
    queryKey: [QueryKeys.GETALLUSERS],
    queryFn: async () => {
      const res = await getAllUsers();

      return res.data;
    },
  });

  useEffect(() => {
    setTableData(allUsersData?.payload);
  }, [allUsersData]);

  const { mutate: stopTraderMutate, isPending: stopTraderIsPending } =
    useMutation({
      mutationKey: [MutationKeys.STOPTRADER],
      mutationFn: () => {
        return stopTrader(userData.id);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETUSERDATA}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETALLTRADERS}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  return (
    <section className="w-full h-full ">
      <UsersGreeting />

      <div className="flex flex-col gap-[35px]">
        <SearchInput
          originalData={allUsersData?.payload}
          data={tableData}
          setData={setTableData}
          setSearchValue={setSearchValue}
          setPageNo={setPageNo}
        />
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
          columns={usersColumns}
          data={tableData}
          paginationData={paginationData}
          isLoading={allUsersIsLoading}
          hasStatusBtn={true}
          search={true}
        />
      </div>
    </section>
  );
};

export default Users;
