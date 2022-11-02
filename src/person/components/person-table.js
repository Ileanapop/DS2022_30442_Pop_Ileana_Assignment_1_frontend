import React from "react";
import Table from "../../commons/tables/table";
import axios from "axios";

const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Devices',
        accessor: 'devices',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        };
    }

    componentDidMount = () => {

        axios.get("https://localhost:7292/api/User/all", {
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

      handleGetUsers(e) {
        axios.get("https://localhost:7292/api/User/all", {
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
            <div>
                <button onClick={(e) => this.handleGetUsers(e)}>Get users</button>
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={2}
            />
            </div>
        )
    }
}

export default PersonTable;