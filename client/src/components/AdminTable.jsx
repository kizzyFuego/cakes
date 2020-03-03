import React from 'react';
import Table from 'react-bootstrap/Table';

const $ = require('jquery');
const axios = require("axios");

class AdminTable extends React.Component {
    constructor()
    {
        super()
        this.state = {
            data : []
        }
        this.loadData();
    }

    async loadData(){
        const response =  await axios.get("http://localhost:3000/order/", {} );
        this.setState({data : response.data});
    }

    render() {

        return(
            <div>
                <h3 className='adminHeader'>Admin Page: Orders Made (diplay 20 max)</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Send Amount</th>
                        <th>Receive Amount</th>
                        <th>Account</th>
                        </tr>
                    </thead>
                    { this.state.data.map( data => (
                            <tbody>
                                <tr>
                                <td>{data._id}</td>
                                <td>{data.from}</td>
                                <td>{data.to}</td>
                                <td>{data.sendAmount}</td>
                                <td>{data.receiveAmount}</td>
                                <td>{data.account}</td>
                                </tr>
                            </tbody>
                        ) )
                    }
                    
                </Table>
            </div>

        );
    }
}
export default AdminTable;