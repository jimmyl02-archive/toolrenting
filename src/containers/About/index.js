import React, { Component, Fragment } from 'react';

import { styles } from './styles';

import { Button } from 'antd';
import { Link } from 'react-router-dom';

import injectSheet from 'react-jss';

class AboutComponent extends Component {

    constructor (props) {
        super (props);
        
        this.state = {
    
        };
      }

    render () {
        return (
            <Fragment>
                <div style={styles.content}>
                    <h1>About Us</h1>
                    <div style={{'display': 'flex', 'direction': 'row', 'justifyContent': 'center'}}>
                    <p style={{'width': '50%'}}>Setting up a donated legacy Mac server for our school, we struggled to find an a suitable monitor connector for the outdated device.

We rushed to the nearest Best Buy and bought a connector that ended up being incompatible. We had to call our donator again because he was one of the few people who had the necessary hardware

This is where Rentech comes into play. Rentech is a service website similar to eBay and Craigslist that allows users to make their items available for other users to rent quickly and easily. When renting an item, the user pays a rental fee to the item leaser as well as a deposit in case the item is not returned safely, preventing item theft. When the item is successfully given back to the leaser, the renter is given back this coverage cost  - otherwise, the leaser is reimbursed

We at Rentech value customer ease-of-use and satisfaction, providing quick, easy, and reliable rental technology. It has never been easier to organize the tech necessities for any task, at any scale.
</p>
</div>
                </div>
            </Fragment>
        );
    }

}

export const About = () => {
    const About = injectSheet(styles)(AboutComponent);
    return <About />;
  };