import { createMuiTheme } from "@material-ui/core";
import { indigo, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
      light: indigo[200],
    },
    secondary: {
      main: blue["A200"],
    },
  },
  typography: {
    body1: {
      fontSize: "1.1rem",
    },
  },
});

export default theme;
