import axios from "axios";

const API_URL = "/api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
};

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await api.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar usuários");
  }
};
