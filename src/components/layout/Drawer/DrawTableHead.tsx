const DrawTableHead = ({
  title1,
  title2,
  isLoading,
}: {
  title1: string;
  title2: string;
  isLoading: boolean;
}) => {
  return (
    <tr className="bg-[#F9FAFB] border-b-[#E5E7EB] border-b-[1px] ">
      <th className="uppercase text-start text-[#6B7280] font-[600] text-[16px] 2xl:text-[20px] p-[14px]">
        {title1}
      </th>

      <th className="text-darkYellow text-end font-[600] text-[13px] 2xl:text-[16px] italic p-[14px]">
        {!isLoading ? title2 : ""}
      </th>
    </tr>
  );
};

export default DrawTableHead;
