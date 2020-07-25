import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Avatar from "../components/avatar";
import axios from "axios";


import {BASE_URL} from "../utils/api";

class OpenDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users : [],
        loading : true
    }
  }
  componentDidMount()
  {
      this.getUsers();
  }
  getUsers = () =>{
    
    let fileid = this.props.location.state.fileid;
    let userArray = [];
    let body = {
        "fileid" : fileid
    }
    axios.post(`${BASE_URL}/document/users`, body)
    .then((response)=>{
        response.data.forEach(user => {
            userArray = userArray.concat(user);
            
        });
        this.setState({users : userArray, loading : false});
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-11 online-user-col shadow-lg">
                <Avatar loading={this.state.loading} users={this.state.users}/>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OpenDocument);
