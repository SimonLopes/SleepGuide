import WidgetKit
import SwiftUI
import AppIntents

let sharedUserDefaultsKey = "storedNumber"
let appGroup = "group.com.simon.SleepGuide"

struct TimeData: Identifiable {
    let id = UUID()
    let durationHours: Double
    let time: String
}

struct CalculateTimesData {
    let cycles: [TimeData]
    let idealTime: TimeData
}

func formatDateToHHMM(_ date: Date) -> String {
    let formatter = DateFormatter()
    formatter.dateFormat = "HH:mm"
    formatter.timeZone = .current
    return formatter.string(from: date)
}

func parseTimeString(_ time: String) -> DateComponents? {
    let parts = time.split(separator: ":").compactMap { Int($0) }
    guard parts.count == 2 else { return nil }
    return DateComponents(hour: parts[0], minute: parts[1])
}

func calculateSleepTimes(wakeTime: String) -> CalculateTimesData? {
    let SLEEP_CYCLE_MINUTES = 90
    let IDEAL_SLEEP_HOURS = 8.0

    guard let wakeComponents = parseTimeString(wakeTime) else { return nil }

    let calendar = Calendar.current
    let now = Date()

    var wakeDate = calendar.date(
        bySettingHour: wakeComponents.hour ?? 0,
        minute: wakeComponents.minute ?? 0,
        second: 0,
        of: now
    )!

    if wakeDate <= now {
        wakeDate = calendar.date(byAdding: .day, value: 1, to: wakeDate)!
    }

    var sleepCycles: [TimeData] = []

    for cycles in stride(from: 6, through: 3, by: -1) {
        let totalMinutes = cycles * SLEEP_CYCLE_MINUTES
        if let sleepTime = calendar.date(byAdding: .minute, value: -totalMinutes, to: wakeDate),
           sleepTime > now {
            let durationHours = Double(totalMinutes) / 60.0
            sleepCycles.append(TimeData(durationHours: durationHours, time: formatDateToHHMM(sleepTime)))
        }
    }

    if sleepCycles.isEmpty {
        sleepCycles.append(TimeData(durationHours: 0, time: formatDateToHHMM(now)))
    }

    let idealSleepDate = calendar.date(byAdding: .hour, value: Int(-IDEAL_SLEEP_HOURS), to: wakeDate)!
    let idealTimeString = formatDateToHHMM(idealSleepDate)

    return CalculateTimesData(
        cycles: sleepCycles,
        idealTime: TimeData(durationHours: IDEAL_SLEEP_HOURS, time: idealTimeString)
    )
}

func calculateWakeTimes(sleepTime: String) -> CalculateTimesData? {
    let SLEEP_CYCLE_MINUTES = 90
    let IDEAL_SLEEP_HOURS = 8.0

    guard let sleepComponents = parseTimeString(sleepTime) else { return nil }

    let calendar = Calendar.current
    let now = Date()

    var sleepDate = calendar.date(
        bySettingHour: sleepComponents.hour ?? 0,
        minute: sleepComponents.minute ?? 0,
        second: 0,
        of: now
    )!

    if sleepDate <= now {
        sleepDate = calendar.date(byAdding: .day, value: 1, to: sleepDate)!
    }

    var wakeCycles: [TimeData] = []

    for i in 1...4 {
        if let wakeDate = calendar.date(byAdding: .minute, value: i * SLEEP_CYCLE_MINUTES, to: sleepDate) {
            let durationHours = Double(i * SLEEP_CYCLE_MINUTES) / 60.0
            wakeCycles.append(TimeData(durationHours: durationHours, time: formatDateToHHMM(wakeDate)))
        }
    }

    let idealWakeDate = calendar.date(byAdding: .hour, value: Int(IDEAL_SLEEP_HOURS), to: sleepDate)!
    let idealTimeString = formatDateToHHMM(idealWakeDate)

    return CalculateTimesData(
        cycles: wakeCycles,
        idealTime: TimeData(durationHours: IDEAL_SLEEP_HOURS, time: idealTimeString)
    )
}

