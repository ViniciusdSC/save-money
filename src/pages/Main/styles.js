import styled from 'styled-components';
import {TouchableRipple, List} from 'react-native-paper';

export const SpentItem = styled(TouchableRipple)`
  margin: 16px;
  padding: 20px 16px;
  background-color: #fff;
  flex-direction: row;
`;

export const Spent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SpentTitle = styled.Text`
  font-size: 22px;
  margin-right: auto;
  text-align-vertical: center;
`;

export const SpentValue = styled.Text`
  font-size: 22px;
  color: green;
  text-align-vertical: center;
`;

export const SpentIcon = styled(List.Icon)`
  margin: 0px;
`;
