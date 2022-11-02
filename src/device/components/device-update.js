import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import { TextField } from '@material-ui/core';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import '../../commons/styles/project-style.css';


class UpdateDevice extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          description:'',
          modelname:'',
          maxHourlyEnergy:'',
          id:'',
          searchedModelName:'',
        };
      }

      handleSearch(e) { 
        
        axios.get("https://localhost:7292/api/EnergyDevice/byName", {
           params: {
               name: this.state.searchedModelName
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{     
        this.setState({modelname: response.data["modelName"]})
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
        }
       });
    }


      handleUpdate(e) { 
    
        axios({
      
          url: "https://localhost:7292/api/EnergyDevice",
          method: "PUT",
          headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         },
      
         data: {
          id: this.state.id,
          description:this.state.description,          
          modelName:this.state.modelname,
          maxHourlyEnergy: this.state.maxHourlyEnergy
          },
      
        })  
          .then((res) => { 
            console.log(res.status)
            alert('Device updated successfully')
            
          })
          .catch((err) => {        
            if(err.response.status === 403){
                alert("Unauthorized")
                window.location = '/'
            }
            else{
                if(err.response.status === 409){
                    alert(err.response.data)
                }
                else {
                    if(err.response.status === 404){
                        alert(err.response.data)
                    }
                    else
                        {
                            var validation_errors=[];
                            var source =err.response.data["errors"];

                            if(source["energyDeviceUpdateDto"] !== undefined)
                                validation_errors.push(source["energyDeviceUpdateDto"]+"\n")
                            if(source["ModelName"] !== undefined)
                                validation_errors.push("ModelName: " + source["ModelName"] + "\n")
                            if(source["Description"] !== undefined)
                                validation_errors.push("Description: " + source["Description"] + "\n")
                            if(source["MaxHourlyEnergy"] !== undefined)
                                validation_errors.push("MaxHourlyEnergy:" + source["MaxHourlyEnergy"])
                            alert(validation_errors)
                        }
                }
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

                <h1>Update device</h1>
                    <div className="searchDiv">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.setState({searchedModelName: e.target.value})}}
                        />                  
                    <button className="primary" onClick={(e) => this.handleSearch(e)}>Search</button>
                    </div>
                    <div className='mainDiv2'>

                  
                    <h1>Results:</h1>
                    <div className="input-group">
                <label htmlFor="name">Model Name: </label>
                <input type="text" name="name"  onChange={(e) => { this.setState({modelname: e.target.value})}} placeholder={this.state.modelname} required/>
              </div>

              <div className="input-group">
                <label htmlFor="name">Description: </label>
                <input type="text" name="description"  onChange={(e) => { this.setState({description: e.target.value})}} placeholder={this.state.description} required/>
              </div>
    
              <div className="input-group">
                <label htmlFor="name">MaxHourlyEnergy: </label>
                <input type="text" name="maxHourlyEnergy"  onChange={(e) => { this.setState({maxHourlyEnergy: e.target.value})}} placeholder={this.state.maxHourlyEnergy} required/>
              </div>
                    
              <button className="primary" onClick={(e) => this.handleUpdate(e)}>Update device</button>
                    </div>

                </div>
            </div>
        )
      }
  }

  export default UpdateDevice;