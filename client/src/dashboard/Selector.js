import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.color = props.color
        this.tab = props.choices
        this.tabToDisplay = []
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let i = 0
        this.tab.forEach(element => {
            this.tabToDisplay.push(<option value={element} key={i}>{element}</option>)
            i += 1
        });
    }

    handleChange(event) {
        this.props.action(event.target.value)
    }

    render() {
        return (
            <div className="SelectorContainer">
                <select className="CustomSelector" style={{backgroundColor: this.color}} onChange = { this.handleChange }>
                    {this.tabToDisplay}
                </select>
            </div>
        );
    }
}

export default Selector;