import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, Grid, Col } from 'native-base';
// import * as Font from 'expo-font';

export default class Home extends React.Component {
    render() {

        return (
            <Container>

                <Content>

                    <Text>PHONE LOGIN</Text>
                </Content>

            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
