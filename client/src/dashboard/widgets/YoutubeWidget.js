import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/youtube.svg'

class YoutubeWidget {
    constructor(city) {
        this.state = {
            subscribers: 500,
            lastVideo : "1 hour",
            refreshTime: 5
        }
        this.mainColor = "#FF0000"
        this.channelName = "Wankil Studio - Laink et Terracid"
    }

    render() {
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">{this.channelName}</h2>
                    <p className="WidgetContent MailContent"> <span className="MailNbr">{this.state.subscribers}</span> subscribers</p>
                    <h3 className="WidgetInfo">last video: {this.state.lastVideo} ago</h3>
                </div>
            </div>
        )
    }
}

export default YoutubeWidget;