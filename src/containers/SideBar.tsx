import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/sidebar.scss';
import InstanceList from '../components/SideBar/InstanceList';
import MapList from '../components/SideBar/MapList';
declare var require: any
const fetchLogo = require("../assets/fetchcore.svg") as string;

type SideBarProps = {
}

type SideBarState = {
    displayInstance: boolean,
}

class SideBar extends Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props);
        this.state = {
            displayInstance: true,
        }
    }

    changeSidebarView = () => {
        this.setState({
            displayInstance: !this.state.displayInstance,
        })
    }

    render() {
        let display = (<div />); 
        if (this.state.displayInstance) {
            display = (      
                <InstanceList 
                    changeSidebarView={this.changeSidebarView}
                />            
            );
        } else {
            display = (
                <MapList 
                    curInstance={"a"}
                    changeSidebarView={this.changeSidebarView}
                />
            )
        }
        return (
            <div>
                <img src={fetchLogo} className="fetch-logo" alt="logo" />
                {display}
            </div>
        );
    }
}

export default SideBar;