import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Sleepguidewidget.types';

type SleepguidewidgetModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class SleepguidewidgetModule extends NativeModule<SleepguidewidgetModuleEvents> {
  
};

export default registerWebModule(SleepguidewidgetModule, 'SleepguidewidgetModule');
