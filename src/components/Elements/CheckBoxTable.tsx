import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  // TCustomerData,
  // TDeviceData,
  // TPaymentData,
  TTableData,
  TTableDataArr,
} from "../../types/types";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CheckBoxTable = ({
  type,
  data,
  allCheckedIDs,
  setAllCheckedIDs,
  activeChecker,
  setActiveChecker,
}: {
  type: "main" | "sub";
  data: TTableData | TTableDataArr;
  allCheckedIDs: string[];
  setAllCheckedIDs: React.Dispatch<SetStateAction<string[]>>;
  activeChecker: string;
  setActiveChecker: React.Dispatch<SetStateAction<string>>;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();

  const checkIfAllDataIDsAreChecked = (): boolean => {
    const allData = data as TTableDataArr;

    const checker = allData.every((datum) => {
      if (allCheckedIDs.includes(datum._id) || handleDisable(datum)) {
        return true; // Continue iteration
      }
      return false; // Stop iteration
    });
    return checker;
  };

  const checkIfIdShouldBeGotten = (
    // data: TTableData | TDeviceData | TCustomerData | TPaymentData
    data: TTableData
  ) => {
    // if (location.pathname === ProtectedRoutes.DEVICES) {
    //   if (
    //     (data as TDeviceData).status === "purchased" ||
    //     (data as TDeviceData).amountPaid > 0
    //   ) {
    //     return ""; //don't return id if delete function if device has been purchased or payment for this device has started
    //   } else {
    //     return data._id;
    //   }
    // } else if (location.pathname === ProtectedRoutes.CUSTOMERS) {
    //   if ((data as TCustomerData).devices.length > 0) {
    //     return ""; //disable delete function if customer is attached to a device.
    //   } else {
    //     return data._id;
    //   }
    // } else if (location.pathname === ProtectedRoutes.PAYMENT_PLANS) {
    //   if ((data as TPaymentData).noOfDevices > 0) {
    //     return ""; //disable delete function if device is attached to a payment plan.
    //   } else {
    //     return data._id;
    //   }
    // } else {
    //   return data._id;
    // }
    return data._id;
  };

  const onChange = (e: CheckboxChangeEvent) => {
    const initCheckedIDs = allCheckedIDs;
    //check if its a row checkbox or main control checkbox
    if (type === "sub") {
      setActiveChecker((data as TTableData)._id);
      if (e.target.checked) {
        initCheckedIDs.push((data as TTableData)._id); //add new id to array
        setAllCheckedIDs(initCheckedIDs);
        setIsChecked(true);
      } else {
        const filteredCheckedIDs = initCheckedIDs.filter(
          (id) => id !== (data as TTableData)._id
        ); //remove id from array
        setAllCheckedIDs(filteredCheckedIDs);
        setIsChecked(false);
      }
    } else if (type === "main") {
      if (e.target.checked) {
        const allData = data as TTableDataArr;
        const allIDs = allData.map((datum: TTableData, index: number) => {
          return checkIfIdShouldBeGotten(datum);
        });
        //remove any id that has been disabled (id that are disabled are in the form of empty string '')
        const revampedAllIDs = allIDs.filter((id: string) => {
          return id !== "";
        });
        setAllCheckedIDs(revampedAllIDs); //add all ids to the array
        setIsChecked(true);
      } else {
        setAllCheckedIDs([]); //empty array
        setIsChecked(false);
      }
    }
  };

  useEffect(() => {
    if (type === "sub") {
      if (allCheckedIDs.includes((data as TTableData)._id)) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
    if (type === "main") {
      if (checkIfAllDataIDsAreChecked()) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [allCheckedIDs, activeChecker, data]);

  const handleDisable = (
    // data: TTableData | TDeviceData | TCustomerData | TPaymentData
    data: TTableData
  ) => {
    // if (location.pathname === ProtectedRoutes.DEVICES) {
    //   if (
    //     (data as TDeviceData).status === "purchased" ||
    //     (data as TDeviceData).amountPaid > 0
    //   ) {
    //     return true; //disable delete function if device has been purchased or payment for this device has started
    //   }
    // } else if (location.pathname === ProtectedRoutes.CUSTOMERS) {
    //   if ((data as TCustomerData).devices.length > 0) {
    //     return true; //disable delete function if customer is attached to a device.
    //   }
    // } else if (location.pathname === ProtectedRoutes.PAYMENT_PLANS) {
    //   if ((data as TPaymentData).noOfDevices > 0) {
    //     return true; //disable delete function if customer is attached to a device.
    //   }
    // } else {
    //   return false;
    // }
    return false;
  };

  return (
    <Checkbox
      checked={isChecked}
      rootClassName="tableCheckBox"
      onChange={onChange}
      // disabled={type === "main" ? false : handleDisable(data as TDeviceData)} //disable if device is owned or has been paid for
      disabled={false} //disable if device is owned or has been paid for
    ></Checkbox>
  );
};

export default CheckBoxTable;
