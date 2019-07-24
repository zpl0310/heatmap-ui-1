import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/topbar.scss';
import NavList from '../components/TopBar/NavList';
import HeatMapItem from '../components/TopBar/HeatMapItem';
import CompareItem from '../components/TopBar/CompareItem';

type TopBarProps = {
}

type TopBarState = {
    //need to get from redux store
    curMap: string
    curNav: string
}


class TopBar extends Component<TopBarProps, TopBarState> {
    constructor(props: TopBarProps) {
        super(props);
        this.state = {
            curMap: "Cool Map",
            curNav: "History",
        }
    }

    render() {
        const {curMap,curNav} = this.state
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
                    <label>{curMap}</label>
                </div>
                <br className="clear" />
                {display}
                
                <NavList />
                
                <br className="clear" />
            </div>
        );
    }
}

export default TopBar;