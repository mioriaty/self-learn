import { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function getDisplayNameHOC<P extends object>(WrappedComponent: ComponentType<P>) {
  return (WrappedComponent.displayName ?? WrappedComponent.name) || 'Component';
}
