import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';


const App = () => {

  const [image, setImage] = useState(null);

  let openImagenPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
      alert('Debes habilirar los permisos de camara para continuar.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(pickerResult.cancelled === true){
      return;
    }

    setImage({localUri: pickerResult.uri})
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())){
      alert('Esta opción, no esta disponible para este dispositivo');
      return;
    }

    await Sharing.shareAsync(image.localUri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una imagen</Text>
      <TouchableOpacity onPress={openImagenPickerAsync}>
        <Image source={{uri: image!== null ? image.localUri : 'https://cdn3.iconfinder.com/data/icons/touch-hand-gestures/60/touch_gestures_Tab-512.png'}} style={styles.image} />
      </TouchableOpacity>
      {
        image ? 
        <TouchableOpacity style={styles.boton} onPress={openShareDialog} >
          <Text style={styles.text}>
            Compartir
          </Text>
        </TouchableOpacity>
        :
        <View />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 32,
    color: '#fff'
  },
  image: {
    marginTop: 24,
    height: 200, 
    width: 200,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  boton: {
    backgroundColor: 'deepskyblue',
    padding: 7,
    marginVertical: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  }
})

export default App;