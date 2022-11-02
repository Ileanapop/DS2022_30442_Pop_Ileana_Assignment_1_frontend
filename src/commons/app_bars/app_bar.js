import React from 'react';
import '../styles/project-style.css';
import { Link } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography, } from "@material-ui/core";

class CustomAppBar extends React.Component {

    render() {

        return (

            <div className='divAdmin'>
                <AppBar position="static" style={{'backgroundColor': 'white', border:50, marginLeft:50}}>
                    <CssBaseline />
                        <Toolbar>
                            <Typography variant="h4">
                                <img src={require('../images/device.jpg')} width={50} height={50} alt="Logo" />
                            </Typography>
                            <Typography variant="h4">
                                <img src={require('../images/title.PNG')} width={250} height={50} alt="Logo" />
                            </Typography>
                            <div >
                                <Link to="/" style={{marginLeft:50}}>
                                </Link>
                            </div>
                        </Toolbar>
                </AppBar>
            </div>
        )
    };
}

export default CustomAppBar
