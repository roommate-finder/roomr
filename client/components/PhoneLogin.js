import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, Grid, Col, Form, Item, Label, Input } from 'native-base';
// import * as Font from 'expo-font';
import { connect } from 'react-redux';
import { setUserThunk } from '../store/user'


class PhoneLogin extends React.Component {

    constructor() {
        super();
        this.state = { phoneNumber: '', text: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setUser(1234567)
        this.props.navigation.navigate("Home")
    }
    render() {
        console.log('props', this.props)

        return (
            <View style={{ padding: 10 }}>
                <Form onSubmit={this.handleSubmit}>
                    <Text> HI</Text>
                    <Item fixedLabel>
                        <Label>Phone number</Label>
                        <Input value={this.state.phoneNumber} />
                    </Item>
                    <Button onPress={this.handleSubmit}>
                        <Text>Submit</Text>
                    </Button>
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

const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setUserThunk(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneLogin)