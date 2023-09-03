import { useMemo } from "react"
import randomColor from '../utils/generateColor'

const ActorsList = ({ actor, className }) => {
  const color = useMemo(() => randomColor(), []);

  return (
    <span
      key={actor.id}
      className={className + color}
      id="actors-list"
    >
      {actor.full_name}
    </span>
  );
}

export default ActorsList
