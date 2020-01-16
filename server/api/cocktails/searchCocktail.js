let axios = require('axios');
let errors = require('../../utils/errors');

const desc = {
    name: "cocktail",
    description: "Display recipe and ingredients for a cocktail",
    params: []
};

function boringFunctionForIngredient(drink) {
    let recipes = new Array;
    for (let i = 1; i <= 15; ++i)
        if (drink['strIngredient' + i] != null) {
            if (drink['strMeasure' + i] == null)
                recipes.push(drink['strIngredient' + i] + ': As you want');
            else
                recipes.push(drink['strIngredient' + i] + ': ' + drink['strMeasure' + i]);
        }
    return recipes;
}

function searchCocktail(req, res) {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + req.params.cocktail)
        .then(function(response) {
            res.status(200);
            if (response.data.drinks == null) {
                res.json({
                    valid: false
                });
            } else {
                res.json({
                    valid: true,
                    name: response.data.drinks[0].strDrink,
                    instructions: response.data.drinks[0].strInstructions,
                    recipe: boringFunctionForIngredient(response.data.drinks[0])
                });
            }
        })
        .catch(function(error) {
            errors.badRequest(res, 400, "Error in cocktail request.");
        })
}

module.exports = {
    desc: desc,
    searchCocktail: searchCocktail
}