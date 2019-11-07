import React, { Component, Fragment } from 'react';

import { styles } from './styles';

import { Button } from 'antd';
import { Link } from 'react-router-dom';

import injectSheet from 'react-jss';

class HomeComponent extends Component {

    constructor (props) {
        super (props);
        
        this.state = {
    
        };
      }

    render () {
        return (
            <Fragment>
                <div style={styles.content}>
                <div style={{ 'display': 'flex', 'direction': 'row', 'justifyContent': 'center'}}>
                    <img src='./ToolrentLogo.png' alt='tmp' style={{ 'width': '910px', 'height': '480px'}} />
                </div>
                    <p>The premier location for you to lease and rent tech</p>
                    <Link to="/search">
                        <Button type="primary">Search Now</Button>
                    </Link>
                </div>
            </Fragment>
        );
    }

}

export const Home = () => {
    const Home = injectSheet(styles)(HomeComponent);
    return <Home />;
  };