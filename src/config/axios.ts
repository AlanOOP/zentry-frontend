import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default api;
// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };