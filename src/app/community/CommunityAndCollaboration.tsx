'use client';

import Image from 'next/image';

import { communityApiGateway } from '@/api/community';
import { DisabledTimePeriod } from '@/components/disabled-time-period';
import { NumberError } from '@/components/errors';
import { LineChartMetric } from '@/components/metrics-charts';
import { NumberSkeleton } from '@/components/skeletons';
import { useGetTimePeriodSearchParam } from '@/hooks/use-get-time-peroiod-search-param';
import { NumberMetricsResponse } from '@/utils/types';

interface EcosystemProjectsDeliveringImpactProps {
  data?: NumberMetricsResponse;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const EcosystemProjectsDeliveringImpact = ({
  data,
  isError,
  isLoading,
  errorMessage,
}: EcosystemProjectsDeliveringImpactProps) => {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-surfaceContainerLow p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-title-medium">
            Ecosystem projects delivering impact
          </span>
          <div className="bg-zinc-700 flex w-[125px] items-center justify-center rounded-lg bg-opacity-10">
            <DisabledTimePeriod>Last 2 months</DisabledTimePeriod>
          </div>
        </div>
        <div className="text-body-medium italic text-onSurfaceVariant">
          <p className="m-0 p-0">
            All open Sockets, POPs, and contributors currently.
          </p>
          <p className="m-0 p-0">Current Cycle / Previous Cycle</p>
        </div>
      </div>
      <span className="text-title-large text-primary">
        {isLoading ? (
          <NumberSkeleton />
        ) : isError ? (
          <NumberError message={errorMessage} />
        ) : data ? (
          <div className="flex items-center justify-start gap-4">
            <div>
              <span>{data.value.toFixed(2)}</span>
              {data.previous ? (
                <span>{` / ${data.previous.toFixed(2)}`}</span>
              ) : null}
            </div>
            <div>
              {data.change ? (
                <span className="flex items-center justify-start">
                  <Image
                    src="/images/up.svg"
                    alt="up icon"
                    width={24}
                    height={24}
                    priority={true}
                  />
                  <span className="text-title-medium text-green">
                    {(data.change * 100).toFixed(2)} %
                  </span>
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </span>
    </div>
  );
};

const CommunityAndCollaboration = () => {
  const timePeriod = useGetTimePeriodSearchParam();

  const { useGetCommunityAndCollaboration } = communityApiGateway;
  const { isLoading, isError, data, error } = useGetCommunityAndCollaboration({
    timePeriod,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="text-title-large">Community & Collaboration</div>
      <EcosystemProjectsDeliveringImpact
        isLoading={isLoading}
        isError={isError}
        data={data?.metrics.ecosystem_projects_delivering_impact}
        errorMessage={error?.message}
      />
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <LineChartMetric
          title="POKT Network DNA NPS"
          description="Community sentiment of POKT DNA, measured quarterly."
          color="secondary"
          postfix="%"
          isLoading={isLoading}
          isError={isError}
          percentDate={true}
          data={data?.metrics.pocket_network_DNA_NPS.values}
          errorMessage={error?.message}
          xAxisLabelFormat="yy/MM"
        />
        <LineChartMetric
          title="Community NPS"
          description="Community sentiment of POKT, measured quarterly."
          color="secondary"
          postfix="%"
          percentDate={true}
          isLoading={isLoading}
          isError={isError}
          data={data?.metrics.community_NPS.values}
          errorMessage={error?.message}
        />
      </div>
    </div>
  );
};

export { CommunityAndCollaboration };
