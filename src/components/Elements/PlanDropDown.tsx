import { Select } from "antd";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { TCryptoType, TPlanDropItem } from "../../types/types";
// import { PaymentPlanIconSvg } from "./svg";

const { Option } = Select;

function PlanDropDown({
  options,
  state,
  setState,
  setPlanCost,
  placeholder,
  readOnly,
}: {
  state: string | undefined;
  setState: (value: string) => void;
  options: TPlanDropItem[] | TCryptoType[];
  setPlanCost: (value: number) => void;
  placeholder: string;
  readOnly?: boolean;
}) {
  const handleChange = (value: string) => {
    const getPlanCost = options.filter((option) => value === option._id);
    setPlanCost((getPlanCost[0] as TPlanDropItem).fullPaymentAmount || 0);
    setState(value);
  };

  return (
    <Select
      defaultValue={state}
      value={state}
      style={
        {
          // width: 133,
          // height: 40,
        }
      }
      disabled={readOnly}
      placeholder={placeholder}
      onChange={handleChange}
      variant="borderless"
      className="Nunito !border-[#D1D5DB] !border-[1px] !bg-[#F9FAFB] rounded-[8px] !w-full !h-[44px] !font-[300] text-[16px] "
      suffixIcon={<IoIosArrowDown className="text-[20px] text-black Nunito " />}
    >
      {options.map((datum, index) => {
        return (
          <Option key={index} value={datum._id} className="!p-2 ">
            <div className="flex w-full justify-between items-center">
              <div className="flex w-full items-center gap-[5px] truncate">
                {/* <PaymentPlanIconSvg className="min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]" /> */}

                {(datum as TCryptoType) && (
                  <img
                    src={(datum as TCryptoType).img}
                    alt="token"
                    className="min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]"
                  />
                )}
                {(datum as TCryptoType).name}
                {(datum as TPlanDropItem).planName}
              </div>

              {state === datum._id && (
                <FaCheck className="check text-darkYellow text-[16px] " />
              )}
            </div>
          </Option>
        );
      })}
    </Select>
  );
}

export default PlanDropDown;
