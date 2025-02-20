import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/customButton';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Task from "@/components/task";
import { callAxiosDelete, callAxiosGet } from "@/services/api";
import { API_CONSTANTS } from '@/constants/ApiCollection';
import TaskSkeleton from "@/components/taskSkeleton";
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';

const ViewTask = () => {
    const navigation = useNavigation();
    const [tasks, setTask] = useState([]);
    const [skeleton, setSkeleton] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh

    // State for Dialog
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        handleViewTask();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useFocusEffect(
        useCallback(() => {
            handleViewTask();
        }, [])
    );

    const handleBack = () => {
        navigation.goBack();
    };

    const handleViewTask = async () => {
        setRefreshing(true); // Show refreshing indicator
        try {
            const res = await callAxiosGet(API_CONSTANTS.task);
            setTask(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
        setRefreshing(false); // Hide refreshing indicator
    };

    const handleRemove = async (id) => {
        try {
            await callAxiosDelete(`${API_CONSTANTS.task}/${id}`);
            setTask((prevTasks) => prevTasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to open the dialog with the selected task data
    const openDialog = (task) => {
        setSelectedTask(task);
        setDialogVisible(true);
    };

    const renderItem = ({ item }) => (
        <Task
            id={item._id}
            name={item.title}
            handleRemove={() => handleRemove(item._id)}
            dialogOpen={() => openDialog(item)}
            editTask={() => handleUpdate(item)}
        />
    );

    const handleNavigation = () => {
        navigation.navigate('CreateTask');
    };
const handleUpdate=(item)=>{
    navigation.navigate("UpdateTask",item)
}
    return (
        <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>View Task</Text>

            <View style={{ flex: 1 }}>
                {tasks.length > 0 ? (
                    <FlatList
                        data={tasks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleViewTask} />
                        }
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {skeleton ? (
                            <FlatList
                                data={['1', '2', '3']}
                                renderItem={() => <TaskSkeleton />}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Image source={require("../../assets/images/task.png")} style={styles.image} />
                                <Text style={styles.emptyText}>Please add your Task list</Text>
                                <CustomButton
                                    bg={Colors.primary}
                                    title="ADD TASK"
                                    onPress={handleNavigation}
                                />
                            </View>
                        )}
                    </View>
                )}
            </View>


            <Portal>
                <Dialog
                    style={{}}
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                >
                    <Dialog.Title>{selectedTask?.title}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{selectedTask?.description}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default ViewTask;

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.textColor,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        top: 50,
    },
    image: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
    },
    emptyText: {
        fontSize: 18,
        color: Colors.textColor,
        fontWeight: '600',
    },
});
