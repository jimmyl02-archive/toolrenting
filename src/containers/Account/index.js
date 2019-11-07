import React, { Component } from 'react';

import { API_IP, API_PORT, WEBSITE_IP } from '../../settings.js';

import { styles } from './styles';
import injectSheet from 'react-jss';

import { Table, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';

const sendDeleteRequest = async (uuid) => {
    await fetch(
        `http://${API_IP}:${API_PORT}/api/removeListing/${uuid}`
    );
}

const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Seller', dataIndex: 'seller', key: 'seller' },
    { title: '', key: 'action', render: (text, record) => ( <Button onClick={ () => {sendDeleteRequest(record.uuid)}}>Delete</Button>) }
]

class AccountComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            fullData: [],
            shownData: [],
            loading: true
        };
      }

      componentWillMount = async () => {
        const fetchedData = await fetch(
            `http://${API_IP}:${API_PORT}/api/get/${localStorage.getItem('uuid')}`
        );
        const parsedData = await fetchedData.json();
        let tmpDataStore = [];
        let tmpShownDataStore = [];
        for(let i = 0; i < parsedData.length; i++) {
            tmpDataStore.push(parsedData[i]);
            const sellerNameReq = await fetch(`http://${API_IP}:${API_PORT}/api/getInfo/${parsedData[i].sellerUuid}`);
            const sellerName = await sellerNameReq.json();
            tmpShownDataStore.push({ key: i + 1, name: parsedData[i].itemName, category: parsedData[i].category, 
                location: parsedData[i].location, status: parsedData[i].status, price: parsedData[i].price, 
                seller: sellerName.username, description: parsedData[i].description, uuid: parsedData[i].uuid
                })
        }
        this.setState({'fullData': tmpDataStore});
        this.setState({ 'shownData': tmpShownDataStore });
        this.setState({ 'loading': false });
    }

      render () {
        const fields = this.state.fields;
          return (
            <div style={styles.content}>
                <div style={styles.searchBarContainer}>
                    <h1>
                        Your Account
                    </h1>
                </div>
                <div style={{ 'padding': '0 1em' }}>
                    <h2>
                        Your current listed leases
                    </h2>
                    <Link to='/create'>
                        <Button type='primary'>
                            Create a new listing
                        </Button>
                    </Link>
                    <Button style={{ 'padding': '10 0 0 0' }} onClick={ () => {localStorage.clear(); window.location=`http://${WEBSITE_IP}/`;} }>
                            Sign Out
                        </Button>
                </div>
                <Spin spinning={this.state.loading}>
                <Table
                    style={{ 'padding': '2em' }}
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={this.state.shownData}
                    />
                </Spin>
            </div>
          );
      }

}

export const Account = injectSheet(styles)(AccountComponent);