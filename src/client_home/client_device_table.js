import React from "react";
import axios from "axios";



class ClientDeviceTable extends React.Component {

    constructor(props) {
        super();
        this.state = {
            devices: []
        };
    }

    componentDidMount = () => {

        axios.get("https://localhost:7292/api/User/byClientName", {
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
               
                var userDeviceAddress = userDevice["address"]
               
                var energyDevice = userDevice["energyDevice"]
                
                var userDeviceModelName = energyDevice["modelName"]
              
                var userDeviceDescription = energyDevice["description"]
               
                var userDeviceMaxHourlyEnergy = energyDevice["maxHourlyEnergy"]
                 

                var myObj = {
                    id: userDeviceId,
                    address: userDeviceAddress,
                    modelName: userDeviceModelName,
                    description:userDeviceDescription,
                    maxHourlyEnergy:userDeviceMaxHourlyEnergy
                  };


                items.push(myObj);
                
            }
            this.setState({devices: items});
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
            this.setState({devices: []})  
        }
       });
      }

    render() {
        return (
            <div style={{'backgroundColor': 'white', border:50, marginLeft:60}}>
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th>UserDevice Id</th>
                        <th>Model Name</th>
                        <th>Description</th>
                        <th>MaxHourlyEnergy</th>  
                        <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.devices.map((device, index) => (
                            <tr key = {index}> 
                                <td width={400}>{device.id}</td>
                                <td>{device.modelName}</td>
                                <td>{device.description}</td> 
                                <td>{device.maxHourlyEnergy}</td>    
                                <td>{device.address}</td>    
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ClientDeviceTable;
