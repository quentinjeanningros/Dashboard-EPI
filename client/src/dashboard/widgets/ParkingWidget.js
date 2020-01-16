import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/parking.svg'

class ParkingWidget extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            FreeSlots: 0
        }
        this.refreshTime = props.refresh
        this.API = props.API
        this.id = props.id
        this.mainColor = props.color
        this.location = props.location
        this.interval = undefined
    }

    componentDidMount() {
        this.API.GetParkingSlots(this.location, this)
        this.interval = setInterval(() => {this.API.GetParkingSlots(this.location, this); }, this.refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    setFreeSlots(nbr) {
        this.setState({FreeSlots: nbr})
    }

    render() {
        let toDisplay
        if (this.state.FreeSlots > 1)
            toDisplay = " Slots"
        else
            toDisplay = " Slot"
        return (
            <div className="Widget" key={this.id}>
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">{this.props.location}</h2>
                    <p className="WidgetContent MeteoContent">{this.state.FreeSlots}<span className="MailNbr">{toDisplay}</span></p>
                    <h3 className="WidgetInfo">Strasbourg parking</h3>
                </div>
            </div>
        )
    }
}

export default ParkingWidget;