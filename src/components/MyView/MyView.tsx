import { ElementType, ComponentPropsWithoutRef, ComponentPropsWithRef, PropsWithChildren, forwardRef, ReactElement } from 'react';

type ColorName = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

interface TagNameProp<C extends ElementType> {
  tagName?: C;
}

type PropsToOmit<C extends ElementType, P> = keyof (TagNameProp<C> & P);

type PolymorphicComponentProp<C extends ElementType, Props extends unknown> = PropsWithChildren<Props & TagNameProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

//  type with ref
type PolymorphicComponentPropWithRef<C extends ElementType, Props extends unknown> = PolymorphicComponentProp<C, Props> & { ref?: ViewRef<C> };

// This is the type for the "ref" only
type ViewRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type ViewProps<C extends ElementType> = PolymorphicComponentPropWithRef<C, { color?: ColorName | 'black' }>;

/**
 * This is the type used in the type annotation for the component
 */
type ViewComponent = <C extends ElementType = 'div'>(props: ViewProps<C>) => ReactElement | null;

export const MyView: ViewComponent = forwardRef(
  <C extends ElementType = 'div'>({ tagName, color, children, ...rest }: ViewProps<C>, ref?: ViewRef<C>) => {
    const Component = tagName || 'div';

    const style = { ...rest.style, color };

    return (
      <Component {...rest} style={style} ref={ref}>
        {children}
      </Component>
    );
  },
);
