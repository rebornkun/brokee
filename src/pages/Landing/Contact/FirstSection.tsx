import Board from "../../../components/Elements/Board";
import NavBar from "../../../components/NavBar/NavBar";

const FirstSection = () => {
  return (
    <section className="relative aboutFirstSection">
      <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
      <NavBar />
      <div className="container max-md:px-[15px] relative flex mx-auto gap-[6rem] items-center justify-center pt-[3rem] pb-[6rem]">
        <Board type={"Contact"} />
      </div>
    </section>
  );
};

export default FirstSection;
