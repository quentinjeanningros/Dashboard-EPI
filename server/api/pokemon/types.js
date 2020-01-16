let axios = require('axios');
let errors = require('../../utils/errors');

const desc = {
    name: "types",
    description: "Display type affinities for a type",
    params: []
}

function getDamageList(damages) {
    let damageList = new Array;
    for (let i = 0; i < damages.length; ++i)
        damageList.push(damages[i].name);
    return damageList;
}

function searchTypes(req, res) {
    axios.get('https://pokeapi.co/api/v2/type/' + req.params.type.toLowerCase())
        .then(function(response) {
            res.status(200);
            if (response == null) {
                res.json({
                    valid: false
                });
            } else {
                res.json({
                    valid: true,
                    name: response.data.name,
                    double_damage_from: getDamageList(response.data.damage_relations.double_damage_from),
                    half_damage_from: getDamageList(response.data.damage_relations.half_damage_from),
                    no_damage_from: getDamageList(response.data.damage_relations.no_damage_from),
                    double_damage_to: getDamageList(response.data.damage_relations.double_damage_to),
                    half_damage_to: getDamageList(response.data.damage_relations.half_damage_to),
                    no_damage_to: getDamageList(response.data.damage_relations.no_damage_to)
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
    searchTypes: searchTypes
};