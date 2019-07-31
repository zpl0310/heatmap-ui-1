import React from 'react';
import SideBar from './containers/SideBar';
import TopBar from './containers/TopBar';
import LiveMap from './containers/LiveMap'
import HistoryChart from './containers/HistoryChart';
import ComparisonMap from './containers/ComparisonMap';
import './App.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store';
import thunk from 'redux-thunk'
import logger from 'redux-logger';


const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

type AppState = {
  curNav: string,
  disabled: boolean,
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
        curNav: "",
        disabled: true,
    }
  }

  onNavChange = (s: string) => {
    this.setState({
        curNav: s
    })
    console.log(this.state.curNav)
  }

  render() {
    const { curNav } = this.state
    //consider to use react router
    let display = (<div />)
    if ( curNav === "History") {
      display = (<HistoryChart />)
    } else if (curNav === "HeatMap") {
      display = (<LiveMap />)
    } else if (curNav === "Compare") {
      display = (<ComparisonMap />)
    }
    return (
      <Provider store={store}>
        <div className="container">
          <div className="top">
            <TopBar 
                curNav={this.state.curNav}
                onNavChange={this.onNavChange}
            />
          </div>
          <div className="bot">
            <div className="bot-side">
              <SideBar
                onNavChange={this.onNavChange} 
              />
            </div>
            <div className="bot-main"> 
              {display}           
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
