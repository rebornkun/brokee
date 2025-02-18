import "../../../assets/SmallCard.css";

const SmallCard = ({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="small_card">
      <img src={img} alt={title} />
      <h5>{title}</h5>
      <p className="text-[14px]">{text}</p>
    </div>
  );
};

export default SmallCard;
