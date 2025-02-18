const PolicyAgreement = () => {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto ">
        <div className="w-full h-full py-8 px-4">
          <h1 className="font-[700] text-[20px]">Tradex Policy Agreement</h1>
          <p className="font-[400] text-[14px] mt-2">
            {" "}
            Welcome to Tradex! This Fee Policy Agreement outlines the fees
            associated with the use of our platform, and specifies that users
            are responsible for all fees related to their use of the Site.
          </p>
          <p className="font-[400] text-[14px] mt-2">
            By accessing or using Tradex, you agree to the terms outlined in
            this Agreement.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            1. Scope of the Agreement
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            This Agreement applies to all users of the Tradex website,
            accessible via https://www.tradex.markets/. It governs the fee
            structure for using the platform’s services, including any trades,
            transactions, deposits, withdrawals, or other activities on the
            platform.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            2. User Responsibility for Fees
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            By using the Site, you agree to pay all fees associated with your
            use of the platform, including but not limited to:
          </p>
          <ul className="font-[400] text-[14px] mt-2 list-disc">
            <li className="ml-4">
              Transaction Fees: Fees charged for processing trades made on the
              platform (buying or selling assets).
            </li>
            <li className="ml-4">
              Deposit Fees: Any fees charged by third-party financial
              institutions or payment processors when depositing funds into your
              account.
            </li>
            <li className="ml-4">
              Withdrawal Fees: Any fees charged for withdrawing funds from your
              account to external accounts or wallets.
            </li>
            <li className="ml-4">
              {" "}
              Account Maintenance Fees: Any fees associated with maintaining an
              active account on the platform, if applicable.
            </li>
            <li className="ml-4">
              Payment Processing Fees: Any fees from third-party payment
              gateways or financial institutions involved in processing payments
              made on the platform.
            </li>
            <li className="ml-4">
              Currency Conversion Fees: Fees related to the conversion of
              currencies or assets when performing trades, if applicable.
            </li>
          </ul>
          <p className="font-[400] text-[14px] mt-2">
            You agree that these fees will be deducted from your account balance
            or charged to you directly as per the terms of our platform and
            third-party service providers.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            3. Payment Method Fees
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            You are responsible for any fees incurred by your chosen payment
            method (e.g., credit card, bank transfer, cryptocurrency network
            fees) when depositing or withdrawing funds. These fees may be
            imposed by your bank or third-party payment services and are
            separate from the platform’s trading fees.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">4. Changes to Fees </h1>
          <p className="font-[400] text-[14px] mt-2">
            Tradex reserves the right to change or adjust the fees related to
            the platform at any time. We will notify users of any changes to the
            fee structure via email or on-site notification. These changes will
            take effect as specified in the notice.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">5. Exclusions</h1>
          <p className="font-[400] text-[14px] mt-2">
            The following fees are not covered by Tradex and remain the
            responsibility of the user:
            <ul className="font-[400] text-[14px] mt-2 list-disc">
              <li className="ml-4">
                Bank or Financial Institution Fees: Fees charged by your own
                bank or financial institution for transferring funds to or from
                your account.
              </li>
              <li className="ml-4">
                Currency Conversion Fees: Fees for converting currencies or
                exchanging assets that are outside the control of the platform.
              </li>
              <li className="ml-4">
                External Wallet Fees: Fees imposed by third-party wallets or
                exchanges used to transfer funds to or from your account.
              </li>
            </ul>
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            6. User Responsibilities{" "}
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            As a user of Tradex, you are responsible for:
            <ul className="font-[400] text-[14px] mt-2 list-disc">
              <li className="ml-4">
                Ensuring that you have sufficient funds in your account to cover
                the fees associated with any transactions.
              </li>
              <li className="ml-4">
                Keeping track of any applicable fees that may be imposed by
                external payment processors or financial institutions.
              </li>
              <li className="ml-4">
                Paying any fees that arise as part of the services provided by
                Tradex or third-party services.
              </li>
            </ul>
            You acknowledge that failure to cover fees may result in delayed
            transactions, suspension, or termination of your account as
            specified in our Terms and Conditions.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            7. Termination of Agreement{" "}
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            Tradex reserves the right to suspend or terminate your access to the
            platform for non-payment of fees or violation of this Fee Policy
            Agreement. All outstanding fees will need to be settled before the
            termination is processed.
          </p>
          <h1 className="font-[600] text-[18px] mt-2">
            8. Governing Law and Dispute Resolution
          </h1>
          <p className="font-[400] text-[14px] mt-2">
            This Fee Policy Agreement is governed by the laws of United Kingdom.
            Any disputes relating to this Agreement shall be resolved according
            to the dispute resolution procedures outlined in our Terms and
            Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyAgreement;
