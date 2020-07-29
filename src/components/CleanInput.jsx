import React, { Component } from 'react';
import styled from "@emotion/styled";

const CleanInputContainer = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 0;
  outline: 0 none !important;
  appearance: none;
  padding: 0;
`

class CleanInput extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <CleanInputContainer
        onClick={this.props.onClick}
        {...props}
      >
        {this.props.children}
      </CleanInputContainer>
    );
  }
}

export default CleanInput;
