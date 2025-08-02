// API type exports for frontend RPC integration
import type routes from "../routes";

// Export the complete API type structure
export type ApiRoutes = typeof routes;

// This type represents the full API surface that will be available to the frontend
// It includes all mounted routes under /api/v1
export type AppType = {
  api: {
    v1: ApiRoutes;
  };
};

// Individual route types for specific use cases
export type AuthRoutes = typeof routes extends Hono<any, any, any> 
  ? any 
  : never;

// Response types for common API responses
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface ErrorResponse {
  error: string;
  details?: any;
}