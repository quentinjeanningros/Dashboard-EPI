import React from 'react';
import './css/Controller.css'
import ButtonPannel from './ButtonPannel';
import Header from './Header';
import DashboardPage from './pages/DashboardPage.js'
import NewWidgetPage from './pages/NewWidgetPage.js'
import SettingPage from './pages/SettingPage.js'
import BackAPI from './BackAPI.js'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: 2,
            widgetsTab: [],
            idTab: []
        }
        this.token = localStorage.getItem('IdentificationToken')
        this.API = new BackAPI(this.token, this)
    }

    componentDidMount() {
        this.SetPage(2);
    }

    SetPage(Id) {
        this.setState({pageId: Id});
        this.API.GetWidgets()
    }

    sendWidgetsToPrint() {
        this.clearWidgetList()
    }

    addToWidgetList(widget, id) {
        const { idTab, widgetsTab } = this.state;
        idTab.push(id);
        widgetsTab.push(widget);
        this.setState({idTab: idTab, widgetsTab: widgetsTab});
    }

    clearWidgetList() {
        this.setState({idTab: []})
        this.setState({widgetsTab: []})
    }

    render() {
        let pageToDraw
        let pageName
        if (this.state.pageId === 1) {
            pageToDraw = <NewWidgetPage API={this.API}/>
            pageName = "Create"
        }
        else if (this.state.pageId === 2) {
            pageToDraw = <DashboardPage API={this.API} array={this.state.widgetsTab}/>
            pageName = "Dashboard"
        }
        else if (this.state.pageId === 3) {
            pageToDraw = <SettingPage API={this.API} array={this.state.idTab}/>
            pageName = "Setting"
        }
        return (
            <div className="backgroundSettings">
                <div className="CustomFixed">
                    <Header/>
                    <h1 className="PageTitle">{pageName}</h1>
                    <ButtonPannel parent={this} pageId={this.state.pageId}/>
                </div>
                {pageToDraw}
            </div>
        );
    }
}

export default Main;