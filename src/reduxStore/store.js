import { createStore,applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { logInReducer, dataRequestReducer } from './reducer'


const rootReducer = combineReducers({
    login: logInReducer,
    data: dataRequestReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store