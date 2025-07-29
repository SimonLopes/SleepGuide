import { NativeModule, requireNativeModule } from 'expo';

import { SleepguidewidgetModuleEvents } from './Sleepguidewidget.types';

declare class SleepguidewidgetModule extends NativeModule<SleepguidewidgetModuleEvents> {
  setSleepWidgetData(): {wakeTime: String, sleepTime: String, mode: String}
}

// This call loads the native module object from the JSI.
export default requireNativeModule<SleepguidewidgetModule>('Sleepguidewidget');
