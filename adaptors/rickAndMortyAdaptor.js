import * as rickmortyapi from 'rickmortyapi'

export default class RickAndMortyAdaptor {
    async init() {
      // this exposes the library functions to the service layer
      // it would be more useful if you needed to initialize a connection
      // using environment specific credentials (DEV, QA, PROD)
      this.rmAdaptor = rickmortyapi;
    }
    /**
     * 
     * @param {query} query 
     * @returns JSON result of all characters from rick and morty database.
     */
    async retrieveAllCharacters(query) {
        const result = await this.rmAdaptor.getCharacters(query);
        return result;
    }

    /**
     * 
     * @param {id} character ID
     * @returns JSON result of character information
     */
    async retrieveCharacterById(id) {
        const result = await this.rmAdaptor.getCharacter(id);
        return result;
    }
}