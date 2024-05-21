// src/screens/InitialScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db, auth } from '../../services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { RootStackParamList } from '../../utils/types'

type InitialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InitialScreen'>;

const InitialScreen: React.FC = () => {
  const navigation = useNavigation<InitialScreenNavigationProp>();

  useEffect(() => {
    const checkUserAuth = async () => {
      const user = auth.currentUser;
      if (user) {
        //checando e
        const userDocRef = doc(db, 'users', user.uid); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData && userData.numTables) {
            navigation.navigate('Tables', { numTables: userData.numTables });
          } else {
            navigation.navigate('ChooseTablesScreen');
          }
        } else {
          console.log('Documento do usuário não encontrado.');
          navigation.navigate('ChooseTablesScreen');
        }
      } else {
        console.log('Usuário não autenticado.');
        navigation.navigate('Login');
      }
    };

    checkUserAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitialScreen;
