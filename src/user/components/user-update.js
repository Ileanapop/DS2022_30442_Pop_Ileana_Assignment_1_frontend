import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import { TextField } from '@material-ui/core';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import '../../commons/styles/project-style.css';


class UpdateUser extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          password:'',
          name:'',
          selectedType: '',
          types:['admin','client'], 
          id:'',
          searchedUsername:'', 
          typeNow:'',
          hasSelectedType:0
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
        console.log(response.data['name'])      
        this.setState({name: response.data["name"]})
        this.setState({password: response.data["password"]})
        this.setState({typeNow: response.data["type"]})
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


      handleUpdate(e) { 
    
        var finalType = ''
        if(this.state.selectedType!=='')
           finalType = this.state.selectedType
        else
           finalType = this.state.typeNow
        console.log(finalType)
        axios({
      
          url: "https://localhost:44378/api/User",
          method: "PUT",
          headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         },
      
         data: {
          id: this.state.id,
          name:this.state.name,          
          password:this.state.password,
          type:finalType},
      
        })  
          .then((res) => { 
            console.log(res.status)
            alert('User updated successfully')
            
          })
          .catch((err) => {        
            if(err.response.status === 403){
                alert("Unauthorized")
                window.location = '/'
            }
            else
            {
              alert(err.response.data)
            }
           });
      }
    
      handleSelection(e) { 
        this.setState({hasSelectedType:1});
        console.log(this.state.selectedType);
        localStorage.setItem('selectedType', JSON.stringify(this.state.selectedType));
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

                <h1>Update user</h1>
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
                <label htmlFor="name">Name</label>
                <input type="text" name="name"  onChange={(e) => { this.setState({name: e.target.value})}} placeholder={this.state.name} required/>
              </div>

              <div className="input-group">
                <label htmlFor="password">New Password</label>
                <input type="password" name="password" onChange={(e) => { this.setState({password: e.target.value})}} required/>
              </div>
    
              <label className='getLabel'>User Type: </label>
              <label className='getData'>{this.state.typeNow}</label>

              <div className="input-group">
              <label htmlFor="itemName">Select New User Type</label>
              <div className="form-group col-md-6">                           
              <select className="form-control" name="city" onChange={(e) => { this.setState({selectedType: e.target.value})}} required>                                      
              {this.state.types.map((item) => {
                        return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                        )
                    })}
                      </select>
                    </div>              
                    </div>
                    
              <button className="primary" onClick={(e) => this.handleUpdate(e)}>Update</button>
                    </div>

                </div>
            </div>
        )
      }
  }

  export default UpdateUser;