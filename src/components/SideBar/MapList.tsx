import * as React from 'react';
import MapListItem from './MapListItem';
import '../../assets/styles/sidebar.scss';
import { MapStoreState } from '../../actions/maps';
import Spinner from '../common/Spinner'
//declare var require: any
//const back = require('../../assets/back1.svg') as string;

export interface MapListProps {
    curInstance: string,
    changeSidebarView: Function,
    onChangeMap: Function,
    onClearCurMap: Function,
    onLoadMaps: Function,
    maps: MapStoreState
    onNavChange: Function,
}

class MapList extends React.Component<MapListProps, {}> {

    handleClick = () => {
        this.props.changeSidebarView()
        this.props.onClearCurMap()
        this.props.onNavChange("")
    }

    componentWillMount() {
        this.props.onLoadMaps(this.props.curInstance)
    }

    render() {
        console.log(this.props)

        const mapList = this.props.maps.list.map((map) => (
            <MapListItem
                key={map.id}
                name={map.id}
                curMap={this.props.maps.current}
                onChangeMap={this.props.onChangeMap}
            />
        ))

        return (
            <div>
                <div className="backDiv">
                    <div className="backMidDiv">
                        {/* <span className="backButton"><img src={back} alt="back" onClick={this.handleClick} /> </span> */}
                        <span className="backButton" >
                            <svg width="20" height="25" viewBox="0 0 1792 1792" 
                            onClick={this.handleClick}
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                            className="button" 
                            d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z"/>
                            </svg>
                        </span>
                        <label className="curInstanceLabel">{this.props.curInstance}</label>
                    </div>
                </div>
                {this.props.maps.loading ?
                    <Spinner /> :
                    <ul className="list">{mapList}</ul>
                }
            </div>
        );
    }
}

export default MapList;