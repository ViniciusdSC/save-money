import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import View from 'react-native';

export default function Header({scene, previous, navigation}) {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  // const navigation = useNavigation();

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : undefined}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
