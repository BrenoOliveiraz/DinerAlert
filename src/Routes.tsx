
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormRegister from './screens/FormRegister/FormRegister'
import Login from './screens/login/Login';
import Tabs from './tabs'; //TODO: uma tab com chat
import ChooseTablesScreen from './screens/chooseTableScreen/chooseTableScreen';
import TablesScreen from './tabs/tableScreen/TableScreen';


const Tab = createNativeStackNavigator();


export default function Routes() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Tab.Screen options={{headerShown: false}} name="FormRegister" component={FormRegister} />
            <Tab.Screen options={{headerShown: false}} name="ChooseTablesScreen" component={ChooseTablesScreen} />
            <Tab.Screen options={{headerShown: false}} name="Tables" component={TablesScreen} />
        </Tab.Navigator>

    </NavigationContainer>
  )
}
