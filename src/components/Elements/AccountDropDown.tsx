import { Dropdown } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { AdminRoutesUrl, ProtectedRoutesUrl } from "../../container/Routes";
import HideBalanceBtn from "./HideBalanceBtn";
import { useAppStore } from "../../store/store";

const userItems: { key: string; label: React.ReactNode; disabled?: boolean }[] =
  [
    {
      key: "1",
      disabled: true,
      label: (
        <div className="uppercase text-[14px] 2xl:text-[16px] font-[400] py-2 px-4 text-textLightGrey Nunito bg-transparent hover:!bg-white cursor-default">
          <span>Accounts</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block"
          to={ProtectedRoutesUrl.DEPOSITS}
        >
          Deposit
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block"
          to={ProtectedRoutesUrl.WITHDRAWALS}
        >
          Withdrawals
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link
          className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block"
          to={ProtectedRoutesUrl.ACCOUNTS}
        >
          Accounts
        </Link>
      ),
    },
    {
      key: "5",
      label: <HideBalanceBtn />,
    },
  ];

const adminItems: { key: string; label: React.ReactNode; disabled?: boolean }[] =
  [
    {
      key: "1",
      disabled: true,
      label: (
        <div className="uppercase text-[14px] 2xl:text-[16px] font-[400] py-2 px-4 text-textLightGrey Nunito bg-transparent hover:!bg-white cursor-default">
          <span>Quick Links</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block"
          to={AdminRoutesUrl.DEPOSITS}
        >
          Deposits
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block"
          to={AdminRoutesUrl.WITHDRAWALS}
        >
          Withdrawals
        </Link>
      ),
    },
  ];

function AccountDropDown() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const setHideAccountBalance = useAppStore(
    (state) => state.setHideAccountBalance
  );
  const hideAccountBalance = useAppStore((state) => state.hideAccountBalance);

  const items = isAdmin ? adminItems : userItems;

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        items,
        className: " w-[250px] !shadow-md mt-2",
        onClick: ({ key }) => {
          if (!isAdmin && key === "5") {
            setHideAccountBalance(!hideAccountBalance);
            localStorage.setItem(
              "hideAccountBalance",
              JSON.stringify(!hideAccountBalance)
            );
          }
        },
      }}
    >
      <div className="h-full w-[42px] rounded-[8px] border-[1px] border-grey flex items-center justify-center cursor-pointer droper group/dropdown">
        <BiDotsVerticalRounded className="group-hover/dropdown:rotate-[-45deg] transition-all" />
      </div>
    </Dropdown>
  );
}

export default AccountDropDown;
