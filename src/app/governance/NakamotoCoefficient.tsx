'use client';

import { governanceApiGateway } from '@/api/governance';
import { LineChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const NakamotoCoefficient = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetNakamotoCoefficient } = governanceApiGateway;
  const { isLoading, isError, data, error } = useGetNakamotoCoefficient({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Nakamoto Coefficient</div>
      <div className="flex flex-row flex-wrap justify-between gap-5 lg:flex-nowrap">
        <LineChartMetric
          title="Validators to Control Protocol"
          description="Number of validators needed to take over the network."
          color="primary"
          isLoading={isLoading}
          isError={isError}
          data={data?.metrics.validators_to_control_protocol.values}
          errorMessage={error?.message}
        />
        <LineChartMetric
          title="Voters to Control DAO"
          description="Number of voters needed to take over the network."
          color="secondary"
          isLoading={isLoading}
          isError={isError}
          data={data?.metrics.voters_to_control_DAO.values}
          errorMessage={error?.message}
        />
      </div>
    </div>
  );
};
