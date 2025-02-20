import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from "../../components/customButton"
import { ActivityIndicator, DefaultTheme, PaperProvider, TextInput } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { callAxios } from "@/services/api"
import { API_CONSTANTS } from '@/constants/ApiCollection';
import { Success, Failed } from "@/services/utilities"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuthdata, tokens } from '@/redux/Reducers/profileReducers';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const customTheme = {
    ...DefaultTheme,
    roundness: 25,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.btnclr,
      background: '#f0f0f0',
      text: '#333',
    },
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [textSecure,setTextSecure]= useState(true)
  const handleNavigation = () => {
    navigation.navigate("Signup");
  };

  const handlePasswordNavigation = () => {

    navigation.navigate("ForgetPassword");
  };

  const handleSubmit = async () => {
    setLoading(true)
    const req = { email, password };
    await callAxios(API_CONSTANTS.login, req)
      .then((res) => {
        let data = res.success;
        let error = res.data.error
        let { token } = res.data

        if (data) {
          setLoading(false)
          setStatus(1)
          setMessage("Your Login Successfully!!!")
          // navigation.navigate("Login");
          try {
            AsyncStorage.setItem("token", token);
            dispatch(setAuthdata(res.data))
            dispatch(tokens(token))
          } catch (error) {
            // console.lo
            setMessage(error);
            setStatus(2);
            // setLoader(false);
          }
          setTimeout(() => {
            navigation.navigate("Home");
          }, 1000);

        } else {

          setLoading(false)
          setMessage(error.data)
          setStatus(2)
          setTimeout(() => {
            setStatus('');
          }, 2000);
          // if(error)
        }

        // On success, navigate to Home or another screen
        // navigation.navigate("Home");
      })
      .catch((err) => {
        console.error(err);
        setTimeout(() => {
          setStatus('');
        }, 2000);
      });

  }
  return (
    <PaperProvider theme={customTheme}>
      <View style={{ flex: 1 }}>
        {
          loading &&
          <View style={{ position: "absolute", top: '50%', right: "46%", backgroundColor: 'white', zIndex: 9, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 10 }}>
            <ActivityIndicator animating={true} />
          </View>
        }
        <View style={{ flex: 1 }}>
          {status && (

            <View style={{ margin: 20 }}>

              {status === 1 ? <Success
                message={message}
              /> :
                status === 2 ? <Failed
                  message={message.error}
                /> :
                  <></>
              }

            </View>
          )
          }
          <Text style={{ fontSize: 30, marginHorizontal: 30, marginTop: 30, color: Colors.textColor }}>Login</Text>
          <View style={{ flex: 1, justifyContent: 'center', margin: 10, gap: 10, paddingHorizontal: 10, paddingVertical: 10 }}>

            <TextInput
              placeholder='Email'
              mode='outlined'
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder='Password'
              mode='outlined'
              secureTextEntry={textSecure}
              value={password}
              onChangeText={setPassword}
              right={<TextInput.Icon icon="eye" onPress={() => setTextSecure(!textSecure)} />}
            />
            <TouchableOpacity
              onPress={() => handlePasswordNavigation()}
              style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: "#757575", fontWeight: '600' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <CustomButton
              title="Login"
              bg={Colors.btnclr}
              onPress={() => handleSubmit()}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ fontSize: 14, color: Colors.textColor }}>Don't have an account?</Text><TouchableOpacity onPress={() => handleNavigation()}><Text style={{ fontSize: 14, color: Colors.singup, fontWeight: '400' }}> Sign up</Text></TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </PaperProvider>
  )
}

export default Login

const styles = StyleSheet.create({})