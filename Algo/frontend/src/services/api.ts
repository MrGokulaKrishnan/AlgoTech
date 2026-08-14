const rawApiUrl = (import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? "https://algovisual-hsrl.onrender.com/api").trim();
const normalizedBase = rawApiUrl.endsWith("/") ? rawApiUrl.slice(0, -1) : rawApiUrl;
const baseUrl = normalizedBase.endsWith("/api") ? normalizedBase : `${normalizedBase}/api`;

type ErrorBody = { message?: string; fields?: Record<string, string> };

const isErrorBody = (value: unknown): value is ErrorBody =>
  typeof value === "object" && value !== null;

export class ApiError extends Error {
  readonly status: number;
  readonly fields: Record<string, string>;

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { body, token, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);
  headers.set("Accept", "application/json");
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const targetPath = path.startsWith("/api/") ? path.slice(4) : path.startsWith("/") ? path : `/${path}`;

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${targetPath}`, {
      ...requestOptions,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "We could not reach the learning server. Please try again shortly.");
  }

  const payload: unknown = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) {
    const error = isErrorBody(payload) ? payload : {};
    throw new ApiError(response.status, error.message ?? "Something went wrong. Please try again.", error.fields ?? {});
  }
  return payload as T;
};
