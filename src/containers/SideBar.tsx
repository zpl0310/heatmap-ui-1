import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';

import '../assets/styles/sidebar.scss';
import InstanceList from '../components/SideBar/InstanceList';
import MapList from '../components/SideBar/MapList';
import { dispatchActions } from '../store/dispatch';
import { AppState } from '../store';
//import { Instance, Map, MapImage } from '../definitions';

declare var require: any
const fetchLogo = require("../assets/fetchcore.svg") as string;

type SideBarProps = {

}

type SideBarState = {
    displayInstance: boolean,
}

const mapStateToProps = (state: AppState, ownProps: SideBarProps) => ({ ...state, ...ownProps })
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchActions>

class SideBar extends Component<Props, SideBarState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayInstance: true,
        }
    }

    //switch between instance list and map list
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
                    onChangeInstance={this.props.onChangeInstance}
                    changeSidebarView={this.changeSidebarView}
                />
            );
        } else {
            display = (
                <MapList
                    onChangeMap={this.props.onChangeMap}
                    onClearCurMap={this.props.onClearCurMap}
                    maps={this.props.maps}
                    curInstance={this.props.instances.current}
                    changeSidebarView={this.changeSidebarView}
                />
            )
        }
        return (
            <div className="sideBar">
                {display}
            </div>
        );
        // return (
        //     <div className="sideBar">
        //         <img src={fetchLogo} className="fetch-logo" alt="logo" />
        //         {display}
        //     </div>
        // );
    }
}

export default connect(mapStateToProps, dispatchActions)(SideBar);