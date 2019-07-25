import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';

import '../assets/styles/topbar.scss';
import NavList from '../components/TopBar/NavList';
import HeatMapItem from '../components/TopBar/HeatMapItem';
import CompareItem from '../components/TopBar/CompareItem';
import { dispatchActions } from '../store/dispatch';
import { AppState } from '../store';

type TopBarProps = {
}

type TopBarState = {
    //need to get from redux store
    curNav: string,
    disabled: boolean,
}

export interface OwnProps {
    
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({ ...state, ...ownProps })
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchActions>

class TopBar extends Component<Props, TopBarState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            curNav: "History",
            disabled: true,
        }
    }

    onNavChange = (s: string) => {
        this.setState({
            curNav: s
        })
        console.log(this.state.curNav)
    }

    render() {
        const {curNav} = this.state
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
                        <label>{this.props.maps.current}</label>
                    </div>
                    {display}            
                    <NavList 
                        curNav={this.state.curNav}
                        onNavChange={this.onNavChange}
                    />           
                    <br className="clear" />
                </div>
            )
        }
        return (
            <div className="topBar">
                {topbar}
            </div>
        );
    }
}

export default connect(mapStateToProps, dispatchActions)(TopBar);