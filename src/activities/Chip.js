import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: (props) => props.background[800],
    "&:focus": {
      background: (props) => props.background[600],
    },
  },
});

const ColoredChip = (props) => {
  const classes = useStyles(props);
  return <Chip className={classes.root} {...props} />;
};

export default ColoredChip;
