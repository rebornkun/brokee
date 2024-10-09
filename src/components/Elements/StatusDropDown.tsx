import { Select } from "antd";
import { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { TStatusDropItem } from "../../types/types";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { ProtectedRoutesUrl } from "../../container/Routes";

const { Option } = Select;

const StatusDropDown = ({
  state,
  setState,
  setPageNo,
  options,
}: {
  state: TStatusDropItem;
  setState: React.Dispatch<SetStateAction<TStatusDropItem>>;
  setPageNo: React.Dispatch<SetStateAction<number>>;
  options: TStatusDropItem[];
}) => {
  const handleChange = (value: string) => {
    const selectedOption = options.filter((option) => option.value === value);
    setState(selectedOption[0]);
    setPageNo(1); //set page number to 1 to get the first page of the new filter
  };

  const location = useLocation();

  return (
    <Select
      defaultValue={options[0].value}
      style={{
        width: location.pathname === ProtectedRoutesUrl.SETTINGS ? 130 : 117,
        height: 42,
      }}
      onChange={handleChange}
      variant="borderless"
      className="!border-[#D0D5DD] !bg-[#FFFFFF] !border-[1px] rounded-[8px] "
      // suffixIcon={<IoIosArrowDown className="text-[20px] text-black Nunito " />}
      rootClassName="statusBtn"
      suffixIcon={false}
    >
      {options.map((datum, index) => {
        return (
          <Option
            value={datum.value}
            key={index}
            className="!p-2 statusOption my-[1px]"
          >
            <div className="flex !w-full !justify-between !items-center !text-[#6B7280] !font-[400] !text-[12px]">
              <div className="flex items-center justify-between w-full capitalize">
                {datum.value}
                <IoIosArrowDown className="statusPick text-[16px] text-[#6B7280] Nunito" />
              </div>
              {state.value === datum.value && (
                <FaCheck className="check text-darkYellow text-[16px] " />
              )}
            </div>
          </Option>
        );
      })}
    </Select>
  );
};

export default StatusDropDown;
