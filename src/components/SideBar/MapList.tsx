import * as React from 'react';
import MapListItem from './MapListItem';
import '../../assets/styles/sidebar.scss';
import { MapInfo } from '../../definitions';
//import back from '../assets/back.png';
declare var require: any
const back = require('../../assets/back1.svg') as string;

export interface MapListProps {
    curInstance: string,
    curMap: string,
    changeSidebarView: Function,
    onChangeMap: Function,
    onClearCurMap: Function,
    mapList: MapInfo[]
}

export interface MapListState {
}

class MapList extends React.Component<MapListProps, MapListState> {
    handleClick = () => {
        this.props.changeSidebarView()
        this.props.onClearCurMap()
    }

    render() {
        const { curMap, curInstance } = this.props
        const mapList = this.props.mapList.map((map) => (
            <MapListItem
                key={map.id}
                name={map.name}
                curMap={curMap}
                onChangeMap={this.props.onChangeMap}
            />
        ))
        
        return (
            <div>
                <div className="backDiv">
                    <div className="backMidDiv">
                        <span className="backButton"><img src={back} alt="back" onClick={this.handleClick} /> </span>
                        <label className="curInstanceLabel">{curInstance}</label>
                    </div>
                </div>
                <ul className="list">{mapList}</ul>
            </div>
        );
    }
}

export default MapList;