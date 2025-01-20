import { TTrade } from "../../types/types";

const CurrencyBox = ({ data }: { data: TTrade }) => {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={data.currencyImg}
        alt="currency"
        className="h-[18px] w-[18px] rounded-[6px] "
      />
      <p className="">{data.currencyName}</p>
    </div>
  );
};

export default CurrencyBox;
