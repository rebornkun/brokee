import { ReactElement } from "react";
import MessageAlertCard from "../../../components/Messages/MessageAlertCard";

function Messages(): ReactElement {
  return (
    <div className="mt-[32px] max-sm:mt-[11px] flex gap-[40px] w-full mb-[100px]">
      <div className="flex flex-col gap-[32px] w-[50%]">
        <MessageAlertCard />
        <MessageAlertCard />
        <MessageAlertCard />
      </div>
      <div className="w-[50%] h-[507px] border-[1px] border-[#E5E7EB] rounded-[8px]"></div>
    </div>
  );
}

export default Messages;
