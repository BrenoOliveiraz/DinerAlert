import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { db, auth } from '../../services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function InitialScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para buscar e guardar o número de mesas do usuário
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const numTables = userData.numTables || '';
            if (numTables !== '') {
              navigation.navigate('Tables', { numTables: parseInt(numTables, 10) });
            } else {
              navigation.navigate('ChooseTablesScreen');
            }
          } else {
            navigation.navigate('ChooseTablesScreen');
          }
        } catch (error) {
          console.error('Erro ao buscar número de mesas:', error);
          Alert.alert('Erro ao buscar número de mesas.');
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Login');
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [navigation]);

  if (isLoading) {
    return null; // Pode exibir um indicador de carregamento se preferir
  }

  return null; // Componente inicial não precisa renderizar nada
}
