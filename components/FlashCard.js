import {StyleSheet, Text, View} from "react-native";
import FlipCard from "react-native-flip-card";
import React from "react";


const FlashCard = () => {
    return (

        <FlipCard
            style={styles.card}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd) => {
                console.log('isFlipEnd', isFlipEnd)
            }}
        >
            {/* Face Side */}
            <View
                // style={styles.face}
            >
                <Text>The Face</Text>
            </View>
            {/* Back Side */}
            <View
                // style={styles.back}
            >
                <Text>The Back</Text>
            </View>
        </FlipCard>


    )
}
export default FlashCard
const styles = StyleSheet.create({
    card: {
        backgroundColor: "red"
    }
})
