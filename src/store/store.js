import thunk from 'redux-thunk'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import reducer1 from './reducer/verifytoken/verifytoken';

//combine reducer to combile more than one reducer
const reducer = combineReducers({
    reducer1,
    
    
})
//using middleware thunk and redux(statemanagement)
let store=createStore(reducer, applyMiddleware(thunk));
export default store