import { CircleMarkSvg } from "../../assets/svg/svg";
import BouncingBtn from "../../components/Elements/BouncingBtn";

const FifthSection = () => {
  return (
    <section className="flex">
      <div className="container mx-auto py-[6rem] flex flex-col items-center gap-[1rem]">
        <h1 className="text-[2.7rem] font-[600] text-darkGrey">
          Best Pricing & Plan
        </h1>
        <p className="text-center font-[300] text-grey max-w-[70%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-row w-full mt-4 flex-wrap justify-center gap-[2rem]">
          <PriceBox />
          <PriceBox />
          <PriceBox />
        </div>
      </div>
    </section>
  );
};

export default FifthSection;

const PriceBox = () => {
  return (
    <div className="px-10 py-8 flex flex-col gap-[0.8rem] flex-[1_1_30%] min-w-[350px] max-w-[30%] rounded-[5px] border-[1px] border-lightGrey">
      <h5 className="text-[1.3rem] text-darkGrey font-[600]">Beginner</h5>
      <p className="text-[1rem] text-otherGrey font-[300] line-through">
        $390,-/Month
      </p>
      <p className="text-[1rem] text-grey font-[300]">
        <span className="font-[600] text-[2.5rem] text-darkGrey">$349</span>
        /Month
      </p>
      <div className="w-full h-[1px] bg-lightGrey"></div>
      <div className="flex flex-col gap-[0.5rem] mb-6">
        <MarkedText text="200+ Learning Videos" />
        <MarkedText text="100+ Stock Reports & Analysis" />
        <MarkedText text="News About Investment" />
        <MarkedText text="Lifetime Access" />
        <MarkedText text="Daily Update" />
        <MarkedText text="Monthly Rebalance" />
        <MarkedText text="24/7 Support" />
      </div>
      <BouncingBtn className={"w-full flex items-center justify-center"} />
      <p className="text-center mt-2 text-[0.9rem] text-darkGrey font-[300]">
        <span className="text-red font-[600]">*</span> Tax & other services
        included.
      </p>
    </div>
  );
};

const MarkedText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-[10px] flex-[1_1_50%]">
      <CircleMarkSvg className="" />
      <p className="text-[0.9rem] text-grey font-[300]">{text}</p>
    </div>
  );
};
