import { formatHoursDecimalToHHMM } from "src/utils/time";

export interface TimeData {
  durationHours: number;
  time: string;
}

export interface CalculateTimesData {
  cycles: TimeData[];
  idealTime: TimeData;
}

function formatDateToHHMM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function calculateSleepTimes(wakeTime: string): CalculateTimesData {
  const SLEEP_CYCLE_MINUTES = 90;
  const IDEAL_SLEEP_HOURS = 8;

  const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number);

  const now = new Date();
  let wakeDate = new Date();
  wakeDate.setHours(wakeHour, wakeMinute, 0, 0);

  if (wakeDate <= now) {
    wakeDate.setDate(wakeDate.getDate() + 1);
  }

  const sleepCycles: TimeData[] = [];

  for (let cycles = 6; cycles >= 3; cycles--) {
    const totalMinutes = cycles * SLEEP_CYCLE_MINUTES;
    const sleepTime = new Date(wakeDate.getTime() - totalMinutes * 60 * 1000);

    if (sleepTime > now) {
      const hoursDecimal = sleepTime.getHours() + sleepTime.getMinutes() / 60;
      sleepCycles.push({
        time: formatHoursDecimalToHHMM(hoursDecimal),
        durationHours: cycles * 1.5,
      });
    }
  }

  const idealSleepDate = new Date(wakeDate.getTime() - IDEAL_SLEEP_HOURS * 60 * 60 * 1000);
  const idealDecimal = idealSleepDate.getHours() + idealSleepDate.getMinutes() / 60;

  return {
    cycles: sleepCycles.length > 0 ? sleepCycles : [{
      time: formatHoursDecimalToHHMM(now.getHours() + now.getMinutes() / 60),
      durationHours: 0
    }],
    idealTime: {
      time: formatHoursDecimalToHHMM(idealDecimal),
      durationHours: IDEAL_SLEEP_HOURS,
    },
  };
}

function calculateWakeTimes(sleepTime: string): CalculateTimesData {
  const SLEEP_CYCLE_MINUTES = 90;
  const IDEAL_SLEEP_HOURS = 8;

  const [sleepHour, sleepMinute] = sleepTime.split(":").map(Number);
  const sleepDate = new Date();
  sleepDate.setHours(sleepHour, sleepMinute, 0, 0);
  
  const cycles: TimeData[] = [];

  for (let i = 1; i <= 8; i++) {
    const totalMinutes = i * SLEEP_CYCLE_MINUTES;
    const wakeDate = new Date(sleepDate.getTime() + totalMinutes * 60000);
    
    cycles.push({
      durationHours: parseFloat((totalMinutes / 60).toFixed(2)),
      time: formatDateToHHMM(wakeDate),
    });
  }

  const idealWakeDate = new Date(sleepDate.getTime() + IDEAL_SLEEP_HOURS * 60 * 60000);

  return {
    cycles,
    idealTime: {
      durationHours: IDEAL_SLEEP_HOURS,
      time: formatDateToHHMM(idealWakeDate),
    },
  };
}

export function useSleepCalculator({
  mode,
  wakeUpTime,
  sleepTime,
}: {
  mode: "wake" | "sleep";
  wakeUpTime: string;
  sleepTime: string;
}): CalculateTimesData {
  if (mode === "wake") {
    return calculateSleepTimes(wakeUpTime);
  } else {
    return calculateWakeTimes(sleepTime);
  }
}
