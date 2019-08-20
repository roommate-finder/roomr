import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { getFeedDataThunk } from '../store/feed'
import { getApartmentsThunk } from '../store/apartments'
import { getUsersThunk } from '../store/users'
import { connect } from 'react-redux'
import * as Font from 'expo-font';



class Feed extends React.Component {
    constructor() {
        super();
        this.findApartmentInStore = this.findApartmentInStore.bind(this)
        this.findUserInStore = this.findUserInStore.bind(this)
    }
    componentDidMount() {
        this.props.getFeedData(this.props.user);
        this.props.getApartments();
        this.props.getUsers();
    }

    findApartmentInStore(apartment) {
        const apartmentInStore = this.props.apartments.filter(apt => apt.id === apartment.apartmentId)
        // console.log('APARTMENT IN STORE THAT IS RETURNED', apartmentInStore)
        return apartmentInStore;
    }

    findUserInStore(match) {
        const userInStore = this.props.users.filter(user => user.id === match)
        console.log('---------------- USER IN STORE', userInStore)
        return userInStore
    }


    render() {
        //console.log('PROPS', this.props)
        // console.log('________APARTMENTS', this.props.apartments)
        // console.log('*****************this.props.feed', this.props.feed[0])
        console.log('*******^^^^^^^^^^^^ USERS', this.props.users)
        return (
            <View style={styles.container}>
                <Text>THIS IS THE FEED</Text>
                {/* {this.props.feed[0] && this.props.feed[0].map(apt => <Text>{apt.apartmentId}</Text>)} */}
                {this.props.feed[0] && this.props.apartments.length > 0 && this.props.users.length > 0 && this.props.feed[0].map(apt =>
                    <Text>
                        <Text>{this.findApartmentInStore(apt)[0].name}</Text>
                        {apt.matches_array !== null ? apt.matches_array.split(', ').map(match => <Text>{this.findUserInStore(Number(match))[0].firstName}</Text>) : ''}
                    </Text>


                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
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
