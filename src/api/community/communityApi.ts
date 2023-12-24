import {
  GetAdaptabilityRequest,
  GetAdaptabilityResponse,
  GetAwarenessRequest,
  GetAwarenessResponse,
  GetCommunityAndCollaborationRequest,
  GetCommunityAndCollaborationResponse,
  GetQuarterlyERAAllocationResponse,
  GetTransparencyRequest,
  GetTransparencyResponse,
} from '@/api/community/communityApi.types';
import { httpClient } from '@/utils/http-client';

export const communityApi = {
  getCommunityAndCollaboration: async ({
    timePeriod,
  }: GetCommunityAndCollaborationRequest): Promise<GetCommunityAndCollaborationResponse> =>
    httpClient.get(
      `/metrics/community/community-collaboration?time_period=${timePeriod}`,
    ),

  getAwareness: async ({
    timePeriod,
  }: GetAwarenessRequest): Promise<GetAwarenessResponse> =>
    httpClient.get(`/metrics/community/awareness?time_period=${timePeriod}`),

  getTransparency: async ({
    timePeriod,
  }: GetTransparencyRequest): Promise<GetTransparencyResponse> =>
    httpClient.get(`/metrics/community/transparency?time_period=${timePeriod}`),

  getAdaptability: async ({
    timePeriod,
  }: GetAdaptabilityRequest): Promise<GetAdaptabilityResponse> =>
    httpClient.get(`/metrics/community/adaptability?time_period=${timePeriod}`),

  getQuarterlyERAAllocation:
    async (): Promise<GetQuarterlyERAAllocationResponse> =>
      httpClient.get(`/metrics/community/quarterly-ERA-allocation`),
};
