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
      } h-[290px] flex flex-col justify-center items-center gap-[0.8rem] flex-1 rounded-[7px] border-[1px] p-[2rem] border-lightGrey ${className}`}
    >
      <div
        className={`rounded-full h-[75px] w-[75px] ${
          type === "nom" ? "bg-green" : "bg-white"
        } flex items-center justify-center`}
      >
        {svg}
      </div>
      <h4
        className={`text-[1.3rem] mt-[1rem] font-[500] ${
          type === "nom" ? "text-darkGrey" : "text-white"
        } text-center`}
      >
        {title}
      </h4>
      <p
        className={`text-[1rem] font-[300] ${
          type === "nom" ? "text-grey" : "text-white"
        } text-center`}
      >
        {text}
      </p>
    </div>
  );
};

export default Card;
