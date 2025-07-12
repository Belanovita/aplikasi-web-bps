// src/api/axios.js
import axios from "axios";

// Debug: tampilkan URL API saat aplikasi dijalankan
const API_URL = import.meta.env.VITE_API_URL;
console.log("🔗 API URL:", API_URL);

// Cek apakah variabel environment sudah diset
if (!API_URL) {
    console.warn("⚠️ VITE_API_URL belum disetel di .env. Gunakan nilai default.");
}

// Buat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
    baseURL: API_URL ? `${API_URL}/api` : "http://localhost:8000/api", // fallback lokal
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menyisipkan Authorization token dari localStorage
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
