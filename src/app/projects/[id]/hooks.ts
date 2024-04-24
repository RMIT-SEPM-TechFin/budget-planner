import { StringParam, useQueryParam } from 'use-query-params';

export const usePlanIdQueryParam = () => {
  const [planId, setPlanId] = useQueryParam('planId', StringParam);

  return { planId, setPlanId };
};
