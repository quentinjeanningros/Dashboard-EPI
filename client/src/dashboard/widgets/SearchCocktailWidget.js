import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/cocktail.svg'
import TextBox from '../TextBox.js'

class SearchCocktailWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name : "",
            recipe: []
        }
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.Search = this.Search.bind(this);
    }

    SetCocktailName(name) {
        this.setState({name: name})
    }

    SetRecipe(list) {
        this.setState({recipe: list});
    }

    Search(string) {
        if (string !== "")
            this.API.SearchCocktail(string, this)
        else {
            this.setState({name: ""})
            this.setState({recipe: []})
        }
    }

    render() {
        let i = 0
        const tabToDisp = this.state.recipe.map(elem => {
            return <h6 key={i++}>{elem}</h6>
        })
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Enter cocktail name</h2>
                    <TextBox color="#F1F2F3" name ="" mask={false} action={this.Search} />
                    <div className="ListInWidget">
                        <h4>{this.state.name}</h4>
                        {tabToDisp}
                    </div>
                    <h3 className="WidgetInfo">RECIPE</h3>
                </div>
            </div>
        )
    }
}

export default SearchCocktailWidget;