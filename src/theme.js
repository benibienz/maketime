import { createMuiTheme } from "@material-ui/core";
import { blue, indigo } from "@material-ui/core/colors";

// Other attributes are default values
// See: https://material-ui.com/customization/default-theme/#default-theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: blue["A200"],
    },
    text: {
      secondary: "rgba(0, 0, 10, 0.67)",
    },
  },
  typography: {
    body1: {
      fontSize: "1.1rem",
    },
  },
});

export default theme;
