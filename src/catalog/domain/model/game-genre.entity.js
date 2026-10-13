/**
 * Game genre entity.
 * @summary Game data.
 * @author Carolina Navarro Aldoradin
 */
export class GameGenre {

    constructor({ id = null, name = '', baseExperience = null }) {
        this.id = id;
        this.name = name;
        this.baseExperience = baseExperience;
    }
}
