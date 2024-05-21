import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TablesScreen from '../tabs/tableScreen/TableScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: "#002851"
    },
    tabBarActiveTintColor: "#339cff",
    tabBarInactiveTintColor: '#fff'
}

const tabs = [
    {
        name: 'Tables',
        component: TablesScreen,
        icon: "home"
    },

]

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={screenOptions}
        >

            {tabs.map((tab) => (
                <Tab.Screen
                    name={tab.name}
                    component={tab.component}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name={tab.icon} color={color} size={size} />                       )
                    }} />
            ))

            }

        </Tab.Navigator>
    );
}