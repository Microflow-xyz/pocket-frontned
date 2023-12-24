'use client';

import { communityApiGateway } from '@/api/community';
import { LineChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const Transparency = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetTransparency } = communityApiGateway;
  const { isLoading, isError, data, error } = useGetTransparency({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Transparency</div>
      <div className="flex flex-row flex-wrap justify-between gap-5 lg:flex-nowrap">
        <LineChartMetric
          title="Open Source Projects"
          description="Any project working through a Socket or POP, updated monthly."
          color="primary"
          isLoading={isLoading}
          isError={isError}
          data={data?.metrics.projects_working_in_the_open.values}
          errorMessage={error?.message}
          xAxisLabelFormat="yy/MM"
        />
        <LineChartMetric
          title="Percentage of Open Projects Self-Reporting"
          description="Any Socket or POP reporting at the end of the month, updated monthly."
          color="secondary"
          disabledTimePeriodText="Last month"
          postfix="%"
          percentDate={true}
          isLoading={isLoading}
          isError={isError}
          data={data?.metrics.percentage_of_projects_self_reporting.values}
          errorMessage={error?.message}
        />
      </div>
    </div>
  );
};
