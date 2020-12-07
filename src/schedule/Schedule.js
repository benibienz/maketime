import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Card } from "../components";
import { useState, useEffect } from "react";
import AddEventDialog from "./AddEventDialog";
import { Height, VerticalAlignCenter } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useToggle } from "react-use";

const DnDCalendar = withDragAndDrop(Calendar);

// Set Monday as first day of week
moment.updateLocale("en", { week: { dow: 1 } });

// Set the calendar to start next Monday
// From https://stackoverflow.com/a/33078648 and https://stackoverflow.com/a/3894087
const startDate = new Date();
startDate.setDate(startDate.getDate() + ((7 - startDate.getDay()) % 7) + 1);
startDate.setHours(0, 0, 0, 0);

const Schedule = ({ activities, setActivities }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [largeSize, toggleSize] = useToggle(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [selectedEvent, setSelectedEvent] = useState();
  // There are 7 default events already so the first ID is 7
  const [currentEventId, setCurrentEventId] = useState(7);

  const addEvent = (event) =>
    setActivities((activities) =>
      activities.map((a) =>
        a.name === event.title ? { ...a, events: [...a.events, event] } : a
      )
    );

  const deleteEvent = (event) =>
    setActivities((activities) =>
      activities.map((a) =>
        a.name === event.title
          ? { ...a, events: a.events.filter((ev) => ev.id !== event.id) }
          : a
      )
    );

  // Click handlers
  const handleSelectActivityFromDialog = (selected) => {
    setOpenDialog(false);
    if (selected) {
      let newEvent = { id: currentEventId, title: selected, ...selectedSlot };
      addEvent(newEvent);
      setCurrentEventId((id) => id + 1);
      setSelectedEvent(newEvent);
    } else {
      setSelectedSlot({});
    }
  };

  const handleSelectSlot = ({ start, end, action }) => {
    setSelectedEvent(null);
    if (action === "select") {
      setOpenDialog(true);
      setSelectedSlot({ start: start, end: end });
    }
  };

  const handleSelectEvent = (event) => setSelectedEvent(event);
  const handleClickOutsideContainer = () => setSelectedEvent(null);

  // Add event listener for keyboard
  // Adapted from https://stackoverflow.com/a/46123962

  useEffect(() => {
    const handleDeleteKeyPress = (e) => {
      // Keycodes for backspace and delete keys
      if ((e.keyCode === 8 || e.keyCode === 46) && selectedEvent) {
        deleteEvent(selectedEvent);
        setSelectedEvent(null);
      }
    };

    document.addEventListener("keydown", handleDeleteKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  let events = activities.map((a) => a.events).flat();

  // DnD operations
  const handleMoveOrResizeEvent = ({ event, start, end }) => {
    let startDay = start.getDate();
    let endDay = end.getDate();

    // Cut just before midnight if overlapping end of day
    if (startDay !== endDay) {
      end.setDate(startDay);
      end.setHours(23);
      end.setMinutes(59);
    }

    //  Reset if overlapping with other event
    let sameDayEvents = events.filter(
      (e) => e.start.getDate() === startDay && e.id !== event.id
    );
    sameDayEvents.forEach((ev) => {
      if (start < ev.end && end > ev.start) {
        start = event.start;
        end = event.end;
      }
    });

    // this looks complex but it's just accessing the right event in the nested state
    setActivities((activities) =>
      activities.map((a) =>
        a.name === event.title
          ? {
              ...a,
              events: a.events.map((ev) =>
                ev.id === event.id ? { ...ev, start, end } : ev
              ),
            }
          : a
      )
    );
  };

  const expandIcon = (
    <IconButton arie-label="toggle-calendar-height" onClick={toggleSize}>
      {largeSize ? (
        <VerticalAlignCenter color="secondary" />
      ) : (
        <Height color="secondary" />
      )}
    </IconButton>
  );

  return (
    <ClickAwayListener onClickAway={handleClickOutsideContainer}>
      <div>
        <Card title="Schedule" icon={expandIcon}>
          <DnDCalendar
            events={events}
            // Formatting
            views={["week"]}
            defaultView="week"
            step={largeSize ? 30 : 60}
            defaultDate={startDate}
            localizer={momentLocalizer(moment)}
            toolbar={false}
            eventPropGetter={(event, start, end, isSelected) => {
              let activityColor = activities.find((a) => a.name === event.title)
                .color;
              if (isSelected) {
                return { style: { background: activityColor[600] } };
              } else {
                return { style: { background: activityColor[800] } };
              }
            }}
            formats={{ dayFormat: "ddd", timeGutterFormat: "H:mm" }}
            // Mouse clicks
            selected={selectedEvent}
            selectable="ignoreEvents"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            // Drag n Drop
            onEventDrop={handleMoveOrResizeEvent}
            onEventResize={handleMoveOrResizeEvent}
          />
          <AddEventDialog
            items={activities.map((a) => a.name)}
            onSelect={handleSelectActivityFromDialog}
            open={openDialog}
          />
        </Card>
      </div>
    </ClickAwayListener>
  );
};

export { Schedule, startDate };
