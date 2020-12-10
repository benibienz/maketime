import {
  Container,
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { useState } from "react";
import ActivityList from "./activities/ActivityList";
import "./App.scss";
import generateColorList from "./colors";
import { generateSleepDefaults } from "./schedule/events";
import { Schedule, startDate } from "./schedule/Schedule";
import theme from "./theme";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.grey[300],
  },
  grid: {
    flexGrow: 1,
    margin: theme.spacing(3, 0),
  },
  activityList: {
    maxWidth: "50ch",
  },
  schedule: {
    maxWidth: "90ch",
  },
  copyright: {
    margin: theme.spacing(1),
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
  const [colorList, setColorList] = useState(generateColorList());

  const addActivity = (activity) => {
    activity = { ...activity, color: colorList[0] };
    setColorList((colorList) => colorList.slice(1));
    setActivities((activities) => [...activities, activity]);
  };

  const deleteActivity = (name) => {
    let deletedColor = activities.find((a) => a.name === name).color;
    setColorList((colorList) => [...colorList, deletedColor]);
    setActivities((activities) => activities.filter((a) => a.name !== name));
  };

  const setTargetHours = (name, val) =>
    setActivities((activities) =>
      activities.map((a) =>
        a.name === name ? { ...a, targetHours: parseInt(val) } : a
      )
    );

  return (
    <div className={classes.root}>
      <TopBar />
      <Container maxWidth="lg" className={classes.grid}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} lg={4} className={classes.activityList}>
            <ActivityList
              activities={activities}
              addActivity={addActivity}
              deleteActivity={deleteActivity}
              setTargetHours={setTargetHours}
            />
          </Grid>
          <Grid item xs={12} lg={8} className={classes.schedule}>
            <Schedule
              activities={activities}
              setActivities={setActivities}
              largeSize
            />
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" align="center" className={classes.copyright}>
        © 2020 Beni Bienz
      </Typography>
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout />
  </ThemeProvider>
);

export default App;
