import { Dropdown, Menu } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useAppStore } from "../../store/store";
import { TModalType } from "../../store/store.types";

const handleMenuClick = (
  key: string,
  id: string,
  type: "Usdc" | "Fiat",
  setModalIsOpen: (value: boolean) => void,
  setModalType: (value: TModalType) => void,
  setModalData: (value: string[]) => void
) => {
  setModalIsOpen(true);
  setModalData([id]);

  if (key === "1") {
    //set active
    if (type === "Fiat") {
      setModalType("setActiveFiatAccount");
    } else if (type === "Usdc") {
      setModalType("setActiveUsdcAccount");
    }
  } else if (key === "2") {
    //delete
    if (type === "Fiat") {
      setModalType("deleteFiatAccount");
    } else if (type === "Usdc") {
      setModalType("deleteUsdcAccount");
    }
  }
};

const items: { key: string; label: React.ReactNode }[] = [
  // {
  //   key: "1",
  //   label: (
  //     <div className="!px-[4px] !py-[4px] rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-yellow hover:!text-darkYellow transition">
  //       <span>Set Active</span>
  //     </div>
  //   ),
  // },
  {
    key: "2",
    label: (
      <div className="!px-[4px] !py-[4px] rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-yellow hover:!text-darkYellow transition">
        <span>Delete</span>
      </div>
    ),
  },
];

function AccountCardDropDown({
  id,
  type,
}: {
  id: string;
  type: "Usdc" | "Fiat";
}) {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalData = useAppStore((state) => state.setModalData);

  return (
    <Dropdown
      menu={{
        items,
        className: "!p-[5px] w-[120px] !shadow-md mt-2",
        onClick: ({ key }) => {
          handleMenuClick(
            key,
            id,
            type,
            setModalIsOpen,
            setModalType,
            setModalData
          );
        },
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="flex items-center justify-center cursor-pointer">
        <BiDotsVerticalRounded className="text-[#8B8B94] text-[14px]" />
      </div>
    </Dropdown>
  );
}

export default AccountCardDropDown;
