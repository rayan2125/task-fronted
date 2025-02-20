import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomButton from "../../components/customButton";
import { ActivityIndicator, DefaultTheme, TextInput, ThemeProvider } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { callAxios } from "@/services/api";
import { API_CONSTANTS } from '@/constants/ApiCollection';
import { Success, Failed } from "@/services/utilities"

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = () => {
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
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('')
  const [textSecure, setTextSecure] = useState(true)
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {

    setErrors({});
    setLoading(true)
    const formValues = { name, email, password };

    try {

      await signupSchema.validate(formValues, { abortEarly: false });
      // If validation passes, proceed with API call
      await callAxios(API_CONSTANTS.signup, formValues)
        .then((res) => {
          let data = res.success;
          let error = res.data.error
          if (data) {
            setStatus(1)
            setMessage("Your Account Created!!!")
            // navigation.navigate("Login");
            setTimeout(() => {
              navigation.navigate("Login");
            }, 3000);
          } else {
setLoading(false)
            console.log(error.data)
            setMessage(error.data)
            setStatus(2)
            // if(error)
          }
          // On success, you might navigate to Login or Home
          // navigation.navigate("Login");
        })
        .catch((err) => {
          setLoading(false)
          console.error(err);
        });
    } catch (validationError) {
      // Build an error object from Yup's validation errors
      const formErrors = {};
      if (validationError.inner && validationError.inner.length > 0) {
        validationError.inner.forEach((err) => {
          // Only add the error message for the first error of each field
          if (!formErrors[err.path]) {
            formErrors[err.path] = err.message;
          }
        });
      } else {
        formErrors[validationError.path] = validationError.message;
      }
      setErrors(formErrors);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>

      <View style={{ flex: 1 }}>
      {
          loading &&
          <View style={{ position: "absolute", top: '50%', right: "46%", backgroundColor: 'white', zIndex: 9, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 10 }}>
            <ActivityIndicator animating={true} />
          </View>
        }
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
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, marginHorizontal: 30, marginTop: 30, color: Colors.textColor }}>
            SignUp
          </Text>
          <View style={{ flex: 1, justifyContent: 'center', margin: 10, gap: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
            <TextInput
              placeholder="Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              error={!!errors.name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              error={!!errors.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              mode="outlined"
              secureTextEntry={textSecure}
              value={password}
              onChangeText={setPassword}
              error={!!errors.password}
              right={<TextInput.Icon icon="eye" onPress={() => setTextSecure(!textSecure)} />}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <CustomButton
              title="SignUp"
              bg={Colors.singup}
              onPress={handleSubmit}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <Text style={{ fontSize: 16, color: Colors.textColor }}>Already have an account?</Text><TouchableOpacity onPress={() => handleNavigation()}><Text style={{ fontSize: 16, color: Colors.btnclr, fontWeight: '400' }}> Login</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ThemeProvider>

  );
};

export default Signup;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: -5,
  },
});
