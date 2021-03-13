const generateSleepDefaults = (startDate) => {
  let eventArray = [];

  for (let day = 0; day < 7; day++) {
    let eventStart = new Date(startDate);
    eventStart.setDate(startDate.getDate() + day);
    eventStart.setHours(0, 0, 0, 0);
    let eventEnd = new Date(eventStart.getTime() + 8 * 60 * 60 * 1000);

    eventArray.push({
      id: day,
      title: "Sleep",
      start: eventStart,
      end: eventEnd,
    });
  }
  return eventArray;
};

const sumHours = (eventsArray) =>
  eventsArray.reduce(
    // round to nearest 30 mins
    (a, b) => a + Math.round((b.end - b.start) / 1000 / 60 / 30) / 2,
    0
  );

export { generateSleepDefaults, sumHours };
