import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '@shoutem/ui';
class Input extends Component {
  state = {
    text: null
  };

  onChangeText = text => this.setState({ text: text });

  onSubmitEditing = () => {
    this.props.dispatch(this.props.onSubmitAction(this.state.text));
    if (!this.props.noclear) {
      this.setState({
        text: null
      });
    }
  };

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.refs.input);
    }
  };

  onBlur = () => {
    if (this.props.submitOnBlur) {
      this.onSubmitEditing();
    }
  };

  onLayout = event => {
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };
  //event callbacks
  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        onLayout={this.onLayout}
        value={this.state.text}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref="input"
      />
    );
  }
}

export default connect()(Input);
