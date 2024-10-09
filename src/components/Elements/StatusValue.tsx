const StatusValue = ({
  value,
  className,
}: {
  value:
    | "failed"
    | "completed"
    | "pending"
    | "refunded"
    | "purchased"
    | "available"
    | "successful"
    | "won"
    | "lost"
    | "ongoing"
    | string;
  className?: string;
}) => {
  const getStatusStyles = (
    status:
      | "failed"
      | "completed"
      | "pending"
      | "refunded"
      | "purchased"
      | "available"
      | "successful"
      | "won"
      | "lost"
      | "ongoing"
      | string
  ) => {
    switch (status) {
      case "failed":
        return "bg-[#FDE8E8] text-[#9B1C1C]";
      case "refunded":
        return "bg-[#FDE8E8] text-[#9B1C1C]";
      case "lost":
        return "bg-[#FDE8E8] text-[#9B1C1C]";
      case "completed":
        return "bg-[#DEF7EC] text-[#03543F]";
      case "won":
        return "bg-[#DEF7EC] text-[#03543F]";
      case "pending":
        return "bg-[#FDF6B2] text-[#723B13]";
      case "ongoing":
        return "bg-[#FDF6B2] text-[#723B13]";
      case "available":
        return "bg-[#DEF7EC] text-[#03543F]";
      case "successful":
        return "bg-[#DEF7EC] text-[#03543F]";
      case "purchased":
        return "bg-[#FFF1DA] text-[#723B13]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-[80px] flex items-center justify-center py-[2px] rounded-[5px] ${getStatusStyles(
        value
      )} font-[400] text-[12px] ${className}`}
    >
      {value}
    </div>
  );
};

export default StatusValue;
