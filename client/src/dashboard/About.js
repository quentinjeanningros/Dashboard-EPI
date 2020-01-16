import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            about: "not loaded"
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/about.json')
            .then(res => {
                console.log(res.data)
                this.setState({about: JSON.stringify(res.data)})
            })
            .catch(res => {
            })
    }

    render() {
        return (
            <div>
                {this.state.about}
            </div>
        );
    }
}
export default Login;