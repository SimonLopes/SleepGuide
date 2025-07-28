import ExpoModulesCore
import WidgetKit

public class SleepguidewidgetModule: Module {

  let group = "group.com.simon.SleepGuide"

  public func definition() -> ModuleDefinition {
    Name("Sleepguidewidget")

    AsyncFunction("setSleepWidgetData") { (wakeTime: String, sleepTime: String, mode: String) in
      if let userDefaults = UserDefaults(suiteName: group) {
        userDefaults.set(wakeTime, forKey: "wakeTime")
        userDefaults.set(sleepTime, forKey: "sleepTime")
        userDefaults.set(mode, forKey: "sleepMode")
        userDefaults.synchronize()
      }
        WidgetCenter.shared.reloadAllTimelines()

    }
  }
}
