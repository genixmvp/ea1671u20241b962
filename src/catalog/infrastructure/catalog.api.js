import axios from 'axios';

/**
 * Catalog API.
 * @summary Handles HTTP requests to RAWG external API endpoints.
 * @author Carolina Navarro Aldoradin
 */
const API_URL = import.meta.env.VITE_RAWG_API_URL || 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export class CatalogApi {
    /**
     * Fetches video games filtered by genre ID.
     * @param {number|string} genreId
     * @returns {Promise<Array>} List of games resources
     */
    async getGamesByGenre(genreId) {
        const response = await axios.get(`${API_URL}/games`, {
            params: {
                genres: genreId,
                key: API_KEY
            }
        });
        return response.data.results;
    }

    /**
     * Fetches specific video game details by search term.
     * @param {string} gameName
     * @returns {Promise<Object>} Game resource
     */
    async getGameByName(gameName) {
        const response = await axios.get(`${API_URL}/games`, {
            params: {
                search: gameName,
                page_size: 1,
                key: API_KEY
            }
        });
        return response.data.results?.[0] || null;
    }
}