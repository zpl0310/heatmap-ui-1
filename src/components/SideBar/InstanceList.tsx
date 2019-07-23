import * as React from 'react';
import InstanceListItem from './InstanceListItem';
import SearchBox from './SearchBox';

export interface InstanceListProps {
    changeSidebarView: Function
}
 
export interface InstanceListState {
    instanceNameList: string[]
}

//need to be get from API
const defaultState = ({
    instanceNameList: ["a","b","c"],
})
 
class InstanceList extends React.Component<InstanceListProps, InstanceListState> {
    constructor(props: InstanceListProps) {
        super(props);
        this.state = {...defaultState}
    }

    handleInput = (input: string) => {
        const newNameList = defaultState.instanceNameList.filter(
            name => {
            return name.toLowerCase().includes(input.toLowerCase());
            }
        );  
        this.setState({
            instanceNameList: newNameList
        })  
    }
    
    render() { 
        const { instanceNameList } = this.state

        
        const instanceList = instanceNameList.map((name)=>(
            <InstanceListItem
                key={name}
                name={name}
                changeSidebarView={this.props.changeSidebarView}
            />
        ))
        return (
            <div>
                <label>Select an instance</label>
                <SearchBox 
                    handleInput={this.handleInput}
                />            
                <ul>
                    {instanceList}
                </ul>  
            </div>                         
        );
    }
}
 
export default InstanceList;