import axios from "axios";
import { getAccessToken } from "@/actions/user.action";
export const axiosService=axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});
axiosService.interceptors.request.use(async (config) => {
  config.headers['auth-token'] = `${getAccessToken()}`;
  return config;
});
axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

export async function fetcher(url) {
    const res = await axiosService.get(url);
    return res.data;
}
