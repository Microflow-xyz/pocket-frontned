'use client';

import { communityApiGateway } from '@/api/community';
import { LinearProgressMetric } from '@/components/metrics-charts';

export const QuarterlyERAAllocation = () => {
  const { useGetQuarterlyERAAllocation } = communityApiGateway;
  const { isLoading, isError, data, error } = useGetQuarterlyERAAllocation();

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">ERA Allocation</div>
      <div className="flex flex-row flex-wrap justify-between gap-5 lg:flex-nowrap">
        <LinearProgressMetric
          total={data?.metrics?.amount_of_budget_spent_vs_available?.total || 0}
          current={
            data?.metrics?.amount_of_budget_spent_vs_available?.current || 0
          }
          title="Quarterly ERA Allocation"
          description="Amount of budget spent vs available."
          isLoading={isLoading}
          isError={isError}
          errorMessage={error?.message}
        />
      </div>
    </div>
  );
};