enum SleepMode: String {
    case wake
    case sleep
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let wakeTime: String
    let sleepTime: String
    let mode: SleepMode
    let timesData: CalculateTimesData
}



struct Provider: AppIntentTimelineProvider {
  func nextUpdateTime(from date: Date = Date(), updateIntervalMinutes: Int = 5) -> Date {
      let calendar = Calendar.current
      let minute = calendar.component(.minute, from: date)
      let remainder = minute % updateIntervalMinutes
      let minutesToAdd = remainder == 0 ? updateIntervalMinutes : (updateIntervalMinutes - remainder)
      let nextDate = calendar.date(bySetting: .second, value: 0, of: date)!
      return calendar.date(byAdding: .minute, value: minutesToAdd, to: nextDate)!
  }

  
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(),
                    wakeTime: "07:00",
                    sleepTime: "23:00",
                    mode: .wake,
                    timesData: calculateSleepTimes(wakeTime: "07:00")!)
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        let data = getData()
        let mode = SleepMode(rawValue: data.mode) ?? .wake
        let timesData = mode == .wake ? calculateSleepTimes(wakeTime: data.wake) : calculateWakeTimes(sleepTime: data.sleep)
        return SimpleEntry(date: Date(), wakeTime: data.wake, sleepTime: data.sleep, mode: mode, timesData: timesData ?? calculateSleepTimes(wakeTime: "07:00")!)
    }

  func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
      let data = getData()
      let mode = SleepMode(rawValue: data.mode) ?? .wake
      let timesData = mode == .wake ? calculateSleepTimes(wakeTime: data.wake) : calculateWakeTimes(sleepTime: data.sleep)
      let entry = SimpleEntry(date: Date(), wakeTime: data.wake, sleepTime: data.sleep, mode: mode, timesData: timesData ?? calculateSleepTimes(wakeTime: "07:00")!)

      let updateIntervalMinutes = 1
      let nextUpdate = nextUpdateTime(updateIntervalMinutes: updateIntervalMinutes)

      return Timeline(entries: [entry], policy: .after(nextUpdate))
  }



    private func getData() -> (wake: String, sleep: String, mode: String) {
        let defaults = UserDefaults(suiteName: appGroup)
        let wake = defaults?.string(forKey: "wakeTime") ?? "07:00"
        let sleep = defaults?.string(forKey: "sleepTime") ?? "23:00"
        let mode = defaults?.string(forKey: "sleepMode") ?? "wake"
      
        return (wake, sleep, mode)
    }
}

struct SleepGuideWidgetEntryView : View {
    var entry: SimpleEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(entry.mode == .sleep ? "😴 Dormindo às:" : "⏰ Para acordar às:")
                .font(.caption)
                .foregroundColor(.secondary)
            Text(entry.mode == .sleep ? entry.sleepTime : entry.wakeTime)
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(.primary)

            Text(entry.mode == .sleep ? "⏰ Ideal acordar às:" : "😴 Ideal dormir às:")
                .font(.caption2)
                .foregroundColor(.secondary)
                .padding(.top, 8)
            HStack(spacing: 6) {
              Text("\(entry.timesData.idealTime.time)")
                .font(.system(size: 18, weight: .bold))
                .foregroundColor(.primary)
            }
          Text(entry.mode == .sleep ? "⏰ Proximos horarios para acordar:" : "😴 Proximos horarios para dormir:")
              .font(.caption2)
              .foregroundColor(.secondary)
              .padding(.top, 8)

          HStack(spacing: 4) {
            ForEach(entry.timesData.cycles) { timeData in
              Text(timeData.time)
                .font(.system(size: 10, weight: .light))
                                    .foregroundColor(.primary)
                            }
              
          }
        }
    }
}

struct SleepGuideWidget: Widget {
    let kind: String = "SleepGuideWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            SleepGuideWidgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
    }
}
