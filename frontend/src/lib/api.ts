const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export async function apiFetch(path: string, options: RequestInit = {}, token?: string) {
  const headers: HeadersInit = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers, cache: "no-store" });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok || data?.success === false) {
    const detailMessage = Array.isArray(data?.details) && data.details.length > 0
      ? data.details[0]?.msg
      : "";
    const message = detailMessage || data?.message || (res.status === 401 ? "Your session expired. Please log in again." : "Request failed");
    const error = new Error(message) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }

  return data;
}
export { API_URL };
