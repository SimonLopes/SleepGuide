import { requireNativeView } from 'expo';
import * as React from 'react';

import { SleepguidewidgetViewProps } from './Sleepguidewidget.types';

const NativeView: React.ComponentType<SleepguidewidgetViewProps> =
  requireNativeView('Sleepguidewidget');

export default function SleepguidewidgetView(props: SleepguidewidgetViewProps) {
  return <NativeView {...props} />;
}
