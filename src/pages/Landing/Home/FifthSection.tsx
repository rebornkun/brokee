import BouncingBtn from "../../../components/Elements/BouncingBtn";
import person from "../../../assets/img/youngBusinessmanTwo.png";
import chartFour from "../../../assets/img/chartFour.png";
import chartFive from "../../../assets/img/chartFive.png";
import {
  BoardSvg,
  BulbSvg,
  ChartSvg,
  HeadsetSvg,
  MoneyTwoSvg,
  SellChartSvg,
  TwoPeopleSvg,
} from "../../../assets/svg/svg";
import Card from "../../../components/Elements/Card";

const FifthSection = () => {
  return (
    <section className="relative fifthSection flex pt-[4rem]">
      <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
      <div className="container max-md:px-[15px] mx-auto flex flex-col z-[2]">
        <div className="flex max-lg:flex-col flex-row items-center max-lg:gap-[4rem] gap-[2rem]">
          <div className="flex flex-[1_1_55%] relative flex-col gap-[1.5rem]">
            <h1 className="text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
              Our Professional Skills
            </h1>
            <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4]  ">
              We combine deep market knowledge, innovative strategies, and
              personalized guidance to provide the best investment opportunities
              for you. With our team's expertise, we help you make informed
              decisions, manage risks, and achieve your financial goals.
            </p>
            <div className="flex flex-col gap-[1.3rem] mb-[2rem]">
              <Load percent={95} title={"Expert Advisors"} color={"nom"} />
              <Load percent={97} title={"Trading Instrument"} color={"other"} />
              <Load percent={94} title={"Technical Analysis"} color={"nom"} />
            </div>
            <BouncingBtn />
          </div>
          <div className="relative flex-[1_1_45%] w-full flex items-end">
            <div className="bg-green h-[400px] lg:h-[550px] w-full relative rounded-[0.5rem]">
              <div className="bg-green h-full biggreen w-full rounded-[0.5rem]"></div>
            </div>
            {/* <img
              src={person}
              alt="person"
              className="absolute max-w-[300px] max-h-[500px] md:w-[40%] lg:w-[80%] lg:h-[670px] bottom-0 left-0 right-0"
            /> */}
            <img
              src={"/forex.png"}
              alt="person"
              className="absolute w-full h-[300px] my-auto bottom-[10%] left-0 right-0"
            />
            <img
              src={chartFour}
              alt="chart"
              className="absolute w-[210px] top-[9rem] lg:right-[-3rem]"
            />
            {/* <img
              src={chartFive}
              alt="chart"
              className="absolute h-[130px] top-[65%] lg:left-[-6.5rem]"
            /> */}
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-[7rem] mb-[-12rem]">
          {/* <Card
            title={"Financial Trading"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<BoardSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="xl:max-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-tl-[10px]"
          />
          <Card
            title={"Manage Risk"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<SellChartSvg className="w-[40px] h-[40px]" color={"white"} />}
            type={"nom"}
            className="xl:min-w-[33.3%] !border-[0.1px] !rounded-[0px]"
          />
          <Card
            title={"Trading Psychology"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
            svg={<BulbSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="xl:min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-tr-[10px]"
          /> */}
          <Card
            title={"Individual Accounts"}
            text={
              "Personalized accounts tailored to your financial goals, giving you flexibility and control."
            }
            svg={<TwoPeopleSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="xl:min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-bl-[10px]"
          />
          <Card
            title={"Manage Risk"}
            text={
              "We provide risk management strategies to minimize losses and protect your investments."
            }
            svg={<MoneyTwoSvg className="w-[40px] h-[40px]" />}
            type={"nom"}
            className="xl:min-w-[33.3%] !border-[0.1px] !rounded-[0px] "
          />
          <Card
            title={"Trading Psychology"}
            text={
              "We help you build the right mindset to stay disciplined and make rational decisions under pressure."
            }
            svg={<HeadsetSvg className="w-[40px] h-[40px]" />}
            type={"other"}
            className="xl:min-w-[33.3%] !border-[0.1px] !rounded-[0px] !rounded-br-[10px]"
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
