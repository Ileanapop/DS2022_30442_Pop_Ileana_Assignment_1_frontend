import React from 'react';
import '../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomClientNavBar from '../commons/app_bars/client_nav_bar';
import {Redirect} from "react-router-dom";

class ClientNotifications extends React.Component {

    constructor(props) {
        super();
        this.state = {
            notifications: []
        };
        this.web_socket = new WebSocket("wss://localhost:44378/api/WebSockets");

        this.web_socket.onopen = () => {
            console.log("open")
            this.web_socket.send(JSON.parse(localStorage.getItem('userId')));
             
        };
        this.web_socket.onmessage = (event) => {
            console.log("got message", event.data);
            var notificationsSoFar = this.state.notifications
            notificationsSoFar.push(event.data)
            this.setState({notifications:notificationsSoFar});
            //return false;
        };

        this.web_socket.onclose = (code, reason) => {
            console.log(code);
        }
     
    }

    componentDidMount = () => {

        //this.setState({web_socket : new WebSocket("wss://localhost:44378/api/WebSockets")});
        //console.log("client connected")

        //this.web_socket.onerror = (event) => {console.log(event.data)}

        /*this.web_socket.addEventListener('message', (event) => {
            //var notificationsSoFar = this.state.notifications
            //notificationsSoFar.push(event.data)
            //this.setState({notifications:notificationsSoFar});
            console.log(event.data)
        });*/

        /*this.web_socket.onmessage = (event) => {
            console.log("got message", event.data);
            //return false;
        };*/

        /*this.web_socket.onclose = (code, reason) => {this.web_socket = new WebSocket("wss://localhost:44378/api/WebSockets");}

        this.web_socket.onopen = () => {
            console.log("open2")
            this.web_socket.send(JSON.parse(localStorage.getItem('userId')));
            //this.keepAlive();  
        };*/

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
                        <th>Notifications</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.notifications.map((notif, index) => (
                            <tr key = {index}> 
                                <td width={400}>{notif}</td>                          
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            </div>

        )
    };
}

export default ClientNotifications
