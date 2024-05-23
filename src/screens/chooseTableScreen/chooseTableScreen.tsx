import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { db, auth } from '../../services/FirebaseConfig';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

interface ChooseTablesProps {
  navigation: any;
}

const ChooseTablesScreen: React.FC<ChooseTablesProps> = ({ navigation }) => {
  const [numTables, setNumTables] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');


  useEffect(() => { //fetch para capturar e guardar o nome do estabelecimento
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setEstabelecimento(userData.estabelecimento); 
          }
        } catch (error) {
          console.error('Erro ao buscar nome do estabelecimento:', error);
          Alert.alert('Erro ao buscar nome do estabelecimento.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleNext = async () => {
    if (!numTables || isNaN(parseInt(numTables)) || parseInt(numTables) <= 0) {
      Alert.alert('Por favor, insira um número válido de mesas.');
      return;
    }


    //certifica de puxar o usuário logado através do auth
    const user = auth.currentUser; 
    if (user) { //se tiver usuário logado, ele vai fazer o updatte no firestore
      try {
        const userDocRef = doc(db, 'users', user.uid); // Referência para o documento do usuário no Firestore
        const userDoc = await getDoc(userDocRef); //req get pro documento para fazer a lógica do update do doc principal
        if (userDoc.exists()) {
          await updateDoc(userDocRef, {
            numTables: parseInt(numTables),
          });
        } else {
          await setDoc(userDocRef, { //seta novo documento, caso n exista usuário
            email: user.email,
            estabelecimento: estabelecimento || '', 
            nome: user.displayName || '',
            numTables: parseInt(numTables),
            senha: '', 
          });
        }
        
        navigation.navigate('Tables', { numTables: parseInt(numTables), estabelecimento });
      } catch (error) {
        console.error('Erro ao atualizar o número de mesas:', error);
        Alert.alert('Erro ao atualizar o número de mesas.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Número de mesas: </Text> 
      <View style={styles.square}>
        <TextInput
          placeholder="Número de Mesas"
          value={numTables}
          onChangeText={(text) => setNumTables(text)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <Button title="Próximo" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ChooseTablesScreen;









