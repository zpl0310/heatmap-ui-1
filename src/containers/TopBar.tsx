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
    curNav: string
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
        }
    }

    render() {
        const {curNav} = this.state
        let display = (
            <div className="topMid"> 
                <CompareItem />
            </div>
        )
        // let display=(<div className="topMid"/>)
        // if (curNav==="Heatmap") {
        //     display = (
        //         <div className="topMid">         
        //             <HeatMapItem />
        //         </div>
        //     )
        // } else if (curNav==="CompareMap") {
        //     display = (
        //         <div className="topMid"> 
        //             <CompareItem />
        //         </div>
        //     )
        // }
        return (
            <div className="topBar">
                <div className="topLeft">
                    <label>{this.props.maps.current}</label>
                </div>
                <br className="clear" />
                {display}
                
                <NavList />
                
                <br className="clear" />
            </div>
        );
    }
}

export default connect(mapStateToProps, dispatchActions)(TopBar);