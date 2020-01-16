import React from 'react';
import './css/ButtonPannel.css'
import AddIcn from './svg/convert/Add.js'
import PannelIcn from './svg/convert/Pannel.js'
import SettingIcn from './svg/convert/Setting.js'

class ButtonPannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: props.parent,
            position: props.pageId
        }
        this.addButton = new ButtonPannelIcon(AddIcn, 1, this)
        this.pannelButton = new ButtonPannelIcon(PannelIcn, 2, this)
        this.settingButton = new ButtonPannelIcon(SettingIcn, 3, this)
    }

    IconClicked(itemId) {
        if (this.state.position !== itemId) {
            this.setState({position: itemId});
            this.addButton.setOff();
            this.pannelButton.setOff();
            this.settingButton.setOff();
            this.state.parent.SetPage(itemId);
        }
    }

    render() {
        let squareClass = "selectSquare verticalCenter position" + this.state.position.toString();
        if (this.state.position === 1)
            this.addButton.setOn();
        else if (this.state.position === 2)
            this.pannelButton.setOn();
        else if (this.state.position === 3)
            this.settingButton.setOn();
        return (
            <div className="pannel marging">
                <div className={squareClass}/>
                {this.addButton.render()}
                {this.pannelButton.render()}
                {this.settingButton.render()}
            </div>
        );
    }
}

class ButtonPannelIcon {
    constructor(icon, position, parent) {
        this.state = {
            active: false,
            icon: icon,
            position: position,
            parent: parent
        }
    }

    setOff() {
        this.state.active = false;
    }

    setOn() {
        this.state.active = true;
    }

    Clicked() {
        this.state.parent.IconClicked(this.state.position)
    }

    render() {
        let className = "pannelIcon verticalCenter position" + this.state.position.toString();
        if (this.state.active === true)
            className += " selected";
        else
            className += " unselected";
        return (
            <this.state.icon className={className} onClick={() => {this.Clicked()}}/>
        );
    }
}

export default ButtonPannel;