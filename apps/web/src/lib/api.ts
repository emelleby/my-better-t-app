import { hc } from 'hono/client';
import type { AppType } from '../../../server/src/app';

// Create the RPC client with full type safety
const client = hc<AppType>(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000');

export { client };

// Export the API client for use in components and hooks
export const api = client;

// Helper function to handle API errors
export function handleApiError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}

// Type-safe API response handler
export async function handleApiResponse<T>(
  response: Response
): Promise<{ data?: T; error?: string }> {
  try {
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || `HTTP ${response.status}` };
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

// Example usage functions for common API calls
export const apiCalls = {
  // Health check
  async healthCheck() {
    try {
      const response = await api.api.v1.health.$get();
      return await handleApiResponse(response);
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },

  // Auth endpoints (for future Clerk integration)
  auth: {
    async register(data: { name: string; email: string; password: string }) {
      try {
        const response = await api.api.v1.auth.register.$post({ json: data });
        return await handleApiResponse(response);
      } catch (error) {
        return { error: handleApiError(error) };
      }
    },

    async login(data: { email: string; password: string }) {
      try {
        const response = await api.api.v1.auth.login.$post({ json: data });
        return await handleApiResponse(response);
      } catch (error) {
        return { error: handleApiError(error) };
      }
    },

    async logout() {
      try {
        const response = await api.api.v1.auth.logout.$post();
        return await handleApiResponse(response);
      } catch (error) {
        return { error: handleApiError(error) };
      }
    }
  }
};