import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Fab,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const AddActivityButton = ({ addActivity }) => {
  const [open, setOpen] = useState(false);
  const [newActivityText, setNewActivityText] = useState("");

  // TODO: validate no same names

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
        color="primary"
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
          <DialogContentText>
            Add something you have to do (e.g. work) or want to do (e.g. learn
            Spanish):
          </DialogContentText>
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
                  variant="filled"
                  label="New activity"
                  value={newActivityText}
                  onChange={(e) => setNewActivityText(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!newActivityText}
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
