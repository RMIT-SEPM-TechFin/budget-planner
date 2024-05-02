import { useState } from 'react';

// This is a new hook for local state management
export const usePlanIdLocal = () => {
  const [planId, setPlanId] = useState<string | undefined>(undefined);

  return { planId, setPlanId };
};
