import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

const setAuthorizationHeader = (authToken) => {
    api.defaults.headers['Authorization'] = 'Bearer ' + authToken;
};

export const fetchUsers = (authToken) => {
    setAuthorizationHeader(authToken);
    return api.get('/user');
};

export const fetchUserById = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.get(`/user/${id}`);
};

export const createUser = (data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.post('/user', data);
};

export const updateUser = (id, data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.put(`/user/${id}`, data);
};

export const deleteUser = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.delete(`/user/${id}`);
};


export const fetchCongresses = (authToken) => {
    setAuthorizationHeader(authToken);
    return api.get('/congreso');
};

export const fetchCongressById = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.get(`/congreso/${id}`);
};

export const createCongress = (data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.post('/congreso', data);
};

export const updateCongress = (id, data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.put(`/congreso/${id}`, data);
};

export const deleteCongress = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.delete(`/congreso/${id}`);
};


export const fetchTopics = (authToken) => {
    setAuthorizationHeader(authToken);
    return api.get('/topic');
};

export const fetchTopicById = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.get(`/topic/${id}`);
};

export const createTopic = (data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.post('/topic', data);
};

export const updateTopic = (id, data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.put(`/topic/${id}`, data);
};

export const deleteTopic = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.delete(`/topic/${id}`);
};


export const fetchAttendances = (authToken) => {
    setAuthorizationHeader(authToken);
    return api.get('/attendance');
};

export const fetchAttendanceById = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.get(`/attendance/${id}`);
};

export const createAttendance = (data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.post('/attendance', data);
};

export const updateAttendance = (id, data, authToken) => {
    setAuthorizationHeader(authToken);
    return api.put(`/attendance/${id}`, data);
};

export const deleteAttendance = (id, authToken) => {
    setAuthorizationHeader(authToken);
    return api.delete(`/attendance/${id}`);
};

export default api;