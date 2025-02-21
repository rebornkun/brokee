import { useAppStore } from "../../store/store";
import { TFiatAccount } from "../../types/types";
import FiatCard from "../Elements/FiatCard";

const FiatAccountsGroup = () => {
  const userData = useAppStore((state) => state.userData);
  const userWallet = useAppStore((state) => state.userWallet);
  const userFiatAccounts = useAppStore((state) => state.userFiatAccounts);
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setDrawerType = useAppStore((state) => state.setDrawerType);

  const handleAddAccountsAction = () => {
    setIsDrawerOpen(true);
    setDrawerType("addFiatAccount");
  };

  return (
    <div className="mt-[17px] flex flex-wrap max-md:flex-cols gap-[33px] items-center max-md:items-starts ">
      {/* {userFiatAccounts.map((datum: TFiatAccount, index: number) => {
        return (
          <FiatCard
            id={datum._id}
            img={datum.accountData.currency.flag}
            name={datum.accountData.accName}
            currency={datum.accountData.currency.currency}
            bank={datum.accountData.bank}
            accNo={datum.accountData.accNumber}
            status={datum.status}
            isActiveAccount={datum.active}
          />
        );
      })} */}
      {userWallet.fiatAccount && (
        <FiatCard
          id={userWallet.id}
          img={"/others/bank-icon.jpg"}
          name={
            userWallet.fiatAccount.firstName +
            " " +
            userWallet.fiatAccount.lastName
          }
          currency={""}
          bank={userWallet.fiatAccount.country}
          accNo={
            userWallet.fiatAccount.accNumber ||
            userWallet.fiatAccount.ibanNumber ||
            ""
          }
          status={"active"}
          isActiveAccount={true}
        />
      )}
      {!userWallet.fiatAccount && (
        <p
          className="text-darkGreen font-[400] text-[14px] 2xl:text-[16px] cursor-pointer "
          onClick={handleAddAccountsAction}
        >
          + Add {userFiatAccounts.length > 0 && "another"} fiat account{" "}
        </p>
      )}
    </div>
  );
};

export default FiatAccountsGroup;
