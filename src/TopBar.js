import { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Help from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  calendarIcon: {
    marginLeft: theme.spacing(2),
  },
}));

const TopBar = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography
          variant="h4"
          display="inline"
          align="left"
          className={classes.title}
        >
          Make Time
        </Typography>
        <IconButton edge="end" aria-label="help" onClick={() => setOpen(true)}>
          <Help fontSize="large" color="secondary" />
        </IconButton>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="help-text"
        >
          <DialogTitle id="help-text">How does this work?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This site is a tool for visualizing your weekly schedule based on
              time targets. It works best with mouse + keyboard.
              <br />
              <br />
              Add activities and hours targets to the Weekly Hours view. Then
              you can add and manpiulate time slots for each activity on the
              Schedule. The goal is for your scheduled time to add up to the
              target hours for each activity.
              <br />
              <br />
              Start by adding the activities you have to do, like sleep and
              work. Then experiment with adding time targets for things you want
              to do. For example, say you want to learn Spanish. Would 4 hours a
              week be feasible? Could you squeeze in 15 hours if you really had
              to?
              <br />
              <br />
              There are 168 hours in a week. How will you use them?
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
