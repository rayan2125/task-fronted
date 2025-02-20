import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/customButton';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { API_CONSTANTS } from '@/constants/ApiCollection';
import { callAxios } from '@/services/api';
import * as Yup from 'yup';

// Define a Yup schema for task validation
const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required('Task title is required'),
  description: Yup.string().required('Task description is required'),
});

const CreateTask = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // To store validation errors
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    // Clear previous errors
    setErrors({});
    const taskData = { title, description };

    try {
      // Validate input data; abortEarly:false to capture all errors
      await taskValidationSchema.validate(taskData, { abortEarly: false });
      
      // If valid, call your API
      let res = await callAxios(API_CONSTANTS.task, taskData);
      console.log("Task created:", res);
      // Optionally navigate back or show success message
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
      <Text style={styles.heading}>New Task</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter your task Title..."
          style={styles.input}
          error={!!errors.title}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <Text style={styles.label}>Description:</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter your task description..."
          style={styles.textArea}
          error={!!errors.description}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>
      <CustomButton
        title="Create New Task"
        bg={Colors.btnclr}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default CreateTask;

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
