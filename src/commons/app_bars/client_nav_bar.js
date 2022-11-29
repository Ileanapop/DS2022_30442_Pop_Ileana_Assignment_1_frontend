import React from 'react';
import '../styles/project-style.css';
import {FaList, FaChartBar,FaExclamation}  from 'react-icons/fa';
import SideNav, { NavItem, NavIcon,NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class CustomClientNavBar extends React.Component {

    render() {

        return (

            <div className='divClient'>
                
                <SideNav style={{'backgroundColor': '#0174d2'}} onSelect={(selected) => {
                        console.log(selected)
                        if(selected === 'client/viewDevices'){
                            console.log(selected)
                            window.location = '/client/home'
                        }

                        if(selected === 'client/viewChart'){
                            console.log(selected)
                            window.location = '/client/viewChart'
                        }

                        if(selected === 'client/notifications'){
                            console.log(selected)
                            window.location = '/client/notifications'
                        }

                    }}> 

                    <SideNav.Toggle/>
                        <SideNav.Nav>

                        <NavItem eventKey="client/viewDevices">
                                    <NavIcon>
                                        <FaList style={{marginRight:20}}/>
                                    </NavIcon>
                                    <NavText>
                                        My Devices
                                    </NavText>

                        </NavItem>

                        <NavItem eventKey="client/viewChart">
                                    <NavIcon>
                                        <FaChartBar style={{marginRight:20}}/>
                                    </NavIcon>
                                    <NavText>
                                        Energy Consumption
                                    </NavText>

                        </NavItem>

                        <NavItem eventKey="client/notifications">
                                    <NavIcon>
                                        <FaExclamation style={{marginRight:20}}/>
                                    </NavIcon>
                                    <NavText>
                                        Notifications
                                    </NavText>

                        </NavItem>


                        </SideNav.Nav>
                </SideNav>

            </div>

        )
    };
}

export default CustomClientNavBar
