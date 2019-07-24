import * as React from 'react';
import InstanceListItem from './InstanceListItem';
import SearchBox from './SearchBox';
import '../../assets/styles/sidebar.scss';
//import Divider from '@material-ui/core/Divider';

export interface InstanceListProps {
    changeSidebarView: Function
    onChangeInstance: Function
}
 
export interface InstanceListState {
    instanceNameList: string[],
    page: number,
    numPerPage: number,
    setPage: Function,
}

//need to be get from API
const defaultState = ({
    instanceNameList: ["Cool Instance","QA-latest","Cool Instance 3",
    "2nd floor","Arrow Warehouse","DHL Test Warehousr","Fetch testing",
    "Super Cool Instance","Cool Instance 4","Cool Instance 5","Cool Instance 6",
    "Cool Instance 7","Cool Instance 8","Cool Instance 9","Cool Instance 10"],
    page: 1,
    numPerPage: 10,
    setPage:()=>{},
})
 
class InstanceList extends React.Component<InstanceListProps, InstanceListState> {
    constructor(props: InstanceListProps) {
        super(props);
        this.state = {...defaultState}
    }

    // componentDidMount() {
    //     this.loadInstances()
    // }

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
                onChangeInstance={this.props.onChangeInstance}
                changeSidebarView={this.props.changeSidebarView}
            />
            
        ))

        return (
            <div>
                <div className="selectLabel">
                    <label>Select an instance</label>
                    <div className="searchBox">
                        <SearchBox 
                            handleInput={this.handleInput}
                        />
                    </div>
                </div>
                            
                <ul className="list">
                    {instanceList}
                </ul>  
            </div>                         
        );
    }
}
 
export default InstanceList;