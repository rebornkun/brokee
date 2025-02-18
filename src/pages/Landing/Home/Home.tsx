import TapeChart from "../../../components/Elements/TapeChart";
import Certificate from "./Certificate";
import Diagram from "./Diagram";
import FifthSection from "./FifthSection";
import FirstSection from "./FirstSection";
import ForthSection from "./ForthSection";
import Others from "./Others";
import SecondSection from "./SecondSection";
import SixthSection from "./SixthSection";
import ThirdSection from "./ThirdSection";

const Home = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <Certificate />
      <Others />
      <Diagram />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
      <SixthSection padding="pt-[18rem]" />
      <div className="bg-white z-[1000] w-full h-fit fixed bottom-0">
        <TapeChart />
      </div>
    </>
  );
};

export default Home;
