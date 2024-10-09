import FifthSection from "./FifthSection";
import FirstSection from "./FirstSection";
import ForthSection from "./ForthSection";
import SecondSection from "./SecondSection";
import SixthSection from "./SixthSection";
import ThirdSection from "./ThirdSection";

const Home = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
      <SixthSection padding="pt-[18rem]" />
    </>
  );
};

export default Home;
