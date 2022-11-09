import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import { TextField } from '@material-ui/core';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import {List} from '@material-ui/core';
import '../../commons/styles/project-style.css';


class GetDevice extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          description:'',
          maxHourlyEnergy:'',
          modelName:'',
          id:'',
          searchedDevice:'',
          userDevices:[]
        };
      }

      handleSearch(e) { 
        axios.get("https://localhost:44378/api/EnergyDevice/byName", {
           params: {
               name: this.state.searchedDevice
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        console.log(response.data);
    
        var items = [];
        var source =response.data["userDevices"];
        if(source!=null){
            for(var i=0; i<source.length; i++){
            var device = source[i];
            items.push(device);
            }
            this.setState({userDevices: items});
        }


        this.setState({modelName: response.data["modelName"]})
        this.setState({description: response.data["description"]})
        this.setState({maxHourlyEnergy: response.data["maxHourlyEnergy"]})
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
            this.setState({modelName: "not found"})
            this.setState({description: "not found"})
            this.setState({id: "not found"})
            this.setState({maxHourlyEnergy:"not found"})
            this.setState({userDevices: []})  
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

                <h1>Search Device by model name</h1>
                    <div className="searchDiv">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.setState({searchedDevice: e.target.value})}}
                        />                  
                    <button className="primary" onClick={(e) => this.handleSearch(e)}>Search</button>
                    </div>
                    <div className='mainDiv2'>

                    <h1>Results:</h1>
                    <div className="input-group">
                <label className='getLabel'>Model Name: </label>
                <label className='getData'>{this.state.modelName}</label>
              </div>
    
              <div className="input-group">
              <label className='getLabel'>Description: </label>
              <label className='getData'>{this.state.description}</label>  
              </div>

              <div className="input-group">
              <label className='getLabel'>MaxHourlyEnergy: </label>
              <label className='getData'>{this.state.maxHourlyEnergy}</label>  
              </div>
              
                 
              
                </div>
                </div>
            </div>
        )
      }
  }

  export default GetDevice;