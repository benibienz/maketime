// prettier-ignore
import { amber, brown, cyan, deepOrange, deepPurple, green, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@material-ui/core/colors";

//  From https://stackoverflow.com/a/12646864
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateColorList = () => {
  // prettier-ignore
  let colorList = [purple, red, orange, teal, pink, green, yellow, cyan, deepOrange, deepPurple, lightGreen, lime, amber, brown];
  shuffleArray(colorList);
  return colorList;
};

export default generateColorList;
