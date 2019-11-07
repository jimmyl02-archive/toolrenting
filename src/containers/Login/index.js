import React, { Component } from 'react';

import { LoginForm } from './LoginForm';
import { API_IP, API_PORT, WEBSITE_IP } from '../../settings.js';

import { styles } from './styles';
import injectSheet from 'react-jss';

import { Spin, Alert, Card } from 'antd';
import { Redirect } from 'react-router';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        username: {
          value: ''
        },
        password: {
          value: ''
        },
        remember: {
          value: false
        }
      },
      unauth: false,
      error: false,
      loading: false,
      redirect: false
    };
  }

  submitData = async () => {
    this.setState({ loading: true });

    const submittedLogin = await fetch(
      `http://${API_IP}:${API_PORT}/api/login`,
      {
        body: JSON.stringify({
          username: this.state.fields.username.value,
          password: this.state.fields.password.value
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

      const remember = this.state.fields.remember.value;

        //Save data in localstorage
        localStorage.setItem('username', this.state.fields.username.value);
        localStorage.setItem('uuid', parsedObj.uuid);
        this.setState({'redirect': true });
    }
    this.setState({ loading: false });
  }

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: {...fields, ...changedFields}
    }));
  }

  componentDidMount() {
    this.isUnmounted = false;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render () {
    const fields = this.state.fields;
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to='/myaccount' />;
    } else {
      return (
        <div style={styles.content}>
          <Card style={styles.loginCard}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            {
              (this.state.unauth) ?
                <Alert type='error' message="Incorrect username / password" banner /> : null
            }
            {
              (this.state.error) ?
                <Alert type='error' message='A system error has occured, please try again. If this error persists please contact the voluntu staff' banner /> : null
            }
            <Spin spinning={this.state.loading}>
              <LoginForm className={ classes.loginForm } {...fields} onChange={this.handleFormChange} onSubmit={ this.submitData.bind(this) } />
            </Spin>
          </Card>
        </div>
      );
    }
  }
}

/**
 * Exported helper function that renders the login component, connected to styles and redux.
 * @returns Login component.
 */
export const Login = injectSheet(styles)(LoginComponent);
