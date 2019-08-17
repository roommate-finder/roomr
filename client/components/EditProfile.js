import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class FixedLabelExample extends Component {
    render() {
        return (
            <Container>

                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>First name</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel>
                            <Label>Last name</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel>
                            <Label>Bio</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}