import { METHOD } from 'app/constants';
import type { DataResponse } from 'app/types';

type Method =
    typeof METHOD.GET |
    typeof METHOD.POST;

type Params = {
    [id: string]: string
}

/**
 * Function for sending requests
 *
 * @param {Method} method
 * @param {string} path
 * @param {Object} params
 * @returns {T}
 */
function request<T>(method: Method, path: string, params: Params = {}): Promise<T> {
    let url = path;
    let body;

    if (method === METHOD.GET) {
        const query = getQueryString(params);
        url += query ? '?' + query : '';
    } else if (method === METHOD.POST) {
        body = JSON.stringify(params);
    }

    const request = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body
    };

    return fetch(url, request)
        .then((response: Response): any => {
            if (!response.ok) {
                return Promise.reject(response);
            }

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                return response.json().then((body: T): Promise<T> => {
                    return Promise.resolve(body);
                });
            }

            return response.text();
        })
        .catch((error: Error): Promise<Error> => {
            return Promise.reject(error);
        });
}

function getQueryString(params: Params): string {
    return Object.keys(params)
        .map((k: string): string => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function getData(): Promise<DataResponse> {
    return request<DataResponse>(METHOD.GET, '/data');
}

export default {
    getData
};
