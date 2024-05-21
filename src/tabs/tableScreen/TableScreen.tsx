import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db, auth } from '../../services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Title from '../../components/Title';

interface TablesProps {
  route: any;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const TablesScreen: React.FC<TablesProps> = ({ route }) => {
  const { numTables, estabelecimento } = route.params; 
  const [estabelecimentoNome, setEstabelecimentoNome] = useState(estabelecimento || ''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEstabelecimentoNome() {
      try {
        const user = auth.currentUser;
        if (user && !estabelecimentoNome) { 
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData && userData.estabelecimento) {
              const capitalizedNome = capitalizeFirstLetter(userData.estabelecimento);
              console.log('Nome do estabelecimento:', capitalizedNome);
              setEstabelecimentoNome(capitalizedNome); // 
            } else {
              console.log('Dados do usuário incompletos.');
            }
          } else {
            console.log('Documento do usuário não encontrado.');
          }
        } else {
          console.log('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao buscar nome do estabelecimento:', error);
        setError('Erro ao buscar nome do estabelecimento.');
      } finally {
        setLoading(false);
      }
    }

    fetchEstabelecimentoNome();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  const tables = [];
  for (let i = 1; i <= numTables; i++) {
    tables.push(
      <View key={i} style={styles.table}>
        <Text>{i}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Title style={styles.estabelecimento}>{estabelecimentoNome}</Title> 
      </View>
      <View style={styles.tablesContainer}>
        {tables}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginBottom: 20,
  },
  estabelecimento: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  table: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TablesScreen;
