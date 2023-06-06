import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';

interface ContentProps {
  content?: { [name: string]: unknown };
}

export function withContent<T>(BaseComponent: ComponentType<ComponentProps<T>>): ComponentType<ComponentProps<T>> {
  return function wrapper({ content = {}, ...props }: ComponentProps<T & ContentProps>) {
    const concatProps = (() => {
      // Check the presence of attached data
      if (typeof content !== 'object') {
        return { content, ...props }; // If the content is a formed and simple data type
      } else {
        // If there is a need to get data inside the content object to the level above
        return Array.isArray(content) ? { ...(content[0] || {}), ...props } : { ...(content || {}), ...props };
      }
    })() as ComponentProps<T>;
    return <BaseComponent {...concatProps} />;
  };
}
