import * as React from 'react';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export interface SearchBoxProps {
    handleInput: Function
}
 
export interface SearchBoxState {
    input: string
}
 
class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            input: "",
        }
    }
    handleInputChange = (value: string) => {
        this.setState({ input: value });
        this.props.handleInput(value);
        console.log(this.state.input)
    }
    render() { 
        return (  
            <Paper className="root">
                <InputBase
                    className="input"
                    placeholder="Search..."
                    inputProps={{ "aria-label": "Search..." }}
                    onChange={e => this.handleInputChange(e.currentTarget.value)}
                />
                <IconButton className="iconButton" aria-label="Search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }
}
 
export default SearchBox;