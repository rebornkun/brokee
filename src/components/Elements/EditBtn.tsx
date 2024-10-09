import { Button } from "antd";
import { EditSvg } from "../../assets/svg/svg";

const EditBtn = ({
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
      icon={<EditSvg className="w-[18px] w-[18px]" />}
      className="Nunito w-fit px-[20px] py-[8px] h-[40px] flex items-center justify-center bg-white hover:!bg-white !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[500] text-[12px] 2xl:text-[14px] !border-[#D0D5DD] !bg-[#FFFFFF] !border-[1px] rounded-[8px]  "
      loading={false}
      onClick={() => {
        action();
      }}
    >
      Edit
    </Button>
  );
};

export default EditBtn;
