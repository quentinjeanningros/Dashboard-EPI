let axios = require('axios');
let errors = require('../../utils/errors');

const desc = {
    name: "ingredients",
    description: "Display cocktail possibilities with actual ingredient",
    params: []
};

function getNamesDrinks(drinks, qty) {
    let listDrinks = new Array;
    for (let i = 0; i < qty; ++i)
        if (drinks[i] != null)
            listDrinks.push(drinks[i].strDrink);
    return listDrinks;
}

function searchIngredients(req, res) {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + req.params.ingredient)
        .then(function(response) {
            res.status(200);
            if (response.data.drinks == null) {
                res.json({
                    valid: false
                });
            } else {
                res.json({
                    valid: true,
                    drinks: getNamesDrinks(response.data.drinks, req.params.qty)
                });
            }
        })
        .catch(function(error) {
            errors.badRequest(res, 400, "Error in cocktail request.");
        })
}

module.exports = {
    desc: desc,
    searchIngredients: searchIngredients
};