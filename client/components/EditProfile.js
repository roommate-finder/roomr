import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { updateUserThunk } from '../store/user'
import { connect } from 'react-redux'
class EditProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Edit Profile',
            // headerRight: (
            //     <Button
            //         onPress={() => this.handleSave(navigation)}
            //         title="Save"
            //     />
            // ),
        }
    };

    constructor() {
        super();
        this.state = {
            bio: '',
            job: '',
        }
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        this.props.updateUser({ id: this.props.user.id, bio: this.state.bio, job: this.state.job })
        this.props.navigation.navigate('UserProfile')
        this.setState({
            bio: '',
            job: ''
        })
    }

    componentDidMount() {
        console.log('MOUNTED')
        const user = this.props.user;
        console.log('USER', user)
        this.setState({
            bio: user.bio,
            job: user.job
        })
    }

    // componentDidUpdate(prevProps) {
    //     console.log('HIHGIDHGODFLKHJGNDKLFGH')
    //     if (prevProps.user !== this.props.user) {
    //         const user = this.props.user;
    //         console.log('USER', user)
    //         this.setState({
    //             bio: user.bio,
    //             job: user.job
    //         })
    //     }
    // }

    render() {
        // console.log('state', this.state)
        // console.log('this.props', this.props)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel >
                            <Label>Bio</Label>
                            <Input multiline={true}
                                numberOfLines={4}
                                value={this.state.bio}
                                onChangeText={(bio) => this.setState({ bio })} />
                        </Item>
                        <Item fixedLabel>
                            <Label>Job Title</Label>
                            <Input value={this.state.job}
                                onChangeText={(job) => this.setState({ job })}
                            />
                        </Item>
                    </Form>
                    <Button onPress={() => this.handleSave()}>
                        <Text> save</Text>
                    </Button>
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

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(updateUserThunk(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)