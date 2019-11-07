
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppLayout } from './components/AppLayout';

import { Home } from './containers/Home';
import { Login } from './containers/Login';
import { SearchPage } from './containers/SearchPage';
import { Account } from './containers/Account';
import { CreateListing } from './containers/CreateListing';
import { About } from './containers/About';

export class RootRouter extends Component {
  render () {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <AppLayout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/search' component={SearchPage} />
                <Route path='/myaccount' component={Account} />
                <Route path='/create' component={CreateListing} />
                <Route path='/about' component={About}/>
            </Switch>
        </AppLayout>
      </BrowserRouter>
    );
  }
}
