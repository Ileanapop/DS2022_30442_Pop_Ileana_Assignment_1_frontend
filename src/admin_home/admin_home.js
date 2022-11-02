import React from 'react';
import '../commons/styles/project-style.css';
import UserTable from '../user/components/user-table';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../commons/app_bars/app_bar';
import CustomNavBar from '../commons/app_bars/nav_bar';
import {Redirect} from "react-router-dom";

class AdminHome extends React.Component {

    render() {

        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='admin'){
            return (<Redirect to={"/"}/>)
        }

        
        return (


            <div className='divAdmin'>
                <CustomAppBar/>

                <CustomNavBar/>

                <UserTable></UserTable>
            </div>

        )
    };
}

export default AdminHome
