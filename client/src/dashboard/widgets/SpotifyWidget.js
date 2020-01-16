import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/spotify.svg'

class SpotifyWidget {
    constructor() {
        this.state = {
            music: "Full Moon",
            artist:  "Saib",
            device:  "DESKTOP",
            refreshTime: 5
        }
        this.profile = "quentin.jeannigros"
        this.mainColor = "#39B54A"
    }

    render() {
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">Now playing</h2>
                        <p className="WidgetContent SpotifyContent">{this.state.music} <span className="SpotifyBy">by</span> {this.state.artist}</p>
                    <h3 className="WidgetInfo">{this.state.device}</h3>
                </div>
            </div>
        )
    }
}

export default SpotifyWidget;