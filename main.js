function generateTimeSlots(accountCount, intervalInMinutes) {
  const slotsPerHour = 60 / intervalInMinutes;
  const hoursInDay = 24;
  const slotsPerDay = slotsPerHour * hoursInDay;

  const timeSlots = [];

  for (let i = 0; i < accountCount; i++) {
    const slots = [];
    for (let j = 0; j < slotsPerDay; j++) {
      if (j % accountCount === i) {
        const startHour = Math.floor(j / slotsPerHour);
        const startMinute = (j % slotsPerHour) * intervalInMinutes;
        let endHour = Math.floor((j + 1) / slotsPerHour);
        let endMinute = ((j + 1) % slotsPerHour) * intervalInMinutes;

        // 减去一分钟
        if (endMinute === 0) {
          endMinute = 59;
          endHour--;
        } else {
          endMinute--;
        }

        const slot = `${padTime(startHour)}:${padTime(startMinute)}-${padTime(endHour)}:${padTime(endMinute)}`;
        slots.push(slot);
      }
    }
    timeSlots.push(slots.join(","));
  }

  return timeSlots;
}

function padTime(time) {
  return time < 10 ? `0${time}` : time.toString();
}