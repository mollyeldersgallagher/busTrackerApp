
import React from 'react';
import {
    AsyncStorage,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { MyContext } from '../Provider';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <View style={styles.container}>
                <MyContext.Consumer>
                    {context => ((
                        <View>
                            <View>
                            <Button title="Show me more of the app" onPress={() => this._showMoreApp()} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                            <Button  title="Actually, sign me out :)" onPress={() => this._signOutAsync(context.removeToken)} />
                            </View>
                        </View>
                    ))}
                </MyContext.Consumer>
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Home');
    };

    _signOutAsync = async (removeToken) => {
        removeToken()
            .then(()=> {
                this.props.navigation.navigate('Auth');
            })
        .catch(error => {
            this.setState({ error })
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

