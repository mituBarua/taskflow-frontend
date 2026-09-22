const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status = 0, errors = {}) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function apiRequest(path, options = {}) {
  const {
    signal,
    headers,
    ...requestOptions
  } = options;

  const timeoutSignal = AbortSignal.timeout(15000);

  const requestSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...requestOptions,
      signal: requestSignal,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (!response.ok) {
      throw new ApiError(
        payload.message || "Request failed.",
        response.status,
        payload.errors || {}
      );
    }

    return payload.data;
  } catch (error) {
    // Ignore requests cancelled by the calling component.
    if (signal?.aborted) {
      throw error;
    }

    // Preserve API validation and server errors.
    if (error instanceof ApiError) {
      throw error;
    }

    if (timeoutSignal.aborted) {
      throw new ApiError(
        "The request took too long. Please try again."
      );
    }

    if (error instanceof SyntaxError) {
      throw new ApiError(
        "Unexpected server response. Check the API connection."
      );
    }

    throw new ApiError(
      "Could not reach the server. Make sure the backend is running."
    );
  }
}