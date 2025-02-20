import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Skeleton} from "native-base"

const TaskSkeleton = () => {
    return (
        <View style={{ marginTop: 10, gap: 15,marginVertical:5,marginHorizontal:4 }}>
            <View style={{ flexDirection: 'row',  }}>
                <View style={{ position: "absolute", left: 20, zIndex: 9, top: 40,flexDirection:'row',alignItems:'center' }}>

                    <Skeleton
                        rounded="full"
                        h={20}
                        w={20}
                        
                        background="#CEEBA2"
                    />
                    <View style={{marginHorizontal:20,gap:20}}>

                    <Skeleton
                        rounded="full"
                        h={18}
                        w={200}
                        
                        background="#D3D2F9"
                    />
                    <View style={{flexDirection:'row',gap:50,top:30}}>

                    <Skeleton
                        rounded="full"
                        h={18}
                        w={50}
                        
                        background="#FADDEB"
                    />
                    <Skeleton
                        rounded="full"
                        h={18}
                        w={50}
                        
                        background="#FADDEB"
                    />
                    </View>
                    </View>
                </View>
                <Skeleton
                    rounded="xl"
                    h={200}
                    width={350}

                    background="#F6FEFB"
                >
                </Skeleton>
            </View>

            <View style={{ position: 'absolute', right: 15, top: 90 }}>

                <Skeleton
                    h={5}
                    w={75}
                    rounded="xl"
                    background="#E1D5AD"
                />
            </View>
            

        </View>

    )
}

export default TaskSkeleton

const styles = StyleSheet.create({})