
import { GameInventoryItem } from "@/inventory/domain/model/game-inventory-item.entity.js";

/**
 * Game inventory item assembler.
 * @summary Converts between game inventory item resources and entities.
 * @author Carolina Navarro Aldoradin
 */
export class GameInventoryItemAssembler {
    /**
     * @param {Object} resource - Game inventory item resource from json-server.
     * @returns {GameInventoryItem}
     */
    static toEntityFromResource(resource) {
        return new GameInventoryItem({
            ...resource,
            registeredAt: resource.registeredAt
                ? new Date(resource.registeredAt)
                : null
        });
    }

    /**
     * @param {import('axios').AxiosResponse} response
     * @returns {GameInventoryItem[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(
                `Error fetching game inventory items: ${response.status}`
            );
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['game-inventory-items'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }

    /**
     * Builds the request resource for POST /game-inventory-items.
     * @param {GameInventoryItem} entity
     * @returns {Object}
     */
    static toResourceFromEntity(entity) {
        return {
            sectionId: entity.sectionId,
            gameGenreId: entity.gameGenreId,
            gameId: entity.gameId,
            gameName: entity.gameName,
            quantity: entity.quantity,
            registeredAt: entity.registeredAt
                ? entity.registeredAt.toISOString()
                : null
        };
    }
}
