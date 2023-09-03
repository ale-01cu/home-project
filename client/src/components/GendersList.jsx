import { useMemo } from "react"
import randomColor from '../utils/generateColor'

const GenderList = ({ gender, className }) => {
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

export default GenderList
