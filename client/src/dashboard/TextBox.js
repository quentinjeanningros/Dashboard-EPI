import React from 'react';

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            mask: props.mask
        }
        this.color = props.color
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.action(event.target.value)
    }

    render() {
        let type = "text";
        let display
        if (this.state.mask === true)
            type = "password"
        if (this.state.name !== "")
            display = <h2 className = "textBoxName" > { this.state.name } </h2>
        return (
            <div className = "textBoxContainer" >
                {display}
                <input className = "customTextBox" type = { type } onChange = { this.handleChange } autoComplete = "off" style={{backgroundColor: this.color}}/>
            </div>
        );
    }
}

export default TextBox;