import React from 'react';
import '../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomClientNavBar from '../commons/app_bars/client_nav_bar';
import {Redirect} from "react-router-dom";

class ClientChat extends React.Component {

    constructor(props) {
        super();
        this.state = {
            messages: [],
            currentMessage:''
        };
     
    }

    handleNewMsg(e) { 
    
        var myObj = {
            sender: "client",
            text: this.state.currentMessage
        };
        var messagesSoFar = this.state.messages
        messagesSoFar.push(myObj)
        this.setState({messages:messagesSoFar});
        
    }

    render() {

        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='client'){
            return (<Redirect to={"/"}/>)
        }

        return (


            <div>
                <CustomAppBar></CustomAppBar>
                <CustomClientNavBar></CustomClientNavBar>
                <div style={{'backgroundColor': 'white', border:50, marginLeft:60}}>
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th>Chat messages</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.messages.map((message, index) => (
                            <tr key = {index}> 
                                <td width={100}>{message.sender}</td>  
                                <td width={400}>{message.text}</td>                          
                            </tr>
                        ))
                    }
                    <tr>
                    <div className="input-group">
                        <label htmlFor="message">Type message: </label>
                        <input type="text" name="newMessage" onChange={(e) => { this.setState({currentMessage: e.target.value})}} required/>
                    </div>
            
                            
                    <button className="primary" onClick={(e) => this.handleNewMsg(e)}>Send</button>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>

        )
    };
}

export default ClientChat
