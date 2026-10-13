
import { defineStore } from "pinia";
import { ref } from "vue";
import { GameInventoryApi } from "@/inventory/infrastructure/game-inventory-api.js";
import { GameStorageSectionAssembler } from "@/inventory/infrastructure/game-storage-section.assembler.js";
import { GameInventoryItemAssembler } from "@/inventory/infrastructure/game-inventory-item.assembler.js";

const gameInventoryApi = new GameInventoryApi();

/**
 * Game inventory store.
 * @summary State management for game storage sections and inventory items.
 * @author Carolina Navarro Aldoradin
 */
const useGameInventoryStore = defineStore('game-inventory', () => {
    /**
     * @type {import('vue').Ref<import('@/inventory/domain/model/game-storage-section.entity.js').GameStorageSection[]>}
     */
    const gameStorageSections = ref([]);

    /**
     * @type {import('vue').Ref<import('@/inventory/domain/model/game-inventory-item.entity.js').GameInventoryItem[]>}
     */
    const gameInventoryItems = ref([]);

    const gameStorageSectionsLoaded = ref(false);
    const gameInventoryItemsLoaded = ref(false);
    const errors = ref([]);

    /** Loads all game storage sections. */
    function fetchGameStorageSections() {
        return gameInventoryApi.getGameStorageSections()
            .then(response => {
                gameStorageSections.value =
                    GameStorageSectionAssembler.toEntitiesFromResponse(response);
                gameStorageSectionsLoaded.value = true;
            })
            .catch(error => errors.value.push(error));
    }

    /** Loads all game inventory items. */
    function fetchGameInventoryItems() {
        return gameInventoryApi.getGameInventoryItems()
            .then(response => {
                gameInventoryItems.value =
                    GameInventoryItemAssembler.toEntitiesFromResponse(response);
                gameInventoryItemsLoaded.value = true;
            })
            .catch(error => errors.value.push(error));
    }

    /**
     * Finds a game storage section by its id.
     * @param {number} id
     * @returns {import('@/inventory/domain/model/game-storage-section.entity.js').GameStorageSection|undefined}
     */
    function getGameStorageSectionById(id) {
        return gameStorageSections.value.find(
            section => section.id === Number(id)
        );
    }

    /**
     * Returns inventory items belonging to a section.
     * @param {number} sectionId
     * @returns {import('@/inventory/domain/model/game-inventory-item.entity.js').GameInventoryItem[]}
     */
    function getItemsBySectionId(sectionId) {
        return gameInventoryItems.value.filter(
            item => item.sectionId === Number(sectionId)
        );
    }

    /**
     * Registers a game inventory item and updates the state.
     * @param {import('@/inventory/domain/model/game-inventory-item.entity.js').GameInventoryItem} gameInventoryItem
     * @returns {Promise<void>}
     */
    function addGameInventoryItem(gameInventoryItem) {
        const resource =
            GameInventoryItemAssembler.toResourceFromEntity(gameInventoryItem);

        return gameInventoryApi.createGameInventoryItem(resource)
            .then(response => {
                gameInventoryItems.value.push(
                    GameInventoryItemAssembler.toEntityFromResource(response.data)
                );
            });
    }

    return {
        gameStorageSections,
        gameInventoryItems,
        gameStorageSectionsLoaded,
        gameInventoryItemsLoaded,
        errors,
        fetchGameStorageSections,
        fetchGameInventoryItems,
        getGameStorageSectionById,
        getItemsBySectionId,
        addGameInventoryItem
    };
});

export default useGameInventoryStore;
