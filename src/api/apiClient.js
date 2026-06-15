const BASE_URL=import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
let refreshPromise = null;
const refreshAccessToken = async () => {
    const response = await fetch(`${BASE_URL}/users/refresh-token`, {
        method: "POST",
        credentials: "include",
    });
    if (!response.ok) {
        window.location.href="/login";
    }
    return response.json();
};

const apiClient=async(endpoint,options={})=>{
    const {body , headers={},...restOptions}=options;

    const isFormData = body instanceof FormData;

    const config={
        ...restOptions,
        headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
        },

        credentials:"include",
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401 && !_isRetry) {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshAccessToken()
                .finally(() => {
                    isRefreshing = false;
                    refreshPromise = null;
                });
        }
        await refreshPromise;
        return apiClient(endpoint, options, true);
    }
    const data=await response.json();

    if (!response.ok) {
        const error = new Error(data.message || "Something went wrong");
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
};

export const api = {
    get: (endpoint) => 
        apiClient(endpoint, { method: "GET" }),
    post: (endpoint, body) => 
        apiClient(endpoint, { method: "POST", body }),
    patch: (endpoint, body) => 
        apiClient(endpoint, { method: "PATCH", body }),
    put: (endpoint, body) => 
        apiClient(endpoint, { method: "PUT", body }),
    delete: (endpoint,body) => 
        apiClient(endpoint, { method: "DELETE" ,body}),
};

export default api;