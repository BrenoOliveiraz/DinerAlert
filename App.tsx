import { NativeBaseProvider, StatusBar } from 'native-base';
import Routes from './src/Routes';

export default function App() {
  return (
    <NativeBaseProvider >
       <StatusBar backgroundColor="#333333" />
      <Routes />
    </NativeBaseProvider>
  );
}


