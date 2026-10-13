import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CatalogApi } from '../infrastructure/catalog.api.js';
import { GameAssembler } from '../infrastructure/game.assembler.js';

/**
 * Catalog store.
 * @summary Pinia store for managing RAWG catalog state and data fetching.
 * @author Carolina Navarro Aldoradin
 */
const catalogApi = new CatalogApi();

export const useCatalogStore = defineStore('catalog', () => {
    const gamesList = ref([]);
    const selectedGame = ref(null);
    const loading = ref(false);
    const requestFailed = ref(false);

    const reset = () => {
        gamesList.value = [];
        selectedGame.value = null;
        loading.value = false;
        requestFailed.value = false;
    };

    const fetchGamesByGenre = async (genreId) => {
        loading.value = true;
        requestFailed.value = false;
        try {
            const data = await catalogApi.getGamesByGenre(genreId);
            gamesList.value = GameAssembler.toCollection(data);
        } catch (error) {
            requestFailed.value = true;
            gamesList.value = [];
        } finally {
            loading.value = false;
        }
    };

    const fetchGameByName = async (gameName) => {
        loading.value = true;
        requestFailed.value = false;
        try {
            const data = await catalogApi.getGameByName(gameName);
            selectedGame.value = data ? GameAssembler.toEntity(data) : null;
            if (!selectedGame.value) requestFailed.value = true;
        } catch (error) {
            requestFailed.value = true;
            selectedGame.value = null;
        } finally {
            loading.value = false;
        }
    };

    return {
        gamesList,
        selectedGame,
        loading,
        requestFailed,
        reset,
        fetchGamesByGenre,
        fetchGameByName
    };
});

export default useCatalogStore;