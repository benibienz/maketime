// prettier-ignore
import {purple, red, orange, teal, pink, green, blue, yellow, cyan, indigo} from "@material-ui/core/colors";

//  From https://stackoverflow.com/a/12646864
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateColorList = () => {
  // prettier-ignore
  let colorList = [purple, red, orange, teal, pink, green, blue, yellow, cyan, indigo];
  shuffleArray(colorList);
  return colorList;
};

export default generateColorList;
