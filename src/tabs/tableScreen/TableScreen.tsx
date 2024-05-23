import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../../components/Title';

interface TablesProps {
  route: any;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};



interface TablesProps {
  route: any;
}

const TablesScreen: React.FC<TablesProps> = ({ route }) => {
  const { numTables, estabelecimento } = route.params; 
  const [estabelecimentoNome, setEstabelecimentoNome] = useState(capitalizeFirstLetter(estabelecimento || ''));

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Title style={styles.estabelecimento}>{estabelecimentoNome}</Title> 
      </View>
      <View style={styles.tablesContainer}>
        {Array.from({ length: numTables }, (_, index) => (
          <View key={index + 1} style={styles.table}>
            <Text>{index + 1}</Text>
          </View>
        ))}
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
