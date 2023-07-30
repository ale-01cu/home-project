import COLORS from '../utils/colors.js'

const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomElement = COLORS[randomIndex];
    return randomElement
  }

export default randomColor