import React from 'react'
import styled from '@emotion/styled';
import colors from 'styles/colors';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  transform: ${props => (props.modal && 'translateY(-2.2rem)')};
`

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background: ${props => (props.checked ? colors.teal600 : 'white')};
  border-radius: 3px;
  outline: ${props => (props.isFooter && !props.checked ? `1px solid ${colors.grey700}` : 'none')};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${colors.grey200};
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const Checkbox = ({ className, footer, modal, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox type='checkbox' checked={checked} {...props} />
    <StyledCheckbox checked={checked} isFooter={footer}>
      <Icon viewBox="0 0 24 24" modal={modal}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
