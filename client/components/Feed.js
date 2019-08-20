import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { getFeedDataThunk } from '../store/feed'
import { getApartmentsThunk } from '../store/apartments'
import { connect } from 'react-redux'
import * as Font from 'expo-font';


class Feed extends React.Component {
    constructor() {
        super();
        this.findApartmentInStore = this.findApartmentInStore.bind(this)
    }
    componentDidMount() {
        this.props.getFeedData(this.props.user);
        this.props.getApartments();
    }

    findApartmentInStore(apartment) {
        const apartmentInStore = this.props.apartments.filter(apt => apt.id === apartment.apartmentId)
        // console.log('APARTMENT IN STORE THAT IS RETURNED', apartmentInStore)
        return apartmentInStore;
    }

    render() {
        //console.log('PROPS', this.props)
        // console.log('________APARTMENTS', this.props.apartments)
        // console.log('*****************this.props.feed', this.props.feed[0])
        return (
            <View style={styles.container}>
                <Text>THIS IS THE FEED</Text>
                {/* {this.props.feed[0] && this.props.feed[0].map(apt => <Text>{apt.apartmentId}</Text>)} */}
                {this.props.feed[0] && this.props.apartments.length > 0 && this.props.feed[0].map(apt =>
                    <Text>{this.findApartmentInStore(apt)[0].name}</Text>)}

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
        apartments: state.apartments
    };
};

const mapDispatchToProps = dispatch => ({
    getFeedData: user => dispatch(getFeedDataThunk(user)),
    getApartments: () => dispatch(getApartmentsThunk())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
