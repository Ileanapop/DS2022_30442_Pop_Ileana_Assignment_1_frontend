import React from 'react';
import '../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomClientNavBar from '../commons/app_bars/client_nav_bar';
import ClientDeviceTable from './client_device_table';
import {Redirect} from "react-router-dom";

class ClientHome extends React.Component {

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
                <ClientDeviceTable></ClientDeviceTable>
            </div>

        )
    };
}

export default ClientHome
