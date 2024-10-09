import { Dropdown, Menu } from "antd";

import {
  BillingSvg,
  ProfileSvg,
  SettingsIconSvg,
  SignOutSvg,
  TransactionIconSvg,
} from "../../assets/svg/svg";
// import { signOut } from "../../services/auth/auth.service";

const menu = (
  <Menu className=" w-[200px] !shadow-md mt-2 ">
    <Menu.Item
      key="1"
      className="!py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div className="flex gap-2 items-center">
        <ProfileSvg className="" />
        My Profile
      </div>
    </Menu.Item>
    <Menu.Item
      key="2"
      className="!py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div className="flex gap-2 items-center">
        <TransactionIconSvg className="w-[18px] h-[18px]" />
        Transactions
      </div>
    </Menu.Item>
    <Menu.Item
      key="3"
      className="!py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div className="flex gap-2 items-center">
        <BillingSvg className="" />
        Billing
      </div>
    </Menu.Item>
    <Menu.Item
      key="4"
      className="!py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div className="flex gap-2 items-center">
        <SettingsIconSvg className="w-[18px] h-[18px]" />
        Setting
      </div>
    </Menu.Item>
    <div className="w-full h-[1px] bg-[#E5E7EB] " />
    <Menu.Item
      key="5"
      className="!py-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div
        className="flex gap-2 items-center !text-red"
        // onClick={signOut}
      >
        <SignOutSvg className="" />
        Sign Out
      </div>
    </Menu.Item>
  </Menu>
);

function ProfileDropDown() {
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <div className="h-full flex gap-[12px] items-center cursor-pointer">
        <img
          src="/profileEazi.jpeg"
          alt="profile"
          className="w-[32px] rounded-full shadow"
        />
        <div className="flex flex-col justify-center max-md:hidden">
          <p className="text-[14px] 2xl:text-[16px] font-[500] ">Olivia Rhye</p>
          <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#475467] ">
            olivia@gmail.com
          </p>
        </div>
      </div>
    </Dropdown>
  );
}

export default ProfileDropDown;
