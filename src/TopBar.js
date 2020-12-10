import {
  AppBar,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Help, Info, Keyboard, Mouse, Schedule } from "@material-ui/icons";
import { useState } from "react";

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

  const renderDialog = (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="help-text"
    >
      <DialogTitle id="help-text">How does this work?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This site is a tool for visualizing your weekly schedule based on time
          targets.
        </DialogContentText>
        <List>
          <ListItem>
            <ListItemIcon>
              <Info color="secondary" />
            </ListItemIcon>
            <Typography variant="body1">Mouse + keyboard required</Typography>
          </ListItem>
        </List>
        <Divider />
        <br />
        <DialogContentText>
          Add activities and hours targets to the Weekly Hours view. Then you
          can add and manpiulate time slots for each activity on the Schedule:
        </DialogContentText>
        <List>
          <ListItem>
            <ListItemIcon>
              <Mouse color="secondary" />
            </ListItemIcon>
            <Typography variant="body1">
              Click and drag a time slot to create new event
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Keyboard color="secondary" />
            </ListItemIcon>
            <Typography variant="body1">
              Press ⌦ or ⟵ to delete selected event
            </Typography>
          </ListItem>
        </List>
        <DialogContentText>
          The goal is for your scheduled time to add up to the target hours for
          each activity.
        </DialogContentText>
        <Divider />
        <br />
        <DialogContentText>
          Start by adding the activities you have to do (e.g. sleep, work). Then
          experiment with adding time targets for things you want to do. For
          example, say you want to learn Spanish. Would 4 hours a week be
          feasible? Could you squeeze in 15 hours if you really had to?
        </DialogContentText>
        <List>
          <ListItem>
            <ListItemIcon>
              <Schedule color="secondary" />
            </ListItemIcon>
            <Typography variant="body1">
              There are 168 hours in a week. How will you use them?
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h4"
            display="inline"
            align="left"
            className={classes.title}
          >
            Make Time
          </Typography>
          <IconButton
            edge="end"
            aria-label="help"
            onClick={() => setOpen(true)}
          >
            <Help fontSize="large" color="secondary" />
          </IconButton>
        </Toolbar>
      </Container>
      {renderDialog}
    </AppBar>
  );
};

export default TopBar;
