import * as React from 'react';

import { SleepguidewidgetViewProps } from './Sleepguidewidget.types';

export default function SleepguidewidgetView(props: SleepguidewidgetViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
