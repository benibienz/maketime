import {
  withStyles,
  Paper,
  Typography,
  TableRow,
  TableCell,
  Grid,
} from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";

const UnstyledCard = ({ title, children, classes, icon }) => {
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container justify="center" className={classes.title}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="center" xs={1}>
          <Grid item>{icon}</Grid>
        </Grid>
      </Grid>
      <div className={classes.view}>{children}</div>
    </Paper>
  );
};

const Card = withStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  title: {
    paddingTop: theme.spacing(1),
    borderBottomStyle: "solid",
    borderWidth: "1px",
    // borderColor: theme.palette.grey[400],
    borderColor: theme.palette.primary.light,
  },
  view: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: { maxHeight: "72vh", overflowY: "scroll" },
  },
}))(UnstyledCard);

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

export { Card, DividerTableRow, NumberCell, CheckIcon };
