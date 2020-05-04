import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {TextInput, Title, Submit} from './style';
import {TextInputMask} from 'react-native-masked-text';
import {addSpent as addSpentReducer} from '~/store/reducers/spent';

export default function AddSpent({
  navigation,
  route: {
    params: {type},
  },
}) {
  const [spentValue, setSpentValue] = useState();
  const dispatch = useDispatch();
  const numericInput = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      numericInput.current.getElement().focus();
    });
  }, []);

  function saveSpent() {
    dispatch(addSpentReducer(spentValue, type));
    navigation.goBack();
  }

  return (
    <View>
      <Title>Digite o valor do gasto</Title>
      <TextInputMask
        mode="outlined"
        ref={numericInput}
        type={'money'}
        value={spentValue}
        onChangeText={(text) =>
          setSpentValue(
            parseFloat(text.slice(2).replace('.', '').replace(',', '.')),
          )
        }
        customTextInput={TextInput}
        onSubmitEditing={saveSpent}
      />
      <Submit mode="contained" onPress={saveSpent}>
        Salvar
      </Submit>
    </View>
  );
}
