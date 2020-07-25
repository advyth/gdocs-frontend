import React, { Component } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import Document from "../components/document";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.getDocuments();
  }
  getDocuments = () => {
    this.setState({loading: true});
    var docArray = [];
    axios
      .get(`${BASE_URL}/document/`)
      .then((response) => {
        var documents = response.data;
        documents.forEach((document) => {
          docArray = docArray.concat(document);
        });
        this.setState({ documents: docArray, loading : false });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 home-col shadow-lg">
            <h2>Welcome Advyth</h2>
            <div className="image-bg shadow-lg">
              <img
                src="https://retro-avatar.s3.amazonaws.com/avatar_5c0533500f0dc351421d2c6c50717252.png"
                height={50}
                width={50}
              />
            </div>
            <div className="col-md-11 home-file-col">
              <Document loading={this.state.loading} documents={this.state.documents} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
