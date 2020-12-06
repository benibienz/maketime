import {
  withStyles,
  Paper,
  Typography,
  TableRow,
  TableCell,
} from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";

const UnstyledContainer = ({ title, children, classes }) => {
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      <div className={classes.view}>{children}</div>
    </Paper>
  );
};

const Container = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2, 0, 0, 2),
    "& > h4": {
      marginBottom: theme.spacing(1),
    },
  },
  view: {
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderWidth: "0.5px",
    borderColor: theme.palette.grey[300],
    overflow: "scroll",
    maxHeight: "70vh",
  },
}))(UnstyledContainer);

const DividerTableRow = withStyles((theme) => ({
  root: {
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.grey[400],
  },
}))(TableRow);

const NumberCell = withStyles({
  root: {
    fontSize: "1.1rem",
  },
})(TableCell);

const CheckIcon = withStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    color: theme.palette.success.main,
  },
}))(CheckCircle);

export { Container, DividerTableRow, NumberCell, CheckIcon };
