'use client';

import Link from 'next/link';

import { governanceApiGateway } from '@/api/governance';
import { MultiAreaChartMetric } from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';
import {
  AreaChartMetricsResponse,
  StackedBarChartMetricsResponse,
} from '@/utils/types';

export const DaoGovernance = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetDAOGovernance } = governanceApiGateway;
  const { isLoading, isError, data, error } = useGetDAOGovernance({
    timePeriod,
  });

  const mergeApiResponses = (
    response1: { value: AreaChartMetricsResponse; name: string },
    response2: { value: AreaChartMetricsResponse; name: string },
  ): StackedBarChartMetricsResponse => {
    const namedRes1 = response1.value.values.map((val) => ({
      ...val,
      name: response1.name,
    }));

    const namedRes2 = response2.value.values.map((val) => ({
      ...val,
      name: response2.name,
    }));

    // Combine values from both responses
    const combinedValues = namedRes1.concat(namedRes2);

    const sortedValues = combinedValues.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Group values by date
    const groupedByDate: Record<string, { name: string; value: number }[]> = {};

    sortedValues.forEach((item) => {
      if (!groupedByDate[item.date]) {
        groupedByDate[item.date] = [];
      }

      groupedByDate[item.date].push({ name: item.name, value: item.value });
    });

    // Transform grouped data to the desired structure
    const mergedResponse: StackedBarChartMetricsResponse = {
      values: Object.keys(groupedByDate).map((date) => ({
        date,
        values: groupedByDate[date],
      })),
    };

    return mergedResponse;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">DAO Governance</div>

      <MultiAreaChartMetric
        prefix="$"
        title="DAO Treasury"
        description={
          <span>
            Governance Asset Values closer to the total treasury are indicative
            of a healthier DAO.{' '}
            <Link
              className="text-primary"
              href="https://mirror.xyz/0x2462fF59E08d60ED5bD737caAa667F5Fe435C358/fM1vWMkSMRwQWidP_wZ4X30mpWHUdSDFITeAxUcZbbA"
              target="_blank"
            >
              Read More.
            </Link>
          </span>
        }
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        multiple={true}
        data={
          mergeApiResponses(
            {
              value: data?.metrics.DAO_governance_asset_value || {
                values: [],
              },
              name: 'DAO Governance Asset Value',
            },
            {
              value: data?.metrics.DAO_treasury || { values: [] },
              name: 'Value ($) of DAO Treasury',
            },
          ).values
        }
      />
    </div>
  );
};
