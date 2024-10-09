import { TPlanDropItem } from "../../types/types";

const PaymentPlanTr = ({ value }: { value: TPlanDropItem }) => {
  return <>{value?.planName}</>;
};

export default PaymentPlanTr;
