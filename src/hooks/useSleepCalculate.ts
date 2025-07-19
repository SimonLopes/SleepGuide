import { useMemo } from "react";
import dayjs from "dayjs";

export interface SleepRecommendation {
  time: string;
  durationHours: number;
}

interface SleepData {
  idealTime: string;
  recommendations: SleepRecommendation[];
}
interface TimeInput {
  hour: number;
  minute: number;
}

type RecommendationMode = "sleep" | "wake";

export function useSleepCalculator({
  wakeUpTime,
  sleepTime,
  mode,
}: {
  wakeUpTime: TimeInput;
  sleepTime: TimeInput;
  mode: RecommendationMode;
}): SleepData {
  const SLEEP_CYCLE_MINUTES = 90;
  const IDEAL_SLEEP_HOURS = 7;
  const MIN_SLEEP_HOURS = 6;

  const calculate = useMemo(() => {
    const buildDayjsFromTime = ({ hour, minute }: TimeInput) =>
      dayjs().hour(hour).minute(minute).second(0).millisecond(0);

    if (mode === "wake") {
      let wake = buildDayjsFromTime(wakeUpTime);
      const now = dayjs();
      if (wake.isBefore(now)) {
        wake = wake.add(1, "day");
      }

      const recommendations: SleepRecommendation[] = [];

      for (let cycles = 3; cycles <= 8; cycles++) {
        const totalSleepMinutes = cycles * SLEEP_CYCLE_MINUTES;
        const recommendedTime = wake.subtract(totalSleepMinutes, "minute");
        if (recommendedTime.isAfter(now)) {
          recommendations.push({
            time: recommendedTime.format("HH:mm"),
            durationHours: +(wake.diff(recommendedTime, "minute") / 60).toFixed(
              1
            ),
          });
        }
      }

      const ideal = recommendations.at(-4);

      return {
        idealTime: ideal?.time || "",
        recommendations: recommendations.reverse(),
      };
    }

    if (mode === "sleep") {
      const sleep = buildDayjsFromTime(sleepTime);
      const recommendations: SleepRecommendation[] = [];

      for (let cycles = 4; cycles <= 9; cycles++) {
        const totalSleepMinutes = cycles * SLEEP_CYCLE_MINUTES;
        const recommendedTime = sleep.add(totalSleepMinutes, "minute");
        recommendations.push({
          time: recommendedTime.format("HH:mm"),
          durationHours: +(recommendedTime.diff(sleep, "minute") / 60).toFixed(
            1
          ),
        });
      }

      const ideal = recommendations.find(
        (r) => Math.abs(r.durationHours - IDEAL_SLEEP_HOURS) <= 0.5
      );

      return {
        idealTime: ideal?.time || "",
        recommendations,
      };
    }

    return {
      idealTime: "",
      recommendations: [],
    };
  }, [wakeUpTime, sleepTime, mode]);

  return calculate;
}
