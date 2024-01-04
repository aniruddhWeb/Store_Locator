import { useCallback, useState } from 'react';

export const useBusinessPagination = () => {
  const [businessLimit, setBusinessLimit] = useState<number>(24);

  const setBusinessLimitFunc = useCallback((limit: number) => {
    setBusinessLimit(limit);
  }, []);

  const reset = useCallback(() => {
    setBusinessLimit(24);
  }, []);

  return {
    businessLimit,
    setNextBusinessLimit: setBusinessLimitFunc,
    reset,
  };
};
