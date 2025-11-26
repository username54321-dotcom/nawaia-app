declare module 'react-native-web-refresh-control' {
  import { RefreshControlProps } from 'react-native';
  import { Component } from 'react';

  // This tells TS that the component works like the native RefreshControl
  export class RefreshControl extends Component<RefreshControlProps> {}

  // This defines the patch function
  export function patchFlatListProps(): void;
}
