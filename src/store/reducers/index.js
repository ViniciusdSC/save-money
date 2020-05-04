import {combineReducers} from 'redux';

import spent from './spent';
import money from './money';

const reducers = combineReducers({
  spent,
  money,
});

export default reducers;
