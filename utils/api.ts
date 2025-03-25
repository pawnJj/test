// utils/api.ts
export interface RequestOptions extends RequestInit {
    params?: Record<string, any>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildQueryString = (params: Record<string, any> = {}) =>
    Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

export const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { params, ...fetchOptions } = options;
    const queryString = params ? `?${buildQueryString(params)}` : "";
    const url = `${BASE_URL}${endpoint}${queryString}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...fetchOptions,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
    }

    return response.json();
};
