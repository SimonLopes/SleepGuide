import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Sleepguidewidget.types';

type SleepguidewidgetModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class SleepguidewidgetModule extends NativeModule<SleepguidewidgetModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(SleepguidewidgetModule, 'SleepguidewidgetModule');
