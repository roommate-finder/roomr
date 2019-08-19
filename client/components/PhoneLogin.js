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
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setUser(1234567)
        // this.props.setUser(this.state.phoneNumber)
        console.log('----USER-----', this.props.user)
        this.props.navigation.navigate("Home")
    }
    handleChange(event) {
        console.log('EVENT', event)
        console.log('EVENT.TEXT', event.nativeEvent.text)
        // this.setState({ phoneNumber: event.nativeEvent.text });

    }

    render() {


        return (
            <View style={{ padding: 10 }}>
                <Form onSubmit={this.handleSubmit}>
                    <Text> HI</Text>
                    <Item fixedLabel>
                        <Label>Phone number</Label>
                        {/* <Input value={this.state.phoneNumber} onChange={this.handleChange} /> */}
                        <Input />
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