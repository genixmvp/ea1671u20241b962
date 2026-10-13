
import { GameStorageSection } from "@/inventory/domain/model/game-storage-section.entity.js";

/**
 * Game storage section assembler.
 * @summary Converts game storage section resources into entities.
 * @author Carolina Navarro Aldoradin
 */
export class GameStorageSectionAssembler {
    /**
     * @param {Object} resource - Game storage section resource from json-server.
     * @returns {GameStorageSection}
     */
    static toEntityFromResource(resource) {
        return new GameStorageSection({ ...resource });
    }

    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {GameStorageSection[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(
                `Error fetching game storage sections: ${response.status}`
            );
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['game-storage-sections'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}
