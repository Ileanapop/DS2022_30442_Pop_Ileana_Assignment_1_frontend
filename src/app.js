import React from 'react'
import './commons/styles/project-style.css';
import axios from "axios";

class App extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          username:'',
          password:'',
          loggedIn:0
        };
    }

    handleLogin(e) { 
        /*return API_USERS.login( this.state.username, this.state.password, (result, status, err) => {
            console.log("hello")
            if (result !== null && status === 200) {
                console.log("success");
                localStorage.setItem('username', JSON.stringify(this.state.email));
                localStorage.setItem('password', JSON.stringify(this.state.password));
                localStorage.setItem('token', JSON.stringify(result.data));
                this.setState({loggedIn:1})  
            } else {
                this.setState(({
                errorStatus: status,
                error: err
                }));
            }
        }); */
        axios.get("https://localhost:44378/api/Login", {
           params: {
               name: this.state.username,
               password: this.state.password
           }
       })
       .then((response) =>{
        console.log(response.data);
        localStorage.setItem('name', JSON.stringify(this.state.username));
        localStorage.setItem('password', JSON.stringify(this.state.password));
        localStorage.setItem('token', JSON.stringify(response.data["key"]));
        localStorage.setItem('type', JSON.stringify(response.data['userRole']));
        this.setState({loggedIn:1})  
        if(response.data['userRole'] === 'admin'){
            window.location = '/admin/home'
        }     
        if(response.data['userRole'] === 'client'){
            window.location = '/client/home'
        }
       })
       .catch((error) => alert("Invalid login credentials"));
    }

    render() {

        return (
            <div className='mainDiv'>
            <div id="login-form-wrap">
                <h2>Login</h2>
                <form id="login-form">
                <p>
                <input type="text" id="username" name="username" placeholder="Username" onChange={(e) => { this.setState({username: e.target.value})}} required></input>
                </p>
                <p>
                <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => { this.setState({password: e.target.value})}} required></input>
                </p>
                <br></br>
                <br></br>
                </form>
                <button type="submit" onClick={(e) => this.handleLogin(e)}>Login</button>
            </div>
            </div>
        )
    };
}

export default App
