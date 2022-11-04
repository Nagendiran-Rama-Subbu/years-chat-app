import { API_END_POINT } from "../helpers/constant";

function parseResponse(response) {
    return response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    });
}

const api = {
    async get(url) {
        try {
            // const token = JSON.parse(localStorage.getItem('user_token'));
            // const bearer = 'Bearer ' + token;
            const response = await fetch(`${API_END_POINT}${url}`, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json",
                    credentials: 'same-origin',
                    // "Authorization": bearer
                }),
            });
            return parseResponse(response);
        } catch (err) {
            console.log(err);
        }
    },

    async post(url, data) {
        try {
            const body = JSON.stringify(data);
            // const token = JSON.parse(localStorage.getItem('user_token'));
            // const bearer = 'Bearer ' + token;
            const response = await fetch(`${API_END_POINT}${url}`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    credentials: 'same-origin',
                    // "Authorization": bearer
                }),
                body,
            });
            return parseResponse(response);
        } catch (err) {
            console.log(err);
        }
    },
    async put(url, data) {
        try {
            const body = JSON.stringify(data);
            // const token = JSON.parse(localStorage.getItem('user_token'));
            // const bearer = 'Bearer ' + token;
            const response = await fetch(`${API_END_POINT}${url}`, {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json",
                    credentials: 'same-origin',
                    // "Authorization": bearer
                }),
                body,
            });
            return parseResponse(response);
        } catch (err) {
            console.log(err);
        }
    },
}
export default api;