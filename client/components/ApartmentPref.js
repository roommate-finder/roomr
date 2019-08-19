import React, { Component } from 'react';
import { Button } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

class ApartmentPref extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Apartment Preferences',
            headerRight: (
                <Button
                    onPress={() => navigation.navigate("UserProfile")}
                    title="Save"
                />
            ),
        }
    };

    constructor() {
        super();
        this.state = {
            bio: '',
            job: '',
        }
    }

    // componentDidUpdate(prevProps) {

    // }

    render() {
        console.log('state', this.state)
        console.log('this.props', this.props)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel >
                            <Label>Bio</Label>
                            <Input multiline={true}
                                numberOfLines={4}
                                value={this.state.bio}
                                onChangeText={(bio) => this.setState({ bio })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Job Title</Label>
                            <Input value={this.state.job}
                                onChangeText={(job) => this.setState({ job })}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(ApartmentPref)