import React from 'react';
import '../../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomClientNavBar from '../../commons/app_bars/client_nav_bar';
import {Redirect} from "react-router-dom";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Chart } from 'react-charts/dist/react-charts.development';
import { LineChart,Line } from 'recharts';


class UserDeviceChart extends React.Component {


    
    constructor(){
        super();
        this.state = 
        {
          id:'',
          energyConsumptions:[],
          day:new Date(),

          dataChart:[
            {
              data: 21,
              label: 'Series 1',
            },
            { 
              data: 40,
              label: 'Series 2',
            }
          ],

          axex:[
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
        };
        this.handleChooseDay = this.handleChooseDay.bind(this);
      }

    componentDidMount = () => {

        
    }

    handleChooseDay(date) { 
        console.log(date) 
      this.setState({  
        day: date  
      })      
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

                

                <div style={{ border:50, marginLeft:100, marginTop: 50,width:500}}>
                    <h1>Choose a day</h1>
                    <DatePicker  
                        selected={ this.state.day}  
                        onChange={ this.handleChangeStartTime }  
                        name="day"  
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MM/dd/yyyy"  
                    />
                </div>

                <div style={{ border:50, marginLeft:100, marginTop: 50,width:800}}>
                    <h1>Energy Consumption Charts</h1>
                </div>

                    <div style={{ border:50, marginLeft:100, marginTop: 50,width:800}}>
                    <LineChart width={600} height={300} data={this.state.dataChart}>
                        <Line type = "monotone" dataKey = "data" stroke="#2196F3"/>
                    </LineChart>
                    </div>
                
            </div>

        )
    };
}

export default UserDeviceChart
