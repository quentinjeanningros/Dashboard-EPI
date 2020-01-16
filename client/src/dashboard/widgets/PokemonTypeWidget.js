import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/pokemon.svg'
import TextBox from '../TextBox.js'

class PokemonTypeWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            strongAgainst: [],
            weakAgainst: []
        }
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.Search = this.Search.bind(this);
    }

    setStrongAgainst(list) {
        this.setState({strongAgainst: list})
    }

    setWeakAgainst(list) {
        this.setState({weakAgainst: list})
    }

    async Search(string) {
        if (string !== "")
            this.API.SearchPokemonType(string, this)
        else {
            this.setState({strongAgainst: []})
            this.setState({weakAgainst: []})
        }
    }

    render() {
        let i = 0
        const strongDisp = this.state.strongAgainst.map(elem => {
            return <h6 key={i++}>{elem}</h6>
        })
        i = 0
        const weakDisp = this.state.weakAgainst.map(elem => {
            return <h6 key={i++}>{elem}</h6>
        })
        const display = []
        if (this.state.strongAgainst.length !== 0 && this.state.weakAgainst.length !== 0) {
            display.push(<h4 className="TitleInWidget" key={0}>Strong against</h4>)
            display.push(<h4 className="TitleInWidget" key={1}>Weak against</h4>)
        }
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Enter Pokemon type</h2>
                    <TextBox color="#F1F2F3" name ="" mask={false} action={this.Search} />
                    {display[0]}
                    <div className="ListInWidget">
                        {strongDisp}
                    </div>
                    {display[1]}
                    <div className="ListInWidget">
                        {weakDisp}
                    </div>
                    <h3 className="WidgetInfo">POKEMON TYPES</h3>
                </div>
            </div>
        )
    }
}

export default PokemonTypeWidget;