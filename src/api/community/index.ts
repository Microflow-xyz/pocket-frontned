import { useQuery } from '@tanstack/react-query';

import { communityApi } from '@/api/community/communityApi';
import {
  GetAdaptabilityRequest,
  GetAdaptabilityResponse,
  GetAdaptabilitySuccessResponse,
  GetAwarenessRequest,
  GetAwarenessResponse,
  GetAwarenessSuccessResponse,
  GetCommunityAndCollaborationRequest,
  GetCommunityAndCollaborationResponse,
  GetCommunityAndCollaborationSuccessResponse,
  GetQuarterlyERAAllocationResponse,
  GetQuarterlyERAAllocationSuccessResponse,
  GetTransparencyRequest,
  GetTransparencyResponse,
  GetTransparencySuccessResponse,
} from '@/api/community/communityApi.types';
import { apiConfig } from '@/utils/constants';
import { queryKeys } from '@/utils/react-query-keys';
import { ApiError } from '@/utils/types';

export const communityApiGateway = {
  useGetCommunityAndCollaboration: (
    parameters: GetCommunityAndCollaborationRequest,
  ) =>
    useQuery<
      GetCommunityAndCollaborationResponse,
      ApiError,
      GetCommunityAndCollaborationSuccessResponse
    >(queryKeys.communityKeys.useGetCommunityAndCollaboration(parameters), {
      queryFn: () => communityApi.getCommunityAndCollaboration(parameters),
      staleTime: apiConfig.staleTime,
    }),

  useGetAwareness: (parameters: GetAwarenessRequest) =>
    useQuery<GetAwarenessResponse, ApiError, GetAwarenessSuccessResponse>(
      queryKeys.communityKeys.useGetAwareness(parameters),
      {
        queryFn: () => communityApi.getAwareness(parameters),
        staleTime: apiConfig.staleTime,
      },
    ),

  useGetTransparency: (parameters: GetTransparencyRequest) =>
    useQuery<GetTransparencyResponse, ApiError, GetTransparencySuccessResponse>(
      queryKeys.communityKeys.useGetTransparency(parameters),
      {
        queryFn: () => communityApi.getTransparency(parameters),
        staleTime: apiConfig.staleTime,
      },
    ),

  useGetAdaptability: (parameters: GetAdaptabilityRequest) =>
    useQuery<GetAdaptabilityResponse, ApiError, GetAdaptabilitySuccessResponse>(
      queryKeys.communityKeys.useGetAdaptability(parameters),
      {
        queryFn: () => communityApi.getAdaptability(parameters),
        staleTime: apiConfig.staleTime,
      },
    ),

  useGetQuarterlyERAAllocation: () =>
    useQuery<
      GetQuarterlyERAAllocationResponse,
      ApiError,
      GetQuarterlyERAAllocationSuccessResponse
    >(queryKeys.communityKeys.useGetQuarterlyERAAllocation(), {
      queryFn: () => communityApi.getQuarterlyERAAllocation(),
      staleTime: apiConfig.staleTime,
    }),
};
