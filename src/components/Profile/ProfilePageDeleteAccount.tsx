import { Button } from "antd";
import { useAppStore } from "../../store/store";

const ProfilePageDeleteAccount = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);

  const handleDeleteAccount = () => {
    setModalIsOpen(true);
    setModalType("deleteDistributor");
  };

  return (
    <div className="p-[40px] max-sm:p-[30px] flex flex-col items-center gap-[16px] w-full max-w-[682px] max-md:max-w-full border-[1px] border-[#E5E7EB] rounded-[8px] ">
      <h5 className="Inter text-[20px] 2xl:text-[24px] text-black font-[500] ">
        Delete Account
      </h5>
      <p className="w-[68%] max-lg:w-full text-center text-[15.5px] 2xl:text-[18px] text-[#00000090] font-[500] ">
        Deleting your account is an irreversible action that will permanently
        remove all your data and cannot be undone. If you are certain that you
        want to proceed, please click the button below.
      </p>
      <Button
        type="primary"
        htmlType="button"
        className="Noto w-fit h-[40px] flex items-center justify-center bg-darkRed hover:!bg-darkRed !text-[#ffffff] hover:!text-[#ffffff] hover:opacity-[0.8] font-[500] text-[14px] 2xl:text-[16px] rounded-[8px]  "
        loading={false}
        onClick={() => {
          handleDeleteAccount();
        }}
      >
        I understand delete my account
      </Button>
    </div>
  );
};

export default ProfilePageDeleteAccount;
