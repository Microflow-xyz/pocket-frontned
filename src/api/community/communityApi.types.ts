import {
  ApiError,
  ApiResponse,
  AreaChartMetricsResponse,
  NumberMetricsResponse,
  StackedBarChartMetricsResponse,
  TimePeriodRequestParameter,
} from '@/utils/types';

export interface GetCommunityAndCollaborationRequest
  extends TimePeriodRequestParameter {}

export type GetCommunityAndCollaborationSuccessResponse = ApiResponse<{
  ecosystem_projects_delivering_impact: NumberMetricsResponse;
  pocket_network_DNA_NPS: AreaChartMetricsResponse;
  community_NPS: AreaChartMetricsResponse;
}>;

export type GetCommunityAndCollaborationResponse =
  | GetCommunityAndCollaborationSuccessResponse
  | ApiError;

export interface GetAwarenessRequest extends TimePeriodRequestParameter {}

export type GetAwarenessSuccessResponse = ApiResponse<{
  twitter_followers: AreaChartMetricsResponse;
}>;

export type GetAwarenessResponse = GetAwarenessSuccessResponse | ApiError;

export interface GetTransparencyRequest extends TimePeriodRequestParameter {}

export type GetTransparencySuccessResponse = ApiResponse<{
  projects_working_in_the_open: AreaChartMetricsResponse;
  percentage_of_projects_self_reporting: AreaChartMetricsResponse;
}>;

export type GetTransparencyResponse = GetTransparencySuccessResponse | ApiError;

export interface GetAdaptabilityRequest extends TimePeriodRequestParameter {}

export type GetAdaptabilitySuccessResponse = ApiResponse<{
  velocity_of_experiments_v_no_debated_proposals: StackedBarChartMetricsResponse;
}>;

export type GetAdaptabilityResponse = GetAdaptabilitySuccessResponse | ApiError;

export type GetQuarterlyERAAllocationSuccessResponse = ApiResponse<{
  amount_of_budget_spent_vs_available: {
    current: number;
    total: number;
  };
}>;

export type GetQuarterlyERAAllocationResponse =
  | GetQuarterlyERAAllocationSuccessResponse
  | ApiError;
