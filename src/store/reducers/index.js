import {combineReducers} from 'redux';

import money from './money';
import spent from './spent';

const reducers = combineReducers({
  spent,
  money,
});

export default reducers;
