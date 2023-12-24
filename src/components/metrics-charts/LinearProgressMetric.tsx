'use client';

import { Box, LinearProgress } from '@mui/material';

import { ChartError } from '@/components/errors';
import { LinearProgressSkeleton } from '@/components/skeletons';

interface LinearProgressMetricProps {
  total: number;
  current: number;
  title: string;
  description?: string;
  color?: 'primary' | 'secondary';
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export const LinearProgressMetric = ({
  total,
  current,
  title,
  description,
  color = 'primary',
  isLoading,
  isError,
  errorMessage,
}: LinearProgressMetricProps) => {
  const parentTranslate = Math.ceil(-1 * (100 - (current * 100) / total));
  const childTranslate = parentTranslate > -8 ? 0 : 50;

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl bg-surfaceContainerLow p-5">
      <div className="flex flex-row justify-between">
        <div className="text-title-small sm:text-title-semi-large">
          <p className="m-0">{title}</p>
          {description ? (
            <p className="m-0 mt-1 text-body-medium italic text-onSurfaceVariant">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <LinearProgressSkeleton />
      ) : isError ? (
        <ChartError message={errorMessage} />
      ) : (
        <div>
          <Box
            className="mb-1 mt-0.5 flex justify-end"
            sx={{
              transform: `translateX(${parentTranslate}%)`,
            }}
          >
            <Box
              component="span"
              sx={{ transform: `translateX(${childTranslate}%)` }}
            >
              {current}
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.ceil((current * 100) / total)}
            color={color}
          />
          <div className="mb-0.5 mt-2 flex w-full justify-end text-title-small">
            <span>{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};
