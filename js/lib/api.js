class Api {
    static headers(verb) {
        switch (verb) {
            case 'POST':
            case 'PUT':
                return {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    dataType: 'json',
                };
                break;
            default:
                return {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    dataType: 'json',
                };
        }
    }

    static get(route) {
        return this.xhr(route, null, 'GET');
    }

    static put(route, params) {
        const formdata = new FormData();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                formdata.append(key, params[key]);
            }
        }
        return this.xhr(route, formdata, 'PUT');
    }

    static post(route, params) {
        const formdata = new FormData();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                formdata.append(key, params[key]);
            }
        }
        return this.xhr(route, formdata, 'POST');
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE');
    }

    static xhr(route, params, verb) {
        const host = 'http://api.eduweb.co.ke';
        const url = `${host}${route}`;

        const options = Object.assign({ method: verb }, params ? { body: params } : null);
        options.headers = Api.headers(verb);
        return fetch(url, options)
            .then((resp) => {
                const json = resp.json();
                if (resp.ok) {
                    return json;
                }
                return json.then((err) => { throw err; });
            })
            .then((json) => {
                if (json.response === 'success' && !json.nodata) {
                    return json.data || json.code || [];
                }
                Promise.reject(json);
            })
            .catch((error) => {
                // console.error(error);
                console.log('er', error.message);
                Promise.reject(error);
            });
    }
}
export default Api;
