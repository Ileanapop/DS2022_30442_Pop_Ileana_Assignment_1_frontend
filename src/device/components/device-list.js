import React from 'react';
import '../../commons/styles/project-style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import DeviceTable from './device-table';

class DeviceList extends React.Component {

    render() {

        return (

            <div className='divAdmin'>
                <CustomAppBar/>

                <CustomNavBar/>

                <DeviceTable></DeviceTable>
            </div>

        )
    };
}

export default DeviceList
