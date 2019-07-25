import * as React from 'react';
import NavListItem from './NavListItem'

export interface NavListProps {
    curNav: string
    onNavChange: Function
}
 
export interface NavListState {
    itemNames: string[]
}
 
class NavList extends React.Component<NavListProps, NavListState> {
    constructor(props: NavListProps) {
        super(props); 
        this.state = ({
            itemNames: ["Heatmap","Compare","History"],
        })     
    }

    render() { 
        const { itemNames } = this.state
        const navList = itemNames.map((name) => (
            <div 
                className="navsWrapper"
                key={name}
            >
                <NavListItem 
                    curNav={this.props.curNav}
                    onNavChange={this.props.onNavChange}
                    name={name}
                />
            </div>
        ))
        return ( 
            <div className="topRight">
                <div className="topRightMid">
                    {navList}
                </div>
            </div>
        );
    }
}
 
export default NavList;