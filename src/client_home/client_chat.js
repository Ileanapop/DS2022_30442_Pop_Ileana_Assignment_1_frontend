import React from 'react';
import '../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomClientNavBar from '../commons/app_bars/client_nav_bar';
import {Redirect} from "react-router-dom";
import {User, ReceiveMsgRequest, ChatMessage} from '../output/src/chat_pb'
import { ChatServiceClient } from "../output/src/chat_grpc_web_pb";

class ClientChat extends React.Component {

    constructor(props) {
        super();
        this.state = {
            admin_id:'',
            messages: [],
            currentMessage:''
        };
        this.client = new ChatServiceClient("https://localhost:44378", null, null);
        this.chatStream = null

        const user = new User();
        user.setId(JSON.parse(localStorage.getItem('userId')));
        user.setName(JSON.parse(localStorage.getItem('name')));
        user.setType("client");

        this.client.joinChat(user, null, (err, response) => {
            if (err) return console.log(err);
            const error = response.getError();
            const msg = response.getMsg();

            console.log(error);
            console.log(msg);

            //var messagesSoFar = this.state.messages
           // messagesSoFar.push(msg)
            //this.setState({messages:messagesSoFar});
            this.setState({messages:[msg]});
            
            if(error === 0){
                //create chat stream
                this.setState({admin_id: msg})
                const strRq = new ReceiveMsgRequest()
                strRq.setId(JSON.parse(localStorage.getItem('userId')))
                strRq.setUser(JSON.parse(localStorage.getItem('name')))

                this.chatStream = this.client.receiveMsg(strRq,{})
                this.chatStream.on("data", (response) => {
                    const from = response.getFrom();
                    if(from!==""){
                        const msg = response.getMsg();
                        const to = response.getTo();

                        var messagesSoFar = this.state.messages
                        messagesSoFar.push(msg)
                        this.setState({messages:messagesSoFar});
                    }
                });

                this.chatStream.on("status", function (status) {
                    console.log(status.code, status.details, status.metadata);
                });
              
                this.chatStream.on("end", () => {
                    console.log("Stream ended.");
                });

            }

        });
    }

    /*componentDidMount = () => {

        const user = new User();
        user.setId(JSON.parse(localStorage.getItem('userId')));
        user.setName(JSON.parse(localStorage.getItem('name')));
        user.setType("client");

        this.client.joinChat(user, null, (err, response) => {
            if (err) return console.log(err);
            const error = response.getError();
            const msg = response.getMsg();

            console.log(error);
            console.log(msg);

            //var messagesSoFar = this.state.messages
           // messagesSoFar.push(msg)
            //this.setState({messages:messagesSoFar});
            this.setState({messages:[msg]});
            
            if(error === 0){
                //create chat stream
                this.setState({admin_id: msg})
                const strRq = new ReceiveMsgRequest()
                strRq.setId(JSON.parse(localStorage.getItem('userId')))
                strRq.setUser(JSON.parse(localStorage.getItem('name')))

                this.chatStream = this.client.receiveMsg(strRq,{})
                this.chatStream.on("data", (response) => {
                    const from = response.getFrom();
                    const msg = response.getMsg();
                    const to = response.getTo();

                    var messagesSoFar = this.state.messages
                    messagesSoFar.push(msg)
                    this.setState({messages:messagesSoFar});
                });

                this.chatStream.on("status", function (status) {
                    console.log(status.code, status.details, status.metadata);
                });
              
                this.chatStream.on("end", () => {
                    console.log("Stream ended.");
                });

            }

        });
        
    }*/

    handleNewMsg(e) { 

        const msg = new ChatMessage();
        msg.setMsg(this.state.currentMessage);
        msg.setFrom(JSON.parse(localStorage.getItem('userId')))
        msg.setTo(this.state.admin_id)

        this.client.sendMsg(msg, null, (err, response) => {
            console.log(response);
        });

        var msgSoFar = this.state.messages
        msgSoFar.push(this.state.currentMessage)
        this.setState({messages:msgSoFar});

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
                                <td width={400}>{message}</td>                                                     
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
