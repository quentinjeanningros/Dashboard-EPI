import React from 'react';
import '../css/DashboardPage.css'

class DashboardPage extends React.Component{
    constructor(props) {
        super(props);
        this.API = props.API
        this.pageName = "Dashboard"
    }

    render() {
        return (
            <div className="DashboardPage">
                <div className="Marging"/>
                <div className="WidgetList">
                    {this.props.array}
                </div>
                <div className="Marging"/>
            </div>
        )
    }
}

export default DashboardPage;