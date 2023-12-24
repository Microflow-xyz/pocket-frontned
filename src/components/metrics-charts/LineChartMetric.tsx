'use client';

import { ReactNode } from 'react';

import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { DisabledTimePeriod } from '@/components/disabled-time-period';
import { ChartError } from '@/components/errors';
import { ChartSkeleton } from '@/components/skeletons';
import { PlusJakarta } from '@/font';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type LineChartMetricData = Array<{
  date: string;
  value: number;
}>;

interface LineChartMetricProps {
  title: string;
  data?: LineChartMetricData;
  color?: 'primary' | 'secondary';
  showDisabledTimePeriod?: boolean;
  disabledTimePeriodText?: string;
  description?: string | ReactNode;
  prefix?: string | ReactNode;
  postfix?: string | ReactNode;
  toLocalFormat?: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  percentDate?: boolean;
  xAxisLabelFormat?: string;
}

const LineChartMetric = ({
  title,
  data,
  color = 'primary',
  showDisabledTimePeriod = false,
  disabledTimePeriodText,
  description = '',
  prefix = '',
  postfix = '',
  toLocalFormat = true,
  isLoading,
  isError,
  errorMessage,
  percentDate = false,
  xAxisLabelFormat,
}: LineChartMetricProps) => {
  const theme = useTheme();
  const series: ApexAxisChartSeries = [
    {
      name: title,
      data: data
        ? data.map(({ date, value }) => {
            return { x: date, y: percentDate ? value * 100 : value };
          })
        : [],
    },
  ];
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
        autoSelected: 'selection',
        tools: {
          selection: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette[color].main],
    tooltip: {
      x: {
        format: 'yyyy/MM/dd',
      },
      y: {
        formatter: (val: number): string => {
          let result = val.toString();

          const [intSec, floatSec] = (result || '').split('.');

          if (floatSec) {
            const firstNonZeroIndex = floatSec?.search(/[1-9]/);
            const leadingZeros = floatSec?.slice(0, firstNonZeroIndex);
            const remainingNumbers = floatSec?.slice(
              firstNonZeroIndex,
              firstNonZeroIndex + (!firstNonZeroIndex ? 2 : 1),
            );

            result = intSec + '.' + leadingZeros + remainingNumbers;
          }

          if (val > 1e9) {
            result = parseFloat(result).toPrecision(4);
          } else if (val >= 0 && val < 1e-9) {
            result = '0';
          }

          if (toLocalFormat) {
            result = parseFloat(result).toLocaleString('en-US');
          }

          return prefix + result + postfix;
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'datetime',
      ...(xAxisLabelFormat && {
        labels: {
          format: xAxisLabelFormat,
        },
      }),
    },
    yaxis: {
      labels: {
        formatter: (val: number): string | string[] => {
          let result = val.toString();

          const [intSec, floatSec] = (result || '').split('.');

          if (floatSec) {
            const firstNonZeroIndex = floatSec?.search(/[1-9]/);
            const leadingZeros = floatSec?.slice(0, firstNonZeroIndex);
            const remainingNumbers = floatSec?.slice(
              firstNonZeroIndex,
              firstNonZeroIndex + (!firstNonZeroIndex ? 2 : 1),
            );

            result = intSec + '.' + leadingZeros + remainingNumbers;
          }

          if (val > 1e9) {
            result = parseFloat(result).toPrecision(4);
          } else if (val >= 0 && val < 1e-9) {
            result = '0';
          }

          if (toLocalFormat) {
            result = parseFloat(result).toLocaleString('en-US');
          }

          return prefix + result + postfix;
        },
      },
    },
    noData: {
      text: 'No Data',
      style: {
        fontFamily: PlusJakarta.style.fontFamily,
      },
    },
  };

  return (
    <div className="flex h-72 w-full flex-col gap-6 rounded-2xl bg-surfaceContainerLow p-5">
      <div className="flex flex-row justify-between">
        <div className="text-title-small sm:text-title-semi-large">
          <p className="m-0">{title}</p>
          {description ? (
            <p className="m-0 mt-1 text-body-medium italic text-onSurfaceVariant">
              {description}
            </p>
          ) : null}
        </div>
        {showDisabledTimePeriod ? (
          <DisabledTimePeriod>{disabledTimePeriodText}</DisabledTimePeriod>
        ) : null}
      </div>
      <div className="h-full w-full">
        {isLoading ? (
          <ChartSkeleton />
        ) : isError ? (
          <ChartError message={errorMessage} />
        ) : data ? (
          <ApexChart
            series={series}
            options={options}
            height="100%"
            type="area"
          />
        ) : null}
      </div>
    </div>
  );
};

export { LineChartMetric };
