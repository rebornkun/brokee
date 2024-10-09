import React from "react";

const Card = ({
  title,
  text,
  svg,
  type,
  className,
}: {
  title: string;
  text: string;
  svg: React.ReactNode;
  type: "nom" | "other";
  className?: string;
}) => {
  return (
    <div
      className={`${
        type === "other" ? "bg-green" : "bg-white"
      } min-h-[290px] min-w-[250px]  flex flex-col justify-center items-center gap-[0.8rem] flex-1 rounded-[7px] border-[1px] p-[2rem] border-lightGrey ${className}`}
    >
      <div
        className={`rounded-full max-h-[75px] min-h-[75px] w-full max-w-[75px] min-w-[75px] h-full ${
          type === "nom" ? "bg-green" : "bg-white"
        } flex items-center justify-center`}
      >
        {svg}
      </div>
      <h4
        className={`max-md:text-[1rem] text-[1.3rem] mt-[1rem] font-[500] ${
          type === "nom" ? "text-darkGrey" : "text-white"
        } text-center`}
      >
        {title}
      </h4>
      <p
        className={`max-md:text-[0.8rem] text-[1rem] font-[300] ${
          type === "nom" ? "text-grey" : "text-white"
        } text-center`}
      >
        {text}
      </p>
    </div>
  );
};

export default Card;
