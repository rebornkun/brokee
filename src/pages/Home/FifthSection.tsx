import BouncingBtn from "../../components/Elements/BouncingBtn";
import person from "../../assets/img/youngBusinessmanTwo.png";
import chartFour from "../../assets/img/chartFour.png";
import chartFive from "../../assets/img/chartFive.png";
import {
  BoardSvg,
  BulbSvg,
  ChartSvg,
  HeadsetSvg,
  MoneyTwoSvg,
  SellChartSvg,
  TwoPeopleSvg,
} from "../../assets/svg/svg";
import Card from "../../components/Elements/Card";

const FifthSection = () => {
  return (
    <section className="relative fifthSection flex pt-[4rem]">
      <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
      <div className="container mx-auto flex flex-col z-[2]">
        <div className="flex flex-row items-center gap-[2rem]">
          <div className="flex flex-[1_1_55%] relative flex-col gap-[1.5rem]">
            <h1 className="text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
              Our Professional Skills
            </h1>
            <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4]  ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-col gap-[1.3rem] mb-[2rem]">
              <Load percent={83} title={"Expert Advisors"} color={"nom"} />
              <Load percent={71} title={"Trading Instrument"} color={"other"} />
              <Load percent={89} title={"Technical Analysis"} color={"nom"} />
            </div>
            <BouncingBtn />
          </div>
          <div className="relative flex-[1_1_45%] flex items-end">
            <div className="bg-green h-[550px] w-full relative rounded-[0.5rem]">
              <div className="bg-green h-full biggreen w-full rounded-[0.5rem]"></div>
            </div>
            <img
              src={person}
              alt="person"
              className="absolute w-[80%] h-[670px] bottom-0 left-0 right-0"
            />
            <img
              src={chartFour}
              alt="chart"
              className="absolute w-[210px] h-fit top-[9rem] right-[-3rem]"
            />
            <img
              src={chartFive}
              alt="chart"
              className="absolute h-[130px] top-[65%] left-[-6.5rem]"
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-[7rem] mb-[-12rem]">
          <Card
            title={"Financial Trading"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<BoardSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="max-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-tl-[10px]"
          />
          <Card
            title={"Manage Risk"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<SellChartSvg className="w-[40px] h-[40px]" color={"white"} />}
            type={"nom"}
            className="min-w-[33.3%] !border-[0.1px] !rounded-[0px]"
          />
          <Card
            title={"Trading Psychology"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<BulbSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-tr-[10px]"
          />
          <Card
            title={"Individual Accounts"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<TwoPeopleSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-bl-[10px]"
          />
          <Card
            title={"Manage Risk"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<MoneyTwoSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="min-w-[33.3%] !border-[0.1px] !rounded-[0px] "
          />
          <Card
            title={"Trading Psychology"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<HeadsetSvg className="w-[40px] h-[40px]" />}
            type={"other"}
            className="min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-br-[10px]"
          />
        </div>
      </div>
    </section>
  );
};

export default FifthSection;

const Load = ({
  percent,
  title,
  color,
}: {
  percent: number;
  title: string;
  color: string;
}) => {
  return (
    <div className="w-full relative flex flex-col gap-[12px]">
      <h5 className="text-[1rem] text-darkGrey text-start font-[600] leading-[1.2]">
        {title}
      </h5>
      <div
        style={{ width: `${percent}%` }}
        className={`relative ${"w-[" + percent + "%]"} ${
          color === "nom" ? "bg-green" : "bg-darkGrey"
        } h-[3px]`}
      >
        <h5 className="text-[1rem] text-darkGrey text-start font-[600] leading-[1.2] absolute right-0 bottom-[0.7rem]">
          {percent}%
        </h5>
      </div>
    </div>
  );
};
