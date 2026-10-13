/**
 * Base endpoint.
 * @summary Provides common REST operations for one endpoint path.
 * @author Carolina Navarro Aldoradin
 */
export class BaseEndpoint {
    /**
     * @param {import('./base-api.js').BaseApi} baseApi - API client that owns the http instance.
     * @param {string} endpointPath - Path of the endpoint (read from environment variables).
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    /**
     * Gets all resources.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getAll() {
        return this.http.get(this.endpointPath);
    }

    /**
     * Gets one resource by its id (or name, for providers that allow it).
     * @param {number|string} id - Resource identifier.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getById(id) {
        return this.http.get(`${this.endpointPath}/${id}`);
    }

    /**
     * Creates a resource.
     * @param {Object} resource - Resource to create.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    create(resource) {
        return this.http.post(this.endpointPath, resource);
    }
}
