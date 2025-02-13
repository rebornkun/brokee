import PuzzleChart from "../../../components/Elements/PuzzleChart";

const Certificate = () => {
  return (
    <div className="w-full relative flex flex-col">
      <div className="container max-md:px-[15px] relative flex flex-col mx-auto py-4 ">
        <div className="flex w-full full justify-center items-center">
          <img
            src="/tradexcert.png"
            alt="certificate"
            className="max-w-[600px] w-full mb-[4rem]"
          />
        </div>

        <div className="w-full h-[700px]">
          <PuzzleChart />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
