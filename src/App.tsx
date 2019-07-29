import React from 'react';
import SideBar from './containers/SideBar'; 
import TopBar from './containers/TopBar';
import './App.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

class App extends React.Component<{}, {}> {
  render() { 
    return (
      <Provider store={store}>
        <div className="container">
          <div className="top">
            <TopBar />
          </div>
          <div className="bot">
            <SideBar />
          </div>
        </div>
      </Provider>
      // <div className="App">
      //   hey
      // </div>
    );
  }
}

export default App;
