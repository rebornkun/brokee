import { ReactElement } from "react";

const DrawTableTr = ({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: string | ReactElement;
  isLoading: boolean;
}) => {
  return (
    <tr className="border-b-[#E5E7EB] border-b-[1px] relative">
      {isLoading ? (
        <>
          <td colSpan={2} className="text-[#475467] h-[35px] text-start">
            <div className=" sk_bg h-[35px] w-full bg-white my-2"></div>
          </td>
        </>
      ) : (
        <>
          <td className="text-[#475467] text-start text-[14px] 2xl:text-[16px] font-[300] p-[14px]">
            {title}
          </td>
          <td
            className="text-[#475467] text-end items-end text-[14px] 2xl:text-[16px] font-[300] p-[14px] break-all"
            align="right"
          >
            {value}
          </td>
        </>
      )}
    </tr>
  );
};

export default DrawTableTr;
