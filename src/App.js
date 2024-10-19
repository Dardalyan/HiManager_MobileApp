import React from 'react';
import LoginPage from './component/pages/login';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './component/pages/home';
import UserInfoPage from './component/pages/userInfo';
import CreateUserPage from './component/pages/newUser';
import ProfilePage from './component/pages/profile';
import ChangePassword from './component/pages/changePassword';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="UserInfo" component={UserInfoPage} />
                <Stack.Screen name="CreateUser" component={CreateUserPage} />
                <Stack.Screen name="Profile" component={ProfilePage} />
                <Stack.Screen name="ChangePass" component={ChangePassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
