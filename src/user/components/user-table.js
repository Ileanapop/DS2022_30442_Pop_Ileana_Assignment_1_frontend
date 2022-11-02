import React from "react";
import axios from "axios";


class UserTable extends React.Component {

    constructor(props) {
        super();
        this.state = {
            tableData: []
        };
    }

    componentDidMount = () => {

        axios.get("https://localhost:7292/api/User/all", {
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
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Devices</th>  
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tableData.map((user, index) => (
                            <tr key = {index}> 
                                <td width={400}>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.type}</td> 
                                <td>{user.devices}</td>        
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserTable;