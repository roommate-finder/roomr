import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import * as Font from 'expo-font';

export default class Friends extends React.Component {
    render() {
        return (
            <Button><Text>HELLO</Text></Button>
            // <View style={styles.container}>
            //     <Text>Add friends here!</Text>
            //     {
            //         this.props.screenProps.possibleFriends.map((friend, index) => (
            //             <Button
            //                 key={friend}
            //                 title={`Add ${friend}`}
            //                 onPress={() =>
            //                     this.props.screenProps.addFriend(index)
            //                 }
            //             />
            //         )
            //         )
            //     }

            //     <Button
            //         title="Back to home"
            //         onPress={() =>
            //             this.props.navigation.navigate('Home')
            //         }
            //     />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
