import React from 'react';
import '../styles/project-style.css';
import {FaList,FaUserPlus, FaUser, FaUserEdit,FaUserMinus,FaSearch, FaPlus, FaMinus, FaEdit, FaDesktop, FaLink}  from 'react-icons/fa';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class CustomNavBar extends React.Component {

    render() {

        return (

            <div className='divAdmin'>
                
                <SideNav style={{'backgroundColor': '#0174d2'}} onSelect={(selected) => {
                        console.log(selected)

                        if(selected === 'home'){
                            console.log(selected)
                            window.location = '/admin/home'
                        }

                        if(selected === 'user/add'){
                            console.log(selected)
                            window.location = '/admin/userAdd'
                        }

                        if(selected === 'user/find'){
                            console.log(selected)
                            window.location = '/admin/userGet'
                        }
                        if(selected === 'user/update'){
                            console.log(selected)
                            window.location = '/admin/userUpdate'
                        }
                        if(selected === 'user/delete'){
                            console.log(selected)
                            window.location = '/admin/userDelete'
                        }

                        if(selected === 'device/list'){
                            console.log(selected)
                            window.location = '/admin/deviceList'
                        }

                        if(selected === 'device/add'){
                            console.log(selected)
                            window.location = '/admin/deviceAdd'
                        }

                        if(selected === 'device/find'){
                            console.log(selected)
                            window.location = '/admin/deviceGet'
                        }
                        if(selected === 'device/update'){
                            console.log(selected)
                            window.location = '/admin/deviceUpdate'
                        }
                        if(selected === 'device/delete'){
                            console.log(selected)
                            window.location = '/admin/deviceDelete'
                        }

                        if(selected === 'userDevice/create'){
                            console.log(selected)
                            window.location = '/admin/userDeviceCreate'
                        }


                    }}> 

                    <SideNav.Toggle/>
                        <SideNav.Nav>

                        <NavItem eventKey="user">
                                    <NavIcon>
                                        <FaUser/>
                                    </NavIcon>
                                    <NavText>
                                        User Opeartions
                                    </NavText>
                                
                                    <NavItem eventKey="home">
                                    <NavIcon>
                                        <FaList style={{marginRight:20}}/>
                                        View Users
                                    </NavIcon>
                                    </NavItem>

                                <NavItem eventKey="user/add">
                                    
                                    <NavIcon>
                                        <FaUserPlus style={{marginRight:20}}/>
                                        Add User
                                    </NavIcon>
                                    
                                </NavItem>

                                <NavItem eventKey="user/find">
                                    <NavIcon>
                                        <FaSearch style={{marginRight:20}}/>
                                        Search User
                                    </NavIcon>
                                </NavItem>

                                <NavItem eventKey="user/update">
                                    <NavIcon>
                                        <FaUserEdit style={{marginRight:20}}/>
                                        Edit User
                                    </NavIcon>
                                </NavItem>

                                <NavItem eventKey="user/delete">
                                    <NavIcon>
                                        <FaUserMinus style={{marginRight:20}}/>
                                        Delete User
                                    </NavIcon>
                                </NavItem>
                        </NavItem>



                        <NavItem eventKey="device">
                                    <NavIcon>
                                        <FaDesktop/>
                                    </NavIcon>
                                    <NavText>
                                        Device Opeartions
                                    </NavText>
                                
                                    <NavItem eventKey="device/list">
                                    <NavIcon>
                                        <FaList style={{marginRight:20}}/>
                                        View Devices
                                    </NavIcon>
                                    </NavItem>

                                <NavItem eventKey="device/add">
                                    
                                    <NavIcon>
                                        <FaPlus style={{marginRight:20}}/>
                                        Add Device
                                    </NavIcon>
                                    
                                </NavItem>

                                <NavItem eventKey="device/find">
                                    <NavIcon>
                                        <FaSearch style={{marginRight:20}}/>
                                        Search Device
                                    </NavIcon>
                                </NavItem>

                                <NavItem eventKey="device/update">
                                    <NavIcon>
                                        <FaEdit style={{marginRight:20}}/>
                                        Edit Device
                                    </NavIcon>
                                </NavItem>

                                <NavItem eventKey="device/delete">
                                    <NavIcon>
                                        <FaMinus style={{marginRight:20}}/>
                                        Delete Device
                                    </NavIcon>
                                </NavItem>
                        </NavItem>

                        <NavItem eventKey="user-device">
                                    <NavIcon>
                                        <FaLink/>
                                    </NavIcon>
                                    <NavText>
                                        Mapping Opeartions
                                    </NavText>

                                    <NavItem eventKey="userDevice/create">
                                    <NavIcon>
                                        <FaPlus style={{marginRight:20}}/>
                                        Create Mapping
                                    </NavIcon>
                                    </NavItem>

                        </NavItem>

                        </SideNav.Nav>
                </SideNav>

            </div>

        )
    };
}

export default CustomNavBar
