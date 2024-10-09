import { Select } from "antd";
import { SortOrder, TSortDropItem, TStatusDropItem } from "../../types/types";
import { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { SortSvg } from "../../assets/svg/svg";

const { Option } = Select;

const SortDropDown = ({
  state,
  setState,
  setPageNo,
  options,
}: {
  state: TSortDropItem;
  setState: React.Dispatch<SetStateAction<TSortDropItem>>;
  setPageNo: React.Dispatch<SetStateAction<number>>;
  options: TSortDropItem[];
}) => {
  const handleChange = (value: string) => {
    const selectedOption = options.filter((option) => option.key === value);
    const { key, ...reSelectedOption } = selectedOption[0]; //remove key from the obj

    setState(reSelectedOption);
    setPageNo(1); //set page number to 1 to get the first page of the new filter
  };
  return (
    <Select
      defaultValue={options[0].key}
      style={{
        width: 128,
        height: 42,
      }}
      onChange={handleChange}
      variant="borderless"
      className="!border-[#D0D5DD] !bg-[#FFFFFF] !border-[1px] rounded-[8px] "
      rootClassName="sortBtn"
      suffixIcon={false}
    >
      {options.map((datum, index) => {
        return (
          <Option
            value={datum.key}
            key={index}
            className="!p-2 statusOption my-[1px]"
          >
            <div className="flex !w-full !justify-between !items-center !text-[#6B7280] !font-[400] !text-[12px]  ">
              <SortSvg className="statusPick min-w-[16px] text-black Nunito " />
              <p className="">
                <span className="statusPick">Sort by </span>
                <span className="Mtext ">
                  {datum.field === "createdAt" && datum.order === SortOrder.DESC
                    ? "Most Recent"
                    : datum.field === "createdAt" &&
                      datum.order === SortOrder.ASC
                    ? "Least Recent"
                    : ""}
                </span>
              </p>
              <IoIosArrowDown className="statusPick text-[16px] text-[#6B7280] Nunito " />
              {state.field === datum.field && state.order === datum.order && (
                <FaCheck className="check text-darkYellow text-[16px] " />
              )}
            </div>
          </Option>
        );
      })}
    </Select>
  );
};

export default SortDropDown;
