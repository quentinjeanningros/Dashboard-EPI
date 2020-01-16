import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/meteo.svg'

class MeteoWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            temperature: 0,
            rain: 0,
            wind: 0
        }
        this.refreshTime = props.refresh
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.city = props.city
        this.interval = undefined
    }

    componentDidMount() {
        this.API.GetWeather(this.city, this)
        this.interval = setInterval(() => {this.API.GetWeather(this.city, this); }, this.refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    setTemp(temp) {
        this.setState({temperature: temp})
    }

    setHumidity(rain) {
        this.setState({rain: rain})
    }

    setWind(wind) {
        this.setState({wind: wind})
    }

    render() {
        let temperatureToDisplay = this.state.temperature + "°C"
        let infoToDisplay = "rain: " + this.state.rain + "%  wind: " + this.state.wind + "km/h"
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">{this.city}</h2>
                    <p className="WidgetContent MeteoContent">{temperatureToDisplay}</p>
                    <h3 className="WidgetInfo">{infoToDisplay}</h3>
                </div>
            </div>
        )
    }
}

export default MeteoWidget;