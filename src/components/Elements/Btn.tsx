import { Button } from "antd";
import "./Elements.css";

const Btn = ({
  text,
  className,
  type,
}: {
  text: string;
  className: string;
  type: "text" | "link" | "default" | "primary" | "dashed" | undefined;
}) => {
  return (
    <Button type={type} className={`${className}`}>
      {text}
    </Button>
  );
};

export default Btn;
