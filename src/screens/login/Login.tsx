import { Image, Text, VStack, Box, Button, Link } from "native-base";
import { TouchableOpacity } from "react-native";
import Title from "../../components/Title";
import TextField from '../../components/TextField'
import Logo from '../../assets/logo/Dinner_alert.png'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../services/FirebaseConfig";
import { useState } from "react";

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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("ChooseTablesScreen");
        console.log('Usuário logado:', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao fazer login:', errorMessage);
      });
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
