import React from 'react';

import injectSheet from 'react-jss';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { Link } from 'react-router-dom';

import { styles } from '../Account/styles';

export const CreateListingForm = injectSheet(styles)(Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      itemName: Form.createFormField({
        ...props.itemName,
        value: props.itemName.value,
      }),
      category: Form.createFormField({
        ...props.category,
        value: props.category.value,
      }),
      price: Form.createFormField({
        ...props.price,
        values: props.price.value,
      }),
      desc: Form.createFormField({
        ...props.desc,
        values: props.desc.value,
      }),
      location: Form.createFormField({
        ...props.location,
        values: props.location.value,
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
        {getFieldDecorator('itemName', {
          rules: [{ required: true, message: 'Please tell us what you are selling!' }],
        })(
          <Input placeholder='Item name' />
        )}
      </Form.Item>
      
      <Form.Item>
        {getFieldDecorator('category', {
          rules: [{ required: true, message: 'Please tell us the type of item!' }],
        })(
          <Input placeholder='Category name' />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('price', {
          rules: [{ required: true, message: 'Please tell us how much you want to sell it for!' }],
        })(
          <Input placeholder='Price' />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please tell us a short description!' }],
        })(
          <Input placeholder='Description' />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('location', {
          rules: [{ required: true, message: 'Please tell us the location!' }],
        })(
          <Input placeholder='Location' />
        )}
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
              Create Listing
        </Button>
      </Form.Item>
    </Form>
  );
}));
