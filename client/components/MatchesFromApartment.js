import React from 'react';
import { StyleSheet, View, Image, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { Container, Header, Button, Text, Content, Thumbnail, Card, CardItem, Body, Left, Icon, Right, Accordion } from 'native-base';
import { getFeedDataThunk } from '../store/feed'
import { getApartmentsThunk } from '../store/apartments'
import { getUsersThunk } from '../store/users'
import { connect } from 'react-redux'
import * as Font from 'expo-font';

class Feed extends React.Component {

    constructor() {
        super();
        this.findUserInStore = this.findUserInStore.bind(this)
    }

    componentDidMount() {
        this.props.getUsers();
    }



    findUserInStore(match) {
        const userInStore = this.props.users.filter(user => user.id === match)
        // console.log('---------------- USER IN STORE', userInStore)
        return userInStore
    }


    render() {
        const props = this.props.navigation.state.params;
        return (

            <ScrollView>

                <Text>Matches for {props.apartment.name}</Text>
                {props.matchIds.map(id =>

                    <Card>
                        <CardItem>
                            <Left>

                                <Body>
                                    <Text>{this.findUserInStore(Number(id))[0].firstName} {this.findUserInStore(Number(id))[0].lastName}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: this.findUserInStore(Number(id))[0].photo }} style={{ height: 200, width: null, flex: 1 }} />

                        </CardItem>
                        <CardItem>
                            <Text>{this.findUserInStore(Number(id))[0].bio} </Text>
                            <Icon type="FontAwesome" name="comments" />
                        </CardItem>
                    </Card>
                )}



            </ScrollView>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        feed: state.feed,
        apartments: state.apartments,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => ({
    getFeedData: user => dispatch(getFeedDataThunk(user)),
    getApartments: () => dispatch(getApartmentsThunk()),
    getUsers: () => dispatch(getUsersThunk())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
