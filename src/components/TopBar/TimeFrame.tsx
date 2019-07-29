import * as React from 'react'


export interface TimeFrameProps {
    label: string,
    selection: string[],
}
 
export interface TimeFrameState {
    curInterval: string
    show: boolean
}
 
class TimeFrame extends React.Component<TimeFrameProps, TimeFrameState> {
    constructor(props: TimeFrameProps) {
        super(props);
        this.state = {
            curInterval: this.props.selection[0],
            show: false,
        }
    }

    handleBtnClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handleLiClick = (s:string) => {
        this.setState ({
            show: !this.state.show,
            curInterval: s
        })
    }


    render() { 
        const { show, curInterval } = this.state
        const { selection, label } = this.props


        const list = selection.filter(num => {return num !== curInterval}).map((num)=>(
            <li 
                onClick={()=> this.handleLiClick(num)}
                key={num}
            > 
                {num} {num==='1'? 'Month':'Months'} 
            </li>
        ))

        let display = (<div />)

        if (show) {
            display = (
                <div>
                    <ul className="frameList">
                        {list}
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <div className="frameLabel">
                    <label> {label} </label>
                </div>
                <button 
                    className="frameBtn"
                    onClick={this.handleBtnClick}>{curInterval}<span> </span>
                     {curInterval==='1'? 'Month':'Months'}</button>
                {display}
            </div>
        );
    }
}
 
export default TimeFrame;