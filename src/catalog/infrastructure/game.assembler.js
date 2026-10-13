import { Game } from '../domain/model/game.entity.js';

/**
 * Game assembler.
 * @summary Transforms RAWG API resources into Game domain entities.
 * @author Carolina Navarro Aldoradin
 */
export class GameAssembler {
    static toEntity(resource) {
        return new Game({
            id: resource.id,
            name: resource.name,
            rating: resource.rating,
            genres: resource.genres ?? []
        });
    }

    static toCollection(resources) {
        return (resources ?? []).map(resource => this.toEntity(resource));
    }
}