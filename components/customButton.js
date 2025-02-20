import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const CustomButton = ({title,bg,onPress}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{ backgroundColor: bg, width: '100%', alignSelf: 'center', marginTop: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})