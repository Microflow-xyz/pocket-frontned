'use client';

import { poktApiGateway } from '@/api/pokt';
import { LineChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const Liquidity = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetLiquidity } = poktApiGateway;
  const { isLoading, isError, data, error } = useGetLiquidity({ timePeriod });

  return (
    <LineChartMetric
      title="POKT Liquidity: @2% depth"
      description="How much POKT can you sell on an exchange without moving the price?"
      color="primary"
      isLoading={isLoading}
      isError={isError}
      data={data?.metrics.POKT_liquidity.values}
      errorMessage={error?.message}
    />
  );
};
