import * as React from 'react';
import NavListItem from './NavListItem'

export interface NavListProps {
    
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
            <div className="navsWrapper">
                <NavListItem
                    key={name}
                    name={name}
                />
            </div>
        ))
        return ( 
            <div className="topRight">
                {navList}
            </div>
        );
    }
}
 
export default NavList;