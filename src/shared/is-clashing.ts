import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

type Slot = {
  time: string;
  durationMinutes: number;
};

function getEndTime(start: string, durationMins: number) {
  const dummyDate = "2012-01-01";
  return dayjs(`${dummyDate} ${start}`, "YYYY-MM-DD HH:mm:ss")
    .add(durationMins, "minutes")
    .format("HH:mm:ss");
}

function isTimeBetween(time: string, startTime: string, durationMins: number) {
  const dummyDate = "2012-01-01";

  return dayjs(`${dummyDate} ${time}`, "YYYY-MM-DD HH:mm:ss").isBetween(
    `${dummyDate} ${startTime}`,
    `${dummyDate} ${getEndTime(startTime, durationMins)}`,
    "minutes"
  );
}

function isSlotClashing(newSlot: Slot, existingSlots: Slot) {
  const isSameSlot = newSlot.time === existingSlots.time;

  if (isSameSlot) {
    return true;
  }

  const isNewSlotIntersectingOldSlot =
    isTimeBetween(
      newSlot.time,
      existingSlots.time,
      existingSlots.durationMinutes
    ) ||
    isTimeBetween(
      getEndTime(newSlot.time, newSlot.durationMinutes),
      existingSlots.time,
      existingSlots.durationMinutes
    );

  if (isNewSlotIntersectingOldSlot) {
    return true;
  }

  const isNewSlotEnclosingOldSlot =
    isTimeBetween(existingSlots.time, newSlot.time, newSlot.durationMinutes) &&
    isTimeBetween(
      getEndTime(existingSlots.time, existingSlots.durationMinutes),
      newSlot.time,
      newSlot.durationMinutes
    );

  return isNewSlotEnclosingOldSlot;
}

export function isClashing(newSlot: Slot, existingSlots: Slot[]) {
  return existingSlots.some((slot) => isSlotClashing(newSlot, slot));
}
