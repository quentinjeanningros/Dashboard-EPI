import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/cocktail.svg'
import TextBox from '../TextBox.js'

class SearchIngredientsWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cocktailList: []
        }
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.Search = this.Search.bind(this);
        this.maxValue = 10
    }

    SetCocktailList(list) {
        this.setState({cocktailList: list});
    }

    async Search(string) {
        if (string !== "")
            this.API.SearchCocktailByIng(string, this.maxValue, this)
        else
            this.setState({cocktailList: []})
    }

    render() {
        let i = 0
        const tabToDisp = this.state.cocktailList.map(elem => {
            return <h6 key={i++}>{elem}</h6>
        })
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Enter an ingredient</h2>
                    <TextBox color="#F1F2F3" name ="" mask={false} action={this.Search} />
                    <div className="ListInWidget">
                        {tabToDisp}
                    </div>
                    <h3 className="WidgetInfo">TOP {this.maxValue}</h3>
                </div>
            </div>
        )
    }
}

export default SearchIngredientsWidget;