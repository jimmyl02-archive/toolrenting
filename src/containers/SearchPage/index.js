import React, { Component, Fragment } from 'react';

import { styles } from './styles';

import { API_IP, API_PORT, WEBSITE_IP } from '../../settings.js';
import { Input, Table, Spin, Modal, Button } from 'antd';

import injectSheet from 'react-jss';

const Search = Input.Search;

const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Seller', dataIndex: 'seller', key: 'seller' },
    { title: 'Contact', key: 'action', render: (text, record) => ( <Button onClick={ () => {alert(`email: ${record.email}`)}}>Contact</Button>) }
];

class SearchComponent extends Component {

    constructor (props) {
        super (props);
        
        this.state = {
            fullData: [],
            // Shown Data is full dataset
            shownData: [],
            realShownData: [],
            loading: true,
            showModal: false,
            email: ''
        };
    }

    componentWillMount = async () => {
        const fetchedData = await fetch(
            `http://${API_IP}:${API_PORT}/api/get`
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
                seller: sellerName.username, description: parsedData[i].description, email: sellerName.email
                })
        }
        this.setState({'fullData': tmpDataStore});
        this.setState({ 'shownData': tmpShownDataStore });
        this.setState({ 'realShownData': tmpShownDataStore });
        this.setState({ 'loading': false });
    }

    searchValue = (value) => {
        let newArr = [];
        let re = new RegExp(`${value}`, 'i');
        for(let i = 0; i < this.state.shownData.length; i++){
            if(re.test(this.state.shownData[i].name)){
                newArr.push(this.state.shownData[i]);
            }
        }
        this.setState({'realShownData': newArr});
    };    

    handleOk = (e) => {
        console.log(e);
        this.setState({
          showModal: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          showModal: false,
        });
      }

    render () {
        return (
            <div style={styles.content}>
                <div style={styles.searchBarContainer}>
                <Search
                    placeholder="What tech would you like to rent?"
                    enterButton="Search"
                    size="large"
                    onSearch={value => this.searchValue(value)}
                    style={ styles.searchBar }
                    />
                </div>
                <Modal
                    title="Information Card"
                    visible={this.state.showModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    
                </Modal>
                <Spin spinning={this.state.loading}>
                    <Table
                        style={{ 'padding': '2em' }}
                        columns={columns}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                        dataSource={this.state.realShownData}
                        />
                </Spin>
            </div>
        );
    }
}

export const SearchPage = injectSheet(styles)(SearchComponent);