import React, { useState } from 'react';
import styled from '@emotion/styled';
import Checkbox from '../components/Checkbox';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const FormContainer = styled.form`
  display: block;
  position: relative;
  width: 100%;
`;

const FormRow = styled.div`  
  & + * {
    margin-top: 2.4rem;
  }
  
  @media (min-width: ${dimensions.desktopUp}px) {
    display: flex;
  }
`;

const FormField = styled.div`
  input,
  label {
    display: block;
  }

  label {
    font-size: 1.4rem;
    color: ${colors.teal700};
    margin-top: 0.4rem;
  }

  input {
    appearance: none;
    border: 1px solid ${colors.grey400};
    color: ${colors.grey800};
    font-size: 1.6rem;
    padding: 1.6rem 2.4rem 1.8rem;
    width: 100%;
    max-width: 48rem;
  }
  
  & + * {
    margin-top: 2.4rem;
  }
  
  &.FormField--submit {
    margin-top: 4rem;
  }
  
  @media (min-width: ${dimensions.desktopUp}px) {
    flex: 1 1 100%;
    
    input {
      max-width: none;
    }
    
    .FormRow--name & {
      width: 50%;
    }
    
    & + * {
      margin-top: 0;
      margin-left: 3.8rem;
    }
    
    &.FormField--submit {
      margin-top: 0;
      margin-left: 3.8rem;
      flex: 0 0 auto;
    }
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  appearance: none;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 1.6rem 3.2rem;
  background-color: #fff;
  width: 100%;
  border: none;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.1);
  transition: background 0.08s ease-in-out, color 0.08s ease-in-out;
  
  @media (min-width: ${dimensions.tabletPortraitUp}px) {
    display: inline-block;
    width: auto;
    padding: 1.6rem 4rem;
    
    &:hover {
      cursor: pointer;
      background-color: ${colors.yellow500};
      color: #fff;
      box-shadow: none;
    }
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 4rem auto auto;

  label {
    padding-right: 2rem;
    cursor: pointer;
    
    & + * {
      margin-top: 1.6rem;
    }

    span {
      padding-left: 1.6rem;
      color: ${colors.grey900};
      font-size: 1.6rem;
    }
  }
  
  &.CheckBoxContainer--desktop {
    display: none;
  }

  @media (min-width: ${dimensions.desktopUp}px) {
    .Form--footer & {
      flex-direction: row;
      
      label {
        align-items: center;
        display: inline-block;
      }
    }
    
    .Form--modal & {
      label {
        display: block;
      }
    }
    
    &.CheckBoxContainer--mobile {
     display: none; 
    }
    
    &.CheckBoxContainer--desktop {
     display: block; 
    }
  }
`;

const CheckBox = styled(Checkbox)`
  input + div {
    outline-color: ${colors.grey500};
    border-radius: 0;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StatusMessage = styled.div`
  font-size: 1.6rem;
`;

const SubmitRow = styled.div`
  margin-top: 3.2rem;
`;

const MailchimpForm = (props) => {
  const [subscribeMailingList, setSubscribeMailingList] = useState(undefined);
  const [subscribeJobBoard, setSubscribeJobBoard] = useState(undefined);
  const [statusMessage, setStatusMessage] = useState();

  const [email, setEmail] = useState('');
  const [lname, setLname] = useState('');
  const [fname, setFname] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (subscribeMailingList && !subscribeJobBoard) {
      // Subscribe mailing list
      const result = await addToMailchimp(email, {
        FNAME: fname,
        LNAME: lname,
        'group[6172][281474976710656]': '281474976710656',
      });

      setStatusMessage(result);
      setEmail('');
      setFname('');
      setLname('');
      setSubscribeMailingList(false);
    }
    if (subscribeJobBoard && !subscribeMailingList) {
      // Subscribe Job board
      const result = await addToMailchimp(email, {
        FNAME: fname,
        LNAME: lname,
        'group[3971][262144]': '262144',
      });

      setStatusMessage(result);
      setEmail('');
      setFname('');
      setLname('');
      setSubscribeJobBoard(false);
    }

    if (subscribeJobBoard && subscribeMailingList) {
      // Subscribe both
      const result = await addToMailchimp(email, {
        FNAME: fname,
        LNAME: lname,
        'group[6172][281474976710656]': '281474976710656',
        'group[3971][262144]': '262144',
      });

      setStatusMessage(result);
      setEmail('');
      setFname('');
      setLname('');
      setSubscribeJobBoard(false);
      setSubscribeMailingList(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className={props.variant ? `Form--${props.variant}` : ''}>
      <FormRow className='FormRow--name'>
        <FormField>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={e => setFname(e.target.value)}
          />

          <label htmlFor="fname">First name</label>
        </FormField>

        <FormField>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={e => setLname(e.target.value)}
          />

          <label htmlFor="lname">Last name</label>
        </FormField>
      </FormRow>

      <FormRow className='FormRow--email'>
        <FormField>
          <input
            className="email-input"
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="fname">Email address*</label>
        </FormField>

        <CheckBoxContainer className='CheckBoxContainer--mobile'>
          <label htmlFor={subscribeMailingList}>
            <CheckBox
              checked={subscribeMailingList}
              footer={true}
              className="checkbox"
              name="subscribeMailingList"
              onChange={() =>
                setSubscribeMailingList(!subscribeMailingList)
              }
            />

            <span>Monthly Newsletter</span>
          </label>

          <label htmlFor={subscribeJobBoard}>
            <CheckBox
              checked={subscribeJobBoard}
              footer={true}
              className="checkbox"
              name="subscribeJobBoard"
              onChange={() => setSubscribeJobBoard(!subscribeJobBoard)}
            />

            <span>CareerHub Job Board Newsletter</span>
          </label>
        </CheckBoxContainer>

        {props.variant === 'footer' && (
          <FormField className='FormField--submit'>
            <SubmitButton
              type="submit"
              value="Submit"
            >
              Sign Up
            </SubmitButton>
          </FormField>
        )}
      </FormRow>

      <CheckBoxContainer className='CheckBoxContainer--desktop'>
        <label htmlFor={subscribeMailingList}>
          <CheckBox
            checked={subscribeMailingList}
            footer={true}
            className="checkbox"
            name="subscribeMailingList"
            onChange={() =>
              setSubscribeMailingList(!subscribeMailingList)
            }
          />

          <span>Monthly Newsletter</span>
        </label>

        <label htmlFor={subscribeJobBoard}>
          <CheckBox
            checked={subscribeJobBoard}
            footer={true}
            className="checkbox"
            name="subscribeJobBoard"
            onChange={() => setSubscribeJobBoard(!subscribeJobBoard)}
          />

          <span>CareerHub Job Board Newsletter</span>
        </label>
      </CheckBoxContainer>

      <StatusMessage>
        {statusMessage &&
        statusMessage.result !== 'error' &&
        statusMessage.msg}
      </StatusMessage>

      {props.variant === 'modal' && (
        <SubmitRow>
          <SubmitButton
            type="submit"
            value="Submit"
          >
            Join the Community
          </SubmitButton>
        </SubmitRow>
      )}
    </FormContainer>
  );
};

export default MailchimpForm;
