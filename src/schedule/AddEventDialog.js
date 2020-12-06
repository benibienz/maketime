import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const AddEventDialog = ({ items, onSelect, open }) => {
  return (
    <Dialog
      onClose={() => onSelect("")}
      aria-labelledby="add-new-event"
      open={open}
    >
      <DialogTitle id="add-new-event">Choose activity</DialogTitle>
      <List>
        {items.map((item) => (
          <ListItem autoFocus button onClick={() => onSelect(item)} key={item}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default AddEventDialog;
