import axios from 'axios';
import WidgetFactory from './WidgetFactory.js';

class BackAPI {
    constructor(token, parent) {
        this.parent = parent
        this.Factory = new WidgetFactory(this.parent, this)
        this.token = token
    }

    Register(username, password) {
        const body = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/users', body)
            .then(res => {
                window.location.href = '/login'
            })
            .catch(res => {
            })
    }

    Login(username, password) {
        const body = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5000/login', body)
            .then(res => {
                const response = res.data;
                localStorage.setItem('IdentificationToken', response.token);
                localStorage.setItem('Username', username);
                window.location.href = '/'
            })
            .catch(res => {
            })
    }

    CreateWidget(type, config, time) {
        if (config === "")
            return
        let refresh = 5 * 1000
        if (time !== "" && !isNaN(time))
            refresh = parseInt(time) * 1000
        const body = {
            type: type,
            config: config,
            refresh: refresh
        }
        const headers = {headers: {Authorization: this.token}}
        axios.post('http://localhost:5000/widget/create', body, headers)
            .then(res => {
            })
            .catch(res => {
            })
    }

    GetWidgets() {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/widgets', headers)
            .then(res => {
                this.parent.sendWidgetsToPrint()
                const response = res.data;
                for (let i = 0; i < response.length; ++i)
                    this.Factory.Create(response[i].type, response[i].id, response[i].config, response[i].refresh)
            })
            .catch(res => {
            })
    }

    DeleteWidget(id) {
        const body = {
            widget_id: id
        }
        const headers = {headers: {Authorization: this.token}}
        axios.post('http://localhost:5000/widget/delete', body, headers)
            .then(res => {
            })
            .catch(res => {
            })
    }

    GetWeather(city, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/weather/' + city, headers)
            .then(async res => {
                const response = res.data;
                parent.setTemp(response.temp.temp)
                parent.setHumidity(response.atmosphere.humidity)
                parent.setWind(response.wind.wind_speed)
            })
            .catch(res => {
            })
    }

    GetParkingSlots(location, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/parking/' + location, headers)
            .then(async res => {
                const response = res.data;
                parent.setFreeSlots(response.empty)
            })
            .catch(res => {
            })
    }

    SearchCocktailByIng(ing, quantity, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/cocktail/searchIngredients/' + ing + '/' + quantity, headers)
            .then(async res => {
                const response = res.data;
                if (response.valid === true)
                    parent.SetCocktailList(response.drinks)
            })
            .catch(res => {
            })
    }

    SearchCocktail(name, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/cocktail/searchCocktail/' + name, headers)
            .then(async res => {
                const response = res.data;
                if (response.valid === true) {
                    parent.SetCocktailName(response.name)
                    parent.SetRecipe(response.recipe)
                }
            })
            .catch(res => {
            })
    }

    SearchPokedex(name, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/pokemon/pokedex/' + name, headers)
            .then(async res => {
                const response = res.data;
                console.log(response)
                if (response.valid === true) {
                    parent.setId(response.id)
                    parent.setType(response.type)
                    parent.setSprite(response.sprite)
                }
            })
            .catch(res => {
            })
    }

    SearchPokemonType(name, parent) {
        const headers = {headers: {Authorization: this.token}}
        axios.get('http://localhost:5000/pokemon/types/' + name, headers)
            .then(async res => {
                const response = res.data;
                if (response.valid === true) {
                    parent.setWeakAgainst(response.double_damage_from)
                    parent.setStrongAgainst(response.double_damage_to)
                }
            })
            .catch(res => {
            })
    }

    WidgetUp(id) {
        const body = {
            widget_id: id
        }
        const headers = {headers: {Authorization: this.token}}
        axios.post('http://localhost:5000/widget/up', body, headers)
            .then(res => {
            })
            .catch(res => {
            })
    }

    WidgetDown(id) {
        const body = {
            widget_id: id
        }
        const headers = {headers: {Authorization: this.token}}
        axios.post('http://localhost:5000/widget/down', body, headers)
            .then(res => {
            })
            .catch(res => {
            })
    }
}

export default BackAPI;