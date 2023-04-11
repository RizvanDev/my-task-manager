import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { tabItemsReducer } from './reducers/tabItemsReducer'
import { chartReducer } from './reducers/chartReducer'
import { statisticsReducer } from './reducers/statisticsReducer'

const rootReducer = combineReducers({ tabItemsReducer, chartReducer, statisticsReducer })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
