/**
 * Game Inventory item entity.
 * @summary Represents copies of one Game stored in a game storage section.
 * @author Carolina Navarro Aldoradin
 */

export class GameInventoryItem {
    /**
     * @param
     */


    constructor({
        id=null,
        sectionId=null,
        gameGenreId = null,
        gameId = null,
        gameName = ''
        , quantity = 0, registeredAt = null
    }){
        this.id = id;
        this.sectionId = sectionId
        this.gameGenreId = gameGenreId;
        this.gameId = gameId;
        this.gameName = gameName;
        this.quantity = quantity;
        this.registeredAt = registeredAt;
    }

}
