import React from 'react';
import './css/Header.css'
import logo from './svg/logo.svg'
import logout from './svg/logout.svg'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.username = localStorage.getItem('Username')
    }

    Logout() {
        localStorage.removeItem('IdentificationToken');
        localStorage.removeItem('Username');
        window.location.reload();
    }

    render() {
        let nameToDisplay = this.username
        if (nameToDisplay === undefined && nameToDisplay.length > 10)
            nameToDisplay = this.state.username.substring(0,8) + "..."
        return (
            <header className="header">
                <div className="container">
                    <img className="appLogo verticalCenterRelative" src={logo} alt="logo"/>
                    <h4 className="smallGreyText verticalCenterRelative">Hello,  <span className="nameText">{nameToDisplay}</span></h4>
                    <img className="logout verticalCenterRelative" src={logout} alt="logout" onClick={() => {this.Logout()}}/>
                </div>
            </header>
        )
    }
}

export default Header;
