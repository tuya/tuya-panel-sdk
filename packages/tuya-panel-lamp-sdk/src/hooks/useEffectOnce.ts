import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useEffectOnce(effect: EffectCallback) {
  useEffect(effect, []);
}

export default useEffectOnce;
