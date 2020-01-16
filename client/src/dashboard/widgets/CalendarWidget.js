import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/calendar.svg'

class CalendarWidget {
    constructor(city) {
        this.state = {
            object: "FolowUp D303",
            type: "EPITECH",
            refreshTime: 5
        }
        this.address = "quentin.jeanningros@epitech.eu"
        this.mainColor = "#2684FE"
    }

    render() {
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Next activity</h2>
                        <p className="WidgetContent CalendarContent">{this.state.object}</p>
                    <h3 className="WidgetInfo">type: {this.state.type}</h3>
                </div>
            </div>
        )
    }
}

export default CalendarWidget;