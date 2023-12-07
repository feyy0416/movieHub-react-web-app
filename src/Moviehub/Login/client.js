import axios from "axios";

axios.defaults.withCredentials=true;

export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

const request = axios.create({
    withCredentials: true,
  });

export const login = async (credentials) => {
    const response = await request.post(`${USERS_API}/login`, credentials);
    return response.data;
};

export const signup = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/signup`, credentials);
    return response.data;
};

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};

export const checkLoggedInStatus = async () => {
    const response = await request.get(`${USERS_API}/check-login`);
    return response.data;
}
