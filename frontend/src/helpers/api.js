import axios from "axios";
import storage from "../store/local";
import { toast } from ".";
import { navigate } from "@reach/router";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    // baseURL: "/api",
});

api.interceptors.request.use(
    function (config) {
        if (storage.exists("token")) {
            config.headers.common["Authorization"] = `Token ${storage.get("token")}`;
            // config.headers.post['Access-Control-Allow-Origin'] = '*'
            // config.headers.post['X-CSRFToken'] = storage.getCookie('csrftoken')
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.message === "Network Error") {
            toast.error(error.message);
        }
        if (error.response.status === 401) {
            toast.error("Invalid token.");
            storage.reset();
            navigate("/login");
        }
        if (error.response.status === 500) {
            toast.error("Internal error. Contact your developer");
        }
        return Promise.reject(error);
    }
);

api.format = function (response, error = false) {
    return {
        error,
        data: response ? response.data : {},
        status: response ? response.status : 404,
    };
};

export default api;