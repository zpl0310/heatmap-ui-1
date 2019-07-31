import * as React from 'react';
import MapListItem from './MapListItem';
import '../../assets/styles/sidebar.scss';
import { MapStoreState } from '../../actions/maps';
import Spinner from '../common/Spinner'
declare var require: any
const back = require('../../assets/back1.svg') as string;

export interface MapListProps {
    curInstance: string,
    changeSidebarView: Function,
    onChangeMap: Function,
    onClearCurMap: Function,
    onLoadMaps: Function,
    maps: MapStoreState
}

export interface MapListState {
}

class MapList extends React.Component<MapListProps, MapListState> {

    handleClick = () => {
        this.props.changeSidebarView()
        this.props.onClearCurMap()
    }

    componentWillMount() {
        this.props.onLoadMaps(this.props.curInstance)
    }

    render() {
        console.log(this.props)
        // const maps=["a map","cool map","really cool map"]
        // const mapList = maps.map((map)=> (
        //     <MapListItem
        //         key={map}
        //         name={map}
        //         curMap={this.props.maps.current}
        //         onChangeMap={this.props.onChangeMap}
        //     />
        // ))
        const mapList = this.props.maps.list.map((map) => (
            <MapListItem
                key={map.id}
                name={map.name}
                curMap={this.props.maps.current}
                onChangeMap={this.props.onChangeMap}
            />
        ))

        return (
            <div>
                <div className="backDiv">
                    <div className="backMidDiv">
                        <span className="backButton"><img src={back} alt="back" onClick={this.handleClick} /> </span>
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