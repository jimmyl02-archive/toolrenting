import React, { Component } from 'react';

import { Layout, Menu } from 'antd';

import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { styles } from './styles';

const { Header, Content } = Layout;

class AppLayoutComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {

        };
    }

    render () {
        return (
            <Layout style={styles.rootLayout}>
                <Header style={styles.header}>
                    <Menu
                        theme='light'
                        mode='horizontal'
                        style={{ lineHeight: '64px' }}
                        >
                    <Menu.Item key='home'><Link to='/'>Home</Link></Menu.Item>
                    <Menu.Item key='search'><Link to='/search'>Search</Link></Menu.Item>
                    { localStorage.getItem("username") ?  <Menu.Item key='myacc'><Link to='/myaccount'>My Account</Link></Menu.Item> : <Menu.Item key='login'><Link to='/login'>Login</Link></Menu.Item> }
                    <Menu.Item key='about'><Link to='/about'>About</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div style={styles.content}>
                        { this.props.children }
                    </div>
                </Content>
            </Layout>
        );
    }
}

export const AppLayout = injectSheet(styles)(AppLayoutComponent);