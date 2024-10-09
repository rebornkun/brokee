import { Button } from "antd";
import { useAppStore } from "../../store/store";
import { DeleteSvg } from "../../assets/svg/svg";

const DeleteBtn = ({
  action,
  className,
}: {
  action: () => void;
  className?: string;
}) => {
  return (
    <Button
      type="text"
      htmlType="button"
      icon={<DeleteSvg className="" />}
      onClick={() => {
        action();
      }}
      className={`Nunito w-fit h-[42px] ${className} flex items-center justify-center bg-white hover:!bg-white !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] !border-[#D0D5DD] !bg-[#FFFFFF] !border-[1px] rounded-[8px] cursor-pointer  `}
      loading={false}
    >
      Delete
    </Button>
  );
};

export default DeleteBtn;
