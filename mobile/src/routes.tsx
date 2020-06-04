import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Points from './pages/Points';

const AppStack = createStackNavigator();

export const Routes = () => (
    <NavigationContainer>
        <AppStack.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5',
                },
            }}
        >
            <AppStack.Screen name="Home" component={Home}></AppStack.Screen>
            <AppStack.Screen name="Points" component={Points}></AppStack.Screen>
            <AppStack.Screen name="Detail" component={Detail}></AppStack.Screen>
        </AppStack.Navigator>
    </NavigationContainer>
);
