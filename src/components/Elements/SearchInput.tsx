import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { SearchSvg } from "../../assets/svg/svg";

const SearchInput = ({
  setSearchValue,
  setPageNo,
}: {
  setSearchValue: React.Dispatch<SetStateAction<string | undefined>>;
  setPageNo: React.Dispatch<SetStateAction<number>>;
}) => {
  const [placeHolderValue, setPlaceHolderValue] = useState<string | undefined>(
    undefined
  );
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceHolderValue(event.target.value);
  };

  useEffect(() => {
    const deBouncer = setTimeout(() => {
      setSearchValue(placeHolderValue);
      setPageNo(1); //set page number to 1 to get the first page of the new filter
    }, 1000);

    return () => clearTimeout(deBouncer);
  }, [placeHolderValue]);

  return (
    <div className="flex gap-2 items-center sm:max-w-[310px] w-full h-[42px] bg-[#F9FAFB] border-[1px] border-[#E5E7EB] py-[12px] px-[16px] rounded-[8px]  ">
      <SearchSvg className="" />
      <input
        className="w-full bg-transparent outline-none border-none font-[300] text-[14px] text-[#6B7280]  "
        placeholder="Search"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
