import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/customButton';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { API_CONSTANTS } from '@/constants/ApiCollection';
import { callAxiosPatch } from '@/services/api';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';



const UpdateTask = ({ route }) => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };

    let { _id } = route.params
    const [title, setTitle] = useState(route.params.title);
    const [description, setDescription] = useState(route.params.description);


    const handleSubmit = async () => {


        const taskData = { title, description };
        
        try {

            let res = await callAxiosPatch(`${API_CONSTANTS.task}${_id}`, taskData);
            // console.log(res)
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody:'Your task has been updated successfully!',
                button: 'close',
              })

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Create an errors object from the array of validation errors
                const formErrors = {};
                err.inner.forEach((error) => {
                    formErrors[error.path] = error.message;
                });
                setErrors(formErrors);
            } else {
                // Handle other errors (e.g., network errors)
                console.error(err);
            }
        }
    };

    return (
        

        <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Update Task</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter your task Title..."
                    style={styles.input}

                />


                <Text style={styles.label}>Description:</Text>
                <TextInput
                    multiline
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter your task description..."
                    style={styles.textArea}

                />

            </View>
            <CustomButton
                title="Update Task"
                bg={Colors.btnclr}
                onPress={handleSubmit}
            />
        </View>
        
    );
};

export default UpdateTask;

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.textColor,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    formContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        color: Colors.textColor,
        marginBottom: 4,
    },
    input: {
        borderBottomColor: Colors.textColor,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 4,
    },
    textArea: {
        borderBottomColor: Colors.textColor,
        borderBottomWidth: 1,
        minHeight: 40,
        maxHeight: 120,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        color: Colors.textColor,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
