import { useMemo } from "react"
import randomColor from '../services/generateColor'

const GenderCard = ({ gender, className }) => {
  const color = useMemo(() => randomColor(), []);

  return (
    <span
      key={gender.id}
      className={className + color}
      id="genders-cards"
    >
      {gender.name}
    </span>
  );
}

export default GenderCard
