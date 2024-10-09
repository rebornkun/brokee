import { MessageSvg } from "../../assets/svg/svg";

const MessageAlertCard = () => {
  return (
    <div className="flex gap-[15px] cursor-pointer">
      <div className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] rounded-full bg-yellow flex items-center justify-center ">
        <MessageSvg className="w-[22px] h-[22px]" />
      </div>
      <div className="flex flex-col ">
        <h5 className="text-black font-[500] text-[16.6px] leading-[33.3px] line-clamp-1">
          Welcome to Tradex - Empowering your Energy Access Jorurney!
        </h5>
        <p className="text-[#6B7280] font-[500] text-[13.8px] line-clamp-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
          doloribus cupiditate ducimus beatae, impedit, vero assumenda dolores
          rerum dolore, fugit neque consequatur nulla consequuntur quidem.
          Quidem officiis iste error repellendus.
        </p>
        <p className="text-[#9CA3AF] font-[400] text-[13.8px] mt-[16px]">
          22nd April 2024
        </p>
        <div className="w-full h-[1.3px] bg-[#E6EAEE] mt-[8.3px] "></div>
      </div>
    </div>
  );
};

export default MessageAlertCard;
