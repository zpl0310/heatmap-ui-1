import * as React from 'react';
import InstanceListItem from './InstanceListItem';
import SearchBox from './SearchBox';
import '../../assets/styles/sidebar.scss';
import { Instance } from '../../definitions/index'

export interface InstanceListProps {
    changeSidebarView: Function
    onChangeInstance: Function
    instanceNameList: Instance[],
}

export interface InstanceListState {
    curNameList: Instance[],
    // page: number,
    // numPerPage: number,
    // setPage: Function,
}

//need to be get from API
// const defaultState = ({
//     instanceNameList: ["Cool Instance", "QA-latest", "Cool Instance 3",
//         "2nd floor", "Arrow Warehouse", "DHL Test Warehousr", "Fetch testing",
//         "Super Cool Instance", "Cool Instance 4", "Cool Instance 5", "Cool Instance 6",
//         "Cool Instance 7", "Cool Instance 8", "Cool Instance 9", "Cool Instance 10"],
//     page: 1,
//     numPerPage: 10,
//     setPage: () => { },
// })

class InstanceList extends React.Component<InstanceListProps, InstanceListState> {
    constructor(props: InstanceListProps) {
        super(props);
        this.state = {
            curNameList: this.props.instanceNameList
        }
    }

    handleInput = (input: string) => {
        const newNameList = this.props.instanceNameList.filter(
            ins => {
                return ins.name.toLowerCase().startsWith(input.toLowerCase());
            }
        );
        this.setState({
            curNameList: newNameList
        })
    }

    render() {
        const { curNameList } = this.state


        const instanceList = curNameList.map((ins) => (
            <InstanceListItem
                key={ins.name}
                name={ins.name}
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
                            //handleInput={()=>{}}
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