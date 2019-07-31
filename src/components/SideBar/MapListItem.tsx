import * as React from 'react';

export interface MapListItemProps {
    name: string,
    curMap: string,
    onChangeMap: Function
}

export interface MapListItemState {

}

class MapListItem extends React.Component<MapListItemProps, MapListItemState> {

    handleClick = () => {
        this.props.onChangeMap(this.props.name)
    }

    getClassName = (name: string) => {
        return name !== this.props.curMap ? "normal" : "curMap"
    }

    render() {
        const { name } = this.props
        return (
            <li
                onClick={this.handleClick}
                className={this.getClassName(name)}
            >
                <div>
                    Map {name}
                </div>
            </li>
        );
    }
}

export default MapListItem;