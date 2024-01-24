import person from "../../assets/img/businessman.png";

const Home = () => {
  return (
    <div>
      <section className="flex mt-8 gap-[8rem]">
        <div className="relative flex-[1_1_50%] h-[670px] flex items-end">
          <div className="bg-green h-[550px] w-full relative rounded-[0.5rem]">
            <div className="bg-green h-full w-full biggreen rounded-[0.5rem]"></div>
          </div>
          <img
            src={person}
            alt="person"
            className="absolute w-[80%] h-full bottom-0 left-0 right-0"
          />
        </div>

        <div className="relative flex-[1_1_50%]"></div>
      </section>
    </div>
  );
};

export default Home;
