import { combineReducers, createStore } from 'redux';
import { reducerForStore } from '../reducers/reducers';

const rootReducer = combineReducers({
    store: reducerForStore,
})
const store = createStore(rootReducer);


export default store;