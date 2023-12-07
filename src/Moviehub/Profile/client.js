import axios from "axios";

axios.defaults.withCredentials=true;

const request = axios.create({
    withCredentials: true,
  });
  
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export const COMMENTS_API = `${BASE_API}/api/comments`;
export const LIKES_API = `${BASE_API}/api/likes`;

export const findCommentsByUsername = async (username) => {
    const response = await request.get(`${COMMENTS_API}/byusername/${username}`);
    return response.data;
};

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const logout = async () => {
    const response = await request.post(`${USERS_API}/logout`);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};

export const deleteUser = async (user) => {
    const response = await request.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};

export const findUserByUsername = async (username) => {
    const response = await request.get(`${USERS_API}/byUsername/${username}`);
    return response.data;
};

export const findMoviesThatUserLikes = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};

export const createUserFollowsUser = async (userId, followedUser, username) => {
    const response = await request.post(`${BASE_API}/api/users/${userId}/${username}/follows/${followedUser}`);
    return response.data;
}

export const deleteUserFollowsUser = async (userId, followedUser) => {
    const response = await request.delete(`${BASE_API}/api/users/${userId}/follows/${followedUser}`);
    return response.data;
};

export const findIfUserFollowedUser = async (userId, followedUser) => {
    const response = await request.get(`${BASE_API}/api/users/${userId}/follows/${followedUser}`);
    return response.data;
};

export const findFollows = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}/follows`);
    return response.data;
};

export const findFollowers = async (username) => {
    const response = await request.get(`${USERS_API}/${username}/followed`);
    return response.data;
};

