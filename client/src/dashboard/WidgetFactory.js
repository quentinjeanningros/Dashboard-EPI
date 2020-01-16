import React from 'react';
import IdWidget from './IdWidget.js'
//import RedditWidget from './widgets/RedditWidget.js';
import MeteoWidget from './widgets/MeteoWidget.js';
import ParkingWidget from './widgets/ParkingWidget.js';
import SearchIngredientsWidget from './widgets/SearchIngredientsWidget.js';
import SearchCocktailWidget from './widgets/SearchCocktailWidget.js';
import PokemonPokedexWidget from './widgets/PokemonPokedexWidget.js';
import PokemonTypeWidget from './widgets/PokemonTypeWidget.js';
//import SpotifyWidget from './widgets/SpotifyWidget.js';
//import MailWidget from './widgets/MailWidget.js';
//import CalendarWidget from './widgets/CalendarWidget.js';
//import MapWidget from './widgets/MapWidget.js';
//import YoutubeWidget from './widgets/YoutubeWidget.js';

class WidgetFactory {
    constructor(parent, API) {
        this.state = {
        }
        this.parent = parent
        this.API = API
    }

    Create(type, id, config, refresh) {
        if (type === "weather") {
            const color = "#29ABE2"
            this.parent.addToWidgetList(
            <MeteoWidget API={this.API} id={id} city={config} refresh={refresh} color={color} key={id}/>,
            new IdWidget(this.API, id, color, config))
        }
        else if (type === "parking") {
            const color = "#9933ff"
            this.parent.addToWidgetList(
            <ParkingWidget API={this.API} id={id} location={config} refresh={refresh} color={color} key={id}/>,
            new IdWidget(this.API, id, color, config))
        }
        else if (type === "ingredient") {
            const color = "#F7931E"
            this.parent.addToWidgetList(
            <SearchIngredientsWidget API={this.API} id={id} color={color} key={id}/>,
            new IdWidget(this.API, id, color, "Search by ingrédient"))
        }
        else if (type === "cocktail") {
            const color = "#F7931E"
            this.parent.addToWidgetList(
            <SearchCocktailWidget API={this.API} id={id} color={color} key={id}/>,
            new IdWidget(this.API, id, color, "Search cocktail"))
        }
        else if (type === "pokedex") {
            const color = "#FF0000"
            this.parent.addToWidgetList(
            <PokemonPokedexWidget API={this.API} id={id} color={color} key={id}/>,
            new IdWidget(this.API, id, color, "Pokedex"))
        }
        else if (type === "types") {
            const color = "#FF0000"
            this.parent.addToWidgetList(
            <PokemonTypeWidget API={this.API} id={id} color={color} key={id}/>,
            new IdWidget(this.API, id, color, "Search type"))
        }
    }
}

export default WidgetFactory;