import { isEmpty } from 'lodash';
import { setHttpToken } from "../../../helpers";

export const register = ({dispatch}, {payload, context}) => {
    return axios
        .post("/api/auth/register", payload)
        .then((result) => {
            // console.log(result.data);
            dispatch("setToken", result.data.meta.token).then(() => {
                dispatch('fetchUser', result.data.data);
            });
        }).catch((err) => {
            // console.log(err.response.data.errors);
            context.errors = err.response.data.errors;
        });
}

export const setToken = ({commit, dispatch}, token) => {
    if (isEmpty(token)) {
        return dispatch("checkTokenExists")
        .then((token) => {
            setHttpToken(token);
        });
    }
    commit("setToken", token);
    setHttpToken(token);
}

export const login = ({dispatch}, {payload, context}) => {
    return axios
        .post('/api/auth/login', payload)
        .then((result) => {
            // console.log(result.data);
            dispatch("setToken", result.data.meta.token).then(() => {
                // console.log(result.data.meta.token)
                dispatch('fetchUser', result.data.data);
            });
        }).catch((err) => {
            context.errors = err.response.data.errors;
        });
}

export const logout = ({dispatch}) => {
    axios.post("api/auth/logout").then(() => {
        dispatch("removeToken");
    })
}

export const removeToken = ({ commit }) => {
    commit("setAuthenticated", false);
    commit("setUserData", null);
    commit("setToken", null);
    setHttpToken(null);
}

export const fetchUser = ({commit}) => {
    axios.get("/api/user")
        .then((result) => {
            console.log(result.data);
            commit("setAuthenticated", true);
            commit("setUserData", result.data);
        }).catch((err) => {
            console.log(err.response.data);
        });
}

export const checkTokenExists = () => {
    const token = localStorage.getItem('access_token');

    if (isEmpty(token)) {
        return Promise.reject("NO_STORAGE_FOUND");
    }

    return Promise.resolve(token);
}
