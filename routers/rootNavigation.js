import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/home';
import Signup from '../screens/auth/signup';
import Login from '../screens/auth/login';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { Colors } from '@/constants/Colors';
import ForgetPassword from "@/screens/auth/forgetPassword";
import NewPassword from "@/screens/auth/newPassword";
import ViewTask from "@/screens/tasks/viewTask";
import CreateTask from "@/screens/tasks/createTask";
import UpdateTask from "@/screens/tasks/updateTask";
import Profile from "@/screens/profile/profile"
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

const RootNavigation = () => {
    const selector = useSelector(state=>state.profile)
   
    const customTheme = {
        ...DefaultTheme,
        // roundness: 20, 
        colors: {
            ...DefaultTheme.colors,
            primary: Colors.btnclr,
            background: '#f0f0f0',
            text: '#333',
        },
    };

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    if (loading) {
        return null;
    }

    return (
       
        <PaperProvider theme={customTheme}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.btnclr} />
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={selector.authData === null ? 'Login' : 'Home'}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="ViewTask" component={ViewTask} />
                <Stack.Screen name="CreateTask" component={CreateTask} />
                <Stack.Screen name="UpdateTask" component={UpdateTask} />
                <Stack.Screen name='Profile' component={Profile}/>
            </Stack.Navigator>
        </PaperProvider>
        
    );
};

export default RootNavigation;
