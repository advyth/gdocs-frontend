import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Avatar from "../components/avatar";
import axios from "axios";
import ReactInterval from "react-interval";
import { Beforeunload } from "react-beforeunload";

import { BASE_URL } from "../utils/api";

class OpenDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      email:
        typeof this.props.location != "undefined"
          ? this.props.location.state.email
          : "",
    };
  }
  componentDidMount() {
    this.getUsers();
  }

  pollAlive = () => {
    let body = {
      email: this.state.email,
    };
    axios
      .post(`${BASE_URL}/user/isalive`, body)
      .then((response) => {
        console.log("polling done");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getUsers = () => {
    console.log("get users called");
    let fileid = this.props.location.state.fileid;
    let userArray = [];
    let body = {
      fileid: fileid,
    };
    axios
      .post(`${BASE_URL}/document/users`, body)
      .then((response) => {
        response.data.forEach((user) => {
          userArray = userArray.concat(user);
        });
        this.setState({ users: userArray, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  cleanUsers = () => {
    axios
      .get(`${BASE_URL}/user/cleanup`)
      .then((response) => {
        console.log("cleanup done");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <ReactInterval
          enabled={true}
          timeout={20000}
          callback={() => {
            this.cleanUsers();
          }}
        />

        <ReactInterval
          enabled={true}
          timeout={1000}
          callback={() => {
            this.getUsers();
          }}
        />
        <ReactInterval
          enabled={true}
          timeout={5000}
          callback={() => {
            this.pollAlive();
          }}
        />
        <div className="row">
          <div className="document-mast">
            <h2>{`People using ${this.props.location.state.filename}`}</h2>
            <h6>Hover over the user to see their id.</h6>
          </div>
          <div className="col-md-11 online-user-col shadow-lg">
            <Avatar loading={this.state.loading} users={this.state.users} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OpenDocument);
