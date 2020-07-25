import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { setAuth, getAuth } from "../utils/globalstore";
import { ReactComponent as LogoutLogo } from "../assets/icons/exit_to_app-24px.svg";
import { ReactComponent as AddFile } from "../assets/icons/note_add-24px.svg";

import { BASE_URL, AVATAR_URL } from "../utils/api";
import Document from "../components/document";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      loading: true,
      modalOpen: false,
      filename: "",
      email:
        typeof this.props.location.state === "undefined"
          ? ""
          : this.props.location.state.email,
    };
    console.log(getAuth());
    if (getAuth() !== "true") {
      this.props.history.push("/login");
    }
  }
  async componentDidMount() {
    await this.getDocuments();
    this.releaseUser();
  }
  getDocuments =  () => {
    this.setState({ loading: true });
    var docArray = [];
     axios
      .get(`${BASE_URL}/document/`)
      .then((response) => {
        var documents = response.data;
        documents.forEach((document) => {
          docArray = docArray.concat(document);
        });
        this.setState({ documents: docArray, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  openDocument = (id, name) => {
    const { email } = this.state;
    let body = {
      email: email,
      fileid: id,
    };
    axios
      .post(`${BASE_URL}/document/open`, body)
      .then((response) => {
        if (response.data.message == "success") {
          this.props.history.push("/document", {
            email: email,
            fileid: id,
            filename : name
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  logout = () => {
    setAuth("false");
    let body = {
      email: this.state.email,
    };
    axios
      .post(`${BASE_URL}/user/offline`, body)
      .then((response) => {
        console.log(getAuth());
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    
  };
  releaseUser = async () =>{
    let body = {
      email: this.state.email,
    };
    axios
      .post(`${BASE_URL}/user/offline`, body)
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }


  addDocument = () => {
    if (this.state.filename != "") {
      let email = this.state.email;
      let filename = this.state.filename;
      let body = {
        author: email,
        filename: filename,
      };
      console.log(body);
      axios.post(`${BASE_URL}/document/create`, body).then((response) => {
        if ((response.data.message = "success")) {
          alert("Added");
          this.setState({ modalOpen: false });
          this.getDocuments();
        } else {
          alert("failed");
        }
      });
    }
  };

  fileAddTextHandler = ({ target: { value } }) => {
    this.setState({ filename: value });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 home-col shadow-lg">
            <h4>Welcome {this.state.email}</h4>

            <img
              src={`${AVATAR_URL}${this.state.email}`}
              height={60}
              width={60}
              className="rounded-circle shadow-lg home-avatar"
            />

            <Modal
              isOpen={this.state.modalOpen}
              style={{
                overlay: {
                  margin: "auto",
                  borderRadius: "20px",
                  outline: "none",
                  background: "rgba(255,255,255,0.6)",
                },
                content: {
                  width: "300px",
                  height: "300px",
                  margin: "auto",
                  marginBottom: "300px",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontFamily: "Quicksand",
                  backgroundColor: "#b24592",
                  color: "white",
                },
              }}
            >
              <h6>Add Document</h6>
              <input
                onChange={this.fileAddTextHandler}
                type="text"
                className="login-input-fields"
                placeholder="Document name"
              />
              <button onClick={this.addDocument} className="login-button">
                Submit
              </button>
              <button
                onClick={() => {
                  this.setState({ modalOpen: false });
                }}
                className="login-button close-button"
              >
                Close
              </button>
            </Modal>
            <div className="col-md-11 home-file-col">
              
              <Document
                onclick={this.openDocument}
                loading={this.state.loading}
                documents={this.state.documents}
              />
            </div>

            <div className="home-footer">
              <AddFile
                onClick={() => {
                  this.setState({ modalOpen: true });
                }}
                width="40"
                height="40"
                className="icon-color-white"
              />
              <span>Add File</span>
              <LogoutLogo
                onClick={this.logout}
                width="40"
                height="40"
                className="icon-color-white"
              />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
