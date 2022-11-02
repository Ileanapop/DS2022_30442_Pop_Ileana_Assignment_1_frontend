import React from "react";
import axios from "axios";


class DeviceTable extends React.Component {

    constructor(props) {
        super();
        this.state = {
            tableData: []
        };
    }

    componentDidMount = () => {

        axios.get("https://localhost:7292/api/EnergyDevice/all", {
            headers: {'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
       })
       .then((response) =>{
        var items = [];
          for(var i=0; i< response.data.length; i++){
            var role = response.data[i];
            console.log(role);
            items.push(role);
          }
          this.setState({tableData: items}); 
          console.log(this.state.tableData);
       })
       .catch((error) => alert("Invalid login credentials"));
      }

    render() {
        return (
            <div style={{'backgroundColor': 'white', border:50, marginLeft:60}}>
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th>Device Id</th>
                        <th>Model name</th>
                        <th>Description</th>
                        <th>MaxHourlyEnergy</th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tableData.map((device, index) => (
                            <tr key = {index}> 
                                <td width={400}>{device.id}</td>
                                <td>{device.modelName}</td>
                                <td>{device.description}</td> 
                                <td>{device.maxHourlyEnergy}</td>        
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DeviceTable;