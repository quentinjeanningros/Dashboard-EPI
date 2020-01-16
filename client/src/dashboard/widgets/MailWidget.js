import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/mail.svg'

class MailWidget {
    constructor(city) {
        this.state = {
            mailNbr: 5,
            box:  "professionnal",
            refreshTime: 5
        }
        this.address = "quentin.jeanningros@gmail.fr"
        this.mainColor = "#C1272D"
    }

    render() {
        let mailNbrToDisplay
        if (this.state.mailNbr > 0)
            mailNbrToDisplay = this.state.mailNbr + " Mails"
        else
            mailNbrToDisplay = this.state.mailNbr + " Mail"
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">{this.address}</h2>
                        <p className="WidgetContent MailContent"> <span className="MailNbr">{mailNbrToDisplay}</span> receive today</p>
                    <h3 className="WidgetInfo">in {this.state.box}</h3>
                </div>
            </div>
        )
    }
}

export default MailWidget;