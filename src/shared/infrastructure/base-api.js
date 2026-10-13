import axios from "axios";

/**
 * Base API client.
 * @summary Wraps an axios instance configured with the base URL of one provider.
 * @author Carolina Navarro Aldoradin
 */
export class BaseApi {
    /** @type {import('axios').AxiosInstance} */
    #http;

    /**
     * Creates an axios instance for the given provider.
     * @param {string} baseUrl - Base URL of the provider (read from environment variables).
     */
    constructor(baseUrl) {
        this.#http = axios.create({
            baseURL: baseUrl,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * Axios instance used by the endpoints.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }
}
