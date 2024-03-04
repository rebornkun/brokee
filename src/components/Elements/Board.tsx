import { RightArrowSvg } from "../../assets/svg/svg";

const Board = ({ type }: { type: string }) => {
  return (
    <div className="w-full max-w-[750px] rounded-[5px] bg-green h-[280px] relative flex flex-col items-center justify-center gap-4">
      <div className="absolute top-0 left-0 right-0 bottom-0 m-auto bg-green h-full biggreen rounded-[5px] w-full rounded-[0.5rem] z-[1]"></div>
      <h1 className="text-white text-[3.5rem] font-[700] z-[2]">{type}</h1>
      <div className="z-[2] flex flex-row items-center gap-[0.5rem] ">
        <p className="text-[1rem] text-white">Home</p>
        <RightArrowSvg className="" />
        <p className="text-[1rem] text-white">{type}</p>
      </div>
    </div>
  );
};

export default Board;
