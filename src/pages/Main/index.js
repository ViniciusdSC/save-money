import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  getBruteValuesByMonthMoney,
  getDaysInMonthAndDaysInWeeks,
} from '~/modules/DateValues';
import {TYPES} from '~/store/reducers/spent';

import {View} from 'react-native';

import {SpentItem, SpentTitle, SpentValue, SpentIcon} from './styles';

const {daysInWeek} = getDaysInMonthAndDaysInWeeks();

const Main = () => {
  const date = new Date(Date.now());
  const key = `${date.getMonth()}/${date.getYear()}`;
  const navigation = useNavigation();
  const {monthMoney, weekMoney, dayMoney} = useSelector(({money}) =>
    getBruteValuesByMonthMoney(money),
  );

  const daySpent = useSelector(({spent}) => {
    if (spent[key] && spent[key][date.getDate()]) {
      return spent[key][date.getDate()].reduce(
        (accumulateSpent, spentValue) => spentValue + accumulateSpent,
      );
    }
    console.log('out if');
    return 0;
  });

  const weekSpent = useSelector(({spent}) => {
    if (!spent[key]) {
      return 0;
    }
    const daysWithSpent = Object.keys(spent[key]).filter(
      (spentDay) =>
        parseInt(spentDay, 10) >= date.getDate() &&
        parseInt(spentDay, 10) < date.getDate() + daysInWeek,
    );
    if (daysWithSpent.length === 0) {
      return 0;
    }

    return daysWithSpent
      .map((spentDay) =>
        spent[key][spentDay].reduce(
          (accumulateSpentDay, spentDayValue) =>
            spentDayValue + accumulateSpentDay,
        ),
      )
      .reduce((accumulateSpent, spentDay) => accumulateSpent + spentDay);
  });

  const monthSpent = useSelector(({spent}) => {
    if (!spent[key]) {
      return 0;
    }
    const daysWithSpent = Object.keys(spent[key]).filter(
      (spentDay) => parseInt(spentDay, 10) >= date.getDate(),
    );
    if (daysWithSpent.length === 0) {
      return 0;
    }

    return daysWithSpent
      .map((spentDay) =>
        spent[key][spentDay].reduce(
          (accumulateSpentDay, spentDayValue) =>
            spentDayValue + accumulateSpentDay,
        ),
      )
      .reduce((accumulateSpent, spentDay) => accumulateSpent + spentDay);
  });

  return (
    <View>
      <SpentItem
        onPress={() =>
          navigation.navigate('AddSpent', {type: TYPES.ADD_MONTH_SPENT})
        }>
        <>
          <SpentTitle>Gasto Mensal</SpentTitle>
          <SpentValue>R$ {(monthMoney - monthSpent).toFixed(2)}</SpentValue>
          <SpentIcon icon="chevron-right" />
        </>
      </SpentItem>
      <SpentItem
        onPress={() =>
          navigation.navigate('AddSpent', {type: TYPES.ADD_WEEK_SPENT})
        }>
        <>
          <SpentTitle>Gasto Semanal</SpentTitle>
          <SpentValue>R$ {(weekMoney - weekSpent).toFixed(2)}</SpentValue>
          <SpentIcon icon="chevron-right" />
        </>
      </SpentItem>
      <SpentItem
        onPress={() =>
          navigation.navigate('AddSpent', {type: TYPES.ADD_DAY_SPENT})
        }>
        <>
          <SpentTitle>Gasto Diário</SpentTitle>
          <SpentValue>R$ {(dayMoney - daySpent).toFixed(2)}</SpentValue>
          <SpentIcon icon="chevron-right" />
        </>
      </SpentItem>
      <SpentItem onPress={() => navigation.navigate('SetMoney')}>
        <>
          <SpentTitle>Ajustar Renda Mensal</SpentTitle>
          <SpentIcon icon="chevron-right" />
        </>
      </SpentItem>
    </View>
  );
};

export default Main;
