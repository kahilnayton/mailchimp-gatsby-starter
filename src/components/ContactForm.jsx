import React, { Component } from 'react';
import styled from '@emotion/styled';
import Checkbox from '../components/Checkbox';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const FormButton = styled.button`
  width: 80%;
  margin: auto;
  background: white;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: auto;
  grid-gap: 2rem;
  align-items: center;
  padding: 6.9rem 2rem 8.2rem 2rem;
  margin: 0;
  height: 100%;
  flex-direction: column;
  background-color: grey;
  max-width: 800px;

  & > * {
    font-size: 1.6rem;
  }

`;

const CheckBoxContainerOne = styled.div`
  display: grid;
  grid-template-rows: 15rem, 15rem;
  grid-template-columns: 5rem, 10rem;


  label {
    grid-row: 1;
    grid-column: 1;
    padding-right: 2rem;
  }

  h6 {
    grid-row: 1 / 3;
    grid-column: 2;
    color: ${colors.teal600};
    padding-bottom: 7rem;
  }

  p {
    grid-row: 2 / 3;
    grid-column: 2;
  }

  & + * {
    color: teal;
  }
`;

const CheckBoxContainerTwo = styled.div`
  display: grid;
  grid-template-rows: 15rem, 15rem;
  grid-template-columns: 5rem, 10rem;

  label {
    grid-row: 1;
    grid-column: 1;
    padding-right: 2rem;
  }

  h6 {
    grid-row: 1 / 3;
    padding-bottom: 7rem;
    grid-column: 2;
    color: teal;
  }

  p {
    grid-row: 2 / 3;
    grid-column: 2;
  }

  & + * {
    color: teal;
  }
`;

const EmailInput = styled.input`
  margin-bottom: 1rem;
  height: 6rem;
  border: 1px solid #eee;
  width: 100%;

  & + * {
    color: teal;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid #eee;
  resize: none;
  height: 10rem;
  width: 100%;

  input {
    border: solid;
  }

  & + * {
    color: teal;
  }
`;

const Input = styled.input`
  height: 6rem;
  border: 1px solid #eee;
  width: 100%;

  & + * {
    color: teal;
  }
`;

const SignMeUp = styled.div`
  color: teal;
  font-size: 1.6rem;
`;

const StatusMessage = styled.div`
  font-size: 1.6rem;
`;

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      title: '',
      message: '',
      subscribeJobBoard: false,
      subscribeMailingList: false,
      sendToMailChimp: false,
      MailChimpResult: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    if (this.state.subscribeMailingList && !this.state.subscribeJobBoard) {
      // Subscribe mailing list
      const result = await addToMailchimp(this.state.email, {
        FNAME: this.state.firstName,
        LNAME: this.state.lastName,
        'group[6172][281474976710656]': '281474976710656',
      });
      this.setState({ MailChimpResult: result });
    }
    if (this.state.subscribeJobBoard && !this.state.subscribeMailingList) {
      // Subscribe job board
      const result = await addToMailchimp(this.state.email, {
        FNAME: this.state.firstName,
        LNAME: this.state.lastName,
        'group[3971][262144]': '262144',
      });
      this.setState({ MailChimpResult: result });
    }
    if (this.state.subscribeJobBoard && this.state.subscribeMailingList) {
      // Subscribe to both
      const result = await addToMailchimp(this.state.email, {
        FNAME: this.state.firstName,
        LNAME: this.state.lastName,
        'group[3971][262144]': '262144',
        'group[6172][281474976710656]': '281474976710656',
      });
      this.setState({ MailChimpResult: result });
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() =>
        this.setState({
          statusMessage: 'Thank you for contacting us!',
        })
      )
      .catch(() =>
        this.setState({
          statusMessage: 'Something went wrong, please try again later.',
        })
      )
      .catch(error =>
        console.error('There was a problem with the form response', error)
      )
      .then(() =>
        console.log('%c Netlify Forms and Mailchimp data sent', 'color: green')
      )
      .finally(() =>
        this.setState({
          firstName: [],
          lastName: [],
          email: [],
          organization: [],
          message: [],
          title: [],
        })
      );
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleCheckboxChange = e => {
    if (e.target.name === 'subscribeMailingList') {
      this.setState({ subscribeMailingList: e.target.checked });
    }
    if (e.target.name === 'subscribeJobBoard') {
      this.setState({ subscribeJobBoard: e.target.checked });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      organization,
      title,
      message,
      statusMessage,
    } = this.state;

    const { contactPage } = this.props;

    return (
      <>
        <Form
          name="contact-leading-edge"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact-leading-edge" />

          <div className="first-name">
            <Input
              name="firstName"
              id="firstName"
              value={firstName}
              required={true}
              onChange={this.handleChange}
            />
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className="last-name">
            <Input
              name="lastName"
              id="lastName"
              required={true}
              value={lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>

          <div className="email">
            <EmailInput
              name="email"
              id="email"
              required={true}
              value={email}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="organization">
            <Input
              name="organization"
              id="organization"
              required={false}
              value={organization}
              onChange={this.handleChange}
            />
            <label htmlFor="organization">Organization</label>
          </div>

          <div className="title">
            <Input
              name="title"
              id="title"
              required={false}
              value={title}
              onChange={this.handleChange}
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="message">
            <TextArea
              name="message"
              id="message"
              required={false}
              value={message}
              onChange={this.handleChange}
            />
            <label htmlFor="message">Message</label>
          </div>

          <SignMeUp>{contactPage.sign_me_up_text[0].text}</SignMeUp>

          <CheckBoxContainerOne>
            <label htmlFor={this.state.subscribeMailingList}>
              <Checkbox
                checked={this.state.subscribeMailingList}
                name="subscribeMailingList"
                onChange={this.handleCheckboxChange}
              />
            </label>

            <h6>{contactPage.newsletter_checkbox_title[0].text}</h6>

            <p>{contactPage.newsletter_checkbox_description[0].text}</p>
          </CheckBoxContainerOne>

          <CheckBoxContainerTwo>
            <label htmlFor={this.state.subscribeJobBoard}>
              <Checkbox
                checked={this.state.subscribeJobBoard}
                name="subscribeJobBoard"
                onChange={this.handleCheckboxChange}
              />
            </label>

            <h6>{contactPage.careerhub_checkbox_title[0].text}</h6>

            <p>{contactPage.careerhub_checkbox_description[0].text}</p>
          </CheckBoxContainerTwo>

          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}

          <FormButton type="submit">Join the Community</FormButton>
        </Form>
      </>
    );
  }
}
