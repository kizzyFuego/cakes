import React    from 'react';
const $ = require('jquery');
const axios = require("axios");

class ModifyOrderComponent extends React.Component {
    constructor()
    {
        super()
        this.state = {
            delete : {},
            modify : {},
            deleteID : ''          
        }
    }

    async handleModifySubmit(e){
        e.preventDefault();

        const data = {
            id: $('#id').val(), 
            sendAmount : $('#sendAmount').val(),
            receiveAmount : $('#receiveAmount').val(),
            account : $('#account').val()
        }
            const response =  await axios.put("http://localhost:3000/order/update", data );

            if( response.data.status == true )
            {
                this.setState({modifyResponse : 'Modified Successfully'});
                $('#id').val('');
                $('#sendAmount').val('');
                $('#receiveAmount').val('');
                $('#account').val('');
            }
    }

    handleDeleteSubmit(e){  
        e.preventDefault();

        axios.post("http://localhost:3000/order/delete", {id: $('#deleteID').val()} )
        .then((res) =>{
            if(res.data.status == true)
            {
                this.setState({deleteResponse : 'Deleted Successfully'});
                $('#deleteID').val('');
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-5'>
                        <form onSubmit={this.handleModifySubmit.bind(this)} className='modifySubmit'>
                            <h2>Modify An Order By ID</h2>
                            <p className='response'>{this.state.modifyResponse}</p>
                            <label>
                                Enter ID: <input type="text" name="id" id='id'/>                      
                            </label><br></br>
                            <label>
                                Modify Send Amount:<input type="text" name="sendAmount" id='sendAmount'/>                      
                            </label><br></br>
                            <label>
                                Modify Receive Amount:<input type="text" name="receiveAmount" id='receiveAmount' />                      
                            </label><br></br>
                            <label>
                                Modify Account:<input type="text" name="account" id='account' />                      
                            </label><br></br>

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className='col-4'>
                        <form className='deleteSubmit'>
                            
                            <h2>Delete An Order By ID</h2>
                            <p className='response'>{this.state.deleteResponse}</p>
                            <label>
                                Enter ID: <input type="text" name="id" id='deleteID' />                      
                            </label><br></br>
                            <input type="submit" value="Submit" onClick={this.handleDeleteSubmit.bind(this)}/>
                        </form>
                    </div>
                    <div className='col-1'></div>

                </div>
                
            </div>

        );
    }
}
export default ModifyOrderComponent;