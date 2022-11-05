import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import { TextField } from '@material-ui/core';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import {List} from '@material-ui/core';
import '../../commons/styles/project-style.css';


class CreateUserDeviceMapping extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          name:'',
          type:'',
          userId:'',
          searchedUsername:'',
          associatedDevices:[],
          energyDeviceId:'',
          modelName:'',
          description:'',
          maxHourlyEnergy:'',
          searchedDevice:'',
          address:''
        };
      }

      handleSearchUser(e) { 
        axios.get("https://localhost:7292/api/User/byName", {
           params: {
               name: this.state.searchedUsername
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{ 
        
        var items = [];
        var source =response.data["devices"];
        if(source!=null){

            if(source.length ===0)
            {
                items.push("No devices mapped")
            }
            else{
            
                for(var j=0;j<source.length;j++)
                {
                    var x = source[j]
                    items.push(x["id"])
                }
            }

            this.setState({associatedDevices: items});
        }
        else{
            this.setState({associatedDevices: ["No devices mapped"]});
        }


        this.setState({name: response.data["name"]})
        this.setState({type: response.data["type"]})
        this.setState({userId: response.data["id"]})       
       })
       .catch((err) => {       
        if(err.response.status === 403){
            alert("Unauthorized")
            window.location = '/'
        }
        else
        {
            alert(err.response.data)
            this.setState({name: "not found"})
            this.setState({type: "not found"})
            this.setState({userId: "not found"})
        }
       });
    }



    handleSearchDevice(e) { 
        axios.get("https://localhost:7292/api/EnergyDevice/byName", {
           params: {
               name: this.state.searchedDevice
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        this.setState({modelName: response.data["modelName"]})
        this.setState({description: response.data["description"]})
        this.setState({maxHourlyEnergy: response.data["maxHourlyEnergy"]})
        this.setState({energyDeviceId: response.data["id"]})       
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
            this.setState({energyDeviceId: "not found"})
            this.setState({maxHourlyEnergy:"not found"})
        }
       });
    }


    handleMapping(e) { 

        if(this.state.type === "admin"){
            alert("Cannot perform mapping for an admin user")
        }
        else{
        axios({
      
            url: "https://localhost:7292/api/UserDevice",
            method: "POST",
            headers: {'Content-type': 'application/json',
                      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
           },
        
           data: {
            userId:this.state.userId,         
            energyDeviceId: this.state.energyDeviceId,
            address: this.state.address
          },
        
          })  
            .then((res) => { 
              console.log(res.status)
              alert('Device registered to user!')
              
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


                <table>
                    <tbody>

                <tr>

                    <td>
                <h1>Search User by username</h1>
                    <div className="searchDiv">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.setState({searchedUsername: e.target.value})}}
                        />                  
                    <button className="primary" onClick={(e) => this.handleSearchUser(e)}>Search</button>
                    </div>
                    <div className='mainDivMapping'>

                    <h1>Results:</h1>
                    <div className="input-group">
                <label className='getLabel'>Name: </label>
                <label className='getData'>{this.state.name}</label>
              </div>
    
              <div className="input-group">
              <label className='getLabel'>User Type: </label>
              <label className='getData'>{this.state.type}</label>  
              </div>
              
                 
              <div className="input-group">
              <label className='getLabel'>List of associated devices: </label>
              

                </div>
                <ul className='getData'>
                    {this.state.associatedDevices.map((item) => {
                                    return (
                                    <li key={item} value={item}>
                                        {item} 
                                    </li>
                                    )
                                })}
                </ul>
                </div>
                </td>

                <td  style={{width:90}}></td>
                <td>
                <h1>Search Device by model name</h1>
                    <div className="searchDiv">
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => { this.setState({searchedDevice: e.target.value})}}
                        />                  
                    <button className="primary" onClick={(e) => this.handleSearchDevice(e)}>Search</button>
                    </div>
                    <div className='mainDivMapping'>

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

                </td>

                </tr>

                <tr>
                    <td>
                        <div className="input-group">
                        <label htmlFor="name">Device Address: </label>
                        <input type="text" name="address"  onChange={(e) => { this.setState({address: e.target.value})}} placeholder={this.state.address} required/>
                        </div>
                        </td>
                </tr>

                <tr>
                    <td style={{width:550}}></td> 
                    <td style={{textAlign:'right'}}>
                    <button className="primary" onClick={(e) => this.handleMapping(e)}>Create mapping</button>
                    </td>
                </tr>

                </tbody>
                </table>


                </div>
            </div>
        )
      }
  }

  export default CreateUserDeviceMapping;