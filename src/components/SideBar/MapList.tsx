import * as React from 'react';
import MapListItem from './MapListItem';
//import back from '../assets/back.png';
declare var require: any
const back = require('../../assets/back1.svg') as string;

export interface MapListProps {
    curInstance: string,
    changeSidebarView: Function,
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
    }
    render() { 
        const { mapNameList } = this.state
        const { curInstance } = this.props
        const mapList = mapNameList.map((name)=>(
            <MapListItem 
                key={name}
                name = {name}
            />
        )) 
        return (
            <div> 
                <div>
                    <span><img src={back} alt="back" onClick={this.handleClick}/> </span>
                    <label>CURRENT INSTANSE IS: {curInstance}</label>
                </div>
                <ul>{mapList}</ul>
            </div>
        );
    }
}
 
export default MapList;