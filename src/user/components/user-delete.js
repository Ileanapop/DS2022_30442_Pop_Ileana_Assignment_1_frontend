import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import { TextField } from '@material-ui/core';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import '../../commons/styles/project-style.css';


class DeleteUser extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          password:'',
          name:'',
          selectedType: '',
          type:'',
          id:'',
          searchedUsername:'',         
        };
      }

      handleSearch(e) { 
        axios.get("https://localhost:44378/api/User/byName", {
           params: {
               name: this.state.searchedUsername
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        console.log(response.data);

        this.setState({name: response.data["name"]})
        this.setState({type: response.data["type"]})
        this.setState({id: response.data["id"]})       
       })
       .catch((err) => {
        //console.log(err.response.status)        
        if(err.response.status === 403){
            alert("Unauthorized")
            window.location = '/'
        }
        else
        {
            alert(err.response.data)
            this.setState({name: "not found"})
            this.setState({type: "not found"})
            this.setState({id: "not found"})      
        }
       });
    }

    handleDelete(e) { 
        axios.delete("https://localhost:44378/api/User", {
           params: {
               id: this.state.id
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        console.log(response.data);
        alert("User deleted successfully")     
       })
       .catch((err) => {
        //console.log(err.response.status)        
        if(err.response.status === 403){
            alert("Unauthorized")
            window.location = '/'
        }
        else{
            alert(err.response.data)
        }
       });
    }

        
      render() {

        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='admin'){
            return (<Redirect to={"/"}/>)
        }

        return(
            <div className='divAdmin'>
                <CustomAppBar></CustomAppBar>

                <CustomNavBar></CustomNavBar>

                <div style={{'backgroundColor': 'AliceBlue', marginLeft:70}}>

                <h1>Delete user</h1>
                    <div className="searchDiv">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.setState({searchedUsername: e.target.value})}}
                        />                  
                    <button className="primary" onClick={(e) => this.handleSearch(e)}>Search</button>
                    </div>
                    <div className='mainDiv2'>

                    <h1>Results:</h1>
                    <div className="input-group">
                <label className='getLabel'>Name: </label>
                <label className='getData'>{this.state.name}</label>
              </div>
    
              <div className="input-group">
              <label className='getLabel'>User Type: </label>
              <label className='getData'>{this.state.type}</label>  
              </div>
              
                 
                <button className="primary" onClick={(e) => this.handleDelete(e)}>Delete User</button>
                </div>
                </div>
            </div>
        )
      }
  }

  export default DeleteUser;