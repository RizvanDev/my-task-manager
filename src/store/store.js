import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { chartReducer } from './chartReducer'

const rootReducer = combineReducers({ chartReducer })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
