import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/pokemon.svg'
import TextBox from '../TextBox.js'

class PokemonPokedexWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            pokedexId: 0,
            type: "",
            sprite: ""
        }
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.Search = this.Search.bind(this);
    }

    setId(id) {
        this.setState({id: id})
    }

    setType(type) {
        this.setState({type: type})
    }

    setSprite(sprite) {
        this.setState({sprite: sprite})
    }

    Search(string) {
        if (string !== "")
            this.API.SearchPokedex(string, this)
        else {
            this.setState({pokedexId: 0})
            this.setState({type: ""})
        }
    }

    render() {
        const display = []
        if (this.state.id !== 0 && this.state.type !== "") {
            display.push(<h4 key={0}>Type: {this.state.type}</h4>)
            display.push(<h6 key={1}>Id: {this.state.id}</h6>)
            display.push(<img
                style={{width: 100, height: 100}}
                src={this.state.sprite}
                alt="sprite"
              />)
        }
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Enter Pokemon name</h2>
                    <TextBox color="#F1F2F3" name ="" mask={false} action={this.Search} />
                    <div className="ListInWidget">
                        {display}
                    </div>
                    <h3 className="WidgetInfo">POKEDEX</h3>
                </div>
            </div>
        )
    }
}

export default PokemonPokedexWidget;