import React from 'react';
import '../css/DashboardPage.css'
import icon from '../svg/widgetsIcons/reddit.svg'

class RedditWidget {
    constructor(subreddit) {
        this.state = {
            content: "‘It’s like nothing we have come across before’: UK intelligence officials shaken by Trump administration’s requests for help with counter-impeachment inquiry' ‘It’s like nothing we have come across before’: UK intelligence officials shaken by Trump administration’s requests for help with counter-impeachment inquiry'",
            votes: 2300,
            refreshTime: 5
        }
        this.mainColor = "#F7931E"
        this.subreddit = subreddit
        this.maxTextLen = 500
    }

    convertVoteInText(votes) {
        let n = votes
        let string = n.toString()

        if (this.state.votes > 1000) {
            n = votes / 1000
            let tmp = n.toString()
            string = tmp.substring(0, tmp.indexOf('.')) + "K"
        }
        if (this.state.votes > 1000000) {
            n = votes / 1000000
            let tmp = n.toString()
            string = tmp.substring(0, tmp.indexOf('.')) + "m"
        }
        if (this.state.votes > 1000000000) {
            n = votes / 1000000000
            let tmp = n.toString()
            string = tmp.substring(0, tmp.indexOf('.')) + "M"
        }
        return (string)
    }

    render() {
        let textToDisplay = this.state.content
        if (textToDisplay.length > this.maxTextLen)
            textToDisplay = this.state.content.substring(0,this.maxTextLen) + "..."
        let voteToDisplay = this.convertVoteInText(this.state.votes)
        return (
            <div className="Widget">
                <div className="WidgetIconContainer" style={{backgroundColor: this.mainColor}}>
                    <img className="WidgetIcon verticalCenterRelative" src={icon} alt="icon"/>
                </div>
                <div className="WidgetContainer">
                    <h2 className="WidgetTitle">{this.subreddit}</h2>
                    <p className="WidgetContent RedditContent">{textToDisplay}</p>
                    <h3 className="WidgetInfo">{voteToDisplay}</h3>
                </div>
            </div>
        )
    }
}

export default RedditWidget;