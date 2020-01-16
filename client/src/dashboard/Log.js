import React from 'react';
import logo from './svg/logo.svg'
import BackAPI from './BackAPI.js'
import TextBox from './TextBox.js'
import './css/Controller.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.backAPI = new BackAPI()
        this.setUserName = this.setUserName.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.usernameBox = < TextBox color="#FFFFFF" name = "Username" mask = { false } action = { this.setUserName } />
        this.passwordBox = < TextBox color="#FFFFFF" name = "Password" mask = { true } action = { this.setPassword } />
    }

    async setUserName(string) {
        await this.setState({ username: string })
    }

    async setPassword(string) {
        await this.setState({ password: string })
    }

    WantLogin() {
        if (this.state.username !== '' && this.state.password !== '')
            this.backAPI.Login(this.state.username, this.state.password)
    }

    GoCreatePage() {
        window.location.href = '/register'
    }

    render() {
        let buttonClass = "LoginButton "
        if (this.state.username !== '' && this.state.password !== '')
            buttonClass += "readyButton"
        else
            buttonClass += "notReadyButton"
        return (
        <div className = "backgroundSettings horizontalCenter" >
            <img className = "bigLogo" src = { logo } alt = "logo" />
            <div className = "containerLogInfo" > { this.usernameBox } { this.passwordBox } </div>
            <div className = "buttonContainer horizontalCenterRelative" >
                <div className = { buttonClass } onClick = {() => { this.WantLogin() } } >
                <h3 className = "textButtonLogin verticalCenterRelative" > Login </h3>
            </div>
                <div className = "createButton" >
                     <h3 className = "verticalCenterRelative" onClick = {() => { this.GoCreatePage() } } >
                        Create profile
                    </h3>
                </div>
            </div>
        </div>
        );
    }
}
export default Login;