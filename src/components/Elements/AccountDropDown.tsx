import { Dropdown, Menu } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";

const menu = (
  <Menu className="!p-2 w-[250px] !shadow-md mt-2 ">
    <p className="uppercase text-[14px] 2xl:text-[16px] font-[400] py-2 px-4 text-textLightGrey Nunito">
      Accounts
    </p>
    <Menu.Item
      key="1"
      className="!px-4 !py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-green hover:!text-darkGreen transition"
    >
      Deposit
    </Menu.Item>
    <Menu.Item
      key="2"
      className="!px-4 !py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-green hover:!text-darkGreen transition"
    >
      Withdraw
    </Menu.Item>
    <Menu.Item
      key="3"
      className="!px-4 !py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-green hover:!text-darkGreen transition"
    >
      Hide Balance
    </Menu.Item>
    <Menu.Item
      key="4"
      className="!px-4 !py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-green hover:!text-darkGreen transition"
    >
      Add Account
    </Menu.Item>
  </Menu>
);

function AccountDropDown() {
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <div className="h-full w-[42px] rounded-[8px] border-[1px] border-grey flex items-center justify-center cursor-pointer group/dropdown">
        <BiDotsVerticalRounded className="group-hover/dropdown:rotate-[-45deg] transition-all" />
      </div>
    </Dropdown>
  );
}

export default AccountDropDown;
