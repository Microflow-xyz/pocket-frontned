'use client';

import { poktApiGateway } from '@/api/pokt';
import { LineChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const CoverageRatio = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetCoverageRatio } = poktApiGateway;
  const { isLoading, isError, data, error } = useGetCoverageRatio({
    timePeriod,
  });

  return (
    <LineChartMetric
      title="Coverage Ratio"
      color="secondary"
      description="Protocol revenue / token issuance"
      postfix="%"
      isLoading={isLoading}
      isError={isError}
      data={data?.metrics.coverage_ratio.values}
      percentDate={true}
      errorMessage={error?.message}
    />
  );
};
