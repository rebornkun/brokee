import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { SearchSvg } from "../../assets/svg/svg";
import { TTableData } from "../../types/types";
import { CgSpinner } from "react-icons/cg";

const SearchInput = ({
  originalData,
  data,
  setData,
  setSearchValue,
  setPageNo,
}: {
  originalData: TTableData[];
  data: TTableData[];
  setData: React.Dispatch<SetStateAction<TTableData[]>>;
  setSearchValue: React.Dispatch<SetStateAction<string | undefined>>;
  setPageNo: React.Dispatch<SetStateAction<number>>;
}) => {
  const [placeHolderValue, setPlaceHolderValue] = useState<string | undefined>(
    undefined
  );
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceHolderValue(event.target.value);
  };
  const [isLoading, setIsLoading] = useState(false);

  const filterData = () => {
    if (placeHolderValue) {
      const filteredData = originalData.filter((datum) =>
        datum.fullName?.toLowerCase().includes(placeHolderValue.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(originalData);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const deBouncer = setTimeout(() => {
      setSearchValue(placeHolderValue);
      filterData();
      setPageNo(1); //set page number to 1 to get the first page of the new filter
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(deBouncer);
  }, [placeHolderValue]);

  console.log(isLoading);
  return (
    <div className="flex gap-2 items-center sm:max-w-[310px] w-full h-[42px] bg-[#F9FAFB] border-[1px] border-[#E5E7EB] py-[12px] px-[16px] rounded-[8px]  ">
      <SearchSvg className="" />
      <input
        className="w-full bg-transparent outline-none border-none font-[300] text-[14px] text-[#6B7280]  "
        placeholder="Search"
        onChange={handleSearchChange}
      />
      {isLoading && (
        <CgSpinner className="text-[30px] text-green animate-spin" />
      )}
    </div>
  );
};

export default SearchInput;
