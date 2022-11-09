import React  from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import ErrorPage from '../../commons/errorhandling/error-page';
import CustomAppBar from '../../commons/app_bars/app_bar';
import CustomNavBar from '../../commons/app_bars/nav_bar';
import '../../commons/styles/project-style.css';


class CreateUser extends React.Component {

    constructor(){
        super();
        this.state = 
        {
          password:'',
          name:'',
          selectedType: '',
          types:['admin','client'],
          isAuth: 1 
        };
      }
    
       
      handleUpload(e) { 
    
        
        axios({
      
          url: "https://localhost:44378/api/User",
          method: "POST",
          headers: {'Content-type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
         },
      
         data: {
          name:this.state.name,          
          password:this.state.password,
          type:this.state.selectedType},
      
        })  
          .then((res) => { 
            console.log(res.status)
            alert('New user created successfully')
            
          })
          .catch((err) => {        
            if(err.response.status === 403){
                alert("Unauthorized")
                window.location = '/'
            }
            else
            {
                alert(err.response.data)
            }
           });
      }
    
      handleSelection(e) { 
        this.setState({hasSelectedType:1});
        console.log(this.state.selectedType);
        localStorage.setItem('selectedType', JSON.stringify(this.state.selectedType));
     }
        
      render() {
        if(!JSON.parse(localStorage.getItem('token')) || JSON.parse(localStorage.getItem('token'))==='undefined'){
            return (<Redirect to={"/"}/>)
        }

        if(!JSON.parse(localStorage.getItem('type')) || JSON.parse(localStorage.getItem('type'))!=='admin'){
            return (<Redirect to={"/"}/>)
          }
    
        if(this.state.isAuth === 1){
        return (
            <div className='divAdmin' >
           
            <CustomAppBar></CustomAppBar>
            <CustomNavBar></CustomNavBar>

            <div style={{'backgroundColor': 'AliceBlue', marginLeft:70}}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name"  onChange={(e) => { this.setState({name: e.target.value})}} required/>
              </div>

              <div className="input-group">
                <label htmlFor="password">Initial Password</label>
                <input type="password" name="password" onChange={(e) => { this.setState({password: e.target.value})}} required/>
              </div>
    
              <div className="input-group">
              <label htmlFor="itemName">Select User Type</label>
              <div className="form-group col-md-6">                           
              <select className="form-control" name="city" onChange={(e) => { this.setState({selectedType: e.target.value})}}>                                      
              {this.state.types.map((item) => {
                        return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                        )
                    })}
                      </select>
                    </div>              
                    </div>
                    
              <button className="primary" onClick={(e) => this.handleUpload(e)}>Create New Account</button>
              </div>
          </div>
        );
                  }
                  else
        return (<ErrorPage></ErrorPage>)
      }
  }

  export default CreateUser;