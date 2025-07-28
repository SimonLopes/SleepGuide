// Reexport the native module. On web, it will be resolved to SleepguidewidgetModule.web.ts
// and on native platforms to SleepguidewidgetModule.ts
export { default } from './src/SleepguidewidgetModule';
export { default as SleepguidewidgetView } from './src/SleepguidewidgetView';
export * from  './src/Sleepguidewidget.types';
