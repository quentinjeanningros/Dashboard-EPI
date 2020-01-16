import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/map.svg'

class MapWidget {
    constructor(city) {
        this.state = {
            distance: 5000,
            refreshTime: 5
        }
        this.address = "5 rue du Dôme, Strasbourg, France"
        this.mainColor = "#009245"
    }

    convertdistanceInText(distance) {
        let n = distance
        let string = n.toString()

        if (n > 1000) {
            n = distance / 1000
            string = n.toString() + " Km"
        }
        else {
            string = n.toString() + " m"
        }
        return (string)
    }

    render() {
        let distanceToDisplay = this.convertdistanceInText(this.state.distance)
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">You're at</h2>
                        <p className="WidgetContent MeteoContent">{distanceToDisplay}</p>
                    <h3 className="WidgetInfo">to {this.address}</h3>
                </div>
            </div>
        )
    }
}

export default MapWidget;