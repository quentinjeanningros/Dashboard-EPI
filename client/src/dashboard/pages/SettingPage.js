import React from 'react';
import '../css/SettingPage.css'
import upIcon from '../svg/up.svg'
import downIcon from '../svg/down.svg'

class SettingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widgetsTab: props.array
        }
        this.API = props.API
        this.pageName = "Settings"
    }

    UpThisWidget(id) {
        const {widgetsTab} = this.state;
        if (id > 0) {
            var tmp = widgetsTab[id];
            widgetsTab[id] = widgetsTab[id - 1];
            widgetsTab[id - 1] = tmp;
            this.setState({widgetsTab: widgetsTab});
        }
    }

    DownThisWidget(id) {
        const {widgetsTab} = this.state;
        if (id < widgetsTab.length - 1) {
            var tmp = widgetsTab[id + 1];
            widgetsTab[id + 1] = widgetsTab[id];
            widgetsTab[id] = tmp;
            this.setState({widgetsTab: widgetsTab});
        }
    }

    removeThisWigdet(id) {
        const {widgetsTab} = this.state;
        for (let i = 0; widgetsTab.length; ++i) {
            if (widgetsTab[i].id === id) {
                widgetsTab.splice(i, 1)
                break
            }
        }
        this.setState({widgetsTab: widgetsTab});
    }

    render() {
        let tabToDisplay = []
        let i = 0
        if (this.state.widgetsTab !== undefined) {
            this.state.widgetsTab.forEach(element => {
                tabToDisplay.push(<SettingWidget widget={element} API={this.API} key={element.id} parent={this} id={i}/>);
                ++i
            });
        }
        return (
            <div className="DashboardPage">
                <div className="Marging"/>
                <div className="WidgetList">
                    {tabToDisplay}
                </div>
                <div className="Marging"/>
            </div>
        )
    }
}

class SettingWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: props.widget,
            mainInfo: ""
        }
        this.parent= props.parent
        this.API = props.API
    }

    Up() {
        this.API.WidgetUp(this.state.widget.id)
        this.parent.UpThisWidget(this.props.id)
    }

    Down() {
        this.API.WidgetDown(this.state.widget.id)
        this.parent.DownThisWidget(this.props.id)
    }

    deletMe() {
        this.parent.removeThisWigdet(this.state.widget.id)
        this.API.DeleteWidget(this.state.widget.id)
    }

    render() {
        return (
            <div className="SettingWidget">
                <div className="LittleBlockContainer">
                    <div  className="LittleBlock" style={{backgroundColor: this.state.widget.color}}/>
                    <img className="littleSettingIcon verticalCenterRelative" src={upIcon} alt="upIcon" onClick={() => {this.Up()}}/>
                    <img className="littleSettingIcon verticalCenterRelative" src={downIcon} alt="downIcon" onClick={() => {this.Down()}}/>
                </div>
                <h3 className="SettingInfo">{this.state.widget.config}</h3>
                <h3 className="DeletText" onClick={() => {this.deletMe()}}>
                    Delete
                </h3>
            </div>
        )
    }
}

export default SettingPage;