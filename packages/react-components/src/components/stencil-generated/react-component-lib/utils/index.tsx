import React from 'react';

import type { StyleReactProps } from '../interfaces';

export type StencilReactExternalProps<PropType, ElementType> = PropType &
  Omit<React.HTMLAttributes<ElementType>, 'style'> &
  StyleReactProps;

// This will be replaced with React.ForwardedRef when react-output-target is upgraded to React v17
export type StencilReactForwardedRef<T> = ((instance: T | null) => void) | React.MutableRefObject<T | null> | null;

export const setRef = (ref: StencilReactForwardedRef<any> | React.Ref<any> | undefined, value: any) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    // Cast as a MutableRef so we can assign current
    (ref as React.MutableRefObject<any>).current = value;
  }
};

export const mergeRefs = (
  ...refs: (StencilReactForwardedRef<any> | React.Ref<any> | undefined)[]
): React.RefCallback<any> => {
  return (value: any) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
};

export const createForwardRef = <PropType, ElementType>(ReactComponent: any, displayName: string) => {
  type ExtendedProps = StencilReactExternalProps<PropType, ElementType> & {
    forwardedRef?: React.ForwardedRef<ElementType>;
  };

  const ForwardedComponent = React.forwardRef<ElementType, StencilReactExternalProps<PropType, ElementType>>(
    (props, ref) => {
      return <ReactComponent {...(props as ExtendedProps)} forwardedRef={ref} />;
    }
  );

  ForwardedComponent.displayName = displayName;
  return ForwardedComponent;
};

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, customElement);
  }
};

export * from './attachProps';
export * from './case';
