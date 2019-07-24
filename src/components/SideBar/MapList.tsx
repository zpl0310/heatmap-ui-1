import * as React from 'react';
import MapListItem from './MapListItem';
import '../../assets/styles/sidebar.scss';
//import back from '../assets/back.png';
declare var require: any
const back = require('../../assets/back1.svg') as string;

export interface MapListProps {
    curInstance: string,
    curMap:string,
    changeSidebarView: Function,
    onChangeMap: Function,
    onClearCurMap: Function,
}
 
export interface MapListState {
    mapNameList: string[]
}
 
class MapList extends React.Component<MapListProps, MapListState> {
    constructor(props: MapListProps) {
        super(props); 
        this.state = ({
            mapNameList: ["a's map","b's map","c's map"],
        })     
    }

    handleClick = () => {
        this.props.changeSidebarView()
        this.props.onClearCurMap()
    }
 
    render() { 
        const { mapNameList } = this.state
        const { curMap, curInstance } = this.props


        const mapList = mapNameList.map((name)=>(
            <MapListItem 
                key={name}
                name={name}
                curMap={curMap}
                onChangeMap={this.props.onChangeMap}
            />
        )) 
        return (
            <div> 
                <div className="backDiv">
                    <div className="backMidDiv">
                        <span className="backButton"><img src={back} alt="back" onClick={this.handleClick}/> </span>
                        <label className="curInstanceLabel">  {curInstance}</label>
                    </div>
                </div>
                <ul className="list">{mapList}</ul>
            </div>
        );
    }
}
 
export default MapList;