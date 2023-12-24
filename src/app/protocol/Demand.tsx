'use client';

import Link from 'next/link';

import { protocolApiGateway } from '@/api/protocol';
import {
  LineChartMetric,
  StackedBarCharMetric,
} from '@/components/metrics-charts';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';

export const Demand = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetDemand } = protocolApiGateway;
  const { isLoading, isError, data, error } = useGetDemand({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Demand</div>
      <LineChartMetric
        title="Protocol Revenue"
        description="Burn x Token Price."
        prefix="$"
        color="primary"
        isLoading={isLoading}
        isError={isError}
        data={data?.metrics.protocol_revenue.values}
        errorMessage={error?.message}
      />
      <StackedBarCharMetric
        title="Gateway Operator Share of Relays"
        description={
          <Link
            className="text-primary"
            href="https://mirror.xyz/0x2462fF59E08d60ED5bD737caAa667F5Fe435C358/fM1vWMkSMRwQWidP_wZ4X30mpWHUdSDFITeAxUcZbbA"
            target="_blank"
          >
            Relay Distribution by Gateway
          </Link>
        }
        data={data?.metrics.gateway_operator_share_of_relays.values}
        isLoading={isLoading}
        isError={isError}
        multiple={false}
        errorMessage={error?.message}
        percentDate={true}
      />
    </div>
  );
};
