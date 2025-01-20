import { useAppStore } from "../../store/store";
import { TUsdcAccount, UsdcChains } from "../../types/types";
import UsdcCard from "../Elements/UsdcCard";

const UsdcAccountsGroup = () => {
  const userWallet = useAppStore((state) => state.userWallet);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);

  const handleAddAccountsAction = () => {
    setModalIsOpen(true);
    setModalType("addUsdcAccount");
  };

  return (
    <div className="mt-[17px] flex flex-wrap max-md:flex-cols gap-[33px] items-center max-md:items-starts ">
      {userWallet.wallet_address ? (
        <UsdcCard
          key={1}
          id={userWallet.id}
          isActiveAccount={true}
          chain={UsdcChains.BTC}
          status={""}
          publicKey={userWallet.wallet_address}
        />
      ) : (
        <p
          className="text-darkGreen font-[400] text-[14px] 2xl:text-[16px] cursor-pointer"
          onClick={handleAddAccountsAction}
        >
          + Add BTC wallet{" "}
        </p>
      )}
    </div>
  );
};

export default UsdcAccountsGroup;
