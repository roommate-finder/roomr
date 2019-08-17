import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, Grid, Col, Form, Item, Label, Input } from 'native-base';
// import * as Font from 'expo-font';
import { connect } from 'react-redux';


class PhoneLogin extends React.Component {

    constructor() {
        super();
        this.state = { phoneNumber: '', text: '' }
    }
    render() {
        console.log('props', this.props)

        return (
            <View style={{ padding: 10 }}>
                <Form>
                    <Item fixedLabel>
                        <Label>Phone number</Label>
                        <Input />
                    </Item>
                </Form>
            </View>
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps)(PhoneLogin)