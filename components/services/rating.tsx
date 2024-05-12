import { IoIosStarOutline, IoIosStarHalf, IoMdStar } from "react-icons/io";

type Props = { 
  rating: number 
};

const Rating = ({ rating }: Props) => {
  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoMdStar key={i} size={20} color="#debe1a"/>);
    }

    if (hasHalfStar) {
      stars.push(<IoIosStarHalf key={stars.length} size={19} color="#debe1a"/>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoIosStarOutline key={stars.length} size={20} color="#e9e9e9"/>);
    }

    return stars;
  };

  return (
    <>
      <div className="flex items-center">{renderStars()} <span className="text-sm ml-[5px] text-[#6b7177]">{rating}</span></div>
    </>
  );
};

export default Rating;
