import React from 'react';
import '../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomNavBar from '../commons/app_bars/nav_bar';
import {Redirect} from "react-router-dom";
import {User, ReceiveMsgRequest, ChatMessage} from '../output/src/chat_pb'
import { ChatServiceClient } from "../output/src/chat_grpc_web_pb";

class AdminChat extends React.Component {

    constructor(props) {
        super();
        this.state = {
            current_client:'',
            current_messages: [],
            current_message:'',
            clientsWithMessages:[],
            all_clients:[]
        };
        this.client = new ChatServiceClient("https://localhost:44378", null, null);
        this.chatStream = null

        const user = new User();
        user.setId(JSON.parse(localStorage.getItem('userId')));
        user.setName(JSON.parse(localStorage.getItem('name')));
        user.setType("admin");

        this.client.joinChat(user, null, (err, response) => {
            if (err) return console.log(err);
            const error = response.getError();
            const msg = response.getMsg();

            console.log(error);
            console.log(msg);

            //var messagesSoFar = this.state.messages
           // messagesSoFar.push(msg)
            //this.setState({messages:messagesSoFar});
            
            
                //create chat stream
            const strRq = new ReceiveMsgRequest()
            strRq.setId(JSON.parse(localStorage.getItem('userId')))
            strRq.setUser(JSON.parse(localStorage.getItem('name')))

            this.chatStream = this.client.receiveMsg(strRq,{})
            this.chatStream.on("data", (response) => {
                const from = response.getFrom();
                if(from!==""){
                    const msg = response.getMsg();
                    const to = response.getTo();

                    if(!this.state.all_clients.includes(from)){
                        var clientsSoFar = this.state.all_clients
                        clientsSoFar.push(from)
                        this.setState({all_clients:clientsSoFar});
                    }

                    //update messages

                    var allMessagesForThisAdmin = this.state.clientsWithMessages
                    allMessagesForThisAdmin.push(response)
                    this.setState({clientsWithMessages:allMessagesForThisAdmin});

                    if(!this.state.current_client){
                        this.setState({current_client:from})
                    }
                    this.getMessagesOfCurrentClient();
                }

            });

            this.chatStream.on("status", function (status) {
                   console.log(status.code, status.details, status.metadata);
            });
              
            this.chatStream.on("end", () => {
                console.log("Stream ended.");
            });


        });

    }

    /*componentDidMount = () => {

        const user = new User();
        user.setId(JSON.parse(localStorage.getItem('userId')));
        user.setName(JSON.parse(localStorage.getItem('name')));
        user.setType("admin");

        this.client.joinChat(user, null, (err, response) => {
            if (err) return console.log(err);
            const error = response.getError();
            const msg = response.getMsg();

            console.log(error);
            console.log(msg);

            //var messagesSoFar = this.state.messages
           // messagesSoFar.push(msg)
            //this.setState({messages:messagesSoFar});
            
            
                //create chat stream
            const strRq = new ReceiveMsgRequest()
            strRq.setId(JSON.parse(localStorage.getItem('userId')))
            strRq.setUser(JSON.parse(localStorage.getItem('name')))

            this.chatStream = this.client.receiveMsg(strRq,{})
            this.chatStream.on("data", (response) => {
                const from = response.getFrom();
                const msg = response.getMsg();
                const to = response.getTo();

                //update messages

                var allMessagesForThisAdmin = this.state.clientsWithMessages
                allMessagesForThisAdmin.push(response)
                this.setState({clientsWithMessages:allMessagesForThisAdmin});

                if(!this.state.current_client){
                    this.setState({current_client:from})
                       this.getMessagesOfCurrentClient();
                }

            });

            this.chatStream.on("status", function (status) {
                   console.log(status.code, status.details, status.metadata);
            });
              
            this.chatStream.on("end", () => {
                console.log("Stream ended.");
            });


        });
        
    }*/

    getMessagesOfCurrentClient(){

        var messages_client = [];

        for(var i = 0; i < this.state.clientsWithMessages.length; i++){
            var chat_msg = this.state.clientsWithMessages[i];
            var from = chat_msg.getFrom()
            var to = chat_msg.getTo()
            if(from === this.state.current_client  || to === this.state.current_client){
                messages_client.push(chat_msg.getMsg())
            }
        }

        this.setState({current_messages: messages_client})
    }

    handleNewMsg(e) { 

        const msg = new ChatMessage();
        msg.setMsg(this.state.currentMessage);
        msg.setFrom(JSON.parse(localStorage.getItem('userId')))
        msg.setTo(this.state.current_client)

        this.client.sendMsg(msg, null, (err, response) => {
            console.log(response);
        });

        var allMessagesForThisAdmin = this.state.clientsWithMessages
        allMessagesForThisAdmin.push(msg)
        this.setState({clientsWithMessages:allMessagesForThisAdmin});

        this.getMessagesOfCurrentClient()

    }

    changeChat(e) { 

        //this.setState({current_client: e.target.value})
        this.getMessagesOfCurrentClient();
    }

    handleClientChatMessages(e) { 

        console.log(e.target.value)
        this.setState({current_client: e.target.value})
        this.getMessagesOfCurrentClient();
    }

    render() {

        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='admin'){
            return (<Redirect to={"/"}/>)
        }

        return (


            <div>
                <CustomAppBar></CustomAppBar>
                <CustomNavBar></CustomNavBar>

                <div style={{ border:50, marginLeft:100, marginTop: 50,width:500}}>
         
                    <h1>Clients online</h1>
                    <br></br>
                    <div>                           
                      <select onChange={(e) => { this.setState({current_client: e.target.value})}}>                                     
                        {this.state.all_clients.map((item) => {
                            return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                            )
                        })}
                      </select>
                  </div>


                  <button className="primary" onClick={(e) => this.changeChat(e)}>See chat</button>
                              
                </div>

                <div style={{'backgroundColor': 'white', border:50, marginLeft:60}}>
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th>Chat messages</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.current_messages.map((message, index) => (
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

export default AdminChat
