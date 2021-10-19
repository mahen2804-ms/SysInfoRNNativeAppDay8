import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import Animated from 'react-native-reanimated';

const Animation = () => {
    return (
        <Animated.View
            style={[
                {
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: 'red',
                },
                animatedStyle,
            ]}
        />
    )
}

export default Animation
