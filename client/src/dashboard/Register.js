import React from 'react'
import logo from './svg/logo.svg'
import TextBox from './TextBox.js'
import BackAPI from './BackAPI.js'
import './Log.js'
import './css/Controller.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.backAPI = new BackAPI()
        this.setUserName = this.setUserName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.usernameBox = < TextBox color="#FFFFFF" name = "Username" mask = { false } action = { this.setUserName }/>
        this.passwordBox = < TextBox color="#FFFFFF" name = "Password" mask = { true } action = { this.setPassword }/>
        this.confirmPasswordBox = < TextBox color="#FFFFFF" name = "Confirm password" mask = { true } action = { this.setConfirmPassword }/>
    }

    async setUserName(string) {
        await this.setState({ username: string })
    }

    async setPassword(string) {
        await this.setState({ password: string })
    }

    async setConfirmPassword(string) {
        await this.setState({ confirmPassword: string })
    }

    WantCreateAccount() {
        if (this.state.username !== '' && this.state.password !== '' && this.state.password === this.state.confirmPassword)
            this.backAPI.Register(this.state.username, this.state.password)
    }

    GoLoginPage() {
        window.location.href = '/login'
    }

    render() {
        let buttonClass = "LoginButton "
        if (this.state.username !== '' && this.state.password !== '' && this.state.password === this.state.confirmPassword)
            buttonClass += "readyButton"
        else
            buttonClass += "notReadyButton"
        return (
        <div className = "backgroundSettings horizontalCenter" >
            <img className = "bigLogo" src = { logo } alt = "logo" />
                <div className = "containerLogInfo" >
                    < TextBox name = "Username" mask = { false } action = { this.setUserName }/>
                    { this.passwordBox }
                    { this.confirmPasswordBox }
                </div>
                    <div className = "buttonContainer horizontalCenterRelative" >
                        <div className = { buttonClass } onClick = {() => { this.WantCreateAccount() } } >
                            <h3 className = "textButtonLogin verticalCenterRelative" > Create </h3>
                        </div>
                        <div className = "createButton" >
                        <h3 className = "verticalCenterRelative" onClick = {() => { this.GoLoginPage() } } >Login </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;