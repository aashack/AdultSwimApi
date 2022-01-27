import responseBody from "../helpers/response-body.js";
import RickAndMortyAdaptor from "../adaptors/rickAndMortyAdaptor.js";

class CharacterService {
    async init() {
        try {
            // initializes the adaptor (it is overkill since it is just a simple library interface)
            this.characterService = new RickAndMortyAdaptor();
            // small initializer loader if you were parsing more than one library/database/source.
            const initializers = [this.characterService.init()];
            await Promise.all(initializers);
        } catch(error) {
            throw new Error(error);

        }
    }

    /**
     * 
     * @param {Object} query object containing PAGE, NAME, STATUS, IDS
     * @returns JSON result wrapped in SUCCESS object or ERROR object
     */
    async getAll(query) {
        try {
            const result = await this.characterService.retrieveAllCharacters(query);
            console.log(result);
            return new responseBody.Success(result);
        } catch (err) {
            return new responseBody.BadRequestError([
                {message: err},
            ], err.message);
        }
    }

    /**
     * 
     * @param {int} characterId 
     * @returns 
     */
    async getCharacterById(characterId) {
        try {
            const result = await this.characterService.retrieveCharacterById(characterId);

            if (result.status === 404) {
                return new responseBody.NotFoundError([{
                    message: "Character Not Found",
                    path: characterId
                }]);  
            }
            return new responseBody.Success(result);
        } catch (err) {
            return new responseBody.BadRequestError([
                {message: err},
            ], err.message);
        }
    }
}

const characterService = new CharacterService();
await characterService.init();
export default characterService;