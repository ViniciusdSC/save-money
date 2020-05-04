import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMoneyValue} from '~/store/reducers/money';
import {View} from 'react-native';
import {TextInput, Title, Submit} from './style';
import {TextInputMask} from 'react-native-masked-text';

export default function SetMoney({navigation}) {
  const moneySelector = useSelector(({money}) => money);
  const dispatch = useDispatch();
  const numericInput = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      numericInput.current.getElement().focus();
    });
  }, []);

  function saveMoney() {
    navigation.goBack();
  }

  return (
    <View>
      <Title>Digite sua renda mensal</Title>
      <TextInputMask
        mode="outlined"
        label="Digite sua renda mensal"
        ref={numericInput}
        type={'money'}
        value={moneySelector}
        onChangeText={(text) =>
          dispatch(
            setMoneyValue(
              parseFloat(text.slice(2).replace('.', '').replace(',', '.')),
            ),
          )
        }
        customTextInput={TextInput}
        onSubmitEditing={saveMoney}
      />
      <Submit mode="contained" onPress={saveMoney}>
        Salvar
      </Submit>
    </View>
  );
}
