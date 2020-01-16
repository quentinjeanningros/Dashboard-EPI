import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Main.js';
import Login from './Log.js';
import Register from './Register.js';
import About from './About.js';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('IdentificationToken') ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname:'/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class Controller extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/about.json" component={About}/>
                    <Route exact path="/twitter/return" component={OAuth}/>
                    <PrivateRoute exact path="/" component={Home}/>
                </Switch>
            </Router>
        );
    }
}

class OAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        var url = new URL((window.location.href ))
        localStorage.setItem('TwitterToken', url.searchParams.get('oauth_token'))
        localStorage.setItem('TwitterVerifier', url.searchParams.get('oauth_verifier'))
        window.location.href = '/'
    }

    render() {
        return (
            <div/>
        )
    }
}

export default Controller;
