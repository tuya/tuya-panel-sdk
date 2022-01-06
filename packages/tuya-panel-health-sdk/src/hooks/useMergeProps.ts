import { useMemo } from 'react';

export default function useMergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>
): PropsType {
  const props = useMemo(() => {
    const mProps = { ...componentProps };

    // eslint-disable-next-line no-restricted-syntax
    for (const propName in defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = defaultProps[propName];
      }
    }

    return mProps;
  }, [componentProps, defaultProps]);

  return props;
}
