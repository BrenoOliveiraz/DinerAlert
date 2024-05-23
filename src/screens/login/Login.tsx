import React, { useState } from "react";
import { Image, Text, VStack, Box, Button, Link } from "native-base";
import { TouchableOpacity } from "react-native";
import Title from "../../components/Title";
import TextField from '../../components/TextField'
import Logo from '../../assets/logo/Dinner_alert.png'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from "../../services/FirebaseConfig";
import { doc, getDoc } from 'firebase/firestore';

type LoginProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function NavigateToForm() {
    navigation.navigate("FormRegister");
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuário logado:', user.uid);

      // Verificar se o usuário tem numTables definido no Firestore
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
      const errorMessage = error.message;
      console.error('Erro ao fazer login:', errorMessage);
    }
  };

  return (
    <VStack alignItems="center" flex={1} p={5} justifyContent='center' bg='white'>
      <Image source={Logo} alt="Logo Dinner" />
      <Title>
        Faça Login em sua conta.
      </Title>

      <Box>
        <TextField
          labelText="Email"
          placeHolderText="Insira seu endereço de E-mail"
          value={email}
          onChangeText={(val) => { setEmail(val) }}
        />
        <TextField
          labelText="Senha"
          placeHolderText="Insira sua Senha"
          secureTextEntry
          value={password}
          onChangeText={(val) => { setPassword(val) }}
        />
      </Box>

      <Button onPress={handleLogin} w="100%" bg="blue.800" mt={10} borderRadius="lg">
        Entrar
      </Button>
      <Link href="#" mt={2}>
        Esqueceu sua senha?
      </Link>
      <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={NavigateToForm}><Text color="blue.500">Faça seu Cadastro.</Text></TouchableOpacity>
      </Box>
    </VStack>
  );
}
