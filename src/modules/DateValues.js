const {daysInMonth, daysInWeek} = getDaysInMonthAndDaysInWeeks();

function getDaysInMonthAndDaysInWeeks() {
  const date = new Date(Date.now());
  const month = date.getMonth() + 1;
  let daysInMonth = 0;
  let daysInWeek = false;

  while (date.getMonth() < month) {
    daysInMonth++;
    date.setDate(date.getDate() + 1);
    if (!daysInWeek && date.getDay() === 0) {
      daysInWeek = daysInMonth;
    }
  }

  return {
    daysInMonth,
    daysInWeek,
  };
}

function getBruteValuesByMonthMoney(money) {
  const dayValue = money / daysInMonth;
  const weekValue = dayValue * daysInWeek;

  return {
    monthMoney: money,
    weekMoney: weekValue,
    dayMoney: dayValue,
  };
}

function getLiquidValues(money, spents) {
  const {monthMoney, weekMoney, dayMoney} = getBruteValuesByMonthMoney(money);
  const date = new Date(Date.now());
  const key = `${date.getMonth()}/${date.getYear()}`;
  /* fix: valores acima de 31 */
  const monthSpents = Object.keys(spents[key])
    .filter((spentKey) => parseInt(spentKey, 10) >= date.getDate())
    .map((spentKey) => ({day: spentKey, spents: spents[key][spentKey]}));
  const weekSpents = monthSpents.filter(
    ({day}) => parseInt(day, 10) < daysInWeek + date.getDate(),
  );
  const daySpent = weekSpents.find(({day}) => day === date.getDate());

  return {
    monthMoney:
      monthMoney -
      monthSpents.reduce(
        (accumulateMonthSpent, daySpent) =>
          accumulateMonthSpent +
          daySpent.spents.reduce(
            (accumulateDaySpent, spent) => accumulateDaySpent + spent,
          ),
      ),
    weekMoney:
      weekMoney -
      weekSpents.reduce(
        (accumulateWeekSpent, daySpent) =>
          accumulateWeekSpent +
          daySpent.spents.reduce(
            (accumulateDaySpent, spent) => accumulateDaySpent + spent,
          ),
      ),
    dayMoney:
      dayMoney -
      daySpent.spents.reduce(
        (accumulateSpent, spent) => accumulateSpent + spent,
      ),
  };
}

export {
  getDaysInMonthAndDaysInWeeks,
  getBruteValuesByMonthMoney,
  getLiquidValues,
};
