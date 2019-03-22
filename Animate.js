import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';

class Animate extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
    }

    componentDidMount() {
    Animated.loop(Animated.sequence([
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000
        }),
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 1000
        })
    ])).start();

    }


    render() {
        let { fadeAnim } = this.state;
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim
                }}
            >
                <Text style={styles.title}>Game List Api !</Text>
            </Animated.View>
        )
    }
}

export default Animate;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        justifyContent: 'center',
        color: 'white'
    }
});