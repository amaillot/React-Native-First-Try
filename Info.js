import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            gameId: this.props.navigation.state.params.id,
            gameName: this.props.navigation.state.params.name
        };
    }

    static navigationOptions= ({ navigation }) => {
        const {state} = navigation;
        return {
            title: state.params.name,
            headerStyle: { backgroundColor: '#6441a5' },
            headerTitleStyle: { color: 'white' },
        }
    }

    componentDidMount() {
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.gameId}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    gameName: this.state.gameName,
                    gameType: responseJson.type,
                    gameYear: responseJson.year,
                    gamePlayers: responseJson.players,
                    gameDescription: responseJson.description_en,
                    gameUrl: responseJson.url
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.gameName}</Text>
                <View>
                    <Text style={styles.text}>Players : {this.state.gamePlayers}</Text>
                    <Text style={styles.text}>Type : {this.state.gameType}</Text>
                    <Text style={styles.text}>Year : {this.state.gameYear}</Text>
                    <Text style={styles.text}>Description : {this.state.gameDescription}</Text>
                    <Button title="View on wikipedia" type="outline" onPress={() => Linking.openURL(`${this.state.gameUrl}`)} />
                </View>
            </View>
        );
    }
}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#19171c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        justifyContent: 'center',
        color: '#6441a5',
        marginBottom: 30,
    },
    text: {
        color: 'white',
        marginBottom: 30,
    }
});
