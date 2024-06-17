import { createStore } from 'redux';
import taskReducer from './reducers';

const store = createStore(taskReducer);

export default store;