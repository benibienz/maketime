import {
  Grid,
  makeStyles,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { EventAvailable } from "@material-ui/icons";
import { useState } from "react";
import ActivityList from "./activities/ActivityList";
import "./App.scss";
import { Schedule, startDate } from "./schedule/Schedule";
import { generateSleepDefaults } from "./schedule/events";
import generateColorList from "./colors";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  typography: {
    body1: {
      fontSize: "1.1rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: theme.palette.grey[300],
  },
  grid: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    marginLeft: theme.spacing(2),
  },
}));

const defaultActivities = [
  {
    name: "Sleep",
    targetHours: 56,
    events: generateSleepDefaults(startDate),
    color: grey,
  },
];

const Layout = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState(defaultActivities);
  const [colors, setColors] = useState(generateColorList());

  const addActivity = (activity) => {
    activity = { ...activity, color: colors[0] };
    setColors((colors) => colors.slice(1));
    setActivities((activities) => [...activities, activity]);
  };

  const deleteActivity = (name) => {
    let deletedColor = activities.find((a) => a.name === name).color;
    setColors((colors) => [...colors, deletedColor]);
    setActivities((activities) => activities.filter((a) => a.name !== name));
  };

  const setTargetHours = (name, val) =>
    setActivities((activities) =>
      activities.map((a) =>
        a.name === name ? { ...a, targetHours: parseInt(val) } : a
      )
    );

  console.log(`Activities:`);
  console.log(activities[0].events);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Typography
            variant="h3"
            display="inline"
            align="center"
            style={{ color: "white" }}
          >
            Make Time
          </Typography>
          <EventAvailable
            color="secondary"
            fontSize="large"
            className={classes.icon}
          />
        </Grid>
      </div>
      <div className={classes.grid}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
            <ActivityList
              activities={activities}
              addActivity={addActivity}
              deleteActivity={deleteActivity}
              setTargetHours={setTargetHours}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={7} xl={7}>
            <Schedule
              activities={activities}
              setActivities={setActivities}
              largeSize
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              © 2020 Benjamin Bienz
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout />
  </ThemeProvider>
);

export default App;
