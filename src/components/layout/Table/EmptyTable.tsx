import { FiInbox } from "react-icons/fi";

const EmptyTable = () => {
  return (
    <tr className="w-full h-[250px] relative ">
      <div className="absolute m-auto w-fit h-fit top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-2">
        <FiInbox className="text-[#dddddd] text-[40px] " />
        <p className="Nunito text-[#dddddd] font-[400] text-[16px] ">No data</p>
      </div>
    </tr>
  );
};

export default EmptyTable;
