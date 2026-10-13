/**
 * Game entity.
 * @summary Represents a video game from RAWG API.
 * @author Carolina Navarro Aldoradin
 */
export class Game {
    constructor({ id = 0, name = '', rating = 0, genres = [] } = {}) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.genres = genres;
    }
}