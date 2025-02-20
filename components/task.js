import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';
const Task = ({ name, handleRemove ,dialogOpen,editTask}) => {
    // Function to handle task deletion



    // Right swipe action for delete
    const renderRightActions = () => (
        <TouchableOpacity
            style={styles.rightAction}
            onPress={handleRemove}
        >
            <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.taskContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconContainer}>
                        <Text>📌</Text>
                    </View>
                    <View>

                        <Text style={styles.taskText}>{name}</Text>
                        <View style={{ flexDirection: 'row',  justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>

                                <TouchableOpacity
                                onPress={dialogOpen}
                                style={{ marginHorizontal: 20, backgroundColor: '#144761', width: 60, paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center', borderRadius: 70 }}>
                                    <FontAwesome5 name="eye" size={24} color="#EAF2F5" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                 onPress={editTask}
                                style={{ marginHorizontal: 20, backgroundColor: '#373A5B', width: 60, paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center', borderRadius: 70 }}>
                                    <Entypo name="edit" size={24} color="#EAF2F5" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ marginHorizontal: 20, backgroundColor: Colors.primary, width: '15%', top: -18, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                           
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: '#ACBCC4',
        paddingHorizontal: 25,
        paddingVertical: 25,
        borderRadius: 20,
        elevation: 5,
        marginVertical: 10,
    },
    taskText: {
        color: Colors.textColor,
        fontSize: 18,
        fontWeight: '700',
        marginHorizontal: 20
    },
    iconContainer: {
        height: 80,
        width: 80,
        borderRadius: 25,
        backgroundColor: '#D3D6D6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 20,
        marginVertical: 10,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        padding: 20,
    },
});

export default Task;
