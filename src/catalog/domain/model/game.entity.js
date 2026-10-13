/**
 * Game entity.
 * @summary Game data.
 * @author Carolina Navarro Aldoradin
 */
export class Game {

    constructor({ id = null, name = '', baseExperience = null }) {
        this.id = id;
        this.name = name;
        this.baseExperience = baseExperience;
    }
}
