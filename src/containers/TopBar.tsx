import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';
import { dispatchActions } from '../store/dispatch';
import { AppState } from '../store';

import '../assets/styles/topbar.scss';
import NavList from '../components/TopBar/NavList';
import HeatMapItem from '../components/TopBar/HeatMapItem';
import CompareItem from '../components/TopBar/CompareItem';


const fetchLogo = require("../assets/fetchcore.svg") as string;

type OwnProps = {
    onNavChange: Function
    curNav: string
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({ ...state, ...ownProps })
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchActions>

class TopBar extends Component<Props, {}> {

    render() {
        const {curNav} = this.props
        let display=(<div className="topMid"/>)
        if (curNav==="Heatmap") {
            display = (            
                <HeatMapItem />           
            )
        } else if (curNav==="Compare") {
            display = (          
                <CompareItem />   
            )
        }

        let topbar = (<div className="topBar" />)
        if (this.props.maps.current!=="") {
            topbar = (
                <div className="topBarMid">
                    <div className="topLeft">
                        <label>Map {this.props.maps.current}</label>
                    </div>
                    {display}            
                    <NavList 
                        curNav={this.props.curNav}
                        onNavChange={this.props.onNavChange}
                    />           
                    <br className="clear" />
                </div>
            )
        }
        return (
            <div className="topBar">
                <img src={fetchLogo} className="fetch-logo" alt="logo" />
                {topbar}
            </div>
        );
    }
}

export default connect(mapStateToProps, dispatchActions)(TopBar);