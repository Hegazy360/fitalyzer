import React from 'react'
import {Modal, Button, Form} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'


let SignInForm = props => {
  const { handleSubmit } = props
  return (
    <Modal trigger={<Button primary>Sign In</Button>} centered={false} size='small'>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Field name="email" label='Email' component={Form.Input} type="email" />
            <Field name="password" label='Password' component={Form.Input} type="password" />
            <Button secondary type='submit' >Submit</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

SignInForm = reduxForm({
  // a unique name for the form
  form: 'signIn'
})(SignInForm)

export default SignInForm
