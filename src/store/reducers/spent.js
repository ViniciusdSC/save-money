import {getDaysInMonthAndDaysInWeeks} from '~/modules/DateValues';

const {daysInMonth, daysInWeek} = getDaysInMonthAndDaysInWeeks();

export const TYPES = {
  ADD_DAY_SPENT: 'ADD_DAY_SPENT',
  ADD_WEEK_SPENT: 'ADD_WEEK_SPENT',
  ADD_MONTH_SPENT: 'ADD_MONTH_SPENT',
};

export default function (state = {}, action) {
  const date = new Date(Date.now());
  const key = `${date.getMonth()}/${date.getYear()}`;
  if (!state[key] && TYPES[action.type]) {
    state[key] = {};
  }
  switch (action.type) {
    case TYPES.ADD_DAY_SPENT:
      if (!state[key][date.getDate()]) {
        state[key][date.getDate()] = [];
      }
      state[key][date.getDate()].push(action.payload.value);
      return {...state};
    case TYPES.ADD_WEEK_SPENT:
      const spentPerDayInWeek = action.payload.value / daysInWeek;
      const lastDayInWeek = date.getDate() + daysInWeek;
      for (let i = date.getDate(); i < lastDayInWeek; i++) {
        if (!state[key][i]) {
          state[key][i] = [];
        }
        state[key][i].push(spentPerDayInWeek);
      }
      return {...state};
    case TYPES.ADD_MONTH_SPENT:
      const spentPerDayInMonth = action.payload.value / daysInMonth;
      const lastDayInMonth = date.getDate() + daysInMonth;
      for (let i = date.getDate(); i < lastDayInMonth; i++) {
        if (!state[key][i]) {
          state[key][i] = [];
        }
        state[key][i].push(spentPerDayInMonth);
      }
      return {...state};
    default:
      return state;
  }
}

export const addSpent = (value, type) => ({
  payload: {value},
  type,
});
