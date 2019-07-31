import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';

import '../assets/styles/sidebar.scss';
import InstanceList from '../components/SideBar/InstanceList';
import MapList from '../components/SideBar/MapList';
import { dispatchActions } from '../store/dispatch';
import { AppState } from '../store';


type SideBarProps = {

}

type SideBarState = {
    displayInstance: boolean,
    isLoading: boolean
}

const mapStateToProps = (state: AppState, ownProps: SideBarProps) => ({ ...state, ...ownProps })
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchActions>

class SideBar extends Component<Props, SideBarState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayInstance: true,
            isLoading: true,
        }
    }

    componentDidMount() {
        this.props.onLoadInstances()
        console.log(this.props)
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
                    instanceNameList={this.props.instances.list}
                    onChangeInstance={this.props.onChangeInstance}
                    changeSidebarView={this.changeSidebarView}
                />
            );
        } else {
            display = (
                <MapList
                    onLoadMaps={this.props.onLoadMaps}
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
    }
}

export default connect(mapStateToProps, dispatchActions)(SideBar);