'use client';

import { ReactNode } from 'react';

import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { ChartError } from '@/components/errors';
import { ChartSkeleton } from '@/components/skeletons';
import { PlusJakarta } from '@/font';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type SingleAreaData = {
  date: string;
  value: number;
};

export type MultiAreaData = {
  date: string;
  values: Array<{
    name: string;
    value: number;
  }>;
};

const extractMultipleAreaData = (
  data: Array<MultiAreaData>,
): Record<string, number[]> => {
  const keys = new Set<string>();

  for (const dataElement of data) {
    const { values } = dataElement;

    for (const value of values) {
      keys.add(value.name);
    }
  }

  const keysArray = Array.from(keys.values());

  const initialData: Record<string, number[]> = keysArray.reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {},
  );

  return data.reduce((acc, { values }) => {
    const currentDataMap = new Map();

    for (const key of keysArray) {
      currentDataMap.set(key, 0);
    }

    for (const { name, value } of values) {
      currentDataMap.set(name, value);
    }

    currentDataMap.forEach((value, key) => {
      acc[key] = [...acc[key], value];
    });

    return acc;
  }, initialData);
};

type MultiAreaChartMetric = {
  title: string;
  description?: string | ReactNode;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  percentDate?: boolean;
  prefix?: string | ReactNode;
  postfix?: string | ReactNode;
  toLocalFormat?: boolean;
  chartColors?: ApexOptions['colors'];
} & (
  | { multiple: true; data?: Array<MultiAreaData> }
  | { multiple?: false; data?: Array<SingleAreaData> }
);

export const MultiAreaChartMetric = ({
  title,
  multiple,
  data,
  description,
  isLoading,
  isError,
  errorMessage,
  prefix = '',
  postfix = '',
  toLocalFormat = true,
  chartColors,
}: MultiAreaChartMetric) => {
  const theme = useTheme();

  const dates = data?.map(({ date }) => {
    return date;
  });

  const chartSeriesData = multiple
    ? extractMultipleAreaData(data || [])
    : { [title]: (data || []).map(({ value }) => value) };

  const series: ApexAxisChartSeries =
    data && chartSeriesData
      ? Object.keys(chartSeriesData).map((key) => {
          return {
            name: key.replaceAll('_', ' '),
            data: chartSeriesData[key],
          };
        })
      : [];

  const options: ApexOptions = {
    chart: {
      type: 'area',
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
    colors: chartColors || [
      theme.palette['orange'].main,
      theme.palette['green'].main,
      theme.palette['pink'].main,
    ],
    tooltip: {
      x: {
        format: 'yyyy/MM/dd',
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '25%',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'datetime',
      categories: dates,
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
    fill: {
      opacity: 1,
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
      <div className="text-title-small sm:text-title-semi-large">
        <p className="m-0">{title}</p>
        {description ? (
          <p className="m-0 mt-1 text-body-medium text-onSurfaceVariant">
            {description}
          </p>
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
