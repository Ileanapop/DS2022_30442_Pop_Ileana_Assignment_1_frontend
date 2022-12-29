import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from './app'
import AdminHome from './admin_home/admin_home';
import ClientHome from './client_home/client_home';
import CreateUser from './user/components/user-add';
import GetUser from './user/components/user-get';
import UpdateUser from './user/components/user-update';
import DeleteUser from './user/components/user-delete';
import DeviceList from './device/components/device-list';
import CreateDevice from './device/components/device-add';
import GetDevice from './device/components/device-get';
import UpdateDevice from './device/components/device-update';
import DeleteDevice from './device/components/device-delete';
import CreateUserDeviceMapping from './user_device/components/user_device_create';
import UserDeviceChart from './user_device/components/user_device_charts';
import ClientNotifications from './client_home/client_notifications';


import 'bootstrap/dist/css/bootstrap.min.css';
import ClientChat from './client_home/client_chat';
import AdminChat from './admin_home/admin_chat';

ReactDOM.render(
    <BrowserRouter>
       <div>
        <Switch>
         <Route path="/admin/home" component={AdminHome}/>  
         <Route path="/client/home" component={ClientHome}/>
         <Route path="/admin/userAdd" component={CreateUser}/>
         <Route path="/admin/userGet" component={GetUser}/>  
         <Route path="/admin/userUpdate" component={UpdateUser}/> 
         <Route path="/admin/userDelete" component={DeleteUser}/> 
         <Route path="/admin/deviceList" component={DeviceList}/>
         <Route path="/admin/deviceAdd" component={CreateDevice}/>
         <Route path="/admin/deviceGet" component={GetDevice}/>
         <Route path="/admin/deviceUpdate" component={UpdateDevice}/>
         <Route path="/admin/deviceDelete" component={DeleteDevice}/>
         <Route path="/admin/userDeviceCreate" component={CreateUserDeviceMapping}/>
         <Route path="/admin/chat" component={AdminChat}/>
         <Route path="/client/viewChart" component={UserDeviceChart}/>
         <Route path="/client/notifications" component={ClientNotifications}/>
         <Route path="/client/chat" component={ClientChat}/>
         <Route path="/" component={App}/> 
         </Switch>   
      </div>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
