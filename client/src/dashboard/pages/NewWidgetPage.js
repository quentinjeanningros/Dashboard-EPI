import React from 'react';
import '../css/SettingPage.css'
import '../css/NewWidgetPage.css'
import TextBox from '../TextBox.js'
import Selector from '../Selector';

class NewWidgetPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.API = props.API
        this.pageName = "Create"
    }

    render() {
        let tabToDisplay = []
        tabToDisplay.push(<CreateWidgetMeteo API={this.API} key={1}/>)
        tabToDisplay.push(<CreateWidgetParking API={this.API} key={2}/>)
        tabToDisplay.push(<CreateSearchIngredients API={this.API} key={3}/>)
        tabToDisplay.push(<CreateSearchCocktail API={this.API} key={4}/>)
        tabToDisplay.push(<CreatePokemonPokedex API={this.API} key={5}/>)
        tabToDisplay.push(<CreatePokemonType API={this.API} key={6}/>)
        tabToDisplay.push(<CreateTwitter API={this.API} key={7}/>)
        return (
            <div className="DashboardPage">
                <div className="Marging"/>
                <div className="WidgetList">
                    {tabToDisplay}
                </div>
                <div className="Marging"/>
            </div>
        )
    }
}

class CreateWidgetMeteo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '',
            time: '1'
        }
        this.color= "#29ABE2"
        this.API = props.API
        this.Times = [1, 3, 5, 10]
        this.setTxt = this.setTxt.bind(this)
        this.setTime = this.setTime.bind(this)
    }

    async setTxt(string) {
        await this.setState({txt: string})
    }

    async setTime(string) {
        await this.setState({time: string})
    }

    createAction() {
        this.API.CreateWidget("weather" ,this.state.txt, this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div className="InfoContainer">
                    <h3 className="SettingInfo">Meteo Location</h3>
                    <TextBox color="#F1F2F3" name = "" mask= { false } action={this.setTxt} />
                    <div className="TimeContainer">
                        <h3 className="SettingInfo TxtTime">Refresh time</h3>
                        <div className="TimeSelectorContainer">
                            <Selector color="#F1F2F3" choices={this.Times} action={this.setTime}/>
                        </div>
                    </div>
                </div>
                <div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
                </div>
            </div>
        )
    }
}

class CreateWidgetParking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: 'select',
            time: '1'
        }
        this.color= "#9933ff"
        this.API = props.API
        this.setTxt = this.setTxt.bind(this)
        this.setTime = this.setTime.bind(this)
        this.Times = [1, 3, 5, 10]
        this.choices = ['select', 'zenith', 'bateliers', 'broglie', 'baggersee', 'ducs',
                        'elsau', 'rotonde', 'gare', 'aurelie', 'wodli', 'gutemberg',
                        'kleber', 'marais', 'sebastopol', 'robertsau', 'meinau', 'petite',
                        'aar', 'nicolas', 'tanneurs', 'austerlitz', 'wilson', 'rivetoile',
                        'hoenheim', 'poteries', 'europeen', 'esplanade', 'hautepierre']
    }

    async setTxt(string) {
        await this.setState({txt: string})
    }

    async setTime(string) {
        await this.setState({time: string})
    }

    createAction() {
        this.API.CreateWidget("parking" ,this.state.txt, this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div className="InfoContainer">
                    <h3 className="SettingInfo">Parking</h3>
                    <Selector color="#F1F2F3" choices={this.choices} action={this.setTxt}/>
                    <div className="TimeContainer">
                        <h3 className="SettingInfo TxtTime">Refresh time</h3>
                        <div className="TimeSelectorContainer">
                            <Selector color="#F1F2F3" choices={this.Times} action={this.setTime}/>
                        </div>
                    </div>
                </div>
                <div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
                </div>
            </div>
        )
    }
}

class CreateSearchIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '1'
        }
        this.color= "#F7931E"
        this.API = props.API
    }

    createAction() {
        this.API.CreateWidget("ingredient" , "ok", this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div>
                    <h3 className="SettingInfo">Search cocktail by ingredient</h3>
                </div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
            </div>
        )
    }
}

class CreateSearchCocktail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '1'
        }
        this.color= "#F7931E"
        this.API = props.API
    }

    createAction() {
        this.API.CreateWidget("cocktail" , "ok", this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div>
                    <h3 className="SettingInfo">Search cocktail recipe</h3>
                </div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
            </div>
        )
    }
}

class CreatePokemonPokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '1'
        }
        this.color= "#FF0000"
        this.API = props.API
    }

    createAction() {
        this.API.CreateWidget("pokedex", "ok", this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div>
                    <h3 className="SettingInfo">Search pokemon</h3>
                </div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
            </div>
        )
    }
}

class CreatePokemonType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '1'
        }
        this.color= "#FF0000"
        this.API = props.API
    }

    createAction() {
        this.API.CreateWidget("types", "ok", this.state.time)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                <div>
                    <h3 className="SettingInfo">Search pokemon type affinity</h3>
                </div>
                <h3 className="CreateText" onClick={() => {this.createAction()}}>
                    Create
                </h3>
            </div>
        )
    }
}

class CreateTwitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '1'
        }
        this.color= "#0099ff"
        this.API = props.API
    }

    createAction() {
    }

    loginAction() {
        window.location.href = 'http://localhost:5000/twitter/login'
    }

    render() {
        let disp = []
        if (localStorage.getItem('TwitterToken') && localStorage.getItem('TwitterVerifier')) {
            disp.push(<div key={1}><h3 className="SettingInfo">Twitter</h3></div>)
            disp.push(<h3 className="CreateText" onClick={() => {this.createAction()}} key={2}>Create</h3>)
        }
        else {
            disp.push(<div className="LoginButtonCreate" style={{backgroundColor: this.color}} onClick={() => {this.loginAction()}}>
                <h4 className="verticalCenterRelative">Log to Twitter</h4>
                </div>)
        }
        return (
            <div className="SettingWidget">
                <div  className="LittleBlock" style={{backgroundColor: this.color}}/>
                {disp}
            </div>
        )
    }
}

export default NewWidgetPage;