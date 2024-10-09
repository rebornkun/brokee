import { SetStateAction } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { TGraphTimeline, TStatusDropItem } from "../../types/types";
import { Select } from "antd";

const { Option } = Select;

function TimelineDropDown({
  state,
  setState,
  options,
  changeHandler,
}: {
  state: TGraphTimeline;
  setState: React.Dispatch<SetStateAction<TGraphTimeline>>;
  options: TStatusDropItem[];
  changeHandler?: () => void;
}) {
  const handleChange = (value: TGraphTimeline) => {
    setState(value);
    if (changeHandler) changeHandler();
  };

  return (
    <Select
      value={state}
      defaultValue={state}
      style={{
        width: 133,
        height: 40,
      }}
      onChange={handleChange}
      variant="borderless"
      className="!border-grey !border-[1px] rounded-[8px]"
      suffixIcon={<IoIosArrowDown className="text-[20px] text-black Nunito " />}
    >
      {options.map((datum, index) => {
        return (
          <Option key={index} value={datum.value} className="!p-2 my-[1px]">
            <div className="flex items-center justify-between w-full capitalize">
              {datum.field}
              {state === datum.field && (
                <FaCheck className="check text-darkGreen text-[16px] " />
              )}
            </div>
          </Option>
        );
      })}
    </Select>
  );
}

export default TimelineDropDown;
