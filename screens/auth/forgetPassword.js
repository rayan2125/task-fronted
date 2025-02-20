import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from "../../components/customButton"
import { DefaultTheme, PaperProvider, TextInput } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const ForgetPassword = () => {
    const navigation = useNavigation()
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
    const handleNavigation = () => {
        navigation.navigate("NewPassword")
    }
    const handleBack = () => {
        navigation.goBack()
    }
    return (
        <PaperProvider theme={customTheme}>

            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={handleBack} style={{ marginHorizontal: 30, top: 10 }}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30, marginHorizontal: 30, marginTop: 30, color: Colors.textColor }}>Forget Password</Text>
                    <View style={{ flex: 1, justifyContent: 'center', margin: 10, gap: 10, paddingHorizontal: 10, paddingVertical: 10 }}>

                        <TextInput
                            placeholder='Email'
                            mode='outlined'
                        />


                        <CustomButton
                            title="Submit"
                            bg={Colors.btnclr}
                            onPress={() => handleNavigation()}
                        />

                    </View>
                </View>
            </View>
        </PaperProvider>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({})