import React from 'react';
import '../../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomClientNavBar from '../../commons/app_bars/client_nav_bar';
import {Redirect} from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart,Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';


class UserDeviceChart extends React.Component {


    
    constructor(){
        super();
        this.state = 
        {
          userDevicesIds:[],
          energyConsumptions:[],
          day:new Date(),
          selectedDevice:'',

          dataChart:[],

          axex:[
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
        };
        this.handleDaySelection = this.handleDaySelection.bind(this);
      }

      componentDidMount = () => {

        axios.get("https://localhost:44378/api/User/byClientName", {
           params: {
               name: JSON.parse(localStorage.getItem('name'))
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        console.log(response.data);
    
        var items = [];
        var source =response.data["devices"];
        if(source!=null){
            for(var i=0; i<source.length; i++){
                var userDevice = source[i];             
                var userDeviceId = userDevice["id"];

                items.push(userDeviceId);
                
            }
            this.setState({userDevicesIds: items});
        }
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
            this.setState({userDevicesIds: []})  
        }
       });
      }

    handleDaySelection(date) { 
        console.log(date) 
      this.setState({  
        day: date  
      })      
    }

    viewChart(e) { 
      console.log(this.state.day)
      console.log(this.state.selectedDevice)

      axios.get("https://localhost:44378/api/EnergyConsumption/byDay", {
           params: {
               id: this.state.selectedDevice,
               date: this.state.day
           },
           headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         }
       })
       .then((response) =>{
        console.log(response.data);
    
        var items = [];
        var source =response.data;
        if(source!=null){
            for(var i=0; i<source.length; i++){
                var consumptionData = source[i];             
                var hour = consumptionData["hour"];
                var consumption = consumptionData["consumption"];

                var myObj = {
                  hour: hour,
                  consumption: consumption 
                };

                items.push(myObj);
                
            }
            this.setState({dataChart: items});
            console.log(this.state.dataChart)
        }
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
            this.setState({dataChart: []})  
        }
       });

  }


    render() {

        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='client'){
            return (<Redirect to={"/"}/>)
        }

        return (


            <div className='divClient'>
                <CustomAppBar></CustomAppBar>
                <CustomClientNavBar></CustomClientNavBar>

              <table>
                <tbody>
                <tr>
                  <td>
                <div style={{ border:50, marginLeft:100, marginTop: 50,width:500}}>
         
                    <h1>Choose a device</h1>
                    <br></br>
                    <div>                           
                      <select onChange={(e) => { this.setState({selectedDevice: e.target.value})}}>                                      
                        {this.state.userDevicesIds.map((item) => {
                            return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                            )
                        })}
                      </select>
                  </div>
                              
                </div>

                <div style={{ border:50, marginLeft:100, marginTop: 50,width:500}}>
                    <h1>Choose a day</h1>
                    <DatePicker  
                        selected={ this.state.day}  
                        onChange={this.handleDaySelection}  
                        name="day"  
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MM/dd/yyyy"  
                    />
                </div>
                </td>

                <td>
                <div style={{ border:50, marginLeft:100, marginTop: 50,width:800}}>
                    <h1>Energy Consumption Charts</h1>
                </div>

                    <div style={{ border:50, marginLeft:100, marginTop: 50,width:800}}>
                    <LineChart
                      width={800}
                      height={300}
                      data={this.state.dataChart}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis dataKey="consumption"/>
                  <Tooltip />
                  <Legend  layout="horizontal" verticalAlign="top" align="center"/>
                  <Line type = "monotone" dataKey = "consumption" stroke="#2196F3"/>
                </LineChart>
                    

                    </div>
                    </td>

                    </tr>
                    <tr>
                      <td align='center'>
                    <button onClick={(e) => this.viewChart(e)}>View Chart</button>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    };
}

export default UserDeviceChart
