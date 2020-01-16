let axios = require('axios');
let errors = require('../../utils/errors');

const desc = {
    name: "pokedex",
    description: "Display pokedex informations for a pokemon",
    params: []
};

function searchPokemon(req, res) {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemon.toLowerCase())
        .then(function(response) {
            res.status(200);
            if (response == null) {
                res.json({
                    valid: false
                });
            } else {
                res.json({
                    valid: true,
                    name: req.params.pokemon,
                    id: response.data.id,
                    weight: response.data.weight,
                    height: response.data.height,
                    type: response.data.types[0].type.name,
                    sprite: response.data.sprites.front_default
                });
            }
        })
        .catch(function(error) {
            res.status(200);
            res.json({
                valid: false
            });
        })
}

module.exports = {
    desc: desc,
    searchPokemon: searchPokemon
}