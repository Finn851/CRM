import reportWebVitals from './reportWebVitals';
import state from './rerenderEntireTree'
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

state.RerenderEntireTree()
reportWebVitals();
