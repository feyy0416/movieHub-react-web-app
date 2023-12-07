import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_API_BASE;
export const COMMENTS_API = `${BASE_API}/api/comments`;
export const LIKES_API = `${BASE_API}/api/likes`;
export const USERS_API = `${BASE_API}/api/users`;

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    console.log(response.data);
    return response.data;
};

export const createComment = async (comment) => {
    const response = await request.post(`${COMMENTS_API}`, comment);
    return response.data;
};

export const deleteComment = async (comment) => {
    const response = await request.delete(`${COMMENTS_API}/${comment._id}`);
    return response.data;
};

export const findCommentsByMovieId = async (movieId) => {
    const response = await request.get(`${COMMENTS_API}/${movieId}`);
    console.log(response.data);
    return response.data;
};

export const findCommentsByUsername = async (username) => {
    const response = await request.get(`${COMMENTS_API}/byusername/${username}`);
    return response.data;
};

export const findCommentById = async (id) => {
    const response = await request.get(`${COMMENTS_API}/comment/${id}`);
    return response.data;
};

export const updateComment = async (comment) => {
    const response = await request.put(`${COMMENTS_API}/${comment._id}`, comment);
    return response.data;
};

export const createUserLikesMovie = async (userId, movieId, movieName) => {
    console.log(movieId);
    const response = await request.post(`${BASE_API}/api/users/${userId}/likes/${movieId}/${movieName}`);
    return response.data;
}

export const deleteUserLikesMovie = async (userId, movieId) => {
    const response = await request.delete(`${BASE_API}/api/users/${userId}/likes/${movieId}`);
    return response.data;
};

export const findIfUserLikesMovie = async (userId, movieId) => {
    const response = await request.get(`${BASE_API}/api/users/${userId}/likes/${movieId}`);
    return response.data;
};
