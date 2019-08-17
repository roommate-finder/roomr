import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, Grid, Col } from 'native-base';
// import * as Font from 'expo-font';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />,
            headerRight: (
                <Button transparent
                    onPress={() => navigation.navigate("Friends")}>
                    <Icon type="FontAwesome" name="home" style={{ color: 'grey' }} /></Button>
            ),
        }

    };
    render() {
        const uri = "https://placekitten.com/200/300";
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                // alignItems: 'center',
            }}>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Thumbnail style={{ width: 150, height: 150, borderRadius: 150 / 2 }} source={{ uri: uri }} />
                    <Text>
                        Cody C.
               </Text>
                    <Text>
                        Fullstack Developer, 25
                </Text>


                </View>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
                >
                    <Button light style={{ width: 65, height: 65, borderRadius: 65 / 2 }} onPress={() => this.props.navigation.navigate("EditProfile")}>
                        <Icon type="FontAwesome" name="pencil" />
                    </Button>


                    <Button style={{ width: 65, height: 65, borderRadius: 65 / 2 }} light>
                        <Icon type="FontAwesome" name="cog" />
                    </Button>


                </View>

            </View>


            //     <Container>

            //         <Content>

            //             <Thumbnail style={{ width: 150, height: 150, borderRadius: 150 / 2 }} source={{ uri: uri }} />

            //             <Text>
            //                 Cody C.
            //   </Text>
            //             <Text>
            //                 Fullstack Developer, 25
            //   </Text>





            //             </Button>
            //         </Content>

            //     </Container >
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
