import React, { useState } from 'react';
import { ScrollView, Box, Button } from 'native-base';
import { sessions } from "../../utils/textInputs";
import TextField from '../../components/TextField';
import Title from "../../components/Title";
import { db } from '../../services/FirebaseConfig';
import {  setDoc, doc } from "firebase/firestore";
import { Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/FirebaseConfig";

type LoginProps = {
    navigation: {
        navigate: (screen: string) => void;
    };
};

export default function FormRegister({ navigation }: LoginProps) {
    const [numSession, setNumSession] = useState(0);
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        email: '',
        estabelecimento: ''
    });

    function handleSection() {
        if (numSession < sessions.length - 1) {
            setNumSession(numSession + 1);
        } else {
            handleRegistration();
        }
    }

    function handleSectionBack() {
        if (numSession > 0) {
            setNumSession(numSession - 1);
        }
    }

    async function handleRegistration() {
        try {
            // Criar o usuário no sistema de autenticação do Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
            const user = userCredential.user;
            console.log('Usuário criado:', user.uid);

            // Salvar os dados do usuário no Firestore usando o uid como ID do documento
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                nome: formData.nome,
                email: formData.email,
                estabelecimento: formData.estabelecimento,
            });

            console.log('Dados do usuário salvos no Firestore!');
            
            // Navegar para a próxima tela após o registro
            navigation.navigate("ChooseTablesScreen");
        } catch (error) {
            console.error('Erro ao criar usuário: ', error);
        }
    }

    function handleChange(text, label) {
        setFormData({ ...formData, [label.toLowerCase()]: text });
    }

    return (
        <ScrollView flex={1} p={5}>
            <Title>
                {sessions[numSession].title}
            </Title>

            <Box>
                {sessions[numSession].textInput.map(input => (
                    <TextField
                        key={input.id}
                        placeHolderText={input.placeHolder}
                        labelText={input.label}
                        secureTextEntry={input.secureTextEntry}
                        onChangeText={(text) => handleChange(text, input.label)}
                    />
                ))}
            </Box>

            {numSession > 0 && (
                <Button onPress={handleSectionBack} bgColor={"gray.400"} w="100%" mt={10} borderRadius="lg">
                    <Text>Voltar</Text>
                </Button>
            )}
            <Button onPress={handleSection} w="100%" bg="blue.800" mt={4} borderRadius="lg">
                <Text>{numSession < sessions.length - 1 ? 'Avançar' : 'Salvar'}</Text>
            </Button>
        </ScrollView>
    );
}













// import React, { useState } from 'react';
// import { ScrollView, Box, Button } from 'native-base';
// import { sessions } from "../../utils/textInputs";
// import TextField from '../../components/TextField';
// import Title from "../../components/Title";
// import { db } from '../../services/FirebaseConfig';
// import { collection, addDoc } from "firebase/firestore";
// import { Text } from 'react-native';
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from "../../services/FirebaseConfig";


// type LoginProps = {
//     navigation: {
//         navigate: (screen: string) => void;
//     };
// };

// export default function FormRegister({ navigation }: LoginProps) {
//     const [numSession, setNumSession] = useState(0);
//     const [formData, setFormData] = useState({
//         nome: '',
//         senha: '',
//         email: '',
//         estabelecimento: ''
//     });


//     function handleSection() {
//         if (numSession < sessions.length - 1) {
//             setNumSession(numSession + 1);
//         } else {
//             saveFormData();
//             navigation.navigate("Login");
//         }
//     }

//     function handleSectionBack() {
//         if (numSession > 0) {
//             setNumSession(numSession - 1);
//         }
//     }
    
//     async function handleRegistration() {
//         try {
//             // Criar o usuário no sistema de autenticação do Firebase
//             const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
//             const user = userCredential.user;
//             console.log('Usuário criado:', user.uid);
    
//             // Salvar os dados do usuário no Firestore
//             const docRef = await addDoc(collection(db, "users"), {
//                 uid: user.uid,
//                 nome: formData.nome,
//                 email: formData.email,
//                 estabelecimento: formData.estabelecimento
//             });
//             console.log('Documento criado:', docRef.id); // Verificar se o documento foi criado
    
//             console.log('Dados do usuário salvos no Firestore!');
    
//             // Navegar para a próxima tela após o registro
//             navigation.navigate("ChooseTablesScreen");
//         } catch (error) {
//             console.error('Erro ao criar usuário: ', error);
//         }
//     }
    

//     function handleChange(text, label) {
//         setFormData({ ...formData, [label.toLowerCase()]: text });
//     }

//     async function saveFormData() {
//         try {
//             await addDoc(collection(db, "users"), formData);
//             console.log('Usuário adicionado!');
//             handleRegistration(); // Chama a função para criar o usuário após salvar os dados
//         } catch (error) {
//             console.error('Erro ao salvar usuário: ', error);
//         }
//     }

//     return (
//         <ScrollView flex={1} p={5}>
//             <Title>
//                 {sessions[numSession].title}
//             </Title>

//             <Box>
//                 {sessions[numSession].textInput.map(input => (
//                     <TextField
//                         key={input.id}
//                         placeHolderText={input.placeHolder}
//                         labelText={input.label}
//                         secureTextEntry={input.secureTextEntry}
//                         onChangeText={(text) => handleChange(text, input.label)}
//                     />
//                 ))}
//             </Box>

//             {numSession > 0 && (
//                 <Button onPress={handleSectionBack} bgColor={"gray.400"} w="100%" mt={10} borderRadius="lg">
//                     <Text>Voltar</Text>
//                 </Button>
//             )}
//             <Button onPress={handleSection} w="100%" bg="blue.800" mt={4} borderRadius="lg">
//                 <Text>{numSession < sessions.length - 1 ? 'Avançar' : 'Salvar'}</Text>
//             </Button>
//         </ScrollView>
//     );
// }
