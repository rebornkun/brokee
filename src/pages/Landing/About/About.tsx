import ThirdSection from "../Home/ThirdSection";
import FifthSection from "./FifthSection";
import FirstSection from "./FirstSection";
import ForthSection from "./ForthSection";
import SecondSection from "./SecondSection";
import SixthSection from "./SixthSection";

const About = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection padding="pt-[10rem] md:pt-[14rem]" />
      {/* <FifthSection /> */}
      <SixthSection />
    </>
  );
};

export default About;
