const axios  = require("axios");

class Cart {
    #baseUrl = "https://fakestoreapi.com/products";

    async list() {
        return await axios.get(this.#baseUrl)
    }
}

module.exports = new Cart