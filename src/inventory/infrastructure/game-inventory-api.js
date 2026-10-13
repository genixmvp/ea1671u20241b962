
import { BaseApi } from "@/shared/infrastructure/base-api.js";
import { BaseEndpoint } from "@/shared/infrastructure/base-endpoint.js";

const storagePlatformApiUrl = import.meta.env.VITE_STORAGE_PLATFORM_API_URL;
const gameStorageSectionsEndpointPath =
    import.meta.env.VITE_GAME_STORAGE_SECTIONS_ENDPOINT_PATH;
const gameInventoryItemsEndpointPath =
    import.meta.env.VITE_GAME_INVENTORY_ITEMS_ENDPOINT_PATH;

/**
 * Game inventory API.
 * @summary Accesses game storage sections and inventory items through json-server.
 * @author Carolina Navarro Aldoradin
 */
export class GameInventoryApi extends BaseApi {
    #gameStorageSectionsEndpoint;
    #gameInventoryItemsEndpoint;

    constructor() {
        super(storagePlatformApiUrl);

        this.#gameStorageSectionsEndpoint =
            new BaseEndpoint(this, gameStorageSectionsEndpointPath);

        this.#gameInventoryItemsEndpoint =
            new BaseEndpoint(this, gameInventoryItemsEndpointPath);
    }

    /**
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getGameStorageSections() {
        return this.#gameStorageSectionsEndpoint.getAll();
    }

    /**
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getGameInventoryItems() {
        return this.#gameInventoryItemsEndpoint.getAll();
    }

    /**
     * @param {Object} resource - Game inventory item request resource.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    createGameInventoryItem(resource) {
        return this.#gameInventoryItemsEndpoint.create(resource);
    }
}
