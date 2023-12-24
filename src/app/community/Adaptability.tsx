'use client';

import { communityApiGateway } from '@/api/community';
import { MultiAreaChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const Adaptability = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetAdaptability } = communityApiGateway;
  const { isLoading, isError, data, error } = useGetAdaptability({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Adaptability</div>
      <MultiAreaChartMetric
        title="Velocity of Experiments"
        description="We’re looking for more Sockets opening than proposals, showing an engaged community."
        multiple
        isLoading={isLoading}
        isError={isError}
        data={
          data?.metrics.velocity_of_experiments_v_no_debated_proposals.values
        }
        errorMessage={error?.message}
      />
    </div>
  );
};
