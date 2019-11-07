import React from 'react';

import injectSheet from 'react-jss';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { Link } from 'react-router-dom';

import { styles } from './styles';

export const LoginForm = injectSheet(styles)(Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      remember: Form.createFormField({
        ...props.remember,
        values: props.remember.value,
      })
    };
  },
  /*
  onValuesChange(_, values) {
    // DEBUG Useful to log change events
    // console.log(values);
  },
  */
})((props) => {
  const { classes } = props;
  const { getFieldDecorator } = props.form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        await props.onSubmit(values);
      }
    });
  };
  return (
    <Form onSubmit={ handleSubmit } className={ classes.loginForm } >
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a className='login-form-forgot' href=''>Forgot password</a>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
        </Button>
      </Form.Item>
        Or <Link to='/register'>register now!</Link>
    </Form>
  );
}));
