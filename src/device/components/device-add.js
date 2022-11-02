import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import '../../commons/styles/project-style.css';


class CreateDevice extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          description:'',
          maxHourlyEnergy:'',
          modelName:''
        };
      }
    
       
      handleUpload(e) { 
    
        
        axios({
      
          url: "https://localhost:7292/api/EnergyDevice",
          method: "POST",
          headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         },
      
         data: {
          modelName:this.state.modelName,          
          maxHourlyEnergy: this.state.maxHourlyEnergy,
          description: this.state.description
        },
      
        })  
          .then((res) => { 
            console.log(res.status)
            alert('New energy device created successfully')
            
          })
          .catch((err) => {        
            if(err.response.status === 403){
                alert("Unauthorized")
                window.location = '/'
            }
            else
            {
                if(err.response.status===400)
                    alert("Bad request")
                else
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
    
        return (
            <div className='divAdmin' >
           
            <CustomAppBar></CustomAppBar>
            <CustomNavBar></CustomNavBar>

            <div style={{'backgroundColor': 'AliceBlue', marginLeft:70}}>
            <div className="input-group">
                <label htmlFor="name">Model Name: </label>
                <input type="text" name="name"  onChange={(e) => { this.setState({modelName: e.target.value})}} required/>
              </div>

              <div className="input-group">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" onChange={(e) => { this.setState({description: e.target.value})}} required/>
              </div>

              <div className="input-group">
                <label htmlFor="maxHourlyEnergy">MaxHourlyEnergy: </label>
                <input type="text" name="maxHourlyEnergy" onChange={(e) => { this.setState({maxHourlyEnergy: e.target.value})}} required/>
              </div>
    
                    
              <button className="primary" onClick={(e) => this.handleUpload(e)}>Create New Energy Device</button>
              </div>
          </div>
        );
      }
  }

  export default CreateDevice;