import {
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import { CheckIcon, NumberCell } from "../components";
import Chip from "./Chip";

const useStyles = makeStyles((theme) => ({
  inputHours: {
    margin: theme.spacing(1),
    width: "9ch",
  },
}));

const Activity = ({
  name,
  color,
  handleDelete,
  targetHours,
  setTargetHours,
  scheduledHours,
}) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell align="center">
        <Chip
          label={name}
          onDelete={handleDelete}
          color="primary"
          background={color}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          className={classes.inputHours}
          variant="outlined"
          type="number"
          size="small"
          label="Hours"
          error={isNaN(targetHours)}
          // Todo: this doesn't work
          InputProps={{
            max: 168,
            min: 0,
          }}
          value={isNaN(targetHours) ? "" : targetHours}
          onChange={(e) => setTargetHours(name, e.target.value)}
        />
      </TableCell>
      <NumberCell align="center">
        <Grid container direction="row" alignItems="center" justify="center">
          {scheduledHours}
          {scheduledHours >= targetHours && <CheckIcon />}
        </Grid>
      </NumberCell>
    </TableRow>
  );
};

export default Activity;
