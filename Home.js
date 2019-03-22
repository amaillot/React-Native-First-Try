import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import App from './App';
import Animate from './Animate';

function mapStateToProps(state) {
    return {
        text: state.text,
    }
}
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true};
    }

    static navigationOptions = {
        title: 'Games',
        headerStyle: { backgroundColor: '#6441a5' },
        headerTitleStyle: { color: 'white' },
    }

    componentDidMount(){

        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list', {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Animate style={styles.animate}/>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) =>
                        <View style={styles.borderItem}>
                            <Text style={styles.item} onPress={() => {this.props.navigation.navigate('Info', {id: item.id, name: item.name})}}>
                                {item.name}
                            </Text>
                        </View>
                    }

                    keyExtractor={({id}) => id}
                />
            </View>
        );
    }
}
export default connect(mapStateToProps)(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#19171c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        textAlign: 'center',
        alignSelf:'stretch',
        margin: 10,
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 50,
    },
    borderItem: {
        width: 300,
        height: 70,
        backgroundColor: '#6441a5',
        borderRadius: 20,
        marginTop: 25,
    },
    animate: {
        marginTop: 30,
    }
});
