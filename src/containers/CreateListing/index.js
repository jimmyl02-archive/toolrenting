import React, { Component } from 'react';

import { CreateListingForm } from './CreateListingForm';
import { API_IP, API_PORT, WEBSITE_IP } from '../../settings.js';

import { styles } from './styles';
import injectSheet from 'react-jss';

import { Spin, Alert, Card } from 'antd';
import { Redirect } from 'react-router-dom';

class CreateListingComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          fields: {
            itemName: {
              value: ''
            },
            category: {
              value: ''
            },
            price: {
              value: ''
            },
            desc: {
                value: ''
            },
            location: {
                value: ''
            }
          },
          unauth: false,
          error: false,
          loading: false,
        };
      }

      submitData = async () => {
        this.setState({ loading: true });
    
        const submittedLogin = await fetch(
          `http://${API_IP}:${API_PORT}/api/createItem`,
          {
            body: JSON.stringify({
                sellerUuid: localStorage.getItem('uuid'),
              category: this.state.fields.category.value,
              itemName: this.state.fields.itemName.value,
              numItem: 1,
              price: this.state.fields.price.value,
              description: this.state.fields.desc.value,
              location: this.state.fields.location.value
            }),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
          }
        );
    
        if (submittedLogin.status === 401) {
          this.setState({ unauth: true });
        } else if (submittedLogin.status !== 200) {
          this.setState({ error: true });
        } else {
          const parsedObj = await submittedLogin.json();
        }
        this.setState({ loading: false });
      }

      handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
          fields: {...fields, ...changedFields}
        }));
      }

      render () {
        const fields = this.state.fields;
          return (
            <div style={styles.content}>
            <Card style={styles.loginCard}>
              <h2 style={{ textAlign: 'center' }}>Create Listing</h2>
              {
                (this.state.unauth) ?
                  <Alert type='error' message="Incorrect username / password" banner /> : null
              }
              {
                (this.state.error) ?
                  <Alert type='error' message='A system error has occured, please try again. If this error persists please contact the voluntu staff' banner /> : null
              }
              <Spin spinning={this.state.loading}>
                <CreateListingForm style={ styles.loginForm } {...fields} onChange={this.handleFormChange} onSubmit={ this.submitData.bind(this) } />
              </Spin>
            </Card>
          </div>
          );
      }

}

export const CreateListing = injectSheet(styles)(CreateListingComponent);