'use client';

import { communityApiGateway } from '@/api/community';
import { LineChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const Awareness = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetAwareness } = communityApiGateway;
  const { isLoading, isError, data, error } = useGetAwareness({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Awareness</div>
      <LineChartMetric
        title="Twitter Followers"
        color="primary"
        isLoading={isLoading}
        isError={isError}
        data={data?.metrics.twitter_followers.values}
        errorMessage={error?.message}
      />
    </div>
  );
};
