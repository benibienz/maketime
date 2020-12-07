import { useState } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Fab,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  inputField: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}));

const AddActivityButton = ({ addActivity, names }) => {
  const [open, setOpen] = useState(false);
  const [newActivityText, setNewActivityText] = useState("");

  const classes = useStyles();

  let errorState = names.includes(newActivityText);

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity({
      name: newActivityText,
      targetHours: 0,
      events: [],
    });
    setNewActivityText("");
    setOpen(false);
  };

  return (
    <>
      <Fab
        variant="extended"
        size="medium"
        color="secondary"
        aria-label="add"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        new
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-new-activity"
      >
        <DialogTitle id="add-new-activity">Add new activity</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={1}
            >
              <Grid item>
                <TextField
                  autoFocus
                  className={classes.inputField}
                  variant="filled"
                  label="Activity"
                  placeholder="(e.g. Work)"
                  value={newActivityText}
                  error={errorState}
                  helperText={errorState && "This activity already exists"}
                  onChange={(e) => setNewActivityText(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={!newActivityText || errorState}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddActivityButton;
