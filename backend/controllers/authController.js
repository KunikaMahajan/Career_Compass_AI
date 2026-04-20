import axios from "axios";

const API = "http://localhost:5000/api/auth";

/* ==============================
   🔐 REGISTER USER
============================== */
export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);

  // ✅ store token
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

/* ==============================
   🔐 LOGIN USER
============================== */
export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);

  // ✅ IMPORTANT: STORE TOKEN
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

/* ==============================
   🚪 LOGOUT USER
============================== */
export const logout = () => {
  localStorage.removeItem("token");
};

/* ==============================
   📦 GET TOKEN
============================== */
export const getToken = () => {
  return localStorage.getItem("token");
};

/* ==============================
   👤 GET USER PROFILE (OPTIONAL)
============================== */
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};