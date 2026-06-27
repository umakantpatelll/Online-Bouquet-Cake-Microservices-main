/**
 * ApiResponse<T>
 * ----------------------------------------------------
 * Why this file exists:
 * Mirrors the generic envelope standard wrapper (ApiResponse<T>) implemented on the backend.
 * 
 * Target Fields:
 * - success: boolean
 * - message: string
 * - data: T (Payload)
 * - timestamp: string
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
