
/**
 * Game storage section entity.
 * @summary Represents a game storage section with a capacity, storage units per copy and a minimum rating.
 * @author Carolina Navarro Aldoradin
 */
export class GameStorageSection {
    /**
     * @param {Object} params
     * @param {number|null} params.id
     * @param {string} params.name
     * @param {string} params.gameGenre - Game genre name.
     * @param {number|null} params.gameGenreId - RAWG game genre id.
     * @param {number} params.maxCapacity - Maximum storage units.
     * @param {number} params.storageUnits - Storage units required by each game copy.
     * @param {number} params.minRating - Minimum rating allowed.
     */
    constructor({
                    id = null,
                    name = '',
                    gameGenre = '',
                    gameGenreId = null,
                    maxCapacity = 0,
                    storageUnits = 0,
                    minRating = 0
                }) {
        this.id = id;
        this.name = name;
        this.gameGenre = gameGenre;
        this.gameGenreId = gameGenreId;
        this.maxCapacity = maxCapacity;
        this.storageUnits = storageUnits;
        this.minRating = minRating;
    }

    /**
     * Sums the quantity of the given inventory items.
     * @param {import('./game-inventory-item.entity.js').GameInventoryItem[]} items
     * @returns {number}
     */
    totalGames(items) {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Calculates the used capacity using this section's storageUnits.
     * @param {import('./game-inventory-item.entity.js').GameInventoryItem[]} items
     * @returns {number}
     */
    usedCapacity(items) {
        return items.reduce(
            (total, item) => total + item.quantity * this.storageUnits,
            0
        );
    }

    /**
     * Calculates the remaining storage capacity.
     * @param {import('./game-inventory-item.entity.js').GameInventoryItem[]} items
     * @returns {number}
     */
    availableCapacity(items) {
        return this.maxCapacity - this.usedCapacity(items);
    }

    /**
     * Checks whether a game's rating meets the minimum rating requirement.
     * Null, missing or non-numeric values are rejected.
     * @param {*} rating - Rating returned by RAWG API.
     * @returns {boolean}
     */
    meetsMinRating(rating) {
        return typeof rating === 'number'
            && Number.isFinite(rating)
            && rating >= this.minRating;
    }

    /**
     * Checks whether the section has enough capacity for the requested quantity.
     * @param {number} quantity - Number of game copies to register.
     * @param {import('./game-inventory-item.entity.js').GameInventoryItem[]} items
     * @returns {boolean}
     */
    hasCapacityFor(quantity, items) {
        return Number.isInteger(quantity)
            && quantity > 0
            && quantity * this.storageUnits <= this.availableCapacity(items);
    }
}
