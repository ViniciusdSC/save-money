export const TYPES = {
  SET_MONEY: 'SET_MONEY',
};

export default function (state = 0, action) {
  if (action.type === TYPES.SET_MONEY) {
    return action.payload.value;
  }
  return state;
}

export const setMoneyValue = (value) => ({
  payload: {value},
  type: TYPES.SET_MONEY,
});
