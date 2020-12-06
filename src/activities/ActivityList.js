import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Container, DividerTableRow, NumberCell } from "../components";
import Activity from "./Activity";
import AddActivityButton from "./AddActivityButton";
import { sumHours } from "../schedule/events";
import { CheckIcon } from "../components";

const HOURS_IN_WEEK = 168;

const Headers = () => (
  <>
    <TableHead>
      <DividerTableRow>
        <TableCell align="center">
          <Typography>
            <b>Activity</b>
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            <b>Target</b>
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            <b>Scheduled</b>
          </Typography>
        </TableCell>
      </DividerTableRow>
    </TableHead>
  </>
);

const HourTotals = ({ targetTotal, calendarTotal }) => (
  <>
    <TableRow>
      <TableCell align="center">
        <Typography>
          <b>Total</b>
        </Typography>
      </TableCell>
      <NumberCell align="center">{targetTotal}</NumberCell>
      <NumberCell align="center">
        <Grid container direction="row" alignItems="center" justify="center">
          {calendarTotal}
          {calendarTotal >= targetTotal && <CheckIcon />}
        </Grid>
      </NumberCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">
        <Typography>
          <b>Remaining</b>
        </Typography>
      </TableCell>
      <NumberCell align="center">{HOURS_IN_WEEK - targetTotal}</NumberCell>
      <NumberCell align="center">{HOURS_IN_WEEK - calendarTotal}</NumberCell>
    </TableRow>
  </>
);

const ActivityList = ({
  activities,
  addActivity,
  deleteActivity,
  setTargetHours,
}) => {
  let totalTargetHours = activities.reduce((a, b) => a + b.targetHours, 0);
  let totalScheduledHours = activities.reduce(
    (a, b) => a + sumHours(b.events),
    0
  );

  return (
    <Container title="Weekly Hours">
      <TableContainer>
        <Table>
          <Headers />
          <TableBody>
            {activities.map((a) => (
              <Activity
                key={a.name}
                color={a.color}
                name={a.name}
                targetHours={a.targetHours}
                setTargetHours={setTargetHours}
                scheduledHours={sumHours(a.events)}
                handleDelete={() => deleteActivity(a.name)}
              />
            ))}
            <DividerTableRow>
              <TableCell align="center">
                <AddActivityButton addActivity={addActivity} />
              </TableCell>
              <TableCell />
              <TableCell />
            </DividerTableRow>
            <HourTotals
              targetTotal={totalTargetHours}
              calendarTotal={totalScheduledHours}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ActivityList;
